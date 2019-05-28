import axios from "axios";
import Observable from "../Observable.js";

const getPhraseNumUrl = "https://xero-hangman-api.herokuapp.com/getPhraseNum";

function getCheckLetterUrl(phraseNum, letter) {
    return `https://xero-hangman-api.herokuapp.com/guessLetter?letter=${letter}&phrasenum=${phraseNum}`;
}
function getPhraseCheckUrl(phraseNum, guessPhrase) {
    let encodedPhrase = encodeURI(guessPhrase);
    return `https://xero-hangman-api.herokuapp.com/guessPhrase?guessphrase=${encodedPhrase}&phrasenum=${phraseNum}`;
}



const get = function(url) {
    return new Observable((observer) => {
        axios.get(url)
            .then(function (response) {
                if (response.status == "200") {
                    observer.next({
                        status : "SUCCESS",
                        data : response.data
                    })
                } else {
                    observer.next({
                        status : "FAIL",
                        data : response.data
                    })
                } 

            })
            .catch(function (error) {
                observer.next({
                    status : "ERROR",
                    error : error
                });
            })
    })
}

export default {
    getPhraseData () {
        return get(getPhraseNumUrl);
    },
    guessLetter (phraseNum, letter) {
        let url = getCheckLetterUrl(phraseNum, letter);
        return get(url);
    },
    guessEntirePhrase (phraseNum, guessPhrase) {
        let url = getPhraseCheckUrl(phraseNum, guessPhrase);
        return get(url);
    }
}


