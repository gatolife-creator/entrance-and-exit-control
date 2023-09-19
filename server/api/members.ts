import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

export type Member = {
  id: string;
  name: string;
  age: number;
  gender: string;
};

export const members: Member[] = [];

router.use(express.json());

router.get("/", (_: express.Request, res: express.Response) => {
  res.json({ members });
});

router.post("/add", (req: express.Request) => {
  const { name, age, gender } = req.body;
  console.log(req.body);
  console.log(name);
  add(name as string, Number(age), gender as "male" | "female");
});

router.delete("/remove", (req: express.Request) => {
  const { index } = req.body;
  remove(index);
});

const add = (name: string, age: number, gender: "male" | "female") => {
  const newMember = { id: uuidv4(), name, age, gender };
  members.push(newMember);
};

const remove = (index: number) => {
  members.splice(index, 1);
};

export { router };
