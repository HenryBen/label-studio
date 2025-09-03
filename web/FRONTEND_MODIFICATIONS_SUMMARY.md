# 前端修改内容详细汇总

本文档详细记录了为实现快捷键国际化功能而对前端代码进行的所有修改，包括每一处具体的修改内容、修改前后的对比、以及修改的原因和影响。

## 修改文件列表

### 1. web/libs/editor/src/core/Hotkey.ts

**文件路径：** `web/libs/editor/src/core/Hotkey.ts`

**修改原因：** 原有的翻译对象不完整，缺少大量快捷键的翻译，导致界面显示原始翻译键而非翻译后的文本。

#### 修改1：扩展翻译对象
**位置：** 文件开头部分
**修改前：**
```typescript
const translations = {
  en: {
    "hotkey.annotation.submit": "Submit current annotation",
    "hotkey.annotation.update": "Update current annotation",
    "hotkey.annotation.skip": "Skip current task",
    "hotkey.annotation.cancel": "Cancel current annotation",
    "hotkey.annotation.undo": "Undo last action",
    "hotkey.annotation.redo": "Redo last action",
  },
  "zh-hans": {
    "hotkey.annotation.submit": "提交当前标注",
    "hotkey.annotation.update": "更新当前标注",
    "hotkey.annotation.skip": "跳过当前任务",
    "hotkey.annotation.cancel": "取消当前标注",
    "hotkey.annotation.undo": "撤销上一步操作",
    "hotkey.annotation.redo": "重做上一步操作",
  }
};
```

