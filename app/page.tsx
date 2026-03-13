import Link from "next/link";

const trackedApps = ["Spotify", "WhatsApp", "Netflix", "Telegram", "Notion"];

const recentlyDetected = [
  {
    app: "Spotify: Music and Podcasts",
    from: "9.1.26",
    to: "9.1.28",
    note: "Monitor high-frequency releases and spot competitor velocity faster.",
  },
  {
    app: "Instagram",
    from: "419.0",
    to: "420.0",
    note: "Track consumer app release cadence and product momentum over time.",
  },
  {
    app: "Notion",
    from: "2.49",
    to: "2.50",
    note: "Follow productivity and SaaS-adjacent apps that shape feature expectations.",
  },
  {
    app: "TikTok",
    from: "38.6.0",
    to: "38.7.0",
    note: "Catch major market moves the moment a tracked app ships a new version.",
  },
];

const audiences = [
  ["Product managers", "Monitor competitor release velocity and feature movement"],
  ["ASO teams", "Catch version changes the moment they happen"],
  ["Agencies", "Track dozens of client and competitor apps from one place"],
  ["Founders / QA", "Know exactly when a tracked app ships"],
];

const featureChips = [
  "Automatic checks every 2 hours",
  "Email alerts when versions change",
  "Track competitors, clients, and your own apps",
];

const proofCards = [
  {
    title: "Built for real monitoring",
    text: "Track App Store version changes automatically instead of checking apps manually and missing important releases.",
  },
  {
    title: "Useful from day one",
    text: "Watch competitors, client portfolios, market leaders, or your own app releases from one clean dashboard.",
  },
  {
    title: "Grows into intelligence",
    text: "Over time, VersionWatcher becomes a signal layer for release cadence, product momentum, and market activity.",
  },
];

const steps = [
  ["1. Add apps", "Track competitors, client apps, market leaders, or your own product."],
  ["2. We monitor versions", "VersionWatcher checks App Store version changes automatically every 2 hours."],
  ["3. Get alerted", "Receive email alerts when a tracked app ships a new version."],
];

