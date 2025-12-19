import { Link } from "react-router-dom";

import { useAppContext } from "../contexts/AppContext";

import SignOutButton from "./SignOutButton";
import logo from "../assets/hotel_icon.png";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-900  py-6">
      <div className={`mx-auto flex justify-between px-10 lg:px-50`}>
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/" className="flex gap-1">
            <span>
              <img src={logo} alt="" />
            </span>
            Hotello
          </Link>
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
                className="flex items-center bg-white text-blue-900 px-3 font-bold hover:bg-gray-100 rounded-md"
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
