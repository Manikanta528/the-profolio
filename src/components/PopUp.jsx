import { BsCheckCircle } from "react-icons/bs";

function PopUp(props) {
  // eslint-disable-next-line react/prop-types
  const { msg } = props;
  return (
    <div className="absolute top-24 right-4  w-fit h-12   flex items-center gap-4  shadow-2xl mx-6 bg-background dark:bg-textSecondary ">
      <div className="w-16 h-12 bg-green-500  flex items-center justify-center my-1">
        {" "}
        <BsCheckCircle size={24} color="white" className="text-center" />{" "}
      </div>
      <span className="mx-4">{msg}</span>
    </div>
  );
}

export default PopUp;
