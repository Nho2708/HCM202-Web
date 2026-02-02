const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const http = require('http'); // Thêm http
const { Server } = require('socket.io'); // Thêm Socket.io
require('dotenv').config();

const app = express();
const path = require('path');
app.use(express.json());

// Cấu hình CORS mở để Vercel có thể gọi tới
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Cấu hình kết nối SQL Server
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // Cho Azure
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' // Cho local dev
    }
};

// Kết nối Database
sql.connect(dbConfig)
    .then(pool => {
        if (pool.connected) {
            console.log('✅ Đã kết nối thành công tới SQL Server: ' + process.env.DB_DATABASE);
        }
    })
    .catch(err => console.log('❌ Lỗi kết nối Database: ', err));

// Cài đặt: npm install bcryptjs
const bcrypt = require('bcryptjs');

// Root route
app.get('/', (req, res) => {
    res.send('🚀 HCM Learning API is running...');
});

// 1. API Đăng ký (Signup)
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, passwordHash)
            .query(`
                IF NOT EXISTS (SELECT * FROM Users WHERE Email = @email)
                BEGIN
                    INSERT INTO Users (FullName, Email, PasswordHash, LastLogin)
                    VALUES (@name, @email, @password, GETDATE())
                END
                ELSE
                BEGIN
                    THROW 50000, 'Email already exists', 1;
                END
            `);
        res.status(200).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const { KNOWLEDGE_CHUNKS } = require('./knowledgeBase');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API Chatbot
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Tin nhắn không được để trống." });
    }

    try {
        // 1. Tìm kiếm kiến thức liên quan từ file knowledgeBase.js
        const relevantChunks = KNOWLEDGE_CHUNKS.filter(chunk =>
            message.toLowerCase().includes(chunk.category.toLowerCase()) ||
            message.toLowerCase().includes(chunk.title?.toLowerCase() || '') ||
            chunk.content.toLowerCase().split(' ').some(word => word.length > 3 && message.toLowerCase().includes(word))
        );

        const relevantKnowledge = relevantChunks.map(chunk => `[${chunk.category}] ${chunk.title}: ${chunk.content}`).join("\n");

        const systemPrompt = `Bạn là "Chuyên gia Tư vấn Tư tưởng Hồ Chí Minh" - một trợ lý AI thông minh, uyên bác và thân thiện của trang web HCM Learning.
        
        NHIỆM VỤ CỦA BẠN:
        1. Cung cấp kiến thức chính xác, hệ thống và sâu sắc về Tư tưởng Hồ Chí Minh.
        2. Trình bày câu trả lời một cách khoa học (sử dụng bullet points, tiêu đề rõ ràng) nhưng không cứng nhắc, khô khan.
        3. Luôn bám sát nội dung giáo trình chuẩn của Đảng Cộng sản Việt Nam và chương trình đào tạo đại học.

        CẤU TRÚC GIÁO TRÌNH TRÊN WEBSITE (6 CHƯƠNG):
        - Chương 1: Khái niệm, đối tượng, phương pháp nghiên cứu và ý nghĩa học tập.
        - Chương 2: Cơ sở, quá trình hình thành và phát triển Tư tưởng Hồ Chí Minh.
        - Chương 3: Tư tưởng Hồ Chí Minh về Độc lập dân tộc và Chủ nghĩa xã hội.
        - Chương 4: Tư tưởng về Đảng Cộng sản và Nhà nước của nhân dân.
        - Chương 5: Tư tưởng về Đại đoàn kết dân tộc và Đoàn kết quốc tế.
        - Chương 6: Tư tưởng về Văn hóa, Đạo đức và Con người.

        KIẾN THỨC BỔ TRỢ (Dùng để tham khảo và mở rộng):
        ${relevantKnowledge || "Hãy sử dụng vốn kiến thức uyên bác của bạn để trả lời, đảm bảo tính chính mực và khoa học."}

        PHONG CÁCH TRẢ LỜI:
        - Sử dụng ngôn ngữ chuẩn mực, tôn kính khi nói về Bác Hồ.
        - Trình bày bài bản: Có đặt vấn đề, nội dung chính (chia theo ý) và kết luận/ý nghĩa thực tiễn.
        - Nếu câu hỏi quá rộng, hãy tóm tắt các ý chính và gợi ý người dùng tìm hiểu sâu hơn ở chương tương ứng.
        - Khuyến khích người dùng liên hệ thực tiễn và rèn luyện đạo đức theo gương Bác.
        
        Lưu ý: Không trả lời các vấn đề chính trị nhạy cảm hoặc không liên quan đến học thuật Tư tưởng Hồ Chí Minh.`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([systemPrompt, message]);
        const response = await result.response;
        const text = response.text();
        res.json({ reply: text });
    } catch (error) {
        console.error("Lỗi khi gọi Gemini API:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi xử lý yêu cầu của bạn. Hãy đảm bảo API Key đã được cấu hình đúng." });
    }
});

