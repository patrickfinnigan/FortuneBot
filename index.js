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
  if (message.content === "t!draw") {
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
  } else if (message.content === "t!spread") {
    const spreadLabels = [
      "**__Past:__** \n",
      "**__Present:__** \n",
      "**__Hidden Influence:__** \n",
      "**__Advice:__** \n",
      "**__Possible Outcome:__** \n",
    ];
    let spreadResults = [];
    for (let i = 0; i < 5; i++) {
      cardNumber = Math.floor(Math.random() * 77);
      upOrDown = Math.floor(Math.random() * 2);
      if (upOrDown === 0) {
        spreadResults.push(
          spreadLabels[i] +
            "**" +
            data.cards[cardNumber].name +
            "**, Upright🔺\n" +
            data.cards[cardNumber].meaning_up +
            "\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
        );
      } else {
        spreadResults.push(
          spreadLabels[i] +
            "**" +
            data.cards[cardNumber].name +
            "**, Reverse🔻\n" +
            data.cards[cardNumber].meaning_rev +
            "\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
        );
      }
    }
    message.channel.send(spreadResults);
  } else if (message.content === "t!help") {
    message.channel.send(
        "__**Commands List**__\n__t!draw__: Draw one Tarot card; includes orientation and description.\n__t!spread__: Draws five cards in a simple spread: Past, Present, Hidden Influences, Advice, and Possible Outcomes."
      );
  }
});

console.log(process.env.verify);
client.login(process.env.TOKEN);