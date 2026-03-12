const reveals=[...document.querySelectorAll('.reveal')];
const sections=[...document.querySelectorAll('section[id]')];
const navLinks=[...document.querySelectorAll('.pill a')];
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add('inview');
  });
},{threshold:0.2});
reveals.forEach(el=>ro.observe(el));
const so=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const id=e.target.getAttribute('id');
      navLinks.forEach(a=>{
        const href=a.getAttribute('href')||'';
        if(href.endsWith(`#${id}`)||href==`#${id}`){a.classList.add('active');}
        else a.classList.remove('active');
      });
    }
  });
},{threshold:0.6});
sections.forEach(s=>so.observe(s));
const stage=document.querySelector('.avatar-stage');
const glass=stage?stage.querySelector('.avatar-glass'):null;
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(stage&&glass&&!reduceMotion){
  stage.addEventListener('mousemove',e=>{
    const r=stage.getBoundingClientRect();
    const rx=(e.clientX-r.left)/r.width-0.5;
    const ry=(e.clientY-r.top)/r.height-0.5;
    glass.style.transform=`rotateX(${(-ry*4)}deg) rotateY(${(rx*6)}deg) translateZ(0)`;
  });
  stage.addEventListener('mouseleave',()=>{glass.style.transform='none';});
}
