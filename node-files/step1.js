const fs = require("fs");
const argv = process.argv;

const read = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", async (err, data) => {
            resolve(data)
        });
    });
}
(async () => {
    let text = await read(argv[2]);
    if(text != undefined)
        console.log('step1 ',text);
})();
module.exports = {read: read};