// Translation mappings for hotkey descriptions
const translations: Record<string, Record<string, string>> = {
  en: {
    // Section titles and descriptions
    "hotkey.sections.annotation.title": "Annotation Actions",
    "hotkey.sections.annotation.description": "Shortcuts for common annotation tasks like submit, skip, undo and redo",
    "hotkey.sections.data_manager.title": "Data Manager",
    "hotkey.sections.data_manager.description": "Shortcuts for navigating and managing tasks in Project's Data Manager",
    "hotkey.sections.regions.title": "Region Management",
    "hotkey.sections.regions.description": "Shortcuts for creating, selecting and manipulating annotation regions",
    "hotkey.sections.tools.title": "Tools",
    "hotkey.sections.tools.description": "Shortcuts for controlling tools panel when labeling images",
    "hotkey.sections.audio.title": "Audio Controls",
    "hotkey.sections.audio.description": "Shortcuts for controlling audio playback and navigation",
    "hotkey.sections.video.title": "Video Controls",
    "hotkey.sections.video.description": "Shortcuts for controlling video playback and navigation",
    "hotkey.sections.paragraphs.title": "Paragraph Navigation",
    "hotkey.sections.paragraphs.description": "Shortcuts for navigating phrases and regions in paragraph/dialogue view",
    "hotkey.sections.image_gallery.title": "Image Gallery Navigation",
    "hotkey.sections.image_gallery.description": "Shortcuts for navigating between images in multi-image tasks",
    "hotkey.sections.timeseries.title": "Time Series Controls",
    "hotkey.sections.timeseries.description": "Shortcuts for manipulating time series data regions",
    
    // Buttons
    "hotkey.buttons.import": "Import",
    "hotkey.buttons.export": "Export",
    "hotkey.buttons.reset_to_defaults": "Reset to Defaults",
    "hotkey.buttons.save": "Save",
    
    // Annotation Controls
    "hotkey.annotation.submit": "Submit annotation",
    "hotkey.annotation.skip": "Skip task",
    "hotkey.annotation.undo": "Undo",
    "hotkey.annotation.redo": "Redo",
    
    // Data Manager
    "hotkey.data_manager.focus_previous": "Focus previous task",
    "hotkey.data_manager.focus_next": "Focus next task",
    "hotkey.data_manager.close_labeling": "Close labeling interface",
    "hotkey.data_manager.open_labeling": "Open labeling interface",
    "hotkey.data_manager.toggle_bulk_sidebar": "Toggle bulk actions sidebar",
    
    // Region Management
    "hotkey.regions.delete_all": "Delete all regions",
    "hotkey.regions.focus": "Focus region",
    "hotkey.regions.relation": "Create relation",
    "hotkey.regions.visibility": "Toggle region visibility",
    "hotkey.regions.visibility_all": "Toggle all regions visibility",
    "hotkey.regions.lock": "Lock/unlock region",
    "hotkey.regions.meta": "Edit region metadata",
    "hotkey.regions.unselect": "Unselect region",
    "hotkey.regions.exit": "Exit region editing",
    "hotkey.regions.delete": "Delete region",
    "hotkey.regions.cycle": "Cycle through regions",
    "hotkey.regions.duplicate": "Duplicate region",
    "hotkey.regions.segment_delete": "Delete segment",
    
    // Audio Controls
    "hotkey.audio.back": "Back for one second",
    "hotkey.audio.playpause": "Play/pause",
    "hotkey.audio.step_backward": "Go one step back",
    "hotkey.audio.step_forward": "Go one step forward",
    
    // Time Series
    "hotkey.ts.grow_left": "Increase region to the left",
    "hotkey.ts.grow_right": "Increase region to the right",
    "hotkey.ts.shrink_left": "Decrease region on the left",
    "hotkey.ts.shrink_right": "Decrease region on the right",
    
    // Paragraph Navigation
    "hotkey.paragraphs.next_phrase": "Next Phrase",
    "hotkey.paragraphs.next_phrase_desc": "Navigate to the next phrase in paragraph view",
    "hotkey.paragraphs.previous_phrase": "Previous Phrase",
    "hotkey.paragraphs.previous_phrase_desc": "Navigate to the previous phrase in paragraph view",
    "hotkey.paragraphs.select_all_annotate": "Select All and Annotate",
    "hotkey.paragraphs.select_all_annotate_desc": "Select all text in current phrase and create annotation",
    "hotkey.paragraphs.next_region": "Next Region in Phrase",
    "hotkey.paragraphs.next_region_desc": "Navigate to the next region within current phrase",
    "hotkey.paragraphs.previous_region": "Previous Region in Phrase",
    "hotkey.paragraphs.previous_region_desc": "Navigate to the previous region within current phrase",
    
    // Image Gallery Navigation
    "hotkey.image_gallery.previous_image": "Previous Image",
    "hotkey.image_gallery.previous_image_desc": "View previous image",
    "hotkey.image_gallery.next_image": "Next Image",
    "hotkey.image_gallery.next_image_desc": "View next image",
    
    // Time Series Controls
    "hotkey.timeseries.extend_left": "Extend Left",
    "hotkey.timeseries.extend_left_desc": "Extend the region to the left",
    "hotkey.timeseries.extend_right": "Extend Right",
    "hotkey.timeseries.extend_right_desc": "Extend the region to the right",
    "hotkey.timeseries.shrink_left": "Shrink Left",
    "hotkey.timeseries.shrink_left_desc": "Shrink the region from the left",
    "hotkey.timeseries.shrink_right": "Shrink Right",
    "hotkey.timeseries.shrink_right_desc": "Shrink the region from the right",
    "hotkey.timeseries.extend_left_large": "Extend Left (Large)",
    "hotkey.timeseries.extend_left_large_desc": "Extend region left significantly",
    "hotkey.timeseries.extend_right_large": "Extend Right (Large)",
    "hotkey.timeseries.extend_right_large_desc": "Extend region right significantly",
    "hotkey.timeseries.shrink_left_large": "Shrink Left (Large)",
    "hotkey.timeseries.shrink_left_large_desc": "Shrink region from left significantly",
    "hotkey.timeseries.shrink_right_large": "Shrink Right (Large)",
    "hotkey.timeseries.shrink_right_large_desc": "Shrink region from right significantly",
    
    // Video Controls
    "hotkey.video.play_pause": "Play / Pause Video",
    "hotkey.video.play_pause_desc": "Toggle video playback",
    "hotkey.video.step_back": "Step Back",
    "hotkey.video.step_back_desc": "Step one frame backward",
    "hotkey.video.step_forward": "Step Forward",
    "hotkey.video.step_forward_desc": "Step one frame forward",
    "hotkey.video.previous_keyframe": "Previous Keyframe",
    "hotkey.video.previous_keyframe_desc": "Jump to previous keyframe",
    "hotkey.video.next_keyframe": "Next Keyframe",
    "hotkey.video.next_keyframe_desc": "Jump to next keyframe",
    "hotkey.video.seek_backward": "Seek Backward",
    "hotkey.video.seek_backward_desc": "Seek video backward",
    "hotkey.video.first_frame": "First Frame",
    "hotkey.video.first_frame_desc": "Jump to first frame",
    "hotkey.video.seek_forward": "Seek Forward",
    "hotkey.video.seek_forward_desc": "Seek video forward",
    "hotkey.video.last_frame": "Last Frame",
    "hotkey.video.last_frame_desc": "Jump to last frame",
    "hotkey.video.hop_backward": "Hop Backward",
    "hotkey.video.hop_backward_desc": "Hop backward quickly",
    "hotkey.video.hop_forward": "Hop Forward",
    "hotkey.video.hop_forward_desc": "Hop forward quickly",
    
    // Image Tools
    "hotkey.image.zoom_in": "Zoom In",
    "hotkey.image.zoom_in_desc": "Zoom in on the image",
    "hotkey.image.pan": "Pan Image",
    "hotkey.image.pan_desc": "Pan around the image",
    "hotkey.image.zoom_fit": "Zoom to Fit",
    "hotkey.image.zoom_fit_desc": "Zoom to fit the full image in view",
    "hotkey.image.zoom_100": "Zoom to 100%",
    "hotkey.image.zoom_100_desc": "Zoom to actual image size (100%)",
    "hotkey.image.zoom_out": "Zoom Out",
    "hotkey.image.zoom_out_desc": "Zoom out of the image",
    "hotkey.image.move_tool": "Move Tool",
    "hotkey.image.move_tool_desc": "Select the move tool to reposition annotations",
    "hotkey.image.brush_tool": "Brush Tool",
    "hotkey.image.brush_tool_desc": "Select the brush tool",
    "hotkey.image.ellipse_tool": "Ellipse Tool",
    "hotkey.image.ellipse_tool_desc": "Select the ellipse tool",
    "hotkey.image.eraser_tool": "Eraser Tool",
    "hotkey.image.eraser_tool_desc": "Select the eraser tool",
    "hotkey.image.auto_detect": "Auto Detect",
    "hotkey.image.auto_detect_desc": "Use the auto-detect tool to automatically suggest regions",
    "hotkey.image.keypoint_tool": "Key Point Tool",
    "hotkey.image.keypoint_tool_desc": "Select the key point annotation tool",
    "hotkey.image.magic_wand": "Magic Wand",
    "hotkey.image.magic_wand_desc": "Select the magic wand tool for smart region selection",
    "hotkey.image.polygon_tool": "Polygon Tool",
    "hotkey.image.polygon_tool_desc": "Select the polygon annotation tool",
    "hotkey.image.rectangle_tool": "Rectangle Tool",
    "hotkey.image.rectangle_tool_desc": "Select the rectangle annotation tool",
    "hotkey.image.three_point_rectangle": "3-Point Rectangle",
    "hotkey.image.three_point_rectangle_desc": "Draw a rotated rectangle using 3-point selection",
    "hotkey.image.rotate_left": "Rotate Left",
    "hotkey.image.rotate_left_desc": "Rotate the image 90° to the left",
    "hotkey.image.rotate_right": "Rotate Right",
    "hotkey.image.rotate_right_desc": "Rotate the image 90° to the right",
    "hotkey.image.decrease_tool_size": "Decrease Tool Size",
    "hotkey.image.decrease_tool_size_desc": "Decrease tool size",
    "hotkey.image.increase_tool_size": "Increase Tool Size",
    "hotkey.image.increase_tool_size_desc": "Increase tool size",
  },
  "zh-hans": {
    // Section titles and descriptions
    "hotkey.sections.annotation.title": "标注操作",
    "hotkey.sections.annotation.description": "常见标注任务的快捷键，如提交、跳过、撤销和重做",
    "hotkey.sections.data_manager.title": "数据管理器",
    "hotkey.sections.data_manager.description": "在项目数据管理器中导航和管理任务的快捷键",
    "hotkey.sections.regions.title": "区域管理",
    "hotkey.sections.regions.description": "创建、选择和操作标注区域的快捷键",
    "hotkey.sections.tools.title": "工具",
    "hotkey.sections.tools.description": "标注图像时控制工具面板的快捷键",
    "hotkey.sections.audio.title": "音频控制",
    "hotkey.sections.audio.description": "控制音频播放和导航的快捷键",
    "hotkey.sections.video.title": "视频控制",
    "hotkey.sections.video.description": "控制视频播放和导航的快捷键",
    "hotkey.sections.paragraphs.title": "段落导航",
    "hotkey.sections.paragraphs.description": "用于在段落/对话视图中导航短语和区域的快捷键",
    "hotkey.sections.image_gallery.title": "图像画廊导航",
    "hotkey.sections.image_gallery.description": "在多图像任务中导航图像的快捷键",
    "hotkey.sections.timeseries.title": "时间序列控制",
    "hotkey.sections.timeseries.description": "用于操作时间序列数据区域的快捷键",
    
    // Buttons
    "hotkey.buttons.import": "导入",
    "hotkey.buttons.export": "导出",
    "hotkey.buttons.reset_to_defaults": "重置为默认值",
    "hotkey.buttons.save": "保存",
    
    // Annotation Controls
    "hotkey.annotation.submit": "提交标注",
    "hotkey.annotation.skip": "跳过任务",
    "hotkey.annotation.undo": "撤销",
    "hotkey.annotation.redo": "重做",
    
    // Data Manager
    "hotkey.data_manager.focus_previous": "聚焦上一个任务",
    "hotkey.data_manager.focus_next": "聚焦下一个任务",
    "hotkey.data_manager.close_labeling": "关闭标注界面",
    "hotkey.data_manager.open_labeling": "打开标注界面",
    "hotkey.data_manager.toggle_bulk_sidebar": "切换批量操作侧边栏",
    
    // Region Management
    "hotkey.regions.delete_all": "删除所有区域",
    "hotkey.regions.focus": "聚焦区域",
    "hotkey.regions.relation": "创建关系",
    "hotkey.regions.visibility": "切换区域可见性",
    "hotkey.regions.visibility_all": "切换所有区域可见性",
    "hotkey.regions.lock": "锁定/解锁区域",
    "hotkey.regions.meta": "编辑区域元数据",
    "hotkey.regions.unselect": "取消选择区域",
    "hotkey.regions.exit": "退出区域编辑",
    "hotkey.regions.delete": "删除区域",
    "hotkey.regions.cycle": "循环浏览区域",
    "hotkey.regions.duplicate": "复制区域",
    "hotkey.regions.segment_delete": "删除片段",
    
    // Audio Controls
    "hotkey.audio.back": "后退一秒",
    "hotkey.audio.playpause": "播放/暂停",
    "hotkey.audio.step_backward": "后退一步",
    "hotkey.audio.step_forward": "前进一步",
    
    // Time Series
    "hotkey.ts.grow_left": "向左扩展区域",
    "hotkey.ts.grow_right": "向右扩展区域",
    "hotkey.ts.shrink_left": "从左侧缩小区域",
    "hotkey.ts.shrink_right": "从右侧缩小区域",
    
    // Paragraph Navigation
    "hotkey.paragraphs.next_phrase": "下一个短语",
    "hotkey.paragraphs.next_phrase_desc": "在段落视图中导航到下一个短语",
    "hotkey.paragraphs.previous_phrase": "上一个短语",
    "hotkey.paragraphs.previous_phrase_desc": "在段落视图中导航到上一个短语",
    "hotkey.paragraphs.select_all_annotate": "全选并标注",
    "hotkey.paragraphs.select_all_annotate_desc": "选择当前短语中的所有文本并创建标注",
    "hotkey.paragraphs.next_region": "短语中的下一个区域",
    "hotkey.paragraphs.next_region_desc": "导航到当前短语中的下一个区域",
    "hotkey.paragraphs.previous_region": "短语中的上一个区域",
    "hotkey.paragraphs.previous_region_desc": "导航到当前短语中的上一个区域",
    
    // Image Gallery Navigation
    "hotkey.image_gallery.previous_image": "上一张图片",
    "hotkey.image_gallery.previous_image_desc": "查看上一张图片",
    "hotkey.image_gallery.next_image": "下一张图片",
    "hotkey.image_gallery.next_image_desc": "查看下一张图片",
    
    // Time Series Controls
    "hotkey.timeseries.extend_left": "向左扩展",
    "hotkey.timeseries.extend_left_desc": "向左扩展区域",
    "hotkey.timeseries.extend_right": "向右扩展",
    "hotkey.timeseries.extend_right_desc": "向右扩展区域",
    "hotkey.timeseries.shrink_left": "从左收缩",
    "hotkey.timeseries.shrink_left_desc": "从左侧收缩区域",
    "hotkey.timeseries.shrink_right": "从右收缩",
    "hotkey.timeseries.shrink_right_desc": "从右侧收缩区域",
    "hotkey.timeseries.extend_left_large": "大幅向左扩展",
    "hotkey.timeseries.extend_left_large_desc": "大幅向左扩展区域",
    "hotkey.timeseries.extend_right_large": "大幅向右扩展",
    "hotkey.timeseries.extend_right_large_desc": "大幅向右扩展区域",
    "hotkey.timeseries.shrink_left_large": "大幅从左收缩",
    "hotkey.timeseries.shrink_left_large_desc": "大幅从左侧收缩区域",
    "hotkey.timeseries.shrink_right_large": "大幅从右收缩",
    "hotkey.timeseries.shrink_right_large_desc": "大幅从右侧收缩区域",
    
    // Video Controls
    "hotkey.video.play_pause": "播放/暂停视频",
    "hotkey.video.play_pause_desc": "切换视频播放状态",
    "hotkey.video.step_back": "后退一帧",
    "hotkey.video.step_back_desc": "向后退一帧",
    "hotkey.video.step_forward": "前进一帧",
    "hotkey.video.step_forward_desc": "向前进一帧",
    "hotkey.video.previous_keyframe": "上一关键帧",
    "hotkey.video.previous_keyframe_desc": "跳转到上一个关键帧",
    "hotkey.video.next_keyframe": "下一关键帧",
    "hotkey.video.next_keyframe_desc": "跳转到下一个关键帧",
    "hotkey.video.seek_backward": "快退",
    "hotkey.video.seek_backward_desc": "视频快退",
    "hotkey.video.first_frame": "第一帧",
    "hotkey.video.first_frame_desc": "跳转到第一帧",
    "hotkey.video.seek_forward": "快进",
    "hotkey.video.seek_forward_desc": "视频快进",
    "hotkey.video.last_frame": "最后一帧",
    "hotkey.video.last_frame_desc": "跳转到最后一帧",
    "hotkey.video.hop_backward": "快速后退",
    "hotkey.video.hop_backward_desc": "快速向后跳跃",
    "hotkey.video.hop_forward": "快速前进",
    "hotkey.video.hop_forward_desc": "快速向前跳跃",
    
    // Image Tools
    "hotkey.image.zoom_in": "放大",
    "hotkey.image.zoom_in_desc": "放大图像",
    "hotkey.image.pan": "平移图像",
    "hotkey.image.pan_desc": "在图像周围平移",
    "hotkey.image.zoom_fit": "缩放至适合",
    "hotkey.image.zoom_fit_desc": "缩放以适合视图中的完整图像",
    "hotkey.image.zoom_100": "缩放至100%",
    "hotkey.image.zoom_100_desc": "缩放至实际图像大小（100%）",
    "hotkey.image.zoom_out": "缩小",
    "hotkey.image.zoom_out_desc": "缩小图像",
    "hotkey.image.move_tool": "移动工具",
    "hotkey.image.move_tool_desc": "选择移动工具来重新定位标注",
    "hotkey.image.brush_tool": "画笔工具",
    "hotkey.image.brush_tool_desc": "选择画笔工具",
    "hotkey.image.ellipse_tool": "椭圆工具",
    "hotkey.image.ellipse_tool_desc": "选择椭圆工具",
    "hotkey.image.eraser_tool": "橡皮擦工具",
    "hotkey.image.eraser_tool_desc": "选择橡皮擦工具",
    "hotkey.image.auto_detect": "自动检测",
    "hotkey.image.auto_detect_desc": "使用自动检测工具自动建议区域",
    "hotkey.image.keypoint_tool": "关键点工具",
    "hotkey.image.keypoint_tool_desc": "选择关键点标注工具",
    "hotkey.image.magic_wand": "魔术棒",
    "hotkey.image.magic_wand_desc": "选择魔术棒工具进行智能区域选择",
    "hotkey.image.polygon_tool": "多边形工具",
    "hotkey.image.polygon_tool_desc": "选择多边形标注工具",
    "hotkey.image.rectangle_tool": "矩形工具",
    "hotkey.image.rectangle_tool_desc": "选择矩形标注工具",
    "hotkey.image.three_point_rectangle": "三点矩形",
    "hotkey.image.three_point_rectangle_desc": "使用三点选择绘制旋转矩形",
    "hotkey.image.rotate_left": "向左旋转",
    "hotkey.image.rotate_left_desc": "将图像向左旋转90°",
    "hotkey.image.rotate_right": "向右旋转",
    "hotkey.image.rotate_right_desc": "将图像向右旋转90°",
    "hotkey.image.decrease_tool_size": "减小工具大小",
    "hotkey.image.decrease_tool_size_desc": "减小工具大小",
    "hotkey.image.increase_tool_size": "增大工具大小",
    "hotkey.image.increase_tool_size_desc": "增大工具大小",
  },
};

