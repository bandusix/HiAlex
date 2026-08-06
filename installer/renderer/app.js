const app = {
  currentScreen: 'welcome',
  installDir: null,

  init() {
    this.loadSavedConfiguration();
    this.setupEventListeners();

    // Listen for installation progress
    window.hialex.onInstallationProgress((data) => {
      this.updateProgress(data);
    });
  },

  goToScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(`screen-${screenName}`);
    if (targetScreen) {
      targetScreen.classList.add('active');
      this.currentScreen = screenName;
    }
  },

  async setupEventListeners() {
    // Check installation status on load
    const status = await window.hialex.getInstallationStatus();

    if (status.claudeCLI.installed && status.paseo.installed && status.configured) {
      this.goToScreen('complete');
    }
  },

  async loadSavedConfiguration() {
    const config = await window.hialex.getSavedConfiguration();
    if (config.baseUrl) {
      document.getElementById('base-url').value = config.baseUrl;
    }
    if (config.authToken) {
      document.getElementById('auth-token').value = config.authToken;
    }
  },

  async selectDirectory() {
    const dir = await window.hialex.selectDirectory();
    if (dir) {
      this.installDir = dir;
      document.getElementById('install-dir').value = dir;
    }
  },

  async startInstallation() {
    const installDir = this.installDir || document.getElementById('install-dir').value;

    // Disable install button and show progress
    const installBtn = document.getElementById('btn-install');
    installBtn.disabled = true;
    installBtn.textContent = 'Installing...';

    const progressContainer = document.getElementById('progress-container');
    progressContainer.style.display = 'block';

    try {
      const result = await window.hialex.startInstallation({
        installDir: installDir
      });

      if (result.success) {
        // Move to configuration screen
        this.goToScreen('configuration');
      } else {
        alert(`Installation failed: ${result.error}`);
        installBtn.disabled = false;
        installBtn.textContent = 'Install';
      }
    } catch (error) {
      alert(`Installation error: ${error.message}`);
      installBtn.disabled = false;
      installBtn.textContent = 'Install';
    }
  },

  updateProgress(data) {
    const { percent, message } = data;

    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    progressFill.style.width = `${percent}%`;
    progressText.textContent = message;
  },

  async testConfiguration() {
    const baseUrl = document.getElementById('base-url').value;
    const authToken = document.getElementById('auth-token').value;

    if (!baseUrl || !authToken) {
      alert('Please enter both Base URL and Auth Token');
      return;
    }

    const testResult = document.getElementById('test-result');
    testResult.textContent = 'Testing...';
    testResult.className = 'test-result';

    try {
      const result = await window.hialex.testConfiguration({ baseUrl, authToken });

      if (result.success && result.result.valid) {
        testResult.textContent = '✓ Connection successful';
        testResult.classList.add('success');
      } else {
        testResult.textContent = `✗ ${result.result?.message || 'Connection failed'}`;
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
        this.goToScreen('complete');
      } else {
        alert(`Failed to save configuration: ${result.error}`);
      }
    } catch (error) {
      alert(`Configuration error: ${error.message}`);
    }
  },

  async openMainApp() {
    // This will eventually launch the main HiAlex app
    // For now, just close the setup wizard
    alert('HiAlex will now launch!\n\nNote: Main application coming in next update.');
    window.close();
  }
};

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
