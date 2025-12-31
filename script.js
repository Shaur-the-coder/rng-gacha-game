// ============================================
// RNG Gacha Game - Game Logic with Economy
// ============================================

// 150 Items with Rarities and Prices
const ITEMS = [
    // ========================================
    // COMMON (60 items) - 50% chance - 10 gems, 1 coin
    // ========================================
    // Nature
    { id: 1, name: "Stone", emoji: "🪨", rarity: "common" },
    { id: 2, name: "Stick", emoji: "🪵", rarity: "common" },
    { id: 3, name: "Leaf", emoji: "🍃", rarity: "common" },
    { id: 4, name: "Pebble", emoji: "⚪", rarity: "common" },
    { id: 5, name: "Dirt", emoji: "🟤", rarity: "common" },
    { id: 6, name: "Grass", emoji: "🌿", rarity: "common" },
    { id: 7, name: "Acorn", emoji: "🌰", rarity: "common" },
    { id: 8, name: "Shell", emoji: "🐚", rarity: "common" },
    { id: 9, name: "Feather", emoji: "🪶", rarity: "common" },
    { id: 10, name: "Bone", emoji: "🦴", rarity: "common" },
    { id: 11, name: "Coal", emoji: "⚫", rarity: "common" },
    { id: 12, name: "Sand", emoji: "🏖️", rarity: "common" },
    { id: 13, name: "Clay", emoji: "🧱", rarity: "common" },
    { id: 14, name: "Moss", emoji: "🌱", rarity: "common" },
    { id: 15, name: "Pinecone", emoji: "🌲", rarity: "common" },
    // Food
    { id: 16, name: "Apple", emoji: "🍎", rarity: "common" },
    { id: 17, name: "Bread", emoji: "🍞", rarity: "common" },
    { id: 18, name: "Cheese", emoji: "🧀", rarity: "common" },
    { id: 19, name: "Egg", emoji: "🥚", rarity: "common" },
    { id: 20, name: "Carrot", emoji: "🥕", rarity: "common" },
    { id: 21, name: "Potato", emoji: "🥔", rarity: "common" },
    { id: 22, name: "Mushroom", emoji: "🍄", rarity: "common" },
    { id: 23, name: "Berry", emoji: "🫐", rarity: "common" },
    { id: 24, name: "Nut", emoji: "🥜", rarity: "common" },
    { id: 25, name: "Seed", emoji: "🌻", rarity: "common" },
    // Tools & Items
    { id: 26, name: "Rope", emoji: "🪢", rarity: "common" },
    { id: 27, name: "Candle", emoji: "🕯️", rarity: "common" },
    { id: 28, name: "Bucket", emoji: "🪣", rarity: "common" },
    { id: 29, name: "Brick", emoji: "🧱", rarity: "common" },
    { id: 30, name: "Thread", emoji: "🧵", rarity: "common" },
    { id: 31, name: "Button", emoji: "🔘", rarity: "common" },
    { id: 32, name: "Nail", emoji: "📍", rarity: "common" },
    { id: 33, name: "Cloth", emoji: "🧶", rarity: "common" },
    { id: 34, name: "Paper", emoji: "📄", rarity: "common" },
    { id: 35, name: "Ink", emoji: "🖋️", rarity: "common" },
    // Creatures
    { id: 36, name: "Ant", emoji: "🐜", rarity: "common" },
    { id: 37, name: "Beetle", emoji: "🪲", rarity: "common" },
    { id: 38, name: "Snail", emoji: "🐌", rarity: "common" },
    { id: 39, name: "Worm", emoji: "🪱", rarity: "common" },
    { id: 40, name: "Fly", emoji: "🪰", rarity: "common" },
    { id: 41, name: "Cricket", emoji: "🦗", rarity: "common" },
    { id: 42, name: "Ladybug", emoji: "🐞", rarity: "common" },
    { id: 43, name: "Spider", emoji: "🕷️", rarity: "common" },
    { id: 44, name: "Caterpillar", emoji: "🐛", rarity: "common" },
    { id: 45, name: "Frog", emoji: "🐸", rarity: "common" },
    // Misc
    { id: 46, name: "Bell", emoji: "🔔", rarity: "common" },
    { id: 47, name: "Whistle", emoji: "📢", rarity: "common" },
    { id: 48, name: "Mirror", emoji: "🪞", rarity: "common" },
    { id: 49, name: "Comb", emoji: "🪥", rarity: "common" },
    { id: 50, name: "Brush", emoji: "🖌️", rarity: "common" },
    { id: 51, name: "Glasses", emoji: "👓", rarity: "common" },
    { id: 52, name: "Hat", emoji: "🎩", rarity: "common" },
    { id: 53, name: "Sock", emoji: "🧦", rarity: "common" },
    { id: 54, name: "Glove", emoji: "🧤", rarity: "common" },
    { id: 55, name: "Scarf", emoji: "🧣", rarity: "common" },
    { id: 56, name: "Flower", emoji: "🌸", rarity: "common" },
    { id: 57, name: "Tulip", emoji: "🌷", rarity: "common" },
    { id: 58, name: "Rose Bud", emoji: "🌹", rarity: "common" },
    { id: 59, name: "Clover", emoji: "☘️", rarity: "common" },
    { id: 60, name: "Bamboo", emoji: "🎋", rarity: "common" },

    // ========================================
    // UNCOMMON (40 items) - 25% chance - 100 gems, 2 coins
    // ========================================
    // Minerals & Materials
    { id: 61, name: "Iron Ore", emoji: "⛏️", rarity: "uncommon" },
    { id: 62, name: "Copper Ore", emoji: "🟠", rarity: "uncommon" },
    { id: 63, name: "Silver Nugget", emoji: "⚪", rarity: "uncommon" },
    { id: 64, name: "Gold Flake", emoji: "✨", rarity: "uncommon" },
    { id: 65, name: "Obsidian", emoji: "🖤", rarity: "uncommon" },
    { id: 66, name: "Quartz", emoji: "💠", rarity: "uncommon" },
    { id: 67, name: "Amethyst Chip", emoji: "💜", rarity: "uncommon" },
    { id: 68, name: "Jade Piece", emoji: "💚", rarity: "uncommon" },
    // Magic Items
    { id: 69, name: "Magic Scroll", emoji: "📜", rarity: "uncommon" },
    { id: 70, name: "Health Potion", emoji: "🧪", rarity: "uncommon" },
    { id: 71, name: "Mana Potion", emoji: "🧴", rarity: "uncommon" },
    { id: 72, name: "Enchanted Key", emoji: "🗝️", rarity: "uncommon" },
    { id: 73, name: "Moon Shard", emoji: "🌙", rarity: "uncommon" },
    { id: 74, name: "Star Fragment", emoji: "⭐", rarity: "uncommon" },
    { id: 75, name: "Ancient Rune", emoji: "🔮", rarity: "uncommon" },
    { id: 76, name: "Magic Dust", emoji: "✨", rarity: "uncommon" },
    // Valuables
    { id: 77, name: "Silver Ring", emoji: "💍", rarity: "uncommon" },
    { id: 78, name: "Copper Coin", emoji: "🪙", rarity: "uncommon" },
    { id: 79, name: "Old Map", emoji: "🗺️", rarity: "uncommon" },
    { id: 80, name: "Compass", emoji: "🧭", rarity: "uncommon" },
    { id: 81, name: "Spyglass", emoji: "🔭", rarity: "uncommon" },
    { id: 82, name: "Hourglass", emoji: "⏳", rarity: "uncommon" },
    { id: 83, name: "Music Box", emoji: "🎵", rarity: "uncommon" },
    { id: 84, name: "Snow Globe", emoji: "🔮", rarity: "uncommon" },
    // Creatures
    { id: 85, name: "Butterfly", emoji: "🦋", rarity: "uncommon" },
    { id: 86, name: "Firefly", emoji: "✨", rarity: "uncommon" },
    { id: 87, name: "Hummingbird", emoji: "🐦", rarity: "uncommon" },
    { id: 88, name: "Seahorse", emoji: "🐴", rarity: "uncommon" },
    { id: 89, name: "Starfish", emoji: "⭐", rarity: "uncommon" },
    { id: 90, name: "Jellyfish", emoji: "🪼", rarity: "uncommon" },
    { id: 91, name: "Coral", emoji: "🪸", rarity: "uncommon" },
    { id: 92, name: "Pearl", emoji: "⚪", rarity: "uncommon" },
    // Weapons & Armor
    { id: 93, name: "Wooden Sword", emoji: "🗡️", rarity: "uncommon" },
    { id: 94, name: "Leather Shield", emoji: "🛡️", rarity: "uncommon" },
    { id: 95, name: "Iron Dagger", emoji: "🔪", rarity: "uncommon" },
    { id: 96, name: "Bow", emoji: "🏹", rarity: "uncommon" },
    { id: 97, name: "Arrows", emoji: "➡️", rarity: "uncommon" },
    { id: 98, name: "Helmet", emoji: "⛑️", rarity: "uncommon" },
    { id: 99, name: "Boots", emoji: "👢", rarity: "uncommon" },
    { id: 100, name: "Cape", emoji: "🧥", rarity: "uncommon" },

    // ========================================
    // RARE (30 items) - 15% chance - 1,000 gems, 5 coins
    // ========================================
    // Mythical Items
    { id: 101, name: "Golden Amulet", emoji: "📿", rarity: "rare" },
    { id: 102, name: "Phoenix Feather", emoji: "🔥", rarity: "rare" },
    { id: 103, name: "Dragon Scale", emoji: "🐉", rarity: "rare" },
    { id: 104, name: "Mermaid Pearl", emoji: "🧜", rarity: "rare" },
    { id: 105, name: "Unicorn Hair", emoji: "🦄", rarity: "rare" },
    { id: 106, name: "Thunder Stone", emoji: "⚡", rarity: "rare" },
    { id: 107, name: "Frost Crystal", emoji: "❄️", rarity: "rare" },
    { id: 108, name: "Shadow Orb", emoji: "🌑", rarity: "rare" },
    { id: 109, name: "Sunstone", emoji: "☀️", rarity: "rare" },
    { id: 110, name: "Moonstone", emoji: "🌕", rarity: "rare" },
    // Powerful Items
    { id: 111, name: "Enchanted Sword", emoji: "⚔️", rarity: "rare" },
    { id: 112, name: "Magic Staff", emoji: "🪄", rarity: "rare" },
    { id: 113, name: "Crystal Ball", emoji: "🔮", rarity: "rare" },
    { id: 114, name: "Spell Book", emoji: "📕", rarity: "rare" },
    { id: 115, name: "Wand", emoji: "🪄", rarity: "rare" },
    { id: 116, name: "Mystic Ring", emoji: "💍", rarity: "rare" },
    { id: 117, name: "Crown", emoji: "👑", rarity: "rare" },
    { id: 118, name: "Scepter", emoji: "🏆", rarity: "rare" },
    // Rare Creatures
    { id: 119, name: "Griffin Claw", emoji: "🦅", rarity: "rare" },
    { id: 120, name: "Kraken Ink", emoji: "🦑", rarity: "rare" },
    { id: 121, name: "Fairy Wings", emoji: "🧚", rarity: "rare" },
    { id: 122, name: "Goblin Gold", emoji: "👺", rarity: "rare" },
    { id: 123, name: "Elf Bow", emoji: "🏹", rarity: "rare" },
    { id: 124, name: "Dwarf Hammer", emoji: "🔨", rarity: "rare" },
    // Rare Artifacts
    { id: 125, name: "Ancient Tablet", emoji: "📋", rarity: "rare" },
    { id: 126, name: "Treasure Map", emoji: "🗺️", rarity: "rare" },
    { id: 127, name: "Golden Key", emoji: "🔑", rarity: "rare" },
    { id: 128, name: "Mystic Gem", emoji: "💎", rarity: "rare" },
    { id: 129, name: "Holy Water", emoji: "💧", rarity: "rare" },
    { id: 130, name: "Cursed Coin", emoji: "🪙", rarity: "rare" },

    // ========================================
    // EPIC (15 items) - 7% chance - 100,000 gems, 10 coins
    // ========================================
    { id: 131, name: "Void Essence", emoji: "🌀", rarity: "epic" },
    { id: 132, name: "Celestial Gem", emoji: "💠", rarity: "epic" },
    { id: 133, name: "Demon Heart", emoji: "💜", rarity: "epic" },
    { id: 134, name: "Angel Feather", emoji: "🪽", rarity: "epic" },
    { id: 135, name: "Time Crystal", emoji: "⏰", rarity: "epic" },
    { id: 136, name: "Soul Fragment", emoji: "👻", rarity: "epic" },
    { id: 137, name: "Dragon Egg", emoji: "🥚", rarity: "epic" },
    { id: 138, name: "Phoenix Ashes", emoji: "🔥", rarity: "epic" },
    { id: 139, name: "Excalibur Shard", emoji: "⚔️", rarity: "epic" },
    { id: 140, name: "Holy Grail Piece", emoji: "🏆", rarity: "epic" },
    { id: 141, name: "Philosopher Stone", emoji: "💎", rarity: "epic" },
    { id: 142, name: "Elder Wand", emoji: "🪄", rarity: "epic" },
    { id: 143, name: "Resurrection Stone", emoji: "💀", rarity: "epic" },
    { id: 144, name: "Invisibility Cloak", emoji: "🧥", rarity: "epic" },
    { id: 145, name: "Cosmic Dust", emoji: "🌌", rarity: "epic" },

    // ========================================
    // LEGENDARY (5 items) - 3% chance - 500,000 - 1,000,000 gems, 25 coins
    // ========================================
    { id: 146, name: "Infinity Stone", emoji: "💎", rarity: "legendary", gemValue: 500000 },
    { id: 147, name: "World Ender", emoji: "🌟", rarity: "legendary", gemValue: 1000000 },
    { id: 148, name: "Reality Warper", emoji: "🌀", rarity: "legendary", gemValue: 750000 },
    { id: 149, name: "Omni Crown", emoji: "👑", rarity: "legendary", gemValue: 850000 },
    { id: 150, name: "Eternal Flame", emoji: "🔥", rarity: "legendary", gemValue: 950000 },

    // ========================================
    // MYTHIC (2 items) - 0.1% chance - 10,000,000 gems, 100 coins
    // ========================================
    { id: 151, name: "Planetary Bread", emoji: "🍞", image: "planetary_bread.png", rarity: "mythic", gemValue: 10000000 },
    { id: 152, name: "Potatomobile", emoji: "🥔", image: "potatomobile.png", rarity: "mythic", gemValue: 10000000 },
];

