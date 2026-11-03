# Data Privacy and Confidentiality

This module is for everyone in the organisation: developers, designers, marketers, writers, project managers, finance, admin, sales, leaders, interns and freelancers. It explains the difference between personal data and confidential business information, what India's Digital Personal Data Protection Act, 2023 (the DPDP Act) means in plain words, and how to handle customer lists, order exports, analytics, email lists, ad audiences, client strategy, pricing, credentials and unreleased campaigns safely in daily work. It is written for non-specialists and uses examples from a digital agency that builds and grows online stores. It is general information and not legal advice, and it does not replace the organisation's own written privacy and confidentiality policy or the contracts we have signed with clients.

Draft of 2026-10-30. Names, contact details, time limits, entitlements and policy references in this module are proposed defaults shown in [square brackets]. Edit them to match the organisation's real policy, and have the module checked by a qualified adviser where it touches law.

## 1. Why everyone needs privacy and confidentiality skills

Almost every job here touches information that belongs to someone else. A developer sees live orders while fixing a checkout bug. A marketer uploads an email list to an ad platform. A designer receives a pricing deck for a launch that has not happened yet. A finance colleague sees client invoices. Nobody needs to be a lawyer to handle this well, but everybody needs a few clear habits.

**This module is for all of us because**

- Our clients trust us with their customers' details and their business plans, and that trust is the reason they hire us
- A single careless forward, shared link or pasted spreadsheet can expose hundreds of people at once
- Indian law now sets clear duties for how personal data is handled, and our contracts pass those duties on to us
- Most privacy incidents are ordinary mistakes, not attacks, and ordinary habits prevent them

**What this module will help you do**

- Tell personal data apart from confidential business information, and know which rules apply to each
- Understand the main ideas of the DPDP Act without legal jargon
- Understand our usual role as a processor of client data, and what that asks of you
- Label, store, share, export and delete information correctly
- Spot a possible personal data breach and report it quickly
- Know what to do when someone asks to see or delete their data
- Build privacy into stores, forms and campaigns from the start

**The rules to remember**

1. **Collect and keep only what the job needs.** Data you never took cannot leak.
2. **Client data is the client's, not ours.** We use it only for the work we were asked to do, and we return or delete it when the work ends.
3. **Report fast, never hide.** Tell [privacy contact] as soon as you suspect something went wrong. Speed limits the harm, and nobody is punished for reporting in good faith.

**How to use this module.** Read chapters 1 and 2 first, as everyone needs them. Chapters 3 to 7 explain the law and our role in plain words, so skim them once and return when a client asks a question. Chapters 8 to 14 are the practical heart of the module and apply to your daily work. Use chapter 13 whenever something goes wrong or someone asks about their data. Use the questions in chapter 15 and the glossary in chapter 16 for quick reference. For technical protection such as passwords, phishing and device security, see Cyber Security Basics for Everyone. If you are unsure, ask [privacy contact] before you act.

## 2. Personal data and confidential business information

Two kinds of information need care, and they overlap. It helps to know which one you are holding, because the reasons and the rules differ.

### Personal data

Personal data is any information about an identifiable individual. In the DPDP Act, it means data about an individual who can be identified by or in relation to that data. It does not matter whether the person is a customer, an employee, a visitor to a website or a lead.

**Everyday examples in our work**

- Customer names, phone numbers, email addresses and delivery addresses in a store's order export
- A client's newsletter subscriber list
- Customer IDs, device IDs and cookie identifiers attached to analytics data
- Photos or videos of identifiable people in campaign shoots or user-generated content
- Support chats and review submissions that include names or order details
- Our own colleagues' personal details held by HR and finance

Data does not have to show a name to be personal. If a combination of details can point to one person, such as a postcode, an order date and a rare product, treat it as personal.

### Confidential business information

This is information that gives a business an advantage or causes harm if it leaks. It can be about our clients or about us.

**Everyday examples**

- A client's strategy documents, positioning, roadmap and launch dates
- Pricing, margins, discount plans and supplier terms
- Unreleased campaigns, creatives, product photos and product names
- Ad account performance, revenue and conversion figures
- Credentials: logins, API keys, access tokens and store staff accounts
- Our own proposals, quotes, contracts and internal financial figures
- Source code and theme files that are not public

### How they differ

| Question | Personal data | Confidential business information |
| --- | --- | --- |
| Whose interest is protected? | The individual person | The business that owns it |
| Main source of the duty | Law (the DPDP Act) plus contracts | Contracts, NDAs and trust |
| Example | A list of 5,000 customer emails | The client's festive sale plan |
| Typical harm if leaked | Spam, fraud, distress, legal action | Lost advantage, broken launch, lost client |
| Who can ask about it? | The person it describes can ask to see or correct it | Only the owner decides who sees it |

### Information that is both

Many items are both at once. A customer order export is personal data (names and addresses) and confidential business information (sales volumes and best-selling products). When something is both, follow the stricter rule.

**Worked example.** A client sends you a spreadsheet of last year's orders to plan a retention campaign. It lists customer names, phones, emails, amounts and products. Treat it as restricted: store it only in the approved client folder, share it only with people on the project, and delete your working copies at the end.

### What is not personal data

Fully anonymous, aggregated figures, such as "4,200 orders last month" or "average basket value of ₹1,850", are not personal data. Be careful, though. Small groups can make "anonymous" data identifiable: "the one customer in a small town who bought the premium bundle" points to a person.

## 3. India's DPDP Act in plain words

The Digital Personal Data Protection Act, 2023 is India's law on handling digital personal data. This chapter and the next three give a plain-language picture. They are general information, not legal advice.

**Important note on status.** The Act is supported by Rules, and different parts of the law take effect in phases. The detailed rules, the dates on which each part applies and any later amendments may have changed since this module was drafted. The owner must confirm the current status, and what applies to our business, with a legal adviser. [confirm with a legal adviser] This module therefore does not state commencement dates, and it does not quote exact penalty figures.

### What the Act covers

- Personal data in digital form, or data collected offline and then digitised
- Processing of that data in India, and processing outside India when it relates to offering goods or services to people in India
- Almost every kind of handling: collecting, recording, storing, using, sharing, changing and deleting

### The people and organisations in the Act

| Role in the Act | Plain meaning | Example in our world |
| --- | --- | --- |
| Data Principal | The individual the data is about (and, for a child or a person with a disability, their parent or lawful guardian) | A shopper who buys from a client's store |
| Data Fiduciary | The organisation that decides why and how personal data is processed | The client who owns the store and its customer list |
| Data Processor | An organisation that processes personal data on behalf of a Data Fiduciary | DigiRocket, when we build, run or market the store for the client |
| Data Protection Board | The body set up under the Act to look into breaches and complaints and to decide on penalties | The authority a serious breach is reported to |
| Consent Manager | A registered intermediary that helps individuals give, manage and withdraw consent | Not something we usually deal with |
| Significant Data Fiduciary | A fiduciary the government designates because of the volume or sensitivity of its data, with extra duties | A very large client, if so designated |

The word "fiduciary" signals trust: the organisation holds someone's data on their behalf and must treat it with care.

### Why the roles matter to you

The fiduciary carries the main legal duties and must make sure its processors also protect data. For most of our client work, we are the processor. We follow the client's written instructions and the contract, and we protect the data. For our own data, such as our employees' details, our leads and our website visitors, we are the fiduciary, and the duties are ours directly.

### Where the Act is flexible

The Act allows processing without consent in some "legitimate uses", for example where a person voluntarily provides data for a purpose and does not object, for certain employment purposes, for medical emergencies, and for specified government or legal functions. Do not decide yourself that a legitimate use applies. Ask [privacy contact], who will take advice. [confirm with a legal adviser]

## 4. The core principles, one by one

The Act is built on ideas that are easy to say and take practice to follow. For each one, here is the idea and what it means in a normal working day.

### Notice and consent

Before collecting personal data, a fiduciary generally has to tell people what data it collects and why, how they can exercise their rights, and how to complain. Consent has to be free, specific, informed, clear and given by a clear positive action. It must be as easy to withdraw as to give.

**In practice**

- A store's checkout and sign-up forms need a clear privacy notice
- Do not pre-tick consent boxes for marketing
- Do not bundle marketing consent with "I want to buy this product"
- Keep the wording plain and in the languages the store's customers use, where practical [confirm language needs with the client]

### Purpose limitation

Data collected for one purpose should be used for that purpose. A phone number given for delivery updates is not automatically available for a promotional blast.

**In practice**

- Ask "what did the person agree to?" before using any list
- Do not combine data from different sources for a new purpose without checking with the client

### Data minimisation

Collect only what is necessary for the stated purpose.

**In practice**

- Do not add "date of birth" or "gender" fields to a form unless there is a real use
- Do not ask for an export with every column when you need three
- Remove columns you do not need before saving or sharing a file

### Accuracy

Data that is used to make decisions about people, or that is shared with others, should be accurate and complete.

**In practice**

- When a customer corrects their details, update every system the client has asked you to manage, not just one
- Do not merge lists carelessly and create duplicates or wrong matches

### Storage limitation

Data should not be kept longer than needed for the purpose, unless a law requires longer retention. When the purpose ends, it should be erased.

**In practice**

- Follow the retention periods in the contract or in our [retention schedule]
- Delete working copies of exports as soon as the task is done (chapter 9)

### Reasonable security safeguards

Fiduciaries must protect personal data in their possession or control, including data held by processors, with reasonable security measures to prevent a breach. The Act does not list exact tools. What is "reasonable" depends on the data and the risk.

**In practice**

- Use approved storage, strong sign-in and sharing controls, as set out in Cyber Security Basics for Everyone
- Share only with named people, and remove access when work ends

### Accountability and processors

The fiduciary stays responsible even when a processor does the work, and must have a valid contract with the processor. That is why clients ask us to sign a data processing agreement or add data clauses to the service contract, and why they may audit our practices.

### Quick reference table

| Principle | In one line | A habit that supports it |
| --- | --- | --- |
| Notice and consent | Tell people and ask properly | Clear notice, unticked boxes |
| Purpose limitation | Use data only for what was agreed | Check the purpose before every use |
| Data minimisation | Take only what you need | Fewer form fields, fewer columns |
| Accuracy | Keep it correct | Update everywhere, avoid messy merges |
| Storage limitation | Do not keep it forever | Delete working copies on time |
| Security safeguards | Protect it properly | Approved places, named access |

## 5. The rights of individuals and children's data

### What individuals can ask for

The Act gives Data Principals rights over their data. Summarised in plain words, they include:

- **Information:** to ask what personal data is being processed, the processing activities, and who it has been shared with
- **Correction and erasure:** to have inaccurate or incomplete data corrected, and to ask for data to be erased when it is no longer needed for its purpose, unless a law requires it to be kept
- **Grievance redressal:** to have a complaint heard by the organisation, which must have a clear way to receive and answer complaints, before going to the Data Protection Board
- **Nominating someone:** to nominate another person to exercise their rights if they die or become unable to do so
- **Withdrawing consent:** to withdraw consent at any time, with the same ease as giving it

The Act also places duties on individuals, for example not to file false or frivolous complaints. [confirm details with a legal adviser]

### Who handles these requests

The rights are exercised against the **Data Fiduciary**. When a customer of a client store writes to us, or fills a form on a page we manage, the request is usually the client's to answer, with our help. That is why you never answer these requests alone (chapter 13). You pass them to [privacy contact] within [1 working day], and they coordinate with the client.

