import Vue from "vue";
import VueProjectTemplate from "./components/vue-project-template.vue";

let NODE_ENV = env["NODE_ENV"];

new Vue({
    el : "#vue-project-template",
    components : {
        VueProjectTemplate
    },
    render : function (createElement) {
        return createElement(VueProjectTemplate, {
            props : {
                ENVIRONMENT : NODE_ENV
            }
        });
    }
});