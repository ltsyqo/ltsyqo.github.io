const cardObj = {
  suits: ["H", "D", "C", "S"],
  ranks: ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"],
  values: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
};

class Game {
  constructor(cardObj) {
    this.cardObj = cardObj;
    this.deck = [];
    this.player = { points: 0, div: "#player-deck", score: "#ppoints" };
    this.dealer = { points: 0, div: "#dealer-deck", score: "#dpoints" };
  }

  initalizeDeck() {
    for (let i = 0; i < this.cardObj["suits"].length; i++) {
      for (let j = 0; j < this.cardObj["ranks"].length; j++) {
        this.deck.push(this.cardObj["ranks"][j] + this.cardObj["suits"][i]);
      }
    }
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  drawCard(activePlayer) {
    const drawnCard = this.deck.pop();
    const card = document.createElement("img");
    card.src = "./assets/" + drawnCard + ".png";

    document.querySelector(activePlayer["div"]).appendChild(card);
    const currentValue = this.cardObj["values"][drawnCard[0]];
    if (drawnCard[0] == "A") {
      if (activePlayer.points + 11 <= 21) {
        activePlayer.points += currentValue[1];
      } else {
        activePlayer.points += currentValue[0];
      }
    } else {
      activePlayer.points += currentValue;
    }

    document.querySelector(activePlayer["score"]).innerHTML =
      activePlayer.points;
  }

  hit() {
    this.drawCard(player);
    document.querySelector("#standbtn").disabled = false;
    document.querySelector("#dealbtn").disabled = false;
  }

  stand() {
    while (dealer.points <= 17 && dealer.points <= player.points) {
      this.drawCard(dealer);
    }
  }
}

// Game start
const game = new Game(cardObj);
game.initalizeDeck();
game.shuffleDeck();
const player = game["player"];
const dealer = game["dealer"];
document.querySelector("#standbtn").disabled = true;
document.querySelector("#dealbtn").disabled = true;
