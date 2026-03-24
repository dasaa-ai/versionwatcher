import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "App Store Update Tracker | VersionWatcher",
  description:
    "VersionWatcher is an App Store update tracker for teams. Track iOS app releases, monitor version changes, and stay aware of competitor movement.",
  alternates: {
    canonical: "https://www.versionwatcher.com/app-store-update-tracker",
  },
  openGraph: {
    title: "App Store Update Tracker | VersionWatcher",
    description:
      "VersionWatcher is an App Store update tracker for teams. Track iOS app releases, monitor version changes, and stay aware of competitor movement.",
    url: "https://www.versionwatcher.com/app-store-update-tracker",
    siteName: "VersionWatcher",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Store Update Tracker | VersionWatcher",
    description:
      "VersionWatcher is an App Store update tracker for teams. Track iOS app releases, monitor version changes, and stay aware of competitor movement.",
  },
};

const features = [
  {
    title: "Track App Store releases automatically",
    text: "VersionWatcher checks App Store version changes for tracked iOS apps so you do not need to monitor them manually.",
  },
  {
    title: "Monitor competitor and client apps",
    text: "Track product competitors, client portfolios, and your own releases from one clean and focused dashboard.",
  },
  {
    title: "Get alerts when versions change",
    text: "Receive an alert when a tracked app publishes a new version so your team can react faster.",
  },
];

const trackerUseCases = [
  {
    title: "Product teams",
    text: "Understand release cadence and competitor momentum across important apps in your category.",
  },
  {
    title: "ASO and growth teams",
    text: "Stay aware of App Store movement and version changes without manually checking listings.",
  },
  {
    title: "Agencies and founders",
    text: "Keep a live watch on multiple apps across clients, competitors, and your own products.",
  },
];

const examples = [
  {
    app: "Spotify",
    change: "v9.1.26 → v9.1.28",
    note: "A simple version change can signal active iteration and feature rollout momentum.",
  },
  {
    app: "Netflix",
    change: "v16.20 → v16.21",
    note: "Track major consumer apps to understand how category leaders are shipping over time.",
  },
  {
    app: "Notion",
    change: "v2.49 → v2.50",
    note: "Use release tracking to follow tools that shape user expectations in adjacent markets.",
  },
];

const faqs = [
  {
    q: "What is an App Store update tracker?",
    a: "An App Store update tracker is a tool that monitors iOS app version changes and lets you know when an app releases a new version.",
  },
  {
    q: "How does VersionWatcher work?",
    a: "You add an iOS app to your watchlist, and VersionWatcher checks for App Store version changes automatically every two hours.",
  },
  {
    q: "Can I track competitor apps with it?",
    a: "Yes. VersionWatcher is especially useful for tracking competitor apps and understanding their release cadence.",
  },
  {
    q: "Who is this useful for?",
    a: "It is useful for product managers, ASO teams, founders, QA teams, and agencies monitoring client or competitor apps.",
  },
];

