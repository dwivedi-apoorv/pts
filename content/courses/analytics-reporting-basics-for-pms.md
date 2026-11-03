# Analytics and Reporting Basics
This module gives project managers enough knowledge of analytics and reporting to read data correctly, spot problems in reports, build clear client reports, and explain numbers to clients without overpromising. It covers the main tools (including Google Analytics 4 and Google Search Console), how tracking works, why numbers differ between tools, and how to report off-page and content activities, and how to turn data into a useful report. It is written for non-specialists and uses online store examples in USD. It does not describe our internal process; see the main onboarding module for that.

## 1. Why project managers need analytics basics

Every service we sell is judged by numbers. A project manager who understands analytics can:

- Read a report and tell whether it says something real
- Spot tracking problems before they turn into wrong decisions
- Explain to a client why two tools show different numbers
- Ask specialists useful questions about what the data means
- Build reports that clients read, trust and act on
- Avoid promising or reporting things the data cannot support

**How to use this module.** Read chapters 1 to 14 once. Use chapter 15 and chapter 16 (client questions) when preparing for client calls and report meetings, and the glossary in chapter 17 when a term is unfamiliar. Chapters 10 to 12 cover Search Console, off-page activity and the combined client report.

## 2. Data sources and what each one tells you

No single tool shows everything. Each answers different questions.

| Source | What it shows | Best used for |
| --- | --- | --- |
| Shopify analytics and reports | Orders, sales, products, customers, returns | The reference for actual store sales |
| Google Analytics 4 (GA4) | What visitors do on the site, where they came from, and conversions | Website behaviour and channel comparison |
| Google Search Console | How the site appears in Google search: impressions, clicks, positions, indexing | SEO performance |
| Google Ads | Ad spend, clicks, conversions and costs on Google | Google paid performance |
| Meta Ads Manager | Ad spend, reach, clicks and results on Facebook and Instagram | Meta paid performance |
| Social platform insights | Reach, engagement and audience data per platform | Organic social performance |
| Email platform reports | Opens, clicks, revenue and list growth | Email performance |
| SEO tools (for example Ahrefs, Semrush) | Rankings, backlinks, competitors, estimated traffic | Search visibility, link tracking and competitor research |
| Off-page and content activity log | What we published, built or submitted, with URLs, dates and status | Reporting the work done outside and on the site |
| Behaviour tools (for example Microsoft Clarity or Hotjar) | Recordings and heatmaps of how people use pages | Finding usability problems |
| PageSpeed tools | Page speed and Core Web Vitals | Site speed work |

**The golden rule.** Use the store's own order data as the reference for how much was sold, and use the other tools to understand where visitors came from and how they behaved.

## 3. Google Analytics 4 basics

GA4 is Google's current analytics product. It records activity as **events**, such as a page view, a click, an add to cart or a purchase.

| Term | Meaning |
| --- | --- |
| Event | Any recorded action, such as page_view, add_to_cart or purchase |
| User | A person (or device) recorded by the system |
| Session | A group of actions by one user in a visit |
| Engaged session | A session that lasted long enough, included a conversion event or had multiple page views, as defined by GA4 |
| Engagement rate | Engaged sessions ÷ Sessions × 100 |
| Key event | An event marked as important to the business, such as a purchase. GA4 used to call these conversions, and some Google products still use that word. |
| E-commerce events | Events describing shopping actions: view item, add to cart, begin checkout, purchase |
| Source and medium | Where the visit came from, such as google / organic or facebook / paid_social |
| Channel group | A bucket that groups sources, such as Organic Search, Paid Search, Direct, Email, Referral and Organic Social |

**Useful GA4 reports for a store**

- **Traffic acquisition:** which channels bring sessions, engagement and purchases
- **Pages and screens:** which pages get visits
- **Landing pages:** where visitors first arrive
- **E-commerce purchases:** which products sell
- **Funnel exploration:** where people drop out between steps

**Things to know**

- GA4 depends on correct setup. If events or purchases are missing or duplicated, the data cannot be trusted.
- GA4 may hide or sample some data in detailed reports, and some reports update with a delay.
- Not everyone accepts cookies, so GA4 sees only part of the traffic in some regions.
- GA4 numbers do not usually match Shopify's exactly. That is normal, but a large gap suggests a tracking problem.

## 4. Tracking foundations

Tracking is how data gets collected. If it is wrong, every report is wrong.

| Piece | What it does |
| --- | --- |
| Tags and tag manager | Small pieces of code that send data. Google Tag Manager lets specialists add and manage them without editing the site each time. |
| Pixels | Tracking code from an ad platform, such as the Meta Pixel, that records visitor actions |
| Server-side tracking and APIs | Sending data from the store's server, for example Meta's Conversions API, which can improve accuracy |
| Cookies | Small files in the browser that help recognise returning visitors. Browsers and privacy rules limit them. |
| UTM parameters | Tags added to links, such as utm_source and utm_campaign, that tell analytics which campaign sent a visit |
| Consent tools | Banners that ask visitors to accept or reject tracking |
| Platform integrations | Shopify has official connections for Google, Meta and others that set up much of the tracking |

