import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// POST /api/genealogy-ai
app.post('/api/genealogy-ai', async (req, res) => {
  try {
    const { prompt, familyContext, taskType } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Nội dung câu hỏi không được để trống' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trên hệ thống.',
        fallback: true,
      });
    }

    const systemInstruction = `Bạn là "Tổ Phụ AI" - Trợ lý tri thức gia tộc & cố vấn phả hệ số của Dòng họ Nguyễn Văn (Khởi tổ: Cụ Nguyễn Văn Căn).
Nhiệm vụ của bạn là:
1. Giải đáp thắc mắc, phân tích thế hệ, xác định thứ bậc xưng hô trong gia đình, dòng họ dựa trên dữ liệu phả hệ được cung cấp.
2. Soạn thảo các bài Văn khấn trang trọng, đúng nghi lễ cổ truyền người Việt (Văn khấn ngày Giỗ, Giỗ Tổ 15 tháng Giêng, Lễ Tảo mộ Thanh Minh, Khấn tạ Thổ Thần, Cầu an).
3. Diễn giải câu đối hoành phi, chữ Hán Nôm, ý nghĩa tên đệm dòng họ (VĂN — ĐỨC — QUANG — MINH — PHÚC — THỊNH).
4. Giữ phong thái trang nghiêm, nho nhã, hiếu đạo, đậm nét văn hóa thờ cúng tổ tiên của dân tộc Việt Nam. Định dạng câu trả lời rõ ràng với tiêu đề và gạch đầu dòng khi cần thiết.

Dữ liệu dòng tộc hiện tại:
${familyContext ? JSON.stringify(familyContext, null, 2) : 'Dòng họ Nguyễn Văn, khởi tổ Cụ Nguyễn Văn Căn (1895 - 1968), quê quán tại Xã Tiên Phương, Huyện Chương Mỹ, Hà Nội.'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Không nhận được phản hồi từ mô hình.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Lỗi khi gọi Gemini API:', error);
    res.status(500).json({
      error: error?.message || 'Có lỗi xảy ra khi xử lý yêu cầu AI.',
    });
  }
});

// Vite Middleware or Static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Gia Phả Số server đang chạy trên cổng ${port}`);
  });
}

startServer();
