(function(){
var d=document;
function $(i){return d.getElementById(i)}
function I(n){return'<svg class="ic"><use href="#i-'+n+'"/></svg>'}
var sp=d.querySelector('svg symbol');
if(sp)sp.parentNode.insertAdjacentHTML('beforeend',
 '<symbol id="i-gear" viewBox="0 0 24 24"><path d="M18.7 10.0 L21.5 10.3 L21.5 13.7 L18.7 14.0 L18.2 15.3 L19.9 17.5 L17.5 19.9 L15.3 18.2 L14.0 18.7 L13.7 21.5 L10.3 21.5 L10.0 18.7 L8.7 18.2 L6.5 19.9 L4.1 17.5 L5.8 15.3 L5.3 14.0 L2.5 13.7 L2.5 10.3 L5.3 10.0 L5.8 8.7 L4.1 6.5 L6.5 4.1 L8.7 5.8 L10.0 5.3 L10.3 2.5 L13.7 2.5 L14.0 5.3 L15.3 5.8 L17.5 4.1 L19.9 6.5 L18.2 8.7Z"/><circle cx="12" cy="12" r="3"/></symbol>'+
 '<symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14.2c3 .3 5 2.3 5 5.8"/></symbol>'+
 '<symbol id="i-pad" viewBox="0 0 24 24"><rect x="2.5" y="7" width="19" height="11" rx="5"/><path d="M7.5 10v5M5 12.5h5"/><circle cx="15.5" cy="11.5" r=".8"/><circle cx="18" cy="13.5" r=".8"/></symbol>'+
 '<symbol id="i-volume" viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M18.5 6.5a8 8 0 0 1 0 11"/></symbol>'+
 '<symbol id="i-mute" viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6L8 10z"/><path d="M17 9l5 6M22 9l-5 6"/></symbol>'+
 '<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>');
var st=d.createElement('style');
st.textContent='nav button{padding:9px 2px;font-size:11px}'+
 '.sec{font-size:13px;color:var(--d);margin:14px 6px 8px;font-weight:600}'+
 '.cbtn{border:0;border-radius:12px;padding:8px 14px;background:rgba(255,255,255,.12);color:var(--t);cursor:pointer;font-size:14px;flex:none}'+
 '.cbtn.pri{background:linear-gradient(135deg,#2aabee,#7b6cff);color:#fff}.cbtn:disabled{opacity:.6}'+
 '#pg4 .f{margin:4px 0 8px}'+
 'nav button svg{transform-origin:50% 50%}'+
 '#n1 svg.anim{animation:tn1 .55s ease}@keyframes tn1{0%{transform:scale(1)}30%{transform:scale(1.35) rotate(-10deg)}60%{transform:scale(.9) rotate(7deg)}100%{transform:scale(1) rotate(0)}}'+
 '#n4 svg.anim{animation:tn4 .55s ease}@keyframes tn4{0%{transform:translateY(0)}35%{transform:translateY(-7px) scale(1.15)}65%{transform:translateY(0) scale(.92,1.1)}100%{transform:translateY(0) scale(1)}}'+
 '#n3 svg.anim{animation:tn3 .6s ease}@keyframes tn3{0%{transform:rotate(0)}20%{transform:rotate(-18deg)}45%{transform:rotate(14deg)}70%{transform:rotate(-7deg)}100%{transform:rotate(0)}}'+
 '#n2 svg.anim{animation:tn2 .7s cubic-bezier(.3,1.4,.5,1)}@keyframes tn2{from{transform:rotate(0)}to{transform:rotate(180deg)}}'+
 '.pg.on{animation:pgin .28s ease}@keyframes pgin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}';
d.head.appendChild(st);
/* four tabs */
var nav=d.querySelector('#main nav');
nav.innerHTML='<button id="n1" class="on">'+I('chat')+'گفتگوها</button><button id="n4">'+I('users')+'مخاطبین</button><button id="n3">'+I('pad')+'بازی‌ها</button><button id="n2">'+I('gear')+'منو</button>';
var pgs=d.querySelector('#main .pgs');
pgs.insertAdjacentHTML('beforeend',
 '<div class="pg" id="pg3"><div class="sec">بازی‌ها</div>'+
 '<div class="gcard"><div class="gh"><div class="rico">'+I('dice')+'</div><div><div class="nm">لودو</div><div class="sub">دو تا چهار نفره یا با ربات</div></div></div>'+
 '<div class="gm"><button data-m="2">۲ نفره</button><button data-m="3">۳ نفره</button><button data-m="4">۴ نفره</button><button data-m="b" class="pri">بازی با ربات</button></div>'+
 '<div class="gm gbots2" style="display:none"><button data-b="1">۱ ربات</button><button data-b="2">۲ ربات</button><button data-b="3">۳ ربات</button></div></div>'+
 '<p class="hint">بازی‌های بیشتر به‌زودی اضافه می‌شن</p></div>'+
 '<div class="pg" id="pg4"><div class="f">'+I('search')+'<input id="cq" placeholder="جستجوی نام کاربری یا نام" autocomplete="off" autocapitalize="none"></div>'+
 '<div id="cres"></div><div class="sec">مخاطبین من</div><div id="clist"></div></div>');
/* remove the old ludo row from the chats tab (games have their own tab now) */
Array.prototype.forEach.call(d.querySelectorAll('#pg1 .row'),function(r){if(r.id!=='rsaved')r.remove()});
/* games tab */
$('pg3').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
  if(b.dataset.m==='b'){$('pg3').querySelector('.gbots2').style.display='flex';return}
  if(b.dataset.m){var n=+b.dataset.m;Ludo.start(n,new Array(n).fill(false));return}
  if(b.dataset.b){var k=+b.dataset.b,arr=[false];for(var i=0;i<k;i++)arr.push(true);Ludo.start(k+1,arr)}});
