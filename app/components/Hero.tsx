import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="bg-slate-50 relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Text */}
          <div className="lg:w-1/2">
            <Reveal direction="up" delay={0}>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm text-blue-600 text-sm font-semibold mb-6">
                <span className="flex w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                Studio Fotografi Terbaik di Jakarta
              </div>
            </Reveal>

            <Reveal direction="up" delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.15]">
                Tangkap momen, <br />
                <span className="text-blue-600">lestarikan kenangan.</span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={200}>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                Jasa fotografi profesional, penyewaan studio berstandar industri, dan peralatan kamera terlengkap untuk karya visual luar biasa.
              </p>
            </Reveal>
            
            <Reveal direction="up" delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a href="#layanan" className="btn-primary space-x-2 text-base py-3.5 px-7">
                  <span>Mulai Sekarang</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="#portfolio" className="btn-secondary text-base py-3.5 px-7">
                  Lihat Karya
                </a>
              </div>
            </Reveal>

            <Reveal direction="up" delay={400}>
              <div className="flex items-center gap-8 border-t border-slate-200 pt-8">
                <div>
                  <div className="text-2xl font-bold text-slate-900">500+</div>
                  <div className="text-sm font-medium text-slate-500 mt-1">Klien Bahagia</div>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">50+</div>
                  <div className="text-sm font-medium text-slate-500 mt-1">Peralatan</div>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">3</div>
                  <div className="text-sm font-medium text-slate-500 mt-1">Studio Modern</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
             <Reveal direction="left" delay={200} className="w-full h-full">
              <div className="absolute inset-0 bg-blue-200 rounded-[2rem] transform rotate-3 scale-100 transition-transform duration-700 opacity-60"></div>
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image 
                  src="/hero.png" 
                  alt="Fotografer Capture Studio" 
                  fill 
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute bottom-10 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Peralatan Ready</div>
                  <div className="text-xs font-semibold text-slate-500">Tersedia hari ini</div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
