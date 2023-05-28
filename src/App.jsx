import { useState } from 'react';

import LandingPage from "./pages/LandingPage";
import Login from './pages/Login';
import Profile from './pages/Profile';

import { BrowserRouter, Route, Routes} from 'react-router-dom'
import DiscoverPage from './pages/DiscoverPage';
import FindPage from './pages/FindPage';
import YourWorkPage from './pages/YourWorkPage';



function App() {
  const [theme, setTheme] = useState(true);
  
  const handleThemeChange = () => {
    if(theme)
      window.document.documentElement.classList.add('dark');
    else
      window.document.documentElement.classList.remove('dark');
    setTheme(!theme);
  }
  return (
    <BrowserRouter >
      <Routes >
        <Route path='/'  element={<LandingPage theme={theme} toggleTheme={handleThemeChange} />}/>
        <Route path='/login'  element={<Login theme={theme} toggleTheme={handleThemeChange}  />}/>
        <Route path='/profile' element={<Profile  theme={theme} toggleTheme={handleThemeChange} />}/>
        <Route path='/Discover' element={<DiscoverPage  theme={theme} toggleTheme={handleThemeChange} />}/>
        <Route path='/find' element={<FindPage  theme={theme} toggleTheme={handleThemeChange} />}/>
        <Route path='/your-work' element={<YourWorkPage  theme={theme} toggleTheme={handleThemeChange} />}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