const pricing = [
  {
    name: "Free",
    price: "€0",
    apps: "1 app",
    desc: "Perfect for trying the product and tracking one important app.",
    cta: "Start free",
    href: "/signup",
    featured: false,
  },
  {
    name: "Basic",
    price: "€9",
    apps: "5 apps",
    desc: "For focused tracking across competitors, clients, or multiple products.",
    cta: "Choose Basic",
    href: "/signup",
    featured: false,
  },
  {
    name: "Pro",
    price: "€19",
    apps: "Unlimited apps",
    desc: "For teams and power users who want complete App Store monitoring.",
    cta: "Choose Pro",
    href: "/signup",
    featured: true,
  },
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 600px at 12% 0%, rgba(37,99,235,.18), rgba(0,0,0,0) 52%), radial-gradient(900px 500px at 82% 18%, rgba(168,85,247,.12), rgba(0,0,0,0) 44%), #020617",
        color: "#f8fafc",
      }}
    >
      <section
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "28px 20px 88px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
          </div>

          <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="#pricing"
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                border: "1px solid rgba(148,163,184,.18)",
                color: "#e2e8f0",
                textDecoration: "none",
                background: "rgba(15,23,42,.42)",
              }}
            >
              Pricing
            </a>

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
          </nav>
        </header>

        <div className="heroGrid">
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
              App Store release intelligence for teams
            </div>

            <h1
              style={{
                fontSize: "clamp(40px, 7vw, 74px)",
                lineHeight: 1.02,
                letterSpacing: -2,
                margin: "0 0 18px",
                fontWeight: 900,
                maxWidth: 760,
              }}
            >
              Monitor App Store competitor updates automatically.
            </h1>

            <p
              style={{
                fontSize: 20,
                lineHeight: 1.65,
                color: "rgba(226,232,240,.86)",
                maxWidth: 760,
                margin: "0 0 24px",
              }}
            >
              Get alerted the moment any iOS app ships a new version. Track
              competitors, client apps, and your own releases from one clean dashboard.
            </p>

            <div
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "#cbd5e1",
                marginBottom: 26,
                maxWidth: 760,
              }}
            >
              Track apps like{" "}
              <strong style={{ color: "#f8fafc" }}>Spotify</strong>,{" "}
              <strong style={{ color: "#f8fafc" }}>WhatsApp</strong>,{" "}
              <strong style={{ color: "#f8fafc" }}>Netflix</strong>,{" "}
              <strong style={{ color: "#f8fafc" }}>Telegram</strong>, and millions of
              iOS apps.
            </div>

            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 24,
              }}
            >
              <Link
                href="/signup"
                style={{
                  padding: "14px 20px",
                  borderRadius: 14,
                  background: "#f8fafc",
                  color: "#0f172a",
                  textDecoration: "none",
                  fontWeight: 900,
                  boxShadow: "0 14px 40px rgba(255,255,255,.08)",
                }}
              >
                Start free
              </Link>

              <a
                href="#live-updates"
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
                See live activity
              </a>
            </div>

            <div className="chipsGrid">
              {featureChips.map((item) => (
                <div
                  key={item}
                  style={{
                    padding: 14,
                    borderRadius: 16,
                    background: "rgba(15,23,42,.42)",
                    border: "1px solid rgba(148,163,184,.10)",
                    color: "rgba(226,232,240,.92)",
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </div>
              ))}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                  marginBottom: 18,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontSize: 15, color: "#94a3b8" }}>Live signal</div>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>
                    Spotify: Music and Podcasts updated
                  </div>
                </div>

                <div
                  style={{
                    alignSelf: "start",
                    padding: "6px 10px",
                    borderRadius: 999,
                    background: "rgba(34,197,94,.14)",
                    color: "#86efac",
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  v9.1.26 → v9.1.28
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                {audiences.map(([title, desc]) => (
                  <div
                    key={title}
                    className="useCaseRow"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "12px 14px",
                      borderRadius: 14,
                      background: "rgba(15,23,42,.58)",
                      border: "1px solid rgba(148,163,184,.08)",
                    }}
                  >
                    <div style={{ fontWeight: 800 }}>{title}</div>
                    <div style={{ color: "#94a3b8", textAlign: "right" }}>{desc}</div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: 16,
                  borderRadius: 16,
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,.14), rgba(168,85,247,.10))",
                  border: "1px solid rgba(59,130,246,.14)",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "#93c5fd",
                    fontWeight: 800,
                    marginBottom: 8,
                  }}
                >
                  Bigger vision
                </div>
                <div style={{ fontSize: 16, lineHeight: 1.6, color: "#e2e8f0" }}>
                  VersionWatcher is not just an alert tool — it becomes an App Store
                  intelligence layer built from release signals over time.
                </div>
              </div>
            </div>
          </div>
        </div>

        <section style={{ marginTop: 30 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "#94a3b8",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 1.2,
              }}
            >
              Popular apps teams track
            </div>

            {trackedApps.map((app) => (
              <div
                key={app}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "rgba(15,23,42,.42)",
                  border: "1px solid rgba(148,163,184,.12)",
                  color: "#e2e8f0",
                  fontSize: 14,
                }}
              >
                {app}
              </div>
            ))}
          </div>
        </section>

        <section id="live-updates" style={{ marginTop: 88 }}>
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
              Recently detected updates
            </div>

            <h2
              style={{
                fontSize: 42,
                lineHeight: 1.1,
                margin: "0 0 12px",
                fontWeight: 900,
              }}
            >
              Real App Store activity, made useful.
            </h2>

            <p
              style={{
                color: "rgba(226,232,240,.82)",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              VersionWatcher helps you turn noisy release activity into a usable signal
              for product, growth, ASO, and competitive research.
            </p>
          </div>

          <div className="liveGrid">
            {recentlyDetected.map((item) => (
              <div
                key={item.app}
                style={{
                  padding: 22,
                  borderRadius: 20,
                  background: "rgba(15,23,42,.38)",
                  border: "1px solid rgba(148,163,184,.10)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "flex-start",
                    marginBottom: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ fontSize: 20, fontWeight: 900, maxWidth: 360 }}>
                    {item.app}
                  </div>

                  <div
                    style={{
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: "rgba(34,197,94,.14)",
                      color: "#86efac",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    v{item.from} → v{item.to}
                  </div>
                </div>

                <div style={{ color: "rgba(226,232,240,.78)", lineHeight: 1.7 }}>
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 88 }}>
          <div className="whyGrid">
            {proofCards.map((item) => (
              <div
                key={item.title}
                style={{
                  padding: 22,
                  borderRadius: 20,
                  background: "rgba(15,23,42,.38)",
                  border: "1px solid rgba(148,163,184,.10)",
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
                  {item.title}
                </div>
                <div style={{ color: "rgba(226,232,240,.82)", lineHeight: 1.7 }}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 88 }}>
          <div style={{ maxWidth: 760 }}>
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
              How it works
            </div>

            <h2
              style={{
                fontSize: 42,
                lineHeight: 1.1,
                margin: "0 0 12px",
                fontWeight: 900,
              }}
            >
              Three simple steps.
            </h2>

            <p style={{ color: "rgba(226,232,240,.82)", fontSize: 18, lineHeight: 1.7 }}>
              Add apps. We monitor versions. You get the signal.
            </p>
          </div>

          <div className="stepsGrid" style={{ marginTop: 28 }}>
            {steps.map(([title, text]) => (
              <div
                key={title}
                style={{
                  padding: 24,
                  borderRadius: 22,
                  background: "rgba(2,6,23,.55)",
                  border: "1px solid rgba(148,163,184,.10)",
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>
                  {title}
                </div>
                <div style={{ color: "rgba(226,232,240,.82)", lineHeight: 1.7 }}>
                  {text}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" style={{ marginTop: 88 }}>
          <div style={{ maxWidth: 760, marginBottom: 24 }}>
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
              Pricing
            </div>

            <h2 style={{ fontSize: 42, lineHeight: 1.1, margin: 0, fontWeight: 900 }}>
              Simple plans. Built to scale with your use case.
            </h2>
          </div>

          <div className="pricingGrid">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                style={{
                  padding: 24,
                  borderRadius: 22,
                  background: plan.featured
                    ? "linear-gradient(180deg, rgba(37,99,235,.16), rgba(15,23,42,.72))"
                    : "rgba(15,23,42,.42)",
                  border: plan.featured
                    ? "1px solid rgba(59,130,246,.24)"
                    : "1px solid rgba(148,163,184,.10)",
                  boxShadow: plan.featured ? "0 20px 50px rgba(37,99,235,.14)" : "none",
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 900 }}>{plan.name}</div>
                <div style={{ fontSize: 46, fontWeight: 900, margin: "10px 0 4px" }}>
                  {plan.price}
                </div>
                <div style={{ color: "#94a3b8", marginBottom: 18 }}>per month</div>
                <div style={{ marginBottom: 10, color: "#e2e8f0" }}>{plan.apps}</div>
                <div
                  style={{
                    marginBottom: 22,
                    color: "rgba(226,232,240,.78)",
                    lineHeight: 1.6,
                  }}
                >
                  {plan.desc}
                </div>

                <Link
                  href={plan.href}
                  style={{
                    display: "inline-block",
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: plan.featured ? "#f8fafc" : "rgba(248,250,252,.08)",
                    color: plan.featured ? "#0f172a" : "#f8fafc",
                    textDecoration: "none",
                    fontWeight: 900,
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 88 }}>
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
            <h2 style={{ fontSize: 42, margin: "0 0 12px", fontWeight: 900 }}>
              Stop checking manually.
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
              Turn App Store release activity into a signal you can actually use.
              Track apps, monitor competitors, and get alerted when the market moves.
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

        <footer
          style={{
            marginTop: 72,
            paddingTop: 24,
            borderTop: "1px solid rgba(148,163,184,.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            color: "rgba(148,163,184,.9)",
            fontSize: 14,
          }}
        >
          <div>© VersionWatcher</div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>
              Privacy
            </a>
            <a href="/terms" style={{ color: "inherit", textDecoration: "none" }}>
              Terms
            </a>
            <a
              href="mailto:hello@versionwatcher.com"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Contact
            </a>
          </div>
        </footer>
      </section>

      <style>{`
        .heroGrid,
        .whyGrid,
        .stepsGrid,
        .pricingGrid,
        .liveGrid,
        .chipsGrid {
          display: grid;
          gap: 18px;
        }

        .heroGrid {
          grid-template-columns: 1.08fr 0.92fr;
          gap: 36px;
          align-items: center;
        }

        .chipsGrid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .whyGrid,
        .stepsGrid,
        .pricingGrid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .liveGrid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        @media (max-width: 980px) {
          .heroGrid,
          .whyGrid,
          .stepsGrid,
          .pricingGrid,
          .liveGrid,
          .chipsGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 780px) {
          .useCaseRow {
            flex-direction: column;
            align-items: flex-start;
          }

          .useCaseRow > div:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </main>
  );
}
