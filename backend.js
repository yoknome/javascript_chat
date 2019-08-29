const httpMock = require('@Zemke/http-mock')(3333); //Florians Mock HTTP

//httpMock.add('/api/tournament/', __dirname + '/mock/api_tournament.json');

httpMock.add('/getAnswer', getAnswer);

// Possible answers:
var en = [
	["Yes.", "Definitely.", "Indeed."], // positive answers
	["No.", "Under no circumstances."], // negative answers
	["Maybe.", "Ask again.", "You know the answer to that."] // neutral answers
];
/*/ Possible german answers:
var de = [
	["Ja.", "Definitiv.", "Auf jeden Fall.", "Wahrscheinlich."], // positive answers
	["Nein.", "Unter keinen Umständen."], // negative answers
	["Vielleicht.", "Frag nochmal.", "Du kennst die Antwort darauf."] // neutral answers
];*/

/* http://localhost:3333/getAnswer will provide a random 
 * positive, negative or neutral answer */
function getAnswer(x, y) {
	var i = getRandomInt(3);
	var j = getRandomInt(en[i].length);
	var answer = en[i][j];
	return answer;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}