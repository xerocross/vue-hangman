import axios from "axios";

const getPhraseNumUrl = "https://xero-hangman-api.herokuapp.com/getPhraseNum";

function getCheckLetterUrl(phraseNum, letter) {
    return `https://xero-hangman-api.herokuapp.com/guessLetter?letter=${letter}&phrasenum=${phraseNum}`;
}
function getPhraseCheckUrl(phraseNum, guessPhrase) {
    let encodedPhrase = encodeURI(guessPhrase);
    return `https://xero-hangman-api.herokuapp.com/guessPhrase?guessphrase=${encodedPhrase}&phrasenum=${phraseNum}`;
}

export default {
    getPhraseData () {
        return axios.get(getPhraseNumUrl)
            .then(function (response) {
                // handle success
                //console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
            // handle error
                console.log(error);
            })
    },
    guessLetter (phraseNum, letter) {
        let url = getCheckLetterUrl(phraseNum, letter);
        return axios.get(url)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    },
    guessEntirePhrase (phraseNum, guessPhrase) {
        let url = getPhraseCheckUrl(phraseNum, guessPhrase);
        return axios.get(url)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
}


