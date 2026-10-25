import React from 'react';
import { Member } from '../types/family';

interface MemberModalProps {
  member: Member | null;
  allMembers: Member[];
  onClose: () => void;
  onEdit: (member: Member) => void;
  onSelectMember: (memberId: number) => void;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  member,
  allMembers,
  onClose,
  onEdit,
  onSelectMember,
}) => {
  if (!member) return null;

  const initials = member.name
    .split(' ')
    .slice(-2)
    .map((w) => w[0])
    .join('');

  // Find parent
  const parent = member.parentId ? allMembers.find((m) => m.id === member.parentId) : null;

  // Find children
  const childrenMembers = allMembers.filter(
    (m) => member.children && member.children.includes(m.id)
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-amber-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="royal-gradient p-5 text-white flex justify-between items-center border-b-2 border-gold">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold text-xs uppercase shadow-xs">
              Thế hệ {member.gen}
            </span>
            <h3 className="text-xl font-bold tracking-tight">{member.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white text-xl p-1 transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Avatar & Vital Info */}
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            <div className="w-24 h-24 rounded-2xl border-4 border-amber-300 flex items-center justify-center text-3xl font-bold bg-slate-100 text-primary shrink-0 shadow-md">
              {initials}
            </div>

            <div className="flex-grow space-y-2 text-center sm:text-left w-full">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">Tên tự / Húy:</span>
                  <span className="font-semibold text-slate-800">{member.alias || 'Chưa cập nhật'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Giới tính:</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <i
                      className={`fa-solid ${
                        member.gender === 'Nam' ? 'fa-mars text-blue-600' : 'fa-venus text-rose-500'
                      }`}
                    ></i>
                    {member.gender}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Năm sinh:</span>
                  <span className="font-semibold text-slate-800">{member.birth}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Trạng thái:</span>
                  <span
                    className={`font-semibold ${
                      member.isAlive ? 'text-emerald-600' : 'text-slate-600'
                    }`}
                  >
                    {member.isAlive ? 'Còn sống' : `Đã mất (${member.death || 'N/A'})`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Chi phái / Nhánh họ:</span>
                  <span className="font-semibold text-slate-800">{member.branch || 'Chưa cập nhật'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Vai trò gia tộc:</span>
                  <span className="font-semibold text-amber-800">{member.role}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-xs">Hôn phối (Vợ / Chồng):</span>
                  <span className="font-semibold text-slate-800">{member.spouse || 'Chưa cập nhật'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-xs">
                    {member.isAlive ? 'Nơi cư ngụ hiện tại:' : 'Mộ phần an táng:'}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {member.isAlive ? member.currentAddress : member.burial || 'Đang cập nhật'}
                  </span>
                </div>
                {member.phone && (
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-xs">Điện thoại / Zalo:</span>
                    <a href={`tel:${member.phone}`} className="font-semibold text-primary hover:underline">
                      {member.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Phụ mẫu & Con cái trực hệ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Bậc Phụ Mẫu (Cha):
              </span>
              {parent ? (
                <button
                  onClick={() => onSelectMember(parent.id)}
                  className="font-bold text-primary hover:underline text-sm flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-user-shield text-amber-600"></i>
                  <span>{parent.name} (Đời {parent.gen})</span>
                </button>
              ) : (
                <span className="text-xs text-slate-400 italic">Khởi tổ / Không có dữ liệu</span>
              )}
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Hậu Duệ / Con Cái ({childrenMembers.length}):
              </span>
              {childrenMembers.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {childrenMembers.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => onSelectMember(ch.id)}
                      className="px-2.5 py-1 bg-white hover:bg-amber-100 border border-slate-300 text-xs font-medium text-slate-800 rounded transition"
                    >
                      {ch.name}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic">Chưa có hoặc chưa cập nhật</span>
              )}
            </div>
          </div>

          {/* Tiểu sử & Công tích */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <i className="fa-solid fa-scroll text-goldDark"></i> Tiểu sử & Sự nghiệp
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {member.bio || 'Chưa có thông tin tiểu sử chi tiết.'}
            </p>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onEdit(member);
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <i className="fa-solid fa-pen-to-square"></i> Sửa thông tin
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg text-xs transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
