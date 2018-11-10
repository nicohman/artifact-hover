var manifest = require("./artifact2.json");
var fs = require("fs");
var cards = {};
function processCardName(name){
  return name.replace(" ","_").replace("'","-");
}
manifest.card_set.card_list.forEach(function(card){
  cards[processCardName(card.card_name.english)] = card;
});
fs.writeFile("cards2.json", JSON.stringify(cards), function (err) {
  if (err){
    console.log("Something went wrong.");
    throw err;
  } else {
    console.log("Successfully converted card database!");
  }
})
