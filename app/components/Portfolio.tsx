"use client";
import Image from "next/image";
import Reveal from "./Reveal";
import { useAppData } from "../context/AppDataContext";
import Link from "next/link";

const fallbackPortfolio = [
  { id: "fb1", image: "/portfolio-wedding.png", title: "Pernikahan Elegan", category: "Wedding" },
  { id: "fb2", image: "/portfolio-product.png", title: "Katalog Minimalis", category: "Produk" },
  { id: "fb3", image: "/portfolio-fashion.png", title: "Musim Semi 2026", category: "Fashion" },
  { id: "fb4", image: "/studio-rental.png", title: "Komersial Interior", category: "Arsitektur" },
];

export default function Portfolio() {
  const { portfolio } = useAppData();
  const displayItems = portfolio && portfolio.length > 0 ? portfolio : fallbackPortfolio;

  return (
    <section id="galeri" className="py-24 bg-white border-y border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-orange-700 font-mono tracking-widest uppercase text-xs mb-3 block">GALERI KARYA</span>
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 font-serif leading-tight">
              Karya Terbaik <span className="italic font-bold text-orange-700">Kami</span>
            </h2>
            <p className="mt-4 text-slate-600 text-sm max-w-md mx-auto">Hasil tangkapan lensa dari momen tak terlupakan dan proyek komersial profesional.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayItems.slice(0, 4).map((item, i) => (
            <Reveal key={item.id || i} delay={i * 150} direction="up">
              <div className="group relative aspect-square bg-white border border-neutral-200 viewfinder-box p-2 cursor-pointer">
                <div className="viewfinder-corners-bottom"></div>
                <div className="viewfinder-center text-orange-600"></div>

                <div className="w-full h-full relative overflow-hidden bg-slate-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* Subtle viewfinder marking indicators inside photo overlay */}
                  <div className="absolute top-2 left-2 z-20 flex gap-2 text-[8px] font-mono tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 px-1 py-0.5">
                    <span>{`[o]`}</span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                    <span className="text-[9px] font-mono tracking-widest text-orange-400 uppercase">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-white tracking-tight font-serif italic mt-0.5">{item.title}</h4>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 text-center">
            <Link href="/galeri" className="btn-secondary px-8 py-3 text-sm font-semibold inline-block cursor-pointer">
              Lihat Galeri Lengkap
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
