"use client";

import Navbar from "../../../components/Navbar";
import QuestionForm from "../../../components/QuestionForm";
import { createQuestion } from "../../../lib/api";
import { useRouter } from "next/navigation";

export default function NewQuestionPage() {

    const router = useRouter();

    return (

        <>
            <Navbar />

            <main
                style={{
                    maxWidth: "800px",
                    margin: "40px auto",
                }}
            >

                <h1>New Question</h1>

                <QuestionForm
                    submitText="Create Question"
                    onSubmit={async (question) => {

                        await createQuestion(question);

                        alert("Question created!");

                        router.push("/dashboard");

                    }}
                />

            </main>

        </>

    );

}