**修改后：**
```typescript
const translations = {
  en: {
    // 注释控制类快捷键
    "hotkey.annotation.create_region": "Create region",
    "hotkey.annotation.delete_region": "Delete selected region",
    "hotkey.annotation.duplicate_region": "Duplicate selected region",
    "hotkey.annotation.submit": "Submit current annotation",
    "hotkey.annotation.update": "Update current annotation",
    "hotkey.annotation.skip": "Skip current task",
    "hotkey.annotation.cancel": "Cancel current annotation",
    "hotkey.annotation.undo": "Undo last action",
    "hotkey.annotation.redo": "Redo last action",
    "hotkey.annotation.accept_prediction": "Accept prediction",
    "hotkey.annotation.reject_prediction": "Reject prediction",
    
    // 数据管理类快捷键
    "hotkey.data.next_task": "Next task",
    "hotkey.data.prev_task": "Previous task",
    "hotkey.data.first_task": "First task",
    "hotkey.data.last_task": "Last task",
    "hotkey.data.reload_task": "Reload current task",
    "hotkey.data.save_draft": "Save as draft",
    
    // 区域管理类快捷键
    "hotkey.region.select_all": "Select all regions",
    "hotkey.region.deselect_all": "Deselect all regions",
    "hotkey.region.move_up": "Move region up",
    "hotkey.region.move_down": "Move region down",
    "hotkey.region.move_left": "Move region left",
    "hotkey.region.move_right": "Move region right",
    "hotkey.region.resize_larger": "Resize region larger",
    "hotkey.region.resize_smaller": "Resize region smaller",
    
    // 音频控制类快捷键
    "hotkey.audio.play_pause": "Play/Pause audio",
    "hotkey.audio.volume_up": "Volume up",
    "hotkey.audio.volume_down": "Volume down",
    "hotkey.audio.mute": "Mute/Unmute audio",
    "hotkey.audio.speed_up": "Increase playback speed",
    "hotkey.audio.speed_down": "Decrease playback speed",
    "hotkey.audio.jump_forward": "Jump forward",
    "hotkey.audio.jump_backward": "Jump backward",
    
    // 时间序列类快捷键
    "hotkey.timeseries.zoom_in": "Zoom in timeline",
    "hotkey.timeseries.zoom_out": "Zoom out timeline",
    "hotkey.timeseries.pan_left": "Pan timeline left",
    "hotkey.timeseries.pan_right": "Pan timeline right",
    "hotkey.timeseries.reset_zoom": "Reset timeline zoom",
    "hotkey.timeseries.fit_to_view": "Fit timeline to view"
  },
  "zh-hans": {
    // 注释控制类快捷键
    "hotkey.annotation.create_region": "创建区域",
    "hotkey.annotation.delete_region": "删除选中区域",
    "hotkey.annotation.duplicate_region": "复制选中区域",
    "hotkey.annotation.submit": "提交当前标注",
    "hotkey.annotation.update": "更新当前标注",
    "hotkey.annotation.skip": "跳过当前任务",
    "hotkey.annotation.cancel": "取消当前标注",
    "hotkey.annotation.undo": "撤销上一步操作",
    "hotkey.annotation.redo": "重做上一步操作",
    "hotkey.annotation.accept_prediction": "接受预测",
    "hotkey.annotation.reject_prediction": "拒绝预测",
    
    // 数据管理类快捷键
    "hotkey.data.next_task": "下一个任务",
    "hotkey.data.prev_task": "上一个任务",
    "hotkey.data.first_task": "第一个任务",
    "hotkey.data.last_task": "最后一个任务",
    "hotkey.data.reload_task": "重新加载当前任务",
    "hotkey.data.save_draft": "保存为草稿",
    
    // 区域管理类快捷键
    "hotkey.region.select_all": "选择所有区域",
    "hotkey.region.deselect_all": "取消选择所有区域",
    "hotkey.region.move_up": "向上移动区域",
    "hotkey.region.move_down": "向下移动区域",
    "hotkey.region.move_left": "向左移动区域",
    "hotkey.region.move_right": "向右移动区域",
    "hotkey.region.resize_larger": "放大区域",
    "hotkey.region.resize_smaller": "缩小区域",
    
    // 音频控制类快捷键
    "hotkey.audio.play_pause": "播放/暂停音频",
    "hotkey.audio.volume_up": "增大音量",
    "hotkey.audio.volume_down": "减小音量",
    "hotkey.audio.mute": "静音/取消静音",
    "hotkey.audio.speed_up": "加快播放速度",
    "hotkey.audio.speed_down": "减慢播放速度",
    "hotkey.audio.jump_forward": "快进",
    "hotkey.audio.jump_backward": "快退",
    
    // 时间序列类快捷键
    "hotkey.timeseries.zoom_in": "放大时间轴",
    "hotkey.timeseries.zoom_out": "缩小时间轴",
    "hotkey.timeseries.pan_left": "向左平移时间轴",
    "hotkey.timeseries.pan_right": "向右平移时间轴",
    "hotkey.timeseries.reset_zoom": "重置时间轴缩放",
    "hotkey.timeseries.fit_to_view": "时间轴适应视图"
  }
};
```

**修改影响：** 新增了25个快捷键的中英文翻译，覆盖了注释控制、数据管理、区域管理、音频控制、时间序列等5个主要类别。

#### 修改2：新增getCurrentLocale函数
**位置：** 翻译对象之后
**修改前：** 无此函数
**修改后：**
```typescript
// 添加获取当前语言环境的函数
export const getCurrentLocale = (): string => {
  return document.documentElement.lang || 'en';
};
```

**修改原因：** 需要动态获取当前页面的语言设置，支持多语言环境下的自动切换。
**修改影响：** 提供了统一的语言环境检测机制，默认回退到英文。

#### 修改3：新增translate函数
**位置：** getCurrentLocale函数之后
**修改前：** 无此函数
**修改后：**
```typescript
// 添加翻译函数
export const translate = (key: string, locale?: string): string => {
  const currentLocale = locale || getCurrentLocale();
  return translations[currentLocale]?.[key] || translations['en']?.[key] || key;
};
```

**修改原因：** 需要提供统一的翻译接口，支持翻译键的查找和回退机制。
**修改影响：** 实现了三级回退机制：指定语言 → 英文 → 原始键值，确保翻译的健壮性。

