# Performance Marketing Basics for Project Managers

This module gives project managers enough knowledge of paid advertising, mainly Google Ads and Meta Ads (Facebook and Instagram), to follow what a performance marketer is saying, read the numbers, and answer client questions without overpromising. It teaches the terms and formulas you will hear every week, such as CPC, CTR and ROAS. It is written for non-specialists and uses online store examples. It does not describe our internal process; see the main onboarding module for that.

## 1. How paid advertising works

**Performance marketing** means paying for advertising where results are measured and tied to actions such as clicks, leads or sales. The advertiser sets a budget, chooses who to reach, and the platform shows the ads and reports what happened.

**The auction.** Each time someone searches on Google or opens Facebook or Instagram, the platform runs a very fast auction among advertisers who want to reach that person. The winner is not simply the highest bidder. The platform also scores how relevant and useful the ad is to that person, so a better ad can win at a lower price.

**Paid versus organic**

| | Paid ads | Organic (SEO and social posts) |
| --- | --- | --- |
| Speed | Can start bringing visitors within days | Usually builds over months |
| Cost | Pay per click, view or action | No direct cost per click, but takes effort and time |
| Stops when | Spending stops | Benefits tend to last |
| Control | Precise control of budget, audience and message | Less direct control |

**Search ads versus social ads.** The two big platforms work differently, and this matters when you talk to clients.

| | Google Search ads | Meta ads (Facebook and Instagram) |
| --- | --- | --- |
| Reaching people | People who are actively searching for something | People scrolling who may not be looking to buy |
| Intent | High: they typed what they want | Lower: the ad has to catch attention |
| Best at | Capturing existing demand | Creating demand and showing products to the right audiences |
| Format | Mostly text, with product listings in Shopping | Images, video and carousels |

Most stores need both: Google to capture people who are ready to buy, and Meta to introduce products and bring people back.

## 2. Google Ads basics

Google Ads lets advertisers appear on Google Search, Shopping results, YouTube, Gmail and a large network of websites and apps.

| Campaign type | What it does | Good for |
| --- | --- | --- |
| Search | Text ads that appear when people search specific phrases | Capturing buyers searching for what the store sells |
| Shopping | Product listings with image, price and store name, built from a product feed | Online stores selling products |
| Performance Max | An automated campaign that runs across all Google channels from one set of assets and a product feed | Stores that want Google's automation to find buyers across channels |
| Display | Image ads across websites and apps | Awareness and bringing visitors back (remarketing) |
| Video (YouTube) | Video ads on YouTube | Awareness and storytelling |
| Demand Gen | Visual ads across YouTube, Discover and Gmail aimed at creating demand | Reaching new audiences with strong visuals |

**Key ideas in Google Search**

- **Keywords and match types.** Advertisers choose phrases to target. Broad match shows the ad for related searches, phrase match for searches that include the meaning of the phrase, and exact match for searches that closely match it. Broad match reaches more people but needs more supervision.
- **Negative keywords.** Words that stop the ad from showing, for example "free" or "jobs", which saves money on irrelevant clicks.
- **Search terms report.** Shows the actual searches that triggered the ads. Specialists review it regularly to remove waste and find new ideas.
- **Quality Score.** A 1 to 10 estimate of ad quality, based on expected click-through rate, ad relevance and landing page experience. Higher quality tends to lower costs.
- **Ad Rank.** Roughly, bid and quality together decide the position of an ad.
- **Bidding strategies.** Manual bidding sets the maximum price per click. Smart Bidding strategies, such as Maximize Conversions, Target CPA and Target ROAS, let Google adjust bids automatically for each auction. Automated strategies need enough conversion data to work well.

**Shopping and product feeds.** Shopping ads and Performance Max for stores depend on a **product feed** sent to **Google Merchant Center**. The feed holds product titles, prices, images and availability. Poor feed data, such as weak titles, missing details or wrong prices, leads to poor results and sometimes disapproved products.

## 3. Meta Ads basics

Meta Ads run across Facebook, Instagram and other Meta placements. Ads are managed in Meta Ads Manager.

**Campaign objectives.** Each campaign has a goal, such as sales, leads, traffic, engagement or awareness. The choice tells Meta what to optimise for. For a store, the usual objective is sales.

**Targeting and audiences**