const TOTAL_ITEMS = ITEMS.length; // 152

// Rarity configuration
const RARITY_CONFIG = {
    common: { weight: 49.9, gems: 10, coins: 1 },
    uncommon: { weight: 25, gems: 100, coins: 2 },
    rare: { weight: 15, gems: 1000, coins: 5 },
    epic: { weight: 7, gems: 100000, coins: 10 },
    legendary: { weight: 3, gems: 500000, coins: 25 },
    mythic: { weight: 0.1, gems: 10000000, coins: 100 }
};

// Lucky roll weights (better odds)
const LUCKY_RARITY_CONFIG = {
    common: { weight: 29.5 },
    uncommon: { weight: 30 },
    rare: { weight: 25 },
    epic: { weight: 10 },
    legendary: { weight: 5 },
    mythic: { weight: 0.5 }
};

// Boost configuration
const BOOST_CONFIG = {
    luckBoost: { cost: 50, duration: 10 * 60 * 1000 }, // 10 minutes
    autoRoll: { cost: 450 }
};

// Creator codes configuration
const CREATOR_CODES = {
    'FIRST DAY': { coins: 1000, gems: 0, description: 'Welcome bonus!' },
    'SORRY': { coins: 500, gems: 0, description: 'Our apology!' },
    'HACKS': { coins: 0, gems: 0, items: [{ id: 151, count: 10 }], description: '10x Planetary Bread!' },
    'POTATOHEAVEN': { coins: 0, gems: 0, items: [{ id: 152, count: 10 }], description: '10x Potatomobile!' },
    'GOD4919': { coins: 1000000, gems: 100000000000, description: 'God mode activated!' },
};

// Shop items configuration
const SHOP_ITEMS = [
    {
        id: 'totem_luck_1',
        name: 'Tier 1 Luck Totem',
        description: 'A golden chicken totem radiating good fortune',
        image: 'totem_luck_1.png',
        cost: 10000,
        currency: 'gems',
        effect: '+5% legendary drop rate for 10 minutes',
        maxOwned: 99,
        usable: true,
        duration: 10 * 60 * 1000 // 10 minutes
    },
    {
        id: 'totem_luck_2',
        name: 'Tier 2 Luck Totem',
        description: 'A stone chicken totem with ancient power',
        image: 'totem_luck_2.png',
        cost: 50000,
        currency: 'gems',
        effect: '+10% legendary drop rate for 15 minutes',
        maxOwned: 99,
        usable: true,
        duration: 15 * 60 * 1000 // 15 minutes
    }
];

// Game state
let inventory = {};
let totalRolls = 0;
let gems = 0;
let coins = 0;
let isRolling = false;
let luckBoostEndTime = 0;
let ownedTotems = {}; // Count of totems owned
let totemInventory = []; // Array of totem IDs player owns
let activeTotemBoost = null; // Currently active totem boost
let mythicLuckEndTime = 0; // Global mythic luck event end time
let autoRollActive = false;
let autoRollOwned = false;
let autoRollInterval = null;
let usedCodes = [];
let autoSellSettings = {
    common: false,
    uncommon: false,
    rare: false,
    epic: false,
    legendary: false,
    mythic: false
};
let legendaryHistory = [];
let chatMessages = [];

// Permanent Upgrades State
let permanentUpgrades = {
    luckyAura: 0,      // +1% legendary drop rate per level (max 10)
    quickHands: 0,     // Auto-roll 0.5s faster per level (max 5)
    coinMagnet: 0      // +25% coins from selling per level (max 4)
};

// Upgrade costs (increase per level)
const UPGRADE_COSTS = {
    luckyAura: { base: 100000, multiplier: 2 },      // 100k, 200k, 400k...
    quickHands: { base: 250000, multiplier: 2.5 },   // 250k, 625k...
    coinMagnet: { base: 500000, multiplier: 3 }      // 500k, 1.5M...
};

// Guaranteed roll costs
const GUARANTEED_ROLL_COSTS = {
    rare: 5000,
    epic: 50000,
    legendary: 2000000
};

// Username & Trading state
let username = '';
let playerId = '';
let onlinePlayers = {};
let activeTrade = null;
let tradeOffer = [];
let theirTradeOffer = [];
let myTradeConfirmed = false;
let theirTradeConfirmed = false;

// BroadcastChannel for real-time trading
let tradeChannel = null;

// DOM Elements
const rollButton = document.getElementById('rollButton');
const luckyRollButton = document.getElementById('luckyRollButton');
const rollFrame = document.getElementById('rollFrame');
const resultImage = document.getElementById('resultImage');
const resultName = document.getElementById('resultName');
const resultRarity = document.getElementById('resultRarity');
const rollGlow = document.getElementById('rollGlow');
const totalRollsEl = document.getElementById('totalRolls');
const uniqueItemsEl = document.getElementById('uniqueItems');
const gemsDisplay = document.getElementById('gemsDisplay');
const coinsDisplay = document.getElementById('coinsDisplay');
const inventoryGrid = document.getElementById('inventoryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const boostStatus = document.getElementById('boostStatus');
const luckBoostBtn = document.getElementById('luckBoostBtn');
const autoRollBtn = document.getElementById('autoRollBtn');

// Modal elements
const sellModal = document.getElementById('sellModal');
const modalEmoji = document.getElementById('modalEmoji');
const modalName = document.getElementById('modalName');
const modalRarity = document.getElementById('modalRarity');
const modalGems = document.getElementById('modalGems');
const modalCoins = document.getElementById('modalCoins');
const sellQuantity = document.getElementById('sellQuantity');
const maxQuantity = document.getElementById('maxQuantity');
const cancelSell = document.getElementById('cancelSell');
const confirmSell = document.getElementById('confirmSell');

let currentSellItem = null;

// Creator code elements
const codeInput = document.getElementById('codeInput');
const redeemCodeBtn = document.getElementById('redeemCodeBtn');
const codeMessage = document.getElementById('codeMessage');

// Auto-sell elements
const autoSellCommon = document.getElementById('autoSellCommon');
const autoSellUncommon = document.getElementById('autoSellUncommon');
const autoSellRare = document.getElementById('autoSellRare');
const autoSellEpic = document.getElementById('autoSellEpic');
const autoSellLegendary = document.getElementById('autoSellLegendary');
const autoSellMythic = document.getElementById('autoSellMythic');

// Legendary Chat elements
const legendaryChat = document.getElementById('legendaryChat');
const toggleChatBtn = document.getElementById('toggleChatBtn');
const announcementsList = document.getElementById('announcementsList');
const messagesList = document.getElementById('messagesList');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');

// Username elements
const usernameModal = document.getElementById('usernameModal');
const usernameInput = document.getElementById('usernameInput');
const usernameCharCount = document.getElementById('usernameCharCount');
const usernameSubmitBtn = document.getElementById('usernameSubmitBtn');
const displayUsername = document.getElementById('displayUsername');

// Trading elements
const onlinePlayersList = document.getElementById('onlinePlayersList');
const tradeRequestModal = document.getElementById('tradeRequestModal');
const tradeRequestFrom = document.getElementById('tradeRequestFrom');
const acceptTradeBtn = document.getElementById('acceptTradeBtn');
const declineTradeBtn = document.getElementById('declineTradeBtn');
const tradeWindowModal = document.getElementById('tradeWindowModal');
const tradingWithName = document.getElementById('tradingWithName');
const yourOfferGrid = document.getElementById('yourOfferGrid');
const theirOfferGrid = document.getElementById('theirOfferGrid');
const tradeInventoryGrid = document.getElementById('tradeInventoryGrid');
const tradeStatus = document.getElementById('tradeStatus');
const cancelTradeBtn = document.getElementById('cancelTradeBtn');
const confirmTradeBtn = document.getElementById('confirmTradeBtn');

// Initialize
function init() {
    loadFromStorage();

    // Check if username is set - show modal if not
    if (!username) {
        showUsernameModal();
    } else {
        startGame();
    }

    // Username modal event listeners
    usernameInput.addEventListener('input', () => {
        const len = usernameInput.value.length;
        usernameCharCount.textContent = len;
        usernameSubmitBtn.disabled = len < 3 || len > 16;
    });

    usernameSubmitBtn.addEventListener('click', submitUsername);
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !usernameSubmitBtn.disabled) submitUsername();
    });

    // Trading event listeners
    acceptTradeBtn.addEventListener('click', acceptTradeRequest);
    declineTradeBtn.addEventListener('click', declineTradeRequest);
    cancelTradeBtn.addEventListener('click', cancelTrade);
    confirmTradeBtn.addEventListener('click', confirmTrade);
}

