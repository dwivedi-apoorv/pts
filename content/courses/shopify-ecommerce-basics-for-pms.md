# Shopify and E-commerce Basics for Project Managers

This module gives project managers enough knowledge of how online stores and Shopify work to follow developers and designers, scope work sensibly, and answer client questions with confidence. It explains how a store makes money, what the main parts of Shopify do, how to read store numbers, and what to check before launch. It is written for non-specialists and uses USD examples. It does not describe our internal process; see the main onboarding module for that.

## 1. Why project managers need Shopify and e-commerce basics

Every service we sell touches an online store. SEO, ads, content and social all depend on a store that loads quickly, explains products clearly and lets people buy easily. A project manager who understands the store can:

- Tell the difference between a quick change and a custom development task
- Ask developers and designers useful questions and spot unrealistic estimates
- Explain to a client why something is or is not possible, and what it costs in time
- See when a marketing problem is really a store problem, such as a slow page or a confusing checkout
- Plan launches and changes without breaking sales

**How to use this module.** Read chapters 1 to 12 once. Use chapter 13 and chapter 14 (client questions) when you prepare for client calls, and the glossary in chapter 15 whenever a term is unfamiliar.

## 2. How an online store works

**The customer journey.** Most online purchases follow the same path, and each step loses some people.

| Step | What the customer does | Where stores lose people |
| --- | --- | --- |
| 1. Arrive | Lands on the store from search, ads, social, email or a direct visit | Slow pages, unclear message, wrong traffic |
| 2. Browse | Looks at collections, search results and product pages | Poor navigation, weak photos, little information |
| 3. Decide | Reads descriptions, reviews, price, shipping and returns | Missing trust signals, unclear delivery or returns |
| 4. Add to cart | Chooses options and adds the product | Confusing options, out-of-stock items |
| 5. Checkout | Enters details, shipping and payment | Surprise costs, forced accounts, too many steps, few payment options |
| 6. After the sale | Gets confirmation, delivery and support | Late delivery, poor communication, hard returns |

**The parts of a store.** Every online store, on Shopify or elsewhere, has the same building blocks.

| Part | What it is |
| --- | --- |
| Storefront | The public website customers see: pages, products and navigation |
| Catalogue | The products, prices, photos, descriptions and stock levels |
| Checkout and payments | How customers pay and how the store receives the money |
| Shipping and fulfilment | How orders are packed and delivered, by the store or by a supplier |
| Back office | Orders, customers, reports and settings where the team works |
| Marketing connections | Tracking, ads, email, social and search tools linked to the store |

**Two ways to grow revenue.** Revenue comes from visitors multiplied by the share who buy, multiplied by the average order value. More visitors come from marketing. A higher purchase rate and larger orders come from the store itself. Many stores waste ad money because they keep buying visitors for a store that converts poorly.

## 3. Shopify at a glance

**What Shopify is.** Shopify is a hosted e-commerce platform. Shopify provides the hosting, the security of the core platform, the checkout and the regular updates. The store owner pays a plan fee to Shopify and chooses a theme and apps to shape the store.

**What this means in practice**

- The client does not need servers or technical maintenance of the core platform
- Shopify handles many technical basics, such as a secure connection (HTTPS) and an automatic sitemap
- The store can be changed in a few ways: settings, the theme editor, apps, or custom code by a developer
- Some limits are fixed by Shopify, especially in the checkout

**Where things live in the Shopify admin.** The admin is the control panel where the team works. The names can change slightly over time, but these are the main areas.

| Area | What it holds |
| --- | --- |
| Home and Analytics | Summary of sales, traffic and reports |
| Orders | Orders, drafts, abandoned checkouts and fulfilment |
| Products | Products, collections, inventory and gift cards |
| Customers | Customer records and segments |
| Marketing and Discounts | Campaigns, automations, discount codes and automatic discounts |
| Content | Files, metaobjects and other custom content |
| Markets | Selling in different countries, currencies and languages |
| Online Store | Themes, blog posts, pages, navigation and preferences |
| Apps | Installed apps and the place to add more |
| Settings | Payments, shipping, taxes, domains, policies, users and notifications |

