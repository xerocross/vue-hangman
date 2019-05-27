import Vue from "vue";
import VueProjectTemplate from "./components/vue-project-template.vue";
import Vuex from "vuex";
import HangmanService from "./service/hangman-service";

let NODE_ENV = env["NODE_ENV"];

function cloneArray (arr) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        newArray.push(arr[i]);
    }
    return newArray;
}


const store = new Vuex.Store({
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
        startGame ( { commit, state } ) {
            HangmanService.getPhraseData()
                .then((data) => {
                    commit("phraseData",{
                        phraseNum : data.phraseNum,
                        phraseLen : data.length
                    });
                    commit ("startGame");
                });
        },
        guessLetter ({commit, state}, payload) {
            commit("guessedLetter",{letter : payload.letter});
            return HangmanService.guessLetter(state.phraseNum, payload.letter)
                .then((data) => {
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



new Vue({
    el : "#vue-project-template",
    store,
    components : {
        VueProjectTemplate
    },
    render : function (createElement) {
        return createElement(VueProjectTemplate, {
            props : {
                ENVIRONMENT : NODE_ENV, 
            }
        });
    }
});