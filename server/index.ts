import express from "express";
import path from "path";

import { router } from "./api/members";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/api/members", router);


app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
