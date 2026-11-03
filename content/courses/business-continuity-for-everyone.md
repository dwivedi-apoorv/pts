# Business Continuity for Everyone

This module is for everyone in the organisation, whatever your role: developers, designers, marketers, writers, project managers, finance, admin, sales, leaders, interns and freelancers. It explains in plain words how we keep serving clients when something goes wrong: a power or internet outage, a platform outage, a cyber incident, a key person leaving suddenly, an unavailable office, an ad account suspension or a client crisis. It covers who does what, who calls whom, how to protect client work, how to hand over, what to tell clients, playbooks for common failures, recovery, learning afterwards and practice. It is written for non-specialists. It is general information and does not replace the organisation's own written continuity plan, and where it touches contracts, insurance or law, it is not legal advice.

Draft of 2026-10-30. Names, contact details, time limits, entitlements and policy references in this module are proposed defaults shown in [square brackets]. Edit them to match the organisation's real policy, and have the module checked by a qualified adviser where it touches law.

## 1. Why everyone needs business continuity

Business continuity means being able to keep doing the important things, or get back to doing them quickly, when something unexpected goes wrong. It is not a document on a shelf. It is a set of habits and a few clear plans that let ordinary people act calmly on a bad day.

An agency needs it because clients depend on us for dates and results. A store launches before a sale. A campaign has a paid budget running every hour. A monthly report goes to a client's board. If our power fails, a platform goes down, or the one person who knows a password is on leave, the client does not care about the reason. They care about the sale, the budget and the report.

After this module you will be able to:

- Name the kinds of disruption that can hit us and our clients
- Explain recovery time, recovery point and single points of failure in plain words
- Know your role, the crisis team and the communication tree
- Keep working when the office, power or internet is unavailable
- Protect client work so that no one person is the only one who knows something
- Hand over cleanly for leave or resignation
- Tell clients early and plainly, without blame or speculation
- Follow a playbook for common failures, then recover and learn

**Rules to remember**

1. Tell someone early. A problem reported in five minutes is cheaper than one found in five hours.
2. Protect people first, then client money and data, then deadlines.
3. Nobody should be the only person who knows a password, a process or a client.
4. Do not speculate or blame in client messages. Say what you know, what you are doing and when you will update.
5. The account owner approves what is said to a client.
6. Write things down so they survive a bad day.
7. Practise, because a plan nobody has tried is a guess.

**What this means for your role**

| If you are | Your main part | Chapters to read twice |
| --- | --- | --- |
| A developer or designer | Backups, version control, documentation, rollback | 7, 10, 11 |
| A marketer or social media manager | Ad accounts, tracking, spend protection | 10, 11 |
| A project manager or account owner | Client communication, escalation, handover | 5, 8, 9 |
| Finance and administration | Payment gateways, bank access, vendors | 11, 13 |
| Leaders and managers | The crisis team, decisions, testing | 4, 12, 15 |
| Freelancers and interns | Knowing who to call and what to do | 5, 6, 8 |

**How to use this module.** Read chapters 1 to 14 once. Keep chapter 5 (the communication tree) and chapters 10 and 11 (playbooks) where you can find them in a hurry. Managers should read chapter 15 closely. Use the glossary in chapter 17 when a term is unfamiliar. For cyber incidents, read this module together with Cyber Security Basics for Everyone.

## 2. The kinds of disruption

Disruptions come in different shapes. Knowing the shapes helps you recognise them early.

| Disruption | What it looks like | Who feels it |
| --- | --- | --- |
| Power or internet outage | Lights out or no connection at the office or at home | Everyone in that place |
| Platform outage | Shopify, Google, Meta, Slack or a payment gateway is down or degraded | Clients and our team at once |
| Cyber incident | Phishing, a hacked account, ransomware, a defaced store | One person, a team, or a client |
| Loss of a key person | A resignation, illness, accident or unexpected absence | A project or a whole function |
| Office unavailable | Flood, fire, a strike, a bandh, a building problem, a curfew | Everyone who works from there |
| Pandemic or travel disruption | Illness spreading, cancelled trains and flights, closures | The whole team |
| Ad account suspension or domain problem | A suspended account, an expired domain, DNS errors | A client's sales and email |
| Vendor failure | A hosting provider, app vendor or freelancer disappears or fails | The projects that depend on them |
| Client crisis | A hacked store, a viral complaint, a product recall, a payment problem | The client, and us as their partner |

