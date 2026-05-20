import Image from "next/image";
import Reveal from "./Reveal";

const portfolio = [
  { src: "/portfolio-wedding.png", title: "Pernikahan Elegan", category: "Wedding" },
  { src: "/portfolio-product.png", title: "Katalog Minimalis", category: "Produk" },
  { src: "/portfolio-fashion.png", title: "Musim Semi 2026", category: "Fashion" },
  { src: "/studio-rental.png", title: "Komersial Interior", category: "Arsitektur" },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Portfolio</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Karya Terbaik Kami</h3>
            <p className="mt-4 text-slate-600 text-lg">Hasil tangkapan lensa dari momen tak terlupakan dan proyek profesional.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolio.map((item, i) => (
            <Reveal key={i} delay={i * 150} direction="up">
              <div className="group relative rounded-2xl overflow-hidden aspect-square modern-card border-none shadow-md">
                <div className="absolute inset-0 bg-slate-200">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-blue-500 text-white text-[10px] uppercase font-bold tracking-wider rounded-full shadow-sm mb-3">
                    {item.category}
                  </span>
                  <h4 className="text-xl font-bold text-white tracking-tight">{item.title}</h4>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 text-center">
            <button className="btn-secondary px-8 py-3 text-base font-semibold text-slate-700 shadow-sm">
              Lihat Galeri Lengkap
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
