import React from 'react';
import { Facebook, Instagram, Twitter, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-accent border border-accent/20">HCM</div>
                            <h2 className="text-2xl font-serif font-bold text-white tracking-tight">Tư Tưởng Hồ Chí Minh</h2>
                        </div>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            Nền tảng học hỏi và khám phá hệ thống quan điểm toàn diện, sâu sắc của Chủ tịch Hồ Chí Minh về cách mạng Việt Nam.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/10">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-accent">Liên Kết Nhanh</h3>
                        <ul className="space-y-4 text-gray-400">
                            {['Trang chủ', 'Bài học', 'Hành trình Game', 'Chuyên gia tư tưởng'].map((item, i) => (
                                <li key={i}>
                                    <a href={`#${['home', 'content', 'game', 'qa'][i]}`} className="hover:text-white transition-colors flex items-center gap-2">
                                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-accent">Tài Nguyên</h3>
                        <ul className="space-y-4 text-gray-400">
                            {['Bảo tàng Hồ Chí Minh', 'Di tích K9 - Đá Chông', 'Khu di tích Kim Liên', 'Giảng viên: PhD. S. Ngô Khánh Duy'].map((item, i) => (
                                <li key={i}>
                                    <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                        {item}
                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} Tư Tưởng Hồ Chí Minh.
                        </p>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <a href="#" className="hover:text-white">Điều khoản</a>
                        <a href="#" className="hover:text-white">Bảo mật</a>
                        <a href="#" className="hover:text-white">Liên hệ</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
