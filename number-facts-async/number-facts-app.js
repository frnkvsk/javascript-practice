// number facts app
/**
 * Part 1: Number Facts
Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

(Note: You’ll need to make multiple requests for this.)
 */

const doLuckyNumberFacts = (luckyNumber, results=[]) => {
    if(results.length == 4) {
        const ul = document.getElementById("lucky-number-ul");
        results.map(e => {
            let li = document.createElement("LI");
            li.innerText = e;
            ul.append(li);
        });
    } else {
        axios({
            method: "GET", 
            url: `http://numbersapi.com/${luckyNumber}/trivia?json`
        }).then(response => {
            results.push(response.data.text);
            doLuckyNumberFacts(luckyNumber, results);
        }).catch(error => {
            reject(error);
        });
    }
    
}

const doListNumberFacts = numberList => {
    axios({
        method: "GET", 
        url: `http://numbersapi.com/${numberList}/trivia?json`
    }).then(response => {
        const ul = document.getElementById("list-number-ul");
        Object.values(response.data).map(e => {
            let li = document.createElement("LI");
            li.innerText = e;
            ul.append(li);
        });
    }).catch(error => {
        reject(error);
    });
    
}

document.getElementById("lucky-number-form").addEventListener("click", async e => {
    e.preventDefault();
    if(e.target.id == "btn-submit") {
        const luckyNumber = document.getElementById("lucky-number").value;
        doLuckyNumberFacts(luckyNumber);
    }
});

document.getElementById("list-number-form").addEventListener("click", async e => {
    e.preventDefault();
    if(e.target.id == "btn-submit") {
        let luckyNumber = document.getElementById("list-number").value;
        luckyNumber = luckyNumber.replace(/\s/g, "");
        console.log(luckyNumber)
        doListNumberFacts(luckyNumber);
    }
});
