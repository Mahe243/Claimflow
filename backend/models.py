"""
SQLAlchemy ORM models for ClaimFlow.
"""
import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, Float, DateTime, Enum as SqlEnum, JSON

from database import Base


def generate_uuid() -> str:
    return str(uuid.uuid4())


class ClaimStatus(str, enum.Enum):
    SUBMITTED = "SUBMITTED"        # just received by ClaimFlow orchestrator
    IN_REVIEW = "IN_REVIEW"        # agents currently verifying
    PASSED = "PASSED"              # all agents passed, ready for escrow/settlement
    FAILED = "FAILED"              # at least one agent failed, no funds released
    SETTLED = "SETTLED"            # atomic USDC settlement completed on Arc


class Claim(Base):
    __tablename__ = "claims"

    # Internal primary key + external-friendly UUID id
    id = Column(String, primary_key=True, default=generate_uuid, index=True)

    # --- Core claim fields (mirrors "Claim Submitted" box in the diagram) ---
    provider_name = Column(String, nullable=False)
    patient_name = Column(String, nullable=False)
    patient_member_id = Column(String, nullable=False)

    cpt_code = Column(String, nullable=False)      # procedure code
    icd_code = Column(String, nullable=False)      # diagnosis code
    amount = Column(Float, nullable=False)          # claimed amount, e.g. USD

    diagnosis_description = Column(String, nullable=True)
    notes = Column(String, nullable=True)

    # --- Workflow / agent state ---
    status = Column(SqlEnum(ClaimStatus), default=ClaimStatus.SUBMITTED, nullable=False)

    # Stores each agent's stubbed/real verification result as JSON, e.g.:
    # {
    #   "eligibility": {"result": "PASS", "fee_usdc": 0.001, "detail": "..."},
    #   "fraud": {"result": "PASS", "fee_usdc": 0.020, "detail": "..."},
    #   "coding": {"result": "PASS", "fee_usdc": 0.030, "detail": "..."},
    #   "policy": {"result": "PASS", "fee_usdc": 0.010, "detail": "..."}
    # }
    agent_results = Column(JSON, nullable=True, default=dict)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )