var data = ['Javascript', 'Ruby', 'HTML', 'CSS'];
$(document).ready(function() {
    $('#fullpage').fullpage({
      responsiveHeight: 570,
      responsiveWidth: 640,
      anchors: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'],
      menu: '#menu'
    });

    $('.section').hide();
    // show background image only after it's downloaded
    $('<img/>').attr('src', 'images/desk.jpg').load(function() {
      $(this).remove(); // prevent memory leaks as @benweet suggested
      $('.brief').css('background-image', 'url(images/desk.jpg)').hide().fadeIn(1000, function() {
        $('.section').show();

      });
    });

    // pan & zoom project images
    aspectRatio = 1024 / 768;
    $('.project .img').on('mousemove', function(e) {
      // position of image container relative to document
      var elementPos = $(this).offset();
      // x position relative to top left of image container
      var imgX = e.pageX - Math.floor(elementPos.left);
      var imgY = e.pageY - Math.floor(elementPos.top);

      // width of image is always 100% of image container
      var imgWidth = $(this).width();
      // height changes according to image container
      var imgHeight = Math.floor(imgWidth / aspectRatio);

      // move image in opposite direction when panning. scale according to
      // background-size below
      var newX = -imgX * 2;
      var newY = -imgY * 2;

      // when cursor position is beyond image size, stop panning
      if (Math.abs(newX) > imgWidth) { newX = -imgWidth; }
      if (Math.abs(newY) > imgHeight) { newY = -imgHeight; }

      $(this).css('background-size', '200%');
      $(this).css('background-position', newX + 'px ' + newY + 'px');
    })

    $('.project .img').on('mouseleave', function(){
      $(this).css('background-position', 'center');
      $(this).css('background-size', 'contain');
    });

    $('#menu li:first-child').on('click', function(){
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