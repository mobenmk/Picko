(function(){
var L=null,stick=true;
function near(){return L.scrollHeight-L.scrollTop-L.clientHeight<90}
function bottom(){if(L)L.scrollTop=L.scrollHeight}
function init(){
  L=document.getElementById('slist');if(!L)return;
  L.addEventListener('scroll',function(){stick=near()},{passive:true});
  if(window.ResizeObserver)new ResizeObserver(function(){if(stick)bottom()}).observe(L);
  window.addEventListener('resize',function(){if(stick){bottom();setTimeout(bottom,150)}});
}
window.Stick={after:function(keep){if(keep===false)return;stick=true;bottom();requestAnimationFrame(bottom);setTimeout(bottom,120);setTimeout(bottom,350)}};
init();
})();
