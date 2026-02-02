
/**
 * Simple prompt builder - no RAG, just ChatGPT style
 */
export const buildPrompt = (query) => {
    return `Bạn là một trợ lý thông minh giống ChatGPT. Trả lời câu hỏi bình thường, tự nhiên, ngắn gọn bằng tiếng Việt.

Câu hỏi: "${query}"`;
};