The time limits for answering requests, and how they work, are set by the Rules and may change. [confirm with a legal adviser]

### Children's data

The Act has special protections for children. A child means a person under 18.

- Before processing a child's personal data, a fiduciary must obtain **verifiable consent from a parent or lawful guardian**
- A fiduciary must not carry out processing that is likely to cause harm to a child
- The Act prohibits tracking or behavioural monitoring of children and targeted advertising directed at children (the government can set exemptions) [confirm with a legal adviser]

**What this means for our work**

- If a client's store is aimed at teens or children (toys, school wear, gaming, education), raise it with [privacy contact] before building sign-up, tracking or remarketing setups
- Do not build ad audiences from, or target ads at, people known to be under 18
- Do not collect dates of birth casually. If an age check is needed, ask the client how they want it done
- If you find a child's data where you did not expect it, stop and report it

### Scenario table

| Scenario | What to do |
| --- | --- |
| A customer emails our support inbox asking "delete everything you have on me" | Do not reply with a promise. Forward to [privacy contact] within [1 working day]. They will coordinate with the client |
| A parent writes saying their 15-year-old signed up for a client's newsletter | Do not delete or reply alone. Pass it to [privacy contact] straight away, because children's data has extra rules |
| A client asks you to remarket to "everyone who visited the school-bag category" | Check with [privacy contact] first. Some visitors may be children, and the Act limits tracking and targeting of children |
| A user asks you to correct a wrong phone number in an order export | Pass to [privacy contact]. Do not edit client records unless the client has instructed it in writing |

## 6. Breaches, the Data Protection Board and penalties

### What a personal data breach is

Under the Act, a personal data breach is any unauthorised processing of personal data, or accidental disclosure, acquisition, sharing, use, alteration, destruction or loss of access to personal data, that compromises its confidentiality, integrity or availability.

In plain words: personal data went somewhere it should not have gone, was changed or destroyed, or became unavailable when it should not have.

### Breach reporting under the Act

When a breach happens, the fiduciary must inform the **Data Protection Board** and **each affected person**, in the form and within the time the Rules set. The details of the report and the deadlines are set out in the Rules and may change. [confirm with a legal adviser] A processor, such as us, must tell the client quickly so that the client can meet its own duty.

For us, this has a very practical consequence: the clock may already be running at the client by the time you notice a problem. Every hour of delay in telling [privacy contact] is an hour the client does not have.

### Penalties

The Act provides for financial penalties that can be very large, and the largest are linked to failing to take reasonable security safeguards and failing to report a breach. Penalties are decided by the Board after an inquiry, on the facts. This module does not quote figures, because the schedule is detailed and the owner should confirm it. [confirm with a legal adviser]

Beyond fines, a breach can lead to:

- Contract termination and claims for losses from the client
- Loss of reputation in a market where clients talk to each other
- Disciplinary action under our own policy, where there was carelessness or deliberate misuse

### Why we focus on prevention

The Act's penalty regime is the reason clients write strict clauses into agreements. Our best protection is good habits: collect less, store properly, share narrowly, delete on time and report fast.

### Scenario table

| Scenario | What to do |
| --- | --- |
| You email an order export to the wrong "Priya" at a vendor | Do not wait to see if she replies. Report to [privacy contact] immediately with what was sent, to whom and when |
| A shared drive link set to "anyone with the link" contained customer data for two weeks | Change the link to restricted if you can, then report. Do not delete the evidence |
| A laptop with client files is lost on a train | Report to [IT contact] and [privacy contact] at once, even if the laptop is encrypted. They decide what it means |
| You think a colleague has been looking at customer records they do not need | Report to [privacy contact] or through the channel in Speaking Up (Whistleblowing and Grievance Handling) |

## 7. Our role as a processor, and other laws clients may face

### What being a processor means

When a client store owns the customer relationship and tells us what to do with the data, the client is the Data Fiduciary and we are the Data Processor. The client's contract with us should say so, and should spell out what we may do.

**What this asks of us in practice**

- **Follow instructions.** We process client personal data only to deliver the agreed work, and on the client's documented instructions
- **No use for our own purposes.** We do not use client customer lists to market our own services, build lookalike audiences for other clients, train our own tools, or sell or share them
- **Keep it confidential.** Only people who need the data for the project have access, and they are bound by confidentiality
- **Keep it secure.** We apply the safeguards in the contract and in this course, and tell the client quickly about any breach
- **Use sub-processors only with permission.** If we bring in a freelancer, an agency partner or a new tool that will handle client personal data, we need the client's agreement where the contract requires it [check each contract]
- **Help with requests.** We assist the client when a person asks to see, correct or erase their data
- **Return or delete at the end.** When the contract ends, we return or delete the client's data as instructed, and say so in writing [within 30 days, or as the contract says]

### What changes for you day to day

| Situation | Because we are a processor |
| --- | --- |
| Need a customer list for a new idea | Ask the client. We cannot use it for something they have not asked for |
| Want to show real customer details in a case study | Do not. Use anonymised or aggregated figures, and only with the client's written approval |
| A freelancer needs access to the order data | Check the contract and get approval from [account owner] before sharing |
| Want to test a new tool on real data | Use dummy data, unless the client has approved the tool |
| Project ends | Follow the closure checklist: return or delete data, remove access, record that it was done |

### When we are the fiduciary

We are the fiduciary for our own data: staff records, our job applicants, our newsletter subscribers, our website visitors and our own leads. Here, everything in chapter 4 applies to us directly. If you run our own campaigns or forms, ask [privacy contact] for the current notice wording.

### Other laws clients may be subject to

