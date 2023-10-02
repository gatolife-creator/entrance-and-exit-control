import { SHA256 } from "crypto-js";

export type MemberType = {
  //   id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  role: "member" | "admin";
  password?: string;
  history: {
    [date: string]: {
      enter: {
        status?: boolean;
        timestamp?: number;
      };
      exit: {
        status?: boolean;
        timestamp?: number;
      };
    };
  };
};

export class Member {
  name: string;
  age: number;
  gender: "male" | "female";
  role: "member" | "admin";
  password?: string;
  history: {
    [date: string]: {
      enter: {
        status?: boolean;
        timestamp?: number;
      };
      exit: {
        status?: boolean;
        timestamp?: number;
      };
    };
  };

  constructor(init: Omit<MemberType, "password" | "history">) {
    this.name = init.name;
    this.age = init.age;
    this.gender = init.gender;
    this.role = init.role;
    this.history = {};
  }

  setPassword(password: string) {
    this.password = SHA256(password).toString();
  }

  isValidPassword(password: string) {
    return this.password === SHA256(password).toString();
  }
}
