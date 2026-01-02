// ===============================
// 🔥 FIREBASE IMPORTS (CDN)
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ===============================
// 🔥 FIREBASE CONFIG (REPLACE)
// ===============================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===============================
// NOTIFICATION
// ===============================
function showNotification(message, type = "info") {
  const old = document.querySelector(".notification");
  if (old) old.remove();

  const n = document.createElement("div");
  n.className = "notification";
  n.textContent = message;
  n.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "error" ? "#EF4444" : type === "success" ? "#10B981" : "#2563EB"};
    color: #fff;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 9999;
  `;
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 3000);
}

// ===============================
// LOGIN
// ===============================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch {
      showNotification("Invalid email or password", "error");
    }
  });
}

// ===============================
// REGISTER
// ===============================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
      showNotification("Passwords do not match", "error");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (err) {
      showNotification(err.message, "error");
    }
  });
}

// ===============================
// AUTH PROTECTION (DASHBOARD)
// ===============================
onAuthStateChanged(auth, user => {
  if (window.location.pathname.includes("dashboard.html")) {
