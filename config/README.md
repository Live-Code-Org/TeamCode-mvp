#  Configuration Directory

Welcome to the configuration hub of the **TeamCode** Open Core API. 
This directory isolates all infrastructure settings, external connections, and environment setups from the core business logic.

##  Purpose & Architecture
In our Open Core model, this layer is public and fully documented. Its primary goal is to ensure the server bootstraps safely and connects to external services (like databases) reliably. We follow a "fail-fast" approach: if a critical configuration (like the database connection) fails, the application will exit immediately rather than running blindly.

##  Development Path & Progress
**Current Version:** `v0.1.0-alpha`

We are building the MVP's infrastructure step-by-step. Here is the current status of the configuration layer:

- [x] **Database Module (`db.js`)**: Establish connection to MongoDB using Mongoose.
- [x] **Environment Integration**: Securely load variables via `dotenv`.
- [x] **Strict Error Handling**: Implement `process.exit(1)` on database connection failure.
- [ ] **Logger Configuration**: Centralize logging (e.g., Winston/Morgan) (Planned).
- [ ] **Security Configs**: Centralize CORS whitelists and Rate Limiting parameters (Planned).

##  Environment Requirements
To run the modules in this directory locally, you must create a `.env` file at the root of the project containing the following variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/teamcode