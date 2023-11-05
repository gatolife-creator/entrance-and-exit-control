import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Avatar from "boring-avatars";

import { uuidState } from "../utils/atom";

const NavbarItem = ({ text, link }: { text: string; link: string }) => (
  <li>
    <Link to={link} className="justify-between flex items-center">
      {text}
    </Link>
  </li>
);

export const Navbar = () => {
  const uuid = useRecoilValue(uuidState);

  const renderAvatar = () => {
    if (uuid) {
      return (
        <Avatar
          size={40}
          name={uuid}
          variant="beam"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      );
    }
    return <div className="w-10 h-10 bg-gray-400 rounded-full" />;
  };

  return (
    <>
      <div className="navbar fixed top-3 left-2 bg-base-100 rounded-3xl shadow-lg w-[calc(100%-1rem)] border border-gray">
        <div className="navbar-start" />
        <div className="navbar-center">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            MetaNuts 🥜
          </Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">{renderAvatar()}</div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <NavbarItem text="Profile" link="#" />
              <NavbarItem text="Settings" link="#" />
              <NavbarItem text="Logout" link="#" />
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-[100px]" />
    </>
  );
};
