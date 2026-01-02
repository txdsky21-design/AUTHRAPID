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
// UI HELPERS
// ===============================
function showNotification(message, type = "info") {
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "error" ? "#EF4444" : type === "success" ? "#10B981" : "#2563EB"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 10000;
    font-weight: 500;
  `;

  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

// ===============================
// SMOOTH SCROLL
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href"))?.scrollIntoView({ behavior: "smooth" });
  });
});

// ===============================
// MOBILE MENU
// ===============================
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

mobileMenuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuToggle.classList.toggle("active");
});

// ===============================
// 🔐 REGISTER (Firebase)
// ===============================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("subm
