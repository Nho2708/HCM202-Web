import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, ShieldCheck, User as UserIcon, LogOut, ChevronDown, Monitor, Users } from 'lucide-react'; // Thêm icon mới
import AuthModal from './AuthModal';
import { io } from 'socket.io-client'; // Import socket.io-client

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Stats state
    const [onlineCount, setOnlineCount] = useState(1);
    const [totalVisits, setTotalVisits] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        // Kiểm tra session để tránh tăng 2 lần do StrictMode hoặc F5
        let hasVisitedSession = sessionStorage.getItem('hasVisited');
        let shouldIncrement = false;

        if (!hasVisitedSession) {
            sessionStorage.setItem('hasVisited', 'true'); // Đánh dấu đã truy cập NGAY LẬP TỨC
            shouldIncrement = true;
        }

        const fetchUrl = `${import.meta.env.VITE_API_BASE_URL}/api/stats/visit?increment=${shouldIncrement}`;

        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                setTotalVisits(data.totalVisits);
            })
            .catch(err => console.error("Error fetching visits:", err));

        // Socket logic for Online count
        const socket = io(import.meta.env.VITE_API_BASE_URL);
        socket.on('onlineCount', (count) => {
            setOnlineCount(count);
        });

        window.addEventListener('scroll', handleScroll);

        // Listen for global auth trigger
        const handleOpenAuth = () => setIsAuthOpen(true);
        window.addEventListener('openAuthModal', handleOpenAuth);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('openAuthModal', handleOpenAuth);
            socket.disconnect();
        };
    }, []);

    const navItems = [
        { name: 'Trang chủ', id: 'home' },
        { name: 'Nội dung', id: 'content' },
        { name: 'Trò chơi', id: 'game' },
        { name: 'Hỏi đáp', id: 'qa' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setShowUserMenu(false);
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 py-3'
                : 'bg-transparent py-5'
                }`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => scrollToSection('home')}
                        >
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-accent shadow-lg shadow-primary/20 rotate-[-5deg] group-hover:rotate-0 transition-transform">
                                HCM
                            </div>
                            <span className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight">
                                Tư Tưởng <span className="text-accent">Hồ Chí Minh</span>
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            {/* Stats */}
                            <div className="flex items-center gap-4 mr-6 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-2" title="Đang trực tuyến">
                                    <div className="relative">
                                        <Users size={16} className="text-accent" />
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    </div>
                                    <span className="text-xs font-bold text-white">{onlineCount}</span>
                                </div>
                                <div className="w-px h-4 bg-white/10"></div>
                                <div className="flex items-center gap-2" title="Tổng lượt truy cập">
                                    <Monitor size={16} className="text-primary-light" />
                                    <span className="text-xs font-bold text-white">{totalVisits.toLocaleString()}</span>
                                </div>
                            </div>

                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="px-5 py-2 text-gray-300 hover:text-white transition-all font-medium text-[15px] relative group"
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent transition-all duration-300 -translate-x-1/2 group-hover:w-1/2"></span>
                                </button>
                            ))}

                            <div className="ml-4 pl-4 border-l border-white/10 flex items-center gap-4">
                                {user ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowUserMenu(!showUserMenu)}
                                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 p-1 pr-3 rounded-full transition-all border border-white/10"
                                        >
                                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-accent/30" />
                                            <span className="text-sm font-bold text-white max-w-[100px] truncate">{user.name}</span>
                                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                        </button>

                                        {showUserMenu && (
                                            <div className="absolute top-full right-0 mt-3 w-48 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                                                <div className="p-4 border-b border-white/5">
                                                    <p className="text-xs text-gray-500 mb-1">Đăng nhập với</p>
                                                    <p className="text-sm font-bold text-white truncate">{user.email}</p>
                                                </div>
                                                <button
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-all text-sm"
                                                >
                                                    <UserIcon size={16} />
                                                    Tài khoản của tôi
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all text-sm font-bold"
                                                >
                                                    <LogOut size={16} />
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsAuthOpen(true)}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#0a0a0a] font-bold rounded-full hover:bg-accent transition-all active:scale-95 text-sm"
                                    >
                                        <UserIcon size={16} />
                                        <span>Đăng nhập</span>
                                    </button>
                                )}

                                <button
                                    onClick={() => scrollToSection('game')}
                                    className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95 flex items-center gap-2"
                                >
                                    <Rocket size={16} />
                                    <span>Thử thách</span>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-4">
                            {!user && (
                                <button
                                    onClick={() => setIsAuthOpen(true)}
                                    className="p-2 text-white hover:text-accent"
                                >
                                    <UserIcon size={24} />
                                </button>
                            )}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="bg-white/5 p-2 rounded-lg text-white hover:text-accent focus:outline-none"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 top-[70px] bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}>
                    <div className="flex flex-col p-6 space-y-4">
                        {user && (
                            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 mb-4">
                                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-accent" />
                                <div>
                                    <p className="text-lg font-serif font-bold text-white">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                                <button onClick={handleLogout} className="ml-auto p-2 text-red-400">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        )}
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-2xl font-serif text-white py-4 border-b border-white/5 flex items-center justify-between group"
                            >
                                <span>{item.name}</span>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                                    <ShieldCheck size={18} />
                                </div>
                            </button>
                        ))}
                        <button
                            onClick={() => scrollToSection('game')}
                            className="mt-8 bg-primary text-white py-5 rounded-2xl font-bold text-xl shadow-xl"
                        >
                            Bắt đầu chặng đua tri thức
                        </button>
                    </div>
                </div>
            </nav>

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onAuthSuccess={(userData) => setUser(userData)}
            />
        </>
    );
};

export default Navbar;
