/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Header: React.FC = () => {
  const { signOut } = useContext(AuthContext);
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex items-center justify-between flex-wrap bg-blue-600 p-6">
      <div className="flex items-center mr-6">
        <span className="font-bold mr-5 text-lg text-white">Dogs Breeds</span>
      </div>
      <div>
        <button
          onClick={handleSignOut}
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-600 hover:bg-white mt-4 lg:mt-0"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
