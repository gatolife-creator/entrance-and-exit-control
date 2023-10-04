import express from "express";
import { adminId } from "./members";
import { memberDB } from "./members";

const router = express.Router();

router.post("/signup", (req: express.Request, res: express.Response) => {
  const { uuid, password } = req.body;
  try {
    signup(uuid, password);
    req.session.uuid = uuid;
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
    req.session.uuid = uuid;
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
    if (e instanceof Error) {
      res.status(401).json({ message: e.message });
    }
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

  if (!memberDB.isExist(uuid)) {
    res.status(401).json({ message: `The member ${uuid} was not found` });
  } else if (!memberDB.isPasswordSetUp(uuid)) {
    res.status(401).json({ message: "Not signed up yet" });
  } else {
    res.sendStatus(200);
    console.log("Already signed up");
  }
});

const signup = (uuid: string, password: string) => {
  memberDB.setPassword(uuid, password);
};

const signin = (uuid: string, password: string) => {
  if (!memberDB.isValidPassword(uuid, password)) {
    throw new Error(`Wrong password: ${password}`);
  }
};

const signinAsAdmin = (uuid: string, password: string) => {
  if (!memberDB.isAdmin(uuid)) {
    throw new Error("Not an admin");
  }

  if (!memberDB.isValidPassword(uuid, password)) {
    throw new Error(`Wrong password: ${password}`);
  }
};

export { router };
