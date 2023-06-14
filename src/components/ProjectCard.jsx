/* eslint-disable react/prop-types */
import { storage } from '../../utils';

import { Link } from 'react-router-dom';

import {BsFillArrowUpRightSquareFill} from 'react-icons/bs'

import 'aos/dist/aos.css';


function ProjectCard(props) {
    // eslint-disable-next-line react/prop-types
    const { projectName } = props.data;

  return (
    <Link  to="/project-overview" state={{data : props.data , findFlag : props.findFlag, discoverFlag : props.discoverFlag}} className="group bg-cover dark:shadow-white/10 text-textPrimary dark:text-textPrimaryDark dark:border-textPrimaryDark text-base sm:text-lg  w-full h-64 sm:w-96  rounded-2xl  hover:shadow-2xl  cursor-pointer" data-aos="fade-up" >
        <img src={storage.getFilePreview(import.meta.env.VITE_USER_PROJECTS_BUCKET_ID,props.data.$id)} alt=""  className='w-full h-full rounded-lg  ' />
        <div className="relative bottom-14 flex  items-center  justify-around  rounded-b-md border-2 border-t-white/0 dark:border-t-black/0 border-textPrimary dark:border-textSecondaryDark bg-background dark:bg-backgroundDark mt-2 p-3 sm:p-2">
          <h3  className="w-40 truncate font-semibold text-textPrimary dark:text-textPrimaryDark">{projectName}</h3>
          <BsFillArrowUpRightSquareFill className="bg-textPrimaryDark text-textPrimary dark:bg-textPrimary dark:text-textPrimaryDark rounded group-hover:text-primary"/>
        </div>
    </Link>
  )
}

export default ProjectCard