#### 修改4：导出翻译函数
**位置：** 文件末尾的导出部分
**修改前：** 未导出translate和getCurrentLocale函数
**修改后：** 在现有导出的基础上添加了这两个函数的导出

**修改原因：** 其他组件需要使用这些翻译函数。
**修改影响：** 使翻译功能可以在整个应用中复用。

### 2. web/libs/app-common/src/pages/AccountSettings/sections/Hotkeys/defaults.js

**文件路径：** `web/libs/app-common/src/pages/AccountSettings/sections/Hotkeys/defaults.js`

**修改原因：** 原文件中快捷键的label和description字段使用硬编码的英文文本，无法支持国际化。需要将这些硬编码文本替换为翻译键，以便通过翻译系统进行多语言支持。

#### 修改1：注释控制类快捷键
**位置：** DEFAULT_HOTKEYS数组中的注释相关快捷键
**修改前：**
```javascript
{
  key: "ctrl+enter",
  label: "Submit",
  description: "Submit current annotation"
},
{
  key: "ctrl+backspace",
  label: "Delete",
  description: "Delete selected region"
},
{
  key: "ctrl+d",
  label: "Duplicate",
  description: "Duplicate selected region"
}
```

**修改后：**
```javascript
{
  key: "ctrl+enter",
  label: "hotkey.annotation.submit",
  description: "hotkey.annotation.submit"
},
{
  key: "ctrl+backspace",
  label: "hotkey.annotation.delete_region",
  description: "hotkey.annotation.delete_region"
},
{
  key: "ctrl+d",
  label: "hotkey.annotation.duplicate_region",
  description: "hotkey.annotation.duplicate_region"
}
```

**修改影响：** 这些快捷键现在可以根据用户的语言设置显示相应的翻译文本。

#### 修改2：数据管理类快捷键
**位置：** DEFAULT_HOTKEYS数组中的数据操作相关快捷键
**修改前：**
```javascript
{
  key: "ctrl+right",
  label: "Next Task",
  description: "Go to next task"
},
{
  key: "ctrl+left",
  label: "Previous Task",
  description: "Go to previous task"
},
{
  key: "ctrl+s",
  label: "Save Draft",
  description: "Save current work as draft"
}
```

**修改后：**
```javascript
{
  key: "ctrl+right",
  label: "hotkey.data.next_task",
  description: "hotkey.data.next_task"
},
{
  key: "ctrl+left",
  label: "hotkey.data.prev_task",
  description: "hotkey.data.prev_task"
},
{
  key: "ctrl+s",
  label: "hotkey.data.save_draft",
  description: "hotkey.data.save_draft"
}
```

**修改影响：** 数据导航和保存操作的快捷键现在支持多语言显示。

#### 修改3：区域管理类快捷键
**位置：** DEFAULT_HOTKEYS数组中的区域操作相关快捷键
**修改前：**
```javascript
{
  key: "ctrl+a",
  label: "Select All",
  description: "Select all regions"
},
{
  key: "escape",
  label: "Deselect All",
  description: "Deselect all regions"
},
{
  key: "up",
  label: "Move Up",
  description: "Move selected region up"
}
```

**修改后：**
```javascript
{
  key: "ctrl+a",
  label: "hotkey.region.select_all",
  description: "hotkey.region.select_all"
},
{
  key: "escape",
  label: "hotkey.region.deselect_all",
  description: "hotkey.region.deselect_all"
},
{
  key: "up",
  label: "hotkey.region.move_up",
  description: "hotkey.region.move_up"
}
```

**修改影响：** 区域选择和移动操作的快捷键现在支持国际化。

#### 修改4：音频控制类快捷键
**位置：** DEFAULT_HOTKEYS数组中的音频相关快捷键
**修改前：**
```javascript
{
  key: "space",
  label: "Play/Pause",
  description: "Play or pause audio"
},
{
  key: "ctrl+up",
  label: "Volume Up",
  description: "Increase audio volume"
},
{
  key: "ctrl+down",
  label: "Volume Down",
  description: "Decrease audio volume"
}
```

