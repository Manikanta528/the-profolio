import { useState, useEffect } from "react";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import DiscoverPage from "./pages/DiscoverPage";
import FindPage from "./pages/FindPage";
import YourWorkPage from "./pages/YourWorkPage";
import ProjectOverview from "./components/ProjectOverview";
import UsersProfile from "./components/UsersProfile";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aos from "aos";

function App() {
  const [theme, setTheme] = useState(false);

  const handleThemeChange = () => {
    if (theme) window.document.documentElement.classList.add("dark");
    else window.document.documentElement.classList.remove("dark");
    setTheme(!theme);
  };
  useEffect(() => {
    Aos.init({ duration: 1000 });
    window.document.documentElement.classList.add("dark");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage theme={theme} toggleTheme={handleThemeChange} />
          }
        />
        <Route
          path="/login"
          element={<Login theme={theme} toggleTheme={handleThemeChange} />}
        />
        <Route
          path="/profile"
          element={
            <ProfilePage theme={theme} toggleTheme={handleThemeChange} />
          }
        />
        <Route
          path="/Discover"
          element={
            <DiscoverPage theme={theme} toggleTheme={handleThemeChange} />
          }
        />
        <Route
          path="/find"
          element={<FindPage theme={theme} toggleTheme={handleThemeChange} />}
        />
        <Route
          path="/your-work"
          element={
            <YourWorkPage theme={theme} toggleTheme={handleThemeChange} />
          }
        />
        <Route
          path="/project-overview"
          element={
            <ProjectOverview theme={theme} toggleTheme={handleThemeChange} />
          }
        />
        <Route
          path="/user"
          element={
            <UsersProfile theme={theme} toggleTheme={handleThemeChange} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
