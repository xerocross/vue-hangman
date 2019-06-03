import Vuex from "vuex";
import HangmanService from "./service/hangman-service";



function cloneArray (arr) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        newArray.push(arr[i]);
    }
    return newArray;
}


const StartingAvailableLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const store = new Vuex.Store({
    state : {
        phraseNum : NaN,
        phraseLen : 0,
        revealedPhrase : [],
        guessedLettersSet : [],
        availableLetters : StartingAvailableLetters,
        failedAttempts : 0,
        gameInProgress : false,
        isWon : false,
        isLost : false,
        httpInProgress : false
    },
    mutations : {
        startGame : (state) => {
            state.gameInProgress = true;
            state.revealedPhrase = [];
            state.availableLetters = StartingAvailableLetters;
            for (let i = 0; i < state.phraseLen; i++) {
                state.revealedPhrase[i] = "_";
            }
            state.isWon = false;
            state.isLost = false;
            state.failedAttempts = 0;
            state.guessedLettersSet = [];
        },
        guessedLetter : (state, payload) => {
            state.guessedLettersSet.push(payload.letter);
            let index = state.availableLetters.indexOf(payload.letter);
            let newAvailableLetters = cloneArray(state.availableLetters);
            newAvailableLetters.splice(index,1);

            state.availableLetters = newAvailableLetters;
        },
        failedAttempt : (state) => {
            state.failedAttempts++;
            if (state.failedAttempts >= 6) {
                state.isLost = true;
            }
        },
        phraseData : (state, payload) => {
            state.phraseNum = payload.phraseNum;
            state.phraseLen = payload.phraseLen;
        },
        mergeNewReveal : (state, payload) => {
            let newReveal = [];
            for (let i = 0; i < state.phraseLen; i++) {
                payload.revealedPhrase[i] ? newReveal[i] = payload.revealedPhrase[i] : newReveal[i] = state.revealedPhrase[i];
            }
            state.revealedPhrase = newReveal;
        },
        won : (state) => {
            state.isWon = true;
            state.gameInProgress = false;
        }
    },
    actions : {
        startGame ( { commit } ) {
            return new Promise( (resolve, fail) => {
                HangmanService.getPhraseData()
                    .subscribe((val)=> {
                        if (val.status == "SUCCESS") {
                            commit("phraseData",{
                                phraseNum : val.data.phraseNum,
                                phraseLen : val.data.length
                            });
                            commit ("startGame");
                            resolve();
                        } else {
                            fail();
                        }
                    })
            });     
        },
        guessLetter ({commit, state}, payload) {
            commit("guessedLetter",{letter : payload.letter});
            return new Promise( (resolve, fail) => {
                HangmanService.guessLetter(state.phraseNum, payload.letter)
                    .subscribe((val) => {
                        if (val.status == "SUCCESS") {
                            if (val.data.success == false) {
                                commit ("failedAttempt");
                                resolve(false)
                            } else {
                                commit("mergeNewReveal",{
                                    revealedPhrase : val.data.revealedPhrase
                                });
                                resolve(true)
                            }
                        } else {
                            fail();
                            alert("SORRY.  An unknown error occured.");
                        }
                    });
            });
        },
        guessEntirePhrase({commit, state}, payload) {
            return new Promise( (resolve, fail) => {
                HangmanService.guessEntirePhrase(state.phraseNum, payload.guessPhrase)
                    .subscribe( (val) => {
                        if (val.status == "SUCCESS") {
                            if (val.data == true) {
                                commit ("won");
                            }
                            else if (val.data == false) {
                                commit ("failedAttempt");
                                resolve(false);
                            }
                            resolve();
                        } else {
                            fail();
                        }

                    });
            })
        }
    }
})
