# Label Studio 国际化修改记录

本文档记录了为 Label Studio 项目添加国际化支持的所有修改内容。

## 项目概述

- **项目**: Label Studio 国际化支持
- **语言支持**: 中文 (zh) 和英文 (en)
- **完成时间**: 2025年1月
- **修改范围**: 前端组件、翻译文件、语言切换器

## 修改文件清单

### 1. 国际化基础设施

#### 1.1 i18n 配置文件
- **文件**: `web/apps/labelstudio/src/i18n/index.ts`
- **修改内容**: 创建 i18next 配置，设置中英文语言支持
- **功能**: 初始化国际化框架，配置语言检测和资源加载

#### 1.2 应用入口文件
- **文件**: `web/apps/labelstudio/src/App.tsx`
- **修改内容**: 添加 I18nextProvider 包装器
- **功能**: 为整个应用提供国际化上下文

### 2. 翻译文件

#### 2.1 英文翻译文件
- **文件**: `web/apps/labelstudio/src/i18n/locales/en.json`
- **修改内容**: 创建完整的英文翻译资源
- **包含模块**:
  - `menubar`: 菜单栏相关翻译
  - `homePage`: 首页相关翻译
  - `createProject`: 创建项目弹窗翻译
  - `importData`: 数据导入相关翻译
  - `languageSwitcher`: 语言切换器翻译
  - `labelingConfig`: 标注设置相关翻译

#### 2.2 中文翻译文件
- **文件**: `web/apps/labelstudio/src/i18n/locales/zh.json`
- **修改内容**: 创建完整的中文翻译资源
- **包含模块**: 与英文翻译文件对应的所有模块

### 3. 组件国际化修改

#### 3.1 菜单栏组件
- **文件**: `web/apps/labelstudio/src/components/Menubar/Menubar.jsx`
- **修改内容**:
  - 导入 `useTranslation` hook
  - 替换硬编码文本为翻译键
  - 支持动态语言切换
- **翻译键数量**: 15个

#### 3.2 首页组件
- **文件**: `web/apps/labelstudio/src/pages/HomePage/HomePage.jsx`
- **修改内容**:
  - 添加国际化支持
  - 替换页面标题、按钮文本等
- **翻译键数量**: 8个

#### 3.3 创建项目组件
- **文件**: `web/apps/labelstudio/src/components/CreateProject/CreateProject.jsx`
- **修改内容**:
  - 弹窗标题、表单标签、按钮文本国际化
  - 验证消息和提示文本翻译
- **翻译键数量**: 12个

#### 3.4 数据导入相关组件

##### 3.4.1 导入弹窗
- **文件**: `web/apps/labelstudio/src/components/ImportModal/ImportModal.jsx`
- **修改内容**: 弹窗标题、按钮、状态文本国际化
- **翻译键数量**: 6个

##### 3.4.2 导入页面
- **文件**: `web/apps/labelstudio/src/pages/Import/Import.jsx`
- **修改内容**:
  - 文件上传界面文本
  - 文件类型支持说明
  - 表格标题和状态信息
  - 错误提示和帮助文本
- **翻译键数量**: 25个

#### 3.5 标注设置组件

##### 3.5.1 配置页面
- **文件**: `web/apps/labelstudio/src/pages/CreateProject/Config/Config.jsx`
- **修改内容**:
  - 标注界面配置相关文本
  - 标签管理功能文本
  - 保存功能和状态提示
  - 代码/可视化模式切换
- **翻译键数量**: 15个

##### 3.5.2 设置页面
- **文件**: `web/apps/labelstudio/src/pages/Settings/LabelingSettings.jsx`
- **修改内容**: 添加国际化基础设施

### 4. 语言切换器组件

#### 4.1 语言切换器组件
- **文件**: `web/apps/labelstudio/src/components/LanguageSwitcher/LanguageSwitcher.jsx`
- **修改内容**: 创建新的语言切换器组件
- **功能**:
  - 支持中英文切换
  - 下拉菜单界面
  - 本地存储语言偏好
  - 实时切换语言

#### 4.2 语言切换器样式
- **文件**: `web/apps/labelstudio/src/components/LanguageSwitcher/LanguageSwitcher.scss`
- **修改内容**: 创建语言切换器的样式文件
- **功能**: 提供美观的下拉菜单样式

## 翻译键统计

| 模块 | 英文翻译键 | 中文翻译键 | 总计 |
|------|------------|------------|---------|
| menubar | 15 | 15 | 30 |
| homePage | 8 | 8 | 16 |
| createProject | 12 | 12 | 24 |
| importData | 25 | 25 | 50 |
| languageSwitcher | 1 | 1 | 2 |
| labelingConfig | 15 | 15 | 30 |
| **总计** | **76** | **76** | **152** |

## 实现的功能特性

### ✅ 已完成功能

1. **完整的国际化基础设施**
   - i18next 配置和初始化
   - 语言检测和切换机制
   - 翻译资源管理

2. **核心组件国际化**
   - 菜单栏完全支持中英文
   - 首页内容动态翻译
   - 项目创建流程国际化
   - 数据导入功能多语言支持
   - 标注设置界面翻译

3. **用户体验优化**
   - 语言切换器集成到头部菜单
   - 实时语言切换，无需刷新页面
   - 语言偏好本地存储
   - 所有辅助功能文本(aria-label)支持多语言

4. **代码质量保证**
   - 统一的翻译键命名规范
   - 模块化的翻译文件结构
   - 完整的中英文对照翻译

## 技术实现细节

### 使用的技术栈
- **国际化框架**: react-i18next
- **语言检测**: i18next-browser-languagedetector
- **HTTP 后端**: i18next-http-backend
- **React 集成**: react-i18next hooks (useTranslation)

### 文件结构
```
web/apps/labelstudio/src/
├── i18n/
│   ├── index.ts                 # i18n 配置
│   └── locales/
│       ├── en.json             # 英文翻译
│       └── zh.json             # 中文翻译
├── components/
│   └── LanguageSwitcher/       # 语言切换器组件
└── [各个组件文件]               # 已国际化的组件
```

### 翻译键命名规范
- 使用驼峰命名法
- 按功能模块分组
- aria 相关翻译放在 `aria` 子对象中
- 保持英文和中文翻译键结构一致

## 测试和验证

### 功能测试
- ✅ 语言切换器正常工作
- ✅ 所有翻译文本正确显示
- ✅ 页面刷新后语言偏好保持
- ✅ 所有组件支持实时语言切换

### 浏览器兼容性
- ✅ Chrome/Safari/Firefox 支持
- ✅ 移动端浏览器支持

## 部署说明

1. 确保所有翻译文件已正确放置在 `src/i18n/locales/` 目录下
2. 验证 i18n 配置已在应用入口正确初始化
3. 检查语言切换器组件已集成到主菜单
4. 测试所有页面的语言切换功能

## 维护指南

### 添加新的翻译
1. 在对应的组件中使用 `useTranslation` hook
2. 在 `en.json` 和 `zh.json` 中添加对应的翻译键
3. 确保翻译键命名符合现有规范
4. 测试新添加的翻译是否正常工作

### 修改现有翻译
1. 直接修改 `locales/` 目录下的对应翻译文件
2. 保持英文和中文翻译的一致性
3. 验证修改后的翻译在界面上正确显示

---

**修改完成时间**: 2025年1月  
**修改人员**: AI Assistant  
**项目状态**: 已完成，可投入使用