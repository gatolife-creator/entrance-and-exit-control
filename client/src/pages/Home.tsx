import { useEffect, useState } from "react";
import { Member } from "../../../server/api/members";

export const Home = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch("/api/members", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMembers(data.members);
      });
  }, []);

  const addButtonHandler = () => {
    fetch("/api/members/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "test",
        age: 20,
        gender: "male",
      }),
    });
  };
  return (
    <div>
      <h1 className="text-4xl">Members</h1>
      <ul>
        {members.length > 0 &&
          members.map((member) => <li key={member.id}>{member.name}</li>)}
      </ul>
      <button className="btn btn-primary" onClick={addButtonHandler}>
        add
      </button>
    </div>
  );
};
