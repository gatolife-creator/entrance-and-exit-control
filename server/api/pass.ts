import express from "express";
import { memberDB } from "./members";

const router = express.Router();

// NOTE historyの初期化と、特定の日の入退室履歴の有無確認はMemberDBに移植
router.post("/scan", (req: express.Request, res: express.Response) => {
  const { uuid } = req.body;
  if (!memberDB.getMember(uuid)) {
    res.status(401).json({ message: `The member ${uuid} not found` });
  } else {
    memberDB.historyInitToday(uuid);
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
});

export { router };
