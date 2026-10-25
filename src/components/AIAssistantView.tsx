import React, { useState, useRef, useEffect } from 'react';
import { Member } from '../types/family';

interface AIAssistantViewProps {
  members: Member[];
  onNavigate: (view: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  {
    title: 'Văn khấn Giỗ Tổ Rằm Tháng Giêng',
    icon: 'fa-solid fa-scroll',
    prompt:
      'Hãy soạn bài Văn khấn trang nghiêm cho Đại Lễ Giỗ Cụ Khởi Tổ Nguyễn Văn Căn vào ngày Rằm tháng Giêng tại Nhà thờ Tổ dòng họ (Chương Mỹ, Hà Nội), đúng nghi thức cổ truyền.',
  },
  {
    title: 'Giải nghĩa câu đối Từ Đường',
    icon: 'fa-solid fa-landmark',
    prompt:
      'Hãy giải thích chi tiết ý nghĩa bức hoành phi "ĐỨC LƯU QUANG" và đôi câu đối "Tổ công bồi đức thiên niên thịnh - Tử hiếu tôn hiền vạn đại vinh" tại chính điện Từ đường dòng họ.',
  },
  {
    title: 'Ý nghĩa bộ chữ đệm dòng họ',
    icon: 'fa-solid fa-feather',
    prompt:
      'Giải thích ý nghĩa và nguồn gốc của quy ước bộ chữ đệm qua các thế hệ dòng họ Nguyễn Văn: VĂN — ĐỨC — QUANG — MINH — PHÚC — THỊNH.',
  },
  {
    title: 'Văn khấn Lễ Thanh Minh tảo mộ',
    icon: 'fa-solid fa-seedling',
    prompt:
      'Soạn giúp tôi bài văn khấn ngắn gọn, chuẩn phong tục khi con cháu về tảo mộ dịp tiết Thanh Minh tại Khu lăng mộ Tổ thôn Đoài, Xã Tiên Phương.',
  },
  {
    title: 'Quy tắc xưng hô Chi Trưởng & Chi Thứ',
    icon: 'fa-solid fa-people-arrows',
    prompt:
      'Trong phong tục truyền thống Việt Nam và gia pháp dòng họ, con cháu đời thứ 4 thuộc Chi Thứ khi gặp con cháu đời thứ 4 thuộc Chi Trưởng (dù ít tuổi hơn) thì xưng hô ra sao và vì sao?',
  },
];

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({ members, onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Kính chào quý vị con cháu dòng họ Nguyễn Văn! Tôi là "Tổ Phụ AI" - Trợ lý tri thức gia tộc được phát triển trên nền tảng Google AI Studio.\n\nTôi sẵn sàng hỗ trợ quý bà con: \n• Tra cứu thông tin thế hệ, thứ bậc xưng hô theo gia phả.\n• Soạn thảo các bài văn khấn cúng giỗ, tảo mộ, khấn tiết rằm mùng một chuẩn phong tục cổ truyền.\n• Giải nghĩa hoành phi, câu đối chữ Hán Nôm và ý nghĩa bài vị gia tiên.\n\nQuý vị vui lòng chọn gợi ý bên dưới hoặc đặt câu hỏi tự nhiên!',
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build context from family members
      const summaryContext = members.slice(0, 10).map((m) => ({
        name: m.name,
        gen: m.gen,
        role: m.role,
        branch: m.branch,
        birth: m.birth,
        death: m.death,
        isAlive: m.isAlive,
      }));

      const res = await fetch('/api/genealogy-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          familyContext: {
            clanName: 'Dòng Họ Nguyễn Văn',
            origin: 'Thôn Đoài, Xã Tiên Phương, Huyện Chương Mỹ, TP. Hà Nội',
            founder: 'Cụ Nguyễn Văn Căn (1895 - 1968)',
            members: summaryContext,
          },
        }),
      });

      const data = await res.json();

      let aiReply = '';
      if (res.ok && data.reply) {
        aiReply = data.reply;
      } else {
        // Fallback intelligent answer if API key is not ready
        aiReply = generateLocalFallbackReply(text, members);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      console.warn('Network call error, using local fallback:', err);
      const fallback = generateLocalFallbackReply(text, members);
      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: fallback,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Đã sao chép nội dung văn khấn / câu trả lời vào bộ nhớ tạm!');
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn space-y-6">
      {/* Top Banner with AI Studio Link */}
      <div className="royal-gradient rounded-2xl p-6 sm:p-8 text-white border-2 border-gold shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-300/30">
            <i className="fa-solid fa-wand-magic-sparkles text-gold"></i> Trí Tuệ Nhân Tạo Gia Tộc
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Tổ Phụ AI - Cố Vấn Phả Hệ Dòng Họ
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Hỗ trợ con cháu muôn phương tra cứu thế thứ, giải thích câu đối Hán Nôm và soạn thảo văn khấn tế lễ trang nghiêm theo đúng đạo hiếu người Việt.
          </p>
        </div>

        {/* AI Studio External Link Button */}
        <div className="shrink-0 text-center">
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-amber-300 text-xs font-bold backdrop-blur-md shadow-md transition"
          >
            <i className="fa-brands fa-google text-blue-400"></i>
            <span>Google AI Studio</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
          <div className="text-[10px] text-slate-400 mt-1">Vận hành bởi Gemini 3.8 Flash</div>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Gợi ý câu hỏi thường dùng:
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp.prompt)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 hover:border-gold border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs transition flex items-center gap-2 text-left"
            >
              <i className={`${qp.icon} text-amber-600`}></i>
              <span>{qp.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[560px]">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/40">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 shadow-2xs ${
                    isUser
                      ? 'bg-primary text-white font-bold'
                      : 'royal-gradient text-gold border border-gold font-bold'
                  }`}
                >
                  <i className={`fa-solid ${isUser ? 'fa-user' : 'fa-scroll'}`}></i>
                </div>

                {/* Bubble */}
                <div className={`space-y-1 text-sm ${isUser ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-700">
                      {isUser ? 'Bạn' : 'Tổ Phụ AI'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-left leading-relaxed shadow-2xs whitespace-pre-line text-sm ${
                      isUser
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none font-sans'
                    }`}
                  >
                    {msg.text}

                    {/* Copy button for AI messages */}
                    {!isUser && (
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="text-[10px] text-slate-400">Gia Phả Số AI</span>
                        <button
                          onClick={() => copyToClipboard(msg.text)}
                          className="hover:text-amber-600 transition flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <i className="fa-regular fa-copy"></i> Sao chép nội dung
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-xl">
              <div className="w-9 h-9 rounded-xl royal-gradient text-gold border border-gold flex items-center justify-center text-sm shrink-0 animate-pulse">
                <i className="fa-solid fa-scroll"></i>
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 text-xs text-slate-500 flex items-center gap-2 shadow-2xs">
                <i className="fa-solid fa-spinner fa-spin text-primary"></i>
                <span>Tổ Phụ AI đang suy nghĩ và tra cứu cổ thư gia tộc...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập câu hỏi, yêu cầu soạn văn khấn, tra cứu thứ bậc họ tộc..."
              className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-5 py-3 rounded-xl royal-gradient text-amber-300 font-bold text-sm shadow-md hover:opacity-95 transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              <span>Gửi</span>
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Fallback intelligent responder with cultural depth
function generateLocalFallbackReply(prompt: string, members: Member[]): string {
  const p = prompt.toLowerCase();

  if (p.includes('văn khấn') && (p.includes('giỗ') || p.includes('khởi tổ') || p.includes('rằm'))) {
    return `📜 VĂN KHẤN ĐẠI LỄ GIỖ CỤ KHỞI TỔ NGUYỄN VĂN CĂN
(Cử hành ngày Rằm tháng Giêng tại Nhà thờ Tổ dòng họ)

Nam mô A Di Đà Phật! (3 lần, 3 lạy)

- Con kính lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
- Con kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.
- Con kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ địa, ngài Bản gia Táo quân cùng chư vị Tôn thần cai quản nơi đây.

Hôm nay là ngày 15 tháng Giêng năm... (Âm lịch)
Tín chủ con là: [Họ tên Trưởng tộc / Con cháu chủ lễ]
Cùng toàn thể hậu duệ nội ngoại con cháu Dòng họ Nguyễn Văn kính cẩn khấu đầu.

Kính dâng lễ bạc lòng thành, nhang hoa quả phẩm, kim ngân trầu rượu, thắp nén tâm hương bái thỉnh:
- Cụ Thủy Tổ: Nguyễn Văn Căn (Hiệu Căn Phủ, sinh năm 1895 - mất năm 1968)
- Cụ Bà Chính Thất: Trần Thị Mùi (sinh năm 1898 - mất năm 1972)
Cùng chư vị Tiên linh, thúc bá đệ huynh, cô di tỷ muội nội ngoại tông thân dòng họ Nguyễn Văn.

Kính nghĩ xưa kia:
Tiên tổ dày công vun xới, khai hoang lập nghiệp, mở lối đắp đường, để lại gia phong thanh bạch, đức độ muôn đời. Nay con cháu bốn phương sum vầy tạ ơn đức cù lao, kính thỉnh chư vị giáng lâm trước án chứng giám lòng thành, thụ hưởng lễ vật.

Cúi xin Tiên Tổ phù hộ độ trì cho toàn thể gia tộc:
- Già trẻ bình an, con cháu hiếu thảo, gia đạo hòa thuận, hưng long thịnh vượng.
- Thế hệ trẻ chăm ngoan học giỏi, công danh thành toại, rạng danh tông đường.

Chúng con lễ bạc tâm thành, trước án kính bái, cúi xin chư vị chứng giám phù trì!
Nam mô A Di Đà Phật! (3 lần, 3 lạy)`;
  }

  if (p.includes('đức lưu quang') || p.includes('câu đối')) {
    return `🏮 Ý NGHĨA HOÀNH PHI & CÂU ĐỐI TẠI TỪ ĐƯỜNG DÒNG HỌ

1. Bức Hoành Phi: "ĐỨC LƯU QUANG" (德流光)
• Chữ "Đức" (德): Đạo đức, phúc đức và công hạnh của tổ tiên.
• Chữ "Lưu" (流): Chảy truyền mãi mãi như dòng sông không bao giờ cạn.
• Chữ "Quang" (光): Ánh sáng tỏa rạng, soi rọi cho hậu thế.
=> Ý nghĩa toàn câu: Đức hạnh cao dày của tổ tiên như dòng suối nguồn trong mát, tỏa sáng rực rỡ đến muôn đời con cháu mai sau.

2. Đôi Câu Đối Chính Điện:
"Tổ công bồi đức thiên niên thịnh" (祖功培德千年盛)
"Tử hiếu tôn hiền vạn đại vinh" (子孝孫賢萬代榮)

• Ý nghĩa: 
- Vế trên: Công lao của Tổ tông bồi đắp phúc đức thì cơ nghiệp dòng họ ngàn năm hưng thịnh vững bền.
- Vế dưới: Con thảo cháu hiền noi gương gìn giữ gia phong thì vạn đời hiển vinh danh giá.`;
  }

  if (p.includes('chữ đệm') || p.includes('văn đức quang')) {
    return `📖 Ý NGHĨA BỘ CHỮ ĐỆM THEO THẾ HỆ GIA TỘC

Bộ 6 chữ đệm dòng họ Nguyễn Văn được Cụ Khởi Tổ và các bậc túc nho đời thứ 2 quy ước:
VĂN — ĐỨC — QUANG — MINH — PHÚC — THỊNH

1. VĂN (Đời 1 - Cụ Nguyễn Văn Căn): Biểu trưng cho Nho học, văn hóa, trí tuệ và đạo lý làm người.
2. ĐỨC (Đời 2 - Cụ Nguyễn Văn Đức, Nguyễn Văn Thịnh): Lấy đức hạnh làm trọng, tích thiện để lại phúc ấm cho con.
3. QUANG (Đời 3 - Ông Nguyễn Quang Hải, Nguyễn Quang Minh): Tỏa sáng rạng danh, làm rạng rỡ dòng họ trên con đường sự nghiệp.
4. MINH (Đời 4 - Anh Nguyễn Minh Tuấn, Nguyễn Minh Khang): Sáng suốt, minh bạch, năng động hội nhập thời đại mới.
5. PHÚC (Đời 5 - Bé Nguyễn Phúc An, Nguyễn Phúc Lâm): Hưởng trọn phúc lộc và giữ trọn sự hiền lương phúc hậu.
6. THỊNH (Đời kế tiếp): Gia tộc thái bình hưng thịnh đời đời.

=> Quy ước này giúp con cháu muôn đời sau chỉ cần nghe tên đệm là biết ngay vai vế thế hệ của nhau!`;
  }

  if (p.includes('thanh minh') || p.includes('tảo mộ')) {
    return `🕊️ VĂN KHẤN LỄ THANH MINH TẢO MỘ (Tại Khu Lăng Mộ Tổ)

Nam mô A Di Đà Phật! (3 lần)

- Con kính lạy Quan Đương xứ Thổ địa Chính thần cai quản nghĩa trang xứ Đồng Mạ.
- Con kính lạy hương linh Cụ Khởi Tổ Nguyễn Văn Căn, Cụ Bà Trần Thị Mùi cùng chư vị Tiên linh dòng họ Nguyễn Văn yên nghỉ nơi đây.

Hôm nay là tiết Thanh Minh ngày... tháng 3 năm...
Con cháu chúng con kính cẩn sửa sang phần mộ, đắp thêm lớp đất mới, dâng nén tâm hương tỏ lòng hiếu kính tri ân. 

Cúi xin chư vị hương linh hiển linh chứng giám, phù hộ độ trì cho con cháu nội ngoại bốn phương thân tâm an lạc, công tác hanh thông, gìn giữ mối đoàn kết gia tộc muôn đời bền chặt.

Nam mô A Di Đà Phật! (3 lần, 3 lạy)`;
  }

  return `Kính thưa quý vị, dòng họ Nguyễn Văn có truyền thống hiếu học, khởi tổ từ Cụ Nguyễn Văn Căn (1895 - 1968) tại Thôn Đoài, Xã Tiên Phương, Chương Mỹ, Hà Nội. 

Hiện tại dòng họ đã phát triển qua 5 thế hệ kế thừa với ${members.length} nhân đinh được lập hồ sơ gia phả số. Nếu quý vị cần tìm hiểu chi tiết về ngày giỗ, tra cứu thành viên, hoặc soạn bài văn khấn riêng cho từng bậc tiên tổ, xin vui lòng đặt câu hỏi cụ thể để Tổ Phụ AI hỗ trợ!`;
}
