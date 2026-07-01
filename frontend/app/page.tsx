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
        maxWidth: "900px",
        margin: "0 auto",
    }}
>
    <h1>ECE Interview Prep</h1>

    <p>
        Practice real interview questions for Embedded Systems,
        FPGA, Linux Drivers, RTL Design, Firmware and more.
    </p>

    <hr style={{ margin: "30px 0" }} />

    <h2>Backend Status</h2>

    <p>{connected ? "🟢 Online" : "🔴 Offline"}</p>

    <p>{message}</p>
</main>
    </>
);
}
