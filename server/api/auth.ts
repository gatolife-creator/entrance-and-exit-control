import express from "express";
import { adminId, memberDB } from "./members";

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/signin", handleSignin);
router.post("/signinAsAdmin", handleSigninAsAdmin);
router.post("/isSignedIn", handleIsSignedIn);
router.post("/isSignedUp", handleIsSignedUp);

function handleSignup(req: express.Request, res: express.Response) {
  const { uuid, password } = req.body;
  try {
    memberDB.setPassword(uuid, password);
    req.session.uuid = uuid;
    res.sendStatus(200);
  } catch (e) {
    handleError(res, e);
  }
}

function handleSignin(req: express.Request, res: express.Response) {
  const { uuid, password } = req.body;
  try {
    if (memberDB.isValidPassword(uuid, password)) {
      req.session.uuid = uuid;
      res.sendStatus(200);
    } else {
      throw new Error(`Wrong password: ${password}`);
    }
  } catch (e) {
    handleError(res, e);
  }
}

function handleSigninAsAdmin(req: express.Request, res: express.Response) {
  const { password } = req.body;
  try {
    if (
      memberDB.isAdmin(adminId) &&
      memberDB.isValidPassword(adminId, password)
    ) {
      req.session.uuid = adminId;
      res.sendStatus(200);
    } else {
      throw new Error("Invalid admin credentials");
    }
  } catch (e) {
    handleError(res, e);
  }
}

function handleIsSignedIn(req: express.Request, res: express.Response) {
  if (req.session.uuid) {
    res.status(200).json({ uuid: req.session.uuid });
  } else {
    res.status(401).json({ message: "Not signed in" });
  }
}

function handleIsSignedUp(req: express.Request, res: express.Response) {
  const { uuid } = req.body;

  if (!memberDB.isExist(uuid)) {
    res.status(401).json({ message: `The member ${uuid} was not found` });
  } else if (!memberDB.isPasswordSetUp(uuid)) {
    res.status(401).json({ message: "Not signed up yet" });
  } else {
    res.sendStatus(200);
    console.log("Already signed up");
  }
}

function handleError(res: express.Response, error: any) {
  if (error instanceof Error) {
    res.status(401).json({ message: error.message });
  }
}

export { router };
