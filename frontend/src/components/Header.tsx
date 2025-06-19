import { Link } from "react-router-dom";

import { containerClass } from "../utils";
import { useAppContext } from "../contexts/AppContext";

import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className={`${containerClass} mx-auto flex justify-between`}>
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Hotello</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center font-bold px-3 text-white  hover:bg-blue-600"
              >
                My bookings
              </Link>
              <Link
                to="/my-hotels"
                className="flex items-center px-3 text-white font-bold hover:bg-blue-600"
              >
                My hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              {" "}
              <Link
                to="/sign-in"
                className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                Sign in
              </Link>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
