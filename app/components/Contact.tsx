"use client";
import { useState } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="kontak" className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-50 border-b border-slate-200 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Reveal direction="up">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Punya Pertanyaan?</h2>
            <p className="text-slate-600 text-lg">Hubungi tim kami untuk konsultasi gratis atau permintaan penawaran khusus.</p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={200}>
          <div className="modern-card overflow-hidden shadow-xl border-slate-200">
            <div className="grid lg:grid-cols-5">
              
              {/* Contact Info (Side) */}
              <div className="bg-slate-900 p-10 lg:col-span-2 text-white flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                
                <h3 className="text-2xl font-bold mb-10 relative z-10">Informasi Kontak</h3>
                
                <div className="space-y-10 flex-1 relative z-10">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-100 mb-1">Telepon / WhatsApp</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">+62 812-3456-7890<br/>Respon cepat jam kerja</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-100 mb-1">Email</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">hello@capture.id</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-100 mb-1">Lokasi Studio</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Jl. Fotografi No. 42,<br/>Jakarta Selatan, 12340</p>
                    </div>
                  </div>
                </div>

                {/* Socials */}
                <div className="flex gap-4 mt-12 pt-8 border-t border-slate-800 relative z-10">
                   <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors" title="Instagram">IG</a>
                   <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors" title="Facebook">FB</a>
                   <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors" title="Tiktok">TK</a>
                </div>
              </div>

              {/* Form */}
              <div className="p-10 lg:col-span-3 bg-white">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 border-4 border-green-100 shadow-sm relative">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" className="animate-[scale-in_0.5s_ease-out]"><path d="M20 6 9 17l-5-5"></path></svg>
                      {/* Konfeti ala react sederhana dengan css murni*/}
                      <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Pesan Berhasil Dikirim!</h3>
                    <p className="text-slate-600 mb-8 max-w-sm">Tim representatif kami akan segera menghubungi Anda kembali melalui kontak yang diberikan.</p>
                    <button onClick={() => setSubmitted(false)} className="btn-secondary rounded-full px-6 shadow-sm">Kirim Pesan Lagi</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-6">
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                        <input type="text" required className="input-modern bg-slate-50/50 focus:bg-white" placeholder="Masukkan nama" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor Telepon</label>
                        <input type="tel" className="input-modern bg-slate-50/50 focus:bg-white" placeholder="08xx..." />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                      <input type="email" required className="input-modern bg-slate-50/50 focus:bg-white" placeholder="nama@email.com" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori Pertanyaan</label>
                      <div className="relative">
                        <select required className="input-modern bg-slate-50/50 focus:bg-white appearance-none cursor-pointer border-slate-200">
                          <option value="" disabled selected>Pilih subjek...</option>
                          <option value="equipment">Penyewaan Alat</option>
                          <option value="studio">Penyewaan Studio</option>
                          <option value="service">Jasa Fotografi</option>
                          <option value="other">Lainnya</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                           <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Pesan</label>
                      <textarea rows={4} required className="input-modern bg-slate-50/50 focus:bg-white h-32 resize-none" placeholder="Ceritakan detail kebutuhan atau pertanyaan Anda..." />
                    </div>

                    <div className="pt-2">
                      <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base shadow-md disabled:bg-blue-400 transform transition-transform active:scale-[0.99]">
                        {loading ? "Mengirim Pesan..." : "Kirim Pesan Sekarang"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
