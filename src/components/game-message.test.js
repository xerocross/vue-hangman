import {mount, createLocalVue} from '@vue/test-utils';
import GameMessage from "./game-message.vue";


let localVue;
beforeAll(()=> {
    localVue = createLocalVue()
    localVue.directive('messageToggle',{})
});



test("game-message mounts", function() {
    expect(()=>{
        mount(GameMessage, {localVue});
    }).not.toThrow();
});