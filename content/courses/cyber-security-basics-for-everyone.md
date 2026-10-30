# Cyber Security Basics for Everyone

This module is for everyone in the organisation, whatever your role. It gives you the everyday cyber security knowledge needed to protect yourself, your colleagues and our clients: how to spot phishing and scams, avoid malware and ransomware, handle passwords and client access safely, and report an incident quickly and calmly. It is written for non-specialists and uses online store examples. It does not describe our internal process in full; see the main onboarding module for that.

Draft of 2026-10-30. Contact names, reporting channels and time limits in this module are proposed defaults shown in [square brackets]. Edit them to match how the team actually works.

## 1. Why everyone needs cyber security basics

Cyber security is not an IT department job, and it is not only for people who handle client projects. Every person with a work email address, a laptop or a login is part of the defence, and every one of them is a possible way in. A single successful attack can start with a receptionist, a developer, a writer, a finance assistant or a director.

You do not need to be a security engineer. You do need to understand the risks well enough to do five things:

- Protect your own accounts, devices and email, because they are the keys to our systems and to our clients' accounts
- Recognise a phishing email, a fake invoice or a suspicious call before anyone acts on it
- Handle client access and data the right way from the first day of any piece of work
- Report anything suspicious fast, without fear of being blamed
- Explain security honestly to clients, if you talk to them, without promising what nobody can promise

**What this means for your role**

| If you are | The risks you meet most | Chapters to read twice |
| --- | --- | --- |
| A project manager or account manager | Fake client emails, invoice fraud, requests for client access | 3, 4, 9, 13, 14, 15 |
| A developer, designer or specialist | Access to client stores and ad accounts, apps and code from unknown sources, stolen sessions | 5, 9, 10, 12 |
| A writer, marketer or social media manager | Fake brand and platform messages, account takeovers, AI tools and data | 3, 6, 10, 12 |
| Finance and administration | Fake invoices, changed bank details, requests for payments | 3, 4, 11 |
| Sales, leadership and management | Impersonation of senior people, high-value scams, decisions after an incident | 2, 4, 13, 14 |
| Freelancers and anyone new | Using your own devices, shared logins, missing training | 1 to 13 |

**Why agencies and their people are targets.** Our team has access to many stores, ad accounts, analytics accounts and email threads. For an attacker, one convincing email to one person can be a way into many businesses at once. Attackers go for people more often than for technology, because people are easier to trick than well-configured systems.

**The golden rule.** Slow down on anything that is urgent, unexpected, or asks for money, a password, a code or access. Check it through a second route (a phone call to a known number, a message in the team chat) before you act.

**How to use this module.** Read chapters 1 to 13 once. Read chapter 13 (incident reporting) twice, and keep it where you can find it quickly. Chapters 14 and 15 (talking to clients, and client questions) matter most if you speak to clients or customers, and are worth a read for everyone. Use the glossary in chapter 16 when a term is unfamiliar. Asking "is this safe?" is always the right question, and nobody will think less of you for asking.

## 2. The threat landscape in plain words

**Who attacks, and why**

| Who | What they want | Typical method |
| --- | --- | --- |
| Criminal groups and opportunists | Money, directly or through stolen data | Phishing, fake invoices, ransomware, stolen card data |
| Scammers targeting individuals | Gift cards, bank transfers, login details | Phone calls, text messages, fake support |
| Competitors or disgruntled insiders | Data, damage or revenge | Misused access, copied files |
| Automated bots | Any weak site or account | Scanning for old software and reused passwords |

**The most common ways in**

- Stolen or guessed passwords, often reused from another site that was breached
- Phishing: a message that tricks someone into giving away a password, a code or money
- Malware: a harmful program installed through an attachment, a download or a fake update
- Out-of-date software with known weaknesses
- Too much access: former staff, freelancers or apps that still have a key they no longer need
- Mistakes: sending a file to the wrong person, sharing a link that is open to everyone

**What is at stake**

- Money: fraudulent payments, ransom demands, ad budget burned by a hijacked account
- Trust: a client who loses customer data may leave, and may tell others
- Time: recovering a hacked store or account can take days
- Legal duties: lost personal data can trigger legal notification duties (see chapter 11)

**Good to know.** Most successful attacks are not clever. They rely on a rushed person, a reused password or a missing second step. The habits in this module stop most of them.

## 3. Phishing and other email scams

**Phishing** is a message that pretends to come from someone you trust, such as a bank, Shopify, Google, a courier, a client or your own manager, to trick you into clicking a link, opening a file, paying money or giving away a login.

### 3.1 Signs of a phishing message

- **Urgency or threat.** "Your account will be closed in 24 hours." "Pay today or the store goes offline."
- **A sender that is almost right.** The display name looks correct but the address is odd, for example a different domain, or a letter swapped (`rn` for `m`, a zero for the letter O).
- **A link that goes somewhere else.** Hover over the link (without clicking) and read the real address. On a phone, press and hold.
- **An unexpected attachment**, especially a zip file, an Office file asking you to "enable macros" or "enable content", or a PDF asking you to sign in.
- **A request for something sensitive:** a password, a one-time code, access, gift cards, or a change of bank details.
- **A generic greeting or odd wording.** Note that well-written scams exist too, and tools can now produce perfect grammar, so good writing proves nothing.
- **A message that breaks the normal pattern.** A manager who never asks for favours by text suddenly asks you to buy gift cards.

