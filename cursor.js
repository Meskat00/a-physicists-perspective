/* Shared custom cursor + pointer spotlight — extracted from the pages (P1) so one edit updates every page. */
/*MOUSE2*/
(function(){try{
if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(!(window.matchMedia&&window.matchMedia("(hover: hover) and (pointer: fine)").matches))return;
var dot=document.createElement("div");dot.id="curDot";
var ring=document.createElement("div");ring.id="curRing";
document.body.appendChild(ring);document.body.appendChild(dot);
var mx=innerWidth/2,my=innerHeight/2,dx=mx,dy=my,rx=mx,ry=my,lx=mx,ly=my,hovering=false,bs=1;
document.addEventListener("pointermove",function(e){mx=e.clientX;my=e.clientY;
var t=e.target&&e.target.closest?e.target.closest("a,button,.card,.soc,.step,.chap,.vidwrap,input,select,.fbtn,.expandbtn"):null;
var h=!!t;if(h!==hovering){hovering=h;ring.classList.toggle("big",h);}
},{passive:true});
(function loop(){
dx+=(mx-dx)*.45;dy+=(my-dy)*.45;
rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
var vx=rx-lx,vy=ry-ly;lx=rx;ly=ry;
var sp=Math.min(26,Math.hypot(vx,vy));
var ang=Math.atan2(vy,vx)*180/Math.PI;
var st=Math.min(.3,sp*.012);bs+=((hovering?1.58:1)-bs)*.18;
dot.style.transform="translate("+dx+"px,"+dy+"px)";
ring.style.transform="translate("+rx+"px,"+ry+"px) rotate("+ang+"deg) scale("+(bs*(1+st))+","+(bs*(1-st*.55))+")";
requestAnimationFrame(loop);})();
}catch(e){}})();

/*DOTFX*/
(function(){try{
if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var tick=false;
document.addEventListener("pointermove",function(e){
if(tick)return;tick=true;
var x=e.clientX,y=e.clientY;
requestAnimationFrame(function(){
document.documentElement.style.setProperty("--mx",x+"px");
document.documentElement.style.setProperty("--my",y+"px");
tick=false;});
},{passive:true});
}catch(e){}})();
