import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { likeAndDislike } from '../Actions/User';
import ShowLikes from './ShowLikes';
import AddComment from './AddComment';
import CreatePost from './CreatePost';
// import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';


const FeedPage = ({ caption, owner, likes, _id, comments, image }) => {
    const dispatch = useDispatch();

    const [like, setLike] = useState(false);
    const [totalLike, setTotalLike] = useState(likes.length);
    const id = useSelector((state) => state.user.user._id)
    useEffect(() => {
        const liked = likes.find(like => like._id === id)
        if (liked) {
            setLike(true)
        }
    }, [likes ,id])
    const [showAllLikes, setShowAllLikes] = useState(false);
    const showLikesHandler = () => {
        setShowAllLikes(!showAllLikes);
        console.log(showAllLikes)
    }

    const [showComment, setShowComment] = useState(false);
    const addCommentHandler = () => {
        setShowComment(!showComment);
    }



    return (
        <div className='place-self-center mx-20 bg-white my-4'>
            <div id="PostHeader" className='px-4' >
                <div className='flex justify-between py-4'>
                    <Link to={`/profile/${owner._id}`}><h4><AccountCircleOutlinedIcon /><span className='p-2'>{owner.name}</span></h4></Link>
                    <MoreHorizOutlinedIcon />
                </div>
                {/* <img src='https://wallup.net/wp-content/uploads/2016/02/18/290843-mountain-lake-forest.jpg' alt='postHere' className='p-2'></img> */}
                <img src={image.url} alt="postHere" className='p-2'/>
                <div>
                    <Typography className='p-2 text-gray-400 font-sans'>{caption}</Typography>
                    <div className='flex'>
                        {like ? <FavoriteIcon className='mx-2 text-red-600' onClick={() => {
                            setLike(!like)
                            setTotalLike(totalLike - 1);
                            dispatch(likeAndDislike(_id))
                        }} /> : <FavoriteBorderOutlinedIcon className='mx-2' onClick={() => {
                            setLike(!like)
                            setTotalLike(totalLike + 1);
                            dispatch(likeAndDislike(_id))
                        }} />}
                        <ChatBubbleOutlineOutlinedIcon className='mx-2' onClick={() => { addCommentHandler() }} />
                        <SendOutlinedIcon className='mx-2' />
                    </div>
                    {totalLike > 0 ? <Typography className='px-2 text-slate-700' variant='h7' onClick={() => showLikesHandler()}>{totalLike} likes</Typography> : null}
                    {/* <Typography className='px-2 text-gray-400 font-sans'>THis is comment</Typography> */}
                    {showAllLikes && <ShowLikes likes={likes} showLikesHandler={showLikesHandler} />}
                    {showComment && <AddComment comments={comments} _id={_id} CommentHandler={addCommentHandler} />}
                </div>

            </div>
        </div>
    )
}

export default FeedPage
