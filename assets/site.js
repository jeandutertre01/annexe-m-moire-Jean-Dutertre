
(function(){
  var links=[].slice.call(document.querySelectorAll('.side a[href^="#"]'));
  if(links.length){
    var ids=links.map(function(a){return a.getAttribute('href').slice(1)});
    var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-20% 0px -70% 0px'});
    ids.forEach(function(id){var el=document.getElementById(id);if(el)obs.observe(el)});
  }
  var f=document.getElementById('filter');
  if(f){f.addEventListener('input',function(){var q=f.value.toLowerCase();document.querySelectorAll('.side li[data-t]').forEach(function(li){li.style.display=li.dataset.t.indexOf(q)>-1?'':'none'})})}
})();
