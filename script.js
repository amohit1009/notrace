// JavaScript for NoTrace with Enhanced Features and Theme Toggle

// DOM Elements
const messageInput = document.querySelector('input');
const sendButton = document.querySelector('button');
const chatInterface = document.querySelector('.chat-interface');
const body = document.body;

// Sounds
const sendSound = new Audio('send.mp3'); // Add a sound file named 'send.mp3'
const receiveSound = new Audio('receive.mp3'); // Add a sound file named 'receive.mp3'

// Theme Toggle
let currentTheme = localStorage.getItem('theme') || 'dark';
applyTheme(currentTheme);

// Create and append a theme toggle button
const themeToggleButton = document.createElement('button');
themeToggleButton.textContent = currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
themeToggleButton.style.margin = '10px';
themeToggleButton.style.padding = '8px';
themeToggleButton.style.border = 'none';
themeToggleButton.style.borderRadius = '5px';
themeToggleButton.style.backgroundColor = '#0dcaf0';
themeToggleButton.style.color = 'black';
themeToggleButton.style.cursor = 'pointer';
document.body.prepend(themeToggleButton);

themeToggleButton.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
    themeToggleButton.textContent = currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});

// Apply the selected theme
function applyTheme(theme) {
    if (theme === 'dark') {
        body.style.backgroundColor = '#1a1a1a';
        body.style.color = 'white';
    } else {
        body.style.backgroundColor = '#ffffff';
        body.style.color = 'black';
    }
}

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
savedMessages.forEach(msg => appendMessage(msg.content, msg.sender, msg.handle));

// Function to save messages to local storage
function saveMessage(content, sender, handle) {
    const newMessage = { content, sender, handle };
    savedMessages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(savedMessages));
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

    // Play appropriate sound
    if (sender === 'sent') {
        sendSound.play();
    } else {
        receiveSound.play();
    }

    // Save the message to local storage
    saveMessage(content, sender, handle);
}

// Function to handle sending a message
function handleSendMessage() {
    const message = messageInput.value.trim();

    if (message.length > 250) {
        alert('Message too long! Limit: 250 characters.');
        return;
    }

    if (message) {
        appendMessage(message, 'sent', userHandle); // Add message as sent
        messageInput.value = ''; // Clear the input field

        // Disable send button temporarily
        sendButton.disabled = true;

        // Simulate a response
        setTimeout(() => {
            appendMessage(`Response to: "${message}"`, 'received');
            sendButton.disabled = false; // Re-enable send button
        }, 2000);
    }
}

// Event listener for the send button
sendButton.addEventListener('click', handleSendMessage);

// Event listener for pressing Enter in the input field
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
        e.preventDefault(); // Prevent default behavior of Enter key
    }
});
