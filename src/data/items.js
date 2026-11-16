const wiki = 'https://tensura.wiki.gg/wiki/';
export const itemRelease = 'https://www.curseforge.com/minecraft/mc-mods/tensura-reincarnated/files/9476869';
const previousRelease = 'https://www.curseforge.com/minecraft/mc-mods/tensura-reincarnated/files/8793360';

function entry(id, name, type, summary, obtain, page, details = {}) {
  return { id, name, type, summary, obtain, source: wiki + page, ...details };
}

const craft = (ingredients, pattern, count = 1) => ({
  station: 'Crafting Table', ingredients, pattern, count,
});
const smith = (ingredients, schematic, count = 1) => ({
  station: 'Smithing Bench', ingredients, schematic, count,
});
const process = (station, ingredients, count = 1) => ({ station, ingredients, count });
const lowGear = 'Low Magisteel Gear Schematic';
const leatherGear = 'Monster Leather Gear Schematic';
const spatialGear = 'Spatial Blade Schematic';
const hipokute = 'Mechanics/Hipokute_Farming';
const resets = 'Mechanics/Reset_Scrolls';
const gearEvolution = 'Gear_Evolution';
const mobDrops = 'Items/Mob_Drops';

const workstations = [
  entry('smithing-bench', 'Smithing Bench', 'Workstations', 'Crafts Tensura weapons, armor, tools and special items from learned schematics.',
    'Craft it at a standard Crafting Table. Use a schematic to learn it, then select an unlocked recipe at the bench with the ingredients in your inventory.',
    'Blocks/Smithing_Bench', {
      recipes: [craft(['P · 2 Paper', 'C · 1 Crafting Table', 'S · 1 Smithing Table', 'L · 2 Planks'], ['PP', 'CS', 'LL'])],
      related: ['schematics', 'low-magisteel-sword', 'magic-stone'],
    }),
  entry('kiln', 'Kiln', 'Workstations', 'Melts ore and metals, then combines the stored molten metals into ingots and nuggets.',
    'Craft it at a standard Crafting Table. Place the metal input in the top-right slot and fuel below it. Use the arrows beside the output to select an alloy.',
    'Blocks/Kiln', {
      recipes: [craft(['O · 5 Obsidian', 'N · 1 Netherite Ingot', 'C · 2 Cauldrons', 'B · 1 Blast Furnace'], ['ONO', 'CBC', 'OOO'])],
      related: ['magic-ore-shard', 'low-magisteel-ingot', 'pure-magisteel-ingot'],
    }),
  entry('spellbinding-table', 'Spellbinding Table', 'Workstations', 'Binds spells to grimoires and staffs so you can cast through the tool.',
    'Craft it at a standard Crafting Table. The caster tools guide documents spell restrictions and increased costs for casting unlearned spells.',
    'Spellbinding_Table', {
      recipes: [craft(['M · 1 Magic Stone', 'S · 2 Silver Ingots', 'O · 4 Crying Obsidian'], [' M ', 'SOS', 'OOO'])],
      related: ['magic-stone', 'silver-ingot', 'staff-of-slime'],
      references: [{ label: 'Caster tools guide', url: wiki + 'Caster_Tools_Tutorial' }],
    }),
];

