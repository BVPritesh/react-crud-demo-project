import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

const Header = (): React.ReactElement => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [hideHeader, setHideHeader] = useState<boolean>(false);
  const lastScrollRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  const handleResize = (): void => {
    setIsMobile(window.innerWidth < 768);
  };

  const onScroll = (): void => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100 && currentScroll > lastScrollRef.current) {
      setHideHeader(true); // scrolling down
    } else {
      setHideHeader(false); // scrolling up or near top
    }
    lastScrollRef.current = currentScroll;
  };

  // Handle logout
  const handleLogout = (): void => {
    logout();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  const menuHandler = (): void => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`py-2 md:p-4 bg-blue-500 text-white min-h-12 lg:min-h-[72px] fixed inset-x-0 top-0 z-50 duration-200 transition-all flex items-center ${
        hideHeader ? "-translate-y-full" : menuOpen ? "" : "translate-y-0"
      }`}
    >
      <div className="custom-container flex items-center justify-between">
        <NavLink to="/">Logo Here</NavLink>

        {isMobile && (
          <button
            onClick={menuHandler}
            type="button"
            className="cursor-pointer duration-200 transition-all hover:bg-amber-50/20 md:hidden h-7 w-7 flex items-center justify-center"
          >
            <i className={`fa align-middle ${menuOpen ? "fa-close" : "fa-bars"}`}></i>
          </button>
        )}

        <nav
          className={` ${menuOpen ? "left-0" : "left-full"} bg-blue-500 md:left-0 fixed inset-0 top-12 md:top-0 md:relative duration-200 transition-all z-50 md:z-0`}
        >
          <ul className="flex md:space-x-4 flex-col md:flex-row">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 block md:inline-block hover:bg-amber-200/20 duration-300 transition-all ${isActive ? "bg-amber-200/20" : ""}`
                }
                onClick={() => setMenuOpen(false)}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-4 py-2 block md:inline-block hover:bg-amber-200/20 duration-300 transition-all ${isActive ? "bg-amber-200/20" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                About
              </NavLink>
            </li>

            {!isAuthenticated ? (
              <>
                <li>
                  <NavLink
                    to="/sign-in"
                    className={({ isActive }) =>
                      `px-4 py-2 block md:inline-block hover:bg-amber-200/20 duration-300 transition-all ${isActive ? "bg-amber-200/20" : ""}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sign-up"
                    className={({ isActive }) =>
                      `px-4 py-2 block md:inline-block hover:bg-amber-200/20 duration-300 transition-all ${isActive ? "bg-amber-200/20" : ""}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="px-4 py-2 block md:inline-block hover:bg-amber-200/20 duration-300 transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    Welcome to Dashboard
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="px-4 py-2 block md:inline-block hover:bg-amber-200/20 duration-300 transition-all cursor-pointer">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;