**Who can have access.** Store owners can add staff accounts with limited permissions. Agencies and developers are usually given collaborator access, which is set up by the client approving a request. This keeps the client in control of the account.

**Plans.** Shopify offers several paid plans with different features and fees. Which plan suits a client depends on their size and needs, and plan details change. Check Shopify's current plan page when advising a client.

## 4. Products, collections and catalogue

The catalogue is the heart of a store. Poor catalogue data causes problems everywhere else, from SEO to ads to checkout.

| Term | What it means |
| --- | --- |
| Product | An item for sale, with a title, description, photos and price |
| Variant | A version of a product, such as a size or colour, each with its own price, stock and SKU |
| Option | The attribute that creates variants, such as Size or Colour |
| SKU | A stock-keeping unit: a unique code for a variant used for tracking stock |
| Inventory | The count of items available to sell |
| Collection | A group of products shown together, such as a category or a sale |
| Manual collection | A collection where products are added by hand |
| Automated collection | A collection filled automatically by conditions, such as tag, price or type |
| Tag | A label added to products, used for filtering and automation |
| Product type and vendor | Fields used to group and filter products |
| Metafield | A custom data field, for extra information such as materials or care instructions |
| Product status | Active (live), draft (hidden, in progress) or archived (hidden, kept) |

**What good catalogue data looks like**

- Clear, unique titles that include what the product is
- Descriptions written for the customer, not copied from a supplier
- Good images from several angles, with consistent sizes
- Accurate prices, stock and shipping weights
- Sensible options and variants, without needless duplication
- Products placed in the right collections

**Bulk work.** Large catalogues are normally uploaded or edited in bulk using a spreadsheet (CSV file) or an app. Bulk changes can affect many products at once, so check a sample and keep a copy of the original file before importing.

**Tip for PMs.** When a client sends product data late or in a poor state, the whole timeline is at risk. Ask for it early, in the format the team needs, and check a sample straight away.

## 5. Themes and design

A **theme** controls how the storefront looks and works. It decides the layout of the home page, collection pages, product pages and cart.

**Key ideas**

- **Theme editor.** A visual editor where non-developers can change text, images, colours and the order of sections without code.
- **Sections and blocks.** Themes are built from sections (such as a banner or featured products) that can be added and rearranged. Modern themes, called Online Store 2.0 themes, allow sections on most pages and support app blocks.
- **App blocks.** A way for apps to add features to a page through the theme editor, without a developer editing code.
- **Liquid.** Shopify's template language. Developers use Liquid to customise themes beyond what the editor allows.
- **Metafields in the theme.** Custom data from products or collections can be shown on the page, for example a "materials" section.
- **Free, paid and custom themes.** Shopify offers free themes and a theme store with paid themes. A custom theme is built specially for a client and costs more time.

**Customising versus building custom**

| Request | Usually handled by | Typical effort |
| --- | --- | --- |
| Change text, images, colours and section order | Theme editor | Low |
| Change fonts, spacing or small layout details | Theme settings or light code | Low to medium |
| Add a new section or feature the theme lacks | Developer code or an app | Medium |
| A completely custom page design or a bespoke feature | Developer, possibly a new theme | High |

**Working safely**

- Developers should work on a copy of the theme, not on the live one, and test before publishing
- Take a backup of the live theme before any large change
- Preview on mobile and desktop before publishing
- Remove unused code and apps, since leftover code can slow a store

**Design for selling.** A good store design is not just attractive. It guides people to products, shows prices and delivery clearly, works well on phones, and loads quickly. Most shoppers browse on mobile, so mobile comes first.

## 6. Apps and integrations

The Shopify App Store has thousands of apps that add features such as reviews, upsells, subscriptions, email marketing, loyalty programmes, translations and shipping tools.

**Why apps are useful.** An app can add a feature in hours that would take a developer days to build.

**Why apps need care**

- Each app can add code that slows down the store
- Apps can have monthly fees that add up
- Apps can overlap, with two doing the same job and conflicting
- An app may leave code behind in the theme after it is uninstalled
- Apps get access to store and customer data, so permissions and privacy matter
- An app can change or shut down, leaving the store without that feature

**Before adding an app, ask**

