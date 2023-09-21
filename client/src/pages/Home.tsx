import { useEffect, useState } from "react";
import { Member } from "../../../server/api/members";
import { Auth } from "../components/Auth";

export const Home = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isMemberAdded, setIsMemberAdded] = useState(false);

  useEffect(() => {
    getMembers();
  }, [isMemberAdded]);

  const getMembers = async () => {
    const res = await fetch("/api/members", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      setMembers(data.members);
      setIsMemberAdded(true);
    } else {
      console.error(data.message);
    }
  };

  const addButtonHandler = async () => {
    const res = await fetch("/api/members/add", {
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

    const data = await res.json();
    if (res.status === 200) {
      setIsMemberAdded(true);
    } else {
      console.error(data.message);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <Auth>
          <h1 className="text-4xl">Members</h1>
          <ul>
            {members.length > 0 &&
              members.map((member) => (
                <li key={member.id}>
                  {member.id}: {member.name}
                </li>
              ))}
          </ul>
          <button className="btn btn-primary" onClick={addButtonHandler}>
            add
          </button>
        </Auth>
      </div>
    </>
  );
};
