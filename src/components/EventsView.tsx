import React, { useState } from 'react';
import { INITIAL_EVENTS_DATA } from '../data/initialData';
import { FamilyEvent } from '../types/family';

interface EventsViewProps {
  onNavigate: (view: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onNavigate }) => {
  const [events] = useState<FamilyEvent[]>(INITIAL_EVENTS_DATA);
  const [remindedEvents, setRemindedEvents] = useState<number[]>([]);

  const toggleReminder = (id: number, title: string) => {
    if (remindedEvents.includes(id)) {
      setRemindedEvents(remindedEvents.filter((item) => item !== id));
      alert(`Đã hủy nhắc nhở sự kiện: ${title}`);
    } else {
      setRemindedEvents([...remindedEvents, id]);
      alert(`Đã bật thông báo nhắc nhở ngày giỗ / sự kiện: ${title}. Hệ thống sẽ thông báo trước ngày diễn ra.`);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-traditionalRed text-xs font-bold uppercase mb-2">
            <i className="fa-solid fa-calendar-check"></i> Nghi Lễ Tế Tự & Kỵ Nhật
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Lịch Giỗ & Sự Kiện Dòng Họ
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Tra cứu ngày kỵ nhật âm lịch, ngày giỗ thường niên và các đại lễ tế tự tại Từ đường Thôn Đoài, Chương Mỹ.
          </p>
        </div>

        <button
          onClick={() => onNavigate('ai')}
          className="px-5 py-2.5 rounded-xl royal-gradient text-amber-300 font-bold text-xs shadow-md transition flex items-center gap-2 self-start md:self-auto"
        >
          <i className="fa-solid fa-scroll text-gold"></i>
          <span>Soạn văn khấn giỗ bằng AI</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách sự kiện & giỗ kỵ */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-calendar-days text-traditionalRed"></i> Danh Sách Lễ Kỵ Hàng Năm
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Xếp theo thứ tự thời gian âm lịch</p>
              </div>
            </div>

            <div className="space-y-4">
              {events.map((ev) => {
                const isReminded = remindedEvents.includes(ev.id);
                return (
                  <div
                    key={ev.id}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-amber-300 transition bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-100 text-traditionalRed border border-red-200">
                          <i className="fa-solid fa-fire mr-1"></i> {ev.importance}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base">{ev.title}</h4>
                      </div>

                      <p className="text-sm text-slate-700">
                        <i className="fa-regular fa-moon text-amber-600 mr-1.5"></i> Âm lịch:{' '}
                        <strong className="text-amber-800 font-bold">{ev.lunarDate}</strong>
                        <span className="text-slate-400 mx-2">|</span>
                        <i className="fa-regular fa-sun text-orange-500 mr-1"></i> Dương lịch:{' '}
                        <span className="text-slate-600">{ev.solarDate}</span>
                      </p>

                      <div className="text-xs text-slate-500 space-y-1">
                        <div>
                          <i className="fa-solid fa-user-shield text-slate-400 mr-1.5"></i>
                          <span>Phụ trách: {ev.host}</span>
                        </div>
                        <div>
                          <i className="fa-solid fa-location-dot text-slate-400 mr-1.5"></i>
                          <span>Địa điểm: {ev.location}</span>
                        </div>
                        {ev.description && (
                          <p className="text-slate-600 italic pt-1 border-t border-slate-200 text-xs leading-relaxed">
                            {ev.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center md:flex-col gap-2">
                      <button
                        onClick={() => toggleReminder(ev.id, ev.title)}
                        className={`w-full px-4 py-2 rounded-xl text-xs font-semibold transition shadow-2xs flex items-center justify-center gap-1.5 ${
                          isReminded
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-white border border-slate-300 hover:border-amber-500 text-slate-700'
                        }`}
                      >
                        <i className={`fa-regular ${isReminded ? 'fa-bell-slash' : 'fa-bell'} text-amber-600`}></i>
                        <span>{isReminded ? 'Đang bật nhắc' : 'Nhắc nhở'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hướng dẫn nghi thức & Lễ hội */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-2xs">
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-2 mb-3">
              <i className="fa-solid fa-scroll text-goldDark"></i> Quy định giỗ chạp tộc
            </h3>
            <ul className="text-xs text-amber-900/90 space-y-2.5 list-disc list-inside leading-relaxed">
              <li>
                <strong>Đại lễ Giỗ Tổ:</strong> Cử hành đúng vào ngày Rằm tháng Giêng (15/1 Âm lịch) tại Nhà thờ Tổ dòng họ. Toàn thể con cháu tề tựu.
              </li>
              <li>
                <strong>Lễ Thanh Minh:</strong> Thượng tuần tháng 3 Âm lịch, tổ chức thăm viếng, đắp thêm lớp đất mới tại Khu lăng mộ thôn Đoài và nghĩa trang xứ Đồng Mạ.
              </li>
              <li>
                <strong>Lễ vật & Ban khánh tiết:</strong> Các chi trưởng phân công chuẩn bị mâm lễ tam sinh, xôi gà, hoa quả thanh khiết, hương đăng trà quả trước 1 ngày.
              </li>
              <li>
                <strong>Họp họ đầu năm:</strong> Sau phần tế lễ là lễ báo công học tập, trao học bổng khuyến học cho con cháu đỗ đạt.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-primary"></i> Địa Điểm Từ Đường Dòng Họ
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thôn Đoài, Xã Tiên Phương, Huyện Chương Mỹ, TP. Hà Nội.
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
              <div>
                <strong>Trưởng ban Khánh tiết:</strong> Ông Nguyễn Văn An (0982.123.456)
              </div>
              <div>
                <strong>Trưởng Tộc chủ trì:</strong> Ông Nguyễn Quang Hải (0912.345.678)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
