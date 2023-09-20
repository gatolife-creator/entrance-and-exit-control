import { useEffect, useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

export const Auth = () => {
  const [isReaderOn, setIsReaderOn] = useState(false);
  const clickHandler = () => {
    setIsReaderOn(true);
  };
  const onNewScanResult = (decodedText: string) => {
    console.log(decodedText);
    (
      document.querySelector(
        "#html5-qrcode-button-camera-stop"
      ) as HTMLButtonElement
    ).click();
    setIsReaderOn(false);
  };

  useEffect(() => {
    if (document.querySelector("#html5-qrcode-button-camera-permission")) {
      (
        document.querySelector(
          "#html5-qrcode-button-camera-permission"
        ) as HTMLButtonElement
      ).click();
    }
  }, [isReaderOn]);

  return (
    <div className="w-[300px] h-[450px] mx-auto mt-16 border shadow-xl rounded-lg">
      <div className="g-6 flex h-full flex-wrap items-center justify-center">
        <div className="mb-12 md:mb-0 w-full text-center">
          {isReaderOn && (
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
            />
          )}

          <button className="btn btn-primary mt-5" onClick={clickHandler}>
            Read QRCode
          </button>
        </div>
      </div>
    </div>
  );
};