- **Broad audiences.** Meta's system finds likely buyers with little targeting from the advertiser. This is now common and works well when tracking is accurate and the creative is strong.
- **Interest and demographic targeting.** Reaching people by age, location and interests.
- **Custom audiences.** Lists of people who already know the brand, such as site visitors, people who added to cart, past buyers or an uploaded customer list.
- **Lookalike audiences.** People who resemble an existing audience, such as past buyers.

**Prospecting and retargeting.** Prospecting reaches new people who do not know the store. Retargeting (also called remarketing) reaches people who have already visited or interacted. Retargeting audiences are small and often convert well, but a store that only retargets stops growing because nobody new enters the funnel.

**Ads that suit online stores.** Catalog ads (dynamic product ads) automatically show products from your catalog to the people most likely to want them. Meta also offers automated "Advantage+" campaign types for stores, where the system handles much of the targeting and placement.

**Creative matters most.** On Meta, the image, video and message are the main levers for performance. People scroll quickly, so the first seconds and the first line of text decide whether anyone stops.

## 4. How an ad account is organised

Both platforms use layers. Knowing them helps you follow a performance marketer's explanations.

| Level | Google Ads | Meta Ads | What is set here |
| --- | --- | --- | --- |
| Top | Campaign | Campaign | Goal, budget (Google) or objective, overall structure |
| Middle | Ad group | Ad set | Audience or keywords, placements, schedule, budget (Meta can set it here) |
| Bottom | Ad | Ad | The creative: text, images, video, link |

**Budget basics**

- A **daily budget** is the average amount spent per day. On Google, a single day can run over the daily amount, but the monthly total is capped at roughly the daily budget multiplied by the average days in a month.
- Larger budgets give the system more data and more testing room. A tiny budget spread over many campaigns often gives weak, unclear results.
- Budgets can be changed, but large sudden jumps can disturb the system's learning.

**Structure tip for PMs.** Ask for a simple map: which campaigns exist, what each is for, who it targets, and its budget. If no one can explain what a campaign is for, it should not be running.

## 5. Tracking and setup

Ads cannot be judged or improved without accurate tracking. Setting it up and checking it comes before spending.

| Piece | What it does |
| --- | --- |
| Conversion tracking (Google Ads) | Tells Google when a purchase or lead happens so it can learn and report |
| Meta Pixel and Conversions API | Tell Meta about visitor actions, from the browser and from the server. Using both improves accuracy. |
| Google Tag Manager | A tool for adding and managing tracking code without editing the site |
| GA4 (Google Analytics) | Shows visitor behaviour and conversions across all sources |
| Product feed and Merchant Center | Supply product data for Shopping and catalog ads |
| UTM parameters | Tags added to links so analytics shows which campaign sent a visitor |
| Platform and store integrations | Shopify has official connections for Google and Meta that set up much of the tracking |

**Before any money is spent, check that**

- A test purchase shows up in the platform and in analytics
- The purchase value is passed correctly, not just the count
- The same sale is not counted twice
- The feed has no major errors
- Policy and billing details are in order

**Why numbers differ between tools.** Each platform measures in its own way. Google Ads, Meta, GA4 and Shopify will rarely show the same sales numbers. Privacy changes and browser limits also mean some conversions go unseen. Use the store's own sales data as the reference for total revenue, and use the ad platforms to compare campaigns against each other.

## 6. Metrics and formulas you must know

These are the terms you will hear every week. Learn the formula, what it tells you, and what it does not.

| Term | Formula | What it tells you |
| --- | --- | --- |
| Impressions | Count of times the ad was shown | How often it was seen |
| Reach | Number of unique people who saw the ad | How many different people were reached |
| Frequency | Impressions ÷ Reach | How many times each person saw the ad on average |
| Clicks | Count of clicks on the ad | How many people showed interest |
| CTR (click-through rate) | Clicks ÷ Impressions × 100 | How attractive the ad is to the people who saw it |
| CPC (cost per click) | Spend ÷ Clicks | The average price of a visit |
| CPM (cost per 1,000 impressions) | Spend ÷ Impressions × 1,000 | The price of reaching 1,000 views |
| Conversion | A desired action, such as a purchase or lead | The outcome that matters |
| CVR (conversion rate) | Conversions ÷ Clicks × 100 | How many visitors take the action |
| CPA (cost per acquisition or action) | Spend ÷ Conversions | The cost of one sale or lead |
| AOV (average order value) | Revenue ÷ Orders | How much a typical order is worth |
| Conversion value or revenue | Total sales value credited to ads | Money attributed to ads |
| ROAS (return on ad spend) | Revenue from ads ÷ Ad spend | Revenue earned per unit of ad spend |
| ROI (return on investment) | (Profit - Cost) ÷ Cost × 100 | Profit compared with total cost |
| Break-even ROAS | 1 ÷ Profit margin (as a decimal) | The ROAS needed to cover product and ad costs |
| CAC (customer acquisition cost) | Total marketing cost ÷ New customers | The cost of winning a new customer |
| LTV (lifetime value) | Average value a customer brings over time | How much a customer is worth in total |
| MER (marketing efficiency ratio) | Total revenue ÷ Total marketing spend | Overall efficiency across all channels, not just one platform |
| Impression share | Impressions received ÷ Impressions possible | The share of available searches where your ad showed (Google) |

