from pydantic import BaseModel


class QuestionCreate(BaseModel):
    title: str
    role: str
    question: str
    answer: str
    difficulty: str
    tags: list[str]


class QuestionUpdate(BaseModel):
    title: str
    role: str
    question: str
    answer: str
    difficulty: str
    tags: list[str]