"""
Claims API router.
"""
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Claim, ClaimStatus
from schemas import ClaimCreate, ClaimResponse
from orchestrator import run_orchestration

router = APIRouter(prefix="/claims", tags=["claims"])


@router.post("", response_model=ClaimResponse, status_code=201)
def submit_claim(payload: ClaimCreate, db: Session = Depends(get_db)):
    claim = Claim(
        provider_name=payload.provider_name,
        patient_name=payload.patient_name,
        patient_member_id=payload.patient_member_id,
        cpt_code=payload.cpt_code,
        icd_code=payload.icd_code,
        amount=payload.amount,
        diagnosis_description=payload.diagnosis_description,
        notes=payload.notes,
        status=ClaimStatus.IN_REVIEW,
    )
    db.add(claim)
    db.commit()
    db.refresh(claim)

    outcome = run_orchestration(
        {
            "id": claim.id,
            "provider_name": claim.provider_name,
            "patient_name": claim.patient_name,
            "patient_member_id": claim.patient_member_id,
            "cpt_code": claim.cpt_code,
            "icd_code": claim.icd_code,
            "amount": claim.amount,
            "diagnosis_description": claim.diagnosis_description,
            "notes": claim.notes,
        }
    )

    claim.status = ClaimStatus.PASSED if outcome["status"] == "PASSED" else ClaimStatus.FAILED
    claim.agent_results = outcome["agent_results"]
    db.commit()
    db.refresh(claim)

    return claim


@router.get("", response_model=List[ClaimResponse])
def list_claims(db: Session = Depends(get_db)):
    return db.query(Claim).order_by(Claim.created_at.desc()).all()


@router.get("/{claim_id}", response_model=ClaimResponse)
def get_claim(claim_id: str, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if claim is None:
        raise HTTPException(status_code=404, detail=f"Claim '{claim_id}' not found")
    return claim