**Worked example.** A store spends $2,000 on ads in a month. The ads get 200,000 impressions, 2,500 clicks and 40 orders. The revenue from those orders is $8,000.

| Metric | Calculation | Result |
| --- | --- | --- |
| CTR | 2,500 ÷ 200,000 × 100 | 1.25 percent |
| CPC | 2,000 ÷ 2,500 | $0.80 |
| CPM | 2,000 ÷ 200,000 × 1,000 | $10 |
| Conversion rate | 40 ÷ 2,500 × 100 | 1.6 percent |
| CPA | 2,000 ÷ 40 | $50 |
| AOV | 8,000 ÷ 40 | $200 |
| ROAS | 8,000 ÷ 2,000 | 4.0 (written 4x) |

**Is a 4x ROAS good?** It depends on profit margin. If the store keeps 40 percent of each sale after product costs, shipping and fees, then the break-even ROAS is 1 ÷ 0.40 = 2.5. A ROAS of 4 means a gross profit of $3,200 (40 percent of $8,000), minus $2,000 in ads, which leaves $1,200. If the margin were only 20 percent, the break-even ROAS would be 5, and a 4x ROAS would lose money.

**What this teaches**

- ROAS alone does not say whether ads are profitable. You must know the margin.
- A high ROAS with a tiny budget may not mean much and may not scale.
- A low CPC is not good by itself. Cheap clicks that never buy are expensive.
- Review metrics in a chain: impressions, then CTR, then CPC, then conversion rate, then CPA, then ROAS. The weak link shows where to look.

**Reading the chain**

- Low CTR: the ad or targeting is not attracting people
- High CTR but low conversion rate: the page, price, offer or traffic quality is the problem
- High CPC: strong competition, weak quality, or narrow targeting
- Rising CPA with the same spend: audience fatigue, tracking problems or seasonal change

## 7. The learning phase and optimisation

**Learning phase.** Ad systems need data to learn who is likely to buy. Meta shows a "learning" status for new or edited ad sets, which it generally exits after about 50 optimisation events (for example purchases) in a week. Google's automated bidding also needs a period to learn. During this time, results can swing widely.

**What this means for you**

- Do not judge a campaign after a few days
- Avoid frequent changes to budgets, audiences or creatives during learning, because each large change can restart it
- Stores with few purchases each week give the system little to learn from, so results are slower and noisier
- Plan for a testing period of at least two to four weeks before drawing conclusions

**What optimisation looks like**

- Reviewing search terms and adding negative keywords
- Pausing weak ads and campaigns and giving more budget to strong ones
- Testing new creatives, headlines and audiences
- Fixing feed problems
- Adjusting bids and targets as data builds up
- Checking landing pages and site speed

**A/B testing.** Testing one change at a time, such as two headlines, so that you know what caused any difference. Tests need enough data to be reliable.

**Creative fatigue.** When people see the same ad too often, results fall. A rising frequency with falling CTR is a typical sign. The fix is fresh creative.

## 8. Creatives and landing pages

**Ads are only half the system.** After the click, the page has to do its part.

**What makes a strong ad**

- A clear message and a clear benefit
- A good first few seconds or first image
- A direct call to action
- A look that fits the platform: native, not like a billboard
- Social proof, such as reviews or ratings, where it fits

**What makes a strong landing page**

- It matches the ad's promise, product and price
- It loads quickly on mobile
- The product, price, shipping and returns are clear
- Checkout is simple and trustworthy
- Reviews and trust signals are visible

