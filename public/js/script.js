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

    if ($(window).scrollTop() < $(".jumbotron").height() / 5) {
        $(".navbar-home").addClass("navbar-transform-1");
        $(".navbar-home").removeClass("navbar-transform-2");

    } else {
        $(".navbar-home").addClass("navbar-transform-2");
        $(".navbar-home").removeClass("navbar-transform-1");
    }
        
    
    $(window).scroll(function () {
        
        if ($(this).scrollTop() < $(".jumbotron").height() / 5) {
            $(".navbar-home").addClass("navbar-transform-1");
            $(".navbar-home").removeClass("navbar-transform-2");
        } else {
            $(".navbar-home").addClass("navbar-transform-2");
            $(".navbar-home").removeClass("navbar-transform-1");
        }

    });
});

$(document).ready(function () {
    $('.input-nama').on('focus', function () {
        $('.label-input-nama').addClass('label-move');
    }).on('blur', function () {
        if ($('.input-nama').val() === '') {
            $('.label-input-nama').removeClass('label-move');
        }
    });
    $('.input-email').on('focus', function () {
        $('.label-input-email').addClass('label-move');
    }).on('blur', function () {
        if ($('.input-email').val() === '') {
            $('.label-input-email').removeClass('label-move');
        }
    });
    $('.input-subject').on('focus', function () {
        $('.label-input-subject').addClass('label-move');
    }).on('blur', function () {
        if ($('.input-subject').val() === '') {
            $('.label-input-subject').removeClass('label-move');
        }
    });
    $('.textarea-message').on('focus', function () {
        $('.label-textarea-message').addClass('label-move');
    }).on('blur', function () {
        if ($('.textarea-message').val() === '') {
            $('.label-textarea-message').removeClass('label-move');
        }
    });
});