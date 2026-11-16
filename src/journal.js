export const wiki = 'https://tensura.wiki.gg/wiki/';
export const curseforge = 'https://www.curseforge.com/minecraft/mc-mods/tensura-reincarnated';

export const chapters = [
  {
    id: 'first-steps', name: 'First steps', icon: 'explore', summary: 'Choose a race, equip your first skill, and start earning EP.',
    steps: [
      ['Reincarnate', 'Choose a starting race. Your race sets your initial attributes, intrinsic skills, and evolution options. Default settings also grant a random Unique Skill.'],
      ['Equip an ability', 'Open the character menu with B by default. Choose a skill from its category and assign it to an open hotbar slot. Check your configured keybinds to cycle and use equipped skills.'],
      ['Earn Existence Points', 'Hunt mobs and check your status menu. The default EP reward is 3% of the defeated mob’s EP before modifiers. Spawner, vanilla, and player EP rewards can be adjusted by gamerules.'],
      ['Track an evolution', 'Open the Evolution Menu and select a form to inspect its requirements. Some forms need boss kills, item use, or another condition in addition to EP.']
    ],
    links: [['Getting Started', wiki + 'Getting_Started'], ['Reincarnation', wiki + 'Reincarnation'], ['Ability Usage', wiki + 'Mechanics/Ability_Usage']],
    actions: [['Evolution trees', 'evolution'], ['Skill library', 'skills'], ['Battlewill', 'battlewill']]
  },
  {
    id: 'awakening', name: 'Awakening', icon: 'local_fire_department', summary: 'Follow the True Hero or True Demon Lord path.',
    steps: [
      ['True Demon Lord · Seed', 'A Majin gains a Demon Lord Seed at 200,000 EP by default. Once seeded, defeat mobs with EP to collect souls. The documented default conversion is one soul per 2,000 EP.'],
      ['True Demon Lord · Harvest Festival', 'You can start awakening at 10,000 souls by default. At 20,000 souls the default gamerule triggers the festival automatically. Choose a safe location before starting, since the ritual limits movement and eventually puts you to sleep.'],
      ['True Hero · Hero Egg', 'An eligible non-Majin can obtain a Hero Egg with Greater Spirits of Fire, Water, Wind, Earth, and Space, plus Greater Light or Greater Darkness.'],
      ['True Hero · Hatch the Egg', 'Recover HP while under 25% of your maximum during a fight against an eligible boss. The boss must have at least 400,000 EP and be below 50% HP. Consult the wiki for the eligible boss list.']
    ],
    links: [['Awakening', wiki + 'Races/Awakening'], ['Gamerules', wiki + 'Config/Gamerules']],
    actions: [['Evolution trees', 'evolution']]
  },
  {
    id: 'exploration', name: 'Exploration & magic', icon: 'travel_explore', summary: 'Find the Labyrinth, reach Hell, and unlock spellcasting.',
    steps: [
      ['Labyrinth', 'Search the Ancient Forest for a Labyrinth Tree or a large tree marked by soul lanterns. A master Dwarf Cartographer can trade a Labyrinth Explorer Map. Use the portal to enter or leave.'],
      ['Hell', 'Enter through a Hell Gate in the Overworld. A master Dwarf Cartographer can sell a map to a gate. Find a gate in Hell for the return trip. High ambient Magicules in both dimensions can poison characters with low tolerance.'],
      ['Aspectual Magic', 'Look for spell tomes in Wizard Towers. Use a tome and open the ability menu to learn its spell. Grimoires and Magic Staves are additional casting tools.']
    ],
    links: [['Labyrinth Tree', wiki + 'Structures/Labyrinth_Tree'], ['Hell', wiki + 'Hell'], ['The Advent of Magic', curseforge]],
    actions: [['Magic', 'magic'], ['Item codex', 'items']]
  },
  {
    id: 'crafting', name: 'Materials & smithing', icon: 'construction', summary: 'Plan gear upgrades and find the stations involved.',
    steps: [
      ['Gather materials', 'Start looking for Magic Ore and Silver while exploring. Check the item codex for where each material comes from and which recipes use it.'],
      ['Use the Kiln', 'Use the Kiln for the Magisteel alloy chain. Recipes have specific quantities of material and flux, so check the recipe before gathering supplies.'],
      ['Use the Smithing Bench', 'The mod’s Smithing Bench handles gear evolution. Check the documented recipe for its equipment, material, and schematic requirements.']
    ],
    links: [['Kiln', wiki + 'Blocks/Kiln'], ['Smithing', wiki + 'Smithing']],
    actions: [['Item codex', 'items']]
  }
];
