// Load the Visualization API and the corechart package.
 google.charts.load('current', {'packages':['timeline']});



// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  console.log('drawing chart')

  // Create the data table.
  var data = new google.visualization.DataTable();
  var now = new Date();
  var finishedGA = new Date(2016,2,12);
  var startRecomazing = new Date(2016,3,18);
  data.addColumn({type: 'string', id: 'Category'});
  data.addColumn({type: 'string', id: 'Item'});
  data.addColumn({type: 'date', id: 'Start'});
  data.addColumn({type: 'date', id: 'End'});
  data.addRows([
    ['Language', 'JavaScript / ES6', new Date(2015,6,1), now],
    ['Language', 'Ruby', new Date(2015,10,9), finishedGA],
    ['Language', 'HTML', new Date(2015,10,9), now],
    ['Language', 'CSS / SASS', new Date(2015,10,9), now],
    ['Language', 'Java', new Date(2012,6,1), new Date(2015,0,1)],
    ['Language', 'C', new Date(2012,2,1), new Date(2012,6,1)],
    ['Language', 'Perl', new Date(2012,6,1), new Date(2012,10,1)],
    ['Language', 'Unix shell script', new Date(2012,6,1), new Date(2012,10,1)],
    ['Framework', 'React.js', startRecomazing, now],
    ['Framework', 'Ruby on Rails', new Date(2015,10,9), finishedGA],
    ['Framework', 'Backbone.js', new Date(2015,10,9), finishedGA],
    ['Framework', 'Sinatra', new Date(2015,10,9), finishedGA],
    ['Framework', 'Spring', new Date(2014,7,0), new Date(2014,11,1)],
    ['Framework', 'Struts', new Date(2014,3,1), new Date(2014,6,1)],
    ['Library', 'jQuery', new Date(2015,10,9), finishedGA],
    ['Library', 'lodash.js', startRecomazing, now],
    ['Library', 'Underscore.js', new Date(2015,10,9), finishedGA],
    ['Testing', 'React-storybook', startRecomazing, now],
    ['Testing', 'Mocha/Chai/Enzyme', startRecomazing, now],
    ['Testing', 'Minitest', new Date(2015,10,9), finishedGA],
    ['Testing', 'RSpec', new Date(2015,10,9), finishedGA],
    ['Database', 'PostgreSQL', new Date(2015,10,9), finishedGA],
    ['Database', 'Sqlite', new Date(2015,10,9), finishedGA],
    ['Database', 'MongoDB', new Date(2014,7,0), new Date(2014,11,1)],
    ['Database', 'Neo4j', new Date(2014,7,0), new Date(2014,11,1)],
    ['Other', 'Webpack', startRecomazing, now],
    ['Other', 'NPM', startRecomazing, now],
    ['Other', 'REST', new Date(2015,10,9), finishedGA],
    ['Other', 'AJAX', new Date(2015,10,9), finishedGA],
    ['Other', 'Git', new Date(2015,10,9), now],
    ['Other', 'Agile', new Date(2015,7,26), new Date(2015,9,11)],
    ['Other', 'Algorithms', new Date(2013,6,1), new Date(2013,10,1)],
    ['Other', 'OO Design', new Date(2014,2,1), new Date(2014,6,1)],
    ['Other', 'Data structures', new Date(2012,6,1), new Date(2012,10,1)],
    ['Other', 'Networks', new Date(2013,2,1), new Date(2013,6,1)]
  ]);

  // Set chart options
  var options = {
    'backgroundColor': 'transparent',
    'timeline': { colorByRowLabel: true },
    'forceIFrame': true,
    'fontName': 'verdana'
  };

  // Instantiate and draw our chart, passing in some options.
  var container = document.getElementById('skills_chart_container');
  var chart = new google.visualization.Timeline(container);
  chart.draw(data, options);
}

$(document).ready(function() {
    $('#fullpage').fullpage({
      responsiveHeight: 570,
      responsiveWidth: 640,
      anchors: ['home', 'me', 'skill', 'project', '5th', '6th', '7th', 'contact'],
      menu: '#menu',
      normalScrollElements: 'iframe',
      afterRender: function() {
        // show background image only after it's downloaded
        $('.brief *').hide();
        $('<img/>').attr('src', 'images/desk.jpg').load(function() {
          $(this).remove(); // prevent memory leaks as @benweet suggested
          $('.brief').css('background-image', 'url(images/desk.jpg)');
          $('.brief *').fadeIn(1000, function() {
            $('.brief *').show();
            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(drawChart);
          });
        });
      }
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

$(window).resize(function(){
  drawChart();
});
