import express from "express";
import _ from "express-session";
import * as dotenv from "dotenv";

import { Member } from "../utils/member";
import { MemberDB } from "../utils/memberDB";

dotenv.config();

const router = express.Router();

declare module "express-session" {
  export interface SessionData {
    uuid: string;
  }
}

const admin = new Member({
  name: "管理者",
  age: 17,
  gender: "female",
  role: "admin",
});

admin.setPassword(process.env.ADMIN_PASSWORD as string);

export const memberDB = new MemberDB();
export const adminId = memberDB.add(admin);
console.log("adminId: ", adminId);

router.use(express.json());

router.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.session.uuid) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      next();
    }
  }
);

export { router };
