import express from "express";
import _ from "express-session";
import * as dotenv from "dotenv";
import QRCode from "qrcode";

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

const dummy = new Member({
  name: "dummy",
  age: 16,
  gender: "male",
  role: "member",
});
const dummyId = "d7af6d37-dc7a-4ae6-b093-17a93198b355";
memberDB.addSpecifiedMember(dummyId, dummy);

QRCode.toFile("resources/admin.png", adminId);
QRCode.toFile("resources/dummy.png", dummyId);

router.use(express.json());
router.use(checkAuthorization);
router.get("/isAdmin", checkAdminStatus);

function checkAuthorization(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.session.uuid) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
}

function checkAdminStatus(req: express.Request, res: express.Response) {
  const uuid = req.session.uuid as string;
  const isAdmin = memberDB.isAdmin(uuid);
  if (isAdmin) {
    res.sendStatus(200);
  } else {
    res.status(401).json({ message: `The member ${uuid} is not an admin` });
  }
}

export { router };
