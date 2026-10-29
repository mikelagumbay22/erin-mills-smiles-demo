const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
const m=document.querySelector('.menu');m&&m.addEventListener('click',()=>document.querySelector('nav').classList.toggle('open'));
const st=document.querySelector('.stage:not(.hx-stage)');if(st&&matchMedia('(pointer:fine)').matches){addEventListener('mousemove',e=>{const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);st.style.transform=`translate(${x*-18}px,${y*-14}px) rotateY(${x*6}deg)`});}
addEventListener('scroll',()=>{if(st)st.style.translate=`0 ${scrollY*.12}px`},{passive:true});
const f=document.querySelector('#bookform');f&&f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f);const b=[...d].map(([k,v])=>k+': '+v).join('\n');location.href='mailto:info@erinmillssmilesdentistry.com?subject='+encodeURIComponent('Consultation request')+'&body='+encodeURIComponent(b)});
const lb=document.querySelector('.lb');if(lb){const li=lb.querySelector('img');document.querySelectorAll('.zoom').forEach(z=>z.addEventListener('click',()=>{li.src=z.dataset.src;li.alt=z.querySelector('img').alt;lb.hidden=false}));lb.addEventListener('click',e=>{if(e.target!==li)lb.hidden=true});addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true})}
const cb=document.querySelector('.callbar');const hc=document.querySelector('.hero .ctas,.ph');const tc=()=>{const lim=hc?hc.getBoundingClientRect().bottom+scrollY:300;cb&&cb.classList.toggle('show',scrollY>lim-innerHeight+120||innerWidth>720)};addEventListener('scroll',tc,{passive:true});addEventListener('resize',tc);tc();
/* round2 hero: scroll-scrubbed frame sequence -> labelled cutaway */
(()=>{const hx=document.querySelector('.hx');if(!hx)return;
const cv=hx.querySelector('canvas'),cx=cv.getContext('2d'),end=hx.querySelector('.hx-end'),lbls=[...hx.querySelectorAll('.lbl')];
const N=60,fr=[];let loaded=0,last=-1;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,mobile=matchMedia('(max-width:720px)').matches;
const showLabels=n=>lbls.forEach((l,i)=>l.classList.toggle('on',i<n));
const finish=()=>{end.style.opacity=1;showLabels(lbls.length);hx.classList.add('done','started')};
if(reduce){finish();return}
const draw=i=>{i=Math.max(0,Math.min(N-1,i|0));if(i===last||!fr[i]||!fr[i].complete)return;last=i;cx.drawImage(fr[i],0,0,cv.width,cv.height)};
const load=()=>new Promise(res=>{for(let i=0;i<N;i++){const im=new Image();im.decoding='async';im.src=`img/hx/f${String(i+1).padStart(3,'0')}.webp`;im.onload=im.onerror=()=>{if(++loaded===N)res()};if(i===0)im.addEventListener('load',()=>{draw(0);hx.classList.add('ready')});fr[i]=im}});
const apply=p=>{// p 0..1
 const fp=Math.min(p/.7,1);last=-1;draw(fp*(N-1));
 const x=Math.max(0,Math.min(1,(p-.66)/.1));end.style.opacity=x;
 const lp=(p-.76)/.19;showLabels(lp<0?0:Math.ceil(lp*lbls.length));
 hx.classList.toggle('done',p>.95);hx.classList.toggle('started',p>.02)};
if(mobile){// play once when visible, then rest on the labelled cutaway
 const go=()=>load().then(()=>{const t0=performance.now(),D=4200;const step=t=>{const p=Math.min((t-t0)/D,1);apply(p);if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)});
 const o=new IntersectionObserver(e=>{if(e[0].isIntersecting){o.disconnect();go()}},{threshold:.4});o.observe(hx.querySelector('.stage'));return}
let ticking=false;const onScroll=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;const r=hx.getBoundingClientRect(),span=hx.offsetHeight-innerHeight;apply(Math.max(0,Math.min(1,-r.top/span)))})};
load().then(onScroll);addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll)})();