Some clients sell to customers outside India, and then other privacy laws may apply to them in addition to the DPDP Act. Two common examples are the EU and UK GDPR for customers in Europe and the UK, and California's privacy law for customers in California. These laws have their own rules on consent, cookies, rights and transfers. The details are complex and change, so do not assume anything.

- Ask the client early which markets they sell to
- Expect extra contract terms if they do
- Pass questions to [privacy contact] rather than answering them yourself [confirm with a legal adviser]

## 8. Classifying information: public, internal, confidential, restricted

A label tells everyone how careful to be without a long explanation. We use four levels as proposed defaults. [confirm the labels with the owner]

| Level | Meaning | Examples | Basic handling |
| --- | --- | --- | --- |
| Public | Safe for anyone to see | Published blog posts, live store pages, the agency's website, case studies the client has approved | No limits |
| Internal | For staff and project partners; low harm if it leaks | Meeting notes, internal process documents, general team announcements | Keep inside company tools. Do not post publicly |
| Confidential | Would harm a client or us if it leaked | Client strategy, pricing, unreleased campaigns, performance reports, proposals, contracts | Approved storage only. Share with named people. No personal accounts or chatbots |
| Restricted | Highest risk: serious harm or legal duty | Customer lists and order exports, personal data of any kind, credentials, API keys, financial records, children's data | Smallest group. Approved client folder only. Strong controls. Delete when done |

### How to decide the label

1. **Ask what the harm would be if a stranger read this.** Embarrassment is internal. Lost advantage is confidential. Harm to individuals or a legal duty is restricted.
2. **If it contains personal data, start at restricted.** You can lower the label once personal data is removed.
3. **If in doubt, pick the higher label** and ask [privacy contact].
4. **Follow the client's labels** if they have their own system.

### Putting the label to work

- Add the label to file names or document headers for confidential and restricted items, for example "[RESTRICTED] Orders export March"
- Keep restricted material out of chat messages, and put the link in the chat instead of the data
- When combining items, the combined file takes the highest label

### Scenario table

| Scenario | Label and handling |
| --- | --- |
| A client's festive sale plan, dates and discounts, not yet announced | Confidential. Named people only. Do not paste into AI tools |
| A CSV of 12,000 subscribers with names and emails | Restricted. Approved client folder. Delete working copies when done |
| A published blog post draft awaiting approval | Internal until published, then public |
| The admin login to a client's Shopify store | Restricted. Keep it in the [approved password manager]. Never in chat or email |
| A screenshot of a client's ad dashboard showing spend and revenue | Confidential. Share only with the project team |
| A monthly report showing only total orders and revenue | Confidential, since it is business information. It is not personal data |

## 9. Collect less, store properly, delete on time

### Collect only what is needed

Before asking a client for data, or adding a field to a form, ask:

- What exactly will I do with this?
- Could I do the same job with less?
- Could I use anonymised or sample data instead?

**Examples of choosing less**

| Task | Instead of asking for | Ask for |
| --- | --- | --- |
| Analyse repeat purchase rate | Full order export with names and addresses | Order dates and a customer ID, with names removed |
| Test checkout design | Live customer orders | Dummy orders on a staging store |
| Build a lookalike audience | The full customer list | Only the fields the ad platform requires, as the client approves |
| Debug an email template | The real list | Three test addresses |

### Store only in approved places

Approved places are the ones the company has chosen and secured: [approved cloud drive], the client's own systems that they have given you access to, and the project tools we use. Never use these for client data:

- Personal email, personal cloud storage and personal messaging apps
- Your personal phone's gallery, notes or downloads folder
- USB drives, unless approved [see Acceptable Use of IT and AI Tools for Everyone]
- Public file transfer sites and unapproved chatbots

Keep each client's material in that client's folder, and not in a general folder where unrelated people can see it.

### Retention and deletion

Keep data only as long as the task and the contract need it.

| Item | Proposed default |
| --- | --- |
| Working copies of exports and downloads | Delete as soon as the task is done, and in any case within [7 days] |
| Client project files with personal data | Keep for the life of the contract, then return or delete within [30 days] unless the contract says otherwise |
| Credentials and access for ended projects | Remove access on the last day of the project |
| Records of what was deleted and when | Keep a short note in the project record |

Follow the contract if it says something different. Legal and tax rules may require some records to be kept for set periods, for example invoices. Do not delete those. Ask [privacy contact] or finance. [confirm retention periods with a legal adviser]

**Deleting properly**

- Delete the file, then empty the bin or trash folder
- Check Downloads, Desktop, chat attachments and email attachments, where copies hide
- Remove copies on any approved device, and from any shared drive you uploaded to
- Tell the project lead when it is done

### Checklist: before you finish a task that used customer data

- [ ] I deleted my working copies, including those in Downloads and the bin
- [ ] I removed my files from chat and shared links that are no longer needed
- [ ] I removed access for people who no longer need it
- [ ] I recorded the deletion in the project notes
- [ ] I told the project lead if anything was kept and why

## 10. Sharing files, exports, spreadsheets and screenshots

Most data leaks happen when someone shares something with good intentions. These habits make sharing safe.

### Sharing files safely

1. **Share a link to the approved folder, not a copy.** Links can be switched off. Copies cannot be recalled.
2. **Share with named people only.** Never use "anyone with the link" for confidential or restricted files.
3. **Give the lowest access that works.** View only unless they must edit.
4. **Set an end date** where the tool allows it, especially for freelancers and vendors.
5. **Check the recipient's address** before sending. Auto-complete is the most common cause of misdirected emails.
6. **Use the right channel.** Do not send restricted data by chat. Send the link and say the password separately, through a different channel.

### Exports and spreadsheets

Exports from a store, an email tool or an ad account are the biggest source of personal data in our hands. Handle them like cash.

