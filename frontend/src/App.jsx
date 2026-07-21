import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import SubmitClaim from "./pages/SubmitClaim";
import Dashboard from "./pages/Dashboard";
import ClaimStatus from "./pages/ClaimStatus";
import Settlement from "./pages/Settlement";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/submit-claim" element={<PageTransition><SubmitClaim /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/claim-status" element={<PageTransition><ClaimStatus /></PageTransition>} />
        <Route path="/settlement" element={<PageTransition><Settlement /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-paper font-body text-ink">
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <footer className="border-t border-line px-5 py-8 text-center text-sm text-muted-light sm:px-8">
          Meridian Claims — demo frontend, no live data connected.
        </footer>
      </div>
    </BrowserRouter>
  );
}
