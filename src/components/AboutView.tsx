import React from 'react';
import { CLAN_RULES, CLAN_COMMITTEE } from '../data/initialData';

interface AboutViewProps {
  onNavigate: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 animate-fadeIn space-y-12">
      {/* Header Banner Trang Giới Thiệu */}
      <div className="royal-gradient text-white rounded-3xl p-8 md:p-12 border-2 border-gold shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <i className="fa-solid fa-scroll text-[240px]"></i>
        </div>
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-300/30">
            <i className="fa-solid fa-landmark"></i> Lịch Sử & Gia Tộc Chí
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Giới Thiệu Cội Nguồn <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400">
              Dòng Họ Nguyễn Văn & Gia Phả Số
            </span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
            Nơi ghi tạc công ơn tiên tổ, gìn giữ gia phong đạo đức, thắt chặt mối dây huyết thống cho muôn đời con cháu dù ở phương trời nào cũng luôn hướng về cội nguồn quê cha đất tổ.
          </p>
        </div>
      </div>

      {/* 1. Lịch sử hình thành & Cội nguồn phát tích */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-goldDark flex items-center justify-center text-xl font-bold">
            <i className="fa-solid fa-seedling"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Cội Nguồn Phát Tích Dòng Họ</h2>
            <p className="text-xs text-slate-500">Khởi tích từ Thôn Đoài, Xã Tiên Phương, Huyện Chương Mỹ, TP. Hà Nội</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
            <p>
              Dòng họ Nguyễn Văn tại vùng đất địa linh Chương Mỹ có bề dày truyền thống lập nghiệp từ cuối thế kỷ 19. Khởi tổ là <strong className="text-primary font-bold">Cụ Nguyễn Văn Căn (1895 - 1968)</strong> cùng phu nhân là <strong className="text-primary font-bold">Cụ Bà Trần Thị Mùi (1898 - 1972)</strong>.
            </p>
            <p>
              Thuở hàn vi lập nghiệp, cụ Khởi Tổ một tay khai hoang đất bãi, mở mang điền trang, gây dựng nếp nhà thanh bạch. Cụ luôn răn dạy con cháu: <em>&ldquo;Lấy chữ Nhân làm gốc, lấy chữ Đức làm rường cột, lấy sự học làm kế sinh nhai lâu bền&rdquo;</em>.
            </p>
            <p>
              Trải qua các thời kỳ lịch sử, từ hai người con trai là <strong className="text-slate-800">Cụ Nguyễn Văn Đức (Trưởng Chi 1)</strong> và <strong className="text-slate-800">Cụ Nguyễn Văn Thịnh (Trưởng Chi 2)</strong>, dòng họ đã chia cành bén rễ, nhiều con cháu tham gia các cuộc kháng chiến vệ quốc, lập nhiều chiến công vẻ vang và cống hiến cho công cuộc kiến thiết quê hương, đất nước.
            </p>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-900">
              <i className="fa-solid fa-quote-left mr-2 text-gold"></i>
              <strong>Lời người xưa để lại:</strong> &ldquo;Ngọc chẳng mài chẳng thành đồ quý, người chẳng học chẳng biết lễ nghi. Con cháu họ ta dù đi muôn nẻo phải nhớ lấy ngày giỗ rằm tháng Giêng về dâng nén tâm hương tạ ơn tiên tổ.&rdquo;
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full royal-gradient flex items-center justify-center border-2 border-gold shadow-md">
              <i className="fa-solid fa-place-of-worship text-gold text-3xl"></i>
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Từ Đường Cố Hương</h3>
            <p className="text-xs text-slate-600">
              Ngôi nhà thờ Tổ 3 gian 2 chái bằng gỗ lim cổ thụ tọa lạc giữa Thôn Đoài, nơi lưu giữ hoành phi câu đối và bài vị các bậc tiền bối.
            </p>
            <button
              onClick={() => onNavigate('sources')}
              className="w-full py-2.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:border-amber-400 hover:text-amber-800 transition"
            >
              <i className="fa-solid fa-scroll mr-1.5 text-amber-600"></i> Xem Cổ Thư & Di Vật
            </button>
          </div>
        </div>
      </div>

      {/* 2. Ý nghĩa của Gia Phả Số trong thời đại mới */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary flex items-center justify-center text-xl font-bold">
            <i className="fa-solid fa-laptop-code"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Sứ Mệnh Số Hóa Phả Hệ</h2>
            <p className="text-xs text-slate-500">Ứng dụng công nghệ hiện đại bảo tồn di sản gia tộc</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-base">Tránh Nguy Cơ Thất Truyền</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Các bản gia phả bằng giấy dó cổ hay chép tay sau hàng chục năm dễ bị ẩm mốc, mục nát hoặc hỏa hoạn. Số hóa giúp lưu giữ vĩnh viễn trên đám mây an toàn.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center text-sm font-bold">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-base">Kết Nối Con Cháu Muôn Phương</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dù đang sinh sống tại Hà Nội, TP.HCM, Đà Nẵng hay ở hải ngoại, con cháu thế hệ thứ 4, thứ 5 đều có thể mở điện thoại để tra cứu chi phái và cách xưng hô chuẩn xác.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-base">Trợ Lý AI Tri Thức Dòng Họ</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tích hợp trí tuệ nhân tạo Gemini để hỗ trợ thế hệ trẻ tìm hiểu ý nghĩa câu đối chữ Nho, soạn văn khấn cúng giỗ đúng phong tục cổ truyền mà không bị bỡ ngỡ.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Mười Điều Gia Quy & Huấn Thị */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-traditionalRed flex items-center justify-center text-xl font-bold">
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Gia Quy & Huấn Thị Của Tiền Nhân</h2>
              <p className="text-xs text-slate-500">Các quy ước đạo đức lưu truyền cho mọi thành viên dòng họ</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-900 rounded-full">
            Ban hành và tu chỉnh năm 2024
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CLAN_RULES.map((rule) => (
            <div
              key={rule.no}
              className="p-4 rounded-xl border border-slate-200 hover:border-amber-300 transition bg-white flex gap-3.5 items-start"
            >
              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {rule.no}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{rule.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{rule.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Hội Đồng Gia Tộc & Ban Trị Sự */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Ban Trị Sự & Hội Đồng Gia Tộc</h2>
            <p className="text-xs text-slate-500">Nhiệm kỳ 2020 - 2027 phụ trách điều hành việc tế tự, khuyến học và phả hệ</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CLAN_COMMITTEE.map((c, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                  {c.role}
                </span>
                <h4 className="font-bold text-slate-900 text-base">{c.name}</h4>
                <p className="text-xs text-slate-500">
                  <i className="fa-solid fa-location-dot mr-1 text-slate-400"></i> {c.address}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-200">
                  {c.duty}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-200">
                <a
                  href={`tel:${c.phone.replace(/[^0-9]/g, '')}`}
                  className="text-xs font-semibold text-primary hover:text-blue-900 flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-phone text-emerald-600"></i> {c.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Vị Trí Từ Đường & Chỉ Dẫn Đường Đi */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-goldDark flex items-center justify-center text-xl font-bold">
            <i className="fa-solid fa-map-location-dot"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Địa Điểm Từ Đường & Khu Lăng Mộ</h2>
            <p className="text-xs text-slate-500">Thông tin địa chỉ hành chính và tọa độ GPS giúp con cháu dễ dàng viếng bái</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-sm text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-primary flex items-center gap-2">
                <i className="fa-solid fa-place-of-worship text-goldDark"></i> Nhà Thờ Tổ (Từ Đường)
              </div>
              <p>Thôn Đoài, Xã Tiên Phương, Huyện Chương Mỹ, Thành phố Hà Nội.</p>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <i className="fa-solid fa-compass text-amber-600"></i> Tọa độ GPS: <strong>20°56'14.2&quot;N 105°40'38.5&quot;E</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-primary flex items-center gap-2">
                <i className="fa-solid fa-monument text-purple-600"></i> Khu Lăng Mộ Khởi Tổ & Tiên Linh
              </div>
              <p>Khu lăng mộ Tổ thôn Đoài & Nghĩa trang xứ Đồng Mạ, Chương Mỹ, Hà Nội.</p>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <i className="fa-solid fa-compass text-amber-600"></i> Cách Từ đường 600m về phía Tây Nam
              </div>
            </div>

            <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
              <strong>Hướng dẫn đường đi từ trung tâm Hà Nội:</strong>
              <p>
                Từ Ngã Tư Sở đi theo trục đường Nguyễn Trãi - Quang Trung (Hà Đông) - Quốc lộ 6 tới thị trấn Chúc Sơn, rẽ vào đường tỉnh lộ đi Chùa Trầm - Tiên Phương khoảng 2.5km là tới Thôn Đoài.
              </p>
            </div>
          </div>

          <div className="royal-gradient p-6 rounded-2xl text-white text-center space-y-4 border border-gold">
            <i className="fa-solid fa-map-marked-alt text-5xl text-gold"></i>
            <h3 className="text-lg font-bold">Chỉ Dẫn Hành Hương Về Nguồn</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bà con kiều bào hoặc con cháu ở xa về viếng tổ vào các dịp lễ giỗ xin vui lòng liên hệ trước với Ban Khánh tiết để được mở cửa đón tiếp và chuẩn bị nhang đèn chu đáo.
            </p>
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=20.937278,105.677361"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition shadow-md"
              >
                <i className="fa-solid fa-diamond-turn-right"></i> Mở trên Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Vinh Danh Nền Tảng Google AI Studio */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 rounded-2xl p-8 text-white border-2 border-indigo-400/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <i className="fa-brands fa-google text-blue-400"></i> Được Xây Dựng Trên Nền Tảng Google AI Studio
          </div>
          <h3 className="text-2xl font-bold text-white">
            Nền Tảng Công Nghệ Hiện Đại Cho Gia Phả Số
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Ứng dụng Gia Phả Số Dòng Họ Nguyễn Văn tự hào ứng dụng công nghệ trí tuệ nhân tạo Gemini từ Google AI Studio, mang lại khả năng phân tích gia hệ, tra cứu quan hệ huyết thống và tạo sinh văn khấn cổ truyền một cách thông minh, chính xác.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>Mở Google AI Studio</span>
          </a>
          <button
            onClick={() => onNavigate('ai')}
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition flex items-center gap-2"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-amber-400"></i>
            <span>Thử Tổ Phụ AI</span>
          </button>
        </div>
      </div>
    </section>
  );
};