const minerals = [
  entry('magic-ore-shard', 'Magic Ore Shard', 'Materials', 'Raw input for molten Magisteel and part of the Slime-to-Metal Slime evolution route.',
    'Mine Magic Ore or Deepslate Magic Ore with a Netherite Pickaxe, or hunt Metal Slimes. The wiki suggests starting your deepslate search near Y −27.',
    'Magic_Ore_Shard', {
      related: ['kiln', 'pure-magisteel-ingot', 'low-magisteel-ingot'],
      references: [{ label: 'Magic Ore generation', url: wiki + 'Blocks/Magic_Ore' }],
    }),
  entry('silver-ingot', 'Silver Ingot', 'Materials', 'Silver is a material for silver gear, the Spellbinding Table and Mithril alloy.',
    'Mine Silver Ore for Raw Silver and smelt the raw material. The Kiln can also cast stored molten silver back into nuggets or ingots.',
    'Silver_Ingot', {
      recipes: [process('Smelting', ['1 Raw Silver'])],
      related: ['kiln', 'mithril-ingot', 'spellbinding-table'],
    }),
  ...[
    ['low-magisteel-ingot', 'Low Magisteel Ingot', 'An entry point to evolving metal gear. The ingot is also used for Magic Stones and Warp Cores.', '8 Iron Nuggets', 4],
    ['high-magisteel-ingot', 'High Magisteel Ingot', 'An iron and Magisteel alloy used for equipment such as the Staff of Slime and Spatial Blade.', '5 Iron Nuggets', 16],
    ['pure-magisteel-ingot', 'Pure Magisteel Ingot', 'Refined Magisteel for advanced gear, masks and reset scrolls.', '', 36],
    ['mithril-ingot', 'Mithril Ingot', 'A silver and Magisteel alloy used for Mithril equipment and Race Reset Scrolls.', '4 Silver Nuggets', 20],
    ['orichalcum-ingot', 'Orichalcum Ingot', 'A gold and Magisteel alloy used for Orichalcum equipment and Skill Reset Scrolls.', '4 Gold Nuggets', 20],
  ].map(([id, name, summary, metal, shards]) => entry(id, name, 'Materials', summary,
    'Melt the listed raw materials, then select the ingot in the Kiln. The recipe lists the raw inputs for one ingot.',
    'Blocks/Kiln', {
      recipes: [process('Kiln', [`${shards} Magic Ore Shards`, ...(metal ? [metal] : [])])],
      related: ['kiln', 'magic-ore-shard'],
    })),
  entry('pure-magisteel-nugget', 'Pure Magisteel Nugget', 'Materials', 'A smaller unit of Pure Magisteel used in recipes such as the Pure Magisteel Kunai.',
    'Melt Magic Ore Shards and cast the nugget at the Kiln, or use Great Sage’s Refining to process a Magic Ore Shard.',
    'Blocks/Kiln', {
      recipes: [process('Kiln', ['4 Magic Ore Shards']), process('Great Sage Refining', ['1 Magic Ore Shard'], 2)],
      related: ['magic-ore-shard', 'pure-magisteel-ingot', 'pure-magisteel-kunai'],
    }),
  entry('magic-stone', 'Magic Stone', 'Materials', 'A component in Element Cores, utility armor, warp items and reset scrolls.',
    'Learn the Low Magisteel Gear Schematic, then use the Smithing Bench.',
    'Magic_Stone', {
      recipes: [smith(['1 Low Magisteel Ingot', '8 Low Quality Magic Crystals'], lowGear)],
      related: ['low-magisteel-ingot', 'low-magic-crystal', 'element-core-empty'],
    }),
  entry('element-core-empty', 'Element Core (Empty)', 'Materials', 'Blank component for making an element-specific core.',
    'Craft it directly or make it at a Smithing Bench after learning the Low Magisteel Gear Schematic.',
    'Items/Misc', {
      recipes: [
        craft(['C · 8 Medium Quality Magic Crystals', 'M · 1 Magic Stone'], ['CCC', 'CMC', 'CCC']),
        smith(['8 Medium Quality Magic Crystals', '1 Magic Stone'], lowGear),
      ],
      related: ['magic-stone', 'medium-magic-crystal', 'warp-core'],
    }),
];

