function getAIResponse(userMessage) {
  if (userMessage.toLowerCase() === 'bye') {
    return "Goodbye! Take care, and remember we're here if you need us.";
  }

  return `You said: "${userMessage}". Let's talk more about that.`;
}

function addMessageToChat(message, isUser) {
  const chatWindow = document.getElementById('chatWindow');

  const messageElement = document.createElement('div');
  messageElement.classList.add(
    'message',
    isUser ? 'user-message' : 'ai-message'
  );
  messageElement.innerText = message;

  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function handleSendMessage() {
  const userInput = document.getElementById('userInput');
  const userMessage = userInput.value.trim();

  if (!userMessage) return;

  addMessageToChat(userMessage, true);

  if (userMessage.toLowerCase() === 'bye') {
    const aiResponse = getAIResponse(userMessage);
    setTimeout(() => addMessageToChat(aiResponse, false), 500);

    userInput.disabled = true;
    document.getElementById('sendButton').disabled = true;
    return;
  }

  userInput.value = '';

  const aiResponse = getAIResponse(userMessage);
  setTimeout(() => addMessageToChat(aiResponse, false), 500);
}

document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('sendButton');
  const userInput = document.getElementById('userInput');

  sendButton.addEventListener('click', handleSendMessage);

  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });
});
