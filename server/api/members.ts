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

export const memberDB = new MemberDB();
export const adminId = "db931138-7efd-403d-87eb-6cd9dd0df187";
memberDB.addSpecifiedMember(adminId, admin);

memberDB.setPassword(adminId, process.env.ADMIN_PASSWORD as string);

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
