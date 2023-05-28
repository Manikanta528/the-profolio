
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { account } from "../../utils";

import Header from "../components/Header";

function Profile(props) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const flag = true;
  // eslint-disable-next-line react/prop-types
  const {toggleTheme,theme} = props
  const getUser = async () => {
    const userData = (await account) && account.get();
    userData
      .then((res) => setUser(res))
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
  return (
    <div className=" bg-background dark:bg-backgroundDark text-textPrimary dark:text-textPrimaryDark">
    <Header toggleTheme={toggleTheme} theme={theme} flagSignIn={flag} user={true} currentPage={"Profile"}/>
    <div className=" px-6 md:px-16" >
      <main className="h-screen">
        <h1 className="mb-4">Github Authenticated Page</h1>
        {user && (
          <div>
            <p>
              User:{" "}
              <span className="text-primary">{user.name}</span>
            </p>
            <p>
              Email: <span className="text-primary">{user.email}</span>
            </p>
            <button onClick={logOut} className="">
              Log Out
            </button>
          </div>
        )}
      </main>
    </div>
    </div>
  );
}
export default Profile;
