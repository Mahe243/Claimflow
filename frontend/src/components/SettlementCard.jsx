import { motion } from "framer-motion";
import { ArrowDownRight, Banknote, CalendarCheck2 } from "lucide-react";

function formatINR(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function SettlementCard({ settlement }) {
  const s = settlement;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl border border-line bg-surface"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 bg-primary-dark px-6 py-5 text-paper sm:px-8">
        <div>
          <p className="text-xs uppercase tracking-wide text-paper/70">Settlement · {s.claimId}</p>
          <p className="mt-1 font-display text-2xl font-medium">{s.patient}</p>
        </div>
        <span className="rounded-full bg-paper/15 px-3 py-1 text-xs font-medium">
          Ref {s.reference}
        </span>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
        <div>
          <p className="text-sm text-muted">Billed amount</p>
          <p className="mt-1 font-mono text-xl text-ink">{formatINR(s.billedAmount)}</p>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-light px-3 py-2.5 text-sm text-amber">
            <ArrowDownRight size={16} className="mt-0.5 shrink-0" />
            <span>
              <span className="font-medium">{formatINR(s.deduction)} deducted</span> — {s.deductionReason}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted">Approved payout</p>
          <p className="mt-1 font-mono text-3xl font-medium text-success">
            {formatINR(s.approvedAmount)}
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted">
              <Banknote size={15} /> {s.payoutMethod}
            </div>
            <div className="flex items-center gap-2 text-muted">
              <CalendarCheck2 size={15} /> Disbursed {s.payoutDate}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
