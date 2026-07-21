import { motion } from "framer-motion";
import Timeline from "../components/Timeline";
import AgentStatusCard from "../components/AgentStatusCard";
import { TIMELINE_EVENTS, AGENTS } from "../data/dummyData";

export default function ClaimStatus() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-primary">Claim CLM-10492</p>
          <h1 className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">
            Currently in medical review
          </h1>
          <p className="mt-2 text-muted">Aditi Sharma · Fortis Hospital, Jaipur · ₹84,500 billed</p>
        </div>
        <span className="rounded-full bg-primary-light px-4 py-2 text-sm font-medium text-primary-dark">
          Est. 1 day remaining
        </span>
      </motion.div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <section>
          <h2 className="font-display text-lg font-medium text-ink">Claim timeline</h2>
          <div className="mt-6">
            <Timeline events={TIMELINE_EVENTS} />
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-medium text-ink">Review agents</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {AGENTS.map((agent, i) => (
              <AgentStatusCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
