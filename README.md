# AXIOM CNC — VMC Machine Company Website

A full-stack, production-ready website for a Vertical Machining Center company.
Dark industrial aesthetic · React + Tailwind + Framer Motion · Node.js + Express + MongoDB

---

## 📁 Project Structure

```
vmc-website/
├── frontend/                   # React application (→ Vercel)
│   ├── public/
│   │   └── index.html          # SEO meta tags, Google Fonts
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js       # Sticky nav with mobile menu
│   │   │   ├── Hero.js         # Hero + SVG machine illustration
│   │   │   ├── About.js        # Company story + timeline
│   │   │   ├── Machines.js     # 4 VMC model cards with specs
│   │   │   ├── Features.js     # 8 feature cards with metrics
│   │   │   ├── Testimonials.js # Auto-rotating testimonials
│   │   │   ├── Contact.js      # Enquiry form with validation
│   │   │   ├── Footer.js       # Full footer with links
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── Home.js         # Main landing page
│   │   │   ├── AdminLogin.js   # JWT login page
│   │   │   └── AdminDashboard.js # Full admin panel
│   │   ├── App.js              # Router config
│   │   ├── index.js
│   │   └── index.css           # Tailwind + custom styles
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vercel.json             # Vercel SPA rewrite rules
│   └── .env.example
│
├── backend/                    # Express API (→ Render)
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── seedAdmin.js        # First-run admin seed
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware
│   ├── models/
│   │   ├── Enquiry.js          # Enquiry schema
│   │   └── Admin.js            # Admin schema
│   ├── routes/
│   │   ├── enquiry.js          # POST/GET/PATCH/DELETE enquiry
│   │   └── auth.js             # POST /login
│   ├── server.js               # Express entry point
│   ├── render.yaml             # Render deployment config
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (free tier works)
- Git

---

### 1. Clone & Install

```bash
git clone https://github.com/your-org/vmc-website.git
cd vmc-website

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

---

### 2. Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/axiomcnc
JWT_SECRET=some_long_random_secret_string_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=axiom@admin2024
CLIENT_URL=http://localhost:3000
```

**Getting your MongoDB Atlas URI:**
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster → Connect → Drivers
3. Copy the connection string and replace `<password>`
4. Whitelist your IP (or use `0.0.0.0/0` for development)

---

### 3. Configure Frontend Environment

```bash
cd frontend
cp .env.example .env
```

Edit `.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

---

### 4. Run the App

Open **two terminal windows**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Server starts on http://localhost:5000
# Admin auto-seeded on first run
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
# App opens on http://localhost:3000
```

---

### 5. Test the Setup

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Main website |
| `http://localhost:3000/admin` | Admin login |
| `http://localhost:5000/health` | API health check |
| `http://localhost:5000/api/enquiry` | Enquiries (needs auth) |

**Default Admin Credentials:**
```
Username: admin
Password: axiom@admin2024
```
> Change these in your `.env` before deploying!

---

## 🌐 Deployment

### Backend → Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo → select the `backend/` folder
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Add environment variables in Render dashboard:
   ```
   NODE_ENV=production
   MONGO_URI=<your Atlas URI>
   JWT_SECRET=<strong random string>
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=<strong password>
   CLIENT_URL=https://your-app.vercel.app
   ```
6. Deploy → copy your Render URL (e.g. `https://axiomcnc-api.onrender.com`)

---

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo → set **Root Directory** to `frontend`
3. Add environment variable:
   ```
   REACT_APP_API_URL=https://axiomcnc-api.onrender.com
   ```
4. Deploy → Vercel handles the build automatically

> The `vercel.json` in the frontend folder handles SPA routing (React Router).

---

### Database → MongoDB Atlas

1. Create a free M0 cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a database user with read/write access
3. Whitelist Render's IPs or use `0.0.0.0/0`
4. Use the connection string in your Render env vars

---

## 🔌 API Reference

