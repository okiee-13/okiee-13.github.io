(function(){
  var page=location.pathname.split('/').pop()||'x';
  document.querySelectorAll('.slot').forEach(function(s){
    var k='pic:'+page+':'+s.dataset.i, inp=document.createElement('input');
    inp.type='file'; inp.accept='image/*'; inp.hidden=true; s.after(inp);
    function show(u){
      var im=s.querySelector('img')||s.appendChild(document.createElement('img'));
      im.onload=function(){s.style.setProperty('--r',im.naturalWidth/im.naturalHeight);s.classList.add('has');};
      im.alt=''; im.src=u;
    }
    try{var v=localStorage.getItem(k);if(v)show(v);}catch(e){}
    s.onclick=function(){inp.click();};
    inp.onchange=function(){
      var f=inp.files[0]; if(!f)return; var r=new FileReader();
      r.onload=function(){var im=new Image();im.onload=function(){
        var sc=Math.min(1,1000/Math.max(im.width,im.height)),c=document.createElement('canvas');
        c.width=im.width*sc;c.height=im.height*sc;c.getContext('2d').drawImage(im,0,0,c.width,c.height);
        var u=c.toDataURL('image/jpeg',.82); show(u); try{localStorage.setItem(k,u);}catch(e){}
      };im.src=r.result;};
      r.readAsDataURL(f);
    };
  });
  document.querySelectorAll('.pick').forEach(function(b){
    var v=document.getElementById(b.dataset.t), inp=document.createElement('input');
    inp.type='file'; inp.accept='video/*,audio/*'; inp.hidden=true; b.after(inp);
    v.addEventListener('loadedmetadata',function(){if(v.videoWidth)v.style.aspectRatio=v.videoWidth+'/'+v.videoHeight;});
    b.onclick=function(){inp.click();};
    inp.onchange=function(){var f=inp.files[0];if(f){v.style.aspectRatio='';v.src=URL.createObjectURL(f);v.load();}};
  });
})();
