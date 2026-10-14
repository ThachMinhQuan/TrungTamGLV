/* =====================================================================
   PHẦN TUYỂN SINH – nội dung
   Gồm: bảng "Lớp đang tuyển sinh" (thời khóa biểu), form "Đăng ký học"
   và "Câu hỏi thường gặp".
   ===================================================================== */

const PHAN_TUYEN_SINH = {
  tieuDe: "Lớp đang tuyển sinh",
  moTa: "Theo thời khóa biểu tại cơ sở. Lịch học có thể thay đổi, vui lòng gọi để được xếp lớp.",
  hienBangLop: true, // false = ẩn bảng lớp học
  tieuDeThongBao: "Thông báo tuyển sinh", // tiêu đề khối ảnh poster (chỉ hiện khi THONG_BAO có ảnh)

  tieuDeDangKy: "Đăng ký học",
  moTaDangKy: "Gọi hoặc nhắn Zalo để được tư vấn ngay, hoặc điền form – cơ sở sẽ gọi lại để xếp lớp.",

  tieuDeHoiDap: "Câu hỏi thường gặp",
};

/* ---------- Thông tin khóa học (dải thông tin trên bảng xanh) ---------- */
// Thông tin chung về khóa học (theo bảng công khai tuyển sinh)
const THONG_TIN_KHOA_HOC = [
  { icon: "book", tieuDe: "Môn & khối lớp", noiDung: "THCS: Toán, Văn, Anh, Hóa 9. THPT: Toán, Lý, Hóa lớp 10, 11, 12" },
  { icon: "clock", tieuDe: "Thời lượng", noiDung: "1 giờ 45 phút – 2 giờ / ca học" },
  { icon: "wallet", tieuDe: "Học phí", noiDung: "45.000đ / buổi" },
  { icon: "users", tieuDe: "Sĩ số", noiDung: "Tối đa 30 học sinh / lớp" },
  { icon: "building", tieuDe: "Hình thức", noiDung: "Học trực tiếp tại cơ sở" },
  { icon: "file", tieuDe: "Minh bạch", noiDung: "Công khai thông tin tuyển sinh, nội quy lớp học tại cơ sở" },
];

