import Header from "../components/Header";


function YourWorkPage(props) {
    // eslint-disable-next-line react/prop-types
    const {toggleTheme,theme} = props
  return (
    <div className=" bg-background dark:bg-backgroundDark text-textPrimary dark:text-textPrimaryDark">
    <Header toggleTheme={toggleTheme} theme={theme} flagSignIn={false} user={true} currentPage={"Your Work"}/>
        <div className=" px-6 md:px-16 h-screen" >
        Your Work
        </div>
    </div>
  )
}

export default YourWorkPage