// ============================================
// 🤖 BLOX FRUIT & JUJUTSU INFINITE STOCK BOT
// ============================================
// Bu kodu kopyala ve kendi sunucunda çalıştır!
//
// KURULUM:
// 1. Node.js kur (nodejs.org)
// 2. Yeni klasör oluştur
// 3. Terminal aç: npm init -y
// 4. npm install discord.js
// 5. Bu kodu index.js olarak kaydet
// 6. TOKEN kısmını kendi bot tokeninle değiştir
// 7. node index.js ile çalıştır
//
// 7/24 AKTİF TUTMA:
// - Railway.app (ÜCRETSİZ - aylık 5$ kredi)
// - Render.com (ÜCRETSİZ)
// - Replit.com (ÜCRETSİZ)
// ============================================

const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, REST, Routes } = require('discord.js');

// ⚠️ KENDİ TOKEN'INI BURAYA YAZ
const TOKEN = 'BURAYA_BOT_TOKENINI_YAZ';
const CLIENT_ID = 'BURAYA_CLIENT_ID_YAZ';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

// ============ BLOX FRUIT VERİLERİ ============
const bloxFruits = [
  { name: 'Rocket', emoji: '🚀', price: 5000, robux: 50, rarity: 'Common', type: 'Natural' },
  { name: 'Spin', emoji: '🌀', price: 7500, robux: 75, rarity: 'Common', type: 'Natural' },
  { name: 'Chop', emoji: '🪓', price: 30000, robux: 100, rarity: 'Common', type: 'Natural' },
  { name: 'Spring', emoji: '🔩', price: 60000, robux: 180, rarity: 'Common', type: 'Natural' },
  { name: 'Bomb', emoji: '💣', price: 80000, robux: 220, rarity: 'Common', type: 'Natural' },
  { name: 'Smoke', emoji: '💨', price: 100000, robux: 250, rarity: 'Uncommon', type: 'Elemental' },
  { name: 'Spike', emoji: '🦔', price: 180000, robux: 380, rarity: 'Uncommon', type: 'Natural' },
  { name: 'Flame', emoji: '🔥', price: 250000, robux: 550, rarity: 'Uncommon', type: 'Elemental' },
  { name: 'Falcon', emoji: '🦅', price: 300000, robux: 650, rarity: 'Uncommon', type: 'Beast' },
  { name: 'Ice', emoji: '🧊', price: 350000, robux: 750, rarity: 'Uncommon', type: 'Elemental' },
  { name: 'Sand', emoji: '🏜️', price: 420000, robux: 850, rarity: 'Uncommon', type: 'Elemental' },
  { name: 'Dark', emoji: '🌑', price: 500000, robux: 950, rarity: 'Uncommon', type: 'Elemental' },
  { name: 'Diamond', emoji: '💎', price: 600000, robux: 1000, rarity: 'Rare', type: 'Elemental' },
  { name: 'Light', emoji: '✨', price: 650000, robux: 1100, rarity: 'Rare', type: 'Elemental' },
  { name: 'Rubber', emoji: '🫧', price: 750000, robux: 1200, rarity: 'Rare', type: 'Natural' },
  { name: 'Barrier', emoji: '🛡️', price: 800000, robux: 1250, rarity: 'Rare', type: 'Natural' },
  { name: 'Ghost', emoji: '👻', price: 940000, robux: 1275, rarity: 'Rare', type: 'Natural' },
  { name: 'Magma', emoji: '🌋', price: 1040000, robux: 1300, rarity: 'Rare', type: 'Elemental' },
  { name: 'Quake', emoji: '🫨', price: 1000000, robux: 1350, rarity: 'Legendary', type: 'Natural' },
  { name: 'Buddha', emoji: '🧘', price: 1200000, robux: 1650, rarity: 'Legendary', type: 'Beast' },
  { name: 'Love', emoji: '💕', price: 1300000, robux: 1550, rarity: 'Legendary', type: 'Natural' },
  { name: 'Spider', emoji: '🕷️', price: 1500000, robux: 1800, rarity: 'Legendary', type: 'Natural' },
  { name: 'Sound', emoji: '🎵', price: 1700000, robux: 1900, rarity: 'Legendary', type: 'Natural' },
  { name: 'Phoenix', emoji: '🐦‍🔥', price: 1800000, robux: 2000, rarity: 'Legendary', type: 'Beast' },
  { name: 'Portal', emoji: '🌀', price: 1900000, robux: 2000, rarity: 'Legendary', type: 'Natural' },
  { name: 'Rumble', emoji: '⚡', price: 2100000, robux: 2100, rarity: 'Legendary', type: 'Elemental' },
  { name: 'Pain', emoji: '😈', price: 2300000, robux: 2200, rarity: 'Legendary', type: 'Natural' },
  { name: 'Blizzard', emoji: '❄️', price: 2400000, robux: 2250, rarity: 'Legendary', type: 'Elemental' },
  { name: 'Gravity', emoji: '🪐', price: 2500000, robux: 2300, rarity: 'Legendary', type: 'Natural' },
  { name: 'Mammoth', emoji: '🦣', price: 2700000, robux: 2350, rarity: 'Legendary', type: 'Beast' },
  { name: 'T-Rex', emoji: '🦖', price: 2700000, robux: 2350, rarity: 'Legendary', type: 'Beast' },
  { name: 'Dough', emoji: '🍩', price: 2800000, robux: 2400, rarity: 'Mythical', type: 'Elemental' },
  { name: 'Shadow', emoji: '🌘', price: 2900000, robux: 2425, rarity: 'Mythical', type: 'Natural' },
  { name: 'Venom', emoji: '☠️', price: 3000000, robux: 2450, rarity: 'Mythical', type: 'Natural' },
  { name: 'Control', emoji: '🎮', price: 3200000, robux: 2500, rarity: 'Mythical', type: 'Natural' },
  { name: 'Spirit', emoji: '👁️', price: 3400000, robux: 2550, rarity: 'Mythical', type: 'Natural' },
  { name: 'Dragon', emoji: '🐉', price: 3500000, robux: 2600, rarity: 'Mythical', type: 'Beast' },
  { name: 'Leopard', emoji: '🐆', price: 5000000, robux: 3000, rarity: 'Mythical', type: 'Beast' },
  { name: 'Kitsune', emoji: '🦊', price: 8000000, robux: 4000, rarity: 'Mythical', type: 'Beast' },
];

