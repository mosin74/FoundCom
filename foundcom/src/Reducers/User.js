import { createAction, createReducer } from "@reduxjs/toolkit";
const initialstate = {
    isAuthenticated: false
};

const LoginRequest = createAction('LoginRequest')
const LoginSuccess = createAction('LoginSuccess')
const LoginFailure = createAction('LoginFailure')
const RegisterRequest = createAction('RegisterRequest')
const RegisterSuccess = createAction('RegisterSuccess')
const RegisterFailure = createAction('RegisterFailure')
const LoadUserRequest = createAction('LoadUserRequest')
const LoadUserSuccess = createAction('LoadUserSuccess')
const LoadUserFailure = createAction('LoadUserFailure')
const AllPostLoadRequest=createAction('AllPostLoadRequest')
const AllPostLoadSuccess=createAction('AllPostLoadSuccess')
const AllPostLoadFailure=createAction('AllPostLoadFailure')
const LikeandDislikeRequest = createAction('LikeandDislikeRequest ')
const LikeandDislikeSuccess = createAction('LikeandDislikeSuccess ')
const LikeandDislikeFailure = createAction('LikeandDislikeFailure ')
const allUserPostRequest = createAction('allUserPostRequest')
const allUserPostSuccess = createAction('allUserPostSuccess')
const allUserPostFailure = createAction('allUserPostFailure')



export const userReducer = createReducer(initialstate, builder => {
    builder
        .addCase(LoginRequest, (state) => {
            state.loading = true;
        })

        .addCase(LoginSuccess, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated= true


        })

        .addCase(LoginFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload
            state.isAuthenticated= false

        })

        .addCase(RegisterRequest, (state) => {
            state.loading = true;
        })

        .addCase(RegisterSuccess, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })

        .addCase(RegisterFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })


        //Impelement later 

        .addCase(LoadUserRequest, (state) => {
            state.loading = true;
        })
        .addCase(LoadUserSuccess, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated= true

        })

        .addCase(LoadUserFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload
            state.isAuthenticated= false

        })

})

export const postofFollowing=createReducer( initialstate , builder=>{
    builder
    .addCase(AllPostLoadRequest ,(state)=>{
        state.loading=true
    })
    .addCase(AllPostLoadSuccess ,(state,action)=>{
        state.loading=false;
        state.posts=action.payload
    })
    .addCase(AllPostLoadFailure,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })
})


export const likeAndDislike =createReducer(initialstate , builder=>{
    builder
    .addCase(LikeandDislikeRequest ,(state)=>{
        state.loading=true;
    })
    .addCase(LikeandDislikeSuccess ,(state,action)=>{
        state.loading=false;
        state.message=action.payload
    })
    .addCase(LikeandDislikeFailure ,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })
})

export const allUserPost =createReducer(initialstate , builder=>{
    builder
    .addCase(allUserPostRequest ,(state)=>{
        state.loading=true;
    })
    .addCase(allUserPostSuccess ,(state,action)=>{
        state.loading=false;
        state.posts=action.payload
    })    
    .addCase(allUserPostFailure ,(state,action)=>{
        state.loading=false;
        state.error=action.payload

    })

})