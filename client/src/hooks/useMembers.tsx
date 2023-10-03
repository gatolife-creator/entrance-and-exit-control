import { useState, useEffect } from "react";
import { Member } from "../../../server/utils/member";

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    const res = await fetch("/api/members", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      setMembers(Array.from(data.members));
    } else {
      console.error(data.message);
    }
  };

  return { members, setMembers };
};
