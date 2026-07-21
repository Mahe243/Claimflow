"""
ClaimFlow backend - FastAPI entrypoint.

Run locally with:
    uvicorn main:app --reload

Then open http://127.0.0.1:8000/docs for interactive Swagger docs.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routers import claims

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ClaimFlow API",
    description=(
        "Agentic settlement infrastructure for healthcare claims. "
        "AI agents verify. Smart contract settles. USDC moves."
    ),
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(claims.router)


@app.get("/", tags=["health"])
def root():
    return {"status": "ok", "service": "ClaimFlow API"}