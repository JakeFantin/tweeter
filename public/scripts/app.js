/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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

  const renderTweets = function(tweets) {
    console.log('hey baby');
    const section = $('.old-tweets');
    for(const tweet of tweets){
      let article = createTweetElement(tweet);
      section.append(article);
    }
  }

  renderTweets(data);
});