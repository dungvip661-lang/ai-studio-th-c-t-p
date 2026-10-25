import React, { useState } from 'react';
import { Member } from '../types/family';

interface TreeViewProps {
  members: Member[];
  onSelectMember: (memberId: number) => void;
  onOpenAddModal: () => void;
}

export const TreeView: React.FC<TreeViewProps> = ({
  members,
  onSelectMember,
  onOpenAddModal,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  const rootMember = members.find((m) => m.gen === 1);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.6));
  const handleZoomReset = () => setZoomLevel(1);

  const handlePrint = () => {
    window.print();
  };

  const renderNode = (member: Member) => {
    const isMale = member.gender === 'Nam';
    const badgeColor = member.isAlive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500';

    // Find children in current dataset
    const childrenMembers = members.filter(
      (m) => member.children && member.children.includes(m.id)
    );

    // Filter by branch if active
    const filteredChildren =
      selectedBranch === 'all'
        ? childrenMembers
        : childrenMembers.filter((m) => !m.branch || m.branch === selectedBranch || member.gen === 1);

    return (
      <li key={member.id}>
        <div
          className={`tree-node ${member.gen === 1 ? 'root ring-2 ring-amber-400/80 shadow-md' : ''}`}
          onClick={() => onSelectMember(member.id)}
        >
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-bold text-amber-700">Đời {member.gen}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${badgeColor}`}>
              {member.isAlive ? 'Còn sống' : 'Đã mất'}
            </span>
          </div>
          <div className="font-bold text-slate-900 text-sm flex items-center justify-center gap-1.5">
            <i className={`fa-solid ${isMale ? 'fa-mars text-blue-600' : 'fa-venus text-rose-500'}`}></i>
            <span>{member.name}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-sans">
            {member.birth} {member.death ? ` - ${member.death}` : ''}
          </div>
          <div className="text-[10px] text-amber-800/80 font-medium truncate max-w-[140px] mt-1 mx-auto">
            {member.role}
          </div>
        </div>

        {filteredChildren.length > 0 && (
          <ul>
            {filteredChildren.map((child) => renderNode(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        {/* Header Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <i className="fa-solid fa-sitemap text-gold"></i> Sơ Đồ Phả Hệ Cây Trực Quan
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Bấm vào từng thành viên để xem chi tiết tiểu sử, phần mộ hoặc thông tin phụ mẫu & con cháu.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter by Branch */}
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="py-1.5 px-3 border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Toàn bộ các Chi</option>
              <option value="Chi Trưởng (Chi 1)">Chi Trưởng (Chi 1)</option>
              <option value="Chi Thứ (Chi 2)">Chi Thứ (Chi 2)</option>
            </select>

            {/* Zoom Controls */}
            <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 shadow-2xs">
              <button
                onClick={handleZoomOut}
                title="Thu nhỏ"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded text-xs"
              >
                <i className="fa-solid fa-magnifying-glass-minus"></i>
              </button>
              <button
                onClick={handleZoomReset}
                title="Khôi phục kích thước"
                className="px-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                title="Phóng to"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded text-xs"
              >
                <i className="fa-solid fa-magnifying-glass-plus"></i>
              </button>
            </div>

            {/* Print & Add Member */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-print"></i>
              <span className="hidden sm:inline">In Phả Hệ</span>
            </button>
            <button
              onClick={onOpenAddModal}
              className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-blue-900 text-white text-xs font-medium transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-plus text-amber-300"></i>
              <span>Thêm Thành Viên</span>
            </button>
          </div>
        </div>

        {/* Chú thích màu sắc */}
        <div className="flex flex-wrap items-center gap-5 py-3 px-2 text-xs font-medium text-slate-600 bg-slate-50/70 rounded-lg my-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600"></span> Nam đinh
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span> Nữ
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-400"></span> Đã khuất
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Đang sinh sống
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400"></span> Cụ Thủy Tổ
          </span>
        </div>

        {/* Tree Container with Transform Zoom */}
        <div className="overflow-x-auto py-8 min-h-[480px]">
          <div
            className="tree transition-transform duration-200 origin-top min-w-[850px]"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {rootMember ? (
              <ul>{renderNode(rootMember)}</ul>
            ) : (
              <p className="text-center text-slate-400 py-10">Chưa có dữ liệu thành viên khởi tổ.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
