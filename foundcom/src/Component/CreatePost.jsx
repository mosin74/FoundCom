import { Avatar, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const CreatePost = ({addCreatePostHandler}) => {

    const [isPhoto, setIsPhoto] = useState(true)
    return (
        <>
            <div className='fixed left-0 right-0 bottom-0 top-0 bg-black opacity-30 p-0'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 shadow-lg rounded-lg w-5/12 h-5/6 flex flex-col flex-shrink overflow-y-scroll'>
                <div className='flex justify-between '>
                    <Typography variant='h-3'>Creatpost</Typography>
                    <button onClick={addCreatePostHandler}><CloseIcon /></button>
                </div>
                <input type='file' className=' mt-4 h-3/4 w-full bg-slate-500  '></input>
                {true && <>
                    <div className='flex'>
                        <Avatar className='mr-2 my-2' />
                        <TextField id="standard-basic" label="Add caption..." variant="standard" className=' mr-2 bg-slate-300-gray w-full' />
                    </div>
                    <div className='flex justify-center'>
                        <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded  w-20'>Post</Button>
                    </div>
                </>}

            </div>
        </>

    )

}

export default CreatePost
