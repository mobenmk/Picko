(function(){
var d=document,COLS=16,TOTAL=266;
var CATS=[["صورتک‌ها",0,27],["دست‌ها",27,16],["حیوانات",43,15],["قلب و نگین",58,16],["طبیعت",74,16],["خوراکی",90,17],["موسیقی و سرگرمی",107,19],["وسایل نقلیه",126,17],["وسایل",143,19],["بازی",162,17],["نمادها",179,17],["پرچم‌ها",196,23],["علائم",219,22],["جدید",241,25]];
function $(i){return d.getElementById(i)}
function mk(i,mode){var s=d.createElement('span'),c=i%COLS,r=(i/COLS)|0;
  s.className='em';s.dataset.e=i;s.style.backgroundPosition=(-c*1.4)+'em '+(-r*1.4)+'em';
  if(mode==='edit')s.setAttribute('contenteditable','false');return s}
function render(el,text,mode){
  el.textContent='';if(el.classList&&el.classList.remove)el.classList.remove('emo1');
  var re=/:e(\d+):/g,last=0,m,n=0,only=true,t;
  while((m=re.exec(text))!==null){
    if(m.index>last){t=text.slice(last,m.index);if(t.trim())only=false;el.appendChild(d.createTextNode(t))}
    var i=+m[1];
    if(i<TOTAL){el.appendChild(mk(i,mode));n++;if(mode==='edit')el.appendChild(d.createTextNode('\u200b'))}
    else{only=false;el.appendChild(d.createTextNode(m[0]))}
    last=re.lastIndex}
  if(last<text.length){t=text.slice(last);if(t.trim())only=false;el.appendChild(d.createTextNode(t))}
  if(mode==='bubble'&&n>0&&n<=3&&only)el.classList.add('emo1')}
function ser(el){var o='';
  (function w(n){var c=n.firstChild;
    while(c){
      if(c.nodeType===3)o+=c.nodeValue;
      else if(c.nodeType===1){
        if(c.dataset&&c.dataset.e!==undefined)o+=':e'+c.dataset.e+':';
        else if(c.nodeName==='BR')o+='\n';
        else{if((c.nodeName==='DIV'||c.nodeName==='P')&&o&&o.slice(-1)!=='\n')o+='\n';w(c)}}
      c=c.nextSibling}})(el);
  return o.replace(/\u200b/g,'')}
function plain(t){return String(t).replace(/:e\d+:/g,'')}
var ta=null,pk=null,btn=null,last=null,cur='r';
function recent(){try{return JSON.parse(localStorage.getItem('pk_emr')||'[]')}catch(e){return[]}}
function pushRecent(i){var r=recent().filter(function(x){return x!==i});r.unshift(i);try{localStorage.setItem('pk_emr',JSON.stringify(r.slice(0,24)))}catch(e){}}
function ins(i){
  var sp=mk(i,'edit'),z=d.createTextNode('\u200b'),r=null,s=window.getSelection();
  if(d.activeElement===ta&&s.rangeCount&&ta.contains(s.getRangeAt(0).startContainer))r=s.getRangeAt(0);
  else if(last&&ta.contains(last.startContainer))r=last;
  else{r=d.createRange();r.selectNodeContents(ta);r.collapse(false)}
  r.deleteContents();r.insertNode(z);r.insertNode(sp);
  r.setStartAfter(z);r.collapse(true);last=r.cloneRange();
  if(d.activeElement===ta){s.removeAllRanges();s.addRange(r)}
  ta.dispatchEvent(new Event('input',{bubbles:true}));pushRecent(i)}
function tabs(){
  var h='<button data-k="r" class="'+(cur==='r'?'on':'')+'"><svg class="ic"><use href="#i-clock"/></svg></button>';
  CATS.forEach(function(c,k){h+='<button data-k="'+k+'" class="'+(String(k)===String(cur)?'on':'')+'"><span class="em" style="background-position:'+(-(c[1]%COLS)*1.4)+'em '+(-((c[1]/COLS)|0)*1.4)+'em"></span></button>'});
  $('etabs').innerHTML=h}
function grid(){
  var list=[],title='';
  if(cur==='r'){list=recent();title='اخیراً استفاده‌شده'}
  else{var c=CATS[+cur];title=c[0];for(var i=0;i<c[2];i++)list.push(c[1]+i)}
  var h='<div class="cn">'+title+'</div>';
  if(!list.length)h+='<div class="cn">هنوز ایموجی‌ای استفاده نکردی</div>';
  list.forEach(function(i){h+='<button data-i="'+i+'"><span class="em" style="background-position:'+(-(i%COLS)*1.4)+'em '+(-((i/COLS)|0)*1.4)+'em"></span></button>'});
  $('egrid').innerHTML=h;$('egrid').scrollTop=0}
var sect=null,fullH=0,KB=0,busy=false;
function track(){fullH=Math.max(fullH,window.innerHeight)}
function kbUp(){return fullH-window.innerHeight>100}
function waitFor(cond,done,ms){var t0=Date.now();(function tick(){if(cond()||Date.now()-t0>ms)done();else setTimeout(tick,40)})()}
function freeze(){var r=sect.getBoundingClientRect();sect.style.bottom='auto';sect.style.height=r.height+'px'}
function unfreeze(){sect.style.height='';sect.style.bottom=''}
function isOpen(){return pk.classList.contains('on')}
function openPk(){
  if(isOpen()||busy)return;
  busy=true;track();
  var up=kbUp();
  if(up){KB=Math.max(150,Math.min(700,fullH-window.innerHeight));try{localStorage.setItem('pk_kbh',String(KB))}catch(e){}}
  if(!KB)KB=Math.round(window.innerHeight*0.38);
  pk.style.height=KB+'px';
  if(cur==='r'&&!recent().length)cur=0;
  tabs();grid();
  if(up){
    freeze();ta.blur();
    waitFor(function(){return fullH-window.innerHeight<=8},function(){pk.classList.add('on');sect.style.height='';sect.style.bottom=KB+'px';busy=false},600)
  }else{pk.classList.add('on');sect.style.height='';sect.style.bottom=KB+'px';busy=false}}
function closePk(toKeyboard){
  if(!pk||!isOpen())return;
  if(toKeyboard){
    freeze();
    waitFor(function(){return fullH-window.innerHeight>100},function(){pk.classList.remove('on');unfreeze()},700)
  }else{pk.classList.remove('on');unfreeze()}}
function init(){
  var old=$('ta'),comp=d.querySelector('#saved .comp');
  if(!old||!comp)return;
  var sp=d.querySelector('svg symbol');
  if(sp)sp.parentNode.insertAdjacentHTML('beforeend','<symbol id="i-smile" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9.5h.01M15 9.5h.01"/></symbol><symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>');
  var st=d.createElement('style');
  st.textContent='.em{display:inline-block;width:1.4em;height:1.4em;background-image:url(/emoji.png);background-size:1600% auto;background-repeat:no-repeat;vertical-align:-.3em}'+
  '.emo1 .em{font-size:44px}'+
  '#ta{flex:1;min-width:0;min-height:44px;max-height:120px;overflow-y:auto;outline:0;padding:10px;font-size:16px;line-height:1.6;white-space:pre-wrap;word-break:break-word;-webkit-user-select:text;user-select:text}'+
  '#ta:empty::before{content:attr(data-ph);color:#6b7388;pointer-events:none}'+
  '#empk{display:none;position:fixed;left:50%;bottom:0;transform:translateX(-50%);width:min(100%,480px);flex-direction:column;background:rgba(18,21,33,.98);border-top:1px solid var(--l);border-radius:22px 22px 0 0;overflow:hidden;z-index:15}#empk.on{display:flex}'+
  '.etabs{display:flex;overflow-x:auto;gap:4px;padding:6px 8px;border-bottom:1px solid var(--l);flex:none;scrollbar-width:none}.etabs::-webkit-scrollbar{display:none}'+
  '.etabs button{flex:none;width:42px;height:38px;border:0;border-radius:12px;background:transparent;display:grid;place-items:center;color:var(--d);cursor:pointer}.etabs button.on{background:rgba(255,255,255,.13);color:var(--t)}.etabs .em{font-size:20px}'+
  '.egrid{flex:1;overflow-y:auto;padding:6px 8px;display:grid;grid-template-columns:repeat(auto-fill,minmax(46px,1fr));gap:2px;align-content:start}'+
  '.egrid .cn{grid-column:1/-1;font-size:12px;color:var(--d);margin:6px 4px 2px}'+
  '.egrid button{border:0;background:transparent;border-radius:12px;padding:3px;display:grid;place-items:center;cursor:pointer}.egrid button:active{background:rgba(255,255,255,.14)}.egrid .em{font-size:26px}'+
  '#embtn.act{color:#2aabee}';
  d.head.appendChild(st);
  ta=d.createElement('div');ta.id='ta';ta.setAttribute('contenteditable','true');ta.setAttribute('role','textbox');
  ta.setAttribute('data-ph',old.getAttribute('placeholder')||'');
  old.parentNode.replaceChild(ta,old);
  try{d.execCommand('defaultParagraphSeparator',false,'br')}catch(e){}
  Object.defineProperty(ta,'value',{get:function(){return ser(ta)},set:function(v){render(ta,String(v||''),'edit')}});
  ta.addEventListener('paste',function(e){e.preventDefault();var t=(e.clipboardData||window.clipboardData).getData('text/plain');d.execCommand('insertText',false,t)});
  ta.addEventListener('input',function(){if(!ta.querySelector('[data-e]')&&!ta.textContent.replace(/\u200b/g,'').length&&ta.innerHTML!=='')ta.innerHTML=''});
  ta.addEventListener('focus',function(){closePk(true)});
  d.addEventListener('selectionchange',function(){var s=window.getSelection();if(s&&s.rangeCount){var r=s.getRangeAt(0);if(ta.contains(r.startContainer))last=r.cloneRange()}});
  pk=d.createElement('div');pk.id='empk';pk.innerHTML='<div class="etabs" id="etabs"></div><div class="egrid" id="egrid"></div>';
  d.body.appendChild(pk);sect=$('saved');track();try{var v=+localStorage.getItem('pk_kbh');if(v>150&&v<700)KB=v}catch(e){}window.addEventListener('resize',track);
  btn=d.createElement('button');btn.className='ib';btn.id='embtn';btn.setAttribute('aria-label','ایموجی');btn.innerHTML='<svg class="ic"><use href="#i-smile"/></svg>';
  comp.insertBefore(btn,ta);
  btn.addEventListener('mousedown',function(e){e.preventDefault()});
  btn.onclick=function(){if(isOpen())ta.focus();else openPk()};
  pk.addEventListener('mousedown',function(e){e.preventDefault()});
  $('etabs').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;cur=b.dataset.k;tabs();grid()});
  $('egrid').addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.dataset.i===undefined)return;ins(+b.dataset.i)});
  new MutationObserver(function(){if(!$('saved').classList.contains('on'))closePk(false)}).observe($('saved'),{attributes:true,attributeFilter:['class']})}
window.Emoji={render:render,plain:plain,close:function(){closePk(false)},back:function(){if(pk&&isOpen()){closePk(false);return true}return false},_t:{ser:ser,render:render,mk:mk,open:function(){openPk()},close:closePk,get state(){return{sect:sect,pk:pk,KB:KB}}}};
init();
})();
