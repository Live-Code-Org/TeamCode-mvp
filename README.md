# TeamCode  | Open Core API

Welcome to the **TeamCode Open Core API** repository. 
This is the backend engine powering the TeamCode platform—a project incubator that connects junior developers into balanced teams to build real-world Open Source products.

**Current Version:** `v0.1.0-alpha`

##  Architecture & Philosophy

TeamCode operates on an **Open Core** model. This repository contains the transparent, open-source foundation of the platform:
*   **Data Models (`/models`):** The exact Mongoose schemas defining our Developers and Teams.
*   **API Layer (`/routes` & `/controllers`):** The RESTful endpoints managing the application state.
*   **Infrastructure (`/config`):** Server bootstrap and database connections.

*(Note: Internal algorithms for calculating Reputation Scores and webhook validations are maintained in a separate closed-core service to protect the integrity of the platform).*

##  Development Roadmap & Progress

We are currently building the MVP. Here is our live tracking checklist:

- [x] **Phase 1:** Core Database Architecture (User & Team Mongoose Schemas).
- [x] **Phase 2:** Server Initialization & MongoDB Connection (`config`).
- [ ] **Phase 3:** API Layer - Routes & Controllers (CRUD for Users/Teams)  *[We are here]*
- [ ] **Phase 4:** Matchmaking & Discovery Engine endpoints.
- [ ] **Phase 5:** GitHub Webhooks Integration.

##  Local Development Setup

Want to contribute or run the server locally? Follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Live-Code-Org/TeamCode-mvp.git
   cd TeamCode-mvp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/teamcode
   ```

4. **Boot the server:**
   ```bash
   node server.js
   ```
   *You should see "MongoDB Connected" and "Server is running" in your console.*