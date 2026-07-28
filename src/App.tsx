import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import { LanguageProvider } from "./i18n/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
