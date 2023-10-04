import { useEffect, useState } from "react";
import { Processing } from "./Processing";

type Props = {
  children?: React.ReactNode;
};
export const RequireAdmin = (props: Props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    checkIsAdmin();
  }, []);

  const checkIsAdmin = async () => {
    setProcessing(true);
    const res = await fetch("/api/members/isAdmin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setIsAdmin(true);
    } else if (res.status !== 401) {
      setIsAdmin(false);
    }
    setProcessing(false);
  };

  return (
    <>
      {isAdmin && props.children}
      {!processing && !isAdmin && (
        <div className="container">
          <p>Admin privilege is required to view this page.</p>
        </div>
      )}
      {processing && <Processing />}
    </>
  );
};
