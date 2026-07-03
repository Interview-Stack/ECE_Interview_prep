from pathlib import Path
import shutil
from app.parser import parse_markdown
from fastapi import APIRouter, UploadFile, File

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    destination = UPLOAD_DIR / file.filename

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = destination.read_text(encoding="utf-8")

    questions = parse_markdown(text)

    return {
        "status": "success",
        "questions_found": len(questions),
        "preview": questions,
    }