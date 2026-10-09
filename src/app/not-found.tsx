import Link from "next/link";

import { brand } from "@/data/content";

export default function NotFound() {
  return (
    <main
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100svh",
        padding: "0 var(--gutter)",
        textAlign: "center",
      }}
    >
      <div style={{ display: "grid", gap: 20, justifyItems: "center" }}>
        <p className="eyebrow">404</p>
        <h1 className="h2">This page slipped off the ring.</h1>
        <p className="small">Nothing lives at this address.</p>
        <Link
          href="/"
          style={{
            padding: "10px 22px",
            borderRadius: 999,
            background: "var(--lagoon)",
            color: "var(--white)",
            fontSize: "var(--fs-ui)",
            fontWeight: 500,
          }}
        >
          Back to {brand.name}
        </Link>
      </div>
    </main>
  );
}
