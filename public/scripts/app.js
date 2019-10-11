// client side JS file that dynamically loads old tweets
$(document).ready(() => {

  // escape funtion to protect for JS injection on user inputted text
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // creates a tweet from an object of tweet data
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
    <a class="tweet-date">${(new Date(tweet['created_at'])).toDateString()}</a>
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

  // takes an array of tweet objects, renders them in html and appends them to the page
  const renderTweets = function(tweets) {
    const section = $('.old-tweets');
    for (const tweet of tweets) {
      let article = createTweetElement(tweet);
      section.prepend(article);
    }
  }
  // fetches an array of tweet objects from memory database and passes them to rendering function
  const loadTweets = function() {
    $.ajax({ method: 'GET', url: '/tweets/' })
      .then((res) => {
        renderTweets(res);
      })
  }
  // calling loadTweets
  loadTweets();

  // function that loads the most recently saved tweet on the page after its been created, possibility to an animation for entering later
  const loadNewTweet = function() {
    $.ajax({ method: 'GET', url: '/tweets/' })
      .then((res) => {
        const section = $('.old-tweets');
        let article = createTweetElement(res[res.length - 1]);
        section.prepend(article);
      })
  }

  // listener funciton that handles submitted text, validates it, and stores it in memory then calls loadNewTweet
  $('#tweet-zone').on('submit', function(event) {
    event.preventDefault();
    const tweet = $('#new-tweet-text');
    const error = $('#auth-error');
    const error2 = $('#auth-error2');
    // form validation
    if (tweet[0].textLength === 0) {
      error.slideDown('fast');
      error2.slideUp('fast');
      console.log(error);
    } else if (tweet[0].textLength > 140) {
      error.slideUp('fast');
      error2.slideDown('fast');
    // if it passes both tests, hides any showing errors, saves the text in a tweet object, loads the new tweet on the page and resets the submission form
    } else {
      error.slideUp('fast');
      error2.slideUp('fast');
      $.ajax({ method: 'POST', url: '/tweets/', data: $(this).serialize() })
        .then(() => {
          loadNewTweet()
          tweet.val('');
          let counter = $('#letter-count');
          counter.html(140);
          tweet.attr('rows', '1');
        });
    }
  });
});