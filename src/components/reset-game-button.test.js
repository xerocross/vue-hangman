import {mount, shallowMount} from '@vue/test-utils';
import ResetGameButton from "./reset-game-button.vue";

function getComponent() {
    return shallowMount((ResetGameButton));
}


test("reset-game-button mounts", () => {
    expect(()=>{
        mount(ResetGameButton);
    }).not.toThrow();
});

test("emits reset event", () => {
    const c = getComponent();
    const resetButton = c.find(".reset-button");
    resetButton.trigger("click");
    expect(c.emitted()["event_reset"].length).toBe(1);
});