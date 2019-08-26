const httpMock = require('@Zemke/http-mock')(3333); //Florians Mock HTTP

//httpMock.add('/api/tournament/', __dirname + '/mock/api_tournament.json');

httpMock.add('/getAnswer', getAnswer);


/* http://localhost:3333/getAnswer will provide a random 
 * positive or negative answer */
function getAnswer() {
    var positive = ["Yes.", "Indeed.", "Definately."];
    var negative = ["No.", "Under no circumstances."];

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    var bool = getRandomInt(2);
    if(bool === 0) {
        var r = getRandomInt(negative.length);
        var answer = negative[r];
    } else {
        var r = getRandomInt(positive.length);
        var answer = positive[r];
    }

    return answer;
}
