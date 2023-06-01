

function ProjectCard(props) {
    const { projectName, description } = props.data;

  return (
    <div className="border-2 border-textPrimary dark:shadow-white/10 text-textPrimary dark:text-textPrimaryDark dark:border-textPrimaryDark text-base sm:text-lg w-full h-52 sm:w-64 sm:h-44 rounded-2xl flex flex-col justify-center items-center  hover:shadow-2xl">
        <h3>{projectName}</h3>
        <p>{description}</p>
    </div>
  )
}

export default ProjectCard