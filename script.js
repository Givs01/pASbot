async function sendQuestion() {
    const inputBox = document.getElementById('user-input');
    const question = inputBox.value.trim().toLowerCase();
    inputBox.value = '';
    displayMessage(question, 'user');
    await fetchAnswer(question);
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.textContent = message;
    msgDiv.className = sender;
    chatBox.appendChild(msgDiv);
}

async function fetchAnswer(question) {
    const endpoint = 'https://script.google.com/macros/s/AKfycbzxYXeV2jnt4fEDkoeF-wNbgGdy-ONuxd7IqSRkerBmsY0IvWOCTIBU_xzS_FoHMTFc/exec';
    const response = await fetch(endpoint);
    const rows = await response.json();
    let found = false;

    for (const row of rows) {
        if (row[0].toLowerCase().includes(question) || question.includes(row[0].toLowerCase())) {
            displayMessage(row[1], 'bot');
            found = true;
            break;
        }
    }

    if (!found) {
        displayMessage("Sorry, I can't find an answer to that.", 'bot');
    }
}