**UTM example.** A link in an email newsletter might be tagged with source=newsletter, medium=email and campaign=october_sale. Analytics then shows the sale under that campaign. Without tags, the visit may appear as Direct or under the wrong channel.

**Naming rules for UTMs.** Use consistent, lowercase names, agree the pattern, and keep a shared list. Inconsistent tagging splits the data.

**Before relying on any data, check that**

- A test purchase appears in Shopify, GA4 and any ad platform
- The purchase value and currency are correct
- A purchase is counted once, not twice
- Key events fire on the right pages and actions
- Internal and test traffic is excluded
- Tracking still works after theme, app or checkout changes

**Tip for PMs.** After any change to the store, theme or apps, ask whether tracking was checked. Many reporting problems start with an untested change.

## 5. Channels and attribution

**Channels.** GA4 groups visits into channels based on their source.

| Channel | What it covers |
| --- | --- |
| Organic Search | Unpaid visits from search engines |
| Paid Search | Visits from search ads |
| Paid Social | Visits from social ads |
| Organic Social | Visits from unpaid social posts |
| Email | Visits from email campaigns |
| Direct | Visits with no recorded source, such as typed addresses, bookmarks, and visits where the source was lost |
| Referral | Visits from links on other sites |
| Display and Video | Visits from other ad formats |

**Attribution** means deciding which channel gets credit for a sale. A customer might see an Instagram ad, later search the brand on Google, then click an email and buy. Who gets the credit?

| Model | How it gives credit |
| --- | --- |
| Last click | All credit to the final channel before the purchase |
| First click | All credit to the first channel that brought the visitor |
| Linear | Credit shared equally across the steps |
| Data-driven | Credit shared based on a model of how each step contributed |
| Platform-reported | Each ad platform reports sales it believes its ads influenced, often including people who only saw an ad |

**Why this matters.** Each platform tends to claim credit for a sale, so the totals can add up to more than the store really sold.

**Worked example.** In one month a store records 120 orders at an average of $80, which is $9,600 in revenue. Meta Ads reports 55 purchases, Google Ads reports 60, and GA4 shows 98 orders in total.

| Source | Reported | What is going on |
| --- | --- | --- |
| Shopify | 120 orders, $9,600 | The reference for how much was sold |
| GA4 | 98 orders | Missed some orders because of consent, blockers or tracking gaps |
| Meta Ads | 55 purchases | Counts orders it believes its ads influenced |
| Google Ads | 60 purchases | Counts orders it believes its ads influenced |
| Meta plus Google together | 115 purchases | Close to the whole 120, even though organic, email and direct visits also sold products |

**What this teaches.** Platforms overlap, so their claims should not be added together. The same order can be credited by more than one platform. No tool is lying: each measures in its own way. Use Shopify for the total, and use the platform numbers to compare campaigns against each other.

**A useful overall measure.** Marketing efficiency ratio (MER) = Total revenue ÷ Total ad spend. If the store spent $3,000 on ads in the example above, MER = $9,600 ÷ $3,000 = 3.2. It avoids the double counting problem because it uses the store's real revenue.

## 6. Core metrics reference

These metrics appear in nearly every report. The earlier modules explain them in detail.

| Group | Metric | Formula or meaning |
| --- | --- | --- |
| Traffic | Sessions | Number of visits |
| Traffic | Users | Number of people or devices |
| Traffic | New and returning users | First-time versus repeat visitors |
| Engagement | Engagement rate | Engaged sessions ÷ Sessions × 100 |
| Engagement | Pages per session and average engagement time | How much people explore |
| Store | Conversion rate | Orders ÷ Sessions × 100 |
| Store | AOV | Revenue ÷ Orders |
| Store | Add-to-cart rate | Sessions with an add to cart ÷ Sessions × 100 |
| Store | Cart abandonment rate | 1 - (Orders ÷ Carts created) as a percentage |
| Store | Revenue per session | Revenue ÷ Sessions |
| Search | Impressions, clicks, CTR, average position | From Search Console |
| Paid | Spend, CPC, CTR, CPA, ROAS | From the ad platforms |
| Efficiency | MER | Total revenue ÷ Total ad spend |
| Customer | CAC | Marketing cost ÷ New customers |
| Customer | LTV | Average value of a customer over time |
| Customer | Repeat purchase rate | Customers with more than one order ÷ All customers × 100 |

**Choose metrics by goal.** Each client should have a short list of metrics that connect to what they care about, usually revenue, orders and profit, not everything a tool can show.

## 7. Baselines, targets and comparisons

**Baseline.** A baseline is the starting point, recorded before the work begins. Without it, progress cannot be shown.

**Targets.** A good target is specific, measured, realistic and time-bound, for example "increase organic orders by 20 percent over six months". Agree targets with the client and the specialists.

**Comparing periods**