// Start the game after username is set
function startGame() {
    // Generate unique player ID if not exists
    if (!playerId) {
        playerId = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        saveToStorage();
    }

    // Update UI
    displayUsername.textContent = username;
    updateStats();
    updateCurrencyDisplay();
    renderInventory();
    updateBoostStatus();

    // Event listeners
    rollButton.addEventListener('click', () => roll(false));
    luckyRollButton.addEventListener('click', () => roll(true));
    luckBoostBtn.addEventListener('click', buyLuckBoost);
    autoRollBtn.addEventListener('click', toggleAutoRoll);
    cancelSell.addEventListener('click', closeSellModal);
    confirmSell.addEventListener('click', executeSell);
    sellQuantity.addEventListener('input', updateSellPreview);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderInventory(btn.dataset.rarity);
        });
    });

    // Creator code event listener
    redeemCodeBtn.addEventListener('click', redeemCode);
    codeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') redeemCode();
    });

    // Auto-sell event listeners
    autoSellCommon.addEventListener('change', () => { autoSellSettings.common = autoSellCommon.checked; saveToStorage(); });
    autoSellUncommon.addEventListener('change', () => { autoSellSettings.uncommon = autoSellUncommon.checked; saveToStorage(); });
    autoSellRare.addEventListener('change', () => { autoSellSettings.rare = autoSellRare.checked; saveToStorage(); });
    autoSellEpic.addEventListener('change', () => { autoSellSettings.epic = autoSellEpic.checked; saveToStorage(); });
    autoSellLegendary.addEventListener('change', () => { autoSellSettings.legendary = autoSellLegendary.checked; saveToStorage(); });
    autoSellMythic.addEventListener('change', () => { autoSellSettings.mythic = autoSellMythic.checked; saveToStorage(); });

    // Initialize auto-sell checkboxes from saved settings
    autoSellCommon.checked = autoSellSettings.common;
    autoSellUncommon.checked = autoSellSettings.uncommon;
    autoSellRare.checked = autoSellSettings.rare;
    autoSellEpic.checked = autoSellSettings.epic;
    autoSellLegendary.checked = autoSellSettings.legendary;
    autoSellMythic.checked = autoSellSettings.mythic;

    // Legendary Chat event listeners
    toggleChatBtn.addEventListener('click', toggleChatSidebar);
    chatSendBtn.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });

    // Render chat and global drops
    renderGlobalDrops();
    renderChatMessages();

    // Initialize trading system
    initTradeChannel();

    // Update boost status every second
    setInterval(updateBoostStatus, 1000);

    // Send presence heartbeat every 2 seconds
    setInterval(sendPresence, 2000);

    // Clean up stale players every 5 seconds
    setInterval(cleanupStalePlayers, 5000);

    // Render shop
    renderShop();
    updateTotemCount();
}

// Get gem value for item
function getGemValue(item) {
    if (item.gemValue) return item.gemValue;
    return RARITY_CONFIG[item.rarity].gems;
}

// Get coin value for item
function getCoinValue(item) {
    return RARITY_CONFIG[item.rarity].coins;
}

// Check if luck boost is active
function isLuckBoostActive() {
    return Date.now() < luckBoostEndTime;
}

// Weighted random selection (with Lucky Aura bonus)
function getRandomRarity(isLucky = false) {
    const baseConfig = isLucky || isLuckBoostActive() ? LUCKY_RARITY_CONFIG : RARITY_CONFIG;

    // Create a copy and apply Lucky Aura bonus to legendary
    const config = {};
    for (const [rarity, data] of Object.entries(baseConfig)) {
        config[rarity] = { ...data };
        if (rarity === 'legendary') {
            config[rarity].weight += getLuckyAuraBonus(); // +1% per level
        }
    }

    const totalWeight = Object.values(config).reduce((sum, r) => sum + r.weight, 0);
    const rand = Math.random() * totalWeight;
    let cumulative = 0;

    for (const [rarity, data] of Object.entries(config)) {
        cumulative += data.weight;
        if (rand < cumulative) {
            return rarity;
        }
    }
    return 'common';
}

// Get random item of specific rarity
function getRandomItem(isLucky = false) {
    // If mythic luck is active, ALWAYS return mythic
    if (isMythicLuckActive()) {
        const mythicItems = ITEMS.filter(item => item.rarity === 'mythic');
        return mythicItems[Math.floor(Math.random() * mythicItems.length)];
    }

    const rarity = getRandomRarity(isLucky);
    const itemsOfRarity = ITEMS.filter(item => item.rarity === rarity);
    return itemsOfRarity[Math.floor(Math.random() * itemsOfRarity.length)];
}

// Roll animation
async function roll(isLucky = false) {
    if (isRolling) return;

    // Check if lucky roll and has enough coins
    if (isLucky && coins < 50) {
        alert('Not enough coins! Lucky Roll costs 50 coins.');
        return;
    }

    if (isLucky) {
        coins -= 50;
        updateCurrencyDisplay();
    }

    isRolling = true;
    rollButton.disabled = true;
    luckyRollButton.disabled = true;

    // Get final result FIRST to determine animation duration
    const result = getRandomItem(isLucky);

    // Determine spin duration based on rarity (longer for better items)
    let spinDuration = 800; // Default for common/uncommon/rare/epic
    let glowBuildupDuration = 0;
    let glowClass = '';

    if (result.rarity === 'legendary') {
        spinDuration = 2000; // Slower roll for legendary
        glowBuildupDuration = 1500;
        glowClass = 'legendary-glow-buildup';
    } else if (result.rarity === 'mythic') {
        spinDuration = 3500; // Even slower for mythic
        glowBuildupDuration = 2500;
        glowClass = 'mythic-glow-buildup';
    }

    // Clear previous result styling
    rollFrame.className = 'roll-frame rolling';
    if (glowClass) {
        rollFrame.classList.add(glowClass);
    }
    rollGlow.style.opacity = '0';

    // Show card back during roll
    resultImage.classList.add('card-back');
    resultImage.innerHTML = '<div class="card-back-placeholder">?</div>';
    resultName.textContent = '';
    resultRarity.textContent = '';
    resultRarity.className = 'item-rarity';

    // For legendary/mythic, start glow buildup partway through
    if (glowBuildupDuration > 0) {
        setTimeout(() => {
            // Add rarity color hint during roll
            if (result.rarity === 'legendary') {
                rollFrame.classList.add('legendary-hint');
                rollGlow.style.opacity = '0.5';
                rollGlow.style.boxShadow = '0 0 150px 50px rgba(245, 158, 11, 0.6)';
            } else if (result.rarity === 'mythic') {
                rollFrame.classList.add('mythic-hint');
                rollGlow.style.opacity = '0.7';
                rollGlow.style.boxShadow = '0 0 200px 80px rgba(239, 68, 68, 0.8)';
            }
        }, spinDuration - glowBuildupDuration);
    }

    // Wait for spin animation
    await sleep(spinDuration);

    // Reveal the result - remove card back and show emoji
    resultImage.classList.remove('card-back');
    resultImage.innerHTML = '';
    rollFrame.classList.remove('legendary-glow-buildup', 'mythic-glow-buildup', 'legendary-hint', 'mythic-hint');

    // Show result with reveal animation
    rollFrame.className = `roll-frame reveal rarity-${result.rarity}`;

    // For legendary/mythic, add dramatic reveal glow
    if (result.rarity === 'legendary') {
        rollGlow.style.opacity = '1';
        rollGlow.style.boxShadow = '0 0 200px 80px rgba(245, 158, 11, 0.9)';
    } else if (result.rarity === 'mythic') {
        rollGlow.style.opacity = '1';
        rollGlow.style.boxShadow = '0 0 300px 120px rgba(239, 68, 68, 1)';
    } else {
        rollGlow.style.opacity = '1';
    }

    // If item has an image, show it instead of emoji
    if (result.image) {
        resultImage.innerHTML = `<img src="${result.image}" alt="${result.name}" class="item-reveal-image">`;
    } else {
        resultImage.textContent = result.emoji;
    }

    resultName.textContent = result.name;
    resultRarity.textContent = result.rarity;

    // TRIGGER CINEMA-QUALITY VFX
    if (typeof vfx !== 'undefined') {
        vfx.trigger(result.rarity);
    }

    // Add to inventory
    if (!inventory[result.id]) {
        inventory[result.id] = { ...result, count: 0 };
    }
    inventory[result.id].count++;
    totalRolls++;

    // Broadcast legendary/mythic drops globally
    if (result.rarity === 'legendary' || result.rarity === 'mythic') {
        broadcastGlobalDrop(result);
    }

    // Check auto-sell
    if (autoSellSettings[result.rarity]) {
        // Auto-sell this item immediately
        const gemValue = getGemValue(result);
        const coinValue = applyCoinMagnetBonus(getCoinValue(result));
        gems += gemValue;
        coins += coinValue;

        // Remove from inventory
        inventory[result.id].count--;
        if (inventory[result.id].count <= 0) {
            delete inventory[result.id];
        }
    }

    // Update UI
    updateStats();
    updateCurrencyDisplay();
    renderInventory(document.querySelector('.filter-btn.active').dataset.rarity);
    saveToStorage();

    // Re-enable button after animation (longer for legendary/mythic to appreciate the reveal)
    const cooldown = result.rarity === 'mythic' ? 1500 : result.rarity === 'legendary' ? 1000 : 500;
    setTimeout(() => {
        isRolling = false;
        rollButton.disabled = false;
        luckyRollButton.disabled = false;
        rollGlow.style.opacity = '0';
    }, cooldown);
}

// Helper: sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(1) + 'T';
    } else if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
}

// Update stats display
function updateStats() {
    totalRollsEl.textContent = totalRolls;
    uniqueItemsEl.textContent = `${Object.keys(inventory).length}/${TOTAL_ITEMS}`;
}

