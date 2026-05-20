export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Capture</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-sm">
              Platform layanan fotografi terpadu. Kami menyediakan persewaan alat premium, studio profesional, dan jasa dokumentasi untuk segala kebutuhan visual Anda.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Layanan</h4>
            <ul className="space-y-4">
              {["Sewa Kamera & Lensa", "Sewa Studio Foto", "Jasa Fotografi", "Paket Wedding", "Komersial"].map((l) => (
                <li key={l}>
                  <a href="#layanan" className="text-slate-400 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Perusahaan</h4>
            <ul className="space-y-4">
              {["Tentang Kami", "Portfolio Karya", "Testimoni Klien", "Karir"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Bantuan</h4>
            <ul className="space-y-4">
              {["Hubungi Kami", "Syarat & Ketentuan", "Kebijakan Privasi", "FAQ"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {year} Capture Studio. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Instagram", "Twitter", "Facebook"].map((social) => (
              <a key={social} href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
