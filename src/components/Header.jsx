import { useNavigate } from "react-router-dom";

import { FaGithub, FaMoon, FaSun } from "react-icons/fa";

const Header = (props) => {
    // eslint-disable-next-line react/prop-types
    const {toggleTheme,theme, flag} = props
    const navigate = useNavigate();
    const authRedirect = () => {
        navigate('/login')
    };
  return (
    <header className="h-20 sticky top-0 select-none border-0 flex items-center justify-between text-textPrimary dark:text-textPrimaryDark backdrop-blur ">
    <h2 className="text-lg font-bold pl-6 md:pl-16">The Profolio</h2>
    <nav className='flex items-center pr-6 md:pr-16 gap-4'>
        {theme&&(<div className='p-2 rounded hover:bg-slate-500/20' onClick={toggleTheme}><FaSun size={18} /></div>)||(<div className='p-2 rounded hover:bg-slate-500/20' onClick={toggleTheme}><FaMoon size={16}/></div>)}
        <a className='p-2 rounded hover:bg-slate-500/20 ' href='https://github.com/Manikanta528/the-profolio' target='_blank' rel="noreferrer"><FaGithub size={18}/></a>
        {!flag && <button className='text-sm' onClick={authRedirect} > Sign in</button>}
        {/* <button className='border-textPrimary border-2 rounded px-2 text-sm py-1 dark:border-textPrimaryDark hover:bg-slate-500/20'>Get Started</button> */}
    </nav>
  </header>
  )
}

export default Header