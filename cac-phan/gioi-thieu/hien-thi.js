/* =====================================================================
   PHẦN GIỚI THIỆU – cách hiển thị
   Nội dung sửa ở du-lieu.js cùng thư mục.
   ===================================================================== */
(function () {
  "use strict";
  const { $, esc, clean, icon, img, tieuDe, ganLienKet } = GLV;

  GLV.phan("gioi-thieu", {
    menu: "Giới thiệu",

    html() {
      const a = GIOI_THIEU.anh;
      const camNhan = GIOI_THIEU.hienCamNhan && CAM_NHAN.length
        ? `<section class="section" id="cam-nhan">
            <div class="container">
              ${tieuDe(GIOI_THIEU.tieuDeCamNhan)}
              <div class="slider">
                <button class="slider__btn slider__btn--prev" id="tPrev" aria-label="Xem cảm nhận trước">${icon("chevron-left")}</button>
                <div class="slider__track" id="testimonials">
                  ${CAM_NHAN.map((c) => `
                    <figure class="testimonial">
                      <blockquote class="testimonial__text">${esc(c.noiDung)}</blockquote>
                      <figcaption class="testimonial__who"><strong>${esc(c.ten)}</strong><small>${esc(c.vaiTro)}</small></figcaption>
                    </figure>`).join("")}
                </div>
                <button class="slider__btn slider__btn--next" id="tNext" aria-label="Xem cảm nhận tiếp theo">${icon("chevron-right")}</button>
              </div>
            </div>
          </section>`
        : "";

      return `
        <section class="section" id="gioi-thieu">
          <div class="container about">
            <div class="about__text">
              <h2 class="section-title">${esc(GIOI_THIEU.tieuDe)}</h2>
              <div class="prose">${GIOI_THIEU.doanVan.map((p) => `<p>${ganLienKet(esc(clean(p)))}</p>`).join("")}</div>
            </div>
            ${a ? `<figure class="about__photo">${img(a.anh, a.chuThich)}<figcaption>${esc(a.chuThich)}</figcaption></figure>` : ""}
          </div>
          <div class="container">
            <ul class="reasons">
              ${LY_DO.map((l) => `<li>${icon(l.icon)}<strong>${esc(l.tieuDe)}</strong><span>${ganLienKet(esc(l.moTa))}</span></li>`).join("")}
            </ul>
          </div>
        </section>
        ${camNhan}`;
    },

    chay() {
      const track = $("#testimonials");
      if (!track) return;
      const step = () => track.clientWidth * 0.9;
      $("#tPrev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
      $("#tNext").addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    },
  });
})();
