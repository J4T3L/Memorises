"use client";
import Image from "next/image";
import Reveal from "./Reveal";
import { useAppData } from "../context/AppDataContext";

const fallbackServices = [
  {
    title: "Sewa Peralatan",
    desc: "Koleksi kamera, lensa, dan lighting dari brand terkemuka (Sony, Canon, Nikon, Godox) dengan kondisi terawat dan selalu siap pakai.",
    image: "/camera-rental.png",
    features: ["Harga kompetitif harian/mingguan", "Pemeriksaan alat ketat", "Layanan antar jemput alat"],
    price: "Mulai Rp 150.000 / hari",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </svg>
    )
  },
  {
    title: "Sewa Studio",
    desc: "Studio foto premium ber-AC dengan beragam jenis backdrop, pencahayaan alami, ruang ganti khusus, dan peralatan lighting lengkap.",
    image: "/studio-rental.png",
    features: ["Pilihan 3 ukuran studio", "Backdrop aneka warna", "Free WiFi & ruang tunggu"],
    price: "Mulai Rp 200.000 / jam",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M3 9h18"/>
      </svg>
    )
  },
];

export default function Services() {
  const { services } = useAppData();
  
  // Ambil 3 layanan teratas dari database (jika ada), jika database masih kosong gunakan fallback
  const displayServices = services.length > 0 
    ? services.slice(0, 3).map(svc => ({
        title: svc.name,
        desc: svc.description,
        image: "/photo-service.png", 
        features: svc.includes || ["Konsultasi konsep", "File HD", "Editing dasar"],
        price: "Mulai Rp " + svc.priceStart.toLocaleString("id-ID"),
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>
          </svg>
        )
      }))
    : fallbackServices;

  return (
    <section id="layanan" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3">Layanan Utama</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Solusi Lengkap Kebutuhan Visual Anda</h3>
            <p className="text-slate-600 text-lg">
              Kami menyediakan ekosistem terpadu untuk memastikan setiap proyek kreatif Anda berjalan lancar dengan hasil maksimal.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {displayServices.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 200} direction="up" className="h-full">
              <div className="modern-card flex flex-col h-full overflow-hidden group">
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center text-blue-600 transform group-hover:-rotate-12 transition-transform">
                    {svc.icon}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">{svc.title}</h4>
                  <p className="text-slate-600 text-sm mb-8 leading-relaxed flex-1">
                    {svc.desc}
                  </p>
                  
                  <div className="mb-8 bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      Fitur Utama
                    </div>
                    <ul className="space-y-3">
                      {svc.features.map((f, index) => (
                        <li key={index} className="flex items-start text-sm text-slate-600 font-medium">
                          <svg className="w-5 h-5 text-blue-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                       <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Mulai Dari</div>
                       <div className="text-lg font-bold text-slate-900">{svc.price}</div>
                    </div>
                    <a href="#kontak" className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white flex items-center justify-center transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
