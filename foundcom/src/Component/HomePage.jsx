import React, { useEffect } from 'react'
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

const HomePage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllPost());
    }, [])

    const { posts } = useSelector((state) => state?.feed)
    console.log(posts)
    return (
        <>
            <div className=' flex mx-2 bg-gray-600 '>
                <div id="LeftPortion" className=' border  w-2/12 text-white'>
                    <ul className=' mx-4 '>
                        <img src='' alt='FOUNDCOM' className=' w-32 h-20 bg-slate-400'></img>
                        <Link to='/'><li className='p-2'> <HomeOutlinedIcon /> <span>Home</span></li></Link>
                        <Link to='/' ><li className='p-2'><SearchOutlinedIcon /> <span>Search</span></li></Link>
                        <Link to='/'  ><li className='p-2'><MessageOutlinedIcon /> <span>Message</span></li></Link>
                        <Link to='/' ><li className='p-2'><AddCircleOutlineOutlinedIcon /> <span>Create</span></li></Link>
                        <Link to='/' ><li className='p-2'><AccountCircleOutlinedIcon /> <span>Profile</span></li></Link>
                        <Link to='/' ><li className='p-2'><MenuOutlinedIcon /> <span>More</span></li></Link>
                    </ul>
                </div>

                <div id="midPortion" className='mx-4 w-8/12 bg-gray-500 '>
                    {
                        posts && posts.length > 0 ? posts.map((post) => (
                            <FeedPage {...post} />
                            
                        )
                        ) : <h1> Error </h1>
                    }
                </div>

            </div>
        </>
    )
}

export default HomePage