const consumables = [
  entry('hipokute-seeds', 'Hipokute Seeds', 'Consumables', 'Starts a renewable Hipokute crop on grass, dirt or farmland.',
    'Harvest Hipokute plants for seeds. In 1.21.1, the chunk’s magicule level determines the chance of growing Hipokute instead of wheat. At 4,500 magicules or above, a seed always starts as Hipokute.',
    hipokute, { related: ['hipokute-grass', 'hipokute-flower'] }),
  entry('hipokute-grass', 'Hipokute Grass', 'Consumables', 'A brewing reagent for Low and High Potions.',
    'Harvest Hipokute plants in the wild or grow them from Hipokute Seeds. Once a seed becomes small grass, it has an equal chance of maturing into grass or a flower.',
    'Hipokute_Grass', { related: ['hipokute-seeds', 'low-potion', 'high-potion'] }),
  entry('hipokute-flower', 'Hipokute Flower', 'Consumables', 'Brews High and Full Potions and can be traded to alchemist dwarves.',
    'Right-click a mature flowering plant to gather the flower and return it to its small-grass stage.',
    'Hipokute_Flower', { related: ['hipokute-seeds', 'high-potion', 'full-potion'] }),
  entry('magic-bottle', 'Magic Bottle', 'Consumables', 'An empty bottle for holding water before brewing Hipokute potions.',
    'Craft it with glass and a Magic Crystal. The wiki lists yields of 3, 6 or 9 bottles from Low, Medium or High Quality crystals respectively.',
    'Magic_Bottle', { related: ['low-magic-crystal', 'magic-bottle-of-water'] }),
  entry('magic-bottle-of-water', 'Magic Bottle of Water', 'Consumables', 'The base for Low and High Potions, or for making vacuumed water bottles.',
    'Use an empty Magic Bottle on a water source.',
    'Magic_Bottle_of_Water', { related: ['magic-bottle', 'vacuumed-magic-bottle', 'low-potion'] }),
  entry('vacuumed-magic-bottle', 'Vacuumed Magic Bottle of Water', 'Consumables', 'A processed brewing base for High and Full Potions.',
    'Cook a Magic Bottle of Water in a smoker or on a campfire.',
    'Vacuumed_Magic_Bottle_of_Water', {
      recipes: [process('Smoker or campfire', ['1 Magic Bottle of Water'])],
      related: ['magic-bottle-of-water', 'high-potion', 'full-potion'],
    }),
  entry('low-potion', 'Low Potion', 'Consumables', 'Restores 33% of maximum HP and 100 magicules.',
    'Brew Hipokute Grass into a Magic Bottle of Water.',
    'Low_Potion', {
      recipes: [process('Brewing Stand', ['1 Hipokute Grass', '1 Magic Bottle of Water'])],
      related: ['hipokute-grass', 'magic-bottle-of-water', 'high-potion'],
    }),
  entry('high-potion', 'High Potion', 'Consumables', 'Restores 66% of maximum HP and 1,000 magicules.',
    'Use a flower with regular magic water, or grass with vacuumed magic water. Great Sage’s Refining also has grass-and-bottle recipes.',
    'High_Potion', {
      recipes: [
        process('Brewing Stand', ['1 Hipokute Flower', '1 Magic Bottle of Water']),
        process('Brewing Stand', ['1 Hipokute Grass', '1 Vacuumed Magic Bottle of Water']),
        process('Great Sage Refining', ['1 Hipokute Grass', '1 Glass Bottle']),
      ],
      related: ['hipokute-flower', 'hipokute-grass', 'vacuumed-magic-bottle', 'full-potion'],
    }),
  entry('full-potion', 'Full Potion', 'Consumables', 'Restores 99% of maximum HP and 10,000 magicules.',
    'Brew a Hipokute Flower in vacuumed magic water, or use Great Sage’s Refining with a flower and a supported bottle.',
    'Full_Potion', {
      recipes: [
        process('Brewing Stand', ['1 Hipokute Flower', '1 Vacuumed Magic Bottle of Water']),
        process('Great Sage Refining', ['1 Hipokute Flower', '1 Glass Bottle']),
      ],
      related: ['hipokute-flower', 'vacuumed-magic-bottle', 'high-arcane-potion'],
    }),
  ...[
    ['low', 'Low', '5%', 'low-potion'],
    ['medium', 'Medium', '10%', 'high-potion'],
    ['high', 'High', '20%', 'full-potion'],
  ].map(([id, grade, portion, baseId]) => {
    const base = { low: 'Low Potion', medium: 'High Potion', high: 'Full Potion' }[id];
    return entry(`${id}-arcane-potion`, `${grade} Arcane Potion`, 'Consumables', `Restores ${portion} of maximum magicules.`,
      `Use Daemon Essence as a brewing ingredient with a ${base} as the base.`,
      'Items/Consumables', {
        recipes: [process('Brewing Stand', [`1 ${base}`, '1 Daemon Essence'])],
        related: [baseId, 'daemon-essence'],
      });
  }),
];