| Comparison | Good for | Watch out for |
| --- | --- | --- |
| Month over month | Recent change | Seasonality and different numbers of days |
| Year over year | Seasonal businesses | Changes in the store, prices and tracking from last year |
| Against target | Progress toward goals | Targets that were unrealistic |
| Against baseline | The impact of our work | Other factors changing at the same time |

**Be careful with**

- **Seasonality.** Sales rise and fall with festivals, weather and events. A drop after a peak is not always a problem.
- **Partial periods.** Do not compare a full month with half a month.
- **Small numbers.** A change from 2 orders to 4 is a 100 percent rise, but it is just two orders.
- **Averages.** One huge order can lift an average. Check the spread, not only the mean.
- **Tracking changes.** If tracking changed, the before and after numbers may not be comparable.

**Benchmarks.** Averages from other stores or industries are rough guides at best. Stores differ in price, products, traffic and country. The store's own history is usually the fairest comparison.

## 8. Reading data correctly

**Correlation is not causation.** Two things moving together does not prove that one caused the other. If sales rose in the month we launched a campaign, other things, such as a festival, may have contributed.

**Look for the cause.** When a number changes, work through possible reasons.

1. Is the data correct? Check tracking and the date range first.
2. Is it a real change, or normal variation?
3. Did anything change on the store, in ads, in the market or in the season?
4. Which part of the journey changed: traffic, conversion rate or order value?
5. Which channel, device, country or product caused it?

**Break the numbers into parts.** Revenue = Sessions × Conversion rate × AOV. If revenue fell, check which of the three changed.

**Worked example.** A store's revenue falls from $12,000 to $9,000.

| Measure | Last month | This month | Change |
| --- | --- | --- | --- |
| Sessions | 20,000 | 19,000 | Down 5 percent |
| Conversion rate | 2.0 percent | 1.5 percent | Down 25 percent |
| AOV | $30 | $31.6 | Up 5 percent |

Orders: last month 20,000 × 2.0 percent = 400, this month 19,000 × 1.5 percent = 285. Revenue: 400 × $30 = $12,000, and 285 × $31.6 = about $9,000.

**What this teaches.** Traffic barely moved and order value rose, so the problem is the conversion rate. That points to the store: a page, price, stock, checkout or tracking problem, not to a lack of traffic. Investigating the right part saves time.

**Segment the data.** Splitting by device, channel, country, new versus returning visitors and product often shows the real story. A store may do well on desktop and badly on mobile.

**Percentages versus numbers.** Always look at both. A 300 percent rise from 3 to 12 is small in absolute terms.

**Common traps**

- Cherry-picking the one chart that looks good
- Ignoring a tracking break
- Comparing different date ranges or different definitions
- Treating one day or one week as a trend
- Reading too much into small samples

## 9. Dashboards and tools

**Dashboards.** A dashboard is a page that shows key numbers at a glance, often updated automatically. Common tools are Looker Studio (free, connects to Google products), spreadsheets, and the dashboards built into Shopify and the ad platforms.

**A good dashboard**

- Has a clear purpose and audience
- Shows a handful of key metrics, not every metric available
- Compares against targets or earlier periods
- Uses consistent definitions and date ranges
- Notes the data sources and when it was last updated
- Is easy to read on a phone

**Dashboards versus reports.** A dashboard shows the current picture. A report explains what the numbers mean, what was done and what happens next. Clients need both, and the report matters more.

**Tools for PMs to know**

- **Looker Studio:** connects GA4, Search Console, Google Ads and sheets into shareable dashboards
- **Spreadsheets:** flexible for custom calculations and combining sources
- **Native reports:** quick checks inside each platform
- **Scheduled exports:** reports that arrive by email at set times

## 10. Google Search Console reporting

Google Search Console (GSC) is a free tool from Google that shows how a website appears in Google search. GA4 shows what people do after they arrive. Search Console shows what happens before they arrive: whether Google can find and index the pages, which searches show them, and how often people click. Both belong in an SEO report.

**Access.** The client owns the Search Console property, and we are added as users. Check that the property covers the whole site (a domain property is best) and that the right people have access.

**The Performance report**

| Metric | Meaning | How to read it |
| --- | --- | --- |
| Impressions | Times a page from the site appeared in search results | Shows visibility. Growth means the site appears for more searches |
| Clicks | Times people clicked through to the site from Google | Shows traffic from Google search |
| CTR (click-through rate) | Clicks divided by impressions | Shows how attractive the result is. Titles and descriptions affect it |
| Average position | Average ranking of the site for the searches shown | Lower is better. It is an average across many searches, so treat it as a trend |

**Ways to cut the data**

- **Queries:** the searches that showed the site. Separate branded searches (those with the store name) from non-branded ones. Non-branded growth shows SEO is bringing new customers
- **Pages:** which pages get impressions and clicks. Compare with the pages we optimised that month
- **Countries and devices:** useful when a client sells in specific markets or when mobile and desktop behave differently
- **Search appearance and dates:** compare periods to see whether changes line up with the work we did

**Other reports worth a regular look**

