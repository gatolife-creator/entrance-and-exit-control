import express from "express";
import _ from "express-session";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

declare module "express-session" {
  export interface SessionData {
    uuid: string;
  }
}

export type Member = {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  role: "member" | "admin";
  password?: string;
  history: {
    [date: string]: {
      enter: {
        status?: boolean;
        timestamp?: number;
      };
      exit: {
        status?: boolean;
        timestamp?: number;
      };
    };
  };
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
    history: {},
  },
];

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
