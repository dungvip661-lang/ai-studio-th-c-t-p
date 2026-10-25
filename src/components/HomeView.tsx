import React, { useState } from 'react';
import { Member } from '../types/family';

interface HomeViewProps {
  members: Member[];
  onNavigate: (view: string) => void;
  onSelectMember: (memberId: number) => void;
  onSearchQuery: (query: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  members,
  onNavigate,
  onSelectMember,
  onSearchQuery,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const totalMembers = members.length;
  const aliveMembers = members.filter((m) => m.isAlive).length;
  const deceasedMembers = totalMembers - aliveMembers;
  const generations = Array.from(new Set(members.map((m) => m.gen))).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onSearchQuery(searchInput.trim());
    onNavigate('members');
  };

  return (
    <section className="animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative royal-gradient text-white overflow-hidden py-16 md:py-24 border-b-4 border-gold">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-amber-300 text-xs md:text-sm font-medium mb-6">
            <i className="fa-solid fa-certificate text-gold"></i>
            <span>Gìn giữ cội nguồn – Kết nối thế hệ – Lưu danh muôn đời</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
            Số hoá gia phả <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              Lưu giữ cội nguồn dòng họ
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed mb-9">
            Nền tảng quản lý gia phả thông minh, tra cứu thế hệ, lưu trữ tiểu sử, ngày giỗ, bảo tồn cổ thư Hán Nôm và kết nối các thành viên trong dòng họ mọi lúc mọi nơi.
          </p>

          {/* Quick Search Input */}
          <div className="max-w-2xl mx-auto mb-9">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-2xl">
              <i className="fa-solid fa-magnifying-glass absolute left-5 text-slate-400 text-lg"></i>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Nhập tên thành viên hoặc thế hệ cần tra cứu (ví dụ: Nguyễn Văn, Đời 3)..."
                className="w-full pl-14 pr-32 py-4 rounded-xl text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-400/50 shadow-inner text-sm md:text-base"
              />
              <button
                type="submit"
                className="absolute right-2.5 px-5 py-2.5 bg-primary hover:bg-blue-900 text-white font-medium rounded-lg text-sm transition shadow-md"
              >
                Tra cứu
              </button>
            </form>
          </div>

          {/* Call To Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('tree')}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold transition shadow-lg shadow-amber-500/30 flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-sitemap"></i> Xem cây gia phả
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-7 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-amber-300/40 text-amber-200 font-semibold backdrop-blur-sm transition flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-book-open"></i> Giới thiệu dòng họ
            </button>
            <button
              onClick={() => onNavigate('ai')}
              className="px-6 py-3.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-400/50 text-indigo-200 font-medium backdrop-blur-sm transition flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-wand-magic-sparkles text-amber-400"></i> Hỏi Tổ Phụ AI
            </button>
          </div>
        </div>
      </div>

      {/* Highlights & Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 -mt-16 relative z-20">
          <div
            onClick={() => onNavigate('members')}
            className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-blue-200 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center text-2xl font-bold">
              <i className="fa-solid fa-users"></i>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-800">{totalMembers}</div>
              <div className="text-xs md:text-sm text-slate-500 font-medium">Tổng thành viên</div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('tree')}
            className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-amber-200 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-goldDark flex items-center justify-center text-2xl font-bold">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-800">{generations}</div>
              <div className="text-xs md:text-sm text-slate-500 font-medium">Thế hệ kế thừa</div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('members')}
            className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-emerald-200 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl font-bold">
              <i className="fa-solid fa-heart-pulse"></i>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-800">{aliveMembers}</div>
              <div className="text-xs md:text-sm text-slate-500 font-medium">Đang sinh sống</div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('members')}
            className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-purple-200 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl font-bold">
              <i className="fa-solid fa-monument"></i>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-800">{deceasedMembers}</div>
              <div className="text-xs md:text-sm text-slate-500 font-medium">Tiên tổ đã khuất</div>
            </div>
          </div>
        </div>

        {/* Tôn chỉ & Lịch sử tóm lược */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            onClick={() => onNavigate('about')}
            className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-goldDark flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition">
              <i className="fa-solid fa-seedling"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-amber-800 transition">
              Gìn Giữ Cội Nguồn
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Bảo tồn văn bản gia phả cổ, sắc phong, bài vị và truyền thống gia đạo của dòng họ theo tiến trình lịch sử qua từng thế hệ.
            </p>
            <span className="text-xs font-semibold text-amber-700 flex items-center gap-1">
              Đọc trang giới thiệu <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </span>
          </div>

          <div
            onClick={() => onNavigate('kinship')}
            className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-primary flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition">
              <i className="fa-solid fa-people-arrows"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary transition">
              Kết Nối & Xưng Hô
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Dù con cháu lập nghiệp ở muôn nơi đều có thể dễ dàng tra cứu chi phái, thứ bậc xưng hô chuẩn mực theo gia pháp truyền thống.
            </p>
            <span className="text-xs font-semibold text-primary flex items-center gap-1">
              Tra cứu thước xưng hô <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </span>
          </div>

          <div
            onClick={() => onNavigate('events')}
            className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-red-100 text-traditionalRed flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition">
              <i className="fa-solid fa-bell"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-traditionalRed transition">
              Lễ Giỗ & Tảo Mộ
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Nhắc nhở ngày giỗ tổ, ngày kỵ âm lịch chính xác, địa điểm nhà thờ họ và phân công ban khánh tiết chuẩn bị chu đáo.
            </p>
            <span className="text-xs font-semibold text-traditionalRed flex items-center gap-1">
              Xem lịch giỗ chạp <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </span>
          </div>
        </div>

        {/* Feature Shortcut Banners */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 rounded-2xl p-6 sm:p-8 border border-amber-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/60 text-amber-900 text-xs font-bold uppercase">
              <i className="fa-solid fa-wand-magic-sparkles text-amber-700"></i> Trợ Lý Thông Minh
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Bạn cần soạn bài văn khấn hay tra cứu thứ bậc gia tộc?
            </h3>
            <p className="text-sm text-slate-700 max-w-xl">
              Trải nghiệm &ldquo;Tổ Phụ AI&rdquo; tích hợp công nghệ Gemini để tự động soạn thảo văn khấn ngày giỗ, giải nghĩa chữ Hán Nôm và tra cứu phả hệ chuẩn xác.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('ai')}
              className="px-6 py-3 rounded-xl bg-primary hover:bg-blue-900 text-white text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-comments"></i> Trò chuyện với AI
            </button>
            <button
              onClick={() => onNavigate('sources')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm font-semibold shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-scroll text-amber-600"></i> Xem Cổ Thư
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
