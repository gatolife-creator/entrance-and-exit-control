import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { uuidState } from "../utils/atom";

export const useSignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const setUuid = useSetRecoilState(uuidState);
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
      const data = await res.json();
      setUuid(data.uuid);
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
      setUuid(uuid);
    } else if (res.status === 401) {
      notify();
    }
    setProcessing(false);
  };

  return { processing, isSignedIn, signIn };
};
