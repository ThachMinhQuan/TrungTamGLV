/* =====================================================================
   PHẦN LIÊN HỆ – cách hiển thị
   - Dải đỏ "thuê phòng" (bật/tắt trong du-lieu.js)
   - Địa chỉ, điện thoại, chỉ đường + bản đồ Google Maps
   Địa chỉ, số điện thoại, bản đồ sửa ở chung/thong-tin-chung.js.
   ===================================================================== */
(function () {
  "use strict";
  const { esc, icon, placeholder, tieuDe, cacSoDienThoai, soVaZalo, ganLienKet } = GLV;

  GLV.phan("lien-he", {
    menu: "Liên hệ",

    html() {
      const tp = PHAN_LIEN_HE.thuePhong;
      const thuePhong = tp && tp.hien
        ? `<section class="rent" id="thue-phong">
            <div class="container rent__inner">
              <div>
                <h2>${esc(tp.tieuDe)}</h2>
                <p>${ganLienKet(esc(tp.moTa))}</p>
              </div>
              <div class="rent__actions">
                <a class="btn btn--yellow" data-link="tel">${icon("phone")} Gọi xem phòng</a>
                <a class="btn btn--line-light" data-link="zalo" target="_blank" rel="noopener">Nhắn Zalo</a>
              </div>
            </div>
          </section>`
        : "";

      const phones = cacSoDienThoai().map((p) => `<span class="contact__phone">${soVaZalo(p)}</span>`).join("");

      const dong = [
        { dt: "Địa chỉ", dd: `${esc(SITE.diaChi)}${SITE.diaChiPhu ? `<small>${esc(SITE.diaChiPhu)}</small>` : ""}${SITE.maGoogleMaps ? `<small>Mã vị trí Google Maps: ${esc(SITE.maGoogleMaps)}</small>` : ""}` },
        phones && { dt: "Điện thoại", dd: phones },
        SITE.email && { dt: "Email", dd: `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>` },
        SITE.gioLamViec && { dt: "Thời gian học", dd: esc(SITE.gioLamViec) },
        SITE.googleMapsLink && { dt: "Chỉ đường", dd: `<a href="${esc(SITE.googleMapsLink)}" target="_blank" rel="noopener">Chỉ đường bằng Google Maps ${icon("external")}</a>` },
      ].filter(Boolean);

      const banDo = SITE.googleMapsEmbed
        ? `<iframe src="${esc(SITE.googleMapsEmbed)}" title="Bản đồ đường đến ${esc(SITE.ten)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`
        : placeholder("Bản đồ Google Maps – dán link nhúng vào chung/thong-tin-chung.js");

      return `
        ${thuePhong}
        <section class="section" id="lien-he">
          <div class="container contact">
            <div>
              ${tieuDe(PHAN_LIEN_HE.tieuDe, PHAN_LIEN_HE.moTa)}
              <dl class="contact__list">${dong.map((r) => `<div><dt>${r.dt}</dt><dd>${r.dd}</dd></div>`).join("")}</dl>
            </div>
            <div class="contact__map">${banDo}</div>
          </div>
        </section>`;
    },
  });
})();
