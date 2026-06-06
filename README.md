# EduSphere AI 🎓

EduSphere AI is a premium, state-of-the-art AI-Powered Learning Management System (LMS) and college ERP platform built to revolutionize modern education. It unifies administrative operations, learning curriculums, interactive community channels, fee processing, and advanced AI-guided study helpers into a single cohesive experience.

---

## 🚀 Key Features

### 🧠 AI-Powered Classroom
*   **AI Study Coach (24/7 Academic Mentor)**: A chat interface available globally and within the video lecture player. Students can ask doubts about specific courses or active lectures. Powered by **Gemini 1.5 Flash**.
*   **AI Quiz Generator**: Allows faculty HODs to generate custom multiple-choice quizzes on any topic or targeted specifically to lecture transcripts, configuring difficulty levels and question counts.
*   **AI Lecture Note Summarizer**: Automatically compiles core concepts from video lectures into styled bullet points, code snippet blocks, and key takeaways directly into the student's notebook.

### 👥 Stakeholder Portals
EduSphere AI delivers customized, security-separated dashboards for all key academic stakeholders:
1.  **Student Portal**: Track academics, attend live classes, submit assignments, take AI quizzes, request leaves, and download QR-verified certifications.
2.  **Faculty Portal**: Manage courses, create batches, schedule online lectures, evaluate class attendance, and compile AI quizzes.
3.  **Parent Portal**: Monitor child performance grades, track attendance, submit leave notifications, and pay outstanding fee ledgers.
4.  **Admin Portal**: Oversee institution settings, monitor platform revenue streams, configure user accounts, and review security audits.

### 💳 Real-World Integrations
*   **Razorpay Payment Gateway**: Secure fee payments simulation with built-in sandbox mock bank redirects and payment authorization alerts.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org) + [React 19](https://react.dev)
*   **AI Engine**: [@google/generative-ai (Gemini 1.5 Flash)](https://ai.google.dev/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Icons**: [Lucide React](https://lucide.dev)
*   **Styling**: Vanilla CSS variables with responsive modular grids

---

## ⚙️ Setup & Installation

### 1. Prerequisites
Ensure you have Node.js (v18+) installed.

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```
*Note: If no API key is set, the system automatically runs in high-fidelity **Demo Mode** fallback, returning structured academic mock responses.*

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Lint Verification
To check TypeScript compiler and formatting configurations:
```bash
# Verify ESLint Rules
npm run lint

# Compile Production Build
npm run build
```
