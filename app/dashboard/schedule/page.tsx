"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SchedulePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
    if (user && user.role === "user") router.push("/dashboard");
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (user && user.role !== "user") {
      fetch("/api/bookings")
        .then(res => res.json())
        .then(data => setBookings(data || []))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user || user.role === "user") return null;

  // Derive simple metrics from actual DB data (or simulate empty if missing)
  const isStudioInUse = (studioName: string) => bookings.some(b => b.studio === studioName && b.status === "IN_USE");
  const getSimulatedStudioStatus = (studioName: string) => {
      const inUse = isStudioInUse(studioName);
      if (inUse) return { text: "Dipakai", type: "red" };
      const upcoming = bookings.find(b => b.studio === studioName && b.status === "CONFIRMED");
      if (upcoming) return { text: `Tersedia sd ${upcoming.startTime}`, type: "yellow" };
      return { text: "Kosong", type: "green" };
  };

  return (
    <div className="animate-fade-up">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Jadwal Studio Hari Ini</h1>
          <p className="text-slate-500 text-sm">Pantau ketersediaan dan booking ruang studio secara realtime.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 shadow-sm">
            Tanggal: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="modern-card p-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Status Ruangan</h3>
          <div className="space-y-4">
            {["Studio A", "Studio B", "Studio C"].map(name => {
              const status = getSimulatedStudioStatus(name);
              return (
                <div key={name} className={`flex justify-between items-center p-3 rounded-lg border ${
                  status.type === 'red' ? 'bg-red-50 border-red-100' :
                  status.type === 'yellow' ? 'bg-yellow-50 border-yellow-100' :
                  'bg-green-50 border-green-100'
                }`}>
                  <span className={`font-bold ${
                    status.type === 'red' ? 'text-red-700' :
                    status.type === 'yellow' ? 'text-yellow-700' :
                    'text-green-700'
                  }`}>{name}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    status.type === 'red' ? 'text-red-600 bg-red-100' :
                    status.type === 'yellow' ? 'text-yellow-600 bg-yellow-100' :
                    'text-green-600 bg-green-100'
                  }`}>{status.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="modern-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Waktu</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Ruangan &amp; Klien</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Status Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-400">Loading jadwal...</td></tr>
                  ) : bookings.length === 0 ? (
                    <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-400">Belum ada penyewaan studio hari ini.</td></tr>
                  ) : bookings.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors bg-white">
                      <td className="px-6 py-4 text-sm font-mono text-slate-600 font-bold">{s.startTime} - {s.endTime}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">{(s.studio || "-").slice(-1)}</div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{s.user}</div>
                            <div className="text-xs font-medium text-slate-400 mt-0.5">{s.notes || "Sewa Studio"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {s.status === "IN_USE" && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                          <span className={`text-xs font-bold ${s.status === "IN_USE" ? "text-red-500" : s.status === "COMPLETED" ? "text-green-500" : "text-blue-500"}`}>
                            {s.status === "IN_USE" ? "Berlangsung" : 
                             s.status === "COMPLETED" ? "Selesai" : 
                             s.status === "CONFIRMED" ? "Akan Datang" : s.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
