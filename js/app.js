var data = ['Javascript', 'Ruby', 'HTML', 'CSS'];

$(document).ready(function() {
    $('#fullpage').fullpage({
      responsiveHeight: 570,
      anchors: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th']
    });

    // console.log(s.node().getBBox());
    // .each(function(d, i){
    //   console.log(d, i, this);//, this.getBBox());
    // });

  // data.forEach(function(d){
  //   // console.log('d', d);
  //   $('.chart').append( $('div') );
  // });
});