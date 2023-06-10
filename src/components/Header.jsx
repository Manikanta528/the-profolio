import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaGithub, FaMoon, FaSun, FaSignInAlt } from "react-icons/fa";
import { CgProfile, CgWorkAlt, CgSearch } from "react-icons/cg";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";


const Header = (props) => {
  // eslint-disable-next-line react/prop-types
  const { toggleTheme, theme, flagSignIn, user, currentPage } = props;
  const navigate = useNavigate();

  // to redirect to login 
  const authRedirect = () => {
    navigate("/login");
  };
  const navigation = (nav) => {
    navigate(`/${nav}`);
  };

  // to toggle the menu
  const [menu, setMenu] = useState(true);
  const handleMenu = () => {
    if(menu){
      window.scrollTo(0, 0);
    }
    setMenu(!menu);
  };

  return (
    <>
      <header className="h-20 sticky z-50 top-0 select-none border-0 flex items-center justify-between text-textPrimary dark:text-textPrimaryDark bg-background dark:bg-backgroundDark shadow dark:shadow-background/5 ">
        <h2 className="text-lg font-bold pl-6 md:pl-16 hidden sm:block">
          The Profolio
        </h2>
        <svg
          width="35"
          height="47"
          viewBox="0 0 35 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block sm:hidden pl-6"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 46.5C0.895431 46.5 0 45.6046 0 44.5L0 2C0 0.89543 0.895431 0 2 0L19 0C24.596 0.449763 27.2634 1.3781 31 4.5C34.537 7.45508 34.9619 14.6717 34.9973 15.4344C34.9994 15.481 34.9991 15.5244 34.9974 15.571C34.7884 21.083 33.8301 23.4144 31 26.5C27.0763 30.03 24.5261 31.2866 19 31.5H12C10.8954 31.5 10 32.3954 10 33.5V44.5C10 45.6046 9.10457 46.5 8 46.5H2ZM18 23C21.866 23 25 19.866 25 16C25 12.134 21.866 9.00002 18 9.00002C13.7634 9.00002 12.0111 8.75159 11.3191 9.49294C10.6227 10.239 11 11.9874 11 16C11 20 10.75 21.75 11.5 22.5C12.25 23.25 14 23 18 23Z"
            fill="url(#paint0_linear_3_46)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3_46"
              x1="15"
              y1="11"
              x2="10.5"
              y2="-8.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4FD1C5" />
              <stop offset="0.965234" stopColor="#4FD1C5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {user && (
          <nav className="hidden md:flex text-textSecondary w-80 dark:text-textSecondaryDark justify-around cursor-pointer">
            <h4
              onClick={() => navigation("Discover")}
              className={
                currentPage === "Discover"
                  ? "text-primary underline underline-offset-8"
                  : ""
              }
            >
              Discover
            </h4>
            <h4
              onClick={() => navigation("Find")}
              className={
                currentPage === "Find"
                  ? "text-primary underline underline-offset-8"
                  : ""
              }
            >
              Find
            </h4>
            <h4
              onClick={() => navigation("your-work")}
              className={
                currentPage === "Your Work"
                  ? "text-primary underline underline-offset-8"
                  : ""
              }
            >
              Work
            </h4>
            <h4
              onClick={() => navigation("Profile")}
              className={
                currentPage === "Profile"
                  ? "text-primary underline underline-offset-8"
                  : ""
              }
            >
              Profile
            </h4>
          </nav>
        )}
        <nav className="hidden md:flex items-center pr-6 md:pr-16 gap-4">
          {(theme && (
            <div
              className="p-2 rounded hover:bg-slate-500/20"
              onClick={toggleTheme}
            >
              <FaSun size={18} />
            </div>
          )) || (
              <div
                className="p-2 rounded hover:bg-slate-500/20"
                onClick={toggleTheme}
              >
                <FaMoon size={16} />
              </div>
            )}
          <a
            className="p-2 rounded hover:bg-slate-500/20 "
            href="https://github.com/Manikanta528/the-profolio"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={18} />
          </a>
          {flagSignIn && (
            <button className="text-sm" onClick={authRedirect}>
              {" "}
              Sign in
            </button>
          )}
        </nav>
        {menu ? (
          <HiMenu
            size={18}
            className="block md:hidden mr-6 md:mr-16"
            onClick={handleMenu}
          />
        ) : (
          <RxCross2
            size={18}
            className="block md:hidden mr-6 md:mr-16"
            onClick={handleMenu}
          />
        )}
      </header>
      {!menu && (
        <div className="block z-20 md:hidden w-screen h-auto p-6 pt-0 text-textPrimary  dark:text-textPrimaryDark bg-background dark:bg-backgroundDark border-b-2">
          {user && (
            <nav className="flex flex-col py-2 text-textSecondary dark:text-textSecondaryDark gap-4 cursor-pointer mb-2">
              <h4
                onClick={() => navigation("Discover")}
                className={
                  currentPage === "Discover"
                    ? "text-primary flex gap-4 items-center p-2 hover:bg-slate-500/20 rounded"
                    : "flex gap-4 items-center hover:bg-slate-500/20 p-2 rounded"
                }
              >
                <RiCompassDiscoverLine size={18} />
                <span>Discover</span>
              </h4>
              <h4
                onClick={() => navigation("Find")}
                className={
                  currentPage === "Find"
                    ? "text-primary flex gap-4 items-center p-2 hover:bg-slate-500/20 rounded"
                    : "flex gap-4 items-center hover:bg-slate-500/20 p-2 rounded"
                }
              >
                <CgSearch size={18} />
                <span>Find</span>
              </h4>
              <h4
                onClick={() => navigation("your-work")}
                className={
                  currentPage === "Your Work"
                    ? "text-primary flex gap-4 items-center p-2 hover:bg-slate-500/20 rounded"
                    : "flex gap-4 items-center hover:bg-slate-500/20 p-2 rounded"
                }
              >
                <CgWorkAlt size={18} />
                <span>Work</span>
              </h4>
              <h4
                onClick={() => navigation("Profile")}
                className={
                  currentPage === "Profile"
                    ? "text-primary flex gap-4 items-center p-2 hover:bg-slate-500/20 rounded"
                    : "flex gap-4 items-center hover:bg-slate-500/20 p-2 rounded"
                }
              >
                <CgProfile size={18} />
                <span>Profile</span>
              </h4>
            </nav>
          )}
          { user && <hr className="my-2" />}
          <nav className="flex flex-col gap-4 text-textPrimary  dark:text-textPrimaryDark pt-2 ">
            {(theme && (
              <div
                className="p-2 rounded hover:bg-slate-500/20 flex items-center gap-4"
                onClick={toggleTheme}
              >
                <FaSun size={18} className="inline" /> <span>Dark Mode</span>
              </div>
            )) || (
                <div
                  className="p-2 rounded hover:bg-slate-500/20 flex items-center gap-4"
                  onClick={toggleTheme}
                >
                  <FaMoon size={16} className="inline" /> <span>Light Mode</span>
                </div>
              )}
            <a
              className="p-2 rounded hover:bg-slate-500/20 flex items-center gap-4"
              href="https://github.com/Manikanta528/the-profolio"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={18} className="inline" />
              <span> Contribute</span>
            </a>
            {flagSignIn && (
              <div className="p-2 rounded hover:bg-slate-500/20 flex items-center gap-4">
                <FaSignInAlt className="inline" />{" "}
                <button className="inline text-sm  " onClick={authRedirect}>
                  {" "}
                  Sign in
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
