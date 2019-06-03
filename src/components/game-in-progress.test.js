import {mount, createLocalVue} from '@vue/test-utils';
import GameInProgress from "./game-in-progress.vue";
import Vuex from 'vuex';
let store;
let localVue;

beforeAll(()=> {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.directive('ayncWorking',{})
});

beforeEach(()=> {
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : [],
            availableLetters : ["A", "B"]
        }
    });
});

test("game-in-progress mounts", function() {
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : [],
            availableLetters : ["A", "B"]
        }
    });
    expect(()=>{
        mount(GameInProgress, {localVue, store});
    }).not.toThrow();
});


test("main phrase disiplay receives data and presents it", () => {
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : [],
            availableLetters : ["A", "B"]
        }
    });
    const c = mount(GameInProgress, {localVue, store});
    expect(c.find(".main-phrase-display-inner").exists()).toBe(true);
    let mainPhraseDisplay = c.find(".main-phrase-display-inner");
    
    let letters = mainPhraseDisplay.findAll(".letter-char");
    expect(letters.length).toBe(5);
    expect(letters.at(0).text()).toBe("A");
    expect(letters.at(1).text()).toBe("_");
    expect(letters.at(2).text()).toBe("B");
});

test("guessed-letters component receives guessed letters data", () => {
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : ["A", "C", "G"],
            availableLetters : ["A", "B"]
        }
    });
    const c = mount(GameInProgress, {localVue, store});
    const guessedLettersDiv = c.find(".guessed-letters");
    expect(guessedLettersDiv.exists()).toBe(true);
    let vm = guessedLettersDiv.vm;
    expect(vm._props.guessedLetters[1]).toBe("C");
});

test("guessed-letters component receives failed attempts data", () => {
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : ["A", "C", "G"],
            availableLetters : ["A", "B"],
            failedAttempts : 5
        }
    });
    const c = mount(GameInProgress, {localVue, store});
    const guessedLettersDiv = c.find(".guessed-letters");
    expect(guessedLettersDiv.exists()).toBe(true);
    let vm = guessedLettersDiv.vm;
    expect(vm._props.failedAttempts).toBe(5);
});



test("guessing form receives available letters", () => {
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : ["A", "C", "G"],
            availableLetters : ["A", "B"],
            failedAttempts : 5
        }
    });
    const c = mount(GameInProgress, {localVue, store});
    const guessingForm = c.find(".guessing-form");
    expect(guessingForm.exists()).toBe(true);
    let vm = guessingForm.vm;
    expect(vm._props.availableLetters[1]).toBe("B");
});

test("guessing form receives guessLetterWorking", () => {
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : ["A", "C", "G"],
            availableLetters : ["A", "B"],
            failedAttempts : 5
        }
    });
    const c = mount(GameInProgress, {localVue, store});
    const gameInProgress = c.vm;
    gameInProgress._data.guessLetterWorking = true;
    const guessingForm = c.find(".guessing-form");
    let vm = guessingForm.vm;
    expect(vm._props.guessLetterWorking).toBe(true);
});

test("guessing form receives guessPhraseWorking", () => {
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : ["A", "C", "G"],
            availableLetters : ["A", "B"],
            failedAttempts : 5
        }
    });
    const c = mount(GameInProgress, {localVue, store});
    const gameInProgress = c.vm;
    gameInProgress._data.guessPhraseWorking = true;
    const guessingForm = c.find(".guessing-form");
    let vm = guessingForm.vm;
    expect(vm._props.guessPhraseWorking).toBe(true);
});

test("guess letter event dispatches 'guessLetter'", () => {
    let guessLetterDispatch = false
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : ["A", "C", "G"],
            availableLetters : ["A", "B"],
            failedAttempts : 5
        },
        actions : {
            guessLetter () {
                guessLetterDispatch = true;
            }
        }
    });
    const c = mount(GameInProgress, {localVue, store});
    const guessingForm = c.find(".guessing-form");
    const guessLetterButton = guessingForm.find(".guess-letter-button");
    guessLetterButton.trigger("click");
    expect(guessLetterDispatch).toBe(true);
});

