const MarkovMachine = require("./markov").MarkovMachine;

describe("test markov", function() {

    test("test zero words", function() {
        let mm = new MarkovMachine("");
        let text = mm.makeText();
        expect(text).toMatch("");
    });
    test("test one word", function() {
        let mm = new MarkovMachine("the");
        let text = mm.makeText();
        expect(text).toContain("the");
    });
    test("test two words", function() {
        let mm = new MarkovMachine("the the");
        let text = mm.makeText();
        expect(text).toContain("the");
    });
    test("test Capitalized word", function() {
        let mm = new MarkovMachine("the cat in The hat and the cat in the hat");
        let text = mm.makeText();
        expect(text.split` `[0]).toMatch("The");
    });
    test("test length limit not exceeded", function() {
        let mm = new MarkovMachine("the cat in The hat and the cat in the hat");
        let text = mm.makeText();
        expect(text.split` `.length).toBeLessThan(12);
    });
    
});