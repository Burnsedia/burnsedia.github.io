---
title: "Godot and GDScript for Python Devs"
description: "I picked up Godot because GDScript looks like Python and I didn't want to learn C# just to make a game. Here's how it went."
pubDate: "2023-09-07"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["godot", "python", "game-development", "tutorial"]
---

# Godot and GDScript for Python Devs

I know Python. I wanted to make a game. Godot uses GDScript which is basically Python with different keywords. That was enough of a reason to try it.

GDScript is similar enough that you'll be writing working game code on day one. The differences are mostly around how Godot handles scenes, nodes, and the game loop. But the syntax — indentation, functions, loops — that part is familiar.

This is what I learned transitioning from Python to Godot for 32bit-Spacer.

## What is Godot?

Godot is an open-source game engine for 2D and 3D games. It uses a scene system where everything is a tree of nodes. You write scripts in GDScript, though it also supports C# and a visual scripting language.

It was created by Juan Linietsky and has a solid community. It's also completely free with no royalties or engine cuts.

## Why GDScript Works for Python Devs

GDScript is designed to be approachable. If you know Python, you already know:

- Indentation-based blocks
- Functions defined with `func` (instead of `def`)
- `if/elif/else`, `for`, `while` loops
- Dynamic typing (though Godot 4 added optional typing)
- Dictionary and array literals

The main things to learn:
- Godot uses `extends` instead of class inheritance
- Signals instead of event listeners
- The node tree replaces the game loop structure you'd write in Pygame

## Setting Up

Download Godot from the website. That's it. No package manager, no virtualenv, no dependency hell. Unzip and run.

Create a new project. Godot gives you a 2D or 3D scene. Attach a script to a node and start coding.

## Your First Script

```gdscript
extends Node

func _ready():
    print("Hello from Godot")

func _process(delta):
    # Called every frame
    pass
```

`_ready()` is your `__init__` equivalent. `_process(delta)` is your main game loop.

## Where Godot Differs

- **Scenes are data, scripts are behavior.** You build scenes in the editor, attach scripts to nodes.
- **Signals replace callbacks.** Instead of passing functions around, you connect signals.
- **The editor is the API.** You'll spend as much time in the editor as in code.

## Final Thought

If you know Python and want to make games, Godot is the path of least resistance. You're not learning a new language — you're learning a new way to structure interactive systems.

That transition is smaller than you think.
