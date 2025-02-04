import { createAction, createReducer } from "@reduxjs/toolkit";

const initialstate = { isAuthenticated: true };

const AddCommentRequest = createAction('AddCommentRequest')
const AddCommentSuccess = createAction('AddCommentSuccess')
const AddCommentFailure = createAction('AddCommentFailure')
const CreatePostRequest = createAction('CreatePostRequest')
const CreatePostSuccess = createAction('CreatePostSuccess')
const CreatePostFailure = createAction('CreatePostFailure')


export const addComment = createReducer(initialstate, builder => {
    builder
        .addCase(AddCommentRequest, (state) => {
            state.loading = true;
        })
        .addCase(AddCommentSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload
        })
        .addCase(AddCommentFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })

})

export const createPostReducer = createReducer(initialstate, builder => {
    builder
        .addCase(CreatePostRequest, (state) => {
            state.loading = true;
        })
        .addCase(CreatePostSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload
            console.log(state.message)
        })
        .addCase(CreatePostFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
})