### 3.2 Other forms to know

| Name | What it is | Example |
| --- | --- | --- |
| Spear phishing | A targeted message using real details about you or your client | An email naming a real project and a real colleague |
| Smishing | Phishing by text message | "Your parcel is held, pay a small fee here" |
| Vishing | Phishing by phone call | A caller claiming to be from your bank or "IT support" |
| Quishing | Phishing through a QR code | A QR code on an email that leads to a fake login page |
| Business email compromise | A scammer pretends to be a boss, client or supplier, or takes over a real mailbox, to redirect a payment | "Our bank details have changed. Please pay this invoice to the new account." |

### 3.3 What to do with a suspicious message

1. **Stop.** Do not click, open the attachment, reply or forward it to colleagues for fun.
2. **Check through another route.** Contact the supposed sender by a phone number or chat you already know is real, not one given in the message.
3. **Report it** using the reporting button in your email program or the channel in chapter 13 [security channel or email].
4. **Delete it** only after reporting, if you were told to.

**If you already clicked or entered something.** Do not hide it. Go straight to chapter 13. Speed matters more than anything else, and the team would always rather hear about it in five minutes than five days.

## 4. Social engineering: phone, chat and fake invoices

**Social engineering** is any trick that gets a person, rather than a computer, to do something unsafe. It works because people want to be helpful, polite and quick.

**Common tricks**

- **Pretending to be someone in authority.** "This is the account owner. I am in a meeting, I need you to send the client's login right now."
- **Pretending to be support.** A caller or chat message claiming to be from Shopify, Google, Meta, your bank or your own IT, asking you to install a tool or read out a code.
- **Creating a crisis.** "The store is being hacked, give me your password so I can stop it."
- **Offering a reward.** A prize, a free tool, a job offer or an "exclusive partnership".
- **Following you in.** In a shared office, someone without a badge who walks in behind you.

**Fake invoices and changed bank details.** This is one of the costliest scams for businesses.

- Always confirm any change of bank details by phone, using a number you already hold, before paying.
- Check a new supplier or a new invoice against a purchase order or an agreed quote.
- Be extra careful with invoices that arrive at the end of a month, from a new sender, or marked urgent.
- If our own finance process exists, follow it exactly. A pressured exception is how the scam works.

**Rules that stop most social engineering**

- **Nobody legitimate ever needs your password or a one-time code.** Not support, not IT, not your manager. If someone asks, it is a scam.
- **Verify before you trust.** Call back on a known number. Ask a question only the real person could answer.
- **Never be rushed.** A real emergency can survive a two-minute check.
- **It is fine to say no.** "I will confirm this and call you back" is a complete, professional answer.

## 5. Malware, viruses and ransomware

**Malware** (malicious software) is any program designed to cause harm. "Virus" is the word most people use for all of it, but the types behave differently.

| Type | What it does | How it usually arrives |
| --- | --- | --- |
| Virus | Attaches itself to files and spreads when they are opened or shared | Infected files, downloads |
| Worm | Spreads across networks by itself | Network weaknesses, email |
| Trojan | Pretends to be a useful program but does harm | Fake software, cracked apps, fake updates |
| Ransomware | Locks or encrypts files and demands payment, and sometimes threatens to publish stolen data | Phishing attachments, stolen remote logins |
| Spyware and keyloggers | Secretly record what you do and type, including passwords | Bundled with downloads, malicious attachments |
| Infostealers | Steal saved passwords, cookies and sessions from your browser | Fake downloads, cracked software, malicious ads |
| Adware and unwanted programs | Show pop-ups, change your browser and slow your computer | Free software bundles |
| Cryptominers | Use your computer's power to make cryptocurrency for someone else | Infected sites, downloads |

**Signs your device may be infected**

- It is suddenly very slow, hot or noisy
- New programs, browser extensions or toolbars you did not install
- Pop-ups, or your browser home page and search engine change
- Files cannot be opened, have strange new names, or a message demands payment
- Your accounts send messages you did not write
- Security software is switched off and you did not do it

**How to avoid malware**

- Install software and extensions only from official sources and only what you truly need. Never use cracked or "free full version" software.
- Do not open attachments you did not expect, even from people you know, until you have checked.
- Keep the operating system, browser and apps up to date (chapter 7).
- Keep the company-approved security software on, and never turn it off to "make something work".
- Do not plug in a USB stick you found or were handed unexpectedly.
- Be careful with fake "browser update", "video player needed" and "your computer is infected, call this number" pop-ups. Close the whole browser, do not call, and report it.

**If you think a device is infected**

