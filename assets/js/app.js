
(function(){
  const d=window.NBL_DATA||{};
  const page=document.body.dataset.page||'home';
  const nav=[
    ['home','หน้าหลัก','index.html'],
    ['overview','ข้อมูลทั่วไปจังหวัด','overview.html'],
    ['strategy','ยุทธศาสตร์จังหวัด','strategy.html'],
    ['results','ผลการดำเนินงานและงบประมาณ','results.html'],
    ['projects','โครงการสำคัญ','projects.html'],
    ['downloads','ดาวน์โหลดรายงาน','downloads.html']
  ];
  const header=document.querySelector('[data-site-header]');
  if(header){
    header.innerHTML=`<header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html">
          <span class="brand-logo"><img src="assets/images/logo/nongbualamphu-logo.png" alt="ตราจังหวัดหนองบัวลำภู"></span>
          <span><b>จังหวัดหนองบัวลำภู</b><small>NONG BUA LAMPHU PROVINCE</small></span>
        </a>
        <nav class="desktop-nav">${nav.map(([k,l,h])=>`<a class="${k===page?'active':''}" href="${h}">${l}</a>`).join('')}</nav>
        <button class="menu-toggle" aria-label="เปิดเมนู" aria-expanded="false"><span></span><span></span></button>
      </div>
      <div class="mobile-sheet">
        <div class="mobile-sheet-inner">${nav.map(([k,l,h],i)=>`<a class="${k===page?'active':''}" href="${h}"><i>0${i+1}</i><span>${l}</span></a>`).join('')}</div>
      </div>
    </header>`;
  }
  const footer=document.querySelector('[data-site-footer]');
  if(footer){
    footer.innerHTML=`<footer class="site-footer"><div class="container footer-top">
      <div class="footer-brand"><img src="assets/images/logo/nongbualamphu-logo.png" alt=""><div><b>Digital Annual Report</b><span>จังหวัดหนองบัวลำภู · พ.ศ. ${d.meta?.year||'2569'}</span></div></div>
      <div class="footer-links"><a href="overview.html">ข้อมูลจังหวัด</a><a href="strategy.html">ยุทธศาสตร์</a><a href="results.html">ผลการดำเนินงาน</a><a href="projects.html">โครงการ</a><a href="downloads.html">ดาวน์โหลด</a></div>
      <div class="footer-horizon"><small>STRATEGIC HORIZON</small><b>${d.meta?.plan||'2571–2575'}</b></div>
    </div><div class="footer-bottom"><div class="container">© 2569 จังหวัดหนองบัวลำภู · Digital Annual Report</div></div></footer>`;
  }
  const dock=document.querySelector('[data-mobile-dock]');
  if(dock){
    const dockItems=[nav[0],nav[1],nav[2],nav[4],nav[5]];
    const icons=['⌂','◫','◇','▦','⇩'];
    dock.innerHTML=`<nav class="mobile-dock">${dockItems.map(([k,l,h],i)=>`<a class="${k===page?'active':''}" href="${h}"><i>${icons[i]}</i><span>${l.replace('จังหวัด','').replace('รายงาน','')}</span></a>`).join('')}</nav>`;
  }

  const toggle=document.querySelector('.menu-toggle');
  const sheet=document.querySelector('.mobile-sheet');
  if(toggle&&sheet){
    toggle.addEventListener('click',()=>{const open=sheet.classList.toggle('open');toggle.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open);});
  }

  const sh=document.querySelector('.site-header');
  const sync=()=>sh&&sh.classList.toggle('scrolled',window.scrollY>24);
  sync(); addEventListener('scroll',sync,{passive:true});

  const obs='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
  },{threshold:.08}):null;
  document.querySelectorAll('.reveal').forEach(el=>obs?obs.observe(el):el.classList.add('visible'));

  document.querySelectorAll('[data-counter]').forEach(el=>{
    const target=Number(el.dataset.counter||0), decimals=Number(el.dataset.decimals||0);
    const fmt=new Intl.NumberFormat('th-TH',{minimumFractionDigits:decimals,maximumFractionDigits:decimals});
    const run=()=>{const t0=performance.now(),dur=950;function f(t){const p=Math.min(1,(t-t0)/dur),v=target*(1-Math.pow(1-p,3));el.textContent=fmt.format(v);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)};
    if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){run();io.disconnect()}},{threshold:.35});io.observe(el)}else run();
  });

  // District map shared across homepage and overview.
  document.querySelectorAll('[data-interactive-map]').forEach(root=>{
    const detail=root.parentElement?.querySelector('[data-district-detail]') || document.querySelector('[data-district-detail]');
    const tooltip=root.querySelector('[data-district-tooltip]');
    const districts=d.districts||{};
    const nf=new Intl.NumberFormat('th-TH',{maximumFractionDigits:2});
    const render=id=>{
      const x=districts[id]; if(!x)return;
      document.querySelectorAll('[data-district]').forEach(n=>n.classList.toggle('active',n.dataset.district===id));
      if(detail){
        detail.innerHTML=`<div class="district-top"><span>DISTRICT PROFILE</span><i></i></div><h2>${x.name}</h2><p>ข้อมูลการปกครองและประชากรจากแผนพัฒนาจังหวัด</p><div class="district-data">
          <div><small>ประชากร</small><b>${nf.format(x.population)}</b><span>คน</span></div>
          <div><small>พื้นที่</small><b>${nf.format(x.area)}</b><span>ตร.กม.</span></div>
          <div><small>ตำบล</small><b>${nf.format(x.subdistricts)}</b><span>แห่ง</span></div>
          <div><small>หมู่บ้าน</small><b>${nf.format(x.villages)}</b><span>แห่ง</span></div>
          <div><small>ครัวเรือน</small><b>${nf.format(x.households)}</b><span>หลังคาเรือน</span></div>
          <div><small>ชุมชน</small><b>${nf.format(x.communities)}</b><span>ชุมชน</span></div>
        </div><div class="district-future"><b>Future Data Layer</b><span>พร้อมเชื่อมข้อมูลโครงการ/งบประมาณรายอำเภอเมื่อได้รับชุดข้อมูลพื้นที่ดำเนินงาน</span></div>`;
      }
      if(tooltip){
        tooltip.innerHTML=`<small>SELECTED DISTRICT</small><b>${x.name}</b><div><span>ประชากร</span><strong>${nf.format(x.population)} คน</strong></div><div><span>พื้นที่</span><strong>${nf.format(x.area)} ตร.กม.</strong></div><div><span>ครัวเรือน</span><strong>${nf.format(x.households)}</strong></div>`;
      }
    };
    root.querySelectorAll('[data-district]').forEach(el=>{
      const id=el.dataset.district; el.tabIndex=0; el.setAttribute('role','button');
      ['mouseenter','focus','click'].forEach(evt=>el.addEventListener(evt,()=>render(id)));
      el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();render(id)}});
    });
    render('mueang');
  });

  // gentle hero parallax
  const heroBg=document.querySelector('.hero-bg');
  if(heroBg && matchMedia('(pointer:fine)').matches){
    addEventListener('mousemove',e=>{
      const x=(e.clientX/innerWidth-.5)*8, y=(e.clientY/innerHeight-.5)*5;
      heroBg.style.transform=`scale(1.045) translate(${x}px,${y}px)`;
    },{passive:true});
  }

  // desktop cursor glow
  const glow=document.querySelector('.cursor-glow');
  if(glow && matchMedia('(pointer:fine)').matches){
    addEventListener('pointermove',e=>{glow.style.transform=`translate(${e.clientX}px,${e.clientY}px)`},{passive:true});
  }
})();
