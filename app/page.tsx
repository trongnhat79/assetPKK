"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDownToLine, ArrowUpRight, Bell, Boxes, Building2, ChevronDown,
  ChevronLeft, ChevronRight, CircleHelp, ClipboardList, Computer, FileSpreadsheet,
  Filter, LayoutDashboard, Laptop, Monitor, MoreHorizontal, Plus, Search, Settings2,
  ShieldCheck, SlidersHorizontal, Smartphone, Users, Wrench
} from "lucide-react";

type AssetStatus = "Đang sử dụng" | "Sẵn sàng" | "Đang sửa chữa" | "Thanh lý";
type Asset = {
  id: string;
  name: string;
  category: "Laptop" | "Máy tính bàn" | "Màn hình" | "Thiết bị khác";
  serial: string;
  employee: string;
  department: string;
  status: AssetStatus;
  updated: string;
};

const initialAssets: Asset[] = [
  { id: "IT-0001", name: "Dell Latitude 5440", category: "Laptop", serial: "DL5440-A7K29", employee: "Nguyễn Minh Anh", department: "Kinh doanh", status: "Đang sử dụng", updated: "14/10/2026" },
  { id: "IT-0002", name: "HP ProBook 440 G10", category: "Laptop", serial: "HP440-93LM2", employee: "Trần Quốc Bảo", department: "Marketing", status: "Đang sử dụng", updated: "14/10/2026" },
  { id: "IT-0003", name: "Dell P2422H", category: "Màn hình", serial: "CN0P2422-184", employee: "—", department: "Kho IT", status: "Sẵn sàng", updated: "13/10/2026" },
  { id: "IT-0004", name: "Lenovo ThinkCentre M70q", category: "Máy tính bàn", serial: "LNV-M70Q-221", employee: "Lê Hoàng Nam", department: "Vận hành", status: "Đang sử dụng", updated: "12/10/2026" },
  { id: "IT-0005", name: "MacBook Air M2", category: "Laptop", serial: "MBA2-C91W3", employee: "Phạm Thu Hà", department: "Thiết kế", status: "Đang sử dụng", updated: "12/10/2026" },
  { id: "IT-0006", name: "LG 27UP850", category: "Màn hình", serial: "LG27-850-031", employee: "—", department: "Kho IT", status: "Sẵn sàng", updated: "11/10/2026" },
  { id: "IT-0007", name: "Dell Latitude 5420", category: "Laptop", serial: "DL5420-X8N41", employee: "Võ Thành Đạt", department: "IT", status: "Đang sửa chữa", updated: "10/10/2026" },
  { id: "IT-0008", name: "Logitech Brio 4K", category: "Thiết bị khác", serial: "LOG-BRIO-88P", employee: "—", department: "Kho IT", status: "Sẵn sàng", updated: "09/10/2026" },
  { id: "IT-0009", name: "Dell OptiPlex 7010", category: "Máy tính bàn", serial: "OPT7010-Q21F", employee: "Đỗ Ngọc Linh", department: "Kế toán", status: "Đang sử dụng", updated: "08/10/2026" },
];

const statusStyles: Record<AssetStatus, string> = {
  "Đang sử dụng": "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  "Sẵn sàng": "bg-blue-50 text-blue-700 ring-blue-600/15",
  "Đang sửa chữa": "bg-amber-50 text-amber-700 ring-amber-600/15",
  "Thanh lý": "bg-slate-100 text-slate-600 ring-slate-500/15"
};

function CategoryIcon({ category, size = 17 }: { category: Asset["category"]; size?: number }) {
  if (category === "Laptop") return <Laptop size={size} />;
  if (category === "Máy tính bàn") return <Computer size={size} />;
  if (category === "Màn hình") return <Monitor size={size} />;
  return <Smartphone size={size} />;
}

