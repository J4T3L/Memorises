"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
    if (user && user.role === "user") router.push("/dashboard");
  }, [isAuthenticated, user, router]);

  const loadData = async () => {
    try {
      const res = await fetch("/api/payments");
      const data = await res.json();
      setLogs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  useEffect(() => {
    if (user && user.role !== "user") {
      loadData();
    }
  }, [user]);

  if (!user || user.role === "user") return null;

  return (
    <div className="animate-fade-up">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Pantauan Transaksi Gateway</h1>
          <p className="text-slate-500 text-sm">Log sinkronisasi otomatis status pembayaran dari Payment Gateway (Midtrans Simulation).</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setSyncing(true); loadData(); }}
            disabled={syncing}
            className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
          >
            <svg className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {syncing ? "Syncing..." : "Sync Terbaru"}
          </button>
        </div>
      </div>

      <div className="modern-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Waktu &amp; API Resi</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Pelanggan</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Metode Pembayaran</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Nominal</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Status API</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading data gateway...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Belum ada transaksi pembayaran.</td></tr>
              ) : logs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors bg-white">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm mb-0.5">{log.time}</div>
                    <div className="text-xs font-mono text-slate-400">{log.trxId}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                      {log.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{log.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-bold tracking-wider ${
                      log.status === "Settled" ? "bg-green-100 text-green-700" :
                      log.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 text-center">
          Data disinkronisasi melalui Sandbox Payment Gateway. Server database terhubung.
        </div>
      </div>
    </div>
  );
}
