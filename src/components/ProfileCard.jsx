/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import { storage } from "../../utils";


function ProfileCard(props) {

  // eslint-disable-next-line react/prop-types
  const id = props.data.$id;
  const name = props.data.name;
  const navigate = useNavigate();

  // to view the full user profile
  const handleViewProfile = () => {
    navigate("/user", { state: { data: props.data } });
  }

  return (
    <div className="max-h-fit w-[208px]  border-2 border-backgroundDark/10 dark:border-background/10 py-8 px-6 flex flex-col items-center rounded-md hover:shadow-2xl dark:shadow-background/10" data-aos="fade-up"  >
      <img src={storage.getFilePreview(import.meta.env.VITE_USER_PROFILE_BUCKET_ID, id)} alt="" className="w-24 h-24 rounded-full" />
      <h1 className="font-bold mt-4 truncate w-full text-center">{name}</h1>
      <button className="bg-primary hover:bg-primary/70 w-full  text-textPrimaryDark hover:text-textPrimary font-semibold sm:font-bold py-2 px-4 mt-4 rounded" onClick={handleViewProfile}>View Profile</button>
    </div>
  )
}

export default ProfileCard