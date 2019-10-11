//client side js script that allows toggling of the tweet-zone
$(document).ready(function() {
  $('#showTweeter').click(function() {
    $('.new-tweet').slideToggle()
    $('#new-tweet').focus();
  });

});