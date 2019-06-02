<template>
    <div class = "game-in-progress">
        <main-phrase-display :display-words = "displayWords" />
        <guessing-form 
            :working = "working"
            :available-letters = "availableLetters"
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
            error : false
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
            if (typeof revealedPhrase == "string") {
                let preWords = this.revealedPhrase.split(" ");
                for (let i = 0; i < preWords; i++) {
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
        
    }
}
</script>
<style lang = "scss">

</style>