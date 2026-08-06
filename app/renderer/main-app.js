const mainApp = {
  currentChat: [],

  async init() {
    this.setupEventListeners();
    this.loadChatHistory();
  },

  setupEventListeners() {
    // Auto-resize textarea
    const textarea = document.getElementById('message-input');
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });

    // Enter to send (Shift+Enter for new line)
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('chat-form').dispatchEvent(new Event('submit'));
      }
    });
  },

  async sendMessage(event) {
    event.preventDefault();

    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message to UI
    this.addMessage('user', message);
    input.value = '';
    input.style.height = 'auto';

    // Disable send button
    const sendBtn = document.getElementById('btn-send');
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

    try {
      // Send to Claude API
      const result = await window.hialex.sendMessage(message);

      if (result.success) {
        this.addMessage('assistant', result.reply);
      } else {
        this.addMessage('error', `Error: ${result.error}`);
      }
    } catch (error) {
      this.addMessage('error', `Error: ${error.message}`);
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send';
      input.focus();
    }
  },

  addMessage(role, content) {
    const messagesDiv = document.getElementById('messages');

    // Remove welcome message if exists
    const welcome = messagesDiv.querySelector('.welcome-message');
    if (welcome) {
      welcome.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${role}`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.textContent = role === 'user' ? '👤' : role === 'assistant' ? '🤖' : '⚠️';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    // Simple markdown-like formatting
    const formatted = content
      .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    contentDiv.innerHTML = formatted;

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);

    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Save to current chat
    this.currentChat.push({ role, content });
  },

  newChat() {
    this.currentChat = [];
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = `
      <div class="welcome-message">
        <h2>👋 New Chat Started!</h2>
        <p>What would you like to work on?</p>
      </div>
    `;
    document.getElementById('message-input').focus();
  },

  loadChatHistory() {
    // TODO: Load previous chats from storage
  },

  openSettings() {
    alert('Settings panel coming soon!\n\nFor now, restart the app to reconfigure.');
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  mainApp.init();
});
