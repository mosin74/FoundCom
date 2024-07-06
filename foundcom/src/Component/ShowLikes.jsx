import { Avatar, Typography, Button } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const ShowLikes = ({ likes , showLikesHandler}) => {


    return (
        <>
            <div>
                <div className='fixed left-0 right-0 bottom-0 top-0 bg-black opacity-30 p-0'></div>
                <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 shadow-lg rounded-lg w-4/12 h-3/6'>
                    <div className='flex justify-between'>
                        <Typography variant='h-3'>Likes</Typography>
                        <button><CloseIcon onClick={() => showLikesHandler()}  /></button>
                    </div>
                    <hr className='text-black my-2' />
                    {likes && likes.length > 0 ? likes.map((like) => (
                        <>
                        <div className='flex justify-between p-4 '>
                            <div className='flex'>
                                <Avatar src={like.avatar.public_id} />
                                <h4 className='text-lg mx-5'>{like.name}</h4>
                            </div>
                            <Button variant="contained" className=' w-8 h-6 p-4'>follow</Button>
                        </div>
                        <hr />
                        </>
                    )) : (<h1>No likes </h1>)
                    }
                </div>
            </div>
        </>
    )
}
export default ShowLikes



{/* <div>
<div className='fixed left-0 right-0 bottom-0 top-0 bg-black opacity-30 p-0'></div>
<div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 shadow-lg rounded-lg w-4/12 h-3/6'>
    <div className='flex justify-between'>
        <Typography variant='h-3'>Likes</Typography>
        <CloseIcon />
    </div>
    <hr className='text-black my-2' />
</div>
</div> */}




{/* <div className='flex justify-between p-4 '>
<div className='flex'>
    <Avatar src={like.avatar.public_id} className='text-xl' />
    <h3 className='text-xl mx-5'>{like.name}</h3>
</div>
<Button variant="contained" className=' w-8 h-6 p-4'>follow</Button>

</div> */}