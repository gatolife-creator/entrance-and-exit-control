import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Main } from "../components/Main";
import { RequireAuth } from "../components/RequireAuth";
import { usePass } from "../hooks/usePass";
import { Check } from "../components/Check";

export const Gate = () => {
  const [isVisible, setVisible] = useState(true);
  const { state, scan } = usePass();

  const display = () => setVisible(true);
  const hide = () => setVisible(false);

  const QRCodeReader = ({ onRead }: { onRead: (result: string) => void }) => {
    return (
      <>
        {isVisible ? (
          <QrReader
            scanDelay={2000}
            videoContainerStyle={{ display: isVisible ? "block" : "none" }}
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
        ) : (
          <Check />
        )}
      </>
    );
  };

  return (
    <>
      <Main>
        <RequireAuth>
          <div className="w-[300px] h-[450px] mx-auto mt-16 border shadow-xl rounded-3xl">
            <div className="g-6 flex h-full flex-wrap items-center justify-center">
              <div className="mb-12 md:mb-0 w-full text-center p-5">
                {state}
                <QRCodeReader
                  onRead={(text: string) => {
                    scan(text);
                  }}
                />
              </div>
            </div>
          </div>
        </RequireAuth>
      </Main>
    </>
  );
};
