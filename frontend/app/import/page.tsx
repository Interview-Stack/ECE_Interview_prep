"use client";

import { useState } from "react";
import {
    uploadQuestions,
    importQuestions,
} from "../../lib/api";

export default function ImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    async function handleUpload() {
        if (!file) {
            alert("Please choose a file first.");
            return;
        }

        try {
            setLoading(true);

            const response = await uploadQuestions(file);

            setPreview(response.preview);
            setResult(null);
        } catch (err) {
            console.error(err);
            alert("Upload failed.");
        } finally {
            setLoading(false);
        }
    }

    async function handleImport() {
        try {
            const response = await importQuestions(preview);
            setResult(response);
        } catch (err) {
            console.error(err);
            alert("Import failed.");
        }
    }

    return (
        <main
            style={{
                maxWidth: "900px",
                margin: "40px auto",
                fontFamily: "Arial",
            }}
        >
            <h1>Import Interview Questions</h1>

            <input
                type="file"
                accept=".md,.txt"
                onChange={(e) => {
                    if (e.target.files) {
                        setFile(e.target.files[0]);
                    }
                }}
            />

            <br />
            <br />

<button
    onClick={handleUpload}
    disabled={!file}
    style={{
        padding: "10px 20px",
        background: file ? "#2563eb" : "#555",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: file ? "pointer" : "not-allowed",
        fontWeight: "bold",
    }}
>
    Upload
</button>

            {preview.length > 0 && (
                <>
                    <button
                        onClick={handleImport}
                        style={{
                            marginLeft: "15px",
                            padding: "10px 20px",
                            background: "#16a34a",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        ✅ Approve Import
                    </button>

                    {result && (
                        <div
                            style={{
                                marginTop: "20px",
                                border: "1px solid #16a34a",
                                borderRadius: "10px",
                                padding: "20px",
                                background: "#111",
                            }}
                        >
                            <h3>🎉 Import Complete</h3>

                            <p>
                                <b>Inserted:</b> {result.inserted}
                            </p>

                            <p>
                                <b>Duplicates:</b> {result.duplicates}
                            </p>
                        </div>
                    )}
                </>
            )}

            <hr style={{ margin: "30px 0" }} />

            {loading && <p>Parsing...</p>}
            {preview.length === 0 && !loading && (
    <div
        style={{
            marginTop: "40px",
            padding: "30px",
            border: "2px dashed gray",
            borderRadius: "10px",
            textAlign: "center",
            color: "#999",
        }}
    >
        <h3>No questions loaded</h3>

        <p>
            Choose a Markdown file and click <b>Upload</b> to preview the questions.
        </p>
    </div>
)}
            {preview.map((q, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid gray",
                        padding: "20px",
                        borderRadius: "10px",
                        marginBottom: "25px",
                    }}
                >
                    <h3>Question {index + 1}</h3>

                    <label>
                        <b>Title</b>
                    </label>

                    <input
                        value={q.title}
                        onChange={(e) => {
                            const updated = [...preview];
                            updated[index].title = e.target.value;
                            setPreview(updated);
                        }}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "5px",
                            marginBottom: "15px",
                        }}
                    />

                    <label>
                        <b>Role</b>
                    </label>

                    <input
                        value={q.role}
                        onChange={(e) => {
                            const updated = [...preview];
                            updated[index].role = e.target.value;
                            setPreview(updated);
                        }}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "5px",
                            marginBottom: "15px",
                        }}
                    />

                    <label>
                        <b>Difficulty</b>
                    </label>

                    <select
                        value={q.difficulty}
                        onChange={(e) => {
                            const updated = [...preview];
                            updated[index].difficulty = e.target.value;
                            setPreview(updated);
                        }}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "5px",
                            marginBottom: "15px",
                        }}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <label>
                        <b>Question</b>
                    </label>

                    <textarea
                        rows={4}
                        value={q.question}
                        onChange={(e) => {
                            const updated = [...preview];
                            updated[index].question = e.target.value;
                            setPreview(updated);
                        }}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "5px",
                            marginBottom: "15px",
                        }}
                    />

                    <label>
                        <b>Answer</b>
                    </label>

                    <textarea
                        rows={6}
                        value={q.answer}
                        onChange={(e) => {
                            const updated = [...preview];
                            updated[index].answer = e.target.value;
                            setPreview(updated);
                        }}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "5px",
                            marginBottom: "15px",
                        }}
                    />

                    <label>
                        <b>Tags (comma separated)</b>
                    </label>

                    <input
                        value={q.tags.join(", ")}
                        onChange={(e) => {
                            const updated = [...preview];

                            updated[index].tags = e.target.value
                                .split(",")
                                .map((tag: string) => tag.trim())
                                .filter((tag: string) => tag.length > 0);

                            setPreview(updated);
                        }}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "5px",
                            marginBottom: "20px",
                        }}
                    />

                    <button
                        onClick={() => {
                            setPreview(
                                preview.filter((_, i) => i !== index)
                            );
                        }}
                        style={{
                            background: "#dc2626",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        🗑 Delete Question
                    </button>
                </div>
            ))}
        </main>
    );
}