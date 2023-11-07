import { useState } from "react"
import axios from "axios"
import { Navigate,Link } from "react-router-dom"
import Swal from "sweetalert2";

export default function Register(){
    const [redirect,setRedirect] = useState(false);
    const postSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/register',{send}).then((res)=>{
            if(res.data.msg){
                Swal.fire(
                    `username already exists`,
                    'please choose a different username',
                    'info'
                )
            }else{
                if(res.status === 200){
                    Swal.fire(
                        'registration successfull',
                        'please login to your account',
                        'success'
                    ).then(()=>setRedirect(true))
                }else{
                    Swal.fire(
                        'error registering',
                        'unable to create an account',
                        'info'

                    )
                    alert("error registering user");
                }
            }
        }
        )
    }

    const [send,setData] = useState({
        username:'',
        password:''
    })

    const handleChange = (e)=>{
        setData((PrevState)=>({
            ...PrevState,
            [e.target.name]:e.target.value
        })
        )
    }
    if(redirect){
        return <Navigate to={'/login'}/>
    }
    return(
        <div>
            <form method="POST" onSubmit={postSubmit} id="loginRegister">
                <div className="formtexts">
                        <h1>Register</h1>
                        <p>sign up to create your profile</p>
                </div>
                        <input type="username" placeholder="username" onChange={handleChange} name="username" />
                        <input type="password" placeholder="password" onChange={handleChange} name="password" />
                        <button type="submit" className="login-button" value={'Register'} onSubmit={postSubmit}>register</button>
                        <p>already have an account? <Link style={{textDecoration:'none',color:'black'}} to={'/login'}>login here</Link></p>
            </form>
        </div>
    )
}