import { useState } from "react";

export const usePass = () => {
  const [processing, setProcessing] = useState(false);
  const [state, setState] = useState<"entered" | "exited" | null>();

  const scan = async (uuid: string) => {
    setProcessing(true);
    const res = await fetch("/api/pass/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid }),
    });

    if (res.status === 200) {
      const data = await res.json();
      if (data.message.includes("entered")) {
        setState("entered");
      } else if (data.message.includes("exited")) {
        setState("exited");
      }
    }
    setProcessing(false);
  };

  return { processing, state, scan };
};
