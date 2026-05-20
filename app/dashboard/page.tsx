"use client";
import { useAuth, User } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface StatData {
  revenue: number;
  pendingOrders: number;
  activeOrders: number;
  newCustomers: number;
  systemLogs: { id: string, time: string, action: string }[];
}

function UserView({ user }: { user: User }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders?userId=${user.id}`)
      .then(r => r.json())
      .then(d => setOrders(d || []))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, [user.id]);

  const activeCount = orders.filter(o => o.status === "Aktif" || o.status === "Diproses").length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="modern-card p-6 border-l-4 border-l-blue-500">
          <div className="text-sm font-bold text-slate-500 mb-1">Pesanan Aktif</div>
          <div className="text-3xl font-bold text-slate-900">{loading ? "..." : activeCount}</div>
        </div>
        <div className="modern-card p-6 border-l-4 border-l-green-500">
          <div className="text-sm font-bold text-slate-500 mb-1">Total Pengeluaran</div>
          <div className="text-3xl font-bold text-slate-900">
            {loading ? "..." : "Rp " + orders.reduce((sum, o) => sum + parseInt(o.amount.replace(/\D/g, '') || "0"), 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="modern-card p-6 border-l-4 border-l-yellow-500">
          <div className="text-sm font-bold text-slate-500 mb-1">Poin Reward</div>
          <div className="text-3xl font-bold text-slate-900">{loading ? "..." : orders.length * 15}</div>
        </div>
      </div>

      <div className="modern-card overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-white flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Riwayat Pesanan Saya</h2>
          <Link href="/dashboard/orders" className="text-sm text-blue-600 font-medium hover:text-blue-800">Lihat Semua</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Layanan</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Biaya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">Memuat data...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">Belum ada pesanan terdaftar.</td></tr>
              ) : orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="bg-white hover:bg-slate-50/50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{o.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{o.itemStr} <div className="font-normal text-xs text-slate-500">{o.date}</div></td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      o.status === "Selesai" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>{o.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function AdminView({ userRole }: { userRole: string }) {
  const [stats, setStats] = useState<StatData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="modern-card p-6 bg-blue-600 text-white border-none shadow-lg shadow-blue-600/20">
          <div className="text-sm font-medium text-blue-100 mb-1">Total Pendapatan (Bulan Ini)</div>
          <div className="text-3xl font-bold">{loading ? "..." : "Rp " + (stats?.revenue.toLocaleString("id-ID") || 0)}</div>
        </div>
        <div className="modern-card p-6">
          <div className="text-sm font-bold text-slate-500 mb-1">Pesanan Menunggu</div>
          <div className="text-3xl font-bold text-orange-500">{loading ? "..." : stats?.pendingOrders || 0}</div>
        </div>
        <div className="modern-card p-6">
          <div className="text-sm font-bold text-slate-500 mb-1">Pesanan Aktif</div>
          <div className="text-3xl font-bold text-blue-500">{loading ? "..." : stats?.activeOrders || 0}</div>
        </div>
        <div className="modern-card p-6">
          <div className="text-sm font-bold text-slate-500 mb-1">Pelanggan Baru</div>
          <div className="text-3xl font-bold text-slate-900">{loading ? "..." : `+${stats?.newCustomers || 0}`}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 modern-card overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-white flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Riwayat Perubahan Sistem (Logs)</h2>
            <Link href="/dashboard/orders" className="text-sm text-blue-600 font-medium hover:text-blue-800">Kelola Order</Link>
          </div>
          <div className="p-0">
            {loading ? (
              <div className="p-8 text-center text-slate-400">Loading logs...</div>
            ) : (!stats?.systemLogs || stats.systemLogs.length === 0) ? (
              <div className="p-8 text-center text-slate-400">Tidak ada riwayat.</div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {stats.systemLogs.map(log => (
                  <li key={log.id} className="px-6 py-3 flex gap-4 hover:bg-slate-50/50 text-sm">
                    <span className="font-mono text-slate-400 text-xs mt-0.5">{log.time}</span>
                    <span className="text-slate-700 font-medium">{log.action}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="modern-card p-6 bg-slate-50 border-dashed border-2 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Aksi Cepat</h3>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard/users" className="w-full text-center py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                Kelola Pengguna
              </Link>
              <Link href="/dashboard/payments" className="w-full flex justify-center text-center py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                Log Transaksi Payment
              </Link>
              <Link href="/dashboard/schedule" className="w-full flex justify-center text-center py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                Jadwal Studio Hari Ini
              </Link>
            </div>
          </div>
          {userRole === "superuser" && (
             <div className="mt-8 pt-6 border-t border-slate-200">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Status Server Internal</h3>
               <div className="flex justify-between items-center mb-1">
                 <span className="text-xs text-slate-500">Database Load</span>
                 <span className="text-xs font-mono font-bold text-green-500">Normal</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs text-slate-500">API Latency</span>
                 <span className="text-xs font-mono font-bold text-blue-500">24ms</span>
               </div>
             </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!user) return null;

  return (
    <div className="animate-fade-up">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Halo, {user.name} 👋</h1>
          <p className="text-slate-500 text-sm">
            {user.role === "user" && "Kelola pesanan dan aktivitas penyewaan Anda di sini."}
            {user.role === "admin" && "Ringkasan operasional dan pesanan sistem hari ini."}
            {user.role === "superuser" && "Akses rute-super level sistem dan metrik server."}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/profile" className="btn-secondary text-sm px-4 py-2">Profile Setting</Link>
        </div>
      </div>

      {user.role === "user" && <UserView user={user} />}
      {(user.role === "admin" || user.role === "superuser") && <AdminView userRole={user.role} />}
    </div>
  );
}