// ============ JUJUTSU INFINITE VERİLERİ ============
const jjkItems = [
  { name: 'Slaughter Demon', emoji: '🗡️', price: 50000, rarity: 'Rare', category: 'Cursed Tool' },
  { name: 'Playful Cloud', emoji: '☁️', price: 120000, rarity: 'Epic', category: 'Cursed Tool' },
  { name: 'Inverted Spear', emoji: '🔱', price: 200000, rarity: 'Legendary', category: 'Cursed Tool' },
  { name: 'Split Soul Katana', emoji: '⚔️', price: 180000, rarity: 'Legendary', category: 'Cursed Tool' },
  { name: 'Dragon Bone', emoji: '🦴', price: 90000, rarity: 'Rare', category: 'Cursed Tool' },
  { name: 'Executioner Sword', emoji: '🗡️', price: 250000, rarity: 'Mythical', category: 'Cursed Tool' },
  { name: 'Sukuna Finger', emoji: '☝️', price: 500000, rarity: 'Mythical', category: 'Material' },
  { name: 'Domain Shard', emoji: '💠', price: 300000, rarity: 'Legendary', category: 'Material' },
  { name: 'Death Painting', emoji: '🖼️', price: 350000, rarity: 'Legendary', category: 'Material' },
  { name: 'Cursed Womb', emoji: '🥚', price: 80000, rarity: 'Epic', category: 'Material' },
  { name: 'Spin Token', emoji: '🎰', price: 50000, rarity: 'Rare', category: 'Consumable' },
  { name: 'Domain Expansion Scroll', emoji: '🌀', price: 400000, rarity: 'Mythical', category: 'Consumable' },
  { name: 'Limitless', emoji: '♾️', price: 1000000, rarity: 'Mythical', category: 'Technique' },
  { name: 'Ten Shadows', emoji: '🐺', price: 800000, rarity: 'Mythical', category: 'Technique' },
  { name: 'Shrine', emoji: '✂️', price: 900000, rarity: 'Mythical', category: 'Technique' },
  { name: 'Blood Manipulation', emoji: '🩸', price: 180000, rarity: 'Epic', category: 'Technique' },
  { name: 'Boogie Woogie', emoji: '👏', price: 150000, rarity: 'Epic', category: 'Technique' },
  { name: 'Idle Transfiguration', emoji: '🫠', price: 600000, rarity: 'Legendary', category: 'Technique' },
];

