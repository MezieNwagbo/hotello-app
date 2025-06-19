import { Link } from "react-router-dom";

import { containerClass } from "../utils";

const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div
        className={`${containerClass} mx-auto flex justify-between items-center`}
      >
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Hotello</Link>
        </span>
        <span className="flex gap-4 text-white font-bold tracking-tight">
          <p>Privacy policy</p>
          <p>Terms of service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
