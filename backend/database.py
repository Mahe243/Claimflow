"""
Database configuration for ClaimFlow.

Uses SQLite for local/hackathon development. Swap SQLALCHEMY_DATABASE_URL
for a Postgres URL later without touching any other file.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

SQLALCHEMY_DATABASE_URL = "sqlite:///./claimflow.db"

# check_same_thread=False is required for SQLite when used with FastAPI,
# since FastAPI may access the DB from a different thread than the one
# that created the connection.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency that yields a DB session and always closes it."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()