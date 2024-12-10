import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LangContextProvider } from "./lib/LangContext.tsx";

createRoot(document.getElementById("root")!).render(
  <LangContextProvider>
    <App />
  </LangContextProvider>
);
