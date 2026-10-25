import React, { useState } from 'react';
import { Member } from '../types/family';

interface KinshipViewProps {
  members: Member[];
  onSelectMember: (memberId: number) => void;
}

export const KinshipView: React.FC<KinshipViewProps> = ({ members, onSelectMember }) => {
  const [personAId, setPersonAId] = useState<number>(members[7]?.id || members[0]?.id || 1); // e.g. Nguyễn Minh Tuấn (Đời 4)
  const [personBId, setPersonBId] = useState<number>(members[2]?.id || members[1]?.id || 2); // e.g. Nguyễn Văn Thịnh (Đời 2)

  const personA = members.find((m) => m.id === personAId);
  const personB = members.find((m) => m.id === personBId);

  // Compute relationship
  const calculateKinship = () => {
    if (!personA || !personB) return null;
    if (personA.id === personB.id) {
      return {
        addressAtoB: 'Chính bản thân bạn',
        addressBtoA: 'Chính bản thân bạn',
        explanation: 'Cùng một người trong gia phả.',
        category: 'Bản thân',
      };
    }

    const genDiff = personA.gen - personB.gen; // > 0: A is younger generation, < 0: A is older generation

    // Same generation (Anh em)
    if (genDiff === 0) {
      // Check if sibling (same parent)
      const sameParent = personA.parentId && personB.parentId && personA.parentId === personB.parentId;

      // Chi Trưởng vs Chi Thứ check
      const aIsSeniorBranch = personA.branch?.includes('Chi Trưởng') || personA.branch?.includes('Gốc');
      const bIsSeniorBranch = personB.branch?.includes('Chi Trưởng') || personB.branch?.includes('Gốc');

      let call = '';
      let explanation = '';

      if (sameParent) {
        const aOlder = Number(personA.birth) < Number(personB.birth);
        call = aOlder
          ? `Anh/Chị ruột gọi ${personB.gender === 'Nam' ? 'Em trai' : 'Em gái'}`
          : `Em ruột gọi ${personB.gender === 'Nam' ? 'Anh trai' : 'Chị gái'}`;
        explanation = `Hai người là anh em ruột (cùng cha mẹ). ${personA.name} ${aOlder ? 'lớn' : 'nhỏ'} tuổi hơn ${personB.name}.`;
      } else {
        // Con chú con bác
        if (aIsSeniorBranch && !bIsSeniorBranch) {
          call = `${personA.name} là vai ANH/CHỊ (Chi Trưởng) - Gọi ${personB.name} là EM`;
          explanation = `Theo gia pháp: "Bé bằng củ khoai, cứ vai bác mà gọi". Do ${personA.name} thuộc Chi Trưởng nên dù nhiều hay ít tuổi hơn vẫn giữ vai vế Anh/Chị trong họ.`;
        } else if (!aIsSeniorBranch && bIsSeniorBranch) {
          call = `${personA.name} là vai EM (Chi Thứ) - Gọi ${personB.name} là ${personB.gender === 'Nam' ? 'ANH' : 'CHỊ'} (Anh/Chị họ)`;
          explanation = `${personB.name} thuộc dòng Chi Trưởng, do đó theo phong tục ${personA.name} phải gọi là Anh/Chị họ bề trên.`;
        } else {
          const aOlder = Number(personA.birth) < Number(personB.birth);
          call = aOlder ? 'Anh/Chị em họ ngang hàng' : 'Em họ gọi Anh/Chị họ';
          explanation = 'Hai người cùng thế hệ và cùng phân nhánh, xưng hô tôn ti theo thứ tự năm sinh.';
        }
      }

      return {
        addressAtoB: personA.name + ' xưng hô với ' + personB.name,
        addressBtoA: call,
        explanation,
        category: 'Cùng thế hệ (Đời ' + personA.gen + ')',
      };
    }

    // A is 1 generation lower (A đời con, B đời cha/chú/bác)
    if (genDiff === 1) {
      const isParent = personA.parentId === personB.id;
      if (isParent) {
        return {
          addressAtoB: `${personA.name} gọi ${personB.name} là ${personB.gender === 'Nam' ? 'CHA / BỐ' : 'MẸ'}`,
          addressBtoA: `Xưng CON`,
          explanation: `${personB.name} là cha mẹ trực hệ sinh thành ra ${personA.name}.`,
          category: 'Phụ mẫu trực hệ (Cha/Mẹ - Con)',
        };
      }

      const bIsSenior = personB.role.includes('Trưởng') || personB.branch?.includes('Chi Trưởng');
      const title = personB.gender === 'Nam'
        ? (bIsSenior ? 'BÁC (Bác họ)' : 'CHÚ (Chú họ)')
        : 'CÔ / BÁC GÁI';

      return {
        addressAtoB: `${personA.name} gọi ${personB.name} là: ${title}`,
        addressBtoA: `${personB.name} gọi ${personA.name} là: CHÁU`,
        explanation: `${personB.name} thuộc thế hệ Đời ${personB.gen} (bậc cha chú của ${personA.name} Đời ${personA.gen}). ${bIsSenior ? 'Thuộc chi trưởng nên gọi là Bác.' : 'Thuộc chi thứ/em nên gọi là Chú/Cô.'}`,
        category: 'Bậc Cha Chú - Bác Cháu',
      };
    }

    // A is 2 generations lower (A đời cháu, B đời ông/bà)
    if (genDiff === 2) {
      const isGrandparent = personA.gen === 3 && personB.gen === 1;
      const title = personB.gender === 'Nam' ? 'ÔNG (Ông Bác / Ông Chú họ)' : 'BÀ (Bà Cô / Bà Bác họ)';

      return {
        addressAtoB: `${personA.name} gọi ${personB.name} là: ${title}`,
        addressBtoA: `${personB.name} gọi ${personA.name} là: CHÁU NỘI / CHÁU HỌ`,
        explanation: `${personB.name} cách ${personA.name} 2 thế hệ (Bậc Ông Bà nội tộc). Xưng hô cần giữ phép tắc cung kính lễ phép.`,
        category: 'Bậc Ông Bà - Cháu Nội Tộc',
      };
    }

    // A is 3 generations lower (A đời chắt, B đời Cụ)
    if (genDiff === 3) {
      const title = personB.gender === 'Nam' ? 'CỤ ÔNG (Cụ Tổ / Cụ Bác)' : 'CỤ BÀ';
      return {
        addressAtoB: `${personA.name} gọi ${personB.name} là: ${title}`,
        addressBtoA: `${personB.name} gọi ${personA.name} là: CHẮT`,
        explanation: `Cách biệt 3 thế hệ. ${personA.name} thuộc hàng Chắt, bái lạy ${personB.name} là hàng Cụ trong phả hệ.`,
        category: 'Bậc Cụ - Chắt',
      };
    }

    // A is 4 generations lower (A đời chút, B đời Khởi Tổ)
    if (genDiff >= 4) {
      return {
        addressAtoB: `${personA.name} gọi ${personB.name} là: CỤ THỦY TỔ / TIÊN LINH KHỞI TỔ`,
        addressBtoA: `${personB.name} xem ${personA.name} là: HẬU DUỆ ĐỜI THỨ ${personA.gen}`,
        explanation: `${personB.name} là Khởi tổ khai sáng dòng họ. Hậu thế đời thứ ${personA.gen} xưng bái là Chắt/Chút hướng về nguồn cội.`,
        category: 'Khởi Tổ Tiên Linh - Hậu Thế',
      };
    }

    // A is older generation than B (genDiff < 0)
    const absDiff = Math.abs(genDiff);
    return {
      addressAtoB: `${personA.name} (Bậc bề trên Đời ${personA.gen}) gọi ${personB.name} (Bậc con cháu Đời ${personB.gen}) là: ${absDiff === 1 ? 'CON / CHÁU' : absDiff === 2 ? 'CHÁU' : 'CHẮT'}`,
      addressBtoA: `${personB.name} gọi ${personA.name} là: ${absDiff === 1 ? 'BÁC / CHÚ / CÔ' : absDiff === 2 ? 'ÔNG / BÀ' : 'CỤ'}`,
      explanation: `${personA.name} sinh trước thuộc thế hệ cao hơn ${personB.name} ${absDiff} đời.`,
      category: 'Bề Trên - Hậu Duệ',
    };
  };

  const kinshipResult = calculateKinship();

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn space-y-8">
      {/* Title */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <i className="fa-solid fa-people-arrows text-primary"></i> Thước Đo Xưng Hô Thứ Bậc Họ Tộc
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Công cụ tự động phân tích thế hệ, chi phái và hướng dẫn cách xưng hô chuẩn gia phong truyền thống
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold self-start sm:self-auto">
            Gia Pháp Việt Nam
          </span>
        </div>

        {/* Selection Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {/* Person A */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border-2 border-blue-200 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary">
              1. Người Xưng Hô (Bản thân bạn / Người hỏi)
            </label>
            <select
              value={personAId}
              onChange={(e) => setPersonAId(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-white border border-blue-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (Đời {m.gen} - {m.gender} - {m.role})
                </option>
              ))}
            </select>

            {personA && (
              <div className="p-3 bg-white rounded-xl text-xs space-y-1 border border-blue-100 text-slate-600">
                <div>Thế hệ: <strong className="text-primary font-bold">Đời {personA.gen}</strong></div>
                <div>Chi phái: <span>{personA.branch || 'Chưa cập nhật'}</span></div>
                <div>Vai trò: <span>{personA.role}</span></div>
              </div>
            )}
          </div>

          {/* Person B */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border-2 border-amber-200 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-800">
              2. Người Được Xưng Hô (Người cần gọi)
            </label>
            <select
              value={personBId}
              onChange={(e) => setPersonBId(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-white border border-amber-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (Đời {m.gen} - {m.gender} - {m.role})
                </option>
              ))}
            </select>

            {personB && (
              <div className="p-3 bg-white rounded-xl text-xs space-y-1 border border-amber-100 text-slate-600">
                <div>Thế hệ: <strong className="text-goldDark font-bold">Đời {personB.gen}</strong></div>
                <div>Chi phái: <span>{personB.branch || 'Chưa cập nhật'}</span></div>
                <div>Vai trò: <span>{personB.role}</span></div>
              </div>
            )}
          </div>
        </div>

        {/* Calculation Result */}
        {kinshipResult && (
          <div className="p-6 rounded-2xl royal-gradient text-white border-2 border-gold shadow-lg space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 rounded bg-amber-400 text-slate-950 text-xs font-extrabold uppercase">
                {kinshipResult.category}
              </span>
              <span className="text-xs text-amber-300 font-medium">
                Khoảng cách: {Math.abs(personA!.gen - personB!.gen)} thế hệ
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-bold text-amber-200 pt-2 border-t border-white/10">
              👉 {kinshipResult.addressBtoA}
            </div>

            <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl text-sm text-slate-200 border border-white/20 leading-relaxed">
              <i className="fa-solid fa-circle-info mr-2 text-gold"></i>
              <strong>Giải thích phong tục:</strong> {kinshipResult.explanation}
            </div>
          </div>
        )}

        {/* Quick Example Scenarios */}
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Các trường hợp xưng hô mẫu thường gặp:
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setPersonAId(8); // Nguyễn Minh Tuấn (Đời 4)
                setPersonBId(1); // Nguyễn Văn Căn (Đời 1)
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition"
            >
              Đời 4 gọi Cụ Thủy Tổ (Đời 1)
            </button>
            <button
              onClick={() => {
                setPersonAId(8); // Nguyễn Minh Tuấn (Đời 4 Chi 1)
                setPersonBId(10); // Nguyễn Minh Khang (Đời 4 Chi 2)
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition"
            >
              Đích Tôn Chi 1 & Đích Tôn Chi 2
            </button>
            <button
              onClick={() => {
                setPersonAId(12); // Bé Bon (Đời 5)
                setPersonBId(4); // Ông Trưởng tộc Hải (Đời 3)
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition"
            >
              Chắt Đời 5 gọi Ông Trưởng Tộc (Đời 3)
            </button>
            <button
              onClick={() => {
                setPersonAId(6); // Quang Minh Chi 2 (Đời 3)
                setPersonBId(4); // Quang Hải Chi 1 (Đời 3)
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition"
            >
              Anh em Chi 1 & Chi 2 cùng đời 3
            </button>
          </div>
        </div>
      </div>

      {/* Cultural Etiquette Reference */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="fa-solid fa-book-bookmark text-goldDark"></i> Tục Lệ Xưng Hô & Gia Lễ Cổ Truyền
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-800 text-sm">1. Nguyên tắc Chi Trưởng - Chi Thứ</strong>
            <p>
              &ldquo;Bé bằng củ khoai, cứ vai bác mà gọi&rdquo;. Người thuộc chi trưởng dù sinh sau, ít tuổi hơn con cháu chi thứ nhưng thứ bậc trong họ vẫn là hàng trên. Khi giao tiếp họ tộc cần tôn trọng tôn ti trật tự này.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-800 text-sm">2. Tránh phạm Húy tên các cụ</strong>
            <p>
              Con cháu đời sau khi đặt tên cho trẻ sơ sinh tuyệt đối không được trùng tên húy của các bậc Tiên Tổ khởi tổ, trưởng chi đã qua đời. Gia phả số lưu trữ danh sách tên húy để tránh phạm kỵ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
