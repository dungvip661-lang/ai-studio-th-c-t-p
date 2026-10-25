import { Member, FamilyEvent, HistoricalSource, ClanCommitteeMember } from '../types/family';

export const INITIAL_FAMILY_DATA: Member[] = [
  {
    id: 1,
    name: "Nguyễn Văn Căn",
    alias: "Thủy Tổ Căn Phủ",
    gen: 1,
    gender: "Nam",
    birth: "1895",
    death: "1968",
    isAlive: false,
    spouse: "Trần Thị Mùi (1898 - 1972)",
    role: "Khởi Tổ Dòng Họ",
    branch: "Gốc Tổ",
    parentId: undefined,
    burial: "Khu lăng mộ tổ Thôn Đoài, Xã Tiên Phương, Huyện Chương Mỹ, Hà Nội",
    currentAddress: "Cố hương Thôn Đoài, Chương Mỹ",
    bio: "Khởi tổ dòng họ, người có công khai hoang lập ấp, gìn giữ gia phong lễ giáo, một đời đức độ lưu truyền hậu thế. Cụ đã tạo dựng cơ nghiệp và đặt nền móng cho nếp nhà hiếu học của con cháu mai sau.",
    children: [2, 3]
  },
  {
    id: 2,
    name: "Nguyễn Văn Đức",
    alias: "Đức Cả",
    gen: 2,
    gender: "Nam",
    birth: "1922",
    death: "1994",
    isAlive: false,
    spouse: "Lê Thị Lan (1925 - 2005)",
    role: "Trưởng Chi 1",
    branch: "Chi Trưởng (Chi 1)",
    parentId: 1,
    burial: "Nghĩa trang xứ Đồng Mạ, Chương Mỹ, Hà Nội",
    currentAddress: "Thôn Đoài, Tiên Phương",
    bio: "Trưởng nam của Thủy Tổ. Tham gia kháng chiến chống Pháp với tinh thần kiên cường, sau hòa bình về quê trông nom từ đường, duy trì việc thờ phụng tổ tiên và chép lại gia phả bản chữ Quốc ngữ.",
    children: [4, 5]
  },
  {
    id: 3,
    name: "Nguyễn Văn Thịnh",
    alias: "Thịnh Nhị",
    gen: 2,
    gender: "Nam",
    birth: "1927",
    death: "2010",
    isAlive: false,
    spouse: "Hoàng Thị Mai (1930 - 2018)",
    role: "Trưởng Chi 2",
    branch: "Chi Thứ (Chi 2)",
    parentId: 1,
    burial: "Nghĩa trang dòng họ Quê nhà",
    currentAddress: "Hà Đông, Hà Nội",
    bio: "Nhà giáo mẫu mực, cựu cán bộ ngành giáo dục. Cụ có công lớn vận động thành lập Quỹ khuyến học dòng họ đầu tiên vào năm 1990, chăm lo việc học hành cho nhiều thế hệ con cháu đỗ đạt.",
    children: [6, 7]
  },
  {
    id: 4,
    name: "Nguyễn Quang Hải",
    alias: "Hải Anh",
    gen: 3,
    gender: "Nam",
    birth: "1954",
    death: "",
    isAlive: true,
    spouse: "Phạm Thị Bích (1958)",
    role: "Trưởng Tộc Đời Thứ 3",
    branch: "Chi Trưởng (Chi 1)",
    parentId: 2,
    burial: "Đang sinh sống tại Hà Nội",
    phone: "0912.345.678",
    currentAddress: "Số 26 Ngõ 198 Thái Hà, Đống Đa, Hà Nội",
    bio: "Kỹ sư cơ khí kỳ cựu. Hiện là Trưởng Ban Trị sự dòng họ nhiệm kỳ 2020 - 2027, chủ trì các kỳ đại lễ giỗ tổ rằm tháng Giêng và công tác tôn tạo Từ đường họ.",
    children: [8, 9]
  },
  {
    id: 5,
    name: "Nguyễn Thị Hoa",
    alias: "Cô Hoa",
    gen: 3,
    gender: "Nữ",
    birth: "1958",
    death: "",
    isAlive: true,
    spouse: "Vũ Đình Trọng (1955)",
    role: "Con gái Chi 1",
    branch: "Chi Trưởng (Chi 1)",
    parentId: 2,
    burial: "Sinh sống tại Hải Phòng",
    phone: "0983.112.233",
    currentAddress: "Quận Lê Chân, TP. Hải Phòng",
    bio: "Cán bộ y tế về hưu, luôn nhiệt thành với công việc họ tộc, tích cực tham gia các phong trào bác ái và giúp đỡ bà con trong dòng họ khi gặp khó khăn.",
    children: []
  },
  {
    id: 6,
    name: "Nguyễn Quang Minh",
    alias: "Minh Chi 2",
    gen: 3,
    gender: "Nam",
    birth: "1960",
    death: "",
    isAlive: true,
    spouse: "Đặng Thị Thảo (1964)",
    role: "Trưởng Nhánh Chi 2",
    branch: "Chi Thứ (Chi 2)",
    parentId: 3,
    burial: "Sinh sống tại TP. Hồ Chí Minh",
    phone: "0903.889.977",
    currentAddress: "Phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh",
    bio: "Doanh nhân thành đạt, thường xuyên công đức tài trợ trùng tu khuôn viên nhà thờ họ, lắp đặt hệ thống đèn chiếu sáng và tôn tạo phần mộ các cụ tiền bối.",
    children: [10, 11]
  },
  {
    id: 7,
    name: "Nguyễn Thị Ánh",
    alias: "Bà Ánh",
    gen: 3,
    gender: "Nữ",
    birth: "1965",
    death: "",
    isAlive: true,
    spouse: "Trịnh Xuân Bình (1962)",
    role: "Con gái Chi 2",
    branch: "Chi Thứ (Chi 2)",
    parentId: 3,
    burial: "Sinh sống tại Đà Nẵng",
    phone: "0935.456.789",
    currentAddress: "Quận Hải Châu, TP. Đà Nẵng",
    bio: "Giáo viên Ngữ văn trung học hưu trí, người đóng góp nhiều tư liệu quý và câu đối chữ Nho cho gia phả số.",
    children: []
  },
  {
    id: 8,
    name: "Nguyễn Minh Tuấn",
    alias: "Tuấn Đích Tôn",
    gen: 4,
    gender: "Nam",
    birth: "1983",
    death: "",
    isAlive: true,
    spouse: "Nguyễn Thu Trang (1987)",
    role: "Đích Tôn Chi 1",
    branch: "Chi Trưởng (Chi 1)",
    parentId: 4,
    burial: "Sinh sống tại Hà Nội",
    phone: "0977.889.900",
    currentAddress: "Khu đô thị Ngoại Giao Đoàn, Bắc Từ Liêm, Hà Nội",
    bio: "Chuyên gia Công nghệ Thông tin, trực tiếp nghiên cứu và xây dựng nền tảng Gia Phả Số trên Google AI Studio nhằm kết nối các chi nhánh dòng họ trên toàn cầu.",
    children: [12]
  },
  {
    id: 9,
    name: "Nguyễn Minh Hằng",
    alias: "Hằng",
    gen: 4,
    gender: "Nữ",
    birth: "1989",
    death: "",
    isAlive: true,
    spouse: "Độc thân",
    role: "Thành viên Chi 1",
    branch: "Chi Trưởng (Chi 1)",
    parentId: 4,
    burial: "Sinh sống tại Hà Nội",
    phone: "0988.667.788",
    currentAddress: "Cầu Giấy, Hà Nội",
    bio: "Cử nhân Ngôn ngữ học quốc tế, đảm nhiệm việc biên tập tài liệu và cập nhật hồ sơ các thế hệ trẻ trong gia phả.",
    children: []
  },
  {
    id: 10,
    name: "Nguyễn Minh Khang",
    alias: "Khang",
    gen: 4,
    gender: "Nam",
    birth: "1988",
    death: "",
    isAlive: true,
    spouse: "Lê Mỹ Dung (1991)",
    role: "Đích Tôn Chi 2",
    branch: "Chi Thứ (Chi 2)",
    parentId: 6,
    burial: "Sinh sống tại TP. Hồ Chí Minh",
    phone: "0918.234.567",
    currentAddress: "Quận 7, TP. Hồ Chí Minh",
    bio: "Kiến trúc sư cảnh quan, tác giả bản thiết kế hoa viên nghĩa trang và bản vẽ quy hoạch mở rộng Từ đường gia tộc năm 2024.",
    children: [13, 14]
  },
  {
    id: 11,
    name: "Nguyễn Minh Thảo",
    alias: "Thảo",
    gen: 4,
    gender: "Nữ",
    birth: "1994",
    death: "",
    isAlive: true,
    spouse: "Độc thân",
    role: "Thành viên Chi 2",
    branch: "Chi Thứ (Chi 2)",
    parentId: 6,
    burial: "Sinh sống tại TP. Hồ Chí Minh",
    phone: "0908.776.655",
    currentAddress: "Bình Thạnh, TP. Hồ Chí Minh",
    bio: "Nhà thiết kế truyền thông số, tham gia số hóa hình ảnh, phục dựng ảnh thờ các bậc tiền nhân.",
    children: []
  },
  {
    id: 12,
    name: "Nguyễn Phúc An",
    alias: "Bé Bon",
    gen: 5,
    gender: "Nam",
    birth: "2015",
    death: "",
    isAlive: true,
    spouse: "Còn nhỏ",
    role: "Chắt Đích Tôn (Đời 5)",
    branch: "Chi Trưởng (Chi 1)",
    parentId: 8,
    burial: "Sinh sống tại Hà Nội",
    currentAddress: "Bắc Từ Liêm, Hà Nội",
    bio: "Học sinh tiểu học chăm ngoan, đạt giải cao trong các kỳ thi Toán và Tiếng Anh cấp trường.",
    children: []
  },
  {
    id: 13,
    name: "Nguyễn Phúc Lâm",
    alias: "Bé Ken",
    gen: 5,
    gender: "Nam",
    birth: "2018",
    death: "",
    isAlive: true,
    spouse: "Còn nhỏ",
    role: "Chắt Chi 2 (Đời 5)",
    branch: "Chi Thứ (Chi 2)",
    parentId: 10,
    burial: "Sinh sống tại TP. Hồ Chí Minh",
    currentAddress: "Quận 7, TP. Hồ Chí Minh",
    bio: "Đang học mầm non, hiếu động và thông minh.",
    children: []
  },
  {
    id: 14,
    name: "Nguyễn Thùy Chi",
    alias: "Bé Thỏ",
    gen: 5,
    gender: "Nữ",
    birth: "2021",
    death: "",
    isAlive: true,
    spouse: "Còn nhỏ",
    role: "Chắt Chi 2 (Đời 5)",
    branch: "Chi Thứ (Chi 2)",
    parentId: 10,
    burial: "Sinh sống tại TP. Hồ Chí Minh",
    currentAddress: "Quận 7, TP. Hồ Chí Minh",
    bio: "Thành viên nhỏ tuổi nhất được ghi danh trong gia phả số dòng họ.",
    children: []
  }
];

