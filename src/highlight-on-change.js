import Vue from "vue";
import $ from "jquery";
Vue.directive('highlight-on-change', {
    update : function(el, binding) {
        if (binding.value != binding.oldValue) {
            $(el).addClass("init-highlight")
                .delay(2000)
                .queue(() => {
                    $(this).removeClass("init-highlight").dequeue();
                })
        }
    }
})