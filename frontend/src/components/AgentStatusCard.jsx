import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Clock } from "lucide-react";

const STATUS_MAP = {
  complete: {
    icon: CheckCircle2,
    label: "Complete",
    text: "text-success",
    bg: "bg-success-light",
  },
  "in-progress": {
    icon: Loader2,
    label: "In progress",
    text: "text-primary",
    bg: "bg-primary-light",
    spin: true,
  },
  queued: {
    icon: Clock,
    label: "Queued",
    text: "text-muted",
    bg: "bg-line/60",
  },
};

export default function AgentStatusCard({ agent, index = 0 }) {
  const meta = STATUS_MAP[agent.status] ?? STATUS_MAP.queued;
  const Icon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="rounded-2xl border border-line bg-surface p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-display text-base font-medium text-ink">{agent.name}</h4>
          <p className="mt-0.5 text-sm text-muted">{agent.role}</p>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.bg} ${meta.text}`}
        >
          <Icon size={13} className={meta.spin ? "animate-spin" : ""} />
          {meta.label}
        </span>
      </div>
      <p className="mt-4 border-t border-line pt-3 text-sm text-muted">{agent.note}</p>
    </motion.div>
  );
}
