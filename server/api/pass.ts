import express from "express";
import { members } from "./members";

const router = express.Router();

router.post("/enter", (req: express.Request, res: express.Response) => {
  const { uuid } = req.body;
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

// const enter = (uuid: string) => {
//   for (const member of members) {
//     if (member.id === uuid) {
//       if (member.history.hasOwnProperty(JST())) {
//       }
//       break;
//     }
//   }
// };

// const exit = (uuid: string) => {};
