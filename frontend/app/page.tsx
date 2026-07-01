"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Connecting...");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setConnected(true);
      })
      .catch(() => {
        setMessage("Cannot connect to backend.");
      });
  }, []);

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>ECE Interview Prep</h1>

      <h2>Backend Status</h2>

      <p>{connected ? "✅ Connected" : "❌ Disconnected"}</p>

      <p>{message}</p>
    </main>
  );
}
