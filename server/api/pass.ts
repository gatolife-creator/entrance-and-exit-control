import express from "express";
import { Member, members } from "./members";

const router = express.Router();

router.post("/scan", (req: express.Request, res: express.Response) => {
  const { uuid } = req.body;
  const member = members.find((member) => member.id === uuid);

  if (!member) {
    res.status(401).json({ message: `The member ${uuid} not found` });
  } else {
    if (!member.history.hasOwnProperty(JST())) {
      member.history = { [JST()]: { enter: {}, exit: {} } };
      enter(member);
      res.status(200).json({ message: `The member ${uuid} entered` });
    } else if (member.history[JST()].exit.status === false) {
      exit(member);
      res.status(200).json({ message: `The member ${uuid} exited` });
    } else {
      res.status(200).json({ message: "Already exited" });
    }
  }
});

const JST = () => {
  const date = new Date();
  date.setTime(
    date.getTime() + (date.getTimezoneOffset() + 9 * 60) * 60 * 1000
  );

  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");

  return `${yyyy}/${mm}/${dd}`;
};

const enter = (member: Member) => {
  member.history[JST()]["enter"] = { status: true, timestamp: Date.now() };
  member.history[JST()]["exit"] = { status: false, timestamp: NaN };
};

const exit = (member: Member) => {
  member.history[JST()].exit = { status: true, timestamp: Date.now() };
};

export { router };