const gear = [
  entry('low-magisteel-sword', 'Low Magisteel Sword', 'Gear', 'A Magisteel weapon that gains gear EP through use in combat and evolves to High Magisteel at 18,000 gear EP.',
    'Learn the Low Magisteel Gear Schematic and forge it at the Smithing Bench.',
    gearEvolution, {
      recipes: [smith(['2 Low Magisteel Ingots', '1 Gold Ingot', '1 Stick'], lowGear)],
      related: ['low-magisteel-ingot', 'smithing-bench', 'schematics'],
    }),
  entry('pure-magisteel-kunai', 'Pure Magisteel Kunai', 'Gear', 'A throwing weapon made from Pure Magisteel and gold nuggets.',
    'Learn both the Kunai Schematic and Pure Magisteel Gear Schematic and forge it at a Smithing Bench.',
    'Blocks/Smithing_Bench', {
      recipes: [smith(['5 Pure Magisteel Nuggets', '2 Gold Nuggets'], 'Kunai Schematic and Pure Magisteel Gear Schematic')],
      related: ['pure-magisteel-nugget', 'smithing-bench'],
    }),
  entry('anti-magic-mask', 'Anti-Magic Mask', 'Gear', 'A helmet-slot mask that adds 0.5 to Presence Concealment while equipped.',
    'Learn the Anti-Magic Mask Schematic and forge it at the Smithing Bench.',
    'Anti-Magic_Mask', {
      recipes: [smith(['3 Pure Magisteel Ingots', '2 Clay Balls', '1 Red Dye'], 'Anti-Magic Mask Schematic')],
      related: ['smithing-bench', 'pure-magisteel-ingot', 'schematics'],
    }),
  entry('severer-blade', 'Severer Blade', 'Gear', 'A blade that also serves as a component for the Spatial Blade.',
    'Learn the Spatial Blade Schematic and use the Smithing Bench. Each craft yields three Severer Blades.',
    'Blocks/Smithing_Bench', {
      recipes: [smith(['2 Iron Ingots', '1 Ender Pearl'], spatialGear, 3)],
      related: ['spatial-blade', 'smithing-bench'],
    }),
  entry('spatial-blade', 'Spatial Blade', 'Gear', 'A specialized weapon built from a Severer Blade and High Magisteel.',
    'Learn the Spatial Blade Schematic and use the Smithing Bench.',
    'Blocks/Smithing_Bench', {
      recipes: [smith(['1 High Magisteel Ingot', '1 Stick', '1 Severer Blade'], spatialGear)],
      related: ['severer-blade', 'high-magisteel-ingot'],
    }),
  entry('staff-of-slime', 'Staff of Slime', 'Gear', 'A caster tool for storing and casting spells through the Spellbinding Table.',
    'Learn the High Magisteel Gear Schematic and Magic Staff Schematic, then forge it at a Smithing Bench.',
    'Caster_Tools_Tutorial', {
      recipes: [smith(['1 Slime Core', '1 High Magisteel Ingot', '1 Gold Ingot', '3 Sticks'], 'High Magisteel Gear Schematic and Magic Staff Schematic')],
      related: ['slime-core', 'high-magisteel-ingot', 'spellbinding-table'],
    }),
  entry('bat-glider', 'Bat Glider', 'Gear', 'A wearable glider made from Giant Bat Wings and Monster Leather.',
    'Learn the Monster Leather Gear Schematic and forge it at the Smithing Bench.',
    'Items/Armours', {
      recipes: [smith(['2 Giant Bat Wings', '2 Monster Leather (C)', '1 Magic Stone'], leatherGear)],
      related: ['giant-bat-wing', 'monster-leather-c', 'magic-stone'],
    }),
  entry('winged-shoes', 'Winged Shoes', 'Gear', 'Increases movement speed, step height and safe fall distance. Reduces gravity by 50% while equipped.',
    'Learn both the Monster Leather Gear Schematic and Low Magisteel Gear Schematic, then forge at a Smithing Bench.',
    'Items/Armours', {
      recipes: [smith(['4 Monster Leather (C)', '4 Dragon Peacock Feathers', '1 Magic Stone'], `${leatherGear} and ${lowGear}`)],
      related: ['dragon-peacock-feather', 'monster-leather-c', 'magic-stone'],
    }),
  ...[
    ['d', 'D', '2,500 gear EP to C'],
    ['c', 'C', '5,000 gear EP to B'],
    ['b', 'B', '8,000 gear EP to A'],
    ['a', 'A', '80,000 gear EP to Special A'],
    ['special-a', 'Special A', 'the top Monster Leather tier'],
  ].map(([id, tier, threshold]) => entry(`monster-leather-armor-${id}`, `Monster Leather Armor (${tier})`, 'Gear',
    `The ${tier} tier of evolving Monster Leather armor. Wear it while defeating mobs to build gear EP.`,
    `Learn the Monster Leather Gear Schematic and forge each piece with matching leather. This tier has ${threshold}.`,
    gearEvolution, {
      recipes: [
        smith([`5 Monster Leather (${tier}) for the helmet`, `8 for the chestplate`, '7 for the leggings', '4 for the boots'], leatherGear, null),
      ],
      related: [`monster-leather-${id}`, 'smithing-bench'],
    })),
];

