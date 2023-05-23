import { useState } from 'react';
import LandingPage from "./pages/LandingPage";

function App() {
  const [theme, setTheme] = useState(true);
  const handleThemeChange = () => {
    setTheme(!theme);
  }
  return (
    <div className={theme&&"dark"||""}>
      <LandingPage theme={theme} toggleTheme={handleThemeChange}/>
    </div>
  )
}

export default App
