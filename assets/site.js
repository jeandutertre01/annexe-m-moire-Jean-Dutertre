
(function(){
  function b64(s){return Uint8Array.from(atob(s),function(c){return c.charCodeAt(0)})}
  async function decrypt(pwd){
    var enc=JSON.parse(document.getElementById('enc').textContent);
    var km=await crypto.subtle.importKey('raw',new TextEncoder().encode(pwd),'PBKDF2',false,['deriveKey']);
    var key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:b64(enc.salt),iterations:enc.iter,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['decrypt']);
    var pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:b64(enc.iv)},key,b64(enc.data));
    return new TextDecoder().decode(pt);
  }
  async function open(pwd,remember){
    try{var html=await decrypt(pwd);}catch(e){return false}
    document.getElementById('content').innerHTML=html;document.getElementById('gate').hidden=true;
    if(remember){try{sessionStorage.setItem('annexes-pwd',pwd)}catch(e){}}
    init();return true;
  }
  var form=document.getElementById('gate-form');
  if(form){
    form.addEventListener('submit',async function(ev){ev.preventDefault();var ok=await open(document.getElementById('gate-pwd').value,true);document.getElementById('gate-err').hidden=ok;});
    var saved=null;try{saved=sessionStorage.getItem('annexes-pwd')}catch(e){}
    if(saved){open(saved,false)}
  }
  function init(){
  var links=[].slice.call(document.querySelectorAll('.side a[href^="#"]'));
  if(links.length){
    var ids=links.map(function(a){return a.getAttribute('href').slice(1)});
    var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-20% 0px -70% 0px'});
    ids.forEach(function(id){var el=document.getElementById(id);if(el)obs.observe(el)});
  }
  var f=document.getElementById('filter');
  if(f){f.addEventListener('input',function(){var q=f.value.toLowerCase();document.querySelectorAll('.side li[data-t]').forEach(function(li){li.style.display=li.dataset.t.indexOf(q)>-1?'':'none'})})}
  var h=location.hash;if(h){var el=document.querySelector(h);if(el)el.scrollIntoView()}
  }
})();
