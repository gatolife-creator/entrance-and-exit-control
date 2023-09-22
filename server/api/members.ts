import express from "express";
// @ts-ignore
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import QRCode from "qrcode";

dotenv.config();

const router = express.Router();

declare module "express-session" {
  export interface SessionData {
    member: string;
  }
}

export type Member = {
  id: string;
  name: string;
  age: number;
  gender: string;
  role: "member" | "admin";
  password?: string;
};

// Init admin info
export const adminId = "db931138-7efd-403d-87eb-6cd9dd0df187";
export const members: Member[] = [
  {
    id: adminId,
    name: "管理者",
    age: 17,
    gender: "female",
    role: "admin",
    password: process.env.ADMIN_PASSWORD,
  },
];

QRCode.toFile("resources/admin.png", adminId);

router.use(express.json());

router.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.session.member) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      next();
    }
  }
);

// FIXME 以下のAPIが認証済みのメンバー、もしは管理者のみが呼び出せるようにしたい
// FIXME とりあえずメンバーのみが呼び出せるようにした
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
  } as Member;
  members.push(newMember);
  return id;
};

const remove = (index: number) => {
  members.splice(index, 1);
};

export { router };
