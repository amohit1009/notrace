// JavaScript for NoTrace with Enhanced Features and Emoji Support

// DOM Elements
const messageInput = document.querySelector('input');
const sendButton = document.querySelector('button');
const chatInterface = document.querySelector('.chat-interface');

// Sounds
const sendSound = new Audio('send.mp3'); // Add a sound file named 'send.mp3'
const receiveSound = new Audio('receive.mp3'); // Add a sound file named 'receive.mp3'

// Emoji Picker
const emojiButton = document.createElement('button');
emojiButton.textContent = '😀'; // Emoji button icon
emojiButton.style.margin = '5px';
emojiButton.style.padding = '8px';
emojiButton.style.border = 'none';
emojiButton.style.borderRadius = '5px';
emojiButton.style.cursor = 'pointer';
document.body.insertBefore(emojiButton, chatInterface);

// Emoji Picker Functionality
const emojiPicker = [
    '😀', '😂', '❤️', '👍', '🎉', '😢', '😎', '🙌', '🔥', '🙏', '🤔', '🎂'
];

emojiButton.addEventListener('click', () => {
    const emojiContainer = document.createElement('div');
    emojiContainer.style.position = 'absolute';
    emojiContainer.style.bottom = '60px';
    emojiContainer.style.left = '10px';
    emojiContainer.style.backgroundColor = '#f0f0f0';
    emojiContainer.style.border = '1px solid #ccc';
    emojiContainer.style.padding = '10px';
    emojiContainer.style.borderRadius = '5px';
    emojiContainer.style.display = 'grid';
    emojiContainer.style.gridTemplateColumns = 'repeat(6, 1fr)';
    emojiContainer.style.gap = '5px';

    emojiPicker.forEach((emoji) => {
        const emojiItem = document.createElement('span');
        emojiItem.textContent = emoji;
        emojiItem.style.cursor = 'pointer';
        emojiItem.style.fontSize = '20px';
        emojiItem.addEventListener('click', () => {
            messageInput.value += emoji;
            document.body.removeChild(emojiContainer); // Close picker after selection
        });
        emojiContainer.appendChild(emojiItem);
    });

    document.body.appendChild(emojiContainer);
});

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