**Common failures**

- Sending all traffic to the home page instead of the relevant product or collection
- A price or offer in the ad that does not match the page
- Slow mobile pages
- Weak product photos or thin descriptions

**Tip for PMs.** When ads underperform, ask the marketer to check the landing page and offer before assuming the ads are the problem. Fixing a page often improves results across all campaigns at once.

## 9. Budgets, goals and expectations

**Setting a realistic budget**

- Start with the goal: number of sales, revenue or leads
- Work out how many sales the budget can realistically produce using an assumed CPA or ROAS
- Include margin: ads must pay for themselves after product costs
- Allow budget for testing, because early spend buys learning

**Simple budget check**

If a store wants 100 orders a month and its realistic CPA is $50, the ad budget needed is 100 × 50 = $5,000. If the client offers $2,000, they can expect about 40 orders, and the goal needs to be adjusted.

**Things that affect results**

- Product price and margin
- Brand awareness and trust
- Competition and season, for example festivals and sale periods
- Site speed and checkout experience
- Reviews and social proof
- The quality of the product photos and offers
- Tracking accuracy

**Management fee versus ad spend.** The agency fee and the ad spend are separate. Clients pay ad spend directly to the platform. Make this clear at the start.

## 10. Common problems

| Problem | Typical causes | What to ask the marketer |
| --- | --- | --- |
| No sales after several days | Learning phase, tracking broken, weak offer, low budget | Is tracking verified? Has the learning phase finished? |
| Sudden fall in performance | A site or feed problem, a disapproved ad, a policy issue, creative fatigue, a competitor or seasonal change | What changed on the site or account in the last few days? |
| Ads disapproved | Policy violations, misleading claims, restricted products, landing page problems | Which policy is cited, and what is the fix? |
| Account suspended or restricted | Policy breaches, payment problems, suspicious activity | What does the notice say, and what is the appeal route? |
| High spend, few sales | Poor targeting, weak page, wrong keywords, wasted clicks | What does the search terms report or audience breakdown show? |
| Numbers do not match the store | Different tracking and attribution methods | Which source do we treat as the reference? |
| Spend not delivering | Budget too low, audience too narrow, ad under review, billing issue | Is the ad approved, and is billing active? |
| Rising costs | More competition, creative fatigue, a seasonal peak | How do costs compare with the same period last year? |

**Account health.** Keep payment methods valid, follow the advertising policies, and avoid claims that cannot be proven. Policy breaches can restrict an account and can be slow to fix. Always get the client's approval before launching claims about results, health or income.

## 11. Talking to clients: expectations and red flags

**What we can say with confidence**

- We can set up, run and optimise the campaigns and report on them clearly
- Early weeks are for learning and testing
- Results depend on the product, price, page, offer and competition as well as on the ads
- Tracking and the first data will tell us what to improve

**What we must never say**

- A guaranteed ROAS, cost per sale or number of sales
- That ads will be profitable in the first week
- That one platform alone will always outperform the other
- Any promise about reviving a suspended account

**Better ways to say it**

- Instead of "You will get a 4x ROAS", say "We will target a ROAS that suits your margins, and we will review progress against it after the learning period."
- Instead of "The ads are not working", say "Here is where the numbers show the weak point, and here is what we will test next."

**Red flags**

- No tracking check before spending
- Many campaigns on a small budget
- Reports showing spend and clicks but no sales or revenue
- ROAS quoted without any mention of margin
- Constant changes during the learning period
- Claims or promises that sound too good to be true

**When you are unsure.** It is better to say "I will check with the performance marketer and come back to you by tomorrow" than to guess.

## 12. Client questions and sample answers

These are answers a project manager can give in plain language. Adapt the wording to the client and check with the performance marketer for anything specific to the account.

**1. What is performance marketing?**
It is paid advertising where results are measured and linked to actions such as sales or leads. We set a budget, show ads to the right people, track what happens, and keep improving the campaigns based on the data.

**2. How quickly will we see sales?**
Some sales can come within days, but the first few weeks are mostly learning and testing. The platforms need data to find the right buyers. Clear judgement is usually possible after the learning period, once enough sales and clicks have come in.

**3. Can you guarantee a ROAS or cost per sale?**
No. Results depend on your product, price, margins, website, competition and season, as well as the ads. What we do commit to is correct setup, careful management and clear reporting against a target we agree with you.