const rarityColors = {
  Common: 0x9CA3AF,
  Uncommon: 0x22C55E,
  Rare: 0x3B82F6,
  Epic: 0xA855F7,
  Legendary: 0xEAB308,
  Mythical: 0xEF4444,
};

function formatPrice(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toString();
}

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ============ STOK DEĞİŞKENLERİ ============
let currentBloxStock = getRandomItems(bloxFruits, 6);
let currentMirageStock = getRandomItems(bloxFruits.filter(f => ['Rare','Legendary','Mythical'].includes(f.rarity)), 3);
let currentCursedStock = getRandomItems(jjkItems.filter(i => ['Cursed Tool','Material','Technique'].includes(i.category)), 5);
let currentMoneyStock = getRandomItems(jjkItems, 4);
let lastStockUpdate = Date.now();

// Her 4 saatte stok yenile
setInterval(() => {
  currentBloxStock = getRandomItems(bloxFruits, 6);
  currentMirageStock = getRandomItems(bloxFruits.filter(f => ['Rare','Legendary','Mythical'].includes(f.rarity)), 3);
  currentCursedStock = getRandomItems(jjkItems.filter(i => ['Cursed Tool','Material','Technique'].includes(i.category)), 5);
  currentMoneyStock = getRandomItems(jjkItems, 4);
  lastStockUpdate = Date.now();
  console.log('🔄 Stok güncellendi!');
}, 4 * 60 * 60 * 1000);

// ============ SLASH KOMUTLARI ============
const commands = [
  new SlashCommandBuilder().setName('stock').setDescription('🍎 Blox Fruit Dealer stok bilgisi'),
  new SlashCommandBuilder().setName('mirage').setDescription('🏝️ Mirage Island Dealer stok bilgisi'),
  new SlashCommandBuilder().setName('cursed').setDescription('⛩️ Jujutsu Infinite Cursed Stock'),
  new SlashCommandBuilder().setName('money').setDescription('💰 Jujutsu Infinite Money Shop'),
  new SlashCommandBuilder().setName('allfruits').setDescription('📋 Tüm Blox Fruit listesi'),
  new SlashCommandBuilder().setName('alljjk').setDescription('📋 Tüm Jujutsu Infinite item listesi'),
  new SlashCommandBuilder().setName('yardim').setDescription('❓ Bot komutları listesi'),
];

// Komutları kaydet
const rest = new REST({ version: '10' }).setToken(TOKEN);

