export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-300">
      <h1 className="text-3xl font-bold mb-8 text-white">Privacy Policy</h1>

      <p className="mb-4">
        VersionWatcher respects your privacy. This page explains how we collect,
        use, and protect your information when you use our service.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
        Information we collect
      </h2>

      <p className="mb-4">
        When you create an account, we collect your email address and basic
        account information. If you purchase a paid plan, payment processing is
        handled securely by Stripe and we do not store your credit card
        information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
        How we use information
      </h2>

      <p className="mb-4">
        We use your information to provide the VersionWatcher service,
        including monitoring app updates and sending notifications when tracked
        apps release new versions.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
        Data protection
      </h2>

      <p className="mb-4">
        We take reasonable measures to protect your data and do not sell or
        share personal information with third parties except where required to
        operate the service.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
        Contact
      </h2>

      <p>
        If you have questions about this Privacy Policy, contact us at{" "}
        <a
          href="mailto:hello@versionwatcher.com"
          className="text-blue-400 underline"
        >
          hello@versionwatcher.com
        </a>
      </p>
    </main>
  );
}
