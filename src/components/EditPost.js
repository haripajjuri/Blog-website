import axios from "axios"
import { useEffect, useState } from "react"
import ReactQuill from "react-quill"
import { Navigate, useParams } from "react-router-dom"
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";


export default function EditPost(){
    const {id} = useParams();
    const [send,setData] = useState({
        title:'',
        summary:'',
        content:'',
        file:''
    })

    const [redirect,setRedirect] = useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:3001/post/${id}`,{withCredentials:true}).then(res=>{
            setData(res.data.postData);
        })
    },[])

    const handleChange = e =>{
        setData((PrevState)=>({
            ...PrevState,
            [e.target.name]:e.target.value
        }))
    }

    const updatePost = (e) => {
        e.preventDefault();
        const form  = new FormData();
        
        form.set('title',send.title)
        form.set('summary',send.summary)
        form.set('content',send.content)
        if(send.file?.[0]){
            form.set('file',send.file?.[0])
        }

        axios.put(`http://localhost:3001/update/${id}`,form,
        {
             headers:{
                 'Content-Type': 'multipart/form-data'
             },
        }
        ).then(res=>{
            if(res.data.msg === "updated"){
                Swal.fire(
                    'updated successfully',
                    'this post was updated successfully',
                    'success'
                ).then(()=>setRedirect(true));
            }
        })
        
    }

    
    if(redirect){
        return <Navigate to={`/post/${id}`}/>
    }

    return(
        <div className="editpost">

            <div className="formtexts">
                <h2 style={{marginTop:"30px"}}>edit post</h2>
                <p>make changes to your post, choose a new photo if you want to change the picture</p><br></br>
            </div>

        <form onSubmit={updatePost}>
            <input type="text" value={send.title}  onChange={handleChange} name="title" />
            <input type="text" value={send.summary} placeholder="summary" onChange={handleChange} name="summary" />
            <input type="file" onChange={e=> setData({...send, file : e.target.files})} id="file"/>
            <ReactQuill style={{width:"69%"}} placeholder="content" onChange={newValue=>setData({...send,content:newValue})} value={send.content}/>
            <button onClick={updatePost}>save</button>
        </form>
        
        </div>
    )
}