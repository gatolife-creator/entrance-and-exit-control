import express from "express";
import { Member } from "../utils/member";
import { memberDB } from "./members";
import { MemberDB } from "../utils/memberDB";

const router = express.Router();

router.use(checkAuthorization);

router.get("/members", getMembers);
router.get("/profile", getMemberProfile);
router.post("/add", addMember);
router.get("/attendees", getAttendees);

function checkAuthorization(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { uuid } = req.session;
  console.log(uuid);
  if (!uuid) {
    res.status(401).json({ message: "Unauthorized" });
  } else if (memberDB.isAdmin(uuid)) {
    next();
  } else {
    res.status(401).json({ message: "Not added as an admin" });
  }
}

function getMembers(_: express.Request, res: express.Response) {
  res.json({ members: memberDB.serialize() });
}

function getMemberProfile(req: express.Request, res: express.Response) {
  const { uuid } = req.body;
  const member = memberDB.getMember(uuid);
  if (member) {
    res.json(member);
  } else {
    res.status(404).json({ message: `Member with UUID ${uuid} not found` });
  }
}

function addMember(req: express.Request, res: express.Response) {
  const { name, age, gender } = req.body;
  const newMember = new Member({
    name: name as string,
    age: Number(age),
    gender: gender as "male" | "female",
    role: "member",
  });

  const uuid = memberDB.add(newMember);
  res.status(200).json([uuid, newMember.serialize()]);
}

function getAttendees(
  req: express.Request<any, any, any, { date: string }>,
  res: express.Response
) {
  const date = req.query.date;
  res.json({
    attendees: MemberDB.serialize(memberDB.getAttendeesOnSpecifiedDate(date)),
  });
}

export { router };
