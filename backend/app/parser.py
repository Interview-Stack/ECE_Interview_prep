import re


def parse_markdown(text: str):
    questions = []

    blocks = text.split("-----------------------")

    for block in blocks:

        q_match = re.search(
            r"## Question\s*(.*?)\s*### Answer",
            block,
            re.DOTALL,
        )

        a_match = re.search(
            r"### Answer\s*(.*?)\s*### Difficulty",
            block,
            re.DOTALL,
        )

        d_match = re.search(
            r"### Difficulty\s*(.*?)\s*### Tags",
            block,
            re.DOTALL,
        )

        t_match = re.search(
            r"### Tags\s*(.*)",
            block,
            re.DOTALL,
        )

        if not q_match:
            continue

        question = q_match.group(1).strip()
        answer = a_match.group(1).strip()
        difficulty = d_match.group(1).strip()

        tags = [
            tag.strip()
            for tag in t_match.group(1).splitlines()
            if tag.strip()
        ]

        questions.append(
            {
                "title": question[:40],
                "role": "Unknown",
                "question": question,
                "answer": answer,
                "difficulty": difficulty,
                "tags": tags,
            }
        )

    return questions