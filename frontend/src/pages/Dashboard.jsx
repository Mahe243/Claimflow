import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CLAIMS, DASHBOARD_STATS } from "../data/dummyData";

const STAGE_STYLES = {
  Settled: "bg-success-light text-success",
  Approved: "bg-success-light text-success",
  "In Review": "bg-primary-light text-primary-dark",
  Verifying: "bg-amber-light text-amber",
};

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-primary">Dashboard</p>
          <h1 className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">
            Welcome back, Aditi
          </h1>
        </div>
        <Link
          to="/submit-claim"
          className="focus-ring rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-paper hover:bg-primary-dark"
        >
          Submit a new claim
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl border border-line bg-surface p-5"
          >
            <p className="text-xs text-muted-light">{stat.label}</p>
            <p className="mt-1.5 font-mono text-2xl text-ink">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Claims list */}
      <div className="mt-10 rounded-2xl border border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-lg font-medium text-ink">Your claims</h2>
          <span className="text-sm text-muted-light">{CLAIMS.length} total</span>
        </div>

        <ul className="divide-y divide-line">
          {CLAIMS.map((claim, i) => (
            <motion.li
              key={claim.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link
                to="/claim-status"
                className="focus-ring flex flex-col gap-3 px-6 py-5 transition-colors hover:bg-paper sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-sm text-ink">{claim.id}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        STAGE_STYLES[claim.status] ?? "bg-line text-muted"
                      }`}
                    >
                      {claim.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {claim.type} · {claim.provider}
                  </p>
                </div>

                <div className="flex items-center gap-6 sm:text-right">
                  <div>
                    <p className="font-mono text-sm text-ink">
                      ₹{claim.amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-light">Submitted {claim.submitted}</p>
                  </div>
                  <ArrowUpRight size={18} className="shrink-0 text-muted-light" />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
