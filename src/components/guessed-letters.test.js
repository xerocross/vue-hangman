import {mount, shallowMount} from '@vue/test-utils';
import GuessedLetters from "./guessed-letters.vue";



test("guessed-letters mounts", () => {
    expect(()=>{
        mount(GuessedLetters);
    }).not.toThrow();
});

test("displays guessed letters with prop passed in", () => {
    const c = shallowMount(GuessedLetters, {
        propsData : {
            guessedLetters : ["A", "C", "G"],
            failedAttempts : 2
        }
    });
    expect(c.find(".guessed-letters-inner-span").text()).toBe("A C G");
});

test("displays failed attempts num with prop passed in", () => {
    const c = shallowMount(GuessedLetters, {
        propsData : {
            guessedLetters : ["A", "C", "G"],
            failedAttempts : 2
        }
    });
    expect(c.find(".failed-attempts-num").text()).toBe("2");
});

test("displays failed attempts num with no props", () => {
    const c = shallowMount(GuessedLetters, {
        propsData : {}
    });
    expect(c.find(".failed-attempts-num").text()).toBe("0");
});

test("displays guessed letters num with no props", () => {
    const c = shallowMount(GuessedLetters, {
        propsData : {}
    });
    expect(c.find(".guessed-letters-inner-span").text()).toBe("");
});