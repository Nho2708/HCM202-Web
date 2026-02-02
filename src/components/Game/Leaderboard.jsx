import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown } from 'lucide-react';

const Leaderboard = ({ finalScore }) => {
    const [leaders, setLeaders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const res = await fetch('http://localhost:5001/api/leaderboard');
                if (res.ok) {
                    const data = await res.json();
                    setLeaders(data);
                }
            } catch (err) {
                console.error("Lỗi lấy bảng xếp hạng:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLeaders();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl mx-auto border-4 border-accent">
            <div className="text-center mb-8">
                <Trophy className="w-16 h-16 text-accent mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-bold text-primary font-serif">Bảng Xếp Hạng</h2>
                <p className="text-gray-600">Những nhà tư tưởng xuất sắc nhất</p>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center py-10">Đang tải bảng xếp hạng...</div>
                ) : leaders.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">Chưa có lượt chơi nào. Hãy là người đầu tiên!</div>
                ) : (
                    leaders.map((leader, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-4 rounded-lg ${index < 3 ? 'bg-gradient-to-r from-yellow-50 to-white border border-yellow-200 shadow-sm' : 'bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`
                                    flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg
                                    ${index === 0 ? 'bg-yellow-400 text-white shadow-md' : ''}
                                    ${index === 1 ? 'bg-gray-300 text-white' : ''}
                                    ${index === 2 ? 'bg-orange-400 text-white' : ''}
                                    ${index > 2 ? 'bg-gray-200 text-gray-600' : ''}
                                `}>
                                    {index === 0 ? <Crown size={20} /> : index + 1}
                                </div>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={leader.AvatarURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${leader.Email}`}
                                        alt={leader.FullName}
                                        className="w-10 h-10 rounded-full border border-gray-200"
                                    />
                                    <span className={`font-bold text-lg ${index < 3 ? 'text-primary' : 'text-gray-700'}`}>
                                        {leader.FullName}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-2xl text-accent">{leader.HighScore}</span>
                                <span className="text-xs text-gray-400 uppercase font-bold">điểm</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
