const { read1 } = require("./step1");
const { read2 } = require("./step2");
const fs = require("fs");
const argv = process.argv;

const save = (filename,data) => {
    fs.writeFile(filename, data, "utf8", err => {
        if(err) console.error(err);
    });
}
(async () => {
    if(argv[2].startsWith("--out")) {
        let text; 
        if(!argv[4].startsWith("http")) {
            text = await read1(argv[4]);
            console.log(`# no output, but ${argv[3]} contains contents of ${argv[4]}`);
            save(argv[3], text);            
        } else {
            text = await read2(argv[4]);
            let address = argv[4].slice(argv[4].indexOf("/")+2, argv[4].indexOf("."));
            console.log(`# no output, but ${argv[3]} contains ${address}'s HTML`);
            save(argv[3], text);            
        }        
    } else if(argv[2].startsWith('http')) {
        read2(argv[2]);
    } else {
        read1(argv[2]);
    }
})();



