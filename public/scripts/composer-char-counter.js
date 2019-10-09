$(document).ready(function() {
  const counter = $('#letter-count');
  let inputRows = '2';
  console.log('things have loaded');
  $('#new-tweet').on('input', function() {
    const currentLength = $(this).val().length;
    const maxChars = 140;

    // const lineLength = Math.ceil(($(this).width())/parseInt($(this).css('font-size'),10))*2.03;
    // const lineLength = $(this);
    counter.html(maxChars-currentLength);
    console.log($(this)[0].scrollHeight);
    console.log($(this)[0].clientHeight);
    if($(this)[0].scrollHeight > $(this)[0].clientHeight){
      $(this).attr('rows', inputRows);
      inputRows++;
    }

    if(maxChars-currentLength < 0){
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});