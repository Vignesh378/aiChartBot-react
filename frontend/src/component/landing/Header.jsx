import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom";
import {Bot, Menu,X} from "lucide-react";
import ProfileDropdown from "../layouts/ProfileDropdown .jsx"
import Button from "../ui/Button"
import {useAuth} from "../../context/AuthContext"

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate= useNavigate();
  const {isAuthenticated,user,logout }= useAuth() ;
 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-black ${
        isScrolled ? "bg-black/95 backdrop-blur-sm shadow-lg " : "bg-white/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-900 rounded-xl flex items-center justify-center  ">
              <Bot className="w-4 h-4 text-white  " />
            </div>
            <span className="text-xl font-bold text-white">
              AI Chat Bot
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <a
              href="#features"
              className="text-white font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-white  font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-white  font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full"
            >
              FAQ
            </a>
          </div>

          {/* Profile or Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                onLogout={logout}
              />
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:scale-110 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-950 to-blue-900 text-white px-4 py-3 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105 hover:shadow-2xl transform"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-black hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {
        isMenuOpen &&(
            <div className="lg:hidden absolute top-full left-0 right-0 bg-black border-b border-white-50 shadow-lg ">
                <div className="px- pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="#features" 
                    className="block px-4 py-3 text-white hover:text-black hover:bg-white hover:rounded-lg font-medium transtion-color duration-200 ">
                        Features
                    </a>
                    <a href="#testimonials" 
                    className="block px-4 py-3 text-white hover:text-black hover:bg-white hover:rounded-lg font-medium transtion-color duration-200 ">
                        Testimonials
                    </a>
                    <a
                    href="#faq"
                    className="block px-4 py-3 text-white hover:text-black hover:bg-white  hover:rounded-lg font-medium transtion-color duration-200"
                    >
                    FAQ
                    </a>
                    <div className="border-t border-gray-200 my-2"></div>
                      {isAuthenticated ? (
                        <div className="p-4">
                          <Button
                            onClick={() => navigate("/generate")}
                          className="w-full text-white ">Start Chart with bot</Button>
                        </div>
                      ) : (
                        <>
                        <Link
                        to='/login'
                        className="block px-4 py-3 text-white hover:text-gray-900 hover:bg-gray-50  hover:rounded-lg font-medium transtion-color duration-200 ">
                          Login
                          </Link>
                        <Link
                        to="/register"
                        className="block w-full text-left bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200  "
                        >
                          Sign Up
                        </Link>
                          </>)}
                    
                </div>
            </div>
        )
      }

    </header>
  );
}

export default Header;