For a cyber incident, follow the steps in Cyber Security Basics for Everyone, and also use this module for continuity and communication.

### Small events matter too

Not every disruption is dramatic. A laptop failing the day before a pitch, a client's Shopify app update breaking checkout, and a key designer falling ill are all continuity events. Dealing with the small ones well is what makes the big ones manageable.

| Scenario | What to do |
| --- | --- |
| The office internet drops at 11 am with a client call at noon | Switch to a phone hotspot, tell the client the call may move, and report to [the facilities contact] |
| A client's Shopify theme breaks after an app update | Follow the rollback steps in chapter 11, tell the account owner and keep the client informed |
| Heavy rain floods the office district | Work remotely, confirm everyone's safety and use the communication tree |
| Your team's lead resigns with two weeks' notice and a launch in three | Start the handover checklist in chapter 8 now, not in week two |

## 3. Simple continuity ideas in plain words

You do not need to be an expert. A few ideas cover most of it.

### Critical services and priorities

Not everything is equally urgent. Decide, before the bad day, what must come back first.

| Priority | Examples | Why |
| --- | --- | --- |
| 1: People and safety | Staff safety, a way to reach everyone | Nothing matters more |
| 2: Client money and live stores | Running ad budgets, live checkouts, payment settings | Losses build by the hour |
| 3: Client commitments | Launches, campaign go-lives, board reports | Dates and reputation |
| 4: Communications | Email, chat, phone | Lets us coordinate |
| 5: Internal systems | Timesheets, invoicing, the learning platform | Can wait a short time |

[The crisis team confirms these priorities each year.]

### Recovery time and recovery point

Two simple numbers help you plan.

- **Recovery time** is how long we can accept being without something before it hurts. For example, if checkout is down, can we accept 30 minutes, or 4 hours?
- **Recovery point** is how much recent work we can afford to lose. For example, if a theme is saved once a day and fails at 5 pm, we might lose up to a day of changes.

| Service | Target recovery time | Target recovery point |
| --- | --- | --- |
| Live client store checkout | [1 hour] | [no loss of orders] |
| Ad spend tracking | [2 hours] | [last hour] |
| Team chat and email | [4 hours] | [same day] |
| Project files and themes | [4 hours] | [last 24 hours] |
| Invoicing and finance system | [2 working days] | [last working day] |

These numbers are placeholders. Edit them with the leaders and the people who run each service.

### Single points of failure

A single point of failure is one thing or person that, if it fails, stops the work. Hunt for them.

- One person knows the client's store password
- One laptop holds the only copy of a project
- One internet connection serves the whole office
- One person can approve ad spend
- One vendor hosts everything with no backup

For each one, ask: "If this disappeared today, what happens?" Then add a second person, a second copy or a second route.

## 4. Everyone's role and the crisis team

### What everyone does

- Know the communication tree and have the numbers saved offline
- Report problems fast and calmly
- Keep your work backed up and documented
- Follow instructions from the crisis team during an event
- Help colleagues, check that they are safe, and share facts only

### The crisis team

A small team takes decisions in a serious event. Names are placeholders.

| Role | Person | Back-up | What they do |
| --- | --- | --- | --- |
| Crisis lead | [name, mobile] | [name, mobile] | Decides, declares an incident, owns the response |
| Communications lead | [name, mobile] | [name, mobile] | Staff and client messages, with the account owner |
| Technical lead | [name, mobile] | [name, mobile] | Systems, access, recovery |
| People and safety lead | [name, mobile] | [name, mobile] | Staff welfare, roll call, health and safety |
| Finance lead | [name, mobile] | [name, mobile] | Payments, vendors, insurance claims |
| Account owner | [for each client] | [name] | Client contact and approval of messages |

### When the crisis team activates

