+++
title = "Pytest"
date = "2023-02-04"
author = "Bailey Burnsed"
authorTwitter = "Burnsedia3dArt" 
cover = ""
tags = ["Python", "Pytest", "TDD"]
keywords = ["Python", "Pytest","Selenium"]
description = "Pytest Tutorial"
showFullContent = false
+++

# Pytest and Selenium
## How to Develop a UI test Sweet

### What is Pytest

Pytest is a Python testing framework that originated from the PyPy project. It can be used to write various types of software tests, including unit tests, integration tests, end-to-end tests, and functional tests. Its features include parametrized testing, fixtures, and assert re-writing. Is is often use with the Functional Programming Pattern but can be used in OOP test. Pytest is Simple to use and easy to understand. Just create a function and pass it parameters and simple assert that a function returns the expected result. 

### What is Selenium

Selenium is an open source umbrella project for a range of tools and libraries aimed at supporting browser automation. It provides a playback tool for authoring functional tests across most modern web browsers, without the need to learn a test scripting language. Selenium has Python, Java(which is hot garbage), JavaScript(kinda meh) and Ruby(has return that Python Bindings don't, UHH!!) Bindings. Selenium can be use for automating any browser based task, form login in, creating through away email accounts(very good for avoiding spam), and creating BOTS for good or ill.

### Functional or OOP

Selenium and Pytest both work very well in Functional and OOP styles of programming, all though I think Functional is fair easier for Pytest, but do you need to create and call a Utility Function for pure functional programming to work with selenium, this is unnecessary for OOP test classes, you just call the selenium constructor in the Class constructor. But for Easy of use I recommend Functional Tests and the Singleton Pattern, Create one global Selenium Object, run the test and then delete remove the Singleton when done. 

### How to Setup Function Testing
We first need to install Pytest and Python Selenium Bindings

To do this run the following 

```bash
sudo pip install pytest
sudo pip install selenium
```

Then we need to download the Selenium driver, on windows just got to the site and put the binary in the same directory as the project, on linux and macos you can use a package manager, BTW I use Arch so I will just run 

```
sudo yay -S chromedriver
```
If you are on MacOS or another Linux Distro I recommend Nix package manager

```
nix-shell -p chromedriver
```

Now that we have the chromedriver we can start writing the test, ofcourse we need to import Pytest and Selenium

```python
import pytest
import selenium
```

Now we need to create a test setup function

```python

webdriver = 

def test_setup():
    global driver 
    driver
```


### How to Setup OOP Testing
