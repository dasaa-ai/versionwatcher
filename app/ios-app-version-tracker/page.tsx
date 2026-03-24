import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "iOS App Version Tracker | VersionWatcher",
  description:
    "Use VersionWatcher as an iOS app version tracker. Monitor version history, detect app releases, and get alerts when tracked apps update.",
  alternates: {
    canonical: "https://www.versionwatcher.com/ios-app-version-tracker",
  },
  openGraph: {
    title: "iOS App Version Tracker | VersionWatcher",
    description:
      "Use VersionWatcher as an iOS app version tracker. Monitor version history, detect app releases, and get alerts when tracked apps update.",
    url: "https://www.versionwatcher.com/ios-app-version-tracker",
    siteName: "VersionWatcher",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iOS App Version Tracker | VersionWatcher",
    description:
      "Use VersionWatcher as an iOS app version tracker. Monitor version history, detect app releases, and get alerts when tracked apps update.",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.versionwatcher.com/ios-app-version-tracker#webpage",
      url: "https://www.versionwatcher.com/ios-app-version-tracker",
      name: "iOS App Version Tracker | VersionWatcher",
      description:
        "Use VersionWatcher as an iOS app version tracker. Monitor version history, detect app releases, and get alerts when tracked apps update.",
      isPartOf: {
        "@id": "https://www.versionwatcher.com/#website",
      },
      about: {
        "@id": "https://www.versionwatcher.com/#software",
      },
      breadcrumb: {
        "@id": "https://www.versionwatcher.com/ios-app-version-tracker#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.versionwatcher.com/ios-app-version-tracker#breadcrumb",
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
          name: "iOS App Version Tracker",
          item: "https://www.versionwatcher.com/ios-app-version-tracker",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.versionwatcher.com/ios-app-version-tracker#softwareapplication",
      name: "VersionWatcher",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://www.versionwatcher.com",
      description:
        "VersionWatcher helps teams track iOS app versions automatically, monitor App Store version changes, and get alerts when tracked apps ship new releases.",
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
      "@id": "https://www.versionwatcher.com/ios-app-version-tracker#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is an iOS app version tracker?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An iOS app version tracker is a tool that monitors App Store version changes and alerts you when a tracked app publishes a new release.",
          },
        },
        {
          "@type": "Question",
          name: "Why track iOS app versions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tracking iOS app versions helps you understand release cadence, product movement, and competitor activity without checking manually.",
          },
        },
        {
          "@type": "Question",
          name: "Can I track competitor versions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. VersionWatcher is ideal for monitoring competitor app versions and staying aware of important App Store changes.",
          },
        },
        {
          "@type": "Question",
          name: "How often are apps checked?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "VersionWatcher checks tracked apps every two hours.",
          },
        },
      ],
    },
  ],
};

const benefits = [
  {
    title: "Track version changes automatically",
    text: "VersionWatcher monitors App Store version changes so you always know when a tracked iOS app ships a new release.",
  },
  {
    title: "Follow competitors and market leaders",
    text: "Track competitor apps, category leaders, and client portfolios without checking App Store pages manually.",
  },
  {
    title: "Use versions as a signal",
    text: "A new version often signals movement in product development, release cadence, or market activity.",
  },
];

const examples = [
  {
    app: "Spotify",
    change: "v9.1.26 → v9.1.28",
    note: "Track how often a leading app ships and use that cadence as a competitive signal.",
  },
  {
    app: "WhatsApp",
    change: "v25.7.81 → v25.8.10",
    note: "Monitor widely used apps to stay aware of changes that may influence user expectations.",
  },
  {
    app: "Notion",
    change: "v2.49 → v2.50",
    note: "Follow SaaS and productivity apps where rapid iteration can signal important product movement.",
  },
];

const useCases = [
  {
    title: "Product managers",
    text: "Watch how often competitors release new versions and stay aware of market movement.",
  },
  {
    title: "ASO teams",
    text: "Monitor version updates across important apps and categories from one clean dashboard.",
  },
  {
    title: "Founders and agencies",
    text: "Track multiple iOS apps across your own products, clients, and competitors in one place.",
  },
];

const faqs = [
  {
    q: "What is an iOS app version tracker?",
    a: "An iOS app version tracker is a tool that monitors App Store version changes and alerts you when a tracked app publishes a new release.",
  },
  {
    q: "Why track iOS app versions?",
    a: "Tracking iOS app versions helps you understand release cadence, product movement, and competitor activity without checking manually.",
  },
  {
    q: "Can I track competitor versions?",
    a: "Yes. VersionWatcher is ideal for monitoring competitor app versions and staying aware of important App Store changes.",
  },
  {
    q: "How often are apps checked?",
    a: "VersionWatcher checks tracked apps every two hours.",
  },
];

export default function IOSAppVersionTrackerPage() {
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
              iOS version monitoring for teams
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
              iOS app version tracker for competitor and market monitoring.
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
              If you want an iOS app version tracker,{" "}
              <Link
                href="/"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                VersionWatcher
              </Link>{" "}
              helps you monitor App Store version changes automatically. You can track iOS app versions across competitors, category leaders, client portfolios, and your own releases without checking app pages manually.
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
              Teams use VersionWatcher to detect app releases, follow version history, and turn App Store version changes into a signal for product and market monitoring.
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
                lineHeight: 1.65,
                maxWidth: 760,
                color: "#cbd5e1",
                marginBottom: 24,
              }}
            >
              Track iOS app versions automatically across competitors, category
              leaders, client portfolios, and your own releases. VersionWatcher
              turns App Store version changes into a signal your team can use.
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
                href="/app-store-update-tracker"
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
                View update tracker page
              </Link>
            </div>

            <div
              style={{
                color: "#cbd5e1",
                fontSize: 16,
                lineHeight: 1.7,
              }}
            >
              Monitor apps like{" "}
              <Link
                href="/apps/spotify"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                Spotify
              </Link>
              ,{" "}
              <Link
                href="/apps/whatsapp"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                WhatsApp
              </Link>
              ,{" "}
              <Link
                href="/apps/notion"
                style={{ color: "#93c5fd", textDecoration: "underline" }}
              >
                Notion
              </Link>
              , and other important iOS apps from one dashboard.
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
                Why teams track versions
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {benefits.map((item) => (
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
              Example tracked versions
            </div>

            <h2
              style={{
                fontSize: 40,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 0 12px",
              }}
            >
              Follow version changes that matter.
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              Version changes are a simple but useful signal for release cadence,
              product movement, and competitor awareness.
            </p>
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
              Useful across multiple teams.
            </h2>
          </div>

          <div className="grid3">
            {useCases.map((item) => (
              <div key={item.title} className="card">
                <div className="cardTitle">{item.title}</div>
                <div className="cardText">{item.text}</div>
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
              Start tracking iOS app versions today.
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
              If your team wants a cleaner way to monitor iOS app versions and
              App Store releases, VersionWatcher is built for exactly that.
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
