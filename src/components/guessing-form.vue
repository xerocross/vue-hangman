<template>
    <div class="guessing-form">
        <form
            class="form-group"
            @submit.prevent
        >
            <label for = "guess-letter">Guess a Letter</label>
            <div class="row">
                <div class="col-6">
                    <select
                        v-model="currentGuessLetter"
                        name = "guess-letter"
                        class="form-control guess-letter-select"
                        :disabled="guessLetterWorking"
                    >
                        <option
                            v-for="i in availableLetters"
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
                        class="btn btn-primary guess-letter-button"
                        :disabled="working"
                        @click="guess"
                    >
                        {{ working ? "working" : "guess letter" }}
                    </button>
                </div>
            </div>
        </form>
                
        <form
            class="form-group"
            @submit.prevent
        >
            <label for="guessPhrase">Guess Entire Phrase</label>
            <div class="row">
                <div class="col-6">
                    <input
                        v-model="currentGuessPhrase"
                        v-aync-working="guessPhraseWorking"
                        name="guessPhrase"
                        :disabled="guessPhraseWorking"
                        type="text"
                        class="form-control guess-phrase-input"
                    >
                </div>
                <div class="col-6">
                    <button
                        class="btn btn-primary guess-phrase-button"
                        :disabled="working"
                        @click="guessEntirePhrase"
                    >
                        {{ working ? "working" : "guess phrase" }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    props : {
        availableLetters : {
            type : Array,
            default : () => []
        },
        guessLetterWorking : {
            type : Boolean,
            default : false
        },
        guessPhraseWorking : {
            type : Boolean,
            default : false
        },
        working : {
            type : Boolean,
            default : false
        }
    },
    data : () => {
        return {
            currentGuessPhrase : "",
            currentGuessLetter : ""
        };
    },
    methods : {
        guess () {
            this.$emit("event_guess_letter", this.currentGuessLetter);
        },
        guessEntirePhrase () {
            this.$emit("event_guess_phrase", this.currentGuessPhrase);
        }
    }
}
</script>
<style lang="scss">

</style>