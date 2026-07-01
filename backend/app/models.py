from pydantic import BaseModel


class Question(BaseModel):
    id: int
    company: str
    role: str
    title: str
    question: str
    answer: str
    difficulty: str
    tags: list[str]