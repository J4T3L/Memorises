import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Anisa Rahmawati",
    role: "Klien Wedding",
    text: "Momen pernikahan kami didokumentasikan dengan sangat indah. Detail yang ditangkap fotografer sangat berkesan dan tim bekerja sangat profesional.",
    rating: 5,
    avatar: "A"
  },
  {
    name: "Budi Santoso",
    role: "Content Creator",
    text: "Sewa kamera yang sangat bisa diandalkan. Kondisi alat selalu prima, baterai penuh, dan proses pengambilannya cepat tanpa ribet.",
    rating: 5,
    avatar: "B"
  },
  {
    name: "Dewi Lestari",
    role: "Brand Owner",
    text: "Studio ini dilengkapi peralatan profesional. Nyaman digunakan, staf ramah, dan hasilnya sesuai ekspektasi kampanye kami.",
    rating: 4,
    avatar: "D"
  },
];

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal direction="up">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Ulasan Pelanggan</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Apa Kata Mereka Tentang Kami</h3>
            <p className="text-slate-600 text-lg">Kepercayaan Anda adalah prioritas utama kami. Ini adalah pengalaman nyata dari klien kami.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 150} direction="up" className="h-full">
              <div className="modern-card p-8 flex flex-col h-full bg-white group hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                
                <div className="flex gap-1 mb-6 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="20" height="20" viewBox="0 0 24 24" fill={j < t.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-8 flex-1 italic text-lg">"{t.text}"</p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                  <div className="w-14 h-14 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl shadow-inner shadow-blue-200/50">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-sm font-semibold text-blue-600">{t.role}</div>
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
