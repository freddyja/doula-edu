"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#f3eee6",
          color: "#2a241e",
          fontFamily: "Georgia, serif",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 560 }}>Something got stuck</h1>
        <p style={{ fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "36rem" }}>
          You can try again. This app keeps notes on this device only.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: "1rem",
            minHeight: "3rem",
            border: 0,
            borderRadius: "999px",
            background: "#7a4030",
            color: "#fffaf7",
            padding: "0 1.25rem",
            fontSize: "1rem",
            fontWeight: 700,
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
