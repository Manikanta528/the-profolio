/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { account, databases, storage } from "../../utils";

import Header from "../components/Header";
import PopUp from "../components/PopUp";
import { RxCross2 } from "react-icons/rx";
import { BsGithub, BsTwitter } from "react-icons/bs";

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

  // Profile Creation and updation of user data
  const [profilePic, setProfilePic] = useState(null); // default profile pic
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [inputSkill, setInputSkill] = useState("");
  const [skills, setSkills] = useState([]);

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

  // updating profile in database and creating profile if not exists
  const updateProfile = (response) => {
    const promise = databases.updateDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USER_DETAILS_COLLECTION_ID,
      response.$id,
      {
        name: name,
        title: title,
        bio: bio,
        twitter: twitter,
        github: github,
        skills: skills,
      }
    );

    promise.then(
      function (response) {
        //console.log(response);
        //alert("Profile Updated");
        setPopUp(1);
        console.log(popUp);
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

  const createUserDocument = (response) => {
    const promise = databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USER_DETAILS_COLLECTION_ID,
      response.$id,
      {
        name: name,
        title: title,
        bio: bio,
        twitter: twitter,
        github: github,
        skills: skills,
      }
    );
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

  // handle profile submit
  const handleProfile = (e) => {
    e.preventDefault();
    //console.log(name,title,bio,twitter,github,skills);
    const accountDetails = account.get();
    accountDetails.then(
      function (response) {
        documentExists(response.$id).then((exists) => {
          if (exists) {
            updateProfile(response);
          } else {
            createUserDocument(response);
          }
        });
        setProfileEdit(false);
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
                //console.log(response);
                setName(response.name);
                setTitle(response.title);
                setBio(response.bio);
                setTwitter(response.twitter);
                setGithub(response.github);
                setSkills(response.skills);
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
      },
      function (error) {
        //console.log(error); // Failure
        setProfileEdit(true);
      }
    );
  }, []);

  return (
    <div className="dark:bg-hero bg-background dark:bg-backgroundDark text-textPrimary dark:text-textPrimaryDark">
      <Header
        toggleTheme={toggleTheme}
        theme={theme}
        flagSignIn={!flag}
        user={true}
        currentPage={"Profile"}
      />
      <div className=" px-6 md:px-16">
        <main className="h-screen">
          {popUp === 1 && <PopUp msg="Successfully, Profile Updated" />}
          {popUp === 2 && <PopUp msg="Successfully, Profile Created" />}
          {profileEdit && (
            <div>
              <form onSubmit={handleProfile}>
                <label htmlFor="profilePic">Profile Picture</label>
                <input
                  type="file"
                  onChange={(e) => {
                    setProfilePic(e.target.files[0]);
                  }}
                />
                <br />
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  id="name"
                  className="border-black border-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <br />
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="dev"
                  id="title"
                  className="border-black border-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <br />
                <label htmlFor="bio">Biography</label>
                <textarea
                  placeholder="bio"
                  id="bio"
                  className="border-black border-2"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                />
                <br />
                <label htmlFor="twitter">Twitter</label>
                <input
                  type="text"
                  name="twitter"
                  placeholder="user name"
                  id="twitter"
                  className="border-black border-2"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                <br />
                <label htmlFor="Github">Github</label>
                <input
                  type="text"
                  name="Github"
                  placeholder="user name"
                  id="Github"
                  className="border-black border-2"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
                <br />
                <div className="container">
                  <label htmlFor="skills">Skills</label>
                  {skills.map((skill, i) => (
                    <div key={i} className="inline">
                      {" "}
                      <span>{skill}</span>
                      <RxCross2
                        onClick={() => handleSkillDelete(skill)}
                        className="inline"
                      />
                    </div>
                  ))}
                  <br />
                  <input
                    type="text"
                    id="skills"
                    value={inputSkill}
                    className="border-black border-2"
                    placeholder="Enter a skill and press comma to add it"
                    onKeyDown={handleSkills}
                    onChange={onChangeSkills}
                  />
                </div>
                <br />
                <button type="submit" className="border-black border-2">
                  save changes
                </button>
              </form>
            </div>
          )}
          {user && !profileEdit && (
            <div>
              <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 md:gap-8  mb-12 mt-8 md:mt-20">
                <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  }
                  alt="not Found"
                  className="w-24 h-24 rounded-full md:w-32 md:h-32 shadow-xl"
                />
                <div className="flex flex-col items-center md:items-start  gap-3">
                  <h1 className="font-bold text-xl md:text-3xl text-textPrimary dark:text-textPrimaryDark">
                    {name}
                  </h1>
                  <h3 className="text-xs md:text-xl text-textSecondary dark:text-textSecondaryDark">
                    {title}
                  </h3>
                  <div className="flex gap-4">
                    {!profileEdit && (
                      <button
                        className="text-textPrimary dark:text-textPrimaryDark bg-background dark:bg-backgroundDark border-2 px-4 py-2 md:px-2 md:py-1 rounded hover:bg-primary/50 hover:border-primary/50 text-xs md:text-base hover:shadow-lg"
                        onClick={handleEditProfile}
                      >
                        Edit Profile
                      </button>
                    )}
                    <button
                      className="border-2 hover:bg-red-500/50 px-4 py-2 rounded text-textPrimary dark:text-textPrimaryDark hover:border-red-500/50 text-xs md:px-2 md:py-1 md:text-base hover:shadow-lg"
                      onClick={logOut}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
              {/* <hr className=" border-textSecondary dark:border-textSecondaryDark "/> */}
              <h1 className="font-bold text-xl lg:text-2xl text-textPrimary dark:text-textPrimaryDark  ">
                Biography
              </h1>
              <p className="text-textSecondary text-xs lg:text-base dark:text-textSecondaryDark md:text-justify py-4">
                {bio}
              </p>
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
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default Profile;
