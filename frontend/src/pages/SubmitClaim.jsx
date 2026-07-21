import { motion } from "framer-motion";
import ClaimForm from "../components/ClaimForm";

export default function SubmitClaim() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-primary">New claim</p>
        <h1 className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">
          Submit a claim
        </h1>
        <p className="mt-3 max-w-lg text-muted">
          Fill in the details below and attach your supporting documents. Once submitted,
          your claim enters the review pipeline and you can track it from your dashboard.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10"
      >
        <ClaimForm />
      </motion.div>
    </div>
  );
}
