import React from 'react';
import { Member } from '../types/family';

interface StatsViewProps {
  members: Member[];
  onNavigate: (view: string) => void;
}

export const StatsView: React.FC<StatsViewProps> = ({ members, onNavigate }) => {
  const total = members.length;
  const alive = members.filter((m) => m.isAlive).length;
  const dead = total - alive;
  const males = members.filter((m) => m.gender === 'Nam').length;
  const females = total - males;
  const malePercent = total > 0 ? ((males / total) * 100).toFixed(1) : '0';
  const femalePercent = total > 0 ? ((females / total) * 100).toFixed(1) : '0';

  // Generations count
  const genCounts: { [gen: number]: number } = {};
  members.forEach((m) => {
    genCounts[m.gen] = (genCounts[m.gen] || 0) + 1;
  });

  const allGens = [1, 2, 3, 4, 5];
  const genLabels: { [k: number]: string } = {
    1: 'Thế hệ I (Khởi tổ khai sáng)',
    2: 'Thế hệ II (Chi trưởng & Chi thứ)',
    3: 'Thế hệ III (Bậc phụ mẫu / Trưởng tộc)',
    4: 'Thế hệ IV (Thế hệ trụ cột gia đình)',
    5: 'Thế hệ V (Hậu duệ trẻ tuổi măng non)',
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Thống Kê Tổng Quan Dòng Họ
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Số liệu nhân khẩu, tỷ lệ phân bổ thế hệ và định danh gia tộc
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Tổng nhân đinh (Thành viên)
          </div>
          <div className="text-4xl font-extrabold text-primary">{total}</div>
          <div className="mt-2 text-xs text-slate-400">Được lập hồ sơ gia phả số</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Tỷ lệ Nam / Nữ
          </div>
          <div className="text-4xl font-extrabold text-blue-600">
            {males} / {females}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {malePercent}% Nam đinh | {femalePercent}% Nữ
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Số thế hệ kế tiếp
          </div>
          <div className="text-4xl font-extrabold text-goldDark">5</div>
          <div className="mt-2 text-xs text-slate-400">Từ Khởi Tổ đến Chắt / Chút</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Tình trạng nhân khẩu
          </div>
          <div className="text-4xl font-extrabold text-emerald-600">
            {alive} / {dead}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {alive} đang sinh sống | {dead} tiên tổ đã khuất
          </div>
        </div>
      </div>

      {/* Phân bổ theo thế hệ & Quy ước đặt tên */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Generation Bars */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-chart-column text-primary"></i> Phân Bổ Theo Thế Hệ
          </h3>

          <div className="space-y-4">
            {allGens.map((g) => {
              const count = genCounts[g] || 0;
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              const barColors = [
                'bg-primary',
                'bg-blue-500',
                'bg-amber-500',
                'bg-emerald-500',
                'bg-purple-500',
              ];
              const color = barColors[(g - 1) % barColors.length];

              return (
                <div key={g} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{genLabels[g] || `Đời ${g}`}</span>
                    <span className="text-slate-500">
                      {count} người ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className={`${color} h-3 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quy ước đặt tên đệm */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-book-bookmark text-goldDark"></i> Quy ước Đặt Tên & Đệm Của Gia Tộc
            </h3>
            <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-sm text-slate-800 space-y-3 leading-relaxed">
              <p>
                <strong className="text-amber-950">Bộ chữ đệm theo thứ tự thế hệ:</strong>
              </p>
              <p className="font-serif text-lg tracking-widest text-primary font-bold text-center py-2 bg-white/70 rounded-xl border border-amber-300">
                VĂN — ĐỨC — QUANG — MINH — PHÚC — THỊNH
              </p>
              <p className="text-xs text-amber-900/80 italic leading-relaxed">
                * Ghi chú gia pháp: Con cháu đời sau khi đặt tên nên theo đúng quy chuẩn gia phả để dễ phân thứ bậc, tránh phạm húy tên tiền nhân và giữ gìn nếp gia phong ngàn đời.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('kinship')}
            className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-people-arrows text-primary"></i>
            <span>Mở Thước Đo Xưng Hô Họ Tộc</span>
          </button>
        </div>
      </div>
    </section>
  );
};