1. Do we need this feature, or could the theme or a small custom change do it?
2. What does it cost per month and as the store grows?
3. How does it affect speed?
4. Are the reviews and support good, and is it actively updated?
5. What data does it access?
6. How do we remove it cleanly?

**Tip for PMs.** When a client asks for "an app that does X", the answer is often yes, but check the cost, the speed effect and whether the theme already has a built-in way to do it.

## 7. Checkout, payments, shipping and taxes

**Checkout.** Shopify's checkout is hosted and maintained by Shopify. It is designed to convert well and is trusted by shoppers. Customisation options are limited and depend on the plan, so some requests that seem simple, such as extra checkout fields, may not be possible or may need a specific approach.

**Payments**

- **Payment gateways** process card and other payments. Shopify's own payment service is available in some countries, and not in others.
- **Third-party gateways** are used where Shopify's own service is unavailable or where a client prefers them. Third-party gateways can add extra transaction fees on top of the gateway's own fees.
- **Local methods.** Many markets prefer wallets, bank transfers or cash on delivery. Offering the methods customers expect can raise sales.
- **Fees.** Each payment has fees. Include them when calculating margin.
- **Chargebacks.** When a customer disputes a payment with their bank. Stores need records to respond.

**Shipping**

- **Shipping rates and zones** set what customers pay in each region
- **Shipping profiles** let different products have different rates
- **Free shipping thresholds** encourage larger orders, for example free shipping above a set order value
- **Carriers and labels.** Stores can use carrier rates and print labels from the admin or from apps
- **Delivery times and returns** should be clear on product pages and in the policy pages

**Taxes and duties**

- Sales tax, VAT or GST rules depend on where the store and the customer are
- Selling across borders can add import duties and extra paperwork
- Clients are responsible for their tax compliance, and we recommend they confirm settings with an accountant

**Markets and currencies.** Shopify can show prices in different currencies and tailor content for different countries. International selling needs checks on payments, shipping, tax and translations.

**Abandoned checkouts.** Shopify records checkouts that were started but not finished and can send reminder emails. These emails often recover some lost sales.

## 8. Orders, fulfilment and policies

**Order status.** Each order has two main statuses.

| Status type | Common values | Meaning |
| --- | --- | --- |
| Payment | Pending, paid, partially refunded, refunded | Where the money stands |
| Fulfilment | Unfulfilled, partially fulfilled, fulfilled | Whether items have shipped |

**The order process**

1. The customer pays and the order appears in the admin
2. The team (or a supplier) packs and ships it, and adds tracking
3. The customer gets a shipping confirmation
4. If there is a problem, the team handles a return, exchange or refund

**Returns and refunds.** A clear returns policy builds trust and lowers disputes. Refunds go back through the original payment method. Return costs affect margin, so high-return products need attention.

**Fulfilment models**

| Model | How it works | Watch out for |
| --- | --- | --- |
| Own stock | The store holds stock and ships orders itself | Storage, packing time, cash tied up in stock |
| Third-party logistics | A warehouse stores and ships for the store | Fees and integration |
| Dropshipping | A supplier ships to the customer, and the store never holds stock | Long delivery times, quality control, supplier reliability and thin margins |
| Print on demand | Products are made when ordered | Production time and quality |

**Policy pages.** Every store needs clear refund, shipping, privacy and terms pages. Shopify offers templates, but the client is responsible for their accuracy and legal fit. Missing policies can also cause problems with payment providers and ad platforms.

**Customer service.** Good support lowers returns and builds repeat sales. Stores need a contact method, a way to track orders, and a response routine.

## 9. E-commerce metrics

You will see these in Shopify, Google Analytics and our reports.

