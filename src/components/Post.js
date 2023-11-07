import { Link } from "react-router-dom"
import TimeAgo from 'timeago-react';

export default function Post({title,summary,file,createdAt,author,_id}){
  
  return(  
    <div className="post" >
      <Link to={`/post/${_id}`}>
        <div className="image">
          <img src={`http://localhost:3001/${file}`} alt="disp" />
        </div>
      </Link>
          <div className="postinfo">

            <Link className="info-links" to={`/post/${_id}`}>

            <h3>{title}</h3>

              <TimeAgo style={{color:'grey',fontSize:'13px'}}
                  datetime={createdAt}
              />
              <p style={{fontSize:'13px',fontWeight:500, paddingBottom:'5px'}}>by {author.username}</p>
               
            <p>{summary}</p>
            </Link>
          </div>
    </div>
    )
}