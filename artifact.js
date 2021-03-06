'use strict';
window.addEventListener("load", function(){
  console.log("loading");
  if (window.location.href.indexOf("/r/artifact")){
  var cardRequest = new Request(browser.runtime.getURL("cards.json"));
  fetch(cardRequest)
    .then(response => {
      return response.json();
    })
    .then(function(cards) {
      var comments = document.getElementsByClassName("usertext-body");
      Array.prototype.forEach.call(comments, function(comment) {
        Object.keys(cards).forEach(function(name) {
          var nameReg = new RegExp(cards[name].card_name.english,"i");
          var i = comment.innerHTML;
          i = i.replace(nameReg, "<span style='font-weight:bold;color:blue;cursor:pointer' data-card='"+name+"' class='artifact-card'>$&</span>");
          comment.innerHTML = i;
        });
      });
      var cardsi = document.getElementsByClassName("artifact-card");
      var dstyle = "position:fixed;width:auto;height:auto;left:50%;top:50%;z-index:1;transform: translate(-50%, -50%);"
      Array.prototype.forEach.call(cardsi, function (card) {
        var image =  document.createElement("img")
        image.src = cards[processCardName(card.attributes["data-card"].nodeValue)]["large_image"].default;
        image.style = dstyle+"display:none;";
        document.body.appendChild(image);
        card.addEventListener("mouseover", function (e) {
          image.style = dstyle+"display:block;";
        });
        card.addEventListener("mouseout", function (e) {
          image.style = dstyle+"display:none;";
        });
      });
    });
  function processCardName(name) {
    return name.replace(" ", "_").replace("'", "-");
  }
}
});
