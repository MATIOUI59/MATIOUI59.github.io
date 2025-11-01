(function(){
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('mm_theme');
  function setTheme(name){
    if(name==='light') html.classList.add('light'); else html.classList.remove('light');
    localStorage.setItem('mm_theme', name);
    themeToggle.setAttribute('aria-pressed', name==='light');
    themeToggle.textContent = name==='light' ? '☀️' : '🌙';
  }
  if(saved) setTheme(saved); else setTheme('dark');
  themeToggle.addEventListener('click', ()=> setTheme(html.classList.contains('light') ? 'dark' : 'light'));
})();
(function(){
  const arrow = document.getElementById('scrollArrow');
  const nav = document.getElementById('navHeader');
  if(arrow && nav) arrow.addEventListener('click', ()=> nav.scrollIntoView({behavior:'smooth', block:'start'}));
})();
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){ e.preventDefault(); const target=document.querySelector(href); if(target) target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });
})();
(function(){
  const CV = '/mouad_cv.pdf';
  const EP = '/mouad_ep.pdf';
  const setIf = (id, path)=>{const el=document.getElementById(id); if(el) el.href=path;};
  setIf('cvTop', CV); setIf('cvHero', CV); setIf('cvSide', CV); setIf('cvSide', CV);
  setIf('epTop', EP); setIf('epHero', EP); setIf('epSide', EP); setIf('btnEP', EP);
})();
function handleContactLarge(e){
  e.preventDefault();
  const name = encodeURIComponent(document.getElementById('cname').value.trim());
  const email = encodeURIComponent(document.getElementById('cemail').value.trim());
  const message = encodeURIComponent(document.getElementById('cmessage').value.trim());
  const subject = encodeURIComponent('Website contact from ' + decodeURIComponent(name));
  const body = encodeURIComponent('Name: ' + decodeURIComponent(name) + '\nEmail: ' + decodeURIComponent(email) + '\n\n' + decodeURIComponent(message));
  window.location.href = 'mailto:matiouimouad9@gmail.com?subject=' + subject + '&body=' + body;
  return false;
}
(function(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('inview');
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.card, .project-card, .timeline-item, .card-sm').forEach(el=>observer.observe(el));
})();
(function(){
  const boxes = Array.from(document.querySelectorAll('.box'));
  function activateNearest(){
    const center = window.innerHeight/2;
    let best = null; let bestDist = Infinity;
    boxes.forEach(box=>{
      const rect = box.getBoundingClientRect();
      const mid = rect.top + rect.height/2;
      const dist = Math.abs(mid - center);
      box.classList.remove('active');
      box.style.zIndex = 1;
      if(dist < bestDist){ bestDist = dist; best = box; }
    });
    if(best){ best.classList.add('active'); best.style.zIndex = 10; }
  }
  activateNearest();
  window.addEventListener('scroll', throttle(activateNearest, 80));
  window.addEventListener('resize', throttle(activateNearest, 120));
  function throttle(fn, wait){
    let t = null;
    return function(){ if(t) return; t = setTimeout(()=>{ fn(); t=null; }, wait); };
  }
})();
