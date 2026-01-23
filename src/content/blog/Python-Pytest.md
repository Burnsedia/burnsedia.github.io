---
title: "Pytest and Selenium"
description: "A beginner-friendly guide to testing web apps with Pytest and Selenium"
pubDate: "Feb 09 2023"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["python", "testing", "selenium", "tutorial"]
---

## How to Develop a UI Test Sweet

### What is Pytest

Pytest is a Python testing framework that originated from the PyPy project. It can be used to write various types of software tests, including unit tests, integration tests, end-to-end tests, and functional tests. Its features include parametrized testing, fixtures, and assert re-writing. It is often used with the Functional Programming Pattern but can be used in OOP tests. Pytest is Simple to use and easy to understand. Just create a function, pass its parameters, and simply assert that a function returns the expected result.

### What is Selenium

Selenium is an open-source umbrella project for various tools and libraries to support browser automation. It provides a playback tool for authoring functional tests across most modern web browsers without learning a test scripting language. Selenium has Python, Java, JavaScript, and Ruby bindings. Selenium can be used for automating and testing any browser-based task.

### Functional or OOP

Selenium and Pytest both work very well in Functional and OOP styles of programming, although I think Functional is far easier for Pytest, but do you need to create and call a Utility Function for pure functional programming to work with selenium? This is unnecessary for OOP test classes; you just call the selenium constructor in the Class constructor. But for ease of use, I recommend Functional Tests, and if you require OOP for your business requirements, I recommend the Singleton Pattern for your test sweet.

### How to Setup Function Testing

We first need to install Pytest and Python Selenium Bindings.
To do this, run the following commands.

```bash
pip install pytest
pip install selenium
```

Then, we need to download the Selenium driver on Windows, go to the site, and put the binary in the same directory as the project. On Linux and MacOS, you can use a package manager. I am running a base Distro, So I will run.

```bash
sudo yay -S chromedriver
```

I recommend the Nix package manager if you are on MacOS or Any other Linux Distro. Nix is a lovely package manager with almost everything.

```bash
nix-shell -p chromedriver
```

Now that we have the chromedriver we can start writing the test. Of course, we need to import Pytest and Selenium.

```python
import pytest
import selenium
```

Now, we need to create a test setup function.

```python
def test_setup():
    global driver
    driver_path = "/path/to/chromedriver"
    driver = webdriver.Chrome(driver_path)
    #Wait for the Page to Load
    driver.implicitly_wait(10)
    # get a website so demo
    driver.get(https://initpro.dev/)
```

Now let's find the contact form and send an Email

```python
def email_form_test():
    driver.find_element_by_id("name")
    driver.find_element_by_id("email")
    driver.find_element_by_id("message")
```

We can also test other things like the website's title.

```python
def title_test():
    x = driver.title
    assert x == "iniPro - initPro"
```

You can test almost anything on the website, such as Modals, Forms, and Menus. After all tests have passed, you must "tare down" the webdriver.
To do this, I recommend just having a function at the end call.

```python
def test_teardown():
    driver.close()
    driver.quit()
    print("Test Complete")
```

Here is the Full Code

```python
import pytest
import selenium

def test_setup():
    global driver
    driver_path = "/path/to/chromedriver"
    driver = webdriver.Chrome(driver_path)
    driver.implicitly_wait(10)
    driver.get(https://initpro.dev/)

def email_form_test():
    driver.find_element_by_id("name")
    driver.find_element_by_id("email")
    driver.find_element_by_id("message")

def title_test():
    x = driver.title
    assert x == "iniPro - initPro"

def test_teardown():
    driver.close()
    driver.quit()
    print("Test Complete")
```
