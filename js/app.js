var data = ['Javascript', 'Ruby', 'HTML', 'CSS'];

$(document).ready(function() {
    $('#fullpage').fullpage({
      responsiveHeight: 570,
      responsiveWidth: 640,
      anchors: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'],
      menu: '#menu'
    });

    $('nav').hide();
    // show background image only after it's downloaded
    $('<img/>').attr('src', 'images/desk.jpg').load(function() {
      $(this).remove(); // prevent memory leaks as @benweet suggested
      $('.brief').css('background-image', 'url(images/desk.jpg)').hide().fadeIn(1000);
      $('nav').fadeIn(1000);
    });

    $('#menu li:first-child').on('click', function(){
      console.log('clicked name');
      $('#menu li').toggleClass('showMenuItem');
    });

    $('#menu li:not(:first)').on('click', function(e){
      if (e.button === 0) {
        $('#menu li:not(:first)').removeClass('showMenuItem');
      }
    });

    $('#menu').on('mouseleave', function(){
      $('#menu li:not(:first)').removeClass('showMenuItem');
    });
});