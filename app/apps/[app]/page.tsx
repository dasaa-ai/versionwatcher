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
  {
    slug: "youtube",
    name: "YouTube",
    developer: "Google",
    category: "Photo & Video",
    latestVersion: "19.10",
    previousVersion: "19.09",
    releaseDate: "March 2026",
    appStoreId: "544007664",
    summary:
      "Track YouTube App Store version changes and monitor release activity from one of the most widely used video apps.",
  },
  {
    slug: "tiktok",
    name: "TikTok",
    developer: "TikTok Ltd.",
    category: "Entertainment",
    latestVersion: "38.7.0",
    previousVersion: "38.6.0",
    releaseDate: "March 2026",
    appStoreId: "835599320",
    summary:
      "Track TikTok App Store updates automatically and stay aware of release cadence across a major consumer social app.",
  },
  {
    slug: "telegram",
    name: "Telegram Messenger",
    developer: "Telegram FZ-LLC",
    category: "Social Networking",
    latestVersion: "10.9",
    previousVersion: "10.8",
    releaseDate: "March 2026",
    appStoreId: "686449807",
    summary:
      "Track Telegram version history and App Store updates to monitor release patterns in messaging and social categories.",
  },
  {
    slug: "discord",
    name: "Discord",
    developer: "Discord, Inc.",
    category: "Social Networking",
    latestVersion: "221.0",
    previousVersion: "220.0",
    releaseDate: "March 2026",
    appStoreId: "985746746",
    summary:
      "Monitor Discord iOS app version changes and follow release movement across a major community platform.",
  },
  {
    slug: "slack",
    name: "Slack",
    developer: "Slack Technologies, Inc.",
    category: "Business",
    latestVersion: "24.03.10",
    previousVersion: "24.02.20",
    releaseDate: "March 2026",
    appStoreId: "618783545",
    summary:
      "Track Slack App Store updates and use version changes as a signal for business software release cadence.",
  },
  {
    slug: "reddit",
    name: "Reddit",
    developer: "reddit",
    category: "News",
    latestVersion: "2026.10.0",
    previousVersion: "2026.09.0",
    releaseDate: "March 2026",
    appStoreId: "1064216828",
    summary:
      "Monitor Reddit App Store releases and track version changes in a major content and community platform.",
  },
  {
    slug: "twitter",
    name: "X",
    developer: "X Corp.",
    category: "News",
    latestVersion: "10.35",
    previousVersion: "10.34",
    releaseDate: "March 2026",
    appStoreId: "333903271",
    summary:
      "Track X app updates automatically and monitor release cadence across a major social and news platform.",
  },
  {
    slug: "facebook",
    name: "Facebook",
    developer: "Meta Platforms, Inc.",
    category: "Social Networking",
    latestVersion: "501.0",
    previousVersion: "500.0",
    releaseDate: "March 2026",
    appStoreId: "284882215",
    summary:
      "Track Facebook version changes and follow App Store release movement across one of the largest social apps.",
  },
  {
    slug: "gmail",
    name: "Gmail - Email by Google",
    developer: "Google",
    category: "Productivity",
    latestVersion: "6.0.240",
    previousVersion: "6.0.239",
    releaseDate: "March 2026",
    appStoreId: "422689480",
    summary:
      "Monitor Gmail App Store updates and stay aware of release changes in a major productivity app.",
  },
  {
    slug: "google-maps",
    name: "Google Maps",
    developer: "Google",
    category: "Navigation",
    latestVersion: "24.10",
    previousVersion: "24.09",
    releaseDate: "March 2026",
    appStoreId: "585027354",
    summary:
      "Track Google Maps version history and App Store updates to follow a major navigation product.",
  },
  {
    slug: "amazon",
    name: "Amazon Shopping",
    developer: "AMZN Mobile LLC",
    category: "Shopping",
    latestVersion: "25.6.0",
    previousVersion: "25.5.0",
    releaseDate: "March 2026",
    appStoreId: "297606951",
    summary:
      "Monitor Amazon Shopping app updates and track release activity in one of the largest commerce apps.",
  },
  {
    slug: "uber",
    name: "Uber",
    developer: "Uber Technologies, Inc.",
    category: "Travel",
    latestVersion: "3.610.100",
    previousVersion: "3.609.100",
    releaseDate: "March 2026",
    appStoreId: "368677368",
    summary:
      "Track Uber iOS app version changes and stay aware of release movement in transportation and mobility.",
  },
  {
    slug: "airbnb",
    name: "Airbnb",
    developer: "Airbnb, Inc.",
    category: "Travel",
    latestVersion: "24.11",
    previousVersion: "24.10",
    releaseDate: "March 2026",
    appStoreId: "401626263",
    summary:
      "Monitor Airbnb App Store updates and follow release cadence across a major travel platform.",
  },
  {
    slug: "dropbox",
    name: "Dropbox: Files & Photos",
    developer: "Dropbox, Inc.",
    category: "Productivity",
    latestVersion: "390.2",
    previousVersion: "390.1",
    releaseDate: "March 2026",
    appStoreId: "327630330",
    summary:
      "Track Dropbox version changes and monitor release movement in a widely used file and productivity app.",
  },
  {
    slug: "paypal",
    name: "PayPal",
    developer: "PayPal, Inc.",
    category: "Finance",
    latestVersion: "8.59.0",
    previousVersion: "8.58.0",
    releaseDate: "March 2026",
    appStoreId: "283646709",
    summary:
      "Monitor PayPal iOS version changes and stay aware of release cadence in a major payments app.",
  },
  {
    slug: "zoom",
    name: "ZOOM Cloud Meetings",
    developer: "Zoom Communications, Inc.",
    category: "Business",
    latestVersion: "6.0.1",
    previousVersion: "6.0.0",
    releaseDate: "March 2026",
    appStoreId: "546505307",
    summary:
      "Track Zoom App Store updates and monitor business software release activity automatically.",
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
      description: "The requested app page could not be found.",
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
              {entry.name} iOS app version history and update tracker.
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
              Latest {entry.name} app updates
            </div>

            <h2
              style={{
                fontSize: 40,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 0 12px",
              }}
            >
              Track {entry.name} App Store updates automatically.
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              VersionWatcher monitors App Store version changes so you can follow {entry.name} release
              movement without checking the App Store manually.
            </p>
          </div>

          <div className="grid3">
            <div className="card">
              <div className="cardTitle">Latest iOS version</div>
              <div className="cardText">
                The latest tracked iOS version for {entry.name} is v{entry.latestVersion}.
              </div>
            </div>

            <div className="card">
              <div className="cardTitle">Previous tracked version</div>
              <div className="cardText">
                The previous tracked version shown on this page is v{entry.previousVersion}.
              </div>
            </div>

            <div className="card">
              <div className="cardTitle">Useful release signal</div>
              <div className="cardText">
                App version changes can indicate release cadence, iteration speed, and competitive movement.
              </div>
            </div>
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
              Why track {entry.name}
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
              Teams tracking important apps use version movement as a simple but powerful way
              to monitor release velocity, product activity, and market momentum.
            </p>
          </div>

          <div className="grid3">
            <div className="card">
              <div className="cardTitle">Version history visibility</div>
              <div className="cardText">
                Keep a clear view of the latest and previous tracked version for {entry.name}.
              </div>
            </div>

            <div className="card">
              <div className="cardTitle">Competitor awareness</div>
              <div className="cardText">
                Stay aware when {entry.name} ships and use that movement as product and market context.
              </div>
            </div>

            <div className="card">
              <div className="cardTitle">Faster monitoring</div>
              <div className="cardText">
                Let VersionWatcher do the checking instead of manually revisiting App Store listings.
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
                  The latest tracked version shown on this page is v{entry.latestVersion}.
                </div>
              </div>

              <div className="faqCard">
                <div className="faqQ">What was the previous tracked version of {entry.name}?</div>
                <div className="faqA">
                  The previous tracked version shown here is v{entry.previousVersion}.
                </div>
              </div>

              <div className="faqCard">
                <div className="faqQ">Can I track {entry.name} automatically?</div>
                <div className="faqA">
                  Yes. With VersionWatcher, you can monitor {entry.name} and receive alerts whenever its App Store version changes.
                </div>
              </div>

              <div className="faqCard">
                <div className="faqQ">Why monitor {entry.name} app updates?</div>
                <div className="faqA">
                  Monitoring {entry.name} updates helps product teams, founders, agencies, and ASO teams stay aware of release movement and market activity.
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
