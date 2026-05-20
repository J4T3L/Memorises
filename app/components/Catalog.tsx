"use client";
import { useAppData } from "../context/AppDataContext";
import Reveal from "./Reveal";

function formatIDR(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function Catalog() {
  const { equipment } = useAppData();
  const activeItems = equipment.filter(e => e.isActive);

  return (
    <section id="katalog" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Katalog Alat</h2>
              <h3 className="text-3xl font-bold text-slate-900">Perlengkapan Premium</h3>
            </div>
            <button className="flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-5 py-2.5 rounded-full hover:bg-blue-100 transition-colors">
              Unduh Pricelist Lengkap <span className="ml-2 font-normal">&darr;</span>
            </button>
          </div>
        </Reveal>

        {activeItems.length === 0 ? (
          <div className="text-center text-slate-400 py-16">
            <p className="font-medium">Belum ada equipment yang tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 100} direction="up" className="h-full">
                <div className="modern-card p-6 flex flex-col h-full relative overflow-hidden group hover:border-blue-200 cursor-default">
                  
                  <div className="flex justify-between items-start mb-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 shadow-sm">
                      {item.category}
                    </span>
                    {item.tag && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white uppercase tracking-wider shadow-sm">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-900 mb-3" title={item.name}>{item.name}</h4>
                  <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed" title={item.description}>{item.description}</p>
                  
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Harga Sewa</div>
                      <div className="text-base font-bold text-blue-600">{formatIDR(item.pricePerDay)}/hari</div>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-sm" aria-label="Detail">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  </div>
                  
                </div>
              </Reveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
