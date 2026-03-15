import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type AppEntry = {
  slug: string;
  name: string;
  developer: string;
  category: string;
  latestVersion: string;
  previousVersion: string;
  releaseDate: string;
  appStoreId: string;
  summary: string;
};

const apps: AppEntry[] = [
  {
    slug: "spotify",
    name: "Spotify: Music and Podcasts",
    developer: "Spotify",
    category: "Music",
    latestVersion: "9.1.28",
    previousVersion: "9.1.26",
    releaseDate: "March 2026",
    appStoreId: "324684580",
    summary:
      "Track Spotify version changes to monitor release cadence, product movement, and market-leading app behavior.",
  },
  {
    slug: "netflix",
    name: "Netflix",
    developer: "Netflix, Inc.",
    category: "Entertainment",
    latestVersion: "16.21",
    previousVersion: "16.20",
    releaseDate: "March 2026",
    appStoreId: "363590051",
    summary:
      "Track Netflix App Store updates automatically and stay aware of version changes from a major consumer app.",
  },
  {
    slug: "whatsapp",
    name: "WhatsApp Messenger",
    developer: "WhatsApp Inc.",
    category: "Social Networking",
    latestVersion: "25.8.10",
    previousVersion: "25.7.81",
    releaseDate: "March 2026",
    appStoreId: "310633997",
    summary:
      "Monitor WhatsApp version changes to understand release cadence and important movement in a globally used messaging app.",
  },
  {
    slug: "instagram",
    name: "Instagram",
    developer: "Instagram, Inc.",
    category: "Photo & Video",
    latestVersion: "420.0",
    previousVersion: "419.0",
    releaseDate: "March 2026",
    appStoreId: "389801252",
    summary:
      "Track Instagram updates automatically and monitor version changes from one of the most influential consumer apps.",
  },
  {
    slug: "notion",
    name: "Notion",
    developer: "Notion Labs, Incorporated",
    category: "Productivity",
    latestVersion: "2.50",
    previousVersion: "2.49",
    releaseDate: "March 2026",
    appStoreId: "1232780281",
    summary:
      "Follow Notion App Store releases and use version changes as a signal for SaaS product movement and iteration speed.",
  },
];

function getApp(slug: string) {
  return apps.find((app) => app.slug === slug);
}

export async function generateStaticParams() {
  return apps.map((app) => ({ app: app.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> {
  const { app } = await params;
  const entry = getApp(app);

  if (!entry) {
    return {
      title: "App not found | VersionWatcher",
    };
  }

  return {
    title: `${entry.name} Latest iOS Version Tracker | VersionWatcher`,
    description: `Track ${entry.name} App Store updates automatically. Latest version, previous version, release monitoring, and competitor tracking with VersionWatcher.`,
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app } = await params;
  const entry = getApp(app);

  if (!entry) {
    notFound();
  }

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
              href="/apps"
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                border: "1px solid rgba(148,163,184,.18)",
                color: "#e2e8f0",
                textDecoration: "none",
              }}
            >
              Browse apps
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
              App page • iOS version tracking
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
              {entry.name} latest iOS version tracker.
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
              {entry.summary}
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
                Track this app
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

            <div
              style={{
                color: "#cbd5e1",
                fontSize: 16,
                lineHeight: 1.7,
              }}
            >
              Developer: <strong style={{ color: "#f8fafc" }}>{entry.developer}</strong>
              {" • "}
              Category: <strong style={{ color: "#f8fafc" }}>{entry.category}</strong>
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
              <div style={{ fontSize: 15, color: "#94a3b8", marginBottom: 12 }}>
                Current tracked release
              </div>

              <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 16 }}>
                {entry.name}
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
                  marginBottom: 18,
                }}
              >
                v{entry.previousVersion} → v{entry.latestVersion}
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                <div className="infoCard">
                  <div className="infoLabel">Latest version</div>
                  <div className="infoValue">v{entry.latestVersion}</div>
                </div>

                <div className="infoCard">
                  <div className="infoLabel">Previous version</div>
                  <div className="infoValue">v{entry.previousVersion}</div>
                </div>

                <div className="infoCard">
                  <div className="infoLabel">Latest tracked release date</div>
                  <div className="infoValue">{entry.releaseDate}</div>
                </div>

                <div className="infoCard">
                  <div className="infoLabel">App Store ID</div>
                  <div className="infoValue">{entry.appStoreId}</div>
                </div>
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
              Why track this app
            </div>

            <h2
              style={{
                fontSize: 40,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 0 12px",
              }}
            >
              Use version changes as a competitive signal.
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              App version changes can reveal release cadence, active iteration, and
              product movement. For teams tracking important apps, that signal is useful.
            </p>
          </div>

          <div className="grid3">
            <div className="card">
              <div className="cardTitle">Version history visibility</div>
              <div className="cardText">
                Keep a simple view of the current and previous tracked version for {entry.name}.
              </div>
            </div>

            <div className="card">
              <div className="cardTitle">Competitor awareness</div>
              <div className="cardText">
                Stay aware when {entry.name} ships and use that release activity as market context.
              </div>
            </div>

            <div className="card">
              <div className="cardTitle">Faster monitoring</div>
              <div className="cardText">
                Let VersionWatcher do the checking instead of manually revisiting the App Store.
              </div>
            </div>
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
                Questions about {entry.name}.
              </h2>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <div className="faqCard">
                <div className="faqQ">What is the latest tracked iOS version of {entry.name}?</div>
                <div className="faqA">
                  The latest tracked version on this page is v{entry.latestVersion}.
                </div>
              </div>

              <div className="faqCard">
                <div className="faqQ">What was the previous tracked version?</div>
                <div className="faqA">
                  The previous tracked version shown here is v{entry.previousVersion}.
                </div>
              </div>

              <div className="faqCard">
                <div className="faqQ">Can I track {entry.name} automatically?</div>
                <div className="faqA">
                  Yes. With VersionWatcher, you can monitor {entry.name} and receive alerts when its App Store version changes.
                </div>
              </div>

              <div className="faqCard">
                <div className="faqQ">Who is this useful for?</div>
                <div className="faqA">
                  This is useful for product managers, ASO teams, founders, agencies, and anyone monitoring important iOS apps.
                </div>
              </div>
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
              Want to track {entry.name} automatically?
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
              Start free with VersionWatcher and monitor App Store version changes
              across competitor apps, market leaders, and your own releases.
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

        .infoCard {
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(15,23,42,.58);
          border: 1px solid rgba(148,163,184,.08);
        }

        .infoLabel {
          color: #94a3b8;
          font-size: 13px;
          margin-bottom: 6px;
        }

        .infoValue {
          color: #f8fafc;
          font-weight: 800;
          font-size: 18px;
        }

        .faqCard {
          padding: 18px;
          border-radius: 18px;
          background: rgba(2,6,23,.34);
          border: 1px solid rgba(148,163,184,.10);
        }

        .faqQ {
          font-weight: 800;
          margin-bottom: 8px;
        }

        .faqA {
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
