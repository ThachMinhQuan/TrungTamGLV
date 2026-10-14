/* =====================================================================
   PHẦN MÔN HỌC – cách hiển thị
   Bảng tra cứu: mỗi cấp học → từng môn → thầy cô phụ trách.
   Thầy cô lấy từ phần Giáo viên và thời khóa biểu ở phần Tuyển sinh.
   ===================================================================== */
(function () {
  "use strict";
  const { esc, tieuDe, monInfo, monVar, teacherById, duLieu } = GLV;

  GLV.phan("mon-hoc", {
    menu: "Môn học",

    html() {
      const cacCap = CAP_HOC.map((c) => {
        const rows = c.mon.map((m) => {
          const gv = duLieu.GIAO_VIEN.filter((g) => g.mon.includes(m.key) && g.cap.includes(c.key));
          // Thầy cô có trong thời khóa biểu nhưng chưa có trang giới thiệu riêng
          const khac = [...new Set(
            duLieu.LOP_HOC.filter((l) => l.cap === c.key && l.mon === m.key && l.giaoVien && !teacherById(l.giaoVien)).map((l) => l.giaoVien)
          )];
          let right;
          if (m.trangThai === "sap-mo") right = `<span class="level__muted">Sắp mở lớp</span>`;
          else if (!gv.length && !khac.length) right = `<span class="level__muted">Đang xếp giáo viên</span>`;
          else right = gv.map((g) => `<a href="#gv-${esc(g.id)}">${esc(g.ten)}</a>`).concat(khac.map((n) => `<span>${esc(n)}</span>`)).join("");
          return `<div class="level__row" style="${monVar(m.key)}"><span class="level__subject">${esc(monInfo(m.key).ten)}</span><span class="level__teachers">${right}</span></div>`;
        }).join("");
        return `<div class="level"><div class="level__head"><h3>${esc(c.ten)}</h3><span>${esc(c.khoi)}</span></div>${rows}</div>`;
      }).join("");

      return `
        <section class="section section--tint" id="mon-hoc">
          <div class="container">
            ${tieuDe(PHAN_MON_HOC.tieuDe, PHAN_MON_HOC.moTa)}
            <div class="levels">${cacCap}</div>
          </div>
        </section>`;
    },
  });
})();
