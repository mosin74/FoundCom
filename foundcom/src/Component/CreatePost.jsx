import { Avatar, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../Actions/Post';

const CreatePost = ({ addCreatePostHandler }) => {
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { loading, message, error } = useSelector((state) => state.Upload);
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result);
            }
        };
        Reader.readAsDataURL(file);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const responseMessage = await dispatch(createPostAction(image, caption));
            if (responseMessage || !loading) {
                setOpenSnackbar(true);
                setTimeout(() => {
                    if (responseMessage) addCreatePostHandler();
                }, 1500);
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <>
            {/* Overlay Background */}
            <div className='fixed inset-0 bg-black opacity-50'></div>
            
            <form 
                className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-2xl rounded-xl w-5/12 max-w-lg h-auto flex flex-col'
                onSubmit={submitHandler}
            >
                {/* Header */}
                <div className='flex justify-between items-center mb-4'>
                    <Typography variant='h5' className='font-semibold'>Create Post</Typography>
                    <button type="button" onClick={addCreatePostHandler} className='text-gray-500 hover:text-red-600'>
                        <CloseIcon />
                    </button>
                </div>

                {/* Image Preview */}
                {image && (
                    <div className='w-full h-48 flex justify-center items-center border border-gray-300 rounded-md overflow-hidden'>
                        <img src={image} alt='Post' className='max-h-48 w-auto object-contain' />
                    </div>
                )}
                
                {/* File Upload - Toggle Between Select/Change */}
                <div className='flex justify-center my-3'>
                    <Button
                        variant='outlined'
                        component='label'
                        className='border border-gray-400 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-200'
                    >
                        {image ? 'Change Image' : 'Select Image'}
                        <input 
                            type='file' 
                            accept='image/*' 
                            hidden
                            onChange={handleImageChange} 
                        />
                    </Button>
                </div>
                
                {/* Caption Input */}
                <div className='flex items-center mb-4'>
                    <Avatar className='mr-3' />
                    <TextField
                        label='Add caption...'
                        variant='outlined'
                        fullWidth
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <div className='flex justify-center'>
                    <Button 
                        disabled={loading} 
                        type='submit' 
                        className='bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300'
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </Button>
                </div>
            </form>

            {/* Snackbar for Messages & Errors */}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={error ? 'error' : 'success'}>
                    {error || message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreatePost;