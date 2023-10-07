import { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { QrReader } from "react-qr-reader";
import { useSignUp } from "../hooks/useSignUp";
import { useSignIn } from "../hooks/useSignIn";
import { uuidState } from "../utils/atom";

type Props = {
  children?: React.ReactNode;
};

const QRCodeReader = ({ onRead }: { onRead: (result: string) => void }) => {
  const [isReaderOn, setIsReaderOn] = useState(false);

  const clickHandler = () => {
    setIsReaderOn(true);
  };

  return (
    <>
      {!isReaderOn && (
        <button className="btn btn-primary mt-5" onClick={clickHandler}>
          Read QRCode
        </button>
      )}
      {isReaderOn && (
        <QrReader
          onResult={(result) => {
            if (result) {
              setIsReaderOn(false);
              onRead(result.getText());
            }
          }}
          constraints={{ facingMode: undefined }}
        />
      )}
    </>
  );
};

const AuthForm = ({
  uuid,
  isSignedUp,
  signInHandler,
  signUpHandler,
}: {
  uuid: string;
  isRead: boolean;
  isSignedUp: boolean;
  signInHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  signUpHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const setUuid = useSetRecoilState(uuidState);
  return (
    <form onSubmit={(e) => (isSignedUp ? signInHandler(e) : signUpHandler(e))}>
      <h1 className="text-2xl">Successfully scanned!</h1>
      <p className="text-lg">
        Please {isSignedUp ? "complete your" : "set up your"} password.
      </p>
      <div className="relative mb-6">
        <input
          type="text"
          name="id"
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
          {isSignedUp ? "Login" : "Sign up"}
        </button>
      </div>
    </form>
  );
};

export const RequireAuth = (props: Props) => {
  const [uuid, setUuid] = useState("");
  const [isRead, setIsRead] = useState(false);
  const { isSignedUp, checkIfSignedUp, signUp } = useSignUp();
  const { processing, isSignedIn, signIn } = useSignIn();

  const signInHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = (e.target as HTMLFormElement).password.value;
    await signIn(uuid, password);
  };

  const signUpHandler = async (e: FormEvent) => {
    e.preventDefault();
    const password = (e.target as HTMLFormElement).password.value;
    await signUp(uuid, password);
  };

  const handleRead = (result: string) => {
    setIsRead(true);
    checkIfSignedUp(result);
    setUuid(result);
  };

  return (
    <>
      {!processing && !isSignedIn && (
        <div className="w-[300px] h-[450px] mx-auto mt-16 border shadow-xl rounded-3xl">
          <div className="g-6 flex h-full flex-wrap items-center justify-center">
            <div className="mb-12 md:mb-0 w-full text-center p-5">
              {!isRead && <QRCodeReader onRead={handleRead} />}
              {isRead && (
                <AuthForm
                  uuid={uuid}
                  isRead={isRead}
                  isSignedUp={isSignedUp}
                  signInHandler={signInHandler}
                  signUpHandler={signUpHandler}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {!processing && isSignedIn && props.children}
    </>
  );
};
