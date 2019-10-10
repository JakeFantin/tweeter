$(document).ready(function() {
  const counter = $('#letter-count');
  let inputRows = '2';
  $('#new-tweet').on('input', function() {
    const currentLength = $(this).val().length;
    const maxChars = 140;

    // const lineLength = Math.ceil(($(this).width())/parseInt($(this).css('font-size'),10))*2.03;
    // const lineLength = $(this);
    counter.html(maxChars-currentLength);
    if($(this)[0].scrollHeight > $(this)[0].clientHeight){
      $(this).attr('rows', inputRows);
      inputRows++;
    }

    if(maxChars-currentLength < 0){
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
    if(currentLength === 0){
      $(this).attr('rows', '1');
    }
  });
});