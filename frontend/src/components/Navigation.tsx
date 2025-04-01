import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import { mainNav } from "../config/navigation";
import type { NavLink } from "../config/navigation";

const getDashboardPath = (userType: string | undefined): string => {
  switch (userType) {
    case "admin":
      return "/admin/dashboard";
    case "instructor":
      return "/instructor/dashboard";
    case "student":
      return "/student/dashboard";
    default:
      return "/login";
  }
};

const NavLink = ({ link }: { link: NavLink }) => {
  const location = useLocation();
  const isActive = location.pathname === link.href;

  return (
    <Link
      to={link.href}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive ? "text-primary-500" : "text-gray-300 hover:text-white"
      }`}
    >
      {link.name}
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 rounded-lg bg-white/5"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
};

const MobileNavLink = ({ link }: { link: NavLink }) => {
  const location = useLocation();
  const isActive = location.pathname === link.href;

  return (
    <Link
      to={link.href}
      className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-primary-500/10 text-primary-500"
          : "text-gray-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      {link.name}
    </Link>
  );
};

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-white">ThinkTank</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {mainNav.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}
            {user ? (
              <>
                <NavLink
                  link={{
                    name: "Dashboard",
                    href: getDashboardPath(user.type),
                  }}
                />
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Log out
                </button>
              </>
            ) : (
              <NavLink
                link={{
                  name: "Log in",
                  href: "/login",
                }}
              />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-dark-900/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {mainNav.map((link) => (
                <MobileNavLink key={link.href} link={link} />
              ))}
              {user ? (
                <>
                  <MobileNavLink
                    link={{
                      name: "Dashboard",
                      href: getDashboardPath(user.type),
                    }}
                  />
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors duration-200"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <MobileNavLink
                  link={{
                    name: "Log in",
                    href: "/login",
                  }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