export const INITIAL_EVENTS_DATA: FamilyEvent[] = [
  {
    id: 1,
    title: "Đại Lễ Giỗ Khởi Tổ Cụ Nguyễn Văn Căn",
    lunarDate: "15 tháng Giêng (Rằm tháng Giêng)",
    solarDate: "Hàng năm sau Tết Nguyên Đán",
    rolePerson: "Cụ Thủy Tổ Nguyễn Văn Căn",
    host: "Trưởng Tộc Nguyễn Quang Hải chủ trì",
    location: "Nhà thờ Tổ dòng họ (Thôn Đoài, Xã Tiên Phương, Huyện Chương Mỹ, TP. Hà Nội)",
    importance: "Đại lễ toàn thể gia tộc",
    description: "Toàn thể con cháu nội ngoại quy tụ dâng hương tưởng niệm công đức khai hoang lập nghiệp của Cụ Khởi Tổ, công bố khuyến học và báo công đầu xuân."
  },
  {
    id: 2,
    title: "Ngày Kỵ Cụ Bà Trần Thị Mùi (Chính Thất)",
    lunarDate: "08 tháng 4 (Âm lịch)",
    solarDate: "Khoảng tháng 5 Dương lịch",
    rolePerson: "Cụ Bà Thủy Tổ Trần Thị Mùi",
    host: "Ban Khánh tiết & Chi 1 chuẩn bị",
    location: "Từ đường dòng họ",
    importance: "Lễ kỵ quan trọng",
    description: "Lễ giỗ tưởng nhớ Cụ Bà tần tảo nuôi con, giữ gìn đạo gia phong cho toàn thể hậu sinh."
  },
  {
    id: 3,
    title: "Lễ Thanh Minh Tảo Mộ Toàn Tộc",
    lunarDate: "Thượng tuần tháng 3 Âm lịch (Ngày 03/3)",
    solarDate: "Tiết Thanh Minh",
    rolePerson: "Chư vị Tiên Linh dòng tộc",
    host: "Hội Đồng Gia Tộc & Đại diện các Chi",
    location: "Khu lăng mộ Tổ thôn Đoài & Nghĩa trang xứ Đồng Mạ",
    importance: "Lễ tri ân tiên tổ",
    description: "Con cháu thăm viếng, đắp thêm đất mới, thắp hương và dọn dẹp sạch sẽ lăng mộ tổ tiên trước mùa mưa bão."
  },
  {
    id: 4,
    title: "Lễ Giỗ Cụ Trưởng Chi 1 (Cụ Nguyễn Văn Đức)",
    lunarDate: "20 tháng 10 (Âm lịch)",
    solarDate: "Thường niên",
    rolePerson: "Cụ Nguyễn Văn Đức (Đời 2)",
    host: "Nhánh Chi Trưởng (Chi 1)",
    location: "Tại nhà Trưởng Chi & Từ đường",
    importance: "Chi phái nội tộc",
    description: "Nhớ ơn Cụ Đức đã gìn giữ Từ đường và ghi chép lại gia phả dòng họ qua thời kỳ kháng chiến gian khó."
  },
  {
    id: 5,
    title: "Lễ Giỗ Cụ Trưởng Chi 2 (Cụ Nguyễn Văn Thịnh)",
    lunarDate: "12 tháng 8 (Âm lịch)",
    solarDate: "Thường niên",
    rolePerson: "Cụ Nguyễn Văn Thịnh (Đời 2)",
    host: "Nhánh Chi Thứ (Chi 2)",
    location: "Từ đường chi họ & Nhà thờ Chi 2",
    importance: "Chi phái nội tộc",
    description: "Tưởng niệm công đức người sáng lập Quỹ khuyến học và chăm lo bồi dưỡng nhân tài cho gia tộc."
  }
];