const drops = [
  entry('daemon-essence', 'Daemon Essence', 'Mob Drops', 'Ingredient for Arcane Potions and an evolution material.',
    'Collect it from eligible Daemon drops. Some dwarf merchants also offer a randomized essence trade.',
    'Items/Mob_Drops', {
      related: ['low-arcane-potion', 'medium-arcane-potion', 'high-arcane-potion'],
      references: [{ label: 'Dwarf trades', url: wiki + 'Mobs/Dwarf' }],
    }),
  entry('slime-core', 'Slime Core', 'Mob Drops', 'A component in the Staff of Slime. Slimes can consume the core with Absorb & Dissolve to adjust their size.',
    'Look for Slime Core drops from modded Slimes. Some dwarf trades also buy cores for Gold Coins.',
    'Absorb_%26_Dissolve', { related: ['staff-of-slime'] }),
  entry('giant-bat-wing', 'Giant Bat Wing', 'Mob Drops', 'A crafting material for the Bat Glider.',
    'Hunt Giant Bats and collect their drops.',
    mobDrops, { related: ['bat-glider'] }),
  entry('dragon-peacock-feather', 'Dragon Peacock Feather', 'Mob Drops', 'A crafting material for Winged Shoes.',
    'Hunt Dragon Peacocks and collect their drops.',
    mobDrops, { related: ['winged-shoes'] }),
  entry('charybdis-scale', 'Charybdis Scale', 'Mob Drops', 'A boss material used to make Charybdis Scalemail.',
    'Defeat Charybdis. An active Charybdis Core summons the boss.',
    'Mobs/Charybdis', { related: ['charybdis-core', 'charybdis-scale-armor'] }),
  entry('charybdis-scale-armor', 'Charybdis Scalemail', 'Gear', 'An armor set forged with scales from Charybdis.',
    'Learn the Charybdis Scalemail Gear Schematic and use the Smithing Bench.',
    'Items/Armours', { related: ['charybdis-scale', 'charybdis-core', 'smithing-bench'] }),
  entry('inert-charybdis-core', 'Charybdis Core, Inert', 'Mob Drops', 'The core left by Charybdis can be used in the Gravity Manipulation and Magic Jamming acquisition routes.',
    'Defeat a summoned Charybdis. The Unique Skill Degenerate can use Synthesize on the inert core.',
    'Inert_Charybdis_Core', { related: ['charybdis-core', 'charybdis-scale'] }),
  ...[
    ['low', 'Low', 'An ingredient for Magic Stones.', 'Medium', 'magic-stone'],
    ['medium', 'Medium', 'An ingredient for empty Element Cores.', 'High', 'element-core-empty'],
    ['high', 'High', 'A high tier Magic Crystal that can be split into Medium Quality crystals.', '', 'medium-magic-crystal'],
  ].map(([id, quality, summary, from, related]) => entry(`${id}-magic-crystal`, `${quality} Quality Magic Crystal`, 'Mob Drops', summary,
    from ? `Find it as a mob drop, or split a ${from} Quality Magic Crystal at the Smithing Bench.` : 'Collect it from eligible mob drops.',
    mobDrops, {
      recipes: from ? [smith([`1 ${from} Quality Magic Crystal`], lowGear, 2)] : [],
      related: [related],
    })),
  ...['D', 'C', 'B', 'A', 'Special A'].map(tier => {
    const id = tier.toLowerCase().replace(' ', '-');
    return entry(`monster-leather-${id}`, `Monster Leather (${tier})`, 'Mob Drops',
      `A ${tier} tier material for matching Monster Leather armor and Coin Pouches.`,
      'Collect Monster Leather from mob drops. The version and mob determine which tier can drop.',
      mobDrops, { related: [`monster-leather-armor-${id}`] });
  }),
];

