// deck of cards app
/**
 * Part 2: Deck of Cards
Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

Once you have both cards, console.log the values and suits of both cards.

Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
 */

const BASE_URL = "https://deckofcardsapi.com/api/deck/";

let deckId = 0;
let rot = 0;
let remaining = 52;

const getCard = () => {
    if(remaining) {
        if(!deckId) {
            url = `${BASE_URL}new/draw`
        } else {
            url = `${BASE_URL}${deckId}/draw/?count=1`
        }
        axios({
            method: "get",
            url: url
    
        }).then(response =>{
            deckId = response.data.deck_id;
            remaining = response.data.remaining;
            if(rot < 180) rot += 30;
            else rot = 30;
            const display = document.querySelector(".display")
            let img = new Image();
            img.crossOrigin = "anonymous";
            img.style.transform = `rotate(${rot}deg)`;
            img.src = response.data.cards[0].image;
            display.append(img);
        }).catch(error => {
            console.error(error);
        });
    }    
}
document.querySelector("button").addEventListener("click", getCard);





