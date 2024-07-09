import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FeedPage from './FeedPage'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPost } from '../Actions/User';
import logo from '../Images/logo.png'
import CreatePost from './CreatePost';

const HomePage = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadAllPost());
    }, [])

    const [createPost, setCreatePost] = useState(false);
    const addCreatePostHandler = () => {
        setCreatePost(!createPost);
    }
    console.log(createPost)
    const { posts } = useSelector((state) => state?.feed)
    return (
        <>
            <div className=' flex mx-2 bg-gray-600 '>
                <div id="LeftPortion" className=' border  w-2/12 text-white '>
                    <ul className=' mx-4 fixed '>
                        <img src={logo} alt='FOUNDCOM' className=' w-48 m-[22]]'></img>
                        <Link to='/'><li className='p-2'> <HomeOutlinedIcon /> <span>Home</span></li></Link>
                        <Link to='/' ><li className='p-2'><SearchOutlinedIcon /> <span>Search</span></li></Link>
                        <Link to='/'  ><li className='p-2'><MessageOutlinedIcon /> <span>Message</span></li></Link>
                        <Link to='/' ><li className='p-2' onClick={() => addCreatePostHandler()}><AddCircleOutlineOutlinedIcon/> <span>Create</span></li></Link>
                        <Link to='/' ><li className='p-2'><AccountCircleOutlinedIcon /> <span>Profile</span></li></Link>
                        <Link to='/' ><li className='p-2'><MenuOutlinedIcon /> <span>More</span></li></Link>
                    </ul>
                </div>

                <div id="midPortion" className='mx-4 w-8/12 bg-gray-500 '>
                    {
                        posts && posts.length > 0 ? posts.map((post) => (
                            <FeedPage {...post} key={post._id} />

                        )
                        ) : <h1> Error </h1>
                    }
                </div>
            </div>
            {createPost && <CreatePost addCreatePostHandler={addCreatePostHandler} />}
        </>
    )
}

export default HomePage
