// Registered spells and default progression for Tensura: Reincarnated 2.0.1.5 (Minecraft 1.21.1).
// Names, icons, mastery thresholds, loot pools, and learning gates are checked against the NeoForge release.
export const magic = [
  {
    "id": "acid_shell",
    "name": "Acid Shell",
    "type": "Aspectual",
    "school": "Water",
    "summary": "Shoots a ball of corrosive acid toward targets.",
    "masteryTarget": 700,
    "castTime": "80 ticks",
    "cost": 38000,
    "acquisition": "Use a spell tome. Rare tome from Frozen Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Acid_Shell",
    "icon": "public/magic/aspectual/acid_shell.png"
  },
  {
    "id": "agility",
    "name": "Agility",
    "type": "Aspectual",
    "school": "Enhancement",
    "summary": "Greatly enhance the caster's movement speed.",
    "masteryTarget": 300,
    "castTime": "100 ticks",
    "cost": 3000,
    "acquisition": "Use a spell tome. Common tome from Rotted Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Agility",
    "icon": "public/magic/aspectual/agility.png"
  },
  {
    "id": "airflow_shut",
    "name": "Airflow Shut",
    "type": "Aspectual",
    "school": "Wind",
    "summary": "Drain out all the air surrounding the targets and suffocate them.",
    "masteryTarget": 300,
    "castTime": "100 ticks",
    "cost": 3000,
    "acquisition": "Use a spell tome. Uncommon tome from Ruined Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Medium Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Airflow_Shut",
    "icon": "public/magic/aspectual/airflow_shut.png"
  },
  {
    "id": "analyze",
    "name": "Analyze",
    "type": "Aspectual",
    "school": "Utility",
    "summary": "Analyze targets' status and power.",
    "masteryTarget": 100,
    "castTime": "40 ticks",
    "cost": 50,
    "acquisition": "Use a spell tome. Uncommon tome from Burnt Wizard Towers.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Low Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Analyze",
    "icon": "public/magic/aspectual/analyze.png"
  },
  {
    "id": "anti_magic_area",
    "name": "Anti-Magic Area",
    "type": "Aspectual",
    "school": "Barrier",
    "summary": "Creates a zone around the user that limits all Aspectual and Summoning Magics.",
    "masteryTarget": 700,
    "masteryTip": "Mastery expands the radius and reduces the cooldown.",
    "castTime": "220 ticks",
    "cost": 20000,
    "acquisition": "Use a spell tome. Rare tome from Buried Wizard Towers. Also available to Devil Lord as racial magic.",
    "learningTarget": 100,
    "details": [
      "Suppresses new Aspectual and Summoning casts in its area. Spiritual Magic and existing spell effects continue to work."
    ],
    "source": "https://tensura.wiki.gg/wiki/Anti-Magic_Area",
    "icon": "public/magic/aspectual/anti_magic_area.png"
  },
  {
    "id": "anti_shock_area",
    "name": "Anti-Shock Area",
    "type": "Aspectual",
    "school": "Barrier",
    "summary": "Creates a zone around the user that limits all physical damage taken.",
    "masteryTarget": 700,
    "castTime": "220 ticks",
    "cost": 15000,
    "acquisition": "Use a spell tome. Rare tome from Buried Wizard Towers. Also available to Devil Lord as racial magic.",
    "learningTarget": 100,
    "details": [
      "The field applies around the caster to reduce physical damage."
    ],
    "source": "https://tensura.wiki.gg/wiki/Anti-Shock_Area",
    "icon": "public/magic/aspectual/anti_shock_area.png"
  },
  {
    "id": "antidote",
    "name": "Antidote",
    "type": "Aspectual",
    "school": "Recovery",
    "summary": "Recover a living being from nausea, poison and weakness.",
    "masteryTarget": 300,
    "castTime": "120 ticks",
    "cost": 2500,
    "acquisition": "Use a spell tome. Uncommon tome from Frozen Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Antidote",
    "icon": "public/magic/aspectual/antidote.png"
  },
  {
    "id": "barrier",
    "name": "Barrier",
    "type": "Aspectual",
    "school": "Barrier",
    "summary": "Coat the caster with a Physical Barrier with the strength based on Health.",
    "masteryTarget": 300,
    "castTime": "160 ticks",
    "cost": "2,000 MP or 1/20th max MP, whichever is higher",
    "acquisition": "Use a spell tome. Rare tome from Buried Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Barrier",
    "icon": "public/magic/aspectual/barrier.png"
  },
  {
    "id": "burden",
    "name": "Burden",
    "type": "Aspectual",
    "school": "Gravity",
    "summary": "Shoot energy projectiles that increase the target's gravity.",
    "masteryTarget": 100,
    "castTime": "80 ticks",
    "cost": 50,
    "acquisition": "Use a spell tome. Uncommon tome from Buried Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Burden",
    "icon": "public/magic/aspectual/burden.png"
  },
  {
    "id": "chain_explosion",
    "name": "Chain Explosion",
    "type": "Aspectual",
    "school": "Explosion",
    "summary": "Summon a sequence of explosion that detonates in a chain around targets.",
    "masteryTarget": 1500,
    "castTime": "140 ticks",
    "cost": 80000,
    "acquisition": "Use a spell tome. Epic tome from any Wizard Tower. Also available to Devil Lord as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Explosion."
    ],
    "requires": [
      "explosion"
    ],
    "source": "https://tensura.wiki.gg/wiki/Chain_Explosion",
    "icon": "public/magic/aspectual/chain_explosion.png"
  },
  {
    "id": "clairvoyance",
    "name": "Clairvoyance",
    "type": "Aspectual",
    "school": "Utility",
    "summary": "Increase the caster's eye sight.",
    "masteryTarget": 100,
    "castTime": "20 ticks",
    "cost": 10,
    "acquisition": "Use a spell tome. Uncommon tome from Burnt Wizard Towers.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Low Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Clairvoyance",
    "icon": "public/magic/aspectual/clairvoyance.png"
  },
  {
    "id": "confusion",
    "name": "Confusion",
    "type": "Aspectual",
    "school": "Illusion",
    "summary": "Apply vision confusion to surrounding targets.",
    "masteryTarget": 300,
    "castTime": "100 ticks",
    "cost": 2000,
    "acquisition": "Use a spell tome. Rare tome from Rotted Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Confusion",
    "icon": "public/magic/aspectual/confusion.png"
  },
  {
    "id": "demon_dominate",
    "name": "Demon Dominate",
    "type": "Aspectual",
    "school": "Mental",
    "summary": "Dominate over any targets up to the Calamity level.",
    "masteryTarget": 1500,
    "castTime": "100 ticks",
    "cost": 100000,
    "acquisition": "Use a spell tome. Rare tome from Buried Wizard Towers, Rare tome from Burnt Wizard Towers, Rare tome from Frozen Wizard Towers, Rare tome from Rotted Wizard Towers or Rare tome from Ruined Wizard Towers. Also available to Devil Lord as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Dominate."
    ],
    "requires": [
      "dominate"
    ],
    "source": "https://tensura.wiki.gg/wiki/Demon_Dominate",
    "icon": "public/magic/aspectual/demon_dominate.png"
  },
  {
    "id": "demon_marionette",
    "name": "Demon Marionette",
    "type": "Aspectual",
    "school": "Mental",
    "summary": "Dominate over any targets even at the Disaster level.",
    "masteryTarget": 1500,
    "castTime": "200 ticks",
    "cost": 200000,
    "acquisition": "Use a spell tome. Epic tome from any Wizard Tower.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Demon Dominate."
    ],
    "requires": [
      "demon_dominate"
    ],
    "source": "https://tensura.wiki.gg/wiki/Demon_Marionette",
    "icon": "public/magic/aspectual/demon_marionette.png"
  },
  {
    "id": "dimension_cutter",
    "name": "Dimension Cutter",
    "type": "Aspectual",
    "school": "Space",
    "summary": "Tear space to send forward a blade of dimension rift.",
    "masteryTarget": 700,
    "castTime": "120 ticks",
    "cost": 20000,
    "acquisition": "Use a spell tome. Rare tome from Ruined Wizard Towers. Also available to Daemon Lord as racial magic.",
    "learningTarget": 100,
    "details": [
      "Launches a rift that travels forward through space.",
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Dimensional_Cutter",
    "icon": "public/magic/aspectual/dimension_cutter.png"
  },
  {
    "id": "dominate",
    "name": "Dominate",
    "type": "Aspectual",
    "school": "Mental",
    "summary": "Dominate over any low-leveled targets.",
    "masteryTarget": 300,
    "castTime": "100 ticks",
    "cost": 10000,
    "acquisition": "Use a spell tome. Rare tome from Buried Wizard Towers, Rare tome from Burnt Wizard Towers, Rare tome from Frozen Wizard Towers, Rare tome from Ruined Wizard Towers or Uncommon tome from Rotted Wizard Towers. Also available to Daemon Lord as racial magic.",
    "learningTarget": 100,
    "source": "https://tensura.wiki.gg/wiki/Dominate",
    "icon": "public/magic/aspectual/dominate.png"
  },
  {
    "id": "doppelganger",
    "name": "Doppelganger",
    "type": "Aspectual",
    "school": "Utility",
    "summary": "Use percentages of the user's magical power to create identical clones around them.",
    "masteryTarget": 300,
    "masteryTip": "Base chant drops to 80 ticks after mastery.",
    "castTime": "100 ticks",
    "cost": "10% of Max MP",
    "acquisition": "Use a spell tome. Rare tome from Burnt Wizard Towers.",
    "learningTarget": 100,
    "source": "https://tensura.wiki.gg/wiki/Doppelganger",
    "icon": "public/magic/aspectual/doppelganger.png"
  },
  {
    "id": "drainage",
    "name": "Drainage",
    "type": "Aspectual",
    "school": "Water",
    "summary": "Drain the water around the caster.",
    "masteryTarget": 100,
    "castTime": "40 ticks",
    "cost": 20,
    "acquisition": "Use a spell tome. Common tome from Frozen Wizard Towers. Also available to Lesser Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Drainage",
    "icon": "public/magic/aspectual/drainage.png"
  },
  {
    "id": "earth_lock",
    "name": "Earth Lock",
    "type": "Aspectual",
    "school": "Earth",
    "summary": "Solidify the earth where the caster desires.",
    "masteryTarget": 100,
    "castTime": "40 ticks",
    "cost": 100,
    "acquisition": "Use a spell tome. Common tome from Buried Wizard Towers. Also available to Lesser Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Earth_Lock",
    "icon": "public/magic/aspectual/earth_lock.png"
  },
  {
    "id": "earth_wall",
    "name": "Earth Wall",
    "type": "Aspectual",
    "school": "Earth",
    "summary": "Call forth giant earth walls from the ground.",
    "masteryTarget": 100,
    "masteryTip": "Base chant drops to 20 ticks after mastery.",
    "castTime": "40 ticks",
    "cost": 1000,
    "acquisition": "Use a spell tome. Common tome from Buried Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Earth_Wall",
    "icon": "public/magic/aspectual/earth_wall.png"
  },
  {
    "id": "escape",
    "name": "Escape",
    "type": "Aspectual",
    "school": "Space",
    "summary": "Connect two points in space to create a escape route.",
    "masteryTarget": 100,
    "castTime": "100 ticks",
    "cost": 800,
    "acquisition": "Use a spell tome. Common tome from Ruined Wizard Towers. Also available to Lesser Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Medium Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Escape",
    "icon": "public/magic/aspectual/escape.png"
  },
  {
    "id": "explosion",
    "name": "Explosion",
    "type": "Aspectual",
    "school": "Explosion",
    "summary": "Summon a single beam of light, that detonates at the target, creating a devastating blast of pure magical power.",
    "masteryTarget": 1500,
    "castTime": "50 ticks",
    "cost": 10000,
    "acquisition": "Use a spell tome. Epic tome from any Wizard Tower. Also available to Daemon Lord as racial magic.",
    "learningTarget": 100,
    "source": "https://tensura.wiki.gg/wiki/Explosion",
    "icon": "public/magic/aspectual/explosion.png"
  },
  {
    "id": "fire_aspectual",
    "name": "Fire",
    "type": "Aspectual",
    "school": "Fire",
    "summary": "Shoot magic fiery projectiles.",
    "masteryTarget": 100,
    "masteryTip": "Base chant drops to 20 ticks after mastery.",
    "castTime": "40 ticks",
    "cost": 150,
    "acquisition": "Use a spell tome. Common tome from Burnt Wizard Towers. Also available to Lesser Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Fire_(Aspectual)",
    "icon": "public/magic/aspectual/fire_aspectual.png"
  },
  {
    "id": "fire_ball",
    "name": "Fire Ball",
    "type": "Aspectual",
    "school": "Fire",
    "summary": "Shoot concentrated balls of fire.",
    "masteryTarget": 700,
    "masteryTip": "A standard cast becomes faster. The charged cast gains damage and blast radius.",
    "castTime": "60 ticks",
    "cost": "30,000 MP normal / 50,000 MP charged",
    "acquisition": "Use a spell tome. Rare tome from Burnt Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Fire (Aspectual)."
    ],
    "requires": [
      "fire_aspectual"
    ],
    "details": [
      "An exploding fire projectile. Once mastered, hold a full 60 ticks to charge the larger explosion.",
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Fire_Ball",
    "icon": "public/magic/aspectual/fire_ball.png"
  },
  {
    "id": "fire_lance",
    "name": "Fire Lance",
    "type": "Aspectual",
    "school": "Fire",
    "summary": "Shoot fiery lances of magic.",
    "masteryTarget": 100,
    "castTime": "50 ticks",
    "cost": 1000,
    "acquisition": "Use a spell tome. Common tome from Burnt Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Medium Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Fire_Lance",
    "icon": "public/magic/aspectual/fire_lance.png"
  },
  {
    "id": "fire_storm",
    "name": "Fire Storm",
    "type": "Aspectual",
    "school": "Fire",
    "summary": "Call forth fiery surges of flame to incinerate targets.",
    "masteryTarget": 700,
    "castTime": "100 ticks",
    "cost": 10000,
    "acquisition": "Use a spell tome. Uncommon tome from Burnt Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Fire_Storm",
    "icon": "public/magic/aspectual/fire_storm.png"
  },
  {
    "id": "fire_wall",
    "name": "Fire Wall",
    "type": "Aspectual",
    "school": "Fire",
    "summary": "Create a wall of fire to keep targets away.",
    "masteryTarget": 300,
    "castTime": "60 ticks",
    "cost": 5000,
    "acquisition": "Use a spell tome. Common tome from Burnt Wizard Towers or Uncommon tome from Burnt Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Fire_Wall",
    "icon": "public/magic/aspectual/fire_wall.png"
  },
  {
    "id": "flame_wall",
    "name": "Flame Wall",
    "type": "Aspectual",
    "school": "Illusion",
    "summary": "Create a wall of illusional fire to keep targets away.",
    "masteryTarget": 300,
    "castTime": "60 ticks",
    "cost": 1000,
    "acquisition": "Use a spell tome. Rare tome from Rotted Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Flame_Wall",
    "icon": "public/magic/aspectual/flame_wall.png"
  },
  {
    "id": "flight",
    "name": "Flight",
    "type": "Aspectual",
    "school": "Utility",
    "summary": "Propel the caster forward in the air.",
    "masteryTarget": 100,
    "castTime": "60 ticks",
    "cost": 500,
    "acquisition": "Use a spell tome. Rare tome from Burnt Wizard Towers.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Low Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Flight",
    "icon": "public/magic/aspectual/flight.png"
  },
  {
    "id": "float",
    "name": "Float",
    "type": "Aspectual",
    "school": "Gravity",
    "summary": "Decrease the caster's gravity to float.",
    "masteryTarget": 100,
    "castTime": "40 ticks",
    "cost": 100,
    "acquisition": "Use a spell tome. Uncommon tome from Buried Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Float",
    "icon": "public/magic/aspectual/float.png"
  },
  {
    "id": "freeze",
    "name": "Freeze",
    "type": "Aspectual",
    "school": "Ice",
    "summary": "Solidify water sources into ice.",
    "masteryTarget": 100,
    "castTime": "10 ticks",
    "cost": 100,
    "acquisition": "Use a Magic Tome bound to this spell. Also available to Lesser Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Freeze",
    "icon": "public/magic/aspectual/freeze.png"
  },
  {
    "id": "full_recovery",
    "name": "Full Recovery",
    "type": "Aspectual",
    "school": "Recovery",
    "summary": "Recover a living being's health and food points to the maximum as well as Absorption.",
    "masteryTarget": 700,
    "masteryTip": "Base chant drops to 80 ticks after mastery.",
    "castTime": "120 ticks",
    "cost": 30000,
    "acquisition": "Use a spell tome. Rare tome from Frozen Wizard Towers. Also available to Daemon Lord as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Recovery."
    ],
    "requires": [
      "recovery"
    ],
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Expert High Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Full_Recovery",
    "icon": "public/magic/aspectual/full_recovery.png"
  },
  {
    "id": "healing",
    "name": "Healing",
    "type": "Aspectual",
    "school": "Recovery",
    "summary": "Heal a living being on a low level.",
    "masteryTarget": 300,
    "masteryTip": "Base chant drops to 30 ticks after mastery.",
    "castTime": "60 ticks",
    "cost": 1000,
    "acquisition": "Use a spell tome. Uncommon tome from Frozen Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Low Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Healing",
    "icon": "public/magic/aspectual/healing.png"
  },
  {
    "id": "healing_rain",
    "name": "Healing Rain",
    "type": "Aspectual",
    "school": "Recovery",
    "summary": "Call forth a rain of healing in a wide radius.",
    "masteryTarget": 300,
    "castTime": "100 ticks",
    "cost": 5000,
    "acquisition": "Use a spell tome. Rare tome from Frozen Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Healing."
    ],
    "requires": [
      "healing"
    ],
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Healing_Rain",
    "icon": "public/magic/aspectual/healing_rain.png"
  },
  {
    "id": "healthcare",
    "name": "Healthcare",
    "type": "Aspectual",
    "school": "Utility",
    "summary": "Boost the caster's health and saturation.",
    "masteryTarget": 100,
    "castTime": "100 ticks",
    "cost": 100,
    "acquisition": "Use a spell tome. Uncommon tome from Burnt Wizard Towers.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Low Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Healthcare",
    "icon": "public/magic/aspectual/healthcare.png"
  },
  {
    "id": "hypnos",
    "name": "Hypnos",
    "type": "Aspectual",
    "school": "Mental",
    "summary": "Put even the strongest entities into sleep.",
    "masteryTarget": 1500,
    "masteryTip": "Base chant drops to 120 ticks after mastery.",
    "castTime": "180 ticks",
    "cost": 50000,
    "acquisition": "Use a spell tome. Epic tome from any Wizard Tower.",
    "learningTarget": 100,
    "source": "https://tensura.wiki.gg/wiki/Hypnos",
    "icon": "public/magic/aspectual/hypnos.png"
  },
  {
    "id": "ice_blizzard",
    "name": "Ice Blizzard",
    "type": "Aspectual",
    "school": "Ice",
    "summary": "Create a powerful storm of snow to freeze your enemies.",
    "masteryTarget": 700,
    "castTime": "160 ticks",
    "cost": 30000,
    "acquisition": "Use a spell tome. Uncommon tome from Frozen Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Ice_Blizzard",
    "icon": "public/magic/aspectual/ice_blizzard.png"
  },
  {
    "id": "ice_breaker",
    "name": "Ice Breaker",
    "type": "Aspectual",
    "school": "Ice",
    "summary": "Shoot a giant icicle spear toward targets.",
    "masteryTarget": 1500,
    "castTime": "100 ticks",
    "cost": 70000,
    "acquisition": "Use a spell tome. Rare tome from Frozen Wizard Towers. Also available to Daemon Lord as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Icicle Lance."
    ],
    "requires": [
      "icicle_lance"
    ],
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Ice_Breaker",
    "icon": "public/magic/aspectual/ice_breaker.png"
  },
  {
    "id": "ice_wall",
    "name": "Ice Wall",
    "type": "Aspectual",
    "school": "Ice",
    "summary": "Call forth walls of ice upon targets.",
    "masteryTarget": 300,
    "castTime": "60 ticks",
    "cost": 8000,
    "acquisition": "Use a spell tome. Uncommon tome from Frozen Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Medium Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Ice_wall",
    "icon": "public/magic/aspectual/ice_wall.png"
  },
  {
    "id": "icicle_lance",
    "name": "Icicle Lance",
    "type": "Aspectual",
    "school": "Ice",
    "summary": "Shoot frozen icicles toward targets.",
    "masteryTarget": 100,
    "castTime": "50 ticks",
    "cost": 850,
    "acquisition": "Use a spell tome. Common tome from Frozen Wizard Towers. Also available to Arch Daemon or Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Icicle_Lance",
    "icon": "public/magic/aspectual/icicle_lance.png"
  },
  {
    "id": "icicle_rain",
    "name": "Icicle Rain",
    "type": "Aspectual",
    "school": "Ice",
    "summary": "Strike targets with a barrage of icicle lances from the sky.",
    "masteryTarget": 700,
    "castTime": "120 ticks",
    "cost": "15,000 MP",
    "acquisition": "Use a spell tome. Uncommon tome from Frozen Wizard Towers. Also available to Daemon Lord as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Icicle Lance."
    ],
    "requires": [
      "icicle_lance"
    ],
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Medium Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Icicle_Rain",
    "icon": "public/magic/aspectual/icicle_rain.png"
  },
  {
    "id": "icicle_spear",
    "name": "Icicle Spear",
    "type": "Aspectual",
    "school": "Ice",
    "summary": "Strike targets with a giant icicle spike from the ground.",
    "masteryTarget": 700,
    "castTime": "120 ticks",
    "cost": 40000,
    "acquisition": "Use a spell tome. Uncommon tome from Frozen Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Icicle_Spear",
    "icon": "public/magic/aspectual/icicle_spear.png"
  },
  {
    "id": "invisible",
    "name": "Invisible",
    "type": "Aspectual",
    "school": "Illusion",
    "summary": "Turn the caster invisible to hide from targets.",
    "masteryTarget": 300,
    "castTime": "60 ticks",
    "cost": 2000,
    "acquisition": "Use a spell tome. Rare tome from Rotted Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Invisible",
    "icon": "public/magic/aspectual/invisible.png"
  },
  {
    "id": "lighten",
    "name": "Lighten",
    "type": "Aspectual",
    "school": "Gravity",
    "summary": "Lighten the caster's gravity for greater speed and jump power.",
    "masteryTarget": 100,
    "castTime": "60 ticks",
    "cost": 250,
    "acquisition": "Use a spell tome. Uncommon tome from Buried Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Lighten",
    "icon": "public/magic/aspectual/lighten.png"
  },
  {
    "id": "liquidize",
    "name": "Liquidize",
    "type": "Aspectual",
    "school": "Earth",
    "summary": "Liquidize the earth where the caster desires to turn into deadly traps.",
    "masteryTarget": 100,
    "masteryTip": "Base chant drops to 60 ticks after mastery.",
    "castTime": "80 ticks",
    "cost": 250,
    "acquisition": "Use a spell tome. Common tome from Buried Wizard Towers. Also available to Lesser Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Liquidize",
    "icon": "public/magic/aspectual/liquidize.png"
  },
  {
    "id": "magic_barrier",
    "name": "Magic Barrier",
    "type": "Aspectual",
    "school": "Barrier",
    "summary": "Coat the caster with a Magic Barrier with the strength based on Health.",
    "masteryTarget": 300,
    "castTime": "160 ticks",
    "cost": "2,000 MP or 1/20th max MP, whichever is higher",
    "acquisition": "Use a spell tome. Rare tome from Buried Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Magic_Barrier",
    "icon": "public/magic/aspectual/magic_barrier.png"
  },
  {
    "id": "magic_wall",
    "name": "Magic Wall",
    "type": "Aspectual",
    "school": "Barrier",
    "summary": "Generate a magic wall to protect the caster.",
    "masteryTarget": 100,
    "masteryTip": "Base chant drops to 100 ticks after mastery.",
    "castTime": "120 ticks",
    "cost": 400,
    "acquisition": "Use a Magic Tome bound to this spell. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Low Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Magic_Wall",
    "icon": "public/magic/aspectual/magic_wall.png"
  },
  {
    "id": "mental_crush",
    "name": "Mental Crush",
    "type": "Aspectual",
    "school": "Mental",
    "summary": "Crush the mind of targets.",
    "masteryTarget": 700,
    "castTime": "100 ticks",
    "cost": 30000,
    "acquisition": "Use a spell tome. Rare tome from Buried Wizard Towers, Rare tome from Burnt Wizard Towers, Rare tome from Frozen Wizard Towers, Rare tome from Rotted Wizard Towers or Rare tome from Ruined Wizard Towers. Also available to Devil Lord as racial magic.",
    "learningTarget": 100,
    "source": "https://tensura.wiki.gg/wiki/Mental_Crush",
    "icon": "public/magic/aspectual/mental_crush.png"
  },
  {
    "id": "mirage",
    "name": "Mirage",
    "type": "Aspectual",
    "school": "Illusion",
    "summary": "Create illusionary clones around the caster.",
    "masteryTarget": 300,
    "castTime": "60 ticks",
    "cost": 2000,
    "acquisition": "Use a spell tome. Uncommon tome from Rotted Wizard Towers. Also available to Daemon Lord as racial magic.",
    "learningTarget": 100,
    "source": "https://tensura.wiki.gg/wiki/Mirage",
    "icon": "public/magic/aspectual/mirage.png"
  },
  {
    "id": "mud_hand",
    "name": "Mud Hand",
    "type": "Aspectual",
    "school": "Earth",
    "summary": "Bind targets with several hands of mud.",
    "masteryTarget": 300,
    "castTime": "80 ticks",
    "cost": 5000,
    "acquisition": "Use a spell tome. Common tome from Buried Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Medium Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Mud_Hand",
    "icon": "public/magic/aspectual/mud_hand.png"
  },
  {
    "id": "mud_spears",
    "name": "Mud Spears",
    "type": "Aspectual",
    "school": "Earth",
    "summary": "Raise mud spikes from the ground to pierce through your enemies.",
    "masteryTarget": 700,
    "castTime": "80 ticks",
    "cost": 70000,
    "acquisition": "Use a spell tome. Rare tome from Buried Wizard Towers. Also available to Daemon Lord as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Mud_Spears",
    "icon": "public/magic/aspectual/mud_spears.png"
  },
  {
    "id": "possession_magic",
    "name": "Possession",
    "type": "Aspectual",
    "school": "Illusion",
    "summary": "Possess a weakened material body to gain a new powers from that body.",
    "masteryTarget": 1500,
    "masteryTip": "Mastery makes the separate Possession skill available to learn.",
    "castTime": "200 ticks",
    "cost": 100000,
    "acquisition": "Use a spell tome. Epic tome from any Wizard Tower.",
    "learningTarget": 100,
    "details": [
      "The weakened target must remain within the magic circle through the cast. Chant Annulment cannot skip the chant."
    ],
    "source": "https://tensura.wiki.gg/wiki/Aspectual_Possession",
    "icon": "public/magic/aspectual/possession_magic.png"
  },
  {
    "id": "protection",
    "name": "Protection",
    "type": "Aspectual",
    "school": "Enhancement",
    "summary": "Greatly enhance the caster's defence.",
    "masteryTarget": 300,
    "castTime": "100 ticks",
    "cost": 4000,
    "acquisition": "Use a spell tome. Common tome from Rotted Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Protection",
    "icon": "public/magic/aspectual/protection.png"
  },
  {
    "id": "recovery",
    "name": "Recovery",
    "type": "Aspectual",
    "school": "Recovery",
    "summary": "Greatly recover a living being's health as well as food points.",
    "masteryTarget": 700,
    "castTime": "100 ticks",
    "cost": 10000,
    "acquisition": "Use a spell tome. Rare tome from Frozen Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Healing."
    ],
    "requires": [
      "healing"
    ],
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Recovery",
    "icon": "public/magic/aspectual/recovery.png"
  },
  {
    "id": "reincarnation",
    "name": "Reincarnation",
    "type": "Aspectual",
    "school": "Utility",
    "summary": "Sacrifice a portion of the caster's power to reincarnate.",
    "masteryTarget": 100,
    "masteryTip": "Mastery changes the available starting races. The expanded default list includes Hobgoblin, Ogre, Lesser Daemon, and Giant.",
    "castTime": "200 ticks",
    "cost": 10000,
    "acquisition": "Use a spell tome. Epic tome from any Wizard Tower.",
    "learningTarget": 100,
    "details": [
      "Confirming your new race reduces base maximum MP and AP to 75% of their former values. The spell also clears your saved respawn point.",
      "Chant Annulment cannot remove this spell’s casting time."
    ],
    "source": "https://tensura.wiki.gg/wiki/Reincarnation",
    "icon": "public/magic/aspectual/reincarnation.png"
  },
  {
    "id": "reinforced_barrier",
    "name": "Reinforced Barrier",
    "type": "Aspectual",
    "school": "Barrier",
    "summary": "Coat the caster with reinforced Barriers with the strength based on Health.",
    "masteryTarget": 300,
    "castTime": "160 ticks",
    "cost": "5,000 MP or 1/20th max MP, whichever is higher",
    "acquisition": "Use a spell tome. Rare tome from Buried Wizard Towers. Also available to Daemon Lord as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Barrier.",
      "Master Magic Barrier."
    ],
    "requires": [
      "barrier",
      "magic_barrier"
    ],
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Reinforced_Barrier",
    "icon": "public/magic/aspectual/reinforced_barrier.png"
  },
  {
    "id": "reinforcement",
    "name": "Reinforcement",
    "type": "Aspectual",
    "school": "Enhancement",
    "summary": "Greatly enhance the caster's gears durability.",
    "masteryTarget": 300,
    "castTime": "100 ticks",
    "cost": 4000,
    "acquisition": "Use a spell tome. Common tome from Rotted Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Reinforcement",
    "icon": "public/magic/aspectual/reinforcement.png"
  },
  {
    "id": "search_enemy",
    "name": "Search Enemy",
    "type": "Aspectual",
    "school": "Utility",
    "summary": "Highlight hostile mobs around the caster.",
    "masteryTarget": 100,
    "castTime": "40 ticks",
    "cost": 100,
    "acquisition": "Use a spell tome. Rare tome from Burnt Wizard Towers.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Low Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Search_Enemy",
    "icon": "public/magic/aspectual/search_enemy.png"
  },
  {
    "id": "sleep_mist",
    "name": "Sleep Mist",
    "type": "Aspectual",
    "school": "Water",
    "summary": "Release a wide area of sleeping mist to paralyze targets.",
    "masteryTarget": 300,
    "castTime": "100 ticks",
    "cost": 5000,
    "acquisition": "Use a spell tome. Common tome from Frozen Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Medium Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Sleep_Mist",
    "icon": "public/magic/aspectual/sleep_mist.png"
  },
  {
    "id": "spatial_storage",
    "name": "Spatial Storage",
    "type": "Aspectual",
    "school": "Space",
    "summary": "Rift space to create a small pocket dimension to store items.",
    "masteryTarget": 300,
    "castTime": "40 ticks",
    "cost": 3000,
    "acquisition": "Use a spell tome. Rare tome from Ruined Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Spatial_Storage",
    "icon": "public/magic/aspectual/spatial_storage.png"
  },
  {
    "id": "stone_shot",
    "name": "Stone Shot",
    "type": "Aspectual",
    "school": "Earth",
    "summary": "Shoot rock spikes toward targets.",
    "masteryTarget": 700,
    "castTime": "80 ticks",
    "cost": 45000,
    "acquisition": "Use a spell tome. Uncommon tome from Buried Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Stone_Shot",
    "icon": "public/magic/aspectual/stone_shot.png"
  },
  {
    "id": "strength_aspectual",
    "name": "Strength",
    "type": "Aspectual",
    "school": "Enhancement",
    "summary": "Greatly enhance the caster's strength power.",
    "masteryTarget": 300,
    "castTime": "100 ticks",
    "cost": 4000,
    "acquisition": "Use a spell tome. Common tome from Rotted Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman Medium Rare."
    ],
    "source": "https://tensura.wiki.gg/wiki/Aspectual_Strength",
    "icon": "public/magic/aspectual/strength_aspectual.png"
  },
  {
    "id": "thunder",
    "name": "Thunder",
    "type": "Aspectual",
    "school": "Lightning",
    "summary": "Strike powerful thunder where the caster looks.",
    "masteryTarget": 700,
    "castTime": "20 ticks",
    "cost": 30000,
    "acquisition": "Use a spell tome. Rare tome from Ruined Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Thunder",
    "icon": "public/magic/aspectual/thunder.png"
  },
  {
    "id": "thunder_lance",
    "name": "Thunder Lance",
    "type": "Aspectual",
    "school": "Lightning",
    "summary": "Strike powerful thunder lances of magic.",
    "masteryTarget": 300,
    "castTime": "80 ticks",
    "cost": 5000,
    "acquisition": "Use a spell tome. Uncommon tome from Ruined Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Medium Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Thunder_Lance",
    "icon": "public/magic/aspectual/thunder_lance.png"
  },
  {
    "id": "thunder_orb",
    "name": "Thunder Orb",
    "type": "Aspectual",
    "school": "Lightning",
    "summary": "Call forth a sphere of thunder that strikes any enemy get by.",
    "masteryTarget": 700,
    "masteryTip": "Base chant drops to 80 ticks after mastery.",
    "castTime": "120 ticks",
    "cost": 20000,
    "acquisition": "Use a spell tome. Uncommon tome from Ruined Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Thunder."
    ],
    "requires": [
      "thunder"
    ],
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Thunder_Orb",
    "icon": "public/magic/aspectual/thunder_orb.png"
  },
  {
    "id": "thunder_rain",
    "name": "Thunder Rain",
    "type": "Aspectual",
    "school": "Lightning",
    "summary": "Call forth a wide area of thunder clouds that strike all enemies.",
    "masteryTarget": 1500,
    "masteryTip": "Base chant drops to 100 ticks after mastery.",
    "castTime": "160 ticks",
    "cost": 70000,
    "acquisition": "Use a spell tome. Rare tome from Ruined Wizard Towers. Also available to Daemon Lord as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Thunder."
    ],
    "requires": [
      "thunder"
    ],
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Thunder_Rain",
    "icon": "public/magic/aspectual/thunder_rain.png"
  },
  {
    "id": "tornado_blade",
    "name": "Tornado Blade",
    "type": "Aspectual",
    "school": "Wind",
    "summary": "Fire a concentrated sphere of wind toward targets.",
    "masteryTarget": 700,
    "castTime": "50 ticks",
    "cost": 40000,
    "acquisition": "Use a spell tome. Rare tome from Ruined Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Wind Cutter."
    ],
    "requires": [
      "wind_cutter"
    ],
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Tornado_Blade",
    "icon": "public/magic/aspectual/tornado_blade.png"
  },
  {
    "id": "warp_portal",
    "name": "Warp Portal",
    "type": "Aspectual",
    "school": "Space",
    "summary": "Tear space asunder connecting two points in space.",
    "masteryTarget": 300,
    "castTime": "80 ticks",
    "cost": 50,
    "acquisition": "Use a spell tome. Uncommon tome from Ruined Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Medium Upgraded."
    ],
    "source": "https://tensura.wiki.gg/wiki/Warp_Portal",
    "icon": "public/magic/aspectual/warp_portal.png"
  },
  {
    "id": "water_aspectual",
    "name": "Water",
    "type": "Aspectual",
    "school": "Water",
    "summary": "Call forth small amounts of water.",
    "masteryTarget": 100,
    "castTime": "20 ticks",
    "cost": 100,
    "acquisition": "Use a spell tome. Common tome from Frozen Wizard Towers. Also available to Lesser Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Water_(Aspectual)",
    "icon": "public/magic/aspectual/water_aspectual.png"
  },
  {
    "id": "water_cutter_aspectual",
    "name": "Water Cutter",
    "type": "Aspectual",
    "school": "Water",
    "summary": "Fire concentrated blades of water toward targets.",
    "masteryTarget": 100,
    "castTime": "30 ticks",
    "cost": "1000 MP",
    "acquisition": "Use a spell tome. Common tome from Frozen Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Water_Cutter_(Aspectual)",
    "icon": "public/magic/aspectual/water_cutter_aspectual.png"
  },
  {
    "id": "water_jail",
    "name": "Water Jail",
    "type": "Aspectual",
    "school": "Water",
    "summary": "Surround targets with flows of water.",
    "masteryTarget": 700,
    "castTime": "60 ticks",
    "cost": 25000,
    "acquisition": "Use a spell tome. Uncommon tome from Frozen Wizard Towers. Also available to Arch Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Journeyman High Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Water_Jail",
    "icon": "public/magic/aspectual/water_jail.png"
  },
  {
    "id": "wind_cutter",
    "name": "Wind Cutter",
    "type": "Aspectual",
    "school": "Wind",
    "summary": "Fire concentrated blades of wind toward targets.",
    "masteryTarget": 100,
    "masteryTip": "Base chant drops to 30 ticks after mastery.",
    "castTime": "40 ticks",
    "cost": 500,
    "acquisition": "Use a spell tome. Common tome from Ruined Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Wind_Cutter",
    "icon": "public/magic/aspectual/wind_cutter.png"
  },
  {
    "id": "wind_gust",
    "name": "Wind Gust",
    "type": "Aspectual",
    "school": "Wind",
    "summary": "Release strong currents of winds to create gusts or wind charges toward targets.",
    "masteryTarget": 100,
    "castTime": "20 ticks",
    "cost": 100,
    "acquisition": "Use a spell tome. Common tome from Ruined Wizard Towers. Also available to Lesser Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Novice Low Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Wind_Gust",
    "icon": "public/magic/aspectual/wind_gust.png"
  },
  {
    "id": "wind_protection",
    "name": "Wind Protection",
    "type": "Aspectual",
    "school": "Wind",
    "summary": "Call forth flows of wind to coat the caster with speed and protection.",
    "masteryTarget": 300,
    "castTime": "60 ticks",
    "cost": 1000,
    "acquisition": "Use a spell tome. Common tome from Ruined Wizard Towers. Also available to Greater Daemon as racial magic.",
    "learningTarget": 100,
    "details": [
      "A Dwarf Magic Trainer can roll it in these trade pools: Apprentice Medium Basic."
    ],
    "source": "https://tensura.wiki.gg/wiki/Wind_Protection",
    "icon": "public/magic/aspectual/wind_protection.png"
  },
  {
    "id": "acid_rain",
    "name": "Acid Rain",
    "type": "Spiritual",
    "school": "Water",
    "subtitle": "Medium • Water",
    "summary": "Summon an acidic cloud which will corrode any afflicted entities.",
    "masteryTarget": 500,
    "masteryTip": "Base chant drops to 60 ticks after mastery.",
    "castTime": "80 ticks",
    "cost": 1000,
    "acquisition": "Contract a Medium or higher Water Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Water Transform or Magic Water Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Acid_Rain",
    "icon": "public/magic/spiritual/acid_rain.png"
  },
  {
    "id": "aerial_blade",
    "name": "Aerial Blade",
    "type": "Spiritual",
    "school": "Wind",
    "subtitle": "Greater • Wind",
    "summary": "Pull in any nearby entities before dealing massive damage by unleashing the power of your spirit.",
    "masteryTarget": 1000,
    "castTime": "100 ticks",
    "cost": 35000,
    "acquisition": "Contract a Greater or higher Wind Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Wind Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Aerial_Blade",
    "icon": "public/magic/spiritual/aerial_blade.png"
  },
  {
    "id": "blizzard",
    "name": "Blizzard",
    "type": "Spiritual",
    "school": "Water",
    "subtitle": "Greater • Water",
    "summary": "Creates a powerful storm of ice to slow your enemies and turn the tides of battle.",
    "masteryTarget": 1000,
    "castTime": "160 ticks",
    "cost": 50000,
    "acquisition": "Contract a Greater or higher Water Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Water Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Blizzard",
    "icon": "public/magic/spiritual/blizzard.png"
  },
  {
    "id": "create_greater_undead",
    "name": "Create Greater Undead",
    "type": "Spiritual",
    "school": "Necromancy",
    "subtitle": "Medium • Necromancy",
    "summary": "Call forth armed undead from the ground to aid the caster.",
    "masteryTarget": 500,
    "castTime": "120 ticks",
    "cost": "8,000 MP per undead",
    "acquisition": "Use a spell tome. Uncommon tome from Rotted Wizard Towers.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Create Lesser Undead."
    ],
    "requires": [
      "create_lesser_undead"
    ],
    "details": [
      "Summons armed zombies or skeletons that can survive sunlight.",
      "The Wight racial route also unlocks this spell after mastering its prerequisite."
    ],
    "source": "https://tensura.wiki.gg/wiki/Create_Greater_Undead",
    "icon": "public/magic/spiritual/create_greater_undead.png"
  },
  {
    "id": "create_lesser_undead",
    "name": "Create Lesser Undead",
    "type": "Spiritual",
    "school": "Necromancy",
    "subtitle": "Lesser • Necromancy",
    "summary": "Call forth weak undead from the ground to aid the caster.",
    "masteryTarget": 100,
    "masteryTip": "Mastery unlocks Create Greater Undead and allows larger groups of summons while sneaking.",
    "castTime": "80 ticks",
    "cost": "800 MP per undead",
    "acquisition": "Use a spell tome. Common tome from Rotted Wizard Towers. Wight Kings can also unlock it through their race.",
    "learningTarget": 100,
    "details": [
      "Summons a temporary zombie or skeleton. The lesser undead burns in sunlight."
    ],
    "source": "https://tensura.wiki.gg/wiki/Create_Lesser_Undead",
    "icon": "public/magic/spiritual/create_lesser_undead.png"
  },
  {
    "id": "curse",
    "name": "Curse",
    "type": "Spiritual",
    "school": "Necromancy",
    "subtitle": "Medium • Necromancy",
    "summary": "Release Miasmic Mist to curse targets.",
    "masteryTarget": 500,
    "masteryTip": "Mastery increases the spell’s damage and unlocks Curse Bind.",
    "castTime": "120 ticks",
    "cost": 10000,
    "acquisition": "Use a spell tome. Uncommon tome from Rotted Wizard Towers. Wight Kings can also unlock it through their race.",
    "learningTarget": 100,
    "details": [
      "The fog deals periodic contact damage and applies the Curse effect."
    ],
    "source": "https://tensura.wiki.gg/wiki/Curse",
    "icon": "public/magic/spiritual/curse.png"
  },
  {
    "id": "curse_bind",
    "name": "Curse Bind",
    "type": "Spiritual",
    "school": "Necromancy",
    "subtitle": "Greater • Necromancy",
    "summary": "Call forth spirits of the death to bind and corrode targets.",
    "masteryTarget": 1000,
    "masteryTip": "Base chant drops to 100 ticks after mastery.",
    "castTime": "120 ticks",
    "cost": 80000,
    "acquisition": "Use a spell tome. Rare tome from Rotted Wizard Towers.",
    "learningTarget": 100,
    "prerequisites": [
      "Master Curse."
    ],
    "requires": [
      "curse"
    ],
    "details": [
      "Paralyzes the target while accumulating Curse and Corrosion.",
      "The Wight racial route also unlocks this spell after mastering its prerequisite."
    ],
    "source": "https://tensura.wiki.gg/wiki/Curse_Bind",
    "icon": "public/magic/spiritual/curse_bind.png"
  },
  {
    "id": "dark_cube",
    "name": "Dark Cube",
    "type": "Spiritual",
    "school": "Darkness",
    "subtitle": "Medium • Darkness",
    "summary": "Create a cube of darkness that slows movement and deals constant damage.",
    "masteryTarget": 500,
    "castTime": "60 ticks",
    "cost": 2000,
    "acquisition": "Contract a Medium or higher Dark Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Darkness Transform or Magic Darkness Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Dark_Cube",
    "icon": "public/magic/spiritual/dark_cube.png"
  },
  {
    "id": "darkness",
    "name": "Darkness",
    "type": "Spiritual",
    "school": "Darkness",
    "subtitle": "Lesser • Darkness",
    "summary": "Call on your spirit to reduce the enemy's vision in a wide area.",
    "masteryTarget": 100,
    "castTime": "40 ticks",
    "cost": 100,
    "acquisition": "Contract a Lesser or higher Dark Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Darkness Transform or Magic Darkness Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Darkness",
    "icon": "public/magic/spiritual/darkness.png"
  },
  {
    "id": "darkness_cannon",
    "name": "Darkness Cannon",
    "type": "Spiritual",
    "school": "Darkness",
    "subtitle": "Greater • Darkness",
    "summary": "Shoot a long beam which deals massive damage, destroys armor and debilitates enemies.",
    "masteryTarget": 1000,
    "masteryTip": "Base chant drops to 40 ticks after mastery.",
    "castTime": "80 ticks",
    "cost": 35000,
    "acquisition": "Contract a Greater or higher Dark Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Darkness Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Darkness_Cannon",
    "icon": "public/magic/spiritual/darkness_cannon.png"
  },
  {
    "id": "earth",
    "name": "Earth",
    "type": "Spiritual",
    "school": "Earth",
    "subtitle": "Lesser • Earth",
    "summary": "Place down blocks which mimic those from the surrounding environment.",
    "masteryTarget": 100,
    "masteryTip": "Base chant drops to 1 ticks after mastery.",
    "castTime": "10 ticks",
    "cost": "50 MP",
    "acquisition": "Contract a Lesser or higher Earth Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Earth Transform or Magic Earth Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Earth",
    "icon": "public/magic/spiritual/earth.png"
  },
  {
    "id": "earth_jail",
    "name": "Earth Jail",
    "type": "Spiritual",
    "school": "Earth",
    "subtitle": "Greater • Earth",
    "summary": "Restrict and weaken a single target, applying debuffs to allow you to finish them off.",
    "masteryTarget": 1000,
    "castTime": "140 ticks",
    "cost": 30000,
    "acquisition": "Contract a Greater or higher Earth Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Earth Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Earth_Jail",
    "icon": "public/magic/spiritual/earth_jail.png"
  },
  {
    "id": "earth_spikes",
    "name": "Earth Spikes",
    "type": "Spiritual",
    "school": "Earth",
    "subtitle": "Medium • Earth",
    "summary": "Raises earth spikes from the ground to pierce through your enemies.",
    "masteryTarget": 500,
    "castTime": "40 ticks",
    "cost": 500,
    "acquisition": "Contract a Medium or higher Earth Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Earth Transform or Magic Earth Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Earth_Spikes",
    "icon": "public/magic/spiritual/earth_spikes.png"
  },
  {
    "id": "earth_storm",
    "name": "Earth Storm",
    "type": "Spiritual",
    "school": "Earth",
    "subtitle": "Medium • Earth",
    "summary": "Summons a viscous sandstorm and falling rocks around you.",
    "masteryTarget": 500,
    "castTime": "120 ticks",
    "cost": 5000,
    "acquisition": "Contract a Medium or higher Earth Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Earth Transform or Magic Earth Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Earth_Storm",
    "icon": "public/magic/spiritual/earth_storm.png"
  },
  {
    "id": "electro_blast",
    "name": "Electro Blast",
    "type": "Spiritual",
    "school": "Wind",
    "subtitle": "Greater • Wind",
    "summary": "Fire a beam attack that pierces through enemies and deals devastating damage while paralyzing your enemies.",
    "masteryTarget": 1000,
    "masteryTip": "Base chant drops to 100 ticks after mastery.",
    "castTime": "140 ticks",
    "cost": 25000,
    "acquisition": "Contract a Greater or higher Wind Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Wind Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Electro_Blast",
    "icon": "public/magic/spiritual/electro_blast.png"
  },
  {
    "id": "fire",
    "name": "Fire",
    "type": "Spiritual",
    "school": "Fire",
    "subtitle": "Lesser • Fire",
    "summary": "Use your spirit to start a small fire.",
    "masteryTarget": 100,
    "castTime": "1 ticks",
    "cost": 10,
    "acquisition": "Contract a Lesser or higher Fire Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Flame Transform or Magic Flame Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Fire_(Spiritual)",
    "icon": "public/magic/spiritual/fire.png"
  },
  {
    "id": "fire_bolt",
    "name": "Fire Bolt",
    "type": "Spiritual",
    "school": "Fire",
    "subtitle": "Medium • Fire",
    "summary": "Shoots a flaming bolt.",
    "masteryTarget": 500,
    "masteryTip": "Base chant drops to 20 ticks after mastery.",
    "castTime": "40 ticks",
    "cost": 1000,
    "acquisition": "Contract a Medium or higher Fire Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Flame Transform or Magic Flame Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Abilities/Magics/Fire_Bolt",
    "icon": "public/magic/spiritual/fire_bolt.png"
  },
  {
    "id": "fire_breath",
    "name": "Fire Breath",
    "type": "Spiritual",
    "school": "Fire",
    "subtitle": "Medium • Fire",
    "summary": "Breathe flames and incinerate your enemies.",
    "masteryTarget": 500,
    "masteryTip": "Base chant drops to 1 ticks after mastery.",
    "castTime": "10 ticks",
    "cost": 200,
    "acquisition": "Contract a Medium or higher Fire Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Flame Transform or Magic Flame Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Fire_Breath",
    "icon": "public/magic/spiritual/fire_breath.png"
  },
  {
    "id": "flare_circle",
    "name": "Flare Circle",
    "type": "Spiritual",
    "school": "Fire",
    "subtitle": "Greater • Fire",
    "summary": "Opens a Gate to Hell from which wicked flames erupt to turn your enemies to ash.",
    "masteryTarget": 1000,
    "castTime": "60 ticks",
    "cost": 10000,
    "acquisition": "Contract a Greater or higher Fire Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Flame Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Abilities/Magics/Flare_Circle",
    "icon": "public/magic/spiritual/flare_circle.png"
  },
  {
    "id": "gate",
    "name": "Gate",
    "type": "Spiritual",
    "school": "Space",
    "subtitle": "Medium • Space",
    "summary": "Tear space asunder connecting two points in space.",
    "masteryTarget": 500,
    "castTime": "300 ticks",
    "cost": 50,
    "acquisition": "Contract a Medium or higher Space Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Use it to connect two positions with a portal.",
      "Learning Space Transform or Magic Space Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Gate",
    "icon": "public/magic/spiritual/gate.png"
  },
  {
    "id": "hellfire",
    "name": "Hellfire",
    "type": "Spiritual",
    "school": "Fire",
    "subtitle": "Greater • Fire",
    "summary": "Summon a sphere of hellfire to deal massive damage in a small area.",
    "masteryTarget": 1000,
    "castTime": "100 ticks",
    "cost": 45000,
    "acquisition": "Contract a Greater or higher Fire Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Flame Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Abilities/Magics/Hellfire",
    "icon": "public/magic/spiritual/hellfire.png"
  },
  {
    "id": "light",
    "name": "Light",
    "type": "Spiritual",
    "school": "Light",
    "subtitle": "Lesser • Light",
    "summary": "Summons a temporary light to block out the darkness.",
    "masteryTarget": 100,
    "masteryTip": "Base chant drops to 1 ticks after mastery.",
    "castTime": "10 ticks",
    "cost": 50,
    "acquisition": "Contract a Lesser or higher Light Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Light Transform or Magic Light Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Light",
    "icon": "public/magic/spiritual/light.png"
  },
  {
    "id": "lightning_lance",
    "name": "Lightning Lance",
    "type": "Spiritual",
    "school": "Wind",
    "subtitle": "Medium • Wind",
    "summary": "Launch a lighting projectile which will electrify your enemies.",
    "masteryTarget": 500,
    "castTime": "40 ticks",
    "cost": 1000,
    "acquisition": "Contract a Medium or higher Wind Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Wind Transform or Magic Wind Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Lightning_Lance",
    "icon": "public/magic/spiritual/lightning_lance.png"
  },
  {
    "id": "magma_surge",
    "name": "Magma Surge",
    "type": "Spiritual",
    "school": "Earth",
    "subtitle": "Greater • Earth",
    "summary": "Fire a spread of lava that burns and melts anything for a limited time.",
    "masteryTarget": 1000,
    "castTime": "80 ticks",
    "cost": 40000,
    "acquisition": "Contract a Greater or higher Earth Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Earth Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Magma_Surge",
    "icon": "public/magic/spiritual/magma_surge.png"
  },
  {
    "id": "megiddo",
    "name": "Megiddo",
    "type": "Spiritual",
    "school": "Water",
    "subtitle": "Greater • Water",
    "summary": "Unleash powerful sun blasts using water to kill any nearby foes. It can also be used manually to concentrate fire for any stronger foes.",
    "masteryTarget": 1000,
    "masteryTip": "Mastery increases the number of shots and reduces the automatic mode’s cooldown.",
    "castTime": "140 ticks",
    "cost": "30,000 MP to set up manual targeting, 3,000 MP per shot / 50,000 MP for automatic targeting",
    "acquisition": "Contract a Greater or higher Water Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Requires daytime with clear skies in the Overworld. Choose between aimed shots and automatically targeting water spheres.",
      "Learning Magic Water Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Megiddo",
    "icon": "public/magic/spiritual/megiddo.png"
  },
  {
    "id": "shadow_bind",
    "name": "Shadow Bind",
    "type": "Spiritual",
    "school": "Darkness",
    "subtitle": "Medium • Darkness",
    "summary": "If the target is standing in shadows, bind them and deal spiritual damage.",
    "masteryTarget": 500,
    "castTime": "40 ticks",
    "cost": 1000,
    "acquisition": "Contract a Medium or higher Dark Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Darkness Transform or Magic Darkness Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Shadow_Bind",
    "icon": "public/magic/spiritual/shadow_bind.png"
  },
  {
    "id": "shrink",
    "name": "Shrink",
    "type": "Spiritual",
    "school": "Space",
    "subtitle": "Medium • Space",
    "summary": "Reduce your size to enhance your evasion but increase your vulnerability",
    "masteryTarget": 500,
    "castTime": "60 ticks",
    "cost": 300,
    "acquisition": "Contract a Medium or higher Space Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Space Transform or Magic Space Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Shrink",
    "icon": "public/magic/spiritual/shrink.png"
  },
  {
    "id": "solar_beam",
    "name": "Solar Beam",
    "type": "Spiritual",
    "school": "Light",
    "subtitle": "Medium • Light",
    "summary": "Fire a light beam that deals massive damage to undead entities and burns blocks.",
    "masteryTarget": 500,
    "masteryTip": "Base chant drops to 1 ticks after mastery.",
    "castTime": "40 ticks",
    "cost": 500,
    "acquisition": "Contract a Medium or higher Light Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Light Transform or Magic Light Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Solar_Beam",
    "icon": "public/magic/spiritual/solar_beam.png"
  },
  {
    "id": "solar_flare",
    "name": "Solar Flare",
    "type": "Spiritual",
    "school": "Light",
    "subtitle": "Greater • Light",
    "summary": "Shoot a shockwave of light energy to give nausea, blindness and slowness to all targets in a wide AOE.",
    "masteryTarget": 1000,
    "castTime": "120 ticks",
    "cost": 35000,
    "acquisition": "Contract a Greater or higher Light Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Light Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Solar_Flare",
    "icon": "public/magic/spiritual/solar_flare.png"
  },
  {
    "id": "solar_rain",
    "name": "Solar Rain",
    "type": "Spiritual",
    "school": "Light",
    "subtitle": "Greater • Light",
    "summary": "Shoot many light projectiles that deal massive damage to undead creatures.",
    "masteryTarget": 1000,
    "castTime": "80 ticks",
    "cost": 8000,
    "acquisition": "Contract a Greater or higher Light Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Light Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Solar_Rain",
    "icon": "public/magic/spiritual/solar_rain.png"
  },
  {
    "id": "solar_wave",
    "name": "Solar Wave",
    "type": "Spiritual",
    "school": "Light",
    "subtitle": "Medium • Light",
    "summary": "Shoot a wave of light energy that blinds and slows hit enemies.",
    "masteryTarget": 500,
    "castTime": "60 ticks",
    "cost": 1000,
    "acquisition": "Contract a Medium or higher Light Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Light Transform or Magic Light Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Solar_Wave",
    "icon": "public/magic/spiritual/solar_wave.png"
  },
  {
    "id": "space",
    "name": "Space",
    "type": "Spiritual",
    "school": "Space",
    "subtitle": "Lesser • Space",
    "summary": "Form invisible platforms to create footholds midair.",
    "masteryTarget": 100,
    "masteryTip": "Base chant drops to 1 ticks after mastery.",
    "castTime": "20 ticks",
    "cost": 50,
    "acquisition": "Contract a Lesser or higher Space Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Space Transform or Magic Space Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Space",
    "icon": "public/magic/spiritual/space.png"
  },
  {
    "id": "swipe",
    "name": "Swipe",
    "type": "Spiritual",
    "school": "Space",
    "subtitle": "Greater • Space",
    "summary": "Slashing through space in a straight line, displacing entities or teleporting the caster.",
    "masteryTarget": 1000,
    "castTime": "60 ticks",
    "cost": 50000,
    "acquisition": "Contract a Greater or higher Space Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Space Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Swipe",
    "icon": "public/magic/spiritual/swipe.png"
  },
  {
    "id": "teleport",
    "name": "Teleport",
    "type": "Spiritual",
    "school": "Space",
    "subtitle": "Medium • Space",
    "summary": "Quickly blink forward in space to a location within view.",
    "masteryTarget": 500,
    "castTime": "5 ticks",
    "cost": 150,
    "acquisition": "Contract a Medium or higher Space Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Space Transform or Magic Space Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Teleport",
    "icon": "public/magic/spiritual/teleport.png"
  },
  {
    "id": "true_darkness",
    "name": "True Darkness",
    "type": "Spiritual",
    "school": "Darkness",
    "subtitle": "Greater • Darkness",
    "summary": "Inflict Blindness on all entities and deal massive spiritual damage.",
    "masteryTarget": 1000,
    "castTime": "120 ticks",
    "cost": 30000,
    "acquisition": "Contract a Greater or higher Dark Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Magic Darkness Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/True_Darkness",
    "icon": "public/magic/spiritual/true_darkness.png"
  },
  {
    "id": "water",
    "name": "Water",
    "type": "Spiritual",
    "school": "Water",
    "subtitle": "Lesser • Water",
    "summary": "Call forth or manipulate small amounts of water.",
    "masteryTarget": 100,
    "masteryTip": "Base chant drops to 1 ticks after mastery.",
    "castTime": "20 ticks",
    "cost": 50,
    "acquisition": "Contract a Lesser or higher Water Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Water Transform or Magic Water Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Water_(Spiritual)",
    "icon": "public/magic/spiritual/water.png"
  },
  {
    "id": "water_cutter",
    "name": "Water Cutter",
    "type": "Spiritual",
    "school": "Water",
    "subtitle": "Medium • Water",
    "summary": "Fires a concentrated blade to cut your enemies with the power of water.",
    "masteryTarget": 500,
    "masteryTip": "Base chant drops to 10 ticks after mastery.",
    "castTime": "30 ticks",
    "cost": 500,
    "acquisition": "Contract a Medium or higher Water Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Water Transform or Magic Water Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Water_Cutter_(Spiritual)",
    "icon": "public/magic/spiritual/water_cutter.png"
  },
  {
    "id": "wind",
    "name": "Wind",
    "type": "Spiritual",
    "school": "Wind",
    "subtitle": "Lesser • Wind",
    "summary": "Call forth a small gust of wind which can push targets away or the player up.",
    "masteryTarget": 100,
    "masteryTip": "Base chant drops to 1 ticks after mastery.",
    "castTime": "20 ticks",
    "cost": 25,
    "acquisition": "Contract a Lesser or higher Wind Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Wind Transform or Magic Wind Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Wind",
    "icon": "public/magic/spiritual/wind.png"
  },
  {
    "id": "wind_blade",
    "name": "Wind Blade",
    "type": "Spiritual",
    "school": "Wind",
    "subtitle": "Medium • Wind",
    "summary": "Fires a concentrated blade of wind which has heavy knockback.",
    "masteryTarget": 500,
    "masteryTip": "Base chant drops to 20 ticks after mastery.",
    "castTime": "40 ticks",
    "cost": 500,
    "acquisition": "Contract a Medium or higher Wind Spirit at the Labyrinth Tree. Naming a wild spirit of a qualifying tier can also form a contract.",
    "details": [
      "Learning Wind Transform or Magic Wind Transform also grants this spell. The Magic Transform upgrade requires mastery of its base Transform and more than 400,000 EP."
    ],
    "source": "https://tensura.wiki.gg/wiki/Wind_Blade",
    "icon": "public/magic/spiritual/wind_blade.png"
  },
  {
    "id": "summon_basilisk",
    "name": "Summon Basilisk",
    "type": "Summoning",
    "school": "Monsters",
    "summary": "Summon a Basilisk to temporarily fight for you.",
    "masteryTarget": 200,
    "masteryTip": "Base chant drops to 60 ticks after mastery.",
    "castTime": "100 ticks",
    "cost": 500,
    "acquisition": "Name a wild Basilisk to unlock the spell.",
    "details": [
      "Summon upkeep: 100 MP per second by default."
    ],
    "source": "https://tensura.wiki.gg/wiki/Summon_Basilisk",
    "icon": "public/magic/summoning/summon_basilisk.png"
  },
  {
    "id": "summon_daemon",
    "name": "Summon Daemon",
    "type": "Summoning",
    "school": "Daemons",
    "summary": "Summon a Daemon from hell to fight for you.",
    "masteryTarget": 200,
    "castTime": "300 ticks",
    "cost": "MP equal to twice the summoned Daemon’s EP",
    "acquisition": "Use a spell tome. Epic tome from any Wizard Tower.",
    "learningTarget": 100,
    "details": [
      "A tome can also appear in Daemon Realm treasure loot."
    ],
    "source": "https://tensura.wiki.gg/wiki/Summon_Daemon",
    "icon": "public/magic/summoning/summon_daemon.png"
  },
  {
    "id": "summon_greater_elemental",
    "name": "Summon Greater Elemental",
    "type": "Summoning",
    "school": "Elementals",
    "summary": "Summon your contracted greater elemental spirit to have it purge the world of heretics for you.",
    "masteryTarget": 200,
    "masteryTip": "Base chant drops to 60 ticks after mastery.",
    "castTime": "100 ticks",
    "cost": 3000,
    "acquisition": "Contract a Greater or higher Earth, Fire, Space, Water, or Wind Spirit. Pray in the Labyrinth Tree or name a wild qualifying spirit.",
    "details": [
      "Summon upkeep: 300 MP per second by default."
    ],
    "source": "https://tensura.wiki.gg/wiki/Summon_Greater_Elemental",
    "icon": "public/magic/summoning/summon_greater_elemental.png"
  },
  {
    "id": "summon_hound_dog",
    "name": "Summon Hound Dog",
    "type": "Summoning",
    "school": "Monsters",
    "summary": "Summon a Hound Dog to temporarily fight for you.",
    "masteryTarget": 200,
    "masteryTip": "Base chant drops to 60 ticks after mastery.",
    "castTime": "100 ticks",
    "cost": 50,
    "acquisition": "Name a wild snake-tailed Hound Dog to unlock the spell.",
    "details": [
      "Look for the snake-tailed model among otherwise similar Hound Dogs.",
      "Summon upkeep: 10 MP per second by default."
    ],
    "source": "https://tensura.wiki.gg/wiki/Mobs/Hound_Dog",
    "sourceLabel": "Wiki • Hound Dog",
    "icon": "public/magic/summoning/summon_hound_dog.png"
  },
  {
    "id": "summon_medium_elemental",
    "name": "Summon Medium Elemental",
    "type": "Summoning",
    "school": "Elementals",
    "summary": "Summon your contracted elemental spirit to temporarily fight for you.",
    "masteryTarget": 200,
    "masteryTip": "Base chant drops to 60 ticks after mastery.",
    "castTime": "100 ticks",
    "cost": 500,
    "acquisition": "Contract a Medium or higher Earth, Fire, Space, Water, or Wind Spirit. Pray in the Labyrinth Tree or name a wild qualifying spirit.",
    "details": [
      "Summon upkeep: 50 MP per second by default."
    ],
    "source": "https://tensura.wiki.gg/wiki/Summon_Medium_Elemental",
    "icon": "public/magic/summoning/summon_medium_elemental.png"
  },
  {
    "id": "summon_otherworlder",
    "name": "Summon Otherworlder",
    "type": "Summoning",
    "school": "Otherworlders",
    "summary": "Summon a human from a different world.",
    "masteryTarget": 200,
    "castTime": "40 ticks",
    "cost": "3,000 MP",
    "acquisition": "Use a spell tome. Epic tome from any Wizard Tower.",
    "learningTarget": 100,
    "details": [
      "The summon is a human from another world."
    ],
    "source": "https://tensura.wiki.gg/wiki/Summon_Otherworlder",
    "icon": "public/magic/summoning/summon_otherworlder.png"
  }
];