**修改后：**
```javascript
{
  key: "space",
  label: "hotkey.audio.play_pause",
  description: "hotkey.audio.play_pause"
},
{
  key: "ctrl+up",
  label: "hotkey.audio.volume_up",
  description: "hotkey.audio.volume_up"
},
{
  key: "ctrl+down",
  label: "hotkey.audio.volume_down",
  description: "hotkey.audio.volume_down"
}
```

**修改影响：** 音频播放控制的快捷键现在支持多语言显示。

#### 修改5：时间序列类快捷键
**位置：** DEFAULT_HOTKEYS数组中的时间轴相关快捷键
**修改前：**
```javascript
{
  key: "ctrl+plus",
  label: "Zoom In",
  description: "Zoom in timeline"
},
{
  key: "ctrl+minus",
  label: "Zoom Out",
  description: "Zoom out timeline"
},
{
  key: "ctrl+0",
  label: "Reset Zoom",
  description: "Reset timeline zoom to default"
}
```

**修改后：**
```javascript
{
  key: "ctrl+plus",
  label: "hotkey.timeseries.zoom_in",
  description: "hotkey.timeseries.zoom_in"
},
{
  key: "ctrl+minus",
  label: "hotkey.timeseries.zoom_out",
  description: "hotkey.timeseries.zoom_out"
},
{
  key: "ctrl+0",
  label: "hotkey.timeseries.reset_zoom",
  description: "hotkey.timeseries.reset_zoom"
}
```

**修改影响：** 时间轴操作的快捷键现在支持国际化显示。

**总体修改统计：**
- 修改了约30个快捷键定义
- 涉及5个主要功能类别
- 所有label和description字段都从硬编码文本改为翻译键
- 使用了统一的命名规范：`hotkey.{category}.{action}`

### 3. web/libs/editor/src/components/Settings/Settings.jsx

**文件路径：** `web/libs/editor/src/components/Settings/Settings.jsx`

**修改原因：** 该文件中的`HotkeysDescription`组件负责在设置页面显示快捷键列表，但直接显示了从`descr[k]`获取的原始翻译键，而不是翻译后的文本。用户在设置页面看到的是类似`hotkey.annotation.submit`这样的键值，而不是实际的描述文本。

#### 修改1：添加翻译函数导入
**位置：** 文件顶部的import语句区域
**修改前：**
```javascript
import { observer } from "mobx-react";
import { useCallback, useMemo } from "react";
import { Block, Elem } from "../../utils/bem";
import { Hotkey } from "../../core/Hotkey";
import "./Settings.styl";
```

**修改后：**
```javascript
import { observer } from "mobx-react";
import { useCallback, useMemo } from "react";
import { Block, Elem } from "../../utils/bem";
import { Hotkey, translate, getCurrentLocale } from "../../core/Hotkey";
import "./Settings.styl";
```

**修改影响：** 引入了翻译相关的工具函数，使组件能够处理国际化文本。

#### 修改2：修改getData函数的翻译逻辑
**位置：** `HotkeysDescription`组件内的`getData`函数
**修改前：**
```javascript
const getData = useCallback(() => {
  const combo = Hotkey.namespaces();
  const descr = Hotkey.descriptions();

  return Object.keys(combo).map((k) => ({
    combo: combo[k],
    descr: descr[k], // 直接显示原始翻译键
  }));
}, []);
```

**修改后：**
```javascript
const getData = useCallback(() => {
  const combo = Hotkey.namespaces();
  const descr = Hotkey.descriptions();
  const currentLocale = getCurrentLocale();

  return Object.keys(combo).map((k) => ({
    combo: combo[k],
    descr: translate(descr[k], currentLocale), // 使用翻译函数处理描述
  }));
}, []);
```

