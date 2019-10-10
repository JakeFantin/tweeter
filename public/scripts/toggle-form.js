$(document).ready(function() {
  $('#showTweeter').click(function() {
    const tweetBox = $('.new-tweet');
    if (tweetBox.hasClass('toggle')) {
      tweetBox.removeClass('toggle');
    } else {
      tweetBox.addClass('toggle');
      setTimeout(() => $('#new-tweet').focus(), 1000);
      // $('#new-tweet').delay(1000).focus();
    }
  });

});