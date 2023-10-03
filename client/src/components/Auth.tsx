import { FormEvent, useState } from "react";
import { QrReader } from "react-qr-reader";

import { useSignUp } from "../hooks/useSignUp";
import { useSignIn } from "../hooks/useSignIn";

type Props = {
  children?: React.ReactNode;
};

export const Auth = (props: Props) => {
  const [uuid, setUuid] = useState("");
  const [password, setPassword] = useState("");
  const [isReaderOn, setIsReaderOn] = useState(false);
  const [isRead, setIsRead] = useState(false);

  const { isSignedUp, checkIfSignedUp, signUp } = useSignUp();
  const { isSignedIn, signIn } = useSignIn();

  const clickHandler = () => {
    setIsReaderOn(true);
  };

  const signUpHandler = async (e: FormEvent) => {
    e.preventDefault();
    await signUp(uuid, password);
  };

  const signInHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = (e.target as HTMLFormElement).password.value;
    await signIn(uuid, password);
  };

  const PasswordForm = () => {
    return (
      <div className="w-[300px] h-[450px] mx-auto mt-16 border shadow-xl rounded-3xl">
        <div className="g-6 flex h-full flex-wrap items-center justify-center">
          <div className="mb-12 md:mb-0 w-full text-center p-5">
            {!isRead && isReaderOn && (
              <>
                <QrReader
                  onResult={(result) => {
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
                      checkIfSignedUp(result.getText());
                      setUuid(result.getText());
                    }
                  }}
                  constraints={{ facingMode: undefined }}
                />
              </>
            )}
            {!isRead && (
              <button className="btn btn-primary mt-5" onClick={clickHandler}>
                Read QRCode
              </button>
            )}
            {isRead && isSignedUp && (
              <>
                <form onSubmit={signInHandler}>
                  <h1 className="text-2xl">Successfully scanned!</h1>
                  <p className="text-lg">Please complete your password.</p>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      name="id"
                      className="input input-bordered w-full max-w-xs"
                      id="id"
                      placeholder="id"
                      defaultValue={uuid}
                      hidden
                    />
                  </div>

                  <div className="relative mb-6">
                    <input
                      type="password"
                      name="password"
                      className="input input-bordered w-full max-w-xs"
                      id="password"
                      autoComplete="true"
                      placeholder="Password"
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

            {isRead && !isSignedUp && (
              <>
                <form onSubmit={signUpHandler}>
                  <h1 className="text-2xl">Successfully scanned!</h1>
                  <p className="text-lg">Please set up your password first.</p>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      id="id"
                      placeholder="id"
                      defaultValue={uuid}
                      onChange={(e) => setUuid(e.target.value)}
                      hidden
                    />
                  </div>

                  <div className="relative mb-6">
                    <input
                      type="password"
                      className="input input-bordered w-full max-w-xs"
                      id="password"
                      autoComplete="true"
                      placeholder="Password"
                    />
                  </div>
                  {/* <div className="reactive mb-6" data-to-input-wrapper-init>
                    <input
                      type="password"
                      className="input input-bordered w-full max-w-xs"
                      id="password-confirm"
                      autoComplete="false"
                      placeholder="Password confirmation"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div> */}

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
    );
  };

  return (
    <>
      {!isSignedIn && <PasswordForm />}
      {isSignedIn && props.children}
    </>
  );
};