| Metric | Formula | What it tells you |
| --- | --- | --- |
| Sessions | Count of visits | How much traffic the store gets |
| Conversion rate | Orders ÷ Sessions × 100 | The share of visits that end in a purchase |
| Add-to-cart rate | Sessions with an add-to-cart ÷ Sessions × 100 | How well products attract interest |
| Cart abandonment rate | 1 - (Orders ÷ Carts created), as a percentage | How many carts are left unfinished |
| AOV (average order value) | Revenue ÷ Orders | How much a typical order is worth |
| Revenue | Total sales value | Money coming in, before costs |
| Gross margin | (Revenue - Cost of goods) ÷ Revenue × 100 | The share of each sale left after product costs |
| Profit per order | AOV - Product cost - Shipping - Fees - Other order costs | What each order actually earns |
| Repeat purchase rate | Customers with more than one order ÷ All customers × 100 | How well the store keeps customers |
| Return rate | Returned orders ÷ Orders × 100 | How many orders come back |
| CAC | Marketing cost ÷ New customers | The cost of winning a customer |
| LTV | Average total value of a customer over time | What a customer is worth over their life |

**Worked example.** A store gets 20,000 visits in a month, with a conversion rate of 2 percent and an average order value of $60.

| Step | Calculation | Result |
| --- | --- | --- |
| Orders | 20,000 × 2 percent | 400 |
| Revenue | 400 × $60 | $24,000 |
| Product cost per order | | $24 |
| Shipping cost to the store per order | | $6 |
| Payment fees per order (about 3 percent) | | $2 |
| Profit per order before ads | $60 - $24 - $6 - $2 | $28 |
| Profit before ads | 400 × $28 | $11,200 |
| Ad spend | | $4,000 |
| Profit after ads (before fixed costs such as staff, apps and the Shopify plan) | $11,200 - $4,000 | $7,200 |

**What this teaches**

- Revenue is not profit. In this example, $24,000 of revenue produces $11,200 before ads and $7,200 after ads.
- The break-even ROAS here is $60 ÷ $28 = about 2.1, since each $1 of ad-driven revenue only leaves about 47 cents of profit.

**Improving the conversion rate is powerful.** If the conversion rate rises from 2 percent to 2.5 percent with the same traffic and ad spend, orders rise to 500, revenue to $30,000 and profit before ads to $14,000. That is $2,800 more profit with no extra traffic.

**Rules of thumb for reading the numbers**

- Low conversion rate with healthy traffic: look at the product pages, trust, price, speed and checkout
- High add-to-cart rate but high abandonment: look at shipping costs, checkout steps and payment options
- High AOV but low repeat rate: look at post-purchase email and customer service
- Good revenue but poor profit: look at product margin, discounts, shipping and returns
- Compare against the store's own past figures. Benchmarks from other stores vary widely and are rarely a fair comparison.

## 10. Conversion rate optimisation

**Conversion rate optimisation (CRO)** means improving the share of visitors who buy. It is often the cheapest way to grow revenue because it makes existing traffic worth more.

**Product page checklist**

- Clear title, price and a prominent add-to-cart button
- Good photos from several angles, and video where useful
- A description that answers the questions customers ask
- Reviews and ratings
- Visible shipping times, costs and the returns policy
- Clear options and stock information
- Trust signals, such as secure payment icons and guarantees
- A fast load on mobile

**Navigation and collection pages**

- Simple menus that match how customers think
- Search that works well and handles spelling mistakes
- Filters and sorting for larger catalogues
- Collection pages with helpful descriptions and clear images

**Cart and checkout**

- No surprise costs at the end
- Guest checkout available
- A reasonable number of steps
- The payment methods customers expect
- Clear delivery estimates

**Speed and mobile.** Most shoppers use phones. A slow or awkward mobile store loses sales and hurts ads and SEO as well. Large images, many apps and heavy page sections are common causes of slowness.

**How CRO is done**

- Study the data: where do people drop out?
- Review the site yourself, on a phone
- Make one meaningful change at a time
- Compare results over enough time and enough orders to be reliable
- Keep what works and drop what does not

**Tip for PMs.** Be careful of promising a specific conversion lift. Changes help in general, but the size of the effect depends on the store, the traffic and the product.

## 11. Launch and maintenance

**Pre-launch checklist**

