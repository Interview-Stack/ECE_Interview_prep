"use client";
import { deleteQuestion } from "../lib/api";
import { useState } from "react";
import { updateQuestion } from "../lib/api";

type Props = {
    question: any;
    onUpdated: () => void;
};

export default function QuestionCard({
    question,
    onUpdated,
}: Props) {

    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState(question);

    async function handleSave() {

        await updateQuestion(question.id, form);

        setEditing(false);

        onUpdated();
    }

    if (!editing) {

        return (

            <div
                style={{
                    border: "1px solid gray",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "20px",
                }}
            >

                <h2>{question.title}</h2>

                <p><b>Role:</b> {question.role}</p>

                <p><b>Difficulty:</b> {question.difficulty}</p>

                <p><b>Tags:</b> {question.tags.join(", ")}</p>

                <hr />

                <p>{question.question}</p>

                <button
                    onClick={() => setEditing(true)}
                >
                    ✏ Edit
                </button>

<button
    onClick={async () => {

        const ok = confirm(
            "Delete this question?"
        );

        if (!ok) return;

        await deleteQuestion(question.id);

        onUpdated();

    }}
    style={{
        marginLeft: "10px",
    }}
>
    🗑 Delete
</button>

            </div>

        );

    }

    return (

        <div
            style={{
                border: "1px solid #2563eb",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
            }}
        >

            <h2>Editing</h2>

            <input
                value={form.title}
                onChange={(e) =>
                    setForm({
                        ...form,
                        title: e.target.value,
                    })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                }}
            />

            <input
                value={form.role}
                onChange={(e) =>
                    setForm({
                        ...form,
                        role: e.target.value,
                    })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                }}
            />

            <select
                value={form.difficulty}
                onChange={(e) =>
                    setForm({
                        ...form,
                        difficulty: e.target.value,
                    })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                }}
            >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>

            <textarea
                rows={5}
                value={form.question}
                onChange={(e) =>
                    setForm({
                        ...form,
                        question: e.target.value,
                    })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                }}
            />

            <textarea
                rows={6}
                value={form.answer}
                onChange={(e) =>
                    setForm({
                        ...form,
                        answer: e.target.value,
                    })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                }}
            />

            <input
                value={form.tags.join(", ")}
                onChange={(e) =>
                    setForm({
                        ...form,
                        tags: e.target.value
                            .split(",")
                            .map((t) => t.trim()),
                    })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                }}
            />

            <button
                onClick={handleSave}
            >
                💾 Save
            </button>

            <button
                onClick={() => setEditing(false)}
                style={{
                    marginLeft: "10px",
                }}
            >
                Cancel
            </button>

        </div>

    );

}