/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {


  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = (tweet) => {
    const markup = `
  <article>
  <header>
    <div class="tweeter-profile">
      <img class="tweeter-pic" src='${tweet['user']['avatars']}'>
      <a class="tweeter-name">${escape(tweet['user']['name'])}</a>
    </div>
    <a class="tweeter-tag">${escape(tweet['user']['handle'])}</a>
  </header>
  <div class="tweet-textbox">
    <p class="tweet-text">${escape(tweet['content']['text'])}</p>
  </div>
  <footer>
    <a class="tweet-date">${new Date(tweet['created_at'])}</a>
    <div class="tweet-icons">
        <i class="fa fa-flag"></i>
        <i class="fa fa-heart"></i>
        <i class="fa fa-refresh"></i>
    </div>

  </footer>
  </article>
  `;
    return markup;
  };

  const renderTweets = function(tweets) {
    const section = $('.old-tweets');
    for (const tweet of tweets) {
      let article = createTweetElement(tweet);
      section.prepend(article);
    }
  }

  const loadTweets = function() {
    $.ajax({ method: 'GET', url: '/tweets/' })
      .then((res) => {
        renderTweets(res);
      })
  }
  loadTweets();

  const loadNewTweet = function() {
    $.ajax({ method: 'GET', url: '/tweets/' })
      .then((res) => {
        const section = $('.old-tweets');
        let article = createTweetElement(res[res.length - 1]);
        section.prepend(article);
        // const articleLoad = $('article .load');
        // articleLoad.addClass('show');
        // articleLoad.removeClass('load');
      })
  }

  $('#tweet-zone').on('submit', function(event) {
    event.preventDefault();
    const tweet = $('#new-tweet');
    const error = $('#authError');
    const error2 = $('authError2');
    // Form Validation
    if (tweet[0].textLength === 0) {
      error.slideDown('fast');
      error2.slideUp('fast');
      console.log(error);
    } else if (tweet[0].textLength > 140) {
      error.slideUp('fast');
      error2.slideDown('fast');
    } else {
      error.slideUp('slow');
      error2.slideUp('fast');
      $.ajax({ method: 'POST', url: '/tweets/', data: $(this).serialize() })
        .then(() => {
          loadNewTweet()
          tweet.val('');
          let counter = $('#letter-count');
          counter.html(0);
          tweet.attr('rows', '1');
        });
    }
  });
});