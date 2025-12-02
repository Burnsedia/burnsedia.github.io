# **TLDR: I hate social media, but I need it for marketing**

I hate social media with a passion. It seems fake, fraudulent, and vain.  
Unfortunately for us introverted autistic nerds, it is a business necessity these days.

So I began researching ways to use social media platforms for my marketing. I settled on Twitter, Instagram, and LinkedIn.

I have not gotten any leads from Instagram or LinkedIn that I was convinced were humans.  
Twitter, on the other hand, has a verification system that I can be reasonably confident in.

Furthermore, Twitter is the fastest-growing social media platform, and its recommendation algorithm is open source on GitHub, so I am able to create an optimized strategy based on the algorithm.

This allows me to very efficiently target my marketing. I just need to know what my target audience likes, hates, replies to, and what time they are online.

After getting this data, I started tweeting.

As you could predict, I ran into some problems, including but not limited to:

- consistency  
- mental exhaustion  

I realized that if consistency is the problem, automation is the solution.

So I automated my Twitter account with a Twitter bot. I took an old template, used ChatGPT to update the code, and deployed it as a cronjob on a Linux server.

The bot now:

- posts daily tweets  
- rotates tweet types (value, engagement, authority, etc.)  
- never burns out  
- stays consistent even when I’m busy  

I also built a GitHub Action that turns my Git commit messages into “building in public” posts.  
This means my coding activity automatically becomes content with zero extra effort.

Essentially, I built an AI-powered marketing system that works 24/7.

---

# **Result (without any optimization I got leads for a cent each)**

Even *before* creating an optimized marketing strategy, I was able to get the cost to acquire a lead down to **1 penny** using brute force alone.

Most people pay **$2–$10 per lead** using ads.  
I got it for $0.01 by automating 12 tweets a day tweeting about:

- motivational posts on startup life  
- sarcastic shitposts about startups and VCs  
- general indie hacker and dev content  

Optimization will only improve this and scale it further.

---

# **10,000 ft Overview of the System**

At a high level, my entire Twitter automation system works like this:

1. I maintain a simple `prompts.txt` file with short ideas, topics, or hooks.
2. Every time the cronjob runs, the bot:
   - loads the prompts  
   - picks a random category (value, engagement, or authority)  
   - selects a matching prompt  
   - then randomly picks one of 8 system styles:
     - motivational  
     - contrast  
     - transformational  
     - hot take  
     - argument driver  
     - shitpost  
     - stoic dev wisdom  
     - soft CTA  

3. The selected system prompt becomes the “voice” of that tweet.  
4. It sends both the system prompt and the user prompt to GPT-4.1 to generate the tweet.  
5. The output is cleaned, truncated to 280 characters, and posted automatically using the Twitter API.  
6. The bot runs 12 times a day through cron, which means:
   - 12 tweets per day  
   - each in a different style  
   - each meant to hit a different part of the algorithm  
   - without me manually doing anything  

Because of this setup, I get a predictable mix of:
- motivational startup hustle content  
- sarcastic startup/VC shitposts  
- spicy hot takes  
- stoic coding wisdom  
- argument-bait debates  
- authority-style educational posts  
- soft CTAs that funnel leads  

It is basically a fully-automated “building in public” machine that never burns out, never forgets to post, and never breaks consistency.

---

# **Next Steps**

- Connecting the bot to my analytics pipeline  
- Turning the bot into a RAG app that learns from my content  
- Expanding to LinkedIn and Instagram with platform-specific variations  
- Using LLMs to personalize replies and DMs at scale  
- Turning this into a SaaS with a limited waitlist  
- Building a fully agentic marketing system that can generate value-based content, engage with people, and drive traffic automatically