1. Disconnect it from the internet (turn off Wi-Fi and unplug the network cable). Do not switch it off unless told to, because that can destroy evidence.
2. Do not try to clean it yourself, and do not log in to other accounts from it.
3. Report it immediately using chapter 13.

**Ransomware in particular.** Never pay, negotiate or contact the attackers yourself. Payment decisions belong to senior management with legal and specialist advice. Paying does not guarantee files come back, and it can mark the business as a target. The best protection is tested backups (chapter 7).

## 6. Passwords, password managers and multi-factor sign-in

### 6.1 Strong passwords

- **Length beats complexity.** A passphrase of four or more random words is stronger and easier to remember than a short mix of symbols.
- **Unique for every account.** If one site is breached, attackers try the same email and password on every other site. This is called **credential stuffing** and it is one of the most common ways accounts are taken over.
- **No personal information.** No birthdays, names, phone numbers or "Company2026".
- **Never share a password** by email, chat, text or spreadsheet, even with a colleague or your manager.

### 6.2 Password managers

A **password manager** creates, stores and fills in strong unique passwords, so you only remember one strong master passphrase.

- Use the team password manager for all work logins [name of tool], and nothing else for work.
- Protect the manager itself with a long master passphrase and multi-factor sign-in.
- Store client logins there only. Never in chat, email, documents or a spreadsheet.
- Use its sharing features, not copy and paste, when a colleague needs access.
- Do not let the browser quietly save work passwords on a personal profile or shared computer.

### 6.3 Multi-factor authentication (MFA)

**MFA** (also called two-step verification or 2FA) asks for a second proof, in addition to the password. If a password is stolen, the account is still protected.

| Method | How safe | Notes |
| --- | --- | --- |
| Security key or passkey | Strongest | Resistant to phishing. Use where offered |
| Authenticator app | Strong | Codes change every 30 seconds |
| Text message code | Better than nothing | Can be intercepted or SIM swapped. Use only if nothing better exists |
| Approve on your phone | Good, with a risk | Beware of "MFA fatigue" (below) |

**MFA fatigue.** An attacker who has your password triggers repeated sign-in prompts, hoping you tap "Approve" to make them stop. **If you receive an approval prompt you did not start, deny it and report it.** It means your password is known.

**Never give a one-time code to anyone.** A code is a key. Legitimate staff will never ask you for it.

**Turn MFA on for:** email, the password manager, the project board, the shared drive, chat, the Shopify admin, ad accounts, analytics, social accounts, domain registrars and anything that holds client data. Email comes first, because "forgot password" links go to your email.

**Backup codes.** Save them in the password manager. Without them, losing your phone can lock you out.

### 6.4 If a password may be exposed

Change it at once (and any other account that used it), tell the team (chapter 13), and check for sign-ins you do not recognise. A site such as Have I Been Pwned can tell you if your email appeared in a known breach.

## 7. Safe devices, updates and backups

**Keep devices healthy**

- **Updates.** Install operating system, browser and app updates promptly. Many attacks use weaknesses that have a fix available. Turn on automatic updates where allowed.
- **Security software.** Use the approved antivirus or endpoint protection and keep it on. Do not disable it.
- **Screen lock.** Lock your screen whenever you step away (Windows key + L, or Control + Command + Q on a Mac) and set it to lock automatically after a short time.
- **Disk encryption.** Laptops should have disk encryption on (BitLocker on Windows, FileVault on Mac), so a lost laptop does not mean lost data.
- **Separate work and personal.** Do not mix them on the same browser profile or store client files on personal cloud accounts or USB sticks.
- **Approved tools only.** Use the team's approved tools for files, chat and meetings. Unapproved tools are a way data leaks out.
- **Lost or stolen device.** Report it at once, day or night (chapter 13). Remote lock or wipe only works if it is done quickly.

**Backups**

A backup is the safety net for ransomware, deleted files, hardware failure and mistakes.

- **The 3-2-1 rule.** Keep 3 copies of important data, on 2 different types of storage, with 1 copy somewhere else (offsite or in a different cloud).
- **Keep one backup offline or protected** so ransomware cannot reach and encrypt it too.
- **Test a restore.** A backup that has never been restored is only a hope.
- **For stores.** Shopify keeps the platform running, but it does not promise a rollback of your store content or theme edits. Export products, customers and orders on a schedule, and keep theme copies before large changes. Ask the store's developer what is in place.

**Physical security.** Do not leave laptops in cars. Do not discuss client details in public places. Use a privacy screen on trains and in cafes. Collect printouts straight away, and shred anything with client details.

## 8. Safe browsing, Wi-Fi and working remotely

**Browsing**

- Check that a site's address is exactly right before you sign in. Better, use a bookmark or the password manager (which fills in logins only on the correct site).
- Look for the padlock and `https`, but remember: criminals use `https` too. The padlock means the connection is encrypted, not that the site is honest.
- Be careful with browser extensions. Each one can read what you do. Remove those you do not need.
- Do not click ads or search results for "login" or "support" pages without checking. Scammers pay for ads that imitate real brands.
- Log out of shared or borrowed computers, and do not save passwords on them.

