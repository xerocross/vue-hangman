import {mount} from '@vue/test-utils';
import ResetGameButton from "./reset-game-button.vue";

test("reset-game-button mounts", function() {
    expect(()=>{
        mount(ResetGameButton);
    }).not.toThrow();
});