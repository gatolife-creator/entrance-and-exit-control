import express from "express";
import _ from "express-session";
import { v4 as uuidv4 } from "uuid";

import { Member, members } from "./members";

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
    } else if (members.find((member) => member.id === uuid)) {
      next();
    } else {
      res.status(401).json({ message: "Not added as a member" });
    }
  }
);

router.get("/members", (_: express.Request, res: express.Response) => {
  res.json({ members });
});

router.get("/profile", (req: express.Request, res: express.Response) => {
  const { id } = req.body;
  const member = members.find((member) => member.id === id);
  res.json(member);
});

router.post("/add", (req: express.Request, res: express.Response) => {
  const { name, age, gender } = req.body;
  const id = add(name as string, Number(age), gender as "male" | "female");
  res.json({
    member: members.find((member) => {
      if (member.id === id) {
        return member;
      }
    }),
  });
});

router.delete("/remove", (req: express.Request) => {
  const { index } = req.body;
  remove(index);
});

const add = (name: string, age: number, gender: "male" | "female") => {
  const id = uuidv4();
  const newMember = {
    id,
    name,
    age,
    gender,
    role: "member",
    history: {},
  } as Member;
  members.push(newMember);
  return id;
};

const remove = (index: number) => {
  members.splice(index, 1);
};

export { router };
