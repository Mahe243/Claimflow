import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, ArrowLeft } from "lucide-react";
import SettlementCard from "../components/SettlementCard";
import { SETTLEMENT } from "../data/dummyData";

export default function Settlement() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <Link
        to="/dashboard"
        className="focus-ring inline-flex items-center gap-1.5 rounded text-sm text-muted hover:text-ink"
      >
        <ArrowLeft size={15} /> Back to dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <p className="text-xs font-medium uppercase tracking-wide text-success">Settled</p>
        <h1 className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">
          Your claim has been settled
        </h1>
        <p className="mt-2 max-w-lg text-muted">
          The Settlement Agent has finished calculating the payout for this claim.
          A summary is below, and a full statement is available to download.
        </p>
      </motion.div>

      <div className="mt-10">
        <SettlementCard settlement={SETTLEMENT} />
      </div>

      <div className="mt-6 flex justify-end">
        <button className="focus-ring flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-surface">
          <Download size={15} /> Download statement
        </button>
      </div>
    </div>
  );
}
