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