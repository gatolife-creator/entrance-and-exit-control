import { useState, useEffect } from "react";
import { SerializedMemberType } from "../../../server/utils/member";

export const useMembers = () => {
  const [members, setMembers] = useState<[string, SerializedMemberType][]>([]);

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    const res = await fetch("/api/admin/members", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      console.log(data.members);
      setMembers(data.members);
    } else {
      console.error(data.message);
    }
  };

  const addMember = async (
    name: string,
    age: number,
    gender: "male" | "female"
  ) => {
    const res = await fetch("/api/admin/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age,
        gender,
      }),
    });

    const data = await res.json();
    if (res.status === 200) {
      const [id, member] = data;
      setMembers([...members, [id, member]]);
    }
  };

  return { members, addMember };
};
