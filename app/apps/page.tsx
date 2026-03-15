import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tracked iOS Apps | VersionWatcher",
  description:
    "Browse tracked iOS apps on VersionWatcher. Explore app version monitoring pages for Spotify, Netflix, WhatsApp, Instagram, Notion, and more.",
};

const apps = [
  {
    slug: "spotify",
    name: "Spotify: Music and Podcasts",
    category: "Music",
    latestVersion: "9.1.28",
    note: "Track a leading music app and monitor release cadence.",
  },
  {
    slug: "netflix",
    name: "Netflix",
    category: "Entertainment",
    latestVersion: "16.21",
    note: "Follow version changes from a major streaming platform.",
  },
  {
    slug: "whatsapp",
    name: "WhatsApp Messenger",
    category: "Social Networking",
    latestVersion: "25.8.10",
    note: "Monitor one of the most widely used messaging apps.",
  },
  {
    slug: "instagram",
    name: "Instagram",
    category: "Photo & Video",
    latestVersion: "420.0",
    note: "Track version changes and release movement in a major social app.",
  },
  {
    slug: "notion",
    name: "Notion",
    category: "Productivity",
    latestVersion: "2.50",
    note: "Follow a fast-moving productivity app used by many teams.",
  },
];

export default function AppsIndexPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(900px 500px at 10% 0%, rgba(37,99,235,.16), rgba(0,0,0,0) 50%), radial-gradient(800px 500px at 90% 0%, rgba(168,85,247,.10), rgba(0,0,0,0) 45%), #020617",
        color: "#f8fafc",
      }}
    >
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "32px 20px 88px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 44,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              color: "#f8fafc",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(59,130,246,1), rgba(168,85,247,1))",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
              }}
            >
              V
            </div>
            <div style={{ fontWeight: 900, fontSize: 20 }}>VersionWatcher</div>
          </Link>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/login"
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                border: "1px solid rgba(148,163,184,.18)",
                color: "#e2e8f0",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              href="/signup"
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                background: "#f8fafc",
                color: "#020617",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Start free
            </Link>
          </div>
        </header>

        <section style={{ marginBottom: 54 }}>
          <div
            style={{
              display: "inline-flex",
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(59,130,246,.22)",
              background: "rgba(59,130,246,.10)",
              color: "#bfdbfe",
              fontSize: 13,
              fontWeight: 800,
              marginBottom: 18,
            }}
          >
            Browse tracked app pages
          </div>

          <h1
            style={{
              fontSize: "clamp(40px,6vw,68px)",
              fontWeight: 900,
              lineHeight: 1.03,
              letterSpacing: -2,
              margin: "0 0 18px",
              maxWidth: 760,
            }}
          >
            Tracked iOS app version pages.
          </h1>

          <p
            style={{
              fontSize: 20,
              lineHeight: 1.65,
              maxWidth: 760,
              color: "#cbd5e1",
              marginBottom: 24,
            }}
          >
            Explore example tracked iOS app pages from VersionWatcher. Browse app
            version monitoring pages, latest tracked versions, and App Store update
            pages built for competitor and market monitoring.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/signup"
              style={{
                padding: "14px 20px",
                borderRadius: 14,
                background: "#f8fafc",
                color: "#020617",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              Start free
            </Link>

            <Link
              href="/track-app-store-updates"
              style={{
                padding: "14px 20px",
                borderRadius: 14,
                border: "1px solid rgba(148,163,184,.18)",
                background: "rgba(15,23,42,.45)",
                color: "#e2e8f0",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              View tracking page
            </Link>
          </div>
        </section>

        <section>
          <div className="gridCards">
            {apps.map((app) => (
              <Link
                key={app.slug}
                href={`/apps/${app.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div className="card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.2 }}>
                      {app.name}
                    </div>

                    <div
                      style={{
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: "rgba(34,197,94,.14)",
                        color: "#86efac",
                        fontSize: 12,
                        fontWeight: 800,
                        whiteSpace: "nowrap",
                      }}
                    >
                      v{app.latestVersion}
                    </div>
                  </div>

                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: 14,
                      marginBottom: 10,
                    }}
                  >
                    {app.category}
                  </div>

                  <div
                    style={{
                      color: "#cbd5e1",
                      lineHeight: 1.7,
                      marginBottom: 18,
                    }}
                  >
                    {app.note}
                  </div>

                  <div
                    style={{
                      fontWeight: 800,
                      color: "#f8fafc",
                    }}
                  >
                    View app page →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 80 }}>
          <div
            style={{
              padding: 30,
              borderRadius: 28,
              background:
                "linear-gradient(135deg, rgba(37,99,235,.18), rgba(168,85,247,.14))",
              border: "1px solid rgba(148,163,184,.12)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: 42,
                margin: "0 0 12px",
                fontWeight: 900,
              }}
            >
              Want to track your own app list?
            </h2>

            <p
              style={{
                maxWidth: 760,
                margin: "0 auto 24px",
                color: "#cbd5e1",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              Start free with VersionWatcher and monitor competitor apps, market
              leaders, and your own releases from one clean dashboard.
            </p>

            <Link
              href="/signup"
              style={{
                display: "inline-block",
                padding: "14px 22px",
                borderRadius: 14,
                background: "#f8fafc",
                color: "#020617",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              Start free
            </Link>
          </div>
        </section>
      </section>

      <style>{`
        .gridCards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .card {
          padding: 24px;
          border-radius: 22px;
          background: rgba(15,23,42,.38);
          border: 1px solid rgba(148,163,184,.10);
          transition: transform .18s ease, border-color .18s ease, background .18s ease;
        }

        .card:hover {
          transform: translateY(-2px);
          border-color: rgba(96,165,250,.24);
          background: rgba(15,23,42,.55);
        }

        @media (max-width: 980px) {
          .gridCards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
