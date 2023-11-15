import axios from "axios";
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../UserContext";
import Swal from "sweetalert2";

export default function Header(){
  const navigate = useNavigate();

  const {userInfo,setUserInfo} = useContext(UserContext);

  
  function logout(){
    Swal.fire(
      'logged out',
      'you are now logged out',
      'success'
    ).then(()=>{
      axios.get('http://localhost:3001/logout',{withCredentials:true});
      setUserInfo(null);
      navigate('/');
    })
  }

  useEffect(()=>{
    axios.get('http://localhost:3001/profile',{withCredentials:true}).then(res=>{
      if(res.data.name === "JsonWebTokenError"){
        setUserInfo(null);
      }
      else{
        setUserInfo(res.data);
      }
    })
  },[]);

  function login(){
    navigate('/login');
  }

  function register(){
    navigate('/register')
  }

  const name = userInfo?.username;
    return(
        <header>
        
        <a href="/" id="logo">Blogs.</a>
        <nav>
          {
          name && (
            <>
              {/* <Link to='/createPost'>create new post</Link> */}
              <a href="/">Home</a>
              {/* <a href={`/user`}>my profile</a> */}
              <a href={`/myPosts`}>my posts</a>
              <button onClick={logout}>logout</button>
            </>
          )}

          {
            !name && (
              <div style={{
                display:"flex",
                gap:'0.5rem'
              }}>
                <button onClick={login}>login</button>
                <button onClick={register}>register</button>
              </div>
            )
          }
        </nav>
        </header>
    )
}