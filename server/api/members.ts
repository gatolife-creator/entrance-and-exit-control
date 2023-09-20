import express from "express";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

export type Member = {
  id: string;
  name: string;
  age: number;
  gender: string;
  role: "member" | "admin";
  password?: string;
};

// Init admin info
export const adminId = uuidv4();
export const members: Member[] = [
  {
    id: adminId,
    name: "管理者",
    age: NaN,
    gender: "female",
    role: "admin",
    password: process.env.ADMIN_PASSWORD,
  },
];

router.use(express.json());

router.get("/", (_: express.Request, res: express.Response) => {
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
  res.json({ id });
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
  } as Member;
  members.push(newMember);
  return id;
};

const remove = (index: number) => {
  members.splice(index, 1);
};

export { router };