**4. What is ROAS?**
ROAS stands for return on ad spend. It is the revenue from ads divided by the amount spent on them. A ROAS of 4 means that for every $1 spent, $4 in sales was credited to the ads.

**5. What ROAS do we need?**
It depends on your profit margin. As a simple rule, divide 1 by your margin to get the break-even ROAS. With a 40 percent margin, the break-even ROAS is 2.5, so anything above that makes a profit on the first sale before other costs.

**6. What is CPC and what is a good one?**
CPC is cost per click, which is spend divided by clicks. There is no single good number. It varies with your industry, competition and season. A cheap click that does not buy is not good, so we look at cost per sale and ROAS alongside it.

**7. What is CTR?**
CTR is click-through rate, which is clicks divided by impressions. It shows how many of the people who saw the ad clicked it, and so how attractive the ad and targeting are.

**8. What is CPA?**
CPA is cost per acquisition, which is spend divided by conversions. In a store, it is the cost of one sale. We compare it with your order value and margin to see if the ads are profitable.

**9. Why is the campaign spending money but giving no sales?**
There are several possible reasons: it may still be learning, the tracking may not be recording sales, the audience or keywords may need adjusting, or the page or offer may not convert. We will check tracking first, and then review each part of the funnel to find the weak point.

**10. Why do the numbers in Meta or Google differ from my Shopify sales?**
Each platform tracks and credits sales differently, and some sales cannot be tracked because of privacy settings. We use your store's total sales as the reference for revenue, and we use the platform data to compare campaigns with each other.

**11. Should we use Google Ads or Meta Ads?**
Usually both play a role. Google reaches people who are searching for what you sell. Meta introduces your products to people who are not yet looking and brings visitors back. The right mix depends on your product and budget.

**12. How much should we spend?**
It depends on your goals and margins. We work backwards from the number of sales you want and a realistic cost per sale, and add some budget for early testing. A very small budget spread across many campaigns usually gives weak results.

**13. Is the ad spend included in your fee?**
No. Our fee covers the setup and management. The ad spend is paid directly to Google or Meta from your account, and you can see it at any time.

**14. Why were my ads disapproved?**
Ads can be disapproved for policy reasons, such as claims that cannot be supported, restricted products, or problems with the landing page. The platform tells us the reason, and we will fix the issue and request a review.

**15. Why did performance suddenly drop?**
Common causes include a site or feed issue, tracking problems, an ad disapproval, creative fatigue, stronger competition, or seasonality. We check what changed in the account, on the site, and in the market, and we report back with a plan.

**16. Why does the performance marketer keep asking us to wait before changes?**
New campaigns need time to learn. Frequent changes restart the learning and make results harder to read. Waiting a few weeks lets the system settle, and then changes can be made based on solid data.

**17. Why are creatives so important?**
On social platforms, the image or video decides whether anyone stops scrolling. A strong creative lowers costs and raises sales. We test several versions and keep the ones that work.

**18. Can we advertise before our website is ready?**
It is not a good idea. Ads send paid visitors to the site, so a slow, unfinished or untracked site wastes money. We recommend launching ads after the site, tracking and checkout have been tested.

**19. What is retargeting?**
Retargeting shows ads to people who have already visited your site or shown interest, for example someone who added a product to the cart. These audiences are small but often convert well. We use it alongside ads that reach new customers.

**20. What do you need from us to start?**
Access to your ad accounts and store, product and price information, a working payment method for ad spend, brand assets, and approval of the claims and offers in the ads. Delays on these items are a common cause of late launches.

**21. Do we own the ad accounts?**
It is best practice that the client owns their ad accounts, product feed and tracking, with the agency added as a user. That way you keep your data and history.

**22. How will I know what is happening?**
We share regular updates, and a monthly report that covers spend, results against the agreed target, what we learned, what we tested, and the plan for the next month.

## 13. Glossary and knowledge check

**Glossary**

