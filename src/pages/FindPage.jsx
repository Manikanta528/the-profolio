import { useState, useEffect } from 'react'

import { databases } from '../../utils';

import { BiSearchAlt } from 'react-icons/bi'

import Header from "../components/Header"
import ProfileCard from "../components/ProfileCard";

function FindPage(props) {
  // eslint-disable-next-line react/prop-types
  const { toggleTheme, theme } = props

  // to store the search input
  const [search, setSearch] = useState('');
  // to store the users
  const [users, setUsers] = useState([]);


  // to search the users
  const handleSearch = (e) => {
    e.preventDefault();
    const listDocuments = databases.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_USER_DETAILS_COLLECTION_ID);

    listDocuments.then(
      function (response) {
        const filteredUsers = response.documents.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
        if (filteredUsers.length > 0)
          setUsers(filteredUsers);
        else
          setUsers([]);
      },
      function (error) {
        console.log(error);
      }
    );

  }

  // to get the all users
  useEffect(() => {
    const listDocuments = databases.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_USER_DETAILS_COLLECTION_ID);

    listDocuments.then(
      function (response) {
        setUsers(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className=" bg-background dark:bg-backgroundDark text-textPrimary dark:text-textPrimaryDark">
      <Header toggleTheme={toggleTheme} theme={theme} flagSignIn={false} user={true} currentPage={"Find"} />
      <div className=" px-6 md:px-16 min-h-screen max-h-fit" >
        <div className='flex justify-center h-24 bg-gif rounded bg-auto'>
          <form className='relative  flex items-center bg-background dark:bg-backgroundDark p-4  rounded-md shadow-2xl dark:shadow-background/10 top-16 h-fit' onSubmit={handleSearch}>
            <BiSearchAlt className=" mr-4 hidden sm:inline-block" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className='bg-background dark:bg-backgroundDark focus:outline-0 w-[100px] sm:w-[200px] md:w-[300px] lg:w-[400px] ' />
            <input type="submit" value="Search" className=' px-2 py-1 text-sm  md:text-base' />
          </form>
        </div>
        <div className="flex flex-wrap w-full h-fit mt-24 gap-8 justify-center md:justify-start ">
          {
            users.length > 0 ? users.map((user, i) => (<ProfileCard key={i} data={user} />)) :
              <h1 className="text-center">No Users Found </h1>

          }
        </div>
      </div>

    </div>
  )
}

export default FindPage