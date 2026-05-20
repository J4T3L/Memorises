"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { label: "Beranda", href: "#" },
    { label: "Layanan", href: "#layanan" },
    { label: "Katalog", href: "#katalog" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Testimoni", href: "#testimoni" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">Capture</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm font-medium text-slate-600 hover:text-blue-500 transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  Dashboard
                </Link>
                <div className="h-4 w-px bg-slate-300"></div>
                <button onClick={logout} className="text-sm font-medium text-red-500 hover:text-red-700">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  Masuk
                </Link>
                <Link href="/register" className="btn-primary py-2 px-4 text-sm">
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-500 hover:text-slate-900">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-4 pt-2 pb-6 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block py-2 text-base font-medium text-slate-700">
                {link.label}
              </a>
            ))}
            <div className="h-px bg-slate-100 my-2"></div>
            {isAuthenticated ? (
               <div className="flex flex-col space-y-3">
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block py-2 text-base font-medium text-slate-700">Dashboard</Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="text-left py-2 text-base font-medium text-red-500">Logout</button>
               </div>
            ) : (
              <div className="flex flex-col space-y-3 mt-2">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full">Masuk</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-primary w-full">Daftar</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