export const HISTORICAL_SOURCES: HistoricalSource[] = [
  {
    id: 1,
    title: "Nguyễn Thị Gia Phả Ký (Bản chữ Hán Nôm cổ)",
    period: "Niên hiệu Khải Định thất niên (1922)",
    author: "Cụ Đồ Nho Nguyễn Văn Căn phụng thảo",
    preservationLocation: "Hậu cung Nhà thờ Tổ dòng họ (Hộp gỗ mun khảm ốc thếp vàng)",
    type: "Cổ thư Hán Nôm",
    description: "Gồm 48 trang giấy dó nguyên bản, chép bằng mực nho cổ. Nội dung ghi lại cội nguồn phát tích từ đất tổ Chương Mỹ, thế thứ các đời, chi phái phân lập và các quy ước họ tộc sơ khởi.",
    excerpt: "“Ngô gia thế đức, tích thiện hữu dư. Cội rễ bền chặt thì cành lá sum suê, nguồn nước dồi dào thì sông dài biển rộng...”",
    significance: "Bảo vật gia truyền nguyên bản quý giá nhất chứng minh nguồn gốc chính tông của dòng họ."
  },
  {
    id: 2,
    title: "Bản Sao Lục & Dịch Nghĩa Quốc Ngữ",
    period: "Năm Giáp Tý (1984) - Đính chính năm 1995",
    author: "Cụ Nguyễn Văn Đức (Chi 1) và Cụ Nguyễn Văn Thịnh (Chi 2) đồng dịch",
    preservationLocation: "Lưu tại phòng văn thư Ban Trị Sự Từ Đường và bản sao phân phát các chi",
    type: "Ảnh tư liệu",
    description: "Chuyển dịch toàn bộ nội dung chữ Hán Nôm sang chữ Quốc ngữ, bổ sung danh sách nhân khẩu từ đời thứ 2 đến đời thứ 4, ghi chú rõ ràng ngày kỵ nhật âm lịch của từng vị.",
    excerpt: "“Nay phụng dịch ra tiếng quốc âm để con cháu muôn đời sau dễ đọc dễ hiểu, không quên gốc gác công đức tổ tông.”",
    significance: "Cơ sở trực tiếp để số hóa dữ liệu lên nền tảng Gia Phả Số ngày nay."
  },
  {
    id: 3,
    title: "Văn Bia Tiên Linh Đá Xanh Khối Lớn",
    period: "Khắc dựng năm Tân Mùi (1931)",
    author: "Hội đồng tộc biểu khắc lập",
    preservationLocation: "Tiền môn Khu Lăng Mộ Tổ, Thôn Đoài, Tiên Phương, Chương Mỹ",
    type: "Bia đá",
    description: "Bia đá xanh Ninh Bình nguyên khối, cao 1.6m, rộng 0.8m, khắc chữ Hán chìm sắc nét. Ghi danh công đức các cụ đóng góp khai khẩn ruộng hương hỏa nuôi việc tế tự.",
    excerpt: "“Đất linh sinh nhân kiệt, bia đá khắc ngàn năm, con cháu bốn phương trông về bái tạ.”",
    significance: "Chứng tích địa giới và minh chứng pháp lý cổ xưa về đất lăng mộ và đất từ đường họ tộc."
  },
  {
    id: 4,
    title: "Hoành Phi - Câu Đối Cổ Sơn Son Thếp Vàng",
    period: "Thế kỷ 20",
    author: "Các bậc túc nho trong vùng phụng tặng",
    preservationLocation: "Chính điện Từ đường dòng họ",
    type: "Ảnh tư liệu",
    description: "Bức Hoành phi 'ĐỨC LƯU QUANG' (Đức độ tỏa sáng muôn đời) và đôi câu đối: 'Tổ công bồi đức thiên niên thịnh - Tử hiếu tôn hiền vạn đại vinh' bằng gỗ gụ mít thếp vàng 9999.",
    excerpt: "Đức Lưu Quang - Tổ công bồi đức thiên niên thịnh / Tử hiếu tôn hiền vạn đại vinh.",
    significance: "Biểu tượng tâm linh thiêng liêng và chuẩn mực đạo đức của dòng tộc."
  },
  {
    id: 5,
    title: "Sơ Đồ Địa Bạ & Bản Đồ Phân Bổ Mộ Phần",
    period: "Cập nhật định kỳ 2024",
    author: "Ban Trị Sự dòng họ và Kiến trúc sư Nguyễn Minh Khang",
    preservationLocation: "Hệ thống bản đồ số và lưu trữ tại Từ đường",
    type: "Bản đồ",
    description: "Bản đồ không gian số hóa tọa độ GPS của Từ đường và từng ngôi mộ tại Nghĩa trang gia tộc, giúp con cháu ở xa dễ dàng định vị khi về viếng tổ.",
    excerpt: "Tọa độ Từ đường: 20°56'14.2\"N 105°40'38.5\"E. Thôn Đoài, Xã Tiên Phương, Chương Mỹ, Hà Nội.",
    significance: "Bảo đảm quy hoạch mộ phần tôn nghiêm, không bị thất lạc qua thời gian."
  }
];

