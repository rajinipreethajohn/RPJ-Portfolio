import Image from "next/image";

const STILLHAUS_URL = "https://stillhaus.netlify.app";

const featuredWorks = [
  {
    title: "Watercolor Studies",
    medium: "Watercolor",
    image: "/images/watercolor.jpg",
    alt: "Soft watercolor artwork with layered washes",
  },
  {
    title: "Quiet Atmospheres",
    medium: "Mixed media",
    image: "/images/watercolor1.jpg",
    alt: "Atmospheric watercolor artwork with gentle color transitions",
  },
  {
    title: "Nature And Memory",
    medium: "Watercolor",
    image: "/images/watercolor2.jpg",
    alt: "Watercolor texture inspired by natural forms and memory",
  },
];

export default function ArtPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-14 text-gray-700">
      <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
        <div>
          <p className="uppercase tracking-[0.18em] text-sm text-gray-600 mb-4">
            Stillhaus
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Art as a quiet practice of seeing.
          </h1>
          <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
            <p>
              My art lives at the intersection of intuition and technology.
            </p>
            <p>
              Some pieces begin with a color. Others with silence, a dream, a
              conversation, a place, or a feeling I cannot fully explain.
            </p>
            <p>
              AI and digital tools are simply extensions of the creative
              process. The real inspiration comes from being deeply present in
              ordinary moments.
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
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg bg-white">
          <Image
            src="/images/watercolor2.jpg"
            alt="Featured watercolor texture from the art collection"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Selected Glimpses
            </h2>
            <p className="mt-3 text-gray-700 max-w-2xl leading-relaxed">
              A small preview from the visual world that Stillhaus expands into:
              texture, nature, mood, and quiet color.
            </p>
          </div>
          <a
            href={STILLHAUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 underline underline-offset-4 hover:text-yellow-700"
          >
            Open the full gallery
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredWorks.map((work) => (
            <article
              key={work.title}
              className="bg-white/85 rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={work.image}
                  alt={work.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900">
                  {work.title}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gray-500">
                  {work.medium}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
