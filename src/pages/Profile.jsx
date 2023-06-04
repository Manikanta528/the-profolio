/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { account, databases, storage } from "../../utils";

import Header from "../components/Header";
import PopUp from "../components/PopUp";
import { RxCross2 } from "react-icons/rx";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { BiMessageSquareEdit } from "react-icons/bi";

import 'aos/dist/aos.css';


function Profile(props) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const flag = true;
  // eslint-disable-next-line react/prop-types
  const { toggleTheme, theme } = props;
  const [popUp, setPopUp] = useState(0);

  // get user auth details
  const getUser = async () => {
    const userData = (await account) && account.get();
    userData
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        navigate("/");
        console.log(err);
      });
  };
  const logOut = async () => {
    await account.deleteSession("current");
    alert("logout successful");
    navigate("/");
  };
  useEffect(() => {
    getUser();
  }, []);

  // Edit Profile toggle
  const [profileEdit, setProfileEdit] = useState(false);
  const handleEditProfile = () => {
    setProfileEdit(!profileEdit);
  };

  // Profile Creation and updating of user data
  const [profilePic, setProfilePic] = useState([false,'']); 
  const [img, setImg] = useState();
  const [inputSkill, setInputSkill] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    bio: "",
    twitter: "",
    github: "",
    skills: [],
  });
  const [errors, setErrors] = useState({});

  const onChangeSkills = (e) => {
    const { value } = e.target;
    setInputSkill(value);
  };

  const handleSkills = (e) => {
    const { key } = e;
    const trimmedInput = inputSkill.trim();

    if (key === "," && trimmedInput.length && !profile.skills.includes(trimmedInput)) {
      e.preventDefault();
      handleFormChange("skills",[...profile.skills, trimmedInput]);
      setInputSkill("");
    }
  };

  const handleSkillDelete = (skill) => {
    const filteredSkills = profile.skills.filter((item) => skill != item);
    handleFormChange("skills",filteredSkills);
  };

  // updating profile in database and creating profile if not exists
  const updateProfile = (id) => {

    const promise = databases.updateDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USER_DETAILS_COLLECTION_ID,
      id,
      profile
    );

    if (img) {
      //console.log(img);
      userProfilePicExists(id).then((exists) => {
        if(exists){
          const promise2 = storage.deleteFile(
            import.meta.env.VITE_USER_PROFILE_BUCKET_ID,
            id
          );
          promise2.then(
            function (response) {
              //console.log(response);
              const promise3 = storage.createFile(
                import.meta.env.VITE_USER_PROFILE_BUCKET_ID,
                id,
                img);
                promise3.then(function (response) {
                  setProfilePic([true, id]);
                },function (error) {
                  //console.log(error); // Failure
                });
            },
            function (error) {
              //console.log(error); // Failure
            }
          );
        }else{
          console.log(id);
          const promise3 = storage.createFile(
            import.meta.env.VITE_USER_PROFILE_BUCKET_ID,
            id,
            img);
            promise3.then(function (response) {
              setProfilePic([true, id]);
              //console.log(id);
            },function (error) {
              //console.log(error); // Failure
            });
        }
      });
    }

    promise.then(
      function (response) {
        //console.log(response);
        //alert("Profile Updated");
        setPopUp(1);
        //console.log(popUp);
        setTimeout(() => {
          setPopUp(0);
        }, 5000);
      },
      function (error) {
        console.log(error); // Failure
      }
    );

    setProfileEdit(false);
  };

  const createUserDocument = (id) => {
    const promise = databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USER_DETAILS_COLLECTION_ID,
      id,
      profile
    );
    if (img) {
      console.log(img);
      userProfilePicExists(id).then((exists) => {
        if(exists){
          const promise2 = storage.deleteFile(
            import.meta.env.VITE_USER_PROFILE_BUCKET_ID,
            id
          );
          promise2.then(
            function (response) {
              //console.log(response);
              const promise3 = storage.createFile(
                import.meta.env.VITE_USER_PROFILE_BUCKET_ID,
                id,
                img);
              
                promise3.then(function (response) {
                  setProfilePic([true, id]);
                },function (error) {
                  //console.log(error); // Failure
                });
            },
            function (error) {
              //console.log(error); // Failure
            }
          );
        }else{
          const promise3 = storage.createFile(
            import.meta.env.VITE_USER_PROFILE_BUCKET_ID,
            id,
            img);
            promise3.then(function (response) {
              setProfilePic([true, id]);
            },function (error) {
              //console.log(error); // Failure
            });
        }
      });
    }

    promise.then(
      function (response) {
        //console.log(response);
        setPopUp(2);
        setTimeout(() => {
          setPopUp(0);
        }, 5000);
      },
      function (error) {
        //console.log(error); // Failure
      }
    );
    setProfileEdit(false);
  };
  const validateForm = () => {
    const newErrors = {};
    const { name, title, bio, twitter, github, skills } = profile;
    if (name.trim() === '') {
      newErrors.name = 'Name is required';
    } else if (name.length > 40) {
      newErrors.name = 'Name must be less than 40 characters';
    }

    if (title.trim() === '') {
      newErrors.title = 'Title is required';
    } else if (title.length > 40) {
      newErrors.title = 'Title must be less than 40 characters';
    }

    if (bio.trim() === '') {
      newErrors.biography = 'Biography is required';
    } else if (bio.length < 512) {
      newErrors.biography = 'Biography must be greater than 512 characters';
    } else if (bio.length > 1024) {
      newErrors.biography = 'Biography must be less than 1024 characters';
    }

    if (twitter.trim() === '') {
      newErrors.twitter = 'Twitter is required';
    } else if (twitter.length > 15) {
      newErrors.twitter = 'Twitter must be less than 15 characters';
    }

    if (github.trim() === '') {
      newErrors.github = 'Github is required';
    } else if (github.length > 39) {
      newErrors.github = 'Github must be less than 39 characters';
    }

    if (skills.length < 3) {
      newErrors.skills = 'At least 3 skills are required';
    } 

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  // handle profile submit
  const handleProfile = (e) => {
    e.preventDefault();
    //console.log(name,title,bio,twitter,github,skills);
    if (!validateForm()){
      
       return;
    }
    const accountDetails = account.get();
    accountDetails.then(
      function (response) {
        documentExists(response.$id).then((exists) => {
          const id = response.$id;
          if (exists) {
            updateProfile(id);
          } else {
            createUserDocument(id);
          }
        });
        setProfileEdit(false);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  // check if user document is existed or not
  const documentExists = (documentId) => {
    return databases
      .listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_USER_DETAILS_COLLECTION_ID,
      )
      .then((response) => {
        // console.log(response);
        // console.log(response.documents.filter(item => item.$id == documentId));
        if(response.documents.filter(item => item.$id == documentId).length > 0)
        return true;
        else  return false;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  // check if user profile pic is existed or not
  const userProfilePicExists = (documentId) => {
    return storage
      .listFiles(
        import.meta.env.VITE_USER_PROFILE_BUCKET_ID
      )
      .then((response) => {
        //console.log(response.files.filter(item => item.$id == documentId).length > 0);
        if(response.files.filter(item => item.$id == documentId).length > 0)
        return true;
        else  return false;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };
  const handleFormChange = (field,value) => {
    setProfile((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  useEffect(() => {
    const userData = account.get();

    userData.then(
      function (response) {
        //console.log(response);
        documentExists(response.$id).then((exists) => {
          if (exists) {
            const promise = databases.getDocument(
              import.meta.env.VITE_DATABASE_ID,
              import.meta.env.VITE_USER_DETAILS_COLLECTION_ID,
              response.$id  
            );
            promise.then(
              function (response) {
                const { name, title, bio, twitter, github, skills } = response;
                const profileResponse = { name, title, bio, twitter, github, skills };  
                setProfile(profileResponse);
                // setName(response.name);
                // setTitle(response.title);
                // setBio(response.bio);
                // setTwitter(response.twitter);
                // setGithub(response.github);
                // setSkills(response.skills);
              },
              function (error) {
                // Failure
              }
            );
          }
          else{
            setProfileEdit(true);
          }
        });

        userProfilePicExists(response.$id).then((exists) => {
          if (exists) {
            setProfilePic([true, response.$id]);
            //console.log(response.$id);
          }
        });
      },
      function (error) {
        //console.log(error); // Failure
        setProfileEdit(true);
      }
    );
  }, []);

  return (
    <div className=" bg-background dark:bg-backgroundDark text-textPrimary dark:text-textPrimaryDark max-h-fit min-h-screen">
      <Header
        toggleTheme={toggleTheme}
        theme={theme}
        flagSignIn={!flag}
        user={true}
        currentPage={"Profile"}
      />
      <div className=" px-6 md:px-16">
        <main >
          {popUp === 1 && <PopUp msg="Successfully, Profile Updated" />}
          {popUp === 2 && <PopUp msg="Successfully, Profile Created" />}
          {profileEdit && (
            <div className="flex items-center flex-col">
              
              <h1 className="font-bold text-xl lg:text-2xl mb-4 text-textPrimary dark:text-textPrimaryDark text-center mt-4">Edit Profile</h1>
             
              <form onSubmit={handleProfile} className="mt-10 lg:w-3/5" >
              <div className="flex flex-col  gap-4  mt-4">
                <label htmlFor="name" className=" font-bold">Name <sup className="text-red-500">*</sup> </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  id="name"
                  className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                  value={profile.name}
                  onChange={(e) => handleFormChange("name",e.target.value)}
                  maxLength="40"
                  
                />
                </div>
                <sup className="mb-4 text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">40 characters allowed.</sup>

                <div className="flex flex-col gap-4  mt-4">
                <label htmlFor="title" className=" font-bold"><span className="w-24">Title </span><sup className="text-red-500">*</sup></label>
                <input
                  type="text"
                  name="title"
                  placeholder="like developer, designer, etc."
                  id="title"
                  className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                  value={profile.title}
                  onChange={(e) => handleFormChange("title",e.target.value)}
                  
                />
                </div>
                <sup className="mb-4 text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">40 characters allowed.</sup>

                <div className="flex flex-col  gap-4  ">
                <label htmlFor="bio" className=" font-bold" > <span className="">Biography </span><sup className="text-red-500">*</sup></label>
                <textarea
                  placeholder="bio"
                  id="bio"
                  className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                  value={profile.bio}
                  onChange={(e) => handleFormChange("bio",e.target.value)}
                  
                />
                </div>
                <sup className=" text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">1024 characters allowed.</sup>

                <div className="flex flex-col  gap-4 mt-4 ">
                <label htmlFor="twitter" className=" font-bold ">Twitter <sup className="text-red-500">*</sup></label>
                <input
                  type="text"
                  name="twitter"
                  placeholder="twitters user name not url"
                  id="twitter"
                  className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                  value={profile.twitter}
                  onChange={(e) => handleFormChange("twitter",e.target.value)}
                />
                </div>
                <sup className="mb-4 text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">15 characters allowed.</sup>

                <div className="flex flex-col gap-4 mt-4">
                <label htmlFor="Github" className="font-bold">Github <sup className="text-red-500">*</sup></label>
                <input
                  type="text"
                  name="Github"
                  placeholder="user name"
                  id="Github"
                  className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                  value={profile.github}
                  onChange={(e) => handleFormChange("github",e.target.value)}
                />
                </div>
                <sup className="mb-4 text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">39 characters allowed.</sup>
                <div className="flex flex-col gap-4 mt-4">
                  <label htmlFor="skills" className=" font-bold">Skills<sup className="text-red-500">*</sup></label>
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
                {profile.skills.map((skill, i) => (
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
                    <label htmlFor="profilePic" className=" font-bold">Profile Picture</label>
                    <input
                      type="file"
                      className="border-2 flex-grow rounded py-1 px-2 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-primary/50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary dark:bg-backgroundDark/50"
                      onChange={(e) => {
                        setImg(e.target.files[0]);
                      }}
                    />
                    </div>
                <sup className="mb-4 text-[10px] pl-2 text-textSecondary dark:text-textSecondaryDark">file upload might take 2-3 hrs to reflect in profile.</sup>
                {
                Object.keys(errors).length > 0 && (
                  <div className="text-red-500 text-xs">
                    {Object.values(errors).map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </div>
                )
              }
                <br/>
                <button type="submit" className="text-textPrimaryDark my-4  border-none  font-bold px-6 py-3  rounded bg-primary hover:text-textPrimary hover:bg-primary/90 hover:border-primary/50 text-xs md:text-base hover:shadow-lg">
                  Save Changes
                </button>
              </form>
            </div>
          )}
          {user && !profileEdit && (
            <div>
              <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 md:gap-8  mb-12 mt-8 md:mt-20">
                <img
                  src={ profilePic[0] ? storage.getFilePreview(import.meta.env.VITE_USER_PROFILE_BUCKET_ID,profilePic[1]) :
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  }
                  alt="not Found"
                  className="w-24 h-24 rounded-full md:w-32 md:h-32 shadow-xl"
                />
                <div className="flex flex-col items-center md:items-start  gap-3">
                  <h1 className="font-bold text-xl md:text-3xl text-textPrimary dark:text-textPrimaryDark">
                    {profile.name}
                  </h1>
                  <h3 className="text-xs md:text-xl text-textSecondary dark:text-textSecondaryDark">
                    {profile.title}
                  </h3>
                  <div className="flex gap-4">
                    {!profileEdit && (
                      <button
                        className="text-textPrimary flex gap-2 items-center bg-primary/70 border-primary/70 dark:text-textPrimaryDark  border-2 px-4 py-2 md:px-4 md:py-2 rounded hover:bg-primary/50 hover:border-primary/50 text-sm  hover:shadow-lg"
                        onClick={handleEditProfile}
                      >
                        <BiMessageSquareEdit/><span>Edit Profile</span>
                      </button>
                    )}
                    <button
                      className="flex items-center gap-2  border-2 px-4 py-2  rounded bg-red-500/70 border-red-500/70 text-textPrimary dark:text-textPrimaryDark hover:text-textPrimary  hover:bg-red-500/50 hover:border-red-500/50 text-sm  hover:shadow-lg"
                      onClick={logOut}
                    >
                      <TbLogout/> <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* <hr className=" border-textSecondary dark:border-textSecondaryDark "/> */}
              <h1 className="font-bold text-xl lg:text-2xl text-textPrimary dark:text-textPrimaryDark  ">
                Biography
              </h1>
              <p className="text-textSecondary text-xs lg:text-base dark:text-textSecondaryDark md:text-justify py-4">
                {profile.bio}
              </p>
              <h1 className="font-bold text-xl lg:text-2xl mb-4 text-textPrimary dark:text-textPrimaryDark">
                Skills
              </h1>
              <div className="flex flex-wrap gap-4 mb-4">
                {profile.skills.map((skill, i) => (
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
              {profile.twitter && profile.github && (
                <h1 className="font-bold text-xl md:text-2xl mb-4 text-textPrimary dark:text-textPrimaryDark">
                  Socials
                </h1>
              )}
              {profile.twitter && (
                <div className="flex items-center gap-4 mb-2 text-xs lg:text-base">
                  <BsTwitter size={18} />
                  <a href={"http://www.twitter.com/" + profile.twitter}>{profile.twitter}</a>
                </div>
              )}
              {profile.github && (
                <div className="flex items-center gap-4 text-xs lg:text-base">
                  <BsGithub size={18} />
                  <a href={"http://www.github.com/" + profile.github}>{profile.github}</a>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default Profile;
