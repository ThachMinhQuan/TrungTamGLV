/* =====================================================================
   PHẦN GIÁO VIÊN – cách hiển thị
   - Danh sách thầy cô + bộ lọc theo cấp, theo môn
   - Trang giới thiệu riêng (cửa sổ) với link riêng: index.html#gv-<id>
   Lịch học lấy từ thời khóa biểu (phần Tuyển sinh), ảnh buổi học lấy từ
   phần Cơ sở vật chất.
   ===================================================================== */
(function () {
  "use strict";
  const { $, $$, esc, clean, icon, tieuDe, monInfo, capInfo, teacherById, classesOf, sessionsText, xungHo, duLieu, LINKS, ganLienKet } = GLV;

  const filterState = { cap: "all", mon: "all" };
  let lastFocus = null;
  let currentTeacherId = null;

  function initials(name) {
    const parts = name.split(" ").filter(Boolean).slice(1); // bỏ "Thầy"/"Cô"
    if (!parts.length) return "?";
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
  }
  // Ảnh chân dung; chưa có ảnh thì hiện tấm bảng xanh với chữ cái đầu viết phấn
  function portrait(t, cls) {
    const body = t.anh
      ? `<img src="${esc(t.anh)}" alt="Ảnh ${esc(t.ten)}" loading="lazy" data-ph="Ảnh ${esc(t.ten)}" />`
      : `<div class="chalk-ph" role="img" aria-label="${esc(t.ten)} – ảnh đang cập nhật"><span class="chalk-ph__initials">${esc(initials(t.ten))}</span><span class="chalk-ph__note">Ảnh đang cập nhật</span></div>`;
    return `<div class="${cls}">${body}</div>`;
  }

  /* ---------------- Danh sách thầy cô ---------------- */
  function renderTeachers() {
    $$("#levelFilter .tab").forEach((b) => b.classList.toggle("is-active", b.dataset.cap === filterState.cap));
    $$("#teacherFilter .tab").forEach((b) => b.classList.toggle("is-active", b.dataset.mon === filterState.mon));

    const list = GIAO_VIEN.filter(
      (t) => (filterState.cap === "all" || t.cap.includes(filterState.cap)) && (filterState.mon === "all" || t.mon.includes(filterState.mon))
    );
    $("#teacherEmpty").hidden = list.length > 0;
    $("#teacherGrid").innerHTML = list
      .map(
        (t) => `<a class="teacher" href="#gv-${esc(t.id)}">
          ${portrait(t, "teacher__photo")}
          <div class="teacher__degree">${esc(clean(t.hocVi))}</div>
          <h3 class="teacher__name">${esc(t.ten)}</h3>
          <div class="teacher__role">${esc(t.chucVu)}</div>
          ${t.lopDay && t.lopDay.length ? `<div class="teacher__classes">Dạy ${esc(t.lopDay.join(", "))}</div>` : ""}
          <span class="teacher__more">Đọc giới thiệu</span>
        </a>`
      )
      .join("");
  }

  /* ---------------- Trang giới thiệu riêng ---------------- */
  function openTeacher(id) {
    const t = teacherById(id);
    if (!t) return;
    currentTeacherId = t.id;
    const xung = xungHo(t);
    // Lịch học: lấy từ thời khóa biểu; chưa có lớp nào thì dùng t.lichHoc
    const lich = classesOf(t.id).map((l) => `<strong>${esc(l.ten)}:</strong> ${esc(sessionsText(l, ", "))}`);
    const lichHtml = lich.length ? lich : (t.lichHoc || []).map((l) => esc(clean(l)));
    const photos = duLieu.ANH_LOP_HOC.filter((a) => a.giaoVien === t.id);
    const online = (t.dangKyOnline || [])
      .map((f) => `<a href="${esc(f.link)}" target="_blank" rel="noopener">${esc(f.ten.replace(/^Đăng ký\s*/i, ""))}</a>`)
      .join(", ");

    $("#modalBody").innerHTML = `
      <div class="profile">
        <aside class="profile__side">
          ${portrait(t, "profile__photo")}
          <dl class="profile__facts">
            <div><dt>Học vị</dt><dd>${esc(clean(t.hocVi))}</dd></div>
            <div><dt>Nơi công tác</dt><dd>${esc(t.chucVu)}</dd></div>
            <div><dt>Dạy tại cơ sở</dt><dd>${esc(t.mon.map((m) => monInfo(m).ten).join(", "))}, ${esc(t.cap.map((c) => capInfo(c).vietTat).join(", "))}</dd></div>
          </dl>
        </aside>
        <div class="profile__main">
          <div class="profile__degree">${esc(clean(t.hocVi))}</div>
          <h2 class="profile__name" id="modalTitle">${esc(t.ten)}</h2>
          <div class="profile__role">${esc(t.chucVu)}</div>
          <p class="profile__intro">${ganLienKet(esc(clean(t.gioiThieu)))}</p>

          ${t.lopDay && t.lopDay.length ? `<div class="profile__block"><h3>Lớp đang dạy</h3><div class="profile__classes">${t.lopDay.map((l) => `<span>${esc(l)}</span>`).join("")}</div></div>` : ""}
          ${t.noiDung && t.noiDung.length ? `<div class="profile__block"><h3>Nội dung giảng dạy</h3><ul class="profile__list">${t.noiDung.map((n) => `<li>${icon("check")}<span>${esc(clean(n))}</span></li>`).join("")}</ul></div>` : ""}
          ${lichHtml.length ? `<div class="profile__block"><h3>Lịch học</h3><ul class="profile__list profile__schedule">${lichHtml.map((l) => `<li>${l}</li>`).join("")}</ul></div>` : ""}
          ${photos.length ? `<div class="profile__block"><h3>Ảnh buổi học</h3><div class="profile__photos">${photos.map((a, i) => `<button type="button" data-photo="${i}" aria-label="Xem ảnh buổi học ${i + 1}"><img src="${esc(a.anh)}" alt="${esc(a.chuThich)} cùng ${esc(t.ten)}" loading="lazy" /></button>`).join("")}</div></div>` : ""}

          <div class="profile__block profile__enroll">
            <h3>Đăng ký học với ${esc(xung)}</h3>
            <div class="profile__actions">
              ${(t.lopDay || []).map((l) => `<button type="button" class="btn btn--red btn--sm" data-enroll="${esc(t.id)}" data-lop="${esc(l)}">Đăng ký ${esc(l)}</button>`).join("")}
              ${LINKS.tel ? `<a class="btn btn--line btn--sm" href="${LINKS.tel}">${icon("phone")} Gọi tư vấn</a>` : ""}
              ${LINKS.zalo ? `<a class="btn btn--zalo btn--sm" href="${LINKS.zalo}" target="_blank" rel="noopener">Nhắn Zalo</a>` : ""}
            </div>
            ${online ? `<p class="profile__online">Hoặc đăng ký online qua Google Form: ${online}</p>` : ""}
          </div>
          <p class="profile__share">Trang này có link riêng để gửi qua Zalo, Facebook: <button type="button" data-copy="${esc(t.id)}">Sao chép link</button></p>
        </div>
      </div>`;

    const modal = $("#teacherModal");
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal__box", modal).scrollTop = 0;
    $(".modal__box", modal).focus();
  }

  function closeTeacher() {
    const modal = $("#teacherModal");
    if (modal.hidden) return false;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (location.hash.startsWith("#gv-")) history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    return true;
  }

  function handleHash() {
    const h = decodeURIComponent(location.hash);
    if (h.startsWith("#gv-")) openTeacher(h.slice(4));
    else closeTeacher();
  }

  GLV.phan("giao-vien", {
    menu: "Giáo viên",

    html() {
      const caps = [{ key: "all", label: "Tất cả" }].concat(
        duLieu.CAP_HOC.filter((c) => GIAO_VIEN.some((g) => g.cap.includes(c.key))).map((c) => ({ key: c.key, label: c.vietTat }))
      );
      // Chỉ hiện các môn đã có giáo viên
      const mons = [{ key: "all", label: "Mọi môn" }].concat(
        Object.keys(duLieu.MON_HOC).filter((k) => GIAO_VIEN.some((g) => g.mon.includes(k))).map((k) => ({ key: k, label: monInfo(k).ten }))
      );
      const boLoc = `
        <div class="tabs" role="group" aria-label="Lọc giáo viên">
          <div class="tabs__group" id="levelFilter">${caps.map((c) => `<button type="button" class="tab" data-cap="${c.key}">${esc(c.label)}</button>`).join("")}</div>
          <div class="tabs__group" id="teacherFilter">${mons.map((m) => `<button type="button" class="tab" data-mon="${m.key}">${esc(m.label)}</button>`).join("")}</div>
        </div>`;

      return `
        <section class="section" id="giao-vien">
          <div class="container">
            ${tieuDe(PHAN_GIAO_VIEN.tieuDe, PHAN_GIAO_VIEN.moTa, boLoc)}
            <div class="teachers" id="teacherGrid"></div>
            <p class="empty" id="teacherEmpty" hidden>Môn này đang xếp giáo viên. <a href="#dang-ky">Để lại số điện thoại</a> để được báo khi mở lớp.</p>
          </div>
        </section>

        <div class="modal" id="teacherModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" hidden>
          <div class="modal__backdrop" data-close></div>
          <div class="modal__box" tabindex="-1">
            <button class="modal__close" data-close aria-label="Đóng">${icon("x")}</button>
            <div class="modal__body" id="modalBody"></div>
          </div>
        </div>`;
    },

    chay() {
      $("#levelFilter").addEventListener("click", (e) => {
        const b = e.target.closest("[data-cap]");
        if (!b) return;
        filterState.cap = b.dataset.cap;
        renderTeachers();
      });
      $("#teacherFilter").addEventListener("click", (e) => {
        const b = e.target.closest("[data-mon]");
        if (!b) return;
        filterState.mon = b.dataset.mon;
        renderTeachers();
      });
      renderTeachers();

      $("#teacherModal").addEventListener("click", (e) => {
        if (e.target.closest("[data-close]")) return closeTeacher();

        const enroll = e.target.closest("[data-enroll]");
        if (enroll) {
          const t = teacherById(enroll.dataset.enroll);
          closeTeacher();
          // Điền sẵn form đăng ký (form nằm ở phần Tuyển sinh)
          if (GLV.dienSanDangKy) GLV.dienSanDangKy(t, enroll.dataset.lop);
          else if (LINKS.tel) location.href = LINKS.tel;
          return;
        }
        const photo = e.target.closest("[data-photo]");
        if (photo) {
          const list = duLieu.ANH_LOP_HOC.filter((a) => a.giaoVien === currentTeacherId);
          return GLV.openLightbox(list, +photo.dataset.photo);
        }
        const copy = e.target.closest("[data-copy]");
        if (copy) {
          const url = location.href.split("#")[0] + "#gv-" + copy.dataset.copy;
          const done = () => (copy.textContent = "Đã sao chép link");
          if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(done, () => window.prompt("Sao chép link:", url));
          else window.prompt("Sao chép link:", url);
        }
      });

      GLV.khiNhanEsc.unshift(closeTeacher);
      window.addEventListener("hashchange", handleHash);
      handleHash();
    },
  });
})();
