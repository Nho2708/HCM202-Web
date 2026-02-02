import React from 'react';
import { BookOpen, History, Users, Star, Heart, Shield } from 'lucide-react';
import img62 from '../assets/6.2.png';

export const syllabusData = [
    {
        id: 1,
        title: "Chương 1: Khái niệm, đối tượng, phương pháp nghiên cứu và ý nghĩa học tập",
        icon: <BookOpen className="w-5 h-5" />,
        summary: "Nghiên cứu định nghĩa Tư tưởng Hồ Chí Minh, đối tượng, phương pháp và giá trị của việc học tập môn học.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200",
        sections: [
            {
                id: '1.1',
                title: 'Khái niệm Tư tưởng Hồ Chí Minh',
                image: "https://images.unsplash.com/photo-1457369804593-502d036efdb0?auto=format&fit=crop&q=80&w=800",
                content: 'Tư tưởng Hồ Chí Minh là một hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam, là kết quả của sự vận dụng và phát triển sáng tạo chủ nghĩa Mác - Lênin vào điều kiện cụ thể của nước ta, kế thừa và phát triển các giá trị truyền thống tốt đẹp của dân tộc, tiếp thu tinh hoa văn hóa nhân loại. Đây là tài sản tinh thần vô cùng to lớn và quý giá của Đảng và dân tộc ta, mãi mãi soi đường cho sự nghiệp cách mạng của nhân dân ta giành thắng lợi.'
            },
            {
                id: '1.2',
                title: 'Đối tượng nghiên cứu',
                image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc53e?auto=format&fit=crop&q=80&w=800",
                content: 'Tư tưởng Hồ Chí Minh nghiên cứu về:\n• Toàn bộ những quan điểm của Hồ Chí Minh thể hiện trong di sản của Người\n• Những vấn đề lý luận và thực tiễn được rút ra từ cuộc đời hoạt động rất phong phú ở cả trong nước và trên thế giới\n• Quá trình hệ thống quan điểm của Hồ Chí Minh vận động trong thực tiễn'
            },
            {
                id: '1.3',
                title: 'Phương pháp nghiên cứu',
                image: "https://images.unsplash.com/photo-1516667791230-20f18d2c9c7d?auto=format&fit=crop&q=80&w=800",
                content: 'Phương pháp luận:\n• Thống nhất tính đảng và tính khoa học\n• Thống nhất lý luận và thực tiễn\n• Quan điểm toàn diện và hệ thống\n• Quan điểm kế thừa và phát triển\n• Quan điểm lịch sử - cụ thể\n\nCác phương pháp cụ thể:\n• Phương pháp lôgic, phương pháp lịch sử và sự kết hợp\n• Phương pháp phân tích văn bản kết hợp với nghiên cứu hoạt động thực tiễn\n• Phương pháp chuyên ngành, liên ngành'
            },
            {
                id: '1.4',
                title: 'Ý nghĩa của việc học tập',
                image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
                content: 'Nâng cao năng lực tư duy lý luận: Tư tưởng Hồ Chí Minh là những phương hướng về lý luận và thực tiễn hành động cho những người Việt Nam yêu nước.\n\nGiáo dục đạo đức cách mạng: Sinh viên sẽ có điều kiện tốt để thực hành đạo đức cách mạng, chống chủ nghĩa cá nhân, sống có ích cho xã hội, nâng cao lòng tự hào về đất nước.\n\nXây dựng phong cách công tác: Vận dụng xây dựng phong cách tư duy, phong cách diễn đạt, phong cách làm việc và phong cách ứng xử.'
            }
        ]
    },
    {
        id: 2,
        title: "Chương 2: Cơ sở, quá trình hình thành và phát triển Tư tưởng Hồ Chí Minh",
        icon: <History className="w-5 h-5" />,
        summary: "Nghiên cứu các cơ sở thực tiễn, lý luận và các giai đoạn phát triển quan trọng trong cuộc đời Bác.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Portrait_dated_1922_of_Ho_Chi_Minh.jpg",
        sections: [
            {
                id: '2.1',
                title: 'Cơ sở thực tiễn và lý luận',
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/L%C3%A0ng_Sen_01.jpg/1280px-L%C3%A0ng_Sen_01.jpg",
                content: 'Cơ sở thực tiễn: Bối cảnh Việt Nam và thế giới cuối thế kỷ XIX đầu XX, với sự phát triển của chủ nghĩa đế quốc, Cách mạng Tháng Mười Nga năm 1917, và tình hình nước ta bị thực dân Pháp chiếm đóng.\n\nCơ sở lý luận:\n• Giá trị truyền thống dân tộc Việt Nam: Yêu nước là cốt lõi\n• Tinh hoa văn hóa phương Đông: Nho giáo, Phật giáo, Lão giáo\n• Tinh hoa văn hóa phương Tây: Tự do - Bình đẳng - Bác ái\n• Chủ nghĩa Mác-Lênin: Là cơ sở quyết định'
            },
            {
                id: '2.2',
                title: 'Quá trình hình thành tư tưởng qua các giai đoạn',
                image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Ho_Chi_Minh_1946.jpg",
                content: 'Giai đoạn 1 (Trước 1911): Hình thành tư tưởng yêu nước từ gia đình nhà nho yêu nước, nơi có truyền thống chống ngoại xâm.\n\nGiai đoạn 2 (1911-1920): Tìm thấy con đường cứu nước qua Hội nghị Versailles, Luận cương của Lênin về vấn đề dân tộc và thuộc địa.\n\nGiai đoạn 3 (1921-1930): Hình thành cơ bản tư tưởng, tham gia Ban nghiên cứu thuộc địa, Hội liên hiệp thuộc địa, sáng lập Đảng Cộng sản Việt Nam.\n\nGiai đoạn 4 (1930-1945): Kiên trì giữ vững lập trường cách mạng, vượt qua những chỉ trích và khuynh hướng sai lầm.\n\nGiai đoạn 5 (1945-1969): Phát triển và hoàn thiện tư tưởng về kháng chiến và kiến quốc.'
            },
            {
                id: '2.3',
                title: 'Giá trị Tư tưởng Hồ Chí Minh',
                image: "https://images.unsplash.com/photo-1555930067-9d7373f8d752?auto=format&fit=crop&q=80&w=800",
                content: 'Đối với cách mạng Việt Nam:\n• Tìm ra con đường cứu nước cứu dân thắng lợi\n• Sáng lập, lãnh đạo và rèn luyện Đảng Cộng sản Việt Nam\n• Đưa cách mạng giải phóng dân tộc đến thắng lợi\n• Bảo vệ thành quả cách mạng\n\nĐối với thế giới:\n• Góp phần mở ra con đường giải phóng dân tộc cho các dân tộc thuộc địa\n• Là tài sản tinh thần quý báu của phong trào cộng sản quốc tế\n• Biểu tượng cao đẹp của các giá trị về tư tưởng, lương tri và phẩm giá'
            }
        ]
    },
    {
        id: 3,
        title: "Chương 3: Tư tưởng Hồ Chí Minh về Độc lập dân tộc và Chủ nghĩa xã hội",
        icon: <Users className="w-5 h-5" />,
        summary: "Vấn đề cốt lõi của cách mạng Việt Nam: Độc lập dân tộc gắn liền với Chủ nghĩa xã hội.",
        image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&q=80&w=1200",
        sections: [
            {
                id: '3.1',
                title: 'Không có gì quý hơn độc lập, tự do',
                image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Ho_Chi_Min_reading_the_Declaration_of_Independence.jpg",
                content: '"Không có gì quý hơn độc lập, tự do" là tư tưởng, lẽ sống, là học thuyết của Hồ Chí Minh.\n\nĐộc lập dân tộc là quyền thiêng liêng, bất khả xâm phạm của tất cả các dân tộc.\n\nĐộc lập dân tộc phải gắn liền với: Tự do; Cơm no, áo ấm; Hạnh phúc của nhân dân.\n\nĐộc lập dân tộc phải là: Thật sự; Hoàn toàn; Triệt để trên tất cả các lĩnh vực.\n\nĐộc lập dân tộc gắn liền với thống nhất và toàn vẹn lãnh thổ: "Nước Việt Nam là một, dân tộc Việt Nam là một".'
            },
            {
                id: '3.2',
                title: 'Chủ nghĩa xã hội - Mục tiêu tiến lên',
                image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800",
                content: 'Mục đích của cách mạng Việt Nam là tiến đến chủ nghĩa xã hội rồi chủ nghĩa cộng sản.\n\nChủ nghĩa xã hội là giai đoạn đầu tiên của chủ nghĩa cộng sản.\n\nĐặc trưng của xã hội xã hội chủ nghĩa:\n• Về chính trị: Do nhân dân làm chủ, dân chủ xã hội chủ nghĩa\n• Về kinh tế: Nền kinh tế phát triển cao, công hữu về tư liệu sản xuất\n• Về văn hóa, đạo đức: Có trình độ phát triển cao, bảo đảm công bằng hợp lý\n• Về con người: Con người sống ấm no, tự do, hạnh phúc\n\nMục tiêu cơ bản: Dân giàu, nước mạnh, xã hội dân chủ, công bằng, văn minh.'
            },
            {
                id: '3.3',
                title: 'Mối quan hệ giữa Độc lập dân tộc và Chủ nghĩa xã hội',
                image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=800",
                content: 'Phương hướng chiến lược: "Làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản".\n\nĐộc lập dân tộc là tiền đề, điều kiện tiên quyết để xây dựng chủ nghĩa xã hội thắng lợi.\n\nChủ nghĩa xã hội là điều kiện để bảo đảm nền độc lập dân tộc vững chắc, lâu dài.\n\nCả hai phải được thực hiện trên nền tảng chủ nghĩa Mác-Lênin và tư tưởng Hồ Chí Minh.'
            }
        ]
    },
    {
        id: 4,
        title: "Chương 4: Tư tưởng về Đảng Cộng sản và Nhà nước của nhân dân",
        icon: <Star className="w-5 h-5" />,
        summary: "Xây dựng Đảng cầm quyền trong sạch và Nhà nước pháp quyền xã hội chủ nghĩa.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
        sections: [
            {
                id: '4.1',
                title: 'Đảng Cộng sản Việt Nam - Lãnh đạo cách mạng',
                image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=800",
                content: 'Đảng CSVN là sản phẩm của sự kết hợp chủ nghĩa Mác-Lênin với phong trào công nhân và phong trào yêu nước Việt Nam.\n\nĐảng ta vừa là Đảng của giai cấp công nhân, vừa là Đảng của dân tộc Việt Nam.\n\nĐảng phải lấy chủ nghĩa Mác-Lênin làm cốt, tức là:\n• Nắm vững lập trường, quan điểm và phương pháp của chủ nghĩa Mác-Lênin\n• Vận dụng sáng tạo vào hoàn cảnh cụ thể của Việt Nam\n\nĐảng phải được xây dựng theo các nguyên tắc:\n• Tập trung dân chủ: Dân chủ để đi đến tập trung\n• Tập thể lãnh đạo - Cá nhân phụ trách\n• Tự phê bình và phê bình: Như rửa mặt hàng ngày\n• Kỷ luật nghiêm minh và tự giác\n• Đoàn kết thống nhất'
            },
            {
                id: '4.2',
                title: 'Nhà nước - Của dân, do dân, vì dân',
                image: "https://images.unsplash.com/photo-1589262804704-c5aa9e64a025?auto=format&fit=crop&q=80&w=800",
                content: 'Nhà nước Việt Nam là nhà nước dân chủ nhân dân, do giai cấp công nhân lãnh đạo, dựa trên liên minh công-nông.\n\nNhà nước của nhân dân: Quyền lực thuộc về nhân dân, nhân dân là chủ.\n\nNhà nước do nhân dân:\n• Nhân dân làm chủ thông qua hoạt động của Nhà nước\n• Đảng lãnh đạo bằng đường lối, chủ trương, pháp luật\n• Thực hiện dân chủ đại diện và dân chủ trực tiếp\n\nNhà nước vì nhân dân:\n• Lấy lợi ích nhân dân làm mục tiêu tối cao\n• Tất cả đường lối, chính sách vì hạnh phúc của nhân dân\n• Phải là nhà nước pháp quyền, thượng tôn pháp luật\n• Chống tham ô, lãng phí, quan liêu'
            },
            {
                id: '4.3',
                title: 'Xây dựng Đảng và Nhà nước trong sạch vững mạnh',
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
                content: 'Đảng phải là "đạo đức, là văn minh": Các cán bộ, đảng viên phải tu dưỡng đạo đức, giữ gìn trong sạch.\n\nĐảng phải thường xuyên tự chỉnh đốn, tự đổi mới, tự phê bình các biểu hiện suy thoái.\n\nPhòng chống tham nhũng, lãng phí, quan liêu hách dịch, tư túng, chia rẽ, kiêu ngạo.\n\nNhà nước phải hoạt động trong khuôn khổ Hiến pháp và pháp luật.\n\nChi tiết cán bộ, công chức phải có phẩm chất đạo đức và năng lực chuyên môn.'
            }
        ]
    },
    {
        id: 5,
        title: "Chương 5: Tư tưởng về Đại đoàn kết dân tộc và Đoàn kết quốc tế",
        icon: <Heart className="w-5 h-5" />,
        summary: "Chiến lược đoàn kết để tạo nên sức mạnh tổng hợp thắng lợi.",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200",
        sections: [
            {
                id: '5.1',
                title: 'Đại đoàn kết toàn dân tộc - Sức mạnh vô địch',
                image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
                content: '"Đoàn kết, đoàn kết, đại đoàn kết - Thành công, thành công, đại thành công".\n\nĐại đoàn kết dân tộc là chiến lược xuyên suốt, vấn đề cốt lõi của cách mạng Việt Nam.\n\nChủ thể: Toàn thể nhân dân Việt Nam, không phân biệt dân tộc, tôn giáo.\n\nNền tảng: Liên minh công-nông-trí dưới sự lãnh đạo của Đảng Cộng sản.\n\nĐiều kiện thực hiện:\n• Lấy lợi ích chung làm điểm quy tụ\n• Kế thừa truyền thống yêu nước, nhân nghĩa, đoàn kết\n• Có lòng khoan dung, độ lượng với con người\n• Có niềm tin vào nhân dân\n\nHình thức: Mặt trận dân tộc thống nhất, hoạt động theo nguyên tắc hiệp thương dân chủ.'
            },
            {
                id: '5.2',
                title: 'Đoàn kết quốc tế - Kết hợp sức mạnh',
                image: "https://images.unsplash.com/photo-1521791136064-7986c2959d1c?auto=format&fit=crop&q=80&w=800",
                content: 'Cách mạng Việt Nam là một bộ phận không thể tách rời của cách mạng thế giới.\n\nCần kết hợp sức mạnh dân tộc với sức mạnh thời đại:\n• Sức mạnh dân tộc: Ý chí tự lực tự cường, lòng yêu nước, phương pháp cách mạng thích hợp\n• Sức mạnh thời đại: Phong trào giải phóng dân tộc, phong trào giai cấp công nhân, sự phát triển khoa học kỹ thuật\n\nĐoàn kết trên cơ sở:\n• Thống nhất mục tiêu và lợi ích\n• Có lý có tình\n• Cầu đồng tồn dị\n\nChính sách ngoại giao: "Làm bạn với tất cả mọi nước dân chủ, không gây thù oán với một ai".\n\nĐoàn kết với: Phong trào cộng sản và công nhân thế giới; Phong trào đấu tranh dân tộc; Các lực lượng tiến bộ trên thế giới.'
            }
        ]
    },
    {
        id: 6,
        title: "Chương 6: Tư tưởng về Văn hóa, Đạo đức và Con người",
        icon: <Shield className="w-5 h-5" />,
        summary: "Nghiên cứu về nền tảng tinh thần của xã hội và chiến lược xây dựng con người mới.",
        image: "https://images.unsplash.com/photo-1506076840746-cd0884698543?auto=format&fit=crop&q=80&w=1200",
        sections: [
            {
                id: '6.1',
                title: 'Văn hóa - Mục tiêu và động lực',
                image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800",
                content: 'Văn hóa là sự tổng hợp của mọi phương thức sinh hoạt mà loài người sáng tạo để thích ứng nhu cầu đời sống.\n\nVăn hóa là mục tiêu của cách mạng: Mọi đường lối, chủ trương đều nhằm mục tiêu xây dựng một nền văn hóa tốt đẹp.\n\nVăn hóa là động lực thúc đẩy cách mạng: Nước ta cần có\n• Văn hóa chính trị\n• Văn hóa đạo đức\n• Văn hóa văn nghệ\n• Văn hóa pháp luật\n• Văn hóa giáo dục\n\nVăn hóa là một mặt trận đấu tranh: Cuộc đấu tranh cách mạng trên lĩnh vực văn hóa - tư tưởng.\n\nXây dựng nền văn hóa mới có:\n• Tính dân tộc: Giữ gìn bản sắc văn hóa dân tộc Việt Nam\n• Tính khoa học: Tiếp thu tinh hoa văn hóa nhân loại\n• Tính đại chúng: Phục vụ nhân dân lao động'
            },
            {
                id: '6.2',
                title: 'Đạo đức - Gốc của cây',
                image: img62,
                content: '"Như gốc của cây, như ngọn nguồn của sông suối". Đạo đức cách mạng là nền tảng của con người cách mạng.\n\nCác chuẩn mực đạo đức cách mạng:\n• Trung với nước, hiếu với dân\n• Cần, kiệm, liêm, chính, chí công vô tư\n• Thương yêu con người, sống có tình có nghĩa\n• Tinh thần quốc tế trong sáng\n\nNguyên tắc xây dựng đạo đức:\n• Nói đi đôi với làm, phải nêu gương về đạo đức\n• Xây đi đôi với chống: Xây dựng đạo đức mới và chống những tệ nạn cũ\n• Phải tu dưỡng đạo đức suốt đời: Như rửa mặt hàng ngày\n\nĐạo đức là bản chất, năng lực là hình thức. Phải "vừa hồng vừa chuyên": Đức là gốc, tài là nhánh.'
            },
            {
                id: '6.3',
                title: 'Con người - Vốn quý nhất',
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
                content: '"Muốn xây dựng chủ nghĩa xã hội, trước hết cần có những con người xã hội chủ nghĩa".\n\nCon người là mục tiêu của cách mạng: Mọi hoạt động vì hạnh phúc của con người, giải phóng con người.\n\nCon người là chủ thể phát triển: Nhân dân là người sáng tạo lịch sử, động lực của cách mạng.\n\nXây dựng con người toàn diện (Đức - Trí - Thể - Mỹ):\n• Có ý thức làm chủ, tinh thần tập thể xã hội chủ nghĩa\n• Cần kiệm xây dựng đất nước, hăng hái bảo vệ Tổ quốc\n• Có lòng yêu nước nồng nàn, tinh thần quốc tế trong sáng\n• Có phương pháp làm việc khoa học, phong cách quần chúng, dân chủ\n\nPhương pháp xây dựng con người:\n• Giáo dục có vị trí quan trọng: "Hiền, giữ của con người không phải là tính sẵn, phần nhiều do giáo dục mà nên"\n• Nêu gương, nhất là người đứng đầu\n• Tự tu dưỡng, tự rèn luyện\n• Phát huy vai trò của tổ chức Đảng, Nhà nước, đoàn thể'
            }
        ]
    }
];
