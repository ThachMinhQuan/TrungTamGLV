/* =====================================================================
   KHỞI ĐỘNG – chạy sau cùng, thường KHÔNG cần sửa.
   1. Dựng HTML cho từng chỗ <div data-phan="..."> trong index.html
   2. Điền thông tin chung (tên, điện thoại, logo...)
   3. Gắn tương tác cho từng phần, tô sáng menu khi cuộn
   ===================================================================== */
(function () {
  "use strict";
  const { $$, cacPhan } = GLV;

  const choDat = $$("[data-phan]");

  // 1. Dựng HTML (bỏ chỗ trống nếu phần đó chưa được nạp)
  choDat.forEach((el) => {
    const p = cacPhan[el.dataset.phan];
    if (!p) return el.remove();
    el.innerHTML = p.html();
  });

  // 2. Thông tin chung, icon, khung xem ảnh lớn
  GLV.dienThongTinChung(document);
  GLV.khoiTaoXemAnh();

  // 3. Tương tác của từng phần
  choDat.forEach((el) => {
    const p = cacPhan[el.dataset.phan];
    if (p && p.chay && el.isConnected) p.chay(el);
  });
  GLV.fillIcons();

  // Tô sáng mục menu của phần đang xem
  const links = $$(".nav__link");
  if ("IntersectionObserver" in window && links.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.dataset.phan));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$("main [data-phan]").forEach((el) => io.observe(el));
  }

  // Mở trang bằng link có #muc (vd #lien-he): cuộn tới đúng chỗ sau khi đã dựng xong
  const h = decodeURIComponent(location.hash);
  if (h && !h.startsWith("#gv-")) {
    const target = document.getElementById(h.slice(1));
    if (target) target.scrollIntoView();
  }
})();
