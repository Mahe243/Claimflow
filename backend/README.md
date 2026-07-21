# 🏥 ClaimFlow Backend

## Overview

This is the backend service for **ClaimFlow**, an AI-powered healthcare reimbursement platform built on Arc.

The backend is responsible for:

- Receiving healthcare claims
- Storing claim data
- Coordinating AI verification agents
- Managing claim verification workflow
- Preparing claims for blockchain settlement

---

## Tech Stack

- FastAPI
- Python 3.13
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn

---

## Project Structure

```
backend/
│
├── agents/
│   ├── eligibility.py
│   ├── fraud.py
│   ├── coding.py
│   └── policy.py
│
├── routers/
│   └── claims.py
│
├── services/
│   └── orchestrator.py
│
├── blockchain/
│
├── database.py
├── models.py
├── schemas.py
├── main.py
└── requirements.txt
```

---

## Running the Backend

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the server:

```bash
uvicorn main:app --reload
```

Server:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Current Features

- Submit healthcare claims
- Store claims in SQLite
- Retrieve claim details
- Backend project structure
- AI agent placeholders
- Orchestrator placeholder

---

## Planned Features

- Eligibility Verification Agent
- Fraud Detection Agent
- Medical Coding Validation Agent
- Policy Validation Agent
- Parallel Agent Orchestration
- Smart Contract Integration
- Arc Testnet Settlement
- USDC Payments
- Circle Wallet Integration
- Live Claim Status Updates