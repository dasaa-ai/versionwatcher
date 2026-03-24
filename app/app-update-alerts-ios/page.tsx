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

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.versionwatcher.com/app-update-alerts-ios#webpage",
      url: "https://www.versionwatcher.com/app-update-alerts-ios",
      name: "iOS App Update Alerts | VersionWatcher",
      description:
        "Get iOS app update alerts with VersionWatcher. Track App Store version changes automatically and get notified when apps release new versions.",
      isPartOf: {
        "@id": "https://www.versionwatcher.com/#website",
      },
      about: {
        "@id": "https://www.versionwatcher.com/#software",
      },
      breadcrumb: {
        "@id": "https://www.versionwatcher.com/app-update-alerts-ios#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.versionwatcher.com/app-update-alerts-ios#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.versionwatcher.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "iOS App Update Alerts",
          item: "https://www.versionwatcher.com/app-update-alerts-ios",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.versionwatcher.com/app-update-alerts-ios#softwareapplication",
      name: "VersionWatcher",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://www.versionwatcher.com",
      description:
        "VersionWatcher helps teams get iOS app update alerts automatically, monitor App Store version changes, and stay aware when tracked apps ship new releases.",
      publisher: {
        "@type": "Organization",
        "@id": "https://www.versionwatcher.com/#organization",
        name: "VersionWatcher",
        url: "https://www.versionwatcher.com",
        logo: "https://www.versionwatcher.com/versionwatcher-logo.svg",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Free",
          price: "0",
          priceCurrency: "EUR",
          url: "https://www.versionwatcher.com/signup",
        },
        {
          "@type": "Offer",
          name: "Basic",
          price: "9",
          priceCurrency: "EUR",
          url: "https://www.versionwatcher.com/signup",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "19",
          priceCurrency: "EUR",
          url: "https://www.versionwatcher.com/signup",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.versionwatcher.com/app-update-alerts-ios#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I get alerts when an app updates?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "With VersionWatcher you add the app you want to monitor, and when the App Store version changes you receive an email alert.",
          },
        },
        {
          "@type": "Question",
          name: "Can I track competitor apps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Many product teams, founders, and agencies use VersionWatcher specifically to monitor competitor app releases.",
          },
        },
        {
          "@type": "Question",
          name: "How frequently are updates checked?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "VersionWatcher checks tracked apps every two hours.",
          },
        },
        {
          "@type": "Question",
          name: "Does this work for any iOS app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can track almost any iOS app listed on the App Store.",
          },
        },
      ],
    },
  ],
};

const benefits = [
  {
    title: "Never miss an update",
    text: "Get alerted when any tracked iOS app releases a new version so you always know when competitors or market leaders ship.",
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
  {
    app: "Spotify",
    from: "9.1.26",
    to: "9.1.28",
    note: "Get alerted when a leading app ships so your team stays aware of important release movement.",
  },
  {
    app: "Instagram",
    from: "419.0",
    to: "420.0",
    note: "Track fast-moving consumer apps and receive alerts without checking the App Store manually.",
  },
  {
    app: "Notion",
    from: "2.49",
    to: "2.50",
    note: "Follow SaaS and productivity apps where release changes can signal meaningful product activity.",
  },
];

const faqs = [
  {
    q: "How do I get alerts when an app updates?",
    a: "With VersionWatcher you add the app you want to monitor, and when the App Store version changes you receive an email alert.",
  },
  {
    q: "Can I track competitor apps?",
    a: "Yes. Many product teams, founders, and agencies use VersionWatcher specifically to monitor competitor app releases.",
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
            <img
              src="/versionwatcher-logo.svg"
              alt="VersionWatcher logo"
              width={42}
              height={42}
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                display: "block",
                boxShadow: "0 10px 30px rgba(59,130,246,.28)",
              }}
            />
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
            marginBottom: 70,
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
              iOS alerting for release monitoring
            </div>

            <h1
              style={{
                fontSize: "clamp(40px,6vw,68px)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: -2,
                marginBottom: 18,
                maxWidth: 760,
              }}
            >
              Get alerts when iOS apps update.
            </h1>

            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: "#cbd5e1",
                maxWidth: 760,
                marginBottom: 18,
              }}
            >
              If you want iOS app update alerts,{" "}
              <Link
                href="/"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                VersionWatcher
              </Link>{" "}
              helps you track App Store version changes automatically and get notified when a tracked app releases a new version. Instead of checking the App Store manually, you can receive alerts across competitor apps, client portfolios, and your own products.
            </p>

            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: "#cbd5e1",
                maxWidth: 760,
                marginBottom: 20,
              }}
            >
              Teams use VersionWatcher to get iOS app update alerts, monitor release cadence, and stay aware of important App Store movement the moment it happens.
            </p>

            <p
              style={{
                color: "#cbd5e1",
                marginBottom: 20,
                maxWidth: 760,
                lineHeight: 1.7,
                fontSize: 16,
              }}
            >
              You can explore detailed tracking pages like{" "}
              <Link
                href="/apps/spotify"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                Spotify version tracker
              </Link>{" "}
              or{" "}
              <Link
                href="/apps/notion"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                Notion version tracker
              </Link>
              .
            </p>

            <p
              style={{
                fontSize: 20,
                lineHeight: 1.6,
                maxWidth: 760,
                color: "#cbd5e1",
                marginBottom: 24,
              }}
            >
              VersionWatcher sends alerts whenever a tracked iOS app releases a
              new version on the App Store. Perfect for monitoring competitors,
              client apps, and your own product releases.
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
              Get alerts for apps like{" "}
              <Link
                href="/apps/spotify"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                Spotify
              </Link>
              ,{" "}
              <Link
                href="/apps/instagram"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                Instagram
              </Link>
              ,{" "}
              <Link
                href="/apps/notion"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                Notion
              </Link>
              , and other iOS apps automatically.
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
                Why teams use update alerts
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {benefits.map((b) => (
                  <div
                    key={b.title}
                    style={{
                      padding: 16,
                      borderRadius: 14,
                      background: "rgba(15,23,42,.58)",
                      border: "1px solid rgba(148,163,184,.08)",
                    }}
                  >
                    <div style={{ fontWeight: 900, marginBottom: 6 }}>
                      {b.title}
                    </div>
                    <div style={{ color: "#94a3b8", lineHeight: 1.6 }}>
                      {b.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 70 }}>
          <h2
            style={{
              fontSize: 38,
              fontWeight: 900,
              marginBottom: 16,
            }}
          >
            Example detected updates
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: 1.7,
              fontSize: 18,
              maxWidth: 760,
              marginBottom: 24,
            }}
          >
            See how update alerts can help your team stay aware of release changes
            across important apps without manual checking.
          </p>

          <div className="grid3">
            {examples.map((e) => (
              <div key={e.app} className="card">
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
                  v{e.from} → v{e.to}
                </div>

                <div className="cardTitle">{e.app}</div>
                <div className="cardText">{e.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 70 }}>
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

        <section>
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
              Start getting iOS app update alerts today.
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
              If your team wants a clean way to get notified when important iOS
              apps release new versions, VersionWatcher is built for that exact job.
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

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