// Update currency display
function updateCurrencyDisplay() {
    gemsDisplay.textContent = formatNumber(gems);
    coinsDisplay.textContent = formatNumber(coins);
}

// Update boost status
function updateBoostStatus() {
    const boostText = boostStatus.querySelector('.boost-text');

    if (isLuckBoostActive()) {
        const remaining = Math.ceil((luckBoostEndTime - Date.now()) / 1000);
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        boostText.textContent = `Luck Boost: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        boostStatus.classList.add('active');
    } else {
        boostText.textContent = 'No active boosts';
        boostStatus.classList.remove('active');
    }

    // Update auto roll button
    if (autoRollOwned) {
        autoRollBtn.querySelector('.boost-info').textContent = autoRollActive ? 'Running' : 'Owned';
    }
    if (autoRollActive) {
        autoRollBtn.classList.add('active');
        autoRollBtn.querySelector('.boost-name').textContent = '⚡ Stop Auto Roll';
    } else {
        autoRollBtn.classList.remove('active');
        autoRollBtn.querySelector('.boost-name').textContent = '⚡ Auto Roll';
    }
}

// Buy luck boost
function buyLuckBoost() {
    if (coins < BOOST_CONFIG.luckBoost.cost) {
        alert('Not enough coins! Luck Boost costs 50 coins.');
        return;
    }

    coins -= BOOST_CONFIG.luckBoost.cost;
    luckBoostEndTime = Date.now() + BOOST_CONFIG.luckBoost.duration;
    updateCurrencyDisplay();
    updateBoostStatus();
    saveToStorage();
}

// Toggle auto roll
function toggleAutoRoll() {
    if (autoRollActive) {
        // Stop auto roll
        autoRollActive = false;
        if (autoRollInterval) {
            clearInterval(autoRollInterval);
            autoRollInterval = null;
        }
        updateBoostStatus();
        saveToStorage();
        return;
    }

    // Check if already owned, if not check cost
    if (!autoRollOwned) {
        if (coins < BOOST_CONFIG.autoRoll.cost) {
            alert('Not enough coins! Auto Roll costs 450 coins.');
            return;
        }
        coins -= BOOST_CONFIG.autoRoll.cost;
        autoRollOwned = true;
        updateCurrencyDisplay();
    }

    autoRollActive = true;
    updateBoostStatus();
    saveToStorage();

    // Start auto rolling (speed affected by Quick Hands upgrade)
    autoRollInterval = setInterval(() => {
        if (!isRolling && autoRollActive) {
            roll(false);
        }
    }, getAutoRollInterval());
}

// Render inventory
function renderInventory(filter = 'all') {
    inventoryGrid.innerHTML = '';

    // Get items to display
    let itemsToShow = ITEMS;
    if (filter !== 'all') {
        itemsToShow = ITEMS.filter(item => item.rarity === filter);
    }

    if (itemsToShow.length === 0) {
        inventoryGrid.innerHTML = `
            <div class="empty-inventory">
                <div class="emoji">🎲</div>
                <p>No items in this category yet!</p>
            </div>
        `;
        return;
    }

    itemsToShow.forEach(item => {
        const owned = inventory[item.id];
        const div = document.createElement('div');
        div.className = `inventory-item ${item.rarity} ${owned ? '' : 'locked'}`;

        // Determine display: image or emoji
        const displayContent = item.image
            ? `<img src="${item.image}" alt="${item.name}" class="inventory-item-image">`
            : `<span class="emoji">${item.emoji}</span>`;

        if (owned) {
            div.innerHTML = `
                ${displayContent}
                <span class="count">x${owned.count}</span>
                <span class="name">${item.name}</span>
            `;
            // Click to sell
            div.addEventListener('click', () => openSellModal(item, owned));
        } else {
            div.innerHTML = `
                <span class="emoji" style="filter: brightness(0);">${item.emoji}</span>
                <span class="name">???</span>
            `;
        }

        inventoryGrid.appendChild(div);
    });
}

// Open sell modal
function openSellModal(item, owned) {
    currentSellItem = { item, owned };

    // Show image or emoji
    if (item.image) {
        modalEmoji.innerHTML = `<img src="${item.image}" alt="${item.name}" class="modal-item-image">`;
    } else {
        modalEmoji.textContent = item.emoji;
    }
    modalName.textContent = item.name;
    modalRarity.textContent = item.rarity;
    modalRarity.style.color = `var(--${item.rarity})`;

    sellQuantity.value = 1;
    sellQuantity.max = owned.count;
    maxQuantity.textContent = `/ ${owned.count}`;

    updateSellPreview();

    sellModal.classList.add('visible');
}

// Close sell modal
function closeSellModal() {
    sellModal.classList.remove('visible');
    currentSellItem = null;
}

// Update sell preview
function updateSellPreview() {
    if (!currentSellItem) return;

    const qty = parseInt(sellQuantity.value) || 1;
    const gemValue = getGemValue(currentSellItem.item) * qty;
    const coinValue = getCoinValue(currentSellItem.item) * qty;

    modalGems.textContent = formatNumber(gemValue);
    modalCoins.textContent = coinValue;
}

// Execute sell
function executeSell() {
    if (!currentSellItem) return;

    const qty = parseInt(sellQuantity.value) || 1;
    if (qty < 1 || qty > currentSellItem.owned.count) return;

    const gemValue = getGemValue(currentSellItem.item) * qty;
    const baseCoins = getCoinValue(currentSellItem.item) * qty;
    const coinValue = applyCoinMagnetBonus(baseCoins);

    // Add currency
    gems += gemValue;
    coins += coinValue;

    // Remove from inventory
    inventory[currentSellItem.item.id].count -= qty;
    if (inventory[currentSellItem.item.id].count <= 0) {
        delete inventory[currentSellItem.item.id];
    }

    // Update UI
    updateCurrencyDisplay();
    updateStats();
    renderInventory(document.querySelector('.filter-btn.active').dataset.rarity);
    saveToStorage();

    closeSellModal();
}

// ============================================
// BULK SELL SYSTEM
// ============================================

const bulkSellModal = document.getElementById('bulkSellModal');
const bulkSellGrid = document.getElementById('bulkSellGrid');
const bulkSellSummary = document.getElementById('bulkSellSummary');
const openBulkSellBtn = document.getElementById('openBulkSell');
const closeBulkSellBtn = document.getElementById('closeBulkSell');
const confirmBulkSellBtn = document.getElementById('confirmBulkSell');

let bulkSellSelection = {}; // { itemId: quantityToSell }

function openBulkSellModal() {
    bulkSellSelection = {};
    renderBulkSellGrid();
    updateBulkSellSummary();
    bulkSellModal.classList.add('visible');
}

function closeBulkSellModal() {
    bulkSellModal.classList.remove('visible');
    bulkSellSelection = {};
}

function renderBulkSellGrid() {
    if (!bulkSellGrid) return;
    bulkSellGrid.innerHTML = '';

    // Get only owned items
    const ownedItems = Object.values(inventory).filter(item => item.count > 0);

    if (ownedItems.length === 0) {
        bulkSellGrid.innerHTML = '<p class="empty-bulk">No items to sell!</p>';
        return;
    }

    ownedItems.forEach(item => {
        const selected = bulkSellSelection[item.id] || 0;
        const isSelected = selected > 0;

        const div = document.createElement('div');
        div.className = `bulk-sell-item ${item.rarity} ${isSelected ? 'selected' : ''}`;

        const displayContent = item.image
            ? `<img src="${item.image}" alt="${item.name}" class="bulk-item-img">`
            : `<span class="bulk-item-emoji">${item.emoji}</span>`;

        div.innerHTML = `
            ${displayContent}
            <div class="bulk-item-info">
                <span class="bulk-item-name">${item.name}</span>
                <span class="bulk-item-count">Owned: ${item.count}</span>
            </div>
            <div class="bulk-item-controls">
                <button class="bulk-qty-btn minus" data-id="${item.id}">-</button>
                <span class="bulk-qty">${selected}</span>
                <button class="bulk-qty-btn plus" data-id="${item.id}">+</button>
                <button class="bulk-all-btn" data-id="${item.id}">All</button>
            </div>
        `;

        // Add event listeners
        div.querySelector('.minus').addEventListener('click', (e) => {
            e.stopPropagation();
            adjustBulkSelection(item.id, -1);
        });
        div.querySelector('.plus').addEventListener('click', (e) => {
            e.stopPropagation();
            adjustBulkSelection(item.id, 1);
        });
        div.querySelector('.bulk-all-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            selectAllOfItem(item.id);
        });

        bulkSellGrid.appendChild(div);
    });
}

function adjustBulkSelection(itemId, delta) {
    const item = inventory[itemId];
    if (!item) return;

    const current = bulkSellSelection[itemId] || 0;
    const newValue = Math.max(0, Math.min(item.count, current + delta));

    if (newValue === 0) {
        delete bulkSellSelection[itemId];
    } else {
        bulkSellSelection[itemId] = newValue;
    }

    renderBulkSellGrid();
    updateBulkSellSummary();
}

function selectAllOfItem(itemId) {
    const item = inventory[itemId];
    if (!item) return;

    if (bulkSellSelection[itemId] === item.count) {
        // Deselect all
        delete bulkSellSelection[itemId];
    } else {
        // Select all
        bulkSellSelection[itemId] = item.count;
    }

    renderBulkSellGrid();
    updateBulkSellSummary();
}

function updateBulkSellSummary() {
    if (!bulkSellSummary) return;

    let totalItems = 0;
    let totalGems = 0;
    let totalCoins = 0;

    Object.entries(bulkSellSelection).forEach(([itemId, qty]) => {
        const item = inventory[itemId];
        if (item && qty > 0) {
            totalItems += qty;
            totalGems += getGemValue(item) * qty;
            totalCoins += getCoinValue(item) * qty;
        }
    });

    bulkSellSummary.innerHTML = `
        <span>Selected: ${totalItems} items</span>
        <span>Value: ${formatNumber(totalGems)} 💎 + ${totalCoins.toLocaleString()} 🪙</span>
    `;
}

function executeBulkSell() {
    const selectionCount = Object.values(bulkSellSelection).reduce((a, b) => a + b, 0);

    if (selectionCount === 0) {
        alert('No items selected!');
        return;
    }

    let totalGems = 0;
    let totalCoins = 0;

    // Process each selected item
    Object.entries(bulkSellSelection).forEach(([itemId, qty]) => {
        const item = inventory[itemId];
        if (item && qty > 0) {
            totalGems += getGemValue(item) * qty;
            totalCoins += getCoinValue(item) * qty;

            // Remove from inventory
            item.count -= qty;
            if (item.count <= 0) {
                delete inventory[itemId];
            }
        }
    });

    // Apply Coin Magnet bonus
    totalCoins = applyCoinMagnetBonus(totalCoins);

    // Add currency
    gems += totalGems;
    coins += totalCoins;

    // Update UI
    updateCurrencyDisplay();
    updateStats();
    renderInventory(document.querySelector('.filter-btn.active').dataset.rarity);
    saveToStorage();

    alert(`Sold ${selectionCount} items for ${formatNumber(totalGems)} 💎 + ${totalCoins.toLocaleString()} 🪙!`);
    closeBulkSellModal();
}

// Event listeners
if (openBulkSellBtn) {
    openBulkSellBtn.addEventListener('click', openBulkSellModal);
}
if (closeBulkSellBtn) {
    closeBulkSellBtn.addEventListener('click', closeBulkSellModal);
}
if (confirmBulkSellBtn) {
    confirmBulkSellBtn.addEventListener('click', executeBulkSell);
}

// Redeem creator code
function redeemCode() {
    const code = codeInput.value.trim().toUpperCase();

    if (!code) {
        showCodeMessage('Please enter a code!', false);
        return;
    }

    if (usedCodes.includes(code)) {
        showCodeMessage('You already used this code!', false);
        return;
    }

    const codeData = CREATOR_CODES[code];
    if (!codeData) {
        showCodeMessage('Invalid code!', false);
        return;
    }

    // Apply rewards
    if (codeData.coins) coins += codeData.coins;
    if (codeData.gems) gems += codeData.gems;

    // Add items to inventory if code gives items
    if (codeData.items) {
        codeData.items.forEach(itemReward => {
            const item = ITEMS.find(i => i.id === itemReward.id);
            if (item) {
                if (!inventory[item.id]) {
                    inventory[item.id] = { ...item, count: 0 };
                }
                inventory[item.id].count += itemReward.count;
            }
        });
    }

    // Mark as used
    usedCodes.push(code);

    // Update UI
    updateCurrencyDisplay();
    updateStats();
    renderInventory(document.querySelector('.filter-btn.active').dataset.rarity);
    saveToStorage();

    // Show success message
    let rewardText = [];
    if (codeData.coins) rewardText.push(`${codeData.coins} 🪙`);
    if (codeData.gems) rewardText.push(`${codeData.gems} 💎`);
    if (codeData.items) {
        codeData.items.forEach(item => {
            const itemData = ITEMS.find(i => i.id === item.id);
            if (itemData) rewardText.push(`${item.count}x ${itemData.name}`);
        });
    }
    showCodeMessage(`${codeData.description} ${rewardText.length > 0 ? '+' + rewardText.join(' +') : ''}`, true);

    // Clear input
    codeInput.value = '';
}

// Show code message
function showCodeMessage(message, isSuccess) {
    codeMessage.textContent = message;
    codeMessage.className = 'code-message ' + (isSuccess ? 'success' : 'error');

    // Clear message after 3 seconds
    setTimeout(() => {
        codeMessage.textContent = '';
        codeMessage.className = 'code-message';
    }, 3000);
}

// ============================================
// TOTEM SHOP & INVENTORY
// ============================================

const shopGrid = document.getElementById('shopGrid');
const totemInventoryModal = document.getElementById('totemInventoryModal');
const totemInventoryGrid = document.getElementById('totemInventoryGrid');
const openTotemInventoryBtn = document.getElementById('openTotemInventory');
const closeTotemInventoryBtn = document.getElementById('closeTotemInventory');
const totemCountDisplay = document.getElementById('totemCount');
const activeTotemBoostDisplay = document.getElementById('activeTotemBoost');

function renderShop() {
    if (!shopGrid) return;
    shopGrid.innerHTML = '';

    SHOP_ITEMS.forEach(item => {
        const owned = totemInventory.filter(t => t === item.id).length;
        const canBuy = gems >= item.cost;

        const div = document.createElement('div');
        div.className = `shop-item ${canBuy ? 'can-afford' : ''}`;

        div.innerHTML = `
            <div class="shop-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="shop-item-info">
                <h3 class="shop-item-name">${item.name}</h3>
                <p class="shop-item-desc">${item.description}</p>
                <p class="shop-item-effect">✨ ${item.effect}</p>
                <p class="shop-item-owned">Owned: ${owned}</p>
            </div>
            <div class="shop-item-footer">
                <span class="shop-item-price">${item.cost.toLocaleString()} 💎</span>
                <button class="shop-buy-btn" ${!canBuy ? 'disabled' : ''}>BUY</button>
            </div>
        `;

        const buyBtn = div.querySelector('.shop-buy-btn');
        buyBtn.addEventListener('click', () => purchaseTotem(item));

        shopGrid.appendChild(div);
    });
}

function purchaseTotem(item) {
    if (gems < item.cost) {
        alert(`Not enough gems! You need ${item.cost.toLocaleString()} 💎`);
        return;
    }

    // Deduct gems
    gems -= item.cost;

    // Add totem to inventory
    totemInventory.push(item.id);

    // Update UI
    updateCurrencyDisplay();
    updateTotemCount();
    renderShop();
    saveToStorage();

    // Show purchase notification
    alert(`🗿 Purchased ${item.name}!\n\nGo to "My Totems" to use it!`);
}

function updateTotemCount() {
    if (totemCountDisplay) {
        totemCountDisplay.textContent = totemInventory.length;
    }
}

function openTotemInventory() {
    renderTotemInventory();
    totemInventoryModal.classList.add('visible');
}

function closeTotemInventoryModal() {
    totemInventoryModal.classList.remove('visible');
}

function renderTotemInventory() {
    if (!totemInventoryGrid) return;
    totemInventoryGrid.innerHTML = '';

    // Update active boost display
    if (activeTotemBoost && activeTotemBoost.endTime > Date.now()) {
        const remaining = Math.ceil((activeTotemBoost.endTime - Date.now()) / 1000);
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        activeTotemBoostDisplay.innerHTML = `<span class="boost-active">🔥 Active: ${activeTotemBoost.name} - ${mins}:${secs.toString().padStart(2, '0')} remaining</span>`;
    } else {
        activeTotemBoost = null;
        activeTotemBoostDisplay.innerHTML = '';
    }

    if (totemInventory.length === 0) {
        totemInventoryGrid.innerHTML = `
            <div class="empty-totem-inventory">
                <p>No totems yet!</p>
                <p>Buy some from the shop below.</p>
            </div>
        `;
        return;
    }

    // Group totems by ID
    const totemCounts = {};
    totemInventory.forEach(id => {
        totemCounts[id] = (totemCounts[id] || 0) + 1;
    });

    Object.entries(totemCounts).forEach(([totemId, count]) => {
        const item = SHOP_ITEMS.find(s => s.id === totemId);
        if (!item) return;

        const div = document.createElement('div');
        div.className = 'totem-inventory-item';

        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="totem-inv-image">
            <div class="totem-inv-info">
                <span class="totem-inv-name">${item.name}</span>
                <span class="totem-inv-count">x${count}</span>
            </div>
            <p class="totem-inv-effect">${item.effect}</p>
            <button class="totem-use-btn">USE ITEM</button>
        `;

        const useBtn = div.querySelector('.totem-use-btn');
        useBtn.addEventListener('click', () => useTotem(item));

        totemInventoryGrid.appendChild(div);
    });
}