/* ---------- Lớp đang tuyển sinh (thời khóa biểu) ---------- */
// Theo thời khóa biểu tại cơ sở (img/Thoi_Khoa_Bieu_Lich_day.jpg).
// giaoVien: id thầy cô có trang giới thiệu, hoặc ghi tên (vd "Cô Đào"), hoặc "" nếu đang xếp giáo viên.
// buoi: các buổi học trong tuần.  trangThai: "dang-tuyen" | "sap-khai-giang" | "da-du"
const LOP_HOC = [
  { ten: "Hóa Học 9", mon: "hoa", cap: "thcs", giaoVien: "Cô Thùy Anh", buoi: [{ thu: "Thứ 5", gio: "17h00 – 19h00" }, { thu: "Thứ 7", gio: "7h10 – 9h10" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Toán Học 10", mon: "toan", cap: "thpt", giaoVien: "tran-duc-thien", buoi: [{ thu: "Thứ 4", gio: "17h30 – 19h30" }, { thu: "Thứ 7", gio: "14h15 – 16h15" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Toán Học 11", mon: "toan", cap: "thpt", giaoVien: "tran-duc-thien", buoi: [{ thu: "Thứ 3", gio: "17h30 – 19h30" }, { thu: "Thứ 7", gio: "17h30 – 19h30" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Toán Học 12", mon: "toan", cap: "thpt", giaoVien: "tran-duc-thien", buoi: [{ thu: "Thứ 5", gio: "17h30 – 19h30" }, { thu: "Chủ nhật", gio: "17h30 – 19h30" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Vật Lý 10", mon: "ly", cap: "thpt", giaoVien: "phan-duy-hien", buoi: [{ thu: "Thứ 3", gio: "17h15 – 19h15" }, { thu: "Thứ 7", gio: "16h30 – 18h30" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Vật Lý 11", mon: "ly", cap: "thpt", giaoVien: "phan-duy-hien", buoi: [{ thu: "Thứ 5", gio: "17h15 – 19h15" }, { thu: "Thứ 7", gio: "14h30 – 16h30" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Vật Lý 12", mon: "ly", cap: "thpt", giaoVien: "phan-duy-hien", buoi: [{ thu: "Thứ 4", gio: "17h15 – 19h15" }, { thu: "Thứ 6", gio: "17h15 – 19h15" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Hóa Học 10", mon: "hoa", cap: "thpt", giaoVien: "dang-xuan-minh", buoi: [{ thu: "Thứ 5", gio: "17h15 – 19h15" }, { thu: "Chủ nhật", gio: "14h30 – 16h30" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Hóa Học 11", mon: "hoa", cap: "thpt", giaoVien: "dang-xuan-minh", buoi: [{ thu: "Thứ 2", gio: "17h15 – 19h15" }, { thu: "Thứ 4", gio: "17h15 – 19h15" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Hóa Học 11", mon: "hoa", cap: "thpt", giaoVien: "Cô Linh", buoi: [{ thu: "Thứ 6", gio: "17h15 – 19h15" }, { thu: "Chủ nhật", gio: "7h30 – 9h30" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Hóa Học 12", mon: "hoa", cap: "thpt", giaoVien: "dang-xuan-minh", buoi: [{ thu: "Thứ 3", gio: "17h15 – 19h15" }, { thu: "Thứ 7", gio: "14h30 – 16h30" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Hóa Học 12A11", mon: "hoa", cap: "thpt", giaoVien: "dang-xuan-minh", buoi: [{ thu: "Thứ 6", gio: "17h15 – 19h15" }, { thu: "Chủ nhật", gio: "7h30 – 9h30" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
  { ten: "Hóa Học 12A4", mon: "hoa", cap: "thpt", giaoVien: "Cô Đào", buoi: [{ thu: "Thứ 3", gio: "17h15 – 19h15" }, { thu: "Thứ 7", gio: "14h15 – 16h15" }], siSo: 30, hocPhi: "45.000đ/buổi", trangThai: "dang-tuyen" },
];

// Ảnh poster / thông báo hiện ở cuối mục Tuyển sinh (để trống [] thì ẩn cả khối).
// Mẫu: { anh: "assets/images/thong-bao/ten-file.jpg", chuThich: "Mô tả" },
const THONG_BAO = [];

/* ---------- Câu hỏi thường gặp ---------- */
const FAQ = [
  { hoi: "Cơ sở dạy những môn và khối lớp nào?", dap: "Toán, Ngữ Văn, Tiếng Anh cho học sinh lớp 6 đến 9, Hóa Học lớp 9, và Toán, Vật Lý, Hóa Học cho học sinh lớp 10, 11, 12. Xem thời khóa biểu ở mục Tuyển sinh." },
  { hoi: "Học phí bao nhiêu?", dap: "Học phí 45.000đ / buổi, mỗi ca học từ 1 giờ 45 phút đến 2 giờ. Cơ sở có thể điều chỉnh mức thu khi số lượng học sinh ít và có sự thỏa thuận giữa cơ sở và phụ huynh." },
  { hoi: "Mỗi lớp có bao nhiêu học sinh?", dap: "Mỗi lớp tối đa 30 học sinh." },
  { hoi: "Ai là người trực tiếp giảng dạy?", dap: "Các thầy cô trực tiếp đứng lớp – đều là Thạc sĩ, Phó Hiệu trưởng và giáo viên các trường THPT Lý Tự Trọng, THPT Trần Văn Bảo. Xem chi tiết tại mục Giáo viên." },
  { hoi: "Cơ sở ở đâu?", dap: "Gió Lộc Vừng – Thôn Nội, Nam Ninh, Ninh Bình, ngay cạnh Trường THPT Lý Tự Trọng." },
  { hoi: "Đăng ký học như thế nào?", dap: "Gọi hoặc nhắn Zalo số 0917 760 498 (cơ sở Thạch Văn An), hoặc điền form đăng ký trên website. Cơ sở sẽ liên hệ lại để xếp lớp." },
];
