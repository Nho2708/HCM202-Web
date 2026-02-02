
import React from 'react';
import { ArrowRight, Book, Play, Zap } from 'lucide-react';
import heroImg from '../assets/hero.png';

const Hero = () => {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    return (
        <section id="home" className="relative min-h-[90vh] flex items-center bg-[#0a0a0a] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            </div>

            <div className="container mx-auto px-4 z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8 text-center lg:text-left animate-fade-in">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-accent text-sm font-bold backdrop-blur-md">
                            <Zap size={14} className="fill-accent" />
                            <span>{user ? `Chào mừng trở lại, ${user.name}!` : 'Tri thức số 2026'}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl xl:text-8xl font-serif font-bold leading-[1.1] text-white">
                            Tư tưởng <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">
                                Hồ Chí Minh
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                            Khám phá di sản tư tưởng vĩ đại của Người – ánh sáng soi đường cho cách mạng Việt Nam, sự kết tinh giữa lòng yêu nước nồng nàn và tinh hoa nhân loại.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                            <button
                                onClick={() => document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group relative flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                <Book size={20} />
                                <span>Khám phá tri thức</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm"
                            >
                                <Play size={20} className="fill-white" />
                                <span>Tìm kiếm di sản trong game</span>
                            </button>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-white/5">
                            <div>
                                <div className="text-2xl font-bold text-white">06</div>
                                <div className="text-sm text-gray-500 uppercase tracking-widest">Chương học</div>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 w-full max-w-lg mx-auto">
                            <div className="relative group">
                                {/* Main Image Frame */}
                                <div className="relative overflow-hidden rounded-[2rem] border-8 border-white/5 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                                    <img
                                        src={heroImg}
                                        alt="Chủ tịch Hồ Chí Minh"
                                        className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                    {/* Overlay Text */}
                                    <div className="absolute bottom-10 left-10 right-10">
                                        <div className="text-accent font-serif italic text-2xl mb-2">"Không có gì quý hơn độc lập tự do"</div>
                                        <div className="w-12 h-1 bg-accent/50"></div>
                                    </div>
                                </div>

                                {/* Floating Badges */}
                                <div className="absolute -top-6 -right-6 p-4 bg-white rounded-2xl shadow-xl animate-bounce [animation-duration:3s]">
                                    <Star className="text-yellow-500 fill-yellow-500" size={32} />
                                </div>
                               
                            </div>
                        </div>

                        {/* Background Shapes */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Need this for Star in floating badge
const Star = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

export default Hero;
