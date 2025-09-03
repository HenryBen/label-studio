import { translate, getCurrentLocale } from './translate';

export const DEFAULT_HOTKEYS = [
  // Annotation Controls
  {
    id: 100,
    section: "annotation",
    element: "annotation:submit",
    label: "hotkey.annotation.submit",
    key: "ctrl+enter",
    description: "hotkey.annotation.submit",
    active: true,
  },
  {
    id: 200,
    section: "annotation",
    element: "annotation:skip",
    label: "hotkey.annotation.skip",
    key: "ctrl+space",
    description: "hotkey.annotation.skip",
    active: true,
  },
  {
    id: 300,
    section: "annotation",
    element: "annotation:undo",
    label: "hotkey.annotation.undo",
    key: "ctrl+z",
    description: "hotkey.annotation.undo",
    active: true,
  },
  {
    id: 400,
    section: "annotation",
    element: "annotation:redo",
    label: "hotkey.annotation.redo",
    key: "ctrl+shift+z",
    description: "hotkey.annotation.redo",
    active: true,
  },

  // Data Manager
  {
    id: 500,
    section: "data_manager",
    element: "dm.focus-previous",
    label: "hotkey.data_manager.focus_previous",
    key: "shift+up",
    description: "hotkey.data_manager.focus_previous",
    active: true,
  },
  {
    id: 600,
    section: "data_manager",
    element: "dm.focus-next",
    label: "hotkey.data_manager.focus_next",
    key: "shift+down",
    description: "hotkey.data_manager.focus_next",
    active: true,
  },
  {
    id: 700,
    section: "data_manager",
    element: "dm.close-labeling",
    label: "hotkey.data_manager.close_labeling",
    key: "shift+left",
    description: "hotkey.data_manager.close_labeling",
    active: true,
  },
  {
    id: 800,
    section: "data_manager",
    element: "dm.open-labeling",
    label: "hotkey.data_manager.open_labeling",
    key: "shift+right",
    description: "hotkey.data_manager.open_labeling",
    active: true,
  },
  {
    id: 900,
    section: "data_manager",
    element: "dm.toggle-bulk-sidebar-minimization",
    label: "hotkey.data_manager.toggle_bulk_sidebar",
    key: "shift+.",
    description: "hotkey.data_manager.toggle_bulk_sidebar",
    active: true,
  },

  // Region Management
  {
    id: 1100,
    section: "regions",
    element: "region:delete-all",
    label: "hotkey.regions.delete_all",
    key: "ctrl+backspace",
    description: "hotkey.regions.delete_all",
    active: true,
  },
  {
    id: 1200,
    section: "regions",
    element: "region:focus",
    label: "hotkey.regions.focus",
    key: "enter",
    description: "hotkey.regions.focus",
    active: true,
  },
  {
    id: 1300,
    section: "regions",
    element: "region:relation",
    label: "hotkey.regions.relation",
    key: "alt+r",
    description: "hotkey.regions.relation",
    active: true,
  },
  {
    id: 1400,
    section: "regions",
    element: "region:visibility",
    label: "hotkey.regions.visibility",
    key: "alt+h",
    description: "hotkey.regions.visibility",
    active: true,
  },
  {
    id: 1500,
    section: "regions",
    element: "region:visibility-all",
    label: "hotkey.regions.visibility_all",
    key: "ctrl+h",
    description: "hotkey.regions.visibility_all",
    active: true,
  },
  {
    id: 1600,
    section: "regions",
    element: "region:lock",
    label: "hotkey.regions.lock",
    key: "alt+l",
    description: "hotkey.regions.lock",
    active: true,
  },
  {
    id: 1700,
    section: "regions",
    element: "region:meta",
    label: "hotkey.regions.meta",
    key: "alt+m",
    description: "hotkey.regions.meta",
    active: true,
  },
  {
    id: 1800,
    section: "regions",
    element: "region:unselect",
    label: "hotkey.regions.unselect",
    key: "u",
    description: "hotkey.regions.unselect",
    active: true,
  },
  {
    id: 1900,
    section: "regions",
    element: "region:exit",
    label: "hotkey.regions.exit",
    key: "escape",
    description: "hotkey.regions.exit",
    active: true,
  },
  {
    id: 2000,
    section: "regions",
    element: "region:delete",
    label: "hotkey.regions.delete",
    key: "backspace",
    description: "hotkey.regions.delete",
    active: true,
  },
  {
    id: 2100,
    section: "regions",
    element: "region:cycle",
    label: "hotkey.regions.cycle",
    key: "alt+.",
    description: "hotkey.regions.cycle",
    active: true,
  },
  {
    id: 2200,
    section: "regions",
    element: "region:duplicate",
    label: "hotkey.regions.duplicate",
    key: "ctrl+d",
    description: "hotkey.regions.duplicate",
    active: true,
  },
  {
    id: 2300,
    section: "regions",
    element: "segment:delete",
    label: "hotkey.regions.segment_delete",
    key: "delete",
    description: "hotkey.regions.segment_delete",
    active: true,
  },

  // Editor - Audio Controls
  {
    id: 2400,
    section: "audio",
    element: "audio:back",
    label: "hotkey.audio.back",
    key: "ctrl+b",
    description: "hotkey.audio.back",
    active: true,
  },
  {
    id: 2500,
    section: "audio",
    element: "audio:playpause",
    label: "hotkey.audio.playpause",
    key: "ctrl+p",
    description: "hotkey.audio.playpause",
    active: true,
  },
  {
    id: 2600,
    section: "audio",
    element: "audio:step-backward",
    label: "hotkey.audio.step_backward",
    key: "alt+a",
    description: "hotkey.audio.step_backward",
    active: true,
  },
  {
    id: 2700,
    section: "audio",
    element: "audio:step-forward",
    label: "hotkey.audio.step_forward",
    key: "alt+d",
    description: "hotkey.audio.step_forward",
    active: true,
  },

  // Editor - Video Controls
  {
    id: 2800,
    section: "video",
    element: "media:playpause",
    label: "hotkey.video.play_pause",
    key: "ctrl+alt+space",
    description: "hotkey.video.play_pause_desc",
    active: true,
  },
  {
    id: 2900,
    section: "video",
    element: "media:step-backward",
    label: "hotkey.video.step_back",
    key: "alt+left",
    description: "hotkey.video.step_back_desc",
    active: true,
  },
  {
    id: 3000,
    section: "video",
    element: "media:step-forward",
    label: "hotkey.video.step_forward",
    key: "alt+right",
    description: "hotkey.video.step_forward_desc",
    active: true,
  },
  {
    id: 3100,
    section: "video",
    element: "video:keyframe-backward",
    label: "hotkey.video.previous_keyframe",
    key: "ctrl+alt+left",
    description: "hotkey.video.previous_keyframe_desc",
    active: true,
  },
  {
    id: 3200,
    section: "video",
    element: "video:keyframe-forward",
    label: "hotkey.video.next_keyframe",
    key: "ctrl+alt+right",
    description: "hotkey.video.next_keyframe_desc",
    active: true,
  },
  {
    id: 3300,
    section: "video",
    element: "video:backward",
    label: "hotkey.video.seek_backward",
    key: "alt+left",
    description: "hotkey.video.seek_backward_desc",
    active: true,
  },
  {
    id: 3400,
    section: "video",
    element: "video:rewind",
    label: "hotkey.video.first_frame",
    key: "shift+ctrl+alt+left",
    description: "hotkey.video.first_frame_desc",
    active: true,
  },
  {
    id: 3500,
    section: "video",
    element: "video:forward",
    label: "hotkey.video.seek_forward",
    key: "shift+alt+right",
    description: "hotkey.video.seek_forward_desc",
    active: true,
  },
  {
    id: 3600,
    section: "video",
    element: "video:fastforward",
    label: "hotkey.video.last_frame",
    key: "shift+ctrl+alt+right",
    description: "hotkey.video.last_frame_desc",
    active: true,
  },
  {
    id: 3700,
    section: "video",
    element: "video:hop-backward",
    label: "hotkey.video.hop_backward",
    key: "shift+alt+left",
    description: "hotkey.video.hop_backward_desc",
    active: true,
  },
  {
    id: 3800,
    section: "video",
    element: "video:hop-forward",
    label: "hotkey.video.hop_forward",
    key: "shift+alt+right",
    description: "hotkey.video.hop_forward_desc",
    active: true,
  },

  // Editor - Time Series Controls
  {
    id: 3900,
    section: "timeseries",
    element: "ts:grow-left",
    label: "hotkey.timeseries.extend_left",
    key: "left",
    description: "hotkey.timeseries.extend_left_desc",
    active: true,
  },
  {
    id: 4000,
    section: "timeseries",
    element: "ts:grow-right",
    label: "hotkey.timeseries.extend_right",
    key: "right",
    description: "hotkey.timeseries.extend_right_desc",
    active: true,
  },
  {
    id: 4100,
    section: "timeseries",
    element: "ts:shrink-left",
    label: "hotkey.timeseries.shrink_left",
    key: "alt+left",
    description: "hotkey.timeseries.shrink_left_desc",
    active: true,
  },
  {
    id: 4200,
    section: "timeseries",
    element: "ts:shrink-right",
    label: "hotkey.timeseries.shrink_right",
    key: "alt+right",
    description: "hotkey.timeseries.shrink_right_desc",
    active: true,
  },
  {
    id: 4300,
    section: "timeseries",
    element: "ts:grow-left-large",
    label: "hotkey.timeseries.extend_left_large",
    key: "shift+left",
    description: "hotkey.timeseries.extend_left_large_desc",
    active: true,
  },
  {
    id: 4400,
    section: "timeseries",
    element: "ts:grow-right-large",
    label: "hotkey.timeseries.extend_right_large",
    key: "shift+right",
    description: "hotkey.timeseries.extend_right_large_desc",
    active: true,
  },
  {
    id: 4500,
    section: "timeseries",
    element: "ts:shrink-left-large",
    label: "hotkey.timeseries.shrink_left_large",
    key: "shift+alt+left",
    description: "hotkey.timeseries.shrink_left_large_desc",
    active: true,
  },
  {
    id: 4600,
    section: "timeseries",
    element: "ts:shrink-right-large",
    label: "hotkey.timeseries.shrink_right_large",
    key: "shift+alt+right",
    description: "hotkey.timeseries.shrink_right_large_desc",
    active: true,
  },

  // Image Gallery Controls
  {
    id: 4700,
    section: "image_gallery",
    element: "image:prev",
    label: "hotkey.image_gallery.previous_image",
    key: "ctrl+left",
    description: "hotkey.image_gallery.previous_image_desc",
    active: true,
  },
  {
    id: 4800,
    section: "image_gallery",
    element: "image:next",
    label: "hotkey.image_gallery.next_image",
    key: "ctrl+right",
    description: "hotkey.image_gallery.next_image_desc",
    active: true,
  },

  {
    id: 5000,
    section: "tools",
    element: "tool:zoom-in",
    label: "hotkey.image.zoom_in",
    key: "ctrl+plus",
    description: "hotkey.image.zoom_in_desc",
    active: true,
  },
  {
    id: 5100,
    section: "tools",
    element: "tool:pan-image",
    label: "hotkey.image.pan",
    key: "H",
    description: "hotkey.image.pan_desc",
    active: true,
  },
  {
    id: 5200,
    section: "tools",
    element: "tool:zoom-to-fit",
    label: "hotkey.image.zoom_fit",
    key: "shift+1",
    description: "hotkey.image.zoom_fit_desc",
    active: true,
  },
  {
    id: 5300,
    section: "tools",
    element: "tool:zoom-to-actual",
    label: "hotkey.image.zoom_100",
    key: "shift+2",
    description: "hotkey.image.zoom_100_desc",
    active: true,
  },
  {
    id: 5400,
    section: "tools",
    element: "tool:zoom-out",
    label: "hotkey.image.zoom_out",
    key: "ctrl+minus",
    description: "hotkey.image.zoom_out_desc",
    active: true,
  },
  {
    id: 5401,
    section: "tools",
    element: "tool:move",
    label: "hotkey.image.move_tool",
    key: "V",
    description: "hotkey.image.move_tool_desc",
    active: true,
  },
  {
    id: 5402,
    section: "tools",
    element: "tool:brush",
    label: "hotkey.image.brush_tool",
    key: "B",
    description: "hotkey.image.brush_tool_desc",
    active: true,
  },

  {
    id: 5500,
    section: "tools",
    element: "tool:ellipse",
    label: "hotkey.image.ellipse_tool",
    key: "O",
    description: "hotkey.image.ellipse_tool_desc",
    active: true,
  },
  {
    id: 5600,
    section: "tools",
    element: "tool:eraser",
    label: "hotkey.image.eraser_tool",
    key: "E",
    description: "hotkey.image.eraser_tool_desc",
    active: true,
  },
  {
    id: 5700,
    section: "tools",
    element: "tool:auto-detect",
    label: "hotkey.image.auto_detect",
    key: "M",
    description: "hotkey.image.auto_detect_desc",
    active: true,
  },
  {
    id: 5900,
    section: "tools",
    element: "tool:key-point",
    label: "hotkey.image.keypoint_tool",
    key: "K",
    description: "hotkey.image.keypoint_tool_desc",
    active: true,
  },
  {
    id: 6000,
    section: "tools",
    element: "tool:magic-wand",
    label: "hotkey.image.magic_wand",
    key: "W",
    description: "hotkey.image.magic_wand_desc",
    active: true,
  },
  {
    id: 6100,
    section: "tools",
    element: "tool:polygon",
    label: "hotkey.image.polygon_tool",
    key: "P",
    description: "hotkey.image.polygon_tool_desc",
    active: true,
  },
  {
    id: 6200,
    section: "tools",
    element: "tool:rect",
    label: "hotkey.image.rectangle_tool",
    key: "R",
    description: "hotkey.image.rectangle_tool_desc",
    active: true,
  },
  {
    id: 6201,
    section: "tools",
    element: "tool:rect-3point",
    label: "hotkey.image.three_point_rectangle",
    key: "shift+R",
    description: "hotkey.image.three_point_rectangle_desc",
    active: true,
  },

  {
    id: 6300,
    section: "tools",
    element: "tool:rotate-left",
    label: "hotkey.image.rotate_left",
    key: "alt+left",
    description: "hotkey.image.rotate_left_desc",
    active: true,
  },
  {
    id: 6400,
    section: "tools",
    element: "tool:rotate-right",
    label: "hotkey.image.rotate_right",
    key: "alt+right",
    description: "hotkey.image.rotate_right_desc",
    active: true,
  },
  {
    id: 6700,
    section: "tools",
    element: "tool:decrease-tool",
    label: "hotkey.image.decrease_tool_size",
    key: "[",
    description: "hotkey.image.decrease_tool_size_desc",
    active: true,
  },
  {
    id: 6800,
    section: "tools",
    element: "tool:increase-tool",
    label: "hotkey.image.increase_tool_size",
    key: "]",
    description: "hotkey.image.increase_tool_size_desc",
    active: true,
  },

  // Paragraph Navigation
  {
    id: 6900,
    section: "paragraphs",
    element: "phrases:next-phrase",
    label: "hotkey.paragraphs.next_phrase",
    key: "ctrl+down",
    description: "hotkey.paragraphs.next_phrase_desc",
    active: true,
  },
  {
    id: 7000,
    section: "paragraphs",
    element: "phrases:previous-phrase",
    label: "hotkey.paragraphs.previous_phrase",
    key: "ctrl+up",
    description: "hotkey.paragraphs.previous_phrase_desc",
    active: true,
  },
  {
    id: 7100,
    section: "paragraphs",
    element: "phrases:select_all_annotate",
    label: "hotkey.paragraphs.select_all_annotate",
    key: "ctrl+shift+a",
    description: "hotkey.paragraphs.select_all_annotate_desc",
    active: true,
  },
  {
    id: 7200,
    section: "paragraphs",
    element: "phrases:next-region",
    label: "hotkey.paragraphs.next_region",
    key: "ctrl+right",
    description: "hotkey.paragraphs.next_region_desc",
    active: true,
  },
  {
    id: 7300,
    section: "paragraphs",
    element: "phrases:previous-region",
    label: "hotkey.paragraphs.previous_region",
    key: "ctrl+left",
    description: "hotkey.paragraphs.previous_region_desc",
    active: true,
  },
];