- [ ] All products have correct titles, descriptions, photos, prices and stock
- [ ] Collections and navigation are set up and tested
- [ ] Home page, key pages and policy pages are complete
- [ ] Payments are set up and a real test order has been completed
- [ ] Shipping rates, zones and taxes are set correctly
- [ ] The store works on mobile and desktop and on the main browsers
- [ ] Page speed has been checked
- [ ] Domain is connected and the secure connection works
- [ ] Redirects from old addresses are in place if this is a migration
- [ ] Titles, descriptions and the sitemap are set up for search
- [ ] Analytics and ad tracking are installed and tested
- [ ] Email notifications are set up and tested
- [ ] Contact forms and customer account pages work
- [ ] Any password page or store restriction is removed at the right moment
- [ ] The client has approved the store in writing

**Domain and DNS.** Moving a domain to a new store involves changing DNS records. This can take time to take effect everywhere, so plan it carefully and do it at a quiet time.

**Migrating from another platform.** Products, customers and some order data can often be moved with import tools. The main risks are broken or missing redirects, which cost search traffic, differences in how data is structured, and features that need rebuilding. A migration needs a redirect plan and checks after launch.

**After launch**

- Place a test order again and watch the first real orders
- Check tracking and search indexing within the first days
- Monitor speed, errors and customer messages
- Collect issues in one list and fix them in a planned way
- Agree who owns support and updates from here on

**Ongoing care**

- Keep the theme and apps updated and review them regularly
- Remove apps and code that are no longer needed
- Review speed and mobile experience every few months
- Check that tracking and feeds still work after any change
- Back up the theme before big changes

## 12. Managing a Shopify project

**Turning a request into a task.** When a client asks for a change, find out four things before giving a date.

1. What is the goal behind the request?
2. Can the theme editor, a setting or an app handle it, or does it need custom code?
3. Which pages and products does it affect?
4. What could it break, and how will we test it?

**Common client requests**

| Request | Usually | Notes |
| --- | --- | --- |
| Change banner text or images | Quick | Done in the theme editor |
| Add a new collection page | Quick | Needs products and a clear structure |
| Add reviews | Medium | Use an app or the theme's built-in option, and check speed |
| Add a size guide or extra product information | Medium | May use metafields or a custom section |
| Change the checkout | Limited | Depends on what Shopify allows for the plan |
| Add a custom product builder or configurator | High | Needs custom development and testing |
| Redesign the whole store | High | A large project with design, build and review stages |
| Add a new language or country | Medium to high | Affects content, payments, shipping and tax |

**Working well with developers and designers**

- Give clear, written requirements with links, screenshots and examples
- Ask for estimates in working days and the reasoning behind them
- Agree what "done" means, and how it will be tested
- Use a copy of the theme for work and test before publishing
- Batch the client's feedback into one consolidated list

**Quality checks before showing the client**

- Works on mobile and desktop
- Links and buttons work
- Product data is correct
- No placeholder text or missing images
- Page speed has not got worse
- The change matches the agreed scope

**Scope control.** Keep a written record of what was agreed. When a request falls outside it, describe the difference, estimate the time, and get approval before starting.

**Handover.** At the end, give the client a short guide on how to manage products, orders and content themselves, a list of apps and what each does, and a record of the work completed.

## 13. Talking to clients: expectations and red flags

**What we can say with confidence**

- We can build and improve the store's design, speed and structure
- A well-built store makes marketing work harder for the same spend
- Launch quality depends on timely content, product data and approvals from the client
- Small changes often take less time than clients expect, and custom features often take more

**What we must never say**

- A guaranteed conversion rate, sales number or revenue figure
- That a feature is "easy" before the developer has looked at it
- That the checkout can be fully customised, without checking
- That an app or migration will have "no impact" without testing

**Better ways to say it**

- Instead of "That's easy, we'll do it tomorrow", say "I will check with the developer and confirm what is involved and when."
- Instead of "Your conversion rate will double", say "Here are the improvements we recommend, and we will track the conversion rate before and after."

**Red flags in a store project**

- Product data not provided and no date for it
- Many apps installed to do small jobs
- A request to copy another store exactly, including its content and images
- No clear owner on the client side for approvals
- A very short deadline for a large build
- Unclear policies or legal details

**When you are unsure.** It is better to say "I will check with the team and come back to you by tomorrow" than to guess.

## 14. Client questions and sample answers

These are answers a project manager can give in plain language. Adapt the wording to the client, and check with the developer or designer for anything specific to the store.

