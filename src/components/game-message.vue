<template>
    <div
        v-message-toggle="message"
        class="game-message message"
    >
        {{ message }}
    </div>
</template>
<script>
export default {
    props : {
        message : {
            type : String,
            default : ""
        }
    }
}
</script>
<style lang = "scss">
    .game-message {
        .message {
            color : white;
            font-size: 22pt;
            text-align: center;
            position: absolute;
            top:10px;
            right:10px;
            border-radius: 5px;
            border-style: solid;
            border-color: black;
            border-width: 1px;
            padding: 5px;
            visibility : hidden;
            background-color: black;
        }
        .message::before {
            content: " "
        }
    }
</style>