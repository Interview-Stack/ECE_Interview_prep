"use client";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getStatus } from "../lib/api";

export default function Home() {
    const [message, setMessage] = useState("Connecting...");
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        getStatus()
            .then((data) => {
                setMessage(data.message);
                setConnected(true);
            })
            .catch(() => {
                setMessage("Cannot connect to backend.");
            });
    }, []);

return (
    <>
        <Navbar />

        <main
            style={{
                padding: "40px",
                fontFamily: "Arial",
            }}
        >
            <h2>Backend Status</h2>

            <p>{connected ? "✅ Connected" : "❌ Disconnected"}</p>

            <p>{message}</p>
        </main>
    </>
);
}
