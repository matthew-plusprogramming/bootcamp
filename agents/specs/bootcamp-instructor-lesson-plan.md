---
last_reviewed: 2025-12-28
---

# Bootcamp Instructor Lesson Plan (Git + React + Express)

## Purpose
- Give instructors a concrete setup plan for Git merge practice and the
  beginner React/Express exercises.
- Use the client website as the worksheet: instructions are on the page and
  fixes update the UI in realtime.

## Assumptions and repo layout
- Repo root has:
  - `client-website` (Next UI)
  - `node-server` (Express API)
- Key UI files:
  - `client-website/src/app/page.tsx` (main layout + sections)
  - `client-website/src/sections/Home/HeroSectionContent.tsx` (hero CTA buttons)
  - `client-website/src/app/components/LiveExercises.tsx` (API-backed list)
  - `client-website/src/app/page.module.scss`
  - `client-website/src/sections/Home/HeroSectionContent.module.scss`
  - `client-website/src/app/components/LiveExercises.module.scss`
- Key API files:
  - `node-server/src/index.ts` (routes + validation)
  - `node-server/src/services/exercises.ts` (service helpers)
  - `node-server/src/data/store.ts` (seeded exercises shown on the site)
- Use a dedicated `exercises/` folder for Git practice fixtures so they do not
  affect the running apps.
- If the client or server is simplified later, keep the task intent the same
  and only adjust file paths.

## How tasks show up on the website
- The client page is the worksheet. Each task appears on the page with a short
  "Goal" and "Expected result" text.
- Learners fix the code that controls the same UI element. The fix should be
  obvious in the running site.
- Use the "Practice" section in `client-website/src/app/page.tsx` for static
  instructions.
- Use the "Live API preview" section for API-backed tasks. It renders items
  from `node-server/src/data/store.ts` via `LiveExercises`.
- Example bug to stage: a "Next task" or "Start here" button uses the wrong
  anchor, so clicking it does nothing. The UI instruction says what it should
  do, and the fix is in `page.tsx` or `HeroSectionContent.tsx`.

## Instructor local setup
- Start API: run `npm run dev` in `node-server`.
- Start UI: run `npm run dev` in `client-website`.
- Update `node-server/src/data/store.ts` to seed the exact tasks you want
  shown in the "Live API preview".

## Phase 0 - Git merge practice (instructor setup)

### Branching model
- `main` is the stable base.
- Each learner uses `dev/<name>` created from `main`.
- Scenario branches are `scenario/<id>-<slug>` and are merged into `dev/<name>`
  to simulate merges and conflicts.

### Base fixture files (create once on `main`)
Create these files under `exercises/git/` and commit them on `main`. They are
only used for merge practice and do not affect the running apps.

`exercises/git/merge-clean-same-file.md`
```
# Merge Clean Same File
Section A: Greeting = Hello
Section B: Footer = Thanks
```

`exercises/git/conflict-same-line.md`
```
# Conflict Same Line
Status: TBD
```

`exercises/git/semantic-list-order.md`
```
# Semantic List Order
- Apple
- Banana
```

`exercises/git/delete-vs-edit.md`
```
# Delete vs Edit
This file is used for delete vs edit conflicts.
```

`exercises/git/rename-vs-edit.md`
```
# Rename vs Edit
Title: Rename target
```

### Scenario branches and expected outcomes
Each learner should make a small personal commit on `dev/<name>` before merging
any scenarios (for example, add `notes/<name>.md`) so merges create merge
commits instead of fast-forwards.

#### Scenario S1 - Clean merge (new file)
- Branch: `scenario/merge-clean-new-file`
- Instructor change: add `exercises/git/clean-merge/new-file.md`.
- Learner pre-merge change: none.
- Expected: merge commit, no conflicts.

#### Scenario S2 - Clean merge (same file, different sections)
- Branch: `scenario/merge-clean-same-file`
- Instructor change: in `exercises/git/merge-clean-same-file.md`, change
  Section A to `Section A: Greeting = Hello from scenario`.
- Learner pre-merge change: change Section B to
  `Section B: Footer = Thanks from learner`.
- Expected: merge commit, no conflicts.

#### Scenario S3 - Conflict (same line)
- Branch: `scenario/conflict-same-line`
- Instructor change: in `exercises/git/conflict-same-line.md`, change
  `Status: TBD` to `Status: Ready`.
- Learner pre-merge change: change the same line to `Status: Needs review`.
- Expected: merge conflict on the same line.

#### Scenario S4 - Semantic conflict (list ordering)
- Branch: `scenario/semantic-list-order`
- Instructor change: in `exercises/git/semantic-list-order.md`, insert
  `- Cherry` after `- Apple`.
- Learner pre-merge change: insert `- Avocado` after `- Apple`.
- Expected: auto-merge, but list order should be fixed to alphabetical.

#### Scenario S5 - Conflict (delete vs edit)
- Branch: `scenario/conflict-delete-vs-edit`
- Instructor change: delete `exercises/git/delete-vs-edit.md`.
- Learner pre-merge change: edit the file, for example add
  `Learner note: keep this`.