### Public Endpoints

#### `POST /api/enquiry`
Submit a new enquiry.

**Request Body:**
```json
{
  "name": "Rajesh Kumar",
  "phone": "+91 98765 43210",
  "email": "rajesh@company.com",
  "company": "Precision Parts Pvt. Ltd.",
  "machineInterest": "VMC-1050",
  "message": "Looking for 3 machines for aerospace components..."
}
```

**Response:** `201 Created`
```json
{
  "message": "Enquiry submitted successfully",
  "enquiry": { "_id": "...", "name": "...", ... }
}
```

---

#### `POST /api/auth/login`
Admin login.

**Request Body:**
```json
{ "username": "admin", "password": "axiom@admin2024" }
```

**Response:** `200 OK`
```json
{ "token": "eyJhbGci...", "admin": { "id": "...", "username": "admin" } }
```

---

### Protected Endpoints (require `Authorization: Bearer <token>`)

#### `GET /api/enquiry`
Fetch all enquiries (newest first).

#### `PATCH /api/enquiry/:id`
Update contacted status.
```json
{ "contacted": true }
```

#### `DELETE /api/enquiry/:id`
Delete an enquiry.

---

## ✨ Features Checklist

### Frontend
- [x] React 18 + React Router v6
- [x] Tailwind CSS with custom dark industrial theme
- [x] Framer Motion animations (page load, scroll reveal, hover)
- [x] Custom SVG VMC machine illustration (Hero)
- [x] 6 sections: Hero, About, Machines, Features, Testimonials, Contact
- [x] Machine model switcher with live spec tables
- [x] Auto-rotating testimonials carousel
- [x] Enquiry form with react-hook-form validation
- [x] Mobile responsive with animated mobile menu
- [x] SEO meta tags (OG, Twitter, description, keywords)
- [x] Google Fonts: Barlow Condensed + DM Sans + JetBrains Mono

### Backend
- [x] Express.js REST API
- [x] MongoDB + Mongoose with schema validation
- [x] JWT authentication (8h expiry)
- [x] bcryptjs password hashing
- [x] express-validator input validation
- [x] Rate limiting (100 req/15min global, 10 enquiries/hour)
- [x] Helmet security headers
- [x] CORS configured
- [x] Auto-seed admin on first run
- [x] Health check endpoint

### Admin Panel
- [x] JWT login with session persistence
- [x] Protected routes (redirect to login if no token)
- [x] View all enquiries in sortable table
- [x] Search by name/email/company
- [x] Filter by status (all/pending/contacted)
- [x] Mark enquiry as contacted / revert to pending
- [x] Delete enquiry with confirmation
- [x] Enquiry detail side panel
- [x] Live stats dashboard (total, pending, contacted, today)

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary font | Barlow Condensed (headings) |
| Body font | DM Sans |
| Mono font | JetBrains Mono |
| Accent color | Amber `#f59e0b` |
| Base bg | Carbon `#0a0a0a` |
| Surface | Steel `#102a43` |
| Grid overlay | 60×60px subtle lines |
| Border radius | 0px (industrial/sharp) |

---

## 🔒 Security Notes

- Never commit `.env` files (`.gitignore` covers this)
- Use a strong `JWT_SECRET` (32+ random chars) in production
- Change default admin password before deploying
- MongoDB Atlas: restrict IP allowlist to Render's static IPs in production
- Rate limiting prevents brute-force and spam enquiry submissions

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 10 |
| Forms | react-hook-form |
| HTTP | Axios |
| Notifications | react-hot-toast |
| Backend | Node.js, Express 4 |
| Database | MongoDB, Mongoose 7 |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Validation | express-validator |
| Security | Helmet, express-rate-limit, CORS |
| Frontend Host | Vercel |
| Backend Host | Render |
| Database Host | MongoDB Atlas |

---

## 📄 License

MIT © 2024 AXIOM CNC Systems Pvt. Ltd.
