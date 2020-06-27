const axios = require("axios");
const argv = process.argv;

const read = path => {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: path
        }).then(response =>{
            resolve(response.data);
        });
    });
}
(async () => {
    if(argv[2].startsWith('http')) {
        let text = await read(argv[2]);
        if(text != undefined)
            console.log(text);        
    } else {
        require("./step1")
    }
})();
module.exports = {read: read};


