<template>
    <div class="guessed-letters">
        <p>Guessed Letters: {{ guessedLetters.join(" ") }}</p>
        <p>Failed Attempts: {{ failedAttempts }}</p>
    </div>
</template>
<script>
export default {
    props : {
        guessedLetters : {
            type : Array,
            default : () => []
        },
        failedAttempts : {
            type : Number, 
            default : 0
        }
    }
}
</script>
<style lang="scss">
    .guessed-letters {
        font-size: 18pt;
    }
</style>