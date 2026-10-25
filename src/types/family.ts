export interface Member {
  id: number;
  name: string;
  alias?: string;
  gen: number;
  gender: 'Nam' | 'Nữ';
  birth: string;
  death?: string;
  isAlive: boolean;
  spouse?: string;
  role: string;
  branch?: string; // Chi phái (ví dụ: "Chi Trưởng", "Chi 2", "Chi Khởi Tổ")
  parentId?: number;
  burial?: string;
  phone?: string;
  currentAddress?: string;
  bio: string;
  children: number[];
}

export interface FamilyEvent {
  id: number;
  title: string;
  lunarDate: string;
  solarDate: string;
  rolePerson: string;
  host: string;
  location: string;
  importance: string;
  description?: string;
}

export interface HistoricalSource {
  id: number;
  title: string;
  period: string;
  author: string;
  preservationLocation: string;
  type: 'Cổ thư Hán Nôm' | 'Bia đá' | 'Sắc phong' | 'Ảnh tư liệu' | 'Bản đồ';
  description: string;
  excerpt: string;
  significance: string;
}

export interface ClanCommitteeMember {
  role: string;
  name: string;
  phone: string;
  address: string;
  duty: string;
}
