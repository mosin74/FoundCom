import React, { useState } from 'react'

import { TextField, Typography, Avatar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { addCommentAction } from '../Actions/Post';

const AddComment = ({ comments, _id, CommentHandler }) => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const addCommentHandler = (e) => {
        // e.preventDefault();
        dispatch(addCommentAction(comment, _id))
        // console.log(_id)
        // console.log(comment)
    }
    // console.log(comments)
    return (
        <>

            <div className='fixed left-0 right-0 bottom-0 top-0 bg-black opacity-30 p-0'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 shadow-lg rounded-lg w-5/12 h-5/6  overflow-y-scroll'>
                <div className='flex justify-between'>
                    <Typography variant='h-3'>Comments</Typography>
                    <button onClick={CommentHandler}><CloseIcon /></button>
                </div>
                <hr />
                <form className=' py-6 flex' onSubmit={addCommentHandler}>
                    <Avatar className='mr-2 my-2 size-1' />
                    <TextField id="standard-basic" label="AddComment" variant="standard" className='w-4/5 h-2/5 mr-2 ' required value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button type='submit' className=' w-12 h-8 m-4 py-1 bg-blue-500 text-white rounded-sm'>Add</button>


                </form>
                <Typography className='text-gray-400 px-4 font-light text-xs'> All Comments</Typography>
                {comments && comments.length > 0 ? comments.map((comment) => (
                    <>
                        <div className='flex justify-between p-4 '>
                            <div className='flex'>
                                <Avatar className='text-xs' src={comment.user.avatar.public_id} />
                                <div>
                                    <h4 className='text-sm mx-5 text-gray-700'>{comment.user.name}</h4>
                                    <p className='mx-5  text-gray-600'>{comment.comment}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </>
                )) : (<h1>No likes </h1>)
                }
            </div>
        </>
    )
}

export default AddComment