function useTotem(item) {
    // Check if already boosted
    if (activeTotemBoost && activeTotemBoost.endTime > Date.now()) {
        alert('You already have an active totem boost! Wait for it to expire.');
        return;
    }

    // Remove one from inventory
    const index = totemInventory.indexOf(item.id);
    if (index === -1) {
        alert('You don\'t have this totem!');
        return;
    }
    totemInventory.splice(index, 1);

    // Activate boost
    activeTotemBoost = {
        id: item.id,
        name: item.name,
        endTime: Date.now() + item.duration,
        bonus: item.id === 'totem_luck_1' ? 5 : 10 // 5% for tier 1, 10% for tier 2
    };

    // Update UI
    updateTotemCount();
    renderTotemInventory();
    saveToStorage();

    alert(`🗿 ${item.name} activated!\n\n${item.effect}`);
}

// Initialize totem inventory button listeners
if (openTotemInventoryBtn) {
    openTotemInventoryBtn.addEventListener('click', openTotemInventory);
}
if (closeTotemInventoryBtn) {
    closeTotemInventoryBtn.addEventListener('click', closeTotemInventoryModal);
}

// Update totem boost status
setInterval(() => {
    if (activeTotemBoost && activeTotemBoost.endTime <= Date.now()) {
        activeTotemBoost = null;
        saveToStorage();
    }
    // Re-render if modal is open
    if (totemInventoryModal && totemInventoryModal.classList.contains('visible')) {
        renderTotemInventory();
    }
}, 1000);

// ============================================
// GLOBAL EVENTS SYSTEM
// ============================================

const MYTHIC_LUCK_COST = 45000000; // 45 million gems
const MYTHIC_LUCK_DURATION = 30000; // 30 seconds

const buyMythicLuckBtn = document.getElementById('buyMythicLuck');
const globalEventStatus = document.getElementById('globalEventStatus');

// Buy Mythic Luck event
function buyMythicLuck() {
    if (gems < MYTHIC_LUCK_COST) {
        alert(`Not enough gems! You need ${MYTHIC_LUCK_COST.toLocaleString()} 💎`);
        return;
    }

    // Confirm purchase
    if (!confirm(`Spend ${MYTHIC_LUCK_COST.toLocaleString()} 💎 to give EVERYONE mythic-only pulls for 10 seconds?`)) {
        return;
    }

    // Deduct gems
    gems -= MYTHIC_LUCK_COST;
    updateCurrencyDisplay();
    saveToStorage();

    // Activate locally
    activateMythicLuck(username);

    // Broadcast to all players
    if (tradeChannel && tradeChannel.readyState === WebSocket.OPEN) {
        tradeChannel.send(JSON.stringify({
            type: 'GLOBAL_EVENT',
            event: 'MYTHIC_LUCK',
            activatedBy: username,
            endTime: mythicLuckEndTime
        }));
    }

    alert(`🌟 MYTHIC LUCK ACTIVATED!\n\nEveryone gets mythic-only pulls for 10 seconds!`);
}

// Activate mythic luck (called locally or from broadcast)
function activateMythicLuck(activatedBy) {
    mythicLuckEndTime = Date.now() + MYTHIC_LUCK_DURATION;
    updateGlobalEventStatus();

    // Show notification
    if (activatedBy !== username) {
        showEventNotification(`✨ ${activatedBy} activated MYTHIC LUCK! Everyone gets mythic pulls for 10 seconds!`);
    }
}

// Update global event status display
function updateGlobalEventStatus() {
    if (!globalEventStatus) return;

    if (mythicLuckEndTime > Date.now()) {
        const remaining = Math.ceil((mythicLuckEndTime - Date.now()) / 1000);
        globalEventStatus.innerHTML = `
            <div class="event-active mythic-active">
                ✨ MYTHIC LUCK ACTIVE! ${remaining}s remaining - ALL PULLS ARE MYTHIC!
            </div>
        `;
        globalEventStatus.style.display = 'block';
    } else {
        globalEventStatus.style.display = 'none';
        mythicLuckEndTime = 0;
    }
}

// Show event notification popup
function showEventNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'event-notification';
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.classList.add('fade-out');
        setTimeout(() => notif.remove(), 500);
    }, 4000);
}

