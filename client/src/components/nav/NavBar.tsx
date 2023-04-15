import { AuthState } from "@/context/authContext";
import React from "react";
import { BsRobot } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const { currentUser } = AuthState();
  const { pathname } = useLocation();

  const currentPage = pathname === "/login" ? "/register" : "/login";

  return (
    <nav className="relative bg-white py-5 sm:py-7 z-20">
      <div className="flex justify-between items-center px-4 max-w-screen-xl mx-auto">
        {/* LOGO */}
        <div>
          <h1 className="flex gap-2 items-center font-extrabold text-xl md:text-2xl">
            <span>
              <BsRobot className="text-1xl  text-gray-800" />{" "}
            </span>
            BrainyChat
          </h1>
        </div>

        {/* BUTTONS */}
        <Link to={currentPage} className="block">
          <button className="inline-block py-[6px] px-5 border-2 border-green-500 text-green-500 hover:border-transparent hover:bg-green-500 hover:text-white rounded-lg transition-colors duration-200 sm:py-2 sm:px-6">
            {currentPage.split("/")[1]}
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default NavBar;

// border-2 border-green-500 py-2 px-6 rounded-lg text-gray-500

/* text-gray-800 */

/*
inline-block py-2 px-6 border-2 border-transparent rounded-lg bg-green-500 text-white hover:border-2 hover:border-green-500 hover:bg-white hover:text-green-500
*/
