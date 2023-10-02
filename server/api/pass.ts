import express from "express";
import { memberDB } from "./members";
import { JST } from "../utils/memberDB";

const router = express.Router();

// NOTE historyの初期化と、特定の日の入退室履歴の有無確認はMemberDBに移植
router.post("/scan", (req: express.Request, res: express.Response) => {
  const { uuid } = req.body;
  const member = memberDB.getMember(uuid);

  if (!member) {
    res.status(401).json({ message: `The member ${uuid} not found` });
  } else {
    if (!member.history.hasOwnProperty(JST())) {
      member.history = { [JST()]: { enter: {}, exit: {} } };
      memberDB.enter(uuid);
      res.status(200).json({ message: `The member ${uuid} entered` });
    } else if (member.history[JST()].exit.status === false) {
      memberDB.exit(uuid);
      res.status(200).json({ message: `The member ${uuid} exited` });
    } else {
      res.status(200).json({ message: "Already exited" });
    }
  }
});

export { router };
