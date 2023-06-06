/* eslint-disable no-unsafe-optional-chaining */
import { useState ,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import {  databases , storage } from '../../utils';

import {BsTwitter , BsGithub} from 'react-icons/bs'
import {BiArrowBack} from 'react-icons/bi'
import ProjectCard from "../components/ProjectCard";


function UsersProfile() {
    const location = useLocation();
    const navigate = useNavigate()

    const [projects, setProjects] = useState([]);
    //console.log(location.state?.data)

    const {name, title, bio, skills, twitter, github} = location.state?.data;

    const handleBack = () => {
        navigate('/Find')
    }

    useEffect(() => {
        if(location.state?.data.$id == undefined){
            navigate('/Find')
        }else{
          const userProjects = databases.listDocuments(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_USER_PROJECTS_COLLECTION_ID);
          userProjects.then(
            function (response) {
              const filteredProjects = response.documents.filter((project) => project.userId == location.state?.data.$id);
              //console.log(filteredProjects);
              if(filteredProjects.length > 0)
                setProjects(filteredProjects);
              else
                setProjects([]);
              //console.log(projects);
            },
            function (error) {
              console.log(error);
            }
          );
        }
    }, [])
    
    

  return (
    <div>
        <div className='bg-background dark:bg-backgroundDark text-textPrimary dark:text-textPrimaryDark px-6 md:px-16 max-h-fit min-h-screen'>
              <button onClick={handleBack} className='py-12  flex flex-wrap items-center gap-4 hover:text-textSecondary font-medium'>
                <BiArrowBack size={18} /> <span>Back </span>
              </button>
              <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 md:gap-8  mb-12 mt-8 md:mt-8">
                <img
                  src={storage.getFilePreview(import.meta.env.VITE_USER_PROFILE_BUCKET_ID,location.state?.data.$id)}
                  alt="not Found"
                  className="w-24 h-24 rounded-full md:w-32 md:h-32 shadow-xl"
                />
                <div className="flex flex-col items-center md:items-start gap-3">
                  <h1 className="font-bold text-xl md:text-3xl text-textPrimary dark:text-textPrimaryDark">
                    {name}
                  </h1>
                  <h3 className="text-xs md:text-xl text-textSecondary dark:text-textSecondaryDark">
                    {title}
                  </h3>
                </div>
              </div>
              {/* <hr className=" border-textSecondary dark:border-textSecondaryDark "/> */}
              <h1 className="font-bold text-xl lg:text-2xl text-textPrimary dark:text-textPrimaryDark  ">
                 Biography
              </h1>
              <pre className="text-textSecondary text-xs lg:text-base dark:text-textSecondaryDark md:text-justify py-4 whitespace-pre-wrap">
                {bio}
              </pre>
              <h1 className="font-bold text-xl lg:text-2xl mb-4 text-textPrimary dark:text-textPrimaryDark">
               Skills
              </h1>
              <div className="flex flex-wrap gap-4 mb-4">
                {skills.map((skill, i) => (
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
             
              {twitter && github && (
                <h1 className="font-bold text-xl md:text-2xl mb-4 text-textPrimary dark:text-textPrimaryDark">
                   Socials
                </h1>
              )}
              {twitter && (
                <div className="flex items-center gap-4 mb-2 text-xs lg:text-base">
                  <BsTwitter size={18} />
                  <a href={"http://www.twitter.com/" + twitter}>{twitter}</a>
                </div>
              )}
              {github && (
                <div className="flex items-center gap-4 text-xs lg:text-base">
                  <BsGithub size={18} />
                  <a href={"http://www.github.com/" + github}>{github}</a>
                </div>
              )}
               {projects.length > 0 && <><h1 className="font-bold text-xl md:text-2xl py-4 text-textPrimary dark:text-textPrimaryDark"> Projects</h1>
              <div className="flex flex-wrap gap-8 pb-4">
                {projects.map((project, i) => (<ProjectCard key={i} data = {project} findFlag={true} />))}
              </div></>}
            </div>
    </div>
  )
}

export default UsersProfile