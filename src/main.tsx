
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

if (import.meta.env.DEV) {
  const logOverflowingElements = () => {
    const docWidth = document.documentElement.clientWidth;
    const elements = Array.from(document.body.querySelectorAll("*"));

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 1) {
        console.warn("Overflowing element detected:", {
          element: el,
          className: el.className,
          rect,
        });
      }
    });
  };

  window.addEventListener("resize", logOverflowingElements);
  window.setTimeout(() => requestAnimationFrame(logOverflowingElements), 1000);
}
  
