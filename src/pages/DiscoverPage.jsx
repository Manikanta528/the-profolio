
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
            usersProjects.length > 0 ? usersProjects.map((project, i) => (<ProjectCard key={i} data={project} discoverFlag={true} />)) :
              <h1 className="text-center">No Projects Found </h1>
          }
        </div>
      </div>
    </div>
  )
}

export default DiscoverPage