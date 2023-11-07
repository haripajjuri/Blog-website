import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function CreatePost(){
    const [send,setData] = useState({
        title:'',
        summary:'',
        content:'',
        file:''
    })

    const handleChange = e =>{
        setData((PrevState)=>({
            ...PrevState,
            [e.target.name]:e.target.value
        }))
    }

    const[redirect,setRedirect] = useState(false);

    async function createNewPost(e){
        const formData  = new FormData();
        
        formData.set('title',send.title)
        formData.set('summary',send.summary)
        formData.set('content',send.content)
        formData.set('file',send.file[0])
        
        e.preventDefault();
        const response = await axios.post('http://localhost:3001/createPost',formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            withCredentials:true
        });

        console.log(response)
        if(response.data.name === "JsonWebTokenError"){
            Swal.fire(
                'not authorized',
                'please login to create post',
                "info"
            )
        }
        else{
            Swal.fire(
                'post created',
                'post was successfully created',
                "success"
            ).then(()=>{setRedirect(true)})
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return(
        <div className="editpost">
            <div className="formtexts">
                <h2 >create a post here</h2>
            </div>
        <form onSubmit={createNewPost}>
            <input type="text" placeholder="title" onChange={handleChange} name="title"/>
            <input type="text" placeholder="summary" onChange={handleChange} name="summary"/>

            <input id="file" type="file" onChange={e=> setData({...send, file : e.target.files}) } />

            <ReactQuill style={{width:"69%"}} placeholder="content" onChange={newValue=>setData({...send,content:newValue})} />
            <button onClick={createNewPost}>create Post</button>
        </form>
        
        </div>
    )
}