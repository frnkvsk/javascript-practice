const fs = require("fs");
const argv = process.argv;

const read1 = path => {
    if(!path.startsWith("http") && !path.startsWith("--")) {
        try {
            let text = fs.readFileSync(path, "utf8");
            return text;
        } catch(err) {
            console.log(err);
        }
    }    
}
(async () => {
    let text = await read1(argv[2]);
    if(text != undefined)
        console.log(text);
})();
module.exports = {read1: read1};