$('n3').onclick=function(){page(3)};
/* contacts tab */
var mine=[],tmr=null;
function mkRow(u,right){
  var r=d.createElement('div');r.className='row';
  var a=d.createElement('div');a.className='av';setAv(a,u.name);
  var l=d.createElement('div');l.className='rl';
  var n=d.createElement('div');n.className='nm';n.textContent=u.name;
  var s=d.createElement('div');s.className='sub';s.textContent='@'+u.username+(u.bio?' · '+u.bio:'');
  l.appendChild(n);l.appendChild(s);r.appendChild(a);r.appendChild(l);if(right)r.appendChild(right);return r}
function renderMine(){
  var L=$('clist');L.innerHTML='';
  if(!mine.length){L.innerHTML='<p class="hint" style="margin-top:14px">هنوز مخاطبی نداری. با جستجوی نام کاربری دوستت اضافه‌ش کن.</p>';return}
  mine.forEach(function(u){var r=mkRow(u);r.onclick=function(){
    sheet([['chat','ارسال پیام',function(){toast('گفتگوی مستقیم به‌زودی اضافه می‌شه')}],
           ['trash','حذف از مخاطبین',function(){api('/api/contacts/'+encodeURIComponent(u.username)+'/delete').then(function(){toast('حذف شد');load();search()}).catch(function(e){toast(e.message)})},'dg']])};
    L.appendChild(r)})}
function renderRes(items){
  var R=$('cres');R.innerHTML='';
  if(!items.length){R.innerHTML='<p class="hint" style="margin:10px">کاربری پیدا نشد</p>';return}
  var h=d.createElement('div');h.className='sec';h.textContent='نتیجه‌ی جستجو';R.appendChild(h);
  items.forEach(function(u){
    var b=d.createElement('button');b.className='cbtn'+(u.added?'':' pri');b.textContent=u.added?'افزوده شده':'افزودن';b.disabled=!!u.added;
    b.onclick=function(){b.disabled=true;api('/api/contacts',{username:u.username}).then(function(){toast('اضافه شد');load();search()}).catch(function(e){b.disabled=false;toast(e.message)})};
    R.appendChild(mkRow(u,b))})}
function load(){return api('/api/contacts',null,'GET').then(function(j){mine=j.items;renderMine()}).catch(function(e){toast(e.message)})}
function search(){
  var q=$('cq').value.trim();
  if(q.length<2){$('cres').innerHTML='';return}
  api('/api/users?q='+encodeURIComponent(q),null,'GET').then(function(j){renderRes(j.items)}).catch(function(e){toast(e.message)})}
$('cq').oninput=function(){clearTimeout(tmr);tmr=setTimeout(search,300)};
$('n4').onclick=function(){page(4);load()};
nav.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var s=b.querySelector('svg.ic');if(!s)return;s.classList.remove('anim');void s.getBoundingClientRect();s.classList.add('anim');setTimeout(function(){s.classList.remove('anim')},800)});
new MutationObserver(function(){if($('auth').classList.contains('on')){mine=[];$('clist').innerHTML='';$('cres').innerHTML='';$('cq').value=''}}).observe($('auth'),{attributes:true,attributeFilter:['class']});
window.addEventListener('load',function(){
  var _api=window.api;if(typeof _api!=='function')return;
  window.api=function(p){var r=_api.apply(this,arguments),u=String(p);
    if(u.indexOf('/api/login')===0||u.indexOf('/api/register')===0)return r;
    return r.catch(function(e){if(e&&e.code===401&&tok){store('');me=null;d.body.classList.remove('in');show('auth');toast('دوباره وارد شو')}throw e})}});
window.Tabs={reload:load,back:function(){if($('main').classList.contains('on')&&!$('pg1').classList.contains('on')){page(1);return true}return false}};
})();
