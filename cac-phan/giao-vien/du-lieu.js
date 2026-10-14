/* =====================================================================
   PHẦN GIÁO VIÊN – nội dung
   Mỗi thầy cô là một khối { ... }. Thêm thầy cô mới: chép một khối,
   sửa lại id (không dấu, nối bằng gạch ngang) và thông tin.
   Ảnh đại diện: chép vào assets/images/giao-vien/ rồi điền đường dẫn vào anh.
   ===================================================================== */

const PHAN_GIAO_VIEN = {
  tieuDe: "Thầy cô đứng lớp",
  moTa: "Thạc sĩ, cán bộ quản lý và giáo viên các trường THPT Lý Tự Trọng, Trần Văn Bảo.",
};

// id: dùng làm link riêng của thầy cô, vd: index.html#gv-tran-duc-thien (có thể gửi link này lên Facebook/Zalo)
// mon: key môn (toan, van, anh, ly, hoa, sinh) · cap: "thcs" và/hoặc "thpt"
// Lưu ý: chỉ đăng ảnh và thông tin khi thầy cô đã đồng ý.
// lichHoc: để [] thì website tự lấy lịch từ thời khóa biểu (LOP_HOC) bên dưới
const GIAO_VIEN = [
  {
    id: "tran-duc-thien",
    ten: "Thầy Trần Đức Thiện",
    anh: "assets/images/giao-vien/tran-duc-thien.jpg",
    mon: ["toan"],
    cap: ["thpt"],
    hocVi: "Thạc sĩ Toán học",
    chucVu: "Phó Hiệu trưởng Trường THPT Trần Văn Bảo",
    lopDay: ["Toán Học 10", "Toán Học 11", "Toán Học 12"],
    gioiThieu:
      "Thầy Trần Đức Thiện là Thạc sĩ Toán học, hiện là Phó Hiệu trưởng Trường THPT Trần Văn Bảo. Thầy trực tiếp đứng lớp Toán 10, 11, 12 tại cơ sở. Hãy cùng thầy chinh phục môn Toán một cách đơn giản và hiệu quả.",
    noiDung: [
      "Bám sát chương trình học, ôn luyện từ cơ bản đến nâng cao",
      "Chú trọng tư duy logic, phương pháp giải nhanh và ứng dụng thực tế",
      "Luyện thi THPT Quốc Gia, thi học sinh giỏi",
    ],
    lichHoc: [], // tự lấy từ thời khóa biểu (LOP_HOC)
    dangKyOnline: [
      { ten: "Đăng ký Toán Học lớp 10", link: "https://forms.gle/MmuPREUWkvSmCFVh9" },
      { ten: "Đăng ký Toán Học lớp 11", link: "https://forms.gle/StQeNBT4kdPMoVBA8" },
    ],
  },
  {
    id: "phan-duy-hien",
    ten: "Thầy Phan Duy Hiền",
    anh: "",
    mon: ["ly"],
    cap: ["thpt"],
    hocVi: "Thạc sĩ Vật lý",
    chucVu: "Phó Hiệu trưởng Trường THPT Lý Tự Trọng",
    lopDay: ["Vật Lý 10", "Vật Lý 11", "Vật Lý 12"],
    gioiThieu:
      "Thầy Phan Duy Hiền là Thạc sĩ Vật lý, hiện là Phó Hiệu trưởng Trường THPT Lý Tự Trọng. Thầy trực tiếp đứng lớp Vật Lý 10, 11, 12 tại cơ sở. [CẦN XÁC NHẬN – bổ sung lời giới thiệu của thầy]",
    noiDung: [
      "Bám sát chương trình Vật Lý THPT mới",
      "Hiểu bản chất hiện tượng, rèn kỹ năng giải bài tập",
      "Luyện thi THPT Quốc Gia, thi học sinh giỏi",
    ],
    lichHoc: [], // tự lấy từ thời khóa biểu (LOP_HOC)
    dangKyOnline: [],
  },
  {
    id: "dang-xuan-minh",
    ten: "Thầy Đặng Xuân Minh",
    anh: "assets/images/giao-vien/dang-xuan-minh.jpg",
    mon: ["hoa"],
    cap: ["thpt"],
    hocVi: "Thạc sĩ Hóa học",
    chucVu: "Giáo viên Trường THPT Lý Tự Trọng",
    lopDay: ["Hóa Học 10", "Hóa Học 11", "Hóa Học 12"],
    gioiThieu:
      "Thầy Đặng Xuân Minh là Thạc sĩ Hóa học, giáo viên Trường THPT Lý Tự Trọng. Thầy trực tiếp đứng lớp Hóa 10, 11, 12 tại cơ sở. [CẦN XÁC NHẬN – bổ sung lời giới thiệu của thầy]",
    noiDung: [
      "Hệ thống lý thuyết Hóa học theo chương trình mới",
      "Phương pháp giải bài tập từ cơ bản đến nâng cao",
      "Luyện thi THPT Quốc Gia, thi học sinh giỏi",
    ],
    lichHoc: [], // tự lấy từ thời khóa biểu (LOP_HOC)
    dangKyOnline: [],
  },
  {
    id: "nguyen-thi-thu-huong",
    ten: "Cô Nguyễn Thị Thu Hường",
    anh: "",
    mon: ["toan"],
    cap: ["thpt"],
    hocVi: "Thạc sĩ Toán học",
    chucVu: "Giáo viên Trường THPT Lý Tự Trọng",
    lopDay: ["Toán Học 10", "Toán Học 11", "Toán Học 12"],
    gioiThieu:
      "Cô Nguyễn Thị Thu Hường là Thạc sĩ Toán học, giáo viên Trường THPT Lý Tự Trọng. Cô trực tiếp đứng lớp Toán 10, 11, 12 tại cơ sở. [CẦN XÁC NHẬN – bổ sung lời giới thiệu của cô]",
    noiDung: [
      "Bám sát chương trình Toán THPT mới",
      "Củng cố kiến thức nền tảng, rèn kỹ năng trình bày bài giải",
      "Luyện thi THPT Quốc Gia, thi học sinh giỏi",
    ],
    lichHoc: ["Liên hệ cơ sở để biết lịch học cụ thể"], // cô chưa có lớp trong thời khóa biểu hiện tại
    dangKyOnline: [],
  },
];