| Report | What it tells us | What to report |
| --- | --- | --- |
| Pages (indexing) | Which pages are indexed and why others are not | Number of indexed pages, new problems found and fixed |
| Sitemaps | Whether Google has read the sitemap and how many URLs it found | Sitemap status and submitted versus discovered URLs |
| Core Web Vitals | Speed and stability of pages for real visitors | Share of good URLs on mobile and desktop, and what was fixed |
| Mobile usability and enhancements | Problems with mobile pages and structured data | Errors found, fixed and still open |
| Manual actions and security issues | Penalties or hacking warnings | Report immediately if anything appears |
| Links | Pages and sites linking to the site, and top linked pages | A cross-check of the backlinks we built (see chapter 11) |

**Tips for reading Search Console**

- Compare equal date ranges, for example the last 28 days against the previous 28 days, or this month against last month
- Data is a few days behind, so finalise monthly figures a few days after the month ends
- Search Console stores a limited amount of history, so export the key figures each month
- Do not expect it to match GA4. Search Console counts clicks in Google search, and GA4 counts the visits it records on the site
- Rising impressions with flat clicks usually means the site is appearing for more searches but ranking low or has weak titles
- Rising clicks with falling average position can happen when the site starts to appear for many new, lower-ranking searches. Look at the queries before judging

**Worked example**

| Metric | Last month | This month | Change |
| --- | --- | --- | --- |
| Impressions | 80,000 | 92,000 | +15 percent |
| Clicks | 2,400 | 2,760 | +15 percent |
| CTR | 3.0 percent | 3.0 percent | No change |
| Average position | 14.2 | 12.8 | Improved by 1.4 |
| GA4 organic sessions | 2,150 | 2,380 | +11 percent |

How we would report it: "Visibility in Google grew 15 percent and clicks grew by the same amount, with ranking improving from 14.2 to 12.8. CTR held steady at 3 percent, so the extra clicks came from appearing more often, not from better titles. GA4 organic sessions rose 11 percent. The difference from Search Console is normal, and the trend agrees." Then add which pages and queries drove the growth and what work we did that month.

**Linking Search Console to the work**

- Technical SEO fixes should show up as fewer indexing errors and better Core Web Vitals
- On-page and e-commerce SEO should show up as more impressions and clicks on the optimised pages and queries
- New blogs should show up as impressions for new queries, usually after a few weeks
- Off-page work should show up gradually as more linking domains and better rankings for competitive terms

SEO results take time, so report trends over several months and avoid judging a single week.

## 11. Reporting off-page and content activities

Some SEO work does not appear in GA4 or Search Console as a number on its own. Published blogs, backlinks, directory listings and similar activities are work we do, so the report must record what was done, where, and what it achieved. Keep an activity log through the month so the report is quick to build and checkable.

**What to record for each type of activity**

| Activity | What to record | Outcome to watch |
| --- | --- | --- |
| Blogs published on the client's website | Title, URL, publish date, target keyword, author | Impressions, clicks and rankings in Search Console, and sessions and conversions in GA4 |
| Guest posts on other websites | Website, URL, date published, anchor text and the page linked to | Referral traffic, new referring domains and ranking changes for the linked page |
| Backlink creation | Referring site, URL where the link sits, link type, anchor text, target page, date and status | New referring domains, referral sessions and ranking trends |
| Directory and business listings | Directory name, listing URL, date submitted, date live, status | Live listings, consistent business details, and any referral traffic |
| Social bookmarking, profiles and brand mentions | Platform, URL, date | Brand visibility and referral traffic |
| Link clean-up or disavow review | Links reviewed, action taken, date | Fewer low-quality links |
| Content updates | Page, what changed, date | Impressions, clicks and rankings of the updated page |

**Suggested columns for the activity log**

| Date | Activity | Website or platform | Link or URL | Target page and keyword | Anchor text | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |

**Status values.** Use a short, fixed list so the report is consistent: submitted, pending approval, live, rejected, removed. Check live links regularly, since some are removed or never go live.

**Quality over quantity**

- Report the quality of the links and not only the count: relevance of the website, whether the link is placed in real content, and whether the site looks genuine
- Be careful with large numbers of low-quality links. A big count of poor listings can look impressive but add little value, and some links can carry risk
- Search engines' guidelines restrict paid links and link schemes. If a client asks for a method that looks like that, check with the SEO specialist before agreeing
- Do not promise rankings from a number of links. Report the activity and the measured outcome

**Measuring outcomes**

| Measure | Where to find it |
| --- | --- |
| New referring domains and backlinks over time | An SEO tool such as Ahrefs or Semrush, and the Links report in Search Console |
| Referral traffic from the linking sites | GA4, under traffic acquisition, filtered to referral |
| Performance of the linked or new page | Search Console (pages and queries) and GA4 |
| Keyword rankings for target terms | A rank tracker or SEO tool, shown as a trend |
| Direct business listing activity (calls, directions, clicks) | Google Business Profile or the listing platforms, when used |

SEO tools estimate figures from their own data, so numbers differ between tools and from Search Console. Pick one tool for tracking, name it in the report, and compare the same tool month to month.

**Worked example: one month of off-page and content activity**