test("guess phrase event dispatches 'guessEntirePhrase'", () => {
    let guessEntirePhraseDispatch = false
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : ["A", "C", "G"],
            availableLetters : ["A", "B"],
            failedAttempts : 5
        },
        actions : {
            guessLetter () {
            },
            guessEntirePhrase () {
                guessEntirePhraseDispatch = true;
            }
        }
    });
    const c = mount(GameInProgress, {localVue, store});

    const guessingForm = c.find(".guessing-form");
    const guessPhraseButton = guessingForm.find(".guess-phrase-button");
    guessPhraseButton.trigger("click");
    expect(guessEntirePhraseDispatch).toBe(true);
});

test("error during 'guessEntirePhrase' sets local error = true", (done) => {
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : ["A", "C", "G"],
            availableLetters : ["A", "B"],
            failedAttempts : 5
        },
        actions : {
            guessLetter () {
            },
            guessEntirePhrase () {
                return new Promise(function() {
                    throw new Error("");
                });
            }
        }
    });
    const c = mount(GameInProgress, {localVue, store});
    const guessingForm = c.find(".guessing-form");
    const guessPhraseButton = guessingForm.find(".guess-phrase-button");
    guessPhraseButton.trigger("click");
    setTimeout(() => {
        expect(c.vm.error).toBe(true)
        done();
    }, 10);
});


test("while dispatching guessEntirePhrase, guessPhraseWorking is true", (done) => {
    
    let resOuter;
    let promise = new Promise((res)=>{
        resOuter = res;
    });
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : ["A", "C", "G"],
            availableLetters : ["A", "B"],
            failedAttempts : 5
        },
        actions : {
            guessLetter () {
            },
            guessEntirePhrase () {
                return promise;
            }
        }
    });
    const c = mount(GameInProgress, {localVue, store});
    const guessingForm = c.find(".guessing-form");
    const guessPhraseButton = guessingForm.find(".guess-phrase-button");
    expect(c.vm._data.guessPhraseWorking).toBe(false);
    guessPhraseButton.trigger("click");
    setTimeout(() => {
        expect(c.vm._data.guessPhraseWorking).toBe(true);
        resOuter();
        done();
    }, 10);
});



test("error during 'guessLetter' sets local error = true", (done) => {
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : ["A", "C", "G"],
            availableLetters : ["A", "B"],
            failedAttempts : 5
        },
        actions : {
            guessLetter () {
                return new Promise(function() {
                    throw new Error("");
                });
            },
            guessEntirePhrase () {

            }
        }
    });
    const c = mount(GameInProgress, {localVue, store});
    const guessingForm = c.find(".guessing-form");
    const guessLetterButton = guessingForm.find(".guess-letter-button");
    guessLetterButton.trigger("click");
    setTimeout(() => {
        expect(c.vm.error).toBe(true)
        done();
    }, 10);
});

test("while dispatching guessLetter, guessLetterWorking is true", (done) => {
    
    let resOuter;
    let promise = new Promise((res)=>{
        resOuter = res;
    });
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : ["A", "C", "G"],
            availableLetters : ["A", "B"],
            failedAttempts : 5
        },
        actions : {
            guessLetter () {
                return promise;
            },
            guessEntirePhrase () {
               
            }
        }
    });
    const c = mount(GameInProgress, {localVue, store});
    const guessingForm = c.find(".guessing-form");
    const guessLetterButton = guessingForm.find(".guess-letter-button");
    expect(c.vm._data.guessLetterWorking).toBe(false);
    guessLetterButton.trigger("click");
    setTimeout(() => {
        expect(c.vm._data.guessLetterWorking).toBe(true);
        resOuter();
        done();
    }, 10);
});