**Wi-Fi**

- **Public Wi-Fi** in cafes, hotels, airports and trains is not under your control. Avoid signing in to client or work systems on it. Use your phone's hotspot, or the company VPN [name of VPN] if one is provided.
- **A VPN** encrypts your traffic between your device and the VPN provider. It helps on untrusted networks. It does not make you immune to phishing or malware.
- **Home Wi-Fi.** Change the router's default admin password, use WPA2 or WPA3, install router updates and turn off features you do not use.
- **Fake hotspots** can copy the name of a real one. Ask staff for the exact name, or avoid using it.

**Working remotely**

- Use only approved, up-to-date devices for work.
- Keep work files in the approved storage and not on the desktop of a personal computer.
- Do not let family or friends use your work device.
- On video calls, check who has joined, use waiting rooms where offered, and be careful what is visible on your screen and behind you.
- Do not discuss client names or numbers on public calls.
- Avoid sharing client reports and logins over personal messaging apps.

## 9. Handling client accounts and access

Every project means working in someone else's systems. Done well, access is the safest part of the job. Done badly, it is how a client is harmed.

This chapter is for everyone who works inside a client's accounts: project managers, developers, designers, marketers, writers and freelancers. The rules are the same for all of them.

**The principles**

- **The client owns the account.** We work in their accounts as invited users, and we do not own or hold the keys to their store, domain, ad accounts or analytics.
- **Least privilege.** Ask for the lowest level of access that lets us do the job. Not full owner rights, not "everything, just in case".
- **Named, personal access.** Each person has their own login. Shared logins hide who did what and cannot be switched off for one person.
- **Time-boxed.** Access ends when the work ends.

**Use the platform's invite features, not shared passwords**

| Platform | The safe way |
| --- | --- |
| Shopify | The client creates a staff account or sends a collaborator request, with only the permissions needed |
| Google Analytics, Search Console, Ads | The client adds our email as a user with a suitable role |
| Meta (Facebook and Instagram) | The client shares assets through their Business Manager or Business Suite, and we do not take over their personal profile |
| Domain registrar and DNS | Use the registrar's "delegate" or "invite user" access, not the client's login |
| Email and hosting | Ask for a separate user, not the owner's mailbox |

**If the client insists on sharing a password.** Explain why it is risky, and offer the safe invite steps. If it is truly unavoidable, ask them to use a password manager's secure sharing or an expiring link, never email, chat or a document. Store it in the team password manager straight away and delete the message that held it.

**During the project**

- Keep a simple access log: who has access to what, at what level, since when, and who approved it.
- Review access at each monthly report. Remove anyone who has moved off the project.
- Do not reuse a client's login anywhere else or keep it in your browser's saved passwords.
- Ask the team lead before giving anyone, including a freelancer, access to client accounts. They must be approved and use their own login.

**At the end of the project (handover)**

- Remove all our access, and make sure no staff accounts, collaborator access, API keys or app connections remain.
- Return admin rights to the client and confirm the client has multi-factor sign-in on their owner accounts.
- Delete exports and client files that we do not need to keep, and follow the retention rule in chapter 11.
- Update the access log and record that handover is complete.

**Offboarding our own people.** When a team member or freelancer leaves, remove their access to every client account and tool on their last day, not later.

## 10. Securing a Shopify store and marketing accounts

Shopify runs the platform's servers and the secure checkout. The store owner and the team remain responsible for access, apps, themes and daily habits. A good rule is: **the platform secures the building, we secure the keys.**

**Store checklist**

- Turn on multi-factor sign-in for the owner and all staff.
- Keep staff permissions minimal, and review the list of staff and collaborators regularly.
- Remove staff and apps that are no longer used.
- Use strong unique passwords through a password manager.
- Review installed apps. Each app can read store data. Install only well-reviewed apps from the official app store, check the permissions it asks for, and remove ones that are not used.
- Be careful with custom code and pasted scripts. A malicious script on a checkout or product page can steal customer details ("skimming"). Only add code from trusted sources, and keep a record of every script added.
- Use the platform's secure checkout and approved payment providers. Never store or ask for full card numbers in email, chat or a form.
- Keep the store's contact email protected with its own MFA. It receives the password reset emails.
- Watch the store for unusual changes: new staff accounts, changed payout or bank details, changed email forwarding rules, unexpected apps, new discount codes.

**Domain and email**

- Protect the domain registrar account with MFA. If the domain is hijacked, the store and its email can be taken.
- Turn on the registrar's transfer lock, and set the domain to renew automatically.
- Ask the technical team to set up **SPF, DKIM and DMARC** for the store's email domain. These records help receivers confirm that an email really comes from the store, and make it harder for scammers to impersonate it.

**Ad, analytics and social accounts**

