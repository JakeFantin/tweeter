//client side js script that allows toggling of the tweet-zone
$(document).ready(function() {
  $('#show-tweeter').click(function() {
    $('.new-tweet').slideToggle()
    $('#new-tweet-text').focus();
  });

});