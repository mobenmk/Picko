(function(){
var d=document;
function $(i){return d.getElementById(i)}
function I(n){return'<svg class="ic"><use href="#i-'+n+'"/></svg>'}
var sp=d.querySelector('svg symbol');
if(sp)sp.parentNode.insertAdjacentHTML('beforeend',
 '<symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4z"/><path d="M10 21a2 2 0 0 0 4 0"/></symbol>'+
 '<symbol id="i-cam" viewBox="0 0 24 24"><path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="4"/></symbol>'+
 '<symbol id="i-mic" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></symbol>'+
 '<symbol id="i-dice" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="15" r="1"/></symbol>'+
 '<symbol id="i-refresh" viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2 6"/><path d="M20 4v7h-7"/></symbol>'+
 '<symbol id="i-key" viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9"/><path d="M16 7l3 3"/></symbol>'+
 '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></symbol>');
var st=d.createElement('style');
st.textContent='#games,#perms{padding:0;align-items:stretch;overflow:hidden}'+
'.gscroll{flex:1;overflow-y:auto;padding:0 12px 20px;width:100%}'+
'.gb{border-radius:22px;padding:16px;margin-bottom:14px;background:linear-gradient(135deg,rgba(255,170,60,.18),rgba(255,79,163,.16));border:1px solid rgba(255,190,110,.35)}'+
'.gb.ok{background:linear-gradient(135deg,rgba(47,196,107,.2),rgba(42,171,238,.16));border-color:rgba(90,220,150,.45)}'+
'.gbt{display:flex;align-items:center;gap:10px;font-size:17px}.gb p{margin:8px 0 6px;color:#d5d9e6;font-size:14px;line-height:1.8}'+
'.gbs{font-size:13px;color:var(--d);margin-bottom:4px}'+
'.gcard{border-radius:24px;padding:16px;background:var(--g);border:1px solid var(--l);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px)}'+
'.gh{display:flex;align-items:center;gap:12px;margin-bottom:14px}'+
'.gm{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}'+
'.gm button{flex:1 1 40%;border:1px solid var(--l);background:rgba(255,255,255,.07);border-radius:16px;padding:14px 8px;font-size:16px;font-weight:600;cursor:pointer}'+
'.gm button:active{background:rgba(255,255,255,.16)}'+
'.gm button.pri{background:linear-gradient(135deg,rgba(42,171,238,.35),rgba(123,108,255,.35))}'+
'.btn.alt{display:flex;align-items:center;justify-content:center;gap:8px;background:var(--g);border:1px solid var(--l);margin-bottom:10px}'+
'.pcd{display:flex;align-items:center;gap:12px;padding:14px;border-radius:20px;background:var(--g);border:1px solid var(--l);margin-bottom:10px}'+
'.pcd .rico{width:44px;height:44px}.pcd .rl{flex:1;min-width:0}'+
'.ps{font-size:12px;margin-top:2px}.ps.wait{color:var(--d)}.ps.ok{color:#5be39a}.ps.no{color:#ff8a98}.ps.na{color:#f3c36b}'+
'.pcd button{border:0;border-radius:12px;padding:9px 14px;background:rgba(255,255,255,.12);cursor:pointer;font-size:14px}'+
'.phero{display:flex;flex-direction:column;align-items:center;text-align:center;padding:26px 20px 14px}'+
'.phero .rico{width:76px;height:76px;margin-bottom:14px}.phero .ic{width:36px;height:36px}.phero h2{margin:0 0 6px}'+
'.pbt{padding:8px 12px calc(14px + env(safe-area-inset-bottom,0px))}'+
'.pbt .btn.out{border-color:var(--l);color:var(--d)}'+
'#pwm{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:40;padding:20px}#pwm.on{display:flex}'+
'.pwc{width:100%;max-width:380px;border-radius:24px;padding:18px;background:rgba(22,25,38,.97);border:1px solid var(--l)}.pwc h3{margin:0 0 14px}';
d.head.appendChild(st);
$('app').insertAdjacentHTML('beforeend',
'<section id="games" class="scr"><div class="top"><button class="ib" id="gback">'+I('back')+'</button><div class="grow"><h2>بازی‌ها</h2></div></div>'+
'<div class="gscroll"><div id="gbanner" class="gb" style="display:none"><div class="gbt">'+I('refresh')+'<b id="gbt">سرور فعلاً در حال آپدیته</b></div>'+
'<p id="gbp">تا وقتی سرور برگرده می‌تونی بازی کنی، حوصلت سر نره.</p><div class="gbs" id="gbs">هر چند ثانیه سرور رو چک می‌کنم...</div>'+
'<button class="btn" id="gretry" style="display:none"><span>ورود به پیکو</span></button></div>'+
'<div class="gcard"><div class="gh"><div class="rico">'+I('dice')+'</div><div><div class="nm">لودو</div><div class="sub">دو تا چهار نفره یا با ربات</div></div></div>'+
'<div class="gm"><button data-m="2">۲ نفره</button><button data-m="3">۳ نفره</button><button data-m="4">۴ نفره</button><button data-m="b" class="pri">بازی با ربات</button></div>'+
'<div class="gm" id="gbots" style="display:none"><button data-b="1">۱ ربات</button><button data-b="2">۲ ربات</button><button data-b="3">۳ ربات</button></div></div></div></section>'+
'<section id="perms" class="scr"><div class="gscroll"><div class="phero"><div class="rico">'+I('shield')+'</div><h2>دسترسی‌ها</h2><div class="sub">برای اینکه Picko درست کار کنه، این اجازه‌ها لازمه</div></div>'+
'<div class="pcd"><div class="rico">'+I('bell')+'</div><div class="rl"><div class="nm">اعلان‌ها</div><div class="sub">وقتی پیام جدید رسید خبرت کنه</div><div class="ps wait" id="ps-notif"></div></div><button id="pb-notif">اجازه</button></div>'+
'<div class="pcd"><div class="rico">'+I('mic')+'</div><div class="rl"><div class="nm">میکروفون</div><div class="sub">برای پیام صوتی و تماس</div><div class="ps wait" id="ps-mic"></div></div><button id="pb-mic">اجازه</button></div>'+
'<div class="pcd"><div class="rico">'+I('cam')+'</div><div class="rl"><div class="nm">دوربین</div><div class="sub">برای تماس تصویری و فرستادن عکس</div><div class="ps wait" id="ps-cam"></div></div><button id="pb-cam">اجازه</button></div></div>'+
'<div class="pbt"><button class="btn" id="pall"><span>فعال‌سازی همه</span></button><button class="btn out" id="pskip"><span>بعداً</span></button></div></section>');
d.body.insertAdjacentHTML('beforeend','<div id="pwm"><div class="pwc"><h3>تغییر رمز عبور</h3><div class="pf"><label>رمز فعلی</label><input id="po" type="password" autocomplete="current-password"></div><div class="pf"><label>رمز جدید</label><input id="pn2" type="password" autocomplete="new-password"></div><div class="er" id="pwe"></div><button class="btn" id="pok"><span>تغییر رمز</span></button><button class="btn out" id="pcx"><span>انصراف</span></button></div></div>');
/* server alive / offline */
function alive(){return new Promise(function(res){var done=false,t=setTimeout(function(){if(!done){done=true;res(false)}},5000);
  fetch('/ping',{cache:'no-store'}).then(function(r){if(!done){done=true;clearTimeout(t);res(r.ok)}}).catch(function(){if(!done){done=true;clearTimeout(t);res(false)}})})}
var pt=null;
function offline(){d.body.classList.add('off');$('gbanner').style.display='block';$('gback').style.display='none';show('games');
  clearInterval(pt);pt=setInterval(function(){alive().then(function(ok){if(!ok)return;clearInterval(pt);
    $('gbanner').className='gb ok';$('gbt').textContent='سرور آنلاین شد';$('gbp').textContent='هر وقت خواستی بازی رو تموم کن و وارد پیکو شو.';
    $('gbs').style.display='none';$('gretry').style.display='block';
    if(typeof toast==='function')toast('سرور آنلاین شد')})},6000)}
$('gretry').onclick=function(){location.reload()};
function openGames(){show('games');if(typeof CapApp==='undefined'||!CapApp)try{history.pushState({g:1},'')}catch(e){}}
$('gback').onclick=function(){if(typeof CapApp==='undefined'||!CapApp)history.back();else{show('main');page(1)}};
$('games').addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.id)return;
  if(b.dataset.m==='b'){$('gbots').style.display='flex';return}
  if(b.dataset.m){var n=+b.dataset.m;Ludo.start(n,new Array(n).fill(false));return}
  if(b.dataset.b){var k=+b.dataset.b,arr=[false];for(var i=0;i<k;i++)arr.push(true);Ludo.start(k+1,arr)}});
