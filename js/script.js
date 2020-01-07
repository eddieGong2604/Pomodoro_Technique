$(window).on("load",function() {
  var rnd = 200;
   $('.tom-container').fadeOut(rnd,function() {
    $('.tom-container').hide();
  });

});

function hamburgerExpansion() {
 document.querySelector(".dropdown").classList.toggle("show");
}
function iconChange(x){
	x.classList.toggle("fa-times");
}