- **Export only the columns you need.** If you need order totals, leave out names, phones and addresses
- **Filter before exporting.** Select the date range and segment you need, not everything
- **Remove personal columns before sharing** with anyone who does not need them
- **Hidden rows, columns and sheets still hold data.** Delete them rather than hiding them
- **Check every tab and every formula** before sending a spreadsheet outside. Formulas and pivot tables can keep source data inside the file
- **Use pseudonyms where you can.** Replace names with customer IDs when the analysis does not need names
- **Never leave exports on your desktop or in Downloads.** Move them to the approved folder, or delete them
- **Name files clearly** with the client and label, for example "[RESTRICTED] ClientName orders export"

### Screenshots and screen recordings

Screenshots look harmless and often contain the most. A single admin screenshot can show customer names, email addresses, order values and a stray notification.

**Before you take or share a screenshot**

- Close other tabs, chats and notification popups
- Crop to the part you need
- Blur or cover names, emails, phone numbers and amounts. Cover them properly. Highlighting or a thin box can sometimes be removed
- Remember that screenshots in a public forum, a vendor's support ticket or a social post are shared with the world
- For screen recordings and calls, share a single window, not the entire screen

### Sending to vendors, freelancers and clients' other agencies

| Situation | What to do |
| --- | --- |
| A freelancer designer needs product shots and nothing else | Share only the product folder, not the whole client drive |
| A third-party app support team asks for a screenshot of the admin | Blur customer details first, and use the vendor's official support ticket |
| A client's other agency asks for the customer list | Do not send it. Tell the client, who decides |
| You need to send a large export to the client | Use the shared, restricted folder or the client's own secure channel |

## 11. Ad platforms, analytics, email lists and cookies

### Uploading customer lists to ad platforms

Platforms such as the major social and search networks allow you to upload a customer list to create a "custom audience". This is a common agency task and a common privacy risk, because you are sending personal data to another company.

**Before you upload a customer list**

- [ ] The client has approved the upload in writing for this purpose
- [ ] The list belongs to this client, and is not a purchased, scraped or borrowed list
- [ ] The people on the list were told, in the privacy notice, that their data may be used for advertising, and where consent is needed it was given
- [ ] You exclude anyone who unsubscribed, withdrew consent or asked for erasure
- [ ] You exclude people known to be under 18
- [ ] You send only the fields the platform requires, and in the hashed form where the platform provides it
- [ ] You upload from the client's ad account, not a personal or agency-owned account that mixes clients
- [ ] You delete your local copy of the list when finished

Never combine lists from different clients, and never re-use one client's audience for another.

### Analytics data

Analytics tools collect browsing data, often with identifiers, which can be personal data.

- Configure tools to collect only what the client needs
- Set data retention in the tool to the shortest period that serves the purpose, as the client agrees
- Avoid sending names, emails or phone numbers into analytics as event parameters or page URLs. This is a common accidental breach
- Limit who has access to analytics, and review it when people leave the project

### Email lists and marketing messages

- Use only lists the client collected with proper permission
- Honour unsubscribes quickly, and keep a suppression list so people are not re-added
- Do not import a list from a spreadsheet that mixes buyers with people who never agreed to marketing
- Separate transactional messages (order updates) from promotional ones
- Do not use bcc lists or group emails that show everyone's address to everyone

Indian rules on commercial messages and telemarketing also exist, and they sit alongside the DPDP Act. Ask the client what they follow. [confirm with a legal adviser]

### Cookies and consent banners on stores

Cookies and similar technologies store identifiers in a visitor's browser. Some are essential, such as the cart. Others track behaviour for analytics or advertising.

**Good practice for stores we build or manage**

- Show a clear banner that explains the categories in plain words, with the same prominence for accept and reject
- Do not load marketing or analytics tags before consent where the client's policy requires consent
- Make it easy to change the choice later through a visible link
- Keep the cookie and privacy policy pages accurate, and update them when tags change
- Record what each tag does before adding it to a store, and remove unused tags

### Scenario table

| Scenario | What to do |
| --- | --- |
| The client says "upload everyone who ever emailed us, including enquiries" | Ask whether those people agreed to advertising. Raise with [privacy contact] before uploading |
| A pixel set up by someone else sends customer emails in the URL to the analytics tool | Report it to [privacy contact] as a possible breach, and fix the tag setup with the client's approval |
| You inherit a store with 14 tracking tags and nobody knows what they do | List them, tell the client, and remove the ones nobody can justify, with approval |
| A client wants to track and remarket to visitors of the kids' range | Pause and escalate to [privacy contact], because of the rules on children's data |
| The client gives you a list "bought from a data vendor" for cold outreach | Do not use it. Escalate to [privacy contact] |

## 12. Confidentiality in conversations, contracts, meetings and handovers

### NDAs and client confidentiality

A non-disclosure agreement (NDA) or a confidentiality clause in a contract is a legal promise not to share the other side's information. Most of our client contracts include one, and you may have signed one with your employment or engagement. [confirm with the owner and HR]

**In simple terms**

- Do not share client information with anyone who does not need it, inside or outside the company
- Do not mention client names, results, revenue or plans in public posts, talks or portfolios unless the client has approved
- Do not use client information for another client, for a competitor, or for personal benefit
- The duty continues after the project ends and after you leave the organisation, for the period the agreement says
- If someone with authority, such as a regulator or a court, demands information, do not answer yourself. Pass it to [legal contact]

### Our own confidential information

Our proposals, pricing, tools, processes, salary data and client lists are confidential too. Do not take them when you leave and do not share them with competitors.

### Meetings, calls and public places

