// Learning prerequisites and mastery unlocks verified against the NeoForge 2.0.1.5 release.
const necromancyAccess = 'Use the target spell’s tome or unlock learning through a necromancer race (Wight, Wight King, Spirit Skeleton, or Divine Skeleton).';

export const abilityRoutes = {
  magic: [
    {
      to: 'chain_explosion',
      from: ['explosion'],
      requirement: 'Master Explosion. Use the Chain Explosion tome or gain access as a Devil Lord.',
    },
    {
      to: 'demon_dominate',
      from: ['dominate'],
      requirement: 'Master Dominate. Use the Demon Dominate tome or gain access as a Devil Lord.',
    },
    {
      to: 'demon_marionette',
      from: ['demon_dominate'],
      requirement: 'Master Demon Dominate and use the Demon Marionette tome.',
    },
    {
      to: 'fire_ball',
      from: ['fire_aspectual'],
      requirement: 'Master Fire (Aspectual). Use the Fire Ball tome or gain access as an Arch Daemon.',
    },
    {
      to: 'full_recovery',
      from: ['recovery'],
      requirement: 'Master Recovery. Use the Full Recovery tome or gain access as a Daemon Lord.',
    },
    {
      to: 'healing_rain',
      from: ['healing'],
      requirement: 'Master Healing. Use the Healing Rain tome or gain access as an Arch Daemon.',
    },
    {
      to: 'ice_breaker',
      from: ['icicle_lance'],
      requirement: 'Master Icicle Lance. Use the Ice Breaker tome or gain access as a Daemon Lord.',
    },
    {
      to: 'icicle_rain',
      from: ['icicle_lance'],
      requirement: 'Master Icicle Lance. Use the Icicle Rain tome or gain access as a Daemon Lord.',
    },
    {
      to: 'recovery',
      from: ['healing'],
      requirement: 'Master Healing. Use the Recovery tome or gain access as an Arch Daemon.',
    },
    {
      to: 'reinforced_barrier',
      from: ['barrier', 'magic_barrier'],
      match: 'all',
      requirement: 'Master both Barrier and Magic Barrier. Use the Reinforced Barrier tome or gain access as a Daemon Lord.',
    },
    {
      to: 'thunder_orb',
      from: ['thunder'],
      requirement: 'Master Thunder. Use the Thunder Orb tome or gain access as an Arch Daemon.',
    },
    {
      to: 'thunder_rain',
      from: ['thunder'],
      requirement: 'Master Thunder. Use the Thunder Rain tome or gain access as a Daemon Lord.',
    },
    {
      to: 'tornado_blade',
      from: ['wind_cutter'],
      requirement: 'Master Wind Cutter. Use the Tornado Blade tome or gain access as an Arch Daemon.',
    },
    {
      to: 'create_greater_undead',
      from: ['create_lesser_undead'],
      requirement: `Master Create Lesser Undead. ${necromancyAccess}`,
    },
    {
      to: 'curse_bind',
      from: ['curse'],
      requirement: `Master Curse. ${necromancyAccess}`,
    },
  ],
  battlewill: [
    {
      to: 'eight_petals_flash',
      from: ['five_petals_thrust'],
      requirement: 'Master Five Petals Thrust to unlock learning.',
    },
    {
      to: 'heavy_slash',
      from: ['aura_slash'],
      requirement: 'Master Aura Slash to unlock learning.',
    },
    {
      to: 'death_march_dance',
      from: ['maximum_magic_bullet'],
      requirement: 'Master Maximum Magic Bullet to unlock learning.',
    },
    {
      to: 'maximum_magic_bullet',
      from: ['magic_bullet'],
      requirement: 'Master Magic Bullet to unlock learning.',
    },
    {
      to: 'ogre_sword_cannon',
      from: ['ogre_sword_guillotine'],
      requirement: 'Master Ogre-sword Guillotine to unlock learning.',
    },
    {
      to: 'haze',
      from: ['formhide'],
      requirement: 'Master Formhide to unlock learning.',
    },
  ],
};
