import { members } from "./members";

type Pass = {
  code: number;
  timestamp: number;
};

const passes: { [id: string]: Pass } = {};

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const genPass = (uuid: string) => {
  const pass = { code: Math.floor(random(0, 999999)), timestamp: Date.now() };
  passes[uuid] = pass;
  return pass;
};

const checkPass = (uuid: string, code: number) => {
  const pass = passes[uuid];
  if (!pass) {
    return false;
  }
  if (Date.now() - pass.timestamp < 30000) {
    return false;
  }
  if (pass.code === code) {
    return true;
  }
};
