import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

function UsersProfile(props) {
    const location = useLocation();
    const navigate = useNavigate()
    const id = location.state?.id;

    useEffect(() => {
        if(location.state?.id == undefined){
            navigate('/Find')
        }
    }, [])
    
    

  return (
    <div>
        
    </div>
  )
}

export default UsersProfile