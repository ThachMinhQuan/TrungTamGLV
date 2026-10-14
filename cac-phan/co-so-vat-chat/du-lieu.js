/* =====================================================================
   PHẦN CƠ SỞ VẬT CHẤT – nội dung
   Gồm 2 mục: "Cơ sở vật chất" (ảnh phòng học, sân, bãi xe) và
   "Trong lớp học" (ảnh các buổi học).
   Ảnh: chép vào assets/images/... rồi thêm một dòng { anh: "...", ... }.
   ===================================================================== */

const PHAN_CO_SO_VAT_CHAT = {
  tieuDe: "Cơ sở vật chất",
  moTa: "Ảnh chụp tại cơ sở. Bấm vào ảnh để xem lớn.",
  tieuDeLopHoc: "Trong lớp học",
  moTaLopHoc: "Ảnh chụp các buổi học tại cơ sở. Bấm vào ảnh để xem lớn.",
};

/* ---------- Ảnh cơ sở vật chất ---------- */
// nhom: phong-hoc | khu-chung | cong-khai
const NHOM_ANH = [
  { key: "phong-hoc", ten: "Phòng học" },
  { key: "khu-chung", ten: "Sân chờ & bãi xe" },
  { key: "cong-khai", ten: "Thông tin công khai" },
];

const CO_SO_VAT_CHAT = [
  { anh: "assets/images/co-so/phong-hoc-3.jpg", nhom: "phong-hoc", chuThich: "Phòng học lớn – điều hòa, quạt trần, cửa sổ thoáng" },
  { anh: "assets/images/co-so/phong-hoc-2.jpg", nhom: "phong-hoc", chuThich: "Phòng học có 2 điều hòa, bảng chống lóa" },
  { anh: "assets/images/co-so/phong-hoc-1.jpg", nhom: "phong-hoc", chuThich: "Phòng học ốp gỗ ấm cúng, đèn LED sáng" },
  { anh: "assets/images/co-so/phong-hoc-4.jpg", nhom: "phong-hoc", chuThich: "Bàn ghế mới, sắp xếp ngay ngắn" },
  { anh: "assets/images/co-so/cong-truoc.jpg", nhom: "khu-chung", chuThich: "Cổng vào cơ sở – Thôn Nội, Nam Ninh, Ninh Bình" },
  { anh: "assets/images/co-so/san-cho-de-xe.jpg", nhom: "khu-chung", chuThich: "Sân chờ có mái che, bàn ghế cho học sinh và phụ huynh" },
  { anh: "assets/images/co-so/bai-de-xe.jpg", nhom: "khu-chung", chuThich: "Bãi để xe rộng, có lưới che nắng" },
  { anh: "assets/images/co-so/bang-cong-khai.jpg", nhom: "cong-khai", chuThich: "Bảng công khai tuyển sinh, nội quy lớp học, tiêu lệnh PCCC" },
  // Poster cũ (còn tên cô Hà, cô Vân) – tạm ẩn, thay bằng poster mới khi có:
  // { anh: "assets/images/thong-bao/thong-bao-tuyen-sinh.jpg", nhom: "cong-khai", chuThich: "Thông báo tuyển sinh các lớp" },
];

// Tiện ích – icon có thể dùng: snowflake, fan, monitor, wifi, shield, bike, droplet, sofa, lightbulb, book, file
const TIEN_ICH = [
  { icon: "snowflake", ten: "Điều hòa" },
  { icon: "fan", ten: "Quạt trần" },
  { icon: "lightbulb", ten: "Đèn LED sáng" },
  { icon: "monitor", ten: "Bảng chống lóa" },
  { icon: "sofa", ten: "Sân chờ có mái che" },
  { icon: "bike", ten: "Bãi để xe rộng" },
  { icon: "shield", ten: "Camera an ninh" },
  { icon: "file", ten: "Nội quy & PCCC" },
];

/* ---------- Ảnh các buổi học (mục "Trong lớp học" và trang giới thiệu thầy cô) ---------- */
// giaoVien: id thầy cô (ảnh hiện cả trong trang giới thiệu riêng của thầy cô đó)
const ANH_LOP_HOC = [
  { anh: "assets/images/lop-hoc/thien-1.jpg", giaoVien: "tran-duc-thien", chuThich: "Buổi học Toán Học" },
  { anh: "assets/images/lop-hoc/thien-2.jpg", giaoVien: "tran-duc-thien", chuThich: "Buổi học Toán Học" },
  { anh: "assets/images/lop-hoc/thien-3.jpg", giaoVien: "tran-duc-thien", chuThich: "Buổi học Toán Học" },
  { anh: "assets/images/lop-hoc/thien-4.jpg", giaoVien: "tran-duc-thien", chuThich: "Buổi học Toán Học" },
  { anh: "assets/images/lop-hoc/hien-1.jpg", giaoVien: "phan-duy-hien", chuThich: "Buổi học Vật Lý" },
  { anh: "assets/images/lop-hoc/hien-2.jpg", giaoVien: "phan-duy-hien", chuThich: "Buổi học Vật Lý" },
  { anh: "assets/images/lop-hoc/hien-3.jpg", giaoVien: "phan-duy-hien", chuThich: "Buổi học Vật Lý" },
  { anh: "assets/images/lop-hoc/hien-4.jpg", giaoVien: "phan-duy-hien", chuThich: "Buổi học Vật Lý" },
  { anh: "assets/images/lop-hoc/hien-5.jpg", giaoVien: "phan-duy-hien", chuThich: "Buổi học Vật Lý" },
  { anh: "assets/images/lop-hoc/hien-6.jpg", giaoVien: "phan-duy-hien", chuThich: "Buổi học Vật Lý" },
  { anh: "assets/images/lop-hoc/minh-1.jpg", giaoVien: "dang-xuan-minh", chuThich: "Buổi học Hóa Học" },
  { anh: "assets/images/lop-hoc/minh-2.jpg", giaoVien: "dang-xuan-minh", chuThich: "Buổi học Hóa Học" },
  { anh: "assets/images/lop-hoc/minh-3.jpg", giaoVien: "dang-xuan-minh", chuThich: "Buổi học Hóa Học" },
  { anh: "assets/images/lop-hoc/minh-4.jpg", giaoVien: "dang-xuan-minh", chuThich: "Buổi học Hóa Học" },
];
