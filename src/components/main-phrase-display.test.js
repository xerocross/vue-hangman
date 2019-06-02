import {mount} from '@vue/test-utils';
import MainPhraseDisplay from "./main-phrase-display.vue";

beforeEach(()=> {
    localStorage.clear();
})

test("main-phrase-display mounts", function() {
    expect(()=>{
        mount(MainPhraseDisplay);
    }).not.toThrow();
});


test("displays a phrase", function() {

    function getWord (text, index) {
        let chars = text.split("");
        let charObjects = [];
        for (let i = 0; i < chars.length; i++) {
            charObjects.push({
                char : chars[i],
                index : i
            });
        }
        charObjects.index = index;
        return charObjects;
    }

    const displayWords = [
        getWord("ap", 0),
        getWord("pe",1)
    ]
    let mainPhraseDisplay = mount(MainPhraseDisplay, {
        propsData : {
            displayWords
        }
    });
    let charSpans = mainPhraseDisplay.findAll(".letter-char");

    expect(charSpans.length).toBe(4);
    expect(charSpans.at(0).text()).toBe("a");
    expect(charSpans.at(1).text()).toBe("p");
    expect(charSpans.at(2).text()).toBe("p");
    expect(charSpans.at(3).text()).toBe("e");
});