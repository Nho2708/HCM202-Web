import React from 'react';
import GameUI from './Game/GameUI';

const GameSection = () => {
    return (
        <section id="game" className="py-32 bg-[#050510] text-white relative overflow-hidden min-h-screen flex items-center">
            {/* Base Layer: Mesh Gradient */}
            <div className="absolute inset-0 overflow-hidden opacity-40">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/40 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-accent/30 rounded-full blur-[100px] animate-float [animation-delay:2s]"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] bg-blue-900/20 rounded-full blur-[140px]"></div>
            </div>

            {/* Grid Pattern with fading edges */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10"></div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-1/4 left-10 w-32 h-32 border border-white/5 rounded-full blur-sm animate-float"></div>
            <div className="absolute bottom-1/4 right-10 w-48 h-48 border border-white/5 rounded-full blur-sm animate-float [animation-delay:4s]"></div>

            <div className="container mx-auto px-4 relative z-10 w-full">
                <GameUI />
            </div>
        </section>
    );
};

export default GameSection;