client.once('ready', async () => {
  console.log(`✅ Bot hazır! ${client.user.tag} olarak giriş yapıldı.`);
  console.log(`📡 ${client.guilds.cache.size} sunucuda aktif.`);
  
  client.user.setActivity('Blox Fruit & JJK Stock', { type: 3 });
  
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('✅ Slash komutları kaydedildi!');
  } catch (err) {
    console.error('❌ Komut kayıt hatası:', err);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  // ====== /stock ======
  if (commandName === 'stock') {
    const embed = new EmbedBuilder()
      .setTitle('🍎 Blox Fruit Dealer Stock')
      .setColor(0x5865F2)
      .setDescription('Şu anki Fruit Dealer stok bilgisi:')
      .setTimestamp()
      .setFooter({ text: 'Her 4 saatte bir güncellenir' });

    currentBloxStock.forEach(fruit => {
      embed.addFields({
        name: `${fruit.emoji} ${fruit.name}`,
        value: `💰 ${formatPrice(fruit.price)} Beli | 💎 ${fruit.robux} R$\n⭐ ${fruit.rarity} | 🏷️ ${fruit.type}`,
        inline: true,
      });
    });

    await interaction.reply({ embeds: [embed] });
  }

  // ====== /mirage ======
  if (commandName === 'mirage') {
    const embed = new EmbedBuilder()
      .setTitle('🏝️ Mirage Island Dealer')
      .setColor(0xF59E0B)
      .setDescription('Mirage Island özel stok:')
      .setTimestamp()
      .setFooter({ text: 'Her 2 saatte bir güncellenir' });

    currentMirageStock.forEach(fruit => {
      embed.addFields({
        name: `${fruit.emoji} ${fruit.name}`,
        value: `💰 ${formatPrice(fruit.price)} Beli | 💎 ${fruit.robux} R$\n⭐ ${fruit.rarity} | 🏷️ ${fruit.type}`,
        inline: true,
      });
    });

    await interaction.reply({ embeds: [embed] });
  }

  // ====== /cursed ======
  if (commandName === 'cursed') {
    const embed = new EmbedBuilder()
      .setTitle('⛩️ Jujutsu Infinite - Cursed Stock')
      .setColor(0xA855F7)
      .setDescription('Cursed Market stok bilgisi:')
      .setTimestamp()
      .setFooter({ text: 'Her 3 saatte bir güncellenir' });

    currentCursedStock.forEach(item => {
      embed.addFields({
        name: `${item.emoji} ${item.name}`,
        value: `💰 ${formatPrice(item.price)} Money\n⭐ ${item.rarity} | 📁 ${item.category}`,
        inline: true,
      });
    });

    await interaction.reply({ embeds: [embed] });
  }

  // ====== /money ======
  if (commandName === 'money') {
    const embed = new EmbedBuilder()
      .setTitle('💰 Jujutsu Infinite - Money Shop')
      .setColor(0x22C55E)
      .setDescription('Money Shop'da satılan itemler:')
      .setTimestamp()
      .setFooter({ text: 'Her 3 saatte bir güncellenir' });

    currentMoneyStock.forEach(item => {
      embed.addFields({
        name: `${item.emoji} ${item.name}`,
        value: `💰 ${formatPrice(item.price)} Money\n⭐ ${item.rarity} | 📁 ${item.category}`,
        inline: true,
      });
    });

    await interaction.reply({ embeds: [embed] });
  }

  // ====== /allfruits ======
  if (commandName === 'allfruits') {
    const pages = [];
    for (let i = 0; i < bloxFruits.length; i += 10) {
      const chunk = bloxFruits.slice(i, i + 10);
      const embed = new EmbedBuilder()
        .setTitle(`📋 Tüm Blox Fruitler (${i+1}-${Math.min(i+10, bloxFruits.length)}/${bloxFruits.length})`)
        .setColor(0x5865F2)
        .setDescription(chunk.map(f => 
          `${f.emoji} **${f.name}** - 💰 ${formatPrice(f.price)} | ⭐ ${f.rarity}`
        ).join('\n'));
      pages.push(embed);
    }
    await interaction.reply({ embeds: pages.slice(0, 4) });
  }

  // ====== /alljjk ======
  if (commandName === 'alljjk') {
    const embed = new EmbedBuilder()
      .setTitle('📋 Tüm Jujutsu Infinite Itemleri')
      .setColor(0xA855F7)
      .setDescription(jjkItems.map(i => 
        `${i.emoji} **${i.name}** - 💰 ${formatPrice(i.price)} | ⭐ ${i.rarity} | ${i.category}`
      ).join('\n'));
    await interaction.reply({ embeds: [embed] });
  }

  // ====== /yardim ======
  if (commandName === 'yardim') {
    const embed = new EmbedBuilder()
      .setTitle('❓ Bot Komutları')
      .setColor(0x5865F2)
      .setDescription([
        '**🍎 Blox Fruit Komutları:**',
        '`/stock` - Fruit Dealer stok bilgisi',
        '`/mirage` - Mirage Island stok bilgisi',
        '`/allfruits` - Tüm meyve listesi',
        '',
        '**⛩️ Jujutsu Infinite Komutları:**',
        '`/cursed` - Cursed Stock bilgisi',
        '`/money` - Money Shop bilgisi',
        '`/alljjk` - Tüm item listesi',
        '',
        '**📌 Genel:**',
        '`/yardim` - Bu mesaj',
      ].join('\n'))
      .setFooter({ text: 'Blox Fruit & JJK Stock Bot' });
    await interaction.reply({ embeds: [embed] });
  }
});

// Bot'u başlat
client.login(TOKEN);
