import Vue from "vue";
import VueProjectTemplate from "./components/vue-project-template.vue";


let NODE_ENV = env["NODE_ENV"];

import { store } from "./state-logic";

import "./working-directive";

new Vue({
    el : "#vue-project-template",
    store,
    components : {
        VueProjectTemplate
    },
    render : function (createElement) {
        return createElement(VueProjectTemplate, {
            props : {
                ENVIRONMENT : NODE_ENV, 
            }
        });
    }
});