import { battlewill } from './data/battlewill.js';
import { magic } from './data/magic.js';
import { abilityRoutes } from './data/ability-routes.js';

const wiki = 'https://tensura.wiki.gg/wiki/';
const release = 'https://www.curseforge.com/minecraft/mc-mods/tensura-reincarnated/files/9476869';

export const abilityCatalogs = {
  battlewill: {
    page: 'battlewill',
    title: 'Battlewill',
    icon: 'swords',
    entries: battlewill,
    routes: abilityRoutes.battlewill,
    defaultPath: 'magic_bullet',
    description: 'Look up Aura techniques, how to unlock them, and what changes with mastery.',
    contextNote: 'Battlewill normally uses Aura (AP). Manuals can teach a random technique, while some arts come from mastering another technique or meeting a special requirement.',
    guide: wiki + 'Category:Battlewill',
    guideLabel: 'Battlewill wiki index',
    release,
  },
  magic: {
    page: 'magic',
    title: 'Magic',
    icon: 'auto_fix_high',
    entries: magic,
    routes: abilityRoutes.magic,
    defaultPath: 'reinforced_barrier',
    description: 'Browse spells and summoning rituals by category, with costs, cast times, and unlock requirements.',
    contextNote: 'Magic typically uses Magicules (MP). Learn Aspectual spells from tomes or another documented source. Spiritual Magic and Summoning have their own prerequisites.',
    guide: wiki + 'Category:Magics',
    guideLabel: 'Magic wiki index',
    release,
  },
};
