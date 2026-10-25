(function(){
  var KEY='petal-curtain', DUR=matchMedia('(prefers-reduced-motion: reduce)').matches?0:620;
  var sd=document.createElement('div'); sd.className='sides'; sd.setAttribute('aria-hidden','true');
  sd.innerHTML=['l','r'].map(function(s){return '<div class="side '+s+'">'+'<i></i>'.repeat(4)+'</div>';}).join('');
  document.body.prepend(sd);
  var cur=document.createElement('div'); cur.className='cur'; cur.innerHTML='<i class="a"></i><i class="b"></i>'; document.body.appendChild(cur);
  try{ if(sessionStorage.getItem(KEY)){ sessionStorage.removeItem(KEY);
    cur.classList.add('nt','on'); void cur.offsetWidth; cur.classList.remove('nt');
    requestAnimationFrame(function(){requestAnimationFrame(function(){cur.classList.remove('on');});}); } }catch(e){}
  addEventListener('pageshow',function(e){if(e.persisted)cur.classList.remove('on');});
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[data-go]'); if(!a||e.metaKey||e.ctrlKey||e.shiftKey)return;
    e.preventDefault(); try{sessionStorage.setItem(KEY,'1');}catch(_){}
    cur.classList.add('on'); setTimeout(function(){location.href=a.href;},DUR);
  });
})();
