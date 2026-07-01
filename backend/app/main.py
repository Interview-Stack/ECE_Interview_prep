from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import Question

app = FastAPI(title="ECE Interview Prep API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


QUESTIONS = [
    Question(
        id=1,
        company="Texas Instruments",
        role="Embedded Engineer",
        title="Volatile Keyword",
        question="What is the volatile keyword in C and when should it be used?",
        answer=(
            "volatile tells the compiler that a variable may change outside "
            "normal program flow, preventing unwanted compiler optimizations."
        ),
        difficulty="Easy",
        tags=["C", "Embedded", "Memory"],
    ),
    Question(
        id=2,
        company="NVIDIA",
        role="FPGA Engineer",
        title="Setup vs Hold",
        question="Explain setup time and hold time.",
        answer=(
            "Setup time is the minimum time data must be stable before the "
            "clock edge. Hold time is the minimum time data must remain "
            "stable after the clock edge."
        ),
        difficulty="Medium",
        tags=["FPGA", "Timing"],
    ),
]


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


@app.get("/questions", response_model=list[Question])
def get_questions():
    return QUESTIONS