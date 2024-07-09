import { createAction, createReducer } from "@reduxjs/toolkit";

const AddCommentRequest = createAction('AddCommentRequest')
const AddCommentSuccess = createAction('AddCommentSuccess')
const AddCommentFailure = createAction('AddCommentFailure')
const initialstate = {}
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