<template>
    <div class="reset-game-button">
        <button
            class="btn btn-secondary reset-button"
            @click="reset"
        >
            reset / start a new game
        </button>
    </div>
</template>
<script>
export default {
    methods : {
        reset () {
            this.$emit("event_reset");
        }
    }
}
</script>
<style lang="scss">
</style>