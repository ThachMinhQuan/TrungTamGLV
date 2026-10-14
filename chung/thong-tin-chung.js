/* =====================================================================
   THÔNG TIN CHUNG – dùng ở mọi phần của website
   (tên cơ sở, điện thoại, địa chỉ, bản đồ, logo, ảnh tấm biển đầu trang)
   ---------------------------------------------------------------------
   Nội dung riêng của từng phần nằm trong thư mục cac-phan/<tên phần>/du-lieu.js
   - Chỉ sửa phần chữ nằm trong dấu ngoặc kép "...".
   - Giữ nguyên dấu phẩy, dấu ngoặc { } [ ].
   ===================================================================== */

const SITE = {
  ten: "Cơ sở bổ trợ kiến thức Gió Lộc Vừng",
  tenNgan: "Gió Lộc Vừng",
  tenBienHieu: "Cơ sở bổ trợ kiến thức Gió Lộc Vừng", // chữ lớn trên tấm biển đầu trang
  // Đoạn chữ lớn dưới banner (và ở chân trang). Mỗi dòng ngăn bằng \n
  moTaNgan:
    "Bổ trợ kiến thức\n" +
    "Lớp Toán – Văn – Anh 6-7-8-9\n" +
    "Lớp Toán – Lý – Hóa 10-11-12\n" +
    "Thầy cô là Thạc sĩ, cán bộ quản lý và giáo viên các trường THPT trực tiếp đứng lớp.",
  viTriNoiBat: "Ngay cạnh Trường THPT Lý Tự Trọng",

  // Thông tin pháp lý (hiện ở chân trang)
  phapLy: "Cơ sở bổ trợ kiến thức THCS – THPT. HKD: Thạch Văn An. GPKD số: 0600543311-001",

  // Liên hệ
  hotline: "0917760498", // viết liền – dùng cho nút bấm gọi
  hotlineHienThi: "0917 760 498",
  hotline2: "0912807498", // số thứ 2 (để trống "" nếu không dùng)
  hotline2HienThi: "0912 807 498",
  zalo: "0917760498", // Zalo của số thứ nhất
  zalo2: "0912807498", // Zalo của số thứ 2 (để trống "" nếu số này không dùng Zalo)
  messenger: "", // tên fanpage Facebook, vd: "giolocvung" (để trống thì ẩn nút Messenger)
  facebook: "", // link fanpage / trang cá nhân, vd: "https://facebook.com/..."
  tiktok: "",
  email: "",
  diaChi: "Gió Lộc Vừng – Thôn Nội, Nam Ninh, Ninh Bình",
  diaChiPhu: "Cạnh Trường THPT Lý Tự Trọng",
  gioLamViec: "Các ca chiều, tối trong tuần – liên hệ để biết lịch cụ thể",

  // Bản đồ: dùng mã vị trí Google Maps (Plus Code) – chính xác tới từng mét
  maGoogleMaps: "87H3+2WR",
  googleMapsEmbed: "https://www.google.com/maps?q=87H3%2B2WR%2C+Th%C3%B4n+N%E1%BB%99i%2C+Nam+Ninh%2C+Ninh+B%C3%ACnh&z=17&output=embed",
  googleMapsLink: "https://www.google.com/maps/dir/?api=1&destination=87H3%2B2WR%2C+Th%C3%B4n+N%E1%BB%99i%2C+Nam+Ninh%2C+Ninh+B%C3%ACnh", // nút Chỉ đường (mở chỉ đường từ vị trí người xem)

  // Nơi nhận form đăng ký (xem hướng dẫn trong file HUONG-DAN-FORM.md)
  // - Google Sheets: dán link Web App dạng https://script.google.com/macros/s/.../exec
  // - Formspree:     dán link dạng https://formspree.io/f/xxxxxxx
  // - Để trống "":   form chạy chế độ THỬ (không gửi đi đâu cả)
  formEndpoint: "",

  // Ảnh
  logo: "assets/images/logo/logo-mark.png", // biểu tượng GLV (cắt từ "Logo Gió Lộc Vừng giáo dục.png"); để "" thì dùng logo vẽ sẵn
  // Banner tấm biển đầu trang
  bienHieu: {
    // "vector" = vẽ lại bằng nét vector, căng nét ở mọi màn hình (khuyên dùng)
    // "anh"    = dùng ảnh ở dòng anh bên dưới
    // ""       = tấm biển đơn giản vẽ bằng chữ
    kieu: "vector",

    // Chữ trên banner vector (số điện thoại lấy tự động từ hotline ở trên)
    dongTren: "CƠ SỞ BỔ TRỢ KIẾN THỨC THCS- THPT",
    tenLon: "GIÓ LỘC VỪNG",
    hkd: "HKD: THẠCH VĂN AN",
    gpkd: "GPKD SỐ: 0600543311-001",
    diaChi: "ĐC: THÔN NỘI - NAM NINH - NINH BÌNH",

    // Dùng khi kieu: "anh"
    anh: "assets/images/hero/banner.jpg",
    // Vùng bấm đặt lên đúng chỗ in chữ trong ảnh, tính theo % chiều rộng / chiều cao ảnh.
    // Nếu thay ảnh banner khác thì phải đo lại các con số này (hoặc xóa hết để tắt vùng bấm).
    vungBam: [
      { link: "zalo", left: 58.44, top: 67.73, width: 9.69, height: 9.56, nhan: "Nhắn Zalo" },
      { link: "tel", left: 68.28, top: 67.73, width: 12.97, height: 9.56, nhan: "Gọi 0917 760 498" },
      { link: "tel2", left: 84.38, top: 67.73, width: 12.19, height: 9.56, nhan: "Gọi 0912 807 498" },
      { link: "banDo", left: 29.30, top: 78.29, width: 39.30, height: 8.17, nhan: "Chỉ đường bằng Google Maps" },
    ],
  },
  anhBia: "assets/images/co-so/phong-hoc-3.jpg", // ảnh lớn cạnh tấm biển đầu trang
  chuThichAnhBia: "Phòng học lớn – điều hòa, quạt trần, cửa sổ thoáng",
};
