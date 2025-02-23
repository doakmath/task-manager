import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
      navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .then(() => console.log("Service Worker registered!"))
          .catch((err) => console.log("Service Worker registration failed:", err));
  });
}

