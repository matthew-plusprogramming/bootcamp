---
last_reviewed: 2025-12-28
---

# Bootcamp Instructor Lesson Plan (Git + React + Express)

## Purpose
- Give instructors a concrete setup plan for Git merge practice and the
  beginner React/Express exercises.
- Keep tasks small, explicit, and easy to recover with Git.

## Assumptions and repo layout
- Repo root has:
  - `client-website` (React UI)
  - `node-server` (Express API)
- Use a dedicated `exercises/` folder for Git practice fixtures so they do not
  affect the running apps.
- If the client or server is simplified later, keep the task intent the same
  and only adjust file paths.

## Phase 0 - Git merge practice (instructor setup)

### Branching model
- `main` is the stable base.
- Each learner uses `dev/<name>` created from `main`.
- Scenario branches are `scenario/<id>-<slug>` and are merged into `dev/<name>`
  to simulate merges and conflicts.

### Base fixture files (create once on `main`)
Create these files under `exercises/git/` and commit them on `main`. They are
only used for merge practice.

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

### Exercise 1: Fix a bug (props or rendering)
- Setup: introduce a small bug in a visible component (for example, display
  `undefined` because a prop is misnamed).
- Learner task: fix the prop usage so the correct text renders.
- Done when: UI renders the correct string and no runtime warnings appear.

### Exercise 2: Create a component and use it
- Setup: provide repeated markup in a page or section.
- Learner task: extract a `Card` (or similar) component with clear props and
  replace repeated markup with the new component.
- Done when: component is reused at least 3 times with different props.

### Exercise 3: State + events
- Setup: add a simple toggle or counter placeholder in the UI.
- Learner task: add `useState` and a button click handler to update the value.
- Done when: the UI updates immediately on click.

## Phase 2 - React data flow

### Exercise 4: Render a dynamic list
- Setup: provide an array of items (local data or fetched data).
- Learner task: map over the array to render list items with stable keys.
- Done when: list renders all items and handles empty arrays gracefully.

### Exercise 5: Conditional UI
- Setup: create an empty-state section and a populated-state section.
- Learner task: show one or the other based on the data length.
- Done when: toggling data between empty/populated shows the right UI.

### Exercise 6: Fetch data from the API
- Setup: expose a simple GET endpoint on the API (example: `/exercises`).
- Learner task: call the endpoint from the client and render results.
- Done when: the list renders data returned by the API.

### Exercise 7: Loading and error states
- Setup: simulate slow requests or errors (delay in API, temporary error).
- Learner task: show `Loading...` while awaiting, and a retry message on error.
- Done when: loading and error states appear correctly.

## Phase 3 - Express fundamentals

### Exercise 8: Fix an endpoint bug
- Setup: introduce a small bug in an existing endpoint (wrong status code,
  missing field, or incorrect error handling).
- Learner task: fix the response to match the expected shape and status.
- Done when: endpoint returns correct JSON and status.

### Exercise 9: Add a GET endpoint
- Setup: identify a reusable service (example: `listExercises`).
- Learner task: add a GET route that returns data from the service.
- Done when: route returns a JSON array with 200 status.

### Exercise 10: Add a POST endpoint with validation
- Setup: provide a validation helper or outline required fields.
- Learner task: validate input, return 400 on error, 201 on success.
- Done when: valid requests create data and invalid requests return errors.

### Exercise 11: Add simple middleware
- Setup: pick a basic middleware (logger, request timer, or guard).
- Learner task: add middleware to the app and confirm it runs per request.
- Done when: middleware behavior is visible (console log or response header).

## Instructor checklist (summary)
- [ ] Create `exercises/git/` fixture files on `main`.
- [ ] Create scenario branches with the exact edits listed above.
- [ ] Validate each merge scenario on a scratch branch.
- [ ] Prepare Phase 1-3 exercise branches or instructions for each task.
- [ ] Keep all tasks small and isolated to a single file or component.