- Use MFA and named users on Google Ads, Meta Business Manager, social accounts and analytics.
- Limit who can change payment methods and spend limits. Hijacked ad accounts are often used to run scam ads on the owner's budget.
- Check billing and spend alerts so unexpected spending is noticed quickly.
- Keep a record of who owns each account, and a recovery email and phone owned by the business, not by one person.

**Warning signs of a compromised store or account**

- A new staff member, app or payment setting you did not authorise
- Orders you cannot explain, or customers reporting strange emails
- Changed theme code, pop-ups or redirects
- Sudden drops in traffic, or search results showing spam pages
- Ad spend jumping or ads you did not create
- The owner is locked out, or a password reset email was sent that nobody requested

If you see any of these, move straight to chapter 13.

## 11. Data protection and privacy basics

**Personal data** is any information that can identify a person: a name, email, phone number, address, order history, IP address or photo. Stores hold a great deal of it, and clients trust us with it.

**Habits that protect personal data**

- **Collect and keep only what you need.** Data you do not hold cannot be stolen.
- **Share on a need-to-know basis.** Give each person the least data needed for their task.
- **Use approved tools.** Never email a spreadsheet of customer details, and never paste customer data into unapproved websites or tools.
- **Prefer links with permissions to attachments.** Share a protected file from the approved drive, and set it to the right people, not "anyone with the link".
- **Minimise exports.** If you export orders or customers for analysis, remove columns you do not need, keep the file only in the approved place, and delete it when done.
- **Mask and sample.** For examples and reports, use anonymised or sample data when possible.
- **Never keep client data on personal devices or personal accounts.**

**The rules differ by country.** Laws such as GDPR in Europe and the UK, CCPA and CPRA in California, and equivalent laws elsewhere set duties on the business that owns the customer data, including how data is collected, how long it is kept and how a breach is reported. Some laws require a breach to be reported to a regulator within a short time (for example, within 72 hours under GDPR). The legal side is not for you to decide, which is another reason to report incidents at once.

**Payment card data.** Card numbers are handled by the payment provider, not by the store or by us. If a card number appears in an email, a chat or a form, treat it as an incident, and report it.

**Retention.** Agree with the client how long we keep their files and exports after the project, and delete them on time. [Retention period, for example 90 days after handover]

**Privacy and cookie notices.** Stores that collect personal data usually need a privacy policy, and a cookie notice where required. We can point clients to a qualified adviser, but we do not give legal advice.

## 12. Using AI tools and third-party apps safely

**AI chat and writing tools** are useful, and they are also a way for data to leave the business.

- **Never paste confidential information** into a public AI tool: client names tied to private details, logins, customer lists, unpublished plans, contracts, financial figures or anything marked confidential.
- **Use only approved tools** and the approved account settings. Ask before using a new one [list of approved tools].
- **Treat the output as unchecked.** AI tools can be wrong or invent facts, sources and links. Check what matters before it reaches a client.
- **Beware of AI-powered scams.** Cloned voices and convincing video can imitate a manager or client. Verify unusual requests for money or access through a second route, whatever the voice sounds like.
- **Be careful with browser add-ons and "AI assistants"** that ask to read everything on every page.

**Third-party apps, plug-ins and integrations**

- Each connected app is another door into the account. Ask: do we need it? Who made it? What does it ask permission to read or change?
- Prefer well-known apps with many reviews and clear privacy terms.
- Remove apps and connections we no longer use, and record the ones we add.
- Never click "Allow" on a permission request you did not start. Fake "Sign in with Google" or "connect your Shopify" screens are used to take over accounts.

**Freelancers and vendors**

- Treat their access like staff access: named, minimal and time-boxed.
- Make sure confidentiality terms are agreed before they see client data.
- Ask a lead before sharing any client account with an outside person.

## 13. Incident reporting: what to do when something goes wrong

**An incident** is any event that harms, or could harm, the confidentiality, integrity or availability of our data, our systems or a client's.

**Report it if any of these happen, or if you only suspect them**

- You clicked a suspicious link, opened a strange attachment, or entered a password or code on a page that may have been fake
- A device is lost, stolen, or behaving strangely
- You sent information to the wrong person
- You see unexplained activity: sign-in alerts, new users, changed settings, unexpected orders or spending
- A client says their account, store, domain or email may have been hacked
- Someone asks you for a password, a code or an unusual payment
- You find client data in the wrong place, such as a public link or a chat message
- A colleague or freelancer has left and still has access

**The most important rule: report quickly, even if you are unsure or embarrassed.** Speed limits the damage, and honest early reports are never punished. Hiding a mistake is what turns a small problem into a big one.

### 13.1 The first ten minutes

1. **Stay calm and stop.** Do not keep clicking, and do not try to fix it quietly.
2. **Disconnect if a device is involved** (turn off Wi-Fi, unplug the network cable). Do not switch it off or delete anything unless told to.
3. **Do not delete evidence.** Keep the suspicious email, the message, the screenshot and the files exactly as they are.
4. **If a password may be exposed, change it** from a different, trusted device, and turn on MFA if it is not already on. Do this after you have told the team if you are unsure.
5. **Report** to [security contact or channel] straight away, by phone if it is urgent. If you cannot reach them, escalate to the team lead [name], then the account owner [name].
6. **Write down what you know** while it is fresh: times, what you clicked or entered, and what you saw.

