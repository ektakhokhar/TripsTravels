import React, { useState, useEffect, useContext } from "react";
import Logo from "./../../assets/images/logo3.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { BiMenu as Menu } from "react-icons/bi";
import { IoClose as X } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, dispatch, role } = useContext(AuthContext);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === "/" || location.pathname === "/home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/home");
    toast.info("Logged Out");
  };

  /* POSITION + BACKGROUND */
  const headerClass = isHome
    ? `absolute top-0 left-0 w-full z-50 ${
        scrolled ? "bg-black/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`
    : "sticky top-0 z-50 bg-white shadow-md";

  const textColor = isHome && !scrolled ? "text-white" : "text-black";

  return (
    <header className={`transition-all duration-300 ${headerClass}`}>
      <nav className="max-w-7xl mx-auto h-[72px] px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/home" className="flex items-center gap-2">
          <img src={Logo} alt="TripsTravels" className="h-10" />
        </Link>

        {/* DESKTOP MENU */}
        <ul className={`hidden md:flex gap-8 font-medium ${textColor}`}>
          {role === "admin" ? (
            <>
              <Link to="/all-booking">Bookings</Link>
              <Link to="/all-tours">Tours</Link>
              <Link to="/create">Create</Link>
            </>
          ) : (
            <>
              <Link to="/home">Home</Link>
              <Link to="/tours">Tours</Link>
              <Link to="/Hotel">Hotels</Link>
              <Link to="/about">Gallery</Link>
              <Link to="/contact">Contact</Link>
            </>
          )}
        </ul>

        {/* RIGHT SIDE */}
        <div className={`hidden md:flex items-center gap-4 ${textColor}`}>
          {user ? (
            <>
              <Link
  to="/my-account"
  className="font-semibold text-BaseColor cursor-pointer hover:underline"
>
  {user.username}
</Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-BaseColor text-white rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-BaseColor">
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-BaseColor text-white rounded-full"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className={`md:hidden ${textColor}`}
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[72px] right-0 h-[calc(100vh-72px)] w-2/3 bg-black/90 backdrop-blur-xl p-6 text-white">
          <ul className="flex flex-col gap-6">
            <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/tours" onClick={() => setMenuOpen(false)}>Tours</Link>
            <Link to="/Hotel" onClick={() => setMenuOpen(false)}>Hotel</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>Gallery</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="mt-4 px-6 py-2 bg-BaseColor rounded-full"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-BaseColor rounded-full text-center"
                >
                  Register
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