// Global variable to store current language
let currentLanguage = 'en';

// Type declarations for window extensions
declare global {
  interface Window {
    i18n?: {
      language: string;
    };
  }
}

/**
 * Get current locale from react-i18next, Django settings or browser language
 */
export const getCurrentLocale = (): string => {
  // First try to get from react-i18next if available
  if (typeof window !== 'undefined' && window.i18n?.language) {
    const i18nLang = window.i18n.language;
    if (i18nLang === 'zh' || i18nLang === 'zh-hans') {
      return 'zh-hans';
    }
    return i18nLang;
  }
  
  // Try to get from localStorage i18nextLng (react-i18next default key)
  if (typeof window !== 'undefined') {
    const i18nextLng = localStorage.getItem('i18nextLng');
    if (i18nextLng) {
      if (i18nextLng === 'zh' || i18nextLng === 'zh-hans') {
        return 'zh-hans';
      }
      return i18nextLng;
    }
  }
  
  // Try to get locale from Django settings first (more reliable on page refresh)
  if (typeof window !== 'undefined' && window.APP_SETTINGS?.user?.locale) {
    const locale = window.APP_SETTINGS.user.locale;
    if (locale === 'zh' || locale === 'zh-hans') {
      return 'zh-hans';
    }
    return locale;
  }
  
  // Try to get from localStorage (persisted across page refreshes)
  if (typeof window !== 'undefined') {
    const storedLang = localStorage.getItem('language') || localStorage.getItem('locale');
    if (storedLang) {
      if (storedLang === 'zh' || storedLang === 'zh-hans') {
        return 'zh-hans';
      }
      return storedLang;
    }
  }
  
  // Use stored current language (may be reset on page refresh)
  if (currentLanguage && currentLanguage !== 'en') {
    if (currentLanguage === 'zh' || currentLanguage === 'zh-hans') {
      return 'zh-hans';
    }
    return currentLanguage;
  }
  
  // Fallback to browser language
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    // Convert browser language codes to our supported locales
    if (browserLang.startsWith('zh')) {
      return 'zh-hans';
    }
  }
  
  return 'en';
};

