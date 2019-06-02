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
        <reset-game-button @event_reset = "reset" />
    </div>
</template>

<script>
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
            availableLetters : [],
            guessedLetter : [],
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
        }
    },
    methods : {
        reset () {
            this.$emit("event_reset");
        },
        failedAttempts () {
            return this.$store.state.failedAttempts;
        },
        working () {
            this.working = true;
        }
    }
}
</script>
<style lang = "scss">

</style>