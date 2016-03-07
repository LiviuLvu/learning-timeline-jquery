var timelineWidth = 0;
var panelWidth = 0;
var firstRun = true;
var totalPanels = 0;
var currentPanel = 0;

$(document).ready(function() {
   // get width of individual panels
   panelWidth = $('.timeline .panel').width();
   timelineWidth = $('.timeline').width();
   totalPanels = $('.timeline .panel').length;
   adjustLayout();
   setInterval(checkWindowSize, 500);
});

// find panels and calculate where they should be positioned accross the timeline
function adjustLayout() {
   $('.timeline .panel').each(function(index) {
      var newX = panelWidth * index;
      $(this).css('left', newX + 'px');

      // add navigation element for each timeline panel
      var newLabel = $(this).find('.label').html();
      // inject anchor link inside nav element
      $('.timeline nav').append('<a href="#">' + newLabel + '</a>');
   });
   // set the initial active panel
   currentPanel = $('.timeline nav a:last-child()').index();

   activateNavigation();
}

function activateNavigation() {
   // reset the current active panel on each nav link click
   $('.timeline nav a').on('click', function() {
      currentPanel = $(this).index();
      // get width after browser is resized
      timelineWidth = $('.timeline').width();

      $('.timeline nav a').removeClass('selected');
      $(this).addClass('selected');
      // get left side offset for a panel to appear in the middle
      var timlineOffset = (timelineWidth - panelWidth) * 0.5;
      // set new position
      var newPosition = ((currentPanel * panelWidth) * -1) + timlineOffset;

      $('.panel_slider').animate({
         left: newPosition + 'px'
      }, 500);

      // animate background
      var backgroundWidth = $('.timeline .background_slider img').width();
      var moveAmount = (backgroundWidth - timelineWidth) / totalPanels;
      if (currentPanel !== 0) {
         var multiplier = currentPanel + 1;
      } else {
         var multiplier = 0;
      }
      var newBackgroundPosition = (moveAmount * multiplier) * -1;
      $('.background_slider img.background').animate({
         left: newBackgroundPosition + 'px'
      }, 500);
   });
}

// animate to a tab on first page load
function checkWindowSize() {
   var newTimelineWidth = $('.timeline').width();

   if (newTimelineWidth > 500 && timelineWidth > 500) {
      //do nothing
   } else if (newTimelineWidth < 500 && timelineWidth < 500) {
      //do nothing
   } else {
      if (newTimelineWidth > 500 && timelineWidth < 500) {
         firstRun = true;
      }
   }


   timelineWidth = newTimelineWidth;

   if (firstRun === true) {
      $('.timeline nav a:nth-child(' + (currentPanel + 1) + ')').trigger('click');
      firstRun = false;
   }
}
