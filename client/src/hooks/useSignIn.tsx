import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useSignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [processing, setProcessing] = useState(false);
  const notify = () =>
    toast.error("Fail to sign in", { position: "bottom-right" });

  useEffect(() => {
    checkIfSignedIn();
  }, []);

  const checkIfSignedIn = async () => {
    setProcessing(true);
    const res = await fetch("/api/auth/isSignedIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setIsSignedIn(true);
    }
    setProcessing(false);
  };

  const signIn = async (uuid: string, password: string) => {
    setProcessing(true);
    const res = await fetch("/api/auth/signin", {
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
    } else if (res.status === 401) {
      notify();
    }
    setProcessing(false);
  };

  return { processing, isSignedIn, signIn };
};
