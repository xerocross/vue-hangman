import Vue from "vue";
import $ from "jquery";

Vue.directive('ayncWorking', {

    inserted : function (el, binding) {
        console.log(binding.value);


    },
    update : function(el, binding) {
        if (binding.value==true) {
            //$(".letter").addClass("letters-fade");
            $(el).addClass("button-pulse");
            debugger;
        } else {
            $(el).removeClass("button-pulse");
            //$(".letter").removeClass("letters-fade");
        }
    }
})