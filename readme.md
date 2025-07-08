Here is your improved and well-formatted **README.md** file:

---

# 🚀 Insurance Data Import & CPU Monitoring API

This project provides a robust API solution for:

- Importing insurance policy data from CSV/XLSX files into **MongoDB** using **Worker Threads**.
- Managing insurance-related data through REST APIs (Agents, Users, Accounts, Carriers, Policies, Categories).
- Monitoring CPU usage of the Node.js server and auto-restarting it on high load using **PM2**.
- Scheduling messages for insertion into the database at specified times via background tasks.

---

## 📦 Tech Stack

- **Node.js** (v20.x or above)
- **Express.js**
- **MongoDB** with **Mongoose**
- **Worker Threads** (for background processing of data import)
- **PM2** (for process monitoring & automatic restarts)
- **node-cron** (for scheduled background tasks)
- **Swagger** (for API documentation)

---

## 📂 Project Structure

```
insurance-api/
│
├── config/         → MongoDB connection setup
├── controllers/    → API logic (Agents, Users, Policies, CPU Monitor, Messages)
├── models/         → Mongoose Schemas for MongoDB Collections
├── routes/         → API Route Definitions
├── services/       → Background Schedulers & CSV Import with Worker Threads
├── workers/        → Worker Thread for CSV/XLSX Data Import
├── utils/          → CPU Monitoring & Auto-Restart Utilities
├── swagger/        → Swagger API Documentation Configuration
├── app.js          → Main Application Entry Point
└── README.md       → Project Documentation
```

---

## ✅ Features & Tasks Covered

### **Task 1: Insurance Data Import & API Development**

**✔️ Import API:**

- Upload and import CSV/XLSX insurance policy data into MongoDB using **Worker Threads** for non-blocking, efficient background processing.

**✔️ Search API:**

- Search policy information by **username**.

**✔️ Aggregate API:**

- Aggregate and group policies by **user**.

**Data stored across MongoDB collections:**

- `agents`
- `users`
- `accounts`
- `policies`
- `carriers`
- `lob` (Policy Categories)

---

### **Task 2: CPU Monitoring & Scheduled Messaging**

**✔️ CPU Monitoring & Auto-Restart:**

- Monitor server CPU usage using Node’s `os` module.
- Automatically restart the server when CPU usage exceeds **70%** (using **PM2**).

**✔️ Scheduled Messaging API:**

- API to schedule messages by specifying **day** and **time**.
- Background service inserts messages into MongoDB at scheduled times using `node-cron`.

---

## ✅ API Documentation

Full Swagger API documentation is available for testing and reference.

---

## ✅ How to Run Locally

> **Node.js version required:** 20.x or above

### 1. Install Dependencies:

```bash
npm install
```

### 2. Start the Application:

#### Development Mode (with auto-restart using nodemon):

```bash
npm run dev
```

#### Production Mode:

```bash
npm start
```

#### Start with PM2 (Recommended for CPU Monitoring & Auto-Restart):

```bash
pm2 start src/app.js --name insurance-api
```

---

## ✅ Sample Task Description (For Reviewer Reference)

Company Task:

1. Upload XLSX/CSV insurance data into MongoDB using Worker Threads.
2. Search API to find policy info by username.
3. Aggregate API to get policy info grouped by user.
4. Separate collections for:
   - Agents
   - Users
   - Accounts
   - Carriers
   - Policies
   - LOB (Category)

Additional:

- Monitor CPU utilization and auto-restart the server above 70% CPU usage.
- Create an API to schedule a message that inserts into the database at the given day and time.

---

## ✅ Notes for Reviewer

- Clean and scalable code structure.
- Each task (Data Import, CPU Monitoring, Scheduled Messaging) is implemented in separate, well-organized folders.
- Swagger documentation is fully set up for easy API testing.

---

## 👨‍💻 Author

**Abhishek Kumar**

---

If you'd like, I can also add badges or sample Swagger screenshots. Let me know!
