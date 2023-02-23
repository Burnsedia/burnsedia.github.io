<!-- --- -->
<!-- title: "Pytest and Selenium" -->
<!-- description: "Lorem ipsum dolor sit amet" -->
<!-- --- -->
---
title: "First post"
description: "Lorem ipsum dolor sit amet"
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
---





# Pytest and Selenium
## How to Develop a UI test Sweet





---

### What is Pytest

* Pytest is a Python testing framework that originated from the PyPy project. It can be used to write various types of software tests, including unit tests, integration tests, end-to-end tests, and functional tests.


* Its features include parametrized testing, fixtures, and assert re-writing. 


* Is is often use with the Functional Programming Pattern but can be used in OOP test.


* Pytest is Simple to use and easy to understand.



* Just create a function and pass it parameters and simple assert that a function returns the expected result. 

---

### What is Selenium


* Selenium is an open source umbrella project for a range of tools and libraries aimed at supporting browser automation.



* It provides a playback tool for authoring functional tests across most modern web browsers, without the need to learn a test scripting language.



* Selenium has Python, Java, JavaScript and Ruby bindings.



* Selenium can be use for automating and testing any browser based task.

---

### Functional or OOP

* Selenium and Pytest both work very well in Functional and OOP styles of programming



* In my option functional programming is fair easier for Pytest,



* To work with Pure Function programming you need to create Utility functions 



* To work with OOP, you just need to initialize the Selenium Object
---

### How to Setup Function Testing
We first need to install Pytest and Python Selenium Bindings.
To do this run the following commands.

```bash
pip install pytest
pip install selenium
```

Then we need to download the Selenium driver, on windows just got to the site and put the binary in the same directory as the project, on Linux and MacOS you can use a package manager. I am running a Arch base Distro So I will run
```
sudo yay -S chromedriver
```
If you are on MacOS or Any other Linux Distro I recommend Nix package manager, Nix is a very nice package manager that has almost everything.

```
nix-shell -p chromedriver
```

---

Now that we have the chromedriver we can start writing the test, of course we need to import Pytest and Selenium

```python
import pytest
import selenium
```

Now we need to create a test setup function

```python
def test_setup():
    global driver 
    driver_path = "/path/to/chromedriver"
    driver = webdriver.Chrome(driver_path)
    #Wait for Page to Load
    driver.implicitly_wait(10)
    # get a website, so demo
    driver.get("https://initpro.dev/")
```
Now lets find the contact for and send a Email

```python
def email_form_test():
    driver.find_element_by_id("name").send_keys("John Dou")
    driver.find_element_by_id("email").send_keys("mail@johndoushippng")
    driver.find_element_by_id("message").send_keys("I need a web app for my shipping company")
```

We can also test other thinks like the website's title

```python
def title_test():
    x = driver.title
    assert x == "iniPro - initPro"
```
You can test almost anything on the website, such as Modals, Form and Menus. After all test have passed you need to "tare down" the webdriver. 
To do this I recommend just having a function at the end call 

```python
def test_teardown():
    driver.close()
    driver.quit()
    print("Test Complete")
```
---

#Here is the Full Code

```python
def test_setup():
    global driver 
    driver_path = "/path/to/chromedriver"
    driver = webdriver.Chrome(driver_path)
    driver.implicitly_wait(10)
    driver.get("https://initpro.dev/")

def email_form_test():
    driver.find_element_by_id("name").send_keys("John Dou")
    driver.find_element_by_id("email").send_keys("mail@johndoushippng")
    driver.find_element_by_id("message").send_keys("I need a web app for my shipping company")

def title_test():
    x = driver.title
    assert x == "iniPro - initPro"

def test_teardown():
    driver.close()
    driver.quit()
    print("Test Complete")
```
