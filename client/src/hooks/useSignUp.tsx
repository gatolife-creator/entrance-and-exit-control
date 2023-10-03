import { useState } from "react";
export const useSignUp = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const checkIfSignedUp = async (uuid: string) => {
    const res = await fetch("/api/auth/isSignedUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid,
      }),
    });

    if (res.status === 200) {
      console.log("Already signed up");
      setIsSignedUp(true);
    } else if (res.status === 401) {
      const { message } = await res.json();
      console.error(message);
      setIsSignedUp(false);
    }
  };

  const signUp = async (uuid: string, password: string) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid,
        password,
      }),
    });

    if (res.status === 200) {
      setIsSignedUp(true);
    } else if (res.status === 401) {
      const { message } = await res.json();
      console.error(message);
      setIsSignedUp(false);
    }
  };

  return { isSignedUp, checkIfSignedUp, signUp };
};
