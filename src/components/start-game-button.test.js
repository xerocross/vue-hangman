import {mount, createLocalVue} from '@vue/test-utils';
import StartGameButton from "./start-game-button.vue";
let localVue;
beforeAll(()=> {
    localVue = createLocalVue()
    localVue.directive('ayncWorking',{})
});

test("start game button mounts", () => {
    expect(()=>{
        mount(StartGameButton, {localVue});
    }).not.toThrow();
});

test("emits start game event", () => {
    const c = mount(StartGameButton, {localVue});
    const startButton = c.find(".start-button");
    startButton.trigger("click");
    expect(c.emitted()["event_start_game"].length).toBe(1);
});