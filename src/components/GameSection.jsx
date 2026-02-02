import React from 'react';
import GameUI from './Game/GameUI';

const GameSection = () => {
    return (
        <section id="game" className="py-24 bg-gray-900 text-white relative overflow-hidden min-h-screen flex items-center">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

            {/* Dynamic Background Gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10 w-full">
                <GameUI />
            </div>
        </section>
    );
};

export default GameSection;
