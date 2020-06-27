const { read1 } = require("./step1");
const axios = require("axios");
const argv = process.argv;

const read2 = path => {
    if(!path.startsWith("--")) {
        return new Promise((resolve, reject) => {
            axios({
                method: "get",
                url: path
            }).then(response =>{
                resolve(response.data);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
(async () => {
    if(argv[2].startsWith('http')) {
        await read2(argv[2])
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            console.log(err);
        });   
    } else {
        read1(argv[2]);
    }
})();
module.exports = {read2: read2};


