import React, { useState } from 'react';
import { KNOWLEDGE_CHUNKS } from '../../data/knowledgeBase';
import { BookOpen, ChevronDown, ChevronRight, History } from 'lucide-react';

const KnowledgeBase = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Chương 1');

    // Group knowledge chunks by category
    const groupedKnowledge = KNOWLEDGE_CHUNKS.reduce((acc, chunk) => {
        const category = chunk.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(chunk);
        return acc;
    }, {});

    const categories = Object.keys(groupedKnowledge).sort();
    const selectedChunks = groupedKnowledge[selectedCategory] || [];

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section className="py-20 bg-white min-h-screen">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <History size={32} className="text-amber-800" />
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800">
                            Kho Tàng Tri Thức
                        </h1>
                    </div>
                    <div className="w-24 h-1 bg-amber-700 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Hệ thống nội dung toàn bộ Tư Tưởng Hồ Chí Minh - 
                        Được sắp xếp theo trình tự lịch sử và logic học tập
                    </p>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Categories */}
                    <div className="w-full lg:w-1/4 flex-shrink-0">
                        <div className="sticky top-24 bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                <BookOpen size={20} className="text-amber-700" />
                                Các Chương
                            </h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setExpandedId(null);
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${
                                            selectedCategory === category
                                                ? 'bg-amber-100 text-amber-900 border-l-4 border-amber-700'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {category}
                                        <span className="text-xs text-gray-500 ml-2">
                                            ({groupedKnowledge[category].length})
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full lg:w-3/4">
                        {/* Category Title */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">
                                {selectedCategory}
                            </h2>
                            <div className="w-16 h-1 bg-amber-700 mb-4"></div>
                            <p className="text-gray-600">
                                Tổng cộng {selectedChunks.length} nội dung
                            </p>
                        </div>

                        {/* Knowledge Chunks List */}
                        <div className="space-y-4">
                            {selectedChunks.map((chunk, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                                >
                                    {/* Header - Clickable */}
                                    <button
                                        onClick={() => toggleExpand(index)}
                                        className="w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-200 flex items-start justify-between gap-4"
                                    >
                                        <div className="flex-grow">
                                            <h4 className="font-bold text-gray-800 text-lg leading-relaxed">
                                                {chunk.title}
                                            </h4>
                                            <p className="text-sm text-amber-700 font-medium mt-1">
                                                {chunk.category}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 mt-1">
                                            {expandedId === index ? (
                                                <ChevronDown size={24} className="text-amber-700" />
                                            ) : (
                                                <ChevronRight size={24} className="text-gray-400" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Content - Expandable */}
                                    {expandedId === index && (
                                        <div className="border-t border-gray-200 px-6 py-5 bg-gray-50 animate-in fade-in duration-200">
                                            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                                                <p className="whitespace-pre-line text-base">
                                                    {chunk.content}
                                                </p>
                                            </div>

                                            {/* Timeline indicator */}
                                            <div className="mt-6 pt-5 border-t border-gray-300 flex items-center gap-2 text-xs text-gray-500">
                                                <div className="w-2 h-2 rounded-full bg-amber-700"></div>
                                                Phần kiến thức {index + 1} / {selectedChunks.length}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Footer Info */}
                        <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-sm text-amber-900 leading-relaxed">
                                <span className="font-bold">💡 Gợi ý:</span> Nhấp vào các tiêu đề để xem nội dung chi tiết. 
                                Sử dụng danh sách bên trái để chuyển đổi giữa các chương khác nhau.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KnowledgeBase;