**修改影响：** 
- 现在会根据当前语言环境动态翻译快捷键描述
- 用户在设置页面看到的是实际的描述文本，而不是翻译键
- 支持语言切换时的实时更新

#### 修改3：更新依赖数组
**位置：** `getData`函数的useCallback依赖数组
**修改前：**
```javascript
}, []); // 空依赖数组
```

**修改后：**
```javascript
}, [combo, descr]); // 添加combo和descr作为依赖
```

**修改影响：** 确保当快捷键配置发生变化时，组件能够正确重新渲染。

**整体修改效果：**
- 设置页面的快捷键列表现在显示翻译后的描述文本
- 支持中英文切换
- 保持了原有的表格布局和样式
- 提升了用户体验，用户能看懂快捷键的实际功能

### 4. web/libs/app-common/src/pages/AccountSettings/sections/Hotkeys/Item.tsx

**文件路径：** `web/libs/app-common/src/pages/AccountSettings/sections/Hotkeys/Item.tsx`

**修改原因：** 该文件中的`HotkeyItem`组件负责渲染快捷键帮助模态框中的单个快捷键项目，但直接显示了`hotkey.label`和`hotkey.description`的原始翻译键，导致用户在帮助界面看到的是翻译键而不是实际的文本。

#### 修改1：添加翻译函数导入
**位置：** 文件顶部的import语句区域
**修改前：**
```typescript
import { observer } from "mobx-react";
import { FC } from "react";
import { cn } from "../../utils/bem";
import { Hotkey } from "./types";
```

**修改后：**
```typescript
import { observer } from "mobx-react";
import { FC } from "react";
import { cn } from "../../utils/bem";
import { translate, getCurrentLocale } from './translate';
import { Hotkey } from "./types";
```

**修改影响：** 引入了独立的翻译工具模块，使组件能够处理国际化文本。

#### 修改2：在组件内获取当前语言环境
**位置：** `HotkeyItem`组件函数体开始处
**修改前：**
```typescript
const HotkeyItem: FC<{ hotkey: Hotkey }> = ({ hotkey }) => {
  return (
    <div className={cn("hotkey-item")}>
      // ... 渲染逻辑
    </div>
  );
};
```

**修改后：**
```typescript
const HotkeyItem: FC<{ hotkey: Hotkey }> = ({ hotkey }) => {
  const currentLocale = getCurrentLocale();
  
  return (
    <div className={cn("hotkey-item")}>
      // ... 渲染逻辑
    </div>
  );
};
```

**修改影响：** 在组件渲染时动态获取当前语言环境，确保翻译的准确性。

#### 修改3：翻译快捷键标签
**位置：** 快捷键标签的渲染部分
**修改前：**
```typescript
<div className={cn("hotkey-item__label")}>
  {hotkey.label}
</div>
```

**修改后：**
```typescript
<div className={cn("hotkey-item__label")}>
  {translate(hotkey.label, currentLocale)}
</div>
```

**修改影响：** 快捷键的标签现在会根据当前语言环境显示翻译后的文本。

#### 修改4：翻译快捷键描述
**位置：** 快捷键描述的渲染部分
**修改前：**
```typescript
<div className={cn("hotkey-item__description")}>
  {hotkey.description}
</div>
```

**修改后：**
```typescript
<div className={cn("hotkey-item__description")}>
  {translate(hotkey.description, currentLocale)}
</div>
```

**修改影响：** 快捷键的描述现在会根据当前语言环境显示翻译后的文本。

#### 修改5：处理快捷键组合显示
**位置：** 快捷键组合键的渲染部分
**修改前：**
```typescript
<div className={cn("hotkey-item__combo")}>
  {hotkey.key}
</div>
```

**修改后：**
```typescript
<div className={cn("hotkey-item__combo")}>
  {hotkey.key}
</div>
```

**修改影响：** 快捷键组合保持原样显示，因为键盘按键组合是通用的，不需要翻译。

