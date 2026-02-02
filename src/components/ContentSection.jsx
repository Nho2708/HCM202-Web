
import React, { useState } from 'react';
import { BookOpen, Users, UserPlus, X, ArrowRight } from 'lucide-react';

const ContentSection = () => {
    const [selectedChapter, setSelectedChapter] = useState(null);

    const chapters = [
        {
            id: '6.3.1',
            title: 'Quan niệm về con người',
            icon: <BookOpen className="w-8 h-8 text-accent" />,
            summary: 'Con người vừa là thành viên của xã hội, vừa là sản phẩm của lịch sử. Bản chất con người là tổng hòa các quan hệ xã hội.',
            image: 'https://placehold.co/600x400/8B0000/FFD700?text=Quan+Niem+Ve+Con+Nguoi',
            details: [
                'Hồ Chí Minh chỉ ra rằng con người là một thực thể thống nhất giữa mặt sinh vật và mặt xã hội.',
                'Về mặt sinh vật: Con người là sản phẩm của giới tự nhiên, tuân theo các quy luật tự nhiên.',
                'Về mặt xã hội: Con người là thành viên của xã hội, chịu sự chi phối của các quan hệ xã hội. Đây là mặt bản chất, quyết định sự khác biệt giữa con người và con vật.',
                '\"Trong tính hiện thực của nó, bản chất con người là tổng hòa những quan hệ xã hội.\"'
            ]
        },
        {
            id: '6.3.2',
            title: 'Quan điểm về vai trò của con người',
            icon: <Users className="w-8 h-8 text-accent" />,
            summary: 'Con người là vốn quý nhất, là mục tiêu và động lực của cuộc cách mạng giải phóng dân tộc và xây dựng chủ nghĩa xã hội.',
            image: 'https://placehold.co/600x400/8B0000/FFD700?text=Vai+Tro+Cua+Con+Nguoi',
            details: [
                'Con người là mục tiêu của cách mạng: Mọi đường lối, chủ trương đều vì lợi ích của con người, vì hạnh phúc của nhân dân.',
                'Con người là động lực của cách mạng: Cách mạng là sự nghiệp của quần chúng. Sức mạnh vô địch của cách mạng nằm ở khối đại đoàn kết toàn dân.',
                'Bác nhấn mạnh: \"Dễ trăm lần không dân cũng chịu, khó vạn lần dân liệu cũng xong.\"'
            ]
        },
        {
            id: '6.3.3',
            title: 'Quan điểm về xây dựng con người',
            icon: <UserPlus className="w-8 h-8 text-accent" />,
            summary: 'Chiến lược "trồng người" là yêu cầu khách quan, vừa cấp bách vừa lâu dài của cách mạng.',
            image: 'https://placehold.co/600x400/8B0000/FFD700?text=Chien+Luoc+Trong+Nguoi',
            details: [
                '\"Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người.\"',
                'Nội dung xây dựng con người toàn diện: Đức, Trí, Thể, Mỹ. Trong đó, Đức là gốc.',
                'Đạo đức cách mạng: Cần, Kiệm, Liêm, Chính, Chí công vô tư.',
                'Biện pháp: Nêu gương, giáo dục, tự phê bình và phê bình.'
            ]
        }
    ];

    return (
        <section id="content" className="py-20 bg-gray-50 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                        Nội Dung Chương 6.3
                    </h2>
                    <div className="w-24 h-1 bg-accent mx-auto"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Hệ thống quan điểm toàn diện và sâu sắc của Hồ Chí Minh về bản chất, vai trò và chiến lược xây dựng con người.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {chapters.map((chapter) => (
                        <div
                            key={chapter.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border-t-4 border-accent flex flex-col h-full cursor-pointer group"
                            onClick={() => setSelectedChapter(chapter)}
                        >
                            <div className="p-8 flex-grow">
                                <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:bg-accent/20 transition-colors">
                                    {chapter.icon}
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-2 font-serif">{chapter.id}</h3>
                                <h4 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-primary transition-colors">{chapter.title}</h4>
                                <p className="text-gray-600 line-clamp-3">
                                    {chapter.summary}
                                </p>
                            </div>
                            <div className="px-8 pb-8 mt-auto">
                                <button
                                    className="text-primary font-bold flex items-center group-hover:text-accent transition-colors"
                                >
                                    Xem chi tiết <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Detail View */}
            {selectedChapter && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedChapter(null)}>
                    <div
                        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedChapter(null)}
                            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Image Side */}
                            <div className="md:w-2/5 relative h-64 md:h-auto">
                                <img
                                    src={selectedChapter.image}
                                    alt={selectedChapter.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                                    <h3 className="text-white text-xl font-bold">{selectedChapter.id}: {selectedChapter.title}</h3>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="md:w-3/5 p-8 md:p-12 bg-white">
                                <div className="hidden md:block mb-6">
                                    <span className="text-accent font-serif font-bold text-lg tracking-wider">{selectedChapter.id}</span>
                                    <h3 className="text-3xl font-bold text-primary mt-1 mb-4">{selectedChapter.title}</h3>
                                    <div className="w-16 h-1 bg-accent"></div>
                                </div>

                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    {selectedChapter.details.map((paragraph, idx) => (
                                        <p key={idx} className="flex gap-3">
                                            <span className="text-accent font-bold text-lg mt-1">❖</span>
                                            <span>{paragraph}</span>
                                        </p>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <button
                                        onClick={() => setSelectedChapter(null)}
                                        className="px-6 py-2 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
                                    >
                                        Đóng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContentSection;
