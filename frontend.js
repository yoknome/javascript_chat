// load existing chat log
window.onload = function () {
    fetch('http://localhost:3333/getChatLog')
        .then(function (response) {
            return response.json();
        }).then(function (chatLog) {
            console.log(chatLog);
            for (i = 0; i < chatLog.length; i++) {
                parseParagraph(chatLog[i].timestamp, chatLog[i].username, chatLog[i].message)
            }
        });
}

function postMessage() {
    var today = new Date();
    var timestamp = today.getTime();
    var messageLength = document.getElementById('message').value.length;

    if (messageLength === 0) { // no input - no answer from server needed
        parseParagraph(timestamp, "Oracle", "Ask me something.");
    } else { // fetch user input to send to server to get an answer 
        var username = document.getElementById('username').value;
        var message = document.getElementById('message').value;
        document.getElementById("message").value = "";
        parseParagraph(timestamp, username, message);

        setTimeout(function () {
            fetch('http://localhost:3333/getAnswer', {
                method: 'POST',
                body: JSON.stringify({
                    timestamp: timestamp,
                    username: username,
                    message: message
                })
            }).then(function (response) {
                return response.json();
            }).then(function (myJson) {
                var answer = JSON.stringify(myJson).slice(1, -1);
                parseParagraph(timestamp, "Oracle", answer);
            });
        }, 900);
    }
}

// parse timestamp, username and message to display in chatbox 
function parseParagraph(timestamp, username, message) {
    var date = new Date(timestamp);
    var formattedTime = leadingZero(date.getHours()) + ":" + leadingZero(date.getMinutes());
    var newParagraph = document.createElement("P");
    newParagraph.innerHTML = "[" + formattedTime + "] " + username + ": \"" + message + "\"";
    chatbox.appendChild(newParagraph);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// add 0 in front of single digit numbers
function leadingZero(t) { 
    if (String(t).length > 1) {
        return t;
    } else {
        min = "0" + String(t);
        return min;
    }
}