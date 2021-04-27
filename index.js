//requirements from Discord.js
const Discord = require("discord.js");
const client = new Discord.Client();

//grabbing key from .env
const dotenv = require("dotenv");
dotenv.config();

const data = require("./card_data.json");

client.once("ready", () => {
  console.log("All Clear!");
});

client.on("message", (message) => {
  let cardNumber = 0;
  let upOrDown = 0;
  if (message.content === "tarot!draw") {
    cardNumber = Math.floor(Math.random() * 77);
    upOrDown = Math.floor(Math.random() * 2);
    if (upOrDown === 0) {
      message.channel.send(
        "**" +
          data.cards[cardNumber].name +
          "**, Upright🔺\n" +
          data.cards[cardNumber].meaning_up
      );
    } else {
      message.channel.send(
        "**" +
          data.cards[cardNumber].name +
          "**, Reverse🔻\n" +
          data.cards[cardNumber].meaning_rev
      );
    }
  } else if (message.content === "tarot!spread") {
    const spreadLabels = [
      "**__Past:__** \n",
      "**__Present:__** \n",
      "**__Hidden Influence:__** \n",
      "**__Advice:__** \n",
      "**__Possible Outcome:__** \n",
    ];
    let spreadResults = [];
    // for (let i = 0; i < 5; i++) {
    let counter = 0;
    while (counter < 4) {
      cardNumber = Math.floor(Math.random() * 77);
      upOrDown = Math.floor(Math.random() * 2);
      let cardNumberArray = [];
      if (cardNumberArray.includes(cardNumber)) {
        continue;
      } else if (upOrDown === 0) {
        spreadResults.push(
          spreadLabels[counter] +
            "**" +
            data.cards[cardNumber].name +
            "**, Upright🔺\n" +
            data.cards[cardNumber].meaning_up +
            "\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
        );
        counter++;
      } else {
        spreadResults.push(
          spreadLabels[counter] +
            "**" +
            data.cards[cardNumber].name +
            "**, Reverse🔻\n" +
            data.cards[cardNumber].meaning_rev +
            "\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
        );
        counter++;
      }
    }
    message.channel.send(spreadResults);
  } else if (message.content === "tarot!help") {
    message.channel.send(
      "__**Commands List**__\ntarot!draw: Draw one Tarot card; includes orientation and description.\ntarot!spread: Draws five cards in a simple spread: Past, Present, Hidden Influences, Advice, and Possible Outcomes."
    );
  }
});

console.log(process.env.verify);
client.login(process.env.TOKEN);
