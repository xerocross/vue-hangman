import {mount} from '@vue/test-utils';
import VueHangman from "./vue-hangman.vue";

beforeEach(()=> {
    localStorage.clear();
})

// test("the component mounts", function() {
//     expect(()=>{
//         let vueHangman = mount(VueHangman);
//     }).not.toThrow();
// });