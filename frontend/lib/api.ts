const API_URL = "http://127.0.0.1:8000";

export async function getStatus() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to connect to backend");
    }

    return response.json();
}

export async function getHealth() {
    const response = await fetch(`${API_URL}/health`);

    if (!response.ok) {
        throw new Error("Health check failed");
    }

    return response.json();
}
export async function getQuestions() {
    const response = await fetch(`${API_URL}/questions`);

    if (!response.ok) {
        throw new Error("Failed to fetch questions");
    }

    return response.json();
}
export async function uploadQuestions(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Upload failed");
    }

    return response.json();
}
export async function importQuestions(questions: any[]) {

    const response = await fetch("http://127.0.0.1:8000/questions/import", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(questions),

    });

    if (!response.ok) {
        throw new Error("Import failed");
    }

    return response.json();
}
export async function updateQuestion(
    id: number,
    question: any,
) {

    const response = await fetch(
        `${API_URL}/questions/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(question),
        }
    );

    if (!response.ok)
        throw new Error("Update failed");

    return response.json();
}
export async function deleteQuestion(id: number) {

    const response = await fetch(
        `${API_URL}/questions/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok)
        throw new Error("Delete failed");

    return response.json();
}
export async function createQuestion(question: any) {

    const response = await fetch(`${API_URL}/questions`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(question),

    });

    if (!response.ok)
        throw new Error("Create failed");

    return response.json();
}