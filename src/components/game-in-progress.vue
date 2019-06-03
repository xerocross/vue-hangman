<template>
    <div class = "game-in-progress">
        <main-phrase-display :display-words = "displayWords" />
        <div
            v-if = "isLost"
            class = "game-over"
        >
            Game Over
        </div>
        <div class="row">
            <div 
                v-if = "!isLost" 
                class = "col-6"
            >
                <guessing-form 
                    :available-letters = "availableLetters"
                    :guess-letter-working = "guessLetterWorking"
                    :guess-phrase-working = "guessPhraseWorking"
                    @event_guess_letter = "guessLetter"
                    @event_guess_phrase = "guessEntirePhrase"
                />
                <guessed-letters 
                    :guessed-letters = "guessedLetters"
                    :failed-attempts = "failedAttempts"
                />
            </div>
            <div 
                :class="!isLost ? 'col-6' : 'lost'"
            >
                <hangman-doodle 
                    class = "hangman-doodle-outer small"
                    :completion = "failedAttempts + 1"
                    image-directory = "/images"
                />
            </div>
        </div>
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
import HangmanDoodle from "./hangman-doodle.vue";
export default {
    components : {
        MainPhraseDisplay,
        ResetGameButton,
        GuessedLetters,
        GuessingForm,
        HangmanDoodle
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
        },
        isLost () {
            return this.$store.state.isLost;
        }
    },
    methods : {
        reset () {
            this.$emit("event_reset");
        },
        fail() {

        },
        guessLetter(letter) {
            this.pushMessage(`looking for any ${letter}s`);
            this.guessLetterWorking = true;
            this.$store.dispatch('guessLetter', {
                letter
            })
                .then((val)=> {
                    this.guessLetterWorking = false;
                    if (val == false) {
                        this.pushMessage(`letter ${letter} not found`);
                    } else {
                        this.pushMessage("found");
                    }
                })
                .catch(()=> {
                    this.guessLetterWorking = false;
                    this.error = true;
                });
        },
        guessEntirePhrase(phrase) {
            this.pushMessage(`checking your phrase`);
            let self = this;
            this.guessPhraseWorking = true;
            this.$store.dispatch('guessEntirePhrase', {
                guessPhrase : phrase,
            })
                .then((val) => {
                    this.guessPhraseWorking = false;
                    if (val === false) {
                        this.pushMessage(`phrase not correct`);
                    }
                })
                .catch(()=> {
                    this.guessPhraseWorking = false;
                    self.error = true;
                });
        },
        pushMessage(message) {
            this.$emit("event_push_message", message);
        }
    }
}
</script>
<style lang = "scss">
    .game-over {
        text-align: center;
        font-weight: bold;
        font-size: 130%;
    }
    .lost {
        width: 100%;
        text-align: center;
    }

</style>