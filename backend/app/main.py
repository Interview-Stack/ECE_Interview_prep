from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.db.database import engine, Base, get_db
from app.db.models import Question

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ECE Interview Prep API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "ECE Interview Prep API is running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


@app.get("/questions")
def get_questions(db: Session = Depends(get_db)):
    questions = db.query(Question).all()

    return [
        {
            "id": q.id,
            "title": q.title,
            "role": q.role,
            "question": q.question,
            "answer": q.answer,
            "difficulty": q.difficulty,
            "tags": q.tags,
        }
        for q in questions
    ]