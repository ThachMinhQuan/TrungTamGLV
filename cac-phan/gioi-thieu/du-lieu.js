/* =====================================================================
   PHẦN GIỚI THIỆU – nội dung
   Sửa chữ trong dấu ngoặc kép "...", giữ nguyên dấu phẩy và dấu ngoặc.
   ===================================================================== */

const GIOI_THIEU = {
  tieuDe: "Không gian học tập khang trang – Thầy cô giỏi trực tiếp đứng lớp",
  doanVan: [
    "Gió Lộc Vừng là cơ sở bổ trợ kiến thức cho học sinh THCS và THPT tại Thôn Nội, Nam Ninh, Ninh Bình – ngay cạnh Trường THPT Lý Tự Trọng, thuận tiện cho học sinh đi lại.",
    "Cơ sở đầu tư hệ thống phòng học rộng rãi, có điều hòa, quạt trần, bảng chống lóa, bàn ghế mới và sân chờ rộng có mái che. Các thầy cô – đều là Thạc sĩ, cán bộ quản lý và giáo viên các trường THPT – trực tiếp đến giảng dạy, giúp học sinh được học đúng người, đúng chương trình.",
  ],
  anh: { anh: "assets/images/co-so/cong-truoc.jpg", chuThich: "Cổng vào Cơ sở bổ trợ kiến thức Gió Lộc Vừng" },

  // Mục "Cảm nhận" – chỉ bật khi đã có phản hồi THẬT (thêm vào CAM_NHAN bên dưới)
  hienCamNhan: false,
  tieuDeCamNhan: "Học sinh và phụ huynh nói gì",
};

/* ---------- Vì sao chọn Gió Lộc Vừng ---------- */
// icon có thể dùng: award, users, snowflake, shield, bike, gift, book, heart, clock, monitor, map-pin, wallet
const LY_DO = [
  { icon: "award", tieuDe: "Thầy cô là Thạc sĩ", moTa: "Thầy cô là Phó Hiệu trưởng, giáo viên các trường THPT Lý Tự Trọng và THPT Trần Văn Bảo." },
  { icon: "book", tieuDe: "Bám sát chương trình", moTa: "Ôn luyện từ cơ bản đến nâng cao, luyện thi học kỳ và thi học sinh giỏi." },
  { icon: "snowflake", tieuDe: "Phòng học tiện nghi", moTa: "Điều hòa, quạt trần, đèn sáng, bảng chống lóa, bàn ghế mới sạch sẽ." },
  { icon: "map-pin", tieuDe: "Vị trí thuận tiện", moTa: "Cạnh Trường THPT Lý Tự Trọng – tan trường là đến lớp, phụ huynh dễ đưa đón." },
  { icon: "bike", tieuDe: "Sân chờ & bãi xe rộng", moTa: "Sân có mái che, bàn ghế chờ, bãi để xe rộng rãi có lưới che nắng." },
  { icon: "shield", tieuDe: "An toàn – Minh bạch", moTa: "Có camera, công khai thông tin tuyển sinh, nội quy và tiêu lệnh PCCC." },
];

/* ---------- Cảm nhận học sinh & phụ huynh ---------- */
// Chỉ đăng phản hồi THẬT. Khi có, thêm vào đây và đổi hienCamNhan ở trên thành true.
// Mẫu: { ten: "Nguyễn Văn A", vaiTro: "Học sinh lớp 10", noiDung: "..." },
const CAM_NHAN = [];
