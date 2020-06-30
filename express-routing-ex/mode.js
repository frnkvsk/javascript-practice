const ExpressError = require("./expressError").ExpressError;

class Mode {
  constructor(numString) {
    this.arr = numString.slice(numString.indexOf("=")+1).split(",").filter(e => e.length);
  }
  getMode() {
    if(!this.arr.length) {
      throw new ExpressError(`Number is required`, 400);
    }
    else if(this.arr.some(e => isNaN(e))) {
      this.arr.map(e => {
        if(isNaN(e)) {
          throw new ExpressError(`${e} is not a number`, 400);
        }        
      }); 
    } else {
      let md = [], max = 0, obj = {};
      for(let e of this.arr) {
        if(!obj[e]) obj[e] = 0;
        obj[e]++;    
        if(obj[e] > 1 && obj[e] > max) md = [e];
        else if (obj[e] > 1 && obj[e] == max) md.push(+e);
        max = Math.max(max, obj[e])
      }
      md.sort((a,b) => a-b);
      return md.length ? md.toString() : "none";
    } 
  }
}

module.exports = {Mode: Mode};