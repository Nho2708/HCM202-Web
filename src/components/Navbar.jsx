import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, ShieldCheck, User as UserIcon, LogOut, ChevronDown, Monitor, Users, ChevronRight } from 'lucide-react';
import AuthModal from './AuthModal';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [stats, setStats] = useState({ online: 1, total: 1000 });
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Stats Handling
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

                // Track visit once per session
                const hasVisited = sessionStorage.getItem('hasVisited');
                const shouldIncrement = !hasVisited;
                if (shouldIncrement) sessionStorage.setItem('hasVisited', 'true');

                const res = await fetch(`${apiBaseUrl}/api/stats/visit?increment=${shouldIncrement}`, {
                    headers: { 'ngrok-skip-browser-warning': '69420' }
                });

                if (res.ok) {
                    const data = await res.json();
                    setStats(prev => ({
                        ...prev,
                        online: data.onlineCount || prev.online,
                        total: data.totalVisits || prev.total
                    }));
                }
            } catch (err) { }
        };

        const interval = setInterval(fetchStats, 30000);
        fetchStats();
        return () => clearInterval(interval);
    }, []);

    // Scroll Effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Trang chủ', id: 'home', path: '/' },
        { name: 'Nội dung', id: 'content', path: '/#content' },
        { name: 'Hỏi đáp', id: 'qa', path: '/#qa' },
        { name: 'Về dự án', id: 'about', path: '/about' },
    ];

    const isNotHome = location.pathname !== '/';
    const shouldShowSolid = scrolled || isNotHome;

    const handleNavClick = (item) => {
        setIsMenuOpen(false);
        if (item.path === '/about') {
            navigate('/about');
            window.scrollTo(0, 0);
        } else if (item.path.startsWith('/#')) {
            const targetId = item.path.substring(2);
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                const element = document.getElementById(targetId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${shouldShowSolid
                ? 'bg-white/80 backdrop-blur-lg shadow-lg py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <div
                    onClick={() => handleNavClick({ path: '/' })}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                        <span className="text-white font-serif font-bold text-xl">H</span>
                    </div>
                    <span className={`text-2xl font-serif font-bold tracking-tight transition-colors ${shouldShowSolid ? 'text-gray-900' : 'text-white'
                        }`}>
                        HCM
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item)}
                                className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-accent relative group ${shouldShowSolid ? 'text-gray-600' : 'text-white/80'
                                    }`}
                            >
                                {item.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full`}></span>
                            </button>
                        ))}
                    </div>

                    <div className="h-6 w-px bg-gray-200"></div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <div className={`text-[10px] uppercase tracking-tighter font-bold ${shouldShowSolid ? 'text-gray-400' : 'text-white/40'}`}>Trực tuyến</div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                <span className={`font-mono text-sm font-bold ${shouldShowSolid ? 'text-gray-900' : 'text-white'}`}>{stats.online}</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            <div className={`text-[10px] uppercase tracking-tighter font-bold ${shouldShowSolid ? 'text-gray-400' : 'text-white/40'}`}>Tổng truy cập</div>
                            <div className="flex items-center gap-2">
                                <Monitor size={14} className={shouldShowSolid ? 'text-primary' : 'text-primary-light'} />
                                <span className={`font-mono text-sm font-bold ${shouldShowSolid ? 'text-gray-900' : 'text-white'}`}>{stats.total.toLocaleString()}</span>
                            </div>
                        </div>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full border-2 border-primary/20 hover:border-primary transition-all bg-white/5"
                                >
                                    <span className={`font-bold text-sm ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                                        {user.name.split(' ').pop()}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold ring-2 ring-white/20">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            user.name.charAt(0)
                                        )}
                                    </div>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl py-3 border border-gray-100 animate-slide-up origin-top-right ring-1 ring-black/5">
                                        <div className="px-4 py-2 border-b border-gray-100 mb-2">
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Tài khoản</p>
                                            <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem('user');
                                                setUser(null);
                                                setIsUserMenuOpen(false);
                                                window.location.reload();
                                            }}
                                            className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 font-bold transition-colors flex items-center gap-2"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="px-6 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-primary-light transition-all shadow-lg shadow-primary/20 active:scale-95"
                            >
                                Đăng nhập
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                        }`}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 top-[70px] bg-white z-50 p-6 animate-fade-in flex flex-col">
                    <div className="space-y-4 mb-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item)}
                                className="w-full text-left px-6 py-4 rounded-2xl bg-gray-50 text-gray-900 font-bold text-xl active:bg-primary active:text-white transition-all flex justify-between items-center"
                            >
                                {item.name}
                                <ChevronRight size={20} className="text-gray-400" />
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto space-y-4">
                        <div className="p-6 bg-cream rounded-3xl space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-bold">Trực tuyến</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-gray-900 font-mono font-bold text-lg">{stats.online}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <span className="text-gray-500 font-bold">Tổng truy cập</span>
                                <div className="flex items-center gap-2">
                                    <Monitor size={18} className="text-primary" />
                                    <span className="text-gray-900 font-mono font-bold text-lg">{stats.total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {!user && (
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsAuthModalOpen(true);
                                }}
                                className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 text-lg"
                            >
                                Đăng nhập ngay
                            </button>
                        )}
                    </div>
                </div>
            )}

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onAuthSuccess={(userData) => setUser(userData)}
            />
        </nav>
    );
};

export default Navbar;
