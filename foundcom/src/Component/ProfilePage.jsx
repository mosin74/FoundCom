import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { allUserPost } from '../Reducers/User'
import { allUserPostAction } from '../Actions/User'

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(() => {
        if (id) {
            console.log(id)
            dispatch(allUserPostAction(id));
        }
    }, [dispatch]);


    const { posts } = useSelector((state) => state?.profilePost)
    const {user}=useSelector((state)=>state.user)
    const logedInUser=user?._id
    return (
        <>
            <div className=' flex mx-2 bg-gray-600  h-max '>
                <div id="LeftPortion" className=' border-x-0  w-2/12  bg-black '>
                </div>
                <div id="midPortion" className='mx-10 mt-10 w-10/12  text-white '>
                    <div className='flex-col'>
                        <div className='flex px-14 pt-1 my-10 mx-20'>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 160, height: 160 }}
                            />
                            <div className='flex m-auto items-center flex-col'>

                                <div className='flex m-auto items-center'>
                                    <h1 className='text-lg mr-4 font-mono'>Username</h1>
                                    {logedInUser==id && (<button className='mr-4 bg-gray-700 p-2 rounded-xl'>Edit Profile</button>)}
                                    {logedInUser==id && (<button className='mr-4 bg-gray-700 p-2 rounded-xl'>View Archive</button>)}
                                </div>
                                <div className='flex px-4 pt-4 m-auto items-center'>
                                    <h1 className='mr-4  font-light text-sm'>20 Post</h1>
                                    <h1 className='mr-4  font-light text-sm'>100 Follwers</h1>
                                    <h1 className='mr-4  font-light text-sm'>200 Following</h1>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h1 className='text-center my-2 font-mono text-lg'>Post </h1>
                        <div className='flex flex-wrap'>

                            {posts?.map((post, index) => (
                                <div key={index} className='w-1/5 p-1'>
                                    <div className='relative overflow-hidden'>
                                        <img
                                            className='object-cover w-full h-72'
                                            src={post?.image?.url}
                                            alt={`Post ${index}`}
                                        />
                                        <div className='absolute inset-0 bg-black opacity-0 hover:opacity-75 flex items-center justify-center'>
                                            <p className='text-white text-lg'>Post {index + 1}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfilePage

