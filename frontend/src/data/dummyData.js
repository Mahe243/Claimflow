// Dummy data — no backend wired up yet.
// The lifecycle every claim moves through. This is a real sequence,
// so numbering it is meaningful (not decorative).
export const CLAIM_STAGES = [
  { key: "submitted", label: "Submitted" },
  { key: "verification", label: "Verification" },
  { key: "review", label: "Medical Review" },
  { key: "approved", label: "Approved" },
  { key: "settled", label: "Settled" },
];

export const AGENTS = [
  {
    id: "agent-intake",
    name: "Intake Agent",
    role: "Document & policy verification",
    status: "complete",
    note: "Confirmed policy #HC-88213 is active, matched patient ID.",
  },
  {
    id: "agent-coder",
    name: "Coding Agent",
    role: "Procedure & diagnosis coding",
    status: "complete",
    note: "Mapped 3 line items to ICD-10 / CPT codes.",
  },
  {
    id: "agent-review",
    name: "Medical Review Agent",
    role: "Clinical necessity check",
    status: "in-progress",
    note: "Cross-checking treatment against policy coverage rules.",
  },
  {
    id: "agent-fraud",
    name: "Risk & Fraud Agent",
    role: "Anomaly detection",
    status: "queued",
    note: "Waiting on medical review to complete.",
  },
  {
    id: "agent-settlement",
    name: "Settlement Agent",
    role: "Payout calculation",
    status: "queued",
    note: "Not started.",
  },
];

export const CLAIMS = [
  {
    id: "CLM-10492",
    patient: "Aditi Sharma",
    provider: "Fortis Hospital, Jaipur",
    type: "Hospitalization",
    amount: 84500,
    submitted: "2026-07-14",
    stage: "review",
    status: "In Review",
  },
  {
    id: "CLM-10488",
    patient: "Rahul Verma",
    provider: "Apollo Clinic",
    type: "Outpatient",
    amount: 6200,
    submitted: "2026-07-12",
    stage: "settled",
    status: "Settled",
  },
  {
    id: "CLM-10475",
    patient: "Meera Nair",
    provider: "Manipal Hospital",
    type: "Diagnostics",
    amount: 3150,
    submitted: "2026-07-09",
    stage: "approved",
    status: "Approved",
  },
  {
    id: "CLM-10461",
    patient: "Aditi Sharma",
    provider: "CarePlus Pharmacy",
    type: "Pharmacy",
    amount: 980,
    submitted: "2026-07-05",
    stage: "verification",
    status: "Verifying",
  },
];

export const TIMELINE_EVENTS = [
  {
    stage: "submitted",
    title: "Claim submitted",
    timestamp: "14 Jul, 09:12 AM",
    description: "Claim CLM-10492 received with 3 supporting documents.",
    done: true,
  },
  {
    stage: "verification",
    title: "Policy verified",
    timestamp: "14 Jul, 09:14 AM",
    description: "Intake Agent confirmed active policy and patient match.",
    done: true,
  },
  {
    stage: "review",
    title: "Medical review in progress",
    timestamp: "14 Jul, 11:30 AM",
    description: "Medical Review Agent is checking clinical necessity against policy terms.",
    done: false,
    active: true,
  },
  {
    stage: "approved",
    title: "Approval decision",
    timestamp: "Pending",
    description: "Awaiting outcome of medical review and risk check.",
    done: false,
  },
  {
    stage: "settled",
    title: "Settlement issued",
    timestamp: "Pending",
    description: "Payout will be calculated once the claim is approved.",
    done: false,
  },
];

export const SETTLEMENT = {
  claimId: "CLM-10488",
  patient: "Rahul Verma",
  billedAmount: 6200,
  approvedAmount: 5580,
  deduction: 620,
  deductionReason: "Co-pay per policy terms (10%)",
  payoutMethod: "Bank transfer",
  payoutDate: "18 Jul 2026",
  reference: "STL-88213-004",
};

export const DASHBOARD_STATS = [
  { label: "Active claims", value: "4" },
  { label: "Avg. processing time", value: "1.8 days" },
  { label: "Approved this month", value: "₹94,850" },
  { label: "Pending your action", value: "1" },
];
