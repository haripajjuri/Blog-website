import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function IndexPage(){
    const [posts,setPosts] = useState([]);
    const {userInfo,setUserInfo} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://127.0.0.1:3001/allPosts').then(res=>{
            setPosts(res.data)
        })
    },[])

    const name = userInfo?.username;

    function createPost(){
        navigate('/createPost')
    }
    
    return(
        <div className="indexpage">
            <div className="info">
            {
            !userInfo && (
                <div>
                    <p>hello! please login</p>
                    <p>to create posts</p>
                </div>
            )
            }


            {
            userInfo && (
                <>
                <div id="crt">
                    <p style={{display:"flex", gap:'5px',marginLeft:'8px'}}>hello, <p style={{color:"#7873d6"}}>{name}</p>!</p>
                    <button 
                    onClick={createPost}
                    >create post</button>
                </div>
                </>
            )

            }
            </div>

            <div className="allposts">
            {
            
                posts.length>0 && posts.map(post=>(
                    <Post {...post} />
                ))
            }
            </div>
        </div>
    )
}