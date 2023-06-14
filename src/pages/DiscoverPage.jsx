
import { useState, useEffect } from 'react'

import { databases } from '../../utils';

import { BiSearchAlt } from 'react-icons/bi'

import Header from "../components/Header"
import ProjectCard from "../components/ProjectCard";

function DiscoverPage(props) {
  // eslint-disable-next-line react/prop-types
  const { toggleTheme, theme } = props

  // to store the search input
  const [search, setSearch] = useState('');
  // to store the search by
  const [searchBy, setSearchBy] = useState('project name');
  // to store the users
  const [usersProjects, setUsersProjects] = useState([]);
  // to store the loader
  const [loader, setLoader] = useState(false);


  // to search the users
  const handleSearch = (e) => {
    e.preventDefault();
    const listDocuments = databases.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_USER_PROJECTS_COLLECTION_ID);

    listDocuments.then(
      function (response) {
        let filteredProjects;
        if (searchBy == 'project name')
          filteredProjects = response.documents.filter((project) => project.projectName.toLowerCase().includes(search.toLowerCase()));
        else
          filteredProjects = response.documents.filter((project) => {
            const technologies = project.usedTechnology;
            for (let i = 0; i < technologies.length; i++) {
              if (technologies[i].toLowerCase().includes(search.toLowerCase()))
                return true;
            }
            return false;
          });

        if (filteredProjects.length > 0)
          setUsersProjects(filteredProjects);
        else
          setUsersProjects([]);
      },
      function (error) {
        console.log(error);
      }
    );

  }

  // to get the all users on page load
  useEffect(() => {
    const listDocuments = databases.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_USER_PROJECTS_COLLECTION_ID);

    listDocuments.then(
      function (response) {
        const randomProjects = response.documents.sort(() => Math.random() - Math.random()).slice(0, 6);
        setUsersProjects(randomProjects);
      },
      function (error) {
        console.log(error);
      }
    );
    setTimeout(() => {
      setLoader(true);
    }, 3000);
  }, []);

  return (
    <div className=" bg-background dark:bg-backgroundDark text-textPrimary dark:text-textPrimaryDark">
      <Header toggleTheme={toggleTheme} theme={theme} flagSignIn={false} user={true} currentPage={"Discover"} />
      <div className=" px-6 md:px-16 min-h-screen max-h-fit" >
        <div className='flex justify-center h-24 bg-gif rounded bg-auto mt-12'>
          <form className='relative  flex items-center bg-background dark:bg-backgroundDark p-4  rounded-md shadow-2xl dark:shadow-background/10 top-16 h-fit' onSubmit={handleSearch}>
            <BiSearchAlt className=" mr-4 hidden sm:inline-block" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className='bg-background dark:bg-backgroundDark focus:outline-0 w-[200px] md:w-[300px] lg:w-[400px] ' />
            <input type="submit" value="Search" className=' px-2 py-1 text-sm  md:text-base border-2 border-slate-100 dark:border-slate-500 hover:border-primary/50 hover:bg-primary/50 active:bg-primary rounded-md' />
          </form>

        </div>
        <div className="flex items-center gap-4 justify-center mt-12 ">
          <input type="radio" value="project name" name="search" defaultChecked id="check1" onClick={(e) => setSearchBy(e.target.value)} className="accent-primary " /><label htmlFor="check1" className="cursor-pointer" > Project name</label>
          <input type="radio" value="technology" name="search" id="check2" onClick={(e) => setSearchBy(e.target.value)} className="accent-primary" /> <label htmlFor="check2" className="cursor-pointer" > Technology</label>
        </div>
        <div className="flex flex-wrap w-full h-fit mt-24 pb-12 gap-8 justify-center md:justify-start ">
          {
            usersProjects.length > 0 ? usersProjects.map((project, i) => (<ProjectCard key={i} data={project} discoverFlag={true} />)) :(
              loader ? <h1 className="text-center">No Projects Found </h1>: <>
                <div className="flex items-center justify-center gap-4 mt-20 w-full">
                  <svg aria-hidden="true" className=" inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg> <span>Loading Users data...</span>
                </div>
              </>)
          }
        </div>
      </div>
    </div>
  )
}

export default DiscoverPage