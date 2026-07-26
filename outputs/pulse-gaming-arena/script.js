const $ = (s, p=document) => p.querySelector(s);
window.addEventListener('load', () => setTimeout(() => $('.loader').classList.add('done'), 1450));

const dot = $('.cursor-dot'), ring = $('.cursor-ring');
let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
window.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
function cursor(){ rx += (mx-rx)*.17; ry += (my-ry)*.17; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(cursor) } cursor();
document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter',()=>{ring.style.width='48px';ring.style.height='48px';ring.style.background='rgba(78,222,255,.1)'});el.addEventListener('mouseleave',()=>{ring.style.width='31px';ring.style.height='31px';ring.style.background='transparent'}) });

const hero = $('.hero');
hero.addEventListener('mousemove', e => { const x=(e.clientX/innerWidth-.5)*12,y=(e.clientY/innerHeight-.5)*12; $('.hero-media').style.transform=`scale(1.07) translate(${x}px,${y}px)`; $('.crosshair').style.margin=`${y}px 0 0 ${x}px`; });
hero.addEventListener('mouseleave', ()=>{ $('.hero-media').style.transform=''; $('.crosshair').style.margin=''; });

const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.animate([{opacity:0,transform:'translateY(35px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,fill:'forwards',easing:'cubic-bezier(.2,.8,.2,1)'}); observer.unobserve(e.target)} }), {threshold:.12});
document.querySelectorAll('.zone-card,.plans article,.match-card,.sim-copy,.sim-visual,.review').forEach(el=>{el.style.opacity='0';observer.observe(el)});

const dialog = $('#lightbox'); document.querySelectorAll('.gallery-item').forEach(btn => btn.addEventListener('click',()=>{ $('img',dialog).src=btn.dataset.img; dialog.showModal(); })); $('button',dialog).addEventListener('click',()=>dialog.close());
const track=$('#reviewTrack'); $('#next').onclick=()=>track.scrollBy({left:440,behavior:'smooth'}); $('#prev').onclick=()=>track.scrollBy({left:-440,behavior:'smooth'});
