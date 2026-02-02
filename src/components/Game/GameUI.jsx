import React, { useState } from 'react';
import { ArrowRight, Map as MapIcon } from 'lucide-react';
import Leaderboard from './Leaderboard';
import TreasureHunt from './TreasureHunt';

const GameUI = () => {
    const [gameState, setGameState] = useState('menu'); // menu, playing_treasure, leaderboard

    const handleStartTreasure = () => {
        setGameState('playing_treasure');
    };

    // Render Helpers
    const renderMainMenu = () => (
        <div className="w-full max-w-5xl mx-auto space-y-12 animate-fade-in py-12">
            <div className="text-center space-y-4">
                <h2 className="text-6xl font-serif font-bold text-accent drop-shadow-lg">Trung Tâm Giải Trí</h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                    Khám phá tri thức thông qua các trò chơi tương tác hấp dẫn. Chọn hành trình của bạn ngay!
                </p>
            </div>

            <div className="flex justify-center mt-12">
                {/* Treasure Hunt Option - Full Width */}
                <div
                    onClick={handleStartTreasure}
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 cursor-pointer overflow-hidden transition-all duration-500 hover:border-accent/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] w-full max-w-2xl"
                >
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all"></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                            <MapIcon size={32} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Đi Tìm Kho Báu</h3>
                        <p className="text-white/60 text-lg mb-8 flex-grow">
                            Khám phá các dấu mốc lịch sử, giải mã ẩn số và thu thập bảo vật của dân tộc.
                        </p>
                        <div className="flex items-center gap-2 text-accent font-bold">
                            Khám phá ngay <ArrowRight size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center pt-8">
                <button
                    onClick={() => setGameState('leaderboard')}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white font-medium transition-all"
                >
                    Xem Bảng Xếp Hạng
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-[800px] w-full flex items-center justify-center relative z-10 px-4">
            {gameState === 'menu' && renderMainMenu()}
            {gameState === 'playing_treasure' && <TreasureHunt onBack={() => setGameState('menu')} />}
            {gameState === 'leaderboard' && (
                <div className="w-full max-w-4xl animate-slide-up">
                    <Leaderboard finalScore={0} />
                    <div className="text-center mt-12">
                        <button onClick={() => setGameState('menu')} className="bg-white/10 text-white hover:bg-accent hover:text-primary px-8 py-3 rounded-full font-bold border border-white/20 transition-all">
                            Quay lại Menu Chính
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameUI;

