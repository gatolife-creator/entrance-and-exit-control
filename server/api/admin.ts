import express from "express";
import _ from "express-session";

import { Member } from "../utils/member";
import { memberDB } from "./members";

const router = express.Router();

declare module "express-session" {
  export interface SessionData {
    uuid: string;
  }
}

router.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { uuid } = req.session;
    if (!uuid) {
      res.status(401).json({ message: "Unauthorized" });
    } else if (memberDB.getMember(uuid)) {
      next();
    } else {
      res.status(401).json({ message: "Not added as a member" });
    }
  }
);

router.get("/members", (_: express.Request, res: express.Response) => {
  res.json({ members: memberDB.serialize() });
});

router.get("/profile", (req: express.Request, res: express.Response) => {
  const { uuid } = req.body;
  res.json(memberDB.getMember(uuid));
});

router.post("/add", (req: express.Request, res: express.Response) => {
  const { name, age, gender } = req.body;
  const member = new Member({
    name: name as string,
    age: Number(age),
    gender: gender as "male" | "female",
    role: "member",
  });

  const uuid = memberDB.add(member);
  res.status(200).json([uuid, member.serialize()]);
});

// router.delete("/remove", (req: express.Request) => {
//   const { index } = req.body;
//   remove(index);
// });
export { router };
