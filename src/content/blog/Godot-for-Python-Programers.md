---
title: "Godot and Gdscript for Python Devs"
description: "a tutorial for python developers"
pubDate: "Sep. 07, 2023"
---

# TL;DR 

If you've ever dreamt of diving into the world of game development, there's a powerful and versatile tool waiting for you – Godot. While Python has been your trusty companion for web development, data analysis, and automation, Godot is here to open up a new realm of possibilities by allowing you to create games with ease and flexibility. In this blog post, we'll introduce you to Godot and explain how it can become a game-changer for Python developers.

## What is Godot?
Godot is an open-source, cross-platform game engine that empowers developers to create 2D and 3D games. It is known for its user-friendly interface, powerful scripting capabilities, and vibrant community. Created by Juan Linietsky, it has rapidly gained popularity among game developers worldwide.

Godot uses a custom scripting language called GDScript, which is quite similar to Python in terms of syntax. If you're already familiar with Python, transitioning to GDScript will be a breeze. You'll find yourself at home with familiar concepts like variables, functions, and object-oriented programming.

## Benefits of Using Python with Godot:
* Ease of Learning: Since GDScript is Pythonic in nature, Python developers will find it relatively simple to pick up and start coding in Godot.

* Robust Libraries: Godot's Python API provides access to the engine's powerful features, allowing you to create complex and interactive games with ease.

## Versatile Game Development
Godot doesn't limit you to a particular genre or style of game. Whether you're interested in developing 2D platformers, top-down RPGs, first-person shooters, or even complex 3D simulations, Godot has you covered. It offers an extensive set of tools and features for designing, scripting, and managing game assets.

Key Features:
1. Scene System: Godot's scene system simplifies game design by breaking it into manageable components, making it easier to create complex game worlds.

2. Physics Engine: Godot has a built-in 2D and 3D physics engine, making it effortless to create realistic interactions between game objects.

3. Animation: Create stunning animations and cinematic sequences with Godot's intuitive animation editor.


## Active Community and Resources

One of the significant advantages of choosing Godot is its thriving community. You'll find numerous tutorials, forums, and online courses dedicated to Godot game development. Whether you're stuck on a specific problem or looking to expand your knowledge, you'll have a wealth of resources at your fingertips.

## Cross-Platform Deployment

Godot enables you to deploy your games on a wide range of platforms, including Windows, macOS, Linux, Android, iOS, HTML5, and more. You can target multiple platforms without rewriting your code, thanks to its cross-platform capabilities.

## Syntax Differences to Python

1. In Python, you can declare variables without explicitly specifying their types or Key words. 
GDScript, on the other hand, requires you to declare variables with the 'var' keyword and optionally declare the type of a variable using a colon (:).

2. In Python you declare functions with the 'def' keyword.

```python
def foo(bar):
    pass
```
Were as in Gdscript you declare functions in with the "func" keyword.

```gdscript

func foo(bar):
    pass
```

Both Python and Gdscript have optional static typing and you use them in the same way in functions.

```python
def foo(bar) -> None:
    pass
```
```gdscript
func foo(bar) -> void:
    pass
```

3. Constants: Godot actually has constance, you declare them with the "const" keyword.

```gdscript
const maxHP = 1000
```

4. Every file in gdscript is a class, that extends a base class in Godot

5. Godot uses companion over inhiredance whitch saves time and simplifies your projects

6. Godot uses a tree data structure


## Conclusion

Godot is a game engine that offers a smooth transition for Python developers into the world of game development. With its Python-like scripting language, versatile game development features, active community, and cross-platform deployment options, it's a powerful tool that empowers you to bring your game ideas to life.

If you're a Python developer with a passion for gaming or a desire to explore a new creative avenue, Godot might just be the game-changer you've been waiting for. Dive in, start experimenting, and embark on your exciting journey into the world of game development with Godot.
