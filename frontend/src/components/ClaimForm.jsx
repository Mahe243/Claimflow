import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";

const CLAIM_TYPES = ["Hospitalization", "Outpatient", "Diagnostics", "Pharmacy", "Dental"];

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-light">{hint}</span>}
    </label>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted-light focus-ring focus:border-primary";

export default function ClaimForm() {
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  function handleFiles(e) {
    const incoming = Array.from(e.target.files || []).map((f) => f.name);
    setFiles((prev) => [...prev, ...incoming]);
  }

  function removeFile(name) {
    setFiles((prev) => prev.filter((f) => f !== name));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // No backend yet — this just simulates a submission for the demo.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-3xl border border-line bg-surface px-6 py-16 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-light text-success">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-medium text-ink">Claim received</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Your claim has entered the review pipeline. We'll notify you as each agent
          finishes its check — this usually takes 1–2 business days.
        </p>
        <p className="mt-4 font-mono text-sm text-primary">Reference: CLM-{Math.floor(10000 + Math.random() * 89999)}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="focus-ring mt-8 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper"
        >
          Submit another claim
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Patient name">
          <input required className={inputClass} placeholder="As shown on policy" />
        </Field>
        <Field label="Policy number">
          <input required className={inputClass} placeholder="HC-XXXXX" />
        </Field>

        <Field label="Provider / hospital">
          <input required className={inputClass} placeholder="e.g. Fortis Hospital, Jaipur" />
        </Field>

        <Field label="Claim type">
          <select required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a type
            </option>
            {CLAIM_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label="Amount billed (₹)">
          <input required type="number" min="0" className={inputClass} placeholder="0.00" />
        </Field>

        <Field label="Date of service">
          <input required type="date" className={inputClass} />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Notes for the review team" hint="Optional — any context that might help clinical review.">
            <textarea rows={3} className={`${inputClass} resize-none`} placeholder="e.g. Follow-up visit after surgery on..." />
          </Field>
        </div>
      </div>

      <div className="mt-6">
        <span className="text-sm font-medium text-ink">Supporting documents</span>
        <label className="focus-ring mt-1.5 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-line bg-paper px-6 py-8 text-center hover:border-primary">
          <UploadCloud size={22} className="text-muted" />
          <span className="text-sm text-muted">
            <span className="font-medium text-primary">Click to upload</span> discharge summary, bills, prescriptions
          </span>
          <input type="file" multiple className="hidden" onChange={handleFiles} />
        </label>

        <AnimatePresence>
          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((name) => (
                <motion.li
                  key={name}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center justify-between gap-3 rounded-xl bg-paper px-4 py-2.5 text-sm"
                >
                  <span className="flex items-center gap-2 text-ink">
                    <FileText size={15} className="text-muted" />
                    {name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(name)}
                    className="focus-ring rounded-full p-1 text-muted-light hover:text-danger"
                    aria-label={`Remove ${name}`}
                  >
                    <X size={15} />
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        className="focus-ring mt-8 w-full rounded-full bg-primary py-3.5 text-sm font-medium text-paper transition-colors hover:bg-primary-dark sm:w-auto sm:px-10"
      >
        Submit claim
      </button>
    </form>
  );
}