| Activity | Done | Live at month end | Notes |
| --- | --- | --- | --- |
| Blogs published on the client's website | 6 | 6 | Two target product-category keywords |
| Guest posts | 4 | 3 | One awaiting editor approval |
| Backlinks created | 20 | 17 | Two rejected, one pending |
| Directory listings | 15 | 12 | Three awaiting verification |

Outcome section: "New referring domains grew from 140 to 152. The three guest posts sent 85 referral sessions. The new blogs received 4,100 impressions and 130 clicks in Search Console in their first month. The category page we linked to moved from average position 18 to 14." Always attach the log in an appendix so the client can check each item.

**Honest reporting.** If a link has not gone live, a listing was rejected or a post is delayed, say so and say what happens next. Do not count pending items as done.

## 12. Building a client report

A report is not a dump of numbers. It tells a story: what happened, why, and what we do next. For SEO retainers the monthly report brings together three kinds of information: **website behaviour from Google Analytics 4**, **search performance from Google Search Console**, and **the off-page and content activities we carried out**. Each answers a different question.

| Part | Question it answers | Source |
| --- | --- | --- |
| Sales and website performance | What did visitors do, and what did it bring in? | Store reports and GA4 |
| Search performance | How visible are we in Google, and for which searches? | Search Console |
| Off-page and content activities | What work did we do outside and on the site, and what did it achieve? | Activity log, SEO tool, Search Console links report |

**A good monthly report has**

1. **Summary.** A short paragraph: the main result, the main issue and the main next step.
2. **Key numbers against targets.** A small table with this month, last month and the target or baseline.
3. **Website performance (GA4 and store).** Sessions, organic sessions, engagement rate, orders, revenue and conversion rate, with the main channels and top pages.
4. **Search performance (Search Console).** Impressions, clicks, CTR, average position, top queries and pages, indexing status and Core Web Vitals.
5. **Off-page and content activities.** The activity log summary: blogs published, guest posts, backlinks, directory listings, with status and outcomes.
6. **Wins.** What went well and why.
7. **Problems.** What did not go well, the cause if known, and what is being done.
8. **Other work completed.** On-page, technical, product optimisation and other tasks done this period.
9. **Insights.** What the data suggests, in plain language.
10. **Next steps.** What happens next month, and what we need from the client.

**Sample combined key numbers table**

| Area | Metric | Last month | This month | Target |
| --- | --- | --- | --- | --- |
| GA4 | Organic sessions | 2,150 | 2,380 | 2,500 |
| GA4 | Engagement rate | 58 percent | 60 percent | 60 percent |
| Store | Orders from organic search | 38 | 44 | 45 |
| Store | Revenue from organic search | $3,040 | $3,520 | $3,600 |
| Search Console | Impressions | 80,000 | 92,000 | 100,000 |
| Search Console | Clicks | 2,400 | 2,760 | 3,000 |
| Search Console | Average position | 14.2 | 12.8 | 12.0 |
| Off-page | New referring domains | 8 | 12 | 10 |
| Off-page | Blogs published | 6 | 6 | 6 |

Orders are shown for organic search, taken from store reports or a GA4 channel view with the gap to the store's total noted in the definitions. Revenue in the example is orders multiplied by an average order value of $80.

**Commentary example.** "Organic clicks grew 15 percent and average position improved to 12.8. Most growth came from the three category pages we optimised in the previous month. Organic orders rose from 38 to 44. We published six blogs and obtained 17 live backlinks, and referring domains grew from 140 to 152. Two directory listings were rejected and are being corrected. Next month we focus on the collection pages that are still on page two."

**Putting the data together**

- Use the same date range for every source and state it on the first page
- Note that Search Console, GA4 and SEO tools measure different things, and do not add their numbers together
- Link each activity to a result where one can be measured, and say when the result is too early to judge
- Keep the activity log as an appendix, with the live URLs, so that every item can be checked
- Where the monthly figures are not final, say so and update them later

**Report layout tips**

- Lead with the numbers the client cares about, usually revenue, orders and profit measures
- Keep the main body to a few pages, with the activity log and detailed tables in an appendix
- Use simple charts that show trends over time
- Always state the date range, the data source and any definitions
- Explain unusual changes, such as a sale, a stock-out or a tracking break

**Honesty in reporting.** Report bad months as clearly as good ones, explain what you know and what you do not, and say what will be tested. Clients trust teams that explain problems early.

**Frequency.** Send a short weekly update for active projects, a fuller monthly report for retainers, and a review each quarter that looks at the bigger picture. SEO and off-page results move slowly, so the quarterly review is where trends are judged.

**One-page executive view.** Some clients prefer one page with the five most important numbers and a short commentary. Offer it alongside the full report.

**Report quality checklist**

- [ ] The numbers match the source and the date range is stated
- [ ] Comparisons are fair: same period lengths, same definitions
- [ ] Targets or baselines are shown
- [ ] GA4, Search Console and off-page sections are all included, each with its source named
- [ ] Every off-page item in the log has a URL, a date and a status
- [ ] Pending or rejected items are not counted as live
- [ ] Unusual changes are explained
- [ ] Wins and problems are both covered
- [ ] Next steps are clear and have owners
- [ ] Nothing is promised that the data does not support

