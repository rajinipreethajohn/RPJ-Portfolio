export default function ThankYou() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
        <p className="text-lg text-gray-700">
          Your message has been sent successfully. I’ll be in touch soon!
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition"
        >
          Return to Home
        </a>
      </div>
    </main>
  );
}
