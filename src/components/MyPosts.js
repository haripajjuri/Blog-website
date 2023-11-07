import { useContext, useEffect,useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import Post from "./Post";
export default function MyPosts(){
    const {userInfo} = useContext(UserContext);
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:3001/${userInfo?.id}/posts`).then((res)=>{
            setPosts(res.data);
        })
    },[])
    return(
        <div className="allposts">
            {
                posts.length>0 && posts.map(post=>(
                    <Post {...post} />
                ))
            }
        </div>
    )
}