| Term | Meaning |
| --- | --- |
| A/B test | Comparing two versions of one element to see which performs better |
| Ad group | A Google Ads level that holds related keywords and ads |
| Ad Rank | The score that decides an ad's position, based on bid, quality and other factors |
| Ad set | A Meta Ads level that holds audience, placements, budget and schedule |
| Advantage+ | Meta's automated campaign options, where the system handles targeting and placements |
| AOV | Average order value: revenue divided by orders |
| Attribution | How a sale is credited to ads and channels |
| Audience | A group of people targeted by an ad |
| Bid strategy | The method used to set what you pay in each auction |
| Break-even ROAS | The ROAS needed to cover product and ad costs, equal to 1 divided by the margin |
| Broad match | A keyword setting that shows ads for related searches |
| CAC | Customer acquisition cost |
| Catalog ads | Meta ads that show products automatically from a product catalog |
| Conversion | The desired action, such as a purchase or a lead |
| Conversions API | A way of sending tracking data to Meta from the server |
| CPA | Cost per acquisition: spend divided by conversions |
| CPC | Cost per click: spend divided by clicks |
| CPM | Cost per thousand impressions |
| Creative | The image, video and text of an ad |
| Creative fatigue | A fall in results when people see the same ad too often |
| CTR | Click-through rate: clicks divided by impressions |
| CVR | Conversion rate: conversions divided by clicks |
| Custom audience | A Meta audience built from the brand's own data or site visitors |
| Frequency | The average number of times each person saw the ad |
| Funnel | The path from awareness to purchase |
| Google Tag Manager | A tool for managing tracking code on a site |
| Impression | One showing of an ad |
| Impression share | The share of possible impressions your ads received |
| Landing page | The page a visitor reaches after clicking an ad |
| Learning phase | The period when the system is gathering data to optimise delivery |
| Lookalike audience | People similar to an existing audience, such as past buyers |
| LTV | Lifetime value: the total value a customer brings |
| Merchant Center | Google's tool for managing the product feed |
| MER | Marketing efficiency ratio: total revenue divided by total marketing spend |
| Negative keyword | A word that stops ads showing for unwanted searches |
| Performance Max | An automated Google Ads campaign across all Google channels |
| Pixel | Tracking code that records visitor actions |
| Product feed | A file of product data sent to an ad platform |
| Quality Score | A 1 to 10 estimate of ad and landing page quality in Google Search |
| Reach | The number of unique people who saw an ad |
| Remarketing or retargeting | Showing ads to people who already visited or interacted |
| ROAS | Return on ad spend: revenue divided by ad spend |
| ROI | Return on investment: profit compared with cost |
| Search terms report | The report of actual searches that triggered ads |
| UTM parameters | Tags on links that show which campaign sent a visitor |

**Knowledge check**

1. A store spends $2,000 and earns $7,000 in sales from ads. What is the ROAS?
2. The same store has a 30 percent margin. What is the break-even ROAS, and is the store profitable on the ads?
3. An ad has 100,000 impressions, 1,500 clicks and a spend of $1,500. What are the CTR, CPC and CPM?
4. Explain the difference between prospecting and retargeting.
5. A campaign has a good CTR but almost no sales. Where would you look first?
6. Why should changes be limited during the learning phase?
7. Why do Meta, Google and Shopify show different sales numbers?
8. What should be checked before any ad money is spent?
9. A client asks you to guarantee a 5x ROAS. How do you respond?
10. Why is a low CPC not always a good sign?

**Answer guide**

1. ROAS = 7,000 ÷ 2,000 = 3.5
2. Break-even ROAS = 1 ÷ 0.30 = 3.33. A ROAS of 3.5 is slightly above break-even, so the ads barely cover product and ad costs, with little profit left after other expenses.
3. CTR = 1,500 ÷ 100,000 × 100 = 1.5 percent. CPC = 1,500 ÷ 1,500 = $1. CPM = 1,500 ÷ 100,000 × 1,000 = $15.
4. Prospecting reaches new people who do not know the brand. Retargeting reaches people who already visited or interacted.
5. Look at the landing page, price, offer, page speed, and the quality of the traffic, because the ad is attracting clicks but the visit is not converting.
6. Each large change can restart learning, which makes results unstable and harder to read.
7. Each uses its own tracking and attribution method, and some conversions cannot be tracked. Use the store's total sales as the reference.
8. Conversion tracking is tested and passing the correct sale value, the product feed has no major errors, and billing and policy details are in order.
9. We cannot guarantee a ROAS. Explain what we control, what we do not, and offer to agree a target based on their margins and review it after the learning period.
10. Cheap clicks may come from people who never buy. What matters is the cost per sale and ROAS.
