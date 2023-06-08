/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import { databases, storage } from '../../utils';

import { useLocation, useNavigate } from 'react-router-dom';

import { BiArrowBack, BiLinkAlt, BiFolder } from 'react-icons/bi';
import { BsTwitter, BsGithub } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';


function ProjectOverview() {
  const location = useLocation();
  const navigate = useNavigate();

  // to check if the user is coming from projectCard with data or not
  useEffect(() => {
    if (location.state == null) {
      navigate("/your-work");
    }
  }, []);

  // to get the data from projectCard
  const data = location.state?.data;

  // to go back to the previous page
  const handleBack = () => {
    if (location.state?.findFlag)
      navigate("/Find");
    else if (location.state?.discoverFlag)
      navigate("/Discover");
    else
      navigate("/your-work");
  }
  // to delete the  project
  const handleDeleteProject = () => {
    databases.deleteDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_USER_PROJECTS_COLLECTION_ID, data.$id);
    storage.deleteFile(import.meta.env.VITE_USER_PROJECTS_BUCKET_ID, data.$id);
    navigate("/your-work");
  }

  // to get the user details
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    const userData = databases.getDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_USER_DETAILS_COLLECTION_ID, data.userId);

    userData.then(
      function (response) {
        setUserDetails(response);
        console.log(userDetails);
      },
      function (error) {
        console.log(error);
      }
    )
  }, []);

  return (
    <div className='bg-background dark:bg-backgroundDark text-textPrimary dark:text-textPrimaryDark px-6 md:px-16 max-h-fit min-h-screen'>
      <button onClick={handleBack} className='py-12  flex flex-wrap items-center gap-4 hover:text-textSecondary font-medium'>
        <BiArrowBack size={18} /> <span>Back {location.state?.findFlag || location.state?.discoverFlag ? location.state?.findFlag && 'to find' || location.state?.discoverFlag && 'to discover' : 'to your work'}</span>
      </button>
      <div className='flex justify-between flex-wrap-reverse'>
        <div className='w-96'>
          <h1 className='text-xl font-extrabold  lg:pt-0 pt-12 mb-8'>{data.projectName}</h1>
          <h3 className=' font-bold  mb-4'>🕸️ STAY IN TOUCH</h3>
          <div className='flex flex-wrap gap-4 mb-8'>
            <a href={data.livePreview} target="_black">
              <button
                className="text-textPrimary dark:text-textPrimaryDark flex items-center gap-2  border-2 px-4 py-2  rounded hover:bg-primary/50 hover:border-primary/50 text-xs  hover:shadow-lg"
              >
                <BiLinkAlt size={18} /> <span>Visit Website</span>
              </button>
            </a>
            <a href={data.repositoryLink} target="_black">
              <button
                className="text-textPrimary dark:text-textPrimaryDark flex items-center gap-2  border-2 px-4 py-2  rounded hover:bg-primary/50 hover:border-primary/50 text-xs  hover:shadow-lg"
              >
                <BiFolder size={18} /> <span>Source Repository</span>
              </button>

            </a>
            {location.state?.findFlag || location.state?.discoverFlag ? <></> : <button
              className="  flex items-center gap-2  border-2 px-4 py-2  rounded bg-red-500/70 border-red-500/70 text-textPrimaryDark dark:text-textPrimaryDark hover:text-textPrimary  hover:bg-red-500/50 hover:border-red-500/50 text-xs  hover:shadow-lg"
              onClick={handleDeleteProject}
            >
              <AiOutlineDelete size={18} /> <span>Delete Project</span>
            </button>}
          </div>
          <h3 className='text-lg font-bold mb-4'>🛠️ Build with</h3>
          <div className="flex flex-wrap gap-4 mb-8">
            {data.usedTechnology.map((skill, i) => (
              <div
                key={i}
                className="inline border-2 border-textPrimaryDark/50 rounded dark dark:border-primary hover:shadow-lg"
              >
                {" "}
                <img
                  src={
                    "https://img.shields.io/badge/" +
                    skill +
                    "-FFFFFF?style=for-the-badge&logo=" +
                    skill
                  }
                  alt={skill}
                  className="rounded-sm"
                />
              </div>
            ))}
          </div>
        </div>
        <div className='w-full lg:w-[600px] lg:h-96 '>
          <img src={storage.getFilePreview(import.meta.env.VITE_USER_PROJECTS_BUCKET_ID, data.$id)} alt="" className='rounded-md' />
        </div>
      </div>
      <div >
        <h3 className='text-lg font-bold mb-4'>📝 Description</h3>
        <pre className='text-textSecondary dark:text-textSecondaryDark pb-12 whitespace-pre-wrap'>{data.description}</pre>
      </div>
      <hr />
      {
        location.state?.discoverFlag && <div >
          <h1 className='text-lg font-bold my-4'>👨‍💻 Posted by</h1>
          <div className='flex justify-between flex-wrap'>
            <h1 className=" text-base font-semibold mb-4 text-textPrimary dark:text-textPrimaryDark">
              {userDetails?.name}
            </h1>
            <div className='flex  items-center pb-4 gap-4'>
              <div className="flex items-center gap-4 text-xs lg:text-base">
                <a href={"http://www.twitter.com/" + userDetails?.twitter} target='_blank' rel='noreferrer'> <BsTwitter size={18} /></a>
              </div>
              <div className="flex items-center gap-4  text-xs lg:text-base">

                <a href={"http://www.github.com/" + userDetails?.github} target='_blank' rel='noreferrer'><BsGithub size={18} /></a>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default ProjectOverview