from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.schemas import QuestionCreate, QuestionUpdate
from app.upload import router as upload_router
from app.db.database import engine, Base, get_db
from app.db.models import Question

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ECE Interview Prep API")

app.include_router(upload_router)

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


@app.post("/questions/import")
def import_questions(
    questions: list[QuestionCreate],
    db: Session = Depends(get_db),
):
    inserted = 0
    duplicates = 0

    for q in questions:

        existing = (
            db.query(Question)
            .filter(Question.question == q.question)
            .first()
        )

        if existing:
            duplicates += 1
            continue

        new_question = Question(
            title=q.title,
            role=q.role,
            question=q.question,
            answer=q.answer,
            difficulty=q.difficulty,
            tags=q.tags,
        )

        db.add(new_question)
        inserted += 1

    db.commit()

    return {
        "inserted": inserted,
        "duplicates": duplicates,
    }


@app.put("/questions/{question_id}")
def update_question(
    question_id: int,
    updated: QuestionUpdate,
    db: Session = Depends(get_db),
):

    question = (
        db.query(Question)
        .filter(Question.id == question_id)
        .first()
    )

    if question is None:
        return {
            "error": "Question not found"
        }

    question.title = updated.title
    question.role = updated.role
    question.question = updated.question
    question.answer = updated.answer
    question.difficulty = updated.difficulty
    question.tags = updated.tags

    db.commit()
    db.refresh(question)

    return {
        "message": "Question updated successfully"
    }
@app.delete("/questions/{question_id}")
def delete_question(
    question_id: int,
    db: Session = Depends(get_db),
):

    question = (
        db.query(Question)
        .filter(Question.id == question_id)
        .first()
    )

    if question is None:
        return {
            "error": "Question not found"
        }

    db.delete(question)

    db.commit()

    return {
        "message": "Question deleted"
    }
@app.post("/questions")
def create_question(
    question: QuestionCreate,
    db: Session = Depends(get_db),
):

    new_question = Question(
        title=question.title,
        role=question.role,
        question=question.question,
        answer=question.answer,
        difficulty=question.difficulty,
        tags=question.tags,
    )

    db.add(new_question)

    db.commit()

    db.refresh(new_question)

    return {
        "message": "Question created",
        "id": new_question.id,
    }