| Place | Risk | What to do |
| --- | --- | --- |
| Cafes, co-working spaces, airports | Overhearing, shoulder surfing | Avoid client calls. Use headphones. Do not open restricted data |
| Trains, cabs, flights | Screens visible to neighbours | Use a privacy screen or work on non-sensitive tasks |
| Video calls | Visible screens, open windows, background voices | Share one window only. Check the background. Close sensitive tabs |
| Home | Family members, visitors, smart speakers | Use a separate space if possible. Lock the screen when you step away |
| Team chat | Wrong channel, large groups | Check the channel members. Never post restricted data. Use named-person channels |
| Social media | Casual leaks | Do not post about client work, offices with visible whiteboards or unreleased products |

### Clean desk and clean screen

- Lock your screen whenever you leave your seat
- Do not leave printed client documents on desks, printers or in meeting rooms
- Clear whiteboards after meetings, and photograph them only if needed and then store the photo properly
- Shred or securely dispose of printouts with personal data [use the office disposal arrangement]
- Take sticky notes with passwords off your monitor, forever. Use the [approved password manager]

### Handover and offboarding

People moving between projects or leaving the company are a key moment for data. A tidy handover prevents lost access, orphaned copies and lingering permissions.

**When you hand over a project or leave**

- [ ] I moved all project files to the approved client folder
- [ ] I deleted local copies on laptops, phones and external storage
- [ ] I handed over credentials by the approved method and asked [IT contact] to change them
- [ ] I removed myself from client chats, shared drives and ad accounts, or [IT contact] did
- [ ] I returned devices, badges and printed materials
- [ ] I reminded freelancers and vendors on the project that their access ends too
- [ ] I understand my confidentiality duty continues after I leave

**For managers:** when someone leaves, ask [IT contact] to remove access on the last day, not later. Check shared accounts, client admin roles and ad accounts.

### Scenario table

| Scenario | What to do |
| --- | --- |
| You are asked on a train to review a client's customer data urgently | Do not open it in public. Find a private place or wait |
| A friend at another agency asks how a client's campaign performed | Do not share. Say it is confidential |
| A colleague is leaving and says they will "just keep a copy of the files for portfolio" | Remind them it breaches confidentiality. Suggest asking the client for approval for a case study |
| You accidentally invite a vendor to a call that includes a confidential discussion | Pause the call, remove them, and tell the project lead after the call |

## 13. Reporting a breach, and handling requests from individuals

### Recognising a possible personal data breach

You do not need to be sure. If you suspect personal data has been exposed, lost, changed or accessed by someone who should not have it, treat it as a possible breach.

**Common signs**

- An email, message or file with personal data went to the wrong person or group
- A shared link or drive was open to "anyone" or to people outside the project
- A device, USB drive or paper file containing personal data was lost or stolen
- A tracking tag or form sends data to the wrong place
- A login to a client store, email tool or ad account was used by someone unknown
- A staff member looked at, copied or took personal data without a work reason
- A file with personal data was deleted or encrypted by mistake or by malicious software

### What to do, step by step

1. **Stop the harm if you can do it safely.** Unshare the link, recall the email, disconnect the device, remove the tag. Do not delete evidence.
2. **Report straight away** to [privacy contact] at [privacy@company], and if it is a technical or device matter also to [IT contact]. Do it within [1 hour] of noticing, and day or night if it looks serious.
3. **Write down the facts:** what happened, what data, whose data, how many people, when, how you noticed, and what you did.
4. **Do not tell the client, the affected people or the public yourself.** The privacy contact coordinates what is said, who says it and when.
5. **Do not investigate by yourself,** do not blame anyone and do not discuss it in open channels.
6. **Help with follow-up.** You may be asked for details.

The technical side, such as phishing, compromised accounts and device loss, is covered in Cyber Security Basics for Everyone. This chapter covers the privacy side: whose data, what harm and who must be told.

### What happens next

[Privacy contact] assesses the incident with [IT contact] and, where client data is involved, informs the client without delay and as the contract requires. The client, as the fiduciary, decides on notifying the Data Protection Board and affected people, with legal advice. We support them.

### No blame for honest reporting

Nobody is punished for reporting a mistake in good faith. Hiding a breach, or deleting evidence, is what creates serious consequences.

### When someone asks to see, correct or delete their data

A customer, lead, subscriber or colleague may ask what data we hold, ask for a correction, ask for deletion, withdraw consent, or complain about how their data is used. These requests can arrive anywhere: a support inbox, social media, a form, an email to any team member.

**What to do**

1. **Do not ignore it, and do not answer it alone.** Do not confirm, deny or delete anything on your own.
2. **Forward it to [privacy contact] within [1 working day],** with the original message, the date received and the channel.
3. **Give the person a neutral holding reply** if appropriate: "Thank you for your message. We have passed it to the right team, who will respond." Do not promise outcomes or timelines.
4. **Do not verify identity by yourself** or ask for identity documents. The privacy contact decides how to check.
5. **Do not delete anything** until instructed. Legal duties may require records to be kept, and the client may need to decide.

**Why the process matters.** The privacy contact will work out whether the request is about our data or a client's data. Where it is a client's customer, we tell the client and follow their instructions as the processor. The deadline for answering is set by law and contract, so a delay of a few days at your end can cost the client its entire window. [confirm timelines with a legal adviser]

### Scenario table

| Scenario | What to do |
| --- | --- |
| A customer comments on a client's social post asking you to delete their data | Forward to [privacy contact] within [1 working day]. Do not delete or reply with promises |
| You realise you attached the wrong spreadsheet to an email to a client's supplier | Report at once. Ask the recipient to delete only if [privacy contact] agrees to that wording |
| A former employee emails asking for a copy of their records | Pass to [privacy contact] and HR. Do not send anything yourself |
| A person says they are a journalist and asks if a client had a breach | Do not comment. Pass to [communications contact] |
| You notice a colleague's laptop open with a client's customer data on a public cafe table | Tell them quietly, and mention it to the project lead if it keeps happening |

