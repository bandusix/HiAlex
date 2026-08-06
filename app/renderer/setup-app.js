const setupApp = {
  async testConfiguration() {
    const baseUrl = document.getElementById('base-url').value;
    const authToken = document.getElementById('auth-token').value;

    if (!baseUrl || !authToken) {
      alert('Please enter both Base URL and API Key');
      return;
    }

    const testResult = document.getElementById('test-result');
    testResult.textContent = 'Testing...';
    testResult.className = 'test-result';

    try {
      const result = await window.hialex.testConfiguration({ baseUrl, authToken });

      if (result.valid) {
        testResult.textContent = '✓ Connection successful';
        testResult.classList.add('success');
      } else {
        testResult.textContent = `✗ ${result.message || 'Connection failed'}`;
        testResult.classList.add('error');
      }
    } catch (error) {
      testResult.textContent = `✗ Error: ${error.message}`;
      testResult.classList.add('error');
    }
  },

  async saveAndStart(event) {
    event.preventDefault();

    const baseUrl = document.getElementById('base-url').value;
    const authToken = document.getElementById('auth-token').value;

    try {
      const result = await window.hialex.saveConfiguration({ baseUrl, authToken });

      if (result.success) {
        // Open main app
        await window.hialex.openMainApp();
      } else {
        alert(`Failed to save configuration: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }
};
