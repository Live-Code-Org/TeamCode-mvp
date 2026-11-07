# 🧬 Models: The Data Contract

**Current Version:** `v0.1.0-alpha`

## What happens here?
This directory is the absolute heart of the TeamCode logic. It contains the **Mongoose Schemas** that define our data structures. 

Instead of hiding our logic, we open-source our database architecture. We want our community to see exactly how a Developer (`User`) is matched, and how a Startup (`Team`) is structured. You'll notice our models are rich with validation and indexing—this is intentional, to ensure our matchmaking engine runs at lightning speed.

## 🗺️ Roadmap & Progress

- [x] **User Schema:** Identity, Matchmaking parameters, and the Certification engine.
- [x] **Team Schema:** Project metadata, GitHub repository integration (Forks & New Repos), and Team Lifecycle.
- [ ] **ActivityLog Schema (Planned):** For tracking live GitHub events (Commits, PRs) before updating the User/Team metrics.