/* permissions */
var PS={notif:'wait',cam:'wait',mic:'wait'},from=1;
var TXT={wait:'منتظر اجازه',ok:'فعال شد',no:'اجازه داده نشد',na:'در این نسخه‌ی برنامه فعال نیست'};
function LN(){return window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.LocalNotifications}
function paint(){['notif','cam','mic'].forEach(function(k){var e=$('ps-'+k);e.textContent=TXT[PS[k]];e.className='ps '+PS[k];$('pb-'+k).style.display=PS[k]==='ok'?'none':''})}
function askNotif(){var p=LN();if(!p)return Promise.resolve('na');return p.requestPermissions().then(function(r){return r.display==='granted'?'ok':'no'}).catch(function(){return'no'})}
function askMedia(k){if(!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia))return Promise.resolve('na');
  return navigator.mediaDevices.getUserMedia(k==='cam'?{video:true}:{audio:true}).then(function(s){s.getTracks().forEach(function(t){t.stop()});return'ok'}).catch(function(){return'no'})}
function ask(k){return(k==='notif'?askNotif():askMedia(k)).then(function(r){PS[k]=r;paint();return r})}
function check(){var p=LN();
  if(p&&p.checkPermissions)p.checkPermissions().then(function(r){if(r.display==='granted'){PS.notif='ok';paint()}}).catch(function(){});
  ['camera','microphone'].forEach(function(n,i){try{navigator.permissions.query({name:n}).then(function(r){if(r.state==='granted'){PS[i?'mic':'cam']='ok';paint()}}).catch(function(){})}catch(e){}})}
