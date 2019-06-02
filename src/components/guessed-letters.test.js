import {mount} from '@vue/test-utils';
import GuessedLetters from "./guessed-letters.vue";

test("guessed-letters mounts", function() {
    expect(()=>{
        mount(GuessedLetters);
    }).not.toThrow();
});