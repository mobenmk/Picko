(function(){
var d=document;
var COL=[{n:'قرمز',c:'#ef4b5f'},{n:'سبز',c:'#2fc46b'},{n:'زرد',c:'#f4b73c'},{n:'آبی',c:'#3d8bff'}];
var TR=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]];
var HC=[[[7,1],[7,2],[7,3],[7,4],[7,5]],[[1,7],[2,7],[3,7],[4,7],[5,7]],[[7,13],[7,12],[7,11],[7,10],[7,9]],[[13,7],[12,7],[11,7],[10,7],[9,7]]];
var ST=[0,13,26,39],SAFE=[0,8,13,21,26,34,39,47],BASE=[[0,0],[0,9],[9,9],[9,0]];
var PIPS={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
var G=null;
function $(i){return d.getElementById(i)}
var st=d.createElement('style');
st.textContent='#ludo{padding:0;align-items:stretch;overflow:hidden}'+
'.lturn{display:flex;align-items:center;gap:10px;margin:0 12px 10px;padding:10px 14px;border-radius:18px;background:var(--g);border:1px solid var(--l)}'+
'.ldot{width:16px;height:16px;border-radius:50%;flex:none}'+
'#lbw{width:min(calc(100% - 16px),58vh);aspect-ratio:1;margin:0 auto;flex:none}'+
'#lb{width:100%;height:100%;display:block;border-radius:18px;box-shadow:0 10px 40px rgba(0,0,0,.5)}'+
'.pc{cursor:pointer}.pc.sel .ring{animation:lr .8s ease-in-out infinite alternate}'+
'@keyframes lr{from{opacity:.2}to{opacity:1}}'+
'#lctl{display:flex;align-items:center;justify-content:center;padding:14px 12px 6px}'+
'#ldie{width:78px;height:78px;border:0;border-radius:20px;display:grid;grid-template:repeat(3,1fr)/repeat(3,1fr);padding:13px;background:#2a3150;box-shadow:inset 0 0 0 2px rgba(255,255,255,.28),0 8px 22px rgba(0,0,0,.4)}'+
'#ldie i{display:block;border-radius:50%;margin:2px}#ldie i.on{background:#fff}'+
'#ldie.ready{animation:lp 1s ease-in-out infinite}@keyframes lp{50%{transform:scale(1.1)}}'+
'#lsay{font-size:15px;color:var(--d);text-align:center;min-height:24px;padding:4px 16px}'+
'#lend{position:absolute;inset:0;background:rgba(5,6,12,.82);display:none;flex-direction:column;align-items:center;justify-content:center;gap:12px;z-index:5;padding:30px}'+
'#lend.on{display:flex}#lend .btn{max-width:280px}#lwin{margin:0 0 10px;font-size:26px;text-align:center}';
d.head.appendChild(st);
var dieHTML='';for(var q=0;q<9;q++)dieHTML+='<i></i>';
$('app').insertAdjacentHTML('beforeend','<section id="ludo" class="scr">'+
'<div class="top"><button class="ib" id="lback"><svg class="ic"><use href="#i-back"/></svg></button><div class="grow"><h2>لودو</h2><small id="lsub"></small></div><button class="ib" id="lre"><svg class="ic"><use href="#i-refresh"/></svg></button></div>'+
'<div class="lturn"><span class="ldot" id="ldot"></span><b id="lname"></b></div>'+
'<div id="lbw"></div><div id="lctl"><button id="ldie" aria-label="تاس">'+dieHTML+'</button></div><div id="lsay"></div>'+
'<div id="lend"><h1 id="lwin"></h1><button class="btn" id="lagain"><span>بازی دوباره</span></button><button class="btn out" id="lmenu"><span>بازگشت به منو</span></button></div></section>');
function pos(c,p,i){
  if(p<0){var b=BASE[c];return{x:b[1]+(i%2?4:2),y:b[0]+(i<2?2:4)}}
  if(p<=50){var t=TR[(ST[c]+p)%52];return{x:t[1]+.5,y:t[0]+.5}}
  if(p<=55){var h=HC[c][p-51];return{x:h[1]+.5,y:h[0]+.5}}
  var v=[[-.85,0],[0,-.85],[.85,0],[0,.85]][c];
  return{x:7.5+v[0]+(v[0]?0:(i-1.5)*.3),y:7.5+v[1]+(v[1]?0:(i-1.5)*.3)}}
function star(cx,cy){var p=[],i,a,r;for(i=0;i<10;i++){a=-Math.PI/2+i*Math.PI/5;r=i%2?.12:.3;p.push((cx+Math.cos(a)*r).toFixed(3)+','+(cy+Math.sin(a)*r).toFixed(3))}return'<polygon points="'+p.join(' ')+'" fill="rgba(255,255,255,.6)"/>'}
function boardSVG(){
  var s='<svg id="lb" viewBox="0 0 15 15"><rect width="15" height="15" fill="#10131f"/>',c,i;
  for(c=0;c<4;c++){var b=BASE[c];
    s+='<rect x="'+b[1]+'" y="'+b[0]+'" width="6" height="6" fill="'+COL[c].c+'" opacity=".85"/>';
    s+='<rect x="'+(b[1]+1)+'" y="'+(b[0]+1)+'" width="4" height="4" rx=".5" fill="#0d1018" opacity=".9"/>';
    for(i=0;i<4;i++){var q=pos(c,-1,i);s+='<circle cx="'+q.x+'" cy="'+q.y+'" r=".45" fill="none" stroke="'+COL[c].c+'" stroke-width=".08" opacity=".7"/>'}}
  TR.forEach(function(t,i){var k=ST.indexOf(i);s+='<rect x="'+(t[1]+.04)+'" y="'+(t[0]+.04)+'" width=".92" height=".92" rx=".14" fill="'+(k>=0?COL[k].c:'#252c44')+'"/>'});
  HC.forEach(function(h,c){h.forEach(function(t){s+='<rect x="'+(t[1]+.04)+'" y="'+(t[0]+.04)+'" width=".92" height=".92" rx=".14" fill="'+COL[c].c+'" opacity=".7"/>'})});
  [8,21,34,47].forEach(function(i){var t=TR[i];s+=star(t[1]+.5,t[0]+.5)});
  s+='<polygon points="6,6 6,9 7.5,7.5" fill="'+COL[0].c+'"/><polygon points="6,6 9,6 7.5,7.5" fill="'+COL[1].c+'"/><polygon points="9,6 9,9 7.5,7.5" fill="'+COL[2].c+'"/><polygon points="6,9 9,9 7.5,7.5" fill="'+COL[3].c+'"/>';
  return s+'<g id="lp"></g></svg>'}
function later(fn,ms){var g=G;setTimeout(function(){if(G&&G===g)fn()},ms)}
function say(t){$('lsay').textContent=t}
function showDie(v){var is=$('ldie').children,on=PIPS[v];for(var i=0;i<9;i++)is[i].className=on.indexOf(i)>=0?'on':''}
function cur(){return G.seats[G.turn]}
function turnUI(){var s=cur();$('ldot').style.background=COL[s.c].c;$('lname').textContent=s.name+' ('+COL[s.c].n+')';
  $('ldie').style.background=COL[s.c].c;$('ldie').className=(!s.bot&&!G.rolled&&!G.busy)?'ready':''}
function render(){
  var g=$('lp'),h='',cells={};
  G.seats.forEach(function(s,si){G.P[si].forEach(function(p,i){var q=pos(s.c,p,i),k=Math.round(q.x*10)+','+Math.round(q.y*10);(cells[k]=cells[k]||[]).push({si:si,i:i,x:q.x,y:q.y,c:s.c,base:p<0})})});
  Object.keys(cells).forEach(function(k){var a=cells[k],m=a.length;a.forEach(function(it,j){
    var x=it.x,y=it.y,r=.36;
    if(m>1&&!it.base){var an=Math.PI*2*j/m;x+=Math.cos(an)*.2;y+=Math.sin(an)*.2;r=.27}
    var sel=it.si===G.turn&&G.sel.indexOf(it.i)>=0;
    h+='<g class="pc'+(sel?' sel':'')+'" data-i="'+it.i+'" data-s="'+it.si+'" transform="translate('+x.toFixed(2)+','+y.toFixed(2)+')">'+
      (sel?'<circle class="ring" r="'+(r+.16)+'" fill="none" stroke="#fff" stroke-width=".09"/>':'')+
      '<circle r="'+r+'" fill="'+COL[it.c].c+'" stroke="#fff" stroke-width=".07"/><circle cx="-.1" cy="-.1" r="'+(r*.4)+'" fill="#fff" opacity=".4"/><circle r=".6" fill="transparent"/></g>'})});
  g.innerHTML=h}
function can(p,v){return p<0?v===6:p+v<=56}
function cellOf(c,p){return p>=0&&p<=50?(ST[c]+p)%52:-1}
function oppOn(si,cell){var n=0;G.seats.forEach(function(o,oi){if(oi!==si)G.P[oi].forEach(function(q){if(cellOf(o.c,q)===cell)n++})});return n}
function threat(si,cell){var t=false;G.seats.forEach(function(o,oi){if(oi!==si)G.P[oi].forEach(function(q){var oc=cellOf(o.c,q);if(oc>=0){var dd=(cell-oc+52)%52;if(dd>=1&&dd<=6)t=true}})});return t}
function botPick(mv){
  var si=G.turn,s=cur(),v=G.roll,best=mv[0],bs=-1e9;
  mv.forEach(function(i){var p=G.P[si][i],np=p<0?0:p+v,sc=np;
    if(np===56)sc+=200;
    else if(np<=50){var cell=(ST[s.c]+np)%52;
      if(SAFE.indexOf(cell)>=0)sc+=15;
      else if(oppOn(si,cell))sc+=120;
      else if(threat(si,cell))sc-=25}
    else sc+=30;
    if(p<0)sc+=45;
    if(p>=0&&p<=50&&SAFE.indexOf(cellOf(s.c,p))<0&&threat(si,cellOf(s.c,p)))sc+=20;
    sc+=Math.random()*4;
    if(sc>bs){bs=sc;best=i}});
  return best}
function startTurn(){G.rolled=false;G.busy=false;G.sel=[];render();turnUI();
  if(cur().bot){say('ربات داره فکر می‌کنه...');later(rollDie,800)}else say('تاس رو بنداز')}
function nextTurn(){G.turn=(G.turn+1)%G.n;G.sixes=0;startTurn()}
function rollDie(){
  if(!G||G.over||G.rolled||G.busy)return;
  var g=G,n=0;g.busy=true;turnUI();
  g.iv=setInterval(function(){
    if(G!==g){clearInterval(g.iv);return}
    if(++n<9){showDie(1+Math.floor(Math.random()*6));return}
    clearInterval(g.iv);g.roll=1+Math.floor(Math.random()*6);g.rolled=true;g.busy=false;showDie(g.roll);afterRoll()},70)}
function afterRoll(){
  var s=cur(),v=G.roll,P=G.P[G.turn],mv=[],i;
  for(i=0;i<4;i++)if(can(P[i],v))mv.push(i);
  turnUI();
  if(!mv.length){say('حرکتی ممکن نیست');later(nextTurn,900);return}
  if(mv.every(function(k){return P[k]<0}))mv=[mv[0]];
  if(mv.length===1){later(function(){move(mv[0])},s.bot?650:450);return}
  if(s.bot){later(function(){move(botPick(mv))},750);return}
  G.sel=mv;render();say('یکی از مهره‌های درخشان رو انتخاب کن')}
function move(i){
  var si=G.turn,s=cur(),P=G.P[si],p=P[i],v=G.roll,np=p<0?0:p+v,cap=false;
  G.sel=[];P[i]=np;
  if(np>=0&&np<=50){var cell=(ST[s.c]+np)%52;
    if(SAFE.indexOf(cell)<0)G.seats.forEach(function(o,oi){if(oi!==si)G.P[oi].forEach(function(q,k){if(cellOf(o.c,q)===cell){G.P[oi][k]=-1;cap=true}})})}
  render();
  if(P.every(function(q){return q===56}))return end(si);
  var fin=np===56;
  if(v===6)G.sixes++;else G.sixes=0;
  if((v===6||cap||fin)&&G.sixes<3){say(cap?'مهره حریف زده شد! دوباره بنداز':fin?'یه مهره رسید! دوباره بنداز':'شش آوردی! دوباره بنداز');later(startTurn,800)}
  else later(nextTurn,500)}
function end(si){G.over=true;var s=G.seats[si];turnUI();say('');
  $('lwin').textContent='برنده: '+s.name+' ('+COL[s.c].n+')';$('lend').classList.add('on')}
function start(n,bots){
  var cols=n===2?[0,2]:n===3?[0,1,2]:[0,1,2,3],humans=bots.filter(function(b){return !b}).length,hn=0;
  if(G&&G.iv)clearInterval(G.iv);
  G={cfg:{n:n,bots:bots},n:n,seats:cols.map(function(c,i){return{c:c,bot:!!bots[i],name:bots[i]?'ربات':(humans===1?'تو':'بازیکن '+(++hn))}}),
    P:cols.map(function(){return[-1,-1,-1,-1]}),turn:0,roll:0,rolled:false,sixes:0,sel:[],busy:false,over:false};
  $('lbw').innerHTML=boardSVG();$('lend').classList.remove('on');$('lsub').textContent=n+' نفره'+(humans<n?' با ربات':'');
  if(typeof show==='function')show('ludo');
  if(typeof CapApp==='undefined'||!CapApp)try{history.pushState({g:1},'')}catch(e){}
  showDie(1);startTurn()}
function stop(){if(G&&G.iv)clearInterval(G.iv);G=null}
$('ldie').onclick=function(){if(G&&!cur().bot)rollDie()};
$('lbw').addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('.pc');if(!t||!G||G.over||!G.rolled||cur().bot)return;
  var si=+t.dataset.s,i=+t.dataset.i;if(si!==G.turn||G.sel.indexOf(i)<0)return;move(i)});
$('lback').onclick=function(){stop();if(typeof show==='function')show('games')};
$('lre').onclick=function(){if(G)start(G.cfg.n,G.cfg.bots)};
$('lagain').onclick=function(){if(G)start(G.cfg.n,G.cfg.bots)};
$('lmenu').onclick=$('lback').onclick;
window.Ludo={start:start,stop:stop,active:function(){return!!G},_t:function(){return{TR:TR,HC:HC,get G(){return G}}}};
})();
