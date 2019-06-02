import Vue from "vue";
import VueHangman from "./components/vue-hangman.vue";


let NODE_ENV = env["NODE_ENV"];

import { store } from "./state-logic";

import "./working-directive";
import "./highlight-on-change";
import "./message-toggle.js";

new Vue({
    el : "#vue-hangman",
    store,
    components : {
        VueHangman
    },
    render : function (createElement) {
        return createElement(VueHangman, {
        });
    }
});