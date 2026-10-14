/* =====================================================================
   PHẦN MÔN HỌC – nội dung
   Danh sách môn và cấp học. Các phần khác (giáo viên, tuyển sinh, form
   đăng ký) cũng dùng danh sách này.
   ===================================================================== */

const PHAN_MON_HOC = {
  tieuDe: "Môn học và thầy cô phụ trách",
  moTa: "Bấm tên thầy cô để đọc giới thiệu và lịch học.",
};

// Danh sách môn – key (toan, van, ...) dùng để nối với giáo viên và lớp học, KHÔNG đổi key.
const MON_HOC = {
  toan: { ten: "Toán Học", ngan: "Toán", icon: "sigma" },
  van: { ten: "Ngữ Văn", ngan: "Văn", icon: "pen" },
  anh: { ten: "Tiếng Anh", ngan: "Anh", icon: "languages" },
  ly: { ten: "Vật Lý", ngan: "Lý", icon: "atom" },
  hoa: { ten: "Hóa Học", ngan: "Hóa", icon: "flask" },
  sinh: { ten: "Sinh Học", ngan: "Sinh", icon: "leaf" },
};

// Môn của từng cấp. trangThai: "dang-tuyen" (Đang tuyển sinh) | "sap-mo" (Sắp mở lớp)
const CAP_HOC = [
  {
    key: "thcs",
    ten: "Trung học cơ sở",
    vietTat: "THCS",
    khoi: "Lớp 6 đến lớp 9",
    mon: [
      { key: "toan", trangThai: "dang-tuyen" },
      { key: "van", trangThai: "dang-tuyen" },
      { key: "anh", trangThai: "dang-tuyen" },
    ],
  },
  {
    key: "thpt",
    ten: "Trung học phổ thông",
    vietTat: "THPT",
    khoi: "Lớp 10 đến lớp 12",
    mon: [
      { key: "toan", trangThai: "dang-tuyen" },
      { key: "ly", trangThai: "dang-tuyen" },
      { key: "hoa", trangThai: "dang-tuyen" },
      { key: "anh", trangThai: "sap-mo" },
      { key: "sinh", trangThai: "sap-mo" },
    ],
  },
];
