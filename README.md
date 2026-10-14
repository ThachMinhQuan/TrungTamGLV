# Cơ sở bổ trợ kiến thức Gió Lộc Vừng

Website giới thiệu và tuyển sinh của **Cơ sở bổ trợ kiến thức Gió Lộc Vừng** – dạy thêm THCS, THPT
tại Thôn Nội, Nam Ninh, Ninh Bình (cạnh Trường THPT Lý Tự Trọng).

**Xem website:** https://trungtamglv.netlify.app/

ĐT/Zalo: 0917 760 498 – 0912 807 498

## Cấu trúc

Website tĩnh (HTML, CSS, JavaScript thuần), không cần cài đặt hay build – mở `index.html` là chạy.

```
index.html          Khung trang: thứ tự các phần
chung/              Dùng chung: thông tin cơ sở, màu sắc, đầu trang, banner, chân trang
cac-phan/           Mỗi phần một thư mục (gioi-thieu, mon-hoc, giao-vien,
                    co-so-vat-chat, tuyen-sinh, lien-he), mỗi thư mục gồm:
                      du-lieu.js     nội dung (sửa ở đây)
                      giao-dien.css  giao diện riêng
                      hien-thi.js    cách hiển thị
assets/images/      Ảnh
```

Sửa số điện thoại, địa chỉ: `chung/thong-tin-chung.js`.
Sửa giáo viên: `cac-phan/giao-vien/du-lieu.js`. Sửa thời khóa biểu, học phí: `cac-phan/tuyen-sinh/du-lieu.js`.