## 14. Privacy by design: building stores, forms and campaigns

Privacy by design means thinking about personal data at the start, not after launch. It is far cheaper and easier to get right in the plan than to fix on a live store.

### Questions to ask at the start of any build or campaign

1. What personal data will this collect or use?
2. Why do we need each item?
3. Where will it be stored, who can see it, and for how long?
4. Which tools and vendors will receive it, and are they approved?
5. How will we tell people what we do with it, and how will they exercise their rights?
6. Does it involve children, or sensitive information such as health or finance?
7. What happens at the end: how is the data deleted or returned?

### Defaults that protect people

| Area | Privacy-friendly default |
| --- | --- |
| Forms | Fewer fields, only the required ones marked required, no pre-ticked boxes |
| Accounts | Allow guest checkout where it makes sense |
| Consent | Separate, clear tickboxes for marketing, with a link to the privacy notice |
| Notices | Short notice at the point of collection, link to the full policy |
| Cookies and tags | Off until consent where needed, and listed in the policy |
| Staff accounts | Individual logins, least privilege roles, removed when someone leaves |
| Test data | Dummy data on staging, never live customer data |
| Logs and backups | Do not log full personal details unnecessarily, and set sensible retention |
| Third-party apps | Check what data the app takes before installing, and remove unused apps |
| Data subject requests | A simple route, such as a form or email, that reaches the client and [privacy contact] |

### Checklist: before a store, form or campaign goes live

- [ ] Every field on every form has a clear purpose
- [ ] The privacy notice and consent wording are present and approved by the client
- [ ] Marketing consent is separate and not pre-ticked
- [ ] The cookie banner and tags behave as the client's policy requires
- [ ] No customer data is used in staging or test environments
- [ ] Apps and scripts have been reviewed, and unused ones removed
- [ ] Staff and freelancer access is named, limited and has an end date
- [ ] There is a route for people to ask about or delete their data
- [ ] Children's data has been considered
- [ ] Retention and deletion steps are noted for the end of the project

### Scenario table

| Scenario | What to do |
| --- | --- |
| A designer proposes a "tell us your birthday for a gift" field | Ask what the gift process is. Explain the minimisation principle. If it is needed, say so in the notice and avoid collecting year of birth |
| A developer wants to copy the live database to test a new feature | Do not. Use dummy data or a masked copy approved by [privacy contact] |
| A marketer wants to install a free "popup spin the wheel" app | Check what customer data it collects and where it is stored, and ask [IT contact] to approve it before installing |
| The client wants a quiz that collects health information to recommend products | Raise with [privacy contact] before building. Health data needs special care and clear consent |
| A form sends all entries to a shared inbox for six departments | Limit to the people who need it, and set a deletion routine |

## 15. Employee questions and sample answers

These are questions colleagues often ask. Use the answers as a guide, and ask [privacy contact] when your situation is different.

**1. What is the difference between privacy and confidentiality?**
Privacy is about protecting individuals and their personal data. Confidentiality is about protecting information that a business or person wants kept private, such as plans and prices. Many items are both, and then you follow the stricter rule.

**2. Is a customer's email address really personal data?**
Yes. An email address that identifies or relates to a person is personal data, even without a name. A list of them is restricted information.

**3. Does the DPDP Act apply to us?**
In most client work it applies to our clients as Data Fiduciaries, and to us as their Data Processors through contracts and the Act itself. It also applies to us for our own data. The owner should confirm the current details and timelines with a legal adviser. [confirm with a legal adviser]

**4. What is the difference between a Data Fiduciary and a Data Processor?**
The fiduciary decides why and how personal data is used, such as the store owner who runs the customer list. The processor handles the data on the fiduciary's behalf and follows their instructions, which is what we usually do.

**5. Can I use a client's customer list for our own marketing?**
No. Client data is used only for the work the client has asked us to do. Using it for our own purposes breaks the contract and may break the law.

**6. A client asks me to upload their customer list to an ad platform. Is that fine?**
Often yes, but check first. You need the client's written approval, confidence that the people were told and consent is in place where needed, exclusion of unsubscribed and under-18 contacts, and only the required fields. Use the checklist in chapter 11 and ask [privacy contact] if unsure.

**7. Can I keep a copy of a client's export on my laptop "just in case"?**
No. Keep working copies only as long as the task needs, and delete them afterwards. The master copy lives in the approved client folder.

**8. May I paste customer data into a chatbot to summarise it?**
No. Personal data, client data and credentials must not go into AI tools unless the company and the client have approved that tool for that use. See Acceptable Use of IT and AI Tools for Everyone.

**9. I sent an email to the wrong person. What now?**
Report it to [privacy contact] straight away, with what was sent, to whom and when. Do not just ask the recipient to delete it and move on. A quick report lets the team decide what else to do.

**10. How soon must I report a suspected breach?**
As soon as you notice, and within [1 hour] if you can. Do not wait until you are sure, and do not wait for the working day if it looks serious.

**11. A customer wants their data deleted. Can I just delete it?**
No. Pass the request to [privacy contact] within [1 working day]. Deleting without checking may destroy records that the law or the client needs, and the client, not us, usually decides.

**12. What if someone asks which data we hold about them, and I know the answer?**
Still pass it on. Answers to such requests have legal and contractual requirements, and the response must be consistent and checked.

**13. Are employees' personal details covered too?**
Yes. HR and finance records about colleagues are personal data, and the same care applies. Do not share another person's details without a work reason.

**14. Is it fine to use my personal phone to take a photo of a whiteboard with client plans?**
Avoid it. If you must, move the photo to the approved folder straight away and delete it from the phone and any cloud backup. Prefer taking notes in an approved tool.

