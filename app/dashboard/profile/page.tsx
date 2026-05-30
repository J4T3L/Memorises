"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, updateUser, isAuthenticated } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
      setAvatar(user.avatar || "");
    }
  }, [isAuthenticated, user, router]);

  if (!user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 120;
        const MAX_HEIGHT = 120;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setAvatar(dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(user.id, { name, phone, avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fade-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Pengaturan Akun</h1>
        <p className="text-slate-500 text-sm">Kelola informasi data diri dan preferensi profil Anda.</p>
      </div>

      <div className="max-w-2xl">
        <div className="modern-card p-8">
          {saved && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-100 flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span className="text-sm font-medium text-green-700">Profil berhasil diperbarui.</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
              <div className="relative group w-20 h-20 shrink-0">
                {avatar ? (
                  <img src={avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover border border-slate-200" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 font-bold text-2xl flex items-center justify-center shadow-inner">
                    {user.name.charAt(0)}
                  </div>
                )}
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white text-[9px] font-mono uppercase opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                  <span>Ubah</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 mb-1">{user.role.toUpperCase()}</div>
                <div className="text-xs text-slate-500">Anggota sejak {user.joinedAt}</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email (Tidak bisa diubah)</label>
                <input type="email" disabled value={user.email} className="input-modern bg-slate-100 text-slate-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="input-modern" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor Telepon / WhatsApp</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="08xx..." className="input-modern" />
            </div>
            
            <div className="pt-4 flex justify-end">
              <button type="submit" className="btn-primary py-2.5 px-6 shadow-md">Simpan Perubahan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