## 13. Data quality checks

Wrong data leads to wrong decisions. Build checks into the routine.

| Check | What to look for |
| --- | --- |
| Tracking test | A test purchase appears correctly in all tools |
| Duplicates | Purchases or events counted twice |
| Missing data | Gaps in the data, such as days with no purchases recorded |
| Reconciliation | Store orders compared with GA4 and ad platform numbers each month, with the gap explained |
| Internal traffic | Team and test visits are excluded |
| Bots and spam | Unusual spikes from odd sources or countries |
| Currency and time zone | Settings match across tools |
| Activity log | Every backlink, listing and published post has a URL, date and status, and live items are checked |
| Change log | A record of site, theme, app and tracking changes with dates |
| Annotations | Notes in analytics marking launches, sales and problems |
| Access | Only the right people can see and edit data |

**Reconciliation rule of thumb.** Expect differences between Shopify and GA4, and agree what size of gap is normal for the store. A sudden change in the gap is the warning sign.

**Keep a change log.** When numbers change suddenly, the first question is what changed on the store. A dated log makes this easy to answer.

## 14. Privacy, consent and data handling

Analytics involves people's data, and the rules differ by country.

- **Consent.** Many regions, including the EU, the UK and some US states, have rules on tracking and cookies, and may require consent banners and the ability to opt out.
- **Personal data.** Do not send names, emails or other personal details to analytics tools unless the setup is designed for it, and permitted.
- **Data ownership.** The client owns their analytics accounts and data, and we are added as users. We should not hold the only copy.
- **Access.** Give each person the lowest level of access they need, and remove access when they leave.
- **Retention.** Tools keep data for set periods, and some reports use only recent data. Export important figures regularly.
- **Client responsibility.** The client is responsible for their privacy policy and legal compliance. We recommend they take professional advice for their markets.
- **Reports and sharing.** Do not share client data or reports outside the agreed group, and take care with screenshots.

**Tip for PMs.** If a client asks for tracking that involves personal data or sensitive categories, check with the specialist and recommend legal advice before agreeing.

## 15. Talking to clients about data

**What we can say with confidence**

- Different tools measure differently, so numbers rarely match exactly
- We use the store's sales as the reference and the platforms to compare campaigns
- We report against a baseline and agreed goals, and we explain our numbers
- Data shows what happened, and we use it to decide what to test next

**What we must never say**

- That the data is exact or perfect
- That a metric proves something it cannot prove
- A guaranteed outcome based on past numbers
- That one platform's number is the only truth

**Better ways to say it**

- Instead of "Your Meta numbers are wrong", say "Meta and your store measure differently. We use your store's total sales as the reference, and compare campaigns inside each platform."
- Instead of "Sales fell because of the algorithm", say "Traffic held steady but the conversion rate fell, so we are checking the store, tracking and offers first."

**Red flags**

- Reports with no baseline or comparison
- Numbers with no source or date range
- Metrics that were chosen because they look good
- Claims that add platform numbers together
- Tracking changes with no record
- Charts with no explanation

**When you are unsure.** It is better to say "I will check with the specialist and come back to you by tomorrow" than to guess.

## 16. Client questions and sample answers

These are answers a project manager can give in plain language. Adapt the wording to the client, and check with the specialist for anything specific to the account.

**1. Why do Google Analytics and Shopify show different sales?**
They measure in different ways. Shopify records every order that happens on the store. GA4 only records what its tracking code can see, and some visitors block tracking or do not accept cookies. A small gap is normal, and we monitor it. A sudden large gap tells us to check the tracking.

**2. Why do Meta and Google both claim credit for the same sales?**
Each platform reports the sales it believes its own ads influenced, even if the customer also saw other ads or visited through another channel. So the platform totals can add up to more than the store sold. We use your store's total as the reference and use platform data to compare campaigns.

**3. Which number should we trust?**
For how much you sold, trust your store's orders. For where visitors came from and how they behaved, use GA4 with an understanding of its limits. For ad performance within a platform, use that platform's data, knowing that it is a view and not a total.

**4. Why did our traffic drop?**
There are many possible causes, such as seasonality, a change in ads, a tracking problem, a site issue or a drop in rankings. We check that the drop is real in more than one source, compare it with changes made to the store, and look at which channel and pages are affected.

**5. Sales are down but traffic is steady. What is going on?**
That points to the conversion rate or order value rather than traffic. We look at the product pages, price, stock, checkout and tracking, and we compare device and channel performance.

**6. What is a conversion rate and what is a good one?**
It is the share of visits that end in a purchase. There is no single good number. It depends on your product, price, traffic and country. We compare it with your own history and track how it changes after our improvements.

**7. What is the difference between users and sessions?**
A user is a person or device, and a session is one visit. One user can have many sessions, so sessions are usually higher than users.