- Expected: merge conflict (modify/delete).

#### Scenario S6 - Rename vs edit (may conflict)
- Branch: `scenario/conflict-rename-vs-edit`
- Instructor change: rename `exercises/git/rename-vs-edit.md` to
  `exercises/git/rename-target.md` and change `Title` line.
- Learner pre-merge change: edit the `Title` line in the original file.
- Expected: rename/modify conflict in most cases. If Git auto-resolves, the
  learner still must confirm the rename happened and the final file contains
  the intended edits.

### Instructor validation checklist (Phase 0)
- Merge each scenario into a fresh branch based on `main` + a small learner
  change to confirm the expected behavior.
- If a conflict does not appear when expected, adjust the scenario edits so the
  same line is modified on both branches.
- Keep each scenario scoped to one file to avoid cross-scenario interference.

## Phase 1 - React fundamentals (no form handling)

### Exercise 1: Fix a broken button or anchor
- Setup: break a visible CTA so the UI does not navigate (example: the
  "Start here" link points to the wrong section ID, or a "Next task" button is
  missing its `href`).
- Learner task: fix the anchor or handler so the button scrolls to the correct
  section.
- Where: `client-website/src/app/page.tsx` and
  `client-website/src/sections/Home/HeroSectionContent.tsx`.
- Done when: clicking the CTA moves to the intended section.

### Exercise 2: Create a component and reuse it
- Setup: keep the repeated "Practice" cards in `page.tsx`.
- Learner task: extract a `PracticeCard` (or similar) component and pass
  `title` and `summary` props.
- Where: `client-website/src/app/page.tsx` and a new
  `client-website/src/app/components/PracticeCard.tsx` (or similar).
- Done when: the component is reused at least 3 times with different props.

### Exercise 3: State + events
- Setup: add a "Show hint" or "Show details" toggle inside each practice card.
- Learner task: use `useState` to show or hide the extra copy on click.
- Where: `client-website/src/app/page.tsx` or the extracted component file.
- Done when: clicking the toggle updates the UI immediately.

## Phase 2 - React data flow

### Exercise 4: Render a dynamic list
- Setup: move the "Practice" cards into a local array in `page.tsx`.
- Learner task: map over the array to render cards with stable keys.
- Where: `client-website/src/app/page.tsx`.
- Done when: all cards render and keys are stable.

### Exercise 5: Conditional UI
- Setup: add an empty-state message when there are no practice items.
- Learner task: render the empty state only when the array length is zero.
- Where: `client-website/src/app/page.tsx`.
- Done when: empty state appears only when the list is empty.

### Exercise 6: Fetch data from the API
- Setup: break the API preview on purpose (wrong path or base URL).
- Learner task: fix the fetch so `LiveExercises` renders the seeded exercises.
- Where: `client-website/src/app/components/LiveExercises.tsx` and
  `node-server/src/index.ts` (GET `/exercises`).
- Done when: cards render with titles, summaries, and tags.

### Exercise 7: Loading and error states
- Setup: remove or break the loading/error states in `LiveExercises`.
- Learner task: restore the `loading`, `error`, and `ready` UI states.
- Where: `client-website/src/app/components/LiveExercises.tsx`.
- Done when: the UI shows a loading message and a clear error message when
  the API is down.

## Phase 3 - Express fundamentals

### Exercise 8: Fix an endpoint bug
- Setup: break `GET /exercises/:id` to return the wrong status or shape.
- Learner task: fix 404 handling and response shape.
- Where: `node-server/src/index.ts`.
- Done when: unknown IDs return 404 and valid IDs return JSON.

### Exercise 9: Add a GET endpoint
- Setup: define a new list endpoint such as `/exercises/difficulty/:level`.
- Learner task: filter the list with `listExercises` and return JSON.
- Where: `node-server/src/index.ts` and `node-server/src/services/exercises.ts`
  if you add a helper.
- Done when: endpoint returns a filtered list with 200 status.

### Exercise 10: Add a POST endpoint with validation
- Setup: extend input validation (example: require at least one tag).
- Learner task: update `parseExerciseInput` and keep 400 on invalid input.
- Where: `node-server/src/index.ts` and `node-server/src/services/exercises.ts`.
- Done when: valid requests create an exercise and invalid requests return 400.

### Exercise 11: Add simple middleware
- Setup: pick a basic middleware (logger or response header).
- Learner task: add middleware and confirm it runs per request.
- Where: `node-server/src/index.ts`.
- Done when: middleware output appears in logs or responses.

## Instructor checklist (summary)
- [ ] Create `exercises/git/` fixture files on `main`.
- [ ] Create scenario branches with the exact edits listed above.
- [ ] Validate each merge scenario on a scratch branch.
- [ ] Seed task text in `node-server/src/data/store.ts` and/or update the
      "Practice" section in `client-website/src/app/page.tsx`.
- [ ] Stage broken UI elements (for example, a CTA or "Next task" button).
- [ ] Prepare Phase 1-3 exercise branches or instructions for each task.
- [ ] Keep all tasks small and isolated to a single file or component.
