# 🚀 NextHire

**NextHire** is a modern job discovery and career-resource platform designed to help students and job seekers find **private jobs, government jobs, referrals, interview experiences, career roadmaps, study notes, and other placement resources** in one place.

The platform focuses on providing a clean, organized, and user-friendly experience for discovering opportunities and preparing for careers.

---

## 🌟 Features

### 💼 Job Portal

* Browse private and government job opportunities
* Job search and filtering
* Job details pages
* Direct application links
* Save and track interesting jobs
* Share jobs through social platformsS
* Curated job listings

### 🏢 Direct Hiring

* Admin-curated hiring opportunities
* Direct hiring announcements
* Company/job information
* Application redirection to official company pages

### 🤝 Referral System

* Referral opportunities
* Referral professionals
* LinkedIn referral links
* Connect with professionals for job referrals

### 📚 Career Resources

NextHire provides multiple career-preparation resources:

* Career Roadmaps
* Government Exam Resources
* Government Exam Notes
* Core Computer Science Subjects
* Interview Experiences
* Technology Stack Resources
* Study Materials

### 📝 Government Exam Notes

* Government-exam-wise categories
* Subject-wise notes
* PDF study materials
* Note descriptions
* Published/Draft status
* PDF view and download
* Admin note management

### 🗺️ Career Roadmaps

Roadmaps help students follow a structured learning path for different career roles.

Examples:

* Full Stack Developer
* Java Developer
* MERN Developer
* Software Engineer
* Data/AI-related career paths

### 🎤 Interview Experiences

* Company-wise interview experiences
* Interview questions
* Candidate experiences
* Preparation resources

### 👨‍💼 Admin Dashboard

Admin can manage:

* Jobs
* Government exams
* Exam categories
* Exam articles
* Government notes
* Subjects
* Career roadmaps
* Technology resources
* Core subjects
* Interview experiences
* Direct hiring opportunities

### ☁️ Cloud Uploads

The platform supports cloud-based uploads using **Cloudinary**.

Supported files include:

* Images
* PDF study materials

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide React
* Next.js App Router

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST APIs
* Multer

## Cloud Services

* MongoDB Atlas
* Cloudinary

## Authentication

* JWT-based authentication
* Google Authentication/OAuth support

## Deployment

* Vercel — Frontend
* Render / similar Node hosting — Backend
* MongoDB Atlas — Database
* Cloudinary — File storage

---

# 📁 Project Structure

```text
NextHire/
│
├── frontend/
│   │
│   ├── app/
│   │   ├── admin/
│   │   ├── career-resources/
│   │   ├── jobs/
│   │   ├── login/
│   │   ├── register/
│   │   └── ...
│   │
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── types/
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/NextHire.git
```

Move into the project:

```bash
cd NextHire
```

---

# 🎨 Frontend Setup

Go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:3000
```

---

# ⚙️ Backend Setup

Open another terminal and go to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start backend:

```bash
npm run dev
```

or:

```bash
node server.js
```

Backend will run on:

```text
http://localhost:5000
```

---

# 🔐 Environment Variables

Never commit `.env` or `.env.local` to GitHub.

Example `.gitignore`:

```gitignore
node_modules/
.env
.env.local
.next/
dist/
build/
```

---

# 🗄️ Database

NextHire uses **MongoDB** with **Mongoose**.

Main database resources include:

* Users
* Jobs
* Government Exams
* Exam Categories
* Exam Articles
* Government Notes
* Note Subjects
* Career Roadmaps
* Roadmap Resources
* Interview Experiences
* Technology Resources
* Core Subjects

MongoDB Atlas can be used for production deployment.

---

# ☁️ Cloudinary

Cloudinary is used for storing uploaded media.

The application supports:

```text
Images
PDF Files
```

Example upload API:

```text
POST /api/upload/image
POST /api/upload/pdf
```

---

# 🔌 Important API Routes

## Authentication

```text
/api/auth
```

## Jobs

```text
/api/jobs
```

## Roadmaps

```text
/api/roadmap-categories
/api/roadmap-files
```

## Interview Experiences

```text
/api/interview-experiences
```

## Technology Resources

```text
/api/tech-stack-categories
/api/tech-stack-resources
```

## Core Subjects

```text
/api/core-subject-categories
/api/core-subject-resources
```

## Exam Resources

```text
/api/exam-blueprints
/api/government-exam-categories
/api/exam-categories
/api/exam-articles
```

## Government Notes

```text
/api/government-notes-categories
/api/government-notes
```

## Uploads

```text
/api/upload
```

---

# 👨‍💻 Admin Panel

The admin dashboard provides centralized management of career resources.

Example admin routes:

```text
/admin/career-resources
```

Government Notes:

```text
/admin/career-resources/government-exams/notes
```

Subject Notes:

```text
/admin/career-resources/government-exams/notes/categories/:id/subjects/:subjectId/notes
```

Create Note:

```text
/admin/career-resources/government-exams/notes/categories/:id/subjects/:subjectId/notes/new
```

---

# 🔄 Application Flow

```text
User
 │
 ├── Browse Jobs
 │      ├── Search
 │      ├── View Job
 │      └── Apply
 │
 ├── Career Resources
 │      ├── Roadmaps
 │      ├── Government Exams
 │      ├── Study Notes
 │      ├── Interview Experiences
 │      └── Core Subjects
 │
 └── Authentication
        ├── Login
        ├── Register
        └── Google Login
```

Admin:

```text
Admin
 │
 ├── Manage Jobs
 ├── Manage Government Exams
 ├── Manage Exam Articles
 ├── Manage Notes
 │      ├── Categories
 │      ├── Subjects
 │      └── PDFs
 │
 ├── Manage Roadmaps
 ├── Manage Interview Experiences
 ├── Manage Technology Resources
 └── Manage Core Subjects
```

---

# 🚀 Production Deployment

## Frontend

The Next.js frontend can be deployed using Vercel.

Set:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url
```

in the Vercel project environment variables.

## Backend

Deploy the Express backend on a Node-compatible hosting platform.

Set all required environment variables in the hosting provider's environment settings.

Make sure the backend allows requests from the deployed frontend domain.

---

# 🧪 Development

Run frontend:

```bash
cd frontend
npm run dev
```

Run backend:

```bash
cd backend
npm run dev
```

Build frontend:

```bash
npm run build
```

Start production frontend:

```bash
npm start
```

---

# 🔒 Security

For production:

* Keep environment variables private
* Never expose MongoDB credentials
* Never commit JWT secrets
* Configure CORS properly
* Validate uploaded files
* Restrict PDF/image file sizes
* Validate API requests
* Use secure authentication
* Use HTTPS in production

---

# 📌 Future Improvements

Planned improvements include:

* Advanced job filtering
* Personalized job recommendations
* Resume builder
* ATS resume checker
* Application tracking system
* More referral opportunities
* Company profiles
* Email notifications
* Job alerts
* Advanced admin analytics
* Bookmark synchronization
* More government-exam resources
* More structured learning roadmaps
* AI-powered career recommendations

---

# 🎯 Vision

The goal of **NextHire** is to create a single platform where students and job seekers can:

> **Discover opportunities → Prepare → Connect → Apply → Get Hired**

Instead of using multiple platforms for jobs, referrals, interview preparation, government exams, and career roadmaps, NextHire aims to bring these resources together in one organized ecosystem.

---

# 👨‍💻 Author

**Aman Kumar**

MCA — Computer Science

HBTU Kanpur

---

# ⭐ Support

If you find NextHire useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is currently developed as a personal/educational project.

License terms can be added when the project is officially released.