**8. What is bounce rate, and why do you report engagement rate instead?**
GA4 focuses on engagement rate, which is the share of visits where people stayed, interacted or converted. It is more useful than the older idea of bounce rate, and the two are related, since bounce rate is the opposite of engagement rate.

**9. Why is a lot of our traffic listed as Direct?**
Direct means the source was not recorded. It includes typed addresses and bookmarks, but also visits where the source was lost, for example from some apps, email programs or untagged links. Tagging links with UTMs reduces it.

**10. What is attribution?**
It is how credit for a sale is divided between the channels a customer used. Different models give different answers, so we pick one view, explain it, and use it consistently.

**11. Why do you want to tag links with UTMs?**
Tags tell analytics which campaign sent a visit. Without them, the visit may appear as Direct or in the wrong channel, and we cannot tell which campaigns work.

**12. Why are the Search Console clicks different from the GA4 organic visits?**
Search Console counts clicks in Google search results, while GA4 counts visits recorded on the site after the click. Blockers, consent choices and other search engines mean the numbers differ. Compare the trend, not the exact figures.

**13. How do you know the tracking is correct?**
We test it. A test purchase should appear correctly in the store, GA4 and the ad platforms, with the right value and counted once. We repeat checks after changes to the site, theme or apps, and we reconcile numbers each month.

**14. What happens if tracking breaks?**
We fix it as quickly as possible and note the dates affected in our reports. Data from the broken period may be incomplete, so we avoid comparing it directly with other periods.

**15. Can you track every customer?**
No. Privacy rules, browser limits and consent choices mean some visits are not recorded. We work with what is measurable, and we use the store's order data as the reference.

**16. Why do you report so few numbers?**
Reports are easier to use when they focus on what matters for your goals. We show the key numbers and explain them, and we keep the detailed data available if you want it.

**17. Why does last month's number differ from what I saw earlier?**
Some tools update data after the first view, because late records arrive or reports are reprocessed. We usually finalise figures a few days after the period ends.

**18. Can we see the data ourselves?**
Yes. We can set up a dashboard and give you access to your analytics accounts. You own the accounts and the data.

**19. How do you handle privacy and cookie consent?**
We follow your privacy policy and consent settings and recommend that you check the rules for the countries you sell in. We avoid sending personal details to analytics tools.

**20. What is a baseline and why do you need one?**
It is the starting point before our work begins. Without it, we cannot show what changed. We record it in the first days of the project.

**21. How often will we get reports?**
We agree this at the start. A common pattern is a short weekly update during active work and a fuller monthly report, with a wider review each quarter.

**22. Can you predict our sales for next quarter?**
We can set realistic targets and give scenarios using your history, margins and planned activity. Predictions are estimates, and they depend on things we do not control, such as demand and competition.

**23. What does Google Search Console show that Google Analytics does not?**
Search Console shows what happens in Google search before someone reaches the site: how often the site appears, for which searches, at what position, and whether pages are indexed. GA4 shows what visitors do once they arrive. We use both, because one explains visibility and the other explains behaviour.

**24. Impressions are up but clicks are not. Is something wrong?**
Not necessarily. It usually means the site is appearing for more searches but ranking low, or the titles and descriptions are not attracting clicks. We look at which queries and pages gained impressions and decide whether to improve the content, the titles, or both.

**25. Why did average position get worse when traffic went up?**
Average position is an average across all the searches the site appears for. When the site starts to appear for many new searches at lower positions, the average can fall even though traffic grows. We check the queries before judging.

**26. How do you show that backlinks and directory listings are working?**
We keep a log of each link and listing with its URL, date and status, then track new referring domains, referral traffic and ranking changes for the pages we linked to. The effect is gradual, so we judge it over several months, not weeks.

**27. How many backlinks will you build each month, and will that raise our rankings?**
The number depends on the plan we agreed, and we report exactly what went live. Rankings depend on link quality and relevance, content, the site itself and competitors, so we do not promise a ranking from a number of links.

**28. Why do some of the links or listings you submitted not appear in the report as live?**
Sites approve, reject or remove submissions on their own schedule. We report each as submitted, pending, live or rejected, and we only count live items. We follow up on pending ones and correct the rejected ones.

**29. Can you buy links to speed things up?**
We do not recommend it. Search engines' guidelines restrict paid links and link schemes, and they can put the site at risk. We focus on relevant, genuine placements and good content.

**30. Why do the backlink numbers differ between Ahrefs, Semrush and Search Console?**
Each tool finds links with its own crawler, so each sees a different set. We choose one tool for tracking, name it in the report, and compare the same tool month to month.

## 17. Glossary

**Glossary**

