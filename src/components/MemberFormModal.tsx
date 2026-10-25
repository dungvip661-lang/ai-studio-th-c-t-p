import React, { useState, useEffect } from 'react';
import { Member } from '../types/family';

interface MemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memberData: Omit<Member, 'id'>, editId?: number) => void;
  editMember?: Member | null;
  allMembers: Member[];
}

export const MemberFormModal: React.FC<MemberFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editMember,
  allMembers,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    gen: 4,
    gender: 'Nam' as 'Nam' | 'Nữ',
    birth: '',
    death: '',
    isAlive: true,
    spouse: '',
    role: '',
    branch: 'Chi Trưởng (Chi 1)',
    parentId: undefined as number | undefined,
    burial: '',
    currentAddress: '',
    phone: '',
    bio: '',
  });

  useEffect(() => {
    if (editMember) {
      setFormData({
        name: editMember.name || '',
        alias: editMember.alias || '',
        gen: editMember.gen || 4,
        gender: editMember.gender || 'Nam',
        birth: editMember.birth || '',
        death: editMember.death || '',
        isAlive: editMember.isAlive,
        spouse: editMember.spouse || '',
        role: editMember.role || '',
        branch: editMember.branch || 'Chi Trưởng (Chi 1)',
        parentId: editMember.parentId,
        burial: editMember.burial || '',
        currentAddress: editMember.currentAddress || '',
        phone: editMember.phone || '',
        bio: editMember.bio || '',
      });
    } else {
      setFormData({
        name: '',
        alias: '',
        gen: 4,
        gender: 'Nam',
        birth: '',
        death: '',
        isAlive: true,
        spouse: '',
        role: 'Thành viên dòng họ',
        branch: 'Chi Trưởng (Chi 1)',
        parentId: allMembers[0]?.id,
        burial: '',
        currentAddress: '',
        phone: '',
        bio: '',
      });
    }
  }, [editMember, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập họ và tên thành viên');
      return;
    }

    onSave(
      {
        name: formData.name.trim(),
        alias: formData.alias.trim() || undefined,
        gen: Number(formData.gen),
        gender: formData.gender,
        birth: formData.birth.trim() || 'Chưa rõ',
        death: formData.isAlive ? undefined : formData.death.trim(),
        isAlive: formData.isAlive,
        spouse: formData.spouse.trim() || undefined,
        role: formData.role.trim() || 'Thành viên dòng họ',
        branch: formData.branch,
        parentId: formData.parentId ? Number(formData.parentId) : undefined,
        burial: formData.burial.trim() || undefined,
        currentAddress: formData.currentAddress.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        bio: formData.bio.trim() || '',
        children: editMember ? editMember.children : [],
      },
      editMember ? editMember.id : undefined
    );

    onClose();
  };

  // Potential parents (usually 1 generation higher)
  const potentialParents = allMembers.filter((m) => m.gen === formData.gen - 1);

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
          <div className="flex items-center gap-2">
            <i className={`fa-solid ${editMember ? 'fa-user-pen' : 'fa-user-plus'} text-gold text-lg`}></i>
            <h3 className="text-lg font-bold">
              {editMember ? `Chỉnh sửa thông tin: ${editMember.name}` : 'Thêm Thành Viên Mới Vào Gia Phả'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white text-xl p-1 transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Họ và Tên *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ví dụ: Nguyễn Minh Tuấn"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tên Tự / Tên Húy (Nếu có)
              </label>
              <input
                type="text"
                value={formData.alias}
                onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                placeholder="Ví dụ: Cụ Cả, Bé Bon..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Thế hệ (Đời)</label>
              <select
                value={formData.gen}
                onChange={(e) => setFormData({ ...formData, gen: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              >
                <option value={1}>Đời 1 (Khởi tổ)</option>
                <option value={2}>Đời 2</option>
                <option value={3}>Đời 3</option>
                <option value={4}>Đời 4</option>
                <option value={5}>Đời 5</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giới tính</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Nam' | 'Nữ' })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tình trạng</label>
              <select
                value={formData.isAlive ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, isAlive: e.target.value === 'true' })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              >
                <option value="true">Đang sinh sống</option>
                <option value="false">Đã khuất</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Năm sinh</label>
              <input
                type="text"
                value={formData.birth}
                onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
                placeholder="Ví dụ: 1988 hoặc 15/03/1988"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              />
            </div>

            {!formData.isAlive && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Năm mất</label>
                <input
                  type="text"
                  value={formData.death}
                  onChange={(e) => setFormData({ ...formData, death: e.target.value })}
                  placeholder="Ví dụ: 2010 hoặc 18/08/2010"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Chi phái</label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              >
                <option value="Gốc Tổ">Gốc Tổ</option>
                <option value="Chi Trưởng (Chi 1)">Chi Trưởng (Chi 1)</option>
                <option value="Chi Thứ (Chi 2)">Chi Thứ (Chi 2)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Phụ Mẫu (Thuộc Đời {formData.gen - 1})
              </label>
              <select
                value={formData.parentId || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    parentId: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              >
                <option value="">-- Chưa xác định / Khởi tổ --</option>
                {potentialParents.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Hôn Phối (Vợ / Chồng)
              </label>
              <input
                type="text"
                value={formData.spouse}
                onChange={(e) => setFormData({ ...formData, spouse: e.target.value })}
                placeholder="Ví dụ: Lê Thị Dung (1991)"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Vai trò dòng tộc
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Ví dụ: Trưởng tộc, Đích tôn, Thành viên..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {formData.isAlive ? 'Nơi ở hiện tại' : 'Khu lăng mộ an táng'}
              </label>
              <input
                type="text"
                value={formData.isAlive ? formData.currentAddress : formData.burial}
                onChange={(e) =>
                  formData.isAlive
                    ? setFormData({ ...formData, currentAddress: e.target.value })
                    : setFormData({ ...formData, burial: e.target.value })
                }
                placeholder={formData.isAlive ? 'Hà Nội, TP.HCM...' : 'Nghĩa trang quê nhà...'}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Số điện thoại liên lạc
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="09xx xxx xxx"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Tiểu sử & Sự nghiệp đóng góp
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Ghi vắn tắt học vị, nghề nghiệp, công trạng hoặc đóng góp cho dòng họ..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
            ></textarea>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl royal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-floppy-disk text-amber-300"></i>
              <span>{editMember ? 'Cập nhật thay đổi' : 'Lưu thành viên mới'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
