import React from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t-2 border-amber-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-8 border-b border-slate-800">
          {/* Cột 1: Thông tin dòng họ */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">GiaPhả</span>
              <span className="text-xl font-extrabold text-gold">Số</span>
            </div>
            <p className="text-xs text-slate-400 italic leading-relaxed">
              &ldquo;Cây có gốc mới nở cành xanh ngọn, nước có nguồn mới biển rộng sông sâu. Người ta sinh trưởng bởi đâu? Gốc là Tiên Tổ, ơn sâu muôn đời.&rdquo;
            </p>
            <div className="pt-2 text-xs text-amber-400 flex items-center gap-2">
              <i className="fa-solid fa-location-dot"></i>
              <span>Thôn Đoài, Xã Tiên Phương, Chương Mỹ, Hà Nội</span>
            </div>
          </div>

          {/* Cột 2: Điều hướng nhanh */}
          <div className="space-y-2 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Tra cứu dòng tộc</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition">
                  <i className="fa-solid fa-chevron-right text-[10px] mr-1.5 text-amber-500"></i> Giới thiệu cội nguồn
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tree')} className="hover:text-amber-400 transition">
                  <i className="fa-solid fa-chevron-right text-[10px] mr-1.5 text-amber-500"></i> Sơ đồ cây gia phả
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('members')} className="hover:text-amber-400 transition">
                  <i className="fa-solid fa-chevron-right text-[10px] mr-1.5 text-amber-500"></i> Danh sách thành viên
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kinship')} className="hover:text-amber-400 transition">
                  <i className="fa-solid fa-chevron-right text-[10px] mr-1.5 text-amber-500"></i> Thước đo xưng hô họ tộc
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-amber-400 transition">
                  <i className="fa-solid fa-chevron-right text-[10px] mr-1.5 text-amber-500"></i> Lịch giỗ & sự kiện tế tự
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 3: Nguồn & Trợ lý AI */}
          <div className="space-y-2 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Di sản & Công nghệ</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('sources')} className="hover:text-amber-400 transition">
                  <i className="fa-solid fa-feather-pointed text-[10px] mr-1.5 text-amber-500"></i> Cổ thư phả ký & Văn bia
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai')} className="hover:text-amber-400 transition">
                  <i className="fa-solid fa-wand-magic-sparkles text-[10px] mr-1.5 text-amber-500"></i> Tổ Phụ AI soạn văn khấn
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stats')} className="hover:text-amber-400 transition">
                  <i className="fa-solid fa-chart-pie text-[10px] mr-1.5 text-amber-500"></i> Thống kê nhân khẩu & Quy ước đệm
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('feedback')} className="hover:text-amber-400 transition">
                  <i className="fa-solid fa-comment-dots text-[10px] mr-1.5 text-amber-500"></i> Góp ý & Báo sinh / Báo tử
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 4: Nền tảng Google AI Studio */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hạ Tầng Công Nghệ</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gia Phả Số được thiết kế và vận hành trên nền tảng <strong className="text-amber-300">Google AI Studio</strong> với mô hình Gemini AI thế hệ mới nhất.
            </p>
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-blue-900/60 to-indigo-900/60 hover:from-blue-800 hover:to-indigo-800 border border-indigo-400/30 text-amber-300 text-xs font-semibold shadow-sm transition"
            >
              <i className="fa-brands fa-google text-blue-400"></i>
              <span>Khám phá Google AI Studio</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>

        {/* Bản quyền & Bản quyền tác giả */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Bản quyền thuộc về Hội Đồng Gia Tộc Dòng Họ Nguyễn Văn. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-4">
            <span className="text-amber-500/80 font-medium">Phiên bản Số hoá 3.0</span>
            <span>•</span>
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 underline transition"
            >
              AI Studio Link
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
