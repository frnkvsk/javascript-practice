const ExpressError = require("./expressError").ExpressError;


class Mean {
  constructor(numString) {
    this.arr = numString.slice(numString.indexOf("=")+1).split(",").filter(e => e.length);
  }
  getMean() {
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
      return (this.arr.reduce((a,b) => a + +b, 0) / this.arr.length).toString();
    } 
  }
}

module.exports = {Mean: Mean};