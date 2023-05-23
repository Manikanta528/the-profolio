/* eslint-disable react/prop-types */
import {FaSun, FaGithub, FaMoon, FaArrowRight} from 'react-icons/fa';
function LandingPage(props) {
    const {toggleTheme,theme} = props
  return (
    <div className="font-inter h-fit bg-background dark:bg-backgroundDark bg-hero bg-auto bg-no-repeat bg-center ">
      <header className="h-20 sticky top-0 select-none border-0 flex items-center justify-between text-textPrimary dark:text-textPrimaryDark backdrop-blur ">
        <h2 className="text-lg font-bold pl-6 md:pl-16">The Profolio</h2>
        <nav className='flex items-center pr-6 md:pr-16 gap-4'>
            {theme&&(<FaSun size={24} onClick={toggleTheme}/>)||(<FaMoon size={24} onClick={toggleTheme}/>)}
            <FaGithub size={24}/>
            <button className='text-sm'>Login</button>
            <button className='border-textPrimary border-2 rounded px-2 text-sm py-1 dark:border-textPrimaryDark'>Get Started</button>
        </nav>
      </header>
      <main className='h-screen px-6 md:px-16 flex flex-col items-center'>
        <h1 className='text-2xl pt-24 select-none text-textPrimary sm:text-4xl w-full xl:w-4/5 lg:text-6xl font-bold text-center dark:text-textPrimaryDark '>Craft a Captivating Portfolio to Showcase <span className='text-primary'>Your Skills.</span></h1>
        <p className='text-xs pt-10 text-textSecondary sm:text-base w-full xl:w-3/5  text-center dark:text-textSecondaryDark'>Connect. Collaborate. Create: Find User Projects to Elevate Your Portfolio&apos;s Impact. Engage with a vibrant community of creators, discover exciting projects that align with your interests, and amplify the impact of your portfolio by joining forces with like-minded individuals.</p>
        <div className='flex  flex-col gap-8 py-12 sm:flex-row sm:gap-12'>
            <button className='font-bold bg-primary rounded px-6 py-3 text-textPrimaryDark dark:text-textPrimary flex items-center gap-2'> Get Started<FaArrowRight className='inline'/></button>
            <button className='font-bold bg-slate-400/30 rounded px-6 py-3 text-textPrimary dark:text-textPrimaryDark flex items-center gap-2'><FaGithub className='inline'/> <div>GitHub</div></button>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
