var manifest = require("./ArtifactDB/cards-manifest.json");
var fs = require("fs");
var cards = {};
function processCardName(name){
  return name.replace(" ","_").replace("'","-");
}
manifest.Sets.forEach(function(set){
  set.Cards.forEach(function (card) {
    cards[processCardName(card.Name)] = card;
  })
});
fs.writeFile("cards.json", JSON.stringify(cards), function (err) {
  if (err){
    console.log("Something went wrong.");
    throw err;
  } else {
    console.log("Successfully converted card database!");
  }
})
