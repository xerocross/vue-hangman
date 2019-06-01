import Vue from "vue";
import $ from "jquery";

Vue.directive('message-toggle', {
    update : function(el, binding) {
        if (binding.value != binding.oldValue && binding.value.length > 0) {
            $(el).css("visibility", "visible");
            $(el).stop(true).show().css("opacity","1").text(binding.value).fadeOut(3000)
            window.el = $(el);
        }
    }
})