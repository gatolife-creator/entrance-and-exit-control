import { FormEvent, useState } from "react";
import { QrReader } from "react-qr-reader";

export const Auth = () => {
  const [uuid, setUuid] = useState("");
  const [isReaderOn, setIsReaderOn] = useState(false);
  const [isRead, setIsRead] = useState(false);

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
        password: e.currentTarget.textContent,
      }),
    });

    if (res.status === 200) {
      console.log("successfully logged in");
    }
  };

  return (
    <div className="w-[300px] h-[450px] mx-auto mt-16 border shadow-xl rounded-lg">
      <div className="g-6 flex h-full flex-wrap items-center justify-center">
        <div className="mb-12 md:mb-0 w-full text-center p-5">
          {!isRead && (
            <>
              {isReaderOn && (
                <QrReader
                  onResult={async (result) => {
                    console.log(result?.getText());
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
                />
              )}
              <button className="btn btn-primary mt-5" onClick={clickHandler}>
                Read QRCode
              </button>
            </>
          )}
          {isRead && (
            <>
              <form onSubmit={submitHandler}>
                <h1 className="text-2xl">Successful scanned!</h1>
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
                    id="exampleFormControlInput22"
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
        </div>
      </div>
    </div>
  );
};
