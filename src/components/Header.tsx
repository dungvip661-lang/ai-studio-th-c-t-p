import React from 'react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenAddModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: 'fa-solid fa-house' },
    { id: 'about', label: 'Giới thiệu', icon: 'fa-solid fa-book-open' },
    { id: 'tree', label: 'Cây gia phả', icon: 'fa-solid fa-sitemap' },
    { id: 'members', label: 'Thành viên', icon: 'fa-solid fa-users' },
    { id: 'kinship', label: 'Xưng hô', icon: 'fa-solid fa-people-arrows' },
    { id: 'events', label: 'Giỗ & Sự kiện', icon: 'fa-regular fa-calendar-days' },
    { id: 'sources', label: 'Nguồn & Cổ thư', icon: 'fa-solid fa-feather-pointed' },
    { id: 'stats', label: 'Thống kê', icon: 'fa-solid fa-chart-pie' },
    { id: 'ai', label: 'Tổ Phụ AI', icon: 'fa-solid fa-wand-magic-sparkles', highlight: true },
    { id: 'feedback', label: 'Góp ý', icon: 'fa-regular fa-comment-dots' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-12 h-12 rounded-xl royal-gradient flex items-center justify-center border-2 border-gold shadow-md group-hover:scale-105 transition">
              <i className="fa-solid fa-scroll text-gold text-2xl"></i>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-primaryDark">GiaPhả</span>
                <span className="text-2xl font-extrabold text-gold">Số</span>
              </div>
              <p className="text-[11px] font-medium tracking-wider uppercase text-amber-700">
                Cội Nguồn Dòng Họ
              </p>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden xl:flex items-center space-x-1 font-medium text-slate-700 text-sm">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-100/80 text-amber-900 font-bold border border-amber-300/60 shadow-xs'
                      : item.highlight
                      ? 'text-amber-700 hover:text-amber-900 hover:bg-amber-50 font-semibold'
                      : 'hover:text-primary hover:bg-slate-100'
                  }`}
                >
                  <i className={`${item.icon} text-xs ${item.highlight ? 'text-amber-600' : ''}`}></i>
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: AI Studio Link & Quick Add Member */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Direct Google AI Studio Link Button */}
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Khám phá Google AI Studio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-indigo-900 text-xs font-semibold shadow-xs transition hover:shadow-sm"
            >
              <i className="fa-brands fa-google text-blue-600"></i>
              <span>Google AI Studio</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-indigo-500"></i>
            </a>

            <button
              onClick={onOpenAddModal}
              className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-blue-900 text-white font-medium text-xs transition shadow-sm flex items-center gap-1.5"
            >
              <i className="fa-solid fa-user-plus text-amber-300"></i>
              <span>+ Thêm người</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenAddModal}
              className="px-2.5 py-1.5 rounded-lg bg-primary text-white text-xs font-medium"
            >
              <i className="fa-solid fa-user-plus"></i>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-primary focus:outline-none"
              aria-label="Menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-md font-medium text-sm flex items-center justify-between ${
                currentView === item.id
                  ? 'bg-amber-50 text-amber-900 font-bold border-l-4 border-gold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <i className={`${item.icon} w-5 text-primary`}></i>
                <span>{item.label}</span>
              </div>
              {item.highlight && (
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                  AI Trợ Lý
                </span>
              )}
            </button>
          ))}

          {/* AI Studio Link in Mobile Menu */}
          <div className="pt-3 mt-2 border-t border-slate-100">
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-indigo-50 text-indigo-900 text-xs font-bold"
            >
              <span className="flex items-center gap-2">
                <i className="fa-brands fa-google text-blue-600"></i>
                Truy cập Google AI Studio
              </span>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
