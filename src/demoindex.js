import VueProjectTemplate from "./components/vue-project-template.vue";
import Vue from "vue";

new Vue({
    el : "#vue-project-template",
    components : {
        VueProjectTemplate
    },
    render : function (createElement) {
        return createElement(VueProjectTemplate);
    }
});