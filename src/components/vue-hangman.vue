<template>
    <div class="vue-hangman">
        <game-message :message = "message" />
        <div
            v-if="isWon"
            class="alert alert-info"
        >
            <p>Congratulations, you guessed the phrase correctly.</p>
        </div>
        <div v-if="!isGameInProgress">
            <start-game-button 
                :working = "startGameWorking"
                @event_start_game = "startGame"
            />
        </div>
        <div v-show="isGameInProgress">
            <game-in-progress 
                @event_reset = "reset"
                @event_push_message = "pushNewMessage"
            />
        </div>
    </div>
</template>
<script>
import GameInProgress from "./game-in-progress.vue";
import GameMessage from "./game-message.vue";
import StartGameButton from "./start-game-button.vue";
export default {
    components : {
        GameInProgress,
        GameMessage,
        StartGameButton
    },
    props : {
    },
    data () {
        return {
            isPhraseGuessCorrect : false,
            startGameWorking : false,
            error : false,
            isNewMessage : false,
            message : ""
        }
    },
    computed : {
        isGameInProgress () {
            return this.$store.state.gameInProgress;
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
        pushNewMessage (val) {
            this.message = val;
            this.isNewMessage = true;
            setTimeout(() => {
                this.isNewMessage = false;
            }, 1000);
        },
        reset() {
            this.startGame();
        }
    }

}
</script>
<style lang = "scss">
.vue-hangman {
    font-size: 14pt;
    position : relative;

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