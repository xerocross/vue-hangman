<template>
    <div class = "game-in-progress">
        <main-phrase-display :display-words = "displayWords" />
        <guessing-form 
            :working = "working"
            :available-letters = "availableLetters"
            @event_guess_letter = "guessLetter"
            @event_guess_phrase = "guessEntirePhrase"
        />
        <guessed-letters 
            :guessed-letters = "guessedLetters"
            :failed-attempts = "failedAttempts"
        />
        <reset-game-button 
            @event_reset = "reset" 
        />
    </div>
</template>

<script>

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

            
import MainPhraseDisplay from "./main-phrase-display.vue";
import ResetGameButton from "./reset-game-button.vue";
import GuessedLetters from "./guessed-letters.vue";
import GuessingForm from "./guessing-form.vue";
export default {
    components : {
        MainPhraseDisplay,
        ResetGameButton,
        GuessedLetters,
        GuessingForm
    },
    data : () => {
        return {
            working : false,
            startGameWorking : false,
            error : false,
            guessLetterWorking : false,
            guessPhraseWorking : false
        }
    },
    computed : {
        revealedPhrase () {
            return this.$store.state.revealedPhrase;
        },
        guessedLetters () {
            return this.$store.state.guessedLettersSet;
        },
        availableLetters () {
            return this.$store.state.availableLetters;
        },
        displayWords () {
            let words = [];
            let phrase = this.revealedPhrase.join("");
            if (typeof phrase == "string") {
                let preWords = phrase.split(" ");
                for (let i = 0; i < preWords.length; i++) {
                    words.push(getWord(preWords[i], i));
                }
            }
            return words;
        },
        failedAttempts () {
            return this.$store.state.failedAttempts;
        }
    },
    methods : {
        reset () {
            this.$emit("event_reset");
        },
        guessLetter(letter) {
            this.guessLetterWorking = true;
            this.$store.dispatch('guessLetter', {
                letter
            })
                .then(()=> {
                    this.guessLetterWorking = false;
                })
                .catch(()=> {
                    this.error = true;
                });
        },
        guessEntirePhrase(phrase) {
            this.guessPhraseWorking = true;
            this.$store.dispatch('guessEntirePhrase', {
                guessPhrase : phrase,
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

</style>