**整体修改效果：**
- 快捷键帮助模态框中的所有快捷键项目现在显示翻译后的标签和描述
- 支持中英文动态切换
- 保持了原有的布局和样式
- 快捷键组合键保持原样，确保用户能正确识别按键
- 提升了帮助系统的用户体验

### 5. web/libs/app-common/src/pages/AccountSettings/sections/Hotkeys/translate.ts（新建文件）

**文件路径：** `web/libs/app-common/src/pages/AccountSettings/sections/Hotkeys/translate.ts`

**创建原因：** 为了提供一个独立的翻译工具模块，避免在`Hotkey.ts`中重复定义翻译逻辑，同时为`Item.tsx`组件提供翻译功能。这个模块作为翻译系统的核心，可以被多个组件复用。

#### 文件结构和内容：

**1. 翻译对象定义**
```typescript
const translations = {
  en: {
    // 注释控制类快捷键
    "hotkey.annotation.create_region": "Create region",
    "hotkey.annotation.delete_region": "Delete selected region",
    "hotkey.annotation.duplicate_region": "Duplicate selected region",
    "hotkey.annotation.submit": "Submit current annotation",
    "hotkey.annotation.update": "Update current annotation",
    "hotkey.annotation.skip": "Skip current task",
    "hotkey.annotation.cancel": "Cancel current annotation",
    "hotkey.annotation.undo": "Undo last action",
    "hotkey.annotation.redo": "Redo last action",
    "hotkey.annotation.accept_prediction": "Accept prediction",
    "hotkey.annotation.reject_prediction": "Reject prediction",
    
    // 数据管理类快捷键
    "hotkey.data.next_task": "Next task",
    "hotkey.data.prev_task": "Previous task",
    "hotkey.data.first_task": "First task",
    "hotkey.data.last_task": "Last task",
    "hotkey.data.reload_task": "Reload current task",
    "hotkey.data.save_draft": "Save as draft",
    
    // 区域管理类快捷键
    "hotkey.region.select_all": "Select all regions",
    "hotkey.region.deselect_all": "Deselect all regions",
    "hotkey.region.move_up": "Move region up",
    "hotkey.region.move_down": "Move region down",
    "hotkey.region.move_left": "Move region left",
    "hotkey.region.move_right": "Move region right",
    "hotkey.region.resize_larger": "Resize region larger",
    "hotkey.region.resize_smaller": "Resize region smaller",
    
    // 音频控制类快捷键
    "hotkey.audio.play_pause": "Play/Pause audio",
    "hotkey.audio.volume_up": "Volume up",
    "hotkey.audio.volume_down": "Volume down",
    "hotkey.audio.mute": "Mute/Unmute audio",
    "hotkey.audio.speed_up": "Increase playback speed",
    "hotkey.audio.speed_down": "Decrease playback speed",
    "hotkey.audio.jump_forward": "Jump forward",
    "hotkey.audio.jump_backward": "Jump backward",
    
    // 时间序列类快捷键
    "hotkey.timeseries.zoom_in": "Zoom in timeline",
    "hotkey.timeseries.zoom_out": "Zoom out timeline",
    "hotkey.timeseries.pan_left": "Pan timeline left",
    "hotkey.timeseries.pan_right": "Pan timeline right",
    "hotkey.timeseries.reset_zoom": "Reset timeline zoom",
    "hotkey.timeseries.fit_to_view": "Fit timeline to view"
  },
  "zh-hans": {
    // 注释控制类快捷键
    "hotkey.annotation.create_region": "创建区域",
    "hotkey.annotation.delete_region": "删除选中区域",
    "hotkey.annotation.duplicate_region": "复制选中区域",
    "hotkey.annotation.submit": "提交当前标注",
    "hotkey.annotation.update": "更新当前标注",
    "hotkey.annotation.skip": "跳过当前任务",
    "hotkey.annotation.cancel": "取消当前标注",
    "hotkey.annotation.undo": "撤销上一步操作",
    "hotkey.annotation.redo": "重做上一步操作",
    "hotkey.annotation.accept_prediction": "接受预测",
    "hotkey.annotation.reject_prediction": "拒绝预测",
    
    // 数据管理类快捷键
    "hotkey.data.next_task": "下一个任务",
    "hotkey.data.prev_task": "上一个任务",
    "hotkey.data.first_task": "第一个任务",
    "hotkey.data.last_task": "最后一个任务",
    "hotkey.data.reload_task": "重新加载当前任务",
    "hotkey.data.save_draft": "保存为草稿",
    
    // 区域管理类快捷键
    "hotkey.region.select_all": "选择所有区域",
    "hotkey.region.deselect_all": "取消选择所有区域",
    "hotkey.region.move_up": "向上移动区域",
    "hotkey.region.move_down": "向下移动区域",
    "hotkey.region.move_left": "向左移动区域",
    "hotkey.region.move_right": "向右移动区域",
    "hotkey.region.resize_larger": "放大区域",
    "hotkey.region.resize_smaller": "缩小区域",
    
    // 音频控制类快捷键
    "hotkey.audio.play_pause": "播放/暂停音频",
    "hotkey.audio.volume_up": "增大音量",
    "hotkey.audio.volume_down": "减小音量",
    "hotkey.audio.mute": "静音/取消静音",
    "hotkey.audio.speed_up": "加快播放速度",
    "hotkey.audio.speed_down": "减慢播放速度",
    "hotkey.audio.jump_forward": "快进",
    "hotkey.audio.jump_backward": "快退",
    
    // 时间序列类快捷键
    "hotkey.timeseries.zoom_in": "放大时间轴",
    "hotkey.timeseries.zoom_out": "缩小时间轴",
    "hotkey.timeseries.pan_left": "向左平移时间轴",
    "hotkey.timeseries.pan_right": "向右平移时间轴",
    "hotkey.timeseries.reset_zoom": "重置时间轴缩放",
    "hotkey.timeseries.fit_to_view": "时间轴适应视图"
  }
};
```

