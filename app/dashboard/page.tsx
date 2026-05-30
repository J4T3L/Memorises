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
        <div className="bg-white border border-neutral-200 viewfinder-box p-6 rounded-none relative">
          <div className="viewfinder-corners-bottom"></div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">Pesanan Aktif</div>
          <div className="text-3xl font-bold font-serif italic text-orange-700">{loading ? "..." : activeCount}</div>
        </div>
        <div className="bg-white border border-neutral-200 viewfinder-box p-6 rounded-none relative">
          <div className="viewfinder-corners-bottom"></div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">Total Pengeluaran</div>
          <div className="text-3xl font-bold font-serif italic text-slate-900">
            {loading ? "..." : "Rp " + orders.reduce((sum, o) => sum + parseInt(o.amount.replace(/\D/g, '') || "0"), 0).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="bg-white border border-neutral-200 viewfinder-box p-6 rounded-none relative">
          <div className="viewfinder-corners-bottom"></div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">Poin Reward</div>
          <div className="text-3xl font-bold font-serif italic text-slate-900">{loading ? "..." : orders.length * 15}</div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 viewfinder-box rounded-none overflow-hidden relative p-1">
        <div className="viewfinder-corners-bottom"></div>
        <div className="px-6 py-5 border-b border-neutral-200 bg-white flex justify-between items-center">
          <h2 className="text-sm font-mono uppercase tracking-widest text-slate-900">Riwayat Pesanan Saya</h2>
          <Link href="/dashboard/orders" className="text-xs font-mono uppercase tracking-widest text-orange-700 hover:text-orange-950 font-bold">Lihat Semua</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">ID</th>
                <th className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Layanan</th>
                <th className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest text-right">Biaya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-xs font-mono uppercase text-slate-405">Memuat data...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-xs font-mono uppercase text-slate-405">Belum ada pesanan terdaftar.</td></tr>
              ) : orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="bg-white hover:bg-neutral-50/50">
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">{o.id}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-900 uppercase tracking-wider">{o.itemStr} <div className="font-serif italic text-[10px] text-slate-500 mt-0.5">{o.date}</div></td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 border text-[9px] font-mono uppercase tracking-widest font-bold ${
                      o.status === "Selesai" ? "border-green-300 text-green-700 bg-green-50" : "border-orange-350 text-orange-700 bg-orange-50"
                    }`}>{o.status}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono font-bold text-slate-900 text-right">{o.amount}</td>
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
        <div className="bg-orange-700 border border-orange-750 text-white viewfinder-box p-6 rounded-none relative">
          <div className="viewfinder-corners-bottom"></div>
          <div className="text-[9px] font-mono font-bold text-orange-200 mb-1 uppercase tracking-widest">Total Pendapatan (Bulan Ini)</div>
          <div className="text-2xl font-bold font-serif italic">{loading ? "..." : "Rp " + (stats?.revenue.toLocaleString("id-ID") || 0)}</div>
        </div>
        <div className="bg-white border border-neutral-200 viewfinder-box p-6 rounded-none relative">
          <div className="viewfinder-corners-bottom"></div>
          <div className="text-[9px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-widest">Pesanan Menunggu</div>
          <div className="text-3xl font-bold font-serif italic text-orange-700">{loading ? "..." : stats?.pendingOrders || 0}</div>
        </div>
        <div className="bg-white border border-neutral-200 viewfinder-box p-6 rounded-none relative">
          <div className="viewfinder-corners-bottom"></div>
          <div className="text-[9px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-widest">Pesanan Aktif</div>
          <div className="text-3xl font-bold font-serif italic text-neutral-800">{loading ? "..." : stats?.activeOrders || 0}</div>
        </div>
        <div className="bg-white border border-neutral-200 viewfinder-box p-6 rounded-none relative">
          <div className="viewfinder-corners-bottom"></div>
          <div className="text-[9px] font-mono font-bold text-slate-400 mb-1 uppercase tracking-widest">Pelanggan Baru</div>
          <div className="text-3xl font-bold font-serif italic text-neutral-800">{loading ? "..." : `+${stats?.newCustomers || 0}`}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-neutral-200 viewfinder-box p-1 rounded-none relative">
          <div className="viewfinder-corners-bottom"></div>
          <div className="px-6 py-5 border-b border-neutral-200 bg-white flex justify-between items-center">
            <h2 className="text-sm font-mono uppercase tracking-widest text-slate-900">Riwayat Perubahan Sistem (Logs)</h2>
            <Link href="/dashboard/orders" className="text-xs font-mono uppercase tracking-widest text-orange-700 hover:text-orange-950 font-bold">Kelola Order</Link>
          </div>
          <div className="p-0">
            {loading ? (
              <div className="p-8 text-center text-xs font-mono uppercase text-slate-400">Loading logs...</div>
            ) : (!stats?.systemLogs || stats.systemLogs.length === 0) ? (
              <div className="p-8 text-center text-xs font-mono uppercase text-slate-400">Tidak ada riwayat.</div>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {stats.systemLogs.map(log => (
                  <li key={log.id} className="px-6 py-3.5 flex gap-4 hover:bg-neutral-50/50 text-xs font-mono">
                    <span className="text-slate-400 text-[10px] mt-0.5">{log.time}</span>
                    <span className="text-slate-700 uppercase tracking-wider text-[10px]">{log.action}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 viewfinder-box p-6 rounded-none flex flex-col justify-between relative">
          <div className="viewfinder-corners-bottom"></div>
          <div>
            <h3 className="text-[10px] font-bold text-slate-900 font-mono uppercase tracking-widest mb-4">Aksi Cepat</h3>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard/users" className="w-full text-center py-2.5 border border-neutral-300 font-mono text-[10px] uppercase tracking-widest text-slate-700 hover:bg-neutral-50 hover:text-slate-950 transition-colors">
                Kelola Pengguna
              </Link>
              <Link href="/dashboard/payments" className="w-full flex justify-center text-center py-2.5 border border-neutral-300 font-mono text-[10px] uppercase tracking-widest text-slate-700 hover:bg-neutral-50 hover:text-slate-950 transition-colors">
                Log Transaksi Payment
              </Link>
              <Link href="/dashboard/schedule" className="w-full flex justify-center text-center py-2.5 border border-neutral-300 font-mono text-[10px] uppercase tracking-widest text-slate-700 hover:bg-neutral-50 hover:text-slate-950 transition-colors">
                Jadwal Studio Hari Ini
              </Link>
            </div>
          </div>
          {userRole === "superuser" && (
             <div className="mt-8 pt-6 border-t border-neutral-200">
               <h3 className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-widest mb-3">Status Server Internal</h3>
               <div className="flex justify-between items-center mb-1">
                 <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Database Load</span>
                 <span className="text-[10px] font-mono font-bold text-green-600">Normal</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">API Latency</span>
                 <span className="text-[10px] font-mono font-bold text-orange-700">24ms</span>
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
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light font-serif text-slate-900 leading-tight">
            Halo, <span className="italic font-bold text-orange-700">{user.name}</span>
          </h1>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-1">
            {user.role === "user" && "Kelola pesanan dan aktivitas penyewaan Anda di sini."}
            {user.role === "admin" && "Ringkasan operasional dan pesanan sistem hari ini."}
            {user.role === "superuser" && "Akses rute-super level sistem dan metrik server."}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/profile" className="px-4 py-2 border border-neutral-900 font-mono text-[10px] uppercase tracking-widest text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors rounded-none">Profile Setting</Link>
        </div>
      </div>

      {user.role === "user" && <UserView user={user} />}
      {(user.role === "admin" || user.role === "superuser") && <AdminView userRole={user.role} />}
    </div>
  );
}
