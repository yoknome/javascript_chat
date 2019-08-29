const httpMock = require('@Zemke/http-mock')(3333); //Florians Mock HTTP

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

// logged Chat
var chatLog = []; 

/* http://localhost:3333/getAnswer will provide 
 * a random positive, negative or neutral answer */
httpMock.add('/getAnswer', getAnswer);
function getAnswer(head, data) {
	chatLog.push(data);
	console.log(chatLog[chatLog.length-1])

	var i = getRandomInt(3);
	var j = getRandomInt(en[i].length);
	var answer = en[i][j];

	var today = new Date();
	var timestamp = today.getTime();
	chatLog.push({timestamp: timestamp, username: "Oracle", message: answer})

	return answer;
}

/* http://localhost:3333/getChatLog will provide 
 * a chatlog after reload as long as the server stays online */
httpMock.add('/getChatLog', getChatLog);
function getChatLog() {
	return chatLog;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}