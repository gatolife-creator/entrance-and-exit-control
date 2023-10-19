import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Main } from "../components/Main";
import { RequireAuth } from "../components/RequireAuth";
import { Check } from "../components/Check";

export const Gate = () => {
  const [visible, setVisible] = useState(true);

  const display = () => setVisible(true);
  const hide = () => setVisible(false);

  const QRCodeReader = ({ onRead }: { onRead: (result: string) => void }) => {
    return (
      <QrReader
        scanDelay={1000}
        videoContainerStyle={{ display: visible ? "block" : "none" }}
        onResult={(result) => {
          if (result) {
            onRead(result.getText());
            hide();
            setTimeout(() => {
              display();
            }, 1000);
          }
        }}
        constraints={{ facingMode: undefined }}
      />
    );
  };

  return (
    <>
      <Main>
        <RequireAuth>
          <div className="w-[300px] h-[450px] mx-auto mt-16 border shadow-xl rounded-3xl">
            <div className="g-6 flex h-full flex-wrap items-center justify-center">
              <div className="mb-12 md:mb-0 w-full text-center p-5">
                <QRCodeReader
                  onRead={() => {
                    // play();
                  }}
                />
                {!visible && <Check />}
              </div>
            </div>
          </div>
        </RequireAuth>
      </Main>
    </>
  );
};
