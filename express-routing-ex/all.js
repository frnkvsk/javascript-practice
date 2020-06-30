const ExpressError = require("./expressError").ExpressError;
const Mean = require("./mean").Mean;
const Median = require("./median").Median;
const Mode = require("./mode").Mode;

class All {
  constructor(numString) {
    this.numString = numString;
  }
  getAll() {
    try {
      const mean = new Mean(this.numString);
      const meanRes = mean.getMean();
  
      const mode = new Mode(this.numString);
      const modeRes = mode.getMode();
  
      const median = new Median(this.numString);
      const medianRes = median.getMedian();

      return {
        operation: "all",
        mean: meanRes,
        median: medianRes,
        mode: modeRes
      }
    } catch(e) {
      throw e;
    }
    


  }
}

module.exports = {All: All}