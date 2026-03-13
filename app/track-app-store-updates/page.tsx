import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Track App Store Updates Automatically | VersionWatcher",
  description:
    "Track App Store updates automatically. Monitor competitor app releases, client apps, and your own iOS app versions from one clean dashboard.",
};

const useCases = [
  {
    title: "Track competitors",
    text: "Get alerted when competitor apps ship a new version so you can monitor release cadence and product momentum.",
  },
  {
    title: "Monitor client apps",
    text: "Agencies and ASO teams can watch multiple client and market apps from one dashboard without checking manually.",
  },
  {
    title: "Watch your own releases",
    text: "Know exactly when your iOS app version goes live and keep a clean release signal history.",
  },
];

const steps = [
  {
    title: "1. Add an iOS app",
    text: "Paste or search for the app you want to track.",
  },
  {
    title: "2. VersionWatcher monitors it",
    text: "We check App Store version changes automatically every 2 hours.",
  },
  {
    title: "3. Get alerted",
    text: "Receive an email when the tracked app ships a new version.",
  },
];

const faqs = [
  {
    q: "What does VersionWatcher track?",
    a: "VersionWatcher tracks App Store version changes for iOS apps and alerts you when a tracked app ships a new release.",
  },
  {
    q: "Who is this useful for?",
    a: "It is useful for product managers, ASO teams, agencies, founders, QA teams, and anyone monitoring competitor or client app releases.",
  },
  {
    q: "How often are apps checked?",
    a: "VersionWatcher checks tracked apps automatically every 2 hours.",
  },
  {
    q: "Can I track competitor apps?",
    a: "Yes. That is one of the main use cases. You can monitor competitor release velocity and catch version changes without checking manually.",
  },
];

export default function TrackAppStoreUpdatesPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1000px 500px at 10% 0%, rgba(37,99,235,.16), rgba(0,0,0,0) 50%), radial-gradient(900px 500px at 90% 10%, rgba(168,85,247,.10), rgba(0,0,0,0) 45%), #020617",
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
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 44,
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#f8fafc",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, rgba(59,130,246,1), rgba(168,85,247,1))",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                color: "white",
                boxShadow: "0 10px 30px rgba(59,130,246,.28)",
              }}
            >
              V
            </div>
            <div style={{ fontSize: 20, fontWeight: 900 }}>VersionWatcher</div>
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
                background: "rgba(15,23,42,.42)",
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
                color: "#0f172a",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              Start free
            </Link>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
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
              App Store monitoring for teams
            </div>

            <h1
              style={{
                fontSize: "clamp(40px, 6vw, 68px)",
                lineHeight: 1.02,
                letterSpacing: -2,
                margin: "0 0 16px",
                fontWeight: 900,
                maxWidth: 760,
              }}
            >
              Track App Store updates automatically.
            </h1>

            <p
              style={{
                fontSize: 20,
                lineHeight: 1.65,
                color: "rgba(226,232,240,.86)",
                maxWidth: 760,
                margin: "0 0 22px",
              }}
            >
              Monitor competitor apps, client portfolios, and your own iOS releases
              from one clean dashboard. Get alerted the moment a tracked app ships a
              new version.
            </p>

            <div
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "#cbd5e1",
                marginBottom: 24,
                maxWidth: 760,
              }}
            >
              Track apps like <strong style={{ color: "#f8fafc" }}>Spotify</strong>,{" "}
              <strong style={{ color: "#f8fafc" }}>WhatsApp</strong>,{" "}
              <strong style={{ color: "#f8fafc" }}>Netflix</strong>, and millions of
              iOS apps.
            </div>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link
                href="/signup"
                style={{
                  padding: "14px 20px",
                  borderRadius: 14,
                  background: "#f8fafc",
                  color: "#0f172a",
                  textDecoration: "none",
                  fontWeight: 900,
                }}
              >
                Start free
              </Link>

              <Link
                href="/"
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
                View homepage
              </Link>
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
              <div style={{ fontSize: 15, color: "#94a3b8", marginBottom: 8 }}>
                Example live signal
              </div>

              <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 14 }}>
                Spotify: Music and Podcasts updated
              </div>

              <div
                style={{
                  display: "inline-flex",
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "rgba(34,197,94,.14)",
                  color: "#86efac",
                  fontSize: 13,
                  fontWeight: 800,
                  marginBottom: 20,
                }}
              >
                v9.1.26 → v9.1.28
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 12,
                }}
              >
                {useCases.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 14,
                      background: "rgba(15,23,42,.58)",
                      border: "1px solid rgba(148,163,184,.08)",
                    }}
                  >
                    <div style={{ fontWeight: 800, marginBottom: 6 }}>{item.title}</div>
                    <div style={{ color: "#94a3b8", lineHeight: 1.6 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 86 }}>
          <div style={{ maxWidth: 780, marginBottom: 24 }}>
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
              Why teams use it
            </div>

            <h2
              style={{
                fontSize: 40,
                lineHeight: 1.1,
                margin: "0 0 12px",
                fontWeight: 900,
              }}
            >
              Stop checking App Store releases manually.
            </h2>

            <p
              style={{
                color: "rgba(226,232,240,.82)",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              VersionWatcher turns App Store release changes into a signal you can
              actually use for product research, competitor monitoring, and release
              awareness.
            </p>
          </div>

          <div className="grid3">
            <div className="card">
              <div className="cardTitle">Product managers</div>
              <div className="cardText">
                Monitor competitor release velocity and spot when the market moves.
              </div>
            </div>

            <div className="card">
              <div className="cardTitle">ASO teams</div>
              <div className="cardText">
                Catch version changes the moment they happen and keep your market view
                current.
              </div>
            </div>

            <div className="card">
              <div className="cardTitle">Agencies and founders</div>
              <div className="cardText">
                Track client apps, portfolio apps, and competitors from one place.
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 86 }}>
          <div style={{ maxWidth: 760, marginBottom: 24 }}>
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
              How it works
            </div>

            <h2
              style={{
                fontSize: 40,
                lineHeight: 1.1,
                margin: "0 0 12px",
                fontWeight: 900,
              }}
            >
              Three simple steps.
            </h2>
          </div>

          <div className="grid3">
            {steps.map((step) => (
              <div key={step.title} className="card">
                <div className="cardTitle">{step.title}</div>
                <div className="cardText">{step.text}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 86 }}>
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
                  lineHeight: 1.1,
                  margin: "0 0 20px",
                  fontWeight: 900,
                }}
              >
                Questions people search for.
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
                  <div style={{ color: "rgba(226,232,240,.82)", lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 86 }}>
          <div
            style={{
              padding: 30,
              borderRadius: 28,
              background: "rgba(15,23,42,.42)",
              border: "1px solid rgba(148,163,184,.10)",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: 42, margin: "0 0 12px", fontWeight: 900 }}>
              Start tracking App Store updates today.
            </h2>

            <p
              style={{
                maxWidth: 760,
                margin: "0 auto 24px",
                color: "rgba(226,232,240,.86)",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              If you want a clean way to monitor iOS app releases, VersionWatcher is
              built for that exact job.
            </p>

            <Link
              href="/signup"
              style={{
                display: "inline-block",
                padding: "14px 22px",
                borderRadius: 14,
                background: "#f8fafc",
                color: "#0f172a",
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
          color: rgba(226,232,240,.82);
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
