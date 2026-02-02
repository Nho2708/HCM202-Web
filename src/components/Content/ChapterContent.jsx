import React, { useState } from 'react';
import { ArrowRight, BookOpen, Users, UserPlus, X, FileText, Image as ImageIcon } from 'lucide-react';

const ChapterContent = ({ chapter }) => {
    const [selectedSection, setSelectedSection] = useState(null);

    return (
        <div className="animate-fade-in">
            {/* Chapter Header */}
            <div className="mb-8 border-b border-gray-200 pb-6">
                {chapter.image && (
                    <div className="w-full h-64 rounded-2xl overflow-hidden mb-6 shadow-md relative group">
                        <img 
                            src={chapter.image} 
                            alt={chapter.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                         <div className="absolute bottom-4 left-6">
                             <div className="flex items-center gap-3 text-white">
                                 <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                     {chapter.icon}
                                 </div>
                                 <span className="font-bold text-sm bg-accent/90 px-3 py-1 rounded-full uppercase tracking-wider text-primary">
                                     Chương {chapter.id}
                                 </span>
                             </div>
                         </div>
                    </div>
                )}
                
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        {chapter.icon || <BookOpen size={24} />}
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary">{chapter.title}</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">{chapter.summary}</p>
            </div>

            {/* Content Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chapter.sections.map((section) => (
                    <div
                        key={section.id}
                        onClick={() => setSelectedSection(section)}
                        className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-accent transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                    >
                        {/* Image Frame */}
                        <div className="h-40 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                            {section.image ? (
                                <img 
                                    src={section.image} 
                                    alt={section.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                            ) : (
                                <ImageIcon size={40} className="text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                            )}
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                            
                            <div className="absolute top-4 left-4">
                                <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-white/20 shadow-sm">
                                    Phần {section.id}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex-grow">
                            <h4 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-primary transition-colors">
                                {section.title}
                            </h4>
                            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
                                {section.content}
                            </p>
                            <div className="flex items-center text-accent font-bold text-sm">
                                Khám phá chi tiết <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Content Modal */}
            {selectedSection && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
                    onClick={() => setSelectedSection(null)}
                >
                    <div
                        className="bg-white rounded-[2rem] w-full max-w-6xl overflow-hidden shadow-2xl relative animate-slide-up flex flex-col max-h-[90vh]"
                        onClick={e => e.stopPropagation()}
                    >
                         {/* Simple Header */}
                         <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-start bg-white z-20 sticky top-0">
                            <div>
                                 <span className="text-accent font-bold uppercase text-xs tracking-wider mb-2 block">
                                     Phần {selectedSection.id}
                                 </span>
                                 <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary leading-tight">
                                     {selectedSection.title}
                                 </h3>
                            </div>
                            <button
                                onClick={() => setSelectedSection(null)}
                                className="p-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full transition-all ml-4 flex-shrink-0"
                            >
                                <X size={24} />
                            </button>
                         </div>

                         {/* Modal Body - Scrollable */}
                         <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
                                
                                {/* Left Column: Text Content */}
                                <div className="flex-1 space-y-8">
                                     {/* Lead Paragraph */}
                                     {selectedSection.content && (
                                         <div className="flex gap-5 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                             <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex-shrink-0 flex items-center justify-center text-primary">
                                                 <FileText size={24} />
                                             </div>
                                             <div>
                                                 <h5 className="font-bold text-gray-900 mb-2">Lời dẫn giải</h5>
                                                 <p className="text-lg text-gray-700 leading-relaxed font-medium italic">
                                                    "{selectedSection.content}"
                                                 </p>
                                             </div>
                                         </div>
                                     )}
                                     
                                     {/* Extended Content Placeholder */}
                                     <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                                        <h4 className="font-bold text-gray-900 text-xl not-italic mb-4">
                                            Chi tiết nội dung
                                        </h4>
                                        <p>
                                            Đây là phần hiển thị nội dung chi tiết cho mục <strong>{selectedSection.title}</strong>. 
                                            Nội dung này được thiết kế theo cấu trúc khoa học để giúp sinh viên dễ dàng tiếp cận và ghi nhớ.
                                        </p>
                                        <p>
                                            Trong quá trình nghiên cứu, bạn nên kết hợp việc đọc nội dung tóm tắt này với các tài liệu giáo trình chính thống. 
                                            Hình ảnh minh họa bên cạnh giúp trực quan hóa các khái niệm trừu tượng, tạo sự liên kết giữa lý thuyết và thực tiễn.
                                        </p>
                                        <ul className="list-disc pl-5 space-y-2 mt-4">
                                            <li>Nắm vững các luận điểm cốt lõi của Hồ Chí Minh về vấn đề này.</li>
                                            <li>Liên hệ với bối cảnh lịch sử cụ thể lúc bấy giờ.</li>
                                            <li>Vận dụng linh hoạt vào thực tiễn xây dựng đất nước hiện nay.</li>
                                        </ul>
                                     </div>
                                </div>

                                {/* Right Column: Image */}
                                <div className="w-full lg:w-2/5 flex-shrink-0">
                                    {selectedSection.image ? (
                                        <div className="lg:sticky lg:top-0 space-y-3">
                                            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 group bg-gray-100">
                                                <img 
                                                    src={selectedSection.image} 
                                                    alt={selectedSection.title} 
                                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 block"
                                                />
                                            </div>
                                            <div className="flex items-start gap-2 text-sm text-gray-500 italic justify-center lg:justify-start px-2">
                                                <ImageIcon size={14} className="mt-1 flex-shrink-0" />
                                                <span>Hình minh họa: {selectedSection.title}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 rounded-2xl h-64 flex items-center justify-center border-2 border-dashed border-gray-200 text-gray-400">
                                            <div className="text-center">
                                                <ImageIcon size={48} className="mx-auto mb-2 opacity-50"/>
                                                <span>Chưa có hình ảnh minh họa</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                         </div>
                         
                         {/* Modal Footer */}
                         <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => setSelectedSection(null)}
                                className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all active:scale-95 shadow-lg shadow-primary/30"
                            >
                                Đã hiểu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChapterContent;
