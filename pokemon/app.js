// pokemon app
/**
Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.

Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.

Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data). Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.

Example: “ducklett: They are better at swimming than flying, and they happily eat their favorite food, peat moss, as they dive underwater.”

BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.
 */

const ALL_URL = "https://pokeapi.co/api/v2/pokemon?limit=964";
let deckId = 0;
let rot = 0;
let remaining = 52;

const getPokemon = url => {
    return axios({
        method: "get",
        url: url
    });
}

/**
 * 1. First API request get all pokemon from API
 * 2. Get 3 random {name, url} from the first API request
 * 3. Second API request use url to get {speciesURL, imageURL} 
 * 4. Third API request use speciesURL to get description in English
 * 5. Create card with:
 *      - Name
 *      - Image
 *      - Description of species
 */
const buttonHandler = () => {

    let randomNumbers = [];
    for(let i = 0; i < 3; i++) {
        randomNumbers.push(Math.floor(Math.random() * 965));
    }
    
    getPokemon(ALL_URL).then(response => {
        
        randomNumbers.map(e => {
            const cards = document.querySelector(".cards");
            let container = document.createElement("DIV");
            let title = document.createElement("H3");
            let image = document.createElement("DIV");
            let description = document.createElement("P");
            container.className = "container";
            let {name, url} = response.data.results[e];
            title.innerText = name;
            getPokemon(url).then(response => {
                let speciesURL = response.data.species.url;
                let imageURL = response.data.sprites.front_shiny;
                getPokemon(speciesURL).then(response => {
                    console.log(response)
                    description.innerText = response.data.flavor_text_entries.filter(e => e.language.name == "en")[0].flavor_text;
                    let img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = imageURL;
                    image.append(img);
                    container.append(title);
                    container.append(image);
                    container.append(description);
                    cards.append(container);
                })
            });            

        });
    });    
    
}
document.querySelector("button").addEventListener("click", buttonHandler);





