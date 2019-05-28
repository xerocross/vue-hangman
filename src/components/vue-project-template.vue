<template>
    <div class="hangman container">
        <div
            v-if="isWon"
            class="alert alert-info"
        >
            <p>Congratulations, you guessed the phrase correctly.</p>
        </div>
        <div v-if="!isGameInProgress">
            <button
                class="btn btn-primary"
                @click="startGame"
            >
                start a new game
            </button>
        </div>
        <div v-show="isGameInProgress">
            <p class="main-phrase-display">
                <span
                    v-for="item in phraseDisplay"
                    :key="item.key"
                    v-highlight-on-change="item.letter"
                    class="letter"
                >
                    {{ item.letter }}
                </span>
            </p>
            <div v-show="!isPhraseGuessCorrect">
                <form
                    class="form-group"
                    @submit.prevent
                >
                    <label>Guess a Letter</label>
                    <div class="row">
                        <div class="col-6">
                            <select
                                v-model="currentGuessLetter"
                                class="form-control"
                                :disabled="guessLetterWorking"
                            >
                                <option
                                    v-for="i in letters"
                                    :key="i"
                                    :value="i"
                                >
                                    {{ i }}
                                </option>
                            </select>
                        </div>
                        <div class="col-6">
                            <button
                                ref="guess-letter-button"
                                v-aync-working="guessLetterWorking"
                                class="btn btn-primary"
                                :disabled="guessLetterWorking"
                                @click="guess"
                            >
                                {{ guessLetterWorking ? "working" : "guess letter" }}
                            </button>
                        </div>
                    </div>
                </form>
                
                
                <label for="guessPhrase">Guess Entire Phrase</label>
                <div class="row">
                    <div class="col-6">
                        <input
                            v-model="currentGuessPhrase"
                            v-aync-working="guessPhraseWorking"
                            name="guessPhrase"
                            :disabled="guessPhraseWorking"
                            type="text"
                            class="form-control"
                        >
                    </div>
                    <div class="col-6">
                        <button
                            class="btn btn-primary"
                            :disabled="guessPhraseWorking"
                            @click="guessEntirePhrase"
                        >
                            {{ guessPhraseWorking ? "working" : "guess phrase" }}
                        </button>
                    </div>
                </div>
                <div class="guessed-letters">
                    <p>Guessed Letters: {{ guessedLetterArray.join(" ") }}</p>
                    <p>Failed Attempts: {{ failedAttempts }}</p>
                </div>
            </div>
        </div>
        <div v-if="isWon">
            <p>Congratulations, you guessed the phrase correctly: {{ phrase }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props : {
    },
    data () {
        return {
            currentGuessLetter : "A",
            currentGuessPhrase : "",
            isPhraseGuessCorrect : false,
            guessLetterWorking : false,
            startGameWorking : false,
            guessPhraseWorking : false,
            error : false
        }
    },
    computed : {
        phrase () {
            return this.$store.state.phrase;
        },
        letters () {
            return this.$store.state.availableLetters;
        },
        isGameInProgress () {
            return this.$store.state.gameInProgress;
        },
        phraseMask () {
            return this.$store.state.phraseMask;
        },
        guessedLetterArray () {
            return this.$store.state.guessedLettersSet;
        },
        revealedPhrase () {
            return this.$store.state.revealedPhrase;
        },
        phraseDisplay () {
            let phraseDisp = [];
            for (let i = 0; i < this.revealedPhrase.length; i++) {
                let done = false;
                if (this.revealedPhrase[i] != "_") {
                    done = true;
                }
                phraseDisp.push({
                    key : i,
                    letter : this.revealedPhrase[i],
                    done : done
                })
                
            }
            return phraseDisp;
        },
        failedAttempts () {
            return this.$store.state.failedAttempts;
        },
        isWon () {
            return this.$store.state.isWon;
        }
    },
    methods : {
        startGame () {
            let self = this;
            self.startGameWorking = true;
            this.$store.dispatch('startGame')
                .then(()=> {
                    this.startGameWorking = false
                })
                .catch(()=> {
                    this.error = true;
                });
        },
        guess () {
            this.guessLetterWorking = true;
            this.$store.dispatch('guessLetter', {
                letter : this.currentGuessLetter,

            })
                .then(()=> {
                    this.guessLetterWorking = false;
                })
                .catch(()=> {
                    this.error = true;
                });

            this.currentGuessLetter = this.letters[0];
                
        },
        guessEntirePhrase() {
            this.guessPhraseWorking = true;
            this.$store.dispatch('guessEntirePhrase', {
                "guessPhrase" : this.currentGuessPhrase,
            })
                .then(() => {
                    this.guessPhraseWorking = false;
                    this.currentGuessPhrase = "";
                })
                .catch(()=> {
                    this.error = true;
                });
        }
    }
}
</script>
<style lang = "scss">
.hangman {
    body {
        font-size: 14pt;
    }
    .main-phrase-display {
        font-size: 20pt;
        text-align: center;
    }
    .guessed-letters {
        font-size: 18pt;
    }
    .letter {
        padding-left: 2px;
        padding-right: 2px;
        display: inline-block;
        min-width: 1em;
    }


     @keyframes letter-fade-animation {
        0%   {color: black}
        50% {color: white}
        100% {color: black}
    }
    .letters-fade {
        animation-name: letter-fade-animation;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
    @keyframes button-pulse-animation {
        0%   {opacity: 1}
        50% {opacity: .3}
        100% {opacity: 1}
    }
    .btn {
        opacity : 1
    }

    .button-pulse {
        animation-name: button-pulse-animation;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

    @keyframes init-highlight-animation {
        0%   {background-color:rgb(255, 252, 75);}
        100% {background-color : transparent;}
    }
    .init-highlight {
        animation-name: init-highlight-animation;
        animation-duration: 4s;
        animation-iteration-count: 1;
    }


}
</style>