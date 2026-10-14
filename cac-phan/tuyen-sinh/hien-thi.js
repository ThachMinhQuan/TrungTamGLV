/* =====================================================================
   PHẦN TUYỂN SINH – cách hiển thị
   - Bảng xanh "Lớp đang tuyển sinh": thông tin khóa học + thời khóa biểu
   - "Đăng ký học": số điện thoại + form đăng ký
   - "Câu hỏi thường gặp"
   Nơi nhận dữ liệu form: SITE.formEndpoint (chung/thong-tin-chung.js).
   ===================================================================== */
(function () {
  "use strict";
  const { $, $$, esc, clean, icon, img, tieuDe, teacherById, duLieu, LINKS, cacSoDienThoai, soVaZalo, ganLienKet } = GLV;

  const STATUS = { "dang-tuyen": "Đang tuyển sinh", "sap-mo": "Sắp mở lớp", "sap-khai-giang": "Sắp khai giảng", "da-du": "Đã đủ học sinh" };

  /* ---------------- HTML từng khối ---------------- */
  function htmlBangLop() {
    const rows = LOP_HOC.map((l) => {
      const t = teacherById(l.giaoVien);
      const gv = t
        ? `<a class="schedule__teacher" href="#gv-${esc(t.id)}">${esc(t.ten)}</a>`
        : l.giaoVien ? esc(l.giaoVien) : `<span class="schedule__none">Đang xếp giáo viên</span>`;
      const gio = (l.buoi && l.buoi.length ? l.buoi.map((b) => `<span><b>${esc(b.thu)}</b> ${esc(b.gio)}</span>`) : [esc(l.lich || "Liên hệ")]).join("");
      return `<tr>
          <td><span class="schedule__class">${esc(l.ten)}</span></td>
          <td data-label="Giáo viên">${gv}</td>
          <td data-label="Lịch học"><span class="schedule__times">${gio}</span></td>
          <td data-label="Sĩ số">Tối đa ${esc(l.siSo)}</td>
          <td data-label="Học phí">${esc(l.hocPhi)}</td>
          <td data-label="Trạng thái"><span class="status--${esc(l.trangThai)}">${STATUS[l.trangThai] || ""}</span></td>
        </tr>`;
    }).join("");
    return `<div class="schedule"><table>
        <thead><tr><th>Lớp</th><th>Giáo viên</th><th>Lịch học</th><th>Sĩ số</th><th>Học phí</th><th>Trạng thái</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>`;
  }

  function htmlDangKy() {
    const lopTheoCap = [["THCS", [6, 7, 8, 9]], ["THPT", [10, 11, 12]]]
      .map(([cap, ds]) => `<optgroup label="${cap}">${ds.map((n) => `<option value="${n}">Lớp ${n}</option>`).join("")}</optgroup>`)
      .join("");
    const monChips = Object.keys(duLieu.MON_HOC)
      .map((k) => `<label class="chip"><input type="checkbox" name="mon" value="${esc(duLieu.MON_HOC[k].ten)}" data-mon="${k}" /><span>${esc(duLieu.MON_HOC[k].ten)}</span></label>`)
      .join("");
    const thoiGian = ["Chiều", "Tối", "Cuối tuần", "Lớp hè"]
      .map((v) => `<label class="chip"><input type="checkbox" name="thoiGian" value="${v}" /><span>${v}</span></label>`)
      .join("");

    return `
      <section class="section" id="dang-ky">
        <div class="container register">
          <div class="register__quick">
            ${tieuDe(PHAN_TUYEN_SINH.tieuDeDangKy, PHAN_TUYEN_SINH.moTaDangKy)}
            <ul class="phones">${cacSoDienThoai().map((p) => `<li><small>${esc(p.nhan)}</small>${soVaZalo(p, "phones__so")}</li>`).join("")}</ul>
            <div class="register__apps">
              <a class="btn btn--zalo" data-link="zalo" target="_blank" rel="noopener">Nhắn Zalo</a>
              <a class="btn btn--line" data-link="messenger" target="_blank" rel="noopener">${icon("messenger")} Messenger</a>
              <a class="btn btn--line" data-link="sms">${icon("message")} Nhắn SMS</a>
            </div>
          </div>

          <form class="form" id="registerForm" novalidate>
            <div class="form__grid">
              <div class="field">
                <label for="hoTen">Họ tên học sinh <span class="req">*</span></label>
                <input id="hoTen" name="hoTen" type="text" autocomplete="name" placeholder="Nguyễn Văn A" required />
                <small class="field__error"></small>
              </div>
              <div class="field">
                <label for="lop">Lớp <span class="req">*</span></label>
                <select id="lop" name="lop" required><option value="">Chọn lớp</option>${lopTheoCap}</select>
                <small class="field__error"></small>
              </div>
              <div class="field field--full">
                <label for="truong">Trường đang học</label>
                <input id="truong" name="truong" type="text" placeholder="VD: THPT Lý Tự Trọng" />
              </div>
              <fieldset class="field field--full" id="monField">
                <legend>Môn muốn học <span class="req">*</span></legend>
                <div class="chips" id="monChips">${monChips}</div>
                <small class="field__error"></small>
              </fieldset>
              <div class="field">
                <label for="phuHuynh">Họ tên phụ huynh</label>
                <input id="phuHuynh" name="phuHuynh" type="text" placeholder="Nguyễn Văn B" />
              </div>
              <div class="field">
                <label for="sdt">Số điện thoại <span class="req">*</span></label>
                <input id="sdt" name="sdt" type="tel" inputmode="numeric" autocomplete="tel" placeholder="09xx xxx xxx" required />
                <small class="field__error"></small>
              </div>
              <div class="field field--full">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" autocomplete="email" placeholder="email@gmail.com" />
                <small class="field__error"></small>
              </div>
              <fieldset class="field field--full">
                <legend>Thời gian có thể học</legend>
                <div class="chips">${thoiGian}</div>
              </fieldset>
              <div class="field field--full">
                <label for="ghiChu">Ghi chú</label>
                <textarea id="ghiChu" name="ghiChu" rows="3" placeholder="VD: muốn học Toán 10 với thầy Thiện, học buổi chiều"></textarea>
              </div>
              <!-- Bẫy chống spam: người thật không nhìn thấy ô này -->
              <div class="hp" aria-hidden="true">
                <label for="website">Website</label>
                <input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
              </div>
              <div class="field field--full">
                <label class="consent">
                  <input type="checkbox" id="dongY" name="dongY" required />
                  <span>Tôi đồng ý để cơ sở dùng thông tin này để gọi lại tư vấn. <span class="req">*</span></span>
                </label>
                <small class="field__error"></small>
              </div>
            </div>
            <button type="submit" class="btn btn--red btn--lg btn--block" id="submitBtn"><span class="btn__label">Gửi đăng ký</span></button>
            <div class="form__status" id="formStatus" role="status" aria-live="polite"></div>
          </form>
        </div>
      </section>`;
  }

  function htmlHoiDap() {
    if (!FAQ.length) return "";
    return `
      <section class="section section--tint" id="hoi-dap">
        <div class="container faq-layout">
          <h2 class="section-title">${esc(PHAN_TUYEN_SINH.tieuDeHoiDap)}</h2>
          <div class="faq" id="faq">
            ${FAQ.map((f, i) => `
              <div class="faq__item${i === 0 ? " is-open" : ""}">
                <button type="button" class="faq__q" aria-expanded="${i === 0}" aria-controls="faq-${i}"><span>${esc(f.hoi)}</span>${icon("chevron-down")}</button>
                <div class="faq__a" id="faq-${i}" role="region"><div><p>${ganLienKet(esc(clean(f.dap)))}</p></div></div>
              </div>`).join("")}
          </div>
        </div>
      </section>`;
  }

  /* ---------------- Form đăng ký ---------------- */
  // Điền sẵn form khi bấm "Đăng ký Toán 10..." trong trang giới thiệu thầy cô
  GLV.dienSanDangKy = function (t, lopTen) {
    if (!t || !$("#registerForm")) return;
    $$('#monChips input[name="mon"]').forEach((c) => {
      if (t.mon.includes(c.dataset.mon)) c.checked = true;
    });
    const so = lopTen && (lopTen.match(/\d+/) || [])[0];
    if (so && $(`#lop option[value="${so}"]`)) $("#lop").value = so;
    const ghiChu = $("#ghiChu");
    const note = `Muốn học ${lopTen || ""} với ${t.ten}`.replace(/\s+/g, " ");
    if (!ghiChu.value.includes(note)) ghiChu.value = (note + (ghiChu.value ? ". " + ghiChu.value : "")).trim();
    $("#dang-ky").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => $("#hoTen").focus({ preventScroll: true }), 600);
  };

  function setError(fieldEl, msg) {
    const wrap = fieldEl.closest(".field");
    wrap.classList.toggle("has-error", !!msg);
    const err = $(".field__error", wrap);
    if (err) err.textContent = msg || "";
    return !msg;
  }

  function validate() {
    const v = (id) => $("#" + id).value.trim();
    const phone = v("sdt").replace(/[\s.\-()]/g, "");
    const checks = [
      [$("#hoTen"), v("hoTen").length < 2 ? "Nhập họ tên học sinh." : ""],
      [$("#lop"), !v("lop") ? "Chọn lớp học sinh đang học." : ""],
      [$("#monChips"), !$$("#monChips input:checked").length ? "Chọn ít nhất một môn." : ""],
      [$("#sdt"), !phone ? "Nhập số điện thoại để cơ sở gọi lại." : !/^(0|\+84)\d{9}$/.test(phone) ? "Số điện thoại cần đủ 10 số, bắt đầu bằng 0." : ""],
      [$("#email"), v("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email")) ? "Email chưa đúng dạng, ví dụ: ten@gmail.com." : ""],
      [$("#dongY"), !$("#dongY").checked ? "Tích vào ô đồng ý để cơ sở được gọi lại." : ""],
    ];
    let firstBad = null;
    checks.forEach(([el, msg]) => {
      if (!setError(el, msg) && !firstBad) firstBad = el;
    });
    if (firstBad) {
      const target = firstBad.matches("input, select, textarea") ? firstBad : $("input", firstBad);
      target && target.focus();
    }
    return !firstBad;
  }

  function showStatus(type, html) {
    $("#formStatus").innerHTML = `<div class="alert alert--${type}">${icon(type === "ok" ? "check-circle" : "alert")}<div>${html}</div></div>`;
  }

  function ganForm() {
    const form = $("#registerForm");
    form.addEventListener("input", (e) => {
      if (e.target.closest(".field.has-error")) setError(e.target, "");
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      $("#formStatus").innerHTML = "";
      if (!validate()) return;

      const btn = $("#submitBtn");
      const label = $(".btn__label", btn);
      const fd = new FormData(form);

      // Bẫy spam: có giá trị ở ô ẩn → báo thành công, không gửi
      if (fd.get("website")) {
        form.reset();
        return showStatus("ok", "Đã gửi đăng ký.");
      }

      const data = {
        thoiGianGui: new Date().toLocaleString("vi-VN"),
        hoTen: fd.get("hoTen").trim(),
        lop: fd.get("lop"),
        truong: (fd.get("truong") || "").trim(),
        mon: fd.getAll("mon").join(", "),
        phuHuynh: (fd.get("phuHuynh") || "").trim(),
        sdt: fd.get("sdt").trim(),
        email: (fd.get("email") || "").trim(),
        thoiGianHoc: fd.getAll("thoiGian").join(", "),
        ghiChu: (fd.get("ghiChu") || "").trim(),
      };

      btn.disabled = true;
      label.textContent = "Đang gửi đăng ký…";
      const hotline = `<a href="${LINKS.tel}">${esc(SITE.hotlineHienThi)}</a>`;

      try {
        const url = SITE.formEndpoint;
        if (!url) {
          console.info("[Chế độ thử] Dữ liệu form:", data);
          await new Promise((r) => setTimeout(r, 500));
        } else if (url.includes("script.google.com")) {
          await fetch(url, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) });
        } else {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error("HTTP " + res.status);
        }
        form.reset();
        showStatus(
          "ok",
          `<strong>Đã gửi đăng ký.</strong> Cơ sở sẽ gọi lại số ${esc(data.sdt)} để xếp lớp.` +
            (url ? "" : `<br><small>Chế độ thử: form chưa nối với nơi nhận dữ liệu (xem HUONG-DAN-FORM.md).</small>`)
        );
      } catch (err) {
        console.error(err);
        showStatus("err", `Chưa gửi được do lỗi mạng. Bấm "Gửi đăng ký" lần nữa, hoặc gọi ${hotline}.`);
      } finally {
        btn.disabled = false;
        label.textContent = "Gửi đăng ký";
      }
    });
  }

  /* ---------------- Đăng ký phần ---------------- */
  GLV.phan("tuyen-sinh", {
    menu: "Tuyển sinh",

    html() {
      return `
        <section class="section board" id="tuyen-sinh">
          <div class="container">
            ${tieuDe(PHAN_TUYEN_SINH.tieuDe, PHAN_TUYEN_SINH.moTa)}
            <dl class="board__facts">
              ${THONG_TIN_KHOA_HOC.map((c) => `<div${c.tieuDe === "Học phí" ? ' class="is-key"' : ""}><dt>${esc(c.tieuDe)}</dt><dd>${esc(c.noiDung)}</dd></div>`).join("")}
            </dl>
            ${PHAN_TUYEN_SINH.hienBangLop && LOP_HOC.length ? htmlBangLop() : ""}
            ${THONG_BAO.length ? `
            <div class="notices">
              <h3 class="notices__title">${esc(PHAN_TUYEN_SINH.tieuDeThongBao)}</h3>
              <div class="notices__grid" id="notices">
                ${THONG_BAO.map((n, i) => `<a class="notice" href="${esc(n.anh || "#")}" data-index="${i}">${img(n.anh, n.chuThich)}<span>${esc(n.chuThich)}</span></a>`).join("")}
              </div>
            </div>` : ""}
          </div>
        </section>
        ${htmlDangKy()}
        ${htmlHoiDap()}`;
    },

    chay() {
      const notices = $("#notices");
      if (notices)
        notices.addEventListener("click", (e) => {
          const a = e.target.closest(".notice");
          if (!a) return;
          e.preventDefault();
          GLV.openLightbox(THONG_BAO, +a.dataset.index);
        });

      ganForm();

      const faq = $("#faq");
      if (faq)
        faq.addEventListener("click", (e) => {
          const q = e.target.closest(".faq__q");
          if (!q) return;
          const item = q.parentElement;
          const open = !item.classList.contains("is-open");
          item.classList.toggle("is-open", open);
          q.setAttribute("aria-expanded", open);
        });
    },
  });
})();
