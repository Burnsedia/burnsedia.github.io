---
title: "Pytest and Selenium"
description: "How I set up Pytest with Selenium for browser testing in Python — the practical setup, not the theory."
pubDate: "2023-02-09"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["python", "testing", "selenium", "tutorial"]
faq:
  - question: "Should I use Pytest with Selenium for UI testing?"
    answer: "Yes, Pytest gives clean test structure and Selenium handles browser automation, which is a practical combo for Python UI tests."
  - question: "What is the first thing to set up for Selenium tests?"
    answer: "Install Selenium and a browser driver, build one stable smoke test before scaling coverage."
  - question: "How do I keep UI tests maintainable?"
    answer: "Use reusable helpers, stable selectors, and avoid asserting on UI details that change often."
---

# Pytest and Selenium

I test web apps with Pytest and Selenium. Here's the setup I use — nothing fancy, just what works.

## What is Pytest

Pytest is a Python testing framework. It handles unit tests, integration tests, end-to-end tests, and functional tests. Parametrized tests, fixtures, assert rewriting — it has the features you actually need without ceremony.

Write a function, assert something, run it. That's the pattern.

## What is Selenium

Selenium automates browsers. You write code that clicks buttons, fills forms, and checks that things appear on the page. Useful for testing web apps end-to-end.

It works with Chrome, Firefox, and other browsers. You need a WebDriver for each browser — that's the binary that translates your Python commands into actual browser actions.

Setting up Selenium:
```bash
pip install selenium
```
Download the appropriate WebDriver (chromedriver for Chrome, geckodriver for Firefox) and put it in your PATH.

## Basic Test Structure

```python
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By

@pytest.fixture
def browser():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()

def test_page_title(browser):
    browser.get("https://example.com")
    assert "Example" in browser.title
```

The fixture starts the browser before each test and shuts it down after. Simple, reliable.

## Making Tests Maintainable

Two patterns that save time:

1. **Page Objects.** Wrap page interactions in classes so you don't repeat selectors.
2. **Stable Selectors.** Use data attributes instead of CSS classes that change. `button[data-testid="submit"]` survives redesigns. `.btn-primary` does not.

## What I Actually Do

I keep tests focused on user workflows, not UI polish. Test that login works, that forms submit, that error messages show up. Don't test that a button is the right shade of blue — that breaks for no value.

One smoke test that covers the critical path is worth more than 50 unit tests that cover nothing real.