// Check if mythic luck is active
function isMythicLuckActive() {
    return mythicLuckEndTime > Date.now();
}

// Event listener for buy button
if (buyMythicLuckBtn) {
    buyMythicLuckBtn.addEventListener('click', buyMythicLuck);
}

// Update global event status every 100ms for smooth countdown
setInterval(updateGlobalEventStatus, 100);

// LocalStorage functions
function saveToStorage() {
    localStorage.setItem('rngGame', JSON.stringify({
        inventory,
        totalRolls,
        gems,
        coins,
        luckBoostEndTime,
        autoRollActive,
        autoRollOwned,
        usedCodes,
        autoSellSettings,
        legendaryHistory,
        chatMessages,
        username,
        playerId,
        ownedTotems,
        totemInventory,
        activeTotemBoost,
        globalDrops,
        permanentUpgrades
    }));
}

function loadFromStorage() {
    const saved = localStorage.getItem('rngGame');
    if (saved) {
        const data = JSON.parse(saved);
        inventory = data.inventory || {};
        totalRolls = data.totalRolls || 0;
        gems = data.gems || 0;
        coins = data.coins || 0;
        luckBoostEndTime = data.luckBoostEndTime || 0;
        autoRollActive = data.autoRollActive || false;
        autoRollOwned = data.autoRollOwned || false;
        usedCodes = data.usedCodes || [];
        autoSellSettings = data.autoSellSettings || { common: false, uncommon: false, rare: false, epic: false, legendary: false, mythic: false };
        legendaryHistory = data.legendaryHistory || [];
        chatMessages = data.chatMessages || [];
        username = data.username || '';
        playerId = data.playerId || '';
        ownedTotems = data.ownedTotems || {};
        totemInventory = data.totemInventory || [];
        activeTotemBoost = data.activeTotemBoost || null;
        permanentUpgrades = data.permanentUpgrades || { luckyAura: 0, quickHands: 0, coinMagnet: 0 };
        globalDrops = data.globalDrops || [];

        // Restart auto roll if it was active
        if (autoRollActive) {
            autoRollInterval = setInterval(() => {
                if (!isRolling && autoRollActive) {
                    roll(false);
                }
            }, 3000);
        }
    }
}

// ============================================
// Legendary Chat Functions
// ============================================

// Toggle chat sidebar
function toggleChatSidebar() {
    legendaryChat.classList.toggle('collapsed');
}

// ============================================
// GLOBAL DROPS SYSTEM
// ============================================

let globalDrops = [];
const globalDropsList = document.getElementById('globalDropsList');

// Broadcast a legendary/mythic drop to all players
function broadcastGlobalDrop(item) {
    const drop = {
        type: 'GLOBAL_DROP',
        id: Date.now(),
        username: username,
        itemName: item.name,
        itemEmoji: item.image ? '🖼️' : item.emoji,
        rarity: item.rarity,
        timestamp: new Date().toISOString()
    };

    // Add to local list
    addGlobalDrop(drop);

    // Broadcast to all players via WebSocket
    if (tradeChannel && tradeChannel.readyState === WebSocket.OPEN) {
        tradeChannel.send(JSON.stringify(drop));
    }
}

// Add a drop to the global list (from self or others)
function addGlobalDrop(drop) {
    globalDrops.unshift(drop);

    // Keep only last 30 drops
    if (globalDrops.length > 30) {
        globalDrops = globalDrops.slice(0, 30);
    }

    saveToStorage();
    renderGlobalDrops();
}

// Render global drops
function renderGlobalDrops() {
    if (!globalDropsList) return;

    if (globalDrops.length === 0) {
        globalDropsList.innerHTML = `
            <div class="empty-announcements">
                <span class="empty-emoji">🎰</span>
                <p>No rare drops yet!</p>
                <span class="empty-hint">Waiting for legendary/mythic pulls...</span>
            </div>
        `;
        return;
    }

    globalDropsList.innerHTML = globalDrops.map(drop => {
        const time = formatTimeAgo(drop.timestamp);
        const rarityClass = drop.rarity === 'mythic' ? 'mythic-drop' : 'legendary-drop';
        return `
            <div class="global-drop ${rarityClass}">
                <span class="drop-emoji">${drop.itemEmoji}</span>
                <div class="drop-info">
                    <div class="drop-player">${escapeHtml(drop.username)}</div>
                    <div class="drop-item">${drop.itemName}</div>
                </div>
                <div class="drop-time">${time}</div>
            </div>
        `;
    }).join('');
}

// Format time ago
function formatTimeAgo(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    return `${diffDay}d ago`;
}

// Send chat message
function sendChatMessage() {
    console.log('🚀 sendChatMessage called - NEW CODE LOADED');
    const text = chatInput.value.trim();
    if (!text) return;

    const message = {
        id: Date.now(),
        text: text,
        username: username,
        fromSelf: true,
        timestamp: new Date().toISOString()
    };

    chatMessages.push(message);

    // Keep only last 50 messages
    if (chatMessages.length > 50) {
        chatMessages = chatMessages.slice(-50);
    }

    // Broadcast to other players
    sendTradeMessage({
        type: 'CHAT_MESSAGE',
        text: text,
        username: username,
        timestamp: message.timestamp
    });

    chatInput.value = '';
    saveToStorage();
    renderChatMessages();

    // Scroll to bottom
    messagesList.scrollTop = messagesList.scrollHeight;
}

// Render chat messages
function renderChatMessages() {
    const systemMessage = `
        <div class="system-message">
            <span class="message-icon">🤖</span>
            <span class="message-text">Welcome! Share your legendary pulls!</span>
        </div>
    `;

    const messagesHtml = chatMessages.map(msg => {
        const time = formatTimeAgo(msg.timestamp);
        const senderName = msg.fromSelf ? 'You' : (msg.username || 'Unknown');
        return `
            <div class="user-message ${msg.fromSelf ? 'self' : 'other'}">
                <span class="message-sender">${escapeHtml(senderName)}</span>
                <div class="message-bubble">${escapeHtml(msg.text)}</div>
                <span class="message-time">${time}</span>
            </div>
        `;
    }).join('');

    messagesList.innerHTML = systemMessage + messagesHtml;

    // Scroll to bottom
    messagesList.scrollTop = messagesList.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// Username Functions
// ============================================

function showUsernameModal() {
    usernameModal.classList.add('visible');
    setTimeout(() => usernameInput.focus(), 100);
}

function hideUsernameModal() {
    usernameModal.classList.remove('visible');
}

function submitUsername() {
    const name = usernameInput.value.trim();
    if (name.length < 3 || name.length > 16) return;

    username = name;
    saveToStorage();
    hideUsernameModal();
    startGame();
}

// ============================================
// Trading System Functions
// ============================================

// WebSocket server URL
const TRADE_SERVER_URL = 'ws://localhost:3001';
let wsReconnectTimeout = null;
let wsConnected = false;

// Initialize WebSocket connection for trading
function initTradeChannel() {
    if (tradeChannel && tradeChannel.readyState === WebSocket.OPEN) return;

    try {
        tradeChannel = new WebSocket(TRADE_SERVER_URL);

        tradeChannel.onopen = () => {
            console.log('✅ Connected to trade server');
            wsConnected = true;

            // Register with server
            tradeChannel.send(JSON.stringify({
                type: 'REGISTER',
                playerId: playerId,
                username: username
            }));

            updateConnectionStatus(true);
        };

        tradeChannel.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                handleTradeMessage(data);
            } catch (err) {
                console.error('Error parsing message:', err);
            }
        };

        tradeChannel.onclose = () => {
            console.log('❌ Disconnected from trade server');
            wsConnected = false;
            updateConnectionStatus(false);

            // Try to reconnect after 3 seconds
            if (!wsReconnectTimeout) {
                wsReconnectTimeout = setTimeout(() => {
                    wsReconnectTimeout = null;
                    initTradeChannel();
                }, 3000);
            }
        };

        tradeChannel.onerror = (err) => {
            console.error('WebSocket error:', err);
            updateConnectionStatus(false);
        };
    } catch (err) {
        console.error('Failed to connect to trade server:', err);
        updateConnectionStatus(false);
    }
}

// Update connection status in UI
function updateConnectionStatus(connected) {
    const indicator = document.querySelector('.online-indicator');
    if (indicator) {
        indicator.style.background = connected ? 'var(--uncommon)' : '#ef4444';
        indicator.title = connected ? 'Connected to trade server' : 'Disconnected - trading unavailable';
    }
}

// Send message to WebSocket server
function sendTradeMessage(message) {
    if (tradeChannel && tradeChannel.readyState === WebSocket.OPEN) {
        message.from = playerId;
        console.log('📤 Sending message:', message.type, message);
        tradeChannel.send(JSON.stringify(message));
    } else {
        console.warn('⚠️ Cannot send message - WebSocket not connected');
    }
}

// Handle incoming trade messages
function handleTradeMessage(data) {
    console.log('📥 Received message:', data.type, data);
    // Ignore messages from self
    if (data.from === playerId) {
        console.log('⏭️ Ignoring message from self');
        return;
    }

    switch (data.type) {
        case 'PLAYER_LIST':
            // Initial player list from server
            onlinePlayers = {};
            for (const id in data.players) {
                onlinePlayers[id] = {
                    username: data.players[id].username,
                    lastSeen: Date.now()
                };
            }
            renderOnlinePlayers();
            break;

        case 'PLAYER_ONLINE':
            onlinePlayers[data.from] = {
                username: data.username,
                lastSeen: Date.now()
            };
            renderOnlinePlayers();
            break;

        case 'PLAYER_OFFLINE':
            delete onlinePlayers[data.from];
            renderOnlinePlayers();
            // Cancel trade if partner left
            if (activeTrade && activeTrade.partnerId === data.from) {
                closeTrade();
                alert('Trade partner disconnected.');
            }
            break;

        case 'TRADE_REQUEST':
            if (data.to === playerId) {
                showTradeRequest(data.from, data.username);
            }
            break;

        case 'TRADE_ACCEPTED':
            if (data.to === playerId) {
                openTradeWindow(data.from, data.username);
            }
            break;

        case 'TRADE_DECLINED':
            if (data.to === playerId) {
                alert(`${data.username} declined your trade request.`);
            }
            break;

        case 'TRADE_OFFER':
            if (activeTrade && data.from === activeTrade.partnerId) {
                theirTradeOffer = data.offer;
                renderTheirOffer();
            }
            break;

        case 'TRADE_CONFIRMED':
            if (activeTrade && data.from === activeTrade.partnerId) {
                theirTradeConfirmed = true;
                updateTradeStatus();
                checkTradeComplete();
            }
            break;

        case 'TRADE_UNCONFIRMED':
            if (activeTrade && data.from === activeTrade.partnerId) {
                theirTradeConfirmed = false;
                updateTradeStatus();
            }
            break;

        case 'TRADE_CANCELLED':
            if (activeTrade && data.from === activeTrade.partnerId) {
                closeTrade();
                alert(`${activeTrade.partnerName} cancelled the trade.`);
            }
            break;

        case 'TRADE_COMPLETE':
            if (activeTrade && data.from === activeTrade.partnerId) {
                executeTrade();
            }
            break;

        case 'CHAT_MESSAGE':
            // Received chat message from another player
            console.log('💬 CHAT_MESSAGE received:', data);
            const chatMsg = {
                id: Date.now(),
                text: data.text,
                username: data.username,
                fromSelf: false,
                timestamp: data.timestamp
            };
            chatMessages.push(chatMsg);
            if (chatMessages.length > 50) {
                chatMessages = chatMessages.slice(-50);
            }
            saveToStorage();
            renderChatMessages();
            break;

        case 'GLOBAL_DROP':
            // Received legendary/mythic drop announcement from another player
            console.log('🌟 GLOBAL_DROP received:', data);
            addGlobalDrop(data);
            break;

        case 'GLOBAL_EVENT':
            // Received global event from another player
            console.log('🌍 GLOBAL_EVENT received:', data);
            if (data.event === 'MYTHIC_LUCK') {
                activateMythicLuck(data.activatedBy);
            }
            break;
    }
}

