import React, { useState } from 'react';

interface FeedbackViewProps {
  onNavigate: (view: string) => void;
}

export const FeedbackView: React.FC<FeedbackViewProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: '',
    type: 'Bổ sung thành viên mới sinh',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-amber-100 text-goldDark rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl border border-amber-200 shadow-2xs">
            <i className="fa-solid fa-pen-nib"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Góp Ý & Bổ Sung Thông Tin Dòng Họ
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Bà con vui lòng cung cấp thông tin sửa đổi ngày sinh, ngày kỵ, hình ảnh hoặc báo sinh con cháu mới để bổ sung vào gia phả số.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-xl shadow-md">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="text-lg font-bold text-emerald-950">Gửi thông tin thành công!</h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
              Cảm ơn quý bà con dòng tộc. Ban Trị Sự & Ban Quản trị Gia Phả Số đã tiếp nhận thông tin và sẽ tiến hành xác minh, cập nhật vào phả hệ trong thời gian sớm nhất.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', branch: '', type: 'Bổ sung thành viên mới sinh', content: '' });
                }}
                className="px-4 py-2 bg-white border border-emerald-300 rounded-lg text-xs font-semibold text-emerald-900 hover:bg-emerald-100"
              >
                Gửi thêm yêu cầu
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-blue-900"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Họ và tên người gửi *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn Cường"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Số điện thoại / Zalo *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="09xx xxx xxx"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Thuộc Chi Phái / Thế hệ
                </label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="Ví dụ: Chi 1, Đời 4..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Loại yêu cầu
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 font-medium"
                >
                  <option>Bổ sung thành viên mới sinh (Báo sinh)</option>
                  <option>Chỉnh sửa ngày tháng năm sinh/mất</option>
                  <option>Đính chính thông tin tiểu sử / mộ phần</option>
                  <option>Cập nhật số điện thoại / địa chỉ hiện tại</option>
                  <option>Góp ý xây dựng ứng dụng Gia Phả Số</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Nội dung chi tiết *
              </label>
              <textarea
                rows={4}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Ghi rõ họ tên thành viên mới sinh (ngày tháng năm sinh, cha mẹ là ai) hoặc thông tin cần đính chính..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 leading-relaxed"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary hover:bg-blue-900 text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-regular fa-paper-plane text-amber-300"></i>
              <span>Gửi Thông Tin Về Ban Trị Sự Dòng Họ</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
