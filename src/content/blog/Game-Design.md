---
title: "The Hive Game Design: Ship Crafting and Modules"
description: "A breakdown of ship crafting systems for The Hive — modules, hardpoints, and design decisions."
pubDate: "2022-07-08"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["game-design", "godot", "python", "tutorial"]
---

# Tech Tree - Ship Modules

The Hive is getting a ship crafting system. You build ships from modules — cores, forward sections, aft sections — each with their own hardpoints for weapons, sensors, and subsystems.

Modules will have internal slots, mount points, and hardpoints. Internal slots are for subsystems like reactors, fuel tanks, and hangar bays. External hardpoints are for sensors, communications, weapons, and engines. Mount points connect modules together.

## Core Modules

- Ship Core
- Ship Forward
- Ship Aft

Ships in this update will have at least three core modules. These core modules will have hardpoints that allow sensors, weapons, and hangars for your fighters.

### Ship Cores

The core is the central hub of the ship. It holds the bridge, crew quarters, and primary systems. Core modules have the most internal slots but limited external hardpoints.

### Ship Forward

The forward section determines sensor range and weapon accuracy. More advanced forward modules give better targeting data but cost more resources and have less internal space.

### Ship Aft

The aft section handles propulsion and power generation. Better aft modules mean faster travel and more energy for weapons and shields, but they're vulnerable to attacks from behind.

## Design Philosophy

I wanted a system that forces tradeoffs. You can build a ship with maximum firepower, but it'll be fragile and slow. Or max out shields and engines, but you won't have room for cargo or advanced sensors.

There's no best ship. There are only ships built for different roles.
