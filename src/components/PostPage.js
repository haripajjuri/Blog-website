import axios from "axios";
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import TimeAgo from "timeago-react";
export default function PostPage({setProgress}){

    const navigate = useNavigate();

    const [postData,setPostData] = useState({});
    const [curentUser,setCurrentUser] = useState(null);
    const [redirect,setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:3001/post/${id}`,{withCredentials:true}).then((res)=>{
            setPostData(res.data.postData);
            setCurrentUser(res.data.info);
        })

    },[])

    function deletePost(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/delete/${id}`).then((res)=>{
                if(res.data.msg==="task deleted"){
                    Swal.fire(
                        'post deleted',
                        'This post was deleted successfully',
                        'success'
                    ).then(()=>{
                        setRedirect(true);
                    })
                }else{
                    Swal.fire(
                        `${res.data.msg}`,
                        'an error occured',
                        'info'
                    )
                }
            })
            }
          })
    }

    if(redirect){
        navigate('/');
    }

    function editPost(){
        navigate(`/edit/${id}`);
    }

    
        return(
            <div className="postpage">

                <div className="title">
                    <h1>{postData.title}</h1>
                </div>

                <div className="time">

                    <div
                    style={{
                        display:'flex',
                        alignItems:'center',
                        gap:'0.6rem',
                    }}
                    >
                        <img style={{paddingTop:'3px'}} width="17" height="17" src="https://img.icons8.com/material-sharp/24/edit--v1.png" alt="edit--v1"/>   
                        {
                            (curentUser?.id === postData.author?._id)
                            ?<p>by you</p>
                            :<p>by {postData.author?.username}</p>
                        }

                    </div>


                    <div>
                        <p>.</p>
                    </div>

                    <TimeAgo style={{color:'grey',fontSize:'13px',paddingTop:'2px'}}
                        datetime={postData?.createdAt}
                    />
                </div>

                <div className="updateDelete">     
                    {
                    curentUser?.id === postData.author?._id && (
                        <>
                        <button onClick={editPost}>edit</button>
                        <button type="delete" onClick={deletePost}>delete</button>
                        </>
                    )
                    }
                </div>

                <div className="summary">
                    <h3>{postData.summary}</h3>
                </div>


                <div className="postpageimg">
                    <img src={`http://localhost:3001/${postData.file}`} alt="" />
                </div>

                <div className="content" dangerouslySetInnerHTML={{__html:postData.content}} />
        </div>
        )
}