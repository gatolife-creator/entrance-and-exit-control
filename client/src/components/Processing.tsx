import { PuffLoader } from "react-spinners";

export const Processing = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <PuffLoader color="#3498DB" />
    </div>
  );
};
