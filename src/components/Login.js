import { useContext, useState } from "react"
import axios from "axios"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../UserContext";
import Swal from "sweetalert2";
export default function Login(){



    const [send,setData] = useState({
        username:'',
        password:''
    })
    const [redirect,setRedirect] = useState(false);

    const {setUserInfo} = useContext(UserContext);


    const postSubmit = async(e)=>{
        e.preventDefault()
        await axios.post('http://localhost:3001/login',{send},{withCredentials:true}).then((res)=>{
            if(res.data.msg === "login successfull"){
                Swal.fire(
                    'login successful',
                    'you are now logged in',
                    'success'
                ).then(()=>{
                    setUserInfo(res.data)
                    setRedirect(true);
                })
            }else{
                Swal.fire(
                    `${res.data.msg}`,
                    'unable to login',
                    'info'
                );
            }
        })
    }


    const handleChange = (e)=>{
        setData((PrevState)=>({
            ...PrevState,
            [e.target.name]:e.target.value
        })
        )
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    
    return(
        <div className="login">
            <form method="POST" onSubmit={postSubmit} id="loginRegister">
                    <div className="formtexts">
                        <h1>login</h1>
                        <p>sign in to your profile</p>
                    </div>
                        <input type="username" placeholder="username" onChange={handleChange} name="username" />
                        <input type="password" placeholder="password" onChange={handleChange} name="password" />
                        <button type="submit" className="login-button"  onSubmit={postSubmit}>login</button>
                        <p>don't have an account? <Link style={{textDecoration:'none',color:'black'}} to={'/register'}>register here</Link></p>
            </form>
        </div>
    )

}