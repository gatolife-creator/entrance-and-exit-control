import express from "express";
import { SHA256 } from "crypto-js";
import { adminId, members } from "./members";

const router = express.Router();

declare module "express-session" {
  export interface SessionData {
    uuid: string;
  }
}

router.post("/signup", (req: express.Request, res: express.Response) => {
  const { uuid, password } = req.body;
  try {
    signup(uuid, password);
    res.sendStatus(200);
  } catch (e) {
    if (e instanceof Error) {
      res.status(401).json({ message: e.message });
    }
  }
});

router.post("/signin", (req: express.Request, res: express.Response) => {
  const { uuid, password } = req.body;
  try {
    signin(uuid, password);
    res.sendStatus(200);
  } catch (e) {
    if (e instanceof Error) {
      res.status(401).json({ message: e.message });
    }
  }
});

router.post("/signinAsAdmin", (req: express.Request, res: express.Response) => {
  const { password } = req.body;
  console.log(req.body);
  try {
    signinAsAdmin(adminId, password);
    req.session.uuid = adminId;
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Wrong password" });
  }
});

router.post("/isSignedIn", (req: express.Request, res: express.Response) => {
  if (req.session.uuid) {
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

  member.password = SHA256(password).toString();
};

const signin = (uuid: string, password: string) => {
  const member = members.find((member) => member.id === uuid);
  if (!member) {
    throw new Error("Member not found");
  }

  if (member.password !== SHA256(password).toString()) {
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
