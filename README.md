
# 📝 HD Notes App

A full-stack note-taking app built using **React + Vite + Tailwind CSS (Frontend)** and **Node.js + Express (Backend)** with:

- Email + OTP authentication  
- Google Sign-In  
- Protected Dashboard with note creation and deletion  
- Persistent login (`Keep me logged in`)
- Responsive design  

---

## 🔗 Live Demo

**Frontend**: [https://your-frontend-url.com](https://your-frontend-url.com)  
**Backend**: [https://your-backend-api.com](https://your-backend-api.com)

---

## 📦 Features

- 🔐 Email + OTP login
- 🔐 Google OAuth login
- 🔄 JWT-based authentication
- 💾 Notes CRUD (Create + Delete)
- 📱 Mobile responsive
- ✅ Keep Me Logged In option
- 🌐 Deployed via Vite / Render / Vercel / Netlify (configurable)

---

## 🖼️ Screenshots

![Sign In](./screenshots/signin.png)  
![Dashboard](./screenshots/dashboard.png)

---

## 🛠️ Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- Google OAuth (via button + backend)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB (or any DB)](https://www.mongodb.com/)
- JWT Auth

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hd-notes-app.git
cd hd-notes-app
```

---

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

> Update `.env` in `client/` with your API URL:

```
VITE_API_URL=https://your-backend-api.com
```

---

### 3. Backend Setup

```bash
cd server
npm install
npm run dev
```

> Update `.env` in `server/`:

```
PORT=5000
MONGO_URI=mongodb+srv://your_mongo_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 🔐 Authentication Flow

- **Sign Up**: Name + DOB + Email → Receive OTP → Verify
- **Sign In**: Email → Receive OTP → Verify
- **Google Sign In**: One-click login using Google
- **Keep Me Logged In**: Stores JWT in `localStorage`

---

## ⚙️ Deployment

### Frontend (Vite + React)

If using Netlify or Vercel:
- Add redirect support for SPA routes:
  - `public/_redirects` file:

    ```
    /* /index.html 200
    ```

If using GitHub Pages:
- Add `public/404.html` with redirect to `/index.html`

### Backend

- Deploy on Render, Railway, or any Node.js hosting platform.
- Ensure CORS and API routes are set up correctly.

---

## 📁 Project Structure

```
├── client/         # React frontend
│   ├── components/
│   ├── pages/
│   └── ...
├── server/         # Node.js backend
│   ├── routes/
│   ├── controllers/
│   └── ...
```

---

## ✅ Todo / Future Features

- [ ] Edit Notes
- [ ] Dark Mode
- [ ] Tagging & Filtering Notes
- [ ] Email provider integration for OTP

---

## 📄 License

MIT License © [Your Name]
