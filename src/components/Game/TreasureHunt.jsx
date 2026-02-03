import React, { useState, useEffect } from 'react';
import { Map, Compass, Trophy, ArrowRight, CheckCircle2, XCircle, Heart, Timer, Lock, Key, Sparkles, BookOpen } from 'lucide-react';
import { treasurePool } from '../../data/treasureData';

const TreasureHunt = ({ onBack }) => {
    // Game State
    const [gameState, setGameState] = useState('loading'); // loading, intro, select_set, playing, assemble, finished, gameover, unauthorized
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes total
    const [inventory, setInventory] = useState([]); // Collected clue words
    const [feedback, setFeedback] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    // Update shuffled options when currentStep or selectedQuest changes
    useEffect(() => {
        if (selectedQuest && selectedQuest.milestones[currentStep]) {
            setShuffledOptions(shuffleArray(selectedQuest.milestones[currentStep].options));
        }
    }, [currentStep, selectedQuest]);

    // Assembly State
    const [userQuote, setUserQuote] = useState("");
    const [scrambledInventory, setScrambledInventory] = useState([]);
    const [quoteAttempts, setQuoteAttempts] = useState(5);

    // Shuffle function
    const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    // Global Timer
    useEffect(() => {
        let timer;
        if (gameState === 'playing' || gameState === 'assemble') {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        triggerGameOver();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState]);

    // Auth Check
    useEffect(() => {
        const checkAuth = () => {
            const user = localStorage.getItem('user');
            if (!user) {
                setGameState('unauthorized');
            } else {
                setGameState('intro');
            }
        };

        checkAuth();

        // Listen for login success
        window.addEventListener('authSuccess', checkAuth);
        // Also listen for storage changes (e.g. from other tabs)
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('authSuccess', checkAuth);
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    // Handle scrambled inventory
    useEffect(() => {
        setScrambledInventory(shuffleArray(inventory));
    }, [inventory]);

    const handleSelectSet = (key) => {
        const pool = treasurePool[key];
        const randomQuest = pool[Math.floor(Math.random() * pool.length)];
        setSelectedQuest({ ...randomQuest, key });

        setGameState('playing');
        setScore(0);
        setTimeLeft(300);
        setLives(3);
        setInventory([]);
        setScrambledInventory([]);
        setQuoteAttempts(5);
        setCurrentStep(0);
    };

    const triggerGameOver = async () => {
        setGameState('gameover');
        await saveFinalScore(score);
    };

    const handleAnswer = (option) => {
        if (feedback) return;
        setSelectedOption(option);
        const data = selectedQuest.milestones[currentStep];

        if (option === data.answer) {
            setFeedback('correct');
            const timeBonus = Math.floor(timeLeft / 10);
            const moveScore = data.points + timeBonus;

            setTimeout(() => {
                setScore(prev => prev + moveScore);
                const newInventory = [...inventory, data.clueWord];
                setInventory(newInventory);
                setFeedback(null);
                setSelectedOption(null);

                if (currentStep < selectedQuest.milestones.length - 1) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    setGameState('assemble');
                }
            }, 1000);
        } else {
            setFeedback('wrong');
            setLives(prev => {
                const newLives = prev - 1;
                if (newLives <= 0) {
                    setTimeout(() => triggerGameOver(), 1000);
                }
                return newLives;
            });
            setTimeout(() => {
                setFeedback(null);
                setSelectedOption(null);
            }, 1000);
        }
    };

    const handleOpenTreasure = async () => {
        if (userQuote.toUpperCase().trim() === selectedQuest.finalQuote) {
            const finalScore = score + (lives * 500) + (timeLeft * 20) + (quoteAttempts * 100);
            setScore(finalScore);
            setGameState('finished');
            await saveFinalScore(finalScore);
        } else {
            setFeedback('wrong_quote');
            setQuoteAttempts(prev => {
                const newAttempts = prev - 1;
                if (newAttempts <= 0) {
                    triggerGameOver();
                }
                return newAttempts;
            });
            setTimeout(() => setFeedback(null), 1500);
        }
    };

    const saveFinalScore = async (finalScore) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) return;
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quiz/score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    score: finalScore,
                    totalQuestions: selectedQuest?.milestones.length || 6
                })
            });
        } catch (err) {
            console.error("Lỗi khi lưu điểm:", err);
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Screens
    const renderIntro = () => (
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in py-12">
            <div className="relative inline-block">
                <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Compass size={64} className="text-accent animate-spin-slow" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 text-accent animate-pulse" />
            </div>

            <div className="space-y-2">
                <h2 className="text-6xl font-serif font-bold text-accent drop-shadow-lg">Đi Tìm Kho Báu Tri Thức</h2>
                <p className="text-white/40 uppercase tracking-[0.3em] font-bold text-sm">Hành trình khám phá tư tưởng Hồ Chí Minh</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <Map className="text-accent" /> Thể lệ cuộc hành trình
                    </h3>
                    <ul className="space-y-4 text-white/70">
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center text-accent text-xs font-bold">1</div>
                            <p>Chọn 1 trong 6 Chương nội dung để bắt đầu khám phá.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center text-accent text-xs font-bold">2</div>
                            <p>Vượt qua 6 địa danh lịch sử bằng cách trả lời các câu đố kiến thức.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center text-accent text-xs font-bold">3</div>
                            <p>Mỗi câu trả lời đúng sẽ mở khóa một <span className="text-accent font-bold">Mảnh ghép gợi ý</span>.</p>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center text-accent text-xs font-bold">4</div>
                            <p>Cuối hành trình, hãy sắp xếp các gợi ý để giải mã <span className="text-accent font-bold">Mật mã kho báu</span> (Tối đa sai 5 lần).</p>
                        </li>
                    </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <Trophy className="text-accent" /> Thử thách & Điểm số
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
                            <div className="p-3 bg-red-500/20 rounded-xl">
                                <Heart className="text-red-500 fill-red-500" size={24} />
                            </div>
                            <div>
                                <div className="text-white font-bold">3 Sinh mệnh</div>
                                <div className="text-white/40 text-sm">Trả lời sai sẽ bị trừ mạng</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
                            <div className="p-3 bg-accent/20 rounded-xl">
                                <Timer className="text-accent" size={24} />
                            </div>
                            <div>
                                <div className="text-white font-bold">5 Phút (300 Giây)</div>
                                <div className="text-white/40 text-sm">Giới hạn thời gian cho toàn hành trình</div>
                            </div>
                        </div>
                        <div className="p-4 bg-accent/10 rounded-2xl border border-accent/20 italic text-white/60 text-sm">
                            Mẹo: Thời gian còn lại càng nhiều và số mạng bảo toàn càng cao, điểm thưởng cuối cùng càng lớn!
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button
                    onClick={() => setGameState('select_set')}
                    className="group relative px-16 py-6 bg-accent text-primary font-black text-2xl rounded-full shadow-[0_15px_40px_rgba(231,185,114,0.3)] hover:scale-105 transition-all active:scale-95 flex items-center gap-4 mx-auto"
                >
                    <Compass className="group-hover:rotate-180 transition-transform duration-700" />
                    BẮT ĐẦU CHINH PHỤC
                </button>
            </div>
        </div>
    );

    const renderSetSelection = () => (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in py-12">
            <div className="text-center">
                <h2 className="text-4xl font-serif font-bold text-accent mb-4">Các Kho Báu Đang Chờ Đợi</h2>
                <p className="text-white/60">Mỗi chương là một hành trình riêng biệt với những gợi ý và mật mã khác nhau.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(treasurePool).map((key) => {
                    const pool = treasurePool[key];
                    return (
                        <div
                            key={key}
                            onClick={() => handleSelectSet(key)}
                            className="group bg-white/5 border border-white/10 p-6 rounded-[2rem] cursor-pointer hover:border-accent/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10"></div>
                            <BookOpen className="text-accent mb-4" size={32} />
                            <h3 className="text-xl font-bold text-white mb-2">{pool[0].title.split(':')[0]}</h3>
                            <p className="text-white/40 text-sm italic">{pool.length} bộ đề ngẫu nhiên</p>
                            <div className="mt-6 flex items-center gap-2 text-accent font-bold text-sm">
                                Khám phá ngay <ArrowRight size={16} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="text-center">
                <button onClick={() => setGameState('intro')} className="text-white/40 hover:text-white underline">Quay lại</button>
            </div>
        </div>
    );

    const renderHeader = () => (
        <div className="flex justify-between items-center bg-black/40 p-5 rounded-2xl border border-white/10 backdrop-blur-xl mb-8">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Timer className={`w-6 h-6 ${timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-accent'}`} />
                    <span className="text-2xl font-mono font-bold text-white">{formatTime(timeLeft)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                    <span className="text-2xl font-mono font-bold text-white">{lives}</span>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="text-xs text-white/40 uppercase tracking-widest font-bold">{selectedQuest?.title}</div>
            </div>
            <div className="flex flex-col items-end">
                <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Điểm số</div>
                <div className="text-3xl font-black text-accent">{score}</div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const data = selectedQuest.milestones[currentStep];
        return (
            <div className="max-w-5xl mx-auto space-y-8 animate-fade-in w-full">
                {renderHeader()}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Map Visuals */}
                    <div className="lg:col-span-2 relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
                        <img
                            src={`https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1000`}
                            alt="Vietnam history"
                            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20">
                            <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-accent/30">
                                Trạm {currentStep + 1} / 6
                            </span>
                            <h3 className="text-4xl font-serif font-bold text-white mb-2 drop-shadow-xl">
                                {data.location}
                            </h3>
                            <p className="text-xl text-white/60 mb-8 italic">"{data.milestone}"</p>
                        </div>

                        {feedback && (
                            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
                                {feedback === 'correct' ? (
                                    <div className="text-center text-green-400">
                                        <CheckCircle2 size={100} className="mx-auto mb-4" />
                                        <h4 className="text-4xl font-black">CHÍNH XÁC!</h4>
                                        <p className="text-white/60 mt-2">Nhận được gợi ý: <span className="text-accent font-bold">"{data.clueWord}"</span></p>
                                    </div>
                                ) : (
                                    <div className="text-center text-red-500">
                                        <XCircle size={100} className="mx-auto mb-4" />
                                        <h4 className="text-4xl font-black">SAI RỒI!</h4>
                                        <p className="text-white/60 mt-2">Bạn bị mất 1 sinh mệnh.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Question Side */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl flex flex-col justify-center">
                        <h4 className="text-2xl font-serif font-bold text-gray-800 mb-8 leading-relaxed">
                            {data.riddle}
                        </h4>
                        <div className="space-y-3">
                            {shuffledOptions.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(opt)}
                                    disabled={feedback !== null}
                                    className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center gap-3 active:scale-95 ${selectedOption === opt
                                        ? (feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                                        : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-accent hover:bg-accent/5'
                                        }`}
                                >
                                    <span className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-sm font-black text-gray-400">
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Collected Clues */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                    <h5 className="text-white/40 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Key size={14} className="text-accent" /> Gợi ý đã thu thập (Đã xáo trộn)
                    </h5>
                    <div className="flex flex-wrap gap-3">
                        {scrambledInventory.map((word, i) => (
                            <span key={i} className="px-4 py-2 bg-accent/20 border border-accent/40 rounded-lg text-accent font-black animate-slide-up">
                                {word}
                            </span>
                        ))}
                        {Array.from({ length: 6 - inventory.length }).map((_, i) => (
                            <div key={i} className="w-20 h-10 border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center">
                                <Lock size={16} className="text-white/10" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderAssemble = () => (
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in py-12">
            {renderHeader()}
            <div className="bg-accent/10 border-2 border-accent/30 rounded-[3rem] p-12 backdrop-blur-lg relative overflow-hidden">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <Trophy size={80} className="text-accent mx-auto mb-6 drop-shadow-[0_0_20px_rgba(231,185,114,0.5)] animate-bounce" />
                    <h2 className="text-4xl font-serif font-bold text-white mb-4">Mật Mã Kho Báu</h2>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed">
                        Bạn đã hoàn thành thử thách của {selectedQuest?.title}. Hãy ghép các mảnh ghép lại (không dấu) để mở khóa kho báu cuối cùng.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {scrambledInventory.map((word, i) => (
                            <div key={i} className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white font-black text-xl">
                                {word}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-center gap-2 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Key
                                    key={i}
                                    size={20}
                                    className={`${i < quoteAttempts ? 'text-accent' : 'text-white/10'}`}
                                    fill={i < quoteAttempts ? 'currentColor' : 'none'}
                                />
                            ))}
                        </div>
                        <p className="text-accent text-sm font-bold mb-4 uppercase tracking-widest">
                            Bạn còn {quoteAttempts} lượt thử mật mã
                        </p>
                        <input
                            type="text"
                            value={userQuote}
                            onChange={(e) => setUserQuote(e.target.value)}
                            placeholder="Nhập mật mã (viết hoa không dấu)..."
                            className={`w-full p-6 bg-black/40 border-4 rounded-3xl text-3xl font-black text-center text-accent tracking-widest focus:outline-none transition-all ${feedback === 'wrong_quote' ? 'border-red-500 animate-shake' : 'border-accent/40 focus:border-accent'}`}
                        />
                        {feedback === 'wrong_quote' && <p className="text-red-400 font-bold">Mật mã chưa chính xác! Hãy kiểm tra lại các gợi ý.</p>}

                        <button
                            onClick={handleOpenTreasure}
                            className="w-full py-6 bg-accent text-primary font-black text-3xl rounded-3xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-4"
                        >
                            <Key size={32} /> MỞ KHO BÁU
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderFinished = () => (
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in py-12">
            <div className="relative inline-block scale-125 mb-12">
                <Trophy size={100} className="text-accent drop-shadow-[0_0_50px_rgba(231,185,114,0.8)]" />
                <Sparkles className="absolute -inset-4 text-accent animate-ping" />
            </div>

            <h2 className="text-6xl font-serif font-bold text-accent italic">CHÚC MỪNG CHIẾN THẮNG!</h2>

            <div className="bg-white rounded-[3rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary via-accent to-primary"></div>
                <div className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">Hành trình: {selectedQuest?.title}</div>
                <div className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">Tổng điểm tích lũy</div>
                <div className="text-9xl font-black text-primary mb-6 tracking-tighter">{score}</div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="text-xs text-gray-400 font-bold uppercase">Thời gian còn lại</div>
                        <div className="text-2xl font-black text-gray-800">{formatTime(timeLeft)}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="text-xs text-gray-400 font-bold uppercase">Sinh mệnh bảo toàn</div>
                        <div className="text-2xl font-black text-gray-800">{lives} / 3</div>
                    </div>
                </div>

                <div className="p-6 bg-accent/5 rounded-3xl border-2 border-accent/20 italic text-xl text-primary font-serif font-bold">
                    "{selectedQuest?.finalQuote}"
                </div>
            </div>

            <div className="flex justify-center gap-6">
                <button onClick={() => setGameState('select_set')} className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/20 transition-all">
                    Đổi Hành Trình
                </button>
                <button
                    onClick={() => onBack()}
                    className="px-10 py-4 bg-accent text-primary font-bold rounded-full shadow-xl hover:scale-105 transition-all"
                >
                    Về Trang Chủ
                </button>
            </div>
        </div>
    );

    const renderGameOver = () => (
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in py-12">
            <XCircle size={100} className="text-red-500 mx-auto" />
            <h2 className="text-5xl font-serif font-bold text-white">Hành Trình Tạm Dừng</h2>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
                <div className="text-xs text-white/40 uppercase font-black mb-2">Điểm số đã ghi nhận</div>
                <div className="text-5xl font-black text-accent">{score}</div>
            </div>
            <p className="text-xl text-white/60">
                {timeLeft <= 0 ? "Hết thời gian thử thách!" : "Bạn đã sử dụng hết lượt thử."}
                <br />Điểm số của bạn đã được lưu lại hệ thống.
            </p>
            <div className="flex justify-center gap-4">
                <button onClick={() => setGameState('select_set')} className="px-10 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20">Chọn Đề Khác</button>
                <button
                    onClick={() => handleSelectSet(selectedQuest?.key || 'chapter1')}
                    className="px-10 py-4 bg-accent text-primary font-bold rounded-full shadow-lg hover:scale-105 transition-all"
                >
                    Thử Lại Ngay
                </button>
            </div>
        </div>
    );

    const renderUnauthorized = () => (
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in py-12">
            <div className="relative inline-block">
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                    <Lock size={48} className="text-red-500" />
                </div>
            </div>
            <h2 className="text-4xl font-serif font-bold text-white leading-tight">Vui lòng đăng nhập để tham gia hành trình</h2>
            <p className="text-white/60 text-lg">
                Để ghi lại điểm số và tham gia bảng xếp hạng kho báu tri thức, bạn cần có một tài khoản trên hệ thống.
            </p>
            <div className="flex flex-col gap-4 items-center">
                <button
                    onClick={() => window.dispatchEvent(new Event('openAuthModal'))}
                    className="px-10 py-4 bg-accent text-primary font-black text-xl rounded-full shadow-xl hover:scale-105 transition-all"
                >
                    ĐĂNG NHẬP NGAY
                </button>
                <button
                    onClick={onBack}
                    className="text-white/40 hover:text-white underline"
                >
                    Quay lại trang chủ
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-[700px] flex items-center justify-center py-10 px-4">
            {gameState === 'loading' && <div className="text-accent animate-pulse font-black italic">Đang tải hành trình...</div>}
            {gameState === 'unauthorized' && renderUnauthorized()}
            {gameState === 'intro' && renderIntro()}
            {gameState === 'select_set' && renderSetSelection()}
            {gameState === 'playing' && renderPlaying()}
            {gameState === 'assemble' && renderAssemble()}
            {gameState === 'finished' && renderFinished()}
            {gameState === 'gameover' && renderGameOver()}
        </div>
    );
};

export default TreasureHunt;
