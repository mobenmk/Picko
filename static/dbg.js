(function(){
var box=null,list=[];
function show(m){
  list.push(m);if(list.length>4)list.shift();
  if(!box){
    box=document.createElement('div');
    box.style.cssText='position:fixed;top:0;left:0;right:0;z-index:99999;background:#b3261e;color:#fff;font:12px/1.5 monospace;padding:6px 10px;direction:ltr;text-align:left;white-space:pre-wrap;max-height:35vh;overflow:auto';
    box.onclick=function(){box.style.display='none';list=[]};
    (document.body||document.documentElement).appendChild(box)}
  box.style.display='block';box.textContent='JS error (tap to hide):\n'+list.join('\n')}
window.addEventListener('error',function(e){show((e.message||'error')+' @'+String(e.filename||'').split('/').pop()+':'+(e.lineno||'?')+':'+(e.colno||'?'))});
window.addEventListener('unhandledrejection',function(e){var r=e.reason;show('promise: '+(r&&r.message?r.message:r))});
})();