**1. Why should we use Shopify?**
Shopify is a hosted platform, so it handles the hosting, security and updates of the core system, and it has a trusted checkout and a large library of themes and apps. This lets you focus on products and marketing. Other platforms can also work well, and the right choice depends on your needs.

**2. How long will it take to build the store?**
It depends on the size of the catalogue, how much customisation you need, and how quickly we receive content, product data and approvals. We will give you a timeline in writing after we confirm the scope, and we will tell you straight away if anything affects it.

**3. Do we own the store?**
Yes. The store and its subscription should be under your own Shopify account, and we are added as collaborators or staff. That way you keep control of your data, customers and orders.

**4. What do we need to provide?**
Brand assets such as logo and colours, product information and photos, policy details, payment and shipping information, domain access, and timely feedback. Late product data is a common cause of delays.

**5. Should we use a ready-made theme or a custom design?**
A ready-made theme is faster and cheaper and works well for many stores. A custom design costs more time and money, and suits stores with specific needs or a strong brand. We can customise a theme in many ways, and we will advise what suits you.

**6. Why is my store slow?**
The usual causes are large images, many apps, heavy page sections and extra code left behind by old apps. We check what is slowing the store and fix the biggest causes first.

**7. Do we need an app for this?**
Sometimes. Apps can add features quickly, but each one can cost money and slow the store. We will check whether the theme or a small custom change can do the job before recommending an app.

**8. Can you add this custom feature?**
Probably, but we need to look at the details first. Many features are possible, some are quick, and some need custom development. The checkout is more limited than the rest of the store. We will confirm what is possible, how long it takes and what it costs.

**9. How do payments work, and what are the fees?**
You choose payment gateways, and customers pay through them. Each one charges processing fees, and some setups add Shopify transaction fees on top. Which payment options are available also depends on your country. We will help you set them up, and we recommend including the fees when working out your margins.

**10. Can we accept cash on delivery or local payment methods?**
Often yes, using the right settings or apps, depending on your country and gateway. Offering the methods your customers prefer can raise sales, but cash on delivery has its own risks, such as refused deliveries.

**11. How are taxes and shipping set up?**
We configure tax and shipping settings based on the information you give us, but you are responsible for your tax rules. We recommend confirming the settings with an accountant, especially if you sell across borders.

**12. Can we sell in other countries and currencies?**
Yes, Shopify supports this. International selling also affects payments, shipping costs, taxes, duties and translations, so we plan those with you.

**13. Can we move our store from another platform without losing sales?**
We can move products, customers and much of the data, and we plan the redirects so that search traffic is kept. Some short-term changes in traffic can still happen. We check carefully after launch.

**14. Will we be able to manage the store ourselves?**
Yes. Most day-to-day tasks, such as adding products, editing text and images and processing orders, are done in the Shopify admin. We give you a short guide at handover and can provide more training.

**15. Why is the conversion rate low?**
Several reasons are possible: the traffic may not suit the products, the product pages may not build trust, the price or delivery may put people off, the checkout may have friction, or the store may be slow on mobile. We review the data and the store itself to find the biggest issues.

**16. How can we reduce cart abandonment?**
We look at costs shown late, such as shipping, the number of checkout steps, the payment options, trust signals and delivery information, and we set up reminder emails for abandoned checkouts. Some abandonment is normal, since many people just browse.

**17. How do reviews help, and how do we get them?**
Reviews build trust and often raise conversion. We can add a reviews feature, and you can ask customers for reviews after delivery. Only genuine reviews should be used.

**18. Is the store secure?**
Shopify manages the security of the core platform and the checkout. Security also depends on good practice: strong passwords, limited staff access, careful use of apps and keeping logins private.

**19. What happens after the store launches?**
We check orders, tracking and speed in the first days, fix any issues and hand over a guide. After that, support, updates and improvements depend on what we agreed with you, and we will confirm the arrangement.

**20. Who pays for Shopify and the apps?**
You pay Shopify's plan fee and any app fees directly from your own account. Our fee covers our work. We will list the recommended apps and their costs before you commit.

