<template>
    <div class="vue-project-template">
        <h1>Vue Project Template</h1>

        <p v-if="ENVIRONMENT == 'local'">
            Live-updating
        </p>
        <p>
            environment: {{ ENVIRONMENT }}
        </p>
        <p>
            At praesentium sapiente itaque. Aliquid qui minus iure sit nobis illum quas rerum. Vero necessitatibus id et et et sed autem.
        </p>
        <p>
            Delectus similique non quo voluptatem sunt omnis magnam omnis. Perferendis consequuntur at placeat. Ut et dolores officia et. 
            Ipsam iusto nostrum saepe consequuntur. Modi eum molestiae aliquam repudiandae dicta ducimus atque et. Tempore et iure quam.
        </p>
    </div>
</template>
<script>
export default {
    props : {
        ENVIRONMENT : {
            type : String,
            default : ""
        }
    },
    data () {
        return {
        }
    },
    computed : {

    },
    watch : {
    },
    methods : {
    }
}
</script>
<style lang = "scss">
.vue-project-template {
    background-color: white;
}
</style>