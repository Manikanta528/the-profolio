import Header from "../components/Header";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { v4 as uuidv4 } from "uuid";

import { account, databases, storage } from "../../utils";

import { AiOutlinePlusCircle } from "react-icons/ai";
import {RxCross2} from 'react-icons/rx'
import ProjectCard from "../components/ProjectCard";

function YourWorkPage(props) {
  // eslint-disable-next-line react/prop-types
  const { toggleTheme, theme } = props;
  const [workToggle, setWorkToggle] = useState(false);
  const [projectImg, setProjectImg] = useState();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [livePreview, setLivePreview] = useState("");
  const [inputSkill, setInputSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [repoLink, setRepoLink] = useState("");

  const [projects, setProjects] = useState([]);
  const [projectsTrigger, setProjectsTrigger] = useState(0);
  const [errors, setErrors] = useState({});


  const navigate = useNavigate();

  const handleAddWork = () => {
    setWorkToggle(!workToggle);
  }

  const onChangeSkills = (e) => {
    const { value } = e.target;
    setInputSkill(value);
  };

  const handleSkills = (e) => {
    const { key } = e;
    const trimmedInput = inputSkill.trim();

    if (key === "," && trimmedInput.length && !skills.includes(trimmedInput)) {
      e.preventDefault();
      setSkills((prevState) => [...prevState, trimmedInput]);
      setInputSkill("");
    }
  };

  const handleSkillDelete = (skill) => {
    const filteredSkills = skills.filter((item) => skill != item);
    setSkills(filteredSkills);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (projectName.trim() === '') {
      newErrors.projectName = 'Project Name is required';
    } else if (projectName.length > 80) {
      newErrors.projectName = 'Project Name must be less than 80 characters';
    }

    if (description.trim() === '') {
      newErrors.description = 'Description is required';
    } else if (description.length < 1024) {
      newErrors.description = 'Description must be greater than 1024 characters';
    }else if (description.length > 2024) {
      newErrors.description = 'Description must be lesser than 1024 characters';
    }

    if (livePreview.trim() === '') {
      newErrors.livePreview = 'Live link is required';
    } else if (livePreview.length > 100) {
      newErrors.livePreview = 'Live link must be less than 100 characters';
    }

    if (repoLink.trim() === '') {
      newErrors.repoLink = 'Repository link is required';
    } else if (repoLink.length > 100) {
      newErrors.repoLink = 'Repository link must be less than 100 characters';
    }

    if (skills.length < 3) {
      newErrors.usedTechnology = 'At least 3 technology are required';
    } 
    if(!projectImg){
      newErrors.projectImg = 'Project image is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    const accountDetails = account.get();
    accountDetails.then(
      function (response) {
        createProject(response.$id);
      },
      function (error) {
        console.log(error);
      }
    );
    
  }

  const createProject = (id) => { 
    const projectId = uuidv4();
    const storagePromise = storage.createFile(
      import.meta.env.VITE_USER_PROJECTS_BUCKET_ID,
      projectId,
      projectImg
    );
    storagePromise.then(
      function () {
        console.log("File uploaded successfully");
      },
      function (error) {
        console.log(error);
      }
    );

    const promise = databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USER_PROJECTS_COLLECTION_ID,
      projectId,
      {
        projectName : projectName,
        description : description,
        livePreview : livePreview,
        repositoryLink : repoLink,
        usedTechnology : skills,
        userId : id,
      }
    );
    promise.then(
      function () {
        setWorkToggle(false);
        setProjectsTrigger(projectsTrigger+1);
      },
      function (error) {
        console.log(error);
      }
    );
  }

  const documentsExists = (documentId) => {
    return databases
      .listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_USER_PROJECTS_COLLECTION_ID,
      )
      .then((response) => {
        //console.log(response);
        // console.log(response.documents.filter(item => item.$id == documentId));
        if(response.documents.filter(item => item.userId == documentId).length > 0)
        return true;
        //else  return false;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  useEffect(() => {
    const accountDetails = account.get();
    accountDetails.then(
      function (response) {
        const userId = response.$id;
        documentsExists(response.$id).then((exists) => {
          if(exists){
            const promise = databases.listDocuments(
              import.meta.env.VITE_DATABASE_ID,
              import.meta.env.VITE_USER_PROJECTS_COLLECTION_ID,
            );
            promise.then(
              function (response) {
                const projects = response.documents.filter(item => item.userId == userId)
                setProjects(projects);
                //console.log(projects);
              },
              function (error) {
                console.log(error);
              }
            );
          }
        })
      },
      function () {
        navigate("/login");
        //console.log(error);
      }
    );
  }, [projectsTrigger]);

  return (
    <div className=" bg-background dark:bg-backgroundDark text-textPrimary dark:text-textPrimaryDark max-h-fit min-h-screen">
      <Header
        toggleTheme={toggleTheme}
        theme={theme}
        flagSignIn={false}
        user={true}
        currentPage={"Your Work"}
      />
      <div   >
        {
          workToggle ? (
            <>
              <div className="flex justify-between mt-10 items-center mx-6 md:mx-16">
                <h1 className=" font-bold">Add Your Work</h1>
                <button
                  className="border-2 hover:bg-red-500/50 px-4 py-2 border-textPrimary rounded text-textPrimary dark:text-textPrimaryDark hover:border-red-500/50 text-xs md:px-2 md:py-1 md:text-base hover:shadow-lg"
                  onClick={handleAddWork}
                  >
                  Cancel
                </button>
              </div>
              <div className="flex items-center flex-col">
                <form onSubmit={handleProjectSubmit} className="mt-10 lg:w-3/5" >
                <div className="flex flex-col  gap-4  mt-4">
                  <label htmlFor="project" className=" font-bold"> Project Name <sup className="text-red-500">*</sup> </label>
                  <input
                    type="text"
                    name="project"
                    placeholder="Title of the Project"
                    id="project"
                    className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    maxLength="80"
                    
                  />
                  </div>
                  <sup className="mb-4 text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">80 characters allowed.</sup>

                  
                  <div className="flex flex-col  gap-4  ">
                  <label htmlFor="description" className=" font-bold" > <span className="">Description </span><sup className="text-red-500">*</sup></label>
                  <textarea
                    placeholder="description about the project"
                    id="description"
                    className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    
                  />
                  </div>
                  <sup className=" text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">2024 characters allowed.</sup>

                  <div className="flex flex-col  gap-4 mt-4 ">
                  <label htmlFor="livePreview" className=" font-bold ">Live Preview <sup className="text-red-500">*</sup></label>
                  <input
                    type="text"
                    name="livePreview"
                    placeholder="live website link"
                    id="livePreview"
                    className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                    value={livePreview}
                    onChange={(e) => setLivePreview(e.target.value)}
                  />
                  </div>
                  <sup className="mb-4 text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">100 characters allowed.</sup>

                  <div className="flex flex-col gap-4 mt-4">
                  <label htmlFor="repoLink" className="font-bold">repository Link <sup className="text-red-500">*</sup></label>
                  <input
                    type="text"
                    name="repoLink"
                    placeholder="live repo link"
                    id="repoLink"
                    className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                    value={repoLink}
                    onChange={(e) => setRepoLink(e.target.value)}
                  />
                  </div>
                  <sup className="mb-4 text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">39 characters allowed.</sup>
                  <div className="flex flex-col gap-4 mt-4">
                    <label htmlFor="skills" className=" font-bold">Used Technology<sup className="text-red-500">*</sup></label>
                    <input
                      type="text"
                      id="skills"
                      value={inputSkill}
                      className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                      placeholder="Enter a skill and press comma to add it"
                      onKeyDown={handleSkills}
                      onChange={onChangeSkills}
                    />
                  </div>
                  <sup className="mb-4 text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">add minimum 3 skills.</sup>
                  <div className="flex gap-2 flex-wrap mb-4">
                  {skills.map((skill, i) => (
                      <div key={i} className="px-2 py-1 border-2 w-fit border-textPrimaryDark rounded dark dark:border-primary hover:shadow-lg flex items-center gap-4">
                        {" "}
                        <span >{skill}</span>
                        <RxCross2
                          onClick={() => handleSkillDelete(skill)}
                          className="hover:text-red-500 cursor-pointer"
                        />
                      </div>
                    ))}
                    </div>
                    <div className="flex flex-col gap-4 ">
                      <label htmlFor="profilePic" className=" font-bold">Project Preview <sup className="text-red-500">*</sup> </label>
                      <input
                        type="file"
                        className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                        onChange={(e) => {
                          console.log(e.target.files);
                          setProjectImg(e.target.files[0]);
                        }}
                      />
                      </div>
                  <sup className="mb-4 text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">file upload might take 2-3 hrs to reflect in profile.</sup>
                  
                  <br/>
                  {
                Object.keys(errors).length > 0 && (
                  <div className="text-red-500 text-xs">
                    {Object.values(errors).map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </div>
                )
              }
                  <button type="submit" className="text-textPrimaryDark my-4  border-none  font-bold px-6 py-3  rounded bg-primary hover:text-textPrimary hover:bg-primary/90 hover:border-primary/50 text-xs md:text-base hover:shadow-lg">
                    Add Project
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="min-h-screen bg-pattern dark:bg-pattern-dark  bg-32">
            <div className="mx-6 md:mx-16 " >
                <h1 className="pt-10 pb-10  font-bold">Your Work</h1>
              { projects.length === 0 ? <marquee className=" text-textSecondary dark:text-textSecondaryDark text-sm" >You have not added any projects to your profile. Please add your projects now.
                </marquee> : <div className="mb-6 w-1 h-1"> </div>
                }
              <div className="flex flex-wrap gap-8 xl:gap-12 justify-center lg:justify-start ">
                <button onClick={handleAddWork} className="border-2 bg-background dark:bg-backgroundDark border-textPrimary text-textPrimary dark:text-textPrimaryDark dark:border-textPrimaryDark border-dotted text-base sm:text-lg w-full h-64 sm:w-96  rounded-md flex flex-col justify-center items-center  hover:shadow-2xl">
                  <AiOutlinePlusCircle className="text-4xl mt-12 hover:animate-spin text-textPrimary dark:text-textPrimaryDark  " />
                  <h3 className="pt-6">Add Your Work</h3>
                </button> 
              {
                projects.length > 0 ? (
                  projects.map((project, i) => (
                    <ProjectCard key={i} data = {project} />
                  ))
                ) : (
                  <br/>
                )
              }
              </div>
            </div>
            </div>
            )
        }
        
      </div>
    </div>  
  );
}

export default YourWorkPage;
