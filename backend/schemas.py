"""
Pydantic schemas for request/response validation.
"""
from datetime import datetime
from typing import Optional, Dict, Any

from pydantic import BaseModel, Field, ConfigDict

from models import ClaimStatus


class ClaimCreate(BaseModel):
    """Payload for POST /claims"""

    provider_name: str = Field(..., examples=["City General Hospital"])
    patient_name: str = Field(..., examples=["Jane Doe"])
    patient_member_id: str = Field(..., examples=["MBR-90210"])

    cpt_code: str = Field(..., examples=["99213"])
    icd_code: str = Field(..., examples=["J06.9"])
    amount: float = Field(..., gt=0, examples=[496.01])

    diagnosis_description: Optional[str] = Field(
        default=None, examples=["Acute upper respiratory infection"]
    )
    notes: Optional[str] = Field(default=None, examples=["Outpatient visit"])


class ClaimResponse(BaseModel):
    """Response shape for a single claim (used by both list and detail)."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    provider_name: str
    patient_name: str
    patient_member_id: str
    cpt_code: str
    icd_code: str
    amount: float
    diagnosis_description: Optional[str] = None
    notes: Optional[str] = None
    status: ClaimStatus
    agent_results: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: datetime