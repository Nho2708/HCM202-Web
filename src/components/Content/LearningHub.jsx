import React, { useState } from 'react';
import ChapterList from './ChapterList';
import ChapterContent from './ChapterContent';
import { syllabusData } from '../../data/syllabus';

const LearningHub = () => {
    const [currentChapterId, setCurrentChapterId] = useState(6); // Default to Chapter 6 (Focus topic)

    // Find current chapter object
    const currentChapter = syllabusData.find(c => c.id === currentChapterId) || syllabusData[0];

    return (
        <section id="content" className="py-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">
                        Kho Tàng Tri Thức
                    </h2>
                    <div className="w-24 h-1 bg-accent mx-auto"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Hệ thống toàn bộ nội dung chương trình học phần Tư tưởng Hồ Chí Minh.
                    </p>
                </div>

                {/* Layout: Sidebar + Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Desktop: Sticky, Mobile: Static */}
                    <div className="w-full lg:w-1/3 xl:w-1/4 flex-shrink-0">
                        <div className="lg:sticky lg:top-24">
                            <ChapterList
                                syllabus={syllabusData}
                                currentChapterId={currentChapterId}
                                onSelectChapter={setCurrentChapterId}
                            />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full lg:w-2/3 xl:w-3/4">
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 min-h-[600px] border-t-4 border-primary">
                            <ChapterContent chapter={currentChapter} />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default LearningHub;
