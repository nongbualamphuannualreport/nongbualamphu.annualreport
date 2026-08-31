
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
          <span><b>จังหวัดหนองบัวลำภู</b><small>ANNUAL REPORT 2569</small></span>
        </a>
        <nav class="desktop-nav">${nav.map(([k,l,h])=>`<a class="${k===page?'active':''}" href="${h}">${l}</a>`).join('')}</nav>
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="สลับโหมดกลางวันและกลางคืน"><i data-theme-icon>☾</i><span data-theme-label>กลางคืน</span></button>
        <div class="reader-controls" aria-label="ปรับขนาดตัวอักษร">
          <span>ขนาดตัวอักษร</span>
          <button data-reader="normal" aria-label="ขนาดปกติ">A</button>
          <button data-reader="large" aria-label="ตัวอักษรใหญ่">A+</button>
          <button data-reader="xlarge" aria-label="ตัวอักษรใหญ่มาก">A++</button>
        </div>
        <button class="menu-toggle" aria-label="เปิดเมนู" aria-expanded="false"><span></span><span></span></button>
      </div>
      <div class="mobile-sheet">
        <div class="mobile-theme-row">
          <b>โหมดการแสดงผล</b>
          <button type="button" data-theme-set="day"><i>☀</i><span>กลางวัน</span></button>
          <button type="button" data-theme-set="night"><i>☾</i><span>กลางคืน</span></button>
        </div>
        <div class="mobile-reader">
          <b>ปรับขนาดตัวอักษร</b>
          <button data-reader="normal">A</button><button data-reader="large">A+</button><button data-reader="xlarge">A++</button>
        </div>
        <div class="mobile-sheet-inner">${nav.map(([k,l,h],i)=>`<a class="${k===page?'active':''}" href="${h}"><i>0${i+1}</i><span>${l}</span></a>`).join('')}</div>
      </div>
    </header>`;
  }

  const footer=document.querySelector('[data-site-footer]');
  if(footer){
    footer.innerHTML=`<footer class="site-footer"><div class="container footer-top">
      <div class="footer-brand"><img src="assets/images/logo/nongbualamphu-logo.png" alt=""><div><b>Digital Annual Report 2569</b><span>จังหวัดหนองบัวลำภู</span></div></div>
      <div class="footer-links"><a href="overview.html">ข้อมูลจังหวัด</a><a href="strategy.html">ยุทธศาสตร์</a><a href="results.html">ผลการดำเนินงาน</a><a href="projects.html">โครงการสำคัญ</a><a href="downloads.html">ดาวน์โหลด</a></div>
      <div class="footer-horizon"><small>ปีงบประมาณ</small><b>2569</b></div>
    </div><div class="footer-bottom"><div class="container">© 2569 จังหวัดหนองบัวลำภู · Digital Annual Report</div></div></footer>`;
  }

  const dock=document.querySelector('[data-mobile-dock]');
  if(dock){
    const dockItems=[nav[0],nav[1],nav[2],nav[4],nav[5]];
    const icons=['⌂','◫','◇','▦','⇩'];
    dock.innerHTML=`<nav class="mobile-dock">${dockItems.map(([k,l,h],i)=>`<a class="${k===page?'active':''}" href="${h}"><i>${icons[i]}</i><span>${l.replace('จังหวัด','').replace('รายงาน','')}</span></a>`).join('')}</nav>`;
  }

  // Day / Night theme.
  // First visit follows local time: 06:00-17:59 = Day, otherwise Night.
  // Manual choice is remembered in localStorage.
  const validThemes=['day','night'];
  const savedTheme=localStorage.getItem('nblThemeChoice');
  const localHour=new Date().getHours();
  const autoTheme=(localHour>=6 && localHour<18)?'day':'night';
  const initialTheme=validThemes.includes(savedTheme)?savedTheme:autoTheme;
  const applyTheme=(theme,persist=false)=>{
    if(!validThemes.includes(theme)) theme='night';
    document.documentElement.dataset.theme=theme;
    document.documentElement.style.colorScheme=theme==='day'?'light':'dark';
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta) meta.setAttribute('content',theme==='day'?'#fff4f8':'#041522');
    document.querySelectorAll('[data-theme-icon]').forEach(el=>el.textContent=theme==='day'?'☀':'☾');
    document.querySelectorAll('[data-theme-label]').forEach(el=>el.textContent=theme==='day'?'กลางวัน':'กลางคืน');
    document.querySelectorAll('[data-theme-set]').forEach(btn=>{
      const active=btn.dataset.themeSet===theme;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-pressed',String(active));
    });
    document.querySelectorAll('[data-theme-toggle]').forEach(btn=>{
      btn.setAttribute('title',theme==='day'?'เปลี่ยนเป็นโหมดกลางคืน':'เปลี่ยนเป็นโหมดกลางวัน');
    });
    if(persist) localStorage.setItem('nblThemeChoice',theme);
  };
  applyTheme(initialTheme,false);
  document.addEventListener('click',e=>{
    const toggleBtn=e.target.closest('[data-theme-toggle]');
    if(toggleBtn){
      const next=document.documentElement.dataset.theme==='day'?'night':'day';
      applyTheme(next,true);
      return;
    }
    const setBtn=e.target.closest('[data-theme-set]');
    if(setBtn){
      applyTheme(setBtn.dataset.themeSet,true);
    }
  });

  // Senior-friendly text size control
  const validSizes=['normal','large','xlarge'];
  const stored=localStorage.getItem('nblReaderSize');
  const initial=validSizes.includes(stored)?stored:'large';
  const applyReader=size=>{
    document.documentElement.dataset.reader=size;
    localStorage.setItem('nblReaderSize',size);
    document.querySelectorAll('[data-reader]').forEach(b=>b.classList.toggle('active',b.dataset.reader===size));
  };
  applyReader(initial);
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-reader]');
    if(b) applyReader(b.dataset.reader);
  });

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
    const run=()=>{const t0=performance.now(),dur=850;function f(t){const p=Math.min(1,(t-t0)/dur),v=target*(1-Math.pow(1-p,3));el.textContent=fmt.format(v);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)};
    if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){run();io.disconnect()}},{threshold:.35});io.observe(el)}else run();
  });

  // District map
  document.querySelectorAll('[data-interactive-map]').forEach(root=>{
    const detail=root.parentElement?.querySelector('[data-district-detail]') || document.querySelector('[data-district-detail]');
    const tooltip=root.querySelector('[data-district-tooltip]');
    const districts=d.districts||{};
    const nf=new Intl.NumberFormat('th-TH',{maximumFractionDigits:2});
    const render=id=>{
      const x=districts[id]; if(!x)return;
      document.querySelectorAll('[data-district]').forEach(n=>n.classList.toggle('active',n.dataset.district===id));
      if(detail){
        detail.innerHTML=`<div class="district-top"><span>ข้อมูลรายอำเภอ</span><i></i></div><h2>${x.name}</h2><p>ข้อมูลทั่วไปสำหรับประกอบ Annual Report 2569</p><div class="district-data">
          <div><small>ประชากร</small><b>${nf.format(x.population)}</b><span>คน</span></div>
          <div><small>พื้นที่</small><b>${nf.format(x.area)}</b><span>ตร.กม.</span></div>
          <div><small>ตำบล</small><b>${nf.format(x.subdistricts)}</b><span>แห่ง</span></div>
          <div><small>หมู่บ้าน</small><b>${nf.format(x.villages)}</b><span>แห่ง</span></div>
          <div><small>จำนวนบ้าน</small><b>${nf.format(x.houses)}</b><span>หลัง</span></div>
        </div><div class="district-future"><b>ข้อมูลโครงการรายอำเภอ</b><span>สามารถเชื่อมเพิ่มภายหลังได้ หากได้รับข้อมูลพื้นที่ดำเนินงานของแต่ละโครงการจากจังหวัด</span></div>`;
      }
      if(tooltip){
        tooltip.innerHTML=`<small>อำเภอที่เลือก</small><b>${x.name}</b><div><span>ประชากร</span><strong>${nf.format(x.population)} คน</strong></div><div><span>พื้นที่</span><strong>${nf.format(x.area)} ตร.กม.</strong></div><div><span>จำนวนบ้าน</span><strong>${nf.format(x.houses)} หลัง</strong></div>`;
      }
    };
    root.querySelectorAll('[data-district]').forEach(el=>{
      const id=el.dataset.district; el.tabIndex=0; el.setAttribute('role','button');
      ['mouseenter','focus','click'].forEach(evt=>el.addEventListener(evt,()=>render(id)));
      el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();render(id)}});
    });
    render('mueang');
  });

  const heroBg=document.querySelector('.hero-bg');
  if(heroBg && matchMedia('(pointer:fine)').matches){
    addEventListener('mousemove',e=>{
      const x=(e.clientX/innerWidth-.5)*6, y=(e.clientY/innerHeight-.5)*4;
      heroBg.style.transform=`scale(1.045) translate(${x}px,${y}px)`;
    },{passive:true});
  }

  const glow=document.querySelector('.cursor-glow');
  if(glow && matchMedia('(pointer:fine)').matches){
    addEventListener('pointermove',e=>{glow.style.transform=`translate(${e.clientX}px,${e.clientY}px)`},{passive:true});
  }


  // Interactive vision explorer: 4 development drivers.
  document.querySelectorAll('[data-vision-explorer]').forEach(explorer=>{
    const tabs=[...explorer.querySelectorAll('[data-vision-tab]')];
    const panels=[...explorer.querySelectorAll('[data-vision-panel]')];
    const activate=id=>{
      tabs.forEach(tab=>{
        const active=tab.dataset.visionTab===id;
        tab.classList.toggle('active',active);
        tab.setAttribute('aria-selected',String(active));
      });
      panels.forEach(panel=>{
        const active=panel.dataset.visionPanel===id;
        panel.hidden=!active;
        panel.classList.remove('vision-enter');
        if(active){
          void panel.offsetWidth;
          panel.classList.add('vision-enter');
        }
      });
    };
    tabs.forEach((tab,index)=>{
      tab.addEventListener('click',()=>activate(tab.dataset.visionTab));
      tab.addEventListener('keydown',e=>{
        if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(e.key)) return;
        e.preventDefault();
        let next=index;
        if(e.key==='ArrowDown'||e.key==='ArrowRight') next=(index+1)%tabs.length;
        if(e.key==='ArrowUp'||e.key==='ArrowLeft') next=(index-1+tabs.length)%tabs.length;
        if(e.key==='Home') next=0;
        if(e.key==='End') next=tabs.length-1;
        tabs[next].focus();
        activate(tabs[next].dataset.visionTab);
      });
    });
  });


  // -----------------------------------------------------------
  // Project Directory: search and development-issue filters.
  // -----------------------------------------------------------
  const projectSearchInput=document.querySelector('[data-project-search-input]');
  if(projectSearchInput){
    const filterButtons=[...document.querySelectorAll('[data-project-filter]')];
    const cards=[...document.querySelectorAll('.directory-project-card')];
    const sections=[...document.querySelectorAll('[data-project-section]')];
    const resultCount=document.querySelector('[data-project-result-count]');
    const empty=document.querySelector('[data-project-empty]');
    let activeGroup='all';

    const updateDirectory=()=>{
      const q=projectSearchInput.value.trim().toLowerCase();
      let visible=0;
      cards.forEach(card=>{
        const groupOk=activeGroup==='all'||card.dataset.projectGroup===activeGroup;
        const searchOk=!q||(card.dataset.projectSearch||'').includes(q);
        const show=groupOk&&searchOk;
        card.hidden=!show;
        if(show) visible++;
      });
      sections.forEach(section=>{
        const any=[...section.querySelectorAll('.directory-project-card')].some(c=>!c.hidden);
        section.hidden=!any;
      });
      if(resultCount) resultCount.textContent=`แสดง ${visible} โครงการ`;
      if(empty) empty.hidden=visible!==0;
    };

    filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
      activeGroup=btn.dataset.projectFilter;
      filterButtons.forEach(b=>b.classList.toggle('active',b===btn));
      updateDirectory();
    }));
    projectSearchInput.addEventListener('input',updateDirectory);
    updateDirectory();
  }

  // -----------------------------------------------------------
  // Project Detail page. Content comes only from supplied source.
  // -----------------------------------------------------------
  const detailRoot=document.querySelector('[data-project-detail]');
  if(detailRoot){
    const projects=window.NBL_PROJECTS||[];
    const groups=window.NBL_PROJECT_GROUPS||{};
    const params=new URLSearchParams(location.search);
    const id=params.get('id');
    const index=projects.findIndex(p=>p.id===id);
    const p=index>=0?projects[index]:null;

    const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
    })[ch]);

    if(!p){
      detailRoot.innerHTML=`<div class="project-not-found glass-panel">
        <span>ไม่พบข้อมูลโครงการ</span>
        <h1>ลิงก์โครงการไม่ถูกต้อง หรือยังไม่มีรายละเอียดในชุดข้อมูล</h1>
        <p>กลับไปหน้าโครงการสำคัญเพื่อเลือกโครงการที่มีข้อมูลในเอกสาร</p>
        <a class="btn glow" href="projects.html">กลับไปหน้าโครงการสำคัญ →</a>
      </div>`;
    }else{
      document.title=`${p.code} ${p.title} | Annual Report 2569`;
      const codeEl=document.querySelector('[data-detail-code]');
      if(codeEl) codeEl.textContent=p.code;

      const activityHtml=(p.activities||[]).map((a,i)=>`
        <li><i>${String(i+1).padStart(2,'0')}</i><span>${esc(a)}</span></li>`).join('');
      const highlightHtml=(p.highlights||[]).length?`
        <section class="detail-block detail-highlights">
          <div class="detail-block-title"><small>ผลลัพธ์ / ตัวเลขที่เอกสารระบุ</small><h2>ข้อมูลสำคัญของโครงการ</h2></div>
          <div class="detail-highlight-grid">${p.highlights.map(h=>`<div><b>${esc(h)}</b></div>`).join('')}</div>
        </section>`:'';

      const facts=[];
      if(p.period) facts.push(`<div><small>ช่วงเวลา</small><b>${esc(p.period)}</b></div>`);
      if(p.area) facts.push(`<div><small>พื้นที่ที่เอกสารระบุ</small><b>${esc(p.area)}</b></div>`);
      facts.push(`<div><small>ประเด็นการพัฒนา</small><b>${esc(p.groupShort)}</b></div>`);
      facts.push(`<div><small>กิจกรรม/รายละเอียดที่ปรากฏ</small><b>${(p.activities||[]).length} รายการ</b></div>`);

      const prev=projects[index-1];
      const next=projects[index+1];
      detailRoot.innerHTML=`
        <header class="project-detail-hero">
          <div class="detail-code-badge ${esc(p.groupClass)}">${esc(p.code)}</div>
          <div class="detail-hero-copy">
            <span>${esc(p.groupTitle)}</span>
            <h1>${esc(p.title)}</h1>
            <p>${esc(p.summary)}</p>
          </div>
        </header>

        <div class="project-detail-facts">${facts.join('')}</div>

        <div class="project-detail-grid">
          <div class="project-detail-main">
            <section class="detail-block">
              <div class="detail-block-title"><small>สาระสำคัญ</small><h2>วัตถุประสงค์และแนวทาง</h2></div>
              <p class="detail-lead">${esc(p.objective)}</p>
            </section>

            <section class="detail-block">
              <div class="detail-block-title"><small>กิจกรรมภายใต้โครงการ</small><h2>รายละเอียดที่ปรากฏในเอกสาร</h2></div>
              <ol class="detail-activity-list">${activityHtml}</ol>
            </section>

            ${highlightHtml}

            <section class="detail-block source-coverage">
              <div class="detail-block-title"><small>ขอบเขตข้อมูล</small><h2>ข้อมูลที่ยังไม่ปรากฏในเอกสารชุดนี้</h2></div>
              <p>เอกสารที่ได้รับเป็น “สรุปผลการดำเนินงานที่สำคัญ” จึงไม่ได้ระบุงบประมาณรายโครงการ หน่วยดำเนินงาน ระยะเวลาดำเนินงาน หรือร้อยละความก้าวหน้าครบทุกโครงการ หากจังหวัดส่งข้อมูลดังกล่าวเพิ่มเติม สามารถนำมาเติมในหน้านี้ได้โดยไม่ต้องเปลี่ยนโครงสร้างเว็บไซต์</p>
            </section>
          </div>

          <aside class="project-detail-side">
            <div class="detail-side-card glass-panel">
              <small>รหัสโครงการในสรุป</small>
              <b>${esc(p.code)}</b>
              <span>${esc(p.groupShort)}</span>
            </div>
            <div class="detail-side-card glass-panel">
              <small>แหล่งข้อมูล</small>
              <h3>สรุปผลการดำเนินงานที่สำคัญในปีงบประมาณ พ.ศ. 2569</h3>
              <p>หน้านี้ถอดและจัดโครงสร้างจากข้อมูลที่ปรากฏในเอกสารเท่านั้น</p>
            </div>
            <a class="detail-back-button" href="projects.html">← กลับไปดูทั้ง 18 โครงการ</a>
          </aside>
        </div>

        <nav class="project-detail-nav">
          ${prev?`<a href="project-detail.html?id=${esc(prev.id)}"><small>โครงการก่อนหน้า</small><b>← ${esc(prev.code)} ${esc(prev.title)}</b></a>`:'<span></span>'}
          ${next?`<a class="next" href="project-detail.html?id=${esc(next.id)}"><small>โครงการถัดไป</small><b>${esc(next.code)} ${esc(next.title)} →</b></a>`:'<span></span>'}
        </nav>`;
    }
  }

})();