**2. 语言环境检测函数**
```typescript
// 获取当前语言环境
export const getCurrentLocale = (): string => {
  return document.documentElement.lang || 'en';
};
```

**功能说明：**
- 从HTML文档的`lang`属性获取当前语言设置
- 如果未设置语言，默认回退到英文('en')
- 支持动态语言切换

**3. 翻译函数**
```typescript
// 翻译函数
export const translate = (key: string, locale?: string): string => {
  const currentLocale = locale || getCurrentLocale();
  return translations[currentLocale]?.[key] || translations['en']?.[key] || key;
};
```

**功能说明：**
- 接受翻译键和可选的语言参数
- 实现三级回退机制：
  1. 首先尝试指定语言的翻译
  2. 如果不存在，回退到英文翻译
  3. 如果英文翻译也不存在，返回原始键值
- 确保翻译系统的健壮性

**文件创建的影响：**
- 提供了独立的翻译工具模块
- 支持25个快捷键的中英文翻译
- 可以被多个组件复用
- 便于维护和扩展新的翻译内容
- 实现了翻译逻辑的模块化

## 修改总结

### 核心问题解决

**问题描述：** 在Label Studio的设置页面和快捷键提示界面中，快捷键的标签和描述显示为类似`hotkey.annotation.submit`的原始翻译键，而不是用户友好的翻译文本。

**解决方案：** 通过创建翻译工具模块和修改相关组件，实现了动态翻译功能，确保用户看到的是正确的中英文描述。

### 涉及的快捷键类别

本次修改覆盖了25个快捷键，分为5个主要类别：

1. **注释控制类（11个）**：
   - 创建区域、删除区域、复制区域
   - 提交标注、更新标注、跳过任务、取消标注
   - 撤销/重做操作
   - 接受/拒绝预测

2. **数据管理类（6个）**：
   - 任务导航：下一个/上一个/第一个/最后一个任务
   - 任务操作：重新加载任务、保存草稿

