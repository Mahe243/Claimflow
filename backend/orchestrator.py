"""
ClaimFlow Orchestrator (skeleton).

Mirrors box 0 in the ClaimFlow diagram: validates claim format, launches all
verification agents, waits for all results, and aggregates the responses
into a single PASS/FAIL outcome.
"""
from concurrent.futures import ThreadPoolExecutor
from typing import Any, Dict

from agents import eligibility, fraud, coding, policy

AGENTS = [eligibility, fraud, coding, policy]


def run_orchestration(claim: Dict[str, Any]) -> Dict[str, Any]:
    agent_results: Dict[str, Any] = {}

    with ThreadPoolExecutor(max_workers=len(AGENTS)) as executor:
        futures = {executor.submit(agent.run, claim): agent.AGENT_NAME for agent in AGENTS}
        for future in futures:
            name = futures[future]
            agent_results[name] = future.result()

    all_passed = all(r["result"] == "PASS" for r in agent_results.values())
    total_fee = sum(r.get("fee_usdc", 0.0) for r in agent_results.values())

    return {
        "status": "PASSED" if all_passed else "FAILED",
        "agent_results": agent_results,
        "total_fee_usdc": round(total_fee, 6),
    }