[An incident is declared by the crisis lead, or by any team member if the crisis lead cannot be reached, when any of these is true: a live client store is down for more than [30 minutes]; a client's money or data is at risk; the office cannot be used; or more than one team is affected.]

| Level | Meaning | Who handles it |
| --- | --- | --- |
| 1: Minor | One person or one task, quick fix | The person and their manager |
| 2: Serious | One project or client, possible impact | Team lead and account owner, crisis lead informed |
| 3: Major | Several clients, money or data at risk, or office unavailable | Full crisis team |

## 5. The communication tree and escalation

When something goes wrong, the first question is who needs to know. The communication tree answers that, and it has to work even when chat or email does not.

### Who calls whom

1. The person who notices tells their team lead and, for a client matter, the account owner.
2. The team lead decides if it is Level 1, 2 or 3 and, for 2 and 3, calls the crisis lead.
3. The crisis lead activates the crisis team and tells the leadership.
4. The communications lead and the account owner agree the client messages.
5. The people and safety lead checks that all staff are safe and reachable.

### Contact table

Edit this table, and keep a printed copy and a phone copy.

| Role | Name | Mobile | Backup contact | How to reach | Within what time |
| --- | --- | --- | --- | --- | --- |
| Crisis lead | [name] | [mobile] | [name, mobile] | Call, then message | [10 minutes] |
| Technical lead | [name] | [mobile] | [name, mobile] | Call, then message | [10 minutes] |
| Communications lead | [name] | [mobile] | [name, mobile] | Call, then message | [15 minutes] |
| People and safety lead | [name] | [mobile] | [name, mobile] | Call, then message | [15 minutes] |
| Finance lead | [name] | [mobile] | [name, mobile] | Call, then message | [1 hour] |
| Facilities or building management | [name] | [mobile] | [name, mobile] | Call | [15 minutes] |
| Hosting or IT vendor | [name] | [support number] | [escalation] | Call, then ticket | [as per contract] |

### Escalation rules

- Phone first for anything urgent. A message can sit unread.
- If you cannot reach the first person within [10 minutes], go to the backup, then to the next level up.
- Never assume someone else has reported it. Say "I am reporting this" and then do.
- Keep a short log: time, who you called, what you said.

### When chat or email is down

| Situation | Fallback |
| --- | --- |
| Team chat is down | Use [a backup group on another approved messaging app] and phone calls |
| Email is down | Use phone, [the backup messaging group] and the phone numbers in this table |
| The phone network is poor | Use messages and voice calls over mobile data or a different network |
| Everything is down | Follow the plan: the crisis lead calls the team leads, who call their teams |

Do not switch to personal tools for client data. Use only approved tools, as in Cyber Security Basics for Everyone. [Approved backup channel: [name].]

## 6. Working when the office is unavailable

If the office cannot be used, work does not have to stop. A little preparation makes remote working easy.

### Remote fallback

- Know that you may be asked to work from home at short notice. Keep your laptop and charger with you or at home as the team agrees. [Laptop policy: [as set by IT].]
- Check that you can reach the tools you need from home before the day you need them.
- Agree with your manager where you will work if home is not possible. [Alternative workspace: [co-working space], approved by [the finance lead].]

### Internet backup

- Know how to use your phone as a hotspot, and have enough data. [Data allowance: [reimbursed under the Expense and Travel Policy].]
- If your home connection is unreliable, have a second option, such as a different provider's SIM or a nearby cafe or co-working space. Do not use public Wi-Fi for client data without the VPN.
- Test your backup connection now.

### Power backup

- Charge laptop, phone and power bank each night.
- Keep a power bank that can charge your phone several times.
- At the office, find out what the backup power (UPS or generator) covers, and for how long. [Facilities contact.]
- Save work often. Use autosave and cloud files where possible.

### Laptops, files and tools

- Keep working files in the approved shared storage, not only on one laptop.
- Make sure critical files are accessible offline if needed, and are encrypted.
- Use only the approved VPN and approved tools. During a crisis, people rush and sometimes take shortcuts. Do not use personal email or personal cloud storage for client work.
- Keep a printed or offline copy of the contact table.

**Before a possible disruption (storm warning, strike, planned outage)**

- [ ] Laptop, phone and power bank fully charged
- [ ] Critical files synced and accessible
- [ ] VPN and approved tools tested
- [ ] Phone hotspot data available
- [ ] Contact table saved offline
- [ ] Manager told where and how I will work
- [ ] Urgent client tasks handed over or scheduled

## 7. Protecting client work

Most continuity failures come from one missing copy or one person who knows something nobody else does.

### Backups

- Before major changes, back up the theme and the store content. For a Shopify theme, duplicate the live theme or export it first. [Backup practice: [duplicate theme before each change; export products, collections and pages monthly].]
- Keep important project files in approved storage with backup. Follow the rule of keeping several copies, on different kinds of storage, with one away from the main place.
- Test a restore at times. A backup that has never been restored might not work.
- Know what the platform does and does not back up. Do not assume a platform keeps every version forever.

### Version control and documentation

- Keep code and themes in version control, with clear messages about changes.
- Write down how the store is set up: apps, integrations, tracking, domains, payment methods and who owns each. [Documentation lives in [the shared drive project folder].]
- Document recurring processes such as launch steps, monthly reporting and campaign set-up.

### Shared access, never one person

- Keep client access details in the team password manager, with named access for the people who work on the project. [Approved password manager: [name].]
- Do not keep passwords in your head, in chat, in spreadsheets or on sticky notes.
- Use staff or partner accounts in the client's platform wherever possible, so access can be added or removed by name.
- Make sure at least two people can reach each critical system. Record who they are.
- Review access when someone leaves the project or the company. See Cyber Security Basics for Everyone.

**The "bus test"**

For any important project, ask: "If the person who runs this was unavailable tomorrow, could someone else carry on?" If the answer is no, fix it this week.

| Item | Who can access it | Written down where | Last checked |
| --- | --- | --- | --- |
| Client store admin | [two named people] | [password manager] | [date] |
| Ad accounts | [two named people] | [password manager] | [date] |
| Domain registrar | [two named people] | [password manager] | [date] |
| Analytics and tag manager | [two named people] | [password manager] | [date] |

## 8. Handover notes and leave cover

Planned absences are the easiest disruptions to handle, as long as you do the work in advance.

### When to write a handover

- Before annual leave of more than [3 working days]
- Before a notice period ends
- Before a role or project change
- Before planned surgery, maternity or paternity leave or other long absence

Leave entitlements and notice periods are in the HR Policies Handbook for Everyone. [Notice period: [as per contract].]

### Handover checklist

- [ ] List of active clients and projects, with their status
- [ ] Open tasks, deadlines and next steps for each
- [ ] Links to project folders, briefs, designs and reports
- [ ] Where credentials live (the password manager), and who now has access. Never write passwords in the note
- [ ] Recurring tasks, with timing (for example weekly reports on Monday)
- [ ] Ad accounts: budgets, schedules, pending changes
- [ ] Known risks and issues, and anything to avoid touching
- [ ] Key contacts at each client and their preferences
- [ ] Who covers what, and how to reach me in a real emergency
- [ ] A short walk-through with the person taking over
- [ ] Access removed or reassigned after the handover date

### Leave cover

- Name your cover person before you go, and make sure they have read the handover.
- Set an out-of-office message with the name and contact of your cover. Do not promise to check email on leave unless it is agreed.
- Tell clients who will look after them. The account owner sends the message.
- Cover people: tell the person on leave only if something truly needs them. Respect their rest.

| Scenario | What to do |
| --- | --- |
| A campaign manager goes on two weeks' leave during a festival sale | Hand over budgets, schedules and approvals in writing, name a cover with access, and set clear limits on what can change |
| A developer resigns and holds the only knowledge of a custom app | Document the app, run a walk-through, add a second developer, and store all access in the password manager |
| A freelancer's contract ends in a week | Collect files and access, transfer them to the team, and remove the freelancer's access on the end date |

## 9. Client communication during a disruption

Clients forgive problems more readily than silence. How we communicate during a disruption often matters more than the disruption.

### Principles

1. **Tell them early.** Do not wait until you have the full answer. A short message now is better than a perfect one later.
2. **Be plain.** Say what happened in words they understand and what it means for them.
3. **Say what you are doing.** Show that someone is on it.
4. **Give a next update time.** For example, "We will update you by 3 pm."
5. **Do not blame.** Not a vendor, a platform, a colleague or the client. Facts only.
6. **Do not speculate.** Do not guess at causes, timings or numbers you do not know.
7. **The account owner approves the wording.** One voice avoids mixed messages. [Account owner approves; the communications lead helps for Level 3.]

### Message template

| Part | Example |
| --- | --- |
| What we know | "At 2:10 pm we saw that checkout is not completing on your store." |
| What it means | "Customers may be unable to place orders at the moment." |
| What we are doing | "Our developers are checking the cause and our team is in touch with the platform." |
| What we need from you | "Please do not change any settings until we confirm." |
| Next update | "We will update you by 3 pm, or sooner if it is fixed." |

### Do and do not

| Do | Do not |
| --- | --- |
| Acknowledge the impact on their business | Say "it's not our fault" |
| Use the same message for the whole team | Let several people send different updates |
| Keep a record of what you told them and when | Promise a fix time you cannot control |
| Offer a call if it is serious | Hide behind email when they are worried |
| Update at the time you said, even if there is no news | Go quiet after the first message |

| Scenario | What to do |
| --- | --- |
| A client messages the project manager in a panic about a hacked store | Stay calm, acknowledge, move to a call, follow the cyber incident steps and send an approved update |
| The platform is down and clients are asking you for a fix time | Say you are monitoring and will share the platform's updates; do not promise a time |
| You made a mistake that broke the client's page | Tell the account owner at once. Own it plainly to the client with the fix and timing. No blame, and no excuses |

## 10. Playbooks: a store outage, tracking, and an ad account suspension

A playbook is a short set of steps for a known failure, so no one has to invent a response under stress. These are starting points. Edit them for each client.

### Playbook: a store outage or checkout failure

| Step | Action |
| --- | --- |
| 1 | Confirm: check the store from a different device and network. Check the platform's status page |
| 2 | Report: tell your team lead and the account owner. Say what you see and when it started |
| 3 | Find out if it is the platform, an app, a recent change or the domain |
| 4 | If a recent change caused it, roll back the theme or app change (chapter 11) |
| 5 | If the platform is down, do not change settings. Monitor and update the client |
| 6 | Tell the client using the approved template (chapter 9) |
| 7 | Consider pausing paid ads that send people to a broken page |
| 8 | When fixed, test a full order and confirm with the client |
| 9 | Record the timeline for the review |

### Playbook: tracking or analytics is broken

If tracking breaks, ad platforms may optimise on bad data and spend may be wasted.

1. Confirm that tracking is broken: check the tag manager, the pixel and conversion events, and compare orders with reports.
2. Tell the performance marketing lead and the account owner.
3. Pause or protect ad spend until tracking is fixed, for example by lowering budgets or pausing campaigns that depend on conversion data. [Approval: [the account owner or marketing lead] can pause spend.]
4. Find the cause: a theme change, a consent tool, a removed tag or an app update.
5. Fix or roll back, and test with a test order and the debugging tools.
6. Note the period with bad data in the report, and tell the client.
7. Restore ad spend gradually and watch.

### Playbook: an ad account is suspended

1. Do not create a new account to get around it. That can cause further bans.
2. Read the reason given by the platform. Save screenshots.
3. Tell the account owner and the client at once.
4. Check recent changes: ad content, landing pages, payment methods, policy topics.
5. Fix the cause and submit an appeal through the platform's official route.
6. Use other channels while you wait, such as email, organic social or other approved ad accounts, if the client agrees.
7. Keep a record of the appeal and follow up. [Platform support contact: [name].]
8. Review how to prevent a repeat, such as reviewing ads against policies before launch.

## 11. Playbooks: domain and email, payment gateway, rollback and a key person

### Playbook: a domain, DNS or email problem

| Step | Action |
| --- | --- |
| 1 | Check whether the domain has expired or been changed. Look at the registrar account |
| 2 | Check recent DNS changes. Roll back if you have a record of the previous settings |
| 3 | If the store or email is unreachable, tell the account owner and the client |
| 4 | Contact the registrar or DNS provider through official support |
| 5 | For email, check that the records for sender authentication have not been removed |
| 6 | Remember that DNS changes can take time to spread. Do not keep making changes |
| 7 | Add a reminder for renewal dates, and keep two named people with registrar access |

Before changing any DNS records, copy the existing ones into the project documentation.

### Playbook: a payment gateway outage

1. Check the gateway's status page and test with a small order.
2. Tell the account owner and the client. Say orders may fail.
3. If the store offers other payment methods, make sure they are available.
4. Consider a banner on the store telling customers about the problem, with the client's approval.
5. Consider pausing paid traffic until payments work.
6. After recovery, test payments and check for orders that were stuck or duplicated.
7. Finance checks settlements and refunds. [Finance lead.]

### Playbook: a launch that must be rolled back

1. Decide: go back, or fix forward? Roll back if customers are harmed and the fix is unclear.
2. The decision belongs to the project lead and the account owner. [Rollback approval: [project lead].]
3. Restore the previous theme version or the saved copy. Confirm it is the right one.
4. Check checkout, key pages, tracking and forms.
5. Tell the client and the team. Explain the plan to relaunch.
6. Do not relaunch until the cause is found and tested on a copy.

Always keep the last working theme untouched until a launch has been stable for [a few days].

### Playbook: a key person is suddenly unavailable

| Step | Action |
| --- | --- |
| 1 | Check on the person first. Their wellbeing matters most |
| 2 | Tell the team lead and the account owner. Do not guess at the reason |
| 3 | Use the handover notes and the password manager to find what they were working on |
| 4 | Name a cover for each client and task |
| 5 | Tell clients who their contact is for now, without sharing private details |
| 6 | Reprioritise, move deadlines where needed and agree with the client |
| 7 | Review what was missing from the notes afterwards |

Respect privacy. Share only what the team needs to know, and never the reason for the absence unless the person agrees.

## 12. Recovery and getting back to normal

Recovery is more than flipping a switch. It is checking that things are really working, and that nothing was missed.

### Steps

1. **Confirm the fix** with tests, not assumptions. Place a test order, send a test email, check the dashboard.
2. **Restore in order of priority** (chapter 3).
3. **Catch up on the backlog**: delayed tasks, missed messages, unprocessed orders.
4. **Check for hidden damage**: bad data in reports, duplicated orders, changed settings, access that should be removed.
5. **Stand down** the incident: the crisis lead declares the incident over and tells everyone.
6. **Tell clients** it is resolved, what was affected and what happens next.
7. **Look after people.** After a hard incident, some people will be tired or stressed. Give time to rest. See Health, Safety and Wellbeing for Everyone.

### Normal returns slowly

| Stage | What it looks like |
| --- | --- |
| Containment | The problem is stopped from growing |
| Restoration | Services work again |
| Verification | We have checked they work properly |
| Catch-up | The backlog is cleared |
| Review | We learn from it |

| Scenario | What to do |
| --- | --- |
| The office power returns after four hours | Check that equipment restarts, confirm that files saved, catch up on missed calls and tell clients the delays are over |
| A hacked store has been cleaned | Change all access, verify with the client, monitor for a period, and tell the client what was affected |

## 13. A post-incident review and a lessons-learned log

After a serious incident, the question is not "who did this?" but "how did the system let this happen?" A review without blame is how an organisation gets stronger.

### How to run a review

1. Hold it within [one week] of recovery, while memories are fresh.
2. Invite the people involved, and someone to take notes. Keep it to an hour or so.
3. Build a timeline of facts: what happened, when, who noticed, what was done.
4. Ask: what went well, what did not, what surprised us, what was missing (access, information, contacts, tools)?
5. Look for causes in the system and the process, not in individuals.
6. Agree actions with an owner and a date. Keep them few and realistic.
7. Share a short summary with the team, and with the client if appropriate.

### Ground rules

- Honest reports are thanked, not punished.
- Use "what" and "how" questions, not "who" and "why did you".
- Do not use the review to judge performance.

### Lessons-learned log

Keep one log, in [the shared drive], for all incidents.

| Date | What happened | Cause | What worked | What to change | Owner | Due | Done |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [date] | [short description] | [cause in plain words] | [what helped] | [action] | [name] | [date] | [yes or no] |

Review the log each quarter [by the crisis lead], and update the playbooks and contact table.

## 14. Testing and drills

A plan that has never been tried will have gaps. Practice finds them cheaply.

| Test | What it checks | How often |
| --- | --- | --- |
| Contact table check | Numbers are correct and people answer | [every quarter] |
| Call-tree drill | Everyone can be reached within the target time | [twice a year] |
| Work-from-home drill | Everyone can work remotely with approved tools | [twice a year] |
| Backup restore test | Backups can really be restored | [every quarter] |
| Playbook walk-through | Teams talk through a scenario on paper | [every quarter, one scenario] |
| Access review | Two people can reach each critical system | [every quarter] |
| Fire and evacuation drill | People can leave quickly | [yearly]. See Health, Safety and Wellbeing for Everyone |

### A simple walk-through exercise

1. Pick a scenario, for example "checkout fails on launch day".
2. Read it out. Ask each person: what do you do first, who do you call, what do you tell the client?
3. Note gaps: a missing number, no access, no authority to pause ads.
4. Fix the gaps, and add them to the lessons-learned log.

Keep drills calm and short. Nobody is graded.

## 15. A manager's checklist and personal preparedness

### A manager's checklist

- [ ] Each of my clients has an account owner and a named backup
- [ ] Two people can access each critical system for my team
- [ ] The contact table is current and saved offline
- [ ] My team knows the communication tree and the playbooks
- [ ] Handover notes exist for each person and project, and are updated
- [ ] Backups of themes and content are made before changes and tested
- [ ] Leave and cover are planned around launches and peak sales
- [ ] I have run or joined at least one drill this quarter
- [ ] Single points of failure are listed with actions
- [ ] Lessons from the last incident were put into action
- [ ] I check that my team has taken their leave and are not overloaded

### Personal preparedness at home

What happens at home affects work. A few preparations help you keep going, and keep you safe.

- **Backup power**: a power bank, an inverter or a UPS where you can, and a charged phone.
- **Backup internet**: a phone hotspot, plus a second SIM or provider if connectivity is poor.
- **Important numbers**: save your manager, the crisis lead, the HR contact, the emergency number 112 and family contacts in your phone and on paper.
- **Documents**: keep copies of ID, insurance and essential papers in a safe place.
- **A small kit**: torch, first-aid items, water, medicines and a battery radio where you live in an area prone to floods or storms.
- **A plan with family**: agree where to meet and how to reach each other if networks fail.
- **Work setup**: keep your laptop and charger together and tidy. Know where your files are.

Your safety comes first. If an event affects your home or family, tell your manager and take care of those you love. Work can adjust. See the HR Policies Handbook for Everyone for leave. [Emergency leave: [as per HR].]

## 16. Employee questions and sample answers

These are answers a helpful colleague or manager could give. Adapt them to your team and ask your manager for anything specific.

**1. What is business continuity in simple words?**
It is planning so that when something goes wrong, we can keep serving clients or get back quickly. It means knowing who to call, having backups, and having a few simple playbooks. It is mostly habits, not paperwork.

**2. Why does an agency need it?**
Because clients depend on us for launches, campaigns and reports with fixed dates and live budgets. A problem on our side can stop their sales. Planning protects them and us.

**3. What do I do first when something breaks?**
Check it is real, then tell your team lead and, for a client matter, the account owner. Say what you see and when it started. Do not wait until you have a full answer.

**4. Who do I call if I cannot reach my manager?**
Use the contact table and call the backup, then the next level up. Phone first for anything urgent. Keep a short note of who you tried and when.

**5. What if both chat and email are down?**
Use phone calls and [the backup messaging group]. The crisis lead calls the team leads, who call their teams. Keep numbers saved offline.

**6. What is a recovery time target?**
It is how long we can accept something being down before it causes real harm. A checkout may have a target of an hour, internal reports a few days. The numbers are set in the plan. [Confirm with the crisis team.]

**7. What is a single point of failure?**
One person, device, account or vendor whose failure would stop the work. If only one person knows a password, that is one. Fix it by adding a second person, copy or route.

**8. Can I keep client passwords somewhere safe myself?**
Use the team password manager with named access, not your own notes, chat or spreadsheets. That way a colleague can reach what they need and access can be removed when someone leaves.

**9. The office internet is down. What now?**
Switch to a phone hotspot or work from home, and tell your manager and [the facilities contact]. Use the VPN for client work. Move calls if needed and tell clients early.

**10. What should be in a handover note?**
The status of each project, open tasks, links, recurring tasks, risks, key contacts and who covers what. Never write passwords in it. Say where they are stored instead.

**11. How early should I tell a client about a problem?**
As soon as you know that it may affect them, and the account owner has agreed the wording. A short message with a next update time is better than silence.

**12. Can I tell the client whose fault it was?**
No. Do not blame a vendor, platform, colleague or the client. State what happened, what you are doing and when you will update. Blame can be dealt with internally, in the review, as learning.

**13. A platform like Shopify is down. What can we do?**
Check the status page, tell the account owner and clients, avoid changing settings, and consider pausing ads that send traffic to the store. Keep updating until the platform recovers.

**14. Tracking looks wrong after a theme change. What should I do?**
Tell the marketing lead and the account owner, and protect spend by pausing or lowering budgets that depend on conversion data until it is fixed. Then trace the change and fix or roll back.

**15. An ad account has been suspended. Can I just open a new one?**
No. That can lead to more bans. Save the reason, tell the account owner, fix the cause and appeal through the official route.

**16. When should we roll back a launch?**
When customers are being harmed and the cause is unclear, roll back first, then investigate. The project lead and account owner decide. Keep the last working version safe.

**17. What if a key person suddenly cannot work?**
Check on them first, then use the handover notes and password manager to cover their work. Tell clients who their contact is, without sharing private reasons.

**18. Who approves what we tell clients?**
The account owner approves the wording. In a major incident, the communications lead helps. This keeps messages consistent.

**19. Do I have to join drills?**
Yes, please. They are short and nobody is graded. They show gaps while the stakes are low.

**20. What happens after an incident?**
We recover, check for hidden damage, tell clients it is resolved, and hold a short review without blame. The lessons go into a shared log, and the playbooks are updated.

## 17. Glossary

**Glossary**

| Term | Meaning |
| --- | --- |
| Account owner | The person responsible for a client relationship and approving what is said to them |
| Backup | A separate copy of data kept so it can be restored |
| Business continuity | Keeping important work going, or restoring it quickly, during a disruption |
| Communication tree | A plan showing who calls whom in an incident |
| Crisis team | The small group that takes decisions in a serious event |
| Disaster recovery | Restoring systems and data after a major failure |
| DNS | The system that links a domain name to the servers behind it |
| Drill | A practice of a plan to find gaps |
| Escalation | Passing a problem to a more senior or specialised person |
| Handover | Passing work and knowledge to someone else |
| Hotspot | Using a phone's mobile data to give a laptop internet |
| Incident | An event that disrupts or could disrupt normal work |
| Lessons-learned log | A shared record of what incidents taught us |
| Named access | Access given to a specific person under their own login |
| Outage | A period when a service is not working |
| Password manager | A tool that stores and shares passwords safely |
| Playbook | A short set of steps for a known type of failure |
| Post-incident review | A blame-free meeting to learn from an incident |
| Recovery point | How much recent work we can afford to lose |
| Recovery time | How long we can accept being without a service |
| Rollback | Returning to an earlier working version |
| Single point of failure | One thing or person whose failure would stop the work |
| Status page | A page where a platform reports outages |
| Version control | A system that records changes to code or files over time |
| VPN | A service that encrypts internet traffic between a device and a network |

**Knowledge check**

1. Why does an agency need business continuity? Give a client example.
2. Name five kinds of disruption that could affect us.
3. Explain recovery time and recovery point in plain words.
4. What is a single point of failure? Give two examples from agency work.
5. Who do you tell first when you notice a problem, and what do you do if you cannot reach them?
6. Name three things to prepare so you can work when the office is unavailable.
7. Why must client access be kept in the team password manager with named access?
8. List five things a handover note should contain.
9. What five parts should an early message to a client include, and who approves it?
10. If tracking breaks after a change, what should you do about ad spend, and why?

**Answer guide**

1. Clients depend on us for launches, campaigns and reports with fixed dates and live budgets. For example, if checkout fails during a sale, the client loses sales while the problem lasts.
2. Examples: a power or internet outage, a platform outage, a cyber incident, the loss of a key person, an unavailable office, an ad account suspension, a domain problem, a vendor failure or a client crisis.
3. Recovery time is how long we can accept being without a service. Recovery point is how much recent work we can afford to lose, such as the last hour or the last day.
4. It is one thing or person whose failure would stop the work. Examples: only one person knows a client's store password, or the only copy of a theme is on one laptop.
5. Tell your team lead and, for a client matter, the account owner. If you cannot reach them in the agreed time, call the backup, then the next level up.
6. Charge laptop, phone and power bank; know how to use a phone hotspot; keep files accessible; test the VPN and approved tools; and save the contact table offline.
7. It lets colleagues reach what they need, gives named access that can be removed when someone leaves, and avoids passwords in chat, notes or one person's head.
8. Project status, open tasks and deadlines, links to files, recurring tasks, where credentials are stored, risks, key client contacts and who covers what.
9. What we know, what it means for them, what we are doing, what we need from them, and when the next update is. The account owner approves the wording.
10. Pause or lower spend that depends on conversion data until tracking is fixed, because ad platforms may optimise on bad data and waste budget. Then find the cause, fix or roll back, test and restore spend gradually.
