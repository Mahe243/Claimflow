import { motion } from "framer-motion";
import { Check } from "lucide-react";

// The recurring "pipeline" motif: claims move through a fixed, numbered
// sequence of stages. Used full-size here, and in a compact form on
// dashboard cards.
export default function Timeline({ events }) {
  return (
    <ol className="relative">
      {events.map((event, i) => (
        <motion.li
          key={event.stage}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="relative flex gap-5 pb-10 last:pb-0"
        >
          {i < events.length - 1 && (
            <span
              className={`absolute left-[15px] top-9 h-full w-px ${
                event.done ? "bg-primary" : "bg-line"
              }`}
            />
          )}

          <span
            className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-mono font-medium ${
              event.done
                ? "border-primary bg-primary text-paper"
                : event.active
                ? "border-primary bg-paper text-primary"
                : "border-line bg-surface text-muted-light"
            }`}
          >
            {event.done ? (
              <Check size={15} strokeWidth={3} />
            ) : (
              <span>{String(i + 1).padStart(2, "0")}</span>
            )}
            {event.active && (
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-primary"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </span>

          <div className="pt-0.5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <h4
                className={`font-medium ${
                  event.active ? "text-ink" : event.done ? "text-ink" : "text-muted"
                }`}
              >
                {event.title}
              </h4>
              <span className="font-mono text-xs text-muted-light">{event.timestamp}</span>
            </div>
            <p className="mt-1 max-w-md text-sm text-muted">{event.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
