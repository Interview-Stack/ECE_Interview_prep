"use client";

import { useState } from "react";

type Question = {
    company: string;
    role: string;
    title: string;
    question: string;
    answer: string;
    difficulty: string;
    tags: string[];
};

export default function QuestionCard({ question }: { question: Question }) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div
            style={{
                border: "1px solid #444",
                borderRadius: "10px",
                padding: "20px",
                marginTop: "20px",
            }}
        >
            <h2>{question.title}</h2>

            <p>
                <strong>Company:</strong> {question.company}
            </p>

            <p>
                <strong>Role:</strong> {question.role}
            </p>

            <p>
                <strong>Difficulty:</strong> {question.difficulty}
            </p>

            <hr />

            <p>{question.question}</p>

            <button
                onClick={() => setShowAnswer(!showAnswer)}
                style={{
                    marginTop: "15px",
                    padding: "8px 16px",
                    cursor: "pointer",
                }}
            >
                {showAnswer ? "Hide Answer" : "Reveal Answer"}
            </button>

            {showAnswer && (
                <>
                    <hr />

                    <h4>Answer</h4>

                    <p>{question.answer}</p>

                    <p>
                        <strong>Tags:</strong>{" "}
                        {question.tags.join(", ")}
                    </p>
                </>
            )}
        </div>
    );
}