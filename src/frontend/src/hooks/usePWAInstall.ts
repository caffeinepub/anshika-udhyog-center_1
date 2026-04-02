import { useEffect, useState } from "react";

export function usePWAInstall() {
  const [prompt, setPrompt] = useState<Event | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!prompt) return;
    const p = prompt as BeforeInstallPromptEvent;
    p.prompt();
    await p.userChoice;
    setPrompt(null);
  };

  return { canInstall: !!prompt && !isInstalled, install, isInstalled };
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: string }>;
}
