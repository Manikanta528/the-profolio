/* eslint-disable react/prop-types */
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import {SiNetlify} from 'react-icons/si'

import { useNavigate } from 'react-router-dom';

import 'aos/dist/aos.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

function LandingPage(props) {
  const { toggleTheme, theme } = props
  const navigate = useNavigate();

  // to redirect to login page
  const authRedirect = () => {
    navigate('/login')
  };

  return (
    <div className="font-inter h-fit bg-background dark:bg-backgroundDark  max-h-fit min-h-screen">
      <Header toggleTheme={toggleTheme} theme={theme} flagSignIn={true} />
      <div className='bg-hero bg-auto bg-no-repeat bg-center '>
      <main className=' pt-32 lg:pt-44 px-6 md:px-16 flex flex-col justify-center items-center pb-0 sm:pb-24' >
        <h1 className='text-3xl  select-none text-textPrimary sm:text-4xl w-full xl:w-4/5 lg:text-6xl font-bold text-center dark:text-textPrimaryDark ' data-aos="zoom-in" >Craft a Captivating Portfolio to Showcase <span className='text-primary'>Your Skills.</span></h1>
        <p className='text-xs pt-10 text-textSecondary sm:text-base w-full xl:w-3/5  text-center dark:text-textSecondaryDark' data-aos="zoom-in" >Connect. Collaborate. Create: Find User Projects to Elevate Your Portfolio&apos;s Impact. Engage with a vibrant community of creators, discover exciting projects that align with your interests, and amplify the impact of your portfolio by joining forces with like-minded individuals.</p>
        <div className='flex  flex-col gap-8 py-12 sm:flex-row sm:gap-12'>
          <button className='font-bold bg-primary rounded px-6 py-3  text-textPrimaryDark dark:text-textPrimary flex items-center gap-2' onClick={authRedirect} data-aos="fade-right" data-aos-anchor="#example-anchor" data-aos-offset="100" data-aos-duration="5000"> Sign in<FaArrowRight className='inline' /></button>
          <a href="https://github.com/Manikanta528/the-profolio" target='_blank' rel='noreferrer'><button className='font-bold bg-slate-400/30 rounded px-6 py-3 text-textPrimary dark:text-textPrimaryDark flex items-center gap-2' data-aos="fade-left" data-aos-anchor="#example-anchor" data-aos-offset="100" data-aos-duration="5000"><FaGithub className='inline' /> <div>GitHub</div></button></a>
        </div>
        <div className="relative hidden  top-24 animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-primary/5 dark:ring-primary/20 shadow-lg rounded-full sm:flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </main>
      <Footer />
      </div>
      <div className='min-h-screen max-h-fit w-full px-6 md:px-16'>
        <h1 className='text-xl  select-none py-12 text-textPrimary sm:text-3xl font-bold 2xl:text-start text-center dark:text-textPrimaryDark '>How it works?</h1>
        <div className='flex flex-wrap gap-4 justify-center 2xl:justify-between pb-24'>
          <div className='pb-12  w-auto sm:w-[500px] ' data-aos="fade-up">
            <h3 className='text-textPrimary dark:text-textPrimaryDark font-semibold'>1. Create an Account</h3>
            <p className='text-textSecondary dark:text-textSecondaryDark pt-8 '>Start your developer journey with us and Sign in to discover a world of inspiration and connect with a network of talented individuals in your field.</p>
          </div>
          <div data-aos="flip-right">
            <img src="./public/hiw-1.svg" alt="hiw1" className='shadow-xl' />
          </div>
        </div>
        <div className='flex flex-row-reverse flex-wrap gap-4 justify-center 2xl:justify-between pb-24'>
          <div className='pb-12 w-auto sm:w-[500px]' data-aos="fade-up">
            <h3 className='text-textPrimary dark:text-textPrimaryDark font-semibold'>2. Profile </h3>
            <p className='text-textSecondary dark:text-textSecondaryDark pt-8 '>Build your online presence with a personalized profile. Fill in your name, bio, skills, and socials to let others discover your amazing talents.</p>
          </div>
          <div data-aos="flip-left">
            <img src="./public/hiw-2.svg" alt="hiw1" className='shadow-xl' />
          </div>
        </div>
        <div className='flex flex-wrap gap-4 justify-center 2xl:justify-between pb-24'>
          <div className='pb-12  w-auto sm:w-[500px] ' data-aos="fade-up">
            <h3 className='text-textPrimary dark:text-textPrimaryDark font-semibold'>3. Add Your Work </h3>
            <p className='text-textSecondary dark:text-textSecondaryDark pt-8 '>Craft a comprehensive profile with a project showcase. Add project details, descriptions, skills utilized, and links to live previews and GitHub repositories to captivate your audience.</p>
          </div>
          <div data-aos="flip-right">
            <img src="./public/hiw-3.svg" alt="hiw1" className='shadow-xl'/>
          </div>
        </div>
        <div className='flex flex-row-reverse flex-wrap gap-4 justify-center 2xl:justify-between pb-24'>
          <div className='pb-12 w-auto sm:w-[500px]' data-aos="fade-up">
            <h3 className='text-textPrimary dark:text-textPrimaryDark font-semibold'>4. Find People </h3>
            <p className='text-textSecondary dark:text-textSecondaryDark pt-8 '>Connect with people who matter. Search for users by name and discover individuals with shared interests, skills, and expertise.<a href={import.meta.env.VITE_URL+"/find"} className='text-primary underline cursor-pointer'> Find Now ↗</a></p>
          </div>
          <div data-aos="flip-left">
            <img src="./public/hiw-4.svg" alt="hiw1" className='shadow-xl' />
          </div>
        </div>
        <div className='flex flex-wrap gap-4 justify-center 2xl:justify-between pb-24'>
          <div className='pb-12  w-auto sm:w-[500px] ' data-aos="fade-up">
            <h3 className='text-textPrimary dark:text-textPrimaryDark font-semibold'>3. Discover Projects </h3>
            <p className='text-textSecondary dark:text-textSecondaryDark pt-8 '>Find projects that match your interests. Search by project names and technologies to uncover captivating works that align with your passions and ignite your curiosity. <a href={import.meta.env.VITE_URL+"/discover"} className='text-primary underline cursor-pointer'>Discover Now ↗</a></p>
          </div>
          <div data-aos="flip-right">
            <img src="./public/hiw-5.svg" alt="hiw1" className='shadow-xl'/>
          </div>
        </div>
        <footer className='text-textSecondary dark:text-textSecondaryDark pb-12 flex flex-col justify-center items-center gap-4'>
          <div>
            Made my <a href="http://www.twitter.com/manikanta528" target="_blank" rel="noopener noreferrer" className='text-primary underline cursor-pointer'>Manikanta</a>
          </div>

          <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer" className='text-primary underline cursor-pointer'><button className='bg-backgroundDark dark:bg-background text-textPrimaryDark dark:text-textPrimary px-4 py-2 rounded'> Deployed By <SiNetlify className='inline text-primary'/> Netlify </button></a>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
