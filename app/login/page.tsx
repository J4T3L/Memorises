"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = await login(email, password);
    setLoading(false);
    if (result.success) router.push("/dashboard");
    else setError(result.message);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-600 rounded-b-[4rem] z-0"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-fade-up">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white text-blue-600 font-bold text-2xl shadow-md mb-6">
            C
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">Selamat Datang Kembali</h2>
          <p className="text-blue-100">Masuk ke akun Anda untuk melanjutkan</p>
        </div>

        <div className="modern-card p-8">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-start">
              <svg className="w-5 h-5 text-red-500 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-modern"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">Lupa sandi?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-modern"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? "Memproses..." : "Masuk Akun"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-slate-500">Belum punya akun? </span>
            <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Daftar sekarang
            </Link>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="mt-8 text-center bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm border border-slate-200/50">
          <p className="mb-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Demo Akun (Klik Untuk Mengisi)</p>
          <div className="flex justify-center gap-3">
            {[
              { role: "Admin", email: "admin@capture.id", pass: "admin123" },
              { role: "User", email: "user@capture.id", pass: "user123" },
            ].map((acc) => (
              <button
                key={acc.role}
                onClick={() => { setEmail(acc.email); setPassword(acc.pass); setError(""); }}
                className="px-3 py-1.5 rounded bg-slate-100 text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                {acc.role}: {acc.email}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
