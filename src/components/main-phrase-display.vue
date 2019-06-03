<template>
    <div class="main-phrase-display">
        <div
            v-for="word in displayWords"
            :key="word.index"
            class="main-phrase-display-inner word"
        >
            <span
                v-for="charItem in word"
                :key="charItem.index"
                class="letter-char"
            >{{ charItem.char }}
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props : {
        displayWords : {
            type : Array,
            default : () => []
        }
    }
}
</script>
<style lang="scss">
    .main-phrase-display {
        .main-phrase-display-inner {
            font-size: 20pt;
            text-align: center;
        }
        .word {
            display: inline-block;
            margin-right: 1em;

            .letter-char {
                width: 1em;
                // padding-left:2px;
                // padding-right:2px;
            }
        }
        .word:after {
            content : " "
        }
        .letter-char {
            font-size: 22pt;
        }
    }
</style>