function openPerms(f){from=f||1;paint();show('perms');check()}
function finish(){try{localStorage.setItem('pk_perms','1')}catch(e){}if(from===2){page(2)}else page(1);show('main')}
['notif','mic','cam'].forEach(function(k){$('pb-'+k).onclick=function(){ask(k)}});
$('pall').onclick=function(){ask('notif').then(function(){return ask('mic')}).then(function(){return ask('cam')}).then(function(){setTimeout(finish,700)})};
$('pskip').onclick=finish;
/* password */
function closePw(){$('pwm').classList.remove('on')}
$('pcx').onclick=closePw;
$('pok').onclick=function(){var o=$('po').value,n=$('pn2').value,E=$('pwe');E.textContent='';
  if(!o){E.textContent='رمز فعلی را وارد کن';return}if(n.length<6){E.textContent='رمز جدید حداقل ۶ کاراکتر باشد';return}
  api('/api/password',{old:o,new:n}).then(function(){closePw();$('po').value='';$('pn2').value='';toast('رمز عوض شد')}).catch(function(e){E.textContent=e.message})};
/* inject into profile and chats */
var card=d.querySelector('#pg2 .card'),out=$('out');
function mk(t,ic,fn){var b=d.createElement('button');b.className='btn alt';b.innerHTML=I(ic)+'<span>'+t+'</span>';b.onclick=fn;card.insertBefore(b,out)}
mk('دسترسی‌ها','shield',function(){openPerms(2)});
mk('تغییر رمز عبور','key',function(){$('pwe').textContent='';$('pwm').classList.add('on')});
var rs=$('rsaved'),row=d.createElement('div');row.className='row';
row.innerHTML='<div class="rico">'+I('dice')+'</div><div class="rl"><div class="nm">بازی لودو</div><div class="sub">دو تا چهار نفره یا با ربات</div></div>';
row.onclick=openGames;rs.parentNode.insertBefore(row,rs.nextSibling);
window.Games={alive:alive,offline:offline,
 back:function(){
  if($('pwm').classList.contains('on')){closePw();return true}
  if($('perms').classList.contains('on')){finish();return true}
  if($('ludo').classList.contains('on')){Ludo.leave();return true}
  if($('games').classList.contains('on')){if(d.body.classList.contains('off'))return false;show('main');page(1);return true}
  return false}};
window.Perms={maybe:function(){var f=null;try{f=localStorage.getItem('pk_perms')}catch(e){}var fresh=!!window.__newAcct;window.__newAcct=false;if((!f||fresh)&&!d.body.classList.contains('off')){try{localStorage.setItem('pk_perms','1')}catch(e){}openPerms(1)}}};
})();
