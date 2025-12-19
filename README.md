🏨 Hotello — Full-Stack Hotel Booking Application

Hotello is a modern, full-stack hotel booking platform that allows users to explore, book, and manage hotel stays seamlessly.
Built with React (Vite), Express, and MongoDB, Hotello demonstrates a scalable SaaS-style architecture with secure authentication, payment integration, and responsive UI — perfect for showcasing modern web development best practices.

🚀 Overview

Hotello enables users to:

🔍 Search and browse hotels by city, date, and price range

🏨 View hotel details (photos, amenities, reviews, room types)

📅 Make secure bookings with Stripe payments

👤 Manage bookings and profiles

🧾 Hotel admins can add and manage listings, rooms, and pricing

This project highlights modular design, clean TypeScript code, and reusable UI patterns for real-world SaaS and e-commerce-style applications.

🧱 Tech Stack
Layer	Technologies
Frontend	React 19, Vite, Tailwind CSS, React Query, React Router, React Hook Form
Backend	Express 5, MongoDB + Mongoose, JWT Authentication, Cloudinary, Stripe
Testing	Playwright
Language	TypeScript (Full-stack)
🗂️ Monorepo Structure
.
├── frontend/        # Vite + React client app
│   ├── src/
│   ├── vite.config.ts
│   └── package.json
│
├── backend/         # Express + MongoDB API
│   ├── src/
│   ├── .env
│   └── package.json
│
└── e2e-tests/       # Playwright E2E test suite
    ├── tests/
    └── package.json

⚙️ Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/hotello.git
cd hotello

2️⃣ Install Dependencies
cd frontend && npm install
cd ../backend && npm install
cd ../e2e-tests && npm install

3️⃣ Configure Environment Variables

Create a .env file in the backend/ folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key

🧠 Running the App
🖥️ Backend
cd backend
npm run dev


Runs the Express API at http://localhost:5000

💻 Frontend
cd frontend
npm run dev


Runs the Vite dev server at http://localhost:5173

🧪 E2E Tests
cd e2e-tests
npx playwright test


To view reports:

npx playwright show-report

🧩 Key Features
🔒 Authentication

Secure JWT-based login and registration

Role-based access (User / Admin)

💳 Payment Integration

Stripe-powered checkout for bookings

Payment confirmation and error handling flows

🏨 Hotel & Room Management

Create, edit, and delete hotels and rooms (Admin)

Upload hotel images via Cloudinary

Real-time availability tracking with MongoDB

🧭 Booking Experience

Search by date, location, and filters

Dynamic pricing and total calculation

Booking confirmation and cancellation management

🧰 Developer-Friendly

Modular TypeScript codebase

ESLint & TypeScript configuration

API-first architecture (REST endpoints)

Full Playwright test suite for UI and booking flow

🧩 Example API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Authenticate user
GET	/api/hotels	Fetch all hotels
GET	/api/hotels/:id	Get hotel details
POST	/api/bookings	Create new booking
GET	/api/bookings/:userId	Get user bookings
🧱 Deployment
Layer	Platform
Frontend Render

Backend	Render

Database	MongoDB Atlas


📜 License

MIT © Chimezie Nwagbo

🌟 If you like this project...

Give it a ⭐ on GitHub to show support!
