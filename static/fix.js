(function(){
var d=document;
var ICONS={
eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
eyeoff:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M3 3l18 18"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
at:'<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
lock:'<rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>',
chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
send:'<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
trash:'<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 14h10l1-14"/>',
edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
back:'<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
out:'<path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4"/><path d="M16 8l4 4-4 4"/><path d="M10 12h10"/>',
check:'<path d="M5 12l5 5L20 7"/>',
x:'<path d="M6 6l12 12M18 6L6 18"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
bell:'<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4z"/><path d="M10 21a2 2 0 0 0 4 0"/>',
cam:'<path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="4"/>',
mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>',
dice:'<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="15" r="1"/>',
refresh:'<path d="M20 11a8 8 0 1 0-2 6"/><path d="M20 4v7h-7"/>',
key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9"/><path d="M16 7l3 3"/>',
shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9.5h.01M15 9.5h.01"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'};
function inline(svg){
  var u=svg.querySelector('use');if(!u)return;
  var n=(u.getAttribute('href')||u.getAttribute('xlink:href')||'').replace('#i-','');
  var p=ICONS[n];if(!p){var sy=d.getElementById('i-'+n);p=sy?sy.innerHTML:null}
  if(!p)return;
  svg.setAttribute('viewBox','0 0 24 24');svg.innerHTML=p}
function sweep(root){if(root.querySelectorAll)root.querySelectorAll('svg.ic').forEach(inline)}
sweep(d);
new MutationObserver(function(ms){ms.forEach(function(m){
  m.addedNodes.forEach(function(n){if(n.nodeType===1){if(n.matches&&n.matches('svg.ic'))inline(n);else sweep(n)}});
  var t=m.target;if(t&&t.matches&&t.matches('svg.ic')&&t.querySelector('use'))inline(t)})}).observe(d.body,{childList:true,subtree:true});
var st=d.createElement('style');
st.textContent='.emo1{line-height:1.1}.emo1 .em{vertical-align:-.2em}'+
'html.emomiss .em{background-image:none;background:rgba(255,255,255,.2);border-radius:50%}'+
'html.emomiss #egrid::before{content:"فایل emoji.png روی گوشی پیدا نشد. مرحله‌ی کپی فایل رو دوباره انجام بده.";grid-column:1/-1;color:#ff8a98;font-size:13px;padding:6px 4px;line-height:1.8}';
d.head.appendChild(st);
var im=new Image();
im.onerror=function(){d.documentElement.classList.add('emomiss')};
im.src='/emoji.png';
})();
