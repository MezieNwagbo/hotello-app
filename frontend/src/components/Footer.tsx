import { Link } from "react-router-dom";

import { containerClass } from "../utils";

import logo from "../assets/hotel_icon.png";

const Footer = () => {
  return (
    <div className="bg-blue-900 py-10">
      <div className={`mx-auto flex justify-between px-10 lg:px-50`}>
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/" className="flex gap-1">
            <span>
              <img src={logo} alt="" />
            </span>
            Hotello
          </Link>
        </span>
        <span className="flex gap-4 text-white font-bold tracking-tight">
          <p className="cursor-pointer">Privacy policy</p>
          <p className="cursor-pointer">Terms of service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