### 13.2 What to include in a report

| Question | Example |
| --- | --- |
| Who is reporting, and how can they be reached? | Your name, phone number |
| When did it happen, and when was it noticed? | "Today about 10:20, noticed at 10:35" |
| What happened? | "Opened an invoice attachment from an unknown sender" |
| Which accounts, devices, clients or data are involved? | "Laptop, the project board, Client A's store" |
| What have you already done? | "Turned off Wi-Fi, changed my email password" |
| Are there screenshots or the original message? | Attach them, do not forward unknown files widely |
| Is anyone else affected? | "The email went to three colleagues" |

An incomplete report sent quickly is better than a perfect report sent late.

### 13.3 What happens next

| Stage | What it means |
| --- | --- |
| Triage | The security contact decides how serious it is and who must be involved |
| Contain | Stop it spreading: disconnect devices, disable accounts, reset passwords, remove access |
| Investigate | Find out what happened and what was touched |
| Recover | Restore from clean backups, re-enable access safely and check everything |
| Notify | Tell affected clients, and where the law requires, regulators and individuals |
| Learn | Write down the cause and what will change, with no blame |

**If you are the one speaking to the client.** You are often the first to hear of a problem and the voice the client trusts. Everyone else should leave client messages to the account owner and the security contact. So:

- Report internally first. Do not discuss the cause publicly or promise outcomes.
- The account owner and the security contact decide what the client is told and when. Give accurate facts only.
- Keep a timeline of what was reported, to whom and when.
- Keep clients updated at the pace agreed, even when the update is "we are still investigating".
- Never blame an individual, a vendor or the platform in a message to a client.

**When the incident is on the client's side.** If a client tells you their store or email was hacked, treat it as urgent. Tell them to change passwords and turn on MFA from a clean device, to contact their platform's support, and to check bank and payment settings. Alert our security contact so we can check our own access.

**Service levels** [for example: report within 1 hour of noticing; the first update to the client within 4 hours]. Edit to match what the team has agreed.

## 14. Talking to clients: expectations and red flags

This chapter is for anyone who speaks to clients or customers: project managers, account managers, sales, support and specialists on calls. If you do not, read it anyway so you know what we promise and what we do not.

**What we can say with confidence**

- Security is a set of habits and controls that reduces risk. It does not remove it.
- We follow safe working practices: MFA, a team password manager, least-privilege access and a clear way to report incidents.
- We use the platform's invite features and never ask for owner passwords.
- We will tell the client promptly if we believe something affecting them has happened.

**What we must never say**

- "Your store is 100% secure" or "it can never be hacked". Nobody can promise this.
- "We guarantee no data will ever be lost."
- Anything about a breach, its cause or its effects before the facts are confirmed and the account owner has agreed the message.
- That a problem is the client's fault, the platform's fault or a former vendor's fault.
- Technical claims we cannot support, such as "military-grade" or "bank-level" security.

**Better ways to say it**

- Instead of "You are fully protected", say "We have the main protections in place, such as sign-in codes, limited access and backups, and we review them regularly."
- Instead of "Do not worry, it is nothing", say "I am taking it seriously. Here is what we know, what we are doing and when I will update you."
- Instead of "Just send me your password", say "Please add me as a staff user. Here are the steps, and it keeps your account safer."

**Red flags in client requests or in vendor plans**

- A client who wants to send the owner login by email or chat
- A request to move money or change bank details at short notice
- Access given to many people "to keep things simple"
- No MFA on owner, email or registrar accounts
- Very old apps or themes, or code pasted from unknown sources
- A vendor who refuses to say where data is kept or who can see it
- A plan that talks only about tools and says nothing about people, access and reporting

**When you are unsure.** It is better to say "I will check with our security contact and come back to you by tomorrow" than to guess.

## 15. Client questions and sample answers

These are answers anyone who speaks to clients can give, in plain language. Adapt the wording to the client, and check with the security contact or a specialist for anything specific to the client's setup.

**1. Is my store safe?**
Shopify runs the platform's servers and the secure checkout, and that part is built to a high standard. Security also depends on how the store is set up and used: who has access, which apps are installed, whether sign-in codes are on, and how quickly problems are noticed. We help with that second part. We can review your setup and give you a short list of improvements.

**2. Can you guarantee we will never be hacked?**
No, and be careful of anyone who says they can. No business can promise that. What we can do is reduce the risk and prepare for the unusual case. We use sign-in codes, limited access, a password manager and backups, and we have a clear way to report and handle incidents.

**3. Why do you ask me to add you as a staff user instead of sending my password?**
A staff or partner account lets us work in your store with the permissions you choose, using our own login. You stay the owner, you can see what we did, and you can remove our access with one click. A shared password has none of those protections and cannot be switched off for one person.

