import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Clock3, FileCheck2, ArrowRight, Sparkles } from "lucide-react";
import { CLAIM_STAGES } from "../data/dummyData";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified at every step",
    text: "Each claim passes through policy, coding, clinical, and risk checks before it's approved — automatically.",
  },
  {
    icon: Clock3,
    title: "Hours, not weeks",
    text: "Most straightforward claims move from submission to settlement in under two days.",
  },
  {
    icon: FileCheck2,
    title: "Full transparency",
    text: "See exactly which stage your claim is in and what each reviewing agent found.",
  },
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3.5 py-1.5 text-xs font-medium text-primary-dark"
            >
              <Sparkles size={13} /> Now processing claims with automated review
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]"
            >
              Health claims that move
              <span className="italic text-primary"> while you wait less.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 max-w-lg text-base text-muted sm:text-lg"
            >
              Submit a claim once. A pipeline of specialist reviewers — policy verification,
              clinical review, risk checks — moves it toward settlement, with visibility
              at every stage.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/submit-claim"
                className="focus-ring group flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-primary-dark"
              >
                Submit a claim
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/dashboard"
                className="focus-ring rounded-full border border-line px-6 py-3.5 text-sm font-medium text-ink hover:bg-surface"
              >
                View dashboard
              </Link>
            </motion.div>
          </div>

          {/* Signature element: the claim pipeline, shown as the hero visual itself */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-line bg-surface p-6 sm:p-8"
          >
            <p className="text-xs uppercase tracking-wide text-muted-light">Every claim's path</p>
            <div className="mt-5 flex flex-col gap-0">
              {CLAIM_STAGES.map((stage, i) => (
                <div key={stage.key} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-xs ${
                        i === 0
                          ? "border-primary bg-primary text-paper"
                          : "border-line bg-paper text-muted-light"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < CLAIM_STAGES.length - 1 && (
                      <span className="h-8 w-px bg-line" />
                    )}
                  </div>
                  <span
                    className={`pb-8 text-sm ${
                      i === 0 ? "font-medium text-ink" : "text-muted"
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
            Built for how claims actually get reviewed
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary-dark">
                  <f.icon size={20} />
                </span>
                <h3 className="mt-4 font-medium text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="rounded-3xl bg-primary-dark px-8 py-14 text-center text-paper sm:px-16">
          <h2 className="font-display text-2xl font-medium sm:text-3xl">
            Have a claim ready to go?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-paper/75 sm:text-base">
            It takes about three minutes to submit, and you can track it from your dashboard
            the moment it's in.
          </p>
          <Link
            to="/submit-claim"
            className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-medium text-primary-dark hover:bg-paper/90"
          >
            Start your claim <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
