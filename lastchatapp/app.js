// Select DOM elements
const linaButton = document.querySelector('#Lina-selector');
const lisaButton = document.querySelector('#Lisa-selector');
const header = document.querySelector('.chat-header');
const messagesContainer = document.querySelector('.chat-messages');
const inputForm = document.querySelector('.chat-input-form');
const inputField = document.querySelector('.chat-input');
const clearChatButton = document.querySelector('.clear-chat-button');
const landingPage = document.querySelector('#landing-page'); // Landing page element
const chatPage = document.querySelector('#chat-app'); // Chat page element
const startChatButton = document.querySelector('#start-chat-button'); // Start Chat button

const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];

const createMessageElement = (message) => `
  <div class="message ${message.sender === 'Lina' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  storedMessages.forEach((message) => {
    messagesContainer.innerHTML += createMessageElement(message);
  });
};

// Set default sender to Lina
let currentSender = 'Lina';

const updateSender = (name) => {
  currentSender = name;
  header.innerText = `${currentSender} chatting...`;
  inputField.placeholder = `Type here, ${currentSender}...`;

  if (name === 'Lina') {
    linaButton.classList.add('active-person');
    lisaButton.classList.remove('active-person');
  }
  if (name === 'Lisa') {
    linaButton.classList.remove('active-person');
    lisaButton.classList.add('active-person');
  }

  inputField.focus();
};

// Event listeners to switch sender between Lina and Lisa
linaButton.onclick = () => updateSender('Lina');
lisaButton.onclick = () => updateSender('Lisa');

// Send chat message and save to localStorage
const sendChatMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const newMessage = {
    sender: currentSender,
    text: inputField.value,
    timestamp,
  };

  // Save new message in localStorage
  storedMessages.push(newMessage);
  localStorage.setItem('messages', JSON.stringify(storedMessages));

  // Display new message in chat
  messagesContainer.innerHTML += createMessageElement(newMessage);

  // Clear input field
  inputForm.reset();

  // Scroll to the latest message
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

// Handle message form submission
inputForm.addEventListener('submit', sendChatMessage);

// Clear chat and localStorage
clearChatButton.addEventListener('click', () => {
  localStorage.clear();
  messagesContainer.innerHTML = '';
});

// Show the chat page when "Start Chat" button is clicked
startChatButton.addEventListener('click', () => {
  // Hide the landing page and show the chat page
  landingPage.style.display = 'none';
  chatPage.style.display = 'block';

  // Default to 'Lina' sender
  updateSender('Lina');
});