export const CLAN_RULES = [
  {
    no: 1,
    title: "Hiếu Đạo Với Song Thân",
    content: "Phụng dưỡng cha mẹ khi sinh tiền bằng lòng thành kính, săn sóc khi ốm đau, giữ trọn chữ hiếu làm đầu trăm nết."
  },
  {
    no: 2,
    title: "Tôn Kính Tổ Tiên",
    content: "Duy trì ngày giỗ kỵ, dâng hương lễ tiết, giữ gìn từ đường lăng mộ sạch đẹp tôn nghiêm, không được sao nhãng việc cúng tế."
  },
  {
    no: 3,
    title: "Hòa Thuận Huynh Đệ",
    content: "Anh em trong họ một lòng thương yêu, 'nhường cơm sẻ áo', lấy chữ nhẫn và tình cốt nhục làm trọng, không tranh chấp tị hiềm."
  },
  {
    no: 4,
    title: "Khuyến Học Khuyến Tài",
    content: "Động viên con cháu chăm chỉ dùi mài kinh sử, rèn đức luyện tài, vươn lên thành người hữu ích cho non sông dòng họ."
  },
  {
    no: 5,
    title: "Gia Phong Lễ Nghĩa",
    content: "Cách xưng hô trên dưới phân minh, kính người già, nhường người trẻ, giữ nếp ăn ở liêm khiết, đoan chính."
  },
  {
    no: 6,
    title: "Tương Trợ Đồng Tộc",
    content: "Khi trong họ có hiếu hỷ, hoạn nạn hay bệnh tật, toàn thể bà con phải đồng lòng chia sẻ, giúp đỡ cả tinh thần lẫn vật chất."
  },
  {
    no: 7,
    title: "Tôn Trọng Quy Chuẩn Tên Đệm",
    content: "Đặt tên con cháu theo đúng bộ chữ đệm lưu truyền: VĂN — ĐỨC — QUANG — MINH — PHÚC — THỊNH để đời đời nhận biết thứ bậc."
  },
  {
    no: 8,
    title: "Bảo Tồn Di Sản Gia Phả",
    content: "Mọi biến động nhân khẩu (sinh, tử, kết hôn) phải kịp thời thông báo về Ban Trị sự để ghi chép vào gia phả số, tránh thất truyền."
  }
];

