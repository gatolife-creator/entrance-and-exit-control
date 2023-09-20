import express from "express";
import { adminId, members } from "./members";
import session from "express-session";

const router = express.Router();

declare module "express-session" {
  export interface SessionData {
    member: string;
  }
}

router.post("/signup", (req: express.Request, res: express.Response) => {
  const { uuid, password } = req.body;
  signup(uuid, password);
  res.sendStatus(200);
});

router.post("/signin", (req: express.Request, res: express.Response) => {
  const { uuid, password } = req.body;
  signin(uuid, password);

  Object.assign(req.session, { uuid });
  console.log(req.session);

  res.sendStatus(200);
});

router.post("/signinAsAdmin", (req: express.Request, res: express.Response) => {
  const { uuid, password } = req.body;
  try {
    signinAsAdmin(adminId, password);
    req.session.member = adminId;
    console.log(req.session);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(401);
  }
});

router.post("/isSignedIn", (req: express.Request, res: express.Response) => {
  if (req.session.member) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

const signup = (uuid: string, password: string) => {
  const member = members.find((member) => member.id === uuid);
  if (!member) {
    throw new Error("Member not found");
  }

  member.password = password;
};

const signin = (uuid: string, password: string) => {
  const member = members.find((member) => member.id === uuid);
  if (!member) {
    throw new Error("Member not found");
  }

  if (member.password !== password) {
    throw new Error("Wrong password");
  }
};

const signinAsAdmin = (uuid: string, password: string) => {
  const member = members.find((member) => member.id === uuid);
  if (!member) {
    throw new Error("Member not found");
  }

  if (member.role !== "admin") {
    throw new Error("Not an admin");
  }

  if (member.password !== password) {
    throw new Error("Wrong password");
  }
  console.log("you are an admin");
  return true;
};

export { router };
