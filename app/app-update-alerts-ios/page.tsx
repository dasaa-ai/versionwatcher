import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "iOS App Update Alerts | VersionWatcher",
  description:
    "Get iOS app update alerts with VersionWatcher. Track App Store version changes automatically and get notified when apps release new versions.",
  alternates: {
    canonical: "https://www.versionwatcher.com/app-update-alerts-ios",
  },
  openGraph: {
    title: "iOS App Update Alerts | VersionWatcher",
    description:
      "Get iOS app update alerts with VersionWatcher. Track App Store version changes automatically and get notified when apps release new versions.",
    url: "https://www.versionwatcher.com/app-update-alerts-ios",
    siteName: "VersionWatcher",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iOS App Update Alerts | VersionWatcher",
    description:
      "Get iOS app update alerts with VersionWatcher. Track App Store version changes automatically and get notified when apps release new versions.",
  },
};

const benefits = [
  {
    title: "Never miss an update",
    text: "Get alerted when any tracked iOS app releases a new version so you always know when competitors ship.",
  },
  {
    title: "Monitor the App Store automatically",
    text: "Instead of checking apps manually, VersionWatcher continuously monitors App Store releases for you.",
  },
  {
    title: "Track multiple apps",
    text: "Monitor competitor apps, client apps, and your own releases from a single dashboard.",
  },
];

const examples = [
  { app: "Spotify", from: "9.1.26", to: "9.1.28" },
  { app: "Instagram", from: "419.0", to: "420.0" },
  { app: "Notion", from: "2.49", to: "2.50" },
];

const faqs = [
  {
    q: "How do I get alerts when an app updates?",
    a: "With VersionWatcher you simply add the app you want to monitor. When the App Store version changes, you receive an email alert.",
  },
  {
    q: "Can I track competitor apps?",
    a: "Yes. Many product teams and founders use VersionWatcher specifically to monitor competitor releases.",
  },
  {
    q: "How frequently are updates checked?",
    a: "VersionWatcher checks tracked apps every two hours.",
  },
  {
    q: "Does this work for any iOS app?",
    a: "Yes. You can track almost any iOS app listed on the App Store.",
  },
];

export default function AppUpdateAlertsPage() {
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
            <div style={{ fontWeight: 900, fontSize: 20 }}>
              VersionWatcher
            </div>
          </Link>

          <div style={{ display: "flex", gap: 12 }}>
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

        <section style={{ marginBottom: 70 }}>
          <h1
            style={{
              fontSize: "clamp(40px,6vw,68px)",
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Get alerts when iOS apps update.
          </h1>

          <p
            style={{
              fontSize: 20,
              lineHeight: 1.6,
              maxWidth: 700,
              color: "#cbd5e1",
              marginBottom: 30,
            }}
          >
            VersionWatcher sends you alerts whenever a tracked iOS app releases
            a new version on the App Store. Perfect for monitoring competitors,
            client apps, and your own product releases.
          </p>

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
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
            marginBottom: 70,
          }}
        >
          {benefits.map((b) => (
            <div
              key={b.title}
              style={{
                padding: 24,
                borderRadius: 18,
                background: "rgba(15,23,42,.45)",
                border: "1px solid rgba(148,163,184,.1)",
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 8 }}>
                {b.title}
              </div>

              <div style={{ color: "#cbd5e1", lineHeight: 1.6 }}>{b.text}</div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 70 }}>
          <h2
            style={{
              fontSize: 38,
              fontWeight: 900,
              marginBottom: 30,
            }}
          >
            Example detected updates
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 18,
            }}
          >
            {examples.map((e) => (
              <div
                key={e.app}
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: "rgba(15,23,42,.45)",
                  border: "1px solid rgba(148,163,184,.1)",
                }}
              >
                <div style={{ fontWeight: 900, marginBottom: 6 }}>{e.app}</div>

                <div
                  style={{
                    color: "#86efac",
                    fontWeight: 700,
                  }}
                >
                  v{e.from} → v{e.to}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 900,
              marginBottom: 24,
            }}
          >
            FAQ
          </h2>

          <div style={{ display: "grid", gap: 14 }}>
            {faqs.map((f) => (
              <div
                key={f.q}
                style={{
                  padding: 18,
                  borderRadius: 16,
                  background: "rgba(15,23,42,.45)",
                  border: "1px solid rgba(148,163,184,.1)",
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: 6 }}>{f.q}</div>

                <div style={{ color: "#cbd5e1", lineHeight: 1.6 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