export default function AppStoreUpdateTrackerPage() {
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

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: 28,
            alignItems: "center",
          }}
          className="heroGrid"
        >
          <div>
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
              App Store monitoring software
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
              App Store update tracker for iOS apps.
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
              VersionWatcher helps you track App Store version changes across
              competitor apps, category leaders, client portfolios, and your own
              releases — all from one clean dashboard.
            </p>

            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 20,
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
                View App Store tracking page
              </Link>
            </div>

            <div
              style={{
                color: "#cbd5e1",
                fontSize: 16,
                lineHeight: 1.7,
              }}
            >
              Track apps like <strong style={{ color: "#f8fafc" }}>Spotify</strong>,{" "}
              <strong style={{ color: "#f8fafc" }}>Netflix</strong>,{" "}
              <strong style={{ color: "#f8fafc" }}>Notion</strong>, and other
              iOS apps from one place.
            </div>
          </div>

          <div
            style={{
              borderRadius: 24,
              padding: 22,
              background: "rgba(15,23,42,.54)",
              border: "1px solid rgba(148,163,184,.10)",
              boxShadow: "0 30px 80px rgba(0,0,0,.32)",
            }}
          >
            <div
              style={{
                borderRadius: 18,
                padding: 20,
                background: "rgba(2,6,23,.88)",
                border: "1px solid rgba(148,163,184,.08)",
              }}
            >
              <div style={{ fontSize: 15, color: "#94a3b8", marginBottom: 10 }}>
                Why teams use an update tracker
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {features.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: 16,
                      borderRadius: 14,
                      background: "rgba(15,23,42,.58)",
                      border: "1px solid rgba(148,163,184,.08)",
                    }}
                  >
                    <div style={{ fontWeight: 900, marginBottom: 6 }}>
                      {item.title}
                    </div>
                    <div style={{ color: "#94a3b8", lineHeight: 1.6 }}>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 80 }}>
          <div style={{ maxWidth: 760, marginBottom: 22 }}>
            <div
              style={{
                fontSize: 13,
                color: "#86efac",
                fontWeight: 800,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1.4,
              }}
            >
              Use cases
            </div>

            <h2
              style={{
                fontSize: 40,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 0 12px",
              }}
            >
              More than a simple version checker.
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              Teams use VersionWatcher to turn App Store releases into a clean,
              useful signal for product awareness, competitive research, and
              release monitoring.
            </p>
          </div>

          <div className="grid3">
            {trackerUseCases.map((item) => (
              <div key={item.title} className="card">
                <div className="cardTitle">{item.title}</div>
                <div className="cardText">{item.text}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 80 }}>
          <div style={{ maxWidth: 760, marginBottom: 22 }}>
            <div
              style={{
                fontSize: 13,
                color: "#93c5fd",
                fontWeight: 800,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1.4,
              }}
            >
              Example tracked releases
            </div>

            <h2
              style={{
                fontSize: 40,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 0 12px",
              }}
            >
              Follow real App Store movement.
            </h2>
          </div>

          <div className="grid3">
            {examples.map((item) => (
              <div key={item.app} className="card">
                <div
                  style={{
                    display: "inline-flex",
                    padding: "6px 10px",
                    borderRadius: 999,
                    background: "rgba(34,197,94,.14)",
                    color: "#86efac",
                    fontSize: 12,
                    fontWeight: 800,
                    marginBottom: 12,
                  }}
                >
                  {item.change}
                </div>

                <div className="cardTitle">{item.app}</div>
                <div className="cardText">{item.note}</div>
              </div>
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
            }}
          >
            <div style={{ maxWidth: 760 }}>
              <div
                style={{
                  fontSize: 13,
                  color: "#c4b5fd",
                  fontWeight: 800,
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: 1.4,
                }}
              >
                FAQ
              </div>

              <h2
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  margin: "0 0 20px",
                }}
              >
                Questions people ask.
              </h2>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  style={{
                    padding: 18,
                    borderRadius: 18,
                    background: "rgba(2,6,23,.34)",
                    border: "1px solid rgba(148,163,184,.10)",
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>{faq.q}</div>
                  <div style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 80 }}>
          <div
            style={{
              padding: 30,
              borderRadius: 28,
              background: "rgba(15,23,42,.42)",
              border: "1px solid rgba(148,163,184,.10)",
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
              Start tracking App Store updates today.
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
              If your team wants a clean App Store update tracker for iOS apps,
              VersionWatcher is built for exactly that job.
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
        .grid3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .card {
          padding: 22px;
          border-radius: 20px;
          background: rgba(15,23,42,.38);
          border: 1px solid rgba(148,163,184,.10);
        }

        .cardTitle {
          font-size: 20px;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .cardText {
          color: #cbd5e1;
          line-height: 1.7;
        }

        @media (max-width: 980px) {
          .heroGrid,
          .grid3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
