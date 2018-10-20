String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
window.addEventListener("load", function(){
  console.log("loading");
  console.log("loading");
  var cardRequest = new Request(browser.runtime.getURL("cards.json"));
  fetch(cardRequest)
    .then(response => {
      return response.json();
    })
    .then(function(cards) {
      console.log(cards);
      setTimeout(function () {
      var comments = document.getElementsByClassName("usertext-body");
      console.log(comments);
      Array.prototype.forEach.call(comments, function(comment) {
        Object.keys(cards).forEach(function(name) {
          var nameReg = new RegExp(cards[name].Name,"i");
          var i = comment.innerHTML;
          i = i.replace(nameReg, "<span style='font-weight:bold;color:blue' data-card='"+name+"' class='artifact-card'>$&</span>");
          comment.innerHTML = i;
        })
      });
    }, 100);
    });
  function processCardName(name) {
    return name.replace(" ", "_").replace("'", "-");
  }
});
