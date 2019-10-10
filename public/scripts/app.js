/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  const createTweetElement = (tweet) => {
    const markup = `
  <article>
  <header>
    <div class="tweeter-profile">
      <img class="tweeter-pic" src='${tweet['user']['avatars']}'>
      <a class="tweeter-name">${tweet['user']['name']}</a>
    </div>
    <a class="tweeter-tag">${tweet['user']['handle']}</a>
  </header>
  <div class="tweet-textbox">
    <p class="tweet-text">${tweet['content']['text']}</p>
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

  const createNewTweetElement = (tweet) => {
    const markup = `
  <article class="load">
  <header>
    <div class="tweeter-profile">
      <img class="tweeter-pic" src='${tweet['user']['avatars']}'>
      <a class="tweeter-name">${tweet['user']['name']}</a>
    </div>
    <a class="tweeter-tag">${tweet['user']['handle']}</a>
  </header>
  <div class="tweet-textbox">
    <p class="tweet-text">${tweet['content']['text']}</p>
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
  // renderTweets(data);

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
        let article = createTweetElement(res[res.length-1]);
        section.prepend(article);
        // const articleLoad = $('article .load');
        // articleLoad.addClass('show');
        // articleLoad.removeClass('load');
      })
  }

  $('#tweet-zone').on('submit', function(event) {
    event.preventDefault();
    const tweet = $('#new-tweet');
    // Form Validation
    if (tweet[0].textLength === 0) {
      alert("Needs text to twit.");
    } else if (tweet[0].textLength > 140) {
      alert("Too many characters.");
    } else {
      $.ajax({ method: 'POST', url: '/tweets/', data: $(this).serialize() })
        .then(() => {
          loadNewTweet()
          tweet.val('');
          let counter =  $('#letter-count');
          counter.html(0);
          tweet.attr('rows','1');
        });
    }
  });
});