export const HOTKEY_SECTIONS = [
  {
    id: "annotation",
    get title() {
      return translate("hotkey.sections.annotation.title", getCurrentLocale());
    },
    get description() {
      return translate("hotkey.sections.annotation.description", getCurrentLocale());
    },
  },

  {
    id: "data_manager",
    get title() {
      return translate("hotkey.sections.data_manager.title", getCurrentLocale());
    },
    get description() {
      return translate("hotkey.sections.data_manager.description", getCurrentLocale());
    },
  },

  {
    id: "regions",
    get title() {
      return translate("hotkey.sections.regions.title", getCurrentLocale());
    },
    get description() {
      return translate("hotkey.sections.regions.description", getCurrentLocale());
    },
  },

  {
    id: "tools",
    get title() {
      return translate("hotkey.sections.tools.title", getCurrentLocale());
    },
    get description() {
      return translate("hotkey.sections.tools.description", getCurrentLocale());
    },
  },

  {
    id: "audio",
    get title() {
      return translate("hotkey.sections.audio.title", getCurrentLocale());
    },
    get description() {
      return translate("hotkey.sections.audio.description", getCurrentLocale());
    },
  },
  {
    id: "video",
    get title() {
      return translate("hotkey.sections.video.title", getCurrentLocale());
    },
    get description() {
      return translate("hotkey.sections.video.description", getCurrentLocale());
    },
  },
  {
    id: "timeseries",
    get title() {
      return translate("hotkey.sections.timeseries.title", getCurrentLocale());
    },
    get description() {
      return translate("hotkey.sections.timeseries.description", getCurrentLocale());
    },
  },
  {
    id: "image_gallery",
    get title() {
      return translate("hotkey.sections.image_gallery.title", getCurrentLocale());
    },
    get description() {
      return translate("hotkey.sections.image_gallery.description", getCurrentLocale());
    },
  },
  {
    id: "paragraphs",
    get title() {
      return translate("hotkey.sections.paragraphs.title", getCurrentLocale());
    },
    get description() {
      return translate("hotkey.sections.paragraphs.description", getCurrentLocale());
    },
  },
];

/**
 * URL patterns mapped to their corresponding hotkey sections
 * Used to automatically determine which shortcuts to display based on current page
 */
export const URL_TO_SECTION_MAPPING = [
  {
    regex: /\/projects\/\d+\/data\/?\?.*task=\d+/i,
    section: ["annotation", "regions"],
  },
  {
    regex: /\/projects\/\d+\/data\/?$/i,
    section: "data_manager",
  },
];
