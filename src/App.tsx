import React, { useState, useEffect } from 'react';
import { INITIAL_FAMILY_DATA } from './data/initialData';
import { Member } from './types/family';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { TreeView } from './components/TreeView';
import { MembersView } from './components/MembersView';
import { KinshipView } from './components/KinshipView';
import { EventsView } from './components/EventsView';
import { SourcesView } from './components/SourcesView';
import { StatsView } from './components/StatsView';
import { AIAssistantView } from './components/AIAssistantView';
import { FeedbackView } from './components/FeedbackView';
import { MemberModal } from './components/MemberModal';
import { MemberFormModal } from './components/MemberFormModal';

const STORAGE_KEY = 'giaphaso_members_data_v2';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [members, setMembers] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Không thể đọc dữ liệu từ localStorage', e);
    }
    return INITIAL_FAMILY_DATA;
  });

  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    } catch (e) {
      console.error('Không thể lưu vào localStorage', e);
    }
  }, [members]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMember = (id: number) => {
    setSelectedMemberId(id);
  };

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (member: Member) => {
    setEditingMember(member);
    setIsAddModalOpen(true);
  };

  const handleSaveMember = (memberData: Omit<Member, 'id'>, editId?: number) => {
    if (editId) {
      // Edit existing member
      setMembers((prev) =>
        prev.map((m) => (m.id === editId ? { ...memberData, id: editId } : m))
      );
    } else {
      // Add new member
      const newId = Math.max(0, ...members.map((m) => m.id)) + 1;
      const newMember: Member = {
        ...memberData,
        id: newId,
        children: [],
      };

      // Also append newId to parent's children array
      setMembers((prev) => {
        const updated = prev.map((m) => {
          if (memberData.parentId && m.id === memberData.parentId) {
            return {
              ...m,
              children: Array.from(new Set([...(m.children || []), newId])),
            };
          }
          return m;
        });
        return [...updated, newMember];
      });
    }
  };

  const handleDeleteMember = (memberId: number) => {
    setMembers((prev) => {
      // Remove from children of any parent
      const cleaned = prev.map((m) => ({
        ...m,
        children: (m.children || []).filter((cid) => cid !== memberId),
      }));
      // Filter out the member
      return cleaned.filter((m) => m.id !== memberId);
    });
    if (selectedMemberId === memberId) {
      setSelectedMemberId(null);
    }
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(members, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'gia_pha_so_dong_ho_nguyen_van.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].name) {
          setMembers(parsed);
          alert(`Đã nhập thành công ${parsed.length} thành viên vào hệ thống gia phả!`);
        } else {
          alert('Tệp JSON không đúng định dạng danh sách thành viên gia phả.');
        }
      } catch (err) {
        alert('Có lỗi xảy ra khi đọc tệp JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to initial data
  const handleResetData = () => {
    if (confirm('Bạn có muốn đặt lại toàn bộ dữ liệu mẫu gia phả ban đầu?')) {
      setMembers(INITIAL_FAMILY_DATA);
      localStorage.removeItem(STORAGE_KEY);
      alert('Đã khôi phục dữ liệu ban đầu!');
    }
  };

  const selectedMember = members.find((m) => m.id === selectedMemberId) || null;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
      {/* 1. Header Navigation Bar */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAddModal={handleOpenAddModal}
      />

      {/* 2. Main Content View Area */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView
            members={members}
            onNavigate={handleNavigate}
            onSelectMember={handleSelectMember}
            onSearchQuery={(q) => setSearchFilter(q)}
          />
        )}

        {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}

        {currentView === 'tree' && (
          <TreeView
            members={members}
            onSelectMember={handleSelectMember}
            onOpenAddModal={handleOpenAddModal}
          />
        )}

        {currentView === 'members' && (
          <MembersView
            members={members}
            onSelectMember={handleSelectMember}
            onEditMember={handleOpenEditModal}
            onDeleteMember={handleDeleteMember}
            onOpenAddModal={handleOpenAddModal}
            onExportJson={handleExportJson}
            onImportJson={handleImportJson}
            onResetData={handleResetData}
            searchFilter={searchFilter}
            onSearchChange={setSearchFilter}
          />
        )}

        {currentView === 'kinship' && (
          <KinshipView members={members} onSelectMember={handleSelectMember} />
        )}

        {currentView === 'events' && <EventsView onNavigate={handleNavigate} />}

        {currentView === 'sources' && <SourcesView onNavigate={handleNavigate} />}

        {currentView === 'stats' && (
          <StatsView members={members} onNavigate={handleNavigate} />
        )}

        {currentView === 'ai' && (
          <AIAssistantView members={members} onNavigate={handleNavigate} />
        )}

        {currentView === 'feedback' && <FeedbackView onNavigate={handleNavigate} />}
      </main>

      {/* 3. Member Detail Modal */}
      <MemberModal
        member={selectedMember}
        allMembers={members}
        onClose={() => setSelectedMemberId(null)}
        onEdit={handleOpenEditModal}
        onSelectMember={handleSelectMember}
      />

      {/* 4. Add/Edit Member Form Modal */}
      <MemberFormModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
        editMember={editingMember}
        allMembers={members}
      />

      {/* 5. Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
