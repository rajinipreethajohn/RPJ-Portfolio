const STILLHAUS_URL = "https://stillhaus.netlify.app";

export default function ArtPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 pt-14 pb-32 text-gray-700">
      <section className="max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-yellow-700">
          Immersive Experiences
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Art as a quiet practice of seeing.
        </h1>
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
          <p>My art lives at the intersection of intuition and technology.</p>
          <p>
            Some pieces begin with a color. Others with silence, a dream, a
            conversation, a place, or a feeling I cannot fully explain.
          </p>
          <p>
            AI and digital tools are simply extensions of the creative process.
            The real inspiration comes from being deeply present in ordinary
            moments.
          </p>
        </div>

        <div className="mt-8 flex justify-center md:justify-start">
          <a
            href={STILLHAUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-6 py-3 bg-gray-900 text-white hover:bg-gray-700 transition"
          >
            Visit Stillhaus
          </a>
        </div>
      </section>
    </main>
  );
}
