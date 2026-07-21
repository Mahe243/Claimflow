"""
Policy Agent (stub).

Real responsibility: applies payer-specific rules, deductibles, co-pays,
limits, and exclusions.
"""
from typing import Any, Dict

AGENT_NAME = "policy"
FEE_USDC = 0.010


def run(claim: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "agent": AGENT_NAME,
        "result": "PASS",
        "fee_usdc": FEE_USDC,
        "detail": "Stub: within payer policy limits, no exclusions triggered.",
    }