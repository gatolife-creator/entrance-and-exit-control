import express from "express";
import session from "express-session";
import path from "path";
import * as dotenv from "dotenv";

import { router as membersRouter } from "./api/members";
import { router as adminRouter } from "./api/admin";
import { router as authRouter } from "./api/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const session_option = {
  secret: process.env.SESSION_SECRET_KEY as string,
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
};

app.use(express.json());

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(session(session_option));
app.use("/api/members", membersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
