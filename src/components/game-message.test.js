import {mount} from '@vue/test-utils';
import GameMessage from "./game-message.vue";

test("game-message mounts", function() {
    expect(()=>{
        mount(GameMessage);
    }).not.toThrow();
});