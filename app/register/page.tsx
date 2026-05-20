"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password minimal 6 karakter"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = await register(name, email, password);
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
          <h2 className="text-2xl font-bold text-white mb-2">Buat Akun Baru</h2>
          <p className="text-blue-100">Daftar untuk mengakses layanan dan dashboard</p>
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-modern"
                placeholder="Masukkan nama"
              />
            </div>
            
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-modern"
                placeholder="Minimal 6 karakter"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? "Memproses..." : "Daftar Akun"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-slate-500">Sudah punya akun? </span>
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Masuk di sini
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