// Send heartbeat to keep connection alive
function sendPresence() {
    if (!tradeChannel || tradeChannel.readyState !== WebSocket.OPEN) return;

    tradeChannel.send(JSON.stringify({
        type: 'HEARTBEAT',
        from: playerId
    }));
}

// No longer needed with WebSocket - server handles player list
function cleanupStalePlayers() {
    // Server handles this now
}

// Render online players list
function renderOnlinePlayers() {
    const players = Object.entries(onlinePlayers);

    if (players.length === 0) {
        onlinePlayersList.innerHTML = `
            <div class="no-players">
                <span class="no-players-icon">👥</span>
                <p>No other players online</p>
                <span class="no-players-hint">Open another tab to trade!</span>
            </div>
        `;
        return;
    }

    onlinePlayersList.innerHTML = players.map(([id, player]) => `
        <div class="online-player">
            <span class="player-status"></span>
            <span class="player-name">${escapeHtml(player.username)}</span>
            <button class="trade-btn" onclick="requestTrade('${id}', '${escapeHtml(player.username)}')">Trade</button>
        </div>
    `).join('');
}

// Request trade with player
function requestTrade(partnerId, partnerName) {
    if (activeTrade) {
        alert('You are already in a trade!');
        return;
    }

    sendTradeMessage({
        type: 'TRADE_REQUEST',
        from: playerId,
        to: partnerId,
        username: username
    });

    alert(`Trade request sent to ${partnerName}!`);
}

// Show trade request modal
let pendingTradeRequest = null;

function showTradeRequest(fromId, fromUsername) {
    pendingTradeRequest = { fromId, fromUsername };
    tradeRequestFrom.textContent = fromUsername;
    tradeRequestModal.classList.add('visible');
}

function acceptTradeRequest() {
    if (!pendingTradeRequest) return;

    tradeRequestModal.classList.remove('visible');

    // Send acceptance
    sendTradeMessage({
        type: 'TRADE_ACCEPTED',
        from: playerId,
        to: pendingTradeRequest.fromId,
        username: username
    });

    // Open trade window
    openTradeWindow(pendingTradeRequest.fromId, pendingTradeRequest.fromUsername);
    pendingTradeRequest = null;
}

function declineTradeRequest() {
    if (!pendingTradeRequest) return;

    sendTradeMessage({
        type: 'TRADE_DECLINED',
        from: playerId,
        to: pendingTradeRequest.fromId,
        username: username
    });

    tradeRequestModal.classList.remove('visible');
    pendingTradeRequest = null;
}

// Open trade window
function openTradeWindow(partnerId, partnerName) {
    activeTrade = { partnerId, partnerName };
    tradeOffer = [];
    theirTradeOffer = [];
    myTradeConfirmed = false;
    theirTradeConfirmed = false;

    tradingWithName.textContent = partnerName;
    tradeWindowModal.classList.add('visible');

    renderTradeInventory();
    renderYourOffer();
    renderTheirOffer();
    updateTradeStatus();
}

// Close trade window
function closeTrade() {
    activeTrade = null;
    tradeOffer = [];
    theirTradeOffer = [];
    myTradeConfirmed = false;
    theirTradeConfirmed = false;
    tradeWindowModal.classList.remove('visible');
}

// Cancel trade
function cancelTrade() {
    if (activeTrade) {
        sendTradeMessage({
            type: 'TRADE_CANCELLED',
            from: playerId,
            to: activeTrade.partnerId
        });
    }
    closeTrade();
}

// Render your inventory in trade window
function renderTradeInventory() {
    const ownedItems = Object.values(inventory).filter(item => item.count > 0);

    if (ownedItems.length === 0) {
        tradeInventoryGrid.innerHTML = '<div style="color: var(--text-secondary); padding: 1rem; text-align: center;">No items to trade</div>';
        return;
    }

    tradeInventoryGrid.innerHTML = ownedItems.map(item => {
        const inOffer = tradeOffer.filter(o => o.id === item.id).length;
        const available = item.count - inOffer;
        return `
            <div class="trade-inventory-item ${item.rarity} ${inOffer > 0 ? 'selected' : ''}" 
                 onclick="addToOffer(${item.id})" 
                 title="${item.name} (${available} available)">
                <span>${item.emoji}</span>
                <span class="count">x${available}</span>
            </div>
        `;
    }).join('');
}

// Add item to offer
function addToOffer(itemId) {
    const item = inventory[itemId];
    if (!item) return;

    const inOffer = tradeOffer.filter(o => o.id === itemId).length;
    if (inOffer >= item.count) return; // Can't offer more than we have

    tradeOffer.push({ id: itemId, name: item.name, emoji: item.emoji, rarity: item.rarity });

    // Reset confirmations when offer changes
    if (myTradeConfirmed) {
        myTradeConfirmed = false;
        sendTradeMessage({
            type: 'TRADE_UNCONFIRMED',
            from: playerId,
            to: activeTrade.partnerId
        });
    }

    syncOffer();
    renderYourOffer();
    renderTradeInventory();
    updateTradeStatus();
}

// Remove item from offer
function removeFromOffer(index) {
    tradeOffer.splice(index, 1);

    // Reset confirmations when offer changes
    if (myTradeConfirmed) {
        myTradeConfirmed = false;
        sendTradeMessage({
            type: 'TRADE_UNCONFIRMED',
            from: playerId,
            to: activeTrade.partnerId
        });
    }

    syncOffer();
    renderYourOffer();
    renderTradeInventory();
    updateTradeStatus();
}

// Sync offer with partner
function syncOffer() {
    if (!activeTrade) return;

    sendTradeMessage({
        type: 'TRADE_OFFER',
        from: playerId,
        to: activeTrade.partnerId,
        offer: tradeOffer
    });
}

// Render your offer
function renderYourOffer() {
    if (tradeOffer.length === 0) {
        yourOfferGrid.innerHTML = '';
        return;
    }

    yourOfferGrid.innerHTML = tradeOffer.map((item, index) => `
        <div class="trade-item" onclick="removeFromOffer(${index})" title="Click to remove">
            <span>${item.emoji}</span>
        </div>
    `).join('');
}

// Render their offer
function renderTheirOffer() {
    if (theirTradeOffer.length === 0) {
        theirOfferGrid.innerHTML = '';
        return;
    }

    theirOfferGrid.innerHTML = theirTradeOffer.map(item => `
        <div class="trade-item">
            <span>${item.emoji}</span>
        </div>
    `).join('');
}

// Update trade status
function updateTradeStatus() {
    const statusIcon = tradeStatus.querySelector('.status-icon');
    const statusText = tradeStatus.querySelector('.status-text');

    if (myTradeConfirmed && theirTradeConfirmed) {
        statusIcon.textContent = '✅';
        statusText.textContent = 'Both confirmed! Trade completing...';
        tradeStatus.className = 'trade-status confirmed';
    } else if (myTradeConfirmed) {
        statusIcon.textContent = '⏳';
        statusText.textContent = 'Waiting for partner to confirm...';
        tradeStatus.className = 'trade-status waiting';
    } else if (theirTradeConfirmed) {
        statusIcon.textContent = '⏳';
        statusText.textContent = 'Partner confirmed! Your turn...';
        tradeStatus.className = 'trade-status waiting';
    } else {
        statusIcon.textContent = '⏳';
        statusText.textContent = 'Select items and confirm trade';
        tradeStatus.className = 'trade-status';
    }

    confirmTradeBtn.disabled = myTradeConfirmed;
    confirmTradeBtn.textContent = myTradeConfirmed ? 'Confirmed ✓' : 'Confirm Trade';
}

// Confirm trade
function confirmTrade() {
    if (!activeTrade) return;

    myTradeConfirmed = true;

    sendTradeMessage({
        type: 'TRADE_CONFIRMED',
        from: playerId,
        to: activeTrade.partnerId
    });

    updateTradeStatus();
    checkTradeComplete();
}

// Check if trade is complete
function checkTradeComplete() {
    if (myTradeConfirmed && theirTradeConfirmed) {
        // Small delay then complete
        setTimeout(() => {
            sendTradeMessage({
                type: 'TRADE_COMPLETE',
                from: playerId,
                to: activeTrade.partnerId
            });
            executeTrade();
        }, 500);
    }
}

// Execute the trade (transfer items)
function executeTrade() {
    // Remove items we're giving
    for (const item of tradeOffer) {
        if (inventory[item.id]) {
            inventory[item.id].count--;
            if (inventory[item.id].count <= 0) {
                delete inventory[item.id];
            }
        }
    }

    // Add items we're receiving
    for (const item of theirTradeOffer) {
        if (!inventory[item.id]) {
            inventory[item.id] = { ...item, count: 0 };
        }
        inventory[item.id].count++;
    }

    saveToStorage();
    updateStats();
    renderInventory(document.querySelector('.filter-btn.active').dataset.rarity);

    closeTrade();
    alert('Trade complete! Items have been exchanged.');
}

// ============================================
// GEM SHOP FUNCTIONALITY
// ============================================

// Initialize Gem Shop
function initGemShop() {
    // Exchange buttons
    document.getElementById('exchange1k')?.addEventListener('click', () => exchangeGems(1000, 10));
    document.getElementById('exchange10k')?.addEventListener('click', () => exchangeGems(10000, 120));
    document.getElementById('exchange100k')?.addEventListener('click', () => exchangeGems(100000, 1500));

    // Guaranteed roll buttons
    document.getElementById('guaranteedRare')?.addEventListener('click', () => guaranteedRoll('rare'));
    document.getElementById('guaranteedEpic')?.addEventListener('click', () => guaranteedRoll('epic'));
    document.getElementById('guaranteedLegendary')?.addEventListener('click', () => guaranteedRoll('legendary'));

    // Permanent upgrade buttons
    document.getElementById('buyLuckyAura')?.addEventListener('click', () => buyUpgrade('luckyAura', 10));
    document.getElementById('buyQuickHands')?.addEventListener('click', () => buyUpgrade('quickHands', 5));
    document.getElementById('buyCoinMagnet')?.addEventListener('click', () => buyUpgrade('coinMagnet', 4));

    // Update UI
    updateGemShopUI();
}

