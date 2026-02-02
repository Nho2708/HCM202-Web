import React, { useState, useEffect } from 'react';
import { ChevronRight, SkipForward } from 'lucide-react';

import img1 from '../assets/1.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import imgHero from '../assets/hero.png';

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    const stages = [
        {
            title: "Hào khí Việt Nam",
            subtitle: "Khởi đầu một hành trình di sản",
            type: "flag",
            duration: 3500
        },
        {
            title: "Cơ sở hình thành",
            subtitle: "Học hỏi từ những giá trị văn hóa dân tộc và nhân loại",
            image: img1,
            type: "image",
            duration: 4500
        },
        {
            title: "Cách mạng giải phóng",
            subtitle: "Ánh sáng chiến đấu vì độc lập, tự do cho Tổ quốc",
            image: img3,
            type: "image",
            duration: 4500
        },
        {
            title: "Tư tưởng Lãnh đạo",
            subtitle: "Xây dựng Đảng và Nhà nước của dân, do dân, vì dân",
            image: img4,
            type: "image",
            duration: 4500
        },
        {
            title: "Chào mừng bạn",
            subtitle: "Hãy cùng khám phá chân lý Tư tưởng Hồ Chí Minh",
            image: imgHero,
            type: "welcome",
            duration: 5000
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    if (step < stages.length - 1) {
                        setStep(s => s + 1);
                        return 0;
                    } else {
                        handleComplete();
                        return 100;
                    }
                }
                return prev + (100 / (stages[step].duration / 50));
            });
        }, 50);

        return () => clearInterval(timer);
    }, [step]);

    const handleComplete = () => {
        setIsVisible(false);
        setTimeout(onComplete, 800);
    };

    if (!isVisible) return null;

    const currentStage = stages[step];

    return (
        <div className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 scale-110'}`}>

            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                {currentStage.type === 'flag' && (
                    <div className="relative w-full h-full bg-[#da251d] flex items-center justify-center animate-fade-in">
                        <div className="w-64 h-64 bg-[#ffff00] [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)] animate-pulse-slow shadow-[0_0_100px_rgba(255,255,0,0.5)]"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                )}

                {currentStage.type === 'image' && (
                    <div className="relative w-full h-full overflow-hidden animate-fade-in">
                        <img
                            src={currentStage.image}
                            alt={currentStage.title}
                            className="w-full h-full object-cover scale-110 animate-ken-burns opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
                    </div>
                )}

                {currentStage.type === 'welcome' && (
                    <div className="relative w-full h-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                        {currentStage.image && (
                            <img
                                src={currentStage.image}
                                alt="Welcome"
                                className="absolute inset-0 w-full h-full object-cover opacity-40 animate-ken-burns scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-30"></div>
                    </div>
                )}
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full max-w-4xl px-8 text-center space-y-8">
                <div className="overflow-hidden">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 animate-slide-up [animation-delay:200ms] leading-tight">
                        {currentStage.title}
                    </h1>
                </div>

                <div className="overflow-hidden">
                    <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto animate-slide-up [animation-delay:400ms] leading-relaxed italic">
                        "{currentStage.subtitle}"
                    </p>
                </div>


            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-12 left-0 w-full px-12 z-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <span className="text-white/40 font-mono text-sm leading-none">0{step + 1} / 0{stages.length}</span>
                        <div className="flex gap-2">
                            {stages.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-accent' : 'w-2 bg-white/20'}`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleComplete}
                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase group"
                    >
                        Bỏ qua
                        <SkipForward size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Cinematic Borders */}
            <div className="absolute top-0 left-0 w-full h-[8vh] bg-black z-10"></div>
            <div className="absolute bottom-0 left-0 w-full h-[8vh] bg-black z-10"></div>
        </div>
    );
};

export default Onboarding;
