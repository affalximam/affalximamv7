/*
==================================================
    NAVBAR
==================================================
*/


$(document).ready(function () {
    
    $('.navbar-toggler').click(function () {
        $('.navbar-toggler').toggleClass('open');
    })

    $('.navbar-nav .nav-link').on('click', function() {
        $('.navbar-collapse').collapse('hide');
        $('.navbar-toggler').toggleClass('open');
    });

});

$(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > $(".jumbotron").height() / 5) {
          $(".navbar-home").addClass("navbar-transform");
    } else {
          $(".navbar-home").removeClass("navbar-transform");
      }
    });
});
