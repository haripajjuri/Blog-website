import { UserContext } from "../UserContext";
import { useContext } from "react";

export default function UserPage(){
    const {userInfo,setUserInfo} = useContext(UserContext);
    
    return(
        <div className="userpage">
            <h4>hello {userInfo?.username}!!</h4>
        </div>
    )
}