// Exchange gems for coins
function exchangeGems(gemCost, coinReward) {
    if (gems < gemCost) {
        alert(`Not enough gems! You need ${gemCost.toLocaleString()} 💎`);
        return;
    }

    gems -= gemCost;
    coins += coinReward;
    updateCurrencyDisplay();
    saveToStorage();

    // Visual feedback
    showNotification(`Exchanged ${gemCost.toLocaleString()} 💎 for ${coinReward} 🪙`);
}

// Show quick notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Guaranteed roll - guarantees minimum rarity
async function guaranteedRoll(minRarity) {
    if (isRolling) return;

    const cost = GUARANTEED_ROLL_COSTS[minRarity];
    if (gems < cost) {
        alert(`Not enough gems! You need ${cost.toLocaleString()} 💎`);
        return;
    }

    gems -= cost;
    updateCurrencyDisplay();

    // Get item of at least this rarity
    const result = getGuaranteedItem(minRarity);

    // Run the roll animation with the result
    await performRollWithItem(result);
}

// Get item with guaranteed minimum rarity
function getGuaranteedItem(minRarity) {
    const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
    const minIndex = rarityOrder.indexOf(minRarity);

    // Get valid rarities (minRarity or better)
    const validRarities = rarityOrder.slice(minIndex);

    // Calculate weights for valid rarities
    let weights = {};
    if (minRarity === 'rare') {
        weights = { rare: 70, epic: 25, legendary: 4.5, mythic: 0.5 };
    } else if (minRarity === 'epic') {
        weights = { epic: 85, legendary: 14, mythic: 1 };
    } else if (minRarity === 'legendary') {
        weights = { legendary: 95, mythic: 5 };
    }

    // Pick rarity based on weights
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let rand = Math.random() * totalWeight;
    let chosenRarity = minRarity;

    for (const [rarity, weight] of Object.entries(weights)) {
        rand -= weight;
        if (rand <= 0) {
            chosenRarity = rarity;
            break;
        }
    }

    // Get random item of chosen rarity
    const itemsOfRarity = ITEMS.filter(item => item.rarity === chosenRarity);
    return itemsOfRarity[Math.floor(Math.random() * itemsOfRarity.length)];
}

// Perform roll with a specific predetermined item
async function performRollWithItem(result) {
    isRolling = true;
    rollButton.disabled = true;
    luckyRollButton.disabled = true;

    // Determine spin duration based on rarity
    let spinDuration = 800;
    let glowBuildupDuration = 0;
    let glowClass = '';

    if (result.rarity === 'legendary') {
        spinDuration = 2000;
        glowBuildupDuration = 1500;
        glowClass = 'legendary-glow-buildup';
    } else if (result.rarity === 'mythic') {
        spinDuration = 3500;
        glowBuildupDuration = 2500;
        glowClass = 'mythic-glow-buildup';
    }

    rollFrame.className = 'roll-frame rolling';
    if (glowClass) rollFrame.classList.add(glowClass);
    rollGlow.style.opacity = '0';

    resultImage.classList.add('card-back');
    resultImage.innerHTML = '<div class="card-back-placeholder">?</div>';
    resultName.textContent = '';
    resultRarity.textContent = '';
    resultRarity.className = 'item-rarity';

    if (glowBuildupDuration > 0) {
        setTimeout(() => {
            if (result.rarity === 'legendary') {
                rollFrame.classList.add('legendary-hint');
                rollGlow.style.opacity = '0.5';
                rollGlow.style.boxShadow = '0 0 150px 50px rgba(245, 158, 11, 0.6)';
            } else if (result.rarity === 'mythic') {
                rollFrame.classList.add('mythic-hint');
                rollGlow.style.opacity = '0.7';
                rollGlow.style.boxShadow = '0 0 200px 80px rgba(239, 68, 68, 0.8)';
            }
        }, spinDuration - glowBuildupDuration);
    }

    await sleep(spinDuration);

    resultImage.classList.remove('card-back');
    resultImage.innerHTML = '';
    rollFrame.classList.remove('legendary-glow-buildup', 'mythic-glow-buildup', 'legendary-hint', 'mythic-hint');
    rollFrame.className = `roll-frame reveal rarity-${result.rarity}`;

    if (result.rarity === 'legendary') {
        rollGlow.style.opacity = '1';
        rollGlow.style.boxShadow = '0 0 200px 80px rgba(245, 158, 11, 0.9)';
    } else if (result.rarity === 'mythic') {
        rollGlow.style.opacity = '1';
        rollGlow.style.boxShadow = '0 0 300px 120px rgba(239, 68, 68, 1)';
    } else {
        rollGlow.style.opacity = '1';
    }

    if (result.image) {
        resultImage.innerHTML = `<img src="${result.image}" alt="${result.name}" class="item-reveal-image">`;
    } else {
        resultImage.textContent = result.emoji;
    }

    resultName.textContent = result.name;
    resultRarity.textContent = result.rarity;

    if (typeof vfx !== 'undefined') vfx.trigger(result.rarity);

    if (!inventory[result.id]) {
        inventory[result.id] = { ...result, count: 0 };
    }
    inventory[result.id].count++;
    totalRolls++;

    if (result.rarity === 'legendary' || result.rarity === 'mythic') {
        broadcastGlobalDrop(result);
    }

    updateStats();
    updateCurrencyDisplay();
    renderInventory(document.querySelector('.filter-btn.active').dataset.rarity);
    saveToStorage();

    const cooldown = result.rarity === 'mythic' ? 1500 : result.rarity === 'legendary' ? 1000 : 500;
    setTimeout(() => {
        isRolling = false;
        rollButton.disabled = false;
        luckyRollButton.disabled = false;
        rollGlow.style.opacity = '0';
    }, cooldown);
}

// Buy a permanent upgrade
function buyUpgrade(upgradeType, maxLevel) {
    if (permanentUpgrades[upgradeType] >= maxLevel) {
        alert('This upgrade is already at max level!');
        return;
    }

    const cost = getUpgradeCost(upgradeType);
    if (gems < cost) {
        alert(`Not enough gems! You need ${cost.toLocaleString()} 💎`);
        return;
    }

    gems -= cost;
    permanentUpgrades[upgradeType]++;

    updateCurrencyDisplay();
    updateGemShopUI();
    saveToStorage();

    showNotification(`Upgraded ${getUpgradeName(upgradeType)} to Level ${permanentUpgrades[upgradeType]}!`);
}

// Get upgrade cost based on current level
function getUpgradeCost(upgradeType) {
    const config = UPGRADE_COSTS[upgradeType];
    return Math.floor(config.base * Math.pow(config.multiplier, permanentUpgrades[upgradeType]));
}

// Get display name for upgrade
function getUpgradeName(upgradeType) {
    const names = {
        luckyAura: 'Lucky Aura',
        quickHands: 'Quick Hands',
        coinMagnet: 'Coin Magnet'
    };
    return names[upgradeType] || upgradeType;
}

// Update Gem Shop UI
function updateGemShopUI() {
    // Update Lucky Aura
    const luckyAuraLevel = document.getElementById('luckyAuraLevel');
    const luckyAuraCost = document.getElementById('luckyAuraCost');
    const buyLuckyAura = document.getElementById('buyLuckyAura');
    if (luckyAuraLevel) luckyAuraLevel.textContent = permanentUpgrades.luckyAura;
    if (luckyAuraCost) {
        if (permanentUpgrades.luckyAura >= 10) {
            luckyAuraCost.textContent = 'MAX';
            if (buyLuckyAura) buyLuckyAura.disabled = true;
        } else {
            luckyAuraCost.textContent = formatNumber(getUpgradeCost('luckyAura')) + ' 💎';
        }
    }

    // Update Quick Hands
    const quickHandsLevel = document.getElementById('quickHandsLevel');
    const quickHandsCost = document.getElementById('quickHandsCost');
    const buyQuickHands = document.getElementById('buyQuickHands');
    if (quickHandsLevel) quickHandsLevel.textContent = permanentUpgrades.quickHands;
    if (quickHandsCost) {
        if (permanentUpgrades.quickHands >= 5) {
            quickHandsCost.textContent = 'MAX';
            if (buyQuickHands) buyQuickHands.disabled = true;
        } else {
            quickHandsCost.textContent = formatNumber(getUpgradeCost('quickHands')) + ' 💎';
        }
    }

    // Update Coin Magnet
    const coinMagnetLevel = document.getElementById('coinMagnetLevel');
    const coinMagnetCost = document.getElementById('coinMagnetCost');
    const buyCoinMagnet = document.getElementById('buyCoinMagnet');
    if (coinMagnetLevel) coinMagnetLevel.textContent = permanentUpgrades.coinMagnet;
    if (coinMagnetCost) {
        if (permanentUpgrades.coinMagnet >= 4) {
            coinMagnetCost.textContent = 'MAX';
            if (buyCoinMagnet) buyCoinMagnet.disabled = true;
        } else {
            coinMagnetCost.textContent = formatNumber(getUpgradeCost('coinMagnet')) + ' 💎';
        }
    }
}

// Apply Coin Magnet bonus to coin rewards
function applyCoinMagnetBonus(baseCoins) {
    const bonus = 1 + (permanentUpgrades.coinMagnet * 0.25); // +25% per level
    return Math.floor(baseCoins * bonus);
}

// Get Lucky Aura bonus (extra legendary weight)
function getLuckyAuraBonus() {
    return permanentUpgrades.luckyAura; // +1% per level
}

// Get auto-roll interval with Quick Hands bonus
function getAutoRollInterval() {
    const baseInterval = 3000; // 3 seconds
    const reduction = permanentUpgrades.quickHands * 500; // 0.5s per level
    return Math.max(1000, baseInterval - reduction); // Minimum 1 second
}

// Start the game
init();

// Initialize Gem Shop after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initGemShop, 100);
    initHowToPlay();
});

// Initialize How to Play modal
function initHowToPlay() {
    const howToPlayBtn = document.getElementById('howToPlayBtn');
    const howToPlayModal = document.getElementById('howToPlayModal');
    const closeHowToPlay = document.getElementById('closeHowToPlay');
    const closeHowToPlayBtn = document.getElementById('closeHowToPlayBtn');

    if (howToPlayBtn && howToPlayModal) {
        howToPlayBtn.addEventListener('click', () => {
            howToPlayModal.style.display = 'flex';
        });

        closeHowToPlay?.addEventListener('click', () => {
            howToPlayModal.style.display = 'none';
        });

        closeHowToPlayBtn?.addEventListener('click', () => {
            howToPlayModal.style.display = 'none';
        });

        // Close on overlay click
        howToPlayModal.addEventListener('click', (e) => {
            if (e.target === howToPlayModal) {
                howToPlayModal.style.display = 'none';
            }
        });
    }
}
