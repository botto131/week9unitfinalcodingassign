class Card { //card class for each representation of playing card and type
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    //the method of getting the value for each card in the game for comparison
    getValue() {
        //following code is to define a value for card values
        const valueMap = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
            'J': 11, 'Q': 12, 'K': 13, 'A': 14

        };
        return valueMap[this.value];

    }
    //the method to represent the card as a string
    toString() {
        return `${this.value} of ${this.suit}`;
    }
}
//below the Deck class will manage the deck of card
class Deck {
    constructor() {
        this.cards = [];
        this.createDeck();
    }
    //below is how to create the deck of 52 cards 
    createDeck() {
        const suits = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        for (const suit of suits) {
            for (const value of values) {
                this.cards.push(new Card(suit, value));

            }
        }
    }
    //method to shuffle the deck of cards. I initially had a "-" on line 44 and realized it needed to be an equals sign in order for it to reiterate a diff 
    //outcome each time. and not give me the same result everytime
    shuffle() { //below will loop through the deck and swap each card radomly 
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];

        }
    }
    //below is how to deal a card from the deck 
    deal() {
        return this.cards.pop();
    }
}
//player class for each player in the game 
class Player {
    constructor(name) {
        this.name = name;
        this.hand = []
        this.score = 0;
    } 
    //this will add the card to each players hand
    addCard(card) {
        this.hand.push(card);

    }

    playCard() {
        return this.hand.shift();

    }
    addPoint() {
        this.score++;
    }
}
//function to play the game
function playGame() {  
    const deck = new Deck();
    deck.shuffle();
    //my two created players. I had a little fun with it. I dislike politics very much. and since they are kind of at war with each other at the moment
    //WELL HERE WE ARE hahaha!!!
    const player1 = new Player('Trump');
    const player2 = new Player('Harris');

    for (let i = 0; i < 26; i++) {
        player1.addCard(deck.deal());
        player2.addCard(deck.deal());
    }
    for (let i = 0; i < 26; i++) {
        const card1 = player1.playCard();
        const card2 = player2.playCard();
        //outputs the cards that are played by each player 
        console.log(`${player1.name} plays: ${card1}`);
        console.log(`${player2.name} plays: ${card2}`);

        //determines the winner of the round and awards points for that round 
        if (card1.getValue() > card2.getValue()) {
            player1.addPoint();
            console.log(`${player1.name} wins this round!\n`);
        } else if (card1.getValue() < card2.getValue()) {
            player2.addPoint();
            console.log(`${player2.name} wins this round!\n`)
        } else {
            console.log("It's a tie, no points are awarded.\n");
        }

    }
    console.log(`Final Score: ${player1.name} ${player1.score}, ${player2.name} ${player2.score}`); //will display last line, who wins between p1 and p2
    if (player1.score > player2.score) {
        console.log(`${player1.name} wins the game!`);
    } else if (player1.score < player2.score) {
        console.log(`${player2.name} wins the game!`);
    } else {
        console.log("The game ends in a tie!");
    }
}
function runMultipleGames(times) {
    for (let i = 0; i < times; i++) {
      console.log(`Game ${i + 1}:`);
      playGame();
      console.log("\n===============================\n");
    }
  }
  
  // Run the game as many times as you want... or select a desired
  runMultipleGames(1);

//playGame(); this was initially for one game play I wanted to see how it turned out. 
