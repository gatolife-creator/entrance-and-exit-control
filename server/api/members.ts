import express from "express";
// @ts-ignore
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";

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

export { router };
