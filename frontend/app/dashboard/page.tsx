"use client";
import QuestionCard from "../../components/QuestionCard";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getQuestions } from "../../lib/api";

export default function DashboardPage() {

    const [questions, setQuestions] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");
    const [role, setRole] = useState("All");

    useEffect(() => {

        getQuestions().then(setQuestions);

    }, []);
    const easy = questions.filter(
    (q) => q.difficulty === "Easy"
).length;

const medium = questions.filter(
    (q) => q.difficulty === "Medium"
).length;

const hard = questions.filter(
    (q) => q.difficulty === "Hard"
).length;
const filtered = questions.filter((q) => {

    const s = search.toLowerCase();

    const matchesSearch =
        q.title.toLowerCase().includes(s) ||
        q.question.toLowerCase().includes(s) ||
        q.answer.toLowerCase().includes(s);

    const matchesDifficulty =
        difficulty === "All" ||
        q.difficulty === difficulty;

    const matchesRole =
        role === "All" ||
        q.role === role;

    return (
        matchesSearch &&
        matchesDifficulty &&
        matchesRole
    );

});

    return (

        <>
            <Navbar />

            <main
                style={{
                    maxWidth: "1000px",
                    margin: "40px auto",
                    fontFamily: "Arial",
                }}
            >

                <h1>Question Dashboard</h1>

                <input
                    placeholder="Search questions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "25px",
                        borderRadius: "8px",
                    }}
                />
<div
    style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        alignItems: "center",
        flexWrap: "wrap",
    }}
>
    <div>
        <label><b>Difficulty</b></label>
        <br />

    <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        style={{
            padding: "10px",
            borderRadius: "8px",
        }}
    >
        
        <option>All</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
    </select>
    </div>

    <div>
        <label><b>Role</b></label>
        <br />
    <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
            padding: "10px",
            borderRadius: "8px",
        }}
    >
        <option>All</option>

        {[...new Set(questions.map((q) => q.role))].map((r) => (
            <option key={r}>{r}</option>
        ))}

    </select>
    </div>
</div>

<div
    style={{
        display: "flex",
        gap: "25px",
        marginBottom: "30px",
        flexWrap: "wrap",
    }}
>

    <div>
        <b>Total</b>
        <br />
        {questions.length}
    </div>

    <div>
        <b>Easy</b>
        <br />
        {easy}
    </div>

    <div>
        <b>Medium</b>
        <br />
        {medium}
    </div>

    <div>
        <b>Hard</b>
        <br />
        {hard}
    </div>

</div>

                {filtered.map((q) => (

    <QuestionCard
        key={q.id}
        question={q}
        onUpdated={() => {

            getQuestions().then(setQuestions);

        }}
    />

))}

            </main>

        </>

    );

}