**4. How do you store our logins, if we do share any?**
In the team password manager, which is encrypted and protected by sign-in codes. They are never kept in email, chat or spreadsheets. We give access only to the people who work on your project, and we remove it when the work ends.

**5. What is two-step sign-in, and do we need it?**
It asks for a second proof, such as a code from an app, in addition to the password. If a password is stolen, the account is still protected. Yes, we recommend it for your store owner account, your email, your domain registrar and your ad accounts. We can show you how, in about ten minutes.

**6. We received an email that looks like it is from you, but something is odd. What should we do?**
Do not click anything, open attachments or reply. Please forward it to us, and also tell us which person received it. Call us on the number you already have to check. Scammers sometimes copy agency names and project details. If anyone did click or enter a password, change that password right away and tell us, and we will help you check your accounts.

**7. A team member clicked a suspicious link. What do we do?**
Act quickly and without blame. Change their password from a different, trusted device, turn on sign-in codes if they are not on, and sign them out of other sessions. Check the store, email and ad accounts for changes you do not recognise. Tell us, and tell your platform's support, so we can check our access too. The earlier this is done, the smaller the problem.

**8. Our former employee or freelancer still has access. Is that a problem?**
Yes, remove it today. Go through the staff and user lists on the store, domain, email, analytics and ad accounts. Remove anyone who no longer needs access, and change shared passwords they may have known. We can help you make a short list of who should have what.

**9. How quickly will you tell us if something affecting our account happens?**
As soon as we have confirmed facts, and we aim to send a first update within [4 hours]. We will tell you what we know, what we are doing and when you will hear from us next, even if the answer is "still investigating".

**10. Who is responsible for security, you or Shopify?**
It is shared. Shopify is responsible for the platform. You are responsible for your account: who has access, your passwords and sign-in codes, and the apps you choose. We are responsible for how we handle access and data while working for you. A good setup makes each part clear.

**11. What happens to our access when the project ends?**
We remove our access at handover. That includes staff accounts, collaborator access, connected apps and any keys we created. We will confirm that in writing and give you the access log so your own records match.

**12. Do you use AI tools on our data?**
We use only approved tools, and we do not put confidential client data, customer lists or logins into public AI tools. If you have specific rules about AI use, tell us and we will follow them. [Update to match company policy]

**13. Someone placed a lot of fake orders. Are we hacked?**
Not necessarily. Fake orders are often carried out by bots testing stolen card numbers, which is called card testing. Turn on bot and fraud protection in the store settings, review recent orders, and tell us so we can look at the checkout and the apps. If you also see changes you did not make, such as new staff users or changed payout details, treat it as a possible compromise and tell us at once.

**14. Our site shows a "Not secure" warning. What does that mean?**
It usually means the page is not using a valid secure (https) connection, or the certificate has a problem. On Shopify stores, the secure connection is normally provided automatically, so this often points to a domain setting. We will check the domain settings and fix it. Meanwhile, avoid asking customers to enter details on that page.

**15. Is it safe to send reports and files on WhatsApp or by email?**
Avoid sending anything sensitive that way. We share reports through the approved drive or the reporting tool, with access set to named people. For personal data, such as customer lists, we avoid sending them at all, and use summary figures instead.

**16. Do you keep our customers' personal data?**
Only what a task needs, only in approved places and only for as long as agreed. We do not keep customer lists after a project unless we have agreed it with you. When a project ends, we delete exports and files we do not need to keep. Please tell us if your policy requires a specific retention period.

**17. What about card data and PCI?**
Card payments are handled by your payment provider, not by us, and not stored on your store. Please never email or message card numbers to us. If one is received, we will tell you and delete it from our systems. Your payment provider can share their compliance details with you.

**18. Our ad account was hacked and money was spent. What now?**
Act quickly. Remove unknown users, change passwords, and turn on sign-in codes. Pause campaigns you did not create. Report the issue to the ad platform through its support form and ask about reviewing the charges. Tell us right away so we can check our access and help gather the details of what changed and when.

**19. Do you do security audits or penetration tests?**
We can do a practical review of your setup: access, sign-in codes, apps, domain and email settings, and backups. A penetration test is a specialist service performed by a security firm, and we can help you find a suitable provider if you need one.

**20. What should we do if our email was spoofed, so scammers pretend to be us?**
Spoofing means a scammer sends emails that look like they come from your domain. Ask your technical team, or us, to check that SPF, DKIM and DMARC are set up for your domain. They help receivers detect fake emails. Also warn your customers and team about the scam, and report it to your email provider.

**21. A customer says they received a strange email from our store. What should we do?**
Take it seriously. Ask the customer to forward the email, and not to click anything. Check whether it came from your real domain or from a lookalike. Check your email platform and store for unusual activity. Then tell us. We will help with the checks and, if needed, a notice to customers.

**22. How should we set up our team's access to our store?**
Give each person their own login, with only the permissions they need. Turn on sign-in codes for everyone. Review the staff list every few months and remove people who have left. Keep the owner account for as few people as possible. We can walk through your staff list with you.