const progression = [
  entry('schematics', 'Smithing Schematics', 'Progression', 'Consumable unlocks for Smithing Bench recipes. Some recipes require both a tool and material schematic.',
    'Check loot chests, trader inventories and the material advancement paths. Use the item to learn its schematic, then open the Smithing Bench.',
    'Items/Schematics', { related: ['smithing-bench', 'pure-magisteel-kunai', 'race-reset-scroll'] }),
  entry('magic-tome', 'Magic Tome', 'Progression', 'A tome adds a spell to the Ability Menu so you can learn it.',
    'For the Reincarnation spell, search Wizard Tower chests for its Magic Tome.',
    'Reincarnation', { related: ['spellbinding-table', 'race-reset-scroll'] }),
  entry('coin-pouch', 'Coin Pouch', 'Progression', 'Stores coins. The five pouch tiers use the corresponding grade of Monster Leather.',
    'Use String above three pieces of matching Monster Leather. Since 2.0.1.3, Shulker Boxes and backpacks no longer accept pouches.',
    'Items/Misc', {
      recipes: [craft(['S · 1 String', 'L · 3 Monster Leather of the same grade'], [' S ', 'L L', ' L '])],
      related: ['monster-leather-d', 'monster-leather-a'],
      references: [{ label: '2.0.1.3 pouch change', url: previousRelease }],
    }),
  entry('charybdis-core', 'Charybdis Core', 'Progression', 'Charges from nearby mob kills and summons Charybdis when activated.',
    'Find the core room in a Charybdis Cave. Place the core near mobs and kill them within 16 blocks to charge it. Once it reaches 100,000 EP, use the active core to summon the boss.',
    'Charybdis_Core', { related: ['inert-charybdis-core', 'charybdis-scale'] }),
  entry('warp-core', 'Warp Core', 'Progression', 'The central ingredient in craftable Warp Pads.',
    'Craft it with a Magic Stone, Low Magisteel Ingots, Ender Pearls and Space Element Cores, or use the Smithing Bench after learning Low Magisteel gear.',
    'Warp_Core', {
      recipes: [
        craft(['E · 2 Ender Pearls', 'L · 4 Low Magisteel Ingots', 'C · 2 Element Cores (Space)', 'M · 1 Magic Stone'], ['ELC', 'LML', 'CLE']),
        smith(['2 Ender Pearls', '4 Low Magisteel Ingots', '2 Element Cores (Space)', '1 Magic Stone'], lowGear),
      ],
      related: ['warp-pad', 'magic-stone', 'low-magisteel-ingot'],
    }),
  entry('warp-pad', 'Warp Pads', 'Progression', 'A platform that you can save as a destination in the spatial movement menu.',
    'Find a ruined Warp Pad or craft a variant around a Warp Core. Sneak-use the pad after gaining a warp point limit of at least two.',
    'Blocks/Warp_Pad', {
      recipes: [craft(['S · 4 Stone', 'T · 4 Smooth Stone', 'C · 1 Warp Core'], ['STS', 'TCT', 'STS'])],
      note: 'The recipe shown makes the Stone Warp Pad. Other variants use different surrounding blocks.',
      related: ['warp-core'],
    }),
  entry('race-reset-scroll', 'Race Reset Scroll', 'Progression', 'Resets race and related character progression. Learned schematics carry over in 2.0.1.5.',
    'Craft it directly or at a Smithing Bench with the Mithril Gear Schematic.',
    resets, {
      recipes: [
        craft(['P · 4 Paper', 'M · 2 Mithril Ingots', 'L · 2 Monster Leather (A)', 'S · 1 Magic Stone'], ['PMP', 'LSL', 'PMP']),
        smith(['4 Paper', '2 Mithril Ingots', '2 Monster Leather (A)', '1 Magic Stone'], 'Mithril Gear Schematic'),
      ],
      related: ['mithril-ingot', 'magic-stone', 'character-reset-scroll'],
      references: [
        { label: '2.0.1.5 schematic change', url: itemRelease },
        { label: '2.0.1.3 reputation fix', url: previousRelease },
      ],
    }),
  entry('skill-reset-scroll', 'Skill Reset Scroll', 'Progression', 'Clears learned skills while preserving the intrinsic skills of your current race.',
    'Craft it directly or at a Smithing Bench with the Orichalcum Gear Schematic. A new Unique Skill can require its own unlock cost.',
    resets, {
      recipes: [
        craft(['P · 3 Paper', 'M · 1 Pure Magisteel Ingot', 'O · 2 Orichalcum Ingots', 'L · 2 Monster Leather (A)', 'S · 1 Magic Stone'], ['PMP', 'OSO', 'LPL']),
        smith(['3 Paper', '1 Pure Magisteel Ingot', '2 Orichalcum Ingots', '2 Monster Leather (A)', '1 Magic Stone'], 'Orichalcum Gear Schematic'),
      ],
      related: ['orichalcum-ingot', 'magic-stone', 'character-reset-scroll'],
    }),
  entry('character-reset-scroll', 'Character Reset Scroll', 'Progression', 'Resets the character so you can start reincarnation again.',
    'Craft it directly or at a Smithing Bench with the Pure Magisteel Gear Schematic.',
    resets, {
      recipes: [
        craft(['P · 3 Paper', 'M · 3 Pure Magisteel Ingots', 'L · 2 Monster Leather (A)', 'S · 1 Magic Stone'], ['PMP', 'MSM', 'LPL']),
        smith(['3 Paper', '3 Pure Magisteel Ingots', '2 Monster Leather (A)', '1 Magic Stone'], 'Pure Magisteel Gear Schematic'),
      ],
      related: ['pure-magisteel-ingot', 'race-reset-scroll', 'skill-reset-scroll'],
    }),
];

export const items = [
  ...workstations,
  ...minerals,
  ...consumables,
  ...gear,
  ...drops,
  ...progression,
];
