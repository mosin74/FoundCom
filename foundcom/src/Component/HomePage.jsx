// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import FeedPage from './FeedPage'
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadAllPost } from '../Actions/User';
// import logo from '../Images/logo.png'
// import CreatePost from './CreatePost';

// const HomePage = () => {

//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(loadAllPost());
//     }, [])

//     const [createPost, setCreatePost] = useState(false);
//     const addCreatePostHandler = () => {
//         setCreatePost(!createPost);
//     }
//     console.log(createPost)
//     const { posts } = useSelector((state) => state?.feed)
//     return (
//         <>
//             <div className=' flex mx-2 bg-gray-600 '>
//                 <div id="LeftPortion" className=' border  w-2/12 text-white '>
//                     <ul className=' mx-4 fixed '>
//                         <img src={logo} alt='FOUNDCOM' className=' w-48 m-[22]]'></img>
//                         <Link to='/'><li className='p-2'> <HomeOutlinedIcon /> <span>Home</span></li></Link>
//                         <Link to='/' ><li className='p-2'><SearchOutlinedIcon /> <span>Search</span></li></Link>
//                         <Link to='/'  ><li className='p-2'><MessageOutlinedIcon /> <span>Message</span></li></Link>
//                         <Link to='/' ><li className='p-2' onClick={() => addCreatePostHandler()}><AddCircleOutlineOutlinedIcon/> <span>Create</span></li></Link>
//                         <Link to='/' ><li className='p-2'><AccountCircleOutlinedIcon /> <span>Profile</span></li></Link>
//                         <Link to='/' ><li className='p-2'><MenuOutlinedIcon /> <span>More</span></li></Link>
//                     </ul>
//                 </div>

//                 <div id="midPortion" className='mx-4 w-8/12 bg-gray-500 '>
//                     {
//                         posts && posts.length > 0 ? posts.map((post) => (
//                             <FeedPage {...post} key={post._id} />

//                         )
//                         ) : <h1> Error </h1>
//                     }
//                 </div>
//             </div>
//             {createPost && <CreatePost addCreatePostHandler={addCreatePostHandler} />}
//         </>
//     )
// }

// export default HomePage


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import FeedPage from './FeedPage';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadAllPost } from '../Actions/User';
// import logo from '../Images/logo.png';
// import CreatePost from './CreatePost';

// const HomePage = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(loadAllPost());
//     }, [dispatch]);

//     const [createPost, setCreatePost] = useState(false);
//     const addCreatePostHandler = () => {
//         setCreatePost(!createPost);
//     };

//     const { posts } = useSelector((state) => state?.feed);
    
//     return (
//         <>
//             <div className='flex flex-col md:flex-row mx-2 bg-gray-600 min-h-screen'>
//                 <div id="LeftPortion" className='border-r border-gray-700 w-full md:w-1/4 text-white p-4'>
//                     <img src={logo} alt='FOUNDCOM' className='w-48 mb-4 mx-auto' />
//                     <ul className='space-y-2'>
//                         <Link to='/'><li className='flex items-center p-2 hover:bg-gray-700 rounded'><HomeOutlinedIcon /><span className='ml-2'>Home</span></li></Link>
//                         <Link to='/'><li className='flex items-center p-2 hover:bg-gray-700 rounded'><SearchOutlinedIcon /><span className='ml-2'>Search</span></li></Link>
//                         <Link to='/'><li className='flex items-center p-2 hover:bg-gray-700 rounded'><MessageOutlinedIcon /><span className='ml-2'>Message</span></li></Link>
//                         <Link to='/'><li className='flex items-center p-2 hover:bg-gray-700 rounded' onClick={addCreatePostHandler}><AddCircleOutlineOutlinedIcon /><span className='ml-2'>Create</span></li></Link>
//                         <Link to='/'><li className='flex items-center p-2 hover:bg-gray-700 rounded'><AccountCircleOutlinedIcon /><span className='ml-2'>Profile</span></li></Link>
//                         <Link to='/'><li className='flex items-center p-2 hover:bg-gray-700 rounded'><MenuOutlinedIcon /><span className='ml-2'>More</span></li></Link>
//                     </ul>
//                 </div>

//                 <div id="midPortion" className='mx-4 w-full md:w-3/4 bg-gray-500 p-4'>
//                     {
//                         posts && posts.length > 0 ? posts.map((post) => (
//                             <FeedPage {...post} key={post._id} />
//                         )) : <h1 className='text-white'>Error</h1>
//                     }
//                 </div>
//             </div>
//             {createPost && <CreatePost addCreatePostHandler={addCreatePostHandler} />}
//         </>
//     );
// }

// export default HomePage;


import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import FeedPage from './FeedPage';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPost } from '../Actions/User';
import logo from '../Images/logo.png';
import CreatePost from './CreatePost';

const HomePage = () => {

    const { successMessage, errorMessage } = useSelector((state) => state.Upload)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadAllPost());
    }, [dispatch]);

    const [createPost, setCreatePost] = useState(false);
    const addCreatePostHandler = () => {
        console.log("Toggle Create Post Modal"); // Debugging log
        setCreatePost(!createPost);
    };

    const { posts } = useSelector((state) => state?.feed);
      const {user}=useSelector((state)=>state.user)
        const logedInUser=user?._id
    
    return (
        <>
            <div className='flex flex-col md:flex-row mx-2 bg-gray-600 min-h-screen'>
                <div id="LeftPortion" className='border-r border-gray-700 w-full md:w-1/4 text-white p-4'>
                    <img src={logo} alt='FOUNDCOM' className='w-48 mb-4 mx-auto' />
                    <ul className='space-y-2'>
                        <Link to='/'><li className='flex items-center p-2 hover:bg-gray-700 rounded'><HomeOutlinedIcon /><span className='ml-2'>Home</span></li></Link>
                        <Link to='/'><li className='flex items-center p-2 hover:bg-gray-700 rounded'><SearchOutlinedIcon /><span className='ml-2'>Search</span></li></Link>
                        <Link to='/'><li className='flex items-center p-2 hover:bg-gray-700 rounded'><MessageOutlinedIcon /><span className='ml-2'>Message</span></li></Link>
                        <Link to='/'><li className='flex items-center p-2 hover:bg-gray-700 rounded' onClick={addCreatePostHandler}><AddCircleOutlineOutlinedIcon /><span className='ml-2'>Create</span></li></Link>
                        <Link to={`/profile/${logedInUser}`}><li className='flex items-center p-2 hover:bg-gray-700 rounded'><AccountCircleOutlinedIcon /><span className='ml-2'>Profile</span></li></Link>
                        <Link to='/'><li className='flex items-center p-2 hover:bg-gray-700 rounded'><MenuOutlinedIcon /><span className='ml-2'>More</span></li></Link>
                    </ul>
                </div>

                <div id="midPortion" className='mx-4 w-full md:w-3/4 bg-gray-500 p-4'>
                    {
                        posts && posts.length > 0 ? posts.map((post) => (
                            <FeedPage {...post} key={post._id} />
                        )) : <h1 className='text-white'>No posts available</h1>
                    }
                </div>
            </div>
            {createPost && <CreatePost addCreatePostHandler={addCreatePostHandler} />}
            {successMessage && (
                <Typography variant='body2' className='text-green-500 text-center mt-2'>
                    {successMessage}
                </Typography>
            )}
            {errorMessage && (
                <Typography variant='body2' className='text-red-500 text-center mt-2'>
                    {errorMessage}
                </Typography>
            )}
        </>
    );
}

export default HomePage;