"""
Fraud Agent (stub).

Real responsibility: detects anomalies, duplicate claims, provider risk
score, and amount checks.
"""
from typing import Any, Dict

AGENT_NAME = "fraud"
FEE_USDC = 0.020


def run(claim: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "agent": AGENT_NAME,
        "result": "PASS",
        "fee_usdc": FEE_USDC,
        "detail": "Stub: no duplicate or anomaly signals detected.",
    }