import { useEffect,useState } from "react";
import axios from "axios";
import Post from "./Post";

export default function MyPosts(){
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/myPosts',{withCredentials:true}).then(res=>{
            setPosts(res.data);
        });
    },[]);

    return(
        <div className="allposts" style={{
            maxWidth:'70%'
        }}>
            <div className="indexpage">
                <div className="info">
                <h3>your posts</h3>
               </div>
            </div>
            {   
                posts.length>0 ? posts.map(post=>(
                    <Post {...post} />
                ))
                :
                <div>no posts</div>
            }
            </div>
    )
}