export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-300">
      <h1 className="text-3xl font-bold mb-8 text-white">Terms of Service</h1>

      <p className="mb-4">
        By using VersionWatcher, you agree to the following terms and
        conditions.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
        Use of the service
      </h2>

      <p className="mb-4">
        VersionWatcher provides tools to monitor App Store updates for apps
        you choose to track. You agree to use the service responsibly and in
        accordance with applicable laws.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
        Accounts
      </h2>

      <p className="mb-4">
        You are responsible for maintaining the security of your account and
        for all activity that occurs under your account.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
        Payments
      </h2>

      <p className="mb-4">
        Paid plans are billed through Stripe. Subscriptions may be cancelled at
        any time through the billing portal.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
        Service availability
      </h2>

      <p className="mb-4">
        While we strive to provide reliable service, VersionWatcher is
        provided “as is” without warranties of any kind.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
        Contact
      </h2>

      <p>
        For questions regarding these terms, contact{" "}
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
