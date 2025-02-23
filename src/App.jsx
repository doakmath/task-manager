import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault(); // Prevent automatic prompt
      setInstallPrompt(event); // Store the install event
    });

    // Check if PWA is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
  }, []);

  const handleInstall = () => {
    if (installPrompt) {
      installPrompt.prompt(); // Show install prompt
      installPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User installed the PWA");
        } else {
          console.log("User dismissed the install prompt");
        }
        setInstallPrompt(null); // Reset state
      });
    }
  };

  return (
    <div className="container">
      <h1>Task Manager ✅</h1>
      <TaskForm onTaskAdded={() => window.location.reload()} />
      <TaskList />

      {/* Install PWA Button - Only shows if the app is not installed */}
      {!isInstalled && installPrompt && (
        <button className="install-btn" onClick={handleInstall}>
          📲 Install App
        </button>
      )}
    </div>
  );
}
