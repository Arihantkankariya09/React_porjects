import {Avatar} from '@mui/material';
import './posts.css';


function Post({username,captions,imageUrl}) {

    return(
        <div className='posts'>
            <div className='post_header'>
                {/* Header avatar with name */}
                <Avatar className="user_dp" alt={username} src="/static/images/avatar/1.jpg"/>
                <h3>{username}</h3>
            </div>
            {/* Image/post */}
            <img className='post_img' src={imageUrl} alt=''></img>
            {/* Username + caption */}
            <h4 className='post_description'>
                <strong>{username}</strong>{captions}
            </h4>
        </div>
    );


}

export default Post;