// JavaScript for NoTrace with Enhanced Features

// DOM Elements
const messageInput = document.querySelector('input');
const sendButton = document.querySelector('button');
const chatInterface = document.querySelector('.chat-interface');

// Create and append a "Clear Chat" button
const clearButton = document.createElement('button');
clearButton.textContent = "Clear Chat";
clearButton.style.margin = "10px";
clearButton.style.padding = "8px";
clearButton.style.border = "none";
clearButton.style.borderRadius = "5px";
clearButton.style.backgroundColor = "#ff5e5e";
clearButton.style.color = "white";
clearButton.style.cursor = "pointer";
document.body.appendChild(clearButton);

// Prompt the user for their handle
let userHandle = localStorage.getItem('userHandle');
if (!userHandle) {
    userHandle = prompt('Enter your unique handle (e.g., ~mohit):');
    if (userHandle) {
        localStorage.setItem('userHandle', userHandle);
    } else {
        userHandle = '~guest';
    }
}

// Load messages from local storage
const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
savedMessages.forEach(msg => appendMessage(msg.content, msg.sender, msg.handle, msg.timestamp));

// Function to save messages to local storage
function saveMessage(content, sender, handle, timestamp) {
    const newMessage = { content, sender, handle, timestamp };
    savedMessages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(savedMessages));
}

// Function to append messages to the chat interface
function appendMessage(content, sender = 'sent', handle = userHandle, timestamp = null) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    // Add handle and timestamp
    const handleSpan = document.createElement('span');
    handleSpan.classList.add('handle');
    handleSpan.textContent = sender === 'sent' ? handle : '~user2';

    if (!timestamp) {
        timestamp = new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true, day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    const timestampSpan = document.createElement('span');
    timestampSpan.classList.add('timestamp');
    timestampSpan.textContent = timestamp;

    // Add message content
    const contentP = document.createElement('p');
    contentP.textContent = content;

    // Append elements
    messageDiv.appendChild(handleSpan);
    messageDiv.appendChild(contentP);
    messageDiv.appendChild(timestampSpan);
    chatInterface.appendChild(messageDiv);

    // Scroll to the bottom of the chat
    chatInterface.scrollTop = chatInterface.scrollHeight;

    // Save the message to local storage
    saveMessage(content, sender, handle, timestamp);
}

// Event listener for the send button
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        appendMessage(message, 'sent', userHandle); // Add message as sent
        messageInput.value = ''; // Clear the input field

        // Simulate a response
        setTimeout(() => {
            appendMessage(`Response to: "${message}"`, 'received');
        }, 2000);
    }
});

// Event listener for the clear button
clearButton.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear the chat?")) {
        localStorage.removeItem('messages');
        chatInterface.innerHTML = ''; // Clear messages from the UI
    }
});
