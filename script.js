// JavaScript for NoTrace with User Handles

// DOM Elements
const messageInput = document.querySelector('input');
const sendButton = document.querySelector('button');
const chatInterface = document.querySelector('.chat-interface');

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

// Function to append messages to the chat interface
function appendMessage(content, sender = 'sent', handle = userHandle) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    // Add handle and timestamp
    const handleSpan = document.createElement('span');
    handleSpan.classList.add('handle');
    handleSpan.textContent = sender === 'sent' ? handle : '~user2';
    
    const timestampSpan = document.createElement('span');
    timestampSpan.classList.add('timestamp');
    timestampSpan.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
