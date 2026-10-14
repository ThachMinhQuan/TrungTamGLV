/* =====================================================================
   KHUNG TRANG – phần dùng chung cho cả website:
   thanh đầu trang (logo + menu), tấm biển hiệu, chân trang, nút liên hệ nổi.
   Nội dung lấy từ chung/thong-tin-chung.js (SITE).
   Menu tự tạo theo các phần có trong index.html (mỗi phần khai báo "menu").
   ===================================================================== */
(function () {
  "use strict";
  const { $, $$, esc, icon, img, khoaHoc, duLieu, monInfo, LINKS, cacSoDienThoai, soVaZalo } = GLV;

  /* ---------------- Thanh đầu trang ---------------- */
  GLV.phan("dau-trang", {
    html() {
      // Menu: lấy theo thứ tự các phần trong <main>
      const menu = $$("main [data-phan]")
        .map((el) => ({ id: el.dataset.phan, ten: (GLV.cacPhan[el.dataset.phan] || {}).menu }))
        .filter((m) => m.ten)
        .map((m) => `<li><a class="nav__link" href="#${m.id}">${esc(m.ten)}</a></li>`)
        .join("");
      return `
        <header class="header" id="header">
          <div class="container header__inner">
            <a href="#trang-chu" class="logo" aria-label="Về đầu trang">
              <span class="logo__mark" data-logo></span>
              <span class="logo__text">
                <span class="logo__name" data-bind="tenNgan"></span>
                <span class="logo__small">Cơ sở bổ trợ kiến thức</span>
              </span>
            </a>
            <nav class="nav" id="nav" aria-label="Menu chính">
              <ul class="nav__list">${menu}</ul>
              <a class="btn btn--red nav__cta-mobile" href="#dang-ky">Đăng ký học</a>
            </nav>
            <a class="btn btn--red header__hotline" data-link="tel">${icon("phone")}<span data-bind="hotlineHienThi"></span></a>
            <button class="nav-toggle" id="navToggle" aria-label="Mở menu" aria-expanded="false" aria-controls="nav">${icon("menu")}</button>
          </div>
        </header>`;
    },
    chay() {
      const header = $("#header");
      const nav = $("#nav");
      const navToggle = $("#navToggle");

      function closeNav() {
        if (!nav.classList.contains("is-open")) return false;
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = icon("menu");
        return true;
      }
      navToggle.addEventListener("click", () => {
        const open = !nav.classList.contains("is-open");
        nav.classList.toggle("is-open", open);
        navToggle.setAttribute("aria-expanded", String(open));
        navToggle.innerHTML = icon(open ? "x" : "menu");
      });
      nav.addEventListener("click", (e) => {
        if (e.target.closest("a")) closeNav();
      });
      document.addEventListener("click", (e) => {
        if (nav.classList.contains("is-open") && !nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
      });
      GLV.khiNhanEsc.push(closeNav);

      const onScroll = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 10);
        const toTop = $("#toTop");
        if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 700);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    },
  });

  /* ---------------- Tấm biển hiệu đầu trang ---------------- */
  const hoaLocVung = `
              <div class="sign__flowers" aria-hidden="true">
                <span class="locvung" data-flowers="8"></span>
                <span class="locvung" data-flowers="5"></span>
                <span class="locvung" data-flowers="7"></span>
                <span class="locvung" data-flowers="4"></span>
              </div>`;

  /* ---------------- Banner vẽ bằng vector (SVG) ----------------
     Nét căng ở mọi độ phân giải. Bố cục theo ảnh banner gốc (assets/images/hero/banner.jpg, 1280 x 502):
     mỗi đoạn chữ đặt đúng vị trí và độ rộng đo từ ảnh gốc (textLength),
     nên nếu sửa chữ dài hơn nhiều thì chữ sẽ bị ép hẹp lại. */
  function veBannerVector(o) {
    const RED = "#c80000", YEL = "#ffe600", YEL2 = "#ffd400", INK = "#1a0000";
    const F1 = "Anton, Impact, 'Arial Narrow', sans-serif";
    const F2 = "'Barlow Condensed', 'Arial Narrow', sans-serif";
  
    // chữ nhiều lớp viền: [màu, độ dày] từ ngoài vào trong, rồi màu chữ
    const lop = (txt, attrs, vien, fill) =>
      vien.map(([c, w]) => `<text ${attrs} fill="${c}" stroke="${c}" stroke-width="${w}" stroke-linejoin="round">${esc(txt)}</text>`).join("") +
      `<text ${attrs} fill="${fill}">${esc(txt)}</text>`;

    // một đoạn chữ dòng dưới (đặt theo x bắt đầu và độ rộng đo từ ảnh gốc)
    const doan = (txt, x, w, y, size, link, nhan) => {
      const t = `<text x="${x}" y="${y}" font-family="${F2}" font-weight="700" font-size="${size}" fill="${YEL}" textLength="${w}" lengthAdjust="spacingAndGlyphs">${esc(txt)}</text>`;
      return link ? `<a href="${esc(link)}"${/^https?:/.test(link) ? ' target="_blank" rel="noopener"' : ""} aria-label="${esc(nhan)}"><title>${esc(nhan)}</title><rect x="${x - 6}" y="${y - size * 0.86}" width="${w + 12}" height="${size * 1.05}" fill="transparent"/>${t}</a>` : t;
    };
    const sao = (x, y) => `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-weight="700" font-size="30" fill="${YEL}">*</text>`;

    // họa tiết góc (vẽ cho góc trên trái, các góc khác lật lại)
    const goc = `<path d="M18 112 V18 H112 M30 74 V30 H74 M42 62 V42 H62 V54 H50 V50" fill="none" stroke="${YEL}" stroke-width="5" stroke-linejoin="miter" stroke-linecap="square"/>`;
    const gocs = [
      "", "translate(1280 0) scale(-1 1)", "translate(0 502) scale(1 -1)", "translate(1280 502) scale(-1 -1)",
    ].map((t) => `<g transform="${t}">${goc}</g>`).join("");

    return `<svg class="sign__svg" viewBox="0 0 1280 502" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="bannerTitle">
    <title id="bannerTitle">${esc(o.dongTren + " " + o.tenLon)}</title>
    <rect width="1280" height="502" fill="${RED}"/>
    <!-- khung vàng: đường viền chạy giữa các họa tiết góc -->
    <path d="M112 18 H1168 M112 484 H1168 M18 112 V390 M1262 112 V390" stroke="${YEL}" stroke-width="5"/>
    ${gocs}
    ${lop(o.dongTren, `x="645" y="155" text-anchor="middle" font-family="${F1}" font-size="80" textLength="1120" lengthAdjust="spacingAndGlyphs"`, [[YEL2, 18], [INK, 11]], "#ffffff")}
    ${lop(o.tenLon, `x="645" y="306" text-anchor="middle" font-family="${F1}" font-size="122" textLength="850" lengthAdjust="spacingAndGlyphs"`, [[YEL2, 22], [RED, 16], [INK, 9]], YEL)}
    ${doan(o.hkd, 59, 261, 378, 38)}
    ${sao(338, 384)}
    ${doan(o.gpkd, 378, 313, 378, 38)}
    ${sao(713, 384)}
    ${doan("ĐT / ZALO:", 753, 115, 378, 38, o.zalo, "Nhắn Zalo")}
    ${doan(o.so1, 878, 154, 378, 38, o.tel1, "Gọi " + o.so1)}
    ${sao(1052, 384)}
    ${doan(o.so2, 1088, 140, 378, 38, o.tel2, "Gọi " + o.so2)}
    ${sao(376, 434)}
    ${doan(o.diaChi, 419, 444, 428, 36, o.banDo, "Chỉ đường bằng Google Maps")}
  </svg>`;
  }

  function htmlBienHieu() {
    const bh = SITE.bienHieu || {};
    // Banner vector (khuyên dùng – nét căng): số điện thoại, Zalo, địa chỉ là link thật trong hình
    if (bh.kieu === "vector") {
      const chamSo = (so) => String(so || "").replace(/\s+/g, ".");
      const svg = veBannerVector({
        dongTren: bh.dongTren, tenLon: bh.tenLon, hkd: bh.hkd, gpkd: bh.gpkd, diaChi: bh.diaChi,
        so1: chamSo(SITE.hotlineHienThi), so2: chamSo(SITE.hotline2HienThi),
        tel1: LINKS.tel, tel2: LINKS.tel2, zalo: LINKS.zalo, banDo: SITE.googleMapsLink || "",
      });
      return `
            <div class="sign sign--anh">
              <h1 class="sr-only">${esc(SITE.tenBienHieu || SITE.ten)}</h1>
              ${svg}
              ${hoaLocVung}
            </div>`;
    }
    // Banner là ảnh: tên cơ sở vẫn có trong thẻ <h1> (ẩn) cho Google và trình đọc màn hình
    if (bh.kieu === "anh" && bh.anh) {
      const lienKet = { ...LINKS, banDo: SITE.googleMapsLink || "" };
      const vung = (bh.vungBam || [])
        .filter((v) => lienKet[v.link])
        .map((v) => {
          const ngoai = /^https?:/.test(lienKet[v.link]) ? ' target="_blank" rel="noopener"' : "";
          return `<a class="sign__vung" href="${esc(lienKet[v.link])}"${ngoai} style="left:${v.left}%;top:${v.top}%;width:${v.width}%;height:${v.height}%" aria-label="${esc(v.nhan)}" title="${esc(v.nhan)}"></a>`;
        })
        .join("");
      return `
            <div class="sign sign--anh">
              <h1 class="sr-only">${esc(SITE.tenBienHieu || SITE.ten)}</h1>
              <img class="sign__img" src="${esc(bh.anh)}" alt="Biển hiệu ${esc(SITE.tenBienHieu || SITE.ten)} – ĐT/Zalo ${esc(SITE.hotlineHienThi)}${SITE.hotline2HienThi ? " – " + esc(SITE.hotline2HienThi) : ""} – ${esc(SITE.diaChi)}" width="1280" height="502" fetchpriority="high" />
              ${vung}
              ${hoaLocVung}
            </div>`;
    }
    // Không có ảnh: tấm biển vẽ bằng chữ
    return `
            <div class="sign">
              <span class="sign__bolt sign__bolt--tl"></span><span class="sign__bolt sign__bolt--tr"></span>
              <span class="sign__bolt sign__bolt--bl"></span><span class="sign__bolt sign__bolt--br"></span>
              <h1 class="sign__name"></h1>
              <p class="sign__line">
                <span>ĐT/<a data-link="zalo" target="_blank" rel="noopener">Zalo</a>: <a data-link="tel" data-bind="hotlineHienThi"></a>${SITE.hotline2 ? ` – <a data-link="tel2" data-bind="hotline2HienThi"></a>` : ""}</span>
                <span data-bind="diaChi"></span>
              </p>
              ${hoaLocVung}
            </div>`;
  }

  GLV.phan("tam-bien", {
    html() {
      return `
        <section class="hero" id="trang-chu">
          <div class="container">
            ${htmlBienHieu()}

            <div class="hero__body">
              <div class="hero__text">
                <p class="hero__lead" data-bind="moTaNgan"></p>
                <p class="hero__note" id="heroNote"></p>
                <div class="hero__actions">
                  <a href="#dang-ky" class="btn btn--red btn--lg">Đăng ký học</a>
                  <a class="btn btn--line btn--lg" data-link="tel">${icon("phone")} Gọi <span data-bind="hotlineHienThi"></span></a>
                  <a class="btn btn--zalo btn--lg" data-link="zalo" target="_blank" rel="noopener">Nhắn Zalo</a>
                </div>
              </div>
              <figure class="hero__photo">
                ${img(SITE.anhBia, SITE.chuThichAnhBia || "Phòng học tại cơ sở", true)}
                ${SITE.chuThichAnhBia ? `<figcaption>${esc(SITE.chuThichAnhBia)}</figcaption>` : ""}
              </figure>
            </div>
          </div>
        </section>`;
    },
    chay() {
      // Tên trên biển: tách tên riêng "Gió Lộc Vừng" thành dòng chữ lớn nhất
      const full = SITE.tenBienHieu || SITE.ten;
      const i = SITE.tenNgan ? full.lastIndexOf(SITE.tenNgan) : -1;
      if ($(".sign__name")) $(".sign__name").innerHTML = i > 0
        ? `<span class="sign__pre">${esc(full.slice(0, i).trim())}</span> <span class="sign__brand">${esc(full.slice(i))}</span>`
        : esc(full);

      // Dòng học phí, sĩ số dưới đoạn mô tả (lấy từ phần Tuyển sinh)
      const hocPhi = khoaHoc("Học phí");
      const siSo = khoaHoc("Sĩ số");
      const ghiChu = [
        hocPhi && `Học phí <strong>${esc(hocPhi.replace(/\s*\/\s*/g, "/"))}</strong>`,
        siSo && esc(siSo.charAt(0).toLowerCase() + siSo.slice(1).replace(/\s*\/\s*/g, " mỗi ")),
      ].filter(Boolean).join(", ");
      // viết hoa chữ đầu câu (khi không có học phí, câu bắt đầu bằng "tối đa...")
      $("#heroNote").innerHTML = (ghiChu ? ghiChu.charAt(0).toUpperCase() + ghiChu.slice(1) + "." : "") +
        (SITE.viTriNoiBat ? ` ${esc(SITE.viTriNoiBat)}.` : "");
    },
  });

  /* ---------------- Chân trang ---------------- */
  GLV.phan("chan-trang", {
    html() {
      const monTheoCap = duLieu.CAP_HOC.map(
        (c) => `<li><a href="#mon-hoc">${esc(c.vietTat)}: ${esc(c.mon.filter((m) => m.trangThai === "dang-tuyen").map((m) => monInfo(m.key).ten).join(", "))}</a></li>`
      ).join("");
      const mangXaHoi = [
        SITE.facebook && `<a href="${esc(SITE.facebook)}" target="_blank" rel="noopener" aria-label="Facebook">${icon("facebook")}</a>`,
        LINKS.zalo && `<a href="${LINKS.zalo}" target="_blank" rel="noopener">Zalo</a>`,
        SITE.tiktok && `<a href="${esc(SITE.tiktok)}" target="_blank" rel="noopener">TikTok</a>`,
      ].filter(Boolean).join("");
      return `
        <footer class="footer">
          <div class="container footer__grid">
            <div class="footer__brand">
              <a href="#trang-chu" class="logo logo--light">
                <span class="logo__mark" data-logo></span>
                <span class="logo__text">
                  <span class="logo__name" data-bind="tenNgan"></span>
                  <span class="logo__small">Cơ sở bổ trợ kiến thức</span>
                </span>
              </a>
              <p data-bind="moTaNgan"></p>
            </div>
            ${monTheoCap ? `<div><h3>Môn học</h3><ul class="footer__links">${monTheoCap}</ul></div>` : ""}
            <div>
              <h3>Liên hệ</h3>
              <ul class="footer__links">
                <li>${esc(SITE.diaChi)}</li>
                ${cacSoDienThoai().map((p) => `<li>${soVaZalo(p)}</li>`).join("")}
                ${SITE.email ? `<li><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></li>` : ""}
              </ul>
              <div class="socials">${mangXaHoi}</div>
            </div>
          </div>
          <div class="footer__bottom">
            <div class="container">
              <span data-bind="phapLy"></span><br />
              © ${new Date().getFullYear()} <span data-bind="ten"></span>
            </div>
          </div>
        </footer>`;
    },
  });

  /* ---------------- Nút liên hệ nổi, nút lên đầu trang, thanh dưới điện thoại ---------------- */
  GLV.phan("nut-noi", {
    html() {
      return `
        <div class="float-contact" aria-label="Liên hệ nhanh">
          <a class="float-btn float-btn--zalo" data-link="zalo" target="_blank" rel="noopener" aria-label="Nhắn Zalo">Zalo</a>
          <a class="float-btn float-btn--phone" data-link="tel" aria-label="Gọi điện">${icon("phone")}</a>
        </div>
        <button class="to-top" id="toTop" aria-label="Lên đầu trang">${icon("arrow-up")}</button>
        <div class="mobile-bar">
          <a class="mobile-bar__btn mobile-bar__btn--call" data-link="tel">${icon("phone")} Gọi</a>
          <a class="mobile-bar__btn mobile-bar__btn--zalo" data-link="zalo" target="_blank" rel="noopener">Zalo</a>
          <a class="mobile-bar__btn mobile-bar__btn--reg" href="#dang-ky">Đăng ký học</a>
        </div>`;
    },
    chay() {
      $("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    },
  });
})();
