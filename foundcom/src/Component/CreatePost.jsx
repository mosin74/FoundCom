import { Avatar, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../Actions/Post';




const CreatePost = ({ addCreatePostHandler }) => {


    const [image, setIsImage] = useState("")
    const [caption, setCaption] = useState("")
    const { loading } = useSelector((state) => state.Upload)
    const dispatch = useDispatch();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setIsImage(Reader.result)
                // setIsImage(Reader.result.split(',')[1])
            }

        }
        Reader.readAsDataURL(file);
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(createPostAction(image, caption))
    }
    return (
        <>
            <div className='fixed left-0 right-0 bottom-0 top-0 bg-black opacity-30 p-0'></div>
            <form className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 shadow-lg rounded-lg w-5/12 h-5/6 flex flex-col flex-shrink overflow-y-scroll' onSubmit={submitHandler}>
                <div className='flex justify-between '>
                    <Typography variant='h-3'>Creatpost</Typography>
                    <button onClick={addCreatePostHandler}><CloseIcon /></button>
                </div>
                {image && <img src={image} alt='Post'></img>}
                <input type='file' accept="image/*" className='h-3/4 w-full bg-slate-500  ' onChange={handleImageChange}></input>
                {true && <>
                    <div className='flex'>
                        <Avatar className='mr-2 my-2' />
                        <TextField id="standard-basic" label="Add caption..." variant="standard" className=' mr-2 bg-slate-300-gray w-full' value={caption} onChange={(e) => setCaption(e.target.value)} />
                    </div>
                    <div className='flex justify-center'>
                        <Button disabled={loading} type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded  w-20'>Post</Button>
                    </div>
                </>}

            </form>
        </>

    )

}

export default CreatePost
