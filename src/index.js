import Vue from "vue";
import VueProjectTemplate from "./components/vue-project-template.vue";


let NODE_ENV = env["NODE_ENV"];

import { store } from "./state-logic";

import "./working-directive";
import "./highlight-on-change";
import "./message-toggle.js";

new Vue({
    el : "#vue-hangman",
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