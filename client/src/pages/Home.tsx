import { useEffect, useState } from "react";
import { Member } from "../../../server/api/members";
import { Auth } from "../components/Auth";

export const Home = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isMemberAdded, setIsMemberAdded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

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
    setIsMemberAdded(false);
    checkIfSignedIn();
    console.log("run");
  }, [isMemberAdded]);

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
    })
      .then((response) => response.json())
      .then(() => {
        if (!isMemberAdded) {
          setIsMemberAdded(true);
        }
      });
  };

  // const signInAsAdminHandler = async () => {
  //   const res = await fetch("/api/auth/signinAsAdmin", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       password: "this is the test password",
  //     }),
  //   });

  //   if (res.status === 200) {
  //     setIsSignedIn(true);
  //   }
  // };

  const checkIfSignedIn = async () => {
    const res = await fetch("/api/auth/isSignedIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setIsSignedIn(true);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        {isSignedIn && (
          <>
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
          </>
        )}
        {!isSignedIn && <Auth />}
      </div>
    </>
  );
};
