from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY

from .database import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    role = Column(String, nullable=False)

    question = Column(String, nullable=False)

    answer = Column(String, nullable=False)

    difficulty = Column(String, nullable=False)

    tags = Column(ARRAY(String), nullable=False)