export default function Home() {
  const [assets, setAssets] = useState(initialAssets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");
  const [categoryFilter, setCategoryFilter] = useState("Tất cả loại thiết bị");
  const [activeNav, setActiveNav] = useState("Tổng quan");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSerial, setNewSerial] = useState("");
  const [newCategory, setNewCategory] = useState<Asset["category"]>("Laptop");
  const [notice, setNotice] = useState("");

  const filteredAssets = useMemo(() => assets.filter((asset) => {
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || [asset.id, asset.name, asset.serial, asset.employee, asset.department].some((v) => v.toLowerCase().includes(q));
    const matchesStatus = statusFilter === "Tất cả trạng thái" || asset.status === statusFilter;
    const matchesCategory = categoryFilter === "Tất cả loại thiết bị" || asset.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  }), [assets, search, statusFilter, categoryFilter]);

  const inUse = assets.filter((a) => a.status === "Đang sử dụng").length;
  const available = assets.filter((a) => a.status === "Sẵn sàng").length;
  const repair = assets.filter((a) => a.status === "Đang sửa chữa").length;

  function exportCsv() {
    const headers = ["Mã tài sản", "Tên thiết bị", "Loại", "Serial Number", "Người sử dụng", "Phòng ban", "Trạng thái", "Cập nhật"];
    const rows = filteredAssets.map((a) => [a.id, a.name, a.category, a.serial, a.employee, a.department, a.status, a.updated]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "danh-sach-tai-san-IT.csv";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Đã xuất danh sách hiện tại ra CSV (mở được bằng Excel).");
    window.setTimeout(() => setNotice(""), 3500);
  }

  function addAsset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newName.trim() || !newSerial.trim()) return;
    const asset: Asset = {
      id: `IT-${String(Math.max(0, ...assets.map((a) => Number(a.id.replace("IT-", "")))) + 1).padStart(4, "0")}`,
      name: newName.trim(),
      category: newCategory,
      serial: newSerial.trim(),
      employee: "—",
      department: "Kho IT",
      status: "Sẵn sàng",
      updated: new Date().toLocaleDateString("vi-VN")
    };
    setAssets((current) => [asset, ...current]);
    setNewName("");
    setNewSerial("");
    setShowAdd(false);
    setNotice("Đã thêm thiết bị vào danh sách minh họa.");
    window.setTimeout(() => setNotice(""), 3500);
  }

  const navItems = [
    { label: "Tổng quan", icon: LayoutDashboard },
    { label: "Tài sản", icon: Boxes, count: assets.length },
    { label: "Nhân viên", icon: Users },
    { label: "Bàn giao thiết bị", icon: ClipboardList },
    { label: "Bảo trì & sửa chữa", icon: Wrench }
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[248px] flex-col border-r border-slate-200/80 bg-white lg:flex">
        <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"><Boxes size={22} /></div>
          <div><div className="text-[16px] font-bold tracking-tight text-slate-900">Asset<span className="text-indigo-600">PKK</span></div><div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-400">IT asset management</div></div>
        </div>
        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Không gian làm việc</p>
          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon, count }) => (
              <button key={label} onClick={() => { setActiveNav(label); if (label === "Tài sản") document.getElementById("asset-table")?.scrollIntoView({ behavior: "smooth" }); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-medium transition ${activeNav === label ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
                <Icon size={18} strokeWidth={1.8} /><span className="flex-1">{label}</span>{count !== undefined && <span className={`rounded-md px-2 py-0.5 text-[11px] ${activeNav === label ? "bg-white text-indigo-700" : "bg-slate-100 text-slate-500"}`}>{count}</span>}
              </button>
            ))}
          </nav>
        </div>
        <div className="px-4 pt-8">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Hệ thống</p>
          <button onClick={() => setNotice("Phần cài đặt sẽ được bổ sung trong giai đoạn tiếp theo.")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium text-slate-500 hover:bg-slate-50"><Settings2 size={18} strokeWidth={1.8} />Cài đặt</button>
          <button onClick={() => setNotice("Trung tâm trợ giúp sẽ được bổ sung trong giai đoạn tiếp theo.")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium text-slate-500 hover:bg-slate-50"><CircleHelp size={18} strokeWidth={1.8} />Trợ giúp</button>
        </div>
        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm"><ShieldCheck size={18} /></div>
            <p className="text-[12px] font-semibold text-slate-800">Quản lý an toàn</p>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">Dữ liệu thật sẽ được bảo vệ khi hoàn tất đăng nhập và phân quyền.</p>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-indigo-600"><Activity size={12} /> Đang ở bản thử nghiệm</div>
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">IT</div>
            <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-slate-800">Quản trị IT</p><p className="mt-0.5 text-[10px] text-slate-400">Quản trị viên</p></div>
            <MoreHorizontal size={17} className="text-slate-400" />
          </div>
        </div>
      </aside>

      <main className="lg:pl-[248px]">
        <header className="sticky top-0 z-10 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <div className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white"><Boxes size={20} /></div>
            <div><div className="text-[11px] font-medium text-slate-400">Workspace / {activeNav}</div><h1 className="mt-1 text-[17px] font-bold tracking-tight text-slate-900">{activeNav}</h1></div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-500 md:flex"><Building2 size={14} /> PKK <ChevronDown size={13} /></div>
            <button aria-label="Thông báo" onClick={() => setNotice("Bạn không có thông báo mới.")} className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" /></button>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">IT</div>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] p-5 sm:p-8">
          {notice && <div className="mb-5 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700"><span>{notice}</span><button onClick={() => setNotice("")} className="ml-3 font-bold">×</button></div>}
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> HỆ THỐNG ĐANG HOẠT ĐỘNG</div><h2 className="text-[25px] font-bold tracking-tight text-slate-900 sm:text-[28px]">Xin chào, quản trị viên <span>👋</span></h2><p className="mt-2 text-[13px] text-slate-500">Đây là tình hình tài sản IT trong hệ thống của bạn hôm nay.</p></div>
            <div className="flex flex-wrap gap-2"><button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"><ArrowDownToLine size={15} /> Xuất Excel / CSV</button><button onClick={() => setShowAdd(true)} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"><Plus size={16} /> Thêm tài sản</button></div>
          </div>

          <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft"><div className="flex items-start justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Boxes size={20} /></div><span className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">Tổng quan</span></div><p className="mt-5 text-[12px] font-medium text-slate-500">Tổng tài sản</p><div className="mt-1 flex items-end justify-between"><p className="text-[30px] font-bold tracking-tight text-slate-900">{assets.length}<span className="ml-1.5 text-[12px] font-medium text-slate-400">thiết bị</span></p><div className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-indigo-600"><ArrowUpRight size={13} /> Danh mục</div></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-full rounded-full bg-indigo-500" /></div></div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft"><div className="flex items-start justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Users size={20} /></div><span className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">{assets.length ? Math.round(inUse / assets.length * 100) : 0}%</span></div><p className="mt-5 text-[12px] font-medium text-slate-500">Đang sử dụng</p><div className="mt-1 flex items-end justify-between"><p className="text-[30px] font-bold tracking-tight text-slate-900">{inUse}<span className="ml-1.5 text-[12px] font-medium text-slate-400">thiết bị</span></p><span className="mb-1 text-[10px] text-slate-400">Đã bàn giao</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${assets.length ? inUse / assets.length * 100 : 0}%` }} /></div></div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft"><div className="flex items-start justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><Monitor size={20} /></div><span className="rounded-lg bg-sky-50 px-2 py-1 text-[10px] font-semibold text-sky-700">Có thể cấp phát</span></div><p className="mt-5 text-[12px] font-medium text-slate-500">Sẵn sàng sử dụng</p><div className="mt-1 flex items-end justify-between"><p className="text-[30px] font-bold tracking-tight text-slate-900">{available}<span className="ml-1.5 text-[12px] font-medium text-slate-400">thiết bị</span></p><span className="mb-1 text-[10px] text-slate-400">Tại kho IT</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-sky-500" style={{ width: `${assets.length ? available / assets.length * 100 : 0}%` }} /></div></div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft"><div className="flex items-start justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Wrench size={20} /></div><span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700">Cần theo dõi</span></div><p className="mt-5 text-[12px] font-medium text-slate-500">Đang sửa chữa</p><div className="mt-1 flex items-end justify-between"><p className="text-[30px] font-bold tracking-tight text-slate-900">{repair}<span className="ml-1.5 text-[12px] font-medium text-slate-400">thiết bị</span></p><span className="mb-1 text-[10px] text-slate-400">Đang xử lý</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-amber-500" style={{ width: `${assets.length ? repair / assets.length * 100 : 0}%` }} /></div></div>
          </div>

          <div className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-3">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft xl:col-span-2 sm:p-6">
              <div className="flex items-start justify-between"><div><h3 className="text-sm font-bold text-slate-900">Phân bổ tài sản</h3><p className="mt-1 text-[11px] text-slate-400">Cơ cấu theo nhóm thiết bị</p></div><button onClick={() => { setCategoryFilter("Tất cả loại thiết bị"); document.getElementById("asset-table")?.scrollIntoView({ behavior: "smooth" }); }} className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800">Xem danh sách <ArrowUpRight size={13} className="ml-1 inline" /></button></div>
              <div className="mt-6 space-y-5">
                {(["Laptop", "Máy tính bàn", "Màn hình", "Thiết bị khác"] as const).map((category, index) => {
                  const count = assets.filter((a) => a.category === category).length;
                  const pct = assets.length ? count / assets.length * 100 : 0;
                  const barColors = ["bg-indigo-500", "bg-violet-500", "bg-sky-500", "bg-amber-500"];
                  return <button key={category} onClick={() => { setCategoryFilter(category); document.getElementById("asset-table")?.scrollIntoView({ behavior: "smooth" }); }} className="group w-full text-left"><div className="mb-2 flex items-center justify-between"><span className="flex items-center gap-2.5 text-xs font-medium text-slate-600"><span className="text-slate-400"><CategoryIcon category={category} size={16} /></span>{category}</span><span className="text-xs font-bold text-slate-800">{count} <span className="font-normal text-slate-400">({Math.round(pct)}%)</span></span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all ${barColors[index]}`} style={{ width: `${pct}%` }} /></div></button>;
                })}
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft sm:p-6">
              <div className="flex items-start justify-between"><div><h3 className="text-sm font-bold text-slate-900">Tình trạng thiết bị</h3><p className="mt-1 text-[11px] text-slate-400">Theo trạng thái hiện tại</p></div><SlidersHorizontal size={17} className="text-slate-400" /></div>
              <div className="mt-5 flex items-center gap-5">
                <div className="relative flex h-[124px] w-[124px] shrink-0 items-center justify-center rounded-full" style={{ background: `conic-gradient(#10b981 0% ${assets.length ? inUse / assets.length * 100 : 0}%, #0ea5e9 ${assets.length ? inUse / assets.length * 100 : 0}% ${assets.length ? (inUse + available) / assets.length * 100 : 0}%, #f59e0b ${assets.length ? (inUse + available) / assets.length * 100 : 0}% ${assets.length ? (inUse + available + repair) / assets.length * 100 : 0}%, #e2e8f0 ${assets.length ? (inUse + available + repair) / assets.length * 100 : 0}% 100%)` }}><div className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full bg-white"><span className="text-2xl font-bold text-slate-900">{assets.length}</span><span className="text-[10px] text-slate-400">thiết bị</span></div></div>
                <div className="min-w-0 flex-1 space-y-3">{[["Đang sử dụng", inUse, "bg-emerald-500"], ["Sẵn sàng", available, "bg-sky-500"], ["Đang sửa chữa", repair, "bg-amber-500"]].map(([label, count, color]) => <div key={String(label)} className="flex items-center gap-2"><span className={`h-2 w-2 shrink-0 rounded-full ${color}`} /><span className="flex-1 text-[10px] text-slate-500">{label}</span><span className="text-xs font-bold text-slate-800">{count}</span></div>)}</div>
              </div>
              <div className="mt-5 rounded-xl bg-slate-50 p-3"><p className="text-[10px] leading-5 text-slate-500">Số liệu đang dùng dữ liệu mẫu để minh họa giao diện, chưa phải dữ liệu thực tế của công ty.</p></div>
            </section>
          </div>

          <section id="asset-table" className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:px-6">
              <div><div className="flex items-center gap-2"><h3 className="text-sm font-bold text-slate-900">Danh sách tài sản</h3><span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{filteredAssets.length} thiết bị</span></div><p className="mt-1 text-[11px] text-slate-400">Tra cứu thiết bị và người đang sử dụng</p></div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm tên, serial, nhân viên..." className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[11px] outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 sm:w-[225px]" /></div>
                <div className="relative"><Filter size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-[11px] text-slate-600 outline-none focus:border-indigo-300 sm:w-[175px]"><option>Tất cả trạng thái</option><option>Đang sử dụng</option><option>Sẵn sàng</option><option>Đang sửa chữa</option><option>Thanh lý</option></select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /></div>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-[11px] text-slate-600 outline-none focus:border-indigo-300"><option>Tất cả loại thiết bị</option><option>Laptop</option><option>Máy tính bàn</option><option>Màn hình</option><option>Thiết bị khác</option></select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse text-left">
                <thead><tr className="bg-slate-50/80 text-[10px] font-semibold uppercase tracking-wider text-slate-400"><th className="px-6 py-3.5">Thiết bị</th><th className="px-4 py-3.5">Mã / Serial</th><th className="px-4 py-3.5">Người sử dụng</th><th className="px-4 py-3.5">Trạng thái</th><th className="px-4 py-3.5">Cập nhật gần nhất</th><th className="px-5 py-3.5"></th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAssets.map((asset) => <tr key={asset.id} className="transition hover:bg-slate-50/70"><td className="px-6 py-4"><div className="flex items-center gap-3"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${asset.category === "Laptop" ? "bg-indigo-50 text-indigo-600" : asset.category === "Màn hình" ? "bg-sky-50 text-sky-600" : asset.category === "Máy tính bàn" ? "bg-violet-50 text-violet-600" : "bg-amber-50 text-amber-600"}`}><CategoryIcon category={asset.category} size={18} /></div><div><p className="text-xs font-semibold text-slate-800">{asset.name}</p><p className="mt-1 text-[10px] text-slate-400">{asset.category}</p></div></div></td><td className="px-4 py-4"><p className="text-[11px] font-semibold text-indigo-700">{asset.id}</p><p className="mt-1 font-mono text-[10px] text-slate-400">{asset.serial}</p></td><td className="px-4 py-4"><p className="text-[11px] font-medium text-slate-700">{asset.employee}</p><p className="mt-1 text-[10px] text-slate-400">{asset.department}</p></td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset ${statusStyles[asset.status]}`}><span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{asset.status}</span></td><td className="px-4 py-4 text-[11px] text-slate-500">{asset.updated}</td><td className="px-5 py-4"><button aria-label={`Chi tiết ${asset.name}`} onClick={() => setNotice(`${asset.id} · ${asset.name} · Serial: ${asset.serial} · Trạng thái: ${asset.status}. Phần chi tiết đầy đủ sẽ được bổ sung sau.`)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"><MoreHorizontal size={17} /></button></td></tr>)}
                  {filteredAssets.length === 0 && <tr><td colSpan={6} className="px-6 py-12 text-center"><Search size={24} className="mx-auto mb-3 text-slate-300" /><p className="text-sm font-semibold text-slate-600">Không tìm thấy thiết bị</p><p className="mt-1 text-xs text-slate-400">Thử từ khóa hoặc bộ lọc khác.</p></td></tr>}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row"><p className="text-[10px] text-slate-400">Đang hiển thị <span className="font-semibold text-slate-600">{filteredAssets.length}</span> trên <span className="font-semibold text-slate-600">{assets.length}</span> thiết bị mẫu</p><div className="flex items-center gap-1"><button disabled className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-300"><ChevronLeft size={14} /></button><button className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-indigo-600 px-2 text-[10px] font-semibold text-white">1</button><button disabled className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-300"><ChevronRight size={14} /></button></div></div>
          </section>
          <footer className="flex flex-col items-center justify-between gap-2 py-6 text-[10px] text-slate-400 sm:flex-row"><span>© 2026 AssetPKK · Quản lý tài sản IT nội bộ</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Bản demo · Dữ liệu chưa được lưu vào cơ sở dữ liệu</span></footer>
        </div>
      </main>

      {showAdd && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowAdd(false); }}><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-start justify-between"><div><h3 className="text-lg font-bold text-slate-900">Thêm tài sản mới</h3><p className="mt-1 text-xs text-slate-500">Nhập thông tin cơ bản để thêm vào danh sách demo.</p></div><button onClick={() => setShowAdd(false)} className="text-xl text-slate-400 hover:text-slate-700">×</button></div><form onSubmit={addAsset} className="space-y-4"><div><label className="mb-1.5 block text-xs font-semibold text-slate-700">Tên thiết bị *</label><input required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="VD: Dell Latitude 5450" className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div><div><label className="mb-1.5 block text-xs font-semibold text-slate-700">Serial Number *</label><input required value={newSerial} onChange={(e) => setNewSerial(e.target.value)} placeholder="Nhập serial trên thiết bị" className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div><div><label className="mb-1.5 block text-xs font-semibold text-slate-700">Loại thiết bị</label><select value={newCategory} onChange={(e) => setNewCategory(e.target.value as Asset["category"])} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-400"><option>Laptop</option><option>Máy tính bàn</option><option>Màn hình</option><option>Thiết bị khác</option></select></div><div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowAdd(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">Hủy</button><button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700">Thêm thiết bị</button></div></form><p className="mt-4 rounded-lg bg-amber-50 p-3 text-[10px] leading-5 text-amber-700">Lưu ý: dữ liệu ở phiên bản này chỉ nằm trong trình duyệt và sẽ mất khi tải lại trang. Chưa nhập dữ liệu thật.</p></div></div>}
    </div>
  );
}
