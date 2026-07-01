export default function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 40px",
                borderBottom: "1px solid #333",
                marginBottom: "40px",
            }}
        >
            <h2>ECE Interview Prep</h2>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                }}
            >
                <span>Home</span>
                <span>Questions</span>
                <span>Progress</span>
            </div>
        </nav>
    );
}