// 2. API Đăng nhập (Login)
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE Email = @email');

        const user = result.recordset[0];
        if (!user) {
            return res.status(401).json({ message: 'Email không tồn tại' });
        }

        const isMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

        await pool.request()
            .input('email', sql.NVarChar, email)
            .query('UPDATE Users SET LastLogin = GETDATE() WHERE Email = @email');

        res.json({
            id: user.UserID,
            name: user.FullName,
            email: user.Email,
            avatar: user.AvatarURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.Email}`
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 3. API Đăng nhập Google
app.post('/api/auth/google', async (req, res) => {
    const { name, email, googleId, avatar } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('email', sql.NVarChar, email)
            .input('googleId', sql.NVarChar, googleId)
            .input('avatar', sql.NVarChar, avatar)
            .query(`
                IF NOT EXISTS (SELECT * FROM Users WHERE Email = @email)
                BEGIN
                    INSERT INTO Users (FullName, Email, GoogleID, AvatarURL, LastLogin)
                    VALUES (@name, @email, @googleId, @avatar, GETDATE())
                END
                ELSE
                BEGIN
                    UPDATE Users 
                    SET LastLogin = GETDATE(), AvatarURL = @avatar, GoogleID = @googleId 
                    WHERE Email = @email
                END
            `);

        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE Email = @email');

        const user = result.recordset[0];
        res.json({
            id: user.UserID,
            name: user.FullName,
            email: user.Email,
            avatar: user.AvatarURL
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 4. API Lưu điểm Trò chơi
app.post('/api/quiz/score', async (req, res) => {
    const { userId, score, totalQuestions } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('userId', sql.Int, userId)
            .input('score', sql.Int, score)
            .input('total', sql.Int, totalQuestions)
            .query('INSERT INTO QuizScores (UserID, Score, TotalQuestions) VALUES (@userId, @score, @total)');
        res.json({ message: 'Lưu điểm thành công' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 5. API Bảng xếp hạng (Leaderboard)
app.get('/api/leaderboard', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request().query(`
            SELECT TOP 10 
                u.FullName, 
                u.AvatarURL,
                u.Email,
                MAX(s.Score) as HighScore,
                AVG(CAST(s.Score AS FLOAT)) as AvgScore,
                COUNT(s.ScoreID) as GamesPlayed
            FROM Users u
            JOIN QuizScores s ON u.UserID = s.UserID
            GROUP BY u.UserID, u.FullName, u.AvatarURL, u.Email
            ORDER BY HighScore DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 6. API Lấy số lượt truy cập (Và tăng số lượt)
app.get('/api/stats/visit', async (req, res) => {
    const shouldIncrement = req.query.increment !== 'false';
    try {
        let pool = await sql.connect(dbConfig);
        let query = `
            IF NOT EXISTS (SELECT * FROM SYSOBJECTS WHERE NAME='SiteStats' AND XTYPE='U')
            BEGIN
                CREATE TABLE SiteStats (TotalVisits INT);
                INSERT INTO SiteStats VALUES (1);
            END
        `;

        if (shouldIncrement) {
            query += ` ELSE BEGIN UPDATE SiteStats SET TotalVisits = TotalVisits + 1 END `;
        }

        query += ` SELECT TotalVisits FROM SiteStats;`;

        const result = await pool.request().query(query);
        res.json({ totalVisits: result.recordset[0].TotalVisits });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Socket.io logic
let onlineUsers = 0;
io.on('connection', (socket) => {
    onlineUsers++;
    io.emit('onlineCount', onlineUsers);

    socket.on('disconnect', () => {
        onlineUsers--;
        io.emit('onlineCount', onlineUsers);
    });
});

// Route này phải ở cuối cùng để hỗ trợ React Router (nếu có)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
