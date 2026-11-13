(function(){
function $(i){return document.getElementById(i)}
function on(i){var e=$(i);return !!e&&e.classList.contains('on')}
var st=document.createElement('style');
st.textContent='body.in .aurora,body.off .aurora{display:none}body.in,body.off{background:#0b0d12}';
document.head.appendChild(st);
/* an overlay (sheet, picker, search, edit...) closes but the screen stays */
function overlay(){
  if(window.Emoji&&Emoji.back())return true;
  if(on('sheet')){closeSheet();return true}
  if(on('pwm')){$('pwm').classList.remove('on');return true}
  if(on('perms')){if(window.Games)Games.back();return true}
  if(on('saved')){
    if(editId){cancelEdit();return true}
    if(on('sbar')){$('sbar').classList.remove('on');$('sq').value='';renderSaved();return true}}
  return false}
/* a whole screen / tab closes */
function level(){
  if(on('ludo')){Ludo.leave();return true}
  if(on('saved')){closeSaved();return true}
  if(on('games')){if(document.body.classList.contains('off'))return false;show('main');page(1);return true}
  if(on('main')&&!on('pg1')){page(1);return true}
  return false}
/* true = handled inside the app; false = nothing left, the app may go to background */
function back(){var r=false;try{r=overlay()||level()}catch(e){r=false}return !!r}
window.__pkBack=back;
window.Nav={back:back};
})();
