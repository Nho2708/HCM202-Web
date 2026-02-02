import React from 'react';
import { ChevronRight } from 'lucide-react';

const ChapterList = ({ syllabus, currentChapterId, onSelectChapter }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-primary p-4">
                <h3 className="text-white font-serif font-bold text-lg">Mục Lục Chương Trình</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {syllabus.map((chapter) => (
                    <button
                        key={chapter.id}
                        onClick={() => onSelectChapter(chapter.id)}
                        className={`w-full text-left p-4 flex items-center justify-between transition-all hover:bg-gray-50 group border-l-4 ${currentChapterId === chapter.id
                                ? 'bg-indigo-50/50 border-accent shadow-sm'
                                : 'border-transparent'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className={`w-12 h-12 rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-105 ${currentChapterId === chapter.id ? 'ring-2 ring-accent ring-offset-2' : ''
                                    }`}>
                                    {chapter.image ? (
                                        <img src={chapter.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            {chapter.icon}
                                        </div>
                                    )}
                                </div>
                                {currentChapterId === chapter.id && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className={`text-[10px] font-bold uppercase tracking-widest block mb-0.5 ${currentChapterId === chapter.id ? 'text-accent' : 'text-gray-400'
                                    }`}>
                                    Chương {chapter.id}
                                </span>
                                <span className={`font-bold text-sm line-clamp-1 transition-colors ${currentChapterId === chapter.id ? 'text-primary' : 'text-gray-700 group-hover:text-primary'
                                    }`}>
                                    {chapter.title.split(': ')[1] || chapter.title}
                                </span>
                            </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-all ${currentChapterId === chapter.id ? 'text-accent translate-x-1' : 'text-gray-300 opacity-0 group-hover:opacity-100'
                            }`} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChapterList;
