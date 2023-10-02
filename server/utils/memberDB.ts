import { v4 as uuidv4 } from "uuid";
import { Member } from "./member";

export class MemberDB {
  private members: Map<string, Member>;
  constructor(members?: Map<string, Member>) {
    this.members = members || new Map<string, Member>();
  }

  add(member: Member) {
    const uuid = uuidv4();
    this.members.set(uuid, member);
    return uuid;
  }

  delete(uuid: string) {
    this.members.delete(uuid);
  }

  getMember(uuid: string) {
    return this.members.get(uuid);
  }

  getMembers() {
    return Array.from(this.members);
  }

  historyInitToday(uuid: string) {
    const member = this.getMember(uuid);
    const date = JST();
    if (!member) {
      throw new Error(`The member ${uuid} is not exist`);
    }
    if (!member.history.hasOwnProperty(date)) {
      member.history = { [date]: { enter: {}, exit: {} } };
    }
  }

  isEnteredToday(uuid: string) {
    const member = this.getMember(uuid);
    const date = JST();
    if (!member) {
      throw new Error(`The member ${uuid} is not exist`);
    }
    return member.history[date].enter.status;
  }

  isExitedToday(uuid: string) {
    const member = this.getMember(uuid);
    const date = JST();
    if (!member) {
      throw new Error(`The member ${uuid} is not exist`);
    }
    return member.history[date].exit.status;
  }

  enter(uuid: string) {
    const member = this.getMember(uuid);
    if (member) {
      member.history[JST()]["enter"] = {
        status: true,
        timestamp: Date.now(),
      };
      member.history[JST()]["exit"] = { status: false, timestamp: NaN };
    }
  }

  exit(uuid: string) {
    const member = this.getMember(uuid);
    if (member) {
      member.history[JST()].exit = { status: true, timestamp: Date.now() };
    }
  }

  isExist(uuid: string) {
    const member = this.getMember(uuid);
    if (member) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(uuid: string) {
    if (!this.isExist(uuid)) {
      throw new Error(`The member ${uuid} is not exist`);
    }
    return this.getMember(uuid)?.role === "admin";
  }

  isPasswordSetUp(uuid: string) {
    if (!this.isExist(uuid)) {
      throw new Error(`The member ${uuid} is not exist`);
    }
    if (this.getMember(uuid)?.getPassword()) {
      return true;
    } else {
      return false;
    }
  }

  setPassword(uuid: string, password: string) {
    if (!this.isExist(uuid)) {
      throw new Error(`The member ${uuid} is not exist`);
    }
    this.getMember(uuid)?.setPassword(password);
  }

  isValidPassword(uuid: string, password: string) {
    if (!this.isExist(uuid)) {
      throw new Error(`The member ${uuid} is not exist`);
    }
    return this.getMember(uuid)?.isValidPassword(password);
  }
}

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
