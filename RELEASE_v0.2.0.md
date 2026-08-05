# 🎉 HiAlex v0.2.0 - 集成式安装体验

## 重大更新：Claude CLI 集成到 Paseo 

**发布日期**: 2026-08-05  
**下载地址**: https://github.com/bandusix/HiAlex/releases/tag/v0.2.0

---

## 🚀 主要变化

### ✨ 全新的集成式安装流程

之前的版本：
- ❌ 需要选择安装哪些组件（Claude CLI / Paseo）
- ❌ 用户需要理解两者的关系
- ❌ 安装后需要手动配置集成

**v0.2.0 新方式：**
- ✅ **一体化安装** - 不再分离组件选择
- ✅ **自动集成** - Claude CLI 自动配置为 Paseo 的默认 provider
- ✅ **即开即用** - 安装完成后 Claude 已经在 Paseo 中可用
- ✅ **简化流程** - 用户无需理解技术细节

---

## 🎯 新的安装流程

### 1. 欢迎界面
介绍 HiAlex 将安装 **Paseo + 集成的 Claude CLI**

### 2. 安装选项
显示将安装的内容：
- ✓ Paseo CLI 和桌面应用
- ✓ Claude CLI（集成 provider）
- ✓ 自动配置
- ✓ 系统 PATH 设置

### 3. 配置 Claude API
配置 Claude CLI 认证信息（将被 Paseo 使用）

### 4. 完成
Paseo 已经配置好 Claude CLI，可以直接使用！

---

## 📦 下载

### Windows
- **文件名**: `HiAlex-Setup-0.2.0.exe`
- **架构**: x64
- **大小**: ~150MB

### macOS
- **文件名**: `HiAlex-0.2.0-arm64.dmg` (Apple Silicon)
- **文件名**: `HiAlex-0.2.0-x64.dmg` (Intel)
- **大小**: ~140MB

---

## 🔧 技术细节

### 安装过程

1. **安装 Claude CLI** → 作为 Paseo 的基础 provider
2. **安装 Paseo** → CLI 和桌面应用
3. **自动配置集成** → 在 Paseo 配置文件中设置 Claude CLI
4. **设置默认 provider** → Claude 成为默认的 AI provider
5. **配置环境变量** → 添加到系统 PATH

### Paseo 配置示例

安装后，Paseo 的配置文件会自动包含：

```json
{
  "providers": {
    "claude": {
      "name": "Claude Code",
      "type": "claude-cli",
      "enabled": true,
      "command": "claude",
      "installedBy": "HiAlex",
      "installedAt": "2026-08-05T..."
    }
  },
  "defaultProvider": "claude"
}
```

---

## 🎨 界面改进

### 更清晰的信息呈现

**欢迎屏幕**:
- 明确说明安装 "Paseo with integrated Claude CLI"
- 强调无缝集成的优势

**安装屏幕**:
- 显示完整的安装清单
- 移除了令人困惑的组件选择框

**配置屏幕**:
- 更清晰的标签："Claude CLI Configuration"
- 说明此配置将被 Paseo 使用

**完成屏幕**:
- 强调 Claude CLI 已集成
- 提示用户可以直接使用 Paseo

---

## 📊 与之前版本对比

| 特性 | v0.1.x | v0.2.0 |
|------|--------|--------|
| 组件选择 | ✓ 需要选择 | ✗ 自动全装 |
| 安装复杂度 | 中等 | **简单** |
| 配置集成 | 手动 | **自动** |
| 用户体验 | 需要理解技术 | **即开即用** |
| 默认 provider | 需要设置 | **自动配置** |

---

## 🚀 使用方法

### 安装后立即使用

```bash
# 启动 Paseo
paseo

# 或者启动桌面应用
# Windows: 开始菜单 → HiAlex → Paseo
# macOS: 应用程序 → Paseo
```

Claude CLI 已经配置为默认 provider，无需额外设置！

### 创建第一个 Agent

```bash
# Paseo 会自动使用 Claude CLI
paseo create-agent "My First Agent"

# 开始编码
paseo run "Help me write a Python script"
```

---

## 🐛 修复和改进

### 修复
- 继承 v0.1.1 的所有修复（electron-store 依赖问题）

### 改进
- ✅ 简化的用户界面
- ✅ 更清晰的安装流程
- ✅ 自动配置 Paseo + Claude 集成
- ✅ 减少用户决策点
- ✅ 更好的错误提示

---

## 🔄 从旧版本升级

如果你已经安装了 v0.1.x：

1. **卸载旧版本**（可选）
2. **下载 v0.2.0**
3. **运行新安装程序**
4. **重新配置 API 密钥**

新版本会自动检测并处理现有安装。

---

## 📝 已知限制

- ⚠️ **未签名**: 安装包未经代码签名
  - Windows: 需要点击"更多信息" → "仍要运行"
  - macOS: 需要右键 → "打开"

- 📦 **离线安装**: 需要 npm 来安装 Paseo CLI
  - 确保有网络连接或预装 Node.js/npm

---

## 🔮 路线图

### v0.3.0 计划
- [ ] 代码签名（Windows 和 macOS）
- [ ] 完全离线安装支持
- [ ] 多语言界面（中文/英文）
- [ ] 安装后自动启动 Paseo

### 未来版本
- [ ] Linux 支持
- [ ] 自动更新功能
- [ ] 配置备份和恢复

---

## 🙏 致谢

感谢 [Paseo](https://github.com/getpaseo/paseo) 团队提供优秀的多 agent 平台！

---

## 📞 反馈

- **Bug 报告**: https://github.com/bandusix/HiAlex/issues
- **功能建议**: https://github.com/bandusix/HiAlex/discussions
- **文档**: https://github.com/bandusix/HiAlex/blob/main/QUICKSTART.md

---

## 📈 更新日志

### v0.2.0 (2026-08-05)
- **Major**: Claude CLI 集成到 Paseo 安装流程
- **Changed**: 移除组件选择，统一安装体验
- **Added**: 自动配置 Paseo 使用 Claude CLI
- **Added**: 自动设置 Claude 为默认 provider
- **Improved**: 简化的用户界面和流程
- **Improved**: 更清晰的安装提示信息

### v0.1.1 (2026-08-05)
- **Fixed**: Windows 上的 electron-store 错误
- **Changed**: 使用 Node.js fs 替代外部依赖

### v0.1.0 (2026-08-05)
- **Initial**: 首次发布

---

**⭐ 如果你觉得 HiAlex 有用，请给我们一个 Star！**

**下载地址**: https://github.com/bandusix/HiAlex/releases/tag/v0.2.0
