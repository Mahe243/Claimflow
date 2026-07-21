import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Menu, X } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/submit-claim", label: "Submit a Claim" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/claim-status", label: "Claim Status" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-display text-lg font-medium text-ink focus-ring rounded"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-paper">
            <Activity size={17} strokeWidth={2.4} />
          </span>
          Meridian Claims
        </NavLink>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `focus-ring rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-primary-light text-primary-dark font-medium"
                      : "text-muted hover:text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          to="/submit-claim"
          className="hidden focus-ring rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-primary-dark md:inline-block"
        >
          New Claim
        </NavLink>

        <button
          className="focus-ring rounded-lg p-2 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
          >
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-6 py-3 text-sm ${
                      isActive ? "bg-primary-light text-primary-dark font-medium" : "text-muted"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="px-6 py-3">
              <NavLink
                to="/submit-claim"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-primary px-5 py-2.5 text-center text-sm font-medium text-paper"
              >
                New Claim
              </NavLink>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
