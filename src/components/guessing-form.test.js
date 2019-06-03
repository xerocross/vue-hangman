import {mount, createLocalVue, shallowMount} from '@vue/test-utils';
import GuessingForm from "./guessing-form.vue";

let localVue;
beforeAll(()=> {
    localVue = createLocalVue()
    localVue.directive('ayncWorking',{})
});


test("guessing-form mounts", function() {
    expect(()=>{
        mount(GuessingForm, {localVue});
    }).not.toThrow();
});


test("guessing a letter emits event_guess_letter with letter payload ", function() {
    const c = shallowMount(GuessingForm, {
        localVue,
        propsData : {
            availableLetters : ["A", "C"]
        }
    });
    const letterSelect = c.find(".guess-letter-select");
    letterSelect.setValue("C");
    const guessLetterButton = c.find(".guess-letter-button");
    guessLetterButton.trigger("click");
    expect(c.emitted("event_guess_letter")[0][0]).toBe("C");
});

test("guessing a phrase emits event_guess_phrase with letter payload ", function() {
    const c = shallowMount(GuessingForm, {
        localVue,
        propsData : {
            availableLetters : ["A", "C"]
        }
    });
    const input = c.find(".guess-phrase-input");
    input.setValue("my phrase");
    const guessPhraseButton = c.find(".guess-phrase-button");
    guessPhraseButton.trigger("click");
    expect(c.emitted("event_guess_phrase")[0][0]).toBe("my phrase");
});

test("if working, buttons are disabled (1)", function(done) {
    const c = shallowMount(GuessingForm, {
        localVue,
        propsData : {
            availableLetters : ["A", "C"],
            guessPhraseWorking : true
        }
    });
    const input = c.find(".guess-phrase-input");
    input.setValue("my phrase");
    const guessPhraseButton = c.find(".guess-phrase-button");
    const guessLetterButton = c.find(".guess-letter-button");
    setTimeout(()=> {
        expect(guessPhraseButton.is(":disabled")).toBe(true);
        expect(guessLetterButton.is(":disabled")).toBe(true);
        done();
    }, 10);
});
test("if working, buttons are disabled (2)", function(done) {
    const c = shallowMount(GuessingForm, {
        localVue,
        propsData : {
            availableLetters : ["A", "C"],
            guessLetterWorking : true,
        }
    });
    const input = c.find(".guess-phrase-input");
    input.setValue("my phrase");
    const guessPhraseButton = c.find(".guess-phrase-button");
    const guessLetterButton = c.find(".guess-letter-button");
    setTimeout(()=> {
        expect(guessPhraseButton.is(":disabled")).toBe(true);
        expect(guessLetterButton.is(":disabled")).toBe(true);
        done();
    }, 10);
});

test("if working, guess letter button inner text changes to 'working'", function(done) {
    const c = shallowMount(GuessingForm, {
        localVue,
        propsData : {
            availableLetters : ["A", "C"],
            guessLetterWorking : true
        }
    });
    const guessLetterButton = c.find(".guess-letter-button");
    c.vm.$nextTick(()=> {
        expect(guessLetterButton.text()).toBe("working");
        done();
    })
});

test("if working, guess phrase button inner text changes to 'working'", function() {
    const c = shallowMount(GuessingForm, {
        localVue,
        propsData : {
            availableLetters : ["A", "C"],
            guessPhraseWorking : true
        }
    });
    const guessPhraseButton = c.find(".guess-phrase-button");
    guessPhraseButton.is(":disabled");
    expect(guessPhraseButton.text()).toBe("working");
});