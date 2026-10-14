/* =====================================================================
   CÔNG CỤ DÙNG CHUNG – thường KHÔNG cần sửa file này.
   Mọi phần dùng chung qua đối tượng GLV:
   - GLV.phan("ten-phan", { html, chay })  đăng ký một phần của trang
   - GLV.icon, GLV.img, GLV.esc ...        hàm tiện ích
   - GLV.openLightbox(danhSachAnh, viTri)  mở khung xem ảnh lớn
   ===================================================================== */
window.GLV = (function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
  // Ẩn các ghi chú nội bộ dạng [CẦN XÁC NHẬN ...] khỏi trang web
  const clean = (s) => String(s || "").replace(/\s*\[CẦN[^\]]*\]/g, "").trim();

  /* ---------------- Icon (SVG nội tuyến, nét theo bộ Lucide) ---------------- */
  const ICONS = {
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    "arrow-up": '<path d="m5 12 7-7 7 7M12 19V5"/>',
    "chevron-left": '<path d="m15 18-6-6 6-6"/>',
    "chevron-right": '<path d="m9 18 6-6-6-6"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    messenger: '<path d="M12 2C6.4 2 2 6.1 2 11.7c0 2.9 1.2 5.4 3.1 7.2V22l2.9-1.6c1.3.4 2.6.5 4 .5 5.6 0 10-4.1 10-9.7S17.6 2 12 2Z"/><path d="m6.5 14 3.5-4 2.5 2 3.5-2.5-3.5 4-2.5-2Z"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    "check-circle": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    graduation: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5M22 10v6"/>',
    building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    snowflake: '<path d="M2 12h20M12 2v20M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>',
    fan: '<path d="M10.83 16.38a6.08 6.08 0 0 1-8.62-7l5.41 1.45a6.08 6.08 0 0 1 7-8.62l-1.45 5.41a6.08 6.08 0 0 1 8.62 7l-5.41-1.45a6.08 6.08 0 0 1-7 8.62l1.45-5.41Z"/><path d="M12 12v.01"/>',
    lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
    wifi: '<path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 8.82a15 15 0 0 1 20 0M12 20h.01"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
    bike: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
    droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
    sofa: '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0ZM4 18v2M20 18v2"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C9.5 3 12 8 12 8s2.5-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M16 13H8M16 17H8M10 9H8"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    // Môn học
    sigma: '<path d="M18 7V4H6l6 8-6 8h12v-3"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    languages: '<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>',
    atom: '<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>',
    flask: '<path d="M10 2v7.53a2 2 0 0 1-.21.9L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.07-10.13a2 2 0 0 1-.21-.9V2M8.5 2h7M7 16h10"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  };

  function icon(name, cls) {
    const p = ICONS[name] || ICONS.image;
    return `<svg class="icon ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  }
  function fillIcons(root) {
    $$("[data-icon]", root || document).forEach((el) => {
      if (el.dataset.iconDone) return;
      el.innerHTML = icon(el.dataset.icon);
      el.dataset.iconDone = "1";
    });
  }

  /* ---------------- Họa tiết hoa lộc vừng & logo vẽ sẵn ---------------- */
  // Vẽ một chùm hoa lộc vừng rủ xuống: cuống cong + các bông hoa nhị đỏ, đầu nhị vàng
  function flowerString(n) {
    const w = 60, step = 34, h = n * step + 40;
    const pts = [];
    for (let i = 0; i < n; i++) pts.push([30 + Math.sin(i * 0.9) * 7, 18 + i * step]);
    let s = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMin meet" aria-hidden="true">`;
    s += `<path d="M30 0 ${pts.map(([x, y]) => `L${x.toFixed(1)} ${y}`).join(" ")}" stroke="#8a4a3a" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".75"/>`;
    pts.forEach(([x, y], i) => {
      const r = 13 - i * (6 / n);
      const k = 18;
      s += `<g transform="translate(${x.toFixed(1)} ${y})">`;
      for (let j = 0; j < k; j++) {
        const a = (j / k) * Math.PI * 2 + i;
        const len = r * (0.72 + 0.14 * (j % 3));
        const x2 = (Math.cos(a) * len).toFixed(1);
        const y2 = (Math.sin(a) * len + len * 0.3).toFixed(1);
        s += `<line x1="0" y1="0" x2="${x2}" y2="${y2}" stroke="#ff4d64" stroke-width="1.1"/><circle cx="${x2}" cy="${y2}" r="1.3" fill="#ffd166"/>`;
      }
      s += `<circle r="2.4" fill="#c81e3a"/></g>`;
    });
    const [lx, ly] = pts[pts.length - 1];
    s += `<circle cx="${lx.toFixed(1)}" cy="${ly + 16}" r="2.4" fill="#ff4d64"/><circle cx="${(lx + 1).toFixed(1)}" cy="${ly + 25}" r="1.7" fill="#ff4d64"/>`;
    return s + "</svg>";
  }

  // Logo dự phòng khi SITE.logo để trống: tấm biển đỏ nhỏ với bông lộc vừng vàng
  function logoSVG() {
    let rays = "";
    for (let j = 0; j < 18; j++) {
      const a = (j / 18) * Math.PI * 2;
      const len = j % 2 ? 10 : 13.5;
      const x2 = (24 + Math.cos(a) * len).toFixed(1);
      const y2 = (24 + Math.sin(a) * len).toFixed(1);
      rays += `<line x1="24" y1="24" x2="${x2}" y2="${y2}" stroke="#ffd23f" stroke-width="1.5" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="1.7" fill="#ffd23f"/>`;
    }
    return `<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="6" fill="#c8232b"/>${rays}<circle cx="24" cy="24" r="3.6" fill="#ffd23f"/></svg>`;
  }

  /* ---------------- Ảnh & khung giữ chỗ ---------------- */
  function placeholder(label) {
    return `<div class="ph">${icon("image")}<span>${esc(label)}</span></div>`;
  }
  function img(src, alt, eager) {
    return src
      ? `<img src="${esc(src)}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-ph="${esc(alt)}" />`
      : placeholder(alt);
  }
  // Ảnh lỗi (sai đường dẫn) → tự đổi sang khung giữ chỗ
  document.addEventListener(
    "error",
    (e) => {
      const t = e.target;
      if (t && t.tagName === "IMG" && t.dataset.ph !== undefined) t.outerHTML = placeholder(t.dataset.ph);
    },
    true
  );

  /* ---------------- Tra cứu dữ liệu giữa các phần ----------------
     Dùng GLV.duLieu.X thay vì X khi lấy dữ liệu của phần KHÁC: nếu phần đó
     bị bỏ khỏi index.html thì trả về danh sách rỗng thay vì gây lỗi. */
  const duLieu = {
    get MON_HOC() { return typeof MON_HOC !== "undefined" ? MON_HOC : {}; },
    get CAP_HOC() { return typeof CAP_HOC !== "undefined" ? CAP_HOC : []; },
    get GIAO_VIEN() { return typeof GIAO_VIEN !== "undefined" ? GIAO_VIEN : []; },
    get LOP_HOC() { return typeof LOP_HOC !== "undefined" ? LOP_HOC : []; },
    get ANH_LOP_HOC() { return typeof ANH_LOP_HOC !== "undefined" ? ANH_LOP_HOC : []; },
    get THONG_TIN_KHOA_HOC() { return typeof THONG_TIN_KHOA_HOC !== "undefined" ? THONG_TIN_KHOA_HOC : []; },
  };
  const monInfo = (key) => duLieu.MON_HOC[key] || { ten: key, icon: "book" };
  const monVar = (key) => `--mon: var(--mon-${key}, var(--muc))`;
  const capInfo = (key) => duLieu.CAP_HOC.find((c) => c.key === key) || { vietTat: String(key).toUpperCase(), ten: key };
  const teacherById = (id) => duLieu.GIAO_VIEN.find((g) => g.id === id);
  const classesOf = (id) => duLieu.LOP_HOC.filter((l) => l.giaoVien === id);
  // "Thứ 4: 17h30 – 19h30, Thứ 7: 14h15 – 16h15"
  const sessionsText = (l, sep) => (l.buoi && l.buoi.length ? l.buoi.map((b) => `${b.thu}: ${b.gio}`).join(sep) : l.lich || "Liên hệ");
  const xungHo = (t) => (t.ten.split(" ")[0] || "").toLowerCase(); // "thầy" / "cô"
  const khoaHoc = (tieuDe) => (duLieu.THONG_TIN_KHOA_HOC.find((k) => k.tieuDe === tieuDe) || {}).noiDung || "";

  /* ---------------- Link gọi điện, Zalo, Messenger, SMS ---------------- */
  const LINKS = {
    tel: SITE.hotline ? "tel:" + SITE.hotline : "",
    tel2: SITE.hotline2 ? "tel:" + SITE.hotline2 : "",
    zalo: SITE.zalo ? "https://zalo.me/" + SITE.zalo : "",
    zalo2: SITE.zalo2 ? "https://zalo.me/" + SITE.zalo2 : "",
    messenger: SITE.messenger ? "https://m.me/" + SITE.messenger : "",
    sms: SITE.hotline ? "sms:" + SITE.hotline : "",
  };

  // Danh sách số điện thoại: [{ nhan, so (hiển thị), tel, zalo }]
  function cacSoDienThoai() {
    return [
      SITE.hotline && { nhan: "Hotline", so: SITE.hotlineHienThi || SITE.hotline, tel: LINKS.tel, zalo: LINKS.zalo },
      SITE.hotline2 && { nhan: "Số thứ hai", so: SITE.hotline2HienThi || SITE.hotline2, tel: LINKS.tel2, zalo: LINKS.zalo2 },
    ].filter(Boolean);
  }
  // Số điện thoại bấm được + nút Zalo nhỏ bên cạnh
  function soVaZalo(p, cls) {
    return `<a href="${p.tel}"${cls ? ` class="${cls}"` : ""}>${esc(p.so)}</a>${p.zalo ? `<a class="zalo-chip" href="${p.zalo}" target="_blank" rel="noopener">Zalo</a>` : ""}`;
  }
  // Tự gắn link cho số điện thoại và chữ "Zalo" trong một đoạn chữ ĐÃ esc().
  // Số có Zalo đăng ký thì chữ "Zalo" mở Zalo của số đó, không thì của số thứ nhất.
  function ganLienKet(html) {
    const soZalo = { [SITE.hotline]: LINKS.zalo, [SITE.hotline2]: LINKS.zalo2 };
    let zaloGanNhat = LINKS.zalo;
    html = html.replace(/(^|[^\d])(0\d{2,3}[ .]?\d{3}[ .]?\d{3})(?!\d)/g, (m, truoc, so) => {
      const tron = so.replace(/[ .]/g, "");
      if (soZalo[tron]) zaloGanNhat = soZalo[tron];
      return `${truoc}<a href="tel:${tron}">${so}</a>`;
    });
    if (!zaloGanNhat) return html;
    return html.replace(/\bZalo\b(?![^<]*<\/a>)/g, `<a href="${zaloGanNhat}" target="_blank" rel="noopener">Zalo</a>`);
  }

  // Điền thông tin chung vào các thẻ có data-bind / data-link / data-logo / hoa lộc vừng
  function dienThongTinChung(root) {
    $$("[data-bind]", root).forEach((el) => {
      const v = SITE[el.dataset.bind];
      if (!v) return;
      // Chữ có xuống dòng (\n) thì hiện đúng từng dòng
      if (String(v).includes("\n")) el.innerHTML = String(v).split("\n").map(esc).join("<br>");
      else el.textContent = v;
    });
    $$("[data-link]", root).forEach((a) => {
      const href = LINKS[a.dataset.link];
      if (href) a.href = href;
      else a.hidden = true;
    });
    $$("[data-logo]", root).forEach((el) => {
      el.innerHTML = SITE.logo ? `<img src="${esc(SITE.logo)}" alt="Logo ${esc(SITE.ten)}" />` : logoSVG();
      el.classList.toggle("logo__mark--img", !!SITE.logo);
    });
    $$(".locvung", root).forEach((el) => (el.innerHTML = flowerString(+el.dataset.flowers || 6)));
  }

  // Tiêu đề mỗi mục: <h2> + dòng mô tả (+ khối phụ bên phải, vd bộ lọc)
  function tieuDe(title, sub, right) {
    const head = `<h2 class="section-title">${esc(title)}</h2>${sub ? `<p class="section-sub">${ganLienKet(esc(sub))}</p>` : ""}`;
    return right
      ? `<div class="section-head section-head--row"><div>${head}</div>${right}</div>`
      : `<div class="section-head">${head}</div>`;
  }

  /* ---------------- Đăng ký các phần của trang ---------------- */
  const cacPhan = {};
  function phan(id, dinhNghia) {
    cacPhan[id] = dinhNghia;
  }

  /* ---------------- Khung xem ảnh lớn (dùng chung) ---------------- */
  const htmlXemAnh = `
    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Xem ảnh" hidden>
      <button class="lightbox__close" data-close aria-label="Đóng">${icon("x")}</button>
      <button class="lightbox__nav lightbox__nav--prev" id="lbPrev" aria-label="Ảnh trước">${icon("chevron-left")}</button>
      <figure class="lightbox__figure">
        <div class="lightbox__media" id="lbMedia"></div>
        <figcaption><span id="lbCaption"></span> <span class="lightbox__count" id="lbCount"></span></figcaption>
      </figure>
      <button class="lightbox__nav lightbox__nav--next" id="lbNext" aria-label="Ảnh sau">${icon("chevron-right")}</button>
    </div>`;
  const lbState = { list: [], i: 0 };

  function showLightbox() {
    const it = lbState.list[lbState.i];
    $("#lbMedia").innerHTML = it.anh ? `<img src="${esc(it.anh)}" alt="${esc(it.chuThich)}" data-ph="${esc(it.chuThich)}" />` : placeholder(it.chuThich);
    $("#lbCaption").textContent = it.chuThich;
    $("#lbCount").textContent = lbState.list.length > 1 ? `${lbState.i + 1}/${lbState.list.length}` : "";
    $("#lbPrev").hidden = $("#lbNext").hidden = lbState.list.length < 2;
  }
  function openLightbox(items, i) {
    lbState.list = items;
    lbState.i = i;
    showLightbox();
    $("#lightbox").hidden = false;
    document.body.style.overflow = "hidden";
    $(".lightbox__close").focus();
  }
  function closeLightbox() {
    $("#lightbox").hidden = true;
    if (!$(".modal:not([hidden])")) document.body.style.overflow = "";
  }
  function stepLightbox(d) {
    const n = lbState.list.length;
    lbState.i = (lbState.i + d + n) % n;
    showLightbox();
  }
  function lightboxOpen() {
    const lb = $("#lightbox");
    return lb && !lb.hidden;
  }
  function khoiTaoXemAnh() {
    document.body.insertAdjacentHTML("beforeend", htmlXemAnh);
    const lb = $("#lightbox");
    $("#lbPrev").addEventListener("click", () => stepLightbox(-1));
    $("#lbNext").addEventListener("click", () => stepLightbox(1));
    lb.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]") || e.target === lb) closeLightbox();
    });
    let touchX = null;
    lb.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
      touchX = null;
    });
  }

  /* ---------------- Phím Esc: đóng thứ đang mở ---------------- */
  const khiNhanEsc = []; // các phần thêm hàm vào đây; hàm trả về true nếu đã xử lý
  document.addEventListener("keydown", (e) => {
    if (lightboxOpen()) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
      return;
    }
    if (e.key === "Escape") khiNhanEsc.some((fn) => fn());
  });

  return {
    $, $$, esc, clean, icon, fillIcons, flowerString, logoSVG, placeholder, img,
    duLieu, monInfo, monVar, capInfo, teacherById, classesOf, sessionsText, xungHo, khoaHoc,
    LINKS, cacSoDienThoai, soVaZalo, ganLienKet, dienThongTinChung, tieuDe,
    phan, cacPhan,
    openLightbox, khoiTaoXemAnh, khiNhanEsc,
  };
})();
