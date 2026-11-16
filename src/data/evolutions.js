const wiki = 'https://tensura.wiki.gg/wiki/Races/';
export const evolutionRelease = 'https://www.curseforge.com/minecraft/mc-mods/tensura-reincarnated/files/9476869';
export const evolutionGuide = 'https://www.minecraft-guides.com/mod/tensura-reincarnated/wiki/evolution-system/';

const bossKills = 'Defeat four different bosses';
const divine = 2_000_000;
const awaken = 'Awaken as a True Demon Lord or True Hero';
const daemonConditions = ['Awaken', 'Receive a Name', 'Acquire a physical body'];

function form(id, name, parents = [], rules = {}) {
  return { id, name, parents, requirements: [], ...rules };
}

// Requirements are the defaults in the 2.0.1.5 NeoForge release. Cross-line
// evolutions use the same form ID and carry any source-specific requirements.
const forms = [
  form('slime', 'Slime', [], { skills: ['Absorb & Dissolve'], awakening: 'demon-slime' }),
  form('metal-slime', 'Metal Slime', ['slime'], { requirements: ['Consume 100 Magic Ore Shards'], notes: 'Use Absorb & Dissolve to consume Magic Ore Shards.' }),
  form('demon-slime', 'Demon Slime', ['slime', 'metal-slime'], { requirements: [awaken], skills: ['Infinite Regeneration', 'Universal Perception'], notes: 'Slime starts Majin, so its usual awakening route is True Demon Lord.' }),
  form('god-slime', 'God Slime', ['demon-slime'], { ep: divine }),

  form('human', 'Human', ['wight'], { requirements: ['Gain the Weakness effect', 'Eat an Enchanted Golden Apple while weakened'], awakening: 'human-saint', festival: 'enlightened-human', notes: 'A Wight cured into a Human retains its Majin status.' }),
  form('enlightened-human', 'Enlightened Human', ['human'], { ep: 100_000, awakening: 'human-saint' }),
  form('human-saint', 'Human Saint', ['enlightened-human'], { ep: 400_000, requirements: [bossKills], awakening: 'divine-human' }),
  form('divine-human', 'Divine Human', ['human-saint'], { ep: divine }),

  form('elf', 'Elf', [], { awakening: 'elf-saint', festival: 'enlightened-elf' }),
  form('enlightened-elf', 'Enlightened Elf', ['elf'], { ep: 100_000, awakening: 'elf-saint' }),
  form('elf-saint', 'Elf Saint', ['enlightened-elf'], { ep: 400_000, requirements: [bossKills], awakening: 'divine-elf' }),
  form('divine-elf', 'Divine Elf', ['elf-saint'], { ep: divine }),

  form('dwarf', 'Dwarf', [], { awakening: 'dwarf-saint', festival: 'enlightened-dwarf' }),
  form('enlightened-dwarf', 'Enlightened Dwarf', ['dwarf'], { ep: 100_000, awakening: 'dwarf-saint' }),
  form('dwarf-saint', 'Dwarf Saint', ['enlightened-dwarf'], { ep: 400_000, requirements: [bossKills], awakening: 'divine-dwarf' }),
  form('divine-dwarf', 'Divine Dwarf', ['dwarf-saint'], { ep: divine }),

  form('merfolk', 'Merfolk', [], { awakening: 'merfolk-saint', festival: 'enlightened-merfolk' }),
  form('enlightened-merfolk', 'Enlightened Merfolk', ['merfolk'], { ep: 100_000, awakening: 'merfolk-saint' }),
  form('merfolk-saint', 'Merfolk Saint', ['enlightened-merfolk'], { ep: 400_000, requirements: [bossKills], awakening: 'divine-fish' }),
  form('divine-fish', 'Divine Fish', ['merfolk-saint'], { ep: divine }),

  form('beastfolk', 'Beastfolk', [], { awakening: 'spirit-beast', festival: 'beast-lord' }),
  form('beast-lord', 'Beast Lord', ['beastfolk'], { ep: 100_000, awakening: 'spirit-beast' }),
  form('spirit-beast', 'Spirit Beast', ['beast-lord'], { ep: 400_000, requirements: [bossKills], awakening: 'divine-beast' }),
  form('divine-beast', 'Divine Beast', ['spirit-beast'], { ep: divine }),

  form('harpy', 'Harpy', [], { awakening: 'spirit-bird', festival: 'harpy-queen' }),
  form('harpy-queen', 'Harpy Queen', ['harpy'], { ep: 200_000, awakening: 'spirit-bird' }),
  form('spirit-bird', 'Spirit Bird', ['harpy-queen'], { ep: 800_000, awakening: 'divine-bird' }),
  form('divine-bird', 'Divine Bird', ['spirit-bird'], { ep: divine }),

  form('goblin', 'Goblin', [], { awakening: 'hobgoblin-saint', festival: 'hobgoblin' }),
  form('hobgoblin', 'Hobgoblin', ['goblin'], { ep: 2_000, awakening: 'hobgoblin-saint', festival: 'enlightened-hobgoblin' }),
  form('enlightened-hobgoblin', 'Enlightened Hobgoblin', ['hobgoblin'], { ep: 100_000, awakening: 'hobgoblin-saint' }),
  form('hobgoblin-saint', 'Hobgoblin Saint', ['enlightened-hobgoblin'], { ep: 400_000, requirements: [bossKills], awakening: 'divine-oni' }),

  form('ogre', 'Ogre', ['hobgoblin'], { requirements: ['Complete the Elemental Colossus test'], awakening: 'spirit-oni', festival: 'kijin', notes: 'The Elemental Colossus guards the entrance to the Labyrinth.' }),
  form('enlightened-ogre', 'Enlightened Ogre', ['ogre'], { ep: 100_000, awakening: 'spirit-oni', festival: 'mystic-oni' }),
  form('kijin', 'Kijin', ['ogre'], { requirements: ['Contract one Spirit'], awakening: 'spirit-oni', festival: 'mystic-oni', notes: 'Pray at the spirit platform in the Labyrinth.' }),
  form('mystic-oni', 'Mystic Oni', ['enlightened-ogre', 'kijin'], { requirements: ['Consume 10 Elemental Essence'], awakening: 'spirit-oni' }),
  form('wicked-oni', 'Wicked Oni', ['enlightened-ogre', 'kijin'], { requirements: ['Consume 10 Daemon Essence'], awakening: 'spirit-oni', notes: 'This form changes your alignment to Majin.' }),
  form('spirit-oni', 'Spirit Oni', ['mystic-oni'], { ep: 400_000, awakening: 'divine-oni' }),
  form('death-oni', 'Death Oni', ['wicked-oni'], { ep: 400_000, awakening: 'divine-fighter' }),
  form('divine-oni', 'Divine Oni', ['hobgoblin-saint', 'spirit-oni', 'death-oni'], { ep: divine, skills: ['Divine Ki Release'], notes: 'Alignment is Majin from Death Oni and Holy from the other paths.' }),
  form('divine-fighter', 'Divine Fighter', ['death-oni'], { ep: divine }),

  form('lizardman', 'Lizardman', [], { skills: ['Scale Armor'], awakening: 'true-dragonewt', festival: 'dragonewt' }),
  form('dragonewt', 'Dragonewt', ['lizardman'], { requirements: ['Consume 10 Dragon Essence'], awakening: 'true-dragonewt' }),
  form('true-dragonewt', 'True Dragonewt', ['dragonewt'], { ep: 800_000 }),
  form('divine-dragon', 'Divine Dragon', ['true-dragonewt'], { ep: divine }),

  form('orc', 'Orc', [], { awakening: 'spirit-boar', festival: 'high-orc' }),
  form('high-orc', 'High Orc', ['orc'], { ep: 5_000, awakening: 'spirit-boar' }),
  form('orc-lord', 'Orc Lord', ['high-orc'], { requirements: ['Consume 10 Royal Blood'], skills: ['Starved'], awakening: 'spirit-boar', festival: 'orc-disaster' }),
  form('orc-disaster', 'Orc Disaster', ['orc-lord'], { ep: 200_000, requirements: ['Master Starved'], awakening: 'spirit-boar' }),
  form('spirit-boar', 'Spirit Boar', ['high-orc', 'orc-disaster'], { ep: 400_000, awakening: 'divine-boar' }),
  form('divine-boar', 'Divine Boar', ['spirit-boar'], { ep: divine, skills: ['Divine Ki Release'] }),

  form('wight', 'Wight', [], { skills: ['Physical Attack Resistance', 'Pain Nullification'], awakening: 'spirit-skeleton', festival: 'wight-king' }),
  form('wight-king', 'Wight King', ['wight'], { ep: 200_000, awakening: 'spirit-skeleton' }),
  form('spirit-skeleton', 'Spirit Skeleton', ['wight-king'], { ep: 800_000, awakening: 'divine-skeleton' }),
  form('divine-skeleton', 'Divine Skeleton', ['spirit-skeleton'], { ep: divine }),

  form('ghoul', 'Ghoul', [], { awakening: 'vampire-lord', festival: 'vampire' }),
  form('vampire', 'Vampire', ['human', 'ghoul'], { requirementsFrom: { human: ['Consume five Zane Blood'], ghoul: ['Consume one Zane Blood'] }, awakening: 'vampire-lord' }),
  form('vampire-overcomer', 'Vampire Overcomer', ['vampire'], { ep: 150_000, awakening: 'vampire-lord' }),
  form('vampire-lord', 'Vampire Lord', ['vampire-overcomer'], { ep: 400_000, awakening: 'divine-vampire' }),
  form('divine-vampire', 'Divine Vampire', ['vampire-lord'], { ep: divine }),

  form('daemon', 'Lesser Daemon', [], { awakening: 'arch-daemon', festival: 'greater-daemon' }),
  form('greater-daemon', 'Greater Daemon', ['daemon'], { ep: 20_000, awakening: 'arch-daemon', festival: 'arch-daemon' }),
  form('arch-daemon', 'Arch Daemon', ['greater-daemon'], { ep: 140_000 }),
  form('daemon-lord', 'Daemon Lord', ['arch-daemon'], { requirements: daemonConditions, requiredCount: 2, notes: 'Complete any two of these three conditions.' }),
  form('devil-lord', 'Devil Lord', ['daemon-lord'], { requirements: daemonConditions, notes: 'This evolution needs all three conditions.' }),

  form('giant', 'Giant', [], { skills: ['Giantification', 'Steel Strength'], awakening: 'ancient-giant', festival: 'ancient-giant' }),
  form('ancient-giant', 'Ancient Giant', ['giant'], { ep: 300_000, requirements: ['Carry 20 Ancient Debris'], notes: 'The evolution consumes the Ancient Debris.', awakening: 'divine-giant' }),
  form('divine-giant', 'Divine Giant', ['ancient-giant'], { ep: divine }),
];

