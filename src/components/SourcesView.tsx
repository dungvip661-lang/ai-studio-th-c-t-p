import React, { useState } from 'react';
import { HISTORICAL_SOURCES } from '../data/initialData';
import { HistoricalSource } from '../types/family';

interface SourcesViewProps {
  onNavigate: (view: string) => void;
}

export const SourcesView: React.FC<SourcesViewProps> = ({ onNavigate }) => {
  const [selectedSource, setSelectedSource] = useState<HistoricalSource | null>(HISTORICAL_SOURCES[0]);
  const [activeType, setActiveType] = useState<string>('all');

  const filteredSources =
    activeType === 'all'
      ? HISTORICAL_SOURCES
      : HISTORICAL_SOURCES.filter((s) => s.type === activeType);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase mb-2">
            <i className="fa-solid fa-feather-pointed text-goldDark"></i> Minh Chứng Cội Nguồn
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Nguồn Gốc & Di Sản Cổ Thư Gia Tộc
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Toàn bộ bản gia phả cổ chữ Hán Nôm, văn bia đá xanh, bản dịch chữ Quốc ngữ và sắc chỉ lưu giữ tại Hậu cung Từ đường dòng họ.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('ai')}
            className="px-4 py-2.5 rounded-xl royal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition flex items-center gap-2"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-gold"></i>
            <span>Dịch nghĩa chữ Nho bằng AI</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveType('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeType === 'all'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Tất cả tư liệu ({HISTORICAL_SOURCES.length})
        </button>
        <button
          onClick={() => setActiveType('Cổ thư Hán Nôm')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeType === 'Cổ thư Hán Nôm'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Cổ thư Hán Nôm
        </button>
        <button
          onClick={() => setActiveType('Bia đá')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeType === 'Bia đá'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Văn bia đá
        </button>
        <button
          onClick={() => setActiveType('Ảnh tư liệu')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeType === 'Ảnh tư liệu'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Hoành phi & Bản dịch
        </button>
        <button
          onClick={() => setActiveType('Bản đồ')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeType === 'Bản đồ'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Sơ đồ địa bạ
        </button>
      </div>

      {/* Main Content Grid: Left List, Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Source Cards */}
        <div className="lg:col-span-5 space-y-4">
          {filteredSources.map((source) => {
            const isSelected = selectedSource?.id === source.id;
            return (
              <div
                key={source.id}
                onClick={() => setSelectedSource(source)}
                className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/70 border-gold shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded">
                      {source.type}
                    </span>
                    <span className="text-slate-400 font-medium">{source.period}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{source.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {source.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    <i className="fa-solid fa-user-pen mr-1 text-slate-400"></i>
                    {source.author}
                  </span>
                  <i className="fa-solid fa-chevron-right text-[10px] text-amber-600"></i>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Source Detailed Viewer */}
        <div className="lg:col-span-7">
          {selectedSource ? (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 sticky top-24">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold uppercase">
                    {selectedSource.type}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                    {selectedSource.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    <i className="fa-regular fa-clock mr-1 text-amber-600"></i> Niên đại: {selectedSource.period}
                  </p>
                </div>
              </div>

              {/* Trích lục nguyên văn */}
              <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                  <i className="fa-solid fa-quote-left text-gold"></i> Trích lục bút tích cổ
                </h4>
                <p className="text-sm font-serif italic text-amber-950 leading-relaxed">
                  {selectedSource.excerpt}
                </p>
              </div>

              {/* Metadata details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-1">Tác giả / Người biên soạn:</span>
                  <strong className="text-slate-800 text-sm">{selectedSource.author}</strong>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-1">Nơi lưu giữ bảo tồn:</span>
                  <strong className="text-slate-800 text-sm">{selectedSource.preservationLocation}</strong>
                </div>
              </div>

              {/* Chi tiết nội dung & giá trị pháp lý */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Mô tả khảo chứng lịch sử
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {selectedSource.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Giá trị & Ý nghĩa đối với gia tộc
                </h4>
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 flex items-start gap-3">
                  <i className="fa-solid fa-stamp text-primary text-base mt-0.5"></i>
                  <span className="leading-relaxed">{selectedSource.significance}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
              Chọn một nguồn tài liệu bên trái để xem trích lục chi tiết.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
