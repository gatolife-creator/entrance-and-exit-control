import { v4 as uuidv4 } from "uuid";
import { SHA256 } from "crypto-js";
import * as dotenv from "dotenv";

dotenv.config();
const PEPPER = process.env.PEPPER;

if (!PEPPER) {
  console.error("PEPPER is undefined");
}

export type MemberType = {
  name: string;
  age: number;
  gender: "male" | "female";
  role: "member" | "admin";
  password: string;
  salt: string;
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

export type SerializedMemberType = Omit<MemberType, "password" | "salt">;

export class Member {
  name: string;
  age: number;
  gender: "male" | "female";
  role: "member" | "admin";
  private password: string | null;
  private salt: string | null;
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

  constructor(init: Omit<MemberType, "password" | "salt" | "history">) {
    this.name = init.name;
    this.age = init.age;
    this.gender = init.gender;
    this.role = init.role;
    this.history = {};
    this.password = null;
    this.salt = null;
  }

  setPassword(password: string) {
    this.salt = uuidv4();
    this.password = this.stretch(password + this.salt + PEPPER).toString();
  }

  getPassword() {
    return this.password;
  }

  isValidPassword(password: string) {
    return (
      this.password === this.stretch(password + this.salt + PEPPER).toString()
    );
  }

  serialize(): SerializedMemberType {
    return {
      name: this.name,
      age: this.age,
      gender: this.gender,
      role: this.role,
      history: this.history,
    };
  }

  private stretch(message: string) {
    let hash = message;
    for (let i = 0; i < 10000; i++) {
      hash = SHA256(hash).toString();
    }
    return hash;
  }
}
