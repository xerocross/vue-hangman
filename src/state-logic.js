import Vuex from "vuex";
import HangmanService from "./service/hangman-service";
function cloneArray (arr) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        newArray.push(arr[i]);
    }
    return newArray;
}


export const store = new Vuex.Store({
    state : {
        phraseNum : NaN,
        phraseLen : 0,
        revealedPhrase : [],
        guessedLettersSet : [],
        availableLetters : "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
        failedAttempts : 0,
        gameInProgress : false,
        isWon : false,
        httpInProgress : false
    },
    mutations : {
        startGame : (state) => {
            state.gameInProgress = true;
            state.revealedPhrase = [];
            state.availableLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
            for (let i = 0; i < state.phraseLen; i++) {
                state.revealedPhrase[i] = "_";
            }
            state.isWon = false;
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
        startGame ( { commit, state }, payload ) {
            HangmanService.getPhraseData()
                .then((data) => {
                    commit("phraseData",{
                        phraseNum : data.phraseNum,
                        phraseLen : data.length
                    });
                    commit ("startGame");
                    payload.done();
                });
        },
        guessLetter ({commit, state}, payload) {
            commit("guessedLetter",{letter : payload.letter});
            return HangmanService.guessLetter(state.phraseNum, payload.letter)
                .then((data) => {
                    payload.done();
                    if (data.success == false) {
                        commit ("failedAttempt");
                    } else {
                        commit("mergeNewReveal",{
                            revealedPhrase : data.revealedPhrase
                        });
                    }

                });
        },
        guessEntirePhrase({commit, state}, payload) {
            return HangmanService.guessEntirePhrase(state.phraseNum, payload.guessPhrase)
                .then( (data) => {
                    payload.done();
                    if (data == true) {
                        commit ("won");
                    }
                    else if (data == false) {
                        commit ("failedAttempt");
                    }
                });
        }
    }
})
