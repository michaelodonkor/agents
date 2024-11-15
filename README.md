# Adroit 360 Software Engineering Take-Home Exercise - Recreated with Next.js

## 🌟 Welcome to My Enhanced Implementation 🌟

This repository contains a reimagined version of the Adroit 360 Software Engineering Take-Home Exercise, built with **Next.js** instead of React + Node.js/Express. While maintaining the core requirements and features, I have introduced additional enhancements to showcase my skills and modern web development practices.

---

## 🚀 Features

### Core Features:
1. **Form Component**:
   - Clicking the "Join the team!" button opens a form where users can add agent details based on the data model.
   - The form creates a new agent and persists the data on reload.

2. **Agent List**:
   - Displays a dynamic list of agents from the database.
   - Includes search functionality by practice areas, updating the page dynamically.

3. **Agent Details**:
   - Clicking on an agent’s card displays detailed information about the agent.
   - Shows reviews for the agent, with the ability to add persistent reviews.

4. **Styling**:
   - Modern, clean, and user-friendly design to attract potential users and enhance usability.

### Enhancements:
- **Next.js Integration**: Leveraging Next.js for SSR (Server-Side Rendering) and performance improvements.
- **TypeScript Support**: Added TypeScript for type safety and better code maintainability.
- **Improved Styling**: Used **Tailwind CSS** for responsive, mobile-first, and visually appealing designs.
- **API Routes**: Integrated Next.js API routes to replace the Node.js/Express backend.
- **Optimized Database Handling**:
  - Continued use of SQLite for simplicity, with Sequelize as the ORM.
  - Improved schema and better data handling practices.
- **Enhanced Search**: Implemented advanced filtering options for practice areas.
- **Reviews**:
  - Styled reviews for readability and consistency.
  - Added validation for review submissions.
- **Production Readiness**:
  - Optimized for scalability and performance.
  - Linted and formatted for production-quality code.

---

## 🛠️ Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [Git](https://git-scm.com/)

### Setup Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/adroit-nextjs-exercise.git
   cd adroit-nextjs-exercise
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   This starts the Next.js application at `http://localhost:3000`.

---

## ✨ Acceptance Criteria

### User Stories
1. Clicking the "Join the team!" button opens a form to add agent details.
2. Form submissions create a new agent and persist the data.
3. The homepage displays a list of all agents from the database.
4. Users can search for agents by practice area dynamically.
5. Clicking an agent’s card displays detailed information, including reviews.
6. Users can submit reviews for agents, and these reviews persist.

### Going Beyond
- Improved responsiveness and design using Tailwind CSS.
- Implemented TypeScript for robustness.
- Replaced Node.js/Express with Next.js API routes for backend operations.

---

## 🔧 Technical Details

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Sequelize ORM
- **State Management**: React Hooks
- **API Client**: Axios

---

## 🏆 Extra Features

- **Dark Mode**: Added a dark theme toggle for improved UX.
- **Pagination**: Introduced pagination for better agent list management.
- **Form Validation**: Improved form validation for better user feedback.

---

## 🤝 Submitting the Assignment

Once complete, push your changes to GitHub and add the following collaborators:
- zAmensah
- ernestaryee
- michaelodonkor8
