document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatBox = document.getElementById('chatBox');

    // Mock current user
    const currentUser = 'You';
    const otherUser = 'User1'; // Mock recipient for demo

    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const messageText = messageInput.value.trim();
        if (!messageText) return;

        // Display sent message
        appendMessage(currentUser, messageText, 'sent');

        // Simulate received message (for demo)
        setTimeout(() => {
            appendMessage(otherUser, 'Hey, got your message!', 'received');
        }, 1000);

        // Clear input
        messageInput.value = '';
    });

    // Function to append messages
    function appendMessage(user, text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.innerHTML = `
            <div class="user">${user}</div>
            <div class="text">${text}</div>
        `;
        chatBox.appendChild(messageElement);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Auto-focus input
    messageInput.focus();

    // Mock initial messages
    appendMessage(otherUser, 'Hi! How’s it going?', 'received');
});