## 16. Glossary and knowledge check

**Glossary**

| Term | Meaning |
| --- | --- |
| Antivirus | Software that finds and removes known malware |
| Authenticator app | An app that creates short-lived sign-in codes for MFA |
| Backup | A separate copy of data used to restore it after loss or attack |
| Breach | An incident in which data was seen, taken or exposed without permission |
| Business email compromise | A scam in which an attacker poses as a trusted person or takes over a mailbox to redirect money or data |
| Credential stuffing | Trying passwords stolen from one site on many other sites |
| Data breach notification | A legal duty to tell regulators or people when their data has been exposed |
| DMARC | An email setting that tells receivers what to do with messages that fail sender checks |
| DKIM | An email signature that helps prove a message was not altered and came from the domain |
| Encryption | Scrambling data so only someone with the key can read it |
| Endpoint | A device such as a laptop or phone that connects to a network |
| Firewall | A barrier that filters network traffic according to rules |
| Incident | Any event that harms, or could harm, the safety of data, systems or accounts |
| Keylogger | Malware that records what is typed, including passwords |
| Least privilege | Giving a person only the access they need for their task |
| Malware | Any software designed to cause harm |
| MFA | Multi-factor authentication: a second proof in addition to the password |
| MFA fatigue | Spamming sign-in prompts until a tired user approves one |
| Passkey | A phishing-resistant sign-in method that replaces the password with a device-held key |
| Password manager | A tool that creates, stores and fills in strong unique passwords |
| Patch | An update that fixes a security weakness |
| Penetration test | An authorised simulated attack run by specialists to find weaknesses |
| Personal data | Information that can identify a person |
| Phishing | A message that tricks you into giving away information, access or money |
| Ransomware | Malware that locks files and demands payment |
| Skimming | Malicious code on a checkout page that steals customer details |
| Smishing | Phishing by text message |
| Social engineering | Tricking people, rather than computers, into unsafe actions |
| SPF | An email setting that lists which servers may send mail for a domain |
| Spear phishing | A targeted phishing message that uses real details about the victim |
| Spoofing | Faking a sender name or address so a message looks genuine |
| Trojan | Malware disguised as a useful program |
| VPN | A service that encrypts internet traffic between a device and the VPN provider |
| Vishing | Phishing by phone call |
| Vulnerability | A weakness that an attacker could use |
| Zero-day | A weakness that is attacked before a fix exists |

**Knowledge check**

1. Name five signs that an email may be phishing, and say what you do before you click anything.
2. A message from "your manager" asks you to buy gift cards urgently and keep it quiet. What do you do?
3. A supplier emails new bank details for an invoice due today. How do you handle it?
4. Why is it safer for a client to add us as a staff user than to send us their password?
5. Rank these sign-in methods from strongest to weakest: text message code, authenticator app, passkey or security key. Why does MFA fatigue matter?
6. Your laptop is acting strangely and you think it may be infected. What are your first three steps?
7. What is the 3-2-1 backup rule, and why test a restore?
8. You clicked a link and typed your password into a page that may have been fake. What do you do, and why quickly?
9. A client asks, "Can you guarantee we will never be hacked?" What do you say?
10. What should a first incident report include, and who do you send it to?

**Answer guide**

1. Urgency or threats, a sender address that is slightly wrong, a link that goes somewhere different when you hover over it, an unexpected attachment, a request for a password, code, payment or gift cards, and a message that breaks the normal pattern. Before clicking, stop, check through another known route, and report it.
2. Do not buy anything and do not keep it quiet. Check by phone or chat on a number you already know, and report it to the security contact. This is a classic impersonation scam.
3. Do not pay yet. Confirm the change by phone using a number you already hold for the supplier, check the invoice against the quote or purchase order, and follow the finance process. Changed bank details under time pressure is a standard fraud.
4. A staff account gives limited, named access that the client controls and can remove at any time, and it shows who did what. A shared password gives full access, cannot be removed for one person, and is easily exposed.
5. Strongest to weakest: passkey or security key, authenticator app, text message code. MFA fatigue is when an attacker with your password spams approval prompts hoping you tap Approve, so an unexpected prompt should be denied and reported.
6. Disconnect it from the network, do not try to clean it or log in to other accounts from it, and report it at once through the incident channel. Do not switch it off or delete anything unless told to.
7. Keep 3 copies, on 2 types of storage, with 1 offsite or offline. Test a restore because a backup that has never been restored may not work when it is needed.
8. Report it immediately and change the password from a different trusted device, then check for unusual activity. Speed matters because attackers use stolen logins within minutes, and early reports limit the damage.
9. No, nobody can honestly promise that. Explain that we reduce risk with sign-in codes, limited access, a password manager and backups, and that we have a clear way to detect, report and respond to incidents.
10. Who you are, when it happened and was noticed, what happened, which accounts, devices, clients or data are involved, what you have already done, and any screenshots or the original message. Send it quickly to the security contact, and escalate to the team lead and account owner if they cannot be reached.
