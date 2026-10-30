# Editing the course content

The seven markdown files in `content/courses/` are the source of truth. Edit a file, commit, and redeploy.
The build reads them with a tolerant parser, and **fails with the file name and line number** if it cannot understand something,
so a mistake never reaches the live site.

## Preview locally

```bash
npm run build:content   # parse every file and print a one-line summary, or the error
npm run dev             # rebuilds content on start, then serves http://localhost:3000
```

After editing while `npm run dev` is running, run `npm run build:content` again and refresh. `npm test` also checks the real files.

## Document shape

```markdown
# Course title                       <- exactly one, first line

Intro paragraph(s). Everything before the first "##" is the course intro.

## 1. Chapter title                  <- each ## is a chapter (lesson)
### Optional subheading              <- ### shows in the "On this page" list
...
## 13. Glossary and knowledge check  <- usually the last chapter
```

- Use **one** `#` title. A second `#` outside a code block is an error.
- Chapters are `##`. The number prefix (`1.`) is optional and is only removed when it looks like `12.` or `12)` followed by a space.
  A title such as `## 5 ways to save` keeps its "5".
- Use `###` for sections inside a chapter. Do not use `####` for anything that should appear in "On this page".
- Raw HTML is never rendered. Write in markdown.

## Chapters can be renumbered safely, but not renamed

- The chapter **slug** (its web address and the key for saved progress) comes from the title **without** its number:
  `## 13. Data quality checks` becomes `data-quality-checks`.
- The number shown to learners is the chapter's **position in the file**. Adding a chapter and renumbering headings changes nothing for anyone.
- **Changing the title text changes the slug, which resets that chapter's saved progress and breaks old links.** Rename a chapter only when you accept that.
- Two chapters in one file must not produce the same slug. The build fails if they do.

## Special blocks

Use these exact bold labels, on a line of their own. A trailing colon (`**Glossary:**`) is fine.

### Glossary

```markdown
**Glossary**

| Term | Meaning |
| --- | --- |
| Baseline | The starting numbers recorded before work begins |
```

Exactly two columns, with a header row and a separator row. Terms from all courses are combined on the **Glossary** page, and identical meanings are merged.

### Knowledge check and answer guide

```markdown
**Knowledge check**

1. First question?
2. Second question?

**Answer guide**

1. Answer to the first question.
2. Answer to the second question.
```

- The **Answer guide** is optional. The onboarding module has none, and its questions say "Discuss this with your lead".
- If you include an answer guide it must have **the same number of answers as questions**, in the same order. Otherwise the build fails.
- Both can sit in any chapter, but normally live in the last one.
- Editing a question's wording resets that learner's saved result for that question only (saved results are tied to the question text).

### Client questions (accordion)

A chapter whose title contains "client questions" is shown as an accordion:

```markdown
## 12. Client questions and sample answers

Optional introduction shown above the questions.

**1. What is SEO, in simple words?**
The answer, in one or more paragraphs, until the next numbered bold line.

**2. How long before we see results?**
Another answer.
```

- Each question is a line that is entirely `**N. Question text?**`, with a number.
- Numbers must be unique within the chapter. Every question needs an answer.
- With fewer than 3 questions the chapter falls back to normal rendering.
- Questions can be linked directly, for example `/courses/seo-basics/client-questions-and-sample-answers#q-7`.

### Checklists

```markdown
- [ ] Accounts created
- [ ] Read this module end to end
```

Each item becomes a checkbox that is saved per learner, with an "x of y done" count above the list.
Changing an item's text resets the saved tick for that item.

## Other supported markdown

Paragraphs with `**bold**`, `*italic*` and `` `code` ``, bullet and numbered lists, GitHub-style tables, blockquotes, links and fenced code blocks.
Bold lines such as `**Worked example**` are just text; only the labels above are special.

## Editing in Word

Files that have been through Word are accepted: Windows line endings, a byte-order mark and non-breaking spaces are cleaned up automatically.
If Word changes straight quotes to curly quotes that is fine. What Word can break is the markdown itself, so after a round trip check that
`##` headings, table separator rows (`| --- | --- |`) and the bold labels above are still intact. `npm run build:content` will tell you if not.

## Adding a new course

1. Add the `.md` file to `content/courses/`.
2. Add an entry to `content/courses.config.ts`: `file`, a unique `slug`, `order`, a one-sentence `description`, and optionally a `badge`.
3. Add the expected chapter count to `tests/fixtures/expected-chapters.json` so the test suite covers it.
4. Run `npm run build:content` and `npm test`.

A `.md` file that is not listed in the config, or a config entry whose file is missing, fails the build.

## What the parser reports

Errors always start with the file and line, for example:

```
content/courses/seo-basics-for-pms.md:70: chapter "Keywords and search intent" has the same slug
("keywords-and-search-intent") as the chapter on line 46; rename one of them
```

Other messages: a missing or second `#` title, a **Glossary** with no table, a row without two columns, a **Knowledge check** with no numbered list,
an **Answer guide** with the wrong number of answers, and a duplicate or empty client question.