**21. Can we do dropshipping on Shopify?**
Yes, many stores do. It lowers the need for stock, but you depend on suppliers for quality and delivery, and margins can be thin. Product choice and supplier checks are very important.

**22. Can you copy another store's design or products?**
We can take inspiration from other stores, such as layouts and ideas, but we do not copy another store's content, images or branding. It can cause legal problems, and it rarely works as well as a store built around your own brand.

## 15. Glossary and knowledge check

**Glossary**

| Term | Meaning |
| --- | --- |
| Abandoned checkout | A checkout that was started but not completed |
| Add-to-cart rate | The share of visits where a product was added to the cart |
| AOV | Average order value: revenue divided by orders |
| App | An add-on from the Shopify App Store that adds features |
| App block | A way for an app to add a feature to a page via the theme editor |
| Automated collection | A collection filled automatically by rules |
| CAC | Customer acquisition cost |
| Chargeback | A payment dispute raised by the customer with their bank |
| Collaborator access | Access given to an agency or developer, approved by the store owner |
| Collection | A group of products shown together |
| Conversion rate | The share of visits that end in a purchase |
| CRO | Conversion rate optimisation |
| CSV | A spreadsheet file format often used to import or export products |
| DNS | The system that connects a domain name to a website |
| Dropshipping | A model where a supplier ships orders and the store holds no stock |
| Fulfilment | Packing and shipping an order |
| Gateway | The service that processes online payments |
| Gross margin | The share of each sale left after product costs |
| Inventory | The number of items available to sell |
| Liquid | Shopify's template language |
| LTV | Lifetime value of a customer |
| Manual collection | A collection where products are added by hand |
| Markets | Shopify's tools for selling in different countries |
| Metafield | A custom data field for extra information |
| Online Store 2.0 | The modern theme architecture with sections on most pages and app blocks |
| Option | An attribute that creates variants, such as size or colour |
| Redirect | A forward from an old address to a new one |
| Return rate | The share of orders that are returned |
| Section | A building block of a page in a Shopify theme |
| SKU | A stock-keeping unit code that identifies a variant |
| Staff account | A store login with limited permissions |
| Tag | A label added to products or orders |
| Theme | The design and layout of the storefront |
| Variant | A version of a product, such as a size or colour |

**Knowledge check**

1. Name the six steps of the customer journey and one reason people drop out at each step.
2. What is the difference between a product, a variant and an option?
3. A store has 10,000 visits, a conversion rate of 3 percent and an average order value of $50. What are the orders and revenue?
4. The same store has a profit per order of $20 before ads. What is its profit before ads, and what is the break-even ROAS?
5. A client wants an extra field on the checkout page. What should you do before answering?
6. Why should developers work on a copy of the theme?
7. Give three reasons to be careful when adding an app.
8. What are the main risks when migrating a store from another platform?
9. A client asks you to promise a 5 percent conversion rate. How do you respond?
10. Name five items you would check before a store launches.

**Answer guide**

1. Arrive (slow pages or wrong traffic), browse (poor navigation or photos), decide (missing trust, shipping or returns information), add to cart (confusing options or stock problems), checkout (surprise costs or too many steps), after the sale (late delivery or poor support).
2. A product is the item for sale, an option is an attribute such as size or colour, and a variant is a specific combination of options with its own price, stock and SKU.
3. Orders = 10,000 × 3 percent = 300. Revenue = 300 × $50 = $15,000.
4. Profit before ads = 300 × $20 = $6,000. Break-even ROAS = $50 ÷ $20 = 2.5.
5. Check with a developer whether Shopify allows it for the store's plan, what approach is possible, and what it affects, before promising anything.
6. So that mistakes do not affect the live store, and so changes can be tested and published only when ready.
7. Any three of: speed, monthly cost, overlap with other apps, leftover code after removal, data access and privacy, and the risk that the app changes or closes.
8. Broken or missing redirects, which lose search traffic, differences in data structure, features that need rebuilding, and short-term traffic changes.
9. We cannot promise a specific conversion rate. Explain what we will improve, how we will measure before and after, and that results depend on traffic, products and price.
10. Any five from the pre-launch checklist, such as test order, payments, shipping and taxes, mobile checks, speed, tracking, redirects, policy pages and client approval.
