
import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Github, Chrome, ArrowRight, ShieldCheck } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Google Login Logic using @react-oauth/google
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            try {
                // Fetch user info from Google using the access token
                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const userInfo = await userInfoRes.json();

                // Send user info to our backend
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")}/api/auth/google`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': '69420'
                    },
                    body: JSON.stringify({
                        name: userInfo.name,
                        email: userInfo.email,
                        googleId: userInfo.sub,
                        avatar: userInfo.picture
                    })
                });

                if (res.ok) {
                    const userData = await res.json();
                    localStorage.setItem('user', JSON.stringify(userData));
                    window.dispatchEvent(new CustomEvent('authSuccess', { detail: userData }));
                    onAuthSuccess(userData);
                    onClose();
                } else {
                    throw new Error('Backend registration failed');
                }
            } catch (error) {
                console.error('Google login error:', error);
                alert('Đăng nhập Google thất bại. Vui lòng thử lại.');
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => {
            console.error('Login Failed');
            alert('Không thể kết nối với Google. Vui lòng kiểm tra Client ID.');
        },
    });

    const handleGoogleClick = () => {
        login();
    };

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
        const payload = isLogin
            ? { email: formData.email, password: formData.password }
            : { name: formData.name, email: formData.email, password: formData.password };

        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");
            const res = await fetch(`${apiBaseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': '69420'
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                if (isLogin) {
                    const userData = await res.json();
                    localStorage.setItem('user', JSON.stringify(userData));
                    window.dispatchEvent(new CustomEvent('authSuccess', { detail: userData }));
                    onAuthSuccess(userData);
                    onClose();
                } else {
                    alert('Đăng ký thành công! Hãy đăng nhập.');
                    setIsLogin(true);
                }
            } else {
                const err = await res.text();
                alert(err || 'Đã có lỗi xảy ra');
            }
        } catch (err) {
            alert('Không thể kết nối tới Server. Hãy đảm bảo Backend đang chạy.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up border border-white/20">
                {/* Header Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                >
                    <X size={20} />
                </button>

                <div className="p-8 md:p-10 pt-12">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 text-primary">
                            <ShieldCheck size={32} />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-gray-900">
                            {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
                        </h2>
                        <p className="text-gray-500 mt-2">
                            {isLogin ? 'Đăng nhập để lưu tiến độ học tập của bạn' : 'Tham gia cùng cộng đồng học tập HCM tri thức'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                placeholder="Địa chỉ email"
                                required
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Mật khẩu"
                                required
                                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {isLogin && (
                            <div className="flex justify-end">
                                <button type="button" className="text-sm font-medium text-primary hover:underline">
                                    Quên mật khẩu?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-light transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-4 text-gray-400">Hoặc tiếp tục bằng</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={handleGoogleClick}
                                className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all active:scale-95 group"
                            >
                                <Chrome size={18} className="text-red-500 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-bold text-gray-700">Tiếp tục với Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                <Github size={18} className="text-gray-900" />
                                <span className="text-sm font-bold text-gray-700">Github</span>
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-gray-500 text-sm">
                        {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-1 font-bold text-primary hover:underline"
                        >
                            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
