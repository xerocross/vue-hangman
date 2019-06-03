<template>
    <div class="hangman-doodle">
        <img
            :src = "imageSrc"
            class = "img-fluid"
            width = "300"
            height = "462"
        >
    </div>
</template>
<script>
export default {
    props : {
        imageDirectory : {
            type : String,
            required : true
        },
        completion : {
            type : Number,
            required : true
        }
    },
    computed : {
        imageSrc () {
            return `${this.imageDirectory}/hangman-doodle${this.completion}.png`;
        }
    }
}
</script>