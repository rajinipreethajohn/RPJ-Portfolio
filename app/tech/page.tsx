export default function TechPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">✨ Tech Projects </h1>
      <div className="grid md:grid-cols-3 gap-6">

        <a
          href="https://klcityguide.it.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <h3 className="text-xl font-semibold mb-2">🌿 KL City Guide</h3>
          <p className="text-gray-600">
            A curated web directory for expats in Kuala Lumpur — featuring schools, healthcare, pet services, and more. Built using Next.js and Supabase.
          </p>
        </a>

        <a
          href="https://shenirvananewsletter.streamlit.app"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <h3 className="text-xl font-semibold mb-2">🌸 The She Nirvana</h3>
          <p className="text-gray-600">
            A weekly soul-letter exploring women’s well-being — blending energy rituals, affirmations, intention-setting, and emotional resilience.
          </p>
        </a>

        <a
          href="https://mysticaltarotgarden.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
        >
         <h3 className="text-xl font-semibold mb-2">🌌 The Archetype Engine</h3>
         <p className="text-gray-600">
            A web-based tool that maps 78 ancient archetypes to psychological states — blending symbolic storytelling with interactive design and cognitive science.
         </p>
        </a>

      </div>
    </main>
  );
}