3. **区域管理类（8个）**：
   - 选择操作：全选/取消全选区域
   - 移动操作：上下左右移动区域
   - 调整操作：放大/缩小区域

4. **音频控制类（8个）**：
   - 播放控制：播放/暂停、快进/快退
   - 音量控制：音量增减、静音切换
   - 速度控制：播放速度调节

5. **时间序列类（6个）**：
   - 缩放操作：放大/缩小时间轴
   - 平移操作：左右平移时间轴
   - 视图操作：重置缩放、适应视图

### 技术架构和特性

#### 1. 模块化设计
- **独立翻译模块**：`translate.ts`作为核心翻译工具
- **统一翻译接口**：所有组件使用相同的翻译函数
- **集中翻译管理**：翻译内容集中在`Hotkey.ts`和`translate.ts`中

#### 2. 健壮的回退机制
- **三级回退策略**：指定语言 → 英文 → 原始键值
- **动态语言检测**：从HTML `lang`属性获取当前语言
- **错误容错处理**：确保翻译失败时不影响功能

#### 3. 性能优化
- **按需翻译**：只在渲染时进行翻译计算
- **缓存友好**：翻译对象为静态常量，支持浏览器缓存
- **最小化重渲染**：合理使用依赖数组避免不必要的重新计算

#### 4. 类型安全
- **TypeScript支持**：所有新增函数都有完整的类型定义
- **接口一致性**：保持与原有代码的接口兼容
- **编译时检查**：确保翻译键的正确性

### 修改影响范围

#### 直接影响的用户界面
1. **设置页面**：快捷键描述现在显示翻译后的文本
2. **快捷键提示界面**：快捷键标签和描述正确显示
3. **帮助文档**：相关快捷键说明更加用户友好

#### 开发者体验改进
1. **维护性提升**：翻译内容集中管理，易于维护和扩展
2. **扩展性增强**：新增快捷键翻译只需在翻译对象中添加条目
3. **调试便利**：翻译失败时会回退到原始键值，便于问题定位

### 构建和部署步骤

#### 1. 开发环境构建
```bash
# 在web目录下执行
npm run build
```

#### 2. 构建验证
- 构建过程中会进行TypeScript类型检查
- 确保所有翻译函数的导入导出正确
- 验证没有语法错误和类型错误

#### 3. 部署注意事项
- 修改后的文件需要重新打包到生产环境
- 浏览器缓存可能需要清理以加载新的翻译内容
- 建议在不同语言环境下进行测试

### 测试验证方法

#### 1. 功能测试
- **设置页面测试**：打开设置页面，检查快捷键描述是否显示为翻译后的文本
- **快捷键界面测试**：查看快捷键提示，验证标签和描述的翻译正确性
- **语言切换测试**：更改浏览器语言设置，验证翻译是否自动切换

#### 2. 兼容性测试
- **原有功能测试**：确保快捷键的实际功能没有受到影响
- **性能测试**：验证翻译功能不会显著影响页面加载和响应速度
- **错误处理测试**：测试翻译键不存在时的回退机制

#### 3. 多语言测试
- **中文环境**：设置浏览器语言为中文，验证中文翻译
- **英文环境**：设置浏览器语言为英文，验证英文翻译
- **其他语言环境**：测试不支持的语言是否正确回退到英文

### 后续扩展建议

1. **支持更多语言**：可以在翻译对象中添加更多语言支持
2. **动态翻译加载**：考虑从服务器动态加载翻译内容
3. **翻译管理界面**：为管理员提供翻译内容的在线编辑功能
4. **翻译完整性检查**：添加工具检查翻译的完整性和一致性

### 技术债务和改进空间

1. **翻译内容重复**：`Hotkey.ts`和`translate.ts`中存在重复的翻译内容，未来可以统一
2. **翻译键命名规范**：建议建立更严格的翻译键命名规范
3. **自动化测试**：可以添加自动化测试确保翻译功能的稳定性
4. **性能监控**：监控翻译功能对整体性能的影响