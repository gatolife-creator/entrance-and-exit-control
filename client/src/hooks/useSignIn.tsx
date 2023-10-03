import { useEffect, useState } from "react";

export const useSignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    checkIfSignedIn();
  }, []);

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

  const signIn = async (uuid: string, password: string) => {
    console.log("signin");
    const res = await fetch("/api/auth/signinAsAdmin", {
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
      setIsSignedIn(true);
    }
  };

  return { isSignedIn, signIn };
};