/**
 * Set current language (called when language changes)
 */
export const setCurrentLanguage = (language: string): void => {
  currentLanguage = language;
  // Also persist to localStorage for page refresh scenarios
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', language);
  }
};

// Listen for language change events
if (typeof window !== 'undefined') {
  window.addEventListener('languageChanged', (event: Event) => {
    const customEvent = event as CustomEvent<string>;
    const newLanguage = customEvent.detail;
    if (newLanguage) {
      currentLanguage = newLanguage;
      // Force re-render of any components using these translations
      window.dispatchEvent(new CustomEvent('hotkeysLanguageChanged', { detail: newLanguage }));
    }
  });
  
  // Also listen for i18next language changes
  window.addEventListener('i18nextLanguageChanged', (event: any) => {
    const newLanguage = event.detail?.language || 'en';
    currentLanguage = newLanguage;
    window.dispatchEvent(new CustomEvent('hotkeysLanguageChanged', { detail: newLanguage }));
  });
  
  // Listen for storage changes (when language is changed in another tab)
  window.addEventListener('storage', (event) => {
    if (event.key === 'i18nextLng' && event.newValue) {
      currentLanguage = event.newValue;
      window.dispatchEvent(new CustomEvent('hotkeysLanguageChanged', { detail: event.newValue }));
    }
  });
}

/**
 * Translate a key to the current locale
 */
export const translate = (key: string, locale?: string): string => {
  const currentLocale = locale || getCurrentLocale();
  
  // If the key doesn't start with 'hotkey.', return it as-is (it's already translated)
  if (!key.startsWith('hotkey.')) {
    return key;
  }
  
  // Normalize locale - handle both 'zh' and 'zh-hans'
  let normalizedLocale = currentLocale;
  if (currentLocale === 'zh') {
    normalizedLocale = 'zh-hans';
  }
  
  // Try to get translation for current locale
  const translation = translations[normalizedLocale]?.[key];
  if (translation) {
    return translation;
  }
  
  // If current locale is Chinese but not found, try 'zh-hans' explicitly
  if (currentLocale.startsWith('zh') && normalizedLocale !== 'zh-hans') {
    const zhTranslation = translations['zh-hans']?.[key];
    if (zhTranslation) {
      return zhTranslation;
    }
  }
  
  // Fallback to English
  const englishTranslation = translations.en?.[key];
  if (englishTranslation) {
    return englishTranslation;
  }
  
  // If no translation found, return the key itself
  return key;
};