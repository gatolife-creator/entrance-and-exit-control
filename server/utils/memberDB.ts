import { v4 as uuidv4 } from "uuid";
import { Member, SerializedMemberType } from "./member";

export class MemberDB {
  private members: Map<string, Member>;

  constructor(members?: Map<string, Member>) {
    this.members = members || new Map<string, Member>();
  }

  private getMemberOrThrow(uuid: string): Member {
    const member = this.members.get(uuid);
    if (!member) {
      throw new Error(`The member ${uuid} does not exist`);
    }
    return member;
  }

  private getCurrentDate(): string {
    const date = new Date();
    date.setTime(
      date.getTime() + (date.getTimezoneOffset() + 9 * 60) * 60 * 1000
    );
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  }

  addSpecifiedMember(uuid: string, member: Member) {
    this.members.set(uuid, member);
  }

  add(member: Member): string {
    const uuid = uuidv4();
    this.members.set(uuid, member);
    return uuid;
  }

  delete(uuid: string) {
    this.members.delete(uuid);
  }

  getMember(uuid: string): Member | undefined {
    return this.members.get(uuid);
  }

  getMembers(): Map<string, Member> {
    return this.members;
  }

  private initializeHistory(uuid: string) {
    const member = this.getMemberOrThrow(uuid);
    const date = this.getCurrentDate();
    if (!member.history[date]) {
      member.history[date] = {
        enter: { status: false, timestamp: NaN },
        exit: { status: false, timestamp: NaN },
      };
    }
  }

  private updateHistoryStatus(
    uuid: string,
    type: "enter" | "exit",
    status: boolean
  ) {
    const member = this.getMemberOrThrow(uuid);
    const date = this.getCurrentDate();
    this.initializeHistory(uuid);
    member.history[date][type] = { status, timestamp: Date.now() };
  }

  isEnteredToday(uuid: string): boolean {
    const member = this.getMemberOrThrow(uuid);
    const date = this.getCurrentDate();
    this.initializeHistory(uuid);
    return member.history[date].enter.status as boolean;
  }

  isExitedToday(uuid: string): boolean {
    const member = this.getMemberOrThrow(uuid);
    const date = this.getCurrentDate();
    this.initializeHistory(uuid);
    return member.history[date].exit.status as boolean;
  }

  enter(uuid: string) {
    this.updateHistoryStatus(uuid, "enter", true);
  }

  exit(uuid: string) {
    this.updateHistoryStatus(uuid, "exit", true);
  }

  isExist(uuid: string): boolean {
    return this.members.has(uuid);
  }

  isAdmin(uuid: string): boolean {
    const member = this.getMemberOrThrow(uuid);
    return member.role === "admin";
  }

  isPasswordSetUp(uuid: string): boolean {
    const member = this.getMemberOrThrow(uuid);
    return Boolean(member.getPassword());
  }

  setPassword(uuid: string, password: string) {
    const member = this.getMemberOrThrow(uuid);
    member.setPassword(password);
  }

  isValidPassword(uuid: string, password: string): boolean {
    const member = this.getMemberOrThrow(uuid);
    return member.isValidPassword(password);
  }

  serialize(): [string, SerializedMemberType][] {
    return Array.from(this.members.entries()).map(([id, member]) => [
      id,
      member.serialize(),
    ]);
  }
}
