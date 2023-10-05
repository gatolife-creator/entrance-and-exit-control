import express from "express";
import { memberDB } from "./members";

const router = express.Router();

router.post("/scan", handleScan);

function handleScan(req: express.Request, res: express.Response) {
  const { uuid } = req.body;
  const member = memberDB.getMember(uuid);

  if (!member) {
    res.status(401).json({ message: `The member ${uuid} not found` });
    return;
  }

  if (!memberDB.isEnteredToday(uuid)) {
    memberDB.enter(uuid);
    res.status(200).json({ message: `The member ${uuid} entered` });
  } else if (!memberDB.isExitedToday(uuid)) {
    memberDB.exit(uuid);
    res.status(200).json({ message: `The member ${uuid} exited` });
  } else {
    res.status(200).json({ message: "Already exited" });
  }
}

export { router };
