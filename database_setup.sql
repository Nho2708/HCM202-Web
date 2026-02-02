
-- 1. Tạo Database
CREATE DATABASE HCM_LearningDB;
GO

USE HCM_LearningDB;
GO

-- 2. Bảng Người dùng
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    FullName NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(MAX), -- Dùng cho đăng ký thường
    GoogleID NVARCHAR(100),     -- Dùng cho Google Login
    AvatarURL NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    LastLogin DATETIME
);
GO

-- 3. Bảng Nội dung học tập (để lưu dữ liệu từ KnowledgeBase)
CREATE TABLE Chapters (
    ChapterID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX)
);
GO

CREATE TABLE KnowledgeChunks (
    ChunkID INT PRIMARY KEY IDENTITY(1,1),
    ChapterID INT FOREIGN KEY REFERENCES Chapters(ChapterID),
    Content NVARCHAR(MAX) NOT NULL,
    Tags NVARCHAR(200)
);
GO

-- 4. Bảng Kết quả trò chơi (Lưu tiến độ)
CREATE TABLE QuizScores (
    ScoreID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    Score INT,
    TotalQuestions INT,
    PlayedAt DATETIME DEFAULT GETDATE()
);
GO

-- Dữ liệu mẫu ban đầu
INSERT INTO Chapters (Title, Description) VALUES 
(N'Chương 1', N'Đối tượng, phương pháp nghiên cứu và ý nghĩa học tập môn Tư tưởng Hồ Chí Minh'),
(N'Chương 2', N'Cơ sở, quá trình hình thành và phát triển tư tưởng Hồ Chí Minh');
GO