function lineage(id, group, summary) {
  const start = forms.find((node) => node.id === id);
  const visible = new Set([id]);
  const nodes = [{ ...start, parents: [], requirements: [], notes: undefined }];

  // The source list groups species by line. Walk until all reachable cross-line
  // descendants have been added, then keep only the parents visible in this tree.
  let count = 0;
  while (visible.size !== count) {
    count = visible.size;
    for (const node of forms) {
      if (node.parents.some((parent) => visible.has(parent))) visible.add(node.id);
    }
  }
  for (const node of forms) {
    if (node.id === id || !visible.has(node.id)) continue;
    const parents = node.parents.filter((parent) => visible.has(parent));
    nodes.push({ ...node, parents, requirements: node.requirementsFrom?.[parents[0]] ?? node.requirements });
  }

  return { id, name: start.name, group, summary, source: wiki + start.name.replaceAll(' ', '_'), nodes };
}

export const evolutions = [
  lineage('slime', 'Majin', 'Absorb Magic Ore for the Metal Slime branch, or awaken to become a Demon Slime.'),
  lineage('human', 'Default', 'Follow the Saint line or use Zane Blood to branch into the Vampire line.'),
  lineage('elf', 'Default', 'Defeat four distinct bosses on your way from Enlightened Elf to Elf Saint.'),
  lineage('dwarf', 'Default', 'Earn EP and defeat four distinct bosses on the path to Divine Dwarf.'),
  lineage('merfolk', 'Default', 'The Saint line ends in Divine Fish. Its middle evolution requires four distinct boss kills.'),
  lineage('beastfolk', 'Default', 'Advance from Beast Lord to Spirit Beast, then reach Divine Beast at two million EP.'),
  lineage('harpy', 'Majin', 'Each step from Harpy Queen through Divine Bird is gated by EP.'),
  lineage('goblin', 'Default', 'Hobgoblins can pursue Sainthood or join the Ogre line through the Elemental Colossus test.'),
  lineage('lizardman', 'Default', 'Consume Dragon Essence to become a Dragonewt, then build EP for the last two forms.'),
  lineage('ogre', 'Default', 'Choose between a Spirit contract and Enlightenment, followed by Elemental or Daemon Essence.'),
  lineage('orc', 'Default', 'Take the direct Spirit Boar route or use Royal Blood and master Starved on the Orc Disaster route.'),
  lineage('wight', 'Majin', 'Advance along the Skeleton line, or cure the Wight and continue as a Human.'),
  lineage('ghoul', 'Majin', 'One Zane Blood starts the Vampire line. Later forms require EP.'),
  lineage('daemon', 'Majin', 'Build EP through Arch Daemon, then pursue a Name, a body, and awakening.'),
  lineage('giant', 'Majin', 'Bring Ancient Debris to the first evolution, then aim for Divine Giant.'),
];
