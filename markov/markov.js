/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.startChains = {};
    this.chains = {};
    this.makeChains();    
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the cat": ["in"], "cat in": ["the"], "in the": ["hat"], "hat null": [null]} */
  makeChains() {
    let length = this.words.length;
    this.startChains = {};
    this.chains = {};
    for(let i = 0; i < length; i++) {
      let [key1, key2, val] = [null, null, null];
      if(i < length) key1 = this.words[i];
      if(i + 1 < length) key2 = this.words[i+1];
      if(i + 2 < length) val = this.words[i+2];
      let key = `${key1} ${key2}`;
      if(/^[A-Z]/.test(key1)) {
        if(!this.startChains[key]) this.startChains[key] = [];
        this.startChains[key].push(val);
      } 
      if(!this.chains[key]) this.chains[key] = [];
      this.chains[key].push(val);
    }
  }
  
  random = n => Math.floor((Math.random() * n));
  
  // get the next word in chain 
  // if no words in next chain then get random word
  getNext_helper(chain, key) {
    let next = null;  
    if(chain.hasOwnProperty(key) && chain[key].length) {
      let idx = this.random(chain[key].length);
      next = chain[key][idx];
      chain[key].splice(idx, 1);
      if(!chain[key].length)
        delete chain[key];
    }
    if(!next && Object.keys(chain).length) {
      let idx = this.random(Object.keys(chain).length);
      let key = Object.keys(chain)[idx];
      return this.getNext_helper(chain, key);
    }
    return next;
  }
  // get a random capitalized word from the collection of capitalized words
  getNextRandomStart() {
    let idx = this.random(Object.keys(this.startChains).length);
    let key = Object.keys(this.startChains)[idx];
    return [key, this.getNext_helper(this.startChains, key)];
  }
  // get a random word from the collection of all words
  getNextRandomAll() {
    let idx = this.random(Object.keys(this.chains).length);
    let key = Object.keys(this.chains)[idx];
    return [key, this.getNext_helper(this.chains, key)];
  }
  
  /** return random text from chains */
  makeText(numWords = 100) {
    let result = [], curr = null, next = null;
    // check if there is a word that starts with a capital letter
    // if there is then start off with one of these words
    if(Object.keys(this.startChains).length) {
      [curr, next] = this.getNextRandomStart();
    }
    // no words start with a capital letter so just get a random word
    if(!curr) {
      [curr, next] = this.getNextRandomAll();
    }
    // add first word to sentence
    if(curr && curr.split` `[0] != "null") {
      result.push(curr.split` `[0]);
      curr = `${curr.split(" ")[1]} ${next}`;
    }
    // add the rest of the words to the sentence
    while(curr && curr.split` `[0] != "null" && result.length < numWords && result.length < this.words.length) {
      result.push(curr.split` `[0]);
      curr = `${curr.split(" ")[1]} ${this.getNext_helper(this.chains, curr)}`;
    }
    return result.join` `;
  }
  
}

module.exports = { MarkovMachine: MarkovMachine };
