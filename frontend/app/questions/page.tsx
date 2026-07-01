"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getQuestions } from "../../lib/api";

export default function QuestionsPage() {
    const [questions, setQuestions] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [knownQuestions, setKnownQuestions] = useState<number[]>([]);
    const [unknownQuestions, setUnknownQuestions] = useState<number[]>([]);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        getQuestions().then(setQuestions);
    }, []);

    if (questions.length === 0) {
        return (
            <>
                <Navbar />
                <main style={{ padding: "40px" }}>
                    Loading...
                </main>
            </>
        );
    }

    if (finished) {
        const known = knownQuestions.length;
        const unknown = unknownQuestions.length;
        const score = Math.round((known / questions.length) * 100);

        return (
            <>
                <Navbar />

                <main
                    style={{
                        maxWidth: "800px",
                        margin: "60px auto",
                        fontFamily: "Arial",
                    }}
                >
                    <h1>🎉 Practice Complete</h1>

                    <div
                        style={{
                            border: "1px solid gray",
                            borderRadius: "10px",
                            padding: "25px",
                            marginTop: "30px",
                        }}
                    >
                        <h2>Results</h2>

                        <p>Questions Attempted: {questions.length}</p>
                        <p>Known: {known}</p>
                        <p>Unknown: {unknown}</p>

                        <h2 style={{ marginTop: "20px" }}>
                            Score: {score}%
                        </h2>

                        <button
                            onClick={() => {
                                setCurrent(0);
                                setShowAnswer(false);
                                setKnownQuestions([]);
                                setUnknownQuestions([]);
                                setFinished(false);
                            }}
                            style={{
                                marginTop: "30px",
                                padding: "12px 24px",
                                background: "#2563eb",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            Restart Session
                        </button>
                    </div>
                </main>
            </>
        );
    }

    const q = questions[current];

    const knownCount = knownQuestions.length;
    const unknownCount = unknownQuestions.length;

    const progress =
        ((current + 1) / questions.length) * 100;

    return (
        <>
            <Navbar />

            <main
                style={{
                    maxWidth: "800px",
                    margin: "40px auto",
                    fontFamily: "Arial",
                }}
            >
                <h1>ECE Interview Practice</h1>

                <div
                    style={{
                        width: "100%",
                        height: "8px",
                        background: "#333",
                        borderRadius: "10px",
                        overflow: "hidden",
                        marginTop: "20px",
                        marginBottom: "20px",
                    }}
                >
                    <div
                        style={{
                            width: `${progress}%`,
                            height: "100%",
                            background: "#22c55e",
                        }}
                    />
                </div>

                <h2>
                    Question {current + 1} of {questions.length}
                </h2>

                <p
                    style={{
                        color: "#aaa",
                        marginBottom: "20px",
                    }}
                >
                    Known: {knownCount}
                    &nbsp;&nbsp;
                    Unknown: {unknownCount}
                </p>

                <div
                    style={{
                        border: "1px solid gray",
                        borderRadius: "10px",
                        padding: "20px",
                        marginTop: "20px",
                    }}
                >
                    <h3>{q.title}</h3>

                    <p>
                        <b>Company:</b> {q.company}
                    </p>

                    <p>
                        <b>Role:</b> {q.role}
                    </p>

                    <p>
                        <b>Difficulty:</b> {q.difficulty}
                    </p>

                    <hr />

                    <p>{q.question}</p>

                    {!showAnswer ? (
                        <button
                            onClick={() => setShowAnswer(true)}
                            style={{
                                marginTop: "15px",
                                padding: "10px 20px",
                                background: "#2563eb",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            Reveal Answer
                        </button>
                    ) : (
                        <>
                            <hr />

                            <h4>Answer</h4>

                            <p>{q.answer}</p>

                            <p>
                                <b>Tags:</b> {q.tags.join(", ")}
                            </p>

                            <hr />

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "15px",
                                }}
                            >
                                <button
                                    disabled={knownQuestions.includes(q.id)}
                                    onClick={() => {
                                        setKnownQuestions([
                                            ...knownQuestions,
                                            q.id,
                                        ]);

                                        setUnknownQuestions(
                                            unknownQuestions.filter(
                                                (id) => id !== q.id
                                            )
                                        );
                                    }}
                                    style={{
                                        padding: "10px 16px",
                                        background:
                                            knownQuestions.includes(q.id)
                                                ? "#16a34a"
                                                : "#222",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        opacity:
                                            knownQuestions.includes(q.id)
                                                ? 0.7
                                                : 1,
                                    }}
                                >
                                    ✅ Known
                                </button>

                                <button
                                    disabled={unknownQuestions.includes(q.id)}
                                    onClick={() => {
                                        setUnknownQuestions([
                                            ...unknownQuestions,
                                            q.id,
                                        ]);

                                        setKnownQuestions(
                                            knownQuestions.filter(
                                                (id) => id !== q.id
                                            )
                                        );
                                    }}
                                    style={{
                                        padding: "10px 16px",
                                        background:
                                            unknownQuestions.includes(q.id)
                                                ? "#dc2626"
                                                : "#222",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        opacity:
                                            unknownQuestions.includes(q.id)
                                                ? 0.7
                                                : 1,
                                    }}
                                >
                                    ❌ Unknown
                                </button>
                            </div>

                            <p style={{ marginTop: "15px" }}>
                                <b>Status:</b>{" "}
                                {knownQuestions.includes(q.id)
                                    ? "Known ✅"
                                    : unknownQuestions.includes(q.id)
                                    ? "Unknown ❌"
                                    : "Not marked"}
                            </p>
                        </>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "30px",
                    }}
                >
                    <button
                        disabled={current === 0}
                        onClick={() => {
                            setCurrent(current - 1);
                            setShowAnswer(false);
                        }}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#333",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        ← Previous
                    </button>

                    <button
                        onClick={() => {
                            if (current < questions.length - 1) {
                                setCurrent(current + 1);
                                setShowAnswer(false);
                            } else {
                                setFinished(true);
                            }
                        }}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#2563eb",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        {current === questions.length - 1
                            ? "Finish"
                            : "Next →"}
                    </button>
                </div>
            </main>
        </>
    );
}