| Term | Meaning |
| --- | --- |
| Anchor text | The clickable words of a link |
| Annotation | A dated note in analytics marking an event such as a launch or sale |
| Backlink | A link from another website to the client's site |
| Attribution | The way credit for a sale is divided between channels |
| Average order value (AOV) | Revenue divided by orders |
| Baseline | The starting numbers recorded before work begins |
| Bounce rate | The share of sessions that were not engaged; in GA4 it is 100 percent minus engagement rate |
| Channel group | A bucket of sources, such as Organic Search or Email |
| Conversion rate | The share of sessions that end in a purchase or other goal |
| Core Web Vitals | Google's measures of page loading speed, responsiveness and visual stability |
| Cookie | A small file that helps a browser be recognised |
| Dashboard | A page showing key numbers at a glance |
| CTR (click-through rate) | Clicks divided by impressions |
| Data-driven attribution | A model that shares credit based on how each step contributed |
| Direct traffic | Visits with no recorded source |
| Directory listing | An entry for the business in an online directory |
| Engaged session | A GA4 visit that lasted long enough, converted or had several page views |
| Engagement rate | Engaged sessions divided by sessions |
| Event | A recorded action in GA4 |
| GA4 | Google Analytics 4 |
| Google Search Console | Google's free tool showing how a site appears in Google search |
| Impressions | The number of times a page appeared in search results |
| Indexing | Google storing a page so it can appear in search results |
| Google Tag Manager | A tool for managing tracking tags |
| Key event | An event marked as important to the business |
| Last-click attribution | Giving all credit to the final channel before a sale |
| Looker Studio | Google's free dashboard and reporting tool |
| MER | Marketing efficiency ratio: total revenue divided by total ad spend |
| Pixel | Tracking code from an ad platform |
| Position (average) | The average ranking of a site for the searches shown; lower is better |
| Reconciliation | Comparing numbers from different tools and explaining the gaps |
| Referral | A visit from a link on another website |
| Referring domain | A separate website that links to the client's site |
| Sampling | Using part of the data to estimate a report |
| Segment | A subset of data, such as mobile visitors |
| Session | One visit to the site |
| Source and medium | Where a visit came from and the type of channel |
| UTM parameters | Tags on links that identify the campaign |
| User | A person or device recorded by analytics |

**Knowledge check**

1. A store has 120 orders in Shopify and 98 in GA4. Meta reports 55 purchases and Google Ads reports 60. Which number is the best reference for total sales, and why can Meta and Google together look too high?
2. Revenue fell from $10,000 to $8,000. Sessions were 25,000 in both months. Last month's conversion rate was 2 percent, and this month it was 1.6 percent. What was the average order value each month, and where is the problem?
3. A store spent $2,500 on ads and had $10,000 in total revenue. What is the MER?
4. A page's conversion rate rose from 1 percent to 3 percent. Why might this not be good news?
5. Why should UTMs follow a consistent naming pattern?
6. Name three checks to do before trusting a report.
7. A client says "Meta shows 80 sales but Shopify shows 50 from the same campaign period". How do you explain it?
8. Why are baselines important?
9. What should a report summary contain?
10. What should you do if the client asks for tracking that uses personal data?
11. Last month Search Console showed 50,000 impressions and 1,500 clicks. This month it shows 60,000 impressions and 1,650 clicks. What is the CTR each month, and what does the change suggest?
12. Why should the report list pending and rejected backlinks separately from live ones?
13. Name three things to record for every backlink or directory listing.
14. Why might Search Console clicks and GA4 organic sessions differ?

**Answer guide**

1. Shopify, because it records every order on the store. Platforms overlap and each credits itself for orders it influenced, so they can add up to more than the total.
2. Last month: 25,000 × 2 percent = 500 orders, so AOV = $10,000 ÷ 500 = $20. This month: 25,000 × 1.6 percent = 400 orders, so AOV = $8,000 ÷ 400 = $20. The AOV and traffic did not change, so the problem is the conversion rate.
3. MER = $10,000 ÷ $2,500 = 4.0.
4. If the page has very few visits, the rise may be only a few orders and could be chance. Check the number of sessions and orders behind the percentage.
5. Inconsistent names split the same campaign across several lines, which makes comparison impossible.
6. Any three of: a test purchase appears correctly, the date range and definitions are stated, no duplicate counting, comparisons are fair, tracking was checked after recent changes, and the numbers reconcile with the store.
7. Platforms report the sales they believe their ads influenced, including customers who also used other channels, and they use their own attribution windows. The store's count is the actual number of orders. We compare the gap over time.
8. Without a starting point, there is no way to show what changed or whether the work helped.
9. The main result, the main problem, and the main next step, in a few sentences.
10. Check with the specialist, explain the privacy and consent considerations, and recommend legal advice before agreeing.
11. Last month: 1,500 ÷ 50,000 = 3.0 percent. This month: 1,650 ÷ 60,000 = 2.75 percent. Impressions grew 20 percent and clicks grew 10 percent, so the site is appearing for more searches but is attracting a smaller share of clicks. Check the new queries and pages, and the titles and positions.
12. Only live links count as delivered work. Showing the other statuses is honest, and it shows what follow-up is needed.
13. Any three of: the website or directory, the URL of the link or listing, the date, the target page, the anchor text, and the status.
14. They measure different things. Search Console counts clicks in Google search, and GA4 counts the visits it records on the site. Blockers, consent choices, other search engines and tracking gaps cause differences, so compare the trend and not the exact numbers.
