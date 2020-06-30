const ExpressError = require("./expressError").ExpressError;

class Median {
  constructor(numString) {
    this.arr = numString.slice(numString.indexOf("=")+1).split(",").filter(e => e.length);
  }
  getMedian() {
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
      let mdn;
      this.arr = this.arr.map(Number);
      if(this.arr.length % 2) {
        mdn = this.arr[(this.arr.length + 1) / 2 - 1];
      } else {
        let i = this.arr.length / 2;
        mdn = (this.arr[i] + this.arr[i-1]) / 2
      }
      return mdn.toString();
    } 
  }
}

module.exports = {Median: Median};