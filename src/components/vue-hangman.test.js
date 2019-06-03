import {mount, createLocalVue} from '@vue/test-utils';
import VueHangman from "./vue-hangman.vue";
import Vuex from 'vuex';

let store;
let localVue;


beforeAll(()=> {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.directive('ayncWorking',{});
    localVue.directive('messageToggle',{});
});

beforeEach(()=> {
    store = new Vuex.Store({
        state : {
            revealedPhrase : ["A","_","B","_","C"],
            guessedLettersSet : [],
            availableLetters : ["A", "B"],
            isWon : false,
            isLost : false
        }
    });
});

test("the component mounts", function() {
    expect(()=>{
        mount(VueHangman, {localVue, store});
    }).not.toThrow();
});