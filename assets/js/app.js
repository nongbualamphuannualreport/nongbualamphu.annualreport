(function () {
  const page = document.body.dataset.page || 'home';
  const year = (window.NBL_DATA && window.NBL_DATA.meta.year) || '2569';

  const navItems = [
    ['home', 'หน้าหลัก', 'index.html'],
    ['overview', 'ข้อมูลทั่วไปจังหวัด', 'overview.html'],
    ['strategy', 'ยุทธศาสตร์จังหวัด', 'strategy.html'],
    ['results', 'ผลการดำเนินงานและงบประมาณ', 'results.html'],
    ['projects', 'โครงการสำคัญ', 'projects.html'],
    ['downloads', 'ดาวน์โหลดรายงาน', 'downloads.html']
  ];

  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.innerHTML = `
      <div class="demo-ribbon"><span>2569</span> Digital Annual Report จังหวัดหนองบัวลำภู · ข้อมูลอยู่ระหว่างตรวจสอบก่อนเผยแพร่ฉบับสมบูรณ์</div>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Annual Report จังหวัดหนองบัวลำภู">
            <span class="brand-seal"><img src="assets/images/logo/nongbualamphu-logo.png" alt="ตราจังหวัดหนองบัวลำภู"></span>
            <span class="brand-copy"><strong>Annual Report</strong><small>จังหวัดหนองบัวลำภู</small></span>
          </a>
          <button class="nav-toggle" type="button" aria-label="เปิดเมนู" aria-expanded="false">☰</button>
          <nav class="main-nav" aria-label="เมนูหลัก">
            ${navItems.map(([key, label, href]) => `<a class="${key === page ? 'active' : ''}" href="${href}">${label}</a>`).join('')}
          </nav>
          <div class="year-chip">ปีรายงาน <b>${year}</b></div>
        </div>
      </header>`;
  }

  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <div class="footer-brand"><span class="brand-seal mini"><img src="assets/images/logo/nongbualamphu-logo.png" alt="ตราจังหวัดหนองบัวลำภู"></span><div><b>จังหวัดหนองบัวลำภู</b><small>Digital Annual Report</small></div></div>
            <p class="muted">เว็บไซต์รายงานผลการดำเนินงานจังหวัดหนองบัวลำภูในรูปแบบดิจิทัล</p>
          </div>
          <div><b>รายงาน</b><a href="overview.html">ภาพรวมจังหวัด</a><a href="results.html">ผลการดำเนินงานและงบประมาณ</a><a href="projects.html">โครงการสำคัญ</a></div>
          <div><b>ข้อมูลสำคัญ</b><a href="strategy.html">ยุทธศาสตร์จังหวัด</a><a href="overview.html#interactive-map">ข้อมูลรายอำเภอ</a><a href="downloads.html">ดาวน์โหลดรายงาน</a></div>
          <div class="footer-cta"><b>Annual Report ${year}</b><p>ศูนย์รวมข้อมูลและเอกสารรายงานผลการดำเนินงานของจังหวัด</p><a class="button small" href="downloads.html">ดูศูนย์ดาวน์โหลด</a></div>
        </div>
        <div class="footer-bottom"><div class="container">© 2569 จังหวัดหนองบัวลำภู · Digital Annual Report</div></div>
      </footer>`;
  }

  const stickyHeader = document.querySelector('.site-header');
  const syncHeader = () => { if (stickyHeader) stickyHeader.classList.toggle('is-scrolled', window.scrollY > 40); };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.textContent = open ? '✕' : '☰';
    });
  }

  document.querySelectorAll('[data-counter]').forEach((el) => {
    const target = Number(el.dataset.counter || 0);
    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const formatter = new Intl.NumberFormat('th-TH', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    let start = 0;
    const duration = 650;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = start + (target - start) * eased;
      el.textContent = `${prefix}${formatter.format(value)}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.08 }) : null;
  document.querySelectorAll('.reveal').forEach((el) => observer ? observer.observe(el) : el.classList.add('visible'));

  document.querySelectorAll('[data-demo-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = button.dataset.demoAction || 'ฟังก์ชันนี้เป็นตัวอย่างใน Demo';
      document.body.appendChild(toast);
      setTimeout(() => toast.classList.add('show'), 10);
      setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 250); }, 2200);
    });
  });


  // Interactive district map: hover on PC, tap/click on mobile.
  const mapRoot = document.querySelector('[data-interactive-map]');
  const districtDetail = document.querySelector('[data-district-detail]');
  if (mapRoot && districtDetail) {
    const districts = {
      suwannakhuha: { name: 'อำเภอสุวรรณคูหา' },
      naklang: { name: 'อำเภอนากลาง' },
      nawang: { name: 'อำเภอนาวัง' },
      mueang: { name: 'อำเภอเมืองหนองบัวลำภู' },
      nonsang: { name: 'อำเภอโนนสัง' },
      sibunrueang: { name: 'อำเภอศรีบุญเรือง' }
    };
    const renderDistrict = (id) => {
      const d = districts[id];
      if (!d) return;
      mapRoot.querySelectorAll('[data-district]').forEach(el => el.classList.toggle('active', el.dataset.district === id));
      districtDetail.innerHTML = `
        <span class="tag">ข้อมูลระดับอำเภอ</span>
        <h3>${d.name}</h3>
        <p class="muted district-intro">ส่วนนี้เตรียมไว้เชื่อมข้อมูลจริงของจังหวัด เมื่อได้รับข้อมูลรายอำเภอ ระบบจะแสดงเฉพาะข้อมูลที่มี ไม่สร้างตัวเลขขึ้นเอง</p>
        <div class="district-metrics">
          <div><small>ประชากร</small><b class="pending">รอข้อมูล</b></div>
          <div><small>จำนวนโครงการ</small><b class="pending">รอข้อมูล</b></div>
          <div><small>วงเงินโครงการในพื้นที่</small><b class="pending">รอข้อมูล</b></div>
          <div><small>การเบิกจ่าย</small><b class="pending">รอข้อมูล</b></div>
        </div>
        <div class="district-projects"><b>โครงการในพื้นที่</b><p class="pending">รอข้อมูลโครงการที่ระบุพื้นที่ดำเนินงาน</p></div>
        <div class="map-help">PC: วางเมาส์เพื่อดู • คลิกเพื่อตรึงข้อมูล &nbsp; | &nbsp; Mobile: แตะพื้นที่อำเภอ</div>`;
    };
    mapRoot.querySelectorAll('[data-district]').forEach(el => {
      el.setAttribute('tabindex','0');
      el.setAttribute('role','button');
      const id = el.dataset.district;
      el.addEventListener('mouseenter', () => renderDistrict(id));
      el.addEventListener('focus', () => renderDistrict(id));
      el.addEventListener('click', () => renderDistrict(id));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); renderDistrict(id); }
      });
    });
    renderDistrict('mueang');
  }

})();
