import Header from "../components/Header";

import { useState } from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";
import {RxCross2} from 'react-icons/rx'

function YourWorkPage(props) {
  // eslint-disable-next-line react/prop-types
  const { toggleTheme, theme } = props;
  const [workToggle, setWorkToggle] = useState(false);
  const [projectImg, setProjectImg] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [livePreview, setLivePreview] = useState("");
  const [inputSkill, setInputSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [repoLink, setRepoLink] = useState("");

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

  const handleProjectSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className=" bg-background dark:bg-backgroundDark text-textPrimary dark:text-textPrimaryDark max-h-fit min-h-screen">
      <Header
        toggleTheme={toggleTheme}
        theme={theme}
        flagSignIn={false}
        user={true}
        currentPage={"Your Work"}
      />
      <div className=" px-6 md:px-16">
        {
          workToggle ? (
            <>
              <div className="flex justify-between mt-10 items-center">
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
                      <label htmlFor="profilePic" className=" font-bold">Project Preview</label>
                      <input
                        type="file"
                        className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                        value={projectImg}
                        onChange={(e) => {
                          console.log(e.target.files);
                          setProjectImg(e.target.files[0]);
                        }}
                      />
                      </div>
                  <sup className="mb-4 text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">file upload might take 2-3 hrs to reflect in profile.</sup>
                  
                  <br/>
                  <button type="submit" className="text-textPrimaryDark my-4  border-none  font-bold px-6 py-3  rounded bg-primary hover:text-textPrimary hover:bg-primary/90 hover:border-primary/50 text-xs md:text-base hover:shadow-lg">
                    Add Project
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <h1 className="my-10 font-bold">Your Work</h1>
              <button onClick={handleAddWork} className="border-2 border-textPrimary text-textPrimary dark:text-textPrimaryDark dark:border-textPrimaryDark border-dotted text-base sm:text-lg w-full h-52 sm:w-64 sm:h-44 rounded-2xl flex flex-col justify-center items-center   hover:shadow-2xl">
                <AiOutlinePlusCircle className="text-4xl mt-12 hover:animate-spin text-textPrimary dark:text-textPrimaryDark  " />
                <h3 className="pt-6">Add Your Work</h3>
              </button> 
            </>
            )
        }
        
      </div>
    </div>
  );
}

export default YourWorkPage;
