import {mount, createLocalVue, shallowMount} from '@vue/test-utils';
import GameInProgress from "./game-in-progress.vue";
import Vuex from 'vuex';
let store;
let localVue;


function getWrapper () {
    return shallowMount(GameInProgress, {localVue, store});
}

beforeAll(()=> {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.directive('ayncWorking',{})
});

beforeEach(()=> {
    store = new Vuex.Store({
        state : {
            revealedPhrase : "",
            guessedLettersSet : [],
            availableLetters : ["A", "B"]
        }
    });
});

test("game-in-progress mounts", function() {
    expect(()=>{
        mount(GameInProgress, {localVue, store});
    }).not.toThrow();
});