export const CLAN_COMMITTEE: ClanCommitteeMember[] = [
  {
    role: "Trưởng Tộc / Trưởng Ban Trị Sự",
    name: "Ông Nguyễn Quang Hải",
    phone: "0912.345.678",
    address: "Đống Đa, Hà Nội (Gốc Thôn Đoài)",
    duty: "Chủ trì toàn bộ công việc tế lễ, đối ngoại, triệu tập họp họ thường niên và quản lý tài chính dòng tộc."
  },
  {
    role: "Phó Trưởng Tộc (Chi 2)",
    name: "Ông Nguyễn Quang Minh",
    phone: "0903.889.977",
    address: "TP. Hồ Chí Minh",
    duty: "Phụ trách liên lạc bà con phương Nam, tài trợ công tác xây dựng, khuyến học dòng họ."
  },
  {
    role: "Trưởng Ban Khánh Tiết Từ Đường",
    name: "Ông Nguyễn Văn An",
    phone: "0982.123.456",
    address: "Thôn Đoài, Xã Tiên Phương, Chương Mỹ",
    duty: "Trông nom nhang khói thường xuyên tại Từ đường, chuẩn bị lễ vật và điều hành tế tự các ngày giỗ kỵ."
  },
  {
    role: "Trưởng Ban Quản Trị Gia Phả Số",
    name: "Anh Nguyễn Minh Tuấn",
    phone: "0977.889.900",
    address: "Bắc Từ Liêm, Hà Nội",
    duty: "Quản trị cơ sở dữ liệu gia phả số, hỗ trợ bà con tra cứu, cập nhật tiểu sử và tích hợp công nghệ AI Studio."
  }
];
