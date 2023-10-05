const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');

// Create a WebSocket connection to the server
const socket = new WebSocket('wss://ttscrdlv-8080.usw3.devtunnels.ms/');

// Event listener for when the WebSocket connection is opened
socket.addEventListener('open', (event) => {
    socket.send(JSON.stringify({clientType: "user"}));
    chatBox.innerHTML += '<div>Connected to the AI Server.</div>';
});

// Event listener for incoming messages from the server
socket.addEventListener('message', (event) => {
    const messageData = JSON.parse(event.data);
    const name = messageData.name;
    const message = messageData.message;
    chatBox.innerHTML += `<div class="message"><div class="name-server">${name}</div>: ${message}</div>`;
});

socket.addEventListener('error', (event) => {
    chatBox.innerHTML += `<div>Error with AI server communication.</div>`;
})

socket.addEventListener('close', (event) => {
    chatBox.innerHTML += `<div>Disconnected From AI Server! This could be because of an error, or maybe the server isn't ready right now.</div>`;
});

messageInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const messageText = messageInput.value;
        if (messageText.trim() !== '') {
            const messageData = {
                action: "message",
                message: messageText
            };
            // Send the message to the server in JSON format
            socket.send(JSON.stringify(messageData));

            // Display your sent message in the chat box
            chatBox.innerHTML += `<div class="message"><div class="name-you">You: </div>${messageText}</div>`;
            
            // Clear the input field
            messageInput.disabled = true;
            messageInput.value = '';
        }
    }
});
