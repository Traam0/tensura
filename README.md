# Tensura Field Guide

An unofficial companion for Tensura: Reincarnated on Minecraft 1.21.1. The catalog targets mod release 2.0.1.5. Evolution thresholds and item recipes use the released NeoForge defaults. Server gamerules, older releases, and add-ons may change those values.

## Run locally

Use Node.js and run:

```powershell
npm.cmd run dev
```

Open http://localhost:4173. On macOS or Linux, use `npm run dev`.

Run `npm run build` to create the static site in `dist/`. The app saves your theme, EP history, evolution goals and checklists, mastery, saved items, and field notes in browser storage. Progress is specific to the browser and site origin.

Open **My Progress** to record gains and losses, enter your in-game total, or undo an entry. **Estimate a death loss** applies a percentage to the current saved total. It starts at the default 5% and can be adjusted to match your world's gamerule.

Use **Edit character** to set your name, current form, and portrait on the character sheet. The theme button switches between dark **Nightfall** and light **Daybreak**.

Use **Evolution Trees** to inspect race branches and track an evolution. Open **Skill Paths** from the Skill Library to follow prerequisites, mastery requirements, and skill combinations. Routes use the default base-mod settings for 2.0.1.5.

Open **Battlewill** or **Magic** to browse abilities by category. Each catalog has a **Paths** view for known unlock chains and combinations. Search for a technique, spell, or requirement, then open an entry to see its acquisition route, costs, and mastery details. Saved ability mastery appears in **My Progress**.

## Deploy on Vercel

Push this repository to a Git provider and import it as a Vercel project. Use the repository root as the Root Directory. The included `vercel.json` selects the Other framework preset, skips dependency installation, runs `npm run build`, and publishes `dist`. The guide runs as a static site and needs no environment variables.

The [full-size logo](artwork/tensura-logo.png) is kept with the source artwork. The site uses the smaller icon in `public/guide-icon.png`.

## Reference sources

- [Tensura: Reincarnated Wiki](https://tensura.wiki.gg/)
- [Tensura: Reincarnated 2.0.1.5 on CurseForge](https://www.curseforge.com/minecraft/mc-mods/tensura-reincarnated/files/9476869)
- [Evolution system on Minecraft Guides](https://www.minecraft-guides.com/mod/tensura-reincarnated/wiki/evolution-system/)
- Skill icons by ManasMods, from the [2.0.1.5 release](https://www.curseforge.com/minecraft/mc-mods/tensura-reincarnated/files/9476869)
- Labyrinth Tree screenshot by ManasMods, from the [CurseForge gallery](https://www.curseforge.com/minecraft/mc-mods/tensura-reincarnated/gallery)
