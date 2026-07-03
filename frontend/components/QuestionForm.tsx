"use client";

import { useState } from "react";

type Props = {
    initialData?: any;
    onSubmit: (question: any) => Promise<void>;
    submitText?: string;
};

export default function QuestionForm({
    initialData,
    onSubmit,
    submitText = "Save",
}: Props) {

    const [question, setQuestion] = useState(
        initialData || {
            title: "",
            role: "",
            difficulty: "Easy",
            question: "",
            answer: "",
            tags: [],
        }
    );

    return (

        <form
            onSubmit={async (e) => {

                e.preventDefault();

                await onSubmit(question);

            }}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
            }}
        >

            <input
                placeholder="Title"
                value={question.title}
                onChange={(e) =>
                    setQuestion({
                        ...question,
                        title: e.target.value,
                    })
                }
            />

            <input
                placeholder="Role"
                value={question.role}
                onChange={(e) =>
                    setQuestion({
                        ...question,
                        role: e.target.value,
                    })
                }
            />

            <select
                value={question.difficulty}
                onChange={(e) =>
                    setQuestion({
                        ...question,
                        difficulty: e.target.value,
                    })
                }
            >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>

            <textarea
                rows={5}
                placeholder="Question"
                value={question.question}
                onChange={(e) =>
                    setQuestion({
                        ...question,
                        question: e.target.value,
                    })
                }
            />

            <textarea
                rows={8}
                placeholder="Answer"
                value={question.answer}
                onChange={(e) =>
                    setQuestion({
                        ...question,
                        answer: e.target.value,
                    })
                }
            />

            <input
                placeholder="Tags (comma separated)"
                value={question.tags.join(", ")}
                onChange={(e) =>
                    setQuestion({
                        ...question,
                        tags: e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter((t) => t.length > 0),
                    })
                }
            />

            <button
                type="submit"
                style={{
                    padding: "12px",
                    background: "#16a34a",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                {submitText}
            </button>

        </form>

    );

}