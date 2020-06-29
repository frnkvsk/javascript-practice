/** Command-line tool to generate Markov text. */
const MarkovMachine = require("./markov").MarkovMachine;
const axios = require("axios");
const stripHtml = require("string-strip-html");
const fs = require("fs");
const argv = process.argv;

async function readFile() {
    return await fs.readFileSync(argv[3], "utf-8");
}

async function readHtml() {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: argv[3]
        }).then(response =>{
            resolve(stripHtml(response.data));
        }).catch(err => {
            reject(err);
        });
    }); 
}
(async () => {
    let text = "";
    if(argv[2] == "file") {
        text = await readFile();
    } else {
        text = await readHtml();
    }    
    let mm = new MarkovMachine(text);
    let res = mm.makeText(300);
    console.log(res)
})()