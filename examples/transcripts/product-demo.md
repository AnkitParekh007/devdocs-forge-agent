# StreamlineHQ Product Demo Walkthrough

Hi everyone, this is a recorded walkthrough of StreamlineHQ, our internal project management tool that the engineering team built over the last quarter. I am going to show you the core features so you can get up to speed quickly.

Note: This is a fictional product created for demonstration purposes.

## Logging In

When you first open the app at app.streamlinehq.internal, you will see the login screen. Use your company email and the password you set during onboarding. If you forgot your password, use the "Reset via SSO" button — it will redirect you through Okta.

## The Dashboard

After login you land on the Dashboard. The top bar shows your active sprint, number of open tasks assigned to you, and any blockers that have been flagged.

On the left sidebar you will see:
- **My Tasks** — everything assigned to you
- **Team Board** — the kanban view for your whole team
- **Projects** — long-running project spaces
- **Reports** — velocity and burndown charts

## Creating a Task

To create a new task, click the blue "+" button in the top right, or press the keyboard shortcut C from anywhere in the app.

Fill in:
- Title (required)
- Assignee — defaults to you
- Priority — Low, Medium, High, or Critical
- Estimated hours — used for velocity tracking
- Labels — free-form tags like "bug", "feature", "tech-debt"
- Sprint — which sprint to add it to (defaults to current)

Click Save or press Enter. The task appears on the Team Board immediately.

## The Kanban Board

The Team Board has four columns by default:
1. **Backlog** — not started
2. **In Progress** — actively being worked on
3. **Review** — ready for code review or QA
4. **Done** — completed this sprint

Drag and drop cards between columns to update status. The status change is reflected in real time for everyone on the team.

## Connecting to GitHub

If you link your GitHub account in Settings → Integrations, you can associate pull requests with tasks. When a PR is merged, the linked task automatically moves to the Review column.

To link a PR, mention the task ID in the PR description: `closes TASK-42`.

## Reports and Velocity

The Reports section shows your team's sprint velocity over the last 6 sprints. Velocity is calculated in story points or estimated hours, depending on your team's settings.

The burndown chart updates daily. If the line is above the ideal burndown slope, you are running behind schedule for the sprint.

## Getting Help

If you run into issues:
- Use the in-app help button (question mark in the bottom right)
- Post in the #streamlinehq-support Slack channel
- File a bug via the feedback button — it goes directly to our backlog

Thanks for watching. If you have feature requests, drop them in the Slack channel.
