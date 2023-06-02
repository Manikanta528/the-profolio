import {BsFillArrowUpRightSquareFill} from 'react-icons/bs'
import { storage } from '../../utils';

function ProjectCard(props) {
    // eslint-disable-next-line react/prop-types
    const { projectName } = props.data;

  return (
    <div className="group bg-cover dark:shadow-white/10 text-textPrimary dark:text-textPrimaryDark dark:border-textPrimaryDark text-base sm:text-lg w-full h-52 sm:w-64 sm:h-44 rounded-2xl  hover:shadow-2xl hover:bg-none cursor-pointer" >
        <img src={storage.getFilePreview(import.meta.env.VITE_USER_PROJECTS_BUCKET_ID,props.data.$id)} alt=""  className='w-full h-full rounded-lg  border-textPrimary border-2 '/>
        <div  className="relative bottom-14 flex flex-wrap items-center invisible justify-around group-hover:visible bg-backgroundDark dark:bg-background  m-2 rounded-md p-1 border-2">
        <h3  className="w-40 truncate font-semibol text-textPrimaryDark dark:text-textPrimary">{projectName}</h3>
        <BsFillArrowUpRightSquareFill className="bg-textPrimaryDark text-textPrimaryDark dark:bg-textPrimary dark:text-textPrimaryDark rounded group-hover:text-primary"/>
        </div>
        
    </div>
  )
}

export default ProjectCard