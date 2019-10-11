//client side js script that dynamically changes the character count based on characters input, as well as increases/decreases the rows visible in the text box
$(document).ready(function() {
  const counter = $('#letter-count');
  let inputRows = '2';

  // listener on keyboard input into the textarea of tweet-zone
  $('#new-tweet').on('input', function() {
    const currentLength = $(this).val().length;
    const maxChars = 140;
    counter.html(maxChars-currentLength);

    // changes rows to accomodate more text in smaller screen sizes
    if($(this)[0].scrollHeight > $(this)[0].clientHeight){
      $(this).attr('rows', inputRows);
      inputRows++;
    }

    // changes counter to red when the user surpasses the character count
    if(maxChars-currentLength < 0){
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
    // upon clearing the tweet box, it resets to 1 row in height, fancier row diminishing could be implemented later
    if(currentLength === 0){
      $(this).attr('rows', '1');
    }
  });
});