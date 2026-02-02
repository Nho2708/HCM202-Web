
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCcw, BookOpen, MessageSquare, Sparkles } from 'lucide-react';
import { findAnswer, suggestedQuestions } from '../data/knowledgeDatabase';

const GEMINI_API_KEY = "AIzaSyA7uw4dQcoZ-ax9n5w2WCYBAxuK68DTxfQ";

const QASection = () => {
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Xin chào! Tôi là một trợ lý thông minh. Bạn có thể hỏi tôi bất cứ điều gì. Hãy bắt đầu cuộc trò chuyện! 😊' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e, customInput = null) => {
        if (e) e.preventDefault();
        const messageToSend = customInput || input;
        if (!messageToSend.trim()) return;

        const userMessage = { role: 'user', content: messageToSend };
        setMessages(prev => [...prev, userMessage]);
        if (!customInput) setInput('');
        setIsLoading(true);

        // Use knowledge base to find answer
        setTimeout(() => {
            const aiResponse = findAnswer(messageToSend);
            setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
            setIsLoading(false);
        }, 800);
    };

    return (
        <section id="qa" className="py-24 bg-cream relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 drop-shadow-sm">
                        Hộp Trò Chuyện
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Đặt câu hỏi bất cứ điều gì bạn muốn biết. Tôi sẽ trả lời bạn!
                    </p>
                </div>

                {/* Suggested Questions */}
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-600">
                        <Sparkles size={16} className="text-accent" />
                        <span>Gợi ý câu hỏi</span>
                        <Sparkles size={16} className="text-accent" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {suggestedQuestions.map((question, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSend(null, question)}
                                disabled={isLoading}
                                className="px-3 py-2 bg-white border-2 border-primary/30 text-primary text-xs md:text-sm font-semibold rounded-full hover:bg-primary/10 hover:border-primary/60 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col h-[600px] bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-bold text-gray-700">AI Trợ Lý</span>
                        </div>
                        <button
                            onClick={() => setMessages([{ role: 'ai', content: 'Xin chào! Tôi là một trợ lý thông minh. Bạn có thể hỏi tôi bất cứ điều gì. Hãy bắt đầu cuộc trò chuyện! 😊' }])}
                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                            title="Xóa lịch sử chat"
                        >
                            <RefreshCcw size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={chatContainerRef}
                        className="flex-grow overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth"
                    >
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                                <div className={`flex gap-4 max-w-[90%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                                        msg.role === 'user'
                                            ? 'bg-gradient-to-br from-primary to-primary-light text-white'
                                            : 'bg-white border border-gray-100 text-primary'
                                    }`}>
                                        {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                                    </div>
                                    <div className={`p-4 rounded-2xl shadow-sm ${
                                        msg.role === 'user'
                                            ? 'bg-primary text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                    }`}>
                                        <p className="leading-relaxed whitespace-pre-wrap text-[14px]">{msg.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
                                        <Bot size={20} className="text-gray-300" />
                                    </div>
                                    <div className="bg-gray-100 px-4 py-3 rounded-2xl flex items-center gap-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 md:p-6 bg-white border-t border-gray-100">
                        <form onSubmit={handleSend} className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Nhập câu hỏi của bạn..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                className="flex-grow px-4 py-3 bg-gray-100 rounded-xl outline-none text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-primary text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-light disabled:opacity-50 transition-all active:scale-95 font-bold"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                        <div className="mt-3 text-center text-xs text-gray-400">
                            Được hỗ trợ bởi AI
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QASection;
