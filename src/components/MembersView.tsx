import React, { useState } from 'react';
import { Member } from '../types/family';

interface MembersViewProps {
  members: Member[];
  onSelectMember: (memberId: number) => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (memberId: number) => void;
  onOpenAddModal: () => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetData: () => void;
  searchFilter: string;
  onSearchChange: (q: string) => void;
}

export const MembersView: React.FC<MembersViewProps> = ({
  members,
  onSelectMember,
  onEditMember,
  onDeleteMember,
  onOpenAddModal,
  onExportJson,
  onImportJson,
  onResetData,
  searchFilter,
  onSearchChange,
}) => {
  const [selectedGen, setSelectedGen] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredMembers = members.filter((m) => {
    const query = searchFilter.toLowerCase().trim();
    const matchSearch =
      m.name.toLowerCase().includes(query) ||
      (m.alias && m.alias.toLowerCase().includes(query)) ||
      (m.role && m.role.toLowerCase().includes(query)) ||
      (m.currentAddress && m.currentAddress.toLowerCase().includes(query));

    const matchGen = selectedGen === 'all' || m.gen.toString() === selectedGen;
    const matchGender = selectedGender === 'all' || m.gender === selectedGender;
    const matchBranch = selectedBranch === 'all' || m.branch === selectedBranch;
    const matchStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'alive' && m.isAlive) ||
      (selectedStatus === 'deceased' && !m.isAlive);

    return matchSearch && matchGen && matchGender && matchBranch && matchStatus;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        {/* Top Title & Primary Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <i className="fa-solid fa-users text-primary"></i> Danh Sách Thành Viên Dòng Họ
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Quản lý, tra cứu và chỉnh sửa thông tin chi tiết từng nhân đinh trong gia tộc ({members.length} người)
            </p>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 bg-primary hover:bg-blue-900 text-white rounded-lg text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-user-plus text-amber-300"></i>
              <span>Thêm Thành Viên</span>
            </button>

            <button
              onClick={onExportJson}
              title="Tải tệp JSON dữ liệu gia phả để sao lưu an toàn"
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-download text-slate-500"></i>
              <span>Sao Lưu JSON</span>
            </button>

            <label
              title="Nhập dữ liệu gia phả từ tệp sao lưu JSON"
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-upload text-slate-500"></i>
              <span>Nhập JSON</span>
              <input type="file" accept=".json" onChange={onImportJson} className="hidden" />
            </label>

            <button
              onClick={onResetData}
              title="Khôi phục lại dữ liệu mẫu gốc ban đầu"
              className="px-2.5 py-2 text-slate-400 hover:text-rose-600 transition text-xs"
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6 p-4 bg-slate-50/70 rounded-xl border border-slate-200">
          {/* Search Box */}
          <div className="relative lg:col-span-1">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm theo tên, tự húy..."
              className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Thế hệ */}
          <select
            value={selectedGen}
            onChange={(e) => setSelectedGen(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">Tất cả thế hệ</option>
            <option value="1">Đời 1 (Khởi Tổ)</option>
            <option value="2">Đời 2 (Trưởng/Thứ)</option>
            <option value="3">Đời 3</option>
            <option value="4">Đời 4</option>
            <option value="5">Đời 5 (Hậu duệ nhỏ tuổi)</option>
          </select>

          {/* Giới tính */}
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">Giới tính: Tất cả</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>

          {/* Chi phái */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">Chi phái: Tất cả</option>
            <option value="Gốc Tổ">Gốc Tổ</option>
            <option value="Chi Trưởng (Chi 1)">Chi Trưởng (Chi 1)</option>
            <option value="Chi Thứ (Chi 2)">Chi Thứ (Chi 2)</option>
          </select>

          {/* Trạng thái */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">Trạng thái: Tất cả</option>
            <option value="alive">Đang sinh sống</option>
            <option value="deceased">Đã khuất</option>
          </select>
        </div>

        {/* Member Cards Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMembers.map((m) => {
              const initials = m.name
                .split(' ')
                .slice(-2)
                .map((w) => w[0])
                .join('');
              const avatarBg =
                m.gender === 'Nam' ? 'bg-blue-100 text-primary' : 'bg-rose-100 text-rose-600';

              return (
                <div
                  key={m.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group hover:border-amber-300"
                >
                  <div>
                    {/* Top Card Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-12 h-12 rounded-xl ${avatarBg} font-bold flex items-center justify-center text-sm shrink-0 border border-slate-200 shadow-2xs`}
                        >
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-slate-900 truncate text-base">{m.name}</h3>
                            <span
                              className={`text-xs ${
                                m.gender === 'Nam' ? 'text-blue-600' : 'text-rose-500'
                              }`}
                            >
                              <i
                                className={`fa-solid ${
                                  m.gender === 'Nam' ? 'fa-mars' : 'fa-venus'
                                }`}
                              ></i>
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                              Đời {m.gen}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                m.isAlive
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {m.isAlive ? 'Còn sống' : 'Đã khuất'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Edit / Delete quick buttons */}
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditMember(m);
                          }}
                          title="Sửa thông tin"
                          className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded"
                        >
                          <i className="fa-solid fa-pen text-xs"></i>
                        </button>
                        {m.gen > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Bạn có chắc chắn muốn xóa thành viên ${m.name}?`)) {
                                onDeleteMember(m.id);
                              }
                            }}
                            title="Xóa thành viên"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                          >
                            <i className="fa-solid fa-trash-can text-xs"></i>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Metadata lines */}
                    <div className="text-xs text-slate-600 space-y-1.5 my-3 pt-2 border-t border-slate-100">
                      <div>
                        <i className="fa-regular fa-clock w-4 text-slate-400"></i> Năm sinh:{' '}
                        <strong className="text-slate-800">{m.birth}</strong>{' '}
                        {m.death ? ` - Mất: ${m.death}` : ''}
                      </div>
                      <div className="truncate">
                        <i className="fa-solid fa-tag w-4 text-slate-400"></i> Vai trò:{' '}
                        <span className="text-slate-700 font-medium">{m.role}</span>
                      </div>
                      <div className="truncate">
                        <i className="fa-solid fa-sitemap w-4 text-slate-400"></i> Chi phái:{' '}
                        <span className="text-slate-700">{m.branch || 'Chưa cập nhật'}</span>
                      </div>
                      <div className="truncate">
                        <i className="fa-solid fa-ring w-4 text-slate-400"></i> Hôn phối:{' '}
                        <span>{m.spouse || 'Chưa cập nhật'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectMember(m.id)}
                      className="w-full py-2 rounded-lg bg-slate-50 hover:bg-amber-500 hover:text-slate-950 font-semibold text-xs text-slate-700 transition border border-slate-200 text-center"
                    >
                      Chi tiết tiểu sử <i className="fa-solid fa-arrow-right ml-1 text-[10px]"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <i className="fa-solid fa-user-slash text-4xl text-slate-300 mb-3"></i>
            <h4 className="font-bold text-slate-700">Không tìm thấy thành viên nào</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Không có nhân đinh nào khớp với bộ lọc tìm kiếm hiện tại. Thử chọn lại thế hệ hoặc xóa từ khóa.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                setSelectedGen('all');
                setSelectedGender('all');
                setSelectedBranch('all');
                setSelectedStatus('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
