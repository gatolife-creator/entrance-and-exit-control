import { FormEvent, useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

type Props = {
  children?: React.ReactNode;
};

export const Auth = (props: Props) => {
  const [uuid, setUuid] = useState("");
  const [password, setPassword] = useState("");
  const [isReaderOn, setIsReaderOn] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    checkIfSignedIn();
  }, []);

  const clickHandler = () => {
    setIsReaderOn(true);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
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
      setIsValid(true);
    }
  };

  const checkIfSignedIn = async () => {
    const res = await fetch("/api/auth/isSignedIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setIsValid(true);
    }
  };

  return (
    <>
      {!isValid && (
        <div className="w-[300px] h-[450px] mx-auto mt-16 border shadow-xl rounded-3xl">
          <div className="g-6 flex h-full flex-wrap items-center justify-center">
            <div className="mb-12 md:mb-0 w-full text-center p-5">
              {!isRead && (
                <>
                  {isReaderOn && (
                    <QrReader
                      onResult={async (result) => {
                        if (result) {
                          navigator.mediaDevices
                            .getUserMedia({
                              audio: false,
                              video: true,
                            })
                            .then((stream) => {
                              stream.getTracks().forEach(function (track) {
                                track.stop();
                                track.enabled = false;
                              });
                            });
                          setIsRead(true);
                          setUuid(result.getText());
                        }
                      }}
                      constraints={{ facingMode: undefined }}
                    />
                  )}
                  <button
                    className="btn btn-primary mt-5"
                    onClick={clickHandler}
                  >
                    Read QRCode
                  </button>
                </>
              )}
              {isRead && (
                <>
                  <form onSubmit={submitHandler}>
                    <h1 className="text-2xl">Successfully scanned!</h1>
                    <p className="text-lg">Please complete your password.</p>
                    <div className="relative mb-6" data-te-input-wrapper-init>
                      <input
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        id="id"
                        placeholder="id"
                        defaultValue={uuid}
                        hidden
                      />
                    </div>

                    <div className="relative mb-6" data-te-input-wrapper-init>
                      <input
                        type="password"
                        className="input input-bordered w-full max-w-xs"
                        id="password"
                        autoComplete="true"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-success"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {isValid && props.children}
    </>
  );
};
