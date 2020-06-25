// deck of cards app
/**
 * Part 2: Deck of Cards
Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

Once you have both cards, console.log the values and suits of both cards.

Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
 */
const canvas = document.querySelector(".display-canvas");
const BASE_URL = "https://deckofcardsapi.com/api/deck/";
// const SHUFFLE = "https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/";
// const DRAW =    "https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2";


const getCard = () => {
    axios({
        method: "get",
        url: `${BASE_URL}new/draw`
    }).then(response =>{
        console.log(response.data.deck_id)
        
        let imgsrc = response.data.cards[0].image;
        console.log(imgsrc, typeof imgsrc)
        console.log(response.data.remaining)
        let ctx = canvas.getContext("2d");
        let img = document.createElement("IMG");
        img.src = "http://deckofcardsapi.com/static/img/5C.png"
        ctx.drawImage(img, 200, 200);
    }).catch(error => {
        console.error(error);
    });
}
getCard();