**15. Do the rules apply to freelancers?**
Yes. Freelancers who work with client data must follow the same rules, sign confidentiality terms and have limited, time-bound access. Project leads are responsible for checking.

**16. Can I list a client's results in my portfolio?**
Not without the client's written approval, even if the information seems harmless. Ask [account owner], who will request permission.

**17. What about children's data?**
Children under 18 have extra protection, including parental consent and limits on tracking and targeted ads. If a client's audience may include children, raise it with [privacy contact] before building or advertising.

**18. How long can we keep client data after a project ends?**
Only as long as the contract says and the law requires. As a default, return or delete within [30 days] of the end, and keep a note of it. Some finance records have legal retention periods, so ask before deleting those. [confirm with a legal adviser]

**19. A client says they sell to customers in Europe. Does anything change?**
Possibly. The EU and UK GDPR and some other laws may apply to them too, with different rules. Tell [privacy contact] so that contracts and settings are reviewed.

**20. What if I am asked to hand over data by a government officer or a lawyer?**
Do not hand anything over yourself. Pass the request, in writing, to [legal contact]. They will check its validity and tell the client where required.

**21. Can I talk about a client's campaign in an interview or on social media?**
Only what the client has made public or approved in writing. Never share unreleased work, results or numbers.

**22. Will I get in trouble if I report my own mistake?**
Not for an honest mistake reported quickly. The company wants early reports. Concealing a mistake or ignoring a request is what leads to disciplinary action.

## 16. Glossary

**Glossary**

| Term | Meaning |
| --- | --- |
| Anonymisation | Changing data so a person can no longer be identified from it by any reasonable means |
| Clean desk | A habit of not leaving printed or visible sensitive information unattended |
| Confidential information | Business information that gives an advantage or causes harm if it leaks, such as plans, pricing and credentials |
| Consent | A person's free, specific, informed and clear agreement to the use of their data, given by a positive action |
| Consent Manager | A registered intermediary under the DPDP Act that helps people give, manage and withdraw consent |
| Data Fiduciary | The organisation that decides why and how personal data is processed, and carries the main duties under the DPDP Act |
| Data minimisation | Collecting and keeping only the data that is needed for the purpose |
| Data Principal | The individual the personal data relates to |
| Data Processor | An organisation that processes personal data on behalf of a Data Fiduciary, as our agency often does |
| Data Protection Board | The body under the DPDP Act that looks into breaches and complaints and can decide on penalties |
| DPDP Act | India's Digital Personal Data Protection Act, 2023, which sets rules for handling digital personal data |
| Erasure | Deleting personal data when it is no longer needed, or when a person validly asks and no law requires keeping it |
| Grievance redressal | A route for people to raise complaints about how their data is handled and have them answered |
| Hashing | Turning data such as an email address into a scrambled value so it is not shown in plain form |
| Legitimate use | A situation named in the DPDP Act where data may be used without consent, to be decided by advisers and not by individual staff |
| Personal data | Information about an identifiable individual |
| Personal data breach | Unauthorised or accidental exposure, change, loss or destruction of personal data |
| Privacy by design | Building privacy protections into a product, form or campaign from the start |
| Privacy notice | A clear statement to people about what data is collected, why, and how to exercise their rights |
| Purpose limitation | Using data only for the purpose it was collected for |
| Restricted | The highest classification level, used for personal data, credentials and similar high-risk items |
| Retention period | How long a type of data may be kept before it is deleted or returned |
| Storage limitation | Not keeping personal data longer than needed |
| Sub-processor | Another party, such as a freelancer or a tool provider, that handles client personal data for us |
| Verifiable parental consent | Consent from a parent or lawful guardian for processing a child's data, which can be checked |

**Knowledge check**

1. Name one example of personal data and one example of confidential business information from a client store project.
2. In most client work, is the agency the Data Fiduciary or the Data Processor, and what does that mean for using the client's customer list?
3. What are two of the rights the DPDP Act gives to individuals?
4. Under the Act, who must give consent for processing the personal data of a person under 18?
5. Why does this module say the exact dates and rules of the DPDP Act must be confirmed with a legal adviser?
6. What classification level does a customer order export belong to, and why?
7. List three things to do before uploading a customer list to an ad platform.
8. Why should you share a link to the approved folder instead of attaching a copy?
9. You realise you sent a spreadsheet of customers to the wrong email address. What do you do, and how fast?
10. A customer messages a client's social page asking for their data to be deleted. What should you do?

**Answer guide**

1. For example, a customer's name, phone and address in an order export is personal data. The client's unreleased festive sale plan is confidential business information.
2. The agency is usually the Data Processor and the client is the Data Fiduciary. We use the customer list only for the work the client has instructed, never for our own purposes, and return or delete it at the end.
3. Any two of: the right to information about the processing, the right to correction and erasure, the right to grievance redressal, the right to nominate someone, and the right to withdraw consent.
4. A parent or lawful guardian must give verifiable consent for a child, which means anyone under 18.
5. Because the Act is supported by Rules and its parts take effect in phases, and details can change, so this course cannot be relied on for current dates, deadlines or penalty figures.
6. Restricted, because it contains personal data and also confidential sales information, so the stricter rule applies.
7. Any three of: get the client's written approval, confirm the list is the client's own and properly collected, exclude unsubscribed and under-18 contacts, send only the required fields, upload from the client's own ad account, and delete your local copy afterwards.
8. A link can be switched off or restricted to named people, while a copy cannot be recalled and spreads beyond control.
9. Report it to the privacy contact immediately, within the stated time (such as 1 hour), with what was sent, to whom and when. Do not rely on the recipient deleting it and do not delay.
10. Do not delete or reply with promises. Forward the request to the privacy contact within the stated time (such as 1 working day), so the client and the company can respond properly.
