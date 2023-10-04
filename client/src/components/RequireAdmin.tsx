import { useEffect, useState } from "react";

type Props = {
  children?: React.ReactNode;
};

export const RequireAdmin = (props: Props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkIsAdmin();
  }, []);

  const checkIsAdmin = async () => {
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
  };

  return (
    <>
      {isAdmin && props.children}
      {!isAdmin && (
        <>
          <p>Admin privilege is required to view this page.</p>
        </>
      )}
    </>
  );
};
