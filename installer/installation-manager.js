const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const EventEmitter = require('events');

const execAsync = promisify(exec);

class InstallationManager extends EventEmitter {
  constructor() {
    super();
    this.platform = process.platform;
    this.installDir = this.getDefaultInstallDir();
  }

  getDefaultInstallDir() {
    if (this.platform === 'win32') {
      return path.join(process.env.LOCALAPPDATA || 'C:\\Program Files', 'HiAlex');
    } else if (this.platform === 'darwin') {
      return path.join(os.homedir(), 'Applications', 'HiAlex');
    }
    return path.join(os.homedir(), '.hialex');
  }

  async checkInstallationStatus() {
    const status = {
      claudeCLI: await this.isClaudeCLIInstalled(),
      paseo: await this.isPaseoInstalled(),
      configured: await this.isConfigured()
    };
    return status;
  }

  async isClaudeCLIInstalled() {
    try {
      const { stdout } = await execAsync('claude --version');
      return { installed: true, version: stdout.trim() };
    } catch (error) {
      return { installed: false };
    }
  }

  async isPaseoInstalled() {
    try {
      const { stdout } = await execAsync('paseo --version');
      return { installed: true, version: stdout.trim() };
    } catch (error) {
      return { installed: false };
    }
  }

  async isConfigured() {
    const configPath = this.getClaudeConfigPath();
    try {
      await fs.access(configPath);
      const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
      return config.baseUrl && config.authToken;
    } catch (error) {
      return false;
    }
  }

  getClaudeConfigPath() {
    if (this.platform === 'win32') {
      return path.join(process.env.APPDATA || os.homedir(), 'claude', 'config.json');
    }
    return path.join(os.homedir(), '.claude', 'config.json');
  }

  async install(options) {
    const { installDir = this.installDir, claudeCLI = true, paseo = true } = options;

    this.emit('progress', { stage: 'init', message: 'Starting installation...', percent: 0 });

    try {
      // Create installation directory
      await fs.mkdir(installDir, { recursive: true });
      this.emit('progress', { stage: 'dir', message: 'Created installation directory', percent: 10 });

      // Install Claude CLI
      if (claudeCLI) {
        await this.installClaudeCLI(installDir);
        this.emit('progress', { stage: 'claude', message: 'Claude CLI installed', percent: 40 });
      }

      // Install Paseo
      if (paseo) {
        await this.installPaseo(installDir);
        this.emit('progress', { stage: 'paseo', message: 'Paseo installed', percent: 70 });
      }

      // Setup environment
      await this.setupEnvironment(installDir);
      this.emit('progress', { stage: 'env', message: 'Environment configured', percent: 90 });

      this.emit('progress', { stage: 'complete', message: 'Installation complete!', percent: 100 });
      return { success: true, installDir };
    } catch (error) {
      this.emit('progress', { stage: 'error', message: error.message, percent: 0 });
      throw error;
    }
  }

  async installClaudeCLI(installDir) {
    const resourcesDir = path.join(__dirname, '../resources');

    if (this.platform === 'win32') {
      // Use bundled Windows installer or download
      const installerPath = path.join(resourcesDir, 'claude-cli-setup.exe');
      await this.runInstaller(installerPath, ['/S', `/D=${installDir}`]);
    } else if (this.platform === 'darwin') {
      // Use npm to install globally or use bundled installer
      try {
        await execAsync('npm install -g @anthropic-ai/claude-cli');
      } catch (error) {
        // Fallback to bundled installer
        const installerPath = path.join(resourcesDir, 'claude-cli.pkg');
        await this.runInstaller(installerPath, []);
      }
    }
  }

  async installPaseo(installDir) {
    try {
      // Install Paseo CLI globally via npm
      this.emit('progress', { stage: 'paseo', message: 'Installing Paseo CLI...', percent: 50 });
      await execAsync('npm install -g @getpaseo/cli');

      // Download and install Paseo desktop app if bundled
      const resourcesDir = path.join(__dirname, '../resources');

      if (this.platform === 'win32') {
        const installerPath = path.join(resourcesDir, 'paseo-setup.exe');
        try {
          await fs.access(installerPath);
          await this.runInstaller(installerPath, ['/S']);
        } catch (error) {
          // Installer not bundled, CLI only
        }
      } else if (this.platform === 'darwin') {
        const dmgPath = path.join(resourcesDir, 'paseo.dmg');
        try {
          await fs.access(dmgPath);
          await this.installDMG(dmgPath);
        } catch (error) {
          // DMG not bundled, CLI only
        }
      }
    } catch (error) {
      throw new Error(`Failed to install Paseo: ${error.message}`);
    }
  }

  async runInstaller(installerPath, args = []) {
    return new Promise((resolve, reject) => {
      const process = spawn(installerPath, args, {
        stdio: 'inherit'
      });

      process.on('exit', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Installer exited with code ${code}`));
        }
      });

      process.on('error', reject);
    });
  }

  async installDMG(dmgPath) {
    // Mount DMG and copy app to Applications
    const mountPoint = '/Volumes/Paseo';
    await execAsync(`hdiutil attach "${dmgPath}"`);

    try {
      await execAsync(`cp -R "${mountPoint}/Paseo.app" "/Applications/"`);
    } finally {
      await execAsync(`hdiutil detach "${mountPoint}"`);
    }
  }

  async setupEnvironment(installDir) {
    // Add to PATH if needed
    if (this.platform === 'win32') {
      // Windows: Add to user PATH
      const binDir = path.join(installDir, 'bin');
      await this.addToWindowsPath(binDir);
    } else {
      // macOS/Linux: Add to shell profile
      const binDir = path.join(installDir, 'bin');
      await this.addToShellProfile(binDir);
    }
  }

  async addToWindowsPath(directory) {
    // This would require registry modification or using setx
    // For now, we'll create a batch file to set the path
    const batchContent = `@echo off\nset PATH=%PATH%;${directory}`;
    const batchPath = path.join(directory, 'setup-path.bat');
    await fs.writeFile(batchPath, batchContent);
  }

  async addToShellProfile(directory) {
    const profilePath = path.join(os.homedir(), '.profile');
    const exportLine = `\nexport PATH="${directory}:$PATH"\n`;

    try {
      const content = await fs.readFile(profilePath, 'utf-8');
      if (!content.includes(directory)) {
        await fs.appendFile(profilePath, exportLine);
      }
    } catch (error) {
      // Profile doesn't exist, create it
      await fs.writeFile(profilePath, exportLine);
    }
  }

  async saveConfiguration(config) {
    const { baseUrl, authToken } = config;

    if (!baseUrl || !authToken) {
      throw new Error('Base URL and Auth Token are required');
    }

    const configDir = path.dirname(this.getClaudeConfigPath());
    await fs.mkdir(configDir, { recursive: true });

    const claudeConfig = {
      baseUrl,
      authToken,
      configuredAt: new Date().toISOString()
    };

    await fs.writeFile(
      this.getClaudeConfigPath(),
      JSON.stringify(claudeConfig, null, 2)
    );

    return true;
  }

  async testConfiguration(config) {
    const { baseUrl, authToken } = config;

    try {
      // Test the configuration by making a simple API call
      const fetch = require('node-fetch');
      const response = await fetch(`${baseUrl}/health`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        return { valid: true, message: 'Configuration is valid' };
      } else {
        return { valid: false, message: `Server returned ${response.status}` };
      }
    } catch (error) {
      return { valid: false, message: error.message };
    }
  }
}

module.exports = { InstallationManager };
