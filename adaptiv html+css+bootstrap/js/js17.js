
let burger = document.querySelector('.burger');
let menu = document.querySelector('.header-nav2');
let menuLinks = document.querySelectorAll('.header-link');

burger.addEventListener('click',
function(){
  burger.classList.toggle('burger--active');
  menu.classList.toggle('header-nav--active');
  document.body.classList.toggle('.stop-scroll');
})

menuLinks.forEach( function(el){
  el.addEventListener('click',function(){
    burger.classList.remove('burger--active');
    menu.classList.remove('header-nav--active');
    document.body.classList.remove('.stop-scroll');


  })
})