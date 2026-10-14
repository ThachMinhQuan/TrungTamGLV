/* =====================================================================
   PHẦN CƠ SỞ VẬT CHẤT – cách hiển thị
   - Mục "Cơ sở vật chất": tiện ích + thư viện ảnh có bộ lọc
   - Mục "Trong lớp học": ảnh các buổi học, lọc theo thầy cô
   Bấm ảnh → mở khung xem ảnh lớn (chung/cong-cu.js).
   ===================================================================== */
(function () {
  "use strict";
  const { $, $$, esc, icon, img, tieuDe, teacherById } = GLV;

  let nhom = "all";
  let anhCoSo = [];
  let gvLop = "all";
  let anhLop = [];

  const oAnh = (a, i) =>
    `<a class="gallery__item" href="${esc(a.anh || "#")}" data-index="${i}">${img(a.anh, a.chuThich)}<span class="gallery__cap">${esc(a.chuThich)}</span></a>`;

  function veAnhCoSo() {
    $$("#galleryFilter .tab").forEach((b) => b.classList.toggle("is-active", b.dataset.group === nhom));
    anhCoSo = CO_SO_VAT_CHAT.filter((a) => nhom === "all" || a.nhom === nhom);
    $("#gallery").innerHTML = anhCoSo.map(oAnh).join("");
  }

  function veAnhLop() {
    $$("#classPhotoFilter .tab").forEach((b) => b.classList.toggle("is-active", b.dataset.gv === gvLop));
    anhLop = ANH_LOP_HOC.filter((a) => gvLop === "all" || a.giaoVien === gvLop).map((a) => {
      const t = teacherById(a.giaoVien);
      return { anh: a.anh, chuThich: t ? `${a.chuThich} cùng ${t.ten.charAt(0).toLowerCase() + t.ten.slice(1)}` : a.chuThich };
    });
    $("#classPhotos").innerHTML = anhLop.map(oAnh).join("");
  }

  GLV.phan("co-so-vat-chat", {
    menu: "Cơ sở vật chất",

    html() {
      const boLocCoSo = `
        <div class="tabs" role="group" aria-label="Lọc ảnh">
          <div class="tabs__group" id="galleryFilter">
            ${[{ key: "all", ten: "Tất cả ảnh" }].concat(NHOM_ANH).map((g) => `<button type="button" class="tab" data-group="${g.key}">${esc(g.ten)}</button>`).join("")}
          </div>
        </div>`;

      const gvCoAnh = [...new Set(ANH_LOP_HOC.map((a) => a.giaoVien))].filter(teacherById);
      const boLocLop = `
        <div class="tabs" role="group" aria-label="Lọc ảnh theo thầy cô">
          <div class="tabs__group" id="classPhotoFilter">
            <button type="button" class="tab" data-gv="all">Tất cả</button>
            ${gvCoAnh.map((id) => `<button type="button" class="tab" data-gv="${esc(id)}">${esc(teacherById(id).ten)}</button>`).join("")}
          </div>
        </div>`;

      return `
        <section class="section section--tint" id="co-so-vat-chat">
          <div class="container">
            ${tieuDe(PHAN_CO_SO_VAT_CHAT.tieuDe, PHAN_CO_SO_VAT_CHAT.moTa, boLocCoSo)}
            <ul class="amenities">${TIEN_ICH.map((a) => `<li>${icon(a.icon)}${esc(a.ten)}</li>`).join("")}</ul>
            <div class="gallery" id="gallery"></div>
          </div>
        </section>

        ${ANH_LOP_HOC.length ? `
        <section class="section" id="lop-hoc">
          <div class="container">
            ${tieuDe(PHAN_CO_SO_VAT_CHAT.tieuDeLopHoc, PHAN_CO_SO_VAT_CHAT.moTaLopHoc, boLocLop)}
            <div class="gallery gallery--class" id="classPhotos"></div>
          </div>
        </section>` : ""}`;
    },

    chay() {
      $("#galleryFilter").addEventListener("click", (e) => {
        const b = e.target.closest("[data-group]");
        if (!b) return;
        nhom = b.dataset.group;
        veAnhCoSo();
      });
      $("#gallery").addEventListener("click", (e) => {
        const a = e.target.closest(".gallery__item");
        if (!a) return;
        e.preventDefault();
        GLV.openLightbox(anhCoSo, +a.dataset.index);
      });
      veAnhCoSo();

      if (!$("#classPhotos")) return;
      $("#classPhotoFilter").addEventListener("click", (e) => {
        const b = e.target.closest("[data-gv]");
        if (!b) return;
        gvLop = b.dataset.gv;
        veAnhLop();
      });
      $("#classPhotos").addEventListener("click", (e) => {
        const a = e.target.closest(".gallery__item");
        if (!a) return;
        e.preventDefault();
        GLV.openLightbox(anhLop, +a.dataset.index);
      });
      veAnhLop();
    },
  });
})();
