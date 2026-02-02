import React from 'react';
import { Rocket, Code, Database, Cpu, BookOpen, Globe, ShieldCheck } from 'lucide-react';

const AboutProject = () => {
    const techStack = [
        { name: 'React & Vite', desc: 'Frontend Framework & Build Tool' },
        { name: 'Tailwind CSS', desc: 'Styling & Modern UI Design' },
        { name: 'Node.js & Express', desc: 'Backend Logic & REST API' },
        { name: 'SQL Server', desc: 'Robust Database Management' },
        { name: 'Socket.io', desc: 'Real-time Online Monitoring' },
        { name: 'Google Gemini AI', desc: 'AI Thinking Expert Integration' },
    ];

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                            Về Dự Án Này
                        </h2>
                        <div className="w-24 h-1 bg-accent mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <Rocket size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Lý Do Xây Dựng</h3>
                                    <p className="text-gray-600 leading-relaxed text-[15px]">
                                        Dự án được ra đời với mục tiêu hiện đại hóa việc tiếp cận môn họcTư tưởng Hồ Chí Minh.
                                        Chúng tôi tin rằng việc kết hợp công nghệ số và giáo dục chính trị sẽ giúp các bạn sinh viên
                                        dễ dàng tiếp thu, tra cứu và hiểu sâu sắc hơn về những giá trị di sản quý báu của dân tộc
                                        trong thời đại 4.0.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Nguồn Tài Nguyên</h3>
                                    <p className="text-gray-600 leading-relaxed text-[15px]">
                                        Nội dung được trích xuất và tổng hợp từ giáo trình môn học Tư tưởng Hồ Chí Minh thuộc bản quyền của     <a href="https://drive.google.com/drive/folders/1bRmFwuB-QqoqcKRJOOrFvK9V1RlhfgN-" className="text-primary hover:underline">Giảng viên: PhD. S. Ngô Khánh Duy</a>.
                                        Các tư liệu lịch sử được tham khảo từ các nguồn chính thống <a href="https://tapchicongsan.org.vn/web/guest/chinh-tri-xay-dung-dang/-/2018/929602/tu-tuong-ho-chi-minh---nen-tang-xay-dung-niem-tin-vao-thang-loi-cua-su-nghiep-doi-moi-do-dang-cong-san-viet-nam-lanh-dao.aspx" className="text-primary hover:underline">Tạp chí cộng sản</a> ,
                                        đảm bảo tính chính xác và tôn trọng lịch sử.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                                    <Cpu size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Ứng Dụng AI</h3>
                                    <p className="text-gray-600 leading-relaxed text-[15px]">
                                        AI được tích hợp vào "Chuyên gia tư tưởng".
                                        Web sử dụng AI để giải đáp các thắc mắc cơ bản nằm trong phạm vi kiến thức môn học, phân tích dữ liệu lịch sử.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-[3rem] p-8 md:p-12 border border-gray-100">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Code className="text-primary" />
                            Hệ Sinh Thái Công Nghệ
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {techStack.map((tech, idx) => (
                                <div key={idx} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-primary/30 transition-colors">
                                    <div className="font-bold text-gray-900 text-sm mb-1">{tech.name}</div>
                                    <div className="text-gray-500 text-xs">{tech.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutProject;
