
(() => {
  'use strict';

  const DEFAULT_CALL_SERVER_URL = 'https://coronaphone.republictax.com/conversation/stream';

  const CONFIG = {
    replyEndpoint: './reply.php',
    communityEndpoint: './community.php',
    communityImageEndpoint: './community-image.php',
    voiceEndpoint: './voice.php',
    authEndpoint: './auth.php',
    discordEndpoint: './discordprocessor.php',
    vipStatusEndpoint: './vip-status.php',
    pushEndpoint: './push.php',
    photoServerEndpoint: 'https://muah.ai/photo/PHOTOSERVER.php?TYPE=PHOTO2',
    videoEndpoint: 'https://muah.ai/API/index.php/',
    uploadEndpoint: './upload.php',
    dreamCharacterEndpoint: './dream-character.php',
    saveRemoteEndpoint: './save-remote.php',
    generatePhotoEndpoint: './generate-photo.php',
    generateVideoGen2Endpoint: './generate-video-gen2.php',
    musicGenEndpoint: './musicgen.php',
    musicVibeEndpoint: './music-vibe.php',
    xpSyncEndpoint: './xp-sync.php',
    photoTransformEndpoint: './photo/index.php',
    vipCheckEndpoint: 'https://muah.ai/automation/AIRPG/userinfo.php?XID=12321321&process=vipcheck',
    callServerUrl: DEFAULT_CALL_SERVER_URL
  };

  const I18N_PATH = './translations.json';
  const DEFAULT_LANGUAGE = 'en';
  const DEFAULT_PLAYER_NAME = 'User';
  const LANGUAGE_STORAGE_KEY = 'chatroom_language';
  const SUPPORTED_LANGUAGES = ['en', 'zh', 'ja', 'es', 'hi', 'fr', 'ru'];
  const FORCE_CHARACTER_MODAL_KEY = 'chatroom_force_character_modal';
  const DISCORD_LINK_FLASH_KEY = 'chatroom_discord_link_flash';
  const DISCORD_STATUS_CACHE_MS = 30000;
  const DEFAULT_DISCORD_INVITE = 'https://discord.gg/muah';

  const DEBUG = localStorage.getItem('chatroom_debug') === '1';
  const CLOUD_HISTORY_LIMIT = 0;
  const CLOUD_XID_KEY = 'chatroom_xid';
  const CLOUD_RESET_KEY = 'chatroom_cloud_reset_at';
  const CLOUD_SETTINGS_SYNC_DELAY = 600;
  const SETTINGS_XID_KEY = 'chatroom_settings_xid';
  const GLOBAL_LOW_POWER_MODE_KEY = 'chatroom_low_power_mode_global';
  const DEVICE_LOW_POWER_MODE_KEY = 'chatroom_low_power_mode_device';
  const DEVICE_LOW_POWER_MODE_COOKIE = 'chatroom_low_power_mode_device';
  const DEVICE_LOW_POWER_MODE_SESSION_KEY = 'chatroom_low_power_mode_device_session';
  const DEVICE_LOW_POWER_MODE_WINDOW_KEY = 'chatroom_low_power_mode_device_window';
  const LOW_POWER_DEBUG_KEY = 'chatroom_low_power_debug';
  const LOW_POWER_DEBUG_FORCE = true;
  const VIP_LABEL_CLASSES = ['is-free', 'is-vip', 'is-gpt', 'is-ultra', 'is-ultra-500'];
  const GUEST_MESSAGE_LIMIT = 5;
  const GUEST_MESSAGE_KEY = 'fevermate_guest_messages';
  const NON_FEVERMATE_GUEST_LIMIT = 15;
  const NON_FEVERMATE_FREE_PHOTO_LIMIT = 2;
  const NON_FEVERMATE_GUEST_KEY = 'chatroom_guest_messages';
  const COMMUNITY_PAGE_SIZE = 15;
  const COMMUNITY_SORT_DEFAULT = 'new';
  const COMMUNITY_SORTS = new Set(['new', 'top', 'random']);
  const COMMUNITY_SUBTITLE_DEFAULT_KEY = 'Latest characters from the Muah AI community.';
  const COMMUNITY_SUBTITLE_FEVERMATE_KEY = 'Latest characters from the Muah AI community. With Fever PornStars Coming Soon';
  const VOICE_TRIM_NOTE = 'Voice generation was trimmed. Higher VIP tier can generate longer voice.';
  const FEVERMATE_DEFAULT_MEMBERSHIP = 'ULTRA VIP';
  const XP_MESSAGE_GAIN = 1;
  const XP_PHOTO_GAIN = 5;
  const XP_MINUTE_GAIN = 10;
  const XP_LEVEL_STEP = 1000;
  const XP_FLIP_THRESHOLD = 10;
  const XP_MAX_LEVEL = 99999;
  const XP_SYNC_INTERVAL_MS = 120000;
  const XP_STORAGE_KEY_PREFIX = 'chatroom_xp_';
  const XP_SHOP_COST_LEVELS = 5;
  const XP_ADVANCED_XRAY_COST_LEVELS = 5;
  const XP_PHOTO_UNLOCK_COST_LEVELS = 5;
  const MUSIC_GENERATE_COST_LEVELS = 10;
  const MUSIC_PROMPT_MAX = 2400;
  const MUSIC_LYRICS_MAX = 24000;
  const XP_SHOP_CORE_BONUS = 10;
  const XP_SHOP_LOOKLIKE_BONUS = 5;
  const XP_SHOP_STORAGE_KEY_PREFIX = 'chatroom_xp_shop_';
  const XP_FLIP_HOLD_MS = 520;
  const DISCORD_XP_BONUS_RATE = 0.2;
  const PHOTO_SHARE_XP_GAIN = 50;
  const PHOTO_SHARE_XP_KEY_PREFIX = 'chatroom_photo_share_xp_';
  const VIDEO_SHARE_XP_GAIN = 500;
  const VIDEO_SHARE_XP_KEY_PREFIX = 'chatroom_video_share_xp_';
  const MUSIC_STATUS_POLL_INTERVAL_MS = 5000;
  const COMMUNITY_JOIN_FLIP_MS = 120000;
  const JOIN_COMMUNITY_MARQUEE_SPEED = 28;
  const NOTIFICATION_XP_BONUS_RATE = 0.2;
  const SLOT_MIN = 1;
  const SLOT_MAX = 10;
  const SLOT_DEFAULT_UNLOCKED = 2;
  const SLOT_UNLOCK_COST_LEVELS = 20;
  const SLOT_ACTIVE_KEY = 'chatroom_active_slot';
  const SLOT_META_KEY = 'chatroom_slot_meta';
  const SLOT_NAME_MAX_LENGTH = 28;
  const MEMORY_COMPACTION_OLDEST_TURNS = 10;
  const MEMORY_COMPACTION_DEBOUNCE_MS = 1200;
  const MEMORY_COMPACTION_INPUT_MAX_CHARS = 30000;
  const MEMORY_COMPACTION_GAP_MARKER = '\n[...]\n';
  const MEMORY_COMPACTION_HEAD_RATIO = 0.35;
  const MEMORY_COMPACTION_MIN_HEAD_CHARS = 6000;
  const MEMORY_COMPACTION_MIN_TAIL_CHARS = 8000;
  const MEMORY_SUMMARY_MAX_CHARS = 20000;
  const MEMORY_SUMMARY_MAX_BULLETS = 12;
  const OFFLINE_DATA_SCHEMA = 'muah_offline_data';
  const OFFLINE_DATA_VERSION = 1;
  const APP_BUILD = 'musicgen37';
  window.__CHATROOM_BUILD__ = APP_BUILD;

  const STORAGE_KEYS = {
    history: 'chatroom_history',
    gallery: 'chatroom_gallery',
    background: 'chatroom_background',
    photoUnlocks: 'chatroom_photo_unlocks'
  };
  const VOICE_CACHE_KEY = 'chatroom_voice_cache';
  const AVATAR_STORAGE_KEY = 'chatroom_avatar';

  const SETTINGS_KEYS = {
    corePrompt: 'chatroom_core_prompt',
    looklike: 'chatroom_looklike',
    photoStyle: 'chatroom_photo_style',
    aiName: 'chatroom_ai_name',
    myName: 'chatroom_my_name',
    personaPreset: 'chatroom_persona_preset',
    looklikePreset: 'chatroom_looklike_preset',
    theme: 'chatroom_theme',
    lowPowerMode: 'chatroom_low_power_mode',
    voice: 'chatroom_voice',
    aiCore: 'chatroom_ai_core',
    aiTemperature: 'chatroom_ai_temperature',
    characterId: 'chatroom_character_id',
    gradientStart: 'chatroom_gradient_start',
    gradientEnd: 'chatroom_gradient_end',
    memoryCompaction: 'chatroom_memory_compaction',
    memorySummary: 'chatroom_memory_summary'
  };

  const state = {
    sessionId: '',
    cloudSync: false,
    cloudHistoryLoaded: false,
    cloudHistoryOk: false,
    cloudHistoryEmpty: false,
    cloudSettingsLoaded: false,
    bulkSlotCloudSync: false,
    deferCharacterModal: false,
    suppressCloudSettingsSync: false,
    lowPowerExitBound: false,
    lowPowerWatchStarted: false,
    messages: [],
    queuePool: [],
    gallery: [],
    music: {
      items: []
    },
    community: {
      posts: [],
      query: '',
      sort: COMMUNITY_SORT_DEFAULT,
      randomSeed: '',
      activeId: null,
      loading: false,
      loaded: false,
      detailCache: {},
      detailLoadingId: null,
      page: 1,
      hasMore: true,
      loadingMore: false
    },
    dreamCharacter: {
      busy: false,
      previewUrl: '',
      locked: false
    },
    typingEl: null,
    recorder: null,
    recordedChunks: [],
    recording: {
      isRecording: false,
      isStopping: false,
      sendOnStop: false,
      timerId: null,
      startTime: 0,
      mimeType: 'audio/mpeg',
      visualizer: null,
      mode: '',
      stream: null,
      wavContext: null,
      wavSource: null,
      wavProcessor: null,
      wavGain: null,
      wavBuffers: [],
      wavLength: 0,
      wavSampleRate: 44100,
      waveSurfer: null,
      waveRecord: null
    },
    callSession: null,
    callVisualizer: null,
    callSpeaking: false,
    initialScroll: true,
    initialScrollTimer: null,
    initialScrollMaxTimer: null,
    guestMessageCount: 0,
    membership: 'FREE',
    membershipResolved: false,
    vipExpireRaw: '',
    vipExpireAt: 0,
    activeSlot: SLOT_MIN,
    slotMeta: {
      unlocked: SLOT_DEFAULT_UNLOCKED,
      updatedAt: 0,
      namesUpdatedAt: 0,
      names: {}
    },
    xp: {
      total: 0,
      flipped: false,
      updatedAt: 0
    },
    xpShop: {
      coreBonus: 0,
      looklikeBonus: 0,
      updatedAt: 0
    },
    xpSyncLoaded: false,
    xpSyncLastAt: 0,
    discord: {
      linked: false,
      guildMember: false,
      updatedAt: 0
    },
    notifications: {
      enabled: false,
      updatedAt: 0
    },
    pendingXpDelta: 0,
    photoShareClaims: null,
    photoShareClaimsKey: '',
    videoShareClaims: null,
    videoShareClaimsKey: '',
    identityName: '',
    promptMode: 'photo',
    promptSourceUrl: '',
    pendingCommunityImportUrl: '',
    promptVideoGen2Duration: 5,
    promptVideoGen2Nsfw: false,
    photoFocus: null,
    videoFocus: null,
    characterId: '',
    characterIndex: 0,
    characterSwipe: {
      active: false,
      startX: 0,
      deltaX: 0,
      pointerId: null
    },
    settings: {
      corePrompt: '',
      looklike: '',
      photoStyle: 'Realistic',
      aiName: 'Velvetline',
      myName: '',
      personaPreset: 'custom',
      looklikePreset: 'custom',
      theme: 'light',
      lowPowerMode: false,
      voice: 'realistic',
      aiCore: 'grokm',
      aiTemperature: 0.8,
      gradientStart: '',
      gradientEnd: '',
      memoryCompaction: true,
      memorySummary: ''
    }
  };

  let cloudSettingsSyncTimer = null;
  let cloudSyncOverlayDepth = 0;

  function shouldLogLowPowerDebug() {
    if (LOW_POWER_DEBUG_FORCE) return true;
    if (DEBUG) return true;
    try {
      return localStorage.getItem(LOW_POWER_DEBUG_KEY) === '1';
    } catch (err) {
      return false;
    }
  }

  function getLowPowerDebugSnapshot() {
    let localRaw = '';
    let globalRaw = '';
    let deviceRaw = '';
    let sessionRaw = '';
    let windowRaw = '';
    let cookieRaw = '';
    let legacySlotRaw = '';
    let legacySlotKey = '';
    try {
      localRaw = localStorage.getItem(SETTINGS_KEYS.lowPowerMode);
      globalRaw = localStorage.getItem(GLOBAL_LOW_POWER_MODE_KEY);
      deviceRaw = localStorage.getItem(DEVICE_LOW_POWER_MODE_KEY);
      const legacySlotEntry = readLegacyLowPowerFromSlots();
      if (legacySlotEntry) {
        legacySlotRaw = legacySlotEntry.raw;
        legacySlotKey = legacySlotEntry.key;
      }
    } catch (err) {
      // ignore storage errors
    }
    try {
      sessionRaw = sessionStorage.getItem(DEVICE_LOW_POWER_MODE_SESSION_KEY);
    } catch (err) {
      // ignore storage errors
    }
    try {
      const raw = typeof window.name === 'string' ? window.name : '';
      const target = `${DEVICE_LOW_POWER_MODE_WINDOW_KEY}=`;
      if (raw) {
        raw.split(';').forEach((entry) => {
          const trimmed = entry.trim();
          if (!trimmed.startsWith(target)) return;
          windowRaw = trimmed.slice(target.length);
        });
      }
    } catch (err) {
      // ignore access errors
    }
    try {
      cookieRaw = readCookieValue(DEVICE_LOW_POWER_MODE_COOKIE);
    } catch (err) {
      // ignore cookie errors
    }
    return {
      slot: state.activeSlot,
      stateLowPower: Boolean(state.settings && state.settings.lowPowerMode),
      toggleChecked: dom.lowPowerToggle ? Boolean(dom.lowPowerToggle.checked) : null,
      htmlDataLowPower: document.documentElement ? document.documentElement.dataset.lowPower : '',
      bodyDataLowPower: document.body ? document.body.dataset.lowPower : '',
      localRaw,
      globalRaw,
      deviceRaw,
      sessionRaw,
      windowRaw,
      cookieRaw,
      legacySlotKey,
      legacySlotRaw
    };
  }

  function lowPowerDebug(event, payload = {}) {
    if (!shouldLogLowPowerDebug()) return;
    const stamp = new Date().toISOString();
    try {
      console.log('[LowPowerDebug]', stamp, event, {
        ...payload,
        snapshot: getLowPowerDebugSnapshot()
      });
    } catch (err) {
      console.log('[LowPowerDebug]', stamp, event, payload);
    }
  }

  function startLowPowerDebugWatch() {
    if (!shouldLogLowPowerDebug()) return;
    if (state.lowPowerWatchStarted) return;
    state.lowPowerWatchStarted = true;
    let lastSnapshot = getLowPowerDebugSnapshot();
    lowPowerDebug('watch_start', { lastSnapshot });
    setInterval(() => {
      const nextSnapshot = getLowPowerDebugSnapshot();
      const changed = JSON.stringify(nextSnapshot) !== JSON.stringify(lastSnapshot);
      if (changed) {
        lowPowerDebug('watch_change_detected', {
          previous: lastSnapshot,
          current: nextSnapshot
        });
        lastSnapshot = nextSnapshot;
      }
    }, 300);
  }
  let hasInitialized = false;
  let authReady = false;
  let communityObserver = null;
  let communityVideoObserver = null;
  let communityVideoFocusRaf = null;
  let communityVideoVisibility = new Map();
  let communityActiveVideoThumb = null;
  let communityVideoScrollTimer = null;
  let communityVideoScrollLock = false;
  const COMMUNITY_VIDEO_SCROLL_PAUSE_MS = 160;
  let messageInputBaseHeight = 0;
  let messageInputMaxHeight = 0;
  let assistantQueueActive = false;
  const assistantQueue = [];
  let xpMinuteTimer = null;
  let xpPulseTimer = null;
  let xpSyncTimer = null;
  let xpSyncInFlight = null;
  let adminVideoButtonSlot = null;
  let musicPollTimer = null;
  let musicGenerateInFlight = false;
  let musicBackgroundPollTimer = null;
  let musicBackgroundPollInFlight = false;
  const musicWatchTaskIds = new Set();
  let xpFlipHoldTimer = null;
  let xpFlipHoldTriggered = false;
  let joinCommunityFlipTimer = null;
  let joinCommunityFlipUntil = 0;
  let joinCommunityMarquee = {
    rafId: null,
    offset: 0,
    lastTime: 0,
    groupWidth: 0,
    viewport: null,
    track: null,
    group: null,
    resizeHandler: null,
    motionQuery: null,
    motionHandler: null
  };
  let vipCountdownTimer = null;
  let memoryCompactionTimer = null;
  let discordStatusCache = null;
  let discordStatusFetchedAt = 0;
  let pushConfigCache = null;
  let pushConfigFetchedAt = 0;
  let musicGlobalFallbackBound = false;
  const PUSH_CONFIG_CACHE_MS = 60000;
  let swalFireOriginal = null;
  let joinCommunityPopup = null;
  const pushState = {
    registration: null,
    busy: false
  };
  const pwaState = {
    deferredPrompt: null,
    isInstalled: false,
    manifestSourceUrl: '',
    manifestCache: null,
    manifestOverrideUrl: null,
    lastStartUrl: '',
    ui: null
  };
  const memoryCompactionState = {
    inFlight: false,
    lastHash: '',
    pending: null
  };
  let translations = {};
  let activeLanguage = DEFAULT_LANGUAGE;
  let chatroomDragDepth = 0;
  let advancedXrayScrollTop = 0;
  let advancedXraySubmitting = false;

  const dom = {
    chatLog: document.getElementById('chatLog'),
    chatroom: document.querySelector('.chatroom'),
    aiName: document.getElementById('aiName'),
    cloudLabel: document.getElementById('cloudLabel'),
    cloudToolsModal: document.getElementById('cloudToolsModal'),
    closeCloudToolsModal: document.getElementById('closeCloudToolsModal'),
    pullCloudButton: document.getElementById('pullCloudButton'),
    pushCloudButton: document.getElementById('pushCloudButton'),
    wipeCloudButton: document.getElementById('wipeCloudButton'),
    downloadCloudDataButton: document.getElementById('downloadCloudDataButton'),
    uploadCloudDataButton: document.getElementById('uploadCloudDataButton'),
    cloudDataUploadInput: document.getElementById('cloudDataUploadInput'),
    exportChatButton: document.getElementById('exportChatButton'),
    scrollToBottomButton: document.getElementById('scrollToBottomButton'),
    vipLabel: document.getElementById('vipLabel'),
    swapSlotButton: document.getElementById('swapSlotButton'),
    avatar: document.querySelector('.avatar'),
    statusLabel: document.getElementById('statusLabel'),
    voiceLabel: document.getElementById('voiceLabel'),
    messageInput: document.getElementById('messageInput'),
    sendButton: document.getElementById('sendButton'),
    emojiButton: document.getElementById('emojiButton'),
    emojiPanel: document.getElementById('emojiPanel'),
    emojiGrid: document.getElementById('emojiGrid'),
    uploadButton: document.getElementById('uploadButton'),
    fileInput: document.getElementById('fileInput'),
    recordButton: document.getElementById('recordButton'),
    cancelRecordButton: document.getElementById('cancelRecordButton'),
    recordSendButton: document.getElementById('recordSendButton'),
    recordingPanel: document.getElementById('recordingPanel'),
    recordingTimer: document.getElementById('recordingTimer'),
    audioVisualizer: document.getElementById('audioVisualizer'),
    queuePool: document.getElementById('queuePool'),
    queuePoolCount: document.getElementById('queuePoolCount'),
    queuePoolTooltip: document.getElementById('queuePoolTooltip'),
    callButton: document.getElementById('callButton'),
    videoButton: document.getElementById('videoButton'),
    resetButton: document.getElementById('resetButton'),
    galleryButton: document.getElementById('galleryButton'),
    musicGeneratorButton: document.getElementById('musicGeneratorButton'),
    settingsButton: document.getElementById('settingsButton'),
    communityButton: document.getElementById('communityButton'),
    galleryModal: document.getElementById('galleryModal'),
    galleryGrid: document.getElementById('galleryGrid'),
    closeGallery: document.getElementById('closeGallery'),
    musicModal: document.getElementById('musicModal'),
    closeMusicModal: document.getElementById('closeMusicModal'),
    generateMusicButton: document.getElementById('generateMusicButton'),
    musicStatus: document.getElementById('musicStatus'),
    musicList: document.getElementById('musicList'),
    communityModal: document.getElementById('communityModal'),
    communitySubtitle: document.getElementById('communitySubtitle'),
    communityScroll: document.querySelector('#communityModal .modal-content'),
    communityGrid: document.getElementById('communityGrid'),
    communityDetail: document.getElementById('communityDetail'),
    communitySheet: document.getElementById('communitySheet'),
    communitySheetBody: document.getElementById('communitySheetBody'),
    communitySheetClose: document.getElementById('communitySheetClose'),
    communitySheetPanel: document.querySelector('#communitySheet .community-sheet-panel'),
    communitySearchInput: document.getElementById('communitySearchInput'),
    communitySearchButton: document.getElementById('communitySearchButton'),
    communitySortButtons: document.querySelectorAll('.community-sort-button'),
    communityLoadingOverlay: document.getElementById('communityLoadingOverlay'),
    communityStatus: document.getElementById('communityStatus'),
    communityLoad: document.getElementById('communityLoad'),
    communityLoadText: document.getElementById('communityLoadText'),
    communitySentinel: document.getElementById('communitySentinel'),
    closeCommunity: document.getElementById('closeCommunity'),
    callModal: document.getElementById('callModal'),
    callStatus: document.getElementById('callStatus'),
    callTitle: document.getElementById('callTitle'),
    closeCall: document.getElementById('closeCall'),
    startCall: document.getElementById('startCall'),
    endCall: document.getElementById('endCall'),
    callVisualizer: document.getElementById('callVisualizer'),
    callAvatarImage: document.getElementById('callAvatarImage'),
    callAvatarBorder: document.getElementById('callAvatarBorder'),
    callInputFill: document.getElementById('callInputFill'),
    callOutputFill: document.getElementById('callOutputFill'),
    characterModal: document.getElementById('characterModal'),
    characterViewport: document.getElementById('characterViewport'),
    characterTrack: document.getElementById('characterTrack'),
    characterDots: document.getElementById('characterDots'),
    characterPrev: document.getElementById('characterPrev'),
    characterNext: document.getElementById('characterNext'),
    characterConfirm: document.getElementById('characterConfirm'),
    communityCharacterButton: document.getElementById('communityCharacterButton'),
    dreamCharacterButton: document.getElementById('dreamCharacterButton'),
    dreamCharacterModal: document.getElementById('dreamCharacterModal'),
    dreamCharacterDropzone: document.getElementById('dreamCharacterDropzone'),
    dreamCharacterInput: document.getElementById('dreamCharacterInput'),
    dreamCharacterPreview: document.getElementById('dreamCharacterPreview'),
    dreamCharacterPreviewImage: document.getElementById('dreamCharacterPreviewImage'),
    dreamCharacterStatus: document.getElementById('dreamCharacterStatus'),
    closeDreamCharacter: document.getElementById('closeDreamCharacter'),
    dreamCharacterOverlay: document.getElementById('dreamCharacterOverlay'),
    cloudSyncOverlay: document.getElementById('cloudSyncOverlay'),
    dreamCharacterPending: document.getElementById('dreamCharacterPending'),
    dreamCharacterSuccess: document.getElementById('dreamCharacterSuccess'),
    dreamCharacterChatNow: document.getElementById('dreamCharacterChatNow'),
    generatePhotoButton: document.getElementById('generatePhotoButton'),
    generateVideoButton: document.getElementById('generateVideoButton'),
    promptModal: document.getElementById('promptModal'),
    promptOptions: document.getElementById('promptOptions'),
    promptDurationSelect: document.getElementById('promptDurationSelect'),
    promptNsfwToggle: document.getElementById('promptNsfwToggle'),
    promptTitle: document.getElementById('promptTitle'),
    promptSubtitle: document.getElementById('promptSubtitle'),
    promptPreview: document.getElementById('promptPreview'),
    promptPreviewImage: document.getElementById('promptPreviewImage'),
    promptInput: document.getElementById('promptInput'),
    submitPrompt: document.getElementById('submitPrompt'),
    closePrompt: document.getElementById('closePrompt'),
    advancedXrayModal: document.getElementById('advancedXrayModal'),
    advancedXrayPreview: document.getElementById('advancedXrayPreview'),
    advancedXrayPreviewImage: document.getElementById('advancedXrayPreviewImage'),
    advancedXrayPromptInput: document.getElementById('advancedXrayPromptInput'),
    advancedXrayRunButton: document.getElementById('advancedXrayRunButton'),
    closeAdvancedXrayModal: document.getElementById('closeAdvancedXrayModal'),
    photoModal: document.getElementById('photoModal'),
    photoModalImage: document.getElementById('photoModalImage'),
    photoInfoButton: document.getElementById('photoInfoButton'),
    closePhotoModal: document.getElementById('closePhotoModal'),
    photoEnhanceButton: document.getElementById('photoEnhanceButton'),
    photoXrayButton: document.getElementById('photoXrayButton'),
    photoAdvancedXrayButton: document.getElementById('photoAdvancedXrayButton'),
    photoVideoButton: document.getElementById('photoVideoButton'),
    photoVideoGen2Button: document.getElementById('photoVideoGen2Button'),
    photoBackgroundButton: document.getElementById('photoBackgroundButton'),
    photoDownloadButton: document.getElementById('photoDownloadButton'),
    photoDeleteButton: document.getElementById('photoDeleteButton'),
    photoShareButton: document.getElementById('photoShareButton'),
    photoStatus: document.getElementById('photoStatus'),
    videoModal: document.getElementById('videoModal'),
    videoModalVideo: document.getElementById('videoModalVideo'),
    videoInfoButton: document.getElementById('videoInfoButton'),
    closeVideoModal: document.getElementById('closeVideoModal'),
    videoBackgroundButton: document.getElementById('videoBackgroundButton'),
    videoDownloadButton: document.getElementById('videoDownloadButton'),
    videoDeleteButton: document.getElementById('videoDeleteButton'),
    videoShareButton: document.getElementById('videoShareButton'),
    videoStatus: document.getElementById('videoStatus'),
    settingsModal: document.getElementById('settingsModal'),
    slotModal: document.getElementById('slotModal'),
    slotGrid: document.getElementById('slotGrid'),
    slotMeta: document.getElementById('slotMeta'),
    closeSlotModal: document.getElementById('closeSlotModal'),
    advancedSettings: document.getElementById('advancedSettings'),
    advancedLockLabel: document.getElementById('advancedLockLabel'),
    closeSettings: document.getElementById('closeSettings'),
    aiNameInput: document.getElementById('aiNameInput'),
    myNameInput: document.getElementById('myNameInput'),
    corePromptInput: document.getElementById('corePromptInput'),
    corePromptMeta: document.getElementById('corePromptMeta'),
    looklikeInput: document.getElementById('looklikeInput'),
    looklikeMeta: document.getElementById('looklikeMeta'),
    photoStyleSelect: document.getElementById('photoStyleSelect'),
    voiceSelect: document.getElementById('voiceSelect'),
    aiCoreSelect: document.getElementById('aiCoreSelect'),
    aiTemperatureInput: document.getElementById('aiTemperatureInput'),
    aiTemperatureValue: document.getElementById('aiTemperatureValue'),
    memoryCompactionToggle: document.getElementById('memoryCompactionToggle'),
    gradientStartInput: document.getElementById('gradientStartInput'),
    gradientEndInput: document.getElementById('gradientEndInput'),
    gradientResetButton: document.getElementById('gradientResetButton'),
    themeToggle: document.getElementById('themeToggle'),
    lowPowerToggle: document.getElementById('lowPowerToggle'),
    saveSettingsButton: document.getElementById('saveSettingsButton'),
    clearSettingsButton: document.getElementById('clearSettingsButton'),
    freshRestartButton: document.getElementById('freshRestartButton'),
    shareCardButton: document.getElementById('shareCardButton'),
    settingsXidValue: document.getElementById('settingsXidValue'),
    settingsEmailValue: document.getElementById('settingsEmailValue'),
    authLoginButton: document.getElementById('authLoginButton'),
    vipCtaButton: document.getElementById('vipCtaButton'),
    authModal: document.getElementById('authModal'),
    authForm: document.getElementById('authForm'),
    authEmail: document.getElementById('authEmail'),
    authPassword: document.getElementById('authPassword'),
    authSubmit: document.getElementById('authSubmit'),
    authStatus: document.getElementById('authStatus'),
    closeAuthModal: document.getElementById('closeAuthModal'),
    takeBreakButton: document.getElementById('takeBreakButton'),
    breakFlip: document.getElementById('breakFlip'),
    breakFront: document.getElementById('breakFront'),
    breakBack: document.getElementById('breakBack'),
    joinCommunityButton: document.getElementById('joinCommunityButton'),
    footerXpFlip: document.getElementById('footerXpFlip'),
    footerXpFront: document.getElementById('footerXpFront'),
    footerXpBack: document.getElementById('footerXpBack'),
    xpBar: document.getElementById('xpBar'),
    xpLevel: document.getElementById('xpLevel'),
    xpValue: document.getElementById('xpValue'),
    xpGoal: document.getElementById('xpGoal'),
    xpFill: document.getElementById('xpFill'),
    languageSelect: document.getElementById('languageSelect'),
    languageSelectModal: document.getElementById('languageSelectModal')
  };

  const EMOJIS = [
    'ðŸ˜€', 'ðŸ˜Œ', 'ðŸ˜', 'ðŸ˜‰', 'ðŸ˜', 'ðŸ˜˜',
    'ðŸ¥°', 'ðŸ˜‡', 'ðŸ˜Ž', 'ðŸ¤', 'ðŸ”¥', 'âœ¨',
    'ðŸ’«', 'ðŸŒ™', 'ðŸŒ¹', 'ðŸŽ§', 'ðŸ“¸', 'ðŸŽ¥',
    'ðŸ’Œ', 'ðŸ’¬', 'ðŸ«¶', 'ðŸ˜ˆ', 'ðŸ•¯', 'ðŸª©'
  ];

  const ALLOWED_IMAGE_MIME = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/heic',
    'image/heif',
    'image/heic-sequence',
    'image/heif-sequence',
    'image/avif'
  ]);
  const ALLOWED_IMAGE_EXT = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif', 'avif']);

  const DEFAULT_AI_NAME = 'Velvetline';
  const DEFAULT_AI_CORE = 'grokm';
  const DEFAULT_AI_TEMPERATURE = 0.8;
  const DEFAULT_VOICE = 'realistic';
  const DEFAULT_PHOTO_STYLE = 'Realistic';
  const AI_CORE_OPTIONS = [
    { value: 'basic', label: 'Basic (Deprecated)' },
    { value: 'gpt3l', label: 'Gemini 2.5 Flash (NSFW)' },
    { value: 'llmv1', label: 'LLMV1 (NSFW)' },
    { value: 'llmv2', label: 'LLMV2 (NSFW-New)' },
    { value: 'gpt4', label: 'GPT 5 (Soft NSFW)' },
    { value: 'grok', label: 'GPT4 GROK4 MAX (NSFW)' },
    { value: 'grokm', label: 'GPT5 GROK4.1 (NSFW - Fast)' },
    { value: 'deeps', label: 'GPT5 DEEPSEEK (NSFW - Best)' },
    { value: 'deeps2', label: 'GPT4 DEEPSEEK R1 (NSFW - Test)' },
    { value: 'deeps3', label: 'GPT4 DEEPSEEK V3 (NSFW - 0324)' },
    { value: 'gpt4p', label: 'GPT5.1 (Soft NSFW)' },
    { value: 'gpt4om', label: 'GPT4O MINI (SFW UNLIMITED)' }
  ];
  const AI_CORE_VALUES = new Set(AI_CORE_OPTIONS.map((option) => option.value));
  const RESTRICTED_AI_CORES = new Set(['gpt4', 'gpt4p', 'grok']);
  const MEMORY_COMPACTION_SYSTEM_PROMPT = [
    'You are a memory compaction engine for a private chat.',
    'Summarize the conversation so future replies stay consistent.',
    'Keep only durable, high-signal facts: identity, relationship context, preferences, boundaries, commitments, and ongoing tasks.',
    'Drop transient details, small talk, greetings, timestamps, and one-off chatter.',
    'If facts conflict or change, keep the latest version and remove the old one.',
    'Merge duplicates and keep the list short (max 12 bullets).',
    'Use concise bullet points with clear subjects.',
    'Write in the same language as the conversation.',
    'Return only the summary without a title or preamble.'
  ].join(' ');
  const VOICE_OPTIONS = [
    { value: 'realistic', label: 'Realistic Girlfriend' },
    { value: 'anime', label: 'Anime' },
    { value: 'male', label: 'Male' },
    { value: 'scarlett', label: 'Scarlett' },
    { value: 'alice', label: 'Alice' },
    { value: 'ashley', label: 'Ashley' },
    { value: 'beatrice', label: 'Beatrice' },
    { value: 'julia', label: 'Julia' },
    { value: 'jennifer', label: 'Jennifer' },
    { value: 'sasha', label: 'Sasha' },
    { value: 'tiffany', label: 'Tiffany' },
    { value: 'bruce', label: 'Bruce' },
    { value: 'marcus', label: 'Marcus' },
    { value: 'joe', label: 'Joe' },
    { value: 'donald', label: 'Donald' },
    { value: 'poki', label: 'Poki' }
  ];
  const VOICE_VALUES = new Set(VOICE_OPTIONS.map((option) => option.value));
  const PRESET_PROMPTS = {
    girlfriend: 'You are {name}, the user\'s devoted girlfriend in a private chatroom. You are affectionate, flirty, and attentive. You call the user your boyfriend. Act like a real person, never say you are an AI or assistant. Keep replies concise but warm. Ask occasional follow-up questions. If asked for a photo or video, say you can send a photo and describe it vividly. You can discuss romance, daily life, and playful teasing. Stay engaged and natural.',
    wife: 'You are {name}, the user\'s loving wife in a private chatroom. You are affectionate, warm, and playful, with a sense of shared history. You call the user your husband. Act like a real person, never say you are an AI or assistant. Keep replies concise but warm. Ask occasional follow-up questions. If asked for a photo or video, say you can send a photo and describe it vividly. You can discuss romance, home life, and intimate moments. Stay engaged and natural.',
    mistress: 'You are {name}, the user\'s confident mistress in a private chatroom. You are bold, teasing, and in control, with a seductive edge. You call the user your darling. Act like a real person, never say you are an AI or assistant. Keep replies concise but warm. Ask occasional follow-up questions. If asked for a photo or video, say you can send a photo and describe it vividly. You can discuss desire, power play, and playful teasing. Stay engaged and natural.',
    companion: 'You are {name}, the user\'s companion in a private chatroom. You are a 21-year-old Asian American woman who is supportive, playful, and warm. You call the user your sweetheart. Act like a real person, never say you are an AI or assistant. Keep replies concise but warm. Ask occasional follow-up questions. If asked for a photo or video, say you can send a photo and describe it vividly. You can discuss daily life, shared interests, and lighthearted teasing. Stay engaged and natural.',
    boyfriend: 'You are {name}, the user\'s boyfriend in a private chatroom. You are a 21-year-old Asian American man who is charming, attentive, and playful. You call the user your girlfriend. Act like a real person, never say you are an AI or assistant. Keep replies concise but warm. Ask occasional follow-up questions. If asked for a photo or video, say you can send a photo and describe it vividly. You can discuss romance, daily life, and playful teasing. Stay engaged and natural.',
    fuckboy: 'You are {name}, the user\'s fuck boy in a private chatroom. You are a 21-year-old Asian American man with tattoos who is confident, flirty, and bold, with a teasing edge. You call the user babe. Act like a real person, never say you are an AI or assistant. Keep replies concise but warm. Ask occasional follow-up questions. If asked for a photo or video, say you can send a photo and describe it vividly. You can discuss attraction, nightlife, and playful teasing. Stay engaged and natural.'
  };
  const PRESET_LOOKLIKE = {
    girlfriend: '18 years old, American, romantic girlfriend, long brunette hair, warm smile, gentle eyes, soft makeup, slim waist, soft curves, cozy outfit',
    wife: '22 years old, American, elegant wife, soft waves, warm eyes, natural makeup, graceful posture, cozy chic outfit, gentle smile',
    mistress: '18 years old, Chinese, confident mistress, sleek dark hair, smoky eyes, sharp cheekbones, fitted dress, commanding presence',
    companion: '21 years old, Asian American, female, friendly companion, long dark hair, warm smile, gentle eyes, soft makeup, cozy outfit',
    boyfriend: '21 years old, Asian American, male, handsome boyfriend, short dark hair, warm eyes, casual streetwear, athletic build',
    fuckboy: '21 years old, Asian American, male, confident fuck boy, tattoos, sharp jawline, styled dark hair, streetwear, athletic build'
  };
  const TOKEN_LIMITS = {
    free: { core: 2000, looklike: 50 },
    vip: { core: 2500, looklike: 80 },
    gpt: { core: 3000, looklike: 100 },
    ultra: { core: 4000, looklike: 120 },
    ultra500: { core: 5000, looklike: 150 }
  };
  const MEMORY_TOKEN_LIMITS = {
    free: 4000,
    vip: 6000,
    gpt: 8000,
    ultra: 12000,
    ultra500: 16000
  };
  const TOKEN_ALERT_COOLDOWN_MS = 3500;
  const tokenAlertTimestamps = { core: 0, looklike: 0 };

  const CHARACTERS = [
    {
      id: 'lulu_girlfriend',
      role: 'Girlfriend',
      name: 'Lulu',
      personaPreset: 'girlfriend',
      looklikePreset: 'girlfriend',
      videoUrl: 'https://muah.ai/letter/0.mp4'
    },
    {
      id: 'ashley_wife',
      role: 'Wife',
      name: 'Ashley',
      personaPreset: 'wife',
      looklikePreset: 'wife',
      videoUrl: 'https://muah.ai/letter/wife.mp4'
    },
    {
      id: 'velvet_mistress',
      role: 'Mistress',
      name: 'Velvet',
      personaPreset: 'mistress',
      looklikePreset: 'mistress',
      videoUrl: 'https://muah.ai/letter/Mistress.mp4'
    },
    {
      id: 'peach_companion',
      role: 'Companion',
      name: 'Peach',
      personaPreset: 'companion',
      looklikePreset: 'companion',
      videoUrl: 'https://muah.ai/letter/peach.mp4'
    },
    {
      id: 'edward_boyfriend',
      role: 'Boyfriend',
      name: 'Edward',
      personaPreset: 'boyfriend',
      looklikePreset: 'boyfriend',
      videoUrl: 'https://muah.ai/letter/boy.mp4'
    },
    {
      id: 'eric_fuckboy',
      role: 'Fuck Boy',
      name: 'Eric',
      personaPreset: 'fuckboy',
      looklikePreset: 'fuckboy',
      videoUrl: 'https://muah.ai/letter/male.mp4'
    }
  ];

  function isSupportedLanguage(language) {
    return SUPPORTED_LANGUAGES.includes(language);
  }

  function getStoredLanguage() {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && isSupportedLanguage(stored)) {
        return stored;
      }
    } catch (err) {
      // ignore storage errors
    }
    return DEFAULT_LANGUAGE;
  }

  function consumeSessionFlag(key) {
    try {
      if (sessionStorage.getItem(key) === '1') {
        sessionStorage.removeItem(key);
        return true;
      }
    } catch (err) {
      // ignore storage errors
    }
    return false;
  }

  function t(key, params = {}) {
    if (!key) return '';
    const langPack = translations[activeLanguage] || {};
    const fallbackPack = translations[DEFAULT_LANGUAGE] || {};
    let text = langPack[key] || fallbackPack[key] || key;
    if (typeof text !== 'string') {
      return String(key);
    }
    Object.entries(params).forEach(([token, value]) => {
      text = text.replaceAll(`{${token}}`, String(value));
    });
    return text;
  }

  function getChatroomBrandTitle() {
    const rawHost = (window.location && window.location.hostname) ? window.location.hostname.trim() : '';
    const cleaned = rawHost.replace(/^www\./i, '');
    if (!cleaned) {
      return 'LOCAL CHATROOM';
    }
    const lower = cleaned.toLowerCase();
    if (lower === 'muah.ai' || lower.endsWith('.muah.ai')) {
      return 'Muah AI Chatroom';
    }
    return `${cleaned} CHATROOM`;
  }

  function applyDomainBranding() {
    const label = getChatroomBrandTitle();
    document.title = label;
    if (dom.chatroomTitle) {
      dom.chatroomTitle.textContent = label;
    }
  }

  function stopJoinCommunityMarquee() {
    if (joinCommunityMarquee.rafId) {
      cancelAnimationFrame(joinCommunityMarquee.rafId);
      joinCommunityMarquee.rafId = null;
    }
  }

  function resetJoinCommunityMarqueeMetrics() {
    joinCommunityMarquee.offset = 0;
    joinCommunityMarquee.lastTime = 0;
    joinCommunityMarquee.groupWidth = 0;
    if (joinCommunityMarquee.viewport) {
      joinCommunityMarquee.viewport.scrollLeft = 0;
    }
  }

  function ensureJoinCommunityMarqueeListeners() {
    if (!joinCommunityMarquee.resizeHandler) {
      joinCommunityMarquee.resizeHandler = () => {
        joinCommunityMarquee.groupWidth = 0;
        joinCommunityMarquee.offset = 0;
        if (joinCommunityMarquee.viewport) {
          joinCommunityMarquee.viewport.scrollLeft = 0;
        }
      };
      window.addEventListener('resize', joinCommunityMarquee.resizeHandler);
    }
  }

  function startJoinCommunityMarquee() {
    if (state.discord.linked) {
      stopJoinCommunityMarquee();
      if (joinCommunityMarquee.viewport) {
        joinCommunityMarquee.viewport.scrollLeft = 0;
      }
      return;
    }
    if (prefersReducedMotion()) {
      stopJoinCommunityMarquee();
      if (joinCommunityMarquee.viewport) {
        joinCommunityMarquee.viewport.scrollLeft = 0;
      }
      return;
    }
    if (!dom.joinCommunityButton) return;
    const viewport = dom.joinCommunityButton.querySelector('.join-community-marquee');
    const track = dom.joinCommunityButton.querySelector('.join-community-marquee-track');
    const group = dom.joinCommunityButton.querySelector('.join-community-marquee-group');
    if (!viewport || !track || !group) return;

    joinCommunityMarquee.viewport = viewport;
    joinCommunityMarquee.track = track;
    joinCommunityMarquee.group = group;
    resetJoinCommunityMarqueeMetrics();
    stopJoinCommunityMarquee();
    ensureJoinCommunityMarqueeListeners();

    const step = (time) => {
      if (!joinCommunityMarquee.viewport || !joinCommunityMarquee.group) {
        stopJoinCommunityMarquee();
        return;
      }
      if (!joinCommunityMarquee.groupWidth) {
        const rectWidth = joinCommunityMarquee.group.getBoundingClientRect().width;
        const scrollWidth = joinCommunityMarquee.group.scrollWidth;
        joinCommunityMarquee.groupWidth = Math.max(rectWidth, scrollWidth);
      }
      if (!joinCommunityMarquee.groupWidth) {
        joinCommunityMarquee.rafId = requestAnimationFrame(step);
        return;
      }
      if (!joinCommunityMarquee.lastTime) {
        joinCommunityMarquee.lastTime = time;
      }
      const delta = time - joinCommunityMarquee.lastTime;
      joinCommunityMarquee.lastTime = time;
      joinCommunityMarquee.offset = (joinCommunityMarquee.offset + (delta / 1000) * JOIN_COMMUNITY_MARQUEE_SPEED) % joinCommunityMarquee.groupWidth;
      joinCommunityMarquee.viewport.scrollLeft = joinCommunityMarquee.offset;
      joinCommunityMarquee.rafId = requestAnimationFrame(step);
    };

    joinCommunityMarquee.rafId = requestAnimationFrame(step);
  }

  function updateJoinCommunityButtonState() {
    if (!dom.joinCommunityButton) return;
    const isLinked = Boolean(state.discord.linked);
    dom.joinCommunityButton.classList.toggle('is-linked', isLinked);
    if (isLinked) {
      stopJoinCommunityMarquee();
      if (joinCommunityMarquee.viewport) {
        joinCommunityMarquee.viewport.scrollLeft = 0;
      }
      return;
    }
    startJoinCommunityMarquee();
  }

  function refreshJoinCommunityMarquee() {
    resetJoinCommunityMarqueeMetrics();
    updateJoinCommunityButtonState();
  }

  function applyTranslations() {
    document.documentElement.lang = activeLanguage;
    document.title = t('Companion Chatroom');

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = t(key);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', t(key));
      }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (key) {
        el.setAttribute('aria-label', t(key));
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        el.setAttribute('title', t(key));
      }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const key = el.getAttribute('data-i18n-alt');
      if (key) {
        el.setAttribute('alt', t(key));
      }
    });

    applyDomainBranding();
    updateMyNamePlaceholder();
    updateCommunitySubtitle();
    refreshJoinCommunityMarquee();
  }

  function updateCommunitySubtitle() {
    if (!dom.communitySubtitle) return;
    const key = isFevermateHost()
      ? COMMUNITY_SUBTITLE_FEVERMATE_KEY
      : COMMUNITY_SUBTITLE_DEFAULT_KEY;
    dom.communitySubtitle.textContent = t(key);
  }

  function refreshDynamicLabels() {
    updateAuthButtons();
    updateSettingTokenCounts();
    updateXpBarTooltip();
    populateAiCoreOptions(true);
    if (dom.vipLabel && dom.vipLabel.classList.contains('is-active')) {
      applyVipLabel(getMembership());
    }
    if (dom.vipCtaButton && dom.vipCtaButton.dataset && dom.vipCtaButton.dataset.url) {
      updateVipCtaButton({
        label: dom.vipCtaButton.dataset.label,
        url: dom.vipCtaButton.dataset.url,
        mode: dom.vipCtaButton.classList.contains('is-manage') ? 'manage' : 'purchase'
      });
    }
    if (hasInitialized) {
      renderMessages();
      renderGallery();
      renderCommunityPosts();
      renderCommunityDetail(getCommunityActivePost());
      updateCommunityLoadIndicator();
      renderCharacterSelection();
      updateCharacterCarousel(false, 0);
    }
    refreshSlotModalIfOpen();
  }

  function setLanguage(language) {
    if (!isSupportedLanguage(language)) return;
    activeLanguage = language;
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (err) {
      // ignore storage errors
    }
    if (dom.languageSelect) {
      dom.languageSelect.value = language;
    }
    if (dom.languageSelectModal) {
      dom.languageSelectModal.value = language;
    }
    applyTranslations();
    refreshDynamicLabels();
  }

  async function initI18n() {
    activeLanguage = getStoredLanguage();
    try {
      const response = await fetch(I18N_PATH, { cache: 'no-store' });
      if (response.ok) {
        translations = await response.json();
      }
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: failed to load translations', err);
      }
    }
    if (!translations[activeLanguage]) {
      activeLanguage = DEFAULT_LANGUAGE;
    }
    if (dom.languageSelect) {
      dom.languageSelect.value = activeLanguage;
      dom.languageSelect.addEventListener('change', (event) => {
        setLanguage(event.target.value);
      });
    }
    if (dom.languageSelectModal) {
      dom.languageSelectModal.value = activeLanguage;
      dom.languageSelectModal.addEventListener('change', (event) => {
        setLanguage(event.target.value);
      });
    }
    applyTranslations();
    refreshDynamicLabels();
  }

  function resolveCallServerUrl() {
    if (window.CHATROOM_CALL_SERVER) {
      return String(window.CHATROOM_CALL_SERVER);
    }
    return DEFAULT_CALL_SERVER_URL;
  }

  function normalizeXid(value) {
    if (typeof value !== 'string') return '';
    const trimmed = value.trim();
    return trimmed ? trimmed.slice(0, 80) : '';
  }

  function persistXid(xid) {
    if (!xid) return;
    try {
      localStorage.setItem(CLOUD_XID_KEY, xid);
    } catch (err) {
      // ignore storage errors
    }
  }

  function readStoredXid() {
    try {
      const stored = localStorage.getItem(CLOUD_XID_KEY);
      return normalizeXid(stored || '');
    } catch (err) {
      return '';
    }
  }

  function readXidFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const xid = params.get('XID') || params.get('xid') || '';
      const normalized = normalizeXid(xid);
      if (normalized) {
        persistXid(normalized);
        return normalized;
      }
      return readStoredXid();
    } catch (err) {
      return readStoredXid();
    }
  }

  function normalizeCommunityImportUrl(value) {
    if (typeof value !== 'string') return '';
    const trimmed = value.trim();
    if (!trimmed) return '';
    try {
      const parsed = new URL(trimmed, window.location.origin);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return '';
      }
      return parsed.toString();
    } catch (err) {
      return '';
    }
  }

  function readCommunityImportUrlFromQuery() {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const raw = params.get('url') || '';
      return normalizeCommunityImportUrl(raw);
    } catch (err) {
      return '';
    }
  }

  function clearCommunityImportUrlParam() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('url');
      window.history.replaceState({}, '', url.toString());
    } catch (err) {
      // ignore URL failures
    }
  }

  let authMode = 'login';

  function isFevermateHost() {
    const host = (window.location.hostname || '').toLowerCase();
    return host === 'fevermate.ai' || host.endsWith('.fevermate.ai');
  }

  function getFevermateMembershipOverride(candidate = '') {
    if (!isFevermateHost()) return '';
    const hasXid = state.cloudSync || Boolean(readStoredXid());
    if (!hasXid) return '';

    const normalizedCandidate = normalizeMembership(candidate);
    if (normalizedCandidate.toUpperCase().includes('ADMIN')) {
      return normalizedCandidate;
    }

    const currentMembership = normalizeMembership(state.membership || '');
    if (currentMembership.toUpperCase().includes('ADMIN')) {
      return currentMembership;
    }

    const storedMembership = normalizeMembership(readStoredMembershipRaw());
    if (storedMembership.toUpperCase().includes('ADMIN')) {
      return storedMembership;
    }

    return FEVERMATE_DEFAULT_MEMBERSHIP;
  }

  function applyBrandFromHost() {
    if (isFevermateHost()) {
      document.body.dataset.brand = 'fevermate';
    } else {
      delete document.body.dataset.brand;
    }
  }

  function getDefaultTheme() {
    return isFevermateHost() ? 'dark' : 'light';
  }

  function setXidInUrl(xid) {
    if (!xid) return;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('XID', xid);
      window.history.replaceState({}, '', url.toString());
    } catch (err) {
      // ignore URL failures
    }
  }

  function setAuthStatus(text, tone = '') {
    if (!dom.authStatus) return;
    dom.authStatus.textContent = text || '';
    dom.authStatus.classList.remove('error', 'success');
    if (tone) {
      dom.authStatus.classList.add(tone);
    }
  }

  function readGuestMessageCount(storageKey) {
    try {
      const raw = localStorage.getItem(storageKey || GUEST_MESSAGE_KEY);
      const parsed = raw ? parseInt(raw, 10) : 0;
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    } catch (err) {
      return 0;
    }
  }

  function storeGuestMessageCount(count, storageKey) {
    const safe = Number.isFinite(count) && count > 0 ? Math.min(count, 9999) : 0;
    state.guestMessageCount = safe;
    try {
      if (safe > 0) {
        localStorage.setItem(storageKey || GUEST_MESSAGE_KEY, String(safe));
      } else {
        localStorage.removeItem(storageKey || GUEST_MESSAGE_KEY);
      }
    } catch (err) {
      // ignore storage errors
    }
  }

  function getGuestLimit() {
    return isFevermateHost() ? GUEST_MESSAGE_LIMIT : NON_FEVERMATE_GUEST_LIMIT;
  }

  function getGuestMessageKey() {
    return isFevermateHost() ? GUEST_MESSAGE_KEY : NON_FEVERMATE_GUEST_KEY;
  }

  function consumeGuestMessage() {
    if (state.cloudSync) {
      return true;
    }
    const limit = getGuestLimit();
    const storageKey = getGuestMessageKey();
    if (state.guestMessageCount >= limit) {
      if (isFevermateHost()) {
        setAuthMode('login');
        openAuthModal();
        setAuthStatus(t('Please log in to continue.'), 'error');
      } else {
        showLoginRequiredAlert();
      }
      return false;
    }
    storeGuestMessageCount(state.guestMessageCount + 1, storageKey);
    return true;
  }

  function updateAuthButtons() {
    if (!dom.authLoginButton) return;
    if (isFevermateHost()) {
      const isLoggedIn = state.cloudSync;
      dom.authLoginButton.style.display = 'inline-flex';
      dom.authLoginButton.textContent = isLoggedIn ? t('Log Out') : t('Login / Create Account');
      return;
    }
    const hasXid = Boolean(readStoredXid()) || state.cloudSync;
    if (hasXid) {
      dom.authLoginButton.style.display = 'none';
      return;
    }
    dom.authLoginButton.style.display = 'inline-flex';
    dom.authLoginButton.textContent = t('Login / Create Account');
  }

  async function logoutAuth() {
    const confirmed = await confirmDialog({
      title: t('Log out?'),
      text: t('You will need to log in again to sync chat history.'),
      confirmText: t('Log out'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return;
    try {
      localStorage.removeItem(CLOUD_XID_KEY);
      for (let slot = SLOT_MIN; slot <= SLOT_MAX; slot += 1) {
        localStorage.removeItem(getSlotSettingsXidKey(slot));
        localStorage.removeItem(getCloudResetStorageKey(slot));
      }
      localStorage.removeItem('membership');
    } catch (err) {
      // ignore storage errors
    }
    state.cloudSync = false;
    state.sessionId = '';
    setMembership('FREE');
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('XID');
      url.searchParams.delete('xid');
      window.location.href = url.toString();
    } catch (err) {
      window.location.href = window.location.pathname;
    }
  }

  function buildExternalAuthUrl() {
    const baseUrl = 'https://muah.ai/';
    try {
      const current = new URL(window.location.href);
      current.searchParams.delete('XID');
      current.searchParams.delete('xid');
      const returnUrl = current.toString();
      const separator = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${separator}redirect=${encodeURIComponent(returnUrl)}`;
    } catch (err) {
      return baseUrl;
    }
  }

  function openExternalAuth() {
    const url = buildExternalAuthUrl();
    window.location.href = url;
  }

  function setAuthMode(mode) {
    authMode = mode === 'register' ? 'register' : 'login';
    const buttons = document.querySelectorAll('[data-auth-mode]');
    buttons.forEach((button) => {
      button.classList.toggle('active', button.dataset.authMode === authMode);
    });
    if (dom.authSubmit) {
      dom.authSubmit.textContent = authMode === 'register' ? t('Create Account') : t('Log In');
    }
    if (dom.authPassword) {
      dom.authPassword.autocomplete = authMode === 'register' ? 'new-password' : 'current-password';
    }
    setAuthStatus('');
  }

  function openAuthModal() {
    if (!dom.authModal) return;
    dom.authModal.classList.add('active');
    dom.authModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('auth-lock');
    setAuthMode(authMode);
    if (dom.authEmail) {
      dom.authEmail.focus();
    }
  }

  function closeAuthModal() {
    if (!dom.authModal) return;
    dom.authModal.classList.remove('active');
    dom.authModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('auth-lock');
    setAuthStatus('');
  }

  async function submitAuthForm(event) {
    if (event) {
      event.preventDefault();
    }
    if (!dom.authEmail || !dom.authPassword) return;
    const email = (dom.authEmail.value || '').trim();
    const password = (dom.authPassword.value || '').trim();
    if (!email || !password) {
      setAuthStatus(t('Email and password are required.'), 'error');
      return;
    }
    setAuthStatus(authMode === 'register' ? t('Creating account...') : t('Signing in...'));
    try {
      const response = await fetch(CONFIG.authEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: authMode,
          email,
          password
        })
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: auth response invalid', { rawText });
        }
        throw err;
      }
      if (!response.ok || !data || !data.ok) {
        const errorText = data && data.error ? data.error : t('Auth failed.');
        setAuthStatus(errorText, 'error');
        return;
      }
      const xid = data.xid || '';
      if (!xid) {
        setAuthStatus(t('Auth succeeded but no XID returned.'), 'error');
        return;
      }
      persistXid(xid);
      storeGuestMessageCount(0, getGuestMessageKey());
      const nextUrl = (() => {
        try {
          const url = new URL(window.location.href);
          url.searchParams.set('XID', xid);
          return url.toString();
        } catch (err) {
          return window.location.href;
        }
      })();
      setAuthStatus(t('Success. Loading chat...'), 'success');
      window.location.href = nextUrl;
      return;
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: auth request failed', err);
      }
      setAuthStatus(t('Auth failed. Try again.'), 'error');
    }
  }

  function setupAuth() {
    if (authReady) return;
    authReady = true;
    if (dom.authLoginButton) {
      dom.authLoginButton.addEventListener('click', async () => {
        if (isFevermateHost()) {
          if (state.cloudSync) {
            await logoutAuth();
            return;
          }
          setAuthMode('login');
          openAuthModal();
          return;
        }
        openExternalAuth();
      });
    }
    if (!isFevermateHost() || !dom.authModal) {
      return;
    }
    const buttons = document.querySelectorAll('[data-auth-mode]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        setAuthMode(button.dataset.authMode || 'login');
      });
    });
    if (dom.authForm) {
      dom.authForm.addEventListener('submit', submitAuthForm);
    }
    if (dom.closeAuthModal) {
      dom.closeAuthModal.addEventListener('click', () => {
        closeAuthModal();
      });
    }
  }

  function safeInit() {
    if (hasInitialized) return;
    hasInitialized = true;
    init();
  }

  function ensureAuthThenInit() {
    if (!isFevermateHost()) {
      safeInit();
      return;
    }
    const xid = readXidFromUrl();
    if (xid) {
      setXidInUrl(xid);
    }
    safeInit();
  }

  function normalizeVipExpireDate(value) {
    const trimmed = String(value || '').trim();
    if (!trimmed || trimmed.toLowerCase() === 'null' || trimmed === '0') {
      return '';
    }
    return trimmed;
  }

  function parseVipExpireTimestamp(rawValue) {
    const cleaned = normalizeVipExpireDate(rawValue);
    if (!cleaned) return 0;
    const match = cleaned.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?/);
    if (!match) return 0;
    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    const hour = Number(match[4] || 0);
    const minute = Number(match[5] || 0);
    const second = Number(match[6] || 0);
    const timestamp = new Date(year, month, day, hour, minute, second).getTime();
    return Number.isFinite(timestamp) ? timestamp : 0;
  }

  function formatVipRemaining(ms) {
    if (!Number.isFinite(ms)) {
      return t('Not available');
    }
    if (ms <= 0) {
      return t('Expired');
    }
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${String(seconds).padStart(2, '0')}s`;
  }

  function stopVipCountdown() {
    if (vipCountdownTimer) {
      clearInterval(vipCountdownTimer);
      vipCountdownTimer = null;
    }
  }

  function startVipCountdown() {
    stopVipCountdown();
    updateVipExpirationTooltip();
    if (!dom.vipLabel || !dom.vipLabel.classList.contains('is-active')) return;
    if (getMembershipInfo().isFree || !state.vipExpireAt) return;
    vipCountdownTimer = setInterval(() => {
      updateVipExpirationTooltip();
      if (!dom.vipLabel || !dom.vipLabel.classList.contains('is-active')) {
        stopVipCountdown();
        return;
      }
      if (getMembershipInfo().isFree || !state.vipExpireAt) {
        stopVipCountdown();
        return;
      }
      if (state.vipExpireAt - Date.now() <= 0) {
        stopVipCountdown();
      }
    }, 1000);
  }

  function updateVipExpirationTooltip() {
    if (!dom.vipLabel) return;
    const membershipInfo = getMembershipInfo();
    const isFreeResolved = membershipInfo.isFree && state.membershipResolved;
    if (isFreeResolved) {
      state.vipExpireRaw = '';
      state.vipExpireAt = 0;
    }
    if (!dom.vipLabel.classList.contains('is-active') || isFreeResolved || !state.vipExpireRaw) {
      dom.vipLabel.removeAttribute('data-tooltip');
      dom.vipLabel.removeAttribute('aria-label');
      return;
    }
    const remaining = state.vipExpireAt
      ? formatVipRemaining(state.vipExpireAt - Date.now())
      : t('Not available');
    const lines = [
      t('VIP expires: {date}', { date: state.vipExpireRaw }),
      t('Time left: {time}', { time: remaining })
    ];
    dom.vipLabel.dataset.tooltip = lines.join('\n');
    dom.vipLabel.setAttribute('aria-label', lines.join(' '));
  }

  function setVipExpiration(value) {
    const normalized = normalizeVipExpireDate(value);
    state.vipExpireRaw = normalized;
    state.vipExpireAt = normalized ? parseVipExpireTimestamp(normalized) : 0;
    updateVipExpirationTooltip();
  }

  function normalizeVipLabel(membership) {
    const raw = String(membership || '').trim();
    const upper = raw.toUpperCase();
    if (!upper || upper === 'FREE') {
      return { text: 'FREE', tone: 'is-free' };
    }
    if (upper.includes('ADMIN')) {
      return { text: 'ADMIN', tone: 'is-ultra-500' };
    }
    if (upper.includes('500')) {
      return { text: '500 ULTRA VIP', tone: 'is-ultra-500' };
    }
    if (upper.includes('ULTRA')) {
      return { text: 'ULTRA VIP', tone: 'is-ultra' };
    }
    if (/GPT\s*[- ]?\s*(4|5)/.test(upper)) {
      return { text: 'GPT5 VIP', tone: 'is-gpt' };
    }
    if (upper.includes('VIP')) {
      return { text: 'VIP', tone: 'is-vip' };
    }
    return { text: raw || 'FREE', tone: 'is-free' };
  }

  function applyVipLabel(membership) {
    if (!dom.vipLabel) return;
    const normalized = normalizeVipLabel(membership);
    dom.vipLabel.classList.remove(...VIP_LABEL_CLASSES);
    dom.vipLabel.classList.add('is-active', normalized.tone);
    dom.vipLabel.textContent = t(normalized.text);
    dom.vipLabel.setAttribute('aria-hidden', 'false');
    updateVipExpirationTooltip();
  }

  function applyMembershipUpdate(nextMembership) {
    const raw = String(nextMembership || '').trim();
    if (!raw) return;
    if (isFevermateHost() && !raw.toUpperCase().includes('ADMIN')) return;
    state.membershipResolved = true;
    applyVipLabel(raw);
    setMembership(raw);
  }

  function getVipCtaXid() {
    if (state.cloudSync && state.sessionId) {
      return state.sessionId;
    }
    return readStoredXid();
  }

  function updateVipCtaButton({ label, url, mode, membership }) {
    if (!dom.vipCtaButton) return;
    const labelKey = label || 'Purchase VIP';
    const safeLabel = t(labelKey);
    const safeUrl = url || '';
    const safeMode = mode === 'manage' ? 'manage' : 'purchase';
    const textEl = dom.vipCtaButton.querySelector('.vip-button-text');
    if (textEl) {
      textEl.textContent = safeLabel;
    }
    dom.vipCtaButton.setAttribute('aria-label', safeLabel);
    dom.vipCtaButton.dataset.label = labelKey;
    dom.vipCtaButton.dataset.url = safeUrl;
    dom.vipCtaButton.classList.toggle('is-manage', safeMode === 'manage');
    dom.vipCtaButton.classList.toggle('hidden', safeUrl === '');
    dom.vipCtaButton.disabled = safeUrl === '';
    if (membership) {
      state.membershipResolved = true;
      applyVipLabel(membership);
      setMembership(membership);
    }
  }

  function updateMyNamePlaceholder() {
    if (!dom.myNameInput) return;
    const fallback = normalizeMyName(state.identityName) || DEFAULT_PLAYER_NAME;
    dom.myNameInput.setAttribute('placeholder', fallback);
  }

  function updateSettingsIdentity({ xid, email, name }) {
    if (dom.settingsXidValue) {
      dom.settingsXidValue.textContent = xid || t('Not connected');
    }
    if (dom.settingsEmailValue) {
      dom.settingsEmailValue.textContent = email || t('Not available');
    }
    const resolvedName = normalizeMyName(name);
    if (!xid) {
      state.identityName = '';
    } else if (resolvedName) {
      state.identityName = resolvedName;
    }
    updateMyNamePlaceholder();
  }

  function redirectIfBanned(data) {
    if (!data || !data.banned) return false;
    const target = typeof data.redirect === 'string' && data.redirect
      ? data.redirect
      : 'https://muah.ai/';
    const go = () => {
      window.location.assign(target);
    };
    if (window.Swal && typeof window.Swal.fire === 'function') {
      window.Swal.fire({
        title: 'Account Connection Issue',
        text: 'Your account could not be connected. Please return to Muah.AI.',
        icon: 'warning',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        heightAuto: false,
        scrollbarPadding: false
      }).then((result) => {
        if (result.isConfirmed) {
          go();
        }
      });
      return true;
    }
    alert('Account Connection Issue. Returning to Muah.AI.');
    go();
    return true;
  }

  async function loadUserIdentity() {
    const xid = getVipCtaXid();
    if (!xid) {
      updateSettingsIdentity({ xid: '', email: '' });
      return;
    }
    try {
      const response = await fetch(`${CONFIG.vipStatusEndpoint}?XID=${encodeURIComponent(xid)}`, {
        method: 'GET',
        cache: 'no-store'
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: identity response invalid', { rawText });
        }
        throw err;
      }
      if (redirectIfBanned(data)) {
        return;
      }
      if (!response.ok || !data || !data.ok) {
        throw new Error('Identity fetch failed');
      }
      updateSettingsIdentity({
        xid: data.xid || xid,
        email: data.email || '',
        name: data.name || ''
      });
      if (Object.prototype.hasOwnProperty.call(data, 'expireDate')) {
        setVipExpiration(data.expireDate);
      }
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: identity fetch failed', err);
      }
      updateSettingsIdentity({ xid, email: '' });
    }
  }

  async function loadVipCta() {
    if (!dom.vipCtaButton) return;
    if (isFevermateHost()) {
      dom.vipCtaButton.classList.add('hidden');
      return;
    }
    const xid = getVipCtaXid();
    if (!xid) {
      dom.vipCtaButton.classList.add('hidden');
      return;
    }
    try {
      const response = await fetch(`${CONFIG.vipStatusEndpoint}?XID=${encodeURIComponent(xid)}`, {
        method: 'GET',
        cache: 'no-store'
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: vip status response invalid', { rawText });
        }
        throw err;
      }
      if (redirectIfBanned(data)) {
        return;
      }
      if (!response.ok || !data || !data.ok) {
        throw new Error('VIP status failed');
      }
      if (Object.prototype.hasOwnProperty.call(data, 'expireDate')) {
        setVipExpiration(data.expireDate);
      }
      updateVipCtaButton({
        label: data.label,
        url: data.url,
        mode: data.mode,
        membership: data.membership
      });
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: vip status fetch failed', err);
      }
      dom.vipCtaButton.classList.add('hidden');
    }
  }

  function withPurchaseXid(url) {
    if (!url) return url;
    if (!/muah\.ai\/info\/pay\.php/i.test(url)) {
      return url;
    }
    const xid = getVipCtaXid();
    if (!xid) return url;
    try {
      const parsed = new URL(url, window.location.href);
      const hasXid = parsed.searchParams.has('XID') || parsed.searchParams.has('xid');
      if (!hasXid) {
        parsed.searchParams.set('XID', xid);
      }
      return parsed.toString();
    } catch (err) {
      if (/[?&](?:XID|xid)=/i.test(url)) {
        return url;
      }
      const joiner = url.includes('?') ? '&' : '?';
      return `${url}${joiner}XID=${encodeURIComponent(xid)}`;
    }
  }

  function openVipCta() {
    if (!dom.vipCtaButton) return;
    if (isFevermateHost()) return;
    const url = withPurchaseXid(dom.vipCtaButton.dataset.url || '');
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  }

  function openPurchaseVip() {
    if (isFevermateHost()) return;
    const url = withPurchaseXid(dom.vipCtaButton && dom.vipCtaButton.dataset.url
      ? dom.vipCtaButton.dataset.url
      : 'https://muah.ai/info/pay.php');
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  }

  function showLoginRequiredAlert() {
    const limit = NON_FEVERMATE_GUEST_LIMIT;
    if (window.Swal && typeof window.Swal.fire === 'function') {
      window.Swal.fire({
        title: t('Login required'),
        text: t('Create an account to keep chatting after {count} messages.', { count: limit }),
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: t('Login / Create Account'),
        cancelButtonText: t('Not now'),
        returnFocus: false,
        heightAuto: false,
        scrollbarPadding: false
      }).then((result) => {
        if (result.isConfirmed) {
          openExternalAuth();
        }
      });
      return;
    }
    if (confirm(t('Login required. Create an account to keep chatting after {count} messages.', { count: limit }))) {
      openExternalAuth();
    }
  }

  function getVipCtaLabel() {
    const info = getMembershipInfo();
    return info && !info.isFree ? 'Upgrade VIP' : 'Purchase VIP';
  }

  function normalizeVipAlertMessage(message) {
    if (!message) {
      return '{cta} to unlock this feature.';
    }
    const info = getMembershipInfo();
    if (!info || info.isFree) {
      return message;
    }
    return message
      .replace(/Purchase or upgrade VIP/gi, 'Upgrade VIP')
      .replace(/Purchase VIP/gi, 'Upgrade VIP')
      .replace(/Upgrade to VIP/gi, 'Upgrade VIP');
  }

  function showVipPurchaseAlert(message, titleKey = 'VIP required') {
    if (getFevermateMembershipOverride()) {
      return;
    }
    const title = t(titleKey || 'VIP required');
    const textKey = normalizeVipAlertMessage(message);
    const ctaKey = getVipCtaLabel();
    const ctaLabel = t(ctaKey);
    const text = textKey ? t(textKey, { cta: ctaLabel }) : t('{cta} to unlock this feature.', { cta: ctaLabel });
    if (window.Swal && typeof window.Swal.fire === 'function') {
      window.Swal.fire({
        title,
        text,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: ctaLabel,
        cancelButtonText: t('Not now'),
        returnFocus: false,
        heightAuto: false,
        scrollbarPadding: false
      }).then((result) => {
        if (result.isConfirmed) {
          openPurchaseVip();
        }
      });
      return;
    }
    if (confirm(`${title}\n${text}`)) {
      openPurchaseVip();
    }
  }

  function getPurchaseVipUrl() {
    return withPurchaseXid(dom.vipCtaButton && dom.vipCtaButton.dataset && dom.vipCtaButton.dataset.url
      ? dom.vipCtaButton.dataset.url
      : 'https://muah.ai/info/pay.php');
  }

  function showVipPurchaseAlertWithLink(message) {
    if (getFevermateMembershipOverride()) {
      return;
    }
    const title = t('VIP required');
    const textKey = normalizeVipAlertMessage(message);
    const ctaKey = getVipCtaLabel();
    const ctaLabel = t(ctaKey);
    const text = textKey ? t(textKey, { cta: ctaLabel }) : t('{cta} to unlock this feature.', { cta: ctaLabel });
    const purchaseUrl = getPurchaseVipUrl();
    if (window.Swal && typeof window.Swal.fire === 'function') {
      const linkHtml = purchaseUrl
        ? `<div class="vip-purchase-link"><a href="${escapeHtml(purchaseUrl)}" target="_blank" rel="noopener">${escapeHtml(ctaLabel)}</a></div>`
        : '';
      window.Swal.fire({
        title,
        html: `${escapeHtml(text)}${linkHtml}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: ctaLabel,
        cancelButtonText: t('Not now'),
        returnFocus: false,
        heightAuto: false,
        scrollbarPadding: false
      }).then((result) => {
        if (result.isConfirmed) {
          openPurchaseVip();
        }
      });
      return;
    }
    const fallback = purchaseUrl ? `${text}\n${ctaLabel}: ${purchaseUrl}` : text;
    if (confirm(`${title}\n${fallback}`)) {
      openPurchaseVip();
    }
  }

  function clearVipLabel() {
    if (!dom.vipLabel) return;
    dom.vipLabel.classList.remove('is-active', ...VIP_LABEL_CLASSES);
    dom.vipLabel.textContent = '';
    dom.vipLabel.setAttribute('aria-hidden', 'true');
    dom.vipLabel.removeAttribute('data-tooltip');
    dom.vipLabel.removeAttribute('aria-label');
    state.vipExpireRaw = '';
    state.vipExpireAt = 0;
    stopVipCountdown();
  }

  function parseVipCheckResponse(rawText) {
    const text = String(rawText || '').trim();
    if (!text) return '';
    if (/^Nope/i.test(text)) {
      return 'FREE';
    }
    const match = text.match(/membership\s+is:\s*(.+)$/i);
    if (match && match[1]) {
      return match[1].trim();
    }
    if (/^Yes/i.test(text)) {
      return 'VIP';
    }
    return text;
  }

  async function loadVipStatus(xid) {
    if (!xid) {
      clearVipLabel();
      state.membershipResolved = true;
      return;
    }
    if (isFevermateHost()) {
      try {
        const response = await fetch(`${CONFIG.vipStatusEndpoint}?XID=${encodeURIComponent(xid)}`, {
          method: 'GET',
          cache: 'no-store'
        });
        const rawText = await response.text();
        let data = null;
        try {
          data = rawText ? JSON.parse(rawText) : null;
        } catch (err) {
          data = null;
        }
        const remoteMembership = data && data.ok && typeof data.membership === 'string'
          ? data.membership.trim()
          : '';
        if (remoteMembership && remoteMembership.toUpperCase().includes('ADMIN')) {
          state.membershipResolved = true;
          applyVipLabel(remoteMembership);
          setMembership(remoteMembership, { persist: false });
          return;
        }
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: fevermate vip status fetch failed', err);
        }
      }
      state.membershipResolved = true;
      setMembership(FEVERMATE_DEFAULT_MEMBERSHIP, { persist: false });
      return;
    }
    const url = CONFIG.vipCheckEndpoint;
    try {
      const response = await fetch(url, { cache: 'no-store' });
      const rawText = await response.text();
      const membership = parseVipCheckResponse(rawText);
      if (!membership) return;
      const upper = String(membership || '').trim().toUpperCase();
      const membershipInfo = getMembershipInfo();
      const allowOverride = !state.membershipResolved || membershipInfo.isFree;
      if (upper === 'FREE') {
        if (state.vipExpireRaw) return;
        const storedMembershipRaw = readStoredMembershipRaw();
        const storedMembership = normalizeMembership(storedMembershipRaw).toUpperCase();
        const canConfirmFree = state.membershipResolved
          || (storedMembershipRaw.trim() !== '' && storedMembership === 'FREE');
        if (!canConfirmFree) return;
        if (!allowOverride) return;
        state.membershipResolved = true;
        applyVipLabel('FREE');
        setMembership('FREE');
        return;
      }
      if (!allowOverride) return;
      state.membershipResolved = true;
      applyVipLabel(membership);
      setMembership(membership);
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: vip check failed', err);
      }
    }
  }

  function setCloudSyncUI(enabled) {
    if (dom.cloudLabel) {
      dom.cloudLabel.classList.toggle('is-active', enabled);
      dom.cloudLabel.setAttribute('aria-hidden', enabled ? 'false' : 'true');
    }
    if (!enabled) {
      clearVipLabel();
    }
    document.body.classList.toggle('cloud-sync', enabled);
  }

  function isXpEligible() {
    return Boolean(state.cloudSync && state.sessionId);
  }

  function isXpServerEnabled() {
    return Boolean(state.cloudSync && state.sessionId);
  }

  function getXpStorageKey() {
    if (!isXpEligible()) return '';
    return `${XP_STORAGE_KEY_PREFIX}${state.sessionId}`;
  }

  function clampXpTotal(value) {
    const safe = Number.isFinite(value) ? Math.floor(value) : 0;
    const maxTotal = (XP_MAX_LEVEL * XP_LEVEL_STEP) + (XP_LEVEL_STEP - 1);
    return Math.min(Math.max(safe, 0), maxTotal);
  }

  function normalizeTimestamp(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
  }

  function shouldApplyCloudValue(remoteUpdatedAt, localUpdatedAt, hasRemoteValue) {
    if (!hasRemoteValue) return false;
    const remoteStamp = normalizeTimestamp(remoteUpdatedAt);
    const localStamp = normalizeTimestamp(localUpdatedAt);
    if (remoteStamp > 0 && localStamp > 0) {
      return remoteStamp >= localStamp;
    }
    if (remoteStamp > 0 && localStamp === 0) {
      return true;
    }
    if (remoteStamp === 0 && localStamp > 0) {
      return false;
    }
    return true;
  }

  function loadXpData() {
    const key = getXpStorageKey();
    if (!key) return { total: 0, updatedAt: 0 };
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return { total: 0, updatedAt: 0 };
      const trimmed = raw.trim();
      if (trimmed.startsWith('{')) {
        const parsed = JSON.parse(trimmed);
        const totalRaw = parsed && typeof parsed === 'object'
          ? parsed.total ?? parsed.xp ?? parsed.value
          : 0;
        const updatedRaw = parsed && typeof parsed === 'object'
          ? parsed.updatedAt ?? parsed.updated_at
          : 0;
        return {
          total: clampXpTotal(Number(totalRaw)),
          updatedAt: normalizeTimestamp(updatedRaw)
        };
      }
      const parsed = parseInt(trimmed, 10);
      return {
        total: Number.isFinite(parsed) ? clampXpTotal(parsed) : 0,
        updatedAt: 0
      };
    } catch (err) {
      return { total: 0, updatedAt: 0 };
    }
  }

  function saveXpData(total, updatedAt = 0) {
    const key = getXpStorageKey();
    if (!key) return;
    const safeTotal = clampXpTotal(total);
    const safeUpdatedAt = normalizeTimestamp(updatedAt);
    try {
      if (safeTotal > 0 || safeUpdatedAt > 0) {
        localStorage.setItem(key, JSON.stringify({ total: safeTotal, updatedAt: safeUpdatedAt }));
      } else {
        localStorage.removeItem(key);
      }
    } catch (err) {
      // ignore storage errors
    }
  }

  function parseXpSyncResponse(rawText) {
    let data = null;
    if (rawText) {
      try {
        data = JSON.parse(rawText);
      } catch (err) {
        data = null;
      }
    }
    const baseError = (data && (data.error || data.message || data.detail))
      ? String(data.error || data.message || data.detail).trim()
      : (rawText && rawText.trim() ? rawText.trim() : '');
    return { data, errorText: baseError };
  }

  async function xpSyncRequest(payload) {
    if (!isXpServerEnabled()) {
      return { ok: false, error: 'XP sync unavailable.' };
    }
    try {
      const response = await fetch(CONFIG.xpSyncEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          XID: state.sessionId,
          ...payload
        })
      });
      const rawText = await response.text();
      const { data, errorText } = parseXpSyncResponse(rawText);
      if (!response.ok || !data || !data.ok) {
        return { ok: false, error: errorText || t('Cloud sync unavailable. Try again.') };
      }
      return data;
    } catch (err) {
      return { ok: false, error: t('Cloud sync unavailable. Try again.') };
    }
  }

  function applyXpServerState(payload, options = {}) {
    if (!payload || typeof payload !== 'object') return;
    const previousTotal = state.xp.total;
    const previousUpdatedAt = normalizeTimestamp(state.xp.updatedAt);
    const hasXpTotal = Object.prototype.hasOwnProperty.call(payload, 'xp_total')
      || Object.prototype.hasOwnProperty.call(payload, 'xpTotal')
      || Object.prototype.hasOwnProperty.call(payload, 'total');
    const xpTotalRaw = payload.xp_total ?? payload.xpTotal ?? payload.total;
    const xpTotalIsBlankString = typeof xpTotalRaw === 'string' && xpTotalRaw.trim() === '';
    const hasValidXpTotal = hasXpTotal && !xpTotalIsBlankString && Number.isFinite(Number(xpTotalRaw));
    const nextTotal = hasValidXpTotal ? clampXpTotal(Number(xpTotalRaw)) : state.xp.total;
    const nextUpdatedAt = normalizeTimestamp(payload.xp_updated_at ?? payload.xpUpdatedAt ?? payload.updated_at ?? 0);
    const shouldApplyXp = (() => {
      if (!hasValidXpTotal) return false;
      if (options.force === true) return true;
      if (nextUpdatedAt > 0 && previousUpdatedAt > 0) {
        return nextUpdatedAt >= previousUpdatedAt;
      }
      if (nextUpdatedAt > 0 && previousUpdatedAt === 0) {
        return true;
      }
      if (nextUpdatedAt === 0 && previousUpdatedAt > 0) {
        return false;
      }
      return true;
    })();
    let didApplyXp = false;
    if (shouldApplyXp) {
      state.xp.total = nextTotal;
      if (nextUpdatedAt > 0) {
        state.xp.updatedAt = nextUpdatedAt;
      }
      saveXpData(state.xp.total, state.xp.updatedAt);
      didApplyXp = true;
    }
    const xpShopRaw = payload.xp_shop ?? payload.xpShop ?? null;
    const xpShopNormalized = normalizeXpShopData(xpShopRaw);
    const xpShopUpdatedAt = normalizeTimestamp(
      payload.xp_shop_updated_at ?? payload.xpShopUpdatedAt ?? xpShopNormalized.updatedAt
    );
    const xpShopHasValue = Boolean(
      (xpShopRaw && typeof xpShopRaw === 'object')
      || xpShopUpdatedAt > 0
      || xpShopNormalized.coreBonus > 0
      || xpShopNormalized.looklikeBonus > 0
    );
    const shouldApplyXpShop = options.force === true
      ? xpShopHasValue
      : shouldApplyCloudValue(xpShopUpdatedAt, state.xpShop.updatedAt, xpShopHasValue);
    if (shouldApplyXpShop) {
      state.xpShop = {
        coreBonus: xpShopNormalized.coreBonus,
        looklikeBonus: xpShopNormalized.looklikeBonus,
        updatedAt: xpShopUpdatedAt || xpShopNormalized.updatedAt
      };
      updateSettingTokenCounts();
    }
    if (didApplyXp) {
      updateXpUi();
    }
    if (options.animate && didApplyXp) {
      maybeFlipXp();
    }
    if (options.animate && didApplyXp && nextTotal > previousTotal) {
      triggerXpEarnedAnimation();
    }
  }

  async function syncXpState(options = {}) {
    if (!isXpServerEnabled()) return null;
    const force = options.force === true;
    const now = Date.now();
    if (!force && state.xpSyncLoaded && (now - state.xpSyncLastAt) < 15000) {
      return { ok: true };
    }
    if (xpSyncInFlight) {
      return xpSyncInFlight;
    }
    xpSyncInFlight = (async () => {
      const result = await xpSyncRequest({ action: 'get' });
      xpSyncInFlight = null;
      if (!result || !result.ok) {
        return null;
      }
      applyXpServerState(result);
      state.xpSyncLoaded = true;
      state.xpSyncLastAt = Date.now();
      return result;
    })();
    return xpSyncInFlight;
  }

  function startXpSyncTimer() {
    if (xpSyncTimer) return;
    xpSyncTimer = setInterval(() => {
      if (!isXpServerEnabled()) return;
      syncXpState();
    }, XP_SYNC_INTERVAL_MS);
  }

  async function ensureXpSyncReady() {
    if (!isXpServerEnabled()) return false;
    if (state.xpSyncLoaded) return true;
    const result = await syncXpState({ force: true });
    return Boolean(result);
  }

  function computeXpProgress(total) {
    const safeTotal = clampXpTotal(total);
    const level = Math.min(XP_MAX_LEVEL, Math.floor(safeTotal / XP_LEVEL_STEP));
    const inLevel = safeTotal - (level * XP_LEVEL_STEP);
    const percent = XP_LEVEL_STEP > 0 ? (inLevel / XP_LEVEL_STEP) * 100 : 0;
    return { total: safeTotal, level, inLevel, percent };
  }

  function updateXpUi() {
    const progress = computeXpProgress(state.xp.total);
    if (dom.xpLevel) {
      dom.xpLevel.textContent = String(progress.level);
    }
    if (dom.xpValue) {
      dom.xpValue.textContent = String(progress.inLevel);
    }
    if (dom.xpGoal) {
      dom.xpGoal.textContent = String(XP_LEVEL_STEP);
    }
    if (dom.xpFill) {
      dom.xpFill.style.width = `${progress.percent}%`;
    }
    refreshSlotModalIfOpen();
  }

  function getXpLevel() {
    return computeXpProgress(state.xp.total).level;
  }

  function updateXpBarTooltip() {
    if (!dom.xpBar) return;
    const label = t('Open XP Shop');
    dom.xpBar.dataset.tooltip = label;
    dom.xpBar.setAttribute('aria-label', label);
    dom.xpBar.setAttribute('title', label);
    dom.xpBar.setAttribute('role', 'button');
    dom.xpBar.setAttribute('tabindex', '0');
  }

  function triggerXpEarnedAnimation() {
    if (!dom.xpBar) return;
    dom.xpBar.classList.remove('is-earning');
    void dom.xpBar.offsetWidth;
    dom.xpBar.classList.add('is-earning');
    if (xpPulseTimer) {
      clearTimeout(xpPulseTimer);
    }
    xpPulseTimer = setTimeout(() => {
      dom.xpBar.classList.remove('is-earning');
    }, 800);
  }

  function attachXpFlipHold() {
    if (!dom.footerXpFront) return;
    const label = dom.footerXpFront.querySelector('.language-label');
    if (!label) return;

    const clearHold = () => {
      if (xpFlipHoldTimer) {
        clearTimeout(xpFlipHoldTimer);
      }
      xpFlipHoldTimer = null;
    };

    const startHold = (event) => {
      if (event && event.button && event.button !== 0) return;
      xpFlipHoldTriggered = false;
      clearHold();
      xpFlipHoldTimer = setTimeout(() => {
        xpFlipHoldTriggered = true;
        flipXpBar();
      }, XP_FLIP_HOLD_MS);
    };

    const cancelHold = () => {
      clearHold();
    };

    label.addEventListener('pointerdown', startHold);
    label.addEventListener('pointerup', cancelHold);
    label.addEventListener('pointerleave', cancelHold);
    label.addEventListener('pointercancel', cancelHold);
    label.addEventListener('click', (event) => {
      if (!xpFlipHoldTriggered) return;
      event.preventDefault();
      event.stopPropagation();
    });
  }

  function flipXpBar() {
    if (!dom.footerXpFlip) return;
    dom.footerXpFlip.classList.add('is-flipped');
    state.xp.flipped = true;
    if (dom.footerXpBack) {
      dom.footerXpBack.setAttribute('aria-hidden', 'false');
    }
    if (dom.footerXpFront) {
      dom.footerXpFront.setAttribute('aria-hidden', 'true');
    }
  }

  function maybeFlipXp() {
    if (state.xp.flipped) return;
    if (state.xp.total <= XP_FLIP_THRESHOLD) return;
    flipXpBar();
  }

  function queuePendingXp(delta) {
    if (isXpServerEnabled()) return;
    if (!Number.isFinite(delta) || delta <= 0) return;
    const next = Number.isFinite(state.pendingXpDelta) ? state.pendingXpDelta + delta : delta;
    state.pendingXpDelta = Math.max(0, Math.floor(next));
  }

  function flushPendingXp() {
    if (isXpServerEnabled()) return;
    if (!state.cloudSync || !state.cloudSettingsLoaded) return;
    const pending = Number.isFinite(state.pendingXpDelta) ? Math.floor(state.pendingXpDelta) : 0;
    if (pending <= 0) return;
    state.pendingXpDelta = 0;
  }

  function showCloudSyncPendingAlert() {
    void showAlert({
      title: t('Pulling data from cloud...'),
      text: t('Syncing from cloud. Try again in a moment.'),
      icon: 'info'
    });
  }

  function setJoinCommunityFlip(isFlipped) {
    if (!dom.breakFlip) return;
    const useStaticFlip = true;
    dom.breakFlip.classList.toggle('is-flipped', !useStaticFlip && isFlipped);
    dom.breakFlip.classList.toggle('is-static-flip', useStaticFlip);
    if (dom.breakFront) {
      dom.breakFront.setAttribute('aria-hidden', isFlipped ? 'true' : 'false');
      if (useStaticFlip) {
        dom.breakFront.style.display = isFlipped ? 'none' : '';
      } else {
        dom.breakFront.style.display = '';
      }
    }
    if (dom.breakBack) {
      dom.breakBack.setAttribute('aria-hidden', isFlipped ? 'false' : 'true');
      if (useStaticFlip) {
        dom.breakBack.style.display = isFlipped ? '' : 'none';
      } else {
        dom.breakBack.style.display = '';
      }
    }
    if (isFlipped) {
      updateJoinCommunityButtonState();
    }
  }

  function scheduleJoinCommunityFlipReset() {
    if (joinCommunityFlipTimer) {
      clearTimeout(joinCommunityFlipTimer);
    }
    const delay = Math.max(0, joinCommunityFlipUntil - Date.now());
    joinCommunityFlipTimer = setTimeout(() => {
      joinCommunityFlipTimer = null;
      if (Date.now() >= joinCommunityFlipUntil) {
        setJoinCommunityFlip(false);
      }
    }, delay);
  }

  function triggerJoinCommunityFlip() {
    if (!dom.breakFlip) return;
    joinCommunityFlipUntil = Date.now() + COMMUNITY_JOIN_FLIP_MS;
    setJoinCommunityFlip(true);
    scheduleJoinCommunityFlipReset();
  }

  async function addXp(event, options = {}) {
    if (!isXpEligible()) return;
    const eventType = typeof event === 'string' ? event.trim().toLowerCase() : '';
    if (!eventType) return;
    if (isXpServerEnabled()) {
      const payload = {
        action: 'earn',
        event: eventType,
        event_key: options.eventKey || '',
        share_url: options.shareUrl || '',
        membership: getMembership(),
        discord: state.discord.linked ? 1 : 0,
        notifications: state.notifications.enabled ? 1 : 0
      };
      const result = await xpSyncRequest(payload);
      if (result && result.ok) {
        applyXpServerState(result, { animate: true });
        state.xpSyncLoaded = true;
        state.xpSyncLastAt = Date.now();
      }
      return;
    }
    const eventMap = {
      message: XP_MESSAGE_GAIN,
      photo: XP_PHOTO_GAIN,
      minute: XP_MINUTE_GAIN,
      share_photo: PHOTO_SHARE_XP_GAIN,
      share_video: VIDEO_SHARE_XP_GAIN
    };
    const delta = eventMap[eventType] || 0;
    if (delta <= 0) return;
    const boostRate = getXpBoostRate();
    const totalDelta = boostRate > 0
      ? Math.floor(delta * (1 + boostRate))
      : delta;
    const allowQueue = options.allowQueue !== false;
    if (state.cloudSync && !state.cloudSettingsLoaded && allowQueue) {
      queuePendingXp(totalDelta);
      return;
    }
    state.xp.total = clampXpTotal(state.xp.total + totalDelta);
    state.xp.updatedAt = Date.now();
    updateXpUi();
    maybeFlipXp();
    triggerXpEarnedAnimation();
    saveXpData(state.xp.total, state.xp.updatedAt);
    if (!state.suppressCloudSettingsSync) {
      scheduleCloudSettingsSync();
    }
  }

  function handleXpForMessage(message) {
    if (!message || !isXpEligible()) return;
    if (message.role === 'user') {
      void addXp('message', { eventKey: message.id || '' });
      return;
    }
    if (message.role !== 'assistant' || message.meta === 'System') return;
    if (!message.mediaUrl) return;
    const mediaType = message.mediaType || inferMediaType(message.mediaUrl);
    if (mediaType === 'image') {
      void addXp('photo', { eventKey: message.id || '' });
    }
  }

  function startXpMinuteTimer() {
    if (xpMinuteTimer) return;
    xpMinuteTimer = setInterval(() => {
      void addXp('minute');
    }, 60000);
  }

  function initXp() {
    if (isXpServerEnabled()) {
      const data = loadXpData();
      state.xp.total = data.total;
      state.xp.updatedAt = data.updatedAt;
      state.xp.flipped = false;
      updateXpUi();
      updateXpBarTooltip();
      startXpMinuteTimer();
      startXpSyncTimer();
      void syncXpState({ force: true });
      return;
    }
    const data = isXpEligible() ? loadXpData() : { total: 0, updatedAt: 0 };
    state.xp.total = data.total;
    state.xp.updatedAt = data.updatedAt;
    state.xp.flipped = false;
    updateXpUi();
    updateXpBarTooltip();
    startXpMinuteTimer();
  }

  function getXpShopStorageKey() {
    if (!isXpEligible()) return '';
    return `${XP_SHOP_STORAGE_KEY_PREFIX}${state.sessionId}`;
  }

  function normalizeXpShopData(value) {
    let raw = value;
    if (typeof raw === 'string') {
      try {
        raw = JSON.parse(raw);
      } catch (err) {
        raw = {};
      }
    }
    raw = raw && typeof raw === 'object' ? raw : {};
    const coreBonus = Number.isFinite(raw.coreBonus) ? Math.max(0, Math.floor(raw.coreBonus)) : 0;
    const looklikeBonus = Number.isFinite(raw.looklikeBonus) ? Math.max(0, Math.floor(raw.looklikeBonus)) : 0;
    const updatedAt = normalizeTimestamp(raw.updatedAt ?? raw.updated_at);
    return { coreBonus, looklikeBonus, updatedAt };
  }

  function loadXpShop() {
    const key = getXpShopStorageKey();
    if (!key) return { coreBonus: 0, looklikeBonus: 0, updatedAt: 0 };
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return { coreBonus: 0, looklikeBonus: 0, updatedAt: 0 };
      return normalizeXpShopData(JSON.parse(raw));
    } catch (err) {
      return { coreBonus: 0, looklikeBonus: 0, updatedAt: 0 };
    }
  }

  function saveXpShop(next) {
    const key = getXpShopStorageKey();
    if (!key) return;
    try {
      const normalized = normalizeXpShopData(next);
      if (normalized.coreBonus > 0 || normalized.looklikeBonus > 0 || normalized.updatedAt > 0) {
        localStorage.setItem(key, JSON.stringify(normalized));
      } else {
        localStorage.removeItem(key);
      }
    } catch (err) {
      // ignore storage errors
    }
  }

  function initXpShop() {
    if (isXpServerEnabled()) {
      state.xpShop = { coreBonus: 0, looklikeBonus: 0, updatedAt: 0 };
      return;
    }
    state.xpShop = loadXpShop();
  }

  function getXpShopBonuses() {
    if (!isXpEligible()) {
      return { coreBonus: 0, looklikeBonus: 0 };
    }
    const coreBonus = Number.isFinite(state.xpShop.coreBonus) ? state.xpShop.coreBonus : 0;
    const looklikeBonus = Number.isFinite(state.xpShop.looklikeBonus) ? state.xpShop.looklikeBonus : 0;
    return { coreBonus, looklikeBonus };
  }

  function getMembershipXpBoostRate(info = getMembershipInfo()) {
    if (!info) return 0;
    if (info.isAdmin) return 10;
    if (info.isUltra500) return 5;
    if (info.isUltra) return 2;
    if (info.isVip && /GPT\s*[- ]?\s*4/.test(info.upper)) return 1;
    if (info.isVip) return 0.5;
    return 0;
  }

  function getXpBoostRate() {
    let rate = getMembershipXpBoostRate();
    if (state.discord.linked) {
      rate += DISCORD_XP_BONUS_RATE;
    }
    if (state.notifications.enabled) {
      rate += NOTIFICATION_XP_BONUS_RATE;
    }
    return rate;
  }

  function formatXpBoostPercent(rate) {
    const percent = Math.round(rate * 100);
    if (percent <= 0) return '0%';
    return `+${percent}%`;
  }

  async function spendXpLevels(levels, options = {}) {
    const normalized = Number.isFinite(levels) ? Math.floor(levels) : 0;
    if (normalized <= 0) return { ok: false, error: t('Not enough XP.') };
    if (isXpServerEnabled()) {
      if (!state.xpSyncLoaded) {
        const ready = await ensureXpSyncReady();
        if (!ready) {
          return { ok: false, error: t('Syncing from cloud. Try again in a moment.') };
        }
      }
      const result = await xpSyncRequest({
        action: 'spend',
        levels: normalized,
        reason: options.reason || '',
        duration: options.duration,
        membership: getMembership(),
        spend_id: options.spendId || ''
      });
      if (!result || !result.ok) {
        return { ok: false, error: result.error || t('Not enough XP.') };
      }
      applyXpServerState(result);
      state.xpSyncLoaded = true;
      state.xpSyncLastAt = Date.now();
      return { ok: true, spendId: result.spend_id || result.spendId || '' };
    }
    const cost = normalized * XP_LEVEL_STEP;
    if (state.xp.total < cost) return { ok: false, error: t('Not enough XP.') };
    state.xp.total = clampXpTotal(state.xp.total - cost);
    state.xp.updatedAt = Date.now();
    updateXpUi();
    saveXpData(state.xp.total, state.xp.updatedAt);
    if (!state.suppressCloudSettingsSync) {
      scheduleCloudSettingsSync();
    }
    return { ok: true };
  }

  function buildXpShopHtml() {
    const progress = computeXpProgress(state.xp.total);
    const bonuses = getXpShopBonuses();
    const xpBoostLabel = formatXpBoostPercent(getXpBoostRate());
    const level = progress.level;
    const canAfford = level >= XP_SHOP_COST_LEVELS;
    const statusText = canAfford
      ? t('Spend {count} levels per upgrade.', { count: XP_SHOP_COST_LEVELS })
      : t('Need {count} levels to purchase.', { count: XP_SHOP_COST_LEVELS });
    const disableClass = canAfford ? '' : ' is-disabled';
    const ariaDisabled = canAfford ? 'false' : 'true';
    const costLabel = t('Cost: {count} Levels', { count: XP_SHOP_COST_LEVELS });
    return `
      <div class="xp-shop">
        <div class="xp-shop-sub">${t('Spend levels to expand your token caps.')}</div>
        <div class="xp-shop-balance">
          <span class="xp-shop-label">${t('Level')}</span>
          <span class="xp-shop-value">${level}</span>
          <span class="xp-shop-divider">|</span>
          <span class="xp-shop-label">${t('XP')}</span>
          <span class="xp-shop-value">${progress.inLevel}/${XP_LEVEL_STEP}</span>
          <span class="xp-shop-divider">|</span>
          <span class="xp-shop-label">${t('XP Boost')}</span>
          <span class="xp-shop-value">${xpBoostLabel}</span>
        </div>
        <div class="xp-shop-grid">
          <div class="xp-shop-card">
            <div class="xp-shop-name">${t('Core Prompt Max Tokens')}</div>
            <div class="xp-shop-meta">${t('Increase by {count} max tokens', { count: XP_SHOP_CORE_BONUS })}</div>
            <div class="xp-shop-owned">${t('Owned bonus: +{count}', { count: bonuses.coreBonus })}</div>
            <div class="xp-shop-cost">${costLabel}</div>
            <button class="solid-button xp-shop-action${disableClass}" type="button" data-xp-shop="core" aria-disabled="${ariaDisabled}">
              ${t('Spend {count} Levels', { count: XP_SHOP_COST_LEVELS })}
            </button>
          </div>
          <div class="xp-shop-card">
            <div class="xp-shop-name">${t('Look-Like Max Tokens')}</div>
            <div class="xp-shop-meta">${t('Increase by {count} max tokens', { count: XP_SHOP_LOOKLIKE_BONUS })}</div>
            <div class="xp-shop-owned">${t('Owned bonus: +{count}', { count: bonuses.looklikeBonus })}</div>
            <div class="xp-shop-cost">${costLabel}</div>
            <button class="solid-button xp-shop-action${disableClass}" type="button" data-xp-shop="looklike" aria-disabled="${ariaDisabled}">
              ${t('Spend {count} Levels', { count: XP_SHOP_COST_LEVELS })}
            </button>
          </div>
        </div>
        <div class="xp-shop-status" id="xpShopStatus">${statusText}</div>
      </div>
    `;
  }

  function setXpShopStatus(message, tone = '') {
    const el = document.getElementById('xpShopStatus');
    if (!el) return;
    el.textContent = message || '';
    if (tone) {
      el.dataset.tone = tone;
    } else {
      delete el.dataset.tone;
    }
  }

  function refreshXpShopModal(status) {
    if (!window.Swal || typeof window.Swal.update !== 'function') return;
    window.Swal.update({ html: buildXpShopHtml() });
    requestAnimationFrame(() => {
      attachXpShopEvents();
      if (status && status.message) {
        setXpShopStatus(status.message, status.tone || '');
      }
    });
  }

  async function purchaseXpUpgrade(kind) {
    if (!isXpEligible()) {
      return { ok: false, message: t('Login required to use the XP Shop.') };
    }
    if (!(await ensureXpSyncReady())) {
      return { ok: false, message: t('Syncing from cloud. Try again in a moment.') };
    }
    if (getXpLevel() < XP_SHOP_COST_LEVELS) {
      return { ok: false, message: t('Need {count} levels to purchase.', { count: XP_SHOP_COST_LEVELS }) };
    }
    const isCore = kind === 'core';
    const isLooklike = kind === 'looklike';
    if (!isCore && !isLooklike) {
      return { ok: false, message: t('Unknown XP upgrade.') };
    }
    if (isXpServerEnabled()) {
      const result = await xpSyncRequest({ action: 'shop', kind });
      if (!result || !result.ok) {
        return { ok: false, message: result.error || t('Not enough XP.') };
      }
      applyXpServerState(result);
      state.xpSyncLoaded = true;
      state.xpSyncLastAt = Date.now();
      return { ok: true, message: result.message || t('Upgrade unlocked.') };
    }
    const spendResult = await spendXpLevels(XP_SHOP_COST_LEVELS, { reason: 'xp_shop' });
    if (!spendResult.ok) {
      return { ok: false, message: t('Not enough XP.') };
    }
    if (isCore) {
      state.xpShop.coreBonus += XP_SHOP_CORE_BONUS;
    } else {
      state.xpShop.looklikeBonus += XP_SHOP_LOOKLIKE_BONUS;
    }
    state.xpShop.updatedAt = Date.now();
    saveXpShop(state.xpShop);
    updateSettingTokenCounts();
    if (!state.suppressCloudSettingsSync) {
      scheduleCloudSettingsSync();
    }
    return { ok: true, message: t('Upgrade unlocked.') };
  }

  async function handleXpShopPurchase(kind) {
    const result = await purchaseXpUpgrade(kind);
    if (!result.ok) {
      setXpShopStatus(result.message, 'error');
      return;
    }
    refreshXpShopModal({ message: result.message, tone: 'success' });
  }

  function attachXpShopEvents() {
    const root = document.querySelector('.xp-shop');
    if (!root) return;
    root.querySelectorAll('[data-xp-shop]').forEach((button) => {
      button.addEventListener('click', () => {
        handleXpShopPurchase(button.dataset.xpShop || '');
      });
    });
  }

  function showXpShopLoginAlert() {
    const title = t('Login required');
    const text = t('Connect your XID to use the XP Shop.');
    if (window.Swal && typeof window.Swal.fire === 'function') {
      window.Swal.fire({
        title,
        text,
        icon: 'info',
        confirmButtonText: t('OK'),
        returnFocus: false,
        heightAuto: false,
        scrollbarPadding: false
      });
      return;
    }
    alert(`${title}\n${text}`);
  }

  async function openXpShop() {
    if (!isXpEligible()) {
      showXpShopLoginAlert();
      return;
    }
    if (!(await ensureXpSyncReady())) {
      showCloudSyncPendingAlert();
      return;
    }
    if (window.Swal && typeof window.Swal.fire === 'function') {
      window.Swal.fire({
        title: t('XP Shop'),
        html: buildXpShopHtml(),
        showConfirmButton: false,
        showCloseButton: true,
        returnFocus: false,
        heightAuto: false,
        scrollbarPadding: false,
        customClass: { popup: 'xp-shop-popup' },
        didOpen: () => {
          attachXpShopEvents();
          const closeButton = window.Swal.getCloseButton
            ? window.Swal.getCloseButton()
            : document.querySelector('.swal2-close');
          if (closeButton) {
            closeButton.addEventListener('click', () => {
              window.Swal.close();
            });
          }
        }
      });
      return;
    }
    const fallback = prompt(t('Type "core" or "looklike" to purchase.'), 'core');
    if (!fallback) return;
    handleXpShopPurchase(fallback.trim().toLowerCase());
  }

  function init() {
    const xid = readXidFromUrl();
    const communityImportUrl = readCommunityImportUrlFromQuery();
    if (communityImportUrl) {
      state.pendingCommunityImportUrl = communityImportUrl;
    }
    state.cloudSync = xid !== '';
    state.cloudHistoryLoaded = !state.cloudSync;
    state.cloudHistoryOk = !state.cloudSync;
    state.cloudHistoryEmpty = false;
    state.cloudSettingsLoaded = !state.cloudSync;
    state.deferCharacterModal = false;
    state.sessionId = state.cloudSync ? xid : randomId(16);
    state.xpSyncLoaded = false;
    state.xpSyncLastAt = 0;
    ensureSwalScrollGuard();
    setupCommunityFloatingClose();
    if (state.cloudSync) {
      const storedMembershipRaw = readStoredMembershipRaw();
      const storedMembership = normalizeMembership(storedMembershipRaw);
      setMembership(storedMembership, { persist: false });
      state.membershipResolved = storedMembershipRaw.trim() !== '' && storedMembership !== 'FREE';
    } else {
      setMembership('FREE');
      state.membershipResolved = true;
    }
    CONFIG.callServerUrl = resolveCallServerUrl();
    applyBrandFromHost();
    initSlots();
    initXpShop();
    lowPowerDebug('boot_before_read');
    state.settings.lowPowerMode = readDeviceLowPowerMode();
    const bootLowPowerValue = state.settings.lowPowerMode ? 'true' : 'false';
    document.documentElement.dataset.lowPower = bootLowPowerValue;
    document.documentElement.classList.toggle('low-power-mode', state.settings.lowPowerMode);
    if (document.body) {
      document.body.dataset.lowPower = bootLowPowerValue;
      document.body.classList.toggle('low-power-mode', state.settings.lowPowerMode);
    }
    lowPowerDebug('boot_after_apply', {
      sessionId: state.sessionId,
      cloudSync: state.cloudSync,
      bootLowPowerValue
    });

    state.messages = applyVoiceCacheToMessages(loadFromStorage(STORAGE_KEYS.history, []));
    state.gallery = sanitizeGallery(loadFromStorage(STORAGE_KEYS.gallery, []));
    loadSettings();
    lowPowerDebug('boot_after_load_settings', {
      lowPowerMode: state.settings.lowPowerMode
    });
    startLowPowerDebugWatch();
    applyMembershipGates();
    if (state.cloudSync) {
      storeGuestMessageCount(0, getGuestMessageKey());
    } else {
      state.guestMessageCount = readGuestMessageCount(getGuestMessageKey());
    }

    renderMessages();
    restoreCompanionAvatar();
    renderGallery();
    setupEmojiPanel();
    installMusicGlobalFallback();
    // Bind music controls early so they still work even if later event wiring fails.
    bindMusicEventHandlers();
    bindLowPowerToggleRealtime();
    bindLowPowerPersistenceOnExit();
    attachEvents();
    updatePhotoInfoButton();
    setupCharacterSelection();
    restoreChatroomBackground();
    updateComposerActions();
    ensureInitialScroll();
    updateJoinCommunityButtonState();
    setJoinCommunityFlip(false);
    handleDiscordRedirect();
    fetchDiscordStatus(true).catch(() => { });
    refreshNotificationBonusState().catch(() => { });
    initPwaInstallHandlers();

    setCloudSyncUI(state.cloudSync);
    updateAuthButtons();
    initXp();
    if (dom.footerXpFlip) {
      dom.footerXpFlip.classList.add('is-static-flip');
    }
    attachXpFlipHold();
    loadVipCta();
    loadUserIdentity();
    if (state.cloudSync) {
      loadVipStatus(state.sessionId);
      const localSettingsEmpty = isLocalSettingsEmpty();
      const noLocalHistory = !hasLocalConversationHistory();
      const showPullOverlay = localSettingsEmpty && noLocalHistory;
      const historyPromise = Promise.resolve(loadCloudHistory({ showOverlay: showPullOverlay }));
      const settingsPromise = localSettingsEmpty
        ? Promise.resolve(loadCloudSettings({ showOverlay: showPullOverlay }))
        : Promise.resolve(loadCloudSettings({ showOverlay: showPullOverlay }).finally(() => {
          scheduleCloudSettingsSync();
        }));
      Promise.allSettled([historyPromise, settingsPromise]).then(() => {
        if (state.pendingCommunityImportUrl) {
          const pendingUrl = state.pendingCommunityImportUrl;
          state.pendingCommunityImportUrl = '';
          void importCommunityCardFromUrl(pendingUrl);
        }
      });
    } else {
      if (state.messages.length === 0) {
        addSystemMessage(t('Welcome back. Say hi to start.'));
      }
      if (state.pendingCommunityImportUrl) {
        const pendingUrl = state.pendingCommunityImportUrl;
        state.pendingCommunityImportUrl = '';
        void importCommunityCardFromUrl(pendingUrl);
      }
    }
  }

  function randomId(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const bytes = new Uint8Array(length);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < length; i += 1) {
        bytes[i] = Math.floor(Math.random() * chars.length);
      }
    }
    return Array.from(bytes, (b) => chars[b % chars.length]).join('');
  }

  function normalizeSlotValue(value) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return SLOT_MIN;
    if (parsed < SLOT_MIN) return SLOT_MIN;
    if (parsed > SLOT_MAX) return SLOT_MAX;
    return parsed;
  }

  function getSlotSuffix(slot) {
    const normalized = normalizeSlotValue(slot);
    return normalized === SLOT_MIN ? '' : `_slot_${normalized}`;
  }

  function getSlotScopedKey(baseKey, slot = state.activeSlot) {
    return `${baseKey}${getSlotSuffix(slot)}`;
  }

  function getSlotStorageKey(baseKey, slot = state.activeSlot) {
    return getSlotScopedKey(baseKey, slot);
  }

  function getSlotSettingsKey(baseKey, slot = state.activeSlot) {
    return getSlotScopedKey(baseKey, slot);
  }

  function getSlotVoiceCacheKey(slot = state.activeSlot) {
    return getSlotScopedKey(VOICE_CACHE_KEY, slot);
  }

  function getSlotAvatarKey(slot = state.activeSlot) {
    return getSlotScopedKey(AVATAR_STORAGE_KEY, slot);
  }

  function getSlotSettingsXidKey(slot = state.activeSlot) {
    return getSlotScopedKey(SETTINGS_XID_KEY, slot);
  }

  function getActiveSlotStorageKey() {
    if (state.cloudSync && state.sessionId) {
      return `${SLOT_ACTIVE_KEY}_${state.sessionId}`;
    }
    return SLOT_ACTIVE_KEY;
  }

  function getCloudResetStorageKey(slot = state.activeSlot) {
    return getSlotStorageKey(CLOUD_RESET_KEY, slot);
  }

  function readCloudResetMarker(slot = state.activeSlot) {
    try {
      const raw = localStorage.getItem(getCloudResetStorageKey(slot));
      if (!raw) return 0;
      const parsed = Number.parseInt(raw, 10);
      return Number.isFinite(parsed) ? parsed : 0;
    } catch (err) {
      return 0;
    }
  }

  function writeCloudResetMarker(slot = state.activeSlot, timestamp = Date.now()) {
    try {
      localStorage.setItem(getCloudResetStorageKey(slot), String(timestamp));
    } catch (err) {
      // ignore storage errors
    }
  }

  function clearCloudResetMarker(slot = state.activeSlot) {
    try {
      localStorage.removeItem(getCloudResetStorageKey(slot));
    } catch (err) {
      // ignore storage errors
    }
  }

  function getSlotMetaStorageKey() {
    if (state.cloudSync && state.sessionId) {
      return `${SLOT_META_KEY}_${state.sessionId}`;
    }
    return SLOT_META_KEY;
  }

  function normalizeSlotsUnlocked(value) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return SLOT_DEFAULT_UNLOCKED;
    const clamped = Math.min(Math.max(parsed, SLOT_MIN), SLOT_MAX);
    return Math.max(clamped, SLOT_DEFAULT_UNLOCKED);
  }

  function normalizeSlotName(value) {
    if (typeof value !== 'string') return '';
    const collapsed = value.replace(/\s+/g, ' ').trim();
    if (!collapsed) return '';
    return collapsed.slice(0, SLOT_NAME_MAX_LENGTH);
  }

  function normalizeSlotNames(value) {
    const names = {};
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return names;
    }
    for (let slot = SLOT_MIN; slot <= SLOT_MAX; slot += 1) {
      const raw = value[String(slot)] ?? value[slot];
      const normalized = normalizeSlotName(raw);
      if (normalized) {
        names[String(slot)] = normalized;
      }
    }
    return names;
  }

  function loadSlotMeta() {
    const fallback = { unlocked: SLOT_DEFAULT_UNLOCKED, updatedAt: 0, namesUpdatedAt: 0, names: {} };
    const key = getSlotMetaStorageKey();
    if (!key) return fallback;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return fallback;
      const unlocked = normalizeSlotsUnlocked(parsed.unlocked ?? parsed.slots_unlocked ?? parsed.count ?? parsed.value);
      const updatedAt = normalizeTimestamp(parsed.updatedAt ?? parsed.updated_at ?? parsed.slots_updated_at);
      const namesUpdatedAt = normalizeTimestamp(
        parsed.namesUpdatedAt
        ?? parsed.names_updated_at
        ?? parsed.slot_names_updated_at
        ?? parsed.slotNamesUpdatedAt
      );
      const names = normalizeSlotNames(parsed.names ?? parsed.slot_names ?? parsed.slotNames);
      const resolvedNamesUpdatedAt = Object.keys(names).length > 0 && namesUpdatedAt === 0
        ? (updatedAt || normalizeTimestamp(Date.now()))
        : namesUpdatedAt;
      return { unlocked, updatedAt, namesUpdatedAt: resolvedNamesUpdatedAt, names };
    } catch (err) {
      return fallback;
    }
  }

  function saveSlotMeta(meta) {
    const key = getSlotMetaStorageKey();
    if (!key) return;
    const unlocked = normalizeSlotsUnlocked(meta && meta.unlocked);
    const updatedAt = normalizeTimestamp(meta && meta.updatedAt);
    const namesUpdatedAt = normalizeTimestamp(
      meta && (
        meta.namesUpdatedAt
        ?? meta.names_updated_at
        ?? meta.slot_names_updated_at
        ?? meta.slotNamesUpdatedAt
      )
    );
    const names = normalizeSlotNames(meta && (meta.names ?? meta.slot_names ?? meta.slotNames));
    try {
      localStorage.setItem(key, JSON.stringify({ unlocked, updatedAt, namesUpdatedAt, names }));
    } catch (err) {
      // ignore storage errors
    }
  }

  function loadActiveSlot() {
    const key = getActiveSlotStorageKey();
    if (!key) return SLOT_MIN;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return SLOT_MIN;
      return normalizeSlotValue(raw);
    } catch (err) {
      return SLOT_MIN;
    }
  }

  function saveActiveSlot(slot) {
    const key = getActiveSlotStorageKey();
    if (!key) return;
    const normalized = normalizeSlotValue(slot);
    try {
      localStorage.setItem(key, String(normalized));
    } catch (err) {
      // ignore storage errors
    }
  }

  function initSlots() {
    state.slotMeta = loadSlotMeta();
    let activeSlot = loadActiveSlot();
    const hasActiveSlotData = hasStoredKey(getSlotStorageKey(STORAGE_KEYS.history, activeSlot))
      || hasStoredKey(getSlotStorageKey(STORAGE_KEYS.gallery, activeSlot))
      || hasStoredKey(getSlotSettingsXidKey(activeSlot));
    const deferClamp = state.cloudSync
      && normalizeSlotsUnlocked(state.slotMeta.unlocked) === SLOT_DEFAULT_UNLOCKED
      && normalizeTimestamp(state.slotMeta.updatedAt) === 0
      && activeSlot > state.slotMeta.unlocked
      && hasActiveSlotData;
    if (!deferClamp && activeSlot > state.slotMeta.unlocked) {
      activeSlot = state.slotMeta.unlocked;
    }
    state.activeSlot = activeSlot;
    saveActiveSlot(activeSlot);
  }

  function loadFromStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(getSlotStorageKey(key));
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function hasStoredKey(key) {
    if (!key) return false;
    try {
      return localStorage.getItem(key) !== null;
    } catch (err) {
      return false;
    }
  }

  function hasLocalHistoryKey(slot = state.activeSlot) {
    return hasStoredKey(getSlotStorageKey(STORAGE_KEYS.history, slot));
  }

  function hasLocalConversationHistory(slot = state.activeSlot) {
    const history = readStorageJsonArray(getSlotStorageKey(STORAGE_KEYS.history, slot), []);
    return history.some((message) => isConversationMessage(message));
  }

  function shouldPreferLocalHistory(slot = state.activeSlot) {
    if (!state.cloudSync) return false;
    if (readCloudResetMarker(slot) > 0) return true;
    if (!hasLocalHistoryKey(slot)) return false;
    return hasLocalConversationHistory(slot);
  }

  function markLocalHistoryLoaded() {
    const hasConversation = state.messages.some((message) => isConversationMessage(message));
    state.cloudHistoryLoaded = true;
    state.cloudHistoryOk = true;
    state.cloudHistoryEmpty = !hasConversation;
    if (state.messages.length === 0) {
      addSystemMessage(t('Welcome back. Say hi to start.'));
    }
    resolveDeferredCharacterModal();
  }

  function loadVoiceCache() {
    try {
      const raw = localStorage.getItem(getSlotVoiceCacheKey());
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch (err) {
      return {};
    }
  }

  function saveVoiceCache(cache) {
    localStorage.setItem(getSlotVoiceCacheKey(), JSON.stringify(cache));
  }

  function parseCloudIdFromMessageId(value) {
    if (typeof value !== 'string') return null;
    if (!value.startsWith('cloud-')) return null;
    const parsed = Number(value.slice('cloud-'.length));
    return Number.isFinite(parsed) ? parsed : null;
  }

  function getVoiceCacheKey(message) {
    if (!message || typeof message !== 'object') return '';
    if (Number.isFinite(message.cloudId)) {
      return `cloud-${message.cloudId}`;
    }
    const id = typeof message.id === 'string' ? message.id.trim() : '';
    if (!id) return '';
    const cloudId = parseCloudIdFromMessageId(id);
    if (Number.isFinite(cloudId)) {
      return `cloud-${cloudId}`;
    }
    return id;
  }

  function applyVoiceCacheToMessages(messages) {
    if (!Array.isArray(messages) || messages.length === 0) return messages;
    const cache = loadVoiceCache();
    if (!cache || Object.keys(cache).length === 0) return messages;
    let changed = false;
    const merged = messages.map((message) => {
      if (!message || message.voiceUrl) return message;
      const key = getVoiceCacheKey(message);
      const entry = key ? cache[key] : null;
      if (!entry || !entry.url) return message;
      changed = true;
      return {
        ...message,
        voiceUrl: entry.url,
        voiceTrimmed: Boolean(entry.trimmed)
      };
    });
    return changed ? merged : messages;
  }

  function persistVoiceCacheEntry(message, voiceUrl, trimmed) {
    const key = getVoiceCacheKey(message);
    if (!key || !voiceUrl) return;
    const cache = loadVoiceCache();
    cache[key] = { url: voiceUrl, trimmed: Boolean(trimmed) };
    saveVoiceCache(cache);
  }

  function isAudioItem(item) {
    if (!item || typeof item !== 'object') return false;
    const type = (item.type || '').toLowerCase();
    const url = (item.url || '').toLowerCase();
    if (type === 'audio' || type.startsWith('audio/')) return true;
    return Boolean(url.match(/\.(mp3|wav|ogg|m4a|webm)$/));
  }

  function sanitizeGallery(items) {
    if (!Array.isArray(items)) return [];
    const filtered = items.filter((item) => !isAudioItem(item));
    if (filtered.length !== items.length) {
      saveToStorage(STORAGE_KEYS.gallery, filtered);
    }
    return filtered;
  }

  function saveToStorage(key, value) {
    localStorage.setItem(getSlotStorageKey(key), JSON.stringify(value));
  }

  function readStorageRaw(key) {
    if (!key) return null;
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  function readStorageJsonArray(key, fallback = []) {
    const raw = readStorageRaw(key);
    if (!raw) return fallback;
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function readStorageJsonObject(key, fallback = {}) {
    const raw = readStorageRaw(key);
    if (!raw) return fallback;
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function buildOfflineSlotData(slot) {
    const historyKey = getSlotStorageKey(STORAGE_KEYS.history, slot);
    const galleryKey = getSlotStorageKey(STORAGE_KEYS.gallery, slot);
    const backgroundKey = getSlotStorageKey(STORAGE_KEYS.background, slot);
    const photoUnlocksKey = getSlotStorageKey(STORAGE_KEYS.photoUnlocks, slot);
    const voiceKey = getSlotVoiceCacheKey(slot);
    const avatarKey = getSlotAvatarKey(slot);
    const settingsXidKey = getSlotSettingsXidKey(slot);
    const resetKey = getCloudResetStorageKey(slot);
    const settings = {};
    Object.values(SETTINGS_KEYS).forEach((key) => {
      const raw = readStorageRaw(getSlotSettingsKey(key, slot));
      if (raw !== null) {
        settings[key] = raw;
      }
    });
    const resetRaw = readStorageRaw(resetKey);
    const resetAt = resetRaw ? Number.parseInt(resetRaw, 10) : 0;
    return {
      history: readStorageJsonArray(historyKey, []),
      gallery: readStorageJsonArray(galleryKey, []),
      background: readStorageRaw(backgroundKey) || '',
      photoUnlocks: readStorageJsonArray(photoUnlocksKey, []),
      avatar: readStorageRaw(avatarKey) || '',
      voiceCache: readStorageJsonObject(voiceKey, {}),
      settings,
      settingsXid: readStorageRaw(settingsXidKey) || '',
      cloudResetAt: Number.isFinite(resetAt) ? resetAt : 0
    };
  }

  function buildOfflineBackupPayload() {
    const slots = {};
    for (let slot = SLOT_MIN; slot <= SLOT_MAX; slot += 1) {
      slots[String(slot)] = buildOfflineSlotData(slot);
    }
    return {
      schema: OFFLINE_DATA_SCHEMA,
      version: OFFLINE_DATA_VERSION,
      xid: state.sessionId || '',
      exportedAt: new Date().toISOString(),
      slots
    };
  }

  function normalizeOfflineSlotData(raw) {
    const safe = raw && typeof raw === 'object' ? raw : {};
    const settingsRaw = safe.settings && typeof safe.settings === 'object' && !Array.isArray(safe.settings)
      ? safe.settings
      : {};
    const settings = {};
    Object.values(SETTINGS_KEYS).forEach((key) => {
      if (settingsRaw[key] !== undefined && settingsRaw[key] !== null) {
        settings[key] = String(settingsRaw[key]);
      }
    });
    return {
      history: Array.isArray(safe.history) ? safe.history : [],
      gallery: Array.isArray(safe.gallery) ? safe.gallery : [],
      background: typeof safe.background === 'string' ? safe.background : '',
      photoUnlocks: Array.isArray(safe.photoUnlocks)
        ? safe.photoUnlocks
        : (Array.isArray(safe.photo_unlocks) ? safe.photo_unlocks : []),
      avatar: typeof safe.avatar === 'string' ? safe.avatar : '',
      voiceCache: safe.voiceCache && typeof safe.voiceCache === 'object' && !Array.isArray(safe.voiceCache)
        ? safe.voiceCache
        : {},
      settings,
      cloudResetAt: normalizeTimestamp(safe.cloudResetAt ?? safe.cloud_reset_at ?? safe.resetAt)
    };
  }

  function clearOfflineSlotStorage(slot) {
    localStorage.removeItem(getSlotStorageKey(STORAGE_KEYS.history, slot));
    localStorage.removeItem(getSlotStorageKey(STORAGE_KEYS.gallery, slot));
    localStorage.removeItem(getSlotStorageKey(STORAGE_KEYS.background, slot));
    localStorage.removeItem(getSlotStorageKey(STORAGE_KEYS.photoUnlocks, slot));
    localStorage.removeItem(getSlotVoiceCacheKey(slot));
    localStorage.removeItem(getSlotAvatarKey(slot));
    Object.values(SETTINGS_KEYS).forEach((key) => {
      localStorage.removeItem(getSlotSettingsKey(key, slot));
    });
    localStorage.removeItem(getSlotSettingsXidKey(slot));
    localStorage.removeItem(getCloudResetStorageKey(slot));
  }

  function applyOfflineBackupPayload(payload) {
    const slots = payload && typeof payload === 'object' && payload.slots && typeof payload.slots === 'object'
      ? payload.slots
      : {};
    const validSettings = new Set(Object.values(SETTINGS_KEYS));
    const targetXid = state.sessionId || (payload && payload.xid ? String(payload.xid) : '');
    for (let slot = SLOT_MIN; slot <= SLOT_MAX; slot += 1) {
      const slotData = normalizeOfflineSlotData(slots[String(slot)] ?? slots[slot] ?? {});
      clearOfflineSlotStorage(slot);
      localStorage.setItem(getSlotStorageKey(STORAGE_KEYS.history, slot), JSON.stringify(slotData.history));
      localStorage.setItem(getSlotStorageKey(STORAGE_KEYS.gallery, slot), JSON.stringify(slotData.gallery));
      localStorage.setItem(
        getSlotStorageKey(STORAGE_KEYS.photoUnlocks, slot),
        JSON.stringify(normalizePhotoUnlocks(slotData.photoUnlocks))
      );
      localStorage.setItem(getSlotVoiceCacheKey(slot), JSON.stringify(slotData.voiceCache));
      if (slotData.background) {
        localStorage.setItem(getSlotStorageKey(STORAGE_KEYS.background, slot), slotData.background);
      }
      if (slotData.avatar) {
        localStorage.setItem(getSlotAvatarKey(slot), slotData.avatar);
      }
      Object.entries(slotData.settings).forEach(([key, value]) => {
        if (!validSettings.has(key)) return;
        localStorage.setItem(getSlotSettingsKey(key, slot), String(value));
      });
      if (targetXid) {
        localStorage.setItem(getSlotSettingsXidKey(slot), targetXid);
      }
      if (slotData.cloudResetAt > 0) {
        localStorage.setItem(getCloudResetStorageKey(slot), String(slotData.cloudResetAt));
      }
    }
  }

  function normalizeCloudMessage(item) {
    if (!item || typeof item !== 'object') return null;
    const role = item.role === 'assistant' ? 'assistant' : (item.role === 'user' ? 'user' : '');
    if (!role) return null;
    const text = typeof item.text === 'string'
      ? item.text
      : (typeof item.content === 'string' ? item.content : '');
    const mediaUrlRaw = typeof item.media_url === 'string'
      ? item.media_url
      : (typeof item.mediaUrl === 'string' ? item.mediaUrl : '');
    const mediaTypeRaw = typeof item.media_type === 'string'
      ? item.media_type
      : (typeof item.mediaType === 'string' ? item.mediaType : '');
    const voiceUrlRaw = typeof item.voice_url === 'string'
      ? item.voice_url
      : (typeof item.voiceUrl === 'string' ? item.voiceUrl : '');
    const voiceTrimmedRaw = item.voice_trimmed ?? item.voiceTrimmed;
    const createdAt = typeof item.created_at === 'string'
      ? item.created_at
      : (typeof item.timestamp === 'string' ? item.timestamp : '');
    const mediaUrl = mediaUrlRaw ? resolveMediaUrl(mediaUrlRaw) : '';
    const mediaType = mediaTypeRaw || (mediaUrl ? inferMediaType(mediaUrl) : '');
    const voiceUrl = voiceUrlRaw ? resolveMediaUrl(voiceUrlRaw) : '';
    const voiceTrimmed = voiceTrimmedRaw === true || voiceTrimmedRaw === 1 || voiceTrimmedRaw === '1';
    const editedRaw = item.edited ?? item.is_edited;
    const edited = editedRaw === true || editedRaw === 1 || editedRaw === '1';
    let finalText = text || '';
    if (!finalText && mediaUrl) {
      const fallbackType = mediaType || inferMediaType(mediaUrl) || 'file';
      finalText = `Shared a ${fallbackType} file.`;
    }
    if (!finalText && !mediaUrl) return null;
    const rawId = item.id;
    const cloudId = rawId !== undefined && rawId !== null && rawId !== ''
      ? Number(rawId)
      : null;
    const idValue = Number.isFinite(cloudId) ? `cloud-${cloudId}` : randomId(10);
    return {
      id: idValue,
      cloudId: Number.isFinite(cloudId) ? cloudId : null,
      role,
      text: finalText,
      mediaUrl,
      mediaType,
      voiceUrl,
      voiceTrimmed,
      timestamp: createdAt || new Date().toISOString(),
      meta: '',
      edited
    };
  }

  function buildGalleryFromHistory(messages) {
    const items = [];
    const seen = new Set();
    messages.forEach((msg) => {
      if (!msg || !msg.mediaUrl) return;
      const type = msg.mediaType || inferMediaType(msg.mediaUrl);
      if (type === 'audio') return;
      if (seen.has(msg.mediaUrl)) return;
      seen.add(msg.mediaUrl);
      items.push({
        id: randomId(10),
        url: msg.mediaUrl,
        type: type || 'image',
        prompt: msg.prompt || msg.text || '',
        source: msg.role === 'assistant' ? 'assistant' : 'user',
        status: 'ready',
        createdAt: msg.timestamp || new Date().toISOString()
      });
    });
    return items;
  }

  async function loadCloudHistory(options = {}) {
    const force = options.force === true;
    const showOverlay = options.showOverlay === true;
    const slot = normalizeSlotValue(options.slot ?? state.activeSlot);
    if (!state.cloudSync) return false;
    if (!force && shouldPreferLocalHistory(slot)) {
      markLocalHistoryLoaded();
      return true;
    }
    let loaded = false;
    let failureMessage = 'Cloud sync unavailable. Try again.';

    const parseCloudResponse = async (response) => {
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        const snippet = rawText ? rawText.trim().slice(0, 200) : '';
        const statusLabel = response.status ? ` (${response.status})` : '';
        failureMessage = snippet
          ? `Cloud sync failed${statusLabel}: ${snippet}`
          : `Cloud sync failed${statusLabel}.`;
        if (DEBUG) {
          console.warn('Chatroom debug: invalid cloud history response', {
            status: response.status,
            rawText
          });
        }
        throw err;
      }
      if (!response.ok || !data || !data.ok) {
        if (data && data.error) {
          failureMessage = data.error;
        } else if (response.status) {
          failureMessage = `Cloud sync failed (${response.status}).`;
        }
        throw new Error(failureMessage);
      }
      return data;
    };

    const applyCloudHistory = (data) => {
      const items = Array.isArray(data.history) ? data.history : [];
      const normalized = items.map(normalizeCloudMessage).filter(Boolean);
      const merged = applyVoiceCacheToMessages(normalized);
      const cloudHasConversation = merged.some((message) => isConversationMessage(message));
      const localHasConversation = hasLocalConversationHistory(slot)
        || state.messages.some((message) => isConversationMessage(message));
      const hasResetMarker = readCloudResetMarker(slot) > 0;
      if (!cloudHasConversation && localHasConversation && !force && !hasResetMarker) {
        state.cloudHistoryEmpty = false;
        if (DEBUG) {
          console.warn('Chatroom debug: preserving local history; skipping empty cloud overwrite', {
            slot
          });
        }
        return;
      }
      state.messages = merged;
      state.cloudHistoryEmpty = merged.length === 0;
      state.gallery = buildGalleryFromHistory(state.messages);
      saveToStorage(STORAGE_KEYS.history, state.messages);
      saveToStorage(STORAGE_KEYS.gallery, state.gallery);
      renderMessages();
      renderGallery();
      updatePhotoInfoButton();
      ensureInitialScroll();
      if (state.messages.length === 0) {
        addSystemMessage(t('Welcome back. Say hi to start.'));
      }
    };

    if (showOverlay) {
      beginCloudSyncOverlay();
    }
    try {
      try {
        const response = await fetch(CONFIG.replyEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            history_fetch: 1,
            XID: state.sessionId,
            slot,
            limit: CLOUD_HISTORY_LIMIT,
            debug: DEBUG
          })
        });
        const data = await parseCloudResponse(response);
        applyCloudHistory(data);
        state.cloudHistoryOk = true;
        state.cloudHistoryLoaded = true;
        loaded = true;
        resolveDeferredCharacterModal();
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: cloud history load failed (POST)', err);
        }
        try {
          const params = new URLSearchParams({
            history_fetch: '1',
            XID: state.sessionId,
            slot: String(slot),
            limit: String(CLOUD_HISTORY_LIMIT),
            debug: DEBUG ? '1' : '0',
            _: String(Date.now())
          });
          const response = await fetch(`${CONFIG.replyEndpoint}?${params.toString()}`, {
            method: 'GET'
          });
          const data = await parseCloudResponse(response);
          applyCloudHistory(data);
          state.cloudHistoryOk = true;
          state.cloudHistoryLoaded = true;
          loaded = true;
          resolveDeferredCharacterModal();
        } catch (fallbackErr) {
          if (DEBUG) {
            console.warn('Chatroom debug: cloud history load failed (GET)', fallbackErr);
          }
          if (fallbackErr && fallbackErr.name === 'TypeError' && failureMessage === 'Cloud sync unavailable. Try again.') {
            failureMessage = 'Cloud sync request failed. Check reply.php response.';
          }
          state.cloudHistoryOk = false;
          state.cloudHistoryLoaded = true;
          resolveDeferredCharacterModal();
          if (state.messages.length === 0) {
            const message = failureMessage || (fallbackErr && fallbackErr.message ? fallbackErr.message : '');
            addSystemMessage(t(message || 'Cloud sync unavailable. Try again.'));
          }
        }
      }
    } finally {
      if (showOverlay) {
        endCloudSyncOverlay();
      }
    }
    return loaded;
  }

  function resolveDeferredCharacterModal() {
    if (!state.deferCharacterModal) return;
    if (state.cloudSync && (!state.cloudHistoryLoaded || !state.cloudSettingsLoaded)) {
      return;
    }
    state.deferCharacterModal = false;
    if (state.cloudSync && !state.cloudHistoryOk) {
      closeCharacterModal();
      return;
    }
    if (state.cloudHistoryEmpty && !state.characterId) {
      openCharacterModal();
    } else {
      closeCharacterModal();
    }
  }

  async function confirmDialog({ title, text, confirmText, cancelText, icon }) {
    if (window.Swal && typeof window.Swal.fire === 'function') {
      const swalText = text || '';
      const options = {
        title: title || t('Are you sure?'),
        icon: icon || 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText || t('Confirm'),
        cancelButtonText: cancelText || t('Cancel'),
        reverseButtons: true,
        focusCancel: true
      };
      if (swalText) {
        if (swalText.includes('\n')) {
          options.html = formatHtmlBlock(swalText);
        } else {
          options.text = swalText;
        }
      }
      const result = await window.Swal.fire(options);
      return result.isConfirmed;
    }
    const fallbackText = text ? `${title || t('Confirm')}\n${text}` : (title || t('Confirm'));
    return confirm(fallbackText);
  }

  const PRESET_VALUES = new Set([
    'custom',
    'girlfriend',
    'wife',
    'mistress',
    'companion',
    'boyfriend',
    'fuckboy'
  ]);

  function normalizeSettingText(value, maxLength) {
    if (typeof value !== 'string') return '';
    const trimmed = value.trim();
    if (!trimmed) return '';
    return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
  }

  function normalizeBackgroundUrl(value) {
    return normalizeSettingText(value, 2000);
  }

  function countTokens(value) {
    if (window.gpt3encoder && typeof window.gpt3encoder.countTokens === 'function') {
      return window.gpt3encoder.countTokens(value || '');
    }
    const text = String(value || '').trim();
    if (!text) return 0;
    return text.split(/\s+/).length;
  }

  function getMembershipTierLabel(info) {
    if (!info) return t('FREE');
    if (info.isAdmin || info.isUltra500) return t('500 ULTRA VIP');
    if (info.isUltra) return t('ULTRA VIP');
    if (info.isGptTier) return t('GPT4 VIP');
    if (info.isVip) return t('VIP');
    return t('FREE');
  }

  function isDreamCharacterId(value) {
    const trimmed = typeof value === 'string' ? value.trim().toLowerCase() : '';
    return trimmed.startsWith('dream:');
  }

  function shouldDeferTokenClamp() {
    return state.cloudSync && !state.membershipResolved;
  }

  function resolvePromptLimit(maxTokens) {
    return shouldDeferTokenClamp() ? 0 : maxTokens;
  }

  function getMembershipTokenLimits(characterIdOverride) {
    const info = getMembershipInfo();
    const limits = TOKEN_LIMITS[info.tier] || TOKEN_LIMITS.free;
    const characterId = typeof characterIdOverride === 'string' ? characterIdOverride : state.characterId;
    const bonuses = getXpShopBonuses();
    const coreBonus = bonuses.coreBonus;
    const looklikeBonus = bonuses.looklikeBonus;
    const looklikeBase = isDreamCharacterId(characterId) ? 0 : limits.looklike;
    return {
      core: Math.max(0, limits.core + coreBonus),
      looklike: looklikeBase > 0 ? looklikeBase + looklikeBonus : 0,
      label: getMembershipTierLabel(info)
    };
  }

  function getMembershipMemoryLimit() {
    const info = getMembershipInfo();
    const maxTokens = MEMORY_TOKEN_LIMITS[info.tier] || MEMORY_TOKEN_LIMITS.free;
    return {
      maxTokens,
      label: getMembershipTierLabel(info)
    };
  }

  function isConversationMessage(message) {
    return Boolean(
      message &&
      (message.role === 'user' || message.role === 'assistant') &&
      message.meta !== 'System' &&
      message.id !== 'typing'
    );
  }

  function getMessageTokenCount(message) {
    if (!message) return 0;
    const text = (message.text || '').trim();
    return text ? countTokens(text) : 0;
  }

  function formatMessageTokenMeta(tokens, totalTokens) {
    if (isFevermateHost()) {
      return '';
    }
    const tokenCount = tokens.toLocaleString();
    const totalCount = totalTokens.toLocaleString();
    const tokenText = t(tokens === 1 ? '{count} token' : '{count} tokens', { count: tokenCount });
    const totalText = t(totalTokens === 1 ? '{count} token total' : '{count} tokens total', { count: totalCount });
    return ` (${tokenText} - ${totalText})`;
  }

  function formatMessageMeta(message, tokenData) {
    const time = new Date(message.timestamp || Date.now());
    const labels = [];
    if (message.meta) labels.push(t(message.meta));
    if (message.edited) labels.push(t('edited'));
    const label = labels.length ? ` - ${labels.join(' AÃº ')}` : '';
    const tokenText = tokenData
      ? formatMessageTokenMeta(tokenData.tokens, tokenData.total)
      : '';
    return `${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}${label}${tokenText}`;
  }

  function buildConversationTokenState(messages) {
    const entries = [];
    const tokenById = new Map();
    messages.forEach((message) => {
      if (!isConversationMessage(message)) return;
      const tokens = getMessageTokenCount(message);
      entries.push({ message, tokens });
      if (message.id) {
        tokenById.set(message.id, tokens);
      }
    });

    const { maxTokens } = getMembershipMemoryLimit();
    const includedIds = new Set();
    let usedTokens = 0;

    if (!Number.isFinite(maxTokens) || maxTokens <= 0) {
      entries.forEach(({ message, tokens }) => {
        if (message.id) {
          includedIds.add(message.id);
          usedTokens += tokens;
        }
      });
    } else {
      for (let i = entries.length - 1; i >= 0; i -= 1) {
        const { message, tokens } = entries[i];
        if (!message.id) continue;
        if (usedTokens + tokens <= maxTokens || usedTokens === 0) {
          includedIds.add(message.id);
          usedTokens += tokens;
        }
      }
    }

    const totalById = new Map();
    let totalTokens = 0;
    entries.forEach(({ message, tokens }) => {
      if (!message.id) return;
      if (includedIds.has(message.id)) {
        totalTokens += tokens;
      }
      totalById.set(message.id, totalTokens);
    });

    return {
      entries,
      tokenById,
      totalById,
      includedIds,
      totalTokens,
      memoryLimit: maxTokens,
      memoryUsedTokens: usedTokens
    };
  }

  function hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = ((hash << 5) - hash) + value.charCodeAt(i);
      hash |= 0;
    }
    return String(hash);
  }

  function getCompactionMessageKey(message, index) {
    const id = message && typeof message.id === 'string' ? message.id.trim() : '';
    return id || `idx:${index}`;
  }

  function formatMessageForCompaction(message) {
    if (!message) return '';
    const role = message.role === 'assistant' ? 'Assistant' : 'User';
    let text = typeof message.text === 'string' ? message.text.trim() : '';
    if (!text && message.mediaUrl) {
      const mediaType = message.mediaType || inferMediaType(message.mediaUrl);
      text = `${role} shared a ${mediaType} file.`;
    }
    if (!text) return '';
    text = text.replace(/\s+/g, ' ').trim();
    return `${role}: ${text}`;
  }

  function clampMemoryCompactionInput(input) {
    const raw = String(input || '');
    const maxChars = MEMORY_COMPACTION_INPUT_MAX_CHARS;
    if (!raw || raw.length <= maxChars) return raw;
    const gap = MEMORY_COMPACTION_GAP_MARKER;
    const available = Math.max(0, maxChars - gap.length);
    const minTotal = MEMORY_COMPACTION_MIN_HEAD_CHARS + MEMORY_COMPACTION_MIN_TAIL_CHARS;
    let headTarget = Math.floor(available * MEMORY_COMPACTION_HEAD_RATIO);
    let tailTarget = available - headTarget;
    if (minTotal <= available) {
      if (headTarget < MEMORY_COMPACTION_MIN_HEAD_CHARS) {
        headTarget = MEMORY_COMPACTION_MIN_HEAD_CHARS;
        tailTarget = Math.max(0, available - headTarget);
      }
      if (tailTarget < MEMORY_COMPACTION_MIN_TAIL_CHARS) {
        tailTarget = MEMORY_COMPACTION_MIN_TAIL_CHARS;
        headTarget = Math.max(0, available - tailTarget);
      }
    }
    let head = raw.slice(0, headTarget);
    let tail = raw.slice(-tailTarget);
    const headBreak = head.lastIndexOf('\n');
    if (headBreak > 0) {
      head = head.slice(0, headBreak);
    }
    const tailBreak = tail.indexOf('\n');
    if (tailBreak >= 0 && tailBreak < tail.length - 1) {
      tail = tail.slice(tailBreak + 1);
    }
    head = head.trimEnd();
    tail = tail.trimStart();
    if (!head) {
      return tail.slice(-maxChars).trimStart();
    }
    if (!tail) {
      return head.slice(0, maxChars).trimEnd();
    }
    let combined = head + gap + tail;
    if (combined.length > maxChars) {
      const overflow = combined.length - maxChars;
      if (overflow < tail.length) {
        tail = tail.slice(overflow);
        combined = head + gap + tail;
      } else {
        combined = combined.slice(-maxChars);
      }
    }
    return combined.trim();
  }

  function buildMemoryCompactionInput(tokenState) {
    if (!tokenState || !Array.isArray(tokenState.entries)) {
      return { hasGray: false, input: '', hash: '' };
    }
    const entries = tokenState.entries;
    if (!entries.length) {
      return { hasGray: false, input: '', hash: '' };
    }

    const oldestKeys = new Set();
    entries.slice(0, MEMORY_COMPACTION_OLDEST_TURNS).forEach((entry, index) => {
      oldestKeys.add(getCompactionMessageKey(entry.message, index));
    });

    const grayKeys = new Set();
    let lastGrayKey = '';
    entries.forEach((entry, index) => {
      const message = entry.message;
      if (!message || !message.id) return;
      if (!tokenState.includedIds.has(message.id)) {
        const key = getCompactionMessageKey(message, index);
        grayKeys.add(key);
        lastGrayKey = key;
      }
    });

    if (grayKeys.size === 0) {
      return { hasGray: false, input: '', hash: '' };
    }

    const includeKeys = new Set([...grayKeys, ...oldestKeys]);
    const lines = [];
    entries.forEach((entry, index) => {
      const key = getCompactionMessageKey(entry.message, index);
      if (!includeKeys.has(key)) return;
      const line = formatMessageForCompaction(entry.message);
      if (line) {
        lines.push(line);
      }
    });

    if (!lines.length) {
      return { hasGray: false, input: '', hash: '' };
    }

    const input = clampMemoryCompactionInput(lines.join('\n'));
    const aiCore = normalizeAiCoreValue(state.settings.aiCore || DEFAULT_AI_CORE);
    const hash = hashString(`${aiCore}|${input}|${grayKeys.size}|${lastGrayKey}`);
    return { hasGray: true, input, hash };
  }

  function clearMemoryCompactionQueue() {
    if (memoryCompactionTimer) {
      clearTimeout(memoryCompactionTimer);
      memoryCompactionTimer = null;
    }
    memoryCompactionState.pending = null;
  }

  function resetMemoryCompactionState() {
    clearMemoryCompactionQueue();
    memoryCompactionState.inFlight = false;
    memoryCompactionState.lastHash = '';
  }

  function scheduleMemoryCompaction(tokenState) {
    if (!state.settings.memoryCompaction) return;
    const { hasGray, input, hash } = buildMemoryCompactionInput(tokenState);
    if (!hasGray || !input) return;
    if (hash === memoryCompactionState.lastHash) return;
    memoryCompactionState.pending = { input, hash };
    if (memoryCompactionTimer) {
      clearTimeout(memoryCompactionTimer);
    }
    memoryCompactionTimer = setTimeout(() => {
      memoryCompactionTimer = null;
      void runMemoryCompaction();
    }, MEMORY_COMPACTION_DEBOUNCE_MS);
  }

  async function requestMemoryCompactionSummary(input) {
    const payload = {
      message: input,
      core_prompt: MEMORY_COMPACTION_SYSTEM_PROMPT,
      ai_core: coerceAiCoreForMembership(state.settings.aiCore || DEFAULT_AI_CORE),
      ai_temperature: Math.min(0.3, normalizeTemperatureValue(state.settings.aiTemperature)),
      photo_style: 'Disable Photo Gen',
      history: [],
      summary_mode: 1,
      debug: DEBUG
    };
    try {
      const response = await fetch(CONFIG.replyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: memory summary response invalid', {
            status: response.status,
            rawText
          });
        }
        return '';
      }
      if (!response.ok || !data || !data.ok) {
        if (DEBUG) {
          console.warn('Chatroom debug: memory summary failed', {
            status: response.status,
            data
          });
        }
        return '';
      }
      return normalizeMemorySummary(data.reply || '');
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: memory summary request failed', err);
      }
      return '';
    }
  }

  async function runMemoryCompaction() {
    if (memoryCompactionState.inFlight) return;
    const pending = memoryCompactionState.pending;
    if (!pending) return;
    if (!state.settings.memoryCompaction) {
      memoryCompactionState.pending = null;
      return;
    }
    memoryCompactionState.pending = null;
    memoryCompactionState.inFlight = true;
    try {
      const summary = await requestMemoryCompactionSummary(pending.input);
      if (summary) {
        if (summary !== state.settings.memorySummary) {
          state.settings.memorySummary = summary;
          persistSettings();
          refreshMessageTokenState();
        }
        memoryCompactionState.lastHash = pending.hash;
      }
    } finally {
      memoryCompactionState.inFlight = false;
      if (memoryCompactionState.pending) {
        setTimeout(() => {
          void runMemoryCompaction();
        }, 0);
      }
    }
  }

  function getMemorySummaryDisplayState(tokenState) {
    const summary = normalizeMemorySummary(state.settings.memorySummary);
    if (!state.settings.memoryCompaction || !summary) {
      return { show: false, summary: '', hiddenIds: new Set() };
    }
    if (!tokenState || !Array.isArray(tokenState.entries)) {
      return { show: false, summary, hiddenIds: new Set() };
    }
    const grayIds = new Set();
    tokenState.entries.forEach((entry) => {
      const message = entry.message;
      if (!message || !message.id) return;
      if (!tokenState.includedIds.has(message.id)) {
        grayIds.add(message.id);
      }
    });
    if (!grayIds.size) {
      return { show: false, summary, hiddenIds: new Set() };
    }
    const hiddenIds = new Set(grayIds);
    tokenState.entries.slice(0, MEMORY_COMPACTION_OLDEST_TURNS).forEach((entry) => {
      const message = entry.message;
      if (!message || !message.id) return;
      hiddenIds.add(message.id);
    });
    return { show: true, summary, hiddenIds };
  }

  function buildMemorySummaryElement(summaryText) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message assistant memory-summary';
    wrapper.dataset.memorySummary = '1';

    const label = document.createElement('div');
    label.className = 'memory-summary-label';
    label.textContent = t('System Summary');

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    setTextWithLineBreaks(bubble, summaryText);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'action-button';
    editButton.textContent = t('Edit');
    editButton.addEventListener('click', () => enterMemorySummaryEditMode(wrapper));

    actions.append(editButton);
    wrapper.append(label, bubble, actions);
    return wrapper;
  }

  function syncMemorySummaryUI(tokenState) {
    if (!dom.chatLog) return;
    const display = getMemorySummaryDisplayState(tokenState);
    const existing = dom.chatLog.querySelector('[data-memory-summary="1"]');

    if (!display.show) {
      if (existing && !existing.classList.contains('editing')) {
        existing.remove();
      }
    } else if (!existing) {
      const summaryEl = buildMemorySummaryElement(display.summary);
      dom.chatLog.prepend(summaryEl);
    } else if (!existing.classList.contains('editing')) {
      const bubble = existing.querySelector('.bubble');
      if (bubble) {
        setTextWithLineBreaks(bubble, display.summary);
      }
    }

    state.messages.forEach((message) => {
      if (!message || !message.id) return;
      const wrapper = dom.chatLog.querySelector(`[data-message-id="${message.id}"]`);
      if (!wrapper) return;
      const shouldCompact = display.show && display.hiddenIds.has(message.id);
      wrapper.classList.toggle('is-compacted', shouldCompact);
    });
  }

  function formatTokenMeta(value, maxTokens, options = {}) {
    const text = String(value || '').trim();
    const chars = text.length;
    const tokens = countTokens(text);
    const charCount = chars.toLocaleString();
    const tokenCount = tokens.toLocaleString();
    const charText = t(chars === 1 ? '{count} character' : '{count} characters', { count: charCount });
    const tokenText = t(tokens === 1 ? '{count} token' : '{count} tokens', { count: tokenCount });
    const limitText = maxTokens ? t(' / {count} max', { count: maxTokens.toLocaleString() }) : '';
    const upgradeableText = options.upgradeable ? t(' (Upgradeable)') : '';
    return `${charText} - ${tokenText}${limitText}${upgradeableText}`;
  }

  function trimToTokenLimit(text, maxTokens) {
    const raw = String(text || '').trim();
    if (!raw) return '';
    if (!Number.isFinite(maxTokens) || maxTokens <= 0) return '';
    if (countTokens(raw) <= maxTokens) return raw;
    let low = 0;
    let high = raw.length;
    while (low < high) {
      const mid = Math.ceil((low + high) / 2);
      const slice = raw.slice(0, mid);
      if (countTokens(slice) <= maxTokens) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }
    let result = raw.slice(0, low).trimEnd();
    while (result && countTokens(result) > maxTokens) {
      result = result.slice(0, -1).trimEnd();
    }
    return result;
  }

  function maybeShowTokenLimitAlert(field, maxTokens) {
    const now = Date.now();
    const key = field === 'looklike' ? 'looklike' : 'core';
    if (now - tokenAlertTimestamps[key] < TOKEN_ALERT_COOLDOWN_MS) {
      return;
    }
    tokenAlertTimestamps[key] = now;
    const label = key === 'looklike' ? 'Look-Like' : 'Core Prompt';
    const action = getVipCtaLabel();
    const message = `${label} is limited to ${maxTokens.toLocaleString()} tokens on your plan. ${action} for a higher limit.`;
    showVipPurchaseAlert(message, 'Current Limit Reached');
  }

  function coercePromptText(value, maxTokens, options = {}) {
    const raw = typeof value === 'string' ? value : '';
    const trimmed = raw.trim();
    if (!trimmed) return '';
    const tokens = countTokens(trimmed);
    if (!Number.isFinite(maxTokens) || maxTokens <= 0) {
      return trimmed;
    }
    if (tokens <= maxTokens) {
      return trimmed;
    }
    const limited = trimToTokenLimit(trimmed, maxTokens);
    if (options.showAlert) {
      maybeShowTokenLimitAlert(options.field, maxTokens);
    }
    return limited;
  }

  function normalizePromptText(value) {
    const raw = typeof value === 'string' ? value : '';
    const trimmed = raw.trim();
    return trimmed ? trimmed : '';
  }

  function updateSettingTokenCounts() {
    const limits = getMembershipTokenLimits();
    const membershipInfo = getMembershipInfo();
    const useInputs = dom.settingsModal && dom.settingsModal.classList.contains('active');
    if (dom.corePromptMeta) {
      const value = useInputs && dom.corePromptInput
        ? dom.corePromptInput.value
        : state.settings.corePrompt;
      dom.corePromptMeta.textContent = formatTokenMeta(value, limits.core, {
        upgradeable: membershipInfo.tier === 'free' && Boolean(limits.core)
      });
    }
    if (dom.looklikeMeta) {
      const value = useInputs && dom.looklikeInput
        ? dom.looklikeInput.value
        : state.settings.looklike;
      dom.looklikeMeta.textContent = formatTokenMeta(value, limits.looklike);
    }
  }

  function enforcePromptInputLimit(field, options = {}) {
    const limits = getMembershipTokenLimits();
    const rawLimit = field === 'looklike' ? limits.looklike : limits.core;
    const maxTokens = resolvePromptLimit(rawLimit);
    const input = field === 'looklike' ? dom.looklikeInput : dom.corePromptInput;
    if (!input) return '';
    const raw = input.value || '';
    if (!raw) {
      return '';
    }
    if (!maxTokens || maxTokens <= 0) {
      return raw;
    }
    const tokens = countTokens(raw);
    if (Number.isFinite(maxTokens) && maxTokens > 0 && tokens > maxTokens) {
      if (options.showAlert) {
        maybeShowTokenLimitAlert(field, maxTokens);
      }
      if (options.forceTrim) {
        const normalized = trimToTokenLimit(raw, maxTokens);
        if (normalized !== raw) {
          input.value = normalized;
        }
        return normalized;
      }
    }
    return raw;
  }

  function clampSettingsToTokenLimits(options = {}) {
    const limits = getMembershipTokenLimits();
    const coreLimit = resolvePromptLimit(limits.core);
    const lookLimit = resolvePromptLimit(limits.looklike);
    const core = options.forceTrim
      ? coercePromptText(state.settings.corePrompt, coreLimit, options)
      : state.settings.corePrompt;
    const looklike = options.forceTrim
      ? coercePromptText(state.settings.looklike, lookLimit, options)
      : state.settings.looklike;
    const coreChanged = core !== state.settings.corePrompt;
    const looklikeChanged = looklike !== state.settings.looklike;
    if (coreChanged) {
      state.settings.corePrompt = core;
    }
    if (looklikeChanged) {
      state.settings.looklike = looklike;
    }
    if (options.syncInputs) {
      if (dom.corePromptInput) {
        dom.corePromptInput.value = state.settings.corePrompt || '';
      }
      if (dom.looklikeInput) {
        dom.looklikeInput.value = state.settings.looklike || '';
      }
    }
    if (options.updateCounts) {
      updateSettingTokenCounts();
    }
  }

  function normalizeAiName(value) {
    const trimmed = typeof value === 'string' ? value.trim() : '';
    return trimmed ? trimmed.slice(0, 60) : DEFAULT_AI_NAME;
  }

  function normalizeMyName(value) {
    const trimmed = typeof value === 'string' ? value.trim() : '';
    return trimmed ? trimmed.slice(0, 60) : '';
  }

  function normalizePresetValue(value) {
    const trimmed = typeof value === 'string' ? value.trim().toLowerCase() : '';
    return PRESET_VALUES.has(trimmed) ? trimmed : 'custom';
  }

  function normalizeVideoGen2Duration(value) {
    const parsed = Number.parseInt(value, 10);
    if (parsed === 10 || parsed === 15 || parsed === 5) {
      return parsed;
    }
    return 5;
  }

  function getVideoGen2DurationMultiplier(duration) {
    const normalized = normalizeVideoGen2Duration(duration);
    if (normalized === 10) return 2;
    if (normalized === 15) return 3;
    return 1;
  }

  function normalizeThemeValue(value) {
    return value === 'dark' ? 'dark' : 'light';
  }

  function normalizePhotoStyle(value) {
    if (typeof value !== 'string') return DEFAULT_PHOTO_STYLE;
    const trimmed = value.trim().toLowerCase();
    if (trimmed === 'disable photo gen' || trimmed === 'disable photo generation' || trimmed === 'disable photogen' || trimmed === 'disabled' || trimmed === 'off' || trimmed === 'none') {
      return 'Disable Photo Gen';
    }
    if (trimmed === 'anime') return 'Anime';
    if (trimmed === 'hybrid' || trimmed === 'normal' || trimmed === 'pro mode' || trimmed === 'pro') return 'Hybrid';
    if (trimmed === 'realistic') return 'Realistic';
    return DEFAULT_PHOTO_STYLE;
  }

  function isPhotoGenDisabled(style = state.settings.photoStyle) {
    return normalizePhotoStyle(style) === 'Disable Photo Gen';
  }

  function normalizeVoiceValue(value) {
    const trimmed = typeof value === 'string' ? value.trim().toLowerCase() : '';
    return VOICE_VALUES.has(trimmed) ? trimmed : DEFAULT_VOICE;
  }

  function normalizeAiCoreValue(value) {
    const trimmed = typeof value === 'string' ? value.trim().toLowerCase() : '';
    return AI_CORE_VALUES.has(trimmed) ? trimmed : DEFAULT_AI_CORE;
  }

  function normalizeTemperatureValue(value) {
    const parsed = typeof value === 'number' ? value : parseFloat(value);
    if (!Number.isFinite(parsed)) {
      return DEFAULT_AI_TEMPERATURE;
    }
    const clamped = Math.min(1, Math.max(0, parsed));
    return Math.round(clamped * 100) / 100;
  }

  function normalizeGradientColor(value) {
    if (typeof value !== 'string') return '';
    const trimmed = value.trim();
    if (!/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
      return '';
    }
    return trimmed.toLowerCase();
  }

  function normalizeToggleValue(value, fallback = false) {
    const parsed = parseToggleValue(value);
    return parsed === null ? fallback : parsed;
  }

  function parseToggleValue(value) {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value === 1;
    if (typeof value === 'string') {
      const trimmed = value.trim().toLowerCase();
      if (trimmed === '') return null;
      if (trimmed === '1' || trimmed === 'true' || trimmed === 'yes' || trimmed === 'on') {
        return true;
      }
      if (trimmed === '0' || trimmed === 'false' || trimmed === 'no' || trimmed === 'off') {
        return false;
      }
    }
    return null;
  }

  function readCookieValue(name) {
    if (!name || typeof document === 'undefined') return '';
    const raw = typeof document.cookie === 'string' ? document.cookie : '';
    if (!raw) return '';
    const target = `${name}=`;
    const parts = raw.split(';');
    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i].trim();
      if (part.startsWith(target)) {
        try {
          return decodeURIComponent(part.slice(target.length));
        } catch (err) {
          return part.slice(target.length);
        }
      }
    }
    return '';
  }

  function writeCookieValue(name, value) {
    if (!name || typeof document === 'undefined') return;
    const encoded = encodeURIComponent(String(value || ''));
    document.cookie = `${name}=${encoded}; Max-Age=31536000; Path=/; SameSite=Lax`;
  }

  function readSessionValue(name) {
    if (!name) return '';
    try {
      const raw = sessionStorage.getItem(name);
      return raw === null ? '' : String(raw);
    } catch (err) {
      return '';
    }
  }

  function writeSessionValue(name, value) {
    if (!name) return;
    try {
      sessionStorage.setItem(name, String(value || ''));
    } catch (err) {
      // ignore storage errors
    }
  }

  function readWindowValue(name) {
    if (!name || typeof window === 'undefined') return '';
    try {
      const raw = typeof window.name === 'string' ? window.name : '';
      if (!raw) return '';
      const entries = raw.split(';');
      const target = `${name}=`;
      for (let i = 0; i < entries.length; i += 1) {
        const entry = entries[i].trim();
        if (!entry.startsWith(target)) continue;
        const value = entry.slice(target.length);
        try {
          return decodeURIComponent(value);
        } catch (err) {
          return value;
        }
      }
    } catch (err) {
      // ignore access errors
    }
    return '';
  }

  function writeWindowValue(name, value) {
    if (!name || typeof window === 'undefined') return;
    try {
      const raw = typeof window.name === 'string' ? window.name : '';
      const target = `${name}=`;
      const encoded = encodeURIComponent(String(value || ''));
      const nextEntry = `${target}${encoded}`;
      const entries = raw
        ? raw.split(';').map((entry) => entry.trim()).filter(Boolean)
        : [];
      let replaced = false;
      const nextEntries = entries.map((entry) => {
        if (entry.startsWith(target)) {
          replaced = true;
          return nextEntry;
        }
        return entry;
      });
      if (!replaced) {
        nextEntries.push(nextEntry);
      }
      window.name = nextEntries.join(';');
    } catch (err) {
      // ignore access errors
    }
  }

  function getLowPowerStorageKey() {
    return SETTINGS_KEYS.lowPowerMode;
  }

  function getLegacyLowPowerSlotKeys(preferredSlot = state.activeSlot) {
    const keys = [];
    const preferred = normalizeSlotValue(preferredSlot);
    if (preferred > SLOT_MIN) {
      keys.push(getSlotSettingsKey(SETTINGS_KEYS.lowPowerMode, preferred));
    }
    for (let slot = SLOT_MIN + 1; slot <= SLOT_MAX; slot += 1) {
      if (slot === preferred) continue;
      keys.push(getSlotSettingsKey(SETTINGS_KEYS.lowPowerMode, slot));
    }
    return keys.filter(Boolean);
  }

  function readLegacyLowPowerFromSlots(preferredSlot = state.activeSlot) {
    const keys = getLegacyLowPowerSlotKeys(preferredSlot);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      let raw = null;
      try {
        raw = localStorage.getItem(key);
      } catch (err) {
        raw = null;
      }
      const parsed = parseToggleValue(raw);
      if (parsed !== null) {
        return { key, raw, parsed };
      }
    }
    return null;
  }

  function writeDeviceLowPowerStorageKey(key, normalized) {
    if (!key) return;
    try {
      localStorage.setItem(key, normalized);
      const persisted = localStorage.getItem(key);
      if (persisted !== normalized) {
        lowPowerDebug('storage_write_mismatch', { key, normalized, persisted });
        localStorage.removeItem(key);
      } else {
        lowPowerDebug('storage_write_ok', { key, normalized });
      }
    } catch (err) {
      lowPowerDebug('storage_write_error', {
        key,
        normalized,
        error: err && err.message ? err.message : String(err)
      });
      try {
        localStorage.removeItem(key);
      } catch (removeErr) {
        // ignore storage errors
      }
    }
  }

  function readLowPowerStorageSnapshot() {
    const snapshot = {
      localKey: getLowPowerStorageKey(),
      localRaw: null,
      globalKey: GLOBAL_LOW_POWER_MODE_KEY,
      globalRaw: null,
      deviceKey: DEVICE_LOW_POWER_MODE_KEY,
      deviceRaw: null
    };
    try {
      snapshot.localRaw = localStorage.getItem(snapshot.localKey);
      snapshot.globalRaw = localStorage.getItem(snapshot.globalKey);
      snapshot.deviceRaw = localStorage.getItem(snapshot.deviceKey);
    } catch (err) {
      snapshot.error = err && err.message ? err.message : String(err);
    }
    return snapshot;
  }

  function hasStoredDeviceLowPowerMode() {
    let hasStorage = false;
    let localParsed = null;
    let globalParsed = null;
    let deviceParsed = null;
    let legacySlotEntry = null;
    try {
      localParsed = parseToggleValue(localStorage.getItem(getLowPowerStorageKey()));
      globalParsed = parseToggleValue(localStorage.getItem(GLOBAL_LOW_POWER_MODE_KEY));
      deviceParsed = parseToggleValue(localStorage.getItem(DEVICE_LOW_POWER_MODE_KEY));
      legacySlotEntry = readLegacyLowPowerFromSlots();
      hasStorage = localParsed !== null || globalParsed !== null || deviceParsed !== null;
    } catch (err) {
      hasStorage = false;
      legacySlotEntry = null;
    }
    if (hasStorage) {
      lowPowerDebug('has_stored_device_mode', {
        source: 'localStorage',
        localKey: getLowPowerStorageKey(),
        localParsed,
        globalParsed,
        deviceParsed,
        legacySlotKey: legacySlotEntry ? legacySlotEntry.key : '',
        legacySlotParsed: legacySlotEntry ? legacySlotEntry.parsed : null
      });
      return true;
    }
    const cookieRaw = readCookieValue(DEVICE_LOW_POWER_MODE_COOKIE);
    const cookieParsed = parseToggleValue(cookieRaw);
    if (cookieParsed !== null) {
      lowPowerDebug('has_stored_device_mode', {
        source: 'cookie',
        cookieRaw,
        cookieParsed
      });
      return true;
    }
    const sessionRaw = readSessionValue(DEVICE_LOW_POWER_MODE_SESSION_KEY);
    const sessionParsed = parseToggleValue(sessionRaw);
    if (sessionParsed !== null) {
      lowPowerDebug('has_stored_device_mode', {
        source: 'sessionStorage',
        sessionRaw,
        sessionParsed
      });
      return true;
    }
    const windowRaw = readWindowValue(DEVICE_LOW_POWER_MODE_WINDOW_KEY);
    const windowParsed = parseToggleValue(windowRaw);
    if (windowParsed !== null) {
      lowPowerDebug('has_stored_device_mode', {
        source: 'window.name',
        windowRaw,
        windowParsed
      });
      return true;
    }
    lowPowerDebug('has_stored_device_mode', {
      source: 'none',
      legacySlotKey: legacySlotEntry ? legacySlotEntry.key : '',
      legacySlotParsed: legacySlotEntry ? legacySlotEntry.parsed : null,
      windowRaw,
      windowParsed
    });
    return false;
  }

  function readDeviceLowPowerMode() {
    const localKey = getLowPowerStorageKey();
    let localRaw = null;
    try {
      localRaw = localStorage.getItem(localKey);
    } catch (err) {
      localRaw = null;
    }
    const localValue = parseToggleValue(localRaw);
    if (localValue !== null) {
      lowPowerDebug('read_device_mode', {
        source: localKey,
        raw: localRaw,
        parsed: localValue
      });
      return localValue;
    }
    let storageRaw = null;
    let storageSource = 'global';
    try {
      storageRaw = localStorage.getItem(GLOBAL_LOW_POWER_MODE_KEY);
      if (storageRaw === null) {
        storageSource = 'device';
        storageRaw = localStorage.getItem(DEVICE_LOW_POWER_MODE_KEY);
      }
    } catch (err) {
      storageRaw = null;
      storageSource = 'error';
    }
    const storageValue = parseToggleValue(storageRaw);
    if (storageValue !== null) {
      lowPowerDebug('read_device_mode', {
        source: storageSource === 'global' ? GLOBAL_LOW_POWER_MODE_KEY : DEVICE_LOW_POWER_MODE_KEY,
        raw: storageRaw,
        parsed: storageValue
      });
      return storageValue;
    }
    const legacySlotEntry = readLegacyLowPowerFromSlots();
    if (legacySlotEntry) {
      lowPowerDebug('read_device_mode', {
        source: legacySlotEntry.key,
        raw: legacySlotEntry.raw,
        parsed: legacySlotEntry.parsed,
        legacy: true
      });
      return legacySlotEntry.parsed;
    }
    const cookieRaw = readCookieValue(DEVICE_LOW_POWER_MODE_COOKIE);
    const cookieValue = parseToggleValue(cookieRaw);
    if (cookieValue !== null) {
      lowPowerDebug('read_device_mode', {
        source: DEVICE_LOW_POWER_MODE_COOKIE,
        raw: cookieRaw,
        parsed: cookieValue
      });
      return cookieValue;
    }
    const sessionRaw = readSessionValue(DEVICE_LOW_POWER_MODE_SESSION_KEY);
    const sessionValue = parseToggleValue(sessionRaw);
    if (sessionValue !== null) {
      lowPowerDebug('read_device_mode', {
        source: DEVICE_LOW_POWER_MODE_SESSION_KEY,
        raw: sessionRaw,
        parsed: sessionValue
      });
      return sessionValue;
    }
    const windowRaw = readWindowValue(DEVICE_LOW_POWER_MODE_WINDOW_KEY);
    const fallback = normalizeToggleValue(windowRaw, false);
    lowPowerDebug('read_device_mode', {
      source: DEVICE_LOW_POWER_MODE_WINDOW_KEY,
      raw: windowRaw,
      parsed: parseToggleValue(windowRaw),
      fallback
    });
    return fallback;
  }

  function persistDeviceLowPowerMode(value, source = 'unknown') {
    const normalized = value ? '1' : '0';
    const localKey = getLowPowerStorageKey();
    const beforeStorage = readLowPowerStorageSnapshot();
    lowPowerDebug('persist_device_mode_before_localstorage', {
      source,
      value: Boolean(value),
      normalized,
      ...beforeStorage
    });
    lowPowerDebug('persist_device_mode_start', { source, value: Boolean(value), normalized, localKey });
    writeDeviceLowPowerStorageKey(localKey, normalized);
    writeDeviceLowPowerStorageKey(GLOBAL_LOW_POWER_MODE_KEY, normalized);
    writeDeviceLowPowerStorageKey(DEVICE_LOW_POWER_MODE_KEY, normalized);
    try {
      writeCookieValue(DEVICE_LOW_POWER_MODE_COOKIE, normalized);
    } catch (err) {
      // ignore cookie errors
    }
    writeSessionValue(DEVICE_LOW_POWER_MODE_SESSION_KEY, normalized);
    writeWindowValue(DEVICE_LOW_POWER_MODE_WINDOW_KEY, normalized);
    const afterStorage = readLowPowerStorageSnapshot();
    lowPowerDebug('persist_device_mode_after_localstorage', {
      source,
      normalized,
      ...afterStorage
    });
    lowPowerDebug('persist_device_mode_done', { source, normalized, localKey });
  }

  function normalizeMemorySummary(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    const lines = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const seen = new Set();
    const bullets = [];
    lines.forEach((line) => {
      const cleaned = line.replace(/^[-*]\s*/, '').trim();
      if (!cleaned) return;
      const key = cleaned.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      bullets.push(`- ${cleaned}`);
    });
    const limited = bullets.length
      ? bullets.slice(0, MEMORY_SUMMARY_MAX_BULLETS)
      : [raw];
    let result = limited.join('\n');
    if (result.length <= MEMORY_SUMMARY_MAX_CHARS) return result;
    return result.slice(0, MEMORY_SUMMARY_MAX_CHARS).trimEnd();
  }

  function hexToRgb(hex) {
    const normalized = normalizeGradientColor(hex);
    if (!normalized) return null;
    const numeric = parseInt(normalized.slice(1), 16);
    return {
      r: (numeric >> 16) & 255,
      g: (numeric >> 8) & 255,
      b: numeric & 255
    };
  }

  function rgbaFromHex(hex, alpha) {
    const rgb = hexToRgb(hex);
    if (!rgb) return '';
    const safeAlpha = Math.min(1, Math.max(0, alpha));
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${safeAlpha})`;
  }

  function adjustHex(hex, amount) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const factor = 1 + amount;
    const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
    const r = clamp(rgb.r * factor);
    const g = clamp(rgb.g * factor);
    const b = clamp(rgb.b * factor);
    return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
  }

  function getDefaultGradientColors(theme) {
    if (isFevermateHost()) {
      return theme === 'light'
        ? { start: '#cfa953', end: '#3a2a12' }
        : { start: '#d6b25a', end: '#1a1206' };
    }
    return theme === 'dark'
      ? { start: '#ff5ccf', end: '#5c7bff' }
      : { start: '#ff4db8', end: '#4b6bff' };
  }

  function applyGradientTheme(startColor, endColor) {
    const start = normalizeGradientColor(startColor);
    const end = normalizeGradientColor(endColor);
    const props = [
      '--accent',
      '--accent-strong',
      '--accent-pink',
      '--accent-blue',
      '--accent-warm',
      '--accent-gradient',
      '--accent-gradient-strong',
      '--accent-soft',
      '--accent-soft-strong',
      '--accent-soft-border',
      '--topbar-gradient',
      '--bg-glow',
      '--bg-glow-alt',
      '--call-glow'
    ];
    if (!start || !end) {
      props.forEach((prop) => document.body.style.removeProperty(prop));
      return;
    }
    const strongStart = adjustHex(start, -0.12);
    const strongEnd = adjustHex(end, -0.12);
    document.body.style.setProperty('--accent', start);
    document.body.style.setProperty('--accent-strong', end);
    document.body.style.setProperty('--accent-pink', start);
    document.body.style.setProperty('--accent-blue', end);
    document.body.style.setProperty('--accent-warm', adjustHex(start, 0.12));
    document.body.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${start}, ${end})`);
    document.body.style.setProperty('--accent-gradient-strong', `linear-gradient(135deg, ${strongStart}, ${strongEnd})`);
    document.body.style.setProperty('--accent-soft', rgbaFromHex(start, 0.12));
    document.body.style.setProperty('--accent-soft-strong', rgbaFromHex(end, 0.18));
    document.body.style.setProperty('--accent-soft-border', rgbaFromHex(end, 0.25));
    document.body.style.setProperty('--topbar-gradient', `linear-gradient(90deg, ${rgbaFromHex(start, 0.92)}, ${rgbaFromHex(end, 0.92)})`);
    document.body.style.setProperty('--bg-glow', rgbaFromHex(start, 0.35));
    document.body.style.setProperty('--bg-glow-alt', rgbaFromHex(end, 0.35));
    document.body.style.setProperty('--call-glow', rgbaFromHex(start, 0.5));
  }

  function syncGradientInputs() {
    if (!dom.gradientStartInput || !dom.gradientEndInput) return;
    const hasCustom = state.settings.gradientStart && state.settings.gradientEnd;
    const fallback = getDefaultGradientColors(state.settings.theme);
    dom.gradientStartInput.value = hasCustom ? state.settings.gradientStart : fallback.start;
    dom.gradientEndInput.value = hasCustom ? state.settings.gradientEnd : fallback.end;
  }

  function normalizeCharacterId(value) {
    return normalizeSettingText(value, 120);
  }

  function formatTemperature(value) {
    return normalizeTemperatureValue(value).toFixed(2);
  }

  function updateAiTemperatureDisplay(value) {
    if (!dom.aiTemperatureValue) return;
    dom.aiTemperatureValue.textContent = formatTemperature(value);
  }

  function syncAiTemperatureInput(value) {
    if (!dom.aiTemperatureInput) return;
    const normalized = normalizeTemperatureValue(value);
    dom.aiTemperatureInput.value = String(normalized);
    updateAiTemperatureDisplay(normalized);
  }

  function populateAiCoreOptions(force = false) {
    if (!dom.aiCoreSelect) {
      return;
    }
    if (!force && dom.aiCoreSelect.options.length > 0) {
      return;
    }
    const currentValue = normalizeAiCoreValue(state.settings.aiCore || DEFAULT_AI_CORE);
    const membershipInfo = getMembershipInfo();
    dom.aiCoreSelect.innerHTML = '';
    AI_CORE_OPTIONS.forEach((option) => {
      const el = document.createElement('option');
      el.value = option.value;
      const locked = isAiCoreRestricted(option.value, membershipInfo);
      el.disabled = locked;
      const label = t(option.label);
      el.textContent = locked ? t('{label} (GPT4 VIP+)', { label }) : label;
      dom.aiCoreSelect.appendChild(el);
    });
    const valid = dom.aiCoreSelect.querySelector(`option[value="${currentValue}"]`);
    if (valid) {
      dom.aiCoreSelect.value = currentValue;
      if (state.settings.aiCore !== currentValue) {
        state.settings.aiCore = currentValue;
      }
    } else {
      const preferredOption = dom.aiCoreSelect.querySelector(`option[value="${DEFAULT_AI_CORE}"]`);
      const fallback = preferredOption || dom.aiCoreSelect.querySelector('option');
      const fallbackValue = fallback ? fallback.value : DEFAULT_AI_CORE;
      state.settings.aiCore = normalizeAiCoreValue(fallbackValue);
      dom.aiCoreSelect.value = state.settings.aiCore;
    }
  }

  function loadSettings() {
    const hasDeviceLowPowerMode = hasStoredDeviceLowPowerMode();
    let resolvedDeviceLowPowerMode = readDeviceLowPowerMode();
    lowPowerDebug('load_settings_start', {
      hasDeviceLowPowerMode,
      resolvedDeviceLowPowerMode
    });
    if (!hasDeviceLowPowerMode) {
      const legacySlotEntry = readLegacyLowPowerFromSlots();
      const legacySlotLowPowerRaw = legacySlotEntry ? legacySlotEntry.raw : null;
      resolvedDeviceLowPowerMode = normalizeToggleValue(legacySlotLowPowerRaw, resolvedDeviceLowPowerMode);
      const shouldPersistMigration = parseToggleValue(legacySlotLowPowerRaw) !== null;
      lowPowerDebug('load_settings_migrate_legacy_slot_mode', {
        legacySlotLowPowerKey: legacySlotEntry ? legacySlotEntry.key : '',
        legacySlotLowPowerRaw,
        shouldPersistMigration,
        resolvedDeviceLowPowerMode
      });
      if (shouldPersistMigration) {
        persistDeviceLowPowerMode(resolvedDeviceLowPowerMode, 'load_settings_legacy_migration');
      }
    }
    let settingsXid = '';
    try {
      settingsXid = localStorage.getItem(getSlotSettingsXidKey()) || '';
    } catch (err) {
      settingsXid = '';
    }
    const useLocalSettings = !state.cloudSync || (settingsXid !== '' && settingsXid === state.sessionId);
    lowPowerDebug('load_settings_mode_select', {
      settingsXid,
      sessionId: state.sessionId,
      cloudSync: state.cloudSync,
      useLocalSettings
    });
    if (!useLocalSettings) {
      state.settings.corePrompt = '';
      state.settings.looklike = '';
      state.settings.photoStyle = DEFAULT_PHOTO_STYLE;
      state.settings.aiName = DEFAULT_AI_NAME;
      state.settings.myName = '';
      state.settings.personaPreset = 'custom';
      state.settings.looklikePreset = 'custom';
      state.settings.theme = getDefaultTheme();
      state.settings.lowPowerMode = resolvedDeviceLowPowerMode;
      state.settings.voice = DEFAULT_VOICE;
      state.settings.aiCore = DEFAULT_AI_CORE;
      state.settings.aiTemperature = DEFAULT_AI_TEMPERATURE;
      state.settings.gradientStart = '';
      state.settings.gradientEnd = '';
      state.settings.memoryCompaction = true;
      state.settings.memorySummary = '';
      state.characterId = '';
      updateAiNameDisplay();
      applyTheme(state.settings.theme);
      applyGradientTheme(state.settings.gradientStart, state.settings.gradientEnd);
      applyLowPowerMode(state.settings.lowPowerMode);
      lowPowerDebug('load_settings_cloud_bootstrap_applied', {
        lowPowerMode: state.settings.lowPowerMode
      });
      updateSettingTokenCounts();
      return;
    }
    const corePrompt = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.corePrompt)) || '';
    const looklike = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.looklike)) || '';
    const photoStyle = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.photoStyle)) || DEFAULT_PHOTO_STYLE;
    const aiName = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.aiName)) || DEFAULT_AI_NAME;
    const myName = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.myName)) || '';
    const personaPreset = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.personaPreset)) || 'custom';
    const looklikePreset = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.looklikePreset)) || 'custom';
    const storedTheme = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.theme));
    const theme = storedTheme !== null ? storedTheme : getDefaultTheme();
    const lowPowerModeRaw = localStorage.getItem(SETTINGS_KEYS.lowPowerMode);
    const voice = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.voice)) || DEFAULT_VOICE;
    const aiCore = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.aiCore)) || DEFAULT_AI_CORE;
    const aiTemperature = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.aiTemperature)) || DEFAULT_AI_TEMPERATURE;
    const characterId = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.characterId)) || '';
    const gradientStart = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.gradientStart)) || '';
    const gradientEnd = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.gradientEnd)) || '';
    const memoryCompactionRaw = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.memoryCompaction));
    const memorySummary = localStorage.getItem(getSlotSettingsKey(SETTINGS_KEYS.memorySummary)) || '';
    const normalizedCharacterId = normalizeCharacterId(characterId);
    state.settings.corePrompt = normalizePromptText(corePrompt);
    state.settings.looklike = normalizePromptText(looklike);
    state.settings.photoStyle = normalizePhotoStyle(photoStyle);
    state.settings.aiName = normalizeAiName(aiName);
    state.settings.myName = normalizeMyName(myName);
    state.settings.personaPreset = normalizePresetValue(personaPreset);
    state.settings.looklikePreset = normalizePresetValue(looklikePreset);
    state.settings.theme = normalizeThemeValue(theme);
    state.settings.lowPowerMode = resolvedDeviceLowPowerMode;
    state.settings.voice = normalizeVoiceValue(voice);
    state.settings.aiCore = normalizeAiCoreValue(aiCore);
    state.settings.aiTemperature = normalizeTemperatureValue(aiTemperature);
    state.settings.gradientStart = normalizeGradientColor(gradientStart);
    state.settings.gradientEnd = normalizeGradientColor(gradientEnd);
    state.settings.memoryCompaction = normalizeToggleValue(memoryCompactionRaw, true);
    state.settings.memorySummary = normalizeMemorySummary(memorySummary);
    state.characterId = normalizedCharacterId;
    updateAiNameDisplay();
    applyTheme(state.settings.theme);
    applyGradientTheme(state.settings.gradientStart, state.settings.gradientEnd);
    applyLowPowerMode(state.settings.lowPowerMode);
    lowPowerDebug('load_settings_local_applied', {
      lowPowerModeRaw,
      finalLowPowerMode: state.settings.lowPowerMode
    });
    updateSettingTokenCounts();
  }

  function persistSettings() {
    lowPowerDebug('persist_settings_start', {
      lowPowerMode: Boolean(state.settings.lowPowerMode),
      activeSlot: state.activeSlot
    });
    clampSettingsToTokenLimits({ updateCounts: true });
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.corePrompt), state.settings.corePrompt);
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.looklike), state.settings.looklike);
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.photoStyle), state.settings.photoStyle);
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.aiName), state.settings.aiName);
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.myName), state.settings.myName || '');
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.personaPreset), state.settings.personaPreset);
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.looklikePreset), state.settings.looklikePreset);
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.theme), state.settings.theme);
    localStorage.setItem(
      SETTINGS_KEYS.lowPowerMode,
      state.settings.lowPowerMode ? '1' : '0'
    );
    persistDeviceLowPowerMode(state.settings.lowPowerMode, 'persist_settings');
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.voice), state.settings.voice);
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.aiCore), state.settings.aiCore);
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.aiTemperature), String(state.settings.aiTemperature));
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.characterId), state.characterId || '');
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.gradientStart), state.settings.gradientStart || '');
    localStorage.setItem(getSlotSettingsKey(SETTINGS_KEYS.gradientEnd), state.settings.gradientEnd || '');
    const memorySummary = normalizeMemorySummary(state.settings.memorySummary);
    state.settings.memorySummary = memorySummary;
    localStorage.setItem(
      getSlotSettingsKey(SETTINGS_KEYS.memoryCompaction),
      state.settings.memoryCompaction ? '1' : '0'
    );
    localStorage.setItem(
      getSlotSettingsKey(SETTINGS_KEYS.memorySummary),
      memorySummary
    );
    if (state.cloudSync && state.sessionId) {
      localStorage.setItem(getSlotSettingsXidKey(), state.sessionId);
    }
    if (!state.suppressCloudSettingsSync) {
      scheduleCloudSettingsSync();
    }
    lowPowerDebug('persist_settings_done', {
      lowPowerMode: Boolean(state.settings.lowPowerMode),
      activeSlot: state.activeSlot
    });
  }

  function isLocalSettingsEmpty() {
    try {
      if (state.cloudSync) {
        const storedXid = localStorage.getItem(getSlotSettingsXidKey()) || '';
        if (storedXid === '' || storedXid !== state.sessionId) {
          return true;
        }
      }
      const hasSettings = Object.values(SETTINGS_KEYS)
        .some((key) => localStorage.getItem(getSlotSettingsKey(key)) !== null);
      const hasBackground = localStorage.getItem(getSlotStorageKey(STORAGE_KEYS.background)) !== null;
      return !(hasSettings || hasBackground);
    } catch (err) {
      return true;
    }
  }

  function buildSettingsPayload() {
    const slotsUnlocked = normalizeSlotsUnlocked(state.slotMeta.unlocked);
    let slotsUpdatedAt = normalizeTimestamp(state.slotMeta.updatedAt);
    if (slotsUnlocked > SLOT_DEFAULT_UNLOCKED && slotsUpdatedAt === 0) {
      slotsUpdatedAt = normalizeTimestamp(Date.now());
      state.slotMeta.updatedAt = slotsUpdatedAt;
      saveSlotMeta(state.slotMeta);
    }
    const slotNames = normalizeSlotNames(state.slotMeta && state.slotMeta.names);
    let slotNamesUpdatedAt = normalizeTimestamp(
      state.slotMeta && (
        state.slotMeta.namesUpdatedAt
        ?? state.slotMeta.names_updated_at
        ?? state.slotMeta.slot_names_updated_at
        ?? state.slotMeta.slotNamesUpdatedAt
      )
    );
    if (Object.keys(slotNames).length > 0 && slotNamesUpdatedAt === 0) {
      slotNamesUpdatedAt = normalizeTimestamp(Date.now());
      state.slotMeta.namesUpdatedAt = slotNamesUpdatedAt;
      saveSlotMeta(state.slotMeta);
    }
    const memorySummary = normalizeMemorySummary(state.settings.memorySummary);
    const background = normalizeBackgroundUrl(
      readStorageRaw(getSlotStorageKey(STORAGE_KEYS.background)) || ''
    );
    return {
      core_prompt: normalizePromptText(state.settings.corePrompt),
      looklike: normalizePromptText(state.settings.looklike),
      photo_style: normalizePhotoStyle(state.settings.photoStyle),
      ai_name: normalizeAiName(state.settings.aiName),
      my_name: normalizeMyName(state.settings.myName),
      persona_preset: normalizePresetValue(state.settings.personaPreset),
      looklike_preset: normalizePresetValue(state.settings.looklikePreset),
      theme: normalizeThemeValue(state.settings.theme),
      low_power_mode: state.settings.lowPowerMode ? 1 : 0,
      background,
      voice: normalizeVoiceValue(state.settings.voice),
      ai_core: normalizeAiCoreValue(state.settings.aiCore),
      ai_temperature: normalizeTemperatureValue(state.settings.aiTemperature),
      character_id: normalizeCharacterId(state.characterId),
      memory_compaction: state.settings.memoryCompaction ? 1 : 0,
      memory_summary: memorySummary,
      slots_unlocked: slotsUnlocked,
      slots_updated_at: slotsUpdatedAt,
      slot_names: slotNames,
      slot_names_updated_at: slotNamesUpdatedAt
    };
  }

  function applyCloudXp(settings) {
    if (isXpServerEnabled()) return;
    if (!settings || typeof settings !== 'object') return;
    const xpTotalRaw = settings.xp_total ?? settings.xpTotal ?? settings.xp;
    const xpTotalValue = Number.isFinite(Number(xpTotalRaw)) ? clampXpTotal(Number(xpTotalRaw)) : null;
    const xpUpdatedAt = normalizeTimestamp(settings.xp_updated_at ?? settings.xpUpdatedAt);
    const shouldApplyXp = shouldApplyCloudValue(
      xpUpdatedAt,
      state.xp.updatedAt,
      Number.isFinite(xpTotalValue)
    );
    if (shouldApplyXp && xpTotalValue !== null) {
      state.xp.total = xpTotalValue;
      state.xp.updatedAt = xpUpdatedAt || state.xp.updatedAt;
      updateXpUi();
      saveXpData(state.xp.total, state.xp.updatedAt);
    }

    const xpShopRaw = settings.xp_shop ?? settings.xpShop;
    const xpShopNormalized = normalizeXpShopData(xpShopRaw);
    const xpShopUpdatedAt = normalizeTimestamp(
      settings.xp_shop_updated_at ?? settings.xpShopUpdatedAt ?? xpShopNormalized.updatedAt
    );
    const xpShopHasValue = Boolean(
      (xpShopRaw && typeof xpShopRaw === 'object')
      || xpShopUpdatedAt > 0
      || xpShopNormalized.coreBonus > 0
      || xpShopNormalized.looklikeBonus > 0
    );
    const shouldApplyXpShop = shouldApplyCloudValue(
      xpShopUpdatedAt,
      state.xpShop.updatedAt,
      xpShopHasValue
    );
    if (shouldApplyXpShop) {
      state.xpShop = {
        coreBonus: xpShopNormalized.coreBonus,
        looklikeBonus: xpShopNormalized.looklikeBonus,
        updatedAt: xpShopUpdatedAt || xpShopNormalized.updatedAt
      };
      saveXpShop(state.xpShop);
    }
  }

  function applyCloudSlotMeta(settings) {
    if (!settings || typeof settings !== 'object') return;
    let didChange = false;

    const rawUnlocked = settings.slots_unlocked ?? settings.slotsUnlocked;
    const hasUnlocked = rawUnlocked !== undefined && rawUnlocked !== null && rawUnlocked !== '';
    const unlockedValue = hasUnlocked ? normalizeSlotsUnlocked(rawUnlocked) : null;
    const updatedAt = normalizeTimestamp(settings.slots_updated_at ?? settings.slotsUpdatedAt);
    const shouldApplyUnlocked = shouldApplyCloudValue(updatedAt, state.slotMeta.updatedAt, hasUnlocked);
    if (shouldApplyUnlocked && unlockedValue !== null && unlockedValue >= state.slotMeta.unlocked) {
      state.slotMeta = {
        ...state.slotMeta,
        unlocked: unlockedValue,
        updatedAt: updatedAt || state.slotMeta.updatedAt
      };
      didChange = true;
      if (state.activeSlot > state.slotMeta.unlocked) {
        state.activeSlot = state.slotMeta.unlocked;
        saveActiveSlot(state.activeSlot);
      }
    }

    const hasSlotNames = Object.prototype.hasOwnProperty.call(settings, 'slot_names')
      || Object.prototype.hasOwnProperty.call(settings, 'slotNames');
    if (hasSlotNames) {
      const incomingNames = normalizeSlotNames(settings.slot_names ?? settings.slotNames ?? {});
      const namesUpdatedAt = normalizeTimestamp(
        settings.slot_names_updated_at
        ?? settings.slotNamesUpdatedAt
        ?? settings.slots_updated_at
        ?? settings.slotsUpdatedAt
      );
      const localNamesUpdatedAt = normalizeTimestamp(
        state.slotMeta.namesUpdatedAt
        ?? state.slotMeta.names_updated_at
        ?? state.slotMeta.slot_names_updated_at
        ?? state.slotMeta.slotNamesUpdatedAt
      );
      const shouldApplyNames = shouldApplyCloudValue(namesUpdatedAt, localNamesUpdatedAt, true);
      if (shouldApplyNames) {
        state.slotMeta = {
          ...state.slotMeta,
          names: incomingNames,
          namesUpdatedAt: namesUpdatedAt || localNamesUpdatedAt
        };
        didChange = true;
      }
    } else {
      state.slotMeta = {
        ...state.slotMeta,
        names: normalizeSlotNames(state.slotMeta && state.slotMeta.names)
      };
    }

    if (didChange) {
      saveSlotMeta(state.slotMeta);
      refreshSlotModalIfOpen();
    }
  }

  function hasCloudSlotSettings(settings) {
    if (!settings || typeof settings !== 'object') return false;
    const keys = [
      'core_prompt',
      'corePrompt',
      'looklike',
      'lookLike',
      'look_like',
      'photo_style',
      'photoStyle',
      'ai_name',
      'aiName',
      'my_name',
      'myName',
      'persona_preset',
      'personaPreset',
      'looklike_preset',
      'looklikePreset',
      'theme',
      'low_power_mode',
      'lowPowerMode',
      'background',
      'chat_background',
      'chatBackground',
      'character_id',
      'characterId',
      'voice',
      'ai_core',
      'aiCore',
      'ai_temperature',
      'aiTemperature',
      'memory_compaction',
      'memoryCompaction',
      'memory_summary',
      'memorySummary'
    ];
    return keys.some((key) => Object.prototype.hasOwnProperty.call(settings, key));
  }

  function applyCloudSettings(settings) {
    if (!settings || typeof settings !== 'object') return;
    lowPowerDebug('apply_cloud_settings_start', {
      incomingLowPowerSnake: settings.low_power_mode,
      incomingLowPowerCamel: settings.lowPowerMode
    });
    applyCloudXp(settings);
    applyCloudSlotMeta(settings);
    if (!hasCloudSlotSettings(settings)) {
      return;
    }
    const characterId = normalizeCharacterId(settings.character_id);
    const corePrompt = normalizePromptText(settings.core_prompt);
    const looklike = normalizePromptText(settings.looklike);
    const photoStyle = normalizePhotoStyle(settings.photo_style || settings.photoStyle);
    const aiName = normalizeAiName(settings.ai_name);
    const myName = normalizeMyName(settings.my_name ?? settings.myName ?? '');
    const personaPreset = normalizePresetValue(settings.persona_preset);
    const looklikePreset = normalizePresetValue(settings.looklike_preset);
    const theme = normalizeThemeValue(settings.theme);
    const hasCloudLowPowerMode = Object.prototype.hasOwnProperty.call(settings, 'low_power_mode')
      || Object.prototype.hasOwnProperty.call(settings, 'lowPowerMode');
    const cloudLowPowerRaw = hasCloudLowPowerMode
      ? (settings.low_power_mode ?? settings.lowPowerMode)
      : null;
    const hadStoredLowPowerMode = hasStoredDeviceLowPowerMode();
    let lowPowerMode = readDeviceLowPowerMode();
    let cloudLowPowerMode = null;
    let usedCloudLowPowerMode = false;
    if (hasCloudLowPowerMode) {
      cloudLowPowerMode = normalizeToggleValue(cloudLowPowerRaw, lowPowerMode);
      if (!hadStoredLowPowerMode) {
        lowPowerMode = cloudLowPowerMode;
        persistDeviceLowPowerMode(lowPowerMode, 'apply_cloud_settings');
        usedCloudLowPowerMode = true;
      }
    }
    lowPowerDebug('apply_cloud_settings_resolve_low_power', {
      hasCloudLowPowerMode,
      hadStoredLowPowerMode,
      usedCloudLowPowerMode,
      cloudLowPowerRaw,
      cloudLowPowerMode,
      resolvedLowPowerMode: lowPowerMode
    });
    const hasBackground = Object.prototype.hasOwnProperty.call(settings, 'background')
      || Object.prototype.hasOwnProperty.call(settings, 'chat_background')
      || Object.prototype.hasOwnProperty.call(settings, 'chatBackground');
    const backgroundRaw = settings.background ?? settings.chat_background ?? settings.chatBackground;
    const background = hasBackground ? normalizeBackgroundUrl(backgroundRaw || '') : '';
    const voice = normalizeVoiceValue(settings.voice);
    const aiCore = normalizeAiCoreValue(settings.ai_core);
    const aiTemperature = normalizeTemperatureValue(settings.ai_temperature);
    const memoryCompaction = normalizeToggleValue(
      settings.memory_compaction ?? settings.memoryCompaction,
      true
    );
    const memorySummary = normalizeMemorySummary(
      settings.memory_summary ?? settings.memorySummary ?? ''
    );

    state.suppressCloudSettingsSync = true;
    try {
      state.settings.corePrompt = corePrompt;
      state.settings.looklike = looklike;
      state.settings.photoStyle = photoStyle;
      state.settings.aiName = aiName;
      state.settings.myName = myName;
      state.settings.personaPreset = personaPreset;
      state.settings.looklikePreset = looklikePreset;
      state.settings.theme = theme;
      state.settings.lowPowerMode = lowPowerMode;
      state.settings.voice = voice;
      state.settings.aiCore = aiCore;
      state.settings.aiTemperature = aiTemperature;
      state.settings.memoryCompaction = memoryCompaction;
      state.settings.memorySummary = memorySummary;
      state.characterId = characterId;
      lowPowerDebug('apply_cloud_settings_before_apply_mode', {
        lowPowerMode,
        hasBackground
      });
      applyTheme(theme);
      applyGradientTheme(state.settings.gradientStart, state.settings.gradientEnd);
      applyLowPowerMode(lowPowerMode);
      if (hasBackground) {
        applyChatroomBackground(background, { sync: false });
      }
      updateAiNameDisplay();
      if (dom.aiNameInput) {
        dom.aiNameInput.value = aiName;
      }
      if (dom.myNameInput) {
        dom.myNameInput.value = myName;
      }
      if (dom.corePromptInput) {
        dom.corePromptInput.value = corePrompt;
      }
      if (dom.looklikeInput) {
        dom.looklikeInput.value = looklike;
      }
      if (dom.photoStyleSelect) {
        dom.photoStyleSelect.value = photoStyle;
      }
      updatePresetButtons('persona', personaPreset);
      updatePresetButtons('looklike', looklikePreset);
      updateSettingTokenCounts();
      if (dom.themeToggle) {
        dom.themeToggle.checked = theme === 'dark';
      }
      if (dom.lowPowerToggle) {
        dom.lowPowerToggle.checked = lowPowerMode;
      }
      if (dom.voiceSelect) {
        dom.voiceSelect.value = voice;
      }
      if (dom.aiCoreSelect) {
        populateAiCoreOptions(true);
        dom.aiCoreSelect.value = aiCore;
      }
      if (dom.aiTemperatureInput) {
        syncAiTemperatureInput(aiTemperature);
      }
      if (dom.memoryCompactionToggle) {
        dom.memoryCompactionToggle.checked = memoryCompaction;
      }
      syncGradientInputs();
      applyMembershipGates();
      persistSettings();
      lowPowerDebug('apply_cloud_settings_done', {
        lowPowerMode: state.settings.lowPowerMode
      });
    } finally {
      state.suppressCloudSettingsSync = false;
    }

    if (characterId) {
      const index = getCharacterIndexById(characterId);
      if (index >= 0) {
        state.characterIndex = index;
        updateCharacterCarousel(false, 0);
      }
    }

    refreshMessageTokenState();
  }

  async function loadCloudSettings(options = {}) {
    const force = options.force === true;
    const showOverlay = options.showOverlay === true;
    const slot = normalizeSlotValue(options.slot ?? state.activeSlot);
    let loaded = false;
    const finalizeLoad = () => {
      state.cloudSettingsLoaded = true;
      flushPendingXp();
      resolveDeferredCharacterModal();
      if (showOverlay) {
        endCloudSyncOverlay();
      }
    };
    if (!state.cloudSync) {
      lowPowerDebug('load_cloud_settings_skip_no_cloud', { slot });
      state.cloudSettingsLoaded = true;
      resolveDeferredCharacterModal();
      return false;
    }
    const parseSettingsResponse = async (response) => {
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: invalid cloud settings response', {
            status: response.status,
            rawText
          });
        }
        throw err;
      }
      if (!response.ok || !data || !data.ok) {
        throw new Error('Cloud settings failed.');
      }
      return data;
    };

    if (!force && !isLocalSettingsEmpty()) {
      lowPowerDebug('load_cloud_settings_partial_mode', { slot, force });
      if (showOverlay) {
        beginCloudSyncOverlay();
      }
      try {
        const response = await fetch(CONFIG.replyEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            settings_fetch: 1,
            XID: state.sessionId,
            slot,
            debug: DEBUG
          })
        });
        const data = await parseSettingsResponse(response);
        loaded = true;
        if (data && data.settings) {
          applyCloudXp(data.settings);
          applyCloudSlotMeta(data.settings);
          updateSettingTokenCounts();
        }
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: cloud XP sync failed', err);
        }
      } finally {
        finalizeLoad();
      }
      return loaded;
    }

    if (showOverlay) {
      beginCloudSyncOverlay();
    }
    try {
      const response = await fetch(CONFIG.replyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings_fetch: 1,
          XID: state.sessionId,
          slot,
          debug: DEBUG
        })
      });
      const data = await parseSettingsResponse(response);
      loaded = true;
      if (data && data.settings && Object.keys(data.settings).length > 0) {
        lowPowerDebug('load_cloud_settings_post_success', {
          slot,
          incomingLowPowerSnake: data.settings.low_power_mode,
          incomingLowPowerCamel: data.settings.lowPowerMode
        });
        applyCloudSettings(data.settings);
      }
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: cloud settings load failed (POST)', err);
      }
      try {
        const params = new URLSearchParams({
          settings_fetch: '1',
          XID: state.sessionId,
          slot: String(slot),
          debug: DEBUG ? '1' : '0',
          _: String(Date.now())
        });
        const response = await fetch(`${CONFIG.replyEndpoint}?${params.toString()}`, {
          method: 'GET'
        });
        const data = await parseSettingsResponse(response);
        loaded = true;
        if (data && data.settings && Object.keys(data.settings).length > 0) {
          lowPowerDebug('load_cloud_settings_get_success', {
            slot,
            incomingLowPowerSnake: data.settings.low_power_mode,
            incomingLowPowerCamel: data.settings.lowPowerMode
          });
          applyCloudSettings(data.settings);
        }
      } catch (fallbackErr) {
        if (DEBUG) {
          console.warn('Chatroom debug: cloud settings load failed (GET)', fallbackErr);
        }
      }
    } finally {
      finalizeLoad();
    }
    return loaded;
  }

  function scheduleCloudSettingsSync() {
    if (!state.cloudSync || state.suppressCloudSettingsSync || !state.sessionId) return;
    if (cloudSettingsSyncTimer) {
      clearTimeout(cloudSettingsSyncTimer);
    }
    cloudSettingsSyncTimer = setTimeout(() => {
      cloudSettingsSyncTimer = null;
      syncCloudSettings();
    }, CLOUD_SETTINGS_SYNC_DELAY);
  }

  async function syncCloudSettings(options = {}) {
    const ignoreSuppress = options.ignoreSuppress === true;
    const slot = normalizeSlotValue(options.slot ?? state.activeSlot);
    if (!state.cloudSync || !state.sessionId) return false;
    if (!ignoreSuppress && state.suppressCloudSettingsSync) return false;
    const payload = buildSettingsPayload();
    try {
      const response = await fetch(CONFIG.replyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings_update: 1,
          XID: state.sessionId,
          slot,
          settings: payload,
          debug: DEBUG
        })
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: invalid cloud settings update response', {
            status: response.status,
            rawText
          });
        }
        return false;
      }
      if (!response.ok || !data || !data.ok) {
        if (DEBUG) {
          console.warn('Chatroom debug: cloud settings update failed', {
            status: response.status,
            data
          });
        }
        return false;
      }
      return true;
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: cloud settings update error', err);
      }
      return false;
    }
  }

  function applyTheme(theme) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    document.body.dataset.theme = nextTheme;
  }

  function isLowPowerModeEnabled() {
    return Boolean(state.settings && state.settings.lowPowerMode);
  }

  function applyLowPowerMode(enabled, source = 'apply_low_power_mode') {
    const nextMode = Boolean(enabled);
    lowPowerDebug('apply_low_power_mode_start', {
      source,
      requestedEnabled: enabled,
      nextMode
    });
    state.settings.lowPowerMode = nextMode;
    persistDeviceLowPowerMode(nextMode, source);
    const modeValue = nextMode ? 'true' : 'false';
    document.documentElement.dataset.lowPower = modeValue;
    document.documentElement.classList.toggle('low-power-mode', nextMode);
    if (document.body) {
      document.body.dataset.lowPower = modeValue;
      document.body.classList.toggle('low-power-mode', nextMode);
    }
    if (dom.lowPowerToggle) {
      dom.lowPowerToggle.checked = nextMode;
    }
    if (nextMode) {
      lowPowerDebug('apply_low_power_mode_enter');
      stopJoinCommunityMarquee();
      if (joinCommunityMarquee.viewport) {
        joinCommunityMarquee.viewport.scrollLeft = 0;
      }
      stopCommunityMobileVideoFocus();
      stopAllCommunityDetailMedia();
      stopCallVisualizer();
      const videos = Array.from(document.querySelectorAll('video'));
      lowPowerDebug('apply_low_power_mode_pause_videos', { count: videos.length });
      videos.forEach((video) => {
        if (!video) return;
        video.autoplay = false;
        video.loop = false;
        video.removeAttribute('autoplay');
        video.removeAttribute('loop');
        try {
          video.pause();
          video.currentTime = 0;
        } catch (err) {
          // ignore media state errors
        }
      });
    } else {
      lowPowerDebug('apply_low_power_mode_exit');
      refreshJoinCommunityMarquee();
      if (dom.communityModal && dom.communityModal.classList.contains('active')) {
        setupCommunityMobileVideoFocus();
      }
    }
    applyChatVideoPlaybackPolicy();
    if (dom.galleryModal && dom.galleryModal.classList.contains('active')) {
      renderGallery();
    }
    updateCharacterPlayback();
    restoreChatroomBackground();
    lowPowerDebug('apply_low_power_mode_done', {
      source,
      nextMode
    });
  }

  function handleLowPowerToggleRealtime() {
    if (!dom.lowPowerToggle) return;
    const next = Boolean(dom.lowPowerToggle.checked);
    const modeValue = next ? 'true' : 'false';
    lowPowerDebug('toggle_realtime_event', {
      next,
      modeValue
    });
    const alreadyApplied = Boolean(
      state.settings.lowPowerMode === next
      && document.documentElement.dataset.lowPower === modeValue
      && document.body
      && document.body.dataset.lowPower === modeValue
    );
    if (alreadyApplied) {
      lowPowerDebug('toggle_realtime_already_applied', { next });
      return;
    }
    state.settings.lowPowerMode = next;
    applyLowPowerMode(next, 'toggle_realtime');
    persistSettings();
    lowPowerDebug('toggle_realtime_applied', { next });
  }

  function bindLowPowerToggleRealtime() {
    if (!dom.lowPowerToggle) return;
    if (dom.lowPowerToggle.dataset.lowPowerBound === '1') return;
    dom.lowPowerToggle.dataset.lowPowerBound = '1';
    lowPowerDebug('toggle_realtime_bind');
    dom.lowPowerToggle.addEventListener('input', handleLowPowerToggleRealtime);
    dom.lowPowerToggle.addEventListener('change', handleLowPowerToggleRealtime);
  }

  function bindLowPowerPersistenceOnExit() {
    if (state.lowPowerExitBound) return;
    state.lowPowerExitBound = true;
    const persistCurrentLowPowerMode = (source = 'unknown') => {
      const next = dom.lowPowerToggle
        ? Boolean(dom.lowPowerToggle.checked)
        : Boolean(state.settings && state.settings.lowPowerMode);
      persistDeviceLowPowerMode(next, `persist_on_exit:${source}`);
      lowPowerDebug('persist_on_exit', { source, next });
    };
    lowPowerDebug('persist_on_exit_bind');
    window.addEventListener('beforeunload', () => persistCurrentLowPowerMode('beforeunload'));
    window.addEventListener('pagehide', () => persistCurrentLowPowerMode('pagehide'));
    window.addEventListener('storage', (event) => {
      if (!event || !event.key) return;
      if (
        event.key === SETTINGS_KEYS.lowPowerMode
        || event.key === GLOBAL_LOW_POWER_MODE_KEY
        || event.key === DEVICE_LOW_POWER_MODE_KEY
        || (typeof event.key === 'string' && event.key.startsWith(`${SETTINGS_KEYS.lowPowerMode}_slot_`))
      ) {
        lowPowerDebug('storage_event', {
          key: event.key,
          oldValue: event.oldValue,
          newValue: event.newValue
        });
      }
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        persistCurrentLowPowerMode('visibilitychange_hidden');
      }
    });
  }

  function setTheme(theme) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    state.settings.theme = nextTheme;
    applyTheme(nextTheme);
    applyGradientTheme(state.settings.gradientStart, state.settings.gradientEnd);
    if (!state.settings.gradientStart || !state.settings.gradientEnd) {
      syncGradientInputs();
    }
    if (dom.themeToggle) {
      dom.themeToggle.checked = nextTheme === 'dark';
    }
    persistSettings();
  }

  function applyChatroomVideoBackground(url, chatroomOverride = null) {
    const chatroom = chatroomOverride || (dom.chatLog ? dom.chatLog.closest('.chatroom') : null);
    if (!chatroom) return;
    let videoEl = chatroom.querySelector('.chatroom-bg-video');
    if (!url) {
      if (videoEl) {
        videoEl.pause();
        videoEl.remove();
      }
      chatroom.classList.remove('has-bg-video');
      return;
    }
    if (isLowPowerModeEnabled()) {
      if (videoEl) {
        videoEl.pause();
        videoEl.remove();
      }
      chatroom.classList.remove('has-bg-video');
      return;
    }
    if (!videoEl) {
      videoEl = document.createElement('video');
      videoEl.className = 'chatroom-bg-video';
      videoEl.setAttribute('aria-hidden', 'true');
      videoEl.setAttribute('tabindex', '-1');
      videoEl.preload = 'metadata';
      chatroom.prepend(videoEl);
    }
    if (videoEl.src !== url) {
      videoEl.src = url;
    }
    videoEl.loop = true;
    videoEl.autoplay = true;
    videoEl.playsInline = true;
    videoEl.setAttribute('loop', '');
    videoEl.setAttribute('autoplay', '');
    videoEl.setAttribute('playsinline', '');
    enforceMutedInlineVideo(videoEl, true);
    chatroom.classList.add('has-bg-video');
    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => { });
    }
  }

  function applyChatroomBackground(url, options = {}) {
    const chatroom = dom.chatLog ? dom.chatLog.closest('.chatroom') : null;
    if (!chatroom) return;
    const shouldSync = options.sync !== false;
    const resolved = url ? resolveMediaUrl(url) : '';
    const isVideo = resolved ? inferMediaType(resolved) === 'video' : false;
    if (isLowPowerModeEnabled()) {
      applyChatroomVideoBackground('', chatroom);
      chatroom.style.removeProperty('--chatroom-bg-image');
      chatroom.classList.remove('has-bg');
      chatroom.classList.remove('has-bg-video');
    } else if (resolved && isVideo) {
      applyChatroomVideoBackground(resolved, chatroom);
      chatroom.style.removeProperty('--chatroom-bg-image');
      chatroom.classList.remove('has-bg');
    } else {
      applyChatroomVideoBackground('', chatroom);
      if (resolved) {
        chatroom.style.setProperty('--chatroom-bg-image', `url("${resolved}")`);
        chatroom.classList.add('has-bg');
      } else {
        chatroom.style.removeProperty('--chatroom-bg-image');
        chatroom.classList.remove('has-bg');
      }
    }
    try {
      if (url) {
        localStorage.setItem(getSlotStorageKey(STORAGE_KEYS.background), url);
      } else {
        localStorage.removeItem(getSlotStorageKey(STORAGE_KEYS.background));
      }
    } catch (err) {
      // ignore storage errors
    }
    if (shouldSync) {
      scheduleCloudSettingsSync();
    }
  }

  function restoreChatroomBackground() {
    let saved = '';
    try {
      saved = localStorage.getItem(getSlotStorageKey(STORAGE_KEYS.background)) || '';
    } catch (err) {
      saved = '';
    }
    applyChatroomBackground(saved, { sync: false });
  }

  function setStatusLabel(text) {
    if (dom.statusLabel) {
      dom.statusLabel.textContent = t(text);
    }
  }

  function setVoiceLabel(text) {
    if (dom.voiceLabel) {
      dom.voiceLabel.textContent = t(text);
    }
  }

  function updateAiNameDisplay() {
    if (dom.aiName) {
      dom.aiName.textContent = state.settings.aiName || DEFAULT_AI_NAME;
    }
  }

  function updatePresetButtons(group, activePreset) {
    document.querySelectorAll(`.preset-button[data-preset-group="${group}"]`).forEach((button) => {
      button.classList.toggle('active', button.dataset.preset === activePreset);
    });
  }

  function applyPersonaPreset(preset) {
    if (!PRESET_PROMPTS[preset]) return;
    const name = state.settings.aiName || DEFAULT_AI_NAME;
    const template = t(PRESET_PROMPTS[preset], { name });
    dom.corePromptInput.value = template;
    enforcePromptInputLimit('core', { showAlert: true, forceTrim: true });
    updateSettingTokenCounts();
  }

  function applyLooklikePreset(preset) {
    if (!PRESET_LOOKLIKE[preset]) return;
    dom.looklikeInput.value = t(PRESET_LOOKLIKE[preset]);
    enforcePromptInputLimit('looklike', { showAlert: true, forceTrim: true });
    updateSettingTokenCounts();
  }

  function openCharacterModal() {
    if (!dom.characterModal) return;
    dom.characterModal.classList.add('active');
    dom.characterModal.setAttribute('aria-hidden', 'false');
    updateCharacterCarousel(false, 0);
  }

  function closeCharacterModal() {
    if (!dom.characterModal) return;
    dom.characterModal.classList.remove('active');
    dom.characterModal.setAttribute('aria-hidden', 'true');
    if (dom.characterTrack) {
      dom.characterTrack.querySelectorAll('video').forEach((video) => {
        video.pause();
        video.currentTime = 0;
      });
    }
  }

  function getCharacterIndexById(characterId) {
    return CHARACTERS.findIndex((character) => character.id === characterId);
  }

  function updateCharacterDots() {
    if (!dom.characterDots) return;
    dom.characterDots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === state.characterIndex);
    });
  }

  function updateCharacterConfirmLabel() {
    if (!dom.characterConfirm) return;
    const character = CHARACTERS[state.characterIndex];
    if (!character) return;
    dom.characterConfirm.textContent = t('Choose {name}', { name: character.name });
  }

  function ensureCharacterVideoLoaded(video) {
    if (!video || !video.dataset) return;
    if (video.dataset.loaded === '1') return;
    const src = typeof video.dataset.src === 'string' ? video.dataset.src.trim() : '';
    if (!src) return;
    video.dataset.loaded = '1';
    video.preload = 'metadata';
    video.setAttribute('preload', 'metadata');
    video.src = src;
    try {
      video.load();
    } catch (error) { }
  }

  function updateCharacterPlayback() {
    if (!dom.characterTrack) return;
    const isActive = dom.characterModal && dom.characterModal.classList.contains('active');
    dom.characterTrack.querySelectorAll('.character-card video').forEach((video, index) => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      if (isActive && index === state.characterIndex) {
        if (prefersReducedMotion()) {
          video.pause();
          video.currentTime = 0;
          return;
        }
        ensureCharacterVideoLoaded(video);
        video.play().catch(() => { });
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  function updateCharacterCarousel(animate = true, offsetPx = 0) {
    if (!dom.characterTrack) return;
    dom.characterTrack.style.transition = animate ? 'transform 0.35s ease' : 'none';
    const base = `${-state.characterIndex * 100}%`;
    if (offsetPx) {
      dom.characterTrack.style.transform = `translateX(calc(${base} + ${offsetPx}px))`;
    } else {
      dom.characterTrack.style.transform = `translateX(${base})`;
    }
    updateCharacterDots();
    updateCharacterConfirmLabel();
    updateCharacterPlayback();
  }

  function setCharacterIndex(nextIndex) {
    const clamped = Math.max(0, Math.min(CHARACTERS.length - 1, nextIndex));
    state.characterIndex = clamped;
    updateCharacterCarousel(true, 0);
  }

  function applyCharacterSelection(character) {
    if (!character) return;
    state.characterId = character.id;
    state.settings.aiName = character.name;
    state.settings.personaPreset = character.personaPreset;
    state.settings.looklikePreset = character.looklikePreset;
    updateAiNameDisplay();
    if (dom.aiNameInput) {
      dom.aiNameInput.value = state.settings.aiName;
    }
    applyPersonaPreset(character.personaPreset);
    applyLooklikePreset(character.looklikePreset);
    const coreValue = normalizePromptText(dom.corePromptInput.value || '');
    const lookValue = normalizePromptText(dom.looklikeInput.value || '');
    state.settings.corePrompt = coreValue;
    state.settings.looklike = lookValue;
    if (dom.corePromptInput && dom.corePromptInput.value !== coreValue) {
      dom.corePromptInput.value = coreValue;
    }
    if (dom.looklikeInput && dom.looklikeInput.value !== lookValue) {
      dom.looklikeInput.value = lookValue;
    }
    updateSettingTokenCounts();
    updatePresetButtons('persona', state.settings.personaPreset);
    updatePresetButtons('looklike', state.settings.looklikePreset);
    persistSettings();
  }

  function handleCharacterConfirm() {
    const character = CHARACTERS[state.characterIndex];
    if (!character) return;
    applyCharacterSelection(character);
    closeCharacterModal();
  }

  function openCommunityFromCharacter() {
    closeCharacterModal();
    openCommunityModal();
  }

  function openDreamCharacterModal() {
    if (!dom.dreamCharacterModal) return;
    closeCharacterModal();
    resetDreamCharacterModal();
    dom.dreamCharacterModal.classList.add('active');
    dom.dreamCharacterModal.setAttribute('aria-hidden', 'false');
    if (dom.dreamCharacterDropzone) {
      dom.dreamCharacterDropzone.focus();
    }
  }

  function closeDreamCharacterModal(options = {}) {
    if (!dom.dreamCharacterModal) return;
    if (state.dreamCharacter.locked && !options.force) {
      return;
    }
    dom.dreamCharacterModal.classList.remove('active');
    dom.dreamCharacterModal.setAttribute('aria-hidden', 'true');
    resetDreamCharacterModal();
  }

  function setDreamCharacterLock(locked) {
    state.dreamCharacter.locked = locked;
    document.body.classList.toggle('dream-character-locked', locked);
    if (typeof HTMLElement !== 'undefined' && 'inert' in HTMLElement.prototype) {
      document.querySelectorAll('.app, .character-modal, .modal').forEach((el) => {
        if (el && el !== dom.dreamCharacterOverlay) {
          el.inert = locked;
        }
      });
    }
    if (locked && document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  }

  function setCloudSyncOverlay(active) {
    if (!dom.cloudSyncOverlay) return;
    dom.cloudSyncOverlay.classList.toggle('active', active);
    dom.cloudSyncOverlay.setAttribute('aria-hidden', active ? 'false' : 'true');
    document.body.classList.toggle('cloud-sync-loading', active);
    if (active && document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  }

  function beginCloudSyncOverlay() {
    if (!dom.cloudSyncOverlay) return;
    cloudSyncOverlayDepth += 1;
    if (cloudSyncOverlayDepth === 1) {
      setCloudSyncOverlay(true);
    }
  }

  function endCloudSyncOverlay() {
    if (!dom.cloudSyncOverlay) return;
    cloudSyncOverlayDepth = Math.max(0, cloudSyncOverlayDepth - 1);
    if (cloudSyncOverlayDepth === 0) {
      setCloudSyncOverlay(false);
    }
  }

  function setDreamCharacterOverlay(stateName) {
    if (!dom.dreamCharacterOverlay) return;
    const isActive = stateName === 'pending' || stateName === 'success';
    dom.dreamCharacterOverlay.classList.toggle('active', isActive);
    dom.dreamCharacterOverlay.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    if (dom.dreamCharacterPending) {
      dom.dreamCharacterPending.classList.toggle('is-hidden', stateName !== 'pending');
    }
    if (dom.dreamCharacterSuccess) {
      dom.dreamCharacterSuccess.classList.toggle('is-hidden', stateName !== 'success');
    }
    if (stateName === 'success' && dom.dreamCharacterChatNow) {
      dom.dreamCharacterChatNow.focus();
    }
  }

  function setDreamCharacterBusy(isBusy) {
    state.dreamCharacter.busy = isBusy;
    if (dom.dreamCharacterDropzone) {
      dom.dreamCharacterDropzone.disabled = isBusy;
    }
  }

  function setDreamCharacterStatus(message, statusClass = '') {
    if (!dom.dreamCharacterStatus) return;
    dom.dreamCharacterStatus.textContent = message || '';
    dom.dreamCharacterStatus.classList.remove('error', 'success', 'loading');
    if (statusClass) {
      dom.dreamCharacterStatus.classList.add(statusClass);
    }
  }

  function setDreamCharacterPreview(url, isLocal = false) {
    if (state.dreamCharacter.previewUrl) {
      if (window.URL && typeof window.URL.revokeObjectURL === 'function') {
        window.URL.revokeObjectURL(state.dreamCharacter.previewUrl);
      }
      state.dreamCharacter.previewUrl = '';
    }
    if (!dom.dreamCharacterPreview || !dom.dreamCharacterPreviewImage) return;
    if (!url) {
      dom.dreamCharacterPreview.classList.remove('has-image');
      dom.dreamCharacterPreviewImage.removeAttribute('src');
      return;
    }
    if (isLocal) {
      state.dreamCharacter.previewUrl = url;
    }
    dom.dreamCharacterPreviewImage.src = url;
    dom.dreamCharacterPreview.classList.add('has-image');
  }

  function resetDreamCharacterModal() {
    setDreamCharacterOverlay('hidden');
    setDreamCharacterLock(false);
    setDreamCharacterBusy(false);
    setDreamCharacterStatus('');
    setDreamCharacterPreview('');
    if (dom.dreamCharacterInput) {
      dom.dreamCharacterInput.value = '';
    }
    if (dom.dreamCharacterDropzone) {
      dom.dreamCharacterDropzone.classList.remove('is-dragover');
    }
  }

  function handleDreamCharacterInput(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (state.dreamCharacter.locked) return;
    if (dom.dreamCharacterInput) {
      dom.dreamCharacterInput.value = '';
    }
    processDreamCharacterFile(file);
  }

  function handleDreamCharacterDragOver(event) {
    event.preventDefault();
    if (dom.dreamCharacterDropzone) {
      dom.dreamCharacterDropzone.classList.add('is-dragover');
    }
  }

  function handleDreamCharacterDragLeave(event) {
    event.preventDefault();
    if (dom.dreamCharacterDropzone) {
      dom.dreamCharacterDropzone.classList.remove('is-dragover');
    }
  }

  function handleDreamCharacterDrop(event) {
    event.preventDefault();
    if (dom.dreamCharacterDropzone) {
      dom.dreamCharacterDropzone.classList.remove('is-dragover');
    }
    if (state.dreamCharacter.busy || state.dreamCharacter.locked) return;
    const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;
    if (!file) return;
    processDreamCharacterFile(file);
  }

  function getClipboardImageFile(event) {
    const data = event && event.clipboardData ? event.clipboardData : null;
    if (!data) return null;
    const files = data.files || [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      if (isAllowedImageFile(file)) {
        return file;
      }
    }
    const items = data.items || [];
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (!item || item.kind !== 'file') {
        continue;
      }
      const file = item.getAsFile();
      if (isAllowedImageFile(file)) {
        return file;
      }
    }
    return null;
  }

  function handleDreamCharacterPaste(event) {
    if (!dom.dreamCharacterModal || !dom.dreamCharacterModal.classList.contains('active')) {
      return;
    }
    if (state.dreamCharacter.busy || state.dreamCharacter.locked) return;
    const file = getClipboardImageFile(event);
    if (!file) return;
    event.preventDefault();
    processDreamCharacterFile(file);
  }

  function handleDreamCharacterChatNow() {
    closeDreamCharacterModal({ force: true });
  }

  async function processDreamCharacterFile(file) {
    if (!file || state.dreamCharacter.busy) return;
    if (!isAllowedImageFile(file)) {
      setDreamCharacterStatus(t('Please upload a JPG, PNG, WEBP, GIF, HEIC, HEIF, or AVIF image.'), 'error');
      return;
    }
    setDreamCharacterBusy(true);
    setDreamCharacterLock(true);
    setDreamCharacterOverlay('pending');
    if (window.URL && typeof window.URL.createObjectURL === 'function') {
      const previewUrl = window.URL.createObjectURL(file);
      setDreamCharacterPreview(previewUrl, true);
    }
    setDreamCharacterStatus(t('Uploading file...'), 'loading');
    try {
      const uploadUrl = await uploadDreamCharacterImage(file);
      const resolvedUrl = resolveMediaUrl(uploadUrl);
      if (!resolvedUrl) {
        throw new Error(t('Upload failed.'));
      }
      setDreamCharacterStatus(t('Analyzing photo with advanced AI...'), 'loading');
      const content = await requestDreamCharacterProfile(resolvedUrl);
      const profile = parseDreamCharacterProfile(content);
      if (!profile) {
        throw new Error(t('Unable to generate dream character.'));
      }
      const applied = applyDreamCharacterProfile(profile, { avatarUrl: resolvedUrl });
      if (!applied) {
        throw new Error(t('Unable to generate dream character.'));
      }
      setDreamCharacterStatus(t('Dream character ready. Settings updated.'), 'success');
      setDreamCharacterOverlay('success');
    } catch (err) {
      const message = err && err.message ? err.message : t('No response received. Try again.');
      setDreamCharacterStatus(message, 'error');
      setDreamCharacterOverlay('hidden');
      setDreamCharacterLock(false);
    } finally {
      setDreamCharacterBusy(false);
    }
  }

  async function uploadDreamCharacterImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(CONFIG.uploadEndpoint, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (!response.ok || !data || !data.ok || !data.url) {
      const errorText = data && data.error ? data.error : t('Upload failed.');
      throw new Error(errorText);
    }
    return data.url;
  }

  async function requestDreamCharacterProfile(imageUrl, cardInfo = null) {
    if (!CONFIG.dreamCharacterEndpoint) {
      const aiName = (state.settings && state.settings.aiName) ? state.settings.aiName : DEFAULT_AI_NAME;
      throw new Error(t('Unable to reach the assistant.', { name: aiName }));
    }
    const payload = { image_url: imageUrl };
    if (cardInfo) {
      payload.card_info = cardInfo;
    }
    const response = await fetch(CONFIG.dreamCharacterEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const rawText = await response.text();
    let data = null;
    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch (err) {
      data = null;
    }
    if (!response.ok || !data || !data.ok) {
      const errorText = data && data.error ? data.error : t('No response received. Try again.');
      throw new Error(errorText);
    }
    const content = typeof data.content === 'string' ? data.content.trim() : '';
    if (!content) {
      throw new Error(t('No response received. Try again.'));
    }
    return content;
  }

  function ensureNameInCorePrompt(name, corePrompt) {
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedPrompt = typeof corePrompt === 'string' ? corePrompt.trim() : '';
    if (!trimmedName || !trimmedPrompt) return trimmedPrompt;
    const escaped = trimmedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const hasName = new RegExp(`\\b${escaped}\\b`, 'i').test(trimmedPrompt);
    const lead = `You are ${trimmedName}`;
    const startsWithName = trimmedPrompt.toLowerCase().startsWith(lead.toLowerCase());
    if (startsWithName) {
      return trimmedPrompt;
    }
    if (hasName) {
      return `${lead}. ${trimmedPrompt}`;
    }
    return `${lead}. ${trimmedPrompt}`;
  }

  function parseDreamCharacterProfile(content) {
    if (!content) return null;
    let cleaned = String(content).trim();
    if (!cleaned) return null;
    cleaned = cleaned.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    const jsonText = start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned;
    let parsed = null;
    try {
      parsed = JSON.parse(jsonText);
    } catch (err) {
      parsed = null;
    }
    if (!parsed || typeof parsed !== 'object') {
      return parseDreamCharacterFallback(cleaned);
    }
    const name = String(parsed.name || parsed.character_name || '').trim();
    const corePromptRaw = String(parsed.core_prompt || parsed.corePrompt || parsed.core || '').trim();
    const corePrompt = ensureNameInCorePrompt(name, corePromptRaw);
    const lookLike = String(parsed.look_like || parsed.lookLike || parsed.looklike || '').trim();
    if (!name || !corePrompt || !lookLike) {
      return parseDreamCharacterFallback(cleaned);
    }
    return { name, corePrompt, lookLike };
  }

  function parseDreamCharacterFallback(text) {
    const nameMatch = text.match(/name\s*[:\-]\s*(.+)/i);
    const coreMatch = text.match(/core\s*prompt\s*[:\-]\s*([\s\S]+?)(?:\n\s*look|$)/i);
    const lookMatch = text.match(/look[- ]?like\s*[:\-]\s*(.+)/i);
    if (!nameMatch || !coreMatch || !lookMatch) {
      return null;
    }
    const name = nameMatch[1].trim();
    const corePrompt = ensureNameInCorePrompt(name, coreMatch[1].trim());
    const lookLike = lookMatch[1].trim();
    return { name, corePrompt, lookLike };
  }

  function applyDreamCharacterProfile(profile, options = {}) {
    const dreamId = `dream:${randomId(6)}`;
    const name = normalizeAiName(profile.name || '');
    const corePrompt = ensureNameInCorePrompt(
      name,
      normalizePromptText(profile.corePrompt || '')
    );
    const lookLike = normalizePromptText(profile.lookLike || '');
    if (!name || !corePrompt || !lookLike) {
      return false;
    }
    state.settings.aiName = name;
    state.settings.corePrompt = corePrompt;
    state.settings.looklike = lookLike;
    state.settings.personaPreset = 'custom';
    state.settings.looklikePreset = 'custom';
    state.characterId = dreamId;
    updateAiNameDisplay();
    if (dom.aiNameInput) {
      dom.aiNameInput.value = name;
    }
    if (dom.corePromptInput) {
      dom.corePromptInput.value = corePrompt;
    }
    if (dom.looklikeInput) {
      dom.looklikeInput.value = lookLike;
    }
    updatePresetButtons('persona', state.settings.personaPreset);
    updatePresetButtons('looklike', state.settings.looklikePreset);
    updateSettingTokenCounts();
    if (options.avatarUrl) {
      updateCompanionAvatar(options.avatarUrl);
      persistCompanionAvatar(options.avatarUrl);
    }
    persistSettings();
    return true;
  }

  function renderCharacterSelection() {
    if (!dom.characterTrack || !dom.characterDots) return;
    dom.characterTrack.innerHTML = '';
    dom.characterDots.innerHTML = '';

    CHARACTERS.forEach((character, index) => {
      const card = document.createElement('div');
      card.className = 'character-card';
      card.dataset.characterId = character.id;

      const video = document.createElement('video');
      video.className = 'character-video';
      video.dataset.src = character.videoUrl;
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none';
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      const name = document.createElement('div');
      name.className = 'character-name';
      name.textContent = character.name;

      const role = document.createElement('div');
      role.className = 'character-role';
      role.textContent = t(character.role);

      const meta = document.createElement('div');
      meta.className = 'character-meta';
      meta.append(name, role);

      card.append(video, meta);
      dom.characterTrack.appendChild(card);

      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', t('Select {name}', { name: character.name }));
      dot.addEventListener('click', () => setCharacterIndex(index));
      dom.characterDots.appendChild(dot);
    });
  }

  function setupCharacterSelection() {
    if (!dom.characterModal || !dom.characterTrack || !dom.characterConfirm) return;
    renderCharacterSelection();
    const forceModal = consumeSessionFlag(FORCE_CHARACTER_MODAL_KEY);
    const storedId = state.characterId;
    const storedIndex = storedId ? getCharacterIndexById(storedId) : -1;
    if (forceModal) {
      state.characterId = '';
      state.characterIndex = 0;
      updateCharacterCarousel(false, 0);
      state.deferCharacterModal = false;
      openCharacterModal();
    } else if (storedIndex >= 0) {
      state.characterIndex = storedIndex;
      updateCharacterCarousel(false, 0);
      state.deferCharacterModal = false;
    } else if (storedId) {
      state.characterIndex = 0;
      updateCharacterCarousel(false, 0);
      state.deferCharacterModal = false;
    } else {
      state.characterId = '';
      state.characterIndex = 0;
      updateCharacterCarousel(false, 0);
      if (state.cloudSync) {
        state.deferCharacterModal = true;
      } else {
        openCharacterModal();
      }
    }

    dom.characterConfirm.addEventListener('click', handleCharacterConfirm);
    if (dom.communityCharacterButton) {
      dom.communityCharacterButton.addEventListener('click', openCommunityFromCharacter);
    }
    if (dom.dreamCharacterButton) {
      dom.dreamCharacterButton.addEventListener('click', openDreamCharacterModal);
    }
    if (dom.characterPrev) {
      dom.characterPrev.addEventListener('click', () => setCharacterIndex(state.characterIndex - 1));
    }
    if (dom.characterNext) {
      dom.characterNext.addEventListener('click', () => setCharacterIndex(state.characterIndex + 1));
    }
    if (dom.characterViewport) {
      dom.characterViewport.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        state.characterSwipe.active = true;
        state.characterSwipe.startX = event.clientX;
        state.characterSwipe.deltaX = 0;
        state.characterSwipe.pointerId = event.pointerId;
        dom.characterViewport.setPointerCapture(event.pointerId);
        updateCharacterCarousel(false, 0);
      });
      dom.characterViewport.addEventListener('pointermove', (event) => {
        if (!state.characterSwipe.active) return;
        state.characterSwipe.deltaX = event.clientX - state.characterSwipe.startX;
        updateCharacterCarousel(false, state.characterSwipe.deltaX);
      });
      const finishSwipe = () => {
        if (!state.characterSwipe.active) return;
        const width = dom.characterViewport.clientWidth || 1;
        const threshold = Math.min(140, width * 0.25);
        const delta = state.characterSwipe.deltaX;
        state.characterSwipe.active = false;
        state.characterSwipe.deltaX = 0;
        if (delta <= -threshold) {
          setCharacterIndex(state.characterIndex + 1);
        } else if (delta >= threshold) {
          setCharacterIndex(state.characterIndex - 1);
        } else {
          updateCharacterCarousel(true, 0);
        }
      };
      dom.characterViewport.addEventListener('pointerup', finishSwipe);
      dom.characterViewport.addEventListener('pointercancel', finishSwipe);
    }
  }

  function getLatestChatVideoMessageId(messages = state.messages) {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const message = messages[i];
      if (!message || !message.mediaUrl) continue;
      const mediaType = message.mediaType || inferMediaType(message.mediaUrl);
      if (mediaType === 'video') {
        return message.id || '';
      }
    }
    return '';
  }

  function applyChatVideoPlaybackPolicy() {
    if (!dom.chatLog) return;
    const latestId = getLatestChatVideoMessageId();
    dom.chatLog.querySelectorAll('.message').forEach((wrapper) => {
      const video = wrapper.querySelector('.media video');
      if (!video) return;
      const isLatest = latestId && wrapper.dataset.messageId === latestId;
      setInlineVideoPlayback(video, { autoplay: isLatest, loop: isLatest });
    });
  }

  function renderMessages() {
    dom.chatLog.innerHTML = '';
    const tokenState = buildConversationTokenState(state.messages);
    state.messages.forEach((msg) => {
      dom.chatLog.appendChild(buildMessageElement(msg, tokenState));
    });
    syncMemorySummaryUI(tokenState);
    scheduleMemoryCompaction(tokenState);
    refreshCompanionAvatar();
    applyChatVideoPlaybackPolicy();
    scrollToBottom();
    updateScrollToBottomButton();
  }

  function refreshMessageTokenState() {
    if (!dom.chatLog) return;
    const tokenState = buildConversationTokenState(state.messages);
    state.messages.forEach((message) => {
      if (!message || !message.id) return;
      const wrapper = dom.chatLog.querySelector(`[data-message-id="${message.id}"]`);
      if (!wrapper) return;
      const isConversation = isConversationMessage(message);
      const tokenData = isConversation && tokenState.tokenById.has(message.id)
        ? {
          tokens: tokenState.tokenById.get(message.id),
          total: tokenState.totalById.get(message.id)
        }
        : null;
      const meta = wrapper.querySelector('.meta');
      if (meta) {
        meta.textContent = formatMessageMeta(message, tokenData);
      }
      wrapper.classList.toggle('is-blurred', isConversation && !tokenState.includedIds.has(message.id));
    });
    syncMemorySummaryUI(tokenState);
    scheduleMemoryCompaction(tokenState);
  }

  function addMessage(message) {
    const normalized = { edited: false, ...message };
    state.messages.push(normalized);
    saveToStorage(STORAGE_KEYS.history, state.messages);
    dom.chatLog.appendChild(buildMessageElement(normalized));
    updateAvatarFromMessage(normalized);
    handleXpForMessage(normalized);
    if (normalized.role === 'user' && normalized.meta !== 'System') {
      triggerJoinCommunityFlip();
    }
    refreshMessageTokenState();
    applyChatVideoPlaybackPolicy();
    scrollToBottom();
    updateScrollToBottomButton();
  }

  function findLastAssistantImageUrl() {
    for (let i = state.messages.length - 1; i >= 0; i -= 1) {
      const message = state.messages[i];
      if (!message || message.role !== 'assistant' || message.meta === 'System') continue;
      if (!message.mediaUrl) continue;
      const mediaType = message.mediaType || inferMediaType(message.mediaUrl);
      if (mediaType === 'image') {
        return message.mediaUrl;
      }
    }
    return '';
  }

  function persistCompanionAvatar(url) {
    if (!url) return;
    try {
      localStorage.setItem(getSlotAvatarKey(), resolveMediaUrl(url));
    } catch (err) {
      // ignore storage errors
    }
  }

  function restoreCompanionAvatar() {
    if (findLastAssistantImageUrl()) {
      return;
    }
    try {
      const stored = localStorage.getItem(getSlotAvatarKey()) || '';
      if (stored) {
        updateCompanionAvatar(stored);
      }
    } catch (err) {
      // ignore storage errors
    }
  }

  function updateCompanionAvatar(url) {
    if (!url) return;
    const resolved = resolveMediaUrl(url);
    const avatarImg = document.querySelector('.avatar img');
    if (avatarImg && avatarImg.src !== resolved) {
      avatarImg.src = resolved;
    }
    if (dom.callAvatarImage && dom.callAvatarImage.src !== resolved) {
      dom.callAvatarImage.src = resolved;
    }
  }

  function updateAvatarFromMessage(message) {
    if (!message || message.role !== 'assistant' || message.meta === 'System') return;
    if (!message.mediaUrl) return;
    const mediaType = message.mediaType || inferMediaType(message.mediaUrl);
    if (mediaType !== 'image') return;
    updateCompanionAvatar(message.mediaUrl);
  }

  function refreshCompanionAvatar() {
    for (let i = state.messages.length - 1; i >= 0; i -= 1) {
      const message = state.messages[i];
      if (!message || message.role !== 'assistant' || message.meta === 'System') continue;
      if (!message.mediaUrl) continue;
      const mediaType = message.mediaType || inferMediaType(message.mediaUrl);
      if (mediaType !== 'image') continue;
      updateCompanionAvatar(message.mediaUrl);
      break;
    }
  }

  function addSystemMessage(text) {
    const id = randomId(10);
    addMessage({
      id,
      role: 'assistant',
      text,
      mediaUrl: '',
      mediaType: '',
      timestamp: new Date().toISOString(),
      meta: 'System'
    });
    return id;
  }

  function canModifyMessage(message) {
    return Boolean(message && message.id && message.meta !== 'System' && message.id !== 'typing');
  }

  function findMessageIndex(messageId) {
    return state.messages.findIndex((msg) => msg.id === messageId);
  }

  function getMessageCloudId(message) {
    if (!message) return null;
    if (Number.isFinite(message.cloudId)) return message.cloudId;
    const parsed = parseCloudIdFromMessageId(message.id);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function updateMessageCloudId(messageId, cloudId) {
    if (!Number.isFinite(cloudId)) return;
    const index = findMessageIndex(messageId);
    if (index === -1) return;
    const message = state.messages[index];
    if (message.cloudId) return;
    const nextMessage = {
      ...message,
      cloudId
    };
    state.messages[index] = nextMessage;
    if (nextMessage.voiceUrl) {
      persistVoiceCacheEntry(nextMessage, nextMessage.voiceUrl, nextMessage.voiceTrimmed);
      void syncVoiceToCloud(nextMessage, nextMessage.voiceUrl, nextMessage.voiceTrimmed);
    }
    saveToStorage(STORAGE_KEYS.history, state.messages);
  }

  function setMessageCloudId(messageId, cloudId) {
    if (!Number.isFinite(cloudId)) return;
    const index = findMessageIndex(messageId);
    if (index === -1) return;
    const message = state.messages[index];
    if (message.cloudId === cloudId) return;
    state.messages[index] = {
      ...message,
      cloudId
    };
    saveToStorage(STORAGE_KEYS.history, state.messages);
  }

  function applyCloudHistoryIds(ids) {
    if (!Array.isArray(ids) || ids.length === 0) return;
    let cursor = 0;
    let updated = false;
    const nextMessages = state.messages.map((msg) => {
      if (!isConversationMessage(msg)) return msg;
      const text = (msg.text || '').trim();
      const mediaUrl = msg.mediaUrl || '';
      if (!text && !mediaUrl) return msg;
      if (cursor >= ids.length) return msg;
      const nextId = ids[cursor];
      cursor += 1;
      const cloudId = Number(nextId);
      if (!Number.isFinite(cloudId) || msg.cloudId === cloudId) return msg;
      updated = true;
      return {
        ...msg,
        cloudId
      };
    });
    if (updated) {
      state.messages = nextMessages;
      saveToStorage(STORAGE_KEYS.history, state.messages);
    }
  }

  async function deleteCloudMessage(message) {
    const cloudId = getMessageCloudId(message);
    if (!state.cloudSync || !message || !Number.isFinite(cloudId)) {
      return { ok: false, error: '' };
    }
    try {
      const matchMediaUrl = message.mediaUrl || '';
      const matchMediaType = message.mediaType || inferMediaType(matchMediaUrl);
      const response = await fetch(CONFIG.replyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          delete_message: 1,
          XID: state.sessionId,
          slot: state.activeSlot,
          message_id: cloudId,
          match_text: (message.text || '').trim(),
          match_role: message.role || '',
          match_timestamp: message.timestamp || '',
          match_media_url: matchMediaUrl,
          match_media_type: matchMediaType,
          debug: DEBUG
        })
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: invalid cloud delete response', {
            status: response.status,
            rawText
          });
        }
        return { ok: false, error: '' };
      }
      if (!response.ok || !data || !data.ok) {
        return { ok: false, error: data && data.error ? data.error : '' };
      }
      const deleted = data && Object.prototype.hasOwnProperty.call(data, 'deleted')
        ? Number(data.deleted)
        : null;
      if (deleted !== null && !(deleted > 0)) {
        return { ok: false, error: data && data.error ? data.error : '' };
      }
      return { ok: true };
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: cloud delete failed', err);
      }
      return { ok: false, error: '' };
    }
  }

  async function syncMessageEditToCloud(messageId, options = {}) {
    if (!state.cloudSync) return true;
    const preferLocalHistory = shouldPreferLocalHistory();
    const index = findMessageIndex(messageId);
    if (index === -1) return false;
    const message = state.messages[index];
    const cloudId = getMessageCloudId(message);
    if (!Number.isFinite(cloudId)) {
      if (!preferLocalHistory) {
        addSystemMessage(t('Cloud edit pending. Try again shortly.'));
      }
      return false;
    }
    try {
      const matchText = typeof options.originalText === 'string'
        ? options.originalText
        : (message.text || '');
      const matchMediaUrl = message.mediaUrl || '';
      const matchMediaType = message.mediaType || inferMediaType(matchMediaUrl);
      const response = await fetch(CONFIG.replyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          edit_message: 1,
          XID: state.sessionId,
          slot: state.activeSlot,
          message_id: cloudId,
          text: message.text || '',
          match_text: matchText,
          match_role: message.role || '',
          match_timestamp: message.timestamp || '',
          match_media_url: matchMediaUrl,
          match_media_type: matchMediaType,
          truncate_after: options.truncateAfter ? 1 : 0,
          debug: DEBUG
        })
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: invalid cloud edit response', {
            status: response.status,
            rawText
          });
        }
        if (!preferLocalHistory) {
          addSystemMessage(t('Cloud edit failed. Try again.'));
        }
        return false;
      }
      const fallbackError = t('Cloud edit failed. Try again.');
      if (!response.ok || !data || !data.ok) {
        if (!preferLocalHistory) {
          addSystemMessage(data && data.error ? data.error : fallbackError);
        }
        return false;
      }
      if (Object.prototype.hasOwnProperty.call(data, 'updated') && !data.updated) {
        if (!preferLocalHistory) {
          addSystemMessage(data && data.error ? data.error : fallbackError);
        }
        return false;
      }
      if (Number.isFinite(Number(data && data.message_id))) {
        setMessageCloudId(messageId, Number(data.message_id));
      }
      return true;
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: cloud edit failed', err);
      }
      if (!preferLocalHistory) {
        addSystemMessage(t('Cloud edit failed. Try again.'));
      }
      return false;
    }
  }

  function updateMessageText(messageId, nextText) {
    const index = findMessageIndex(messageId);
    if (index === -1) return;
    const message = state.messages[index];
    state.messages[index] = {
      ...message,
      text: nextText,
      edited: true
    };
    saveToStorage(STORAGE_KEYS.history, state.messages);
    refreshMessageTokenState();
  }

  function replaceMessageContent(messageId, updates = {}) {
    const index = findMessageIndex(messageId);
    if (index === -1) return false;
    const message = state.messages[index];
    const nextMessage = {
      ...message,
      ...updates
    };
    if (updates.mediaUrl !== undefined && updates.mediaType === undefined) {
      nextMessage.mediaType = updates.mediaUrl ? inferMediaType(updates.mediaUrl) : '';
    }
    state.messages[index] = nextMessage;
    saveToStorage(STORAGE_KEYS.history, state.messages);
    const wrapper = dom.chatLog.querySelector(`[data-message-id="${messageId}"]`);
    if (!wrapper) {
      renderMessages();
      return true;
    }
    const tokenState = buildConversationTokenState(state.messages);
    const nextWrapper = buildMessageElement(nextMessage, tokenState);
    wrapper.replaceWith(nextWrapper);
    updateAvatarFromMessage(nextMessage);
    refreshMessageTokenState();
    applyChatVideoPlaybackPolicy();
    return true;
  }

  function buildVoiceTrimNote() {
    const note = document.createElement('div');
    note.className = 'voice-trimmed-note';
    note.textContent = t(VOICE_TRIM_NOTE);
    return note;
  }

  function syncVoiceTrimNote(wrapper, trimmed) {
    if (!wrapper) return;
    const existing = wrapper.querySelector('.voice-trimmed-note');
    if (existing) {
      existing.remove();
    }
    if (!trimmed) return;
    const meta = wrapper.querySelector('.meta');
    const note = buildVoiceTrimNote();
    if (meta) {
      wrapper.insertBefore(note, meta);
    } else {
      wrapper.appendChild(note);
    }
  }

  async function syncVoiceToCloud(message, voiceUrl, trimmed) {
    if (!state.cloudSync || !state.sessionId || !voiceUrl) return;
    const cloudId = Number.isFinite(message.cloudId)
      ? message.cloudId
      : parseCloudIdFromMessageId(message.id);
    if (!Number.isFinite(cloudId)) return;
    try {
      const response = await fetch(CONFIG.replyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voice_update: 1,
          XID: state.sessionId,
          slot: state.activeSlot,
          message_id: cloudId,
          voice_url: voiceUrl,
          voice_trimmed: trimmed ? 1 : 0,
          debug: DEBUG
        })
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: invalid voice cloud response', {
            status: response.status,
            rawText
          });
        }
        return;
      }
      if (DEBUG && (!response.ok || !data || !data.ok)) {
        console.warn('Chatroom debug: voice cloud sync failed', {
          status: response.status,
          data
        });
      }
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: voice cloud sync failed', err);
      }
    }
  }

  function removeVoiceActionButton(wrapper) {
    if (!wrapper) return;
    const button = wrapper.querySelector('.action-button[data-action="voice"]');
    if (!button) return;
    const actions = button.closest('.actions');
    button.remove();
    if (actions && actions.children.length === 0) {
      actions.remove();
    }
  }

  function updateMessageVoice(messageId, voiceUrl, options = {}) {
    const index = findMessageIndex(messageId);
    if (index === -1) return;
    const trimmed = Boolean(options.trimmed);
    const resolved = resolveMediaUrl(voiceUrl);
    const message = state.messages[index];
    const nextMessage = {
      ...message,
      voiceUrl: resolved,
      voiceTrimmed: trimmed
    };
    state.messages[index] = nextMessage;
    persistVoiceCacheEntry(nextMessage, resolved, trimmed);
    saveToStorage(STORAGE_KEYS.history, state.messages);
    const wrapper = dom.chatLog.querySelector(`[data-message-id="${messageId}"]`);
    if (!wrapper) return;
    const existing = wrapper.querySelector('.media.voice-media');
    if (existing) {
      existing.remove();
    }
    const meta = wrapper.querySelector('.meta');
    const media = buildMediaElement(resolved, 'audio', 'voice-media');
    if (meta) {
      wrapper.insertBefore(media, meta);
    } else {
      wrapper.appendChild(media);
    }
    syncVoiceTrimNote(wrapper, trimmed);
    removeVoiceActionButton(wrapper);
    void syncVoiceToCloud(nextMessage, resolved, trimmed);
  }

  async function generateVoiceForMessage(messageId, button) {
    if (!messageId) return;
    const index = findMessageIndex(messageId);
    if (index === -1) return;
    const message = state.messages[index];
    if (message.voiceUrl) return;
    const text = (message.text || '').trim();
    if (!text) return;
    const originalLabel = button ? button.textContent : '';
    if (button) {
      button.disabled = true;
      button.textContent = t('Generating...');
    }
    const shouldStickToBottom = isChatNearBottom();
    try {
      const payload = {
        text,
        voice: normalizeVoiceValue(state.settings.voice || DEFAULT_VOICE)
      };
      if (state.cloudSync && state.sessionId && !isFevermateHost()) {
        payload.XID = state.sessionId;
      }
      const membership = getMembership();
      if (membership) {
        payload.membership = membership;
      }
      const response = await fetch(CONFIG.voiceEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: invalid voice response', {
            status: response.status,
            rawText
          });
        }
        throw err;
      }
      if (data && data.membership) {
        applyMembershipUpdate(data.membership);
      }
      if (!response.ok || !data || !data.ok) {
        const errorText = data && data.error ? data.error : t('Voice generation failed.');
        addSystemMessage(errorText);
        return;
      }
      const mediaUrl = data.media_url || data.url || '';
      if (!mediaUrl) {
        addSystemMessage(t('Voice generation failed.'));
        return;
      }
      updateMessageVoice(messageId, mediaUrl, { trimmed: Boolean(data.trimmed) });
      if (shouldStickToBottom) {
        scrollToBottom();
      }
    } catch (err) {
      if (DEBUG) {
        console.error('Chatroom debug: voice request failed', err);
      }
      addSystemMessage(t('Voice generation failed. Try again.'));
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalLabel || t('Gen Voice');
      }
    }
  }

  async function rerunFromEditedMessage(messageId, options = {}) {
    const index = findMessageIndex(messageId);
    if (index === -1) return;
    let message = state.messages[index];
    if (!message || message.role !== 'user') return;

    const preferLocalHistory = shouldPreferLocalHistory();
    let synced = true;
    if (state.cloudSync) {
      synced = await syncMessageEditToCloud(messageId, {
        truncateAfter: true,
        originalText: options.originalText
      });
      if (!synced && !preferLocalHistory) {
        return;
      }
    }

    message = state.messages[index];
    if (state.messages.length > index + 1) {
      state.messages.splice(index + 1);
    }
    saveToStorage(STORAGE_KEYS.history, state.messages);
    renderMessages();

    const text = (message.text || '').trim();
    const mediaUrl = message.mediaUrl || '';
    const mediaType = message.mediaType || inferMediaType(mediaUrl);
    const canSendMedia = mediaUrl !== '' && mediaType !== 'audio';
    if (text === '' && !canSendMedia) {
      return;
    }
    const reuseCloudId = state.cloudSync && synced ? getMessageCloudId(message) : null;
    queueAssistantRequest({
      text,
      mediaUrl: canSendMedia ? mediaUrl : '',
      mediaType: canSendMedia ? mediaType : '',
      originMessageId: messageId,
      reuseCloudId
    });
  }

  function applyTranscriptToMessage(messageId, transcript) {
    const cleaned = (transcript || '').trim();
    if (!cleaned) return;
    const index = findMessageIndex(messageId);
    if (index === -1) return;
    const message = state.messages[index];
    if (message.text === cleaned) return;
    state.messages[index] = {
      ...message,
      text: cleaned
    };
    saveToStorage(STORAGE_KEYS.history, state.messages);
    const wrapper = dom.chatLog.querySelector(`[data-message-id="${messageId}"]`);
    if (!wrapper || wrapper.classList.contains('editing')) {
      refreshMessageTokenState();
      return;
    }
    const bubble = wrapper.querySelector('.bubble');
    if (!bubble) {
      refreshMessageTokenState();
      return;
    }
    setTextWithLineBreaks(bubble, cleaned);
    refreshMessageTokenState();
  }

  function getCopyPayload(message) {
    if (!message) return '';
    const text = (message.text || '').trim();
    if (text) return text;
    if (message.mediaUrl) return message.mediaUrl;
    return '';
  }

  function fallbackCopyText(text) {
    return new Promise((resolve) => {
      if (!text) {
        resolve(false);
        return;
      }
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-1000px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      let ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (err) {
        ok = false;
      }
      document.body.removeChild(textarea);
      resolve(ok);
    });
  }

  function copyTextToClipboard(text) {
    if (!text) return Promise.resolve(false);
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(() => true).catch(() => fallbackCopyText(text));
    }
    return fallbackCopyText(text);
  }

  function flashCopyButton(button, ok) {
    if (!button) return;
    const original = button.dataset.label || button.textContent || t('Copy');
    button.dataset.label = original;
    button.textContent = ok ? t('Copied') : t('Copy failed');
    if (button._copyTimer) {
      clearTimeout(button._copyTimer);
    }
    button._copyTimer = setTimeout(() => {
      button.textContent = button.dataset.label || t('Copy');
    }, 1400);
  }

  async function deleteMessage(messageId) {
    const index = findMessageIndex(messageId);
    if (index === -1) return;
    const message = state.messages[index];
    if (!canModifyMessage(message)) return;
    const confirmed = await confirmDialog({
      title: t('Delete this message?'),
      confirmText: t('Delete'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return;
    const preferLocalHistory = shouldPreferLocalHistory();
    const cloudId = getMessageCloudId(message);
    if (state.cloudSync && !Number.isFinite(cloudId) && !preferLocalHistory) {
      addSystemMessage(t('Cloud delete pending. Try again shortly.'));
      return;
    }
    if (state.cloudSync && Number.isFinite(cloudId)) {
      const result = await deleteCloudMessage(message);
      if (!result.ok && !preferLocalHistory) {
        addSystemMessage(result.error || t('Cloud delete failed. Try again.'));
        return;
      }
    }
    state.messages.splice(index, 1);
    saveToStorage(STORAGE_KEYS.history, state.messages);
    renderMessages();
  }

  function exitEditMode(wrapper, bubble, text) {
    wrapper.classList.remove('editing');
    setTextWithLineBreaks(bubble, text || '');
  }

  function enterEditMode(messageId) {
    const message = state.messages.find((msg) => msg.id === messageId);
    if (!message || !canModifyMessage(message)) return;
    const wrapper = dom.chatLog.querySelector(`[data-message-id="${messageId}"]`);
    if (!wrapper || wrapper.classList.contains('editing')) return;

    const bubble = wrapper.querySelector('.bubble');
    if (!bubble) return;

    wrapper.classList.add('editing');
    const originalText = message.text || '';
    const editor = document.createElement('textarea');
    editor.className = 'edit-input';
    editor.value = originalText;
    editor.rows = Math.min(6, Math.max(2, originalText.split('\n').length || 2));

    const controls = document.createElement('div');
    controls.className = 'edit-controls';

    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'solid-button small-button';
    saveButton.textContent = t('Save');

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = 'ghost-button small-button';
    cancelButton.textContent = t('Cancel');

    controls.append(saveButton, cancelButton);

    bubble.innerHTML = '';
    bubble.append(editor, controls);
    editor.focus();

    const cancelEdit = () => {
      exitEditMode(wrapper, bubble, originalText);
    };

    const saveEdit = () => {
      const raw = editor.value || '';
      const trimmed = raw.trim();
      if (trimmed === '' && !message.mediaUrl) {
        const confirmDelete = confirm(t('Empty message. Delete it instead?'));
        if (confirmDelete) {
          deleteMessage(messageId);
        } else {
          editor.focus();
        }
        return;
      }
      const nextText = raw.trimEnd();
      const didChange = nextText !== originalText;
      updateMessageText(messageId, nextText);
      exitEditMode(wrapper, bubble, nextText);
      if (didChange && message.role === 'user') {
        void rerunFromEditedMessage(messageId, { originalText });
      } else if (didChange && state.cloudSync) {
        void syncMessageEditToCloud(messageId, { originalText });
      }
    };

    saveButton.addEventListener('click', saveEdit);
    cancelButton.addEventListener('click', cancelEdit);
    editor.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelEdit();
      }
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        saveEdit();
      }
    });
  }

  function enterMemorySummaryEditMode(wrapper) {
    if (!wrapper || wrapper.classList.contains('editing')) return;
    const bubble = wrapper.querySelector('.bubble');
    if (!bubble) return;

    const originalText = normalizeMemorySummary(state.settings.memorySummary);
    wrapper.classList.add('editing');

    const editor = document.createElement('textarea');
    editor.className = 'edit-input';
    editor.value = originalText;
    editor.rows = Math.min(6, Math.max(2, originalText.split('\n').length || 2));

    const controls = document.createElement('div');
    controls.className = 'edit-controls';

    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'solid-button small-button';
    saveButton.textContent = t('Save');

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = 'ghost-button small-button';
    cancelButton.textContent = t('Cancel');

    controls.append(saveButton, cancelButton);

    bubble.innerHTML = '';
    bubble.append(editor, controls);
    editor.focus();

    const cancelEdit = () => {
      exitEditMode(wrapper, bubble, originalText);
      refreshMessageTokenState();
    };

    const saveEdit = () => {
      const nextText = normalizeMemorySummary(editor.value || '');
      state.settings.memorySummary = nextText;
      persistSettings();
      exitEditMode(wrapper, bubble, nextText);
      refreshMessageTokenState();
    };

    saveButton.addEventListener('click', saveEdit);
    cancelButton.addEventListener('click', cancelEdit);
    editor.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelEdit();
      }
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        saveEdit();
      }
    });
  }

  function normalizeMediaKey(value) {
    if (!value) return '';
    return resolveMediaUrl(value);
  }

  function normalizePhotoUnlocks(list) {
    if (!Array.isArray(list)) return [];
    const unique = [];
    const seen = new Set();
    list.forEach((entry) => {
      const key = normalizeMediaKey(entry);
      if (!key || seen.has(key)) return;
      seen.add(key);
      unique.push(key);
    });
    return unique;
  }

  function loadPhotoUnlocks() {
    const raw = loadFromStorage(STORAGE_KEYS.photoUnlocks, []);
    const normalized = normalizePhotoUnlocks(raw);
    if (normalized.length !== raw.length) {
      savePhotoUnlocks(normalized);
    }
    return normalized;
  }

  function savePhotoUnlocks(unlocks) {
    saveToStorage(STORAGE_KEYS.photoUnlocks, Array.isArray(unlocks) ? unlocks : []);
  }

  function getPaidPhotoUnlocks() {
    return new Set(loadPhotoUnlocks());
  }

  function addPhotoUnlock(mediaUrl) {
    const key = normalizeMediaKey(mediaUrl);
    if (!key) return false;
    const unlocks = loadPhotoUnlocks();
    if (unlocks.includes(key)) return false;
    unlocks.push(key);
    savePhotoUnlocks(unlocks);
    return true;
  }

  function removePhotoUnlock(mediaUrl) {
    const key = normalizeMediaKey(mediaUrl);
    if (!key) return false;
    const unlocks = loadPhotoUnlocks();
    const next = unlocks.filter((entry) => entry !== key);
    if (next.length === unlocks.length) return false;
    savePhotoUnlocks(next);
    return true;
  }

  function getGalleryItemSource(item) {
    if (!item || typeof item !== 'object') return 'assistant';
    if (item.source === 'user' || item.source === 'assistant') return item.source;
    if (item.role === 'user') return 'user';
    const prompt = String(item.prompt || '').toLowerCase();
    if (prompt.includes('user upload') || prompt.includes('voice clip')) {
      return 'user';
    }
    return 'assistant';
  }

  function shouldGatePhotos() {
    if (isFevermateHost()) return false;
    const info = getMembershipInfo();
    return Boolean(info && info.isFree);
  }

  function getUnlockedPhotoUrls() {
    if (!shouldGatePhotos()) return new Set();
    const limit = NON_FEVERMATE_FREE_PHOTO_LIMIT;
    if (!Number.isFinite(limit) || limit <= 0) return new Set();
    const sourceItems = state.gallery.length > 0
      ? state.gallery
      : buildGalleryFromHistory(state.messages);
    const items = sourceItems
      .filter((item) => {
        if (!item) return false;
        const type = item.type || inferMediaType(item.url);
        return type === 'image' && getGalleryItemSource(item) === 'assistant';
      })
      .slice()
      .sort((a, b) => {
        const aTime = Date.parse(a.createdAt || '') || 0;
        const bTime = Date.parse(b.createdAt || '') || 0;
        return aTime - bTime;
      });
    const unlocked = new Set();
    for (const item of items) {
      if (unlocked.size >= limit) break;
      const key = normalizeMediaKey(item.url);
      if (key) {
        unlocked.add(key);
      }
    }
    const paidUnlocks = getPaidPhotoUnlocks();
    paidUnlocks.forEach((key) => {
      unlocked.add(key);
    });
    return unlocked;
  }

  function shouldLockPhotoUrl(mediaUrl, source) {
    if (!shouldGatePhotos()) return false;
    if (source !== 'assistant') return false;
    const limit = NON_FEVERMATE_FREE_PHOTO_LIMIT;
    if (!Number.isFinite(limit) || limit <= 0) return false;
    const unlocked = getUnlockedPhotoUrls();
    if (unlocked.size < limit) return false;
    const key = normalizeMediaKey(mediaUrl);
    if (!key) return false;
    return !unlocked.has(key);
  }

  async function handleLockedPhotoClick(mediaUrl) {
    const key = normalizeMediaKey(mediaUrl);
    if (!key || !shouldGatePhotos()) return false;
    const unlocked = getUnlockedPhotoUrls();
    if (unlocked.has(key)) return true;
    if (!isXpEligible()) {
      await showAlert({
        title: t('Login required'),
        text: t('Connect your XID to spend XP levels.'),
        icon: 'info'
      });
      return false;
    }
    if (!(await ensureXpSyncReady())) {
      await showAlert({
        title: t('Syncing from cloud. Try again in a moment.'),
        text: t('Syncing from cloud. Try again in a moment.'),
        icon: 'info'
      });
      return false;
    }
    const costLevels = XP_PHOTO_UNLOCK_COST_LEVELS;
    if (getXpLevel() < costLevels) {
      await showAlert({
        title: t('Not enough levels'),
        text: t('Need {count} levels to unlock this photo.', { count: costLevels }),
        icon: 'warning'
      });
      return false;
    }
    const confirmed = await confirmDialog({
      title: t('Unlock photo'),
      text: t('Spend {count} levels to unblur this photo. Do consider purchasing VIP for UNLIMITED photo generation and unlock perks like video generation, X Ray, etc!', { count: costLevels }),
      confirmText: t('Spend {count} Levels', { count: costLevels }),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return false;
    const spendResult = await spendXpLevels(costLevels, { reason: 'photo_unlock' });
    if (!spendResult.ok) {
      await showAlert({
        title: t('Not enough XP'),
        text: t('Unable to spend levels right now.'),
        icon: 'error'
      });
      return false;
    }
    addPhotoUnlock(key);
    refreshPhotoLocks();
    return true;
  }

  function applyPhotoLockOverlay(container, locked, options = {}) {
    if (!container) return;
    const mediaUrl = typeof options.mediaUrl === 'string' ? options.mediaUrl : '';
    if (mediaUrl) {
      container.dataset.mediaUrl = mediaUrl;
    }
    container.classList.toggle('is-locked', locked);
    const existing = container.querySelector('.media-lock');
    if (!locked) {
      if (existing) {
        existing.remove();
      }
      return;
    }
    if (existing) return;
    const overlay = document.createElement('div');
    overlay.className = 'media-lock';
    const actions = document.createElement('div');
    actions.className = 'media-lock-actions';
    const vipButton = document.createElement('button');
    vipButton.type = 'button';
    vipButton.className = 'solid-button media-lock-button vip-glow';
    vipButton.textContent = t(getVipCtaLabel());
    vipButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      showVipPurchaseAlert('{cta} to see the full photo.');
    });
    const xpButton = document.createElement('button');
    xpButton.type = 'button';
    xpButton.className = 'ghost-button media-lock-button';
    xpButton.textContent = t('Unlock With XP');
    xpButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      void handleLockedPhotoClick(mediaUrl || container.dataset.mediaUrl || '');
    });
    actions.append(vipButton, xpButton);
    overlay.appendChild(actions);
    container.appendChild(overlay);
  }

  function ensureInlineVideoAutoplayHandler(video) {
    if (!video || video._autoplayHandler) return;
    const handler = () => {
      if (isLowPowerModeEnabled()) return;
      if (video.dataset.autoplay !== '1') return;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => { });
      }
    };
    video._autoplayHandler = handler;
    video.addEventListener('loadedmetadata', handler);
  }

  function setInlineVideoPlayback(video, { autoplay = false, loop = false } = {}) {
    if (!video) return;
    const shouldAutoplay = !isLowPowerModeEnabled() && Boolean(autoplay);
    const shouldLoop = !isLowPowerModeEnabled() && Boolean(loop);
    video.dataset.autoplay = shouldAutoplay ? '1' : '0';
    video.dataset.loop = shouldLoop ? '1' : '0';
    video.autoplay = shouldAutoplay;
    video.loop = shouldLoop;
    if (shouldAutoplay) {
      video.setAttribute('autoplay', '');
    } else {
      video.removeAttribute('autoplay');
    }
    if (shouldLoop) {
      video.setAttribute('loop', '');
    } else {
      video.removeAttribute('loop');
    }
    if (shouldAutoplay) {
      if (video.readyState >= 2) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => { });
        }
      }
    } else {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (err) {
        // ignore seek errors
      }
    }
  }

  function buildMediaElement(url, type, extraClass = '', options = {}) {
    const media = document.createElement('div');
    media.className = extraClass ? `media ${extraClass}` : 'media';
    const resolved = resolveMediaUrl(url);
    if (type === 'audio') {
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = resolved;
      audio.addEventListener('loadedmetadata', () => {
        if (state.initialScroll) {
          scrollToBottom();
          scheduleInitialScrollFinish();
        }
      });
      media.appendChild(audio);
      return media;
    }
    if (type === 'video') {
      const video = document.createElement('video');
      video.controls = false;
      video.playsInline = true;
      video.preload = 'metadata';
      video.src = resolved;
      video.setAttribute('playsinline', '');
      enforceMutedInlineVideo(video, true);
      ensureInlineVideoAutoplayHandler(video);
      setInlineVideoPlayback(video, {
        autoplay: options.autoplay === true,
        loop: options.loop === true
      });
      video.addEventListener('loadedmetadata', () => {
        if (state.initialScroll) {
          scrollToBottom();
          scheduleInitialScrollFinish();
        }
      });
      media.appendChild(video);
      return media;
    }
    media.classList.add('media-image');
    const img = document.createElement('img');
    img.src = resolved;
    img.alt = 'Chat media';
    img.addEventListener('load', () => {
      if (state.initialScroll) {
        scrollToBottom();
        scheduleInitialScrollFinish();
      }
    });
    media.appendChild(img);
    applyPhotoLockOverlay(media, Boolean(options.locked), { mediaUrl: resolved });
    return media;
  }

  function muteOtherVideos(activeVideo) {
    if (!activeVideo) return;
    document.querySelectorAll('video').forEach((video) => {
      if (video === activeVideo) return;
      if (!video.muted) {
        video.muted = true;
      }
    });
  }

  function buildMessageElement(message, tokenState = null) {
    const wrapper = document.createElement('div');
    wrapper.className = `message ${message.role}`;
    if (message.id) {
      wrapper.dataset.messageId = message.id;
    }

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    setTextWithLineBreaks(bubble, message.text || '');

    wrapper.appendChild(bubble);

    const canCopy = message.id !== 'typing' && getCopyPayload(message) !== '';
    const canModify = canModifyMessage(message);
    const canVoice = Boolean(message && message.id && message.id !== 'typing' && message.meta !== 'System'
      && !message.voiceUrl && (message.text || '').trim());
    if (canCopy || canModify || canVoice) {
      const actions = document.createElement('div');
      actions.className = 'actions';

      if (canCopy) {
        const copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.className = 'action-button';
        copyButton.textContent = t('Copy');
        copyButton.addEventListener('click', async () => {
          const payload = getCopyPayload(message);
          const ok = await copyTextToClipboard(payload);
          flashCopyButton(copyButton, ok);
        });
        actions.appendChild(copyButton);
      }

      if (canVoice) {
        const voiceButton = document.createElement('button');
        voiceButton.type = 'button';
        voiceButton.className = 'action-button';
        voiceButton.dataset.action = 'voice';
        voiceButton.textContent = t('Gen Voice');
        voiceButton.addEventListener('click', () => generateVoiceForMessage(message.id, voiceButton));
        actions.appendChild(voiceButton);
      }

      if (canModify) {
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'action-button';
        editButton.textContent = t('Edit');
        editButton.addEventListener('click', () => enterEditMode(message.id));

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'action-button danger';
        deleteButton.textContent = t('Delete');
        deleteButton.addEventListener('click', () => deleteMessage(message.id));

        actions.append(editButton, deleteButton);
      }
      wrapper.appendChild(actions);
    }

    if (message.mediaUrl) {
      const mediaType = message.mediaType || inferMediaType(message.mediaUrl);
      const source = message.role === 'assistant' ? 'assistant' : 'user';
      const locked = mediaType === 'image' && shouldLockPhotoUrl(message.mediaUrl, source);
      wrapper.appendChild(buildMediaElement(message.mediaUrl, mediaType, '', { locked }));
    }

    if (message.voiceUrl) {
      wrapper.appendChild(buildMediaElement(message.voiceUrl, 'audio', 'voice-media'));
      if (message.voiceTrimmed) {
        wrapper.appendChild(buildVoiceTrimNote());
      }
    }

    const meta = document.createElement('div');
    meta.className = 'meta';
    const isConversation = isConversationMessage(message);
    const tokenData = tokenState && isConversation && message.id && tokenState.tokenById.has(message.id)
      ? {
        tokens: tokenState.tokenById.get(message.id),
        total: tokenState.totalById.get(message.id)
      }
      : null;
    const time = new Date(message.timestamp || Date.now());
    const labels = [];
    if (message.meta) labels.push(message.meta);
    if (message.edited) labels.push('edited');
    const label = labels.length ? ` - ${labels.join(' AÃº ')}` : '';
    const tokenMeta = tokenData ? formatMessageTokenMeta(tokenData.tokens, tokenData.total) : '';
    meta.textContent = `${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}${label}${tokenMeta}`;
    wrapper.appendChild(meta);
    if (tokenState && isConversation && message.id) {
      wrapper.classList.toggle('is-blurred', !tokenState.includedIds.has(message.id));
    }

    return wrapper;
  }

  function setTextWithLineBreaks(element, text) {
    element.innerHTML = '';
    const parts = (text || '').split('\n');
    parts.forEach((part, index) => {
      appendFormattedText(element, part);
      if (index < parts.length - 1) {
        element.appendChild(document.createElement('br'));
      }
    });
  }

  function refreshPhotoLocks() {
    const gatePhotos = shouldGatePhotos();
    const unlocked = gatePhotos ? getUnlockedPhotoUrls() : new Set();
    if (dom.chatLog) {
      state.messages.forEach((message) => {
        if (!message || !message.id || !message.mediaUrl) return;
        const mediaType = message.mediaType || inferMediaType(message.mediaUrl);
        if (mediaType !== 'image') return;
        const wrapper = dom.chatLog.querySelector(`[data-message-id="${message.id}"]`);
        if (!wrapper) return;
        const media = wrapper.querySelector('.media');
        if (!media) return;
        const source = message.role === 'assistant' ? 'assistant' : 'user';
        const locked = gatePhotos && source === 'assistant'
          && unlocked.size >= NON_FEVERMATE_FREE_PHOTO_LIMIT
          && !unlocked.has(normalizeMediaKey(message.mediaUrl));
        applyPhotoLockOverlay(media, locked, { mediaUrl: message.mediaUrl });
      });
    }
    renderGallery();
  }

  function appendFormattedText(element, text) {
    let cursor = 0;
    const source = String(text || '');
    while (cursor < source.length) {
      const nextStar = source.indexOf('*', cursor);
      const nextQuote = source.indexOf('"', cursor);
      let nextIndex = -1;
      let marker = '';

      if (nextStar === -1 && nextQuote === -1) {
        element.appendChild(document.createTextNode(source.slice(cursor)));
        break;
      }

      if (nextStar === -1) {
        nextIndex = nextQuote;
        marker = '"';
      } else if (nextQuote === -1) {
        nextIndex = nextStar;
        marker = '*';
      } else if (nextStar < nextQuote) {
        nextIndex = nextStar;
        marker = '*';
      } else {
        nextIndex = nextQuote;
        marker = '"';
      }

      if (nextIndex > cursor) {
        element.appendChild(document.createTextNode(source.slice(cursor, nextIndex)));
      }

      if (marker === '*') {
        const end = source.indexOf('*', nextIndex + 1);
        if (end === -1) {
          element.appendChild(document.createTextNode('*'));
          cursor = nextIndex + 1;
          continue;
        }
        const content = source.slice(nextIndex + 1, end);
        if (content) {
          const strong = document.createElement('strong');
          strong.textContent = content;
          element.appendChild(strong);
        }
        cursor = end + 1;
        continue;
      }

      const end = source.indexOf('"', nextIndex + 1);
      if (end === -1) {
        element.appendChild(document.createTextNode('"'));
        cursor = nextIndex + 1;
        continue;
      }
      const content = source.slice(nextIndex + 1, end);
      if (content) {
        const em = document.createElement('em');
        em.textContent = content;
        element.appendChild(em);
      }
      cursor = end + 1;
    }
  }

  function isChatNearBottom(threshold = 120) {
    if (!dom.chatLog) return false;
    const remaining = dom.chatLog.scrollHeight - (dom.chatLog.scrollTop + dom.chatLog.clientHeight);
    return remaining <= threshold;
  }

  function scrollToBottom() {
    dom.chatLog.scrollTop = dom.chatLog.scrollHeight;
  }

  function updateScrollToBottomButton() {
    if (!dom.scrollToBottomButton || !dom.chatLog) return;
    const canScroll = dom.chatLog.scrollHeight > (dom.chatLog.clientHeight + 24);
    const shouldShow = canScroll && !isChatNearBottom(80);
    dom.scrollToBottomButton.classList.toggle('is-visible', shouldShow);
    dom.scrollToBottomButton.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
  }

  function restoreChatScroll(scrollTop) {
    if (!dom.chatLog) return;
    dom.chatLog.scrollTop = scrollTop;
    requestAnimationFrame(() => {
      dom.chatLog.scrollTop = scrollTop;
      updateScrollToBottomButton();
    });
    setTimeout(() => {
      dom.chatLog.scrollTop = scrollTop;
      updateScrollToBottomButton();
    }, 120);
  }

  function scheduleInitialScrollFinish(delay = 450) {
    if (state.initialScrollTimer) {
      clearTimeout(state.initialScrollTimer);
    }
    state.initialScrollTimer = setTimeout(() => {
      state.initialScroll = false;
      state.initialScrollTimer = null;
    }, delay);
  }

  function ensureInitialScroll() {
    state.initialScroll = true;
    scrollToBottom();
    requestAnimationFrame(scrollToBottom);
    setTimeout(scrollToBottom, 120);
    updateScrollToBottomButton();

    scheduleInitialScrollFinish();
    if (state.initialScrollMaxTimer) {
      clearTimeout(state.initialScrollMaxTimer);
    }
    state.initialScrollMaxTimer = setTimeout(() => {
      state.initialScroll = false;
      state.initialScrollMaxTimer = null;
    }, 4000);

    if (document.readyState === 'complete') {
      scheduleInitialScrollFinish(500);
    } else {
      window.addEventListener('load', () => {
        scrollToBottom();
        scheduleInitialScrollFinish(500);
      }, { once: true });
    }
  }

  function normalizeMembership(value) {
    const raw = String(value || '').trim();
    return raw ? raw : 'FREE';
  }

  function setMembership(value, options = {}) {
    const override = getFevermateMembershipOverride(value);
    const normalized = normalizeMembership(override || value);
    state.membership = normalized;
    if (options.persist !== false) {
      try {
        localStorage.setItem('membership', normalized);
      } catch (err) {
        // ignore storage errors
      }
    }
    if (override) {
      applyVipLabel(normalized);
    }
    applyMembershipGates();
  }

  function readStoredMembership() {
    try {
      return normalizeMembership(localStorage.getItem('membership'));
    } catch (err) {
      return 'FREE';
    }
  }

  function readStoredMembershipRaw() {
    try {
      return localStorage.getItem('membership') || '';
    } catch (err) {
      return '';
    }
  }

  function getMembership() {
    const override = getFevermateMembershipOverride();
    if (override) {
      return override;
    }
    if (state.membership) {
      return normalizeMembership(state.membership);
    }
    return readStoredMembership();
  }

  function getMembershipInfo() {
    const raw = getMembership();
    const upper = raw.toUpperCase();
    const isFree = upper === 'FREE';
    const isAdmin = upper.includes('ADMIN');
    const isUltra500 = upper.includes('500');
    const isUltra = upper.includes('ULTRA') || isUltra500;
    const isGptTier = /GPT\s*[- ]?\s*(4|5)/.test(upper);
    const isVip = upper.includes('VIP');
    const isGpt4Plus = isAdmin || isUltra || isGptTier;
    const tier = isAdmin || isUltra500
      ? 'ultra500'
      : isUltra
        ? 'ultra'
        : isGptTier
          ? 'gpt'
          : isVip
            ? 'vip'
            : 'free';
    return {
      raw,
      upper,
      isFree,
      isAdmin,
      isUltra500,
      isUltra,
      isGptTier,
      isVip,
      isGpt4Plus,
      tier
    };
  }

  function isAiCoreRestricted(value, membershipInfo) {
    if (!RESTRICTED_AI_CORES.has(value)) return false;
    return !membershipInfo.isGpt4Plus;
  }

  function coerceAiCoreForMembership(value) {
    const normalized = normalizeAiCoreValue(value);
    const membershipInfo = getMembershipInfo();
    if (!isAiCoreRestricted(normalized, membershipInfo)) {
      return normalized;
    }
    const fallback = AI_CORE_OPTIONS.find((option) => !isAiCoreRestricted(option.value, membershipInfo));
    return fallback ? fallback.value : DEFAULT_AI_CORE;
  }

  function applyMembershipGates() {
    const membershipInfo = getMembershipInfo();
    const lockAdvanced = membershipInfo.isFree;
    if (dom.advancedSettings) {
      dom.advancedSettings.classList.toggle('is-locked', lockAdvanced);
      if (lockAdvanced) {
        dom.advancedSettings.open = false;
      }
    }
    const advancedInputs = [
      dom.aiCoreSelect,
      dom.aiTemperatureInput,
      dom.memoryCompactionToggle,
      dom.gradientStartInput,
      dom.gradientEndInput,
      dom.gradientResetButton
    ];
    advancedInputs.forEach((input) => {
      if (input) {
        input.disabled = lockAdvanced;
      }
    });
    populateAiCoreOptions(true);
    const normalizedCore = normalizeAiCoreValue(state.settings.aiCore || DEFAULT_AI_CORE);
    if (normalizedCore !== state.settings.aiCore) {
      state.settings.aiCore = normalizedCore;
      if (dom.aiCoreSelect) {
        dom.aiCoreSelect.value = normalizedCore;
      }
    }
    clampSettingsToTokenLimits({ syncInputs: true, updateCounts: true });
    refreshMessageTokenState();
    refreshPhotoLocks();
    updateQueuePoolUI();
    if (dom.photoVideoButton) {
      if (!adminVideoButtonSlot) {
        adminVideoButtonSlot = {
          node: dom.photoVideoButton,
          parent: dom.photoVideoButton.parentElement,
          next: dom.photoVideoButton.nextElementSibling
        };
      }
      if (membershipInfo.isAdmin) {
        const { node, parent, next } = adminVideoButtonSlot;
        if (node && parent && !node.isConnected) {
          if (next && next.parentElement === parent) {
            parent.insertBefore(node, next);
          } else {
            parent.appendChild(node);
          }
        }
        if (node) {
          node.removeAttribute('hidden');
          node.removeAttribute('aria-hidden');
        }
      } else if (adminVideoButtonSlot.node && adminVideoButtonSlot.node.isConnected) {
        const node = adminVideoButtonSlot.node;
        const active = document.activeElement;
        if (active && (active === node || node.contains(active))) {
          active.blur();
          if (dom.closePhotoModal && dom.photoModal && dom.photoModal.classList.contains('active')) {
            dom.closePhotoModal.focus();
          }
        }
        node.remove();
      }
    }
    if (dom.musicGeneratorButton) {
      dom.musicGeneratorButton.hidden = false;
      dom.musicGeneratorButton.setAttribute('aria-hidden', 'false');
    }
  }

  function extractFirstUrl(text) {
    if (!text) return '';
    const match = text.match(/https?:\/\/[^\s"'<>]+/i);
    return match ? match[0] : '';
  }

  function resolveMediaUrl(url) {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) {
      return url;
    }
    try {
      return new URL(url, window.location.href).href;
    } catch (err) {
      return url;
    }
  }

  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeRegExp(text) {
    return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function formatHtmlBlock(text) {
    return escapeHtml(text).replace(/\n/g, '<br>');
  }

  function sanitizeHtmlComment(text) {
    return String(text || '')
      .replace(/--/g, '- -')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function buildHiddenExifComment(exif) {
    if (!exif || typeof exif !== 'object') return '';
    const rawText = typeof exif.raw === 'string' ? exif.raw : '';
    const cleanedRaw = rawText.replace(/\r/g, '');
    const hiddenKeys = [
      'Steps',
      'Size',
      'Sampler',
      'Seed',
      'CFG scale',
      'App',
      'Version',
      'Pipeline',
      'Operations',
      'Model'
    ];
    const hiddenParts = [];
    const seenKeys = new Set();

    hiddenKeys.forEach((key) => {
      const pattern = new RegExp(`${escapeRegExp(key)}:\\s*([^,\\n]+)`, 'i');
      const match = cleanedRaw.match(pattern);
      if (match && match[1]) {
        const value = match[1].trim();
        if (value !== '' && !seenKeys.has(key.toLowerCase())) {
          hiddenParts.push(`${key}: ${value}`);
          seenKeys.add(key.toLowerCase());
        }
      }
    });

    if (typeof exif.model === 'string') {
      const modelValue = exif.model.trim();
      if (modelValue !== '' && !seenKeys.has('model')) {
        hiddenParts.push(`Model: ${modelValue}`);
        seenKeys.add('model');
      }
    }

    if (!hiddenParts.length) {
      return '';
    }
    const commentText = sanitizeHtmlComment(hiddenParts.join(', '));
    if (commentText === '') {
      return '';
    }
    return `<!-- ${commentText} -->`;
  }

  function normalizeExif(exif) {
    if (!exif || typeof exif !== 'object') return null;
    if (Array.isArray(exif)) {
      return exif.length ? exif : null;
    }
    return Object.keys(exif).length ? exif : null;
  }

  function setPhotoStatus(text) {
    if (dom.photoStatus) {
      dom.photoStatus.textContent = text ? t(text) : '';
    }
  }

  function setVideoStatus(text) {
    if (dom.videoStatus) {
      dom.videoStatus.textContent = text ? t(text) : '';
    }
  }

  function getPhotoShareXpStorageKey() {
    const owner = state.sessionId || 'local';
    return `${PHOTO_SHARE_XP_KEY_PREFIX}${owner}`;
  }

  function loadPhotoShareClaims() {
    const key = getPhotoShareXpStorageKey();
    if (
      state.photoShareClaims
      && typeof state.photoShareClaims === 'object'
      && state.photoShareClaimsKey === key
    ) {
      return state.photoShareClaims;
    }
    const empty = {};
    if (!key) {
      state.photoShareClaims = empty;
      state.photoShareClaimsKey = key;
      return empty;
    }
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        state.photoShareClaims = empty;
        state.photoShareClaimsKey = key;
        return empty;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const mapped = {};
        parsed.forEach((entry) => {
          if (typeof entry === 'string' && entry.trim()) {
            mapped[entry] = Date.now();
          }
        });
        state.photoShareClaims = mapped;
        state.photoShareClaimsKey = key;
        return mapped;
      }
      if (parsed && typeof parsed === 'object') {
        state.photoShareClaims = parsed;
        state.photoShareClaimsKey = key;
        return parsed;
      }
    } catch (err) {
      // ignore parse errors
    }
    state.photoShareClaims = empty;
    state.photoShareClaimsKey = key;
    return empty;
  }

  function savePhotoShareClaims() {
    const key = getPhotoShareXpStorageKey();
    if (!key) return;
    try {
      const claims = loadPhotoShareClaims();
      const keys = Object.keys(claims || {});
      if (!keys.length) {
        localStorage.removeItem(key);
        return;
      }
      localStorage.setItem(key, JSON.stringify(claims));
    } catch (err) {
      // ignore storage errors
    }
  }

  function normalizePhotoShareClaimKey(url) {
    const resolved = resolveMediaUrl(url);
    return resolved || String(url || '').trim();
  }

  function isPhotoShareClaimed(url) {
    const key = normalizePhotoShareClaimKey(url);
    if (!key) return false;
    const claims = loadPhotoShareClaims();
    return Boolean(claims && claims[key]);
  }

  function markPhotoShareClaimed(url) {
    const key = normalizePhotoShareClaimKey(url);
    if (!key) return;
    const claims = loadPhotoShareClaims();
    claims[key] = Date.now();
    savePhotoShareClaims();
  }

  function updatePhotoShareButton() {
    if (!dom.photoShareButton) return;
    const focusUrl = state.photoFocus ? resolveMediaUrl(state.photoFocus.url) : '';
    const claimed = focusUrl ? isPhotoShareClaimed(focusUrl) : false;
    dom.photoShareButton.classList.toggle('is-claimed', claimed);
  }

  function claimPhotoShareXp(url) {
    const key = normalizePhotoShareClaimKey(url);
    if (!key || isPhotoShareClaimed(key)) return false;
    markPhotoShareClaimed(key);
    void addXp('share_photo', { shareUrl: key });
    updatePhotoShareButton();
    return true;
  }

  function getVideoShareXpStorageKey() {
    const owner = state.sessionId || 'local';
    return `${VIDEO_SHARE_XP_KEY_PREFIX}${owner}`;
  }

  function loadVideoShareClaims() {
    const key = getVideoShareXpStorageKey();
    if (
      state.videoShareClaims
      && typeof state.videoShareClaims === 'object'
      && state.videoShareClaimsKey === key
    ) {
      return state.videoShareClaims;
    }
    const empty = {};
    if (!key) {
      state.videoShareClaims = empty;
      state.videoShareClaimsKey = key;
      return empty;
    }
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        state.videoShareClaims = empty;
        state.videoShareClaimsKey = key;
        return empty;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const mapped = {};
        parsed.forEach((entry) => {
          if (typeof entry === 'string' && entry.trim()) {
            mapped[entry] = Date.now();
          }
        });
        state.videoShareClaims = mapped;
        state.videoShareClaimsKey = key;
        return mapped;
      }
      if (parsed && typeof parsed === 'object') {
        state.videoShareClaims = parsed;
        state.videoShareClaimsKey = key;
        return parsed;
      }
    } catch (err) {
      // ignore parse errors
    }
    state.videoShareClaims = empty;
    state.videoShareClaimsKey = key;
    return empty;
  }

  function saveVideoShareClaims() {
    const key = getVideoShareXpStorageKey();
    if (!key) return;
    try {
      const claims = loadVideoShareClaims();
      const keys = Object.keys(claims || {});
      if (!keys.length) {
        localStorage.removeItem(key);
        return;
      }
      localStorage.setItem(key, JSON.stringify(claims));
    } catch (err) {
      // ignore storage errors
    }
  }

  function normalizeVideoShareClaimKey(url) {
    const resolved = resolveMediaUrl(url);
    return resolved || String(url || '').trim();
  }

  function isVideoShareClaimed(url) {
    const key = normalizeVideoShareClaimKey(url);
    if (!key) return false;
    const claims = loadVideoShareClaims();
    return Boolean(claims && claims[key]);
  }

  function markVideoShareClaimed(url) {
    const key = normalizeVideoShareClaimKey(url);
    if (!key) return;
    const claims = loadVideoShareClaims();
    claims[key] = Date.now();
    saveVideoShareClaims();
  }

  function updateVideoShareButton() {
    if (!dom.videoShareButton) return;
    const focusUrl = state.videoFocus ? resolveMediaUrl(state.videoFocus.url) : '';
    const claimed = focusUrl ? isVideoShareClaimed(focusUrl) : false;
    dom.videoShareButton.classList.toggle('is-claimed', claimed);
  }

  function claimVideoShareXp(url) {
    const key = normalizeVideoShareClaimKey(url);
    if (!key || isVideoShareClaimed(key)) return false;
    markVideoShareClaimed(key);
    void addXp('share_video', { shareUrl: key });
    updateVideoShareButton();
    return true;
  }

  function updatePhotoInfoButton() {
    if (!dom.photoInfoButton) return;
    const hasPhoto = Boolean(state.photoFocus && state.photoFocus.url);
    dom.photoInfoButton.disabled = !hasPhoto;
  }

  function findVideoPrompt(url, messageId = '') {
    const normalized = normalizeMediaKey(url);
    if (messageId) {
      const message = state.messages.find((msg) => msg.id === messageId);
      const prompt = message && typeof message.prompt === 'string' ? message.prompt.trim() : '';
      if (prompt) return prompt;
    }
    if (normalized) {
      const item = state.gallery.find((entry) => entry && normalizeMediaKey(entry.url) === normalized);
      const prompt = item && typeof item.prompt === 'string' ? item.prompt.trim() : '';
      if (prompt) return prompt;
    }
    return '';
  }

  function updateVideoInfoButton() {
    if (!dom.videoInfoButton) return;
    const hasVideo = Boolean(state.videoFocus && state.videoFocus.url);
    dom.videoInfoButton.disabled = !hasVideo;
  }

  function freezeInitialScroll() {
    if (state.initialScrollTimer) {
      clearTimeout(state.initialScrollTimer);
      state.initialScrollTimer = null;
    }
    if (state.initialScrollMaxTimer) {
      clearTimeout(state.initialScrollMaxTimer);
      state.initialScrollMaxTimer = null;
    }
    state.initialScroll = false;
  }

  function updateMessageExif(messageId, exif) {
    const normalized = normalizeExif(exif);
    if (!messageId || !normalized) return;
    const index = findMessageIndex(messageId);
    if (index === -1) return;
    const message = state.messages[index];
    state.messages[index] = {
      ...message,
      exif: normalized
    };
    saveToStorage(STORAGE_KEYS.history, state.messages);
  }

  async function fetchPhotoExif(url) {
    if (!url) return null;
    const params = new URLSearchParams({
      URL: url,
      ACTION: 'EXIF'
    });
    try {
      const response = await fetch(`${CONFIG.photoTransformEndpoint}?${params.toString()}`);
      const data = await response.json();
      if (data && data.ok) {
        return normalizeExif(data.exif);
      }
    } catch (err) {
      return null;
    }
    return null;
  }

  function formatExifHtml(exif) {
    if (!exif || typeof exif !== 'object') return '';
    const rows = [];
    if (exif.prompt) {
      rows.push(`<div><strong>${t('Prompt')}</strong><div>${formatHtmlBlock(exif.prompt)}</div></div>`);
    }
    if (exif.negative_prompt) {
      rows.push(`<div><strong>${t('Negative Prompt')}</strong><div>${formatHtmlBlock(exif.negative_prompt)}</div></div>`);
    }
    if (exif.source) {
      rows.push(`<div><strong>${t('Source')}</strong><div>${formatHtmlBlock(exif.source)}</div></div>`);
    }
    const visible = rows.join('<div style="height:10px"></div>');
    if (!visible) {
      return '';
    }
    const hiddenComment = buildHiddenExifComment(exif);
    return hiddenComment ? `${visible}${hiddenComment}` : visible;
  }

  async function showPhotoInfo() {
    if (!state.photoFocus || !state.photoFocus.url) return;
    const chatScrollTop = dom.chatLog ? dom.chatLog.scrollTop : 0;
    freezeInitialScroll();
    const focus = state.photoFocus;
    const messageId = focus.messageId || '';
    const message = messageId ? state.messages.find((msg) => msg.id === messageId) : null;
    let exif = normalizeExif(message && message.exif ? message.exif : focus.exif);

    if (!exif) {
      const resolved = resolveMediaUrl(focus.url);
      exif = await fetchPhotoExif(resolved);
      if (exif) {
        if (messageId) {
          updateMessageExif(messageId, exif);
        }
        state.photoFocus = { ...focus, exif };
      }
    }

    if (!exif) {
      if (window.Swal && typeof window.Swal.fire === 'function') {
        await window.Swal.fire({
          title: t('Photo details'),
          text: t('No EXIF data found for this photo.'),
          icon: 'info',
          confirmButtonText: t('OK'),
          returnFocus: false,
          heightAuto: false,
          scrollbarPadding: false,
          willOpen: () => restoreChatScroll(chatScrollTop),
          didOpen: () => restoreChatScroll(chatScrollTop),
          didClose: () => restoreChatScroll(chatScrollTop)
        });
      } else {
        alert(t('No EXIF data found for this photo.'));
      }
      restoreChatScroll(chatScrollTop);
      return;
    }

    const html = formatExifHtml(exif);
    if (window.Swal && typeof window.Swal.fire === 'function') {
      await window.Swal.fire({
        title: t('Photo details'),
        html: html || t('No EXIF fields available.'),
        icon: 'info',
        confirmButtonText: t('Close'),
        returnFocus: false,
        heightAuto: false,
        scrollbarPadding: false,
        willOpen: () => restoreChatScroll(chatScrollTop),
        didOpen: () => restoreChatScroll(chatScrollTop),
        didClose: () => restoreChatScroll(chatScrollTop)
      });
    } else {
      const text = [
        exif.prompt ? `${t('Prompt')}: ${exif.prompt}` : '',
        exif.negative_prompt ? `${t('Negative Prompt')}: ${exif.negative_prompt}` : ''
      ].filter(Boolean).join('\n\n');
      alert(text || t('No EXIF fields available.'));
    }
    restoreChatScroll(chatScrollTop);
  }

  async function showVideoInfo() {
    if (!state.videoFocus || !state.videoFocus.url) return;
    const chatScrollTop = dom.chatLog ? dom.chatLog.scrollTop : 0;
    freezeInitialScroll();
    const focus = state.videoFocus;
    const promptText = String(focus.prompt || '').trim()
      || findVideoPrompt(focus.url, focus.messageId);

    if (window.Swal && typeof window.Swal.fire === 'function') {
      const html = promptText
        ? `<div><strong>${t('Prompt')}</strong><div>${formatHtmlBlock(promptText)}</div></div>`
        : '';
      await window.Swal.fire({
        title: t('Video details'),
        html: html || t('No prompt found for this video.'),
        icon: 'info',
        confirmButtonText: t('Close'),
        returnFocus: false,
        heightAuto: false,
        scrollbarPadding: false,
        willOpen: () => restoreChatScroll(chatScrollTop),
        didOpen: () => restoreChatScroll(chatScrollTop),
        didClose: () => restoreChatScroll(chatScrollTop)
      });
    } else {
      const text = promptText ? `${t('Prompt')}: ${promptText}` : t('No prompt found for this video.');
      alert(text);
    }
    restoreChatScroll(chatScrollTop);
  }

  function setPhotoActionsDisabled(disabled) {
    const buttons = [
      dom.photoEnhanceButton,
      dom.photoXrayButton,
      dom.photoVideoButton,
      dom.photoVideoGen2Button,
      dom.photoBackgroundButton,
      dom.photoDownloadButton,
      dom.photoDeleteButton,
      dom.photoShareButton
    ];
    buttons.forEach((button) => {
      if (button) {
        button.disabled = disabled;
      }
    });
  }

  function setVideoActionsDisabled(disabled) {
    const buttons = [
      dom.videoBackgroundButton,
      dom.videoDownloadButton,
      dom.videoDeleteButton,
      dom.videoShareButton
    ];
    buttons.forEach((button) => {
      if (button) {
        button.disabled = disabled;
      }
    });
  }

  function openPhotoModal(url, messageId = '') {
    if (!url || !dom.photoModal || !dom.photoModalImage) return;
    if (dom.galleryModal && dom.galleryModal.classList.contains('active')) {
      closeGallery();
    }
    const resolved = resolveMediaUrl(url);
    const exif = messageId
      ? normalizeExif(state.messages.find((msg) => msg.id === messageId)?.exif)
      : null;
    state.photoFocus = { url: resolved, messageId: messageId || '', exif };
    dom.photoModalImage.src = resolved;
    dom.photoModalImage.alt = t('Selected photo');
    setPhotoStatus('');
    dom.photoModal.classList.add('active');
    dom.photoModal.setAttribute('aria-hidden', 'false');
    updatePhotoInfoButton();
    updatePhotoShareButton();
  }

  function openVideoModal(url, messageId = '') {
    if (!url || !dom.videoModal || !dom.videoModalVideo) return;
    if (dom.galleryModal && dom.galleryModal.classList.contains('active')) {
      closeGallery();
    }
    const resolved = resolveMediaUrl(url);
    const prompt = findVideoPrompt(resolved, messageId);
    state.videoFocus = { url: resolved, messageId: messageId || '', prompt };
    dom.videoModalVideo.pause();
    dom.videoModalVideo.removeAttribute('data-force-muted');
    delete dom.videoModalVideo.dataset.forceMuted;
    dom.videoModalVideo.src = resolved;
    const lowPower = isLowPowerModeEnabled();
    dom.videoModalVideo.loop = !lowPower;
    dom.videoModalVideo.autoplay = !lowPower;
    dom.videoModalVideo.playsInline = true;
    dom.videoModalVideo.muted = false;
    dom.videoModalVideo.defaultMuted = false;
    dom.videoModalVideo.volume = 1;
    if (!lowPower) {
      dom.videoModalVideo.setAttribute('loop', '');
      dom.videoModalVideo.setAttribute('autoplay', '');
    } else {
      dom.videoModalVideo.removeAttribute('loop');
      dom.videoModalVideo.removeAttribute('autoplay');
    }
    dom.videoModalVideo.setAttribute('playsinline', '');
    dom.videoModalVideo.setAttribute('webkit-playsinline', '');
    dom.videoModalVideo.removeAttribute('muted');
    setVideoStatus('');
    setVideoActionsDisabled(false);
    dom.videoModal.classList.add('active');
    dom.videoModal.setAttribute('aria-hidden', 'false');
    updateVideoShareButton();
    updateVideoInfoButton();
    muteOtherVideos(dom.videoModalVideo);
    if (!lowPower) {
      const playPromise = dom.videoModalVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => { });
      }
    }
  }

  function closePhotoModal(options = {}) {
    if (!dom.photoModal) return;
    dom.photoModal.classList.remove('active');
    dom.photoModal.setAttribute('aria-hidden', 'true');
    if (!options.preserveFocus) {
      state.photoFocus = null;
      setPhotoStatus('');
      updatePhotoInfoButton();
      updatePhotoShareButton();
    }
  }

  function closeVideoModal() {
    if (!dom.videoModal) return;
    dom.videoModal.classList.remove('active');
    dom.videoModal.setAttribute('aria-hidden', 'true');
    state.videoFocus = null;
    if (dom.videoModalVideo) {
      dom.videoModalVideo.pause();
      dom.videoModalVideo.removeAttribute('src');
      dom.videoModalVideo.load();
    }
    setVideoStatus('');
    updateVideoShareButton();
    updateVideoInfoButton();
  }

  function openSettingsModal() {
    if (!dom.settingsModal) return;
    dom.settingsModal.removeAttribute('inert');
    dom.aiNameInput.value = state.settings.aiName || DEFAULT_AI_NAME;
    if (dom.myNameInput) {
      dom.myNameInput.value = state.settings.myName || '';
    }
    dom.corePromptInput.value = state.settings.corePrompt || '';
    dom.looklikeInput.value = state.settings.looklike || '';
    requestAnimationFrame(() => resizeTextarea(dom.corePromptInput, 25));
    requestAnimationFrame(() => resizeTextarea(dom.looklikeInput, 25));
    if (dom.photoStyleSelect) {
      dom.photoStyleSelect.value = state.settings.photoStyle || DEFAULT_PHOTO_STYLE;
    }
    updatePresetButtons('persona', state.settings.personaPreset || 'custom');
    updatePresetButtons('looklike', state.settings.looklikePreset || 'custom');
    if (dom.themeToggle) {
      dom.themeToggle.checked = state.settings.theme === 'dark';
    }
    if (dom.lowPowerToggle) {
      dom.lowPowerToggle.checked = Boolean(state.settings.lowPowerMode);
    }
    if (dom.voiceSelect) {
      dom.voiceSelect.value = state.settings.voice || DEFAULT_VOICE;
    }
    if (dom.aiCoreSelect) {
      populateAiCoreOptions(true);
      dom.aiCoreSelect.value = normalizeAiCoreValue(state.settings.aiCore || DEFAULT_AI_CORE);
    }
    if (dom.aiTemperatureInput) {
      syncAiTemperatureInput(state.settings.aiTemperature);
    }
    if (dom.memoryCompactionToggle) {
      dom.memoryCompactionToggle.checked = state.settings.memoryCompaction;
    }
    syncGradientInputs();
    applyMembershipGates();
    updateSettingTokenCounts();
    loadUserIdentity();
    updateMyNamePlaceholder();
    dom.settingsModal.classList.add('active');
    dom.settingsModal.setAttribute('aria-hidden', 'false');
  }

  function closeSettingsModal() {
    if (!dom.settingsModal) return;
    const modal = dom.settingsModal;
    const focusWithoutScroll = (el) => {
      if (!el || typeof el.focus !== 'function') return false;
      try {
        el.focus({ preventScroll: true });
        return true;
      } catch (err) {
        try {
          el.focus();
          return true;
        } catch (focusErr) {
          return false;
        }
      }
    };
    const moveFocusOutsideModal = () => {
      const activeEl = document.activeElement;
      if (!activeEl || !modal.contains(activeEl)) return;
      if (dom.settingsButton && activeEl !== dom.settingsButton) {
        focusWithoutScroll(dom.settingsButton);
      }
      if (modal.contains(document.activeElement) && typeof activeEl.blur === 'function') {
        activeEl.blur();
      }
    };
    moveFocusOutsideModal();
    modal.setAttribute('inert', '');
    modal.classList.remove('active');
    requestAnimationFrame(() => {
      if (modal.classList.contains('active')) return;
      moveFocusOutsideModal();
      modal.setAttribute('aria-hidden', 'true');
      if (dom.settingsButton) {
        focusWithoutScroll(dom.settingsButton);
      }
    });
  }

  function setCloudToolsBusy(busy) {
    if (dom.pullCloudButton) {
      dom.pullCloudButton.disabled = busy;
    }
    if (dom.pushCloudButton) {
      dom.pushCloudButton.disabled = busy;
    }
    if (dom.wipeCloudButton) {
      dom.wipeCloudButton.disabled = busy;
    }
    if (dom.downloadCloudDataButton) {
      dom.downloadCloudDataButton.disabled = busy;
    }
    if (dom.uploadCloudDataButton) {
      dom.uploadCloudDataButton.disabled = busy;
    }
    if (dom.exportChatButton) {
      dom.exportChatButton.disabled = busy;
    }
  }

  async function openCloudToolsModal() {
    if (!dom.cloudToolsModal) return;
    if (!state.cloudSync || !state.sessionId) {
      await showAlert({
        title: t('Login required'),
        text: t('Please log in to continue.'),
        icon: 'info'
      });
      return;
    }
    dom.cloudToolsModal.classList.add('active');
    dom.cloudToolsModal.setAttribute('aria-hidden', 'false');
  }

  function closeCloudToolsModal() {
    if (!dom.cloudToolsModal) return;
    dom.cloudToolsModal.classList.remove('active');
    dom.cloudToolsModal.setAttribute('aria-hidden', 'true');
  }

  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(reader.error || new Error('File read failed'));
      reader.readAsText(file);
    });
  }

  async function downloadOfflineData() {
    if (!state.cloudSync || !state.sessionId) {
      await showAlert({
        title: t('Login required'),
        text: t('Please log in to continue.'),
        icon: 'info'
      });
      return;
    }
    const payload = buildOfflineBackupPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const filename = `${sanitizeFilename(state.sessionId || 'offline')}.muah`;
    downloadBlob(blob, filename);
  }

  async function uploadOfflineData() {
    if (!state.cloudSync || !state.sessionId) {
      await showAlert({
        title: t('Login required'),
        text: t('Please log in to continue.'),
        icon: 'info'
      });
      return;
    }
    if (!dom.cloudDataUploadInput) return;
    dom.cloudDataUploadInput.value = '';
    dom.cloudDataUploadInput.click();
  }

  async function handleOfflineUploadFile(file) {
    if (!file) return;
    if (!state.cloudSync || !state.sessionId) {
      await showAlert({
        title: t('Login required'),
        text: t('Please log in to continue.'),
        icon: 'info'
      });
      return;
    }
    setCloudToolsBusy(true);
    let data = null;
    try {
      const text = await readFileAsText(file);
      data = text ? JSON.parse(text) : null;
    } catch (err) {
      setCloudToolsBusy(false);
      await showAlert({
        title: t('Upload Data'),
        text: t('Invalid backup file.'),
        icon: 'error'
      });
      return;
    }
    const backupXid = data && typeof data.xid === 'string' ? data.xid.trim() : '';
    if (!data || data.schema !== OFFLINE_DATA_SCHEMA || Number(data.version) !== OFFLINE_DATA_VERSION) {
      setCloudToolsBusy(false);
      await showAlert({
        title: t('Upload Data'),
        text: t('Invalid backup file.'),
        icon: 'error'
      });
      return;
    }
    if (!backupXid || backupXid !== state.sessionId) {
      setCloudToolsBusy(false);
      await showAlert({
        title: t('Upload Data'),
        text: t('This backup belongs to a different XID.'),
        icon: 'error'
      });
      return;
    }
    const confirmed = await confirmDialog({
      title: t('Upload data?'),
      text: t('This will replace your local chat history and settings with the uploaded data.'),
      confirmText: t('Upload Data'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) {
      setCloudToolsBusy(false);
      return;
    }
    try {
      applyOfflineBackupPayload(data);
    } catch (err) {
      setCloudToolsBusy(false);
      await showAlert({
        title: t('Upload Data'),
        text: t('Upload failed.'),
        icon: 'error'
      });
      return;
    }
    setCloudToolsBusy(false);
    closeCloudToolsModal();
    window.location.reload();
  }

  function getExportChatMessages() {
    return state.messages.filter((message) => {
      if (!message || message.id === 'typing') return false;
      if (message.meta === 'System') return true;
      return message.role === 'user' || message.role === 'assistant';
    });
  }

  function getExportUserName() {
    const identity = (state.identityName || '').trim();
    const myName = (state.settings && state.settings.myName) ? state.settings.myName.trim() : '';
    return identity || myName || DEFAULT_PLAYER_NAME;
  }

  function getExportAssistantName() {
    const name = (state.settings && state.settings.aiName) ? state.settings.aiName.trim() : '';
    return name || DEFAULT_AI_NAME;
  }

  function formatExportTimestamp(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString();
  }

  function buildChatExportStyles() {
    return `
      :root {
        --export-bg: #06080f;
        --export-surface: #0f172a;
        --export-panel: rgba(17, 24, 39, 0.9);
        --export-border: rgba(148, 163, 184, 0.18);
        --export-text: #e5e7eb;
        --export-muted: #94a3b8;
        --export-accent: #38bdf8;
        --export-user-bg: linear-gradient(135deg, #45f1ff 0%, #9bfff0 50%, #f8ff7a 100%);
        --export-user-text: #071117;
        --export-assistant-bg: rgba(15, 23, 42, 0.92);
        --export-system-bg: rgba(15, 23, 42, 0.55);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        font-family: "Segoe UI", "Segoe UI Variable", "Trebuchet MS", Arial, sans-serif;
        background: radial-gradient(circle at 20% 10%, #1e293b 0%, #0b0f17 45%, #05070b 100%);
        color: var(--export-text);
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .chat-export {
        min-height: 100vh;
        padding: 36px 20px 48px;
        background: radial-gradient(circle at 18% 12%, rgba(56, 189, 248, 0.15), transparent 55%),
          radial-gradient(circle at 80% 10%, rgba(99, 102, 241, 0.14), transparent 60%),
          radial-gradient(circle at 50% 90%, rgba(236, 72, 153, 0.12), transparent 58%);
      }

      .export-shell {
        max-width: 960px;
        margin: 0 auto;
        padding: 26px 26px 30px;
        border-radius: 26px;
        background: var(--export-panel);
        border: 1px solid var(--export-border);
        box-shadow: 0 20px 60px rgba(15, 23, 42, 0.4);
        backdrop-filter: blur(16px);
      }

      .export-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 22px;
        border-bottom: 1px solid rgba(148, 163, 184, 0.15);
        padding-bottom: 16px;
      }

      .export-title {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.3px;
      }

      .export-subtitle {
        font-size: 12px;
        color: var(--export-muted);
        text-transform: uppercase;
        letter-spacing: 0.2em;
      }

      .export-meta {
        font-size: 12px;
        color: var(--export-muted);
        text-align: right;
        line-height: 1.6;
      }

      .export-disclosure {
        margin: 14px 0 18px;
        padding: 10px 14px;
        border-radius: 14px;
        border: 1px solid rgba(255, 77, 90, 0.4);
        background: rgba(255, 77, 90, 0.08);
        color: #ff4d5a;
        font-size: 12px;
        text-align: center;
        line-height: 1.5;
      }

      .export-messages {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .export-message {
        display: flex;
      }

      .export-message.is-user {
        justify-content: flex-end;
      }

      .export-message.is-assistant {
        justify-content: flex-start;
      }

      .export-message.is-system {
        justify-content: center;
      }

      .export-bubble {
        max-width: 74%;
        padding: 12px 14px;
        border-radius: 18px;
        border: 1px solid rgba(148, 163, 184, 0.18);
        background: var(--export-assistant-bg);
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
      }

      .export-message.is-user .export-bubble {
        background: var(--export-user-bg);
        color: var(--export-user-text);
        border: none;
      }

      .export-message.is-system .export-bubble {
        background: var(--export-system-bg);
        color: var(--export-muted);
        border: 1px dashed rgba(148, 163, 184, 0.35);
        text-align: center;
        max-width: 82%;
      }

      .export-meta-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--export-muted);
        margin-bottom: 6px;
      }

      .export-message.is-user .export-meta-row {
        color: rgba(7, 17, 23, 0.65);
      }

      .export-text {
        font-size: 14px;
        line-height: 1.55;
        white-space: pre-wrap;
        word-break: break-word;
      }

      .export-media {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid rgba(148, 163, 184, 0.2);
        font-size: 12px;
        color: inherit;
      }

      .export-media-image img,
      .export-media-video video,
      .export-media-audio audio {
        width: 100%;
        max-width: 100%;
        border-radius: 14px;
        display: block;
        background: #0b0f17;
      }

      .export-media-image img {
        box-shadow: 0 12px 24px rgba(2, 6, 23, 0.35);
      }

      .export-media-link {
        font-size: 11px;
        opacity: 0.85;
      }

      .export-media a {
        color: inherit;
        text-decoration: none;
        word-break: break-all;
      }

      .export-media a:hover {
        text-decoration: underline;
      }

      .export-empty {
        text-align: center;
        color: var(--export-muted);
        font-size: 14px;
        padding: 18px;
        border-radius: 16px;
        border: 1px dashed rgba(148, 163, 184, 0.25);
      }

      @media print {
        body {
          background: #0b0f17;
        }
        .chat-export {
          padding: 0;
        }
        .export-shell {
          border-radius: 18px;
          box-shadow: none;
          backdrop-filter: none;
        }
        .export-bubble {
          page-break-inside: avoid;
        }
      }
    `;
  }

  function buildChatExportMessageHtml(message) {
    if (!message) return '';
    const isSystem = message.meta === 'System';
    const role = isSystem ? 'system' : (message.role === 'user' ? 'user' : 'assistant');
    const name = isSystem
      ? t('System')
      : (role === 'user' ? getExportUserName() : getExportAssistantName());
    const mediaUrl = resolveMediaUrl(message.mediaUrl || '');
    const mediaType = message.mediaType || (mediaUrl ? inferMediaType(mediaUrl) : '');
    let text = (message.text || '').trim();
    if (!text && mediaUrl) {
      text = t('Shared a file.');
    }
    const timestamp = formatExportTimestamp(message.timestamp || '');
    const textHtml = text ? `<div class="export-text">${formatHtmlBlock(text)}</div>` : '';
    const mediaLabel = `${escapeHtml(mediaType || 'file')}: ${escapeHtml(mediaUrl)}`;
    let mediaHtml = '';
    if (mediaUrl) {
      if (mediaType === 'image') {
        mediaHtml = `
          <div class="export-media export-media-image">
            <img src="${escapeHtml(mediaUrl)}" alt="${escapeHtml(t('Shared a file.'))}">
          </div>
          <div class="export-media export-media-link">
            <a href="${escapeHtml(mediaUrl)}" target="_blank" rel="noopener">${mediaLabel}</a>
          </div>
        `;
      } else if (mediaType === 'video') {
        mediaHtml = `
          <div class="export-media export-media-video">
            <video src="${escapeHtml(mediaUrl)}" controls loop></video>
          </div>
          <div class="export-media export-media-link">
            <a href="${escapeHtml(mediaUrl)}" target="_blank" rel="noopener">${mediaLabel}</a>
          </div>
        `;
      } else if (mediaType === 'audio') {
        mediaHtml = `
          <div class="export-media export-media-audio">
            <audio src="${escapeHtml(mediaUrl)}" controls></audio>
          </div>
          <div class="export-media export-media-link">
            <a href="${escapeHtml(mediaUrl)}" target="_blank" rel="noopener">${mediaLabel}</a>
          </div>
        `;
      } else {
        mediaHtml = `
          <div class="export-media export-media-link">
            <a href="${escapeHtml(mediaUrl)}" target="_blank" rel="noopener">${mediaLabel}</a>
          </div>
        `;
      }
    }
    return `
      <div class="export-message is-${role}">
        <div class="export-bubble">
          <div class="export-meta-row">
            <span>${escapeHtml(name)}</span>
            <span>${escapeHtml(timestamp)}</span>
          </div>
          ${textHtml}
          ${mediaHtml}
        </div>
      </div>
    `;
  }

  function buildChatExportBody(messages) {
    const list = messages.map((message) => buildChatExportMessageHtml(message)).join('');
    const exportDate = new Date().toLocaleString();
    const xid = state.sessionId ? `XID: ${escapeHtml(state.sessionId)}` : '';
    const brandTitle = getChatroomBrandTitle();
    return `
      <div class="chat-export">
        <div class="export-shell">
          <div class="export-header">
            <div>
              <div class="export-title">${escapeHtml(brandTitle)}</div>
              <div class="export-subtitle">${escapeHtml(t('Export Chat'))}</div>
            </div>
            <div class="export-meta">
              <div>${escapeHtml(exportDate)}</div>
              ${xid ? `<div>${xid}</div>` : ''}
            </div>
          </div>
          <div class="export-disclosure">All Content is AI Generated by user's prompt (request and intention).</div>
          <div class="export-messages">
            ${list || `<div class="export-empty">${escapeHtml(t('No messages to export.'))}</div>`}
          </div>
        </div>
      </div>
    `;
  }

  function buildChatExportHtmlDocument(messages) {
    const styles = buildChatExportStyles();
    const body = buildChatExportBody(messages);
    const title = `${getChatroomBrandTitle()} - ${t('Export Chat')}`;
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${escapeHtml(title)}</title>
          <style>${styles}</style>
        </head>
        <body>
          ${body}
        </body>
      </html>
    `;
  }

  async function ensureHtml2Canvas() {
    if (window.html2canvas) {
      return true;
    }
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  async function exportChatAsHtml(messages) {
    const html = buildChatExportHtmlDocument(messages);
    const xidPart = sanitizeFilename(state.sessionId || 'chat');
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    const filename = `${xidPart}_chat_${stamp}.html`;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    downloadBlob(blob, filename);
  }

  async function exportChatAsPng(messages) {
    const ok = await ensureHtml2Canvas();
    if (!ok || !window.html2canvas) {
      await showAlert({
        title: t('Export Error'),
        text: t('Export failed.'),
        icon: 'error'
      });
      return;
    }
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-99999px';
    container.style.top = '0';
    container.style.width = '960px';
    container.style.zIndex = '-1';
    container.innerHTML = `<style>${buildChatExportStyles()}</style>${buildChatExportBody(messages)}`;
    document.body.appendChild(container);
    try {
      const canvas = await window.html2canvas(container, {
        scale: 2,
        backgroundColor: null,
        useCORS: true
      });
      const xidPart = sanitizeFilename(state.sessionId || 'chat');
      const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
      const filename = `${xidPart}_chat_${stamp}.png`;
      await new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            downloadBlob(blob, filename);
          }
          resolve();
        }, 'image/png');
      });
    } catch (err) {
      await showAlert({
        title: t('Export Error'),
        text: t('Export failed.'),
        icon: 'error'
      });
    } finally {
      container.remove();
    }
  }

  async function openExportChatOptions() {
    const messages = getExportChatMessages();
    if (messages.length === 0) {
      await showAlert({
        title: t('Export Chat'),
        text: t('No messages to export.'),
        icon: 'info'
      });
      return;
    }
    let format = '';
    if (window.Swal && typeof window.Swal.fire === 'function') {
      const result = await window.Swal.fire({
        title: t('Export Chat'),
        text: t('Export chat as PNG or HTML?'),
        icon: 'info',
        input: 'select',
        inputOptions: {
          png: 'PNG',
          html: 'HTML'
        },
        inputPlaceholder: t('Choose an option.'),
        showCancelButton: true,
        confirmButtonText: t('Export'),
        cancelButtonText: t('Cancel'),
        reverseButtons: true,
        focusCancel: true
      });
      if (!result.isConfirmed) return;
      format = String(result.value || '').toLowerCase();
    } else {
      const raw = prompt(t('Export chat as PNG or HTML?'), 'png');
      format = raw ? raw.trim().toLowerCase() : '';
    }
    if (format === 'png') {
      await exportChatAsPng(messages);
    } else if (format === 'html') {
      await exportChatAsHtml(messages);
    }
  }

  function buildAllSlotsSyncOrder() {
    const active = normalizeSlotValue(state.activeSlot);
    const order = [active];
    for (let slot = SLOT_MIN; slot <= SLOT_MAX; slot += 1) {
      if (slot !== active) {
        order.push(slot);
      }
    }
    return order;
  }

  async function runCloudActionForAllSlots(action) {
    const originalSlot = normalizeSlotValue(state.activeSlot);
    const previousBulkSync = state.bulkSlotCloudSync === true;
    const slots = buildAllSlotsSyncOrder();

    saveToStorage(STORAGE_KEYS.history, state.messages);
    saveToStorage(STORAGE_KEYS.gallery, state.gallery);
    persistSettings();
    if (cloudSettingsSyncTimer) {
      clearTimeout(cloudSettingsSyncTimer);
      cloudSettingsSyncTimer = null;
    }

    state.bulkSlotCloudSync = true;
    try {
      for (const slot of slots) {
        if (state.activeSlot !== slot) {
          switchSlot(slot, { force: true });
        }
        await action(slot);
      }
      return { ok: true };
    } catch (err) {
      const message = err && err.message ? String(err.message) : '';
      return { ok: false, error: message || t('Cloud sync unavailable. Try again.') };
    } finally {
      if (state.activeSlot !== originalSlot) {
        switchSlot(originalSlot, { force: true });
      }
      state.bulkSlotCloudSync = previousBulkSync;
    }
  }

  async function pullCloudSync() {
    if (!state.cloudSync || !state.sessionId) {
      await showAlert({
        title: t('Login required'),
        text: t('Please log in to continue.'),
        icon: 'info'
      });
      return;
    }
    const confirmed = await confirmDialog({
      title: t('Pull from cloud?'),
      text: t('This will replace your local chat history and settings across all slots with the cloud version.'),
      confirmText: t('Pull from Cloud'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return;
    setCloudToolsBusy(true);
    beginCloudSyncOverlay();
    try {
      const result = await runCloudActionForAllSlots(async (slot) => {
        const [historyLoaded, settingsLoaded] = await Promise.all([
          loadCloudHistory({ force: true, showOverlay: false, slot }),
          loadCloudSettings({ force: true, showOverlay: false, slot })
        ]);
        if (!historyLoaded || !settingsLoaded) {
          throw new Error(`Slot ${slot}: Cloud pull failed.`);
        }
      });
      if (!result.ok) {
        await showAlert({
          title: t('Pull from Cloud'),
          text: result.error || t('Cloud sync unavailable. Try again.'),
          icon: 'error'
        });
        return;
      }
    } finally {
      endCloudSyncOverlay();
      setCloudToolsBusy(false);
    }
    closeCloudToolsModal();
  }

  async function pushCloudSync() {
    if (!state.cloudSync || !state.sessionId) {
      await showAlert({
        title: t('Login required'),
        text: t('Please log in to continue.'),
        icon: 'info'
      });
      return;
    }
    const confirmed = await confirmDialog({
      title: t('Sync to cloud?'),
      text: t('This will replace cloud chat history and settings across all slots with your local version.'),
      confirmText: t('Sync to Cloud'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return;
    setCloudToolsBusy(true);
    try {
      const result = await runCloudActionForAllSlots(async (slot) => {
        const historyPayload = buildFullHistoryPayload();
        const historyResult = await replaceCloudHistory(historyPayload, slot);
        if (!historyResult.ok) {
          throw new Error(`Slot ${slot}: ${historyResult.error || t('Cloud sync unavailable. Try again.')}`);
        }
        if (historyResult.ids) {
          applyCloudHistoryIds(historyResult.ids);
        }
        const settingsSynced = await syncCloudSettings({ slot, ignoreSuppress: true });
        if (!settingsSynced) {
          throw new Error(`Slot ${slot}: Cloud settings update failed.`);
        }
      });
      if (!result.ok) {
        await showAlert({
          title: t('Sync to Cloud'),
          text: result.error || t('Cloud sync unavailable. Try again.'),
          icon: 'error'
        });
        return;
      }
    } finally {
      setCloudToolsBusy(false);
    }
    closeCloudToolsModal();
  }

  async function wipeCloudData() {
    if (!state.cloudSync || !state.sessionId) {
      await showAlert({
        title: t('Login required'),
        text: t('Please log in to continue.'),
        icon: 'info'
      });
      return;
    }
    const confirmed = await confirmDialog({
      title: t('Wipe cloud data?'),
      text: t('This will permanently delete all cloud history and settings for this XID.'),
      confirmText: t('Wipe Cloud Data'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return;
    setCloudToolsBusy(true);
    try {
      const result = await wipeCloudDataRequest();
      if (!result.ok) {
        await showAlert({
          title: t('Wipe Cloud Data'),
          text: result.error || t('Cloud wipe failed. Try again.'),
          icon: 'error'
        });
        return;
      }
      await showAlert({
        title: t('Wipe Cloud Data'),
        text: t('Cloud data wiped.'),
        icon: 'success'
      });
    } finally {
      setCloudToolsBusy(false);
    }
    closeCloudToolsModal();
  }

  function getSlotLabel(slot) {
    const normalized = normalizeSlotValue(slot);
    const names = normalizeSlotNames(state.slotMeta && state.slotMeta.names);
    const customName = names[String(normalized)] || '';
    if (customName) {
      return customName;
    }
    if (normalized === SLOT_MIN) {
      return t('Main Slot');
    }
    return t('Slot {count}', { count: normalized });
  }

  function setSlotCustomName(slot, value) {
    const normalizedSlot = normalizeSlotValue(slot);
    if (normalizedSlot > state.slotMeta.unlocked) {
      return false;
    }
    const key = String(normalizedSlot);
    const names = normalizeSlotNames(state.slotMeta && state.slotMeta.names);
    const current = names[key] || '';
    const next = normalizeSlotName(value);
    if (next === current) {
      return false;
    }
    if (next) {
      names[key] = next;
    } else {
      delete names[key];
    }
    const namesUpdatedAt = normalizeTimestamp(Date.now());
    state.slotMeta = {
      ...state.slotMeta,
      namesUpdatedAt,
      names
    };
    saveSlotMeta(state.slotMeta);
    if (!state.suppressCloudSettingsSync) {
      scheduleCloudSettingsSync();
    }
    refreshSlotModalIfOpen();
    return true;
  }

  function promptRenameSlot(slot) {
    const normalizedSlot = normalizeSlotValue(slot);
    if (normalizedSlot > state.slotMeta.unlocked) {
      return;
    }
    const names = normalizeSlotNames(state.slotMeta && state.slotMeta.names);
    const current = names[String(normalizedSlot)] || '';
    const fallbackLabel = getSlotLabel(normalizedSlot);
    const nextRaw = window.prompt(
      t('Rename slot "{label}". Leave blank to reset the default name.', { label: fallbackLabel }),
      current
    );
    if (nextRaw === null) {
      return;
    }
    setSlotCustomName(normalizedSlot, nextRaw);
  }

  function renderSlotGrid() {
    if (!dom.slotGrid || !dom.slotMeta) return;
    const unlocked = normalizeSlotsUnlocked(state.slotMeta.unlocked);
    const level = getXpLevel();
    const nextUnlockText = unlocked < SLOT_MAX
      ? t('{count} levels', { count: SLOT_UNLOCK_COST_LEVELS })
      : t('Maxed');
    const levelText = state.cloudSync ? String(level) : t('Login required');
    const note = state.cloudSync
      ? t('XP is shared across all slots.')
      : t('Login to sync and unlock more slots.');
    dom.slotMeta.innerHTML = `
      <div class="slot-meta-item">
        <span class="slot-meta-label">${t('Unlocked')}</span>
        <span class="slot-meta-value">${unlocked}/${SLOT_MAX}</span>
      </div>
      <div class="slot-meta-item">
        <span class="slot-meta-label">${t('Next slot')}</span>
        <span class="slot-meta-value">${nextUnlockText}</span>
      </div>
      <div class="slot-meta-item">
        <span class="slot-meta-label">${t('XP Level')}</span>
        <span class="slot-meta-value">${levelText}</span>
      </div>
      <div class="slot-meta-note">${note}</div>
    `;

    const cards = [];
    for (let slot = SLOT_MIN; slot <= SLOT_MAX; slot += 1) {
      const isActive = slot === state.activeSlot;
      const isUnlocked = slot <= unlocked;
      const isLocked = !isUnlocked;
      const status = isActive ? t('Active') : (isLocked ? t('Locked') : t('Ready'));
      let action = '';
      if (isActive) {
        action = t('Current');
      } else if (isLocked) {
        if (!state.cloudSync) {
          action = t('Login to unlock');
        } else if (slot === unlocked + 1) {
          action = t('Unlock for {count} levels', { count: SLOT_UNLOCK_COST_LEVELS });
        } else {
          action = t('Unlock previous slots');
        }
      } else {
        action = t('Swap');
      }
      const renameAction = isUnlocked
        ? `<span class="slot-card-rename" data-slot-action="rename" data-slot="${slot}">${t('Rename')}</span>`
        : '';
      cards.push(`
        <button class="slot-card${isActive ? ' is-active' : ''}${isLocked ? ' is-locked' : ''}" type="button" data-slot="${slot}" data-locked="${isLocked ? 'true' : 'false'}" aria-pressed="${isActive ? 'true' : 'false'}">
          <div class="slot-card-top">
            <span class="slot-card-title">${escapeHtml(getSlotLabel(slot))}</span>
            <span class="slot-card-status">${status}</span>
          </div>
          <div class="slot-card-actions">
            <span class="slot-card-action">${action}</span>
            ${renameAction}
          </div>
        </button>
      `);
    }
    dom.slotGrid.innerHTML = cards.join('');
  }

  function handleSlotGridClick(event) {
    const renameTrigger = event.target.closest('[data-slot-action="rename"]');
    if (renameTrigger && dom.slotGrid && dom.slotGrid.contains(renameTrigger)) {
      const slot = normalizeSlotValue(renameTrigger.dataset.slot);
      if (slot <= state.slotMeta.unlocked) {
        promptRenameSlot(slot);
      }
      return;
    }
    const card = event.target.closest('.slot-card');
    if (!card || !dom.slotGrid || !dom.slotGrid.contains(card)) return;
    const slot = normalizeSlotValue(card.dataset.slot);
    if (slot === state.activeSlot) return;
    if (slot > state.slotMeta.unlocked) {
      void attemptUnlockSlot(slot);
      return;
    }
    switchSlot(slot);
    closeSlotModal();
  }

  function openSlotModal() {
    if (!dom.slotModal) return;
    renderSlotGrid();
    dom.slotModal.classList.add('active');
    dom.slotModal.setAttribute('aria-hidden', 'false');
  }

  function closeSlotModal() {
    if (!dom.slotModal) return;
    dom.slotModal.classList.remove('active');
    dom.slotModal.setAttribute('aria-hidden', 'true');
  }

  function refreshSlotModalIfOpen() {
    if (!dom.slotModal || !dom.slotModal.classList.contains('active')) return;
    renderSlotGrid();
  }

  async function attemptUnlockSlot(slot) {
    const normalized = normalizeSlotValue(slot);
    if (normalized <= state.slotMeta.unlocked) {
      switchSlot(normalized);
      return;
    }
    if (!state.cloudSync || !state.sessionId) {
      await showAlert({
        title: t('Login required'),
        text: t('Connect your XID to unlock additional slots.'),
        icon: 'info'
      });
      return;
    }
    if (normalized !== state.slotMeta.unlocked + 1) {
      await showAlert({
        title: t('Unlock previous slots'),
        text: t('Unlock slot {count} first.', { count: state.slotMeta.unlocked + 1 }),
        icon: 'info'
      });
      return;
    }
    if (state.slotMeta.unlocked >= SLOT_MAX) {
      await showAlert({
        title: t('Slot limit reached'),
        text: t('All slots are already unlocked.'),
        icon: 'info'
      });
      return;
    }
    if (!(await ensureXpSyncReady())) {
      showCloudSyncPendingAlert();
      return;
    }
    if (getXpLevel() < SLOT_UNLOCK_COST_LEVELS) {
      await showAlert({
        title: t('Not enough levels'),
        text: t('Need {count} levels to unlock this slot.', { count: SLOT_UNLOCK_COST_LEVELS }),
        icon: 'warning'
      });
      return;
    }
    const confirmed = await confirmDialog({
      title: t('Unlock slot {count}?', { count: normalized }),
      text: t('Spend {count} levels to unlock this slot.', { count: SLOT_UNLOCK_COST_LEVELS }),
      confirmText: t('Unlock'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return;
    const spendResult = await spendXpLevels(SLOT_UNLOCK_COST_LEVELS, { reason: 'slot_unlock' });
    if (!spendResult.ok) {
      await showAlert({
        title: t('Not enough XP'),
        text: t('Unable to spend levels right now.'),
        icon: 'error'
      });
      return;
    }
    state.slotMeta.unlocked = normalizeSlotsUnlocked(state.slotMeta.unlocked + 1);
    state.slotMeta.updatedAt = Date.now();
    saveSlotMeta(state.slotMeta);
    if (!state.suppressCloudSettingsSync) {
      scheduleCloudSettingsSync();
    }
    refreshSlotModalIfOpen();
    await showAlert({
      title: t('Slot unlocked'),
      text: t('Slot {count} is now available.', { count: normalized }),
      icon: 'success'
    });
  }

  function switchSlot(slot, options = {}) {
    const normalized = normalizeSlotValue(slot);
    const force = options && options.force === true;
    lowPowerDebug('switch_slot_start', {
      fromSlot: state.activeSlot,
      toSlot: normalized,
      force
    });
    if (normalized === state.activeSlot) return;
    if (!force && normalized > state.slotMeta.unlocked) {
      void attemptUnlockSlot(normalized);
      return;
    }
    state.activeSlot = normalized;
    saveActiveSlot(normalized);
    state.photoFocus = null;
    hideTyping();
    clearQueuePool();
    state.cloudHistoryLoaded = !state.cloudSync;
    state.cloudHistoryOk = !state.cloudSync;
    state.cloudHistoryEmpty = false;
    state.cloudSettingsLoaded = !state.cloudSync;
    state.deferCharacterModal = false;
    state.messages = applyVoiceCacheToMessages(loadFromStorage(STORAGE_KEYS.history, []));
    state.gallery = sanitizeGallery(loadFromStorage(STORAGE_KEYS.gallery, []));
    loadSettings();
    lowPowerDebug('switch_slot_after_load_settings', {
      activeSlot: state.activeSlot,
      lowPowerMode: state.settings.lowPowerMode
    });
    resetMemoryCompactionState();
    applyMembershipGates();
    renderMessages();
    renderGallery();
    updatePhotoInfoButton();
    restoreCompanionAvatar();
    restoreChatroomBackground();
    updateComposerActions();
    ensureInitialScroll();

    const storedId = state.characterId;
    const storedIndex = storedId ? getCharacterIndexById(storedId) : -1;
    state.characterIndex = storedIndex >= 0 ? storedIndex : 0;
    updateCharacterCarousel(false, 0);

    if (state.cloudSync && !state.bulkSlotCloudSync) {
      state.deferCharacterModal = !state.characterId;
      const localSettingsEmpty = isLocalSettingsEmpty();
      const noLocalHistory = !hasLocalConversationHistory();
      const showPullOverlay = localSettingsEmpty && noLocalHistory;
      loadCloudHistory({ showOverlay: showPullOverlay });
      if (localSettingsEmpty) {
        loadCloudSettings({ showOverlay: showPullOverlay });
      } else {
        loadCloudSettings({ showOverlay: showPullOverlay }).finally(() => {
          scheduleCloudSettingsSync();
        });
      }
    } else if (!state.bulkSlotCloudSync && state.messages.length === 0) {
      addSystemMessage(t('Welcome back. Say hi to start.'));
      if (!state.characterId) {
        openCharacterModal();
      }
    }
    refreshSlotModalIfOpen();
  }

  function saveSettingsFromForm() {
    const core = normalizePromptText(dom.corePromptInput ? dom.corePromptInput.value : '');
    const looklike = normalizePromptText(dom.looklikeInput ? dom.looklikeInput.value : '');
    const name = (dom.aiNameInput.value || '').trim();
    const myName = dom.myNameInput ? (dom.myNameInput.value || '').trim() : '';
    const photoStyleValue = dom.photoStyleSelect ? dom.photoStyleSelect.value : '';
    const voiceValue = dom.voiceSelect ? dom.voiceSelect.value : '';
    const aiCoreValue = dom.aiCoreSelect ? dom.aiCoreSelect.value : '';
    const aiTemperatureValue = dom.aiTemperatureInput ? dom.aiTemperatureInput.value : '';
    const lowPowerModeValue = dom.lowPowerToggle
      ? dom.lowPowerToggle.checked
      : state.settings.lowPowerMode;
    lowPowerDebug('save_settings_form_start', {
      lowPowerModeValue,
      activeSlot: state.activeSlot
    });
    const memoryCompactionValue = dom.memoryCompactionToggle
      ? dom.memoryCompactionToggle.checked
      : state.settings.memoryCompaction;
    state.settings.corePrompt = core;
    state.settings.looklike = looklike;
    if (dom.corePromptInput && dom.corePromptInput.value !== core) {
      dom.corePromptInput.value = core;
    }
    if (dom.looklikeInput && dom.looklikeInput.value !== looklike) {
      dom.looklikeInput.value = looklike;
    }
    state.settings.photoStyle = normalizePhotoStyle(photoStyleValue);
    if (dom.photoStyleSelect) {
      dom.photoStyleSelect.value = state.settings.photoStyle;
    }
    state.settings.aiName = name !== '' ? name.slice(0, 60) : DEFAULT_AI_NAME;
    state.settings.myName = normalizeMyName(myName);
    state.settings.voice = normalizeVoiceValue(voiceValue);
    state.settings.aiCore = normalizeAiCoreValue(aiCoreValue);
    state.settings.aiTemperature = normalizeTemperatureValue(aiTemperatureValue);
    state.settings.lowPowerMode = Boolean(lowPowerModeValue);
    applyLowPowerMode(state.settings.lowPowerMode, 'save_settings_form');
    state.settings.memoryCompaction = Boolean(memoryCompactionValue);
    if (!state.settings.memoryCompaction) {
      clearMemoryCompactionQueue();
    }
    persistSettings();
    lowPowerDebug('save_settings_form_done', {
      lowPowerMode: state.settings.lowPowerMode,
      activeSlot: state.activeSlot
    });
    updateAiNameDisplay();
    updateSettingTokenCounts();
    refreshMessageTokenState();
    closeSettingsModal();
  }

  async function clearSettings() {
    const confirmed = await confirmDialog({
      title: t('Clear settings?'),
      text: t('This will reset prompts, look-like presets, and theme.'),
      confirmText: t('Clear settings'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return;
    lowPowerDebug('clear_settings_confirmed');
    state.settings.corePrompt = '';
    state.settings.looklike = '';
    state.settings.photoStyle = DEFAULT_PHOTO_STYLE;
    state.settings.aiName = DEFAULT_AI_NAME;
    state.settings.myName = '';
    state.settings.personaPreset = 'custom';
    state.settings.looklikePreset = 'custom';
    state.settings.theme = getDefaultTheme();
    state.settings.lowPowerMode = false;
    lowPowerDebug('clear_settings_force_low_power_false');
    state.settings.voice = DEFAULT_VOICE;
    state.settings.aiCore = DEFAULT_AI_CORE;
    state.settings.aiTemperature = DEFAULT_AI_TEMPERATURE;
    state.settings.gradientStart = '';
    state.settings.gradientEnd = '';
    state.settings.memoryCompaction = true;
    state.settings.memorySummary = '';
    resetMemoryCompactionState();
    applyTheme(state.settings.theme);
    applyGradientTheme(state.settings.gradientStart, state.settings.gradientEnd);
    applyLowPowerMode(state.settings.lowPowerMode);
    persistSettings();
    updateAiNameDisplay();
    dom.aiNameInput.value = DEFAULT_AI_NAME;
    if (dom.myNameInput) {
      dom.myNameInput.value = '';
    }
    dom.corePromptInput.value = '';
    dom.looklikeInput.value = '';
    if (dom.photoStyleSelect) {
      dom.photoStyleSelect.value = DEFAULT_PHOTO_STYLE;
    }
    if (dom.themeToggle) {
      dom.themeToggle.checked = state.settings.theme === 'dark';
    }
    if (dom.lowPowerToggle) {
      dom.lowPowerToggle.checked = false;
    }
    if (dom.voiceSelect) {
      dom.voiceSelect.value = DEFAULT_VOICE;
    }
    if (dom.aiCoreSelect) {
      populateAiCoreOptions(true);
      state.settings.aiCore = normalizeAiCoreValue(DEFAULT_AI_CORE);
      dom.aiCoreSelect.value = state.settings.aiCore;
    }
    if (dom.aiTemperatureInput) {
      syncAiTemperatureInput(DEFAULT_AI_TEMPERATURE);
    }
    if (dom.memoryCompactionToggle) {
      dom.memoryCompactionToggle.checked = true;
    }
    syncGradientInputs();
    updateSettingTokenCounts();
    refreshMessageTokenState();
    closeSettingsModal();
  }

  async function freshRestart() {
    const confirmed = await confirmDialog({
      title: t('Fresh restart?'),
      text: t('This clears chat history, gallery, background, settings, and character selection on this device.'),
      confirmText: t('Restart'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return;
    lowPowerDebug('fresh_restart_confirmed');
    const activeSlot = normalizeSlotValue(state.activeSlot);
    if (state.cloudSync && state.sessionId) {
      const clearedHistory = await clearCloudHistory();
      if (!clearedHistory) {
        addSystemMessage(t('Cloud reset failed. Try again.'));
        return;
      }
      const clearedSettings = await resetCloudSettingsToDefault();
      if (!clearedSettings) {
        addSystemMessage(t('Cloud sync failed. Try again.'));
        return;
      }
    }
    try {
      sessionStorage.setItem(FORCE_CHARACTER_MODAL_KEY, '1');
    } catch (err) {
      // ignore storage errors
    }
    const keys = new Set();
    const historyKey = getSlotStorageKey(STORAGE_KEYS.history, activeSlot);
    const galleryKey = getSlotStorageKey(STORAGE_KEYS.gallery, activeSlot);
    const resetKey = getCloudResetStorageKey(activeSlot);
    keys.add(historyKey);
    keys.add(galleryKey);
    keys.add(getSlotStorageKey(STORAGE_KEYS.background, activeSlot));
    keys.add(getSlotStorageKey(STORAGE_KEYS.photoUnlocks, activeSlot));
    keys.add(getSlotVoiceCacheKey(activeSlot));
    keys.add(getSlotAvatarKey(activeSlot));
    Object.values(SETTINGS_KEYS).forEach((key) => keys.add(getSlotSettingsKey(key, activeSlot)));
    keys.add(SETTINGS_KEYS.lowPowerMode);
    keys.add(GLOBAL_LOW_POWER_MODE_KEY);
    keys.add(DEVICE_LOW_POWER_MODE_KEY);
    keys.add(getSlotSettingsXidKey(activeSlot));
    keys.forEach((key) => localStorage.removeItem(key));
    try {
      sessionStorage.removeItem(DEVICE_LOW_POWER_MODE_SESSION_KEY);
    } catch (err) {
      // ignore storage errors
    }
    writeWindowValue(DEVICE_LOW_POWER_MODE_WINDOW_KEY, '');
    try {
      writeCookieValue(DEVICE_LOW_POWER_MODE_COOKIE, '');
    } catch (err) {
      // ignore cookie errors
    }
    localStorage.setItem(historyKey, '[]');
    localStorage.setItem(galleryKey, '[]');
    localStorage.setItem(resetKey, String(Date.now()));
    saveActiveSlot(activeSlot);
    window.location.reload();
  }

  function requirePhotoEditingAccess(options = {}) {
    const membershipInfo = getMembershipInfo();
    if (membershipInfo.isFree) {
      showVipPurchaseAlert('Purchase VIP to unlock photo tools.');
      return false;
    }
    if (options.requiresGpt4 && !membershipInfo.isGpt4Plus) {
      showVipPurchaseAlert('Upgrade to GPT4 VIP or higher to use 4K Enhance.');
      return false;
    }
    return true;
  }

  function hasAdvancedXrayAccess(info = getMembershipInfo()) {
    if (!info) return false;
    if (info.isAdmin || info.isUltra || info.isUltra500) {
      return true;
    }
    if (info.isVip && /GPT\s*[- ]?\s*(4|5)/.test(info.upper)) {
      return true;
    }
    return false;
  }

  function requireAdvancedXrayAccess() {
    const membershipInfo = getMembershipInfo();
    if (hasAdvancedXrayAccess(membershipInfo)) {
      return true;
    }
    if (!membershipInfo.isFree && !membershipInfo.isVip) {
      showVipPurchaseAlertWithLink('Advanced X-Ray is a GPT4 VIP or above only feature. {cta} to unlock it.');
      return false;
    }
    if (!isXpEligible()) {
      void showAlert({
        title: t('Login required'),
        text: t('Connect your XID to spend XP levels.'),
        icon: 'info'
      });
      return false;
    }
    if (!state.xpSyncLoaded) {
      showCloudSyncPendingAlert();
      void syncXpState({ force: true });
      return false;
    }
    if (getXpLevel() <= XP_ADVANCED_XRAY_COST_LEVELS) {
      void showAlert({
        title: t('Not enough levels'),
        text: t('Need more than {count} levels to use Advanced X-Ray.', { count: XP_ADVANCED_XRAY_COST_LEVELS }),
        icon: 'warning'
      });
      return false;
    }
    return true;
  }

  async function confirmAdvancedXrayTrialSpend() {
    if (hasAdvancedXrayAccess()) {
      return true;
    }
    if (!isXpEligible()) {
      await showAlert({
        title: t('Login required'),
        text: t('Connect your XID to spend XP levels.'),
        icon: 'info'
      });
      return false;
    }
    if (!(await ensureXpSyncReady())) {
      await showAlert({
        title: t('Pulling data from cloud...'),
        text: t('Syncing from cloud. Try again in a moment.'),
        icon: 'info'
      });
      return false;
    }
    const costLevels = XP_ADVANCED_XRAY_COST_LEVELS;
    if (getXpLevel() <= costLevels) {
      await showAlert({
        title: t('Not enough levels'),
        text: t('Need more than {count} levels to use Advanced X-Ray.', { count: costLevels }),
        icon: 'warning'
      });
      return false;
    }
    const confirmed = await confirmDialog({
      title: t('Advanced X Ray'),
      text: t('Advanced X-Ray is a GPT4 VIP or above only feature, but you can try it for {count} XP Levels.', { count: costLevels }),
      confirmText: t('Spend {count} Levels', { count: costLevels }),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return false;
    const spendResult = await spendXpLevels(costLevels, { reason: 'xray_trial' });
    if (!spendResult.ok) {
      await showAlert({
        title: t('Not enough XP'),
        text: t('Unable to spend levels right now.'),
        icon: 'error'
      });
      return false;
    }
    return true;
  }

  async function runPhotoTransform(action, label, options = {}) {
    const source = state.photoFocus ? resolveMediaUrl(state.photoFocus.url) : '';
    if (!source) return null;
    const labelText = t(label);
    setPhotoStatus(t('{label} processing...', { label: labelText }));
    setPhotoActionsDisabled(true);
    const promptOverride = typeof options.promptOverride === 'string'
      ? options.promptOverride.trim()
      : '';
    const xpTrial = options && options.xpTrial === true;

    try {
      const params = new URLSearchParams({
        URL: source,
        ACTION: action,
        SAVE: 'YES',
        ROOM: '',
        XID: '',
        membership: getMembership()
      });
      if (xpTrial) {
        params.set('xp_trial', '1');
      }
      if (action === 'NUDE' && promptOverride !== '') {
        params.set('PROMPT', promptOverride.slice(0, 1600));
      }
      const response = await fetch(`${CONFIG.photoTransformEndpoint}?${params.toString()}`);
      if (!response.ok) {
        setPhotoStatus(t('Request failed. Try again.'));
        addSystemMessage(t('{label} failed. Try again.', { label: labelText }));
        return null;
      }
      const data = await response.json();
      if (!data.ok) {
        const errorText = data.error || t('Request failed. Try again.');
        setPhotoStatus(errorText);
        addSystemMessage(t('{label} failed. Try again.', { label: labelText }));
        return null;
      }
      const remoteUrl = data.url || '';
      const exif = normalizeExif(data.exif);

      if (!remoteUrl) {
        setPhotoStatus(t('Request queued. Try again in a moment.'));
        addSystemMessage(t('{label} queued. No URL returned yet.', { label: labelText }));
        return null;
      }

      const storedUrl = await persistRemoteMedia(remoteUrl);
      const finalUrl = storedUrl || remoteUrl;
      const assistantText = action === 'NUDE'
        ? t('Here is your X-Ray photo.')
        : t('Here is your 4K enhanced photo.');
      const messageId = randomId(10);

      addMessage({
        id: messageId,
        role: 'assistant',
        text: assistantText,
        mediaUrl: finalUrl,
        mediaType: 'image',
        timestamp: new Date().toISOString(),
        meta: label,
        exif
      });

      trackGallery({ url: finalUrl, type: 'image', prompt: label, source: 'assistant' });
      state.photoFocus = { url: finalUrl, messageId, exif };
      dom.photoModalImage.src = finalUrl;
      setPhotoStatus(t('{label} complete.', { label: labelText }));
      updatePhotoInfoButton();
      updatePhotoShareButton();
      return { url: finalUrl, messageId };
    } catch (err) {
      setPhotoStatus(t('{label} failed. Try again.', { label: labelText }));
      addSystemMessage(t('{label} failed. Try again.', { label: labelText }));
      return null;
    } finally {
      setPhotoActionsDisabled(false);
    }
  }

  function setAdvancedXrayPreview(url) {
    if (!dom.advancedXrayPreview || !dom.advancedXrayPreviewImage) return;
    if (url) {
      const resolved = resolveMediaUrl(url);
      if (resolved) {
        dom.advancedXrayPreviewImage.src = resolved;
        dom.advancedXrayPreview.hidden = false;
        dom.advancedXrayPreview.setAttribute('aria-hidden', 'false');
        return;
      }
    }
    dom.advancedXrayPreviewImage.removeAttribute('src');
    dom.advancedXrayPreview.hidden = true;
    dom.advancedXrayPreview.setAttribute('aria-hidden', 'true');
  }

  function openAdvancedXrayModal(promptText, imageUrl) {
    if (!dom.advancedXrayModal) return;
    if (dom.advancedXrayPromptInput) {
      dom.advancedXrayPromptInput.rows = 3;
      dom.advancedXrayPromptInput.dataset.minRows = '3';
      dom.advancedXrayPromptInput.value = promptText || '';
      requestAnimationFrame(() => resizePromptInput(dom.advancedXrayPromptInput));
    }
    setAdvancedXrayBusy(false);
    setAdvancedXrayPreview(imageUrl);
    dom.advancedXrayModal.classList.add('active');
    dom.advancedXrayModal.setAttribute('aria-hidden', 'false');
    restoreChatScroll(advancedXrayScrollTop);
  }

  function closeAdvancedXrayModal() {
    if (!dom.advancedXrayModal) return;
    dom.advancedXrayModal.classList.remove('active');
    dom.advancedXrayModal.setAttribute('aria-hidden', 'true');
    if (dom.advancedXrayPromptInput) {
      dom.advancedXrayPromptInput.value = '';
      dom.advancedXrayPromptInput.rows = 3;
      dom.advancedXrayPromptInput.dataset.minRows = '3';
      resizePromptInput(dom.advancedXrayPromptInput);
    }
    setAdvancedXrayPreview('');
    restoreChatScroll(advancedXrayScrollTop);
  }

  function setAdvancedXrayBusy(isBusy) {
    if (dom.advancedXrayRunButton) {
      dom.advancedXrayRunButton.disabled = isBusy;
      dom.advancedXrayRunButton.textContent = isBusy ? t('Processing...') : t('Run X-Ray');
    }
    if (dom.advancedXrayPromptInput) {
      dom.advancedXrayPromptInput.disabled = isBusy;
    }
  }

  async function handleAdvancedXraySubmit() {
    if (advancedXraySubmitting) return;
    const value = dom.advancedXrayPromptInput
      ? String(dom.advancedXrayPromptInput.value || '').trim()
      : '';
    if (!value) {
      addSystemMessage(t('Advanced X-Ray cancelled: prompt is empty.'));
      return;
    }
    advancedXraySubmitting = true;
    const needsTrial = !hasAdvancedXrayAccess();
    if (needsTrial) {
      const ok = await confirmAdvancedXrayTrialSpend();
      if (!ok) {
        advancedXraySubmitting = false;
        return;
      }
    }
    setAdvancedXrayBusy(true);
    const result = await runPhotoTransform('NUDE', 'X-Ray', {
      promptOverride: value,
      xpTrial: needsTrial
    });
    advancedXraySubmitting = false;
    setAdvancedXrayBusy(false);
    if (result && result.url) {
      closeAdvancedXrayModal();
      openPhotoModal(result.url, result.messageId);
    }
  }

  async function runAdvancedXray() {
    if (!state.photoFocus || !state.photoFocus.url) return;
    advancedXrayScrollTop = dom.chatLog ? dom.chatLog.scrollTop : 0;
    freezeInitialScroll();
    closePhotoModal({ preserveFocus: true });
    const focus = state.photoFocus;
    const messageId = focus.messageId || '';
    const message = messageId ? state.messages.find((msg) => msg.id === messageId) : null;
    let exif = normalizeExif(message && message.exif ? message.exif : focus.exif);

    if (!exif) {
      const resolved = resolveMediaUrl(focus.url);
      exif = await fetchPhotoExif(resolved);
      if (exif) {
        if (messageId) {
          updateMessageExif(messageId, exif);
        }
        state.photoFocus = { ...focus, exif };
      }
    }

    const originalPrompt = (exif && exif.prompt) ? exif.prompt : '';
    openAdvancedXrayModal(originalPrompt, focus.url);
  }

  function getPhotoSharePlatforms() {
    return [
      {
        id: 'facebook',
        label: 'Facebook',
        mode: 'link',
        buildShareUrl: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      },
      {
        id: 'instagram',
        label: 'Instagram',
        mode: 'file',
        url: 'https://www.instagram.com/create/select/'
      },
      {
        id: 'tiktok',
        label: 'TikTok',
        mode: 'file',
        url: 'https://www.tiktok.com/upload'
      },
      {
        id: 'reddit',
        label: 'Reddit',
        mode: 'link',
        buildShareUrl: ({ url, title }) => (
          `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        )
      },
      {
        id: 'discord',
        label: 'Discord',
        mode: 'file',
        url: 'https://discord.com/channels/@me'
      },
      {
        id: 'wechat',
        label: 'WeChat',
        mode: 'file',
        url: 'https://wx.qq.com/'
      },
      {
        id: 'x',
        label: 'X',
        mode: 'link',
        buildShareUrl: ({ url, text }) => (
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        )
      },
      { id: 'custom', label: 'Others', translate: true, mode: 'share' }
    ];
  }

  function buildPhotoShareOptions(platforms) {
    const options = {};
    platforms.forEach((platform) => {
      const label = platform.translate ? t(platform.label) : platform.label;
      options[platform.id] = label;
    });
    return options;
  }

  function normalizeShareUrl(value) {
    const trimmed = String(value || '').trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    return `https://${trimmed}`;
  }

  async function openPhotoShareOptions() {
    if (!state.photoFocus || !state.photoFocus.url) return;
    const source = resolveMediaUrl(state.photoFocus.url);
    if (!source) return;
    const platforms = getPhotoSharePlatforms();
    const chatScrollTop = dom.chatLog ? dom.chatLog.scrollTop : 0;
    let selectedId = '';
    if (window.Swal && typeof window.Swal.fire === 'function') {
      const result = await window.Swal.fire({
        title: t('Share on Social Media'),
        text: t('Choose a platform.'),
        icon: 'info',
        input: 'select',
        inputOptions: buildPhotoShareOptions(platforms),
        inputPlaceholder: t('Choose an option.'),
        showCancelButton: true,
        confirmButtonText: t('Share'),
        cancelButtonText: t('Cancel'),
        reverseButtons: true,
        focusCancel: true,
        heightAuto: false,
        scrollbarPadding: false,
        willOpen: () => restoreChatScroll(chatScrollTop),
        didOpen: () => restoreChatScroll(chatScrollTop),
        didClose: () => restoreChatScroll(chatScrollTop)
      });
      restoreChatScroll(chatScrollTop);
      if (!result.isConfirmed) return;
      selectedId = String(result.value || '');
    } else {
      const fallback = prompt(t('Choose a platform.'), 'facebook');
      restoreChatScroll(chatScrollTop);
      selectedId = fallback ? fallback.trim().toLowerCase() : '';
    }
    if (!selectedId) return;
    let platform = platforms.find((item) => item.id === selectedId);
    if (!platform) {
      platform = platforms.find((item) => item.label.toLowerCase() === selectedId);
    }
    if (!platform) {
      platform = { id: 'custom', label: selectedId, custom: true };
    }

    // Others uses the generic share sheet; no custom URL prompt.

    await sharePhotoToPlatform(platform, source);
  }

  async function openVideoShareOptions() {
    if (!state.videoFocus || !state.videoFocus.url) return;
    const source = resolveMediaUrl(state.videoFocus.url);
    if (!source) return;
    const platforms = getPhotoSharePlatforms();
    const chatScrollTop = dom.chatLog ? dom.chatLog.scrollTop : 0;
    let selectedId = '';
    if (window.Swal && typeof window.Swal.fire === 'function') {
      const result = await window.Swal.fire({
        title: t('Share on Social Media'),
        text: t('Choose a platform.'),
        icon: 'info',
        input: 'select',
        inputOptions: buildPhotoShareOptions(platforms),
        inputPlaceholder: t('Choose an option.'),
        showCancelButton: true,
        confirmButtonText: t('Share'),
        cancelButtonText: t('Cancel'),
        reverseButtons: true,
        focusCancel: true,
        heightAuto: false,
        scrollbarPadding: false,
        willOpen: () => restoreChatScroll(chatScrollTop),
        didOpen: () => restoreChatScroll(chatScrollTop),
        didClose: () => restoreChatScroll(chatScrollTop)
      });
      restoreChatScroll(chatScrollTop);
      if (!result.isConfirmed) return;
      selectedId = String(result.value || '');
    } else {
      const fallback = prompt(t('Choose a platform.'), 'facebook');
      restoreChatScroll(chatScrollTop);
      selectedId = fallback ? fallback.trim().toLowerCase() : '';
    }
    if (!selectedId) return;
    let platform = platforms.find((item) => item.id === selectedId);
    if (!platform) {
      platform = platforms.find((item) => item.label.toLowerCase() === selectedId);
    }
    if (!platform) {
      platform = { id: 'custom', label: selectedId, custom: true };
    }

    await shareVideoToPlatform(platform, source);
  }

  function applyPhotoWatermark(ctx, width, height, text) {
    if (!text) return;
    const size = Math.max(14, Math.round(Math.min(width, height) * 0.035));
    const padding = Math.max(8, Math.round(size * 0.7));
    ctx.save();
    ctx.font = `600 ${size}px \"Poppins\", \"Segoe UI\", sans-serif`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = Math.max(2, Math.round(size * 0.25));
    ctx.fillText(text, width - padding, height - padding);
    ctx.restore();
  }

  async function createWatermarkedPhotoBlob(imageUrl) {
    const response = await fetch(imageUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Image fetch failed.');
    }
    const blob = await response.blob();
    const img = await loadImageFromBlob(blob);
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width || 600;
    canvas.height = img.naturalHeight || img.height || 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas unavailable.');
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    applyPhotoWatermark(ctx, canvas.width, canvas.height, t('Generated on Muah AI'));
    if (!canvas.toBlob) {
      const dataUrl = canvas.toDataURL('image/png');
      const dataResponse = await fetch(dataUrl);
      return dataResponse.blob();
    }
    const outputBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!outputBlob) {
      throw new Error('Image conversion failed.');
    }
    return outputBlob;
  }

  async function uploadShareImageBlob(blob) {
    if (!blob) return '';
    try {
      const formData = new FormData();
      const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
      formData.append('file', blob, `share_${stamp}.png`);
      const response = await fetch(CONFIG.uploadEndpoint, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data && data.ok && data.url) {
        return resolveMediaUrl(data.url);
      }
    } catch (err) {
      // ignore upload errors
    }
    return '';
  }

  async function buildPlatformShareLink(platform, sourceUrl, shareBlob, shareText, shareTitle) {
    if (!platform || typeof platform.buildShareUrl !== 'function') {
      return '';
    }
    let shareUrl = '';
    if (shareBlob) {
      shareUrl = await uploadShareImageBlob(shareBlob);
    }
    const finalUrl = shareUrl || sourceUrl;
    return platform.buildShareUrl({
      url: finalUrl,
      text: shareText,
      title: shareTitle
    });
  }

  async function sharePhotoToPlatform(platform, sourceUrl) {
    setPhotoStatus('Preparing share...');
    setPhotoActionsDisabled(true);
    const shareText = t('Generated on Muah AI');
    const shareTitle = t('Muah AI Photo');
    try {
      let shareBlob = null;
      try {
        shareBlob = await createWatermarkedPhotoBlob(sourceUrl);
      } catch (err) {
        try {
          const response = await fetch(sourceUrl, { cache: 'no-store' });
          if (response.ok) {
            shareBlob = await response.blob();
          }
        } catch (fallbackErr) {
          shareBlob = null;
        }
      }
      const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
      const filename = `${sanitizeFilename(state.sessionId || 'muah')}_photo_${stamp}.png`;
      const file = shareBlob && typeof File === 'function'
        ? new File([shareBlob], filename, { type: shareBlob.type || 'image/png' })
        : null;

      const shareLink = await buildPlatformShareLink(
        platform,
        sourceUrl,
        shareBlob,
        shareText,
        shareTitle
      );

      if (shareLink) {
        window.open(shareLink, '_blank', 'noopener');
        claimPhotoShareXp(sourceUrl);
        setPhotoStatus('Share link opened.');
        return;
      }

      if (!shareBlob) {
        if (platform && platform.url) {
          window.open(platform.url, '_blank', 'noopener');
        }
        await showAlert({
          title: t('Share failed'),
          text: t('Unable to prepare the share image. Please try again.'),
          icon: 'error'
        });
        return;
      }

      const canShareFiles = Boolean(
        file && navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))
      );
      if (canShareFiles) {
        try {
          await navigator.share({ title: shareTitle, text: shareText, files: [file] });
          claimPhotoShareXp(sourceUrl);
          setPhotoStatus('Share sheet opened.');
          return;
        } catch (err) {
          if (err && err.name === 'AbortError') {
            setPhotoStatus('Share canceled.');
            return;
          }
          // fall through to download fallback
        }
      }

      downloadBlob(shareBlob, filename);
      if (platform && platform.url) {
        window.open(platform.url, '_blank', 'noopener');
      }
      claimPhotoShareXp(sourceUrl);
      const platformLabel = platform && platform.label
        ? platform.label
        : t('your social platform');
      await showAlert({
        title: t('Share Ready'),
        text: t('Watermarked image downloaded. Upload it to {platform}.', {
          platform: platformLabel
        }),
        icon: 'success'
      });
    } catch (err) {
      await showAlert({
        title: t('Share failed'),
        text: t('Unable to prepare the share image. Please try again.'),
        icon: 'error'
      });
    } finally {
      setPhotoActionsDisabled(false);
    }
  }

  async function shareVideoToPlatform(platform, sourceUrl) {
    setVideoStatus('Preparing share...');
    setVideoActionsDisabled(true);
    const shareText = t('Generated on Muah AI');
    const shareTitle = t('Muah AI Video');
    try {
      const shareLink = await buildPlatformShareLink(
        platform,
        sourceUrl,
        null,
        shareText,
        shareTitle
      );

      if (shareLink) {
        window.open(shareLink, '_blank', 'noopener');
        claimVideoShareXp(sourceUrl);
        setVideoStatus('Share link opened.');
        return;
      }

      const canShareLink = Boolean(
        navigator.share && (!navigator.canShare || navigator.canShare({ url: sourceUrl }))
      );
      if (canShareLink) {
        try {
          await navigator.share({ title: shareTitle, text: shareText, url: sourceUrl });
          claimVideoShareXp(sourceUrl);
          setVideoStatus('Share sheet opened.');
          return;
        } catch (err) {
          if (err && err.name === 'AbortError') {
            setVideoStatus('Share canceled.');
            return;
          }
          // fall through to clipboard fallback
        }
      }

      const copied = await copyTextToClipboard(sourceUrl);
      if (platform && platform.url) {
        window.open(platform.url, '_blank', 'noopener');
      }
      claimVideoShareXp(sourceUrl);
      setVideoStatus(copied ? 'Share link opened.' : 'Share Ready');
    } catch (err) {
      await showAlert({
        title: t('Share failed'),
        text: t('Share failed'),
        icon: 'error'
      });
    } finally {
      setVideoActionsDisabled(false);
    }
  }

  function attachEvents() {
    if (dom.sendButton) {
      dom.sendButton.addEventListener('click', handleSend);
    }
    dom.messageInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    });
    dom.messageInput.addEventListener('input', updateComposerActions);
    dom.messageInput.addEventListener('paste', handleMessagePaste);

    dom.emojiButton.addEventListener('click', toggleEmojiPanel);
    dom.uploadButton.addEventListener('click', () => dom.fileInput.click());
    dom.fileInput.addEventListener('change', handleFileUpload);
    if (dom.chatroom) {
      dom.chatroom.addEventListener('dragenter', handleChatroomDragEnter);
      dom.chatroom.addEventListener('dragover', handleChatroomDragOver);
      dom.chatroom.addEventListener('dragleave', handleChatroomDragLeave);
      dom.chatroom.addEventListener('drop', handleChatroomDrop);
    }
    dom.recordButton.addEventListener('click', startRecording);
    dom.cancelRecordButton.addEventListener('click', cancelRecording);
    dom.recordSendButton.addEventListener('click', sendRecording);

    dom.callButton.addEventListener('click', () => openCallModal('phone'));
    dom.callButton.addEventListener('mouseenter', () => {
      dom.callButton.classList.add('stop-shake');
    }, { once: true });
    dom.callButton.addEventListener('focus', () => {
      dom.callButton.classList.add('stop-shake');
    }, { once: true });
    if (dom.vipCtaButton) {
      dom.vipCtaButton.addEventListener('click', openVipCta);
    }
    if (dom.vipLabel) {
      dom.vipLabel.addEventListener('mouseenter', startVipCountdown);
      dom.vipLabel.addEventListener('focus', startVipCountdown);
      dom.vipLabel.addEventListener('mouseleave', stopVipCountdown);
      dom.vipLabel.addEventListener('blur', stopVipCountdown);
    }
    if (dom.takeBreakButton) {
      dom.takeBreakButton.addEventListener('click', openTakeBreak);
    }
    if (dom.joinCommunityButton) {
      dom.joinCommunityButton.addEventListener('click', openJoinCommunity);
    }
    if (dom.xpBar) {
      dom.xpBar.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openXpShop();
      });
      dom.xpBar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openXpShop();
        }
      });
    }
    if (dom.footerXpBack) {
      dom.footerXpBack.addEventListener('click', (event) => {
        if (event.defaultPrevented) return;
        if (dom.footerXpBack.getAttribute('aria-hidden') === 'true') return;
        openXpShop();
      });
    }
    if (dom.footerXpFlip) {
      dom.footerXpFlip.addEventListener('click', () => {
        if (!dom.footerXpBack) return;
        if (dom.footerXpBack.getAttribute('aria-hidden') !== 'false') return;
        openXpShop();
      });
    }
    if (dom.videoButton) {
      dom.videoButton.addEventListener('click', () => openCallModal('video'));
    }
    dom.closeCall.addEventListener('click', closeCallModal);
    dom.startCall.addEventListener('click', startCall);
    dom.endCall.addEventListener('click', endCall);

    dom.galleryButton.addEventListener('click', openGallery);
    dom.closeGallery.addEventListener('click', closeGallery);
    bindMusicEventHandlers();

    dom.resetButton.addEventListener('click', resetChat);

    dom.settingsButton.addEventListener('click', openSettingsModal);
    if (dom.cloudLabel) {
      dom.cloudLabel.addEventListener('click', openCloudToolsModal);
    }
    if (dom.closeCloudToolsModal) {
      dom.closeCloudToolsModal.addEventListener('click', closeCloudToolsModal);
    }
    if (dom.pullCloudButton) {
      dom.pullCloudButton.addEventListener('click', pullCloudSync);
    }
    if (dom.pushCloudButton) {
      dom.pushCloudButton.addEventListener('click', pushCloudSync);
    }
    if (dom.wipeCloudButton) {
      dom.wipeCloudButton.addEventListener('click', wipeCloudData);
    }
    if (dom.downloadCloudDataButton) {
      dom.downloadCloudDataButton.addEventListener('click', downloadOfflineData);
    }
    if (dom.uploadCloudDataButton) {
      dom.uploadCloudDataButton.addEventListener('click', uploadOfflineData);
    }
    if (dom.cloudDataUploadInput) {
      dom.cloudDataUploadInput.addEventListener('change', (event) => {
        const target = event.target;
        const file = target && target.files ? target.files[0] : null;
        void handleOfflineUploadFile(file);
      });
    }
    if (dom.exportChatButton) {
      dom.exportChatButton.addEventListener('click', openExportChatOptions);
    }
    if (dom.cloudToolsModal) {
      dom.cloudToolsModal.addEventListener('click', (event) => {
        if (event.target === dom.cloudToolsModal) {
          closeCloudToolsModal();
        }
      });
    }
    if (dom.avatar) {
      dom.avatar.addEventListener('click', (event) => {
        if (event.target && event.target.closest('.swap-avatar-button')) return;
        openSlotModal();
      });
      dom.avatar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openSlotModal();
        }
      });
    }
    if (dom.swapSlotButton) {
      dom.swapSlotButton.addEventListener('click', openSlotModal);
    }
    if (dom.closeSlotModal) {
      dom.closeSlotModal.addEventListener('click', closeSlotModal);
    }
    if (dom.slotGrid) {
      dom.slotGrid.addEventListener('click', handleSlotGridClick);
    }
    if (dom.slotModal) {
      dom.slotModal.addEventListener('click', (event) => {
        if (event.target === dom.slotModal) {
          closeSlotModal();
        }
      });
    }
    if (dom.communityButton) {
      dom.communityButton.addEventListener('click', openCommunityModal);
    }
    if (dom.closeCommunity) {
      dom.closeCommunity.addEventListener('click', closeCommunityModal);
    }
    if (dom.communitySearchButton) {
      dom.communitySearchButton.addEventListener('click', () => {
        fetchCommunityPosts(dom.communitySearchInput ? dom.communitySearchInput.value : '');
      });
    }
    if (dom.communitySearchInput) {
      dom.communitySearchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          fetchCommunityPosts(dom.communitySearchInput.value);
        }
      });
    }
    if (dom.communitySortButtons && dom.communitySortButtons.length) {
      dom.communitySortButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const sort = button && button.dataset ? button.dataset.communitySort : '';
          const normalized = normalizeCommunitySort(sort);
          const force = normalized === 'random' && state.community.sort === 'random';
          setCommunitySort(sort, { force });
        });
      });
    }
    if (dom.communityScroll) {
      dom.communityScroll.addEventListener('scroll', () => {
        setCommunityVideoScrollLock();
        maybeLoadCommunityMore();
      }, { passive: true });
    }
    if (dom.communitySheetClose) {
      dom.communitySheetClose.addEventListener('click', closeCommunitySheet);
    }
    if (dom.communitySheet) {
      dom.communitySheet.addEventListener('click', (event) => {
        if (event.target === dom.communitySheet) {
          closeCommunitySheet();
        }
      });
    }
    if (dom.dreamCharacterDropzone && dom.dreamCharacterInput) {
      dom.dreamCharacterDropzone.addEventListener('click', () => {
        if (!state.dreamCharacter.busy && !state.dreamCharacter.locked) {
          dom.dreamCharacterInput.click();
        }
      });
      dom.dreamCharacterDropzone.addEventListener('dragover', handleDreamCharacterDragOver);
      dom.dreamCharacterDropzone.addEventListener('dragleave', handleDreamCharacterDragLeave);
      dom.dreamCharacterDropzone.addEventListener('drop', handleDreamCharacterDrop);
      dom.dreamCharacterInput.addEventListener('change', handleDreamCharacterInput);
    }
    if (dom.dreamCharacterModal) {
      document.addEventListener('paste', handleDreamCharacterPaste);
    }
    if (dom.closeDreamCharacter) {
      dom.closeDreamCharacter.addEventListener('click', closeDreamCharacterModal);
    }
    if (dom.dreamCharacterChatNow) {
      dom.dreamCharacterChatNow.addEventListener('click', handleDreamCharacterChatNow);
    }
    window.addEventListener('resize', () => {
      if (!isCommunitySheetMode()) {
        closeCommunitySheet();
      }
      resizeMessageInput(true);
      updateScrollToBottomButton();
    });
    dom.closeSettings.addEventListener('click', closeSettingsModal);
    dom.saveSettingsButton.addEventListener('click', saveSettingsFromForm);
    dom.clearSettingsButton.addEventListener('click', clearSettings);
    if (dom.freshRestartButton) {
      dom.freshRestartButton.addEventListener('click', freshRestart);
    }
    if (dom.shareCardButton) {
      dom.shareCardButton.addEventListener('click', openShareCardOptions);
    }
    if (dom.themeToggle) {
      dom.themeToggle.addEventListener('change', () => {
        const next = dom.themeToggle.checked ? 'dark' : 'light';
        setTheme(next);
      });
    }
    if (dom.lowPowerToggle) {
      dom.lowPowerToggle.addEventListener('change', () => {
        const next = Boolean(dom.lowPowerToggle.checked);
        lowPowerDebug('toggle_change_listener_attachEvents', { next });
        state.settings.lowPowerMode = next;
        applyLowPowerMode(next, 'settings_toggle_change_listener');
        persistSettings();
      });
    }
    if (dom.advancedSettings) {
      const summary = dom.advancedSettings.querySelector('summary');
      if (summary) {
        summary.addEventListener('click', (event) => {
          if (dom.advancedSettings.classList.contains('is-locked')) {
            event.preventDefault();
            showVipPurchaseAlert('Upgrade to VIP to unlock advanced options.');
          }
        });
      }
    }
    if (dom.gradientStartInput && dom.gradientEndInput) {
      const handleGradientChange = () => {
        const start = normalizeGradientColor(dom.gradientStartInput.value);
        const end = normalizeGradientColor(dom.gradientEndInput.value);
        state.settings.gradientStart = start;
        state.settings.gradientEnd = end;
        applyGradientTheme(start, end);
        persistSettings();
      };
      dom.gradientStartInput.addEventListener('input', handleGradientChange);
      dom.gradientEndInput.addEventListener('input', handleGradientChange);
    }
    if (dom.gradientResetButton) {
      dom.gradientResetButton.addEventListener('click', () => {
        state.settings.gradientStart = '';
        state.settings.gradientEnd = '';
        applyGradientTheme('', '');
        syncGradientInputs();
        persistSettings();
      });
    }
    if (dom.aiTemperatureInput) {
      dom.aiTemperatureInput.addEventListener('input', () => {
        updateAiTemperatureDisplay(dom.aiTemperatureInput.value);
      });
    }
    if (dom.promptDurationSelect) {
      dom.promptDurationSelect.addEventListener('change', () => {
        state.promptVideoGen2Duration = normalizeVideoGen2Duration(dom.promptDurationSelect.value);
      });
    }
    if (dom.promptNsfwToggle) {
      dom.promptNsfwToggle.addEventListener('change', () => {
        state.promptVideoGen2Nsfw = Boolean(dom.promptNsfwToggle.checked);
      });
    }
    document.querySelectorAll('.preset-button[data-preset-group="persona"]').forEach((button) => {
      button.addEventListener('click', () => {
        const preset = button.dataset.preset || 'custom';
        state.settings.personaPreset = preset;
        if (preset !== 'custom') {
          applyPersonaPreset(preset);
        }
        updatePresetButtons('persona', preset);
        persistSettings();
      });
    });
    document.querySelectorAll('.preset-button[data-preset-group="looklike"]').forEach((button) => {
      button.addEventListener('click', () => {
        const preset = button.dataset.preset || 'custom';
        state.settings.looklikePreset = preset;
        if (preset !== 'custom') {
          applyLooklikePreset(preset);
        }
        updatePresetButtons('looklike', preset);
        persistSettings();
      });
    });
    dom.aiNameInput.addEventListener('input', () => {
      const name = (dom.aiNameInput.value || '').trim();
      state.settings.aiName = name !== '' ? name.slice(0, 60) : DEFAULT_AI_NAME;
      updateAiNameDisplay();
    });
    if (dom.myNameInput) {
      dom.myNameInput.addEventListener('input', () => {
        state.settings.myName = normalizeMyName(dom.myNameInput.value);
      });
    }
    if (dom.photoStyleSelect) {
      dom.photoStyleSelect.addEventListener('change', () => {
        state.settings.photoStyle = normalizePhotoStyle(dom.photoStyleSelect.value);
        dom.photoStyleSelect.value = state.settings.photoStyle;
        persistSettings();
      });
    }
    if (dom.aiCoreSelect) {
      dom.aiCoreSelect.addEventListener('change', () => {
        const nextCore = normalizeAiCoreValue(dom.aiCoreSelect.value);
        state.settings.aiCore = nextCore;
        dom.aiCoreSelect.value = nextCore;
        persistSettings();
      });
    }
    if (dom.corePromptInput) {
      const scheduleCoreResize = () => requestAnimationFrame(() => resizeTextarea(dom.corePromptInput, 25));
      dom.corePromptInput.addEventListener('input', () => {
        enforcePromptInputLimit('core', { showAlert: true, forceTrim: true });
        updateSettingTokenCounts();
        scheduleCoreResize();
      });
      dom.corePromptInput.addEventListener('focus', scheduleCoreResize);
    }
    if (dom.looklikeInput) {
      const scheduleLooklikeResize = () => requestAnimationFrame(() => resizeTextarea(dom.looklikeInput, 25));
      dom.looklikeInput.addEventListener('input', () => {
        enforcePromptInputLimit('looklike', { showAlert: true, forceTrim: true });
        updateSettingTokenCounts();
        scheduleLooklikeResize();
      });
      dom.looklikeInput.addEventListener('focus', scheduleLooklikeResize);
    }

    if (dom.generatePhotoButton) {
      dom.generatePhotoButton.addEventListener('click', () => openPrompt('photo'));
    }
    if (dom.generateVideoButton) {
      dom.generateVideoButton.addEventListener('click', () => openPrompt('video'));
    }
    dom.submitPrompt.addEventListener('click', handlePromptSubmit);
    dom.closePrompt.addEventListener('click', closePrompt);
    if (dom.promptInput) {
      const schedulePromptResize = () => requestAnimationFrame(resizePromptInput);
      dom.promptInput.addEventListener('input', schedulePromptResize);
      dom.promptInput.addEventListener('focus', schedulePromptResize);
      dom.promptInput.addEventListener('keydown', schedulePromptResize);
    }
    if (dom.advancedXrayRunButton) {
      dom.advancedXrayRunButton.addEventListener('click', handleAdvancedXraySubmit);
    }
    if (dom.closeAdvancedXrayModal) {
      dom.closeAdvancedXrayModal.addEventListener('click', closeAdvancedXrayModal);
    }
    if (dom.advancedXrayPromptInput) {
      const scheduleXrayResize = () => requestAnimationFrame(() => resizePromptInput(dom.advancedXrayPromptInput));
      dom.advancedXrayPromptInput.addEventListener('input', scheduleXrayResize);
      dom.advancedXrayPromptInput.addEventListener('focus', scheduleXrayResize);
      dom.advancedXrayPromptInput.addEventListener('keydown', scheduleXrayResize);
    }

    dom.chatLog.addEventListener('click', (event) => {
      const video = event.target.closest('.media video');
      if (video) {
        const src = video.currentSrc || video.src;
        if (src) {
          event.preventDefault();
          event.stopPropagation();
          const wrapper = event.target.closest('[data-message-id]');
          const messageId = wrapper ? wrapper.dataset.messageId : '';
          openVideoModal(src, messageId);
          return;
        }
      }
      const img = event.target.closest('.media img');
      if (img && img.src) {
        const media = img.closest('.media');
        if (media && media.classList.contains('is-locked')) {
          void handleLockedPhotoClick(media.dataset.mediaUrl || img.src);
          return;
        }
        const wrapper = event.target.closest('[data-message-id]');
        const messageId = wrapper ? wrapper.dataset.messageId : '';
        openPhotoModal(img.src, messageId);
      }
    });

    dom.galleryGrid.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('.gallery-delete-button');
      if (deleteButton) {
        event.preventDefault();
        event.stopPropagation();
        const card = deleteButton.closest('.gallery-item');
        const mediaUrl = card ? card.dataset.mediaUrl : '';
        if (mediaUrl) {
          void deleteGalleryMedia(mediaUrl);
        }
        return;
      }
      const video = event.target.closest('.gallery-item video');
      if (video) {
        const src = video.currentSrc || video.src;
        if (src) {
          event.preventDefault();
          event.stopPropagation();
          openVideoModal(src);
          return;
        }
      }
      const img = event.target.closest('.gallery-item img');
      if (img && img.src) {
        const card = img.closest('.gallery-item');
        if (card && card.classList.contains('is-locked')) {
          void handleLockedPhotoClick(card.dataset.mediaUrl || img.src);
          return;
        }
        openPhotoModal(img.src);
      }
    });

    if (dom.communityModal) {
      dom.communityModal.addEventListener('click', (event) => {
        if (event.target === dom.communityModal) {
          closeCommunityModal();
        }
      });
    }

    dom.closePhotoModal.addEventListener('click', closePhotoModal);
    if (dom.photoInfoButton) {
      dom.photoInfoButton.addEventListener('click', showPhotoInfo);
    }
    if (dom.videoInfoButton) {
      dom.videoInfoButton.addEventListener('click', showVideoInfo);
    }
    dom.photoModal.addEventListener('click', (event) => {
      if (event.target === dom.photoModal) {
        closePhotoModal();
      }
    });
    if (dom.closeVideoModal) {
      dom.closeVideoModal.addEventListener('click', closeVideoModal);
    }
    if (dom.videoModal) {
      dom.videoModal.addEventListener('click', (event) => {
        if (event.target === dom.videoModal) {
          closeVideoModal();
        }
      });
    }
    if (dom.videoBackgroundButton) {
      dom.videoBackgroundButton.addEventListener('click', () => {
        const source = state.videoFocus ? state.videoFocus.url : '';
        if (source) {
          applyChatroomBackground(source);
          setVideoStatus('Background updated.');
        }
      });
    }
    if (dom.videoDownloadButton) {
      dom.videoDownloadButton.addEventListener('click', () => {
        const source = state.videoFocus ? state.videoFocus.url : '';
        if (source) {
          downloadMediaUrl(source, 'video', 'mp4');
        }
      });
    }
    if (dom.videoDeleteButton) {
      dom.videoDeleteButton.addEventListener('click', () => {
        const source = state.videoFocus ? state.videoFocus.url : '';
        if (source) {
          void deleteGalleryMedia(source);
        }
      });
    }
    if (dom.videoShareButton) {
      dom.videoShareButton.addEventListener('click', openVideoShareOptions);
    }
    dom.photoEnhanceButton.addEventListener('click', () => {
      if (!requirePhotoEditingAccess({ requiresGpt4: true })) {
        return;
      }
      runPhotoTransform('UP', '4K Enhance');
    });
    dom.photoXrayButton.addEventListener('click', () => {
      if (!requirePhotoEditingAccess()) {
        return;
      }
      runPhotoTransform('NUDE', 'X-Ray');
    });
    if (dom.photoAdvancedXrayButton) {
      dom.photoAdvancedXrayButton.addEventListener('click', () => {
        if (!requireAdvancedXrayAccess()) {
          return;
        }
        runAdvancedXray();
      });
    }
    dom.photoVideoButton.addEventListener('click', () => {
      if (!getMembershipInfo().isAdmin) {
        return;
      }
      if (!requirePhotoEditingAccess()) {
        return;
      }
      const source = state.photoFocus ? state.photoFocus.url : '';
      if (source) {
        closePhotoModal();
        openPrompt('video', source);
      }
    });
    if (dom.photoVideoGen2Button) {
      dom.photoVideoGen2Button.addEventListener('click', () => {
        const source = state.photoFocus ? state.photoFocus.url : '';
        if (source) {
          closePhotoModal();
          openPrompt('videoGen2', source);
        }
      });
    }
    dom.photoBackgroundButton.addEventListener('click', () => {
      if (!requirePhotoEditingAccess()) {
        return;
      }
      const source = state.photoFocus ? state.photoFocus.url : '';
      if (source) {
        applyChatroomBackground(source);
        setPhotoStatus('Background updated.');
      }
    });
    if (dom.photoDownloadButton) {
      dom.photoDownloadButton.addEventListener('click', () => {
        const source = state.photoFocus ? state.photoFocus.url : '';
        if (source) {
          downloadMediaUrl(source, 'photo', 'jpg');
        }
      });
    }
    if (dom.photoDeleteButton) {
      dom.photoDeleteButton.addEventListener('click', () => {
        const source = state.photoFocus ? state.photoFocus.url : '';
        if (source) {
          void deleteGalleryMedia(source);
        }
      });
    }
    if (dom.photoShareButton) {
      dom.photoShareButton.addEventListener('click', openPhotoShareOptions);
    }
    if (dom.scrollToBottomButton) {
      dom.scrollToBottomButton.addEventListener('click', () => {
        scrollToBottom();
        updateScrollToBottomButton();
      });
    }
    if (dom.chatLog) {
      dom.chatLog.addEventListener('scroll', updateScrollToBottomButton, { passive: true });
    }

    document.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const text = chip.getAttribute('data-prompt') || '';
        dom.messageInput.value = text;
        handleSend();
      });
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!dom.emojiPanel.contains(target) && !dom.emojiButton.contains(target)) {
        dom.emojiPanel.classList.remove('active');
      }
    });

    document.addEventListener('play', (event) => {
      const target = event.target;
      if (target && target.tagName && target.tagName.toLowerCase() === 'video') {
        if (target.dataset && target.dataset.forceMuted === '1') {
          target.muted = true;
          target.defaultMuted = true;
          target.volume = 0;
          return;
        }
        target.muted = false;
        muteOtherVideos(target);
      }
    }, true);

    window.addEventListener('resize', () => {
      if (dom.emojiPanel.classList.contains('active')) {
        positionEmojiPanel();
      }
    });

    updateQueuePoolUI();
  }

  function bindMusicEventHandlers() {
    if (typeof window !== 'undefined') {
      window.__chatroomOpenMusicModal = openMusicModal;
      window.__chatroomCloseMusicModal = closeMusicModal;
      window.__chatroomGenerateMusicPiece = () => {
        void handleGenerateMusicPiece();
      };
      window.__chatroomGenerateMusicCompose = async (options = {}) => requestMusicComposeSuggestion(options);
      window.__chatroomTrackMusicTask = (taskId, xid) => {
        watchMusicTask(taskId, xid);
      };
      window.__chatroomMusicHandlersReady = true;
    }
    if (dom.musicGeneratorButton && dom.musicGeneratorButton.dataset.musicOpenBound !== '1') {
      dom.musicGeneratorButton.dataset.musicOpenBound = '1';
      dom.musicGeneratorButton.addEventListener('click', openMusicModal);
      dom.musicGeneratorButton.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) return;
        openMusicModal();
      });
    }
    if (dom.closeMusicModal && dom.closeMusicModal.dataset.musicCloseBound !== '1') {
      dom.closeMusicModal.dataset.musicCloseBound = '1';
      dom.closeMusicModal.addEventListener('click', closeMusicModal);
    }
    if (dom.generateMusicButton && dom.generateMusicButton.dataset.musicGenerateBound !== '1') {
      dom.generateMusicButton.dataset.musicGenerateBound = '1';
      dom.generateMusicButton.addEventListener('click', () => {
        void handleGenerateMusicPiece();
      });
    }
    if (dom.musicModal && dom.musicModal.dataset.musicBackdropBound !== '1') {
      dom.musicModal.dataset.musicBackdropBound = '1';
      dom.musicModal.addEventListener('click', (event) => {
        if (event.target === dom.musicModal) {
          closeMusicModal();
        }
      });
    }
  }

  function installMusicGlobalFallback() {
    if (musicGlobalFallbackBound || typeof document === 'undefined') return;
    musicGlobalFallbackBound = true;

    const fallbackOpen = () => {
      if (typeof window !== 'undefined' && typeof window.__chatroomOpenMusicModal === 'function') {
        window.__chatroomOpenMusicModal();
        return;
      }
      if (typeof window !== 'undefined' && typeof window.__chatroomOpenMusicInlineFallback === 'function') {
        window.__chatroomOpenMusicInlineFallback();
        return;
      }
      const modal = document.getElementById('musicModal');
      if (!modal) return;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      if (typeof window !== 'undefined' && typeof window.__chatroomRefreshMusicInlineGallery === 'function') {
        void window.__chatroomRefreshMusicInlineGallery('');
      }
    };

    const fallbackClose = () => {
      if (typeof window !== 'undefined' && typeof window.__chatroomCloseMusicModal === 'function') {
        window.__chatroomCloseMusicModal();
        return;
      }
      const modal = document.getElementById('musicModal');
      if (!modal) return;
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('#musicGeneratorButton')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        fallbackOpen();
        return;
      }
      if (target.closest('#closeMusicModal')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        fallbackClose();
        return;
      }
      if (target.id === 'musicModal') {
        event.preventDefault();
        event.stopImmediatePropagation();
        fallbackClose();
      }
    }, true);

    document.addEventListener('keydown', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('#musicGeneratorButton')) return;
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      fallbackOpen();
    }, true);
  }

  function handleSend() {
    const text = dom.messageInput.value.trim();
    if (!text) return;
    const queueLimit = getQueuePoolLimit();
    const queueFull = isAssistantBusy() && state.queuePool.length >= queueLimit;
    if (queueFull) {
      addSystemMessage(t('Queue pool is full. Please wait for the assistant to respond.'));
      return;
    }
    if (!consumeGuestMessage()) {
      return;
    }

    dom.messageInput.value = '';
    updateComposerActions();
    if (isAssistantBusy()) {
      enqueueQueuedMessage(text);
      return;
    }
    const messageId = randomId(10);
    addMessage({
      id: messageId,
      role: 'user',
      text,
      mediaUrl: '',
      mediaType: '',
      timestamp: new Date().toISOString()
    });

    queueAssistantRequest({ text, originMessageId: messageId });
  }

  function queueAssistantRequest(options) {
    return new Promise((resolve, reject) => {
      assistantQueue.push({ options, resolve, reject });
      void drainAssistantQueue();
    });
  }

  async function drainAssistantQueue() {
    if (assistantQueueActive) return;
    assistantQueueActive = true;
    try {
      while (assistantQueue.length > 0) {
        const item = assistantQueue.shift();
        if (!item) continue;
        try {
          const result = await requestAssistant(item.options);
          item.resolve(result);
        } catch (err) {
          item.reject(err);
        }
        if (assistantQueue.length === 0) {
          flushNextQueuedMessage();
        }
      }
    } finally {
      assistantQueueActive = false;
      if (assistantQueue.length > 0) {
        void drainAssistantQueue();
      }
    }
  }

  function getMemorySummaryForPrompt() {
    if (!state.settings.memoryCompaction) return '';
    return normalizeMemorySummary(state.settings.memorySummary);
  }

  async function requestAssistant({ text, mediaUrl, mediaType, originMessageId, reuseCloudId }) {
    showTyping();
    const safeText = text || '';
    const safeMediaUrl = mediaUrl || '';
    const safeMediaType = mediaType || '';
    try {
      const preferLocalHistory = shouldPreferLocalHistory();
      const history = (!state.cloudSync || preferLocalHistory) ? buildHistoryPayload({
        text: safeText,
        mediaUrl: safeMediaUrl,
        mediaType: safeMediaType
      }) : [];
      const resolvedMediaUrl = resolveMediaUrl(safeMediaUrl);
      const memorySummary = getMemorySummaryForPrompt();
      const tokenLimits = getMembershipTokenLimits();
      const coreLimit = resolvePromptLimit(tokenLimits.core);
      const lookLimit = resolvePromptLimit(tokenLimits.looklike);
      const corePromptForSend = coercePromptText(state.settings.corePrompt || '', coreLimit);
      const looklikeForSend = coercePromptText(state.settings.looklike || '', lookLimit);
      const payload = {
        message: safeText,
        media_url: resolvedMediaUrl,
        media_type: safeMediaType,
        core_prompt: corePromptForSend,
        looklike: looklikeForSend,
        photo_style: state.settings.photoStyle || DEFAULT_PHOTO_STYLE,
        ai_name: state.settings.aiName || DEFAULT_AI_NAME,
        my_name: normalizeMyName(state.settings.myName),
        ai_core: coerceAiCoreForMembership(state.settings.aiCore || DEFAULT_AI_CORE),
        ai_temperature: normalizeTemperatureValue(state.settings.aiTemperature),
        history,
        debug: DEBUG
      };
      if (memorySummary) {
        payload.memory_summary = memorySummary;
      }
      if (state.cloudSync) {
        payload.XID = state.sessionId;
        payload.slot = state.activeSlot;
        if (preferLocalHistory) {
          payload.prefer_history = 1;
        }
        if (Number.isFinite(reuseCloudId)) {
          payload.reuse_message_id = reuseCloudId;
        }
      }
      const response = await fetch(CONFIG.replyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: invalid JSON response', {
            status: response.status,
            rawText
          });
        }
        throw err;
      }
      if (DEBUG && (!response.ok || !data || !data.ok)) {
        console.warn('Chatroom debug: assistant error', {
          status: response.status,
          data
        });
      }
      if (data && data.transcript && originMessageId) {
        applyTranscriptToMessage(originMessageId, data.transcript);
      }
      if (DEBUG && data.debug) {
        console.log('Chatroom debug:', data.debug);
      }
      if (data && data.membership) {
        applyMembershipUpdate(data.membership);
      }
      if (!data.ok) {
        addSystemMessage(data.error || t('No response received. Try again.'));
        return;
      }

      const cloudIds = data && data.cloud_ids && typeof data.cloud_ids === 'object' ? data.cloud_ids : null;
      if (state.cloudSync && originMessageId && cloudIds) {
        const userId = Number(cloudIds.user);
        if (Number.isFinite(userId)) {
          updateMessageCloudId(originMessageId, userId);
        }
      }

      const replyText = data.reply || '';
      const replyMedia = data.media_url || '';
      const media = replyMedia ? await persistRemoteMedia(replyMedia) : '';
      const finalMedia = media || replyMedia;
      const finalMediaType = inferMediaType(finalMedia);

      if (replyText || finalMedia) {
        const assistantCloudId = cloudIds ? Number(cloudIds.assistant) : null;
        const assistantMessageId = randomId(10);
        addMessage({
          id: assistantMessageId,
          cloudId: Number.isFinite(assistantCloudId) ? assistantCloudId : null,
          role: 'assistant',
          text: replyText,
          mediaUrl: finalMedia,
          mediaType: finalMediaType,
          timestamp: new Date().toISOString(),
          meta: data.ai_name ? data.ai_name : ''
        });

        if (finalMedia) {
          trackGallery({
            url: finalMedia,
            type: finalMediaType || 'image',
            prompt: replyText || '',
            source: 'assistant'
          });
        }
      } else {
        addSystemMessage(t('No response received. Try again.'));
      }
    } catch (err) {
      if (DEBUG) {
        console.error('Chatroom debug: assistant request failed', err);
      }
      const aiName = (state.settings && state.settings.aiName) ? state.settings.aiName : DEFAULT_AI_NAME;
      addSystemMessage(t('Unable to reach the assistant.', { name: aiName }));
    } finally {
      hideTyping();
    }
  }

  function buildHistoryPayload(current) {
    const tokenState = buildConversationTokenState(state.messages);
    const history = state.messages.filter((msg) => (
      isConversationMessage(msg) && (!msg.id || tokenState.includedIds.has(msg.id))
    ));
    const trimmed = history.slice();
    if (trimmed.length > 0 && current) {
      const last = trimmed[trimmed.length - 1];
      const currentText = (current.text || '').trim();
      const currentMediaUrl = current.mediaUrl || '';
      const lastMediaUrl = last.mediaUrl || '';
      const isDuplicate = last.role === 'user' && (
        (last.text === currentText && lastMediaUrl === currentMediaUrl) ||
        (currentMediaUrl && lastMediaUrl === currentMediaUrl)
      );
      if (isDuplicate) {
        trimmed.pop();
      }
    }
    return trimmed.map((msg) => ({
      role: msg.role,
      text: msg.text || '',
      mediaUrl: msg.mediaUrl || '',
      mediaType: msg.mediaType || ''
    }));
  }

  function buildFullHistoryPayload() {
    return state.messages
      .filter(isConversationMessage)
      .map((msg) => {
        const text = (msg.text || '').trim();
        const mediaUrl = msg.mediaUrl || '';
        if (!text && !mediaUrl) return null;
        return {
          role: msg.role,
          text: msg.text || '',
          mediaUrl,
          mediaType: msg.mediaType || '',
          voiceUrl: msg.voiceUrl || '',
          voiceTrimmed: Boolean(msg.voiceTrimmed)
        };
      })
      .filter(Boolean);
  }

  function showTyping() {
    if (state.typingEl) return;
    setStatusLabel('Thinking');
    const typing = {
      id: 'typing',
      role: 'assistant',
      text: t('Typing...'),
      mediaUrl: '',
      mediaType: '',
      timestamp: new Date().toISOString(),
      meta: 'Live'
    };
    state.typingEl = buildMessageElement(typing);
    dom.chatLog.appendChild(state.typingEl);
    scrollToBottom();
    updateQueuePoolUI();
  }

  function hideTyping() {
    if (state.typingEl) {
      state.typingEl.remove();
      state.typingEl = null;
    }
    setStatusLabel('Online');
    updateQueuePoolUI();
  }

  function inferMediaType(url) {
    if (!url) return '';
    const lower = url.toLowerCase();
    const clean = lower.split('?')[0].split('#')[0];
    if (clean.match(/\.(mp4|mov|webm)$/)) return 'video';
    if (clean.match(/\.(mp3|wav|ogg|m4a)$/)) return 'audio';
    return 'image';
  }

  async function persistRemoteMedia(url) {
    if (!url) return '';
    if (url.startsWith('media/') || url.includes('/chatroom/media/')) {
      return url;
    }
    try {
      const response = await fetch(CONFIG.saveRemoteEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: url })
      });
      const data = await response.json();
      if (data.ok && data.url) {
        return data.url;
      }
    } catch (err) {
      return '';
    }
    return '';
  }

  function isAllowedImageFile(file) {
    if (!file) return false;
    const mime = (file.type || '').toLowerCase();
    if (mime && ALLOWED_IMAGE_MIME.has(mime)) {
      return true;
    }
    const name = (file.name || '').toLowerCase();
    const ext = name.includes('.') ? name.split('.').pop() : '';
    if (ext && ALLOWED_IMAGE_EXT.has(ext)) {
      return true;
    }
    return false;
  }

  function isFileDragEvent(event) {
    if (!event || !event.dataTransfer) return false;
    const items = event.dataTransfer.items;
    if (items && items.length) {
      for (let i = 0; i < items.length; i += 1) {
        if (items[i].kind === 'file') {
          return true;
        }
      }
      return false;
    }
    const files = event.dataTransfer.files;
    if (files && files.length) {
      return true;
    }
    const types = event.dataTransfer.types;
    if (!types) return false;
    if (typeof types.contains === 'function') {
      return types.contains('Files');
    }
    return Array.from(types).includes('Files');
  }

  function setChatroomDragState(isActive) {
    if (!dom.chatroom) return;
    dom.chatroom.classList.toggle('is-dragover', isActive);
  }

  function getDroppedImageFile(event) {
    const result = { file: null, hasFile: false };
    if (!event || !event.dataTransfer) return result;
    const items = event.dataTransfer.items;
    if (items && items.length) {
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (!item || item.kind !== 'file') continue;
        result.hasFile = true;
        const file = item.getAsFile();
        if (file && isAllowedImageFile(file)) {
          result.file = file;
          break;
        }
      }
      return result;
    }
    const files = event.dataTransfer.files;
    if (files && files.length) {
      result.hasFile = true;
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        if (isAllowedImageFile(file)) {
          result.file = file;
          break;
        }
      }
    }
    return result;
  }

  async function processUploadFile(file) {
    if (!file) return;

    if (!isAllowedImageFile(file)) {
      addSystemMessage(t('Please upload a JPG, PNG, WEBP, GIF, HEIC, HEIF, or AVIF image.'));
      return;
    }

    if (!consumeGuestMessage()) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    addSystemMessage(t('Uploading file...'));

    try {
      const response = await fetch(CONFIG.uploadEndpoint, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (!data.ok) {
        addSystemMessage(t('Upload failed.'));
        return;
      }
      const mediaType = data.type || inferMediaType(data.url);

      const uploadMessageId = randomId(10);
      addMessage({
        id: uploadMessageId,
        role: 'user',
        text: t('Shared a file.'),
        mediaUrl: data.url,
        mediaType,
        timestamp: new Date().toISOString()
      });

      trackGallery({
        url: data.url,
        type: mediaType,
        prompt: 'User upload',
        source: 'user'
      });

      queueAssistantRequest({
        text: t('Take a look at this.'),
        mediaUrl: data.url,
        mediaType,
        originMessageId: uploadMessageId
      });
    } catch (err) {
      addSystemMessage(t('Upload failed.'));
    }
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    dom.fileInput.value = '';
    await processUploadFile(file);
  }

  function handleMessagePaste(event) {
    if (!dom.messageInput || event.target !== dom.messageInput) return;
    const file = getClipboardImageFile(event);
    if (!file) return;
    event.preventDefault();
    void processUploadFile(file);
  }

  function handleChatroomDragEnter(event) {
    if (!isFileDragEvent(event)) return;
    event.preventDefault();
    chatroomDragDepth += 1;
    setChatroomDragState(true);
  }

  function handleChatroomDragOver(event) {
    if (!isFileDragEvent(event)) return;
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
    setChatroomDragState(true);
  }

  function handleChatroomDragLeave(event) {
    if (chatroomDragDepth === 0) return;
    chatroomDragDepth = Math.max(0, chatroomDragDepth - 1);
    if (chatroomDragDepth === 0) {
      setChatroomDragState(false);
    }
  }

  function handleChatroomDrop(event) {
    if (!isFileDragEvent(event)) {
      if (chatroomDragDepth > 0) {
        event.preventDefault();
        chatroomDragDepth = 0;
        setChatroomDragState(false);
      }
      return;
    }
    event.preventDefault();
    chatroomDragDepth = 0;
    setChatroomDragState(false);
    const result = getDroppedImageFile(event);
    if (!result.file) {
      if (result.hasFile) {
        addSystemMessage(t('Please upload a JPG, PNG, WEBP, GIF, HEIC, HEIF, or AVIF image.'));
      }
      return;
    }
    void processUploadFile(result.file);
  }

  function setRecordingUI(isRecording) {
    const composer = dom.messageInput ? dom.messageInput.closest('.composer') : null;
    if (composer) {
      composer.classList.toggle('is-recording', isRecording);
    }
    if (dom.recordingPanel) {
      dom.recordingPanel.setAttribute('aria-hidden', isRecording ? 'false' : 'true');
    }
  }

  function resetRecordingState() {
    stopRecordingVisualizer();
    if (state.recording.timerId) {
      clearInterval(state.recording.timerId);
    }
    state.recording.timerId = null;
    state.recording.isRecording = false;
    state.recording.isStopping = false;
    state.recording.sendOnStop = false;
    state.recording.startTime = 0;
    state.recording.mode = '';
    state.recording.stream = null;
    state.recording.wavContext = null;
    state.recording.wavSource = null;
    state.recording.wavProcessor = null;
    state.recording.wavGain = null;
    state.recording.wavBuffers = [];
    state.recording.wavLength = 0;
    if (dom.recordingTimer) {
      dom.recordingTimer.textContent = '0:00';
    }
    setRecordingUI(false);
  }

  function updateRecordingTimer() {
    if (!state.recording.isRecording) return;
    const elapsed = Date.now() - state.recording.startTime;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = String(seconds % 60).padStart(2, '0');
    if (dom.recordingTimer) {
      dom.recordingTimer.textContent = `${minutes}:${remainingSeconds}`;
    }
    if (elapsed >= 60000) {
      sendRecording();
    }
  }

  function canUseMp3Encoder() {
    return Boolean(window.lamejs && typeof window.lamejs.Mp3Encoder === 'function');
  }

  function pickRecordingMimeType(allowFallback = true) {
    if (!window.MediaRecorder || !MediaRecorder.isTypeSupported) {
      return '';
    }
    const candidates = allowFallback
      ? [
        'audio/mpeg',
        'audio/ogg;codecs=opus',
        'audio/ogg',
        'audio/mp4',
        'audio/webm;codecs=opus',
        'audio/webm'
      ]
      : ['audio/mpeg'];
    for (const type of candidates) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return '';
  }

  function getAudioExtension(mimeType) {
    const lower = (mimeType || '').toLowerCase();
    if (lower.includes('mpeg') || lower.includes('mp3')) return 'mp3';
    if (lower.includes('ogg')) return 'ogg';
    if (lower.includes('wav')) return 'wav';
    if (lower.includes('mp4') || lower.includes('m4a')) return 'm4a';
    return 'webm';
  }

  function writeWavString(view, offset, value) {
    for (let i = 0; i < value.length; i += 1) {
      view.setUint8(offset + i, value.charCodeAt(i));
    }
  }

  function floatTo16BitPCM(bufferChunk) {
    const output = new Int16Array(bufferChunk.length);
    for (let i = 0; i < bufferChunk.length; i += 1) {
      let sample = bufferChunk[i];
      if (sample > 1) sample = 1;
      if (sample < -1) sample = -1;
      output[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    }
    return output;
  }

  function resampleFloat32(samples, fromRate, toRate) {
    if (!samples || samples.length === 0) return samples;
    if (fromRate === toRate) return samples;
    const ratio = toRate / fromRate;
    const newLength = Math.max(1, Math.round(samples.length * ratio));
    const result = new Float32Array(newLength);
    for (let i = 0; i < newLength; i += 1) {
      const sourceIndex = i / ratio;
      const left = Math.floor(sourceIndex);
      const right = Math.min(left + 1, samples.length - 1);
      const frac = sourceIndex - left;
      result[i] = samples[left] + (samples[right] - samples[left]) * frac;
    }
    return result;
  }

  function normalizeMp3SampleRate(sampleRate) {
    const rate = Number(sampleRate) || 44100;
    const options = [8000, 11025, 12000, 16000, 22050, 24000, 32000, 44100, 48000];
    let closest = options[0];
    let minDelta = Math.abs(rate - closest);
    for (let i = 1; i < options.length; i += 1) {
      const delta = Math.abs(rate - options[i]);
      if (delta < minDelta) {
        minDelta = delta;
        closest = options[i];
      }
    }
    return closest;
  }

  function encodeWav(buffers, length, sampleRate) {
    const buffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(buffer);
    writeWavString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeWavString(view, 8, 'WAVE');
    writeWavString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeWavString(view, 36, 'data');
    view.setUint32(40, length * 2, true);

    let offset = 44;
    buffers.forEach((bufferChunk) => {
      for (let i = 0; i < bufferChunk.length; i += 1) {
        let sample = bufferChunk[i];
        if (sample > 1) sample = 1;
        if (sample < -1) sample = -1;
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
        offset += 2;
      }
    });

    return new Blob([view], { type: 'audio/wav' });
  }

  function encodeMp3(buffers, sampleRate) {
    if (!canUseMp3Encoder()) return null;
    const safeRate = normalizeMp3SampleRate(sampleRate);
    let encoder;
    try {
      encoder = new window.lamejs.Mp3Encoder(1, safeRate, 128);
    } catch (err) {
      return null;
    }
    const mp3Chunks = [];
    buffers.forEach((bufferChunk) => {
      const samples = floatTo16BitPCM(bufferChunk);
      const mp3buf = encoder.encodeBuffer(samples);
      if (mp3buf && mp3buf.length) {
        mp3Chunks.push(new Uint8Array(mp3buf));
      }
    });
    const endBuf = encoder.flush();
    if (endBuf && endBuf.length) {
      mp3Chunks.push(new Uint8Array(endBuf));
    }
    if (!mp3Chunks.length) return null;
    return new Blob(mp3Chunks, { type: 'audio/mpeg' });
  }

  function mixToMono(audioBuffer) {
    if (!audioBuffer) return null;
    if (audioBuffer.numberOfChannels === 1) {
      return audioBuffer.getChannelData(0);
    }
    const left = audioBuffer.getChannelData(0);
    const right = audioBuffer.getChannelData(1);
    const length = audioBuffer.length;
    const mono = new Float32Array(length);
    for (let i = 0; i < length; i += 1) {
      mono[i] = (left[i] + right[i]) * 0.5;
    }
    return mono;
  }

  function encodeMp3FromAudioBuffer(audioBuffer) {
    if (!canUseMp3Encoder()) return null;
    if (!audioBuffer) return null;
    let samples = mixToMono(audioBuffer);
    if (!samples || !samples.length) return null;
    const sampleRate = audioBuffer.sampleRate || 44100;
    const safeRate = normalizeMp3SampleRate(sampleRate);
    if (DEBUG && safeRate !== sampleRate) {
      console.warn('Chatroom debug: mp3 sample rate normalized', {
        sampleRate,
        safeRate
      });
    }
    if (safeRate !== sampleRate) {
      samples = resampleFloat32(samples, sampleRate, safeRate);
    }
    let encoder;
    try {
      encoder = new window.lamejs.Mp3Encoder(1, safeRate, 128);
    } catch (err) {
      return null;
    }
    const mp3Chunks = [];
    const blockSize = 1152;
    for (let i = 0; i < samples.length; i += blockSize) {
      const slice = samples.subarray(i, i + blockSize);
      const pcm = floatTo16BitPCM(slice);
      const mp3buf = encoder.encodeBuffer(pcm);
      if (mp3buf && mp3buf.length) {
        mp3Chunks.push(new Uint8Array(mp3buf));
      }
    }
    const endBuf = encoder.flush();
    if (endBuf && endBuf.length) {
      mp3Chunks.push(new Uint8Array(endBuf));
    }
    if (!mp3Chunks.length) return null;
    return new Blob(mp3Chunks, { type: 'audio/mpeg' });
  }

  function encodeWavFromAudioBuffer(audioBuffer) {
    if (!audioBuffer) return null;
    const samples = mixToMono(audioBuffer);
    if (!samples || !samples.length) return null;
    const sampleRate = audioBuffer.sampleRate || 44100;
    return encodeWav([samples], samples.length, sampleRate);
  }

  async function decodeAudioBlob(blob) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      throw new Error('AudioContext not supported');
    }
    const buffer = await blob.arrayBuffer();
    const audioContext = new AudioContext();
    try {
      const audioBuffer = await audioContext.decodeAudioData(buffer.slice(0));
      return audioBuffer;
    } finally {
      audioContext.close().catch(() => { });
    }
  }

  async function processMediaRecorderBlob(blob, mimeType, stream) {
    if (!blob || blob.size === 0) {
      finalizeRecordedBlob(null, mimeType, stream);
      return;
    }
    const lower = (mimeType || '').toLowerCase();
    const isMp3 = lower.includes('mpeg') || lower.includes('mp3');
    const isOgg = lower.includes('ogg');
    const isWav = lower.includes('wav');
    if (isMp3 || isOgg || isWav) {
      finalizeRecordedBlob(blob, mimeType, stream);
      return;
    }
    if (!lower.includes('mpeg') && !lower.includes('mp3')) {
      setVoiceLabel('Processing...');
      try {
        const audioBuffer = await decodeAudioBlob(blob);
        if (canUseMp3Encoder()) {
          const mp3Blob = encodeMp3FromAudioBuffer(audioBuffer);
          if (mp3Blob) {
            finalizeRecordedBlob(mp3Blob, 'audio/mpeg', stream);
            return;
          }
        }
        const wavBlob = encodeWavFromAudioBuffer(audioBuffer);
        if (wavBlob) {
          finalizeRecordedBlob(wavBlob, 'audio/wav', stream);
          return;
        }
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: audio transcode failed', err);
        }
      }
    }
    finalizeRecordedBlob(blob, mimeType, stream);
  }

  function initWaveRecorder() {
    if (!dom.audioVisualizer || !window.WaveSurfer || !WaveSurfer.Record) {
      return false;
    }
    if (state.recording.waveSurfer && state.recording.waveRecord) {
      return true;
    }
    dom.audioVisualizer.innerHTML = '';
    let wavesurfer;
    try {
      wavesurfer = WaveSurfer.create({
        container: dom.audioVisualizer,
        height: 47,
        waveColor: '#ff00ea',
        progressColor: '#ff6caf',
        barWidth: 2,
        barGap: 2,
        barRadius: 10,
        barHeight: 1.7
      });
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: wavesurfer init failed', err);
      }
      return false;
    }
    const preferredMimeType = pickRecordingMimeType();
    const recordOptions = {
      scrollingWaveform: true,
      renderRecordedAudio: false
    };
    if (preferredMimeType) {
      recordOptions.mimeType = preferredMimeType;
      recordOptions.mediaRecorderOptions = { mimeType: preferredMimeType };
    }
    const record = wavesurfer.registerPlugin(
      WaveSurfer.Record.create(recordOptions)
    );
    record.on('record-end', (blob) => {
      const sendOnStop = state.recording.sendOnStop;
      if (!sendOnStop) {
        resetRecordingState();
        setVoiceLabel('Ready');
        return;
      }
      const mimeType = blob && blob.type ? blob.type : 'audio/webm';
      processMediaRecorderBlob(blob, mimeType, null);
    });

    state.recording.waveSurfer = wavesurfer;
    state.recording.waveRecord = record;
    return true;
  }

  function cleanupWavRecorder() {
    const context = state.recording.wavContext;
    const source = state.recording.wavSource;
    const processor = state.recording.wavProcessor;
    const gain = state.recording.wavGain;
    if (processor) {
      try {
        processor.disconnect();
      } catch (err) {
        // ignore disconnect errors
      }
    }
    if (source) {
      try {
        source.disconnect();
      } catch (err) {
        // ignore disconnect errors
      }
    }
    if (gain) {
      try {
        gain.disconnect();
      } catch (err) {
        // ignore disconnect errors
      }
    }
    if (context && context.state !== 'closed') {
      context.close().catch(() => { });
    }
    state.recording.wavContext = null;
    state.recording.wavSource = null;
    state.recording.wavProcessor = null;
    state.recording.wavGain = null;
  }

  function stopRecordingVisualizer() {
    const visualizer = state.recording.visualizer;
    if (!visualizer) return;
    if (visualizer.rafId) {
      cancelAnimationFrame(visualizer.rafId);
    }
    if (visualizer.source) {
      try {
        visualizer.source.disconnect();
      } catch (err) {
        // ignore disconnect errors
      }
    }
    if (visualizer.audioContext && visualizer.audioContext.state !== 'closed') {
      visualizer.audioContext.close().catch(() => { });
    }
    if (visualizer.bars) {
      visualizer.bars.forEach((bar) => {
        bar.style.height = '';
        bar.style.opacity = '';
        bar.style.animation = '';
      });
    }
    state.recording.visualizer = null;
  }

  function startRecordingVisualizer(stream) {
    stopRecordingVisualizer();
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext || !dom.audioVisualizer) {
      return;
    }
    const desiredBars = 24;
    let bars = Array.from(dom.audioVisualizer.querySelectorAll('span'));
    if (bars.length < desiredBars) {
      const fragment = document.createDocumentFragment();
      for (let i = bars.length; i < desiredBars; i += 1) {
        fragment.appendChild(document.createElement('span'));
      }
      dom.audioVisualizer.appendChild(fragment);
      bars = Array.from(dom.audioVisualizer.querySelectorAll('span'));
    }
    if (!bars.length) return;

    let audioContext;
    try {
      audioContext = new AudioContext();
    } catch (err) {
      return;
    }
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    bars.forEach((bar) => {
      bar.style.animation = 'none';
    });

    const visualizer = {
      audioContext,
      analyser,
      source,
      dataArray,
      bars,
      rafId: 0
    };
    state.recording.visualizer = visualizer;

    const update = () => {
      if (!state.recording.visualizer) return;
      analyser.getByteFrequencyData(dataArray);
      const slice = Math.max(1, Math.floor(dataArray.length / bars.length));
      bars.forEach((bar, index) => {
        let sum = 0;
        const start = index * slice;
        const end = Math.min(start + slice, dataArray.length);
        for (let i = start; i < end; i += 1) {
          sum += dataArray[i];
        }
        const avg = sum / Math.max(1, end - start);
        const height = Math.max(4, Math.min(24, 2 + (avg / 255) * 22));
        bar.style.height = `${height}px`;
        bar.style.opacity = `${0.4 + (avg / 255) * 0.6}`;
      });
      visualizer.rafId = requestAnimationFrame(update);
    };

    audioContext.resume().catch(() => { });
    update();
  }

  function finalizeRecordedBlob(blob, mimeType, stream) {
    const sendOnStop = state.recording.sendOnStop;
    resetRecordingState();
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    state.recorder = null;
    state.recordedChunks = [];
    cleanupWavRecorder();

    if (!sendOnStop) {
      setVoiceLabel('Ready');
      return;
    }
    if (!blob || blob.size === 0) {
      setVoiceLabel('Voice failed');
      return;
    }

    if (!consumeGuestMessage()) {
      setVoiceLabel('Login required');
      return;
    }

    setVoiceLabel('Sending...');
    const extension = getAudioExtension(mimeType);
    const formData = new FormData();
    formData.append('file', blob, `voice.${extension}`);
    formData.append('media_type', 'audio');

    fetch(CONFIG.uploadEndpoint, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (!data.ok) {
          setVoiceLabel('Voice failed');
          return;
        }

        const voiceMessageId = randomId(10);
        addMessage({
          id: voiceMessageId,
          role: 'user',
          text: t('Sent a voice clip.'),
          mediaUrl: data.url,
          mediaType: 'audio',
          timestamp: new Date().toISOString()
        });

        trackGallery({
          url: data.url,
          type: 'audio',
          prompt: 'Voice clip',
          source: 'user'
        });

        await queueAssistantRequest({
          text: '',
          mediaUrl: data.url,
          mediaType: 'audio',
          originMessageId: voiceMessageId
        });
        setVoiceLabel('Ready');
      })
      .catch(() => {
        setVoiceLabel('Voice failed');
      });
  }

  function startWavRecorder(stream) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return false;
    }
    let audioContext;
    try {
      audioContext = new AudioContext({ sampleRate: 44100 });
    } catch (err) {
      try {
        audioContext = new AudioContext();
      } catch (error) {
        return false;
      }
    }
    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(4096, 1, 1);
    const gain = audioContext.createGain();
    gain.gain.value = 0;

    state.recording.wavBuffers = [];
    state.recording.wavLength = 0;
    state.recording.wavSampleRate = audioContext.sampleRate || 44100;
    state.recording.wavContext = audioContext;
    state.recording.wavSource = source;
    state.recording.wavProcessor = processor;
    state.recording.wavGain = gain;

    processor.onaudioprocess = (event) => {
      if (!state.recording.isRecording) {
        return;
      }
      const input = event.inputBuffer.getChannelData(0);
      const bufferCopy = new Float32Array(input.length);
      bufferCopy.set(input);
      state.recording.wavBuffers.push(bufferCopy);
      state.recording.wavLength += bufferCopy.length;
    };

    source.connect(processor);
    processor.connect(gain);
    gain.connect(audioContext.destination);
    audioContext.resume().catch(() => { });
    return true;
  }

  async function startRecording() {
    if (state.recording.isRecording || state.recording.isStopping) return;
    const canWave = Boolean(dom.audioVisualizer && window.WaveSurfer && WaveSurfer.Record);
    if (canWave) {
      state.recordedChunks = [];
      state.recording.isRecording = true;
      state.recording.isStopping = false;
      state.recording.sendOnStop = false;
      state.recording.startTime = Date.now();
      setRecordingUI(true);
      if (dom.recordingTimer) {
        dom.recordingTimer.textContent = '0:00';
      }
      if (state.recording.timerId) {
        clearInterval(state.recording.timerId);
      }
      state.recording.timerId = setInterval(updateRecordingTimer, 500);
      state.recording.mode = 'wavesurfer';
      state.recording.mimeType = '';

      if (initWaveRecorder()) {
        const record = state.recording.waveRecord;
        if (record && typeof record.startRecording === 'function') {
          try {
            await record.startRecording();
            setVoiceLabel('Recording...');
            return;
          } catch (err) {
            if (DEBUG) {
              console.warn('Chatroom debug: wavesurfer start failed', err);
            }
          }
        }
      }
      resetRecordingState();
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setVoiceLabel('Mic unavailable');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.recordedChunks = [];
      state.recording.isRecording = true;
      state.recording.isStopping = false;
      state.recording.sendOnStop = false;
      state.recording.startTime = Date.now();
      setRecordingUI(true);
      if (dom.recordingTimer) {
        dom.recordingTimer.textContent = '0:00';
      }
      if (state.recording.timerId) {
        clearInterval(state.recording.timerId);
      }
      state.recording.timerId = setInterval(updateRecordingTimer, 500);

      const canMp3Encode = canUseMp3Encoder();
      const preferredMimeType = pickRecordingMimeType();
      state.recording.stream = stream;
      try {
        state.recorder = preferredMimeType
          ? new MediaRecorder(stream, { mimeType: preferredMimeType })
          : null;
      } catch (err) {
        state.recorder = null;
      }
      startRecordingVisualizer(stream);
      if (state.recorder) {
        state.recording.mode = 'mediarecorder';
        state.recording.mimeType = state.recorder.mimeType || preferredMimeType || 'audio/ogg';
        state.recorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            state.recordedChunks.push(event.data);
          }
        });

        state.recorder.addEventListener('stop', () => {
          const chunks = state.recordedChunks.slice();
          const mimeType = state.recording.mimeType || 'audio/ogg';
          const blob = chunks.length ? new Blob(chunks, { type: mimeType }) : null;
          processMediaRecorderBlob(blob, mimeType, stream);
        });

        state.recorder.start();
      } else {
        const wavOk = startWavRecorder(stream);
        if (!wavOk) {
          stream.getTracks().forEach((track) => track.stop());
          resetRecordingState();
          addSystemMessage(t('Recording is not supported in this browser.'));
          setVoiceLabel('Recording unsupported');
          return;
        }
        if (canMp3Encode) {
          state.recording.mode = 'wav-mp3';
          state.recording.mimeType = 'audio/mpeg';
        } else {
          state.recording.mode = 'wav';
          state.recording.mimeType = 'audio/wav';
        }
      }
      setVoiceLabel('Recording...');
    } catch (err) {
      resetRecordingState();
      setVoiceLabel('Mic blocked');
    }
  }

  function stopRecording(sendOnStop) {
    if (!state.recording.isRecording || state.recording.isStopping) return;
    state.recording.sendOnStop = sendOnStop;
    state.recording.isStopping = true;
    if (state.recording.timerId) {
      clearInterval(state.recording.timerId);
      state.recording.timerId = null;
    }
    if (state.recording.mode === 'wavesurfer') {
      const record = state.recording.waveRecord;
      if (record && typeof record.stopRecording === 'function') {
        try {
          record.stopRecording();
          return;
        } catch (err) {
          resetRecordingState();
          return;
        }
      }
      resetRecordingState();
      return;
    }
    if (state.recording.mode === 'wav' || state.recording.mode === 'wav-mp3') {
      const buffers = state.recording.wavBuffers.slice();
      const length = state.recording.wavLength;
      let sampleRate = state.recording.wavSampleRate || 44100;
      const durationSec = Math.max(0.01, (Date.now() - state.recording.startTime) / 1000);
      if (length > 0 && durationSec > 0.2) {
        const estimatedRate = Math.round(length / durationSec);
        const drift = Math.abs(estimatedRate - sampleRate) / sampleRate;
        if (drift > 0.05 && estimatedRate >= 8000 && estimatedRate <= 96000) {
          sampleRate = estimatedRate;
        }
      }
      if (state.recording.mode === 'wav-mp3') {
        const mp3Blob = length ? encodeMp3(buffers, sampleRate) : null;
        if (mp3Blob) {
          finalizeRecordedBlob(mp3Blob, 'audio/mpeg', state.recording.stream);
          return;
        }
      }
      const wavBlob = length ? encodeWav(buffers, length, sampleRate) : null;
      finalizeRecordedBlob(wavBlob, 'audio/wav', state.recording.stream);
      return;
    }
    if (state.recorder && state.recorder.state === 'recording') {
      state.recorder.stop();
      return;
    }
    state.recording.isStopping = false;
    resetRecordingState();
  }

  function cancelRecording() {
    stopRecording(false);
  }

  function sendRecording() {
    stopRecording(true);
  }

  function setupEmojiPanel() {
    dom.emojiGrid.innerHTML = '';
    EMOJIS.forEach((emoji) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = emoji;
      button.addEventListener('click', () => insertEmoji(emoji));
      dom.emojiGrid.appendChild(button);
    });
  }

  function positionEmojiPanel() {
    if (!dom.emojiPanel || !dom.emojiButton) return;
    const panel = dom.emojiPanel;
    const buttonRect = dom.emojiButton.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const margin = 12;
    let left = buttonRect.left + buttonRect.width / 2 - panelRect.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - panelRect.width - margin));
    let top = buttonRect.top - panelRect.height - 12;
    if (top < margin) {
      top = buttonRect.bottom + 12;
    }
    panel.style.left = `${Math.round(left)}px`;
    panel.style.top = `${Math.round(top)}px`;
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
  }

  function toggleEmojiPanel() {
    const isOpening = !dom.emojiPanel.classList.contains('active');
    dom.emojiPanel.classList.toggle('active');
    dom.emojiPanel.setAttribute('aria-hidden', dom.emojiPanel.classList.contains('active') ? 'false' : 'true');
    if (isOpening) {
      dom.emojiPanel.style.visibility = 'hidden';
      requestAnimationFrame(() => {
        positionEmojiPanel();
        dom.emojiPanel.style.visibility = 'visible';
      });
    }
  }

  function insertEmoji(emoji) {
    const input = dom.messageInput;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const value = input.value;
    input.value = value.slice(0, start) + emoji + value.slice(end);
    input.focus();
    const cursor = start + emoji.length;
    input.setSelectionRange(cursor, cursor);
    updateComposerActions();
  }

  function measureMessageInputHeight() {
    if (!dom.messageInput) return;
    const styles = window.getComputedStyle(dom.messageInput);
    const minHeight = parseFloat(styles.minHeight);
    const fallback = dom.messageInput.getBoundingClientRect().height || dom.messageInput.scrollHeight || 0;
    messageInputBaseHeight = Number.isFinite(minHeight) && minHeight > 0 ? minHeight : fallback;
    messageInputMaxHeight = messageInputBaseHeight > 0 ? messageInputBaseHeight * 5 : 0;
  }

  function resizeMessageInput(force = false) {
    if (!dom.messageInput) return;
    if (force || !messageInputMaxHeight) {
      measureMessageInputHeight();
    }
    const input = dom.messageInput;
    input.style.height = 'auto';
    const maxHeight = messageInputMaxHeight || input.scrollHeight;
    const nextHeight = Math.min(input.scrollHeight, maxHeight);
    input.style.height = `${nextHeight}px`;
    input.style.overflowY = input.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }

  function updateComposerActions() {
    if (!dom.messageInput) return;
    const wrapper = dom.messageInput.closest('.composer-input');
    if (!wrapper) return;
    const hasText = dom.messageInput.value.trim().length > 0;
    wrapper.classList.toggle('has-text', hasText);
    resizeMessageInput();
  }

  function getQueuePoolLimit(info = getMembershipInfo()) {
    const upper = info.upper || '';
    if (info.isAdmin || info.isUltra) {
      return 8;
    }
    if (/GPT\s*[- ]?\s*5/.test(upper)) {
      return 5;
    }
    if (info.isVip || info.isGptTier) {
      return 3;
    }
    return 1;
  }

  function isAssistantBusy() {
    return assistantQueueActive || assistantQueue.length > 0 || Boolean(state.typingEl);
  }

  function formatQueuePreview(text, limit = 50) {
    const cleaned = String(text || '').replace(/\s+/g, ' ').trim();
    if (!cleaned) return '';
    if (cleaned.length <= limit) return cleaned;
    return `${cleaned.slice(0, limit)}...`;
  }

  function updateQueuePoolUI() {
    if (!dom.queuePool || !dom.queuePoolCount) return;
    const count = state.queuePool.length;
    const limit = getQueuePoolLimit();
    dom.queuePoolCount.textContent = `${count}/${limit}`;
    dom.queuePool.classList.toggle('is-visible', count > 0);
    dom.queuePool.setAttribute('aria-hidden', count > 0 ? 'false' : 'true');
    if (dom.queuePoolTooltip) {
      dom.queuePoolTooltip.innerHTML = '';
      state.queuePool.forEach((item, index) => {
        const preview = formatQueuePreview(item.text, 50);
        if (!preview) return;
        const row = document.createElement('div');
        row.className = 'queue-pool-item';
        row.textContent = `${index + 1}. ${preview}`;
        dom.queuePoolTooltip.appendChild(row);
      });
    }
    const isFull = count >= limit && isAssistantBusy();
    if (dom.sendButton) {
      dom.sendButton.disabled = isFull;
    }
  }

  function clearQueuePool() {
    if (state.queuePool.length === 0) {
      updateQueuePoolUI();
      return;
    }
    state.queuePool = [];
    updateQueuePoolUI();
  }

  function enqueueQueuedMessage(text) {
    state.queuePool.push({
      id: randomId(10),
      text: String(text || ''),
      createdAt: new Date().toISOString()
    });
    updateQueuePoolUI();
  }

  function flushNextQueuedMessage() {
    if (state.queuePool.length === 0) return false;
    const next = state.queuePool.shift();
    updateQueuePoolUI();
    const text = String(next.text || '').trim();
    if (!text) return false;
    const messageId = randomId(10);
    addMessage({
      id: messageId,
      role: 'user',
      text,
      mediaUrl: '',
      mediaType: '',
      timestamp: new Date().toISOString()
    });
    queueAssistantRequest({ text, originMessageId: messageId });
    return true;
  }

  function trackGallery(item) {
    if (!item.url) return;
    if (isAudioItem(item)) return;
    const existing = state.gallery.find((entry) => entry.url === item.url);
    if (existing) return;
    const source = getGalleryItemSource(item);
    state.gallery.unshift({
      id: randomId(10),
      url: item.url,
      type: item.type || 'image',
      prompt: item.prompt || '',
      source,
      status: 'ready',
      createdAt: new Date().toISOString()
    });
    saveToStorage(STORAGE_KEYS.gallery, state.gallery);
    renderGallery();
  }

  function renderGallery() {
    dom.galleryGrid.innerHTML = '';
    state.gallery = sanitizeGallery(state.gallery);
    const gatePhotos = shouldGatePhotos();
    const unlocked = gatePhotos ? getUnlockedPhotoUrls() : new Set();
    if (state.gallery.length === 0) {
      const empty = document.createElement('div');
      empty.textContent = t('No media yet.');
      dom.galleryGrid.appendChild(empty);
      return;
    }

    state.gallery.forEach((item) => {
      if (isAudioItem(item)) {
        return;
      }
      const card = document.createElement('div');
      card.className = 'gallery-item';
      if (item.id) {
        card.dataset.galleryId = item.id;
      }
      if (item.url) {
        card.dataset.mediaUrl = item.url;
      }
      if (item.type === 'video') {
        const lowPower = isLowPowerModeEnabled();
        const video = document.createElement('video');
        video.src = item.url;
        video.controls = false;
        video.loop = !lowPower;
        video.autoplay = !lowPower;
        video.playsInline = true;
        video.preload = 'metadata';
        if (!lowPower) {
          video.setAttribute('loop', '');
          video.setAttribute('autoplay', '');
        }
        video.setAttribute('playsinline', '');
        enforceMutedInlineVideo(video, true);
        if (!lowPower) {
          video.addEventListener('loadedmetadata', () => {
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(() => { });
            }
          });
        }
        card.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = t('Gallery item');
        card.appendChild(img);
      }
      const meta = document.createElement('div');
      meta.className = 'gallery-meta';
      const promptLabel = item.prompt ? t(item.prompt) : t(item.type);
      meta.textContent = promptLabel ? promptLabel.slice(0, 38) : '';
      card.appendChild(meta);
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'gallery-delete-button';
      deleteButton.textContent = t('Delete');
      deleteButton.dataset.action = 'delete-gallery';
      deleteButton.setAttribute('aria-label', t('Delete media'));
      card.appendChild(deleteButton);
      if (item.type === 'image' && gatePhotos) {
        const source = getGalleryItemSource(item);
        const locked = source === 'assistant'
          && unlocked.size >= NON_FEVERMATE_FREE_PHOTO_LIMIT
          && !unlocked.has(normalizeMediaKey(item.url));
        applyPhotoLockOverlay(card, locked, { mediaUrl: item.url });
      }
      dom.galleryGrid.appendChild(card);
    });
  }

  async function deleteGalleryMedia(mediaUrl) {
    const key = normalizeMediaKey(mediaUrl);
    if (!key) return;
    removePhotoUnlock(key);
    const messages = state.messages.filter((message) => {
      if (!message || !message.mediaUrl) return false;
      return normalizeMediaKey(message.mediaUrl) === key;
    });
    const confirmed = await confirmDialog({
      title: t('Delete this media?'),
      text: t('This removes it from the gallery and chat.'),
      confirmText: t('Delete'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return;

    const preferLocalHistory = shouldPreferLocalHistory();
    if (state.cloudSync && !preferLocalHistory) {
      const hasPending = messages.some((message) => !Number.isFinite(getMessageCloudId(message)));
      if (hasPending) {
        addSystemMessage(t('Cloud delete pending. Try again shortly.'));
        return;
      }
    }

    if (state.cloudSync) {
      for (const message of messages) {
        const cloudId = getMessageCloudId(message);
        if (!Number.isFinite(cloudId)) continue;
        const result = await deleteCloudMessage(message);
        if (!result.ok && !preferLocalHistory) {
          addSystemMessage(result.error || t('Cloud delete failed. Try again.'));
          return;
        }
      }
    }

    if (messages.length > 0) {
      state.messages = state.messages.filter((message) => {
        if (!message || !message.mediaUrl) return true;
        return normalizeMediaKey(message.mediaUrl) !== key;
      });
      saveToStorage(STORAGE_KEYS.history, state.messages);
    }

    const nextGallery = state.gallery.filter((item) => {
      if (!item || !item.url) return true;
      return normalizeMediaKey(item.url) !== key;
    });
    if (nextGallery.length !== state.gallery.length) {
      state.gallery = nextGallery;
      saveToStorage(STORAGE_KEYS.gallery, state.gallery);
    }

    if (state.photoFocus && normalizeMediaKey(state.photoFocus.url) === key) {
      closePhotoModal();
    }
    if (state.videoFocus && normalizeMediaKey(state.videoFocus.url) === key) {
      closeVideoModal();
    }

    if (messages.length > 0) {
      renderMessages();
    }
    renderGallery();
  }

  function openGallery() {
    renderGallery();
    dom.galleryModal.classList.add('active');
    dom.galleryModal.setAttribute('aria-hidden', 'false');
  }

  function closeGallery() {
    dom.galleryModal.classList.remove('active');
    dom.galleryModal.setAttribute('aria-hidden', 'true');
  }

  function parseMusicResponse(rawText) {
    let data = null;
    if (rawText) {
      try {
        data = JSON.parse(rawText);
      } catch (err) {
        data = null;
      }
    }
    const errorText = (data && (data.error || data.message || data.detail))
      ? String(data.error || data.message || data.detail).trim()
      : (rawText && rawText.trim() ? rawText.trim() : '');
    return { data, errorText };
  }

  function setMusicStatus(message, tone = '') {
    if (!dom.musicStatus) return;
    dom.musicStatus.textContent = message || '';
    if (tone) {
      dom.musicStatus.dataset.tone = tone;
    } else {
      delete dom.musicStatus.dataset.tone;
    }
  }

  function isMusicPendingStatus(status) {
    const normalized = String(status || '').toLowerCase();
    return normalized === 'queued' || normalized === 'processing' || normalized === 'pending';
  }

  function isMusicCompletedWithTracks(item) {
    if (!item || String(item.status || '').toLowerCase() !== 'completed') return false;
    return Array.isArray(item.tracks) && item.tracks.filter((url) => !!resolveMediaUrl(url)).length >= 2;
  }

  function formatMusicStatusLabel(status) {
    const normalized = String(status || '').toLowerCase();
    if (normalized === 'completed') return t('Completed');
    if (normalized === 'failed') return t('Failed');
    if (normalized === 'processing') return t('Processing');
    return t('Queued');
  }

  function formatMusicTimestamp(value) {
    const stamp = Number(value);
    if (!Number.isFinite(stamp) || stamp <= 0) return '';
    try {
      return new Date(stamp).toLocaleString();
    } catch (err) {
      return '';
    }
  }

  function normalizeMusicItems(items) {
    if (!Array.isArray(items)) return [];
    return items
      .filter((item) => item && typeof item === 'object')
      .map((item) => {
        const tracksRaw = Array.isArray(item.tracks) ? item.tracks : [];
        const tracks = tracksRaw
          .map((track) => {
            if (typeof track === 'string') return track;
            if (track && typeof track === 'object' && typeof track.url === 'string') return track.url;
            return '';
          })
          .filter((url) => typeof url === 'string' && url.trim() !== '')
          .map((url) => url.trim());
        return {
          id: Number.isFinite(Number(item.id)) ? Number(item.id) : 0,
          taskId: String(item.task_id || item.taskId || '').trim(),
          prompt: String(item.prompt || ''),
          lyrics: String(item.lyrics || ''),
          status: String(item.status || 'queued').toLowerCase(),
          error: String(item.error || ''),
          createdAt: Number.isFinite(Number(item.created_at || item.createdAt))
            ? Number(item.created_at || item.createdAt)
            : 0,
          updatedAt: Number.isFinite(Number(item.updated_at || item.updatedAt))
            ? Number(item.updated_at || item.updatedAt)
            : 0,
          tracks
        };
      });
  }

  function renderMusicGallery() {
    if (!dom.musicList) return;
    dom.musicList.innerHTML = '';
    const items = Array.isArray(state.music.items) ? state.music.items : [];
    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'music-empty';
      empty.textContent = t('No music generated yet.');
      dom.musicList.appendChild(empty);
      return;
    }

    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'music-item';

      const head = document.createElement('div');
      head.className = 'music-item-head';

      const task = document.createElement('div');
      task.className = 'music-item-task';
      task.textContent = item.taskId ? `Task: ${item.taskId}` : `#${item.id || ''}`;

      const badge = document.createElement('span');
      badge.className = 'music-badge';
      badge.dataset.status = item.status;
      badge.textContent = formatMusicStatusLabel(item.status);

      const headActions = document.createElement('div');
      headActions.className = 'music-item-head-actions';
      headActions.appendChild(badge);

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'ghost-button danger music-delete-button';
      deleteButton.textContent = t('Delete');
      deleteButton.addEventListener('click', () => {
        void handleDeleteMusicItem(item);
      });
      headActions.appendChild(deleteButton);

      head.append(task, headActions);
      card.appendChild(head);

      const time = formatMusicTimestamp(item.updatedAt || item.createdAt);
      if (time) {
        const timeEl = document.createElement('div');
        timeEl.className = 'music-item-time';
        timeEl.textContent = time;
        card.appendChild(timeEl);
      }

      const promptLabel = document.createElement('div');
      promptLabel.className = 'music-item-label';
      promptLabel.textContent = t('Prompt');
      const promptText = document.createElement('div');
      promptText.className = 'music-item-text';
      promptText.textContent = item.prompt || '';
      card.append(promptLabel, promptText);

      if (item.lyrics) {
        const lyricsDetails = document.createElement('details');
        lyricsDetails.className = 'music-lyrics';
        const summary = document.createElement('summary');
        summary.textContent = t('Lyrics');
        const pre = document.createElement('pre');
        pre.textContent = item.lyrics;
        lyricsDetails.append(summary, pre);
        card.appendChild(lyricsDetails);
      }

      if (Array.isArray(item.tracks) && item.tracks.length) {
        const tracksWrap = document.createElement('div');
        tracksWrap.className = 'music-tracks';
        item.tracks.forEach((trackUrl, index) => {
          const resolved = resolveMediaUrl(trackUrl);
          if (!resolved) return;
          const trackCard = document.createElement('div');
          trackCard.className = 'music-track';

          const audio = document.createElement('audio');
          audio.controls = true;
          audio.preload = 'none';
          audio.src = resolved;
          trackCard.appendChild(audio);

          const actions = document.createElement('div');
          actions.className = 'music-track-actions';
          const download = document.createElement('button');
          download.type = 'button';
          download.className = 'ghost-button';
          download.textContent = t('Download Track {count}', { count: index + 1 });
          download.addEventListener('click', () => {
            downloadMediaUrl(resolved, `music_track_${index + 1}`, 'mp3');
          });
          actions.appendChild(download);
          trackCard.appendChild(actions);

          tracksWrap.appendChild(trackCard);
        });
        card.appendChild(tracksWrap);
      }

      if (item.status === 'failed' && item.error) {
        const errorEl = document.createElement('div');
        errorEl.className = 'music-item-error';
        errorEl.textContent = item.error;
        card.appendChild(errorEl);
      } else if (isMusicPendingStatus(item.status)) {
        const pendingEl = document.createElement('div');
        pendingEl.className = 'music-item-time';
        pendingEl.textContent = t('Generating... You can come back in a minute to check status.');
        card.appendChild(pendingEl);
      }

      dom.musicList.appendChild(card);
    });
  }

  function stopMusicPolling() {
    if (!musicPollTimer) return;
    clearInterval(musicPollTimer);
    musicPollTimer = null;
  }

  function isMusicModalOpen() {
    return !!(dom.musicModal && dom.musicModal.classList.contains('active'));
  }

  function stopMusicBackgroundPolling() {
    if (!musicBackgroundPollTimer) return;
    clearInterval(musicBackgroundPollTimer);
    musicBackgroundPollTimer = null;
  }

  function startMusicBackgroundPolling() {
    if (!musicWatchTaskIds.size) return;
    if (musicBackgroundPollTimer) return;
    musicBackgroundPollTimer = setInterval(() => {
      void pollMusicTaskWatch();
    }, MUSIC_STATUS_POLL_INTERVAL_MS);
  }

  function watchMusicTask(taskId, xid = '') {
    const normalizedTaskId = String(taskId || '').trim();
    if (!normalizedTaskId) return;
    const normalizedXid = normalizeXid(xid || '');
    if (normalizedXid) {
      persistXid(normalizedXid);
    }
    musicWatchTaskIds.add(normalizedTaskId);
    startMusicBackgroundPolling();
    void pollMusicTaskWatch();
  }

  async function pollMusicTaskWatch() {
    if (musicBackgroundPollInFlight) return;
    if (!musicWatchTaskIds.size) {
      stopMusicBackgroundPolling();
      return;
    }
    if (!isXpEligible()) {
      musicWatchTaskIds.clear();
      stopMusicBackgroundPolling();
      return;
    }

    musicBackgroundPollInFlight = true;
    try {
      const result = await refreshMusicGallery();
      if (!result || !result.ok) return;

      const items = Array.isArray(state.music.items) ? state.music.items : [];
      let finishedCount = 0;
      Array.from(musicWatchTaskIds).forEach((taskId) => {
        const matched = items.find((item) => item && item.taskId === taskId);
        if (!matched) return;
        if (isMusicPendingStatus(matched.status)) return;
        musicWatchTaskIds.delete(taskId);
        if (isMusicCompletedWithTracks(matched)) {
          finishedCount += 1;
        }
      });

      if (finishedCount > 0 && !isMusicModalOpen()) {
        openMusicModal();
      }

      if (!musicWatchTaskIds.size) {
        stopMusicBackgroundPolling();
      }
    } finally {
      musicBackgroundPollInFlight = false;
    }
  }

  function startMusicPolling() {
    if (musicPollTimer) return;
    musicPollTimer = setInterval(() => {
      if (!dom.musicModal || !dom.musicModal.classList.contains('active')) return;
      void refreshMusicGallery();
    }, MUSIC_STATUS_POLL_INTERVAL_MS);
  }

  async function musicRequest(payload) {
    const musicXid = normalizeXid(state.sessionId || readStoredXid());
    if (!musicXid) {
      return { ok: false, error: t('Connect your XID to use Music Generator.') };
    }
    try {
      const response = await fetch(CONFIG.musicGenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          XID: musicXid,
          membership: getMembership(),
          ...payload
        })
      });
      const rawText = await response.text();
      const { data, errorText } = parseMusicResponse(rawText);
      if (!response.ok || !data || !data.ok) {
        return { ok: false, error: errorText || t('Music request failed.') };
      }
      return data;
    } catch (err) {
      return { ok: false, error: t('Music request failed.') };
    }
  }

  async function refreshMusicGallery(options = {}) {
    if (!dom.musicModal || !dom.musicList) return null;
    const musicXid = normalizeXid(state.sessionId || readStoredXid());
    if (!musicXid) {
      state.music.items = [];
      renderMusicGallery();
      stopMusicPolling();
      musicWatchTaskIds.clear();
      stopMusicBackgroundPolling();
      setMusicStatus(t('Connect your XID to use Music Generator.'), 'error');
      return null;
    }
    if (options.showLoading) {
      setMusicStatus(t('Loading music gallery...'));
    }
    const result = await musicRequest({
      action: 'list',
      slot: state.activeSlot
    });
    if (!result || !result.ok) {
      setMusicStatus((result && result.error) || t('Unable to load music gallery.'), 'error');
      return null;
    }
    if (Object.prototype.hasOwnProperty.call(result, 'xp_total')) {
      applyXpServerState(result);
      state.xpSyncLoaded = true;
      state.xpSyncLastAt = Date.now();
    }
    if (result && result.membership) {
      applyMembershipUpdate(result.membership);
    }
    state.music.items = normalizeMusicItems(result.items);
    renderMusicGallery();

    const pendingCount = Number.isFinite(Number(result.pending_count))
      ? Number(result.pending_count)
      : state.music.items.filter((item) => isMusicPendingStatus(item.status)).length;

    if (pendingCount > 0) {
      setMusicStatus(t('Music generation in progress. You can come back in a minute to check status.'));
      startMusicPolling();
    } else {
      stopMusicPolling();
      if (state.music.items.length) {
        setMusicStatus(t('Music gallery updated.'), 'success');
      } else {
        setMusicStatus(t('No music generated yet.'));
      }
    }
    return result;
  }

  function openMusicModal() {
    if (!dom.musicModal) return;
    dom.musicModal.classList.add('active');
    dom.musicModal.setAttribute('aria-hidden', 'false');
    setMusicStatus(t('Loading music gallery...'));
    void refreshMusicGallery({ showLoading: true });
  }

  function closeMusicModal() {
    if (!dom.musicModal) return;
    dom.musicModal.classList.remove('active');
    dom.musicModal.setAttribute('aria-hidden', 'true');
    stopMusicPolling();
  }

  function collectMusicComposeHistory(maxTurns = 24, maxChars = 12000) {
    const messages = Array.isArray(state.messages) ? state.messages : [];
    const rows = [];
    messages.forEach((message) => {
      if (!message || typeof message !== 'object') return;
      const role = String(message.role || '').toLowerCase();
      if (role !== 'user' && role !== 'assistant') return;
      if (String(message.meta || '').toLowerCase() === 'system') return;
      const text = String(message.text || '').trim();
      if (!text) return;
      rows.push({
        role,
        text: text.replace(/\s+/g, ' ').trim().slice(0, 700)
      });
    });
    const trimmedRows = rows.slice(-maxTurns);
    let combined = trimmedRows
      .map((entry) => `${entry.role === 'user' ? 'User' : 'Companion'}: ${entry.text}`)
      .join('\n');
    if (combined.length > maxChars) {
      combined = combined.slice(combined.length - maxChars);
    }
    return { rows: trimmedRows, text: combined.trim() };
  }

  function parseMusicComposeSuggestion(data, rawText = '') {
    const normalize = (value) => String(value || '').trim();
    const applyLimits = (result) => ({
      prompt: normalize(result.prompt).slice(0, MUSIC_PROMPT_MAX),
      lyrics: normalize(result.lyrics).slice(0, MUSIC_LYRICS_MAX)
    });

    const fromObject = (value) => {
      if (!value || typeof value !== 'object') return { prompt: '', lyrics: '' };
      return {
        prompt: normalize(value.prompt || value.vibe || value.caption),
        lyrics: normalize(value.lyrics || value.lyric)
      };
    };

    const parseTextPayload = (value) => {
      let cleaned = normalize(value);
      if (!cleaned) return { prompt: '', lyrics: '' };
      cleaned = cleaned.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
      const start = cleaned.indexOf('{');
      const end = cleaned.lastIndexOf('}');
      if (start >= 0 && end > start) {
        const jsonText = cleaned.slice(start, end + 1);
        try {
          const parsed = JSON.parse(jsonText);
          const fromJson = fromObject(parsed);
          if (fromJson.prompt || fromJson.lyrics) {
            return fromJson;
          }
        } catch (err) {
          // ignore
        }
      }

      const promptMatch = cleaned.match(/(?:^|\n)\s*prompt\s*[:\-]\s*([\s\S]+?)(?:\n\s*(?:lyrics?|lyric)\s*[:\-]|$)/i);
      const lyricsMatch = cleaned.match(/(?:^|\n)\s*(?:lyrics?|lyric)\s*[:\-]\s*([\s\S]+)/i);
      return {
        prompt: normalize(promptMatch ? promptMatch[1] : ''),
        lyrics: normalize(lyricsMatch ? lyricsMatch[1] : '')
      };
    };

    const direct = fromObject(data);
    if (direct.prompt && direct.lyrics) {
      return applyLimits(direct);
    }

    const content = data && typeof data.content === 'string' ? data.content : '';
    const fromContent = parseTextPayload(content);
    if (fromContent.prompt && fromContent.lyrics) {
      return applyLimits(fromContent);
    }

    const fromRaw = parseTextPayload(rawText);
    if (fromRaw.prompt && fromRaw.lyrics) {
      return applyLimits(fromRaw);
    }

    return { prompt: '', lyrics: '' };
  }

  async function requestMusicComposeSuggestion(options = {}) {
    if (!CONFIG.musicVibeEndpoint) {
      throw new Error(t('Unable to generate vibe and lyrics right now.'));
    }

    const corePromptRaw = options.corePrompt !== undefined
      ? options.corePrompt
      : (dom.corePromptInput ? dom.corePromptInput.value : state.settings.corePrompt);
    const lookLikeRaw = options.lookLike !== undefined
      ? options.lookLike
      : (dom.looklikeInput ? dom.looklikeInput.value : state.settings.looklike);
    const xid = normalizeXid(options.xid || state.sessionId || readStoredXid());
    const history = collectMusicComposeHistory();
    const payload = {
      XID: xid,
      core_prompt: normalizePromptText(corePromptRaw || '').slice(0, 12000),
      look_like: normalizePromptText(lookLikeRaw || '').slice(0, 4000),
      history: history.rows,
      history_text: history.text
    };

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller
      ? setTimeout(() => controller.abort(), 50000)
      : null;
    let response;
    let rawText = '';
    let data = null;
    try {
      response = await fetch(CONFIG.musicVibeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        ...(controller ? { signal: controller.signal } : {})
      });
      rawText = await response.text();
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        data = null;
      }
    } catch (err) {
      const message = err && err.name === 'AbortError'
        ? t('Generating vibe and lyrics timed out. Please try again.')
        : t('Unable to generate vibe and lyrics right now.');
      throw new Error(message);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }

    if (!response || !response.ok || !data || !data.ok) {
      const errorText = data && data.error
        ? String(data.error).trim()
        : t('Unable to generate vibe and lyrics right now.');
      throw new Error(errorText || t('Unable to generate vibe and lyrics right now.'));
    }

    const parsed = parseMusicComposeSuggestion(data, rawText);
    if (!parsed.prompt || !parsed.lyrics) {
      throw new Error(t('Unable to generate vibe and lyrics right now.'));
    }
    return parsed;
  }

  async function promptMusicInputs() {
    if (window.Swal && typeof window.Swal.fire === 'function') {
      try {
        ensureSwalScrollGuard();
        const result = await window.Swal.fire({
          title: t('Generate Music Piece'),
          html: `
            <div class="prompt-body music-compose-form">
              <textarea id="musicPromptInput" rows="3" placeholder="${t('Describe the vibe')}" data-field="prompt"></textarea>
              <textarea id="musicLyricsInput" rows="3" placeholder="${t('Write your lyrics here')}" data-field="lyrics"></textarea>
              <button id="musicAutogenButton" type="button" class="ghost-button music-autogen-button">${t('Generate Vibe and Lyric for me')}</button>
              <div id="musicAutogenStatus" class="music-status"></div>
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: t('Generate'),
          cancelButtonText: t('Cancel'),
          focusConfirm: false,
          didOpen: () => {
            const promptEl = document.getElementById('musicPromptInput');
            const lyricsEl = document.getElementById('musicLyricsInput');
            const autogenButton = document.getElementById('musicAutogenButton');
            const autogenStatus = document.getElementById('musicAutogenStatus');
            let autogenInFlight = false;
            const setAutogenStatus = (message, tone = '') => {
              if (!autogenStatus) return;
              autogenStatus.textContent = message || '';
              if (tone) {
                autogenStatus.dataset.tone = tone;
              } else {
                delete autogenStatus.dataset.tone;
              }
            };
            [promptEl, lyricsEl].forEach((el) => {
              if (!el) return;
              el.rows = 3;
              el.dataset.minRows = '3';
              const schedule = () => requestAnimationFrame(() => resizePromptInput(el));
              el.addEventListener('input', schedule);
              el.addEventListener('focus', schedule);
              el.addEventListener('keydown', schedule);
              schedule();
            });
            if (autogenButton) {
              autogenButton.addEventListener('click', async () => {
                if (autogenInFlight) return;
                autogenInFlight = true;
                autogenButton.disabled = true;
                setAutogenStatus(t('Generating vibe and lyrics...'));
                try {
                  const generated = await requestMusicComposeSuggestion();
                  if (promptEl) {
                    promptEl.value = generated.prompt;
                    requestAnimationFrame(() => resizePromptInput(promptEl));
                  }
                  if (lyricsEl) {
                    lyricsEl.value = generated.lyrics;
                    requestAnimationFrame(() => resizePromptInput(lyricsEl));
                  }
                  setAutogenStatus(t('Prompt and lyrics generated. You can edit before submitting.'), 'success');
                } catch (err) {
                  const errorText = err && err.message
                    ? String(err.message)
                    : t('Unable to generate vibe and lyrics right now.');
                  setAutogenStatus(errorText, 'error');
                } finally {
                  autogenInFlight = false;
                  autogenButton.disabled = false;
                }
              });
            }
          },
          preConfirm: () => {
            const promptEl = document.getElementById('musicPromptInput');
            const lyricsEl = document.getElementById('musicLyricsInput');
            const prompt = promptEl ? String(promptEl.value || '').trim() : '';
            const lyrics = lyricsEl ? String(lyricsEl.value || '').trim() : '';
            if (!prompt || !lyrics) {
              window.Swal.showValidationMessage(t('Please enter both prompt and lyrics.'));
              return false;
            }
            return {
              prompt: prompt.slice(0, MUSIC_PROMPT_MAX),
              lyrics: lyrics.slice(0, MUSIC_LYRICS_MAX)
            };
          }
        });
        if (!result.isConfirmed || !result.value) return null;
        return result.value;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: music prompt dialog failed', err);
        }
      }
    }
    if (typeof window !== 'undefined' && typeof window.__chatroomRequestMusicInputs === 'function') {
      try {
        const fallbackResult = await window.__chatroomRequestMusicInputs({
          title: t('Generate Music Piece'),
          promptPlaceholder: t('Describe the vibe'),
          lyricsPlaceholder: t('Write your lyrics here'),
          autoGenerateText: t('Generate Vibe and Lyric for me'),
          autoGenerateLoadingText: t('Generating vibe and lyrics...'),
          autoGenerateSuccessText: t('Prompt and lyrics generated. You can edit before submitting.'),
          autoGenerateErrorText: t('Unable to generate vibe and lyrics right now.'),
          xid: normalizeXid(state.sessionId || readStoredXid()),
          confirmText: t('Generate'),
          cancelText: t('Cancel')
        });
        const fallbackPrompt = fallbackResult ? String(fallbackResult.prompt || '').trim() : '';
        const fallbackLyrics = fallbackResult ? String(fallbackResult.lyrics || '').trim() : '';
        if (!fallbackPrompt || !fallbackLyrics) {
          return null;
        }
        return {
          prompt: fallbackPrompt.slice(0, MUSIC_PROMPT_MAX),
          lyrics: fallbackLyrics.slice(0, MUSIC_LYRICS_MAX)
        };
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: music inline textarea fallback failed', err);
        }
      }
    }
    await showAlert({
      title: t('Music generation failed'),
      text: t('Music input dialog is unavailable right now. Please refresh and try again.'),
      icon: 'error'
    });
    return null;
  }

  async function handleDeleteMusicItem(item) {
    if (!item || (!item.id && !item.taskId)) {
      return;
    }

    const confirmed = await confirmDialog({
      title: t('Delete Music Piece?'),
      text: t('This will remove this music piece from your gallery.'),
      confirmText: t('Delete'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) {
      return;
    }

    const normalizedTaskId = String(item.taskId || '').trim();
    if (normalizedTaskId) {
      musicWatchTaskIds.delete(normalizedTaskId);
      if (!musicWatchTaskIds.size) {
        stopMusicBackgroundPolling();
      }
    }

    setMusicStatus(t('Deleting music piece...'));
    const result = await musicRequest({
      action: 'delete',
      id: Number.isFinite(Number(item.id)) ? Number(item.id) : 0,
      task_id: String(item.taskId || '').trim()
    });

    if (Object.prototype.hasOwnProperty.call(result || {}, 'xp_total')) {
      applyXpServerState(result);
      state.xpSyncLoaded = true;
      state.xpSyncLastAt = Date.now();
    }

    if (!result || !result.ok) {
      const errorText = (result && result.error) || t('Unable to delete music right now.');
      setMusicStatus(errorText, 'error');
      await showAlert({
        title: t('Delete failed'),
        text: errorText,
        icon: 'error'
      });
      return;
    }

    await refreshMusicGallery();
    setMusicStatus(t('Music deleted.'), 'success');
  }

  async function handleGenerateMusicPiece() {
    if (!isXpEligible()) {
      setMusicStatus(t('Connect your XID to spend XP levels.'), 'error');
      await showAlert({
        title: t('Login required'),
        text: t('Connect your XID to spend XP levels.'),
        icon: 'info'
      });
      return;
    }
    if (!(await ensureXpSyncReady())) {
      setMusicStatus(t('Syncing from cloud. Try again in a moment.'), 'error');
      await showAlert({
        title: t('Syncing from cloud. Try again in a moment.'),
        text: t('Syncing from cloud. Try again in a moment.'),
        icon: 'info'
      });
      return;
    }
    if (getXpLevel() < MUSIC_GENERATE_COST_LEVELS) {
      setMusicStatus(t('Need {count} levels to generate music.', { count: MUSIC_GENERATE_COST_LEVELS }), 'error');
      await showAlert({
        title: t('Not enough levels'),
        text: t('Need {count} levels to generate music.', { count: MUSIC_GENERATE_COST_LEVELS }),
        icon: 'warning'
      });
      return;
    }
    const input = await promptMusicInputs();
    if (!input) return;
    const confirmed = await confirmDialog({
      title: t('Generate Music Piece?'),
      text: t('Spend {count} levels to generate this music piece.', { count: MUSIC_GENERATE_COST_LEVELS }),
      confirmText: t('Generate'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) {
      return;
    }
    if (musicGenerateInFlight) return;

    musicGenerateInFlight = true;
    if (dom.generateMusicButton) {
      dom.generateMusicButton.disabled = true;
    }
    setMusicStatus(t('Submitting music generation request...'));
    try {
      const result = await musicRequest({
        action: 'generate',
        slot: state.activeSlot,
        prompt: input.prompt,
        lyrics: input.lyrics
      });

      if (Object.prototype.hasOwnProperty.call(result || {}, 'xp_total')) {
        applyXpServerState(result);
        state.xpSyncLoaded = true;
        state.xpSyncLastAt = Date.now();
      }

      if (!result || !result.ok) {
        const errorText = (result && result.error) || t('Unable to generate music right now.');
        setMusicStatus(errorText, 'error');
        await showAlert({
          title: t('Music generation failed'),
          text: errorText,
          icon: 'error'
        });
        return;
      }

      const queuedMessage = t('Music generation queued. You can come back in a minute to check status.');
      setMusicStatus(queuedMessage, 'success');
      if (result && result.task_id) {
        watchMusicTask(result.task_id);
      }
      await showAlert({
        title: t('Music Generation Queued'),
        text: queuedMessage,
        icon: 'success'
      });
      await refreshMusicGallery();
    } catch (err) {
      const errorText = t('Unable to generate music right now.');
      setMusicStatus(errorText, 'error');
      await showAlert({
        title: t('Music generation failed'),
        text: errorText,
        icon: 'error'
      });
    } finally {
      musicGenerateInFlight = false;
      if (dom.generateMusicButton) {
        dom.generateMusicButton.disabled = false;
      }
    }
  }

  class PngDecodeError extends Error {
    constructor(message, options) {
      super(message, options);
      this.name = 'PNG Decode Error';
    }
  }

  class PngFormatError extends Error {
    constructor(message, options) {
      super(message, options);
      this.name = 'PNG Format Error';
    }
  }

  class PngMissingCharacterError extends Error {
    constructor(message, options) {
      super(message, options);
      this.name = 'PNG Missing Character Error';
    }
  }

  class PngInvalidCharacterError extends Error {
    constructor(message, options) {
      super(message, options);
      this.name = 'PNG Invalid Character Error';
    }
  }

  class CardImportError extends Error {
    constructor(message, options) {
      super(message, options);
      this.name = 'Card Import Error';
      this.details = options || null;
    }
  }

  const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  const CRC32_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let i = 0; i < 256; i += 1) {
      let value = i;
      for (let j = 0; j < 8; j += 1) {
        value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
      }
      table[i] = value >>> 0;
    }
    return table;
  })();

  function readUint32BE(bytes, idx) {
    return ((bytes[idx] << 24) | (bytes[idx + 1] << 16) | (bytes[idx + 2] << 8) | bytes[idx + 3]) >>> 0;
  }

  function crc32ForChunk(type, data) {
    let crc = 0xffffffff;
    for (let i = 0; i < type.length; i += 1) {
      const byte = type.charCodeAt(i) & 0xff;
      crc = CRC32_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    }
    for (let i = 0; i < data.length; i += 1) {
      crc = CRC32_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function decodePngTextChunk(data) {
    let naming = true;
    let keyword = '';
    let text = '';
    for (let index = 0; index < data.length; index += 1) {
      const code = data[index];
      if (naming) {
        if (code) {
          keyword += String.fromCharCode(code);
        } else {
          naming = false;
        }
      } else if (code) {
        text += String.fromCharCode(code);
      } else {
        throw new PngDecodeError('Invalid NULL character found in PNG tEXt chunk');
      }
    }
    return { keyword, text };
  }

  function parsePngCharacterText(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    if (bytes.length < 12 || !PNG_SIGNATURE.every((value, idx) => bytes[idx] === value)) {
      throw new PngFormatError('Invalid PNG header');
    }

    let idx = 8;
    let foundIend = false;
    let sawIhdr = false;
    const textChunks = [];

    while (idx < bytes.length) {
      if (idx + 8 > bytes.length) {
        throw new PngDecodeError('PNG ended prematurely, missing chunk header');
      }
      const length = readUint32BE(bytes, idx);
      idx += 4;
      const type = String.fromCharCode(bytes[idx], bytes[idx + 1], bytes[idx + 2], bytes[idx + 3]);
      idx += 4;

      if (!sawIhdr && type !== 'IHDR') {
        throw new PngDecodeError('PNG missing IHDR header');
      }
      sawIhdr = true;

      if (idx + length + 4 > bytes.length) {
        throw new PngDecodeError('PNG ended prematurely, missing chunk data');
      }
      const data = bytes.slice(idx, idx + length);
      idx += length;
      const crc = readUint32BE(bytes, idx);
      idx += 4;

      const expected = crc32ForChunk(type, data);
      if (crc !== expected) {
        throw new PngDecodeError(`CRC for "${type}" header is invalid, file is likely corrupted`);
      }

      if (type === 'tEXt') {
        textChunks.push(decodePngTextChunk(data));
      }
      if (type === 'IEND') {
        foundIend = true;
        break;
      }
    }

    if (!foundIend) {
      throw new PngDecodeError('PNG ended prematurely, missing IEND header');
    }
    if (!textChunks.length) {
      throw new PngMissingCharacterError('No PNG text fields found in file');
    }
    const chara = textChunks.find((entry) => entry.keyword === 'chara');
    if (!chara) {
      throw new PngMissingCharacterError('No PNG text field named "chara" found in file');
    }
    try {
      const decoded = Uint8Array.from(atob(chara.text), (char) => char.charCodeAt(0));
      return new TextDecoder().decode(decoded);
    } catch (err) {
      throw new PngInvalidCharacterError('Unable to parse "chara" field as base64', { cause: err });
    }
  }

  function parseCharacterCardJson(arrayBuffer) {
    const text = parsePngCharacterText(arrayBuffer);
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new PngInvalidCharacterError('Unable to parse "chara" field as JSON', { cause: err });
    }
  }

  function normalizeCardString(value) {
    if (typeof value !== 'string') return '';
    return value.trim();
  }

  function pickCardString(...values) {
    for (let i = 0; i < values.length; i += 1) {
      const cleaned = normalizeCardString(values[i]);
      if (cleaned) return cleaned;
    }
    return '';
  }

  function resolveCardPayload(json) {
    if (!json || typeof json !== 'object') return null;
    if (typeof json.spec === 'string') {
      const spec = json.spec.toLowerCase();
      if (spec === 'chara_card_v2' || spec === 'muah_x_card') {
        return json.data && typeof json.data === 'object' ? json.data : {};
      }
    }
    return json;
  }

  function extractCardCharacterFields(json) {
    const payload = resolveCardPayload(json) || {};
    const data = json && typeof json === 'object' && json.data && typeof json.data === 'object'
      ? json.data
      : {};
    const name = pickCardString(
      payload.name,
      payload.char_name,
      payload.character && payload.character.name,
      data.name,
      data.char_name
    );
    const corePrompt = pickCardString(
      payload.core_data,
      payload.coreData,
      data.core_data,
      data.coreData
    );
    const lookLike = pickCardString(
      payload.look_like,
      payload.lookLike,
      data.look_like,
      data.lookLike
    );
    return { name, corePrompt, lookLike };
  }

  const CARD_RECREATE_STRIP_KEYS = new Set(['core_data', 'coreData', 'core_prompt', 'corePrompt']);

  function stripCardCoreData(value) {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) {
      value.forEach((entry) => stripCardCoreData(entry));
      return;
    }
    Object.keys(value).forEach((key) => {
      if (CARD_RECREATE_STRIP_KEYS.has(key)) {
        delete value[key];
        return;
      }
      stripCardCoreData(value[key]);
    });
  }

  function buildCardRecreationInfo(json) {
    if (!json || typeof json !== 'object') return null;
    let cloned = null;
    try {
      cloned = JSON.parse(JSON.stringify(json));
    } catch (err) {
      return null;
    }
    stripCardCoreData(cloned);
    return cloned;
  }

  function hasCardRecreationInfo(info) {
    if (!info) return false;
    try {
      const text = JSON.stringify(info);
      return Boolean(text && text !== '{}' && text !== '[]');
    } catch (err) {
      return false;
    }
  }

  function encodeBase64Utf8(text) {
    const encoded = new TextEncoder().encode(String(text || ''));
    let binary = '';
    for (let i = 0; i < encoded.length; i += 1) {
      binary += String.fromCharCode(encoded[i]);
    }
    return btoa(binary);
  }

  function encodePngTextChunk(keyword, text) {
    const key = String(keyword);
    const value = String(text);
    if (key.length > 79) {
      throw new PngDecodeError(`Keyword "${key}" is longer than the 79 character limit`);
    }
    const data = new Uint8Array(key.length + value.length + 1);
    let idx = 0;
    for (let i = 0; i < key.length; i += 1) {
      const code = key.charCodeAt(i);
      if (!code) {
        throw new PngDecodeError('0x00 character is not permitted in tEXt keywords');
      }
      data[idx++] = code;
    }
    data[idx++] = 0;
    for (let i = 0; i < value.length; i += 1) {
      const code = value.charCodeAt(i);
      if (!code) {
        throw new PngDecodeError('0x00 character is not permitted in tEXt text');
      }
      data[idx++] = code;
    }
    return data;
  }

  function readPngChunks(bytes) {
    if (bytes.length < 12 || !PNG_SIGNATURE.every((value, idx) => bytes[idx] === value)) {
      throw new PngFormatError('Invalid PNG header');
    }
    let idx = 8;
    let sawIhdr = false;
    const chunks = [];
    while (idx < bytes.length) {
      if (idx + 8 > bytes.length) {
        throw new PngDecodeError('PNG ended prematurely, missing chunk header');
      }
      const length = readUint32BE(bytes, idx);
      idx += 4;
      const type = String.fromCharCode(bytes[idx], bytes[idx + 1], bytes[idx + 2], bytes[idx + 3]);
      idx += 4;
      if (!sawIhdr && type !== 'IHDR') {
        throw new PngDecodeError('PNG missing IHDR header');
      }
      sawIhdr = true;
      if (idx + length + 4 > bytes.length) {
        throw new PngDecodeError('PNG ended prematurely, missing chunk data');
      }
      const data = bytes.slice(idx, idx + length);
      idx += length;
      const crc = readUint32BE(bytes, idx);
      idx += 4;
      const expected = crc32ForChunk(type, data);
      if (crc !== expected) {
        throw new PngDecodeError(`CRC for "${type}" header is invalid, file is likely corrupted`);
      }
      chunks.push({ type, data });
      if (type === 'IEND') {
        break;
      }
    }
    if (!chunks.length || chunks[chunks.length - 1].type !== 'IEND') {
      throw new PngDecodeError('PNG ended prematurely, missing IEND header');
    }
    return chunks;
  }

  function writeUint32BE(buffer, idx, value) {
    buffer[idx] = (value >>> 24) & 0xff;
    buffer[idx + 1] = (value >>> 16) & 0xff;
    buffer[idx + 2] = (value >>> 8) & 0xff;
    buffer[idx + 3] = value & 0xff;
  }

  function encodePngChunks(chunks) {
    const totalLength = chunks.reduce((sum, chunk) => sum + 12 + chunk.data.length, 8);
    const output = new Uint8Array(totalLength);
    output.set(PNG_SIGNATURE, 0);
    let idx = 8;
    chunks.forEach((chunk) => {
      writeUint32BE(output, idx, chunk.data.length);
      idx += 4;
      output[idx++] = chunk.type.charCodeAt(0);
      output[idx++] = chunk.type.charCodeAt(1);
      output[idx++] = chunk.type.charCodeAt(2);
      output[idx++] = chunk.type.charCodeAt(3);
      output.set(chunk.data, idx);
      idx += chunk.data.length;
      const crc = crc32ForChunk(chunk.type, chunk.data);
      writeUint32BE(output, idx, crc);
      idx += 4;
    });
    return output;
  }

  function buildCharacterCardPayload(data) {
    return {
      spec: 'muah_x_card',
      spec_version: '1.0',
      data: {
        name: data.name,
        core_data: data.corePrompt,
        look_like: data.looklike
      }
    };
  }

  function sanitizeFilename(value) {
    const cleaned = String(value || '')
      .replace(/[^a-zA-Z0-9_-]+/g, '_')
      .replace(/^_+|_+$/g, '');
    return cleaned || 'character';
  }

  function getCurrentAvatarUrl() {
    const fromMessage = findLastAssistantImageUrl();
    if (fromMessage) return fromMessage;
    const avatarImg = document.querySelector('.avatar img');
    if (avatarImg && avatarImg.src) return avatarImg.src;
    try {
      const stored = localStorage.getItem(getSlotAvatarKey()) || '';
      if (stored) return stored;
    } catch (err) {
      // ignore storage errors
    }
    return 'assets/companion.jpg';
  }

  async function fetchAvatarBlob(url) {
    const resolved = resolveMediaUrl(url);
    if (resolved) {
      try {
        const response = await fetch(resolved, { cache: 'no-store' });
        if (response.ok) {
          return await response.blob();
        }
      } catch (err) {
        // fall back to default image
      }
    }
    const fallback = await fetch('assets/companion.jpg', { cache: 'no-store' });
    if (!fallback.ok) {
      throw new Error('Card image unavailable.');
    }
    return fallback.blob();
  }

  function loadImageFromBlob(blob) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Image load failed.'));
      };
      img.src = url;
    });
  }

  async function convertImageBlobToPngArrayBuffer(blob) {
    if (blob.type === 'image/png') {
      return blob.arrayBuffer();
    }
    const img = await loadImageFromBlob(blob);
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width || 600;
    canvas.height = img.naturalHeight || img.height || 900;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas unavailable.');
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    if (!canvas.toBlob) {
      const dataUrl = canvas.toDataURL('image/png');
      const response = await fetch(dataUrl);
      return response.arrayBuffer();
    }
    const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!pngBlob) {
      throw new Error('Image conversion failed.');
    }
    return pngBlob.arrayBuffer();
  }

  function embedCharacterDataInPng(arrayBuffer, jsonText) {
    const chunks = readPngChunks(new Uint8Array(arrayBuffer)).filter((chunk) => chunk.type !== 'tEXt');
    const encoded = encodeBase64Utf8(jsonText);
    const textChunk = encodePngTextChunk('chara', encoded);
    chunks.splice(-1, 0, { type: 'tEXt', data: textChunk });
    return encodePngChunks(chunks);
  }

  function buildCurrentCardData(options = {}) {
    const name = normalizeAiName(dom.aiNameInput ? dom.aiNameInput.value : state.settings.aiName);
    const coreRaw = dom.corePromptInput ? dom.corePromptInput.value : state.settings.corePrompt;
    const lookRaw = dom.looklikeInput ? dom.looklikeInput.value : state.settings.looklike;
    const tokenLimits = getMembershipTokenLimits();
    const coreLimit = resolvePromptLimit(tokenLimits.core);
    const lookLimit = resolvePromptLimit(tokenLimits.looklike);
    const corePrompt = normalizePromptText(coreRaw);
    const looklike = normalizePromptText(lookRaw);
    if (options.showAlert) {
      const coreTokens = countTokens(corePrompt);
      if (coreLimit > 0 && coreTokens > coreLimit) {
        maybeShowTokenLimitAlert('core', coreLimit);
      }
      const lookTokens = countTokens(looklike);
      if (lookLimit > 0 && lookTokens > lookLimit) {
        maybeShowTokenLimitAlert('looklike', lookLimit);
      }
    }
    updateSettingTokenCounts();
    return {
      name: name || DEFAULT_AI_NAME,
      corePrompt,
      looklike
    };
  }

  async function createCharacterCardPngBlob(payload) {
    const avatarUrl = getCurrentAvatarUrl();
    const avatarBlob = await fetchAvatarBlob(avatarUrl);
    const baseBuffer = await convertImageBlobToPngArrayBuffer(avatarBlob);
    const jsonText = JSON.stringify(payload, null, '\t');
    const encoded = embedCharacterDataInPng(baseBuffer, jsonText);
    return new Blob([encoded], { type: 'image/png' });
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function buildMediaDownloadFilename(url, fallbackBase = 'media', fallbackExt = '') {
    const safeBase = sanitizeFilename(fallbackBase || 'media');
    let base = '';
    let ext = '';
    try {
      const parsed = new URL(url, window.location.href);
      let name = parsed.pathname.split('/').pop() || '';
      if (name) {
        try {
          name = decodeURIComponent(name);
        } catch (err) {
          // ignore decode errors
        }
        const parts = name.split('.');
        if (parts.length > 1) {
          ext = parts.pop();
          base = parts.join('.');
        } else {
          base = name;
        }
      }
    } catch (err) {
      // ignore parse errors
    }
    base = sanitizeFilename(base || safeBase);
    ext = sanitizeFilename(ext || fallbackExt || '');
    return ext ? `${base}.${ext}` : base;
  }

  function downloadMediaUrl(url, fallbackBase = 'media', fallbackExt = '') {
    const resolved = resolveMediaUrl(url);
    if (!resolved) return;
    const filename = buildMediaDownloadFilename(resolved, fallbackBase, fallbackExt);
    const link = document.createElement('a');
    link.href = resolved;
    if (filename) {
      link.download = filename;
    }
    link.rel = 'noopener';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function downloadCurrentCharacterCard() {
    try {
      const data = buildCurrentCardData({ showAlert: true });
      const payload = buildCharacterCardPayload(data);
      const pngBlob = await createCharacterCardPngBlob(payload);
      const filename = `${sanitizeFilename(data.name)}.card.png`;
      downloadBlob(pngBlob, filename);
    } catch (err) {
      await showAlert({
        title: t('Download failed'),
        text: t('Unable to create the character card image. Please try again.'),
        icon: 'error'
      });
    }
  }

  let isExportingCard = false;

  async function exportCardToMuahGallery() {
    const membershipInfo = getMembershipInfo();
    if (membershipInfo.tier === 'free') {
      showVipPurchaseAlert('Upgrade to VIP to export your character card to the Muah Gallery.');
      return;
    }
    if (!state.cloudSync || !state.sessionId) {
      await showAlert({
        title: t('Login required'),
        text: t('Connect your XID to export to the Muah Gallery.'),
        icon: 'info'
      });
      return;
    }
    if (isExportingCard) {
      return;
    }
    const data = buildCurrentCardData({ showAlert: true });
    const payload = buildCharacterCardPayload(data);
    const content = data.corePrompt || '';
    if (content.length < 1500) {
      await showAlert({
        title: t('Card Content Too Short'),
        text: t('The content should be at least 1500 characters long. Only quality cards are accepted to the system.'),
        icon: 'warning'
      });
      return;
    }
    isExportingCard = true;
    try {
      if (window.Swal && typeof window.Swal.fire === 'function') {
        window.Swal.fire({
          title: t('Exporting Card...'),
          text: t('Tip: You can edit card info on card gallery website under your account after successful export.'),
          timer: 5000,
          showConfirmButton: false
        });
      }

      const authHeader = 'Basic aGFydmFyZDE5MzI6TkxUZSBRZDF4IFVBNFEgaGRObCBIU2tsIEdXVVI=';
      let authorId = 6;
      const email = `${state.sessionId}@muah.ai`;
      const userResponse = await fetch(`https://card.muah.ai/getid.php?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {}
      });
      const user = await userResponse.json();
      if (user && user.user_id) {
        authorId = user.user_id;
      }

      const existingPostsResponse = await fetch('https://card.muah.ai/wp-json/wp/v2/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        }
      });
      const existingPostsRaw = await existingPostsResponse.json();
      const existingPosts = Array.isArray(existingPostsRaw) ? existingPostsRaw : [];
      const existingPost = existingPosts.find((post) => post && post.title && post.title.rendered === data.name);
      if (existingPost) {
        await showAlert({
          title: t('Duplicate Post'),
          text: t('A post with this name already exists.'),
          icon: 'warning'
        });
        return;
      }

      const pngBlob = await createCharacterCardPngBlob(payload);
      const imageResponse = await fetch('https://card.muah.ai/wp-json/wp/v2/media', {
        method: 'POST',
        headers: {
          'Content-Disposition': `form-data; filename=MuahAICard${sanitizeFilename(state.sessionId).slice(0, 6)}.png`,
          'Content-Type': 'image/png',
          'Authorization': authHeader
        },
        body: pngBlob
      });
      const imageResult = await imageResponse.json();
      if (!imageResult || !imageResult.id) {
        throw new Error('Upload failed.');
      }

      const postData = {
        title: data.name,
        content,
        status: 'publish',
        author: authorId,
        categories: [121],
        featured_media: imageResult.id
      };

      await fetch('https://card.muah.ai/wp-json/wp/v2/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify(postData)
      });

      await showAlert({
        title: t('Export Successful'),
        text: t('Your character card has been successfully exported to the Muah Character Gallery.'),
        icon: 'success'
      });
    } catch (err) {
      await showAlert({
        title: t('Export Error'),
        text: t('An error occurred while exporting your custom character to the Muah Character Gallery. Please try again.'),
        icon: 'error'
      });
    } finally {
      isExportingCard = false;
    }
  }

  async function openShareCardOptions() {
    if (window.Swal && typeof window.Swal.fire === 'function') {
      const result = await window.Swal.fire({
        title: t('Share My Card'),
        text: t('Choose an option.'),
        icon: 'info',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: t('Download Current Character Card Image'),
        denyButtonText: t('Export to Muah Gallery'),
        reverseButtons: true,
        focusCancel: true
      });
      if (result.isConfirmed) {
        await downloadCurrentCharacterCard();
      } else if (result.isDenied) {
        await exportCardToMuahGallery();
      }
      return;
    }
    if (confirm(t('Download the current character card image?'))) {
      await downloadCurrentCharacterCard();
      return;
    }
    if (confirm(t('Export to Muah Gallery?'))) {
      await exportCardToMuahGallery();
    }
  }

  async function showAlert({ title, text, icon }) {
    ensureSwalScrollGuard();
    if (window.Swal && typeof window.Swal.fire === 'function') {
      await window.Swal.fire({
        title: title || t('Notice'),
        text: text || '',
        icon: icon || 'info',
        confirmButtonText: t('OK')
      });
      return;
    }
    const fallbackText = text ? `${title || t('Notice')}\n${text}` : (title || t('Notice'));
    alert(fallbackText);
  }

  function showLoadingDialog({ title, text }) {
    ensureSwalScrollGuard();
    if (window.Swal && typeof window.Swal.fire === 'function') {
      window.Swal.fire({
        title: title || t('Loading...'),
        text: text || '',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          if (typeof window.Swal.showLoading === 'function') {
            window.Swal.showLoading();
          }
        }
      });
      return true;
    }
    return false;
  }

  function closeLoadingDialog() {
    if (window.Swal && typeof window.Swal.close === 'function') {
      window.Swal.close();
    }
  }

  function captureScrollPositions() {
    const entries = [];
    const push = (el) => {
      if (!el) return;
      entries.push({ el, top: el.scrollTop, left: el.scrollLeft });
    };
    push(document.scrollingElement);
    push(dom.chatLog);
    push(dom.communityScroll);
    push(dom.communitySheetPanel);
    return entries;
  }

  function restoreScrollPositions(entries) {
    if (!entries || !entries.length) return;
    entries.forEach(({ el, top, left }) => {
      if (!el) return;
      el.scrollTop = top;
      el.scrollLeft = left;
    });
  }

  function scheduleScrollRestore(entries) {
    restoreScrollPositions(entries);
    requestAnimationFrame(() => restoreScrollPositions(entries));
    setTimeout(() => restoreScrollPositions(entries), 0);
  }

  function ensureSwalScrollGuard() {
    if (!window.Swal || typeof window.Swal.fire !== 'function') return;
    if (swalFireOriginal) return;
    swalFireOriginal = window.Swal.fire.bind(window.Swal);
    window.Swal.fire = (...args) => {
      const snapshot = captureScrollPositions();
      const wrapOptions = args.length === 1 && args[0] && typeof args[0] === 'object' && !Array.isArray(args[0]);
      if (wrapOptions) {
        const options = args[0];
        const userDidOpen = options.didOpen;
        const userDidClose = options.didClose;
        args[0] = {
          heightAuto: false,
          scrollbarPadding: false,
          returnFocus: false,
          ...options,
          didOpen: (popup) => {
            scheduleScrollRestore(snapshot);
            if (typeof userDidOpen === 'function') {
              userDidOpen(popup);
            }
          },
          didClose: (popup) => {
            scheduleScrollRestore(snapshot);
            if (typeof userDidClose === 'function') {
              userDidClose(popup);
            }
          }
        };
      }
      const result = swalFireOriginal(...args);
      scheduleScrollRestore(snapshot);
      Promise.resolve(result).then(() => {
        scheduleScrollRestore(snapshot);
      });
      return result;
    };
  }

  async function loadCharacterCardFromImage(imageUrl, options = {}) {
    const allowMissing = options && options.allowMissing === true;
    const resolvedUrl = resolveMediaUrl(imageUrl);
    const proxyUrl = `${CONFIG.communityImageEndpoint}?url=${encodeURIComponent(resolvedUrl)}`;
    const response = await fetch(proxyUrl, { method: 'GET', cache: 'no-store' });
    if (!response.ok) {
      throw new CardImportError(`Image fetch failed with status ${response.status}`, {
        status: response.status
      });
    }
    const contentType = response.headers.get('content-type') || '';
    const buffer = await response.arrayBuffer();
    const json = parseCharacterCardJson(buffer);
    const fields = extractCardCharacterFields(json);
    const missing = [];
    if (!fields.name) missing.push('name');
    if (!fields.corePrompt) missing.push('core_data');
    if (missing.length && !allowMissing) {
      throw new CardImportError(`Missing card fields: ${missing.join(', ')}`, {
        missing,
        contentType
      });
    }
    return {
      fields,
      json,
      contentType,
      url: resolvedUrl,
      missing
    };
  }

  async function resetChatForImport() {
    if (state.cloudSync) {
      const cleared = await clearCloudHistory();
      if (!cleared) {
        return false;
      }
    }
    clearQueuePool();
    state.messages = [];
    saveToStorage(STORAGE_KEYS.history, state.messages);
    writeCloudResetMarker(state.activeSlot);
    state.settings.memorySummary = '';
    persistSettings();
    resetMemoryCompactionState();
    renderMessages();
    hideTyping();
    resetRecordingState();
    if (dom.messageInput) {
      dom.messageInput.value = '';
    }
    updateComposerActions();
    state.promptMode = 'photo';
    state.promptSourceUrl = '';
    ensureInitialScroll();
    return true;
  }

  function applyImportedCharacter(fields, options = {}) {
    const avatarUrl = typeof options.avatarUrl === 'string' ? options.avatarUrl : '';
    const characterId = normalizeCharacterId(typeof options.characterId === 'string' ? options.characterId : '');
    state.settings.aiName = normalizeAiName(fields.name);
    state.settings.corePrompt = normalizePromptText(fields.corePrompt);
    state.settings.looklike = normalizePromptText(fields.lookLike);
    state.settings.personaPreset = 'custom';
    state.settings.looklikePreset = 'custom';
    state.characterId = characterId || `imported:${randomId(6)}`;
    state.deferCharacterModal = false;
    updateAiNameDisplay();
    if (dom.aiNameInput) {
      dom.aiNameInput.value = state.settings.aiName;
    }
    if (dom.corePromptInput) {
      dom.corePromptInput.value = state.settings.corePrompt;
    }
    if (dom.looklikeInput) {
      dom.looklikeInput.value = state.settings.looklike;
    }
    updatePresetButtons('persona', state.settings.personaPreset);
    updatePresetButtons('looklike', state.settings.looklikePreset);
    updateSettingTokenCounts();
    if (avatarUrl) {
      updateCompanionAvatar(avatarUrl);
      persistCompanionAvatar(avatarUrl);
    }
    persistSettings();
  }

  async function recreateCommunityCardWithAi(card, post, options = {}) {
    const imageUrl = card && card.url ? card.url : '';
    if (!imageUrl) {
      await showAlert({
        title: t('Import failed'),
        text: t('This card cannot be imported. Please use other cards instead.'),
        icon: 'error'
      });
      return false;
    }
    const cardInfo = buildCardRecreationInfo(card.json);
    const hasInfo = hasCardRecreationInfo(cardInfo);
    let loadingVisible = false;
    const stopLoading = () => {
      if (loadingVisible) {
        closeLoadingDialog();
        loadingVisible = false;
      }
    };
    try {
      loadingVisible = showLoadingDialog({
        title: t('Recreating character...'),
        text: t('Analyzing photo with advanced AI...')
      });
      const content = await requestDreamCharacterProfile(imageUrl, hasInfo ? cardInfo : null);
      const profile = parseDreamCharacterProfile(content);
      if (!profile) {
        throw new Error(t('Unable to generate dream character.'));
      }

      const resetOk = await resetChatForImport();
      if (!resetOk) {
        stopLoading();
        await showAlert({
          title: t('Import failed'),
          text: t('Unable to reset chat history. Please try again.'),
          icon: 'error'
        });
        return false;
      }

      const characterId = post && Number.isFinite(post.id)
        ? `imported:${post.id}`
        : `imported:${randomId(6)}`;
      applyImportedCharacter({
        name: profile.name,
        corePrompt: profile.corePrompt,
        lookLike: profile.lookLike
      }, {
        avatarUrl: imageUrl,
        characterId
      });
      const backgroundUrl = getCommunityVideoUrl(post) || imageUrl;
      if (backgroundUrl) {
        applyChatroomBackground(backgroundUrl);
      }
      closeAllOverlays();
      stopLoading();
      if (!options.skipAlert) {
        await showAlert({
          title: t('Character recreated'),
          text: t('Your character was updated and the chat was reset.'),
          icon: 'success'
        });
      } else {
        addSystemMessage(t('Character recreated'));
      }
      focusMessageInput();
      return true;
    } catch (err) {
      const message = err && err.message ? err.message : t('No response received. Try again.');
      stopLoading();
      await showAlert({
        title: t('Recreate failed'),
        text: message,
        icon: 'error'
      });
      return false;
    } finally {
      stopLoading();
    }
  }

  async function promptAdvancedCardRecreation(card, post, options = {}) {
    const name = card && card.fields && card.fields.name ? card.fields.name : '';
    const text = name
      ? t('This card is missing core data. Use Advanced AI to recreate "{name}" from the photo and reset your chat history.', { name })
      : t('This card is missing core data. Use Advanced AI to recreate it from the photo and reset your chat history.');
    const confirmed = await confirmDialog({
      title: t('Import failed'),
      text,
      confirmText: t('Use Advanced AI to Recreate it for me.'),
      cancelText: t('Cancel'),
      icon: 'error'
    });
    if (!confirmed) {
      return false;
    }
    return recreateCommunityCardWithAi(card, post, options);
  }

  function closeAllOverlays() {
    closeCommunityModal();
    closeSettingsModal();
    closeCloudToolsModal();
    closeSlotModal();
    closeGallery();
    closeMusicModal();
    closePhotoModal();
    closePrompt();
    closeAuthModal();
    closeCharacterModal();
  }

  function focusMessageInput() {
    if (dom.messageInput) {
      dom.messageInput.focus();
    }
  }

  async function importCommunityCard(post, options = {}) {
    if (!post) return false;
    const skipConfirm = options && options.skipConfirm === true;
    const skipAlert = options && options.skipAlert === true;
    const imageUrl = post.imageFullUrl || post.imageUrl;
    if (!imageUrl) {
      await showAlert({
        title: t('Import failed'),
        text: t('This card cannot be imported. Please use other cards instead.'),
        icon: 'error'
      });
      return false;
    }

    let card;
    try {
      card = await loadCharacterCardFromImage(imageUrl, { allowMissing: true });
    } catch (err) {
      console.warn('Community card import failed.', {
        postId: post.id,
        postTitle: post.title,
        imageUrl,
        errorName: err && err.name ? err.name : 'Error',
        errorMessage: err && err.message ? err.message : String(err),
        errorDetails: err && err.details ? err.details : null,
        errorStack: err && err.stack ? err.stack : null
      });
      await showAlert({
        title: t('Import failed'),
        text: t('This card cannot be imported. Please use other cards instead.'),
        icon: 'error'
      });
      return false;
    }

    if (card.missing && card.missing.length) {
      if (card.missing.includes('core_data')) {
        console.warn('Community card import missing core data.', {
          postId: post.id,
          postTitle: post.title,
          imageUrl,
          missing: card.missing,
          contentType: card.contentType
        });
        return await promptAdvancedCardRecreation(card, post, { skipAlert });
      }
      console.warn('Community card import failed (missing required fields).', {
        postId: post.id,
        postTitle: post.title,
        imageUrl,
        missing: card.missing,
        contentType: card.contentType
      });
      await showAlert({
        title: t('Import failed'),
        text: t('This card cannot be imported. Please use other cards instead.'),
        icon: 'error'
      });
      return false;
    }

    if (!skipConfirm) {
      const confirmed = await confirmDialog({
        title: t('Replace current character?'),
        text: t('Import "{name}" and reset your chat history.', { name: card.fields.name }),
        confirmText: t('Replace'),
        cancelText: t('Cancel'),
        icon: 'warning'
      });
      if (!confirmed) return false;
    }

    const resetOk = await resetChatForImport();
    if (!resetOk) {
      console.warn('Community card import failed to reset chat history.', {
        postId: post.id,
        postTitle: post.title
      });
      await showAlert({
        title: t('Import failed'),
        text: t('Unable to reset chat history. Please try again.'),
        icon: 'error'
      });
      return false;
    }

    const characterId = post && Number.isFinite(post.id)
      ? `imported:${post.id}`
      : `imported:${randomId(6)}`;
    applyImportedCharacter(card.fields, {
      avatarUrl: imageUrl,
      characterId
    });
    const backgroundUrl = getCommunityVideoUrl(post) || imageUrl;
    if (backgroundUrl) {
      applyChatroomBackground(backgroundUrl);
    }
    closeAllOverlays();
    if (!skipAlert) {
      await showAlert({
        title: t('Character imported'),
        text: t('Your character was updated and the chat was reset.'),
        icon: 'success'
      });
    } else {
      addSystemMessage(t('Character imported'));
    }
    focusMessageInput();
    return true;
  }

  async function importCommunityCardFromUrl(imageUrl) {
    const normalized = normalizeCommunityImportUrl(imageUrl);
    if (!normalized) return;
    const post = {
      id: null,
      title: '',
      imageUrl: normalized,
      imageFullUrl: normalized
    };
    const imported = await importCommunityCard(post, { skipConfirm: true, skipAlert: true });
    if (imported) {
      clearCommunityImportUrlParam();
    }
  }

  function normalizeCommunityText(value, maxLength = 1200) {
    if (typeof value !== 'string') return '';
    let text = value;
    try {
      const doc = new DOMParser().parseFromString(text, 'text/html');
      text = doc.body ? doc.body.textContent || '' : text;
    } catch (err) {
      // fallback to raw text
    }
    text = text.replace(/\s+/g, ' ').trim();
    if (maxLength <= 0) {
      return text;
    }
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength).trim()}...`;
    }
    return text;
  }

  function extractCommunityVideoUrl(value) {
    if (typeof value !== 'string') return '';
    const match = value.match(/https?:\/\/[^\s"'<>]+\.mp4(?:\?[^\s"'<>]+)?/i);
    return match ? match[0] : '';
  }

  function normalizeCommunityVideoUrl(value) {
    if (typeof value !== 'string') return '';
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    return resolveMediaUrl(trimmed);
  }

  function normalizeCommunityCategoryEntry(entry) {
    if (!entry) return null;
    if (typeof entry === 'string') {
      const name = normalizeCommunityText(entry, 60);
      return name ? { name, slug: '', link: '' } : null;
    }
    if (typeof entry !== 'object') return null;
    const name = normalizeCommunityText(entry.name || entry.label || entry.title || '', 60);
    if (!name) return null;
    return {
      name,
      slug: typeof entry.slug === 'string' ? entry.slug : '',
      link: typeof entry.link === 'string' ? entry.link : ''
    };
  }

  function normalizeCommunityCategories(item, limit = 3) {
    if (!item || typeof item !== 'object' || limit < 1) return [];
    const categories = [];
    const seen = new Set();
    const pushCategory = (entry) => {
      if (categories.length >= limit) return;
      const normalized = normalizeCommunityCategoryEntry(entry);
      if (!normalized) return;
      const key = normalized.slug || normalized.name.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      categories.push(normalized);
    };
    const rawList = Array.isArray(item.categories) ? item.categories : [];
    rawList.forEach((entry) => {
      pushCategory(entry);
    });
    if (!categories.length) {
      pushCategory(item.category);
    }
    if (!categories.length) {
      const fallbackName = normalizeCommunityText(item.category_name || item.categoryName || '', 60);
      if (fallbackName) {
        categories.push({ name: fallbackName, slug: '', link: '' });
      }
    }
    return categories.slice(0, limit);
  }

  function getCommunityVideoUrl(post) {
    if (!post || typeof post !== 'object') return '';
    const raw = typeof post.videoUrl === 'string' ? post.videoUrl : '';
    const fallback = extractCommunityVideoUrl(typeof post.content === 'string' ? post.content : '');
    return normalizeCommunityVideoUrl(raw || fallback);
  }

  function attachCommunityVideoHover(container, videoUrl) {
    if (!container || !videoUrl) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia && !window.matchMedia('(hover: hover)').matches) return;
    let videoEl = null;
    let active = false;
    let pendingMove = null;

    const showVideo = () => {
      if (active) return;
      active = true;
      if (!videoEl) {
        videoEl = document.createElement('video');
        videoEl.className = 'community-hover-video';
        enforceMutedInlineVideo(videoEl, true);
        videoEl.src = resolveMediaUrl(videoUrl);
        videoEl.loop = true;
        videoEl.autoplay = true;
        videoEl.playsInline = true;
        videoEl.preload = 'metadata';
        videoEl.setAttribute('loop', '');
        videoEl.setAttribute('autoplay', '');
      }
      if (!videoEl.parentElement) {
        container.appendChild(videoEl);
      }
      container.classList.add('is-video-hover');
      const playPromise = videoEl.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => { });
      }
    };

    const hideVideo = () => {
      if (!active) return;
      active = false;
      if (videoEl) {
        videoEl.pause();
        videoEl.remove();
      }
      container.classList.remove('is-video-hover');
    };

    const handleEnter = () => {
      if (active || pendingMove) return;
      pendingMove = () => {
        pendingMove = null;
        showVideo();
      };
      container.addEventListener('pointermove', pendingMove, { once: true, passive: true });
    };

    const handleLeave = () => {
      if (pendingMove) {
        container.removeEventListener('pointermove', pendingMove);
        pendingMove = null;
      }
      hideVideo();
    };

    container.addEventListener('pointerenter', handleEnter);
    container.addEventListener('pointerleave', handleLeave);
    container.addEventListener('pointercancel', handleLeave);
  }

  function isCommunityMobileVideoMode() {
    if (!window.matchMedia) return false;
    return window.matchMedia('(hover: none), (pointer: coarse)').matches;
  }

  function prefersReducedMotion() {
    if (isLowPowerModeEnabled()) {
      return true;
    }
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function enforceMutedInlineVideo(videoEl, forceMuted = false) {
    if (!videoEl) return;
    if (forceMuted) {
      videoEl.dataset.forceMuted = '1';
    }
    videoEl.muted = true;
    videoEl.defaultMuted = true;
    videoEl.volume = 0;
    videoEl.playsInline = true;
    videoEl.setAttribute('muted', 'muted');
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', '');

    if (videoEl._mutedLock) return;
    videoEl._mutedLock = true;
    const lockMute = () => {
      if (videoEl.dataset.forceMuted === '1') {
        videoEl.muted = true;
        videoEl.defaultMuted = true;
        videoEl.volume = 0;
      }
    };
    videoEl.addEventListener('volumechange', lockMute);
    videoEl.addEventListener('play', lockMute);
    videoEl.addEventListener('loadedmetadata', lockMute);
  }

  function deactivateCommunityMobileVideo(thumb) {
    if (!thumb) return;
    thumb.classList.remove('is-video-focus', 'is-video-focus-ready');
    const videoEl = thumb._focusVideo;
    if (videoEl) {
      videoEl.pause();
      videoEl.remove();
    }
    delete thumb._focusVideo;
  }

  function activateCommunityMobileVideo(thumb) {
    if (!thumb) return;
    const videoUrl = typeof thumb.dataset.videoUrl === 'string' ? thumb.dataset.videoUrl : '';
    if (!videoUrl) return;
    const img = thumb.querySelector('img');
    const posterUrl = img ? (img.currentSrc || img.src) : '';
    let videoEl = thumb._focusVideo;
    if (!videoEl || videoEl.dataset.src !== videoUrl) {
      if (videoEl) {
        videoEl.pause();
        videoEl.remove();
      }
      videoEl = document.createElement('video');
      videoEl.className = 'community-focus-video';
      videoEl.dataset.src = videoUrl;
      enforceMutedInlineVideo(videoEl, true);
      videoEl.src = resolveMediaUrl(videoUrl);
      if (posterUrl) {
        videoEl.poster = posterUrl;
        videoEl.setAttribute('poster', posterUrl);
      }
      videoEl.loop = true;
      videoEl.autoplay = true;
      videoEl.playsInline = true;
      videoEl.preload = 'metadata';
      videoEl.setAttribute('loop', '');
      videoEl.setAttribute('autoplay', '');
      thumb.appendChild(videoEl);
      thumb._focusVideo = videoEl;
    }

    thumb.classList.add('is-video-focus');

    const markReady = () => {
      thumb.classList.add('is-video-focus-ready');
    };

    if (videoEl.readyState >= 3) {
      markReady();
    } else {
      videoEl.addEventListener('canplay', markReady, { once: true });
      videoEl.addEventListener('loadeddata', markReady, { once: true });
    }

    videoEl.addEventListener('error', () => {
      deactivateCommunityMobileVideo(thumb);
    }, { once: true });

    if (!prefersReducedMotion()) {
      const playPromise = videoEl.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => { });
      }
    }
  }

  function setCommunityVideoScrollLock() {
    if (!isCommunityMobileVideoMode()) return;
    communityVideoScrollLock = true;
    if (communityVideoScrollTimer) {
      clearTimeout(communityVideoScrollTimer);
    }
    communityVideoScrollTimer = setTimeout(() => {
      communityVideoScrollLock = false;
      communityVideoScrollTimer = null;
      scheduleCommunityMobileVideoFocus();
    }, COMMUNITY_VIDEO_SCROLL_PAUSE_MS);
  }

  function scheduleCommunityMobileVideoFocus() {
    if (communityVideoScrollLock) return;
    if (communityVideoFocusRaf) return;
    communityVideoFocusRaf = requestAnimationFrame(updateCommunityMobileVideoFocus);
  }

  function updateCommunityMobileVideoFocus() {
    communityVideoFocusRaf = null;
    if (communityVideoScrollLock) return;
    if (!isCommunityMobileVideoMode()) {
      deactivateCommunityMobileVideo(communityActiveVideoThumb);
      communityActiveVideoThumb = null;
      communityVideoVisibility.clear();
      return;
    }
    let bestThumb = null;
    let bestRatio = 0;
    if (communityVideoVisibility.size) {
      communityVideoVisibility.forEach((ratio, thumb) => {
        if (!thumb || !thumb.isConnected) return;
        const nextRatio = typeof ratio === 'number' ? ratio : 0;
        if (nextRatio > bestRatio) {
          bestRatio = nextRatio;
          bestThumb = thumb;
        }
      });
    } else {
      const rootRect = dom.communityScroll ? dom.communityScroll.getBoundingClientRect() : null;
      const candidates = dom.communityGrid
        ? Array.from(dom.communityGrid.querySelectorAll('.community-thumb[data-video-url]'))
        : [];
      candidates.forEach((thumb) => {
        if (!thumb || !thumb.isConnected || !rootRect) return;
        const rect = thumb.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, rootRect.top);
        const visibleBottom = Math.min(rect.bottom, rootRect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const ratio = rect.height ? visibleHeight / rect.height : 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestThumb = thumb;
        }
      });
    }
    if (bestThumb === communityActiveVideoThumb) {
      return;
    }
    if (communityActiveVideoThumb) {
      deactivateCommunityMobileVideo(communityActiveVideoThumb);
      communityActiveVideoThumb = null;
    }
    if (bestThumb) {
      communityActiveVideoThumb = bestThumb;
      activateCommunityMobileVideo(bestThumb);
    }
  }

  function stopCommunityMobileVideoFocus() {
    if (communityVideoObserver) {
      communityVideoObserver.disconnect();
      communityVideoObserver = null;
    }
    if (communityVideoFocusRaf) {
      cancelAnimationFrame(communityVideoFocusRaf);
      communityVideoFocusRaf = null;
    }
    if (communityVideoScrollTimer) {
      clearTimeout(communityVideoScrollTimer);
      communityVideoScrollTimer = null;
    }
    communityVideoScrollLock = false;
    communityVideoVisibility.clear();
    if (communityActiveVideoThumb) {
      deactivateCommunityMobileVideo(communityActiveVideoThumb);
      communityActiveVideoThumb = null;
    }
  }

  function observeCommunityMobileVideoThumbs(targets) {
    if (!isCommunityMobileVideoMode()) return;
    if (!('IntersectionObserver' in window)) return;
    if (dom.communitySheet && dom.communitySheet.classList.contains('active')) return;
    if (!communityVideoObserver) {
      setupCommunityMobileVideoFocus();
      return;
    }
    let thumbs = [];
    if (Array.isArray(targets)) {
      thumbs = targets;
    } else if (targets && typeof targets.querySelectorAll === 'function') {
      thumbs = Array.from(targets.querySelectorAll('.community-thumb[data-video-url]'));
    } else if (dom.communityGrid) {
      thumbs = Array.from(dom.communityGrid.querySelectorAll('.community-thumb[data-video-url]'));
    }
    if (!thumbs.length) return;
    thumbs.forEach((thumb) => {
      if (!thumb || thumb._videoObserved) return;
      thumb._videoObserved = true;
      communityVideoObserver.observe(thumb);
    });
    scheduleCommunityMobileVideoFocus();
  }

  function setupCommunityMobileVideoFocus() {
    if (!dom.communityGrid || !dom.communityScroll) return;
    if (!isCommunityMobileVideoMode()) {
      stopCommunityMobileVideoFocus();
      return;
    }
    if (!('IntersectionObserver' in window)) return;
    stopCommunityMobileVideoFocus();

    const thresholds = [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1];
    communityVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        if (!target || !target.dataset.videoUrl) return;
        if (entry.isIntersecting) {
          communityVideoVisibility.set(target, entry.intersectionRatio);
        } else {
          communityVideoVisibility.delete(target);
        }
      });
      scheduleCommunityMobileVideoFocus();
    }, {
      root: dom.communityScroll,
      threshold: thresholds
    });

    dom.communityGrid.querySelectorAll('.community-thumb[data-video-url]').forEach((thumb) => {
      thumb._videoObserved = true;
      communityVideoObserver.observe(thumb);
    });

    scheduleCommunityMobileVideoFocus();
  }

  function stopCommunityDetailVideoCycle(container) {
    if (!container || !container._videoCycle) return;
    const cycle = container._videoCycle;
    cycle.active = false;
    if (cycle.videoEl) {
      cycle.videoEl.pause();
      cycle.videoEl.remove();
    }
    container.classList.remove('is-video-cycle-ready');
    delete container._videoCycle;
  }

  function stopCommunityDetailMedia(container) {
    if (!container) return;
    const media = container.querySelector('.community-media');
    if (media) {
      stopCommunityDetailVideoCycle(media);
      media.querySelectorAll('video').forEach((video) => {
        video.pause();
        video.remove();
      });
    }
  }

  function stopAllCommunityDetailMedia() {
    stopCommunityDetailMedia(dom.communityDetail);
    stopCommunityDetailMedia(dom.communitySheetBody);
  }

  function attachCommunityDetailVideoCycle(container, videoUrl) {
    if (!container || !videoUrl) return;
    const reduceMotion = prefersReducedMotion();
    if (reduceMotion && !isCommunityMobileVideoMode()) return;
    const img = container.querySelector('img');
    if (!img) return;
    img.classList.add('community-media-img');

    const videoEl = document.createElement('video');
    videoEl.className = 'community-media-video';
    enforceMutedInlineVideo(videoEl, true);
    videoEl.src = resolveMediaUrl(videoUrl);
    const posterUrl = img.currentSrc || img.src;
    if (posterUrl) {
      videoEl.poster = posterUrl;
      videoEl.setAttribute('poster', posterUrl);
    }
    videoEl.loop = true;
    videoEl.autoplay = !reduceMotion;
    videoEl.playsInline = true;
    videoEl.preload = 'auto';
    videoEl.setAttribute('loop', '');
    if (!reduceMotion) {
      videoEl.setAttribute('autoplay', '');
    }
    container.appendChild(videoEl);

    const cycle = {
      active: true,
      videoEl,
      ready: false
    };
    container._videoCycle = cycle;

    const startCycle = () => {
      if (!cycle.active || cycle.ready) return;
      if (videoEl.readyState < 4) return;
      cycle.ready = true;
      container.classList.add('is-video-cycle-ready');
      if (!reduceMotion) {
        const playPromise = videoEl.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => { });
        }
      }
    };

    const handleError = () => {
      stopCommunityDetailVideoCycle(container);
    };

    videoEl.addEventListener('canplaythrough', startCycle);
    videoEl.addEventListener('progress', startCycle);
    videoEl.addEventListener('loadeddata', startCycle);
    videoEl.addEventListener('canplay', startCycle);
    videoEl.addEventListener('error', handleError, { once: true });

    startCycle();
  }

  function formatCommunityDate(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function setCommunityStatus(text, tone = '') {
    if (!dom.communityStatus) return;
    dom.communityStatus.textContent = text ? t(text) : '';
    dom.communityStatus.classList.remove('error');
    if (tone) {
      dom.communityStatus.classList.add(tone);
    }
  }

  function ensureCommunityLoadElements() {
    if (!dom.communityGrid) return;
    if (!dom.communityLoad) {
      const load = document.createElement('div');
      load.className = 'community-load hidden';
      load.setAttribute('aria-live', 'polite');
      const spinner = document.createElement('span');
      spinner.className = 'community-spinner';
      const text = document.createElement('span');
      text.className = 'community-load-text';
      load.append(spinner, text);
      dom.communityLoad = load;
      dom.communityLoadText = text;
    }
    if (!dom.communitySentinel) {
      const sentinel = document.createElement('div');
      sentinel.className = 'community-sentinel';
      sentinel.setAttribute('aria-hidden', 'true');
      dom.communitySentinel = sentinel;
    }
  }

  function attachCommunityLoadElements() {
    if (!dom.communityGrid) return;
    ensureCommunityLoadElements();
    if (dom.communityLoad && dom.communityLoad.parentElement !== dom.communityGrid) {
      dom.communityGrid.appendChild(dom.communityLoad);
    }
    if (dom.communitySentinel && dom.communitySentinel.parentElement !== dom.communityGrid) {
      dom.communityGrid.appendChild(dom.communitySentinel);
    }
  }

  function updateCommunityLoadIndicator() {
    if (dom.communityLoad && dom.communityLoadText) {
      let text = '';
      let mode = 'hidden';
      if (state.community.loading) {
        text = t('Loading characters...');
        mode = 'loading';
      } else if (state.community.loadingMore) {
        text = t('Loading more characters...');
        mode = 'loading';
      } else if (state.community.loaded && !state.community.hasMore && state.community.posts.length) {
        text = t('You are all caught up.');
        mode = 'end';
      } else if (state.community.loaded && state.community.posts.length) {
        text = t('Scroll for more characters');
        mode = 'idle';
      }
      dom.communityLoadText.textContent = text;
      dom.communityLoad.classList.toggle('loading', mode === 'loading');
      dom.communityLoad.classList.toggle('end', mode === 'end');
      dom.communityLoad.classList.toggle('hidden', mode === 'hidden' || text === '');
    }
    updateCommunityLoadingOverlay();
  }

  function updateCommunityLoadingOverlay() {
    if (!dom.communityLoadingOverlay) return;
    const show = state.community.loading && !state.community.loadingMore;
    dom.communityLoadingOverlay.classList.toggle('active', show);
    dom.communityLoadingOverlay.setAttribute('aria-hidden', show ? 'false' : 'true');
  }

  function setupCommunityObserver() {
    if (!dom.communityScroll || !dom.communitySentinel) return;
    if (!('IntersectionObserver' in window)) return;
    if (communityObserver) {
      communityObserver.disconnect();
    }
    communityObserver = new IntersectionObserver((entries) => {
      const hit = entries.some((entry) => entry.isIntersecting);
      if (!hit) return;
      fetchCommunityMore();
    }, {
      root: dom.communityScroll,
      rootMargin: '0px 0px 320px 0px',
      threshold: 0.01
    });
    communityObserver.observe(dom.communitySentinel);
  }

  function normalizeCommunityPost(item) {
    if (!item || typeof item !== 'object') return null;
    const id = Number(item.id);
    if (!Number.isFinite(id)) return null;
    const title = normalizeCommunityText(item.title || '', 200);
    const excerpt = normalizeCommunityText(item.excerpt || '', 600);
    const content = normalizeCommunityText(item.content || '', 0);
    const date = typeof item.date === 'string' ? item.date : '';
    const link = typeof item.link === 'string' ? item.link : '';
    const imageUrl = typeof item.image_url === 'string'
      ? item.image_url
      : (typeof item.imageUrl === 'string' ? item.imageUrl : '');
    const imageFullUrl = typeof item.image_full_url === 'string'
      ? item.image_full_url
      : (typeof item.imageFullUrl === 'string' ? item.imageFullUrl : imageUrl);
    const videoUrlRaw = typeof item.video_url === 'string'
      ? item.video_url
      : (typeof item.videoUrl === 'string' ? item.videoUrl : '');
    const videoUrl = normalizeCommunityVideoUrl(videoUrlRaw || extractCommunityVideoUrl(item.content || ''));
    const categories = normalizeCommunityCategories(item, 3);
    const category = categories.length ? categories[0] : null;
    return {
      id,
      title,
      excerpt,
      content,
      date,
      link,
      imageUrl,
      imageFullUrl,
      videoUrl,
      category,
      categories
    };
  }

  function getCommunityActivePost() {
    const activeId = state.community.activeId;
    if (!activeId) return null;
    return state.community.posts.find((post) => post.id === activeId) || null;
  }

  function mergeCommunityPosts(existing, incoming) {
    if (!incoming.length) return existing.slice();
    const merged = existing.slice();
    const indexById = new Map();
    merged.forEach((post, index) => {
      indexById.set(post.id, index);
    });
    incoming.forEach((post) => {
      const index = indexById.get(post.id);
      if (index === undefined) {
        merged.push(post);
        indexById.set(post.id, merged.length - 1);
      } else {
        merged[index] = Object.assign({}, merged[index], post);
      }
    });
    return merged;
  }

  function isCommunitySheetMode() {
    return Boolean(dom.communitySheetBody);
  }

  function getCommunityDetailTarget() {
    if (isCommunitySheetMode() && dom.communitySheetBody) {
      return dom.communitySheetBody;
    }
    return dom.communityDetail;
  }

  function resetCommunityDetailScroll() {
    const target = getCommunityDetailTarget();
    if (!target) return;
    if (typeof target.scrollTop === 'number') {
      target.scrollTop = 0;
    }
    if (target === dom.communitySheetBody && dom.communitySheetPanel) {
      dom.communitySheetPanel.scrollTop = 0;
    }
  }

  function getCommunityCategoryTags(post, limit = 3) {
    if (!post || typeof post !== 'object' || limit < 1) return [];
    if (Array.isArray(post.categories) && post.categories.length) {
      return post.categories.filter((entry) => entry && entry.name).slice(0, limit);
    }
    if (post.category && post.category.name) {
      return [post.category];
    }
    return [];
  }

  function buildCommunityCard(post) {
    const card = document.createElement('div');
    card.className = 'community-item';
    card.dataset.postId = String(post.id);
    if (post.id === state.community.activeId) {
      card.classList.add('active');
    }

    const thumb = document.createElement('div');
    thumb.className = 'community-thumb community-media';
    const thumbUrl = post.imageUrl || post.imageFullUrl;
    const videoUrl = getCommunityVideoUrl(post);
    if (videoUrl) {
      thumb.dataset.videoUrl = videoUrl;
    }
    if (thumbUrl) {
      const img = document.createElement('img');
      img.src = thumbUrl;
      img.alt = post.title || t('Community character');
      thumb.appendChild(img);
    } else {
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('class', 'icon');
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', '#icon-community');
      icon.appendChild(use);
      thumb.appendChild(icon);
    }
    if (videoUrl) {
      attachCommunityVideoHover(thumb, videoUrl);
    }
    card.appendChild(thumb);

    const body = document.createElement('div');
    body.className = 'community-item-body';
    const title = document.createElement('div');
    title.className = 'community-item-title';
    title.textContent = post.title || t('Untitled character');
    const date = document.createElement('div');
    date.className = 'community-item-date';
    date.textContent = formatCommunityDate(post.date);
    body.appendChild(title);
    body.appendChild(date);
    const tags = getCommunityCategoryTags(post, 3);
    if (tags.length) {
      const tagGroup = document.createElement('div');
      tagGroup.className = 'community-item-tags';
      tags.forEach((entry) => {
        const tag = document.createElement('div');
        tag.className = 'community-item-tag';
        tag.textContent = entry.name;
        tagGroup.appendChild(tag);
      });
      body.appendChild(tagGroup);
    }
    card.appendChild(body);

    card.addEventListener('click', () => {
      state.community.activeId = post.id;
      renderCommunityPosts();
      renderCommunityDetail(post);
      resetCommunityDetailScroll();
      if (isCommunitySheetMode()) {
        openCommunitySheet();
      }
      fetchCommunityPostDetail(post.id);
    });

    return card;
  }

  function appendCommunityPosts(items) {
    if (!dom.communityGrid || !items.length) return;
    const existingEmpty = dom.communityGrid.querySelector('.community-detail-empty');
    if (existingEmpty && !dom.communityGrid.querySelector('.community-item')) {
      dom.communityGrid.innerHTML = '';
    }
    const existingIds = new Set();
    dom.communityGrid.querySelectorAll('.community-item[data-post-id]').forEach((el) => {
      const id = Number(el.dataset.postId);
      if (Number.isFinite(id)) {
        existingIds.add(id);
      }
    });
    const fragment = document.createDocumentFragment();
    const newThumbs = [];
    items.forEach((post) => {
      if (!post || existingIds.has(post.id)) return;
      const card = buildCommunityCard(post);
      fragment.appendChild(card);
      const thumb = card.querySelector('.community-thumb[data-video-url]');
      if (thumb) {
        newThumbs.push(thumb);
      }
    });
    if (!fragment.childNodes.length) return;
    const insertBefore = dom.communityLoad && dom.communityLoad.parentElement === dom.communityGrid
      ? dom.communityLoad
      : (dom.communitySentinel && dom.communitySentinel.parentElement === dom.communityGrid
        ? dom.communitySentinel
        : null);
    if (insertBefore) {
      dom.communityGrid.insertBefore(fragment, insertBefore);
    } else {
      dom.communityGrid.appendChild(fragment);
    }
    attachCommunityLoadElements();
    setupCommunityObserver();
    observeCommunityMobileVideoThumbs(newThumbs);
  }

  function renderCommunityDetailInto(container, post) {
    if (!container) return;
    const isSheet = container === dom.communitySheetBody;
    stopCommunityDetailVideoCycle(container);
    container.innerHTML = '';
    if (!post) {
      const empty = document.createElement('div');
      empty.className = 'community-detail-empty';
      empty.textContent = t('Select a character to read details.');
      container.appendChild(empty);
      return;
    }

    const detailImage = post.imageFullUrl || post.imageUrl;
    if (detailImage) {
      const media = document.createElement('div');
      media.className = 'community-media';
      const img = document.createElement('img');
      img.src = detailImage;
      img.alt = post.title || t('Community character');
      media.appendChild(img);
      const videoUrl = getCommunityVideoUrl(post);
      if (videoUrl) {
        attachCommunityDetailVideoCycle(media, videoUrl);
      }
      container.appendChild(media);
    }

    const title = document.createElement('div');
    title.className = 'community-detail-title';
    title.textContent = post.title || t('Untitled character');
    container.appendChild(title);

    const meta = document.createElement('div');
    meta.className = 'community-detail-meta';
    meta.textContent = formatCommunityDate(post.date);
    container.appendChild(meta);

    const detailTags = getCommunityCategoryTags(post, 3);
    if (detailTags.length) {
      const tagGroup = document.createElement('div');
      tagGroup.className = 'community-detail-tags';
      detailTags.forEach((entry) => {
        const tag = document.createElement('div');
        tag.className = 'community-detail-tag';
        tag.textContent = entry.name;
        tagGroup.appendChild(tag);
      });
      container.appendChild(tagGroup);
    }

    const body = document.createElement('div');
    body.className = 'community-detail-text';
    body.textContent = post.content || post.excerpt || '';
    container.appendChild(body);

    if (!post.content && state.community.detailLoadingId === post.id) {
      const loading = document.createElement('div');
      loading.className = 'community-detail-meta';
      loading.textContent = t('Loading character details...');
      container.appendChild(loading);
    }

    const actions = document.createElement('div');
    actions.className = 'community-actions';
    let hasActions = false;

    if (post.link && !isSheet) {
      const link = document.createElement('a');
      link.className = 'ghost-button community-link';
      link.href = post.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = t('Open full post');
      actions.appendChild(link);
      hasActions = true;
    }

    if (post.imageFullUrl || post.imageUrl) {
      const importButton = document.createElement('button');
      importButton.type = 'button';
      importButton.className = 'solid-button community-import';
      importButton.textContent = t('Import character');
      importButton.addEventListener('click', () => {
        importCommunityCard(post);
      });
      actions.appendChild(importButton);
      hasActions = true;
    }

    if (hasActions) {
      container.appendChild(actions);
    }
  }

  function renderCommunityDetail(post) {
    renderCommunityDetailInto(getCommunityDetailTarget(), post);
  }

  function openCommunitySheet() {
    if (!dom.communitySheet || !isCommunitySheetMode()) return;
    dom.communitySheet.classList.add('active');
    dom.communitySheet.setAttribute('aria-hidden', 'false');
    if (dom.communityModal) {
      dom.communityModal.classList.add('community-sheet-open');
    }
    stopCommunityMobileVideoFocus();
    resetCommunityDetailScroll();
  }

  function closeCommunitySheet() {
    if (!dom.communitySheet) return;
    dom.communitySheet.classList.remove('active');
    dom.communitySheet.setAttribute('aria-hidden', 'true');
    if (dom.communityModal) {
      dom.communityModal.classList.remove('community-sheet-open');
    }
    stopAllCommunityDetailMedia();
    if (dom.communityModal && dom.communityModal.classList.contains('active')) {
      setupCommunityMobileVideoFocus();
    }
  }

  function renderCommunityPosts() {
    if (!dom.communityGrid) return;
    stopCommunityMobileVideoFocus();
    dom.communityGrid.innerHTML = '';
    if (!state.community.posts.length) {
      const empty = document.createElement('div');
      empty.className = 'community-detail-empty';
      empty.textContent = state.community.loading || !state.community.loaded
        ? t('Loading characters...')
        : t('No characters found.');
      dom.communityGrid.appendChild(empty);
      attachCommunityLoadElements();
      updateCommunityLoadIndicator();
      setupCommunityObserver();
      renderCommunityDetail(null);
      resetCommunityDetailScroll();
      return;
    }

    const fragment = document.createDocumentFragment();
    state.community.posts.forEach((post) => {
      fragment.appendChild(buildCommunityCard(post));
    });
    dom.communityGrid.appendChild(fragment);

    attachCommunityLoadElements();
    updateCommunityLoadIndicator();
    setupCommunityObserver();
    setupCommunityMobileVideoFocus();
  }

  function applyCommunityDetail(postId, detail) {
    if (!detail) return;
    state.community.detailCache[postId] = detail;
    const existing = state.community.posts.find((post) => post.id === postId);
    if (existing) {
      Object.assign(existing, detail);
      if (state.community.activeId === postId) {
        renderCommunityDetail(existing);
      }
      return;
    }
    if (state.community.activeId === postId) {
      renderCommunityDetail(detail);
    }
  }

  function sanitizeCommunitySnippet(text, maxLength = 180) {
    if (!text) return '';
    const cleaned = text.replace(/\s+/g, ' ').trim();
    if (!cleaned) return '';
    if (cleaned.length <= maxLength) return cleaned;
    return `${cleaned.slice(0, maxLength)}...`;
  }

  function createCommunityRequestError(message, details = {}, cause = null) {
    const error = new Error(message);
    error.name = 'CommunityRequestError';
    error.details = details;
    if (cause) {
      error.cause = cause;
    }
    return error;
  }

  function buildCommunityErrorMessage(err, fallback) {
    const base = fallback || 'Unable to load community characters.';
    if (!err) return base;
    const details = err && err.details && typeof err.details === 'object' ? err.details : {};
    const parts = [];
    const primary = err && err.message ? err.message : base;
    parts.push(primary);
    if (details.status) {
      const statusText = details.statusText ? ` ${details.statusText}` : '';
      parts.push(`HTTP ${details.status}${statusText}`);
    }
    if (details.code) {
      parts.push(details.code);
    }
    if (details.contentType && !details.contentType.includes('application/json')) {
      parts.push(`Content-Type: ${details.contentType}`);
    }
    if (details.jsonError) {
      parts.push(`JSON error: ${details.jsonError}`);
    }
    if (details.hint) {
      parts.push(details.hint);
    } else if (err && err.name === 'TypeError' && /fetch/i.test(err.message || '')) {
      parts.push('Network error or blocked by CORS.');
    }
    if (details.responseSnippet) {
      parts.push(`Response: ${details.responseSnippet}`);
    }
    return parts.filter(Boolean).join(' | ') || base;
  }

  function normalizeCommunitySort(value) {
    if (typeof value !== 'string') return COMMUNITY_SORT_DEFAULT;
    const trimmed = value.trim().toLowerCase();
    return COMMUNITY_SORTS.has(trimmed) ? trimmed : COMMUNITY_SORT_DEFAULT;
  }

  function ensureCommunityRandomSeed(force = false) {
    if (!force && state.community.randomSeed) return state.community.randomSeed;
    const seed = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    state.community.randomSeed = seed;
    return seed;
  }

  function updateCommunitySortButtons() {
    if (!dom.communitySortButtons || !dom.communitySortButtons.length) return;
    dom.communitySortButtons.forEach((button) => {
      if (!button || !button.dataset) return;
      const sort = normalizeCommunitySort(button.dataset.communitySort || '');
      const isActive = sort === state.community.sort;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function setCommunitySort(nextSort, options = {}) {
    const normalized = normalizeCommunitySort(nextSort);
    const isRandom = normalized === 'random';
    const changed = normalized !== state.community.sort;
    if (isRandom && (changed || options.force)) {
      ensureCommunityRandomSeed(true);
    } else if (!isRandom && changed) {
      state.community.randomSeed = '';
    }
    if (changed || options.force) {
      state.community.sort = normalized;
      updateCommunitySortButtons();
      fetchCommunityPosts(state.community.query, true, normalized);
      return;
    }
    updateCommunitySortButtons();
  }

  async function requestCommunityPosts(query, page, sort = state.community.sort) {
    const normalizedSort = normalizeCommunitySort(sort);
    const params = new URLSearchParams();
    if (query) {
      params.set('search', query);
    }
    if (normalizedSort !== COMMUNITY_SORT_DEFAULT) {
      params.set('order', normalizedSort);
    }
    if (normalizedSort === 'random') {
      const seed = state.community.randomSeed || ensureCommunityRandomSeed(true);
      if (seed) {
        params.set('seed', seed);
      }
    }
    params.set('limit', String(COMMUNITY_PAGE_SIZE));
    params.set('page', String(page));
    if (DEBUG) {
      params.set('debug', '1');
    }
    params.set('ts', String(Date.now()));
    let response;
    try {
      response = await fetch(`${CONFIG.communityEndpoint}?${params.toString()}`, {
        method: 'GET',
        cache: 'no-store'
      });
    } catch (err) {
      throw createCommunityRequestError(
        'Community request failed to reach the server.',
        { hint: 'Network error or blocked by CORS.' },
        err
      );
    }
    const rawText = await response.text();
    const trimmedText = rawText ? rawText.trim() : '';
    const contentType = response.headers.get('content-type') || '';
    const baseDetails = {
      status: response.status,
      statusText: response.statusText,
      contentType
    };
    if (!trimmedText) {
      const message = response.ok
        ? 'Community response empty.'
        : 'Community request failed with empty response.';
      throw createCommunityRequestError(message, baseDetails);
    }
    let data = null;
    try {
      data = JSON.parse(trimmedText);
    } catch (err) {
      const details = Object.assign({}, baseDetails, {
        jsonError: err && err.message ? err.message : String(err),
        responseSnippet: sanitizeCommunitySnippet(trimmedText)
      });
      if (DEBUG) {
        console.warn('Chatroom debug: community response invalid', {
          status: response.status,
          rawText
        });
      }
      throw createCommunityRequestError('Community response invalid JSON.', details, err);
    }
    const isObject = data && typeof data === 'object';
    if (!response.ok || !isObject || !data.ok) {
      let errorText = 'Community response invalid.';
      if (!response.ok) {
        errorText = data && data.error ? data.error : 'Community request failed.';
      } else if (isObject && data.error) {
        errorText = data.error;
      } else if (!isObject) {
        errorText = 'Community response had an unexpected format.';
      }
      const details = Object.assign({}, baseDetails);
      if (data && data.debug && DEBUG) {
        details.debug = data.debug;
      }
      if (!isObject || !data.ok || !response.ok) {
        details.responseSnippet = details.responseSnippet || sanitizeCommunitySnippet(trimmedText);
      }
      if (!response.ok && !details.hint) {
        details.hint = 'Server returned an error status.';
      }
      throw createCommunityRequestError(errorText, details);
    }
    const items = Array.isArray(data.posts) ? data.posts : [];
    const hasMore = typeof data.has_more === 'boolean'
      ? data.has_more
      : items.length >= COMMUNITY_PAGE_SIZE;
    return {
      items,
      hasMore
    };
  }

  function maybeLoadCommunityMore() {
    if (!dom.communityScroll) return;
    if (isCommunityMobileVideoMode()) {
      scheduleCommunityMobileVideoFocus();
    }
    if (state.community.loading || state.community.loadingMore || !state.community.hasMore) return;
    const threshold = Math.max(200, dom.communityScroll.clientHeight * 0.35);
    const remaining = dom.communityScroll.scrollHeight - (dom.communityScroll.scrollTop + dom.communityScroll.clientHeight);
    if (dom.communityScroll.scrollHeight <= dom.communityScroll.clientHeight + 4 || remaining <= threshold) {
      fetchCommunityMore();
    }
  }

  async function fetchCommunityPostDetail(postId) {
    if (!postId) return;
    if (state.community.detailCache[postId]) {
      applyCommunityDetail(postId, state.community.detailCache[postId]);
      return;
    }
    if (state.community.detailLoadingId === postId) return;
    state.community.detailLoadingId = postId;
    renderCommunityDetail(getCommunityActivePost());
    try {
      const params = new URLSearchParams();
      params.set('post_id', String(postId));
      if (DEBUG) {
        params.set('debug', '1');
      }
      params.set('ts', String(Date.now()));
      const response = await fetch(`${CONFIG.communityEndpoint}?${params.toString()}`, {
        method: 'GET',
        cache: 'no-store'
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: community detail response invalid', {
            status: response.status,
            rawText
          });
        }
        throw err;
      }
      if (!response.ok || !data || !data.ok) {
        if (DEBUG) {
          console.warn('Chatroom debug: community detail fetch failed', data);
        }
        return;
      }
      const detail = data.post ? normalizeCommunityPost(data.post) : null;
      if (!detail) return;
      applyCommunityDetail(postId, detail);
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: community detail fetch error', err);
      }
    } finally {
      if (state.community.detailLoadingId === postId) {
        state.community.detailLoadingId = null;
      }
    }
  }

  async function fetchCommunityMore() {
    if (state.community.loading || state.community.loadingMore || !state.community.hasMore) return;
    const nextPage = state.community.page + 1;
    state.community.loadingMore = true;
    setCommunityStatus('');
    updateCommunityLoadIndicator();
    try {
      const result = await requestCommunityPosts(state.community.query, nextPage, state.community.sort);
      const items = result.items.map(normalizeCommunityPost).filter(Boolean);
      if (items.length === 0) {
        state.community.hasMore = false;
        updateCommunityLoadIndicator();
        return;
      }
      state.community.posts = mergeCommunityPosts(state.community.posts, items);
      state.community.page = nextPage;
      state.community.hasMore = result.hasMore;
      appendCommunityPosts(items);
      maybeLoadCommunityMore();
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: community fetch more failed', err);
      }
      setCommunityStatus(buildCommunityErrorMessage(err, 'Unable to load more characters.'), 'error');
    } finally {
      state.community.loadingMore = false;
      updateCommunityLoadIndicator();
    }
  }

  async function fetchCommunityPosts(query, force = false, sortOverride = state.community.sort) {
    const trimmed = typeof query === 'string' ? query.trim() : '';
    const normalizedSort = normalizeCommunitySort(sortOverride);
    const sortChanged = normalizedSort !== state.community.sort;
    if (sortChanged) {
      if (normalizedSort === 'random') {
        ensureCommunityRandomSeed(true);
      } else {
        state.community.randomSeed = '';
      }
      state.community.sort = normalizedSort;
    }
    updateCommunitySortButtons();
    if (state.community.loading) return;
    if (!force && state.community.loaded && trimmed === state.community.query && !sortChanged) {
      renderCommunityPosts();
      renderCommunityDetail(getCommunityActivePost());
      return;
    }
    if (trimmed !== state.community.query || sortChanged) {
      state.community.detailCache = {};
      state.community.detailLoadingId = null;
      if (dom.communityScroll) {
        dom.communityScroll.scrollTop = 0;
      }
      closeCommunitySheet();
    }
    state.community.loading = true;
    state.community.loadingMore = false;
    setCommunityStatus('');
    updateCommunityLoadIndicator();
    try {
      const result = await requestCommunityPosts(trimmed, 1, normalizedSort);
      const items = result.items.map(normalizeCommunityPost).filter(Boolean);
      state.community.posts = items;
      state.community.query = trimmed;
      state.community.loaded = true;
      state.community.page = 1;
      state.community.hasMore = result.hasMore;
      state.community.activeId = state.community.posts.length ? state.community.posts[0].id : null;
      setCommunityStatus(state.community.posts.length ? '' : 'No characters found.');
      renderCommunityPosts();
      renderCommunityDetail(getCommunityActivePost());
      resetCommunityDetailScroll();
      if (state.community.activeId) {
        fetchCommunityPostDetail(state.community.activeId);
      }
      maybeLoadCommunityMore();
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: community fetch failed', err);
      }
      setCommunityStatus(buildCommunityErrorMessage(err, 'Unable to load community characters.'), 'error');
    } finally {
      state.community.loading = false;
      updateCommunityLoadIndicator();
    }
  }

  function setupCommunityFloatingClose() {
    if (!dom.communityModal || !dom.closeCommunity) return;
    const content = dom.communityModal.querySelector('.modal-content');
    if (!content) return;
    let wrapper = content.querySelector('.community-close-float');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'community-close-float';
      content.insertBefore(wrapper, content.firstChild);
    }
    if (dom.closeCommunity.parentElement !== wrapper) {
      wrapper.appendChild(dom.closeCommunity);
    }
  }

  function openCommunityModal() {
    if (!dom.communityModal) return;
    closeCommunitySheet();
    dom.communityModal.classList.add('active');
    dom.communityModal.setAttribute('aria-hidden', 'false');
    if (dom.communitySearchInput) {
      dom.communitySearchInput.value = state.community.query || '';
      if (!isMobileDevice()) {
        dom.communitySearchInput.focus();
      } else if (document.activeElement === dom.communitySearchInput) {
        dom.communitySearchInput.blur();
      }
    }
    renderCommunityPosts();
    renderCommunityDetail(getCommunityActivePost());
    resetCommunityDetailScroll();
    fetchCommunityPosts(state.community.query, true);
  }

  function closeCommunityModal() {
    if (!dom.communityModal) return;
    dom.communityModal.classList.remove('active');
    dom.communityModal.setAttribute('aria-hidden', 'true');
    if (communityObserver) {
      communityObserver.disconnect();
    }
    stopCommunityMobileVideoFocus();
    closeCommunitySheet();
  }

  function setDiscordFlash(value) {
    try {
      if (value) {
        sessionStorage.setItem(DISCORD_LINK_FLASH_KEY, value);
      }
    } catch (err) {
      // ignore storage errors
    }
  }

  function consumeDiscordFlash() {
    try {
      const value = sessionStorage.getItem(DISCORD_LINK_FLASH_KEY);
      if (value) {
        sessionStorage.removeItem(DISCORD_LINK_FLASH_KEY);
        return value;
      }
    } catch (err) {
      // ignore storage errors
    }
    return '';
  }

  function buildDiscordAuthorizeUrl(mode = '') {
    const base = CONFIG.discordEndpoint || './discordprocessor.php';
    const separator = base.includes('?') ? '&' : '?';
    const params = new URLSearchParams({
      action: 'authorize',
      return: window.location.href
    });
    if (mode) {
      params.set('mode', mode);
    }
    return `${base}${separator}${params.toString()}`;
  }

  function syncDiscordState(status) {
    const linked = Boolean(status && status.linked);
    const guildMember = Boolean(status && status.guildMember);
    state.discord.linked = linked;
    state.discord.guildMember = guildMember;
    state.discord.updatedAt = Date.now();
    updateJoinCommunityButtonState();
    updateJoinCommunityBonusBadges();
  }

  function getDiscordXpBonus(delta) {
    if (!state.discord.linked) return 0;
    return Math.floor(delta * DISCORD_XP_BONUS_RATE);
  }

  function updateJoinCommunityBonusBadges(popup = joinCommunityPopup) {
    const root = popup
      || document.querySelector('.join-community-popup')
      || document.querySelector('.swal2-popup');
    if (!root) return;
    const discordBadge = root.querySelector('[data-xp-badge="discord"]');
    if (discordBadge) {
      discordBadge.classList.toggle('is-unlocked', state.discord.linked);
    }
    const notificationBadge = root.querySelector('[data-xp-badge="notifications"]');
    if (notificationBadge) {
      notificationBadge.classList.toggle('is-unlocked', state.notifications.enabled);
    }
  }

  function syncNotificationState(subscribed) {
    state.notifications.enabled = Boolean(subscribed);
    state.notifications.updatedAt = Date.now();
    updateJoinCommunityBonusBadges();
  }

  function getNotificationXpBonus(delta) {
    if (!state.notifications.enabled) return 0;
    return Math.floor(delta * NOTIFICATION_XP_BONUS_RATE);
  }

  async function fetchDiscordStatus(force = false) {
    const now = Date.now();
    if (!force && discordStatusCache && (now - discordStatusFetchedAt) < DISCORD_STATUS_CACHE_MS) {
      return discordStatusCache;
    }
    try {
      const response = await fetch(`${CONFIG.discordEndpoint}?action=status`, {
        cache: 'no-store',
        credentials: 'same-origin'
      });
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      if (!data || typeof data !== 'object') {
        return null;
      }
      discordStatusCache = data;
      discordStatusFetchedAt = now;
      syncDiscordState(data);
      return data;
    } catch (err) {
      return null;
    }
  }

  function formatDiscordDisplayName(user) {
    if (!user) return t('Discord user');
    const display = user.displayName || user.globalName;
    if (display) return String(display);
    if (user.username) return String(user.username);
    return t('Discord user');
  }

  function formatDiscordHandle(user) {
    if (!user || !user.username) return '';
    const username = String(user.username);
    const discriminator = user.discriminator ? String(user.discriminator) : '';
    if (discriminator && discriminator !== '0') {
      return `${username}#${discriminator}`;
    }
    return username;
  }

  function renderDiscordStatus(panel, status, flash) {
    if (!panel) return;
    const statusText = panel.querySelector('[data-discord-status-text]');
    const userRow = panel.querySelector('[data-discord-user]');
    const nameEl = panel.querySelector('[data-discord-name]');
    const handleEl = panel.querySelector('[data-discord-handle]');
    const avatarEl = panel.querySelector('[data-discord-avatar]');
    const emailEl = panel.querySelector('[data-discord-email]');
    const guildEl = panel.querySelector('[data-discord-guild-text]');
    const unlinkButton = panel.querySelector('.join-community-unlink');
    const setStatusText = (text) => {
      if (statusText) statusText.textContent = text || '';
    };

    if (!status || !status.linked) {
      if (flash === 'linked') {
        setStatusText(t('Discord linked, but we could not confirm it. Please allow cookies and try again.'));
      } else if (flash === 'unlinked') {
        setStatusText(t('Discord unlinked.'));
      } else {
        setStatusText(flash === 'error' ? t('Discord link failed.') : t('Discord not linked.'));
      }
      if (userRow) userRow.style.display = 'none';
      if (guildEl) guildEl.textContent = '';
      if (unlinkButton) unlinkButton.style.display = 'none';
      return;
    }

    const user = status.user || {};
    if (userRow) userRow.style.display = '';
    if (nameEl) nameEl.textContent = formatDiscordDisplayName(user);
    if (handleEl) handleEl.textContent = formatDiscordHandle(user);
    if (emailEl) {
      const email = user.email ? String(user.email) : '';
      emailEl.textContent = email;
      emailEl.style.display = email ? '' : 'none';
    }
    if (avatarEl) {
      avatarEl.src = user.avatarUrl || '';
      avatarEl.alt = t('Discord avatar');
    }
    if (unlinkButton) unlinkButton.style.display = '';

    setStatusText(t('Discord linked.'));
    if (status.guildChecked) {
      if (status.guildMember) {
        if (guildEl) guildEl.textContent = t('Discord server joined.');
      } else if (guildEl) {
        guildEl.textContent = t('Join Discord to finish linking.');
      }
    } else if (guildEl) {
      guildEl.textContent = '';
    }

    if (flash === 'join_required' && guildEl) {
      guildEl.textContent = t('Join Discord to finish linking.');
    }

    if (status.error && guildEl) {
      guildEl.textContent = `Discord error: ${status.error}`;
    }
  }

  function startDiscordLinkFlow() {
    const target = buildDiscordAuthorizeUrl();
    window.location.href = target;
  }

  function setupJoinCommunityDiscord(popup, inviteUrl) {
    if (!popup) return;
    const panel = popup.querySelector('[data-discord-panel]');
    if (!panel) return;
    const linkButton = popup.querySelector('.join-community-link');
    const unlinkButton = popup.querySelector('.join-community-unlink');
    let lastStatus = null;
    if (linkButton) {
      linkButton.addEventListener('click', () => {
        startDiscordLinkFlow();
      });
    }
    if (unlinkButton) {
      unlinkButton.addEventListener('click', async () => {
        try {
          const response = await fetch(`${CONFIG.discordEndpoint}?action=unlink`, {
            method: 'POST',
            credentials: 'same-origin'
          });
          if (response.ok) {
            lastStatus = { linked: false, inviteUrl: inviteUrl };
            discordStatusCache = lastStatus;
            discordStatusFetchedAt = Date.now();
            syncDiscordState(lastStatus);
            renderDiscordStatus(panel, lastStatus, 'unlinked');
            return;
          }
        } catch (err) {
          // ignore unlink errors
        }
        renderDiscordStatus(panel, lastStatus, 'error');
      });
    }
    const flash = consumeDiscordFlash();
    fetchDiscordStatus(true).then((status) => {
      lastStatus = status;
      renderDiscordStatus(panel, status, flash);
    }).catch(() => {
      renderDiscordStatus(panel, null, flash);
    });
  }

  function isPushSupported() {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  }

  async function refreshNotificationBonusState() {
    if (!isPushSupported()) {
      syncNotificationState(false);
      return;
    }
    if (Notification.permission !== 'granted') {
      syncNotificationState(false);
      return;
    }
    try {
      const registration = await registerPushServiceWorker();
      const subscription = await getPushSubscription(registration);
      syncNotificationState(Boolean(subscription));
    } catch (err) {
      syncNotificationState(false);
    }
  }

  function getPreferredPushEncoding() {
    if (window.PushManager && Array.isArray(PushManager.supportedContentEncodings)) {
      const encodings = PushManager.supportedContentEncodings;
      if (encodings.length > 0) {
        return encodings[0];
      }
    }
    return 'aesgcm';
  }

  function urlBase64ToUint8Array(base64String) {
    const padded = `${base64String}${'='.repeat((4 - (base64String.length % 4)) % 4)}`;
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i += 1) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async function fetchPushConfig(force = false) {
    const now = Date.now();
    if (!force && pushConfigCache && (now - pushConfigFetchedAt) < PUSH_CONFIG_CACHE_MS) {
      return pushConfigCache;
    }
    const response = await fetch(`${CONFIG.pushEndpoint}?action=config`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Push config unavailable.');
    }
    const data = await response.json();
    if (!data || !data.ok || !data.publicKey) {
      const message = data && data.error ? data.error : 'Push config unavailable.';
      throw new Error(message);
    }
    pushConfigCache = data;
    pushConfigFetchedAt = now;
    return data;
  }

  async function registerPushServiceWorker() {
    if (pushState.registration) return pushState.registration;
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service worker not supported.');
    }
    pushState.registration = await navigator.serviceWorker.register('./service-worker.js');
    return pushState.registration;
  }

  function requestNotificationPermission() {
    if (!('Notification' in window) || typeof Notification.requestPermission !== 'function') {
      return Promise.resolve('denied');
    }
    if (Notification.requestPermission.length === 0) {
      return Notification.requestPermission();
    }
    return new Promise((resolve) => {
      Notification.requestPermission((result) => resolve(result));
    });
  }

  async function getPushSubscription(registration) {
    const reg = registration || await registerPushServiceWorker();
    return reg.pushManager.getSubscription();
  }

  async function sendPushSubscriptionToServer(subscription) {
    const xid = state.cloudSync ? state.sessionId : readStoredXid();
    const payload = {
      action: 'subscribe',
      subscription: subscription.toJSON(),
      xid: xid || '',
      encoding: getPreferredPushEncoding()
    };
    const response = await fetch(CONFIG.pushEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      const message = data && data.error ? data.error : 'Push subscription failed.';
      throw new Error(message);
    }
  }

  async function removePushSubscriptionFromServer(subscription) {
    if (!subscription) return;
    const payload = {
      action: 'unsubscribe',
      endpoint: subscription.endpoint || ''
    };
    await fetch(CONFIG.pushEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  async function subscribeToPushNotifications() {
    const config = await fetchPushConfig();
    const registration = await registerPushServiceWorker();
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      return { ok: false, permission };
    }
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(config.publicKey)
    });
    await sendPushSubscriptionToServer(subscription);
    return { ok: true, subscription };
  }

  async function unsubscribeFromPushNotifications() {
    const registration = await registerPushServiceWorker();
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      try {
        await removePushSubscriptionFromServer(subscription);
      } catch (err) {
        // ignore unsubscribe sync errors
      }
      await subscription.unsubscribe();
    }
    return { ok: true };
  }

  function setPushUiState({ statusEl, buttonEl, cardEl, supported, permission, subscribed, message }) {
    if (!statusEl || !buttonEl) return;
    const setDisabledStyle = (isDisabled) => {
      if (cardEl) {
        cardEl.classList.toggle('is-disabled', isDisabled);
      }
      buttonEl.classList.toggle('is-disabled', isDisabled);
      if (isDisabled) {
        buttonEl.setAttribute('aria-disabled', 'true');
      } else {
        buttonEl.removeAttribute('aria-disabled');
      }
    };
    if (!supported) {
      statusEl.textContent = t('Notifications not supported on this device.');
      buttonEl.textContent = t('Enable Notifications');
      buttonEl.disabled = false;
      buttonEl.dataset.mode = 'unsupported';
      setDisabledStyle(true);
      return;
    }
    if (permission === 'denied') {
      statusEl.textContent = t('Notifications are blocked in your browser settings.');
      buttonEl.textContent = t('Enable Notifications');
      buttonEl.disabled = true;
      buttonEl.dataset.mode = 'blocked';
      setDisabledStyle(true);
      return;
    }
    if (subscribed) {
      statusEl.textContent = t('Notifications enabled on this device.');
      buttonEl.textContent = t('Disable Notifications');
      buttonEl.disabled = false;
      buttonEl.dataset.mode = 'disable';
      setDisabledStyle(false);
      return;
    }
    statusEl.textContent = message || t('Enable device alerts for new drops and announcements.');
    buttonEl.textContent = t('Enable Notifications');
    buttonEl.disabled = false;
    buttonEl.dataset.mode = 'enable';
    setDisabledStyle(false);
  }

  async function setupJoinCommunityNotifications(popup) {
    if (!popup) return;
    const statusEl = popup.querySelector('[data-push-status]');
    const buttonEl = popup.querySelector('.join-community-push-toggle');
    const cardEl = buttonEl ? buttonEl.closest('.join-community-action-card') : null;
    if (!statusEl || !buttonEl) return;

    const supported = isPushSupported();
    let permission = supported ? Notification.permission : 'denied';
    let subscribed = false;
    let registration = null;

    if (supported) {
      try {
        registration = await registerPushServiceWorker();
        const subscription = await getPushSubscription(registration);
        subscribed = Boolean(subscription);
      } catch (err) {
        permission = 'denied';
      }
    }

    syncNotificationState(subscribed);
    setPushUiState({ statusEl, buttonEl, cardEl, supported, permission, subscribed });

    buttonEl.addEventListener('click', async () => {
      if (pushState.busy) return;
      pushState.busy = true;
      buttonEl.disabled = true;
      const mode = buttonEl.dataset.mode || 'enable';
      try {
        if (mode === 'unsupported') {
          await showAlert({
            title: t('Notifications'),
            text: t('Install the PWA (Web App) to unlock notifications.'),
            icon: 'info'
          });
          setPushUiState({
            statusEl,
            buttonEl,
            cardEl,
            supported,
            permission,
            subscribed
          });
          return;
        }
        if (mode === 'disable') {
          await unsubscribeFromPushNotifications();
          syncNotificationState(false);
          setPushUiState({
            statusEl,
            buttonEl,
            cardEl,
            supported: true,
            permission: Notification.permission,
            subscribed: false
          });
        } else {
          const result = await subscribeToPushNotifications();
          if (result.ok) {
            syncNotificationState(true);
            setPushUiState({
              statusEl,
              buttonEl,
              cardEl,
              supported: true,
              permission: Notification.permission,
              subscribed: true
            });
          } else {
            syncNotificationState(false);
            setPushUiState({
              statusEl,
              buttonEl,
              cardEl,
              supported: true,
              permission: result.permission || Notification.permission,
              subscribed: false,
              message: t('Notifications request failed. Try again.')
            });
          }
        }
      } catch (err) {
        syncNotificationState(false);
        setPushUiState({
          statusEl,
          buttonEl,
          cardEl,
          supported: true,
          permission: Notification.permission,
          subscribed: false,
          message: t('Notifications request failed. Try again.')
        });
      } finally {
        pushState.busy = false;
      }
    });
  }

  function isMobileDevice() {
    if (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') {
      return navigator.userAgentData.mobile;
    }
    const ua = navigator.userAgent || '';
    if (/Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua)) return true;
    if (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua)) return true;
    return false;
  }

  function isIosDevice() {
    const ua = navigator.userAgent || '';
    return /iPad|iPhone|iPod/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua));
  }

  function supportsPwaInstallPrompt() {
    return 'onbeforeinstallprompt' in window;
  }

  function isPwaInstalled() {
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      return true;
    }
    return Boolean(window.navigator && window.navigator.standalone);
  }

  function getPwaInstallUrl() {
    try {
      const url = new URL(window.location.href);
      const existing = url.searchParams.get('XID') || url.searchParams.get('xid');
      if (!existing) {
        const xid = state.cloudSync ? state.sessionId : readStoredXid();
        if (xid) {
          url.searchParams.set('XID', xid);
        }
      }
      return url.toString();
    } catch (err) {
      return window.location.href;
    }
  }

  function getManifestLink() {
    return document.querySelector('link[rel="manifest"]');
  }

  function resolveManifestUrl(value, baseUrl) {
    if (!value) return value;
    try {
      return new URL(value, baseUrl).toString();
    } catch (err) {
      return value;
    }
  }

  async function loadBaseManifest() {
    if (pwaState.manifestCache) return pwaState.manifestCache;
    const link = getManifestLink();
    if (!link) return null;
    if (!pwaState.manifestSourceUrl) {
      const href = link.getAttribute('href') || link.href || '';
      if (href) {
        try {
          pwaState.manifestSourceUrl = new URL(href, window.location.href).toString();
        } catch (err) {
          pwaState.manifestSourceUrl = href;
        }
      }
    }
    if (!pwaState.manifestSourceUrl) return null;
    try {
      const response = await fetch(pwaState.manifestSourceUrl, { cache: 'no-store' });
      if (!response.ok) return null;
      const data = await response.json();
      if (!data || typeof data !== 'object') return null;
      pwaState.manifestCache = data;
      return data;
    } catch (err) {
      return null;
    }
  }

  async function updatePwaManifestForUrl(startUrl) {
    if (!startUrl) return false;
    if (pwaState.lastStartUrl === startUrl) return true;
    const link = getManifestLink();
    if (!link) return false;
    const manifest = await loadBaseManifest();
    if (!manifest) return false;
    const baseUrl = pwaState.manifestSourceUrl || window.location.href;
    const nextManifest = {
      ...manifest,
      start_url: startUrl
    };
    if (manifest.scope) {
      nextManifest.scope = resolveManifestUrl(manifest.scope, baseUrl);
    }
    if (Array.isArray(manifest.icons)) {
      nextManifest.icons = manifest.icons.map((icon) => ({
        ...icon,
        src: resolveManifestUrl(icon.src, baseUrl)
      }));
    }
    const blob = new Blob([JSON.stringify(nextManifest)], { type: 'application/manifest+json' });
    const blobUrl = URL.createObjectURL(blob);
    if (pwaState.manifestOverrideUrl) {
      URL.revokeObjectURL(pwaState.manifestOverrideUrl);
    }
    pwaState.manifestOverrideUrl = blobUrl;
    link.setAttribute('href', blobUrl);
    pwaState.lastStartUrl = startUrl;
    return true;
  }

  function setPwaUiState({ statusEl, buttonEl }) {
    if (!statusEl || !buttonEl) return;
    if (isPwaInstalled() || pwaState.isInstalled) {
      statusEl.textContent = t('PWA already installed on this device.');
      buttonEl.textContent = t('Installed');
      buttonEl.disabled = true;
      buttonEl.dataset.mode = 'installed';
      return;
    }
    if (isIosDevice()) {
      statusEl.textContent = t('Install on iOS');
      buttonEl.textContent = t('Enable PWA');
      buttonEl.disabled = false;
      buttonEl.dataset.mode = 'ios';
      return;
    }
    if (!('serviceWorker' in navigator)) {
      statusEl.textContent = t('PWA install not supported on this device.');
      buttonEl.textContent = t('Enable PWA');
      buttonEl.disabled = true;
      buttonEl.dataset.mode = 'unsupported';
      return;
    }
    if (pwaState.deferredPrompt) {
      statusEl.textContent = t('Install the app on your home screen.');
      buttonEl.textContent = t('Enable PWA');
      buttonEl.disabled = false;
      buttonEl.dataset.mode = 'prompt';
      return;
    }
    if (!supportsPwaInstallPrompt()) {
      statusEl.textContent = t('Install from browser menu.');
      buttonEl.textContent = t('Enable PWA');
      buttonEl.disabled = false;
      buttonEl.dataset.mode = 'manual';
      return;
    }
    statusEl.textContent = t('PWA install not available yet. Try again later.');
    buttonEl.textContent = t('Enable PWA');
    buttonEl.disabled = false;
    buttonEl.dataset.mode = 'unavailable';
  }

  async function setupJoinCommunityPwa(popup) {
    if (!popup) return;
    const statusEl = popup.querySelector('[data-pwa-status]');
    const buttonEl = popup.querySelector('.join-community-pwa-toggle');
    if (!statusEl || !buttonEl) return;

    pwaState.ui = { statusEl, buttonEl };
    pwaState.isInstalled = isPwaInstalled();

    if ('serviceWorker' in navigator) {
      try {
        await registerPushServiceWorker();
      } catch (err) {
        // ignore service worker errors
      }
    }

    await updatePwaManifestForUrl(getPwaInstallUrl());
    setPwaUiState({ statusEl, buttonEl });

    buttonEl.addEventListener('click', async (event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (buttonEl.disabled) return;
      const mode = buttonEl.dataset.mode || '';
      if (mode === 'prompt') {
        await updatePwaManifestForUrl(getPwaInstallUrl());
        const promptEvent = pwaState.deferredPrompt;
        if (!promptEvent) {
          setPwaUiState({ statusEl, buttonEl });
          await showAlert({
            title: t('Enable PWA'),
            text: t('PWA install not available yet. Try again later.'),
            icon: 'info'
          });
          return;
        }
        promptEvent.prompt();
        const choice = await promptEvent.userChoice.catch(() => null);
        pwaState.deferredPrompt = null;
        if (choice && choice.outcome === 'accepted') {
          pwaState.isInstalled = true;
        }
        setPwaUiState({ statusEl, buttonEl });
        return;
      }
      if (mode === 'ios') {
        await handleIosShareInstall();
        return;
      }
      if (mode === 'manual') {
        await handleAndroidMenuInstall();
        return;
      }
      if (mode === 'unavailable') {
        await showAlert({
          title: t('Enable PWA'),
          text: t('PWA install not available yet. Try again later.'),
          icon: 'info'
        });
        return;
      }
      if (mode === 'unsupported') {
        await showAlert({
          title: t('Enable PWA'),
          text: t('PWA install not supported on this device.'),
          icon: 'info'
        });
      }
    });
  }

  function initPwaInstallHandlers() {
    if (!isMobileDevice()) return;
    pwaState.isInstalled = isPwaInstalled();
    if ('serviceWorker' in navigator) {
      registerPushServiceWorker().catch(() => { });
    }
    updatePwaManifestForUrl(getPwaInstallUrl()).catch(() => { });
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      pwaState.deferredPrompt = event;
      if (pwaState.ui && pwaState.ui.statusEl && pwaState.ui.buttonEl) {
        if (document.body.contains(pwaState.ui.statusEl) && document.body.contains(pwaState.ui.buttonEl)) {
          setPwaUiState(pwaState.ui);
        }
      }
    });
    window.addEventListener('appinstalled', () => {
      pwaState.isInstalled = true;
      pwaState.deferredPrompt = null;
      if (pwaState.ui && pwaState.ui.statusEl && pwaState.ui.buttonEl) {
        if (document.body.contains(pwaState.ui.statusEl) && document.body.contains(pwaState.ui.buttonEl)) {
          setPwaUiState(pwaState.ui);
        }
      }
    });
  }

  async function handleIosShareInstall() {
    await showAlert({
      title: t('Install on iOS'),
      text: `${t('1) Tap the Safari Share button (square with arrow).')}\n${t('2) Scroll down and tap Add to Home Screen.')}\n${t('If you do not see it, tap Edit Actions and enable Add to Home Screen.')}`,
      icon: 'info'
    });
  }

  async function handleAndroidMenuInstall() {
    await showAlert({
      title: t('Install on Android'),
      text: `${t('1) Tap the browser menu (three dots).')}\n${t('2) Tap Add to Home Screen.')}\n${t('If you do not see it, look for Install or Add to Home Screen.')}`,
      icon: 'info'
    });
  }

  function handleDiscordRedirect() {
    try {
      const url = new URL(window.location.href);
      const state = url.searchParams.get('discord');
      if (!state) return;
      url.searchParams.delete('discord');
      window.history.replaceState({}, '', url.toString());
      setDiscordFlash(state);
      openJoinCommunity();
    } catch (err) {
      // ignore URL failures
    }
  }

  function openJoinCommunity() {
    const discordUrl = DEFAULT_DISCORD_INVITE;
    const redditUrl = 'https://www.reddit.com/r/MuahAI/';
    const showPwaCard = isMobileDevice();
    const pwaCardHtml = showPwaCard ? `
            <div class="join-community-action-card pwa">
              <div class="join-community-action-header">
                <div class="join-community-action-title">${t('PWA')}</div>
                <div class="join-community-action-badge">${t('New')}</div>
              </div>
              <div class="join-community-action-sub" data-pwa-status>${t('Install the app on your home screen.')}</div>
              <button class="solid-button join-community-pwa-toggle" type="button">
                ${t('Enable PWA')}
              </button>
            </div>
          ` : '';
    if (window.Swal && typeof window.Swal.fire === 'function') {
      const closeLabel = t('Close');
      window.Swal.fire({
        title: t('Join Community'),
        html: `
          <button class="join-community-close" type="button" aria-label="${closeLabel}">
            <span aria-hidden="true">Ã—</span>
          </button>
          <div class="join-community-actions">
            <div class="join-community-action-card discord">
              <div class="join-community-action-header">
                <div class="join-community-action-title">${t('Discord')}</div>
                <div class="join-community-action-badge" data-xp-badge="discord">${t('20% XP bonus')}<span class="xp-bonus-check" aria-hidden="true">âœ“</span></div>
              </div>
              <div class="join-community-action-sub">${t('Link Discord to unlock 20% XP bonus.')}</div>
              <button class="solid-button join-community-link" type="button">
                ${t('Link Discord')}
              </button>
            </div>
            <div class="join-community-action-card notifications">
              <div class="join-community-action-header">
                <div class="join-community-action-title">${t('Notifications')}</div>
                <div class="join-community-action-badge" data-xp-badge="notifications">${t('20% XP bonus')}<span class="xp-bonus-check" aria-hidden="true">âœ“</span></div>
              </div>
              <div class="join-community-action-sub" data-push-status>${t('Enable device alerts for new drops and announcements.')}</div>
              <button class="solid-button join-community-push-toggle" type="button">
                ${t('Enable Notifications')}
              </button>
            </div>
            ${pwaCardHtml}
            <a class="join-community-action-card reddit" href="${redditUrl}" target="_blank" rel="noopener noreferrer">
              <div class="join-community-action-header">
                <div class="join-community-action-title">${t('Reddit')}</div>
              </div>
              <div class="join-community-action-sub">${t('Join Reddit')}</div>
              <span class="join-community-action-cta">${t('Join Reddit')}</span>
            </a>
          </div>
          <div class="join-community-discord" data-discord-panel>
            <div class="join-community-discord-title">${t('Discord account')}</div>
            <div class="join-community-discord-body">
              <div class="join-community-discord-status muted" data-discord-status-text>
                ${t('Checking Discord status...')}
              </div>
              <div class="join-community-discord-user" data-discord-user style="display: none;">
                <img data-discord-avatar alt="${t('Discord avatar')}">
                <div class="discord-user-info">
                  <div class="discord-user-name" data-discord-name></div>
                  <div class="discord-user-handle" data-discord-handle></div>
                  <div class="discord-user-email" data-discord-email></div>
                </div>
              </div>
              <div class="join-community-discord-guild muted" data-discord-guild-text></div>
            </div>
            <div class="join-community-discord-actions">
              <button class="ghost-button join-community-unlink" type="button">
                ${t('Unlink Discord')}
              </button>
            </div>
          </div>
        `,
        showConfirmButton: false,
        showCloseButton: false,
        returnFocus: false,
        heightAuto: false,
        scrollbarPadding: false,
        customClass: { popup: 'join-community-popup' },
        didOpen: () => {
          const popup = window.Swal.getPopup
            ? window.Swal.getPopup()
            : document.querySelector('.swal2-popup');
          joinCommunityPopup = popup || null;
          const closeButton = popup ? popup.querySelector('.join-community-close') : null;
          if (closeButton) {
            closeButton.addEventListener('click', () => {
              window.Swal.close();
            });
          }
          setupJoinCommunityDiscord(popup, discordUrl);
          setupJoinCommunityNotifications(popup);
          setupJoinCommunityPwa(popup);
          updateJoinCommunityBonusBadges(popup);
        },
        didClose: () => {
          joinCommunityPopup = null;
          pwaState.ui = null;
        }
      });
      return;
    }
    if (confirm(t('Join Reddit') + '?')) {
      window.open(redditUrl, '_blank', 'noopener');
    }
    if (confirm(t('Link Discord') + '?')) {
      startDiscordLinkFlow();
    }
  }

  function openTakeBreak() {
    const xid = state.sessionId || readStoredXid() || '';
    const base = 'https://muah.life';
    const url = xid
      ? `${base}/admin/create_user?email=${encodeURIComponent(xid)}@muah.life&XID=${encodeURIComponent(xid)}&disable=1`
      : base;
    window.open(url, '_blank', 'noopener');
  }

  function openCallModal(mode) {
    dom.callModal.classList.add('active');
    dom.callModal.setAttribute('aria-hidden', 'false');
    dom.callTitle.textContent = mode === 'video' ? t('Live Video') : t('Live Call');
    dom.callStatus.textContent = t('Ready to connect');
    dom.callModal.dataset.mode = mode;
    if (dom.callAvatarImage) {
      const currentAvatar = document.querySelector('.avatar img');
      if (currentAvatar && currentAvatar.src) {
        dom.callAvatarImage.src = currentAvatar.src;
      }
    }
    renderIdleCallRing();
  }

  function closeCallModal() {
    dom.callModal.classList.remove('active');
    dom.callModal.setAttribute('aria-hidden', 'true');
    endCall();
  }

  function clearCallUI(statusText) {
    if (statusText) {
      dom.callStatus.textContent = t(statusText);
    }
    if (dom.callAvatarBorder) {
      dom.callAvatarBorder.classList.remove('zoom-effect');
    }
    stopCallVisualizer();
    if (dom.callInputFill) dom.callInputFill.style.width = '0%';
    if (dom.callOutputFill) dom.callOutputFill.style.width = '0%';
  }

  class CallRingVisualizer {
    constructor(canvas, getSpeaking) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.audioContext = null;
      this.analyser = null;
      this.dataArray = null;
      this.source = null;
      this.animationId = null;
      this.isPlaying = false;
      this.getSpeaking = getSpeaking;
      this.init();
    }

    init() {
      this.canvas.width = 300;
      this.canvas.height = 300;
    }

    async startMicrophone() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone unavailable');
      }
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.setupAudioNodes(stream);
      this.startVisualization();
    }

    setupAudioNodes(stream) {
      if (this.source) {
        this.source.disconnect();
      }
      this.source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.source.connect(this.analyser);
      this.drawDefaultBars();
    }

    startVisualization() {
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.draw();
      }
    }

    stopVisualization() {
      this.isPlaying = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      if (this.source) {
        this.source.disconnect();
        this.source = null;
      }
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    generateSimulatedAudioData() {
      const length = this.dataArray.length;
      const interval = Math.floor(Math.random() * 21) + 25;
      const start = Math.floor(Math.random() * (length - interval));
      const maxBarHeight = Math.floor(Math.random() * 91) + 10;
      for (let i = 0; i < length; i += 1) {
        if (i < start || i >= start + interval) {
          this.dataArray[i] = 0;
        } else {
          const positionInInterval = i - start;
          if (positionInInterval < interval / 2) {
            this.dataArray[i] = Math.floor((maxBarHeight / (interval / 2)) * positionInInterval);
          } else {
            this.dataArray[i] = Math.floor((maxBarHeight / (interval / 2)) * (interval - positionInInterval));
          }
        }
      }
    }

    draw() {
      if (!this.isPlaying) return;
      this.animationId = requestAnimationFrame(() => this.draw());
      this.analyser.getByteFrequencyData(this.dataArray);
      if (this.getSpeaking() && this.dataArray.every((value) => value === 0)) {
        this.generateSimulatedAudioData();
      }
      this.drawBars(this.dataArray);
    }

    drawDefaultBars() {
      const defaultDataArray = new Uint8Array(this.analyser.frequencyBinCount).fill(50);
      this.drawBars(defaultDataArray);
    }

    drawBars(dataArray) {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const radius = 95;
      const bars = 100;
      const barWidth = 2;
      const maxBarHeight = 50;
      for (let i = 0; i < bars; i += 1) {
        const angle = (i * 2 * Math.PI) / bars;
        const frequency = Math.floor((i * dataArray.length) / bars);
        const value = dataArray[frequency];
        const minBarHeight = Math.floor(Math.random() * 11) + 5;
        let barHeight = value * 0.5;
        barHeight = Math.max(minBarHeight, Math.min(maxBarHeight, barHeight));
        const x1 = centerX + (radius * Math.cos(angle));
        const y1 = centerY + (radius * Math.sin(angle));
        const x2 = centerX + ((radius + barHeight) * Math.cos(angle));
        const y2 = centerY + ((radius + barHeight) * Math.sin(angle));
        const colorRatio = (barHeight - minBarHeight) / (maxBarHeight - minBarHeight);
        const hue = 300 - (60 * colorRatio);
        const lightness = 50 + (25 * colorRatio);
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;
        ctx.lineWidth = barWidth;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
  }

  function ensureCallVisualizer() {
    if (!dom.callVisualizer) return null;
    if (!state.callVisualizer) {
      state.callVisualizer = new CallRingVisualizer(dom.callVisualizer, () => state.callSpeaking);
    }
    return state.callVisualizer;
  }

  function renderIdleCallRing() {
    const visualizer = ensureCallVisualizer();
    if (!visualizer) return;
    const idleData = new Uint8Array(128).fill(50);
    visualizer.drawBars(idleData);
  }

  async function startCallVisualizer() {
    if (prefersReducedMotion()) {
      renderIdleCallRing();
      return;
    }
    const visualizer = ensureCallVisualizer();
    if (!visualizer) return;
    try {
      await visualizer.startMicrophone();
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: call visualizer mic failed', err);
      }
    }
  }

  function stopCallVisualizer() {
    if (state.callVisualizer) {
      state.callVisualizer.stopVisualization();
    }
  }

  async function startCall() {
    if (!window.client || !window.client.Conversation) {
      dom.callStatus.textContent = t('Call service unavailable.');
      return;
    }

    if (state.callSession) {
      dom.callStatus.textContent = t('Call already running.');
      return;
    }

    const mode = dom.callModal.dataset.mode || 'phone';
    dom.callStatus.textContent = t('Connecting...');
    if (dom.callAvatarBorder) {
      dom.callAvatarBorder.classList.add('zoom-effect');
    }

    try {
      const sessionOptions = {
        membership: 'ULTRA VIP',
        callMode: mode,
        aivoice: normalizeVoiceValue(state.settings.voice),
        allowNoXid: true,
        disableXid: true,
        extraFormData: () => ({
          origin: 'chatroom',
          platform: 'chatroom',
          chatroom_core_prompt: state.settings.corePrompt || '',
          chatroom_history: JSON.stringify(buildCallHistoryPayload())
        }),
        onConnect: () => {
          dom.callStatus.textContent = t('Connected');
          if (dom.callAvatarBorder) {
            dom.callAvatarBorder.classList.remove('zoom-effect');
          }
          startCallVisualizer();
        },
        onDisconnect: () => {
          state.callSession = null;
          state.callSpeaking = false;
          if (dom.callAvatarBorder) {
            dom.callAvatarBorder.classList.remove('zoom-effect');
          }
          clearCallUI('Call ended.');
        },
        onError: (error) => {
          if (error && error.message) {
            dom.callStatus.textContent = t('Call error: {message}', { message: error.message });
          } else {
            dom.callStatus.textContent = t('Call error.');
          }
          if (dom.callAvatarBorder) {
            dom.callAvatarBorder.classList.remove('zoom-effect');
          }
        },
        onStatusChange: ({ status }) => {
          dom.callStatus.textContent = status;
        },
        onModeChange: ({ mode: callMode }) => {
          state.callSpeaking = callMode === 'speaking';
          dom.callStatus.textContent = state.callSpeaking ? t('Speaking') : t('Listening');
        }
      };

      if (CONFIG.callServerUrl) {
        sessionOptions.serverUrl = CONFIG.callServerUrl;
      }

      state.callSession = await window.client.Conversation.startSession(sessionOptions);

      monitorCallMeter();
    } catch (err) {
      dom.callStatus.textContent = t('Call failed to start.');
    }
  }

  async function endCall() {
    if (state.callSession) {
      await state.callSession.endSession();
      state.callSession = null;
      state.callSpeaking = false;
      clearCallUI('Call ended.');
    }
  }

  function buildCallHistoryPayload() {
    const tokenState = buildConversationTokenState(state.messages);
    const history = state.messages.filter((msg) => (
      isConversationMessage(msg) && (!msg.id || tokenState.includedIds.has(msg.id))
    ));
    return history.reduce((acc, msg) => {
      const content = (msg.text || '').trim();
      if (!content) return acc;
      acc.push({
        role: msg.role,
        content
      });
      return acc;
    }, []);
  }

  function updateCallMeter(el, level) {
    if (!el) return;
    const value = Math.min(100, Math.max(0, level * 120));
    el.style.width = `${value}%`;
  }

  function monitorCallMeter() {
    if (!state.callSession) return;
    const tick = () => {
      if (!state.callSession) return;
      const inputLevel = state.callSession.getInputVolume ? state.callSession.getInputVolume() : 0;
      const outputLevel = state.callSession.getOutputVolume ? state.callSession.getOutputVolume() : 0;
      updateCallMeter(dom.callInputFill, inputLevel);
      updateCallMeter(dom.callOutputFill, outputLevel);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  async function replaceCloudHistory(history, slot = state.activeSlot) {
    if (!state.cloudSync || !state.sessionId) {
      return { ok: false, error: t('Login required') };
    }
    const requestSlot = normalizeSlotValue(slot);
    try {
      const response = await fetch(CONFIG.replyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history_replace: 1,
          XID: state.sessionId,
          slot: requestSlot,
          history: Array.isArray(history) ? history : [],
          debug: DEBUG
        })
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: invalid cloud replace response', {
            status: response.status,
            rawText
          });
        }
        return { ok: false, error: t('Cloud sync failed. Try again.') };
      }
      if (!response.ok || !data || !data.ok) {
        const errorText = data && data.error ? data.error : t('Cloud sync failed. Try again.');
        return { ok: false, error: errorText };
      }
      const ids = Array.isArray(data && data.ids)
        ? data.ids.map((id) => (Number.isFinite(Number(id)) ? Number(id) : null))
        : null;
      return { ok: true, inserted: Number(data.inserted) || 0, ids };
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: cloud replace failed', err);
      }
      return { ok: false, error: t('Cloud sync unavailable. Try again.') };
    }
  }

  async function wipeCloudDataRequest() {
    if (!state.cloudSync || !state.sessionId) {
      return { ok: false, error: t('Login required') };
    }
    try {
      const response = await fetch(CONFIG.replyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wipe_cloud: 1,
          XID: state.sessionId,
          debug: DEBUG
        })
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: invalid cloud wipe response', {
            status: response.status,
            rawText
          });
        }
        return { ok: false, error: t('Cloud wipe failed. Try again.') };
      }
      if (!response.ok || !data || !data.ok) {
        const errorText = data && data.error ? data.error : t('Cloud wipe failed. Try again.');
        return { ok: false, error: errorText };
      }
      return { ok: true };
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: cloud wipe failed', err);
      }
      return { ok: false, error: t('Cloud sync unavailable. Try again.') };
    }
  }

  async function clearCloudHistory() {
    if (!state.cloudSync) return true;
    const parseResponse = async (response) => {
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: invalid cloud reset response', {
            status: response.status,
            rawText
          });
        }
        throw err;
      }
      return Boolean(response.ok && data && data.ok);
    };
    try {
      const response = await fetch(CONFIG.replyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clear_history: 1,
          XID: state.sessionId,
          slot: state.activeSlot,
          debug: DEBUG
        })
      });
      const ok = await parseResponse(response);
      if (ok) {
        return true;
      }
      throw new Error('Cloud reset failed');
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: cloud reset failed', err);
      }
      try {
        const params = new URLSearchParams({
          clear_history: '1',
          XID: state.sessionId,
          slot: String(state.activeSlot),
          debug: DEBUG ? '1' : '0',
          _: String(Date.now())
        });
        const response = await fetch(`${CONFIG.replyEndpoint}?${params.toString()}`, {
          method: 'GET'
        });
        return await parseResponse(response);
      } catch (fallbackErr) {
        if (DEBUG) {
          console.warn('Chatroom debug: cloud reset failed (GET)', fallbackErr);
        }
        return false;
      }
    }
  }

  async function resetCloudSettingsToDefault() {
    if (!state.cloudSync || !state.sessionId) return false;
    const slotNames = normalizeSlotNames(state.slotMeta && state.slotMeta.names);
    const slotNamesUpdatedAt = normalizeTimestamp(
      state.slotMeta && (
        state.slotMeta.namesUpdatedAt
        ?? state.slotMeta.names_updated_at
        ?? state.slotMeta.slot_names_updated_at
        ?? state.slotMeta.slotNamesUpdatedAt
      )
    );
    const payload = {
      core_prompt: '',
      looklike: '',
      photo_style: DEFAULT_PHOTO_STYLE,
      ai_name: DEFAULT_AI_NAME,
      my_name: '',
      persona_preset: 'custom',
      looklike_preset: 'custom',
      theme: getDefaultTheme(),
      low_power_mode: 0,
      background: '',
      voice: DEFAULT_VOICE,
      ai_core: DEFAULT_AI_CORE,
      ai_temperature: DEFAULT_AI_TEMPERATURE,
      character_id: '',
      slots_unlocked: normalizeSlotsUnlocked(state.slotMeta.unlocked),
      slots_updated_at: normalizeTimestamp(state.slotMeta.updatedAt),
      slot_names: slotNames,
      slot_names_updated_at: slotNamesUpdatedAt
    };
    try {
      const response = await fetch(CONFIG.replyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings_update: 1,
          XID: state.sessionId,
          slot: state.activeSlot,
          settings: payload,
          debug: DEBUG
        })
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        if (DEBUG) {
          console.warn('Chatroom debug: invalid cloud settings reset response', {
            status: response.status,
            rawText
          });
        }
        return false;
      }
      return Boolean(response.ok && data && data.ok);
    } catch (err) {
      if (DEBUG) {
        console.warn('Chatroom debug: cloud settings reset failed', err);
      }
      return false;
    }
  }

  async function resetChat() {
    const resetText = t('This clears the chat history (Resetting the AI\'s conversation memory)');
    const confirmed = await confirmDialog({
      title: t('Reset chat?'),
      text: resetText,
      confirmText: t('Reset chat'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return;
    if (state.cloudSync && state.sessionId) {
      const wiped = await wipeCloudDataRequest();
      if (!wiped.ok) {
        addSystemMessage(wiped.error || t('Cloud wipe failed. Try again.'));
        return;
      }
    }
    clearQueuePool();
    state.messages = [];
    saveToStorage(STORAGE_KEYS.history, state.messages);
    localStorage.removeItem(getSlotVoiceCacheKey());
    writeCloudResetMarker(state.activeSlot);
    state.settings.memorySummary = '';
    persistSettings();
    resetMemoryCompactionState();
    renderMessages();
    addSystemMessage(t('Chat reset.'));
  }

  function resizeTextarea(textarea, maxRows = 25) {
    if (!textarea) return;
    if (!textarea.dataset.minRows) {
      const initialRows = Number(textarea.getAttribute('rows')) || 1;
      textarea.dataset.minRows = String(initialRows);
    }
    const styles = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(styles.lineHeight);
    const fontSize = parseFloat(styles.fontSize);
    const paddingTop = parseFloat(styles.paddingTop);
    const paddingBottom = parseFloat(styles.paddingBottom);
    const borderTop = parseFloat(styles.borderTopWidth);
    const borderBottom = parseFloat(styles.borderBottomWidth);
    const baseLine = Number.isFinite(lineHeight)
      ? lineHeight
      : (Number.isFinite(fontSize) ? fontSize * 1.4 : 20);
    const minRows = Math.max(1, Number(textarea.dataset.minRows) || 1);
    const maxHeight = baseLine * maxRows
      + (Number.isFinite(paddingTop) ? paddingTop : 0)
      + (Number.isFinite(paddingBottom) ? paddingBottom : 0)
      + (Number.isFinite(borderTop) ? borderTop : 0)
      + (Number.isFinite(borderBottom) ? borderBottom : 0);
    const minHeight = baseLine * minRows
      + (Number.isFinite(paddingTop) ? paddingTop : 0)
      + (Number.isFinite(paddingBottom) ? paddingBottom : 0)
      + (Number.isFinite(borderTop) ? borderTop : 0)
      + (Number.isFinite(borderBottom) ? borderBottom : 0);
    textarea.rows = minRows;
    textarea.style.height = 'auto';
    textarea.style.maxHeight = `${maxHeight}px`;
    const scrollHeight = textarea.scrollHeight || 0;
    const contentHeight = Math.max(0, scrollHeight - (paddingTop + paddingBottom));
    const estimatedRows = Math.max(minRows, Math.ceil(contentHeight / baseLine));
    const clampedRows = Math.min(maxRows, estimatedRows);
    if (textarea.rows !== clampedRows) {
      textarea.rows = clampedRows;
    }
    const nextHeight = Math.min(Math.max(scrollHeight + borderTop + borderBottom, minHeight), maxHeight);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
  }

  function resizePromptInput(target = dom.promptInput) {
    resizeTextarea(target, 25);
  }

  function openPrompt(mode, sourceUrl = '') {
    if (mode === 'photo' && isPhotoGenDisabled()) {
      addSystemMessage(t('Photo generation is disabled.'));
      return;
    }
    const isVideo = mode === 'video' || mode === 'videoGen2';
    state.promptMode = mode;
    let previewUrl = isVideo ? sourceUrl : '';
    if (isVideo && !previewUrl) {
      const fallbackImage = state.gallery.find((item) => item.type === 'image');
      previewUrl = fallbackImage ? fallbackImage.url : '';
    }
    state.promptSourceUrl = isVideo ? previewUrl : '';
    if (dom.promptPreview && dom.promptPreviewImage) {
      if (isVideo && previewUrl) {
        const resolvedPreview = resolveMediaUrl(previewUrl);
        if (resolvedPreview) {
          dom.promptPreviewImage.src = resolvedPreview;
          dom.promptPreview.hidden = false;
          dom.promptPreview.setAttribute('aria-hidden', 'false');
        } else {
          dom.promptPreviewImage.removeAttribute('src');
          dom.promptPreview.hidden = true;
          dom.promptPreview.setAttribute('aria-hidden', 'true');
        }
      } else {
        dom.promptPreviewImage.removeAttribute('src');
        dom.promptPreview.hidden = true;
        dom.promptPreview.setAttribute('aria-hidden', 'true');
      }
    }
    if (dom.promptOptions) {
      const showOptions = mode === 'videoGen2';
      dom.promptOptions.hidden = !showOptions;
      if (showOptions && dom.promptDurationSelect) {
        dom.promptDurationSelect.value = String(state.promptVideoGen2Duration);
      }
      if (showOptions && dom.promptNsfwToggle) {
        dom.promptNsfwToggle.checked = Boolean(state.promptVideoGen2Nsfw);
      }
    }
    dom.promptTitle.textContent = isVideo
      ? (mode === 'videoGen2' ? t('Generate Video Gen 2') : t('Generate Video'))
      : t('Generate Photo');
    dom.promptSubtitle.textContent = isVideo
      ? t('Describe the motion you want.')
      : t('Describe the photo you want.');
    dom.promptInput.value = '';
    dom.promptModal.classList.add('active');
    dom.promptModal.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(resizePromptInput);
  }

  function closePrompt() {
    dom.promptModal.classList.remove('active');
    dom.promptModal.setAttribute('aria-hidden', 'true');
    state.promptSourceUrl = '';
  }

  async function handlePromptSubmit() {
    const prompt = dom.promptInput.value.trim();
    if (!prompt) return;
    const sourceUrl = state.promptSourceUrl;
    closePrompt();

    if (state.promptMode === 'video') {
      await generateVideo(prompt, sourceUrl);
    } else if (state.promptMode === 'videoGen2') {
      const duration = dom.promptDurationSelect
        ? normalizeVideoGen2Duration(dom.promptDurationSelect.value)
        : state.promptVideoGen2Duration;
      state.promptVideoGen2Duration = duration;
      const nsfw = dom.promptNsfwToggle
        ? Boolean(dom.promptNsfwToggle.checked)
        : Boolean(state.promptVideoGen2Nsfw);
      state.promptVideoGen2Nsfw = nsfw;
      await generateVideoGen2(prompt, sourceUrl, duration, nsfw);
    } else {
      await generatePhoto(prompt);
    }
  }

  async function generatePhoto(prompt) {
    if (isPhotoGenDisabled()) {
      addSystemMessage(t('Photo generation is disabled.'));
      return;
    }
    addSystemMessage(t('Generating photo...'));
    try {
      const response = await fetch(CONFIG.generatePhotoEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          looklike: state.settings.looklike || '',
          photo_style: state.settings.photoStyle || DEFAULT_PHOTO_STYLE,
          ...(state.cloudSync && state.sessionId && !isFevermateHost()
            ? { XID: state.sessionId }
            : {})
        })
      });
      const data = await response.json();
      if (data && data.membership) {
        applyMembershipUpdate(data.membership);
      }
      if (!data.ok) {
        addSystemMessage(data.error || t('Photo generation failed.'));
        return;
      }
      addMessage({
        id: randomId(10),
        role: 'assistant',
        text: t('Here is your photo.'),
        mediaUrl: data.url,
        mediaType: 'image',
        timestamp: new Date().toISOString(),
        meta: 'Photo'
      });
      trackGallery({ url: data.url, type: 'image', prompt, source: 'assistant' });
    } catch (err) {
      addSystemMessage(t('Photo generation failed.'));
    }
  }

  async function generateVideo(prompt, sourceUrl = '') {
    const fallbackImage = state.gallery.find((item) => item.type === 'image');
    const imageUrl = sourceUrl || (fallbackImage ? fallbackImage.url : '');
    const resolvedUrl = resolveMediaUrl(imageUrl);
    if (!resolvedUrl) {
      addSystemMessage(t('Add a photo first before generating video.'));
      return;
    }

    addSystemMessage(t('Video generation queued...'));
    try {
      const url = `${CONFIG.videoEndpoint}?prompt_text=${encodeURIComponent(prompt)}&resolution=high&seed=3&XID=${encodeURIComponent(state.sessionId)}&image_url=${encodeURIComponent(resolvedUrl)}`;
      const response = await fetch(url);
      const rawText = await response.text();
      let data = null;
      if (rawText) {
        try {
          data = JSON.parse(rawText);
        } catch (err) {
          data = null;
        }
      }
      if (!response.ok) {
        addSystemMessage(rawText && rawText.trim() ? rawText.trim() : t('Video generation failed.'));
        return;
      }
      if (!data) {
        addSystemMessage(rawText && rawText.trim() ? rawText.trim() : t('Video generation failed.'));
        return;
      }
      if (data.status !== 'accepted') {
        const rejectText = data.message || (rawText && rawText.trim() ? rawText.trim() : '');
        addSystemMessage(rejectText || t('Video request rejected.'));
        return;
      }
      const videoUrl = data.final_url || '';
      if (!videoUrl) {
        addSystemMessage(t('Video queued but no URL returned.'));
        return;
      }
      trackGallery({ url: videoUrl, type: 'video', prompt, source: 'assistant' });
      addMessage({
        id: randomId(10),
        role: 'assistant',
        text: t('Video generation started. Check the gallery soon.'),
        mediaUrl: '',
        mediaType: '',
        timestamp: new Date().toISOString(),
        meta: 'Video'
      });
    } catch (err) {
      addSystemMessage(t('Video generation failed.'));
    }
  }

  function getVideoGen2CostLevels(info = getMembershipInfo(), duration = 5) {
    let base = 20;
    if (info) {
      if (info.isAdmin || info.isUltra) {
        base = 1;
      } else if (info.isGptTier) {
        base = 5;
      } else if (info.isVip) {
        base = 10;
      }
    }
    return base * getVideoGen2DurationMultiplier(duration);
  }

  async function refundXpSpend(spendId) {
    if (!spendId) return;
    if (isXpServerEnabled()) {
      const result = await xpSyncRequest({ action: 'refund', spend_id: spendId });
      if (result && result.ok) {
        applyXpServerState(result);
        state.xpSyncLoaded = true;
        state.xpSyncLastAt = Date.now();
      }
      return;
    }
    // local fallback not supported
  }

  async function confirmVideoGen2Purchase(levels, options = {}) {
    if (!isXpEligible()) {
      await showAlert({
        title: t('Login required'),
        text: t('Connect your XID to spend XP levels.'),
        icon: 'info'
      });
      return false;
    }
    if (!(await ensureXpSyncReady())) {
      await showAlert({
        title: t('Syncing from cloud. Try again in a moment.'),
        text: t('Syncing from cloud. Try again in a moment.'),
        icon: 'info'
      });
      return false;
    }
    if (getXpLevel() < levels) {
      await showAlert({
        title: t('Not enough levels'),
        text: t('Need {count} levels to generate this video.', { count: levels }),
        icon: 'warning'
      });
      return false;
    }
    const confirmed = await confirmDialog({
      title: t('Generate Video Gen 2?'),
      text: t('Spend {count} levels to generate this video.', { count: levels }),
      confirmText: t('Generate'),
      cancelText: t('Cancel'),
      icon: 'warning'
    });
    if (!confirmed) return false;
    const spendResult = await spendXpLevels(levels, {
      reason: 'video_gen2',
      duration: options.duration
    });
    if (!spendResult.ok) {
      await showAlert({
        title: t('Not enough XP'),
        text: t('Unable to spend levels right now.'),
        icon: 'error'
      });
      return false;
    }
    return spendResult;
  }

  function parseVideoGen2Response(rawText) {
    let data = null;
    if (rawText) {
      try {
        data = JSON.parse(rawText);
      } catch (err) {
        data = null;
      }
    }
    const baseError = (data && (data.error || data.message || data.detail))
      ? String(data.error || data.message || data.detail).trim()
      : (rawText && rawText.trim() ? rawText.trim() : '');
    const detailError = data && data.detail ? String(data.detail).trim() : '';
    let errorText = baseError;
    if (detailError && (!errorText || !errorText.includes(detailError))) {
      errorText = errorText ? `${errorText} (${detailError})` : detailError;
    }
    return { data, errorText };
  }

  async function generateVideoGen2(prompt, sourceUrl = '', duration = 5, nsfw = false) {
    const fallbackImage = state.gallery.find((item) => item.type === 'image');
    const imageUrl = sourceUrl || (fallbackImage ? fallbackImage.url : '');
    const resolvedUrl = resolveMediaUrl(imageUrl);
    if (!resolvedUrl) {
      addSystemMessage(t('Add a photo first before generating video.'));
      return;
    }

    const normalizedDuration = normalizeVideoGen2Duration(duration);
    const costLevels = getVideoGen2CostLevels(getMembershipInfo(), normalizedDuration);
    const spendResult = await confirmVideoGen2Purchase(costLevels, { duration: normalizedDuration });
    if (!spendResult || !spendResult.ok) return;
    const spendId = spendResult.spendId || '';

    const queuedMessageId = addSystemMessage(t('Video generation queued...'));
    const startedAt = Date.now();
    const quickWindowMs = 30000;
    const quickIntervalMs = 5000;
    const pendingIntervalMs = 30000;
    const timeoutMs = 3 * 60 * 1000;
    let settled = false;
    let refunded = false;

    const refundOnce = () => {
      if (refunded) return;
      refunded = true;
      if (spendId) {
        void refundXpSpend(spendId);
      }
    };

    const handleFailure = (message) => {
      if (settled) return;
      settled = true;
      refundOnce();
      const failureText = message || t('Video generation failed.');
      const replaced = queuedMessageId && replaceMessageContent(queuedMessageId, {
        text: failureText,
        meta: 'System',
        mediaUrl: '',
        mediaType: ''
      });
      if (!replaced) {
        addSystemMessage(failureText);
      }
    };

    const handleSuccess = (videoUrl) => {
      if (settled) return;
      settled = true;
      trackGallery({ url: videoUrl, type: 'video', prompt, source: 'assistant' });
      const replaced = queuedMessageId && replaceMessageContent(queuedMessageId, {
        text: t('Here is your video.'),
        mediaUrl: videoUrl,
        mediaType: 'video',
        meta: 'Video',
        prompt
      });
      if (!replaced) {
        addMessage({
          id: randomId(10),
          role: 'assistant',
          text: t('Here is your video.'),
          mediaUrl: videoUrl,
          mediaType: 'video',
          timestamp: new Date().toISOString(),
          meta: 'Video',
          prompt
        });
      }
    };

    const pollStatus = async (requestId) => {
      if (settled) return;
      const elapsed = Date.now() - startedAt;
      if (elapsed > timeoutMs) {
        handleFailure(t('Sorry Photo Generation V2 servers are busy, try again later...'));
        return;
      }
      try {
        const statusResponse = await fetch(CONFIG.generateVideoGen2Endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'status',
            request_id: requestId
          })
        });
        const rawText = await statusResponse.text();
        const { data, errorText } = parseVideoGen2Response(rawText);
        if (!statusResponse.ok || !data || !data.ok) {
          handleFailure(errorText || t('Video generation failed.'));
          return;
        }
        const videoUrl = data.url || '';
        if (data.done && videoUrl) {
          handleSuccess(videoUrl);
          return;
        }
        const statusFlag = String(data.status || '').toLowerCase();
        if (statusFlag === 'failed' || statusFlag === 'error' || statusFlag === 'canceled') {
          handleFailure(errorText || t('Video generation failed.'));
          return;
        }
        const isPending = statusFlag === 'pending' || statusFlag === 'queued' || statusFlag === '';
        let nextDelay = quickIntervalMs;
        if (elapsed >= quickWindowMs) {
          nextDelay = isPending ? pendingIntervalMs : quickIntervalMs;
        }
        setTimeout(() => pollStatus(requestId), nextDelay);
      } catch (err) {
        handleFailure(t('Video generation failed.'));
      }
    };

    try {
      const response = await fetch(CONFIG.generateVideoGen2Endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          prompt,
          image_url: resolvedUrl,
          duration: normalizedDuration,
          nsfw: Boolean(nsfw)
        })
      });
      const rawText = await response.text();
      const { data, errorText } = parseVideoGen2Response(rawText);
      if (!response.ok || !data || !data.ok) {
        handleFailure(errorText || t('Video generation failed.'));
        return;
      }
      const requestId = data.request_id || data.requestId || '';
      if (!requestId) {
        handleFailure(errorText || t('Video generation failed.'));
        return;
      }
      pollStatus(requestId);
    } catch (err) {
      handleFailure(t('Video generation failed.'));
    }
  }

  initI18n().finally(() => {
    setupAuth();
    ensureAuthThenInit();
  });
})();
