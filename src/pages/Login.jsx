import { FcGoogle  } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'

import { account } from '../../utils';

import Header from '../components/Header';

function Login(props) {
    // eslint-disable-next-line react/prop-types
    const {toggleTheme,theme} = props
    const loginFlag = true;
    const handleGoogleAuth = async () => {
        try {
            await account.createOAuth2Session('google', 'http://localhost:5173/profile', 'http://localhost:5173/');
        } catch (error) {
            console.log(error);
        }
    }
    const handleGithubAuth = async () =>  {
        try {
            await account.createOAuth2Session('github', 'http://localhost:5173/profile', 'http://localhost:5173/');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='bg-hero h-screen bg-auto bg-no-repeat bg-center font-inter bg-background dark:bg-backgroundDark '>
    <Header toggleTheme={toggleTheme} theme={theme} flag={loginFlag} />
    <div className="h-[80%] flex flex-col items-center justify-center px-6 md:px-16 ">
        <div className="bg-background dark:bg-textPrimary w-[300px] z-10 md:w-[500px]  rounded-3xl backdrop-blur flex flex-col items-center px-8 py-12 md:px-10 md:py-14 shadow">
            <h1 className="text-textPrimary dark:text-textPrimaryDark text-base md:text-2xl font-bold  ">Welcome to <span className="text-primary">The Profolio! 🚀</span> </h1>
            <p className="text-textSecondary dark:text-textSecondaryDark text-sm md:text-base text-center mt-4">Get Sign in to your account</p>
            <button onClick={handleGoogleAuth} className='flex gap-2 items-center border-2 px-4 py-2 mt-8 rounded text-textPrimary border-textPrimary dark:border-textPrimaryDark dark:text-textPrimaryDark'> <FcGoogle className='inline'/> <span className='hidden md:inline '>Sign in with</span> <span className=''> Google</span></button>
            <button onClick={handleGithubAuth} className='flex gap-2 items-center border-2 px-4 py-2 mt-8 rounded text-textPrimary border-textPrimary dark:border-textPrimaryDark dark:text-textPrimaryDark'> <AiFillGithub className='inline'/> <span className='hidden md:inline '>Sign in with</span> <span className=''> Github</span></button>
        </div>
    </div>
    </div>
  )
}

export default Login