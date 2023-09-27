import express from "express";
import { adminId, members } from "./members";

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

router.post("/setPassword", (req: express.Request, res: express.Response) => {
  const { uuid, password } = req.body;
  const member = members.find((member) => member.id === uuid);

  if (member) {
    member.password = password;
    res.sendStatus(200);
  } else {
    res.status(401).json({ message: `The member ${uuid} was not found` });
  }
});

router.post("/signinAsAdmin", (req: express.Request, res: express.Response) => {
  const { uuid, password } = req.body;
  console.log(req.body);
  try {
    signinAsAdmin(adminId, password);
    req.session.member = adminId;
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Wrong password" });
  }
});

router.post("/isSignedIn", (req: express.Request, res: express.Response) => {
  if (req.session.member) {
    res.sendStatus(200);
  } else {
    res.status(401).json({ message: "Not signed in" });
  }
});

router.post("/isSignedUp", (req: express.Request, res: express.Response) => {
  const { uuid } = req.body;
  const member = members.find((member) => member.id === uuid);

  if (member === undefined) {
    res.status(401).json({ message: `The member ${uuid} was not found` });
  } else if (member.password === undefined) {
    res.status(401).json({ message: "Not signed up yet" });
  } else {
    res.sendStatus(200);
    console.log("Already signed up");
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
    throw new Error(`Wrong password: ${password}`);
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
    throw new Error(`Wrong password: ${password}`);
  }
  return true;
};

export { router };
