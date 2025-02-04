import axios from "axios"
// import { useParams } from "react-router-dom"

export const loginUSer = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest"
        })
        //Data fatching 
        const { data } = await axios.post("/api/v1/login", { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "LoginSuccess",
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error
        })
    }
}



export const loadUser = () => async (dispatch) => {
    try {

        dispatch({
            type: "LoadUserRequest",
        })

        const { data } = await axios.get("/api/v1/myprofile", {
            headers: {
                "Content-Type": "Application/json"
            }
        })

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error
        })
    }
}

export const registerUser = (name, email, password) => async (dispatch) => {
    try {

        dispatch({
            type: "RegisterRequest"
        })

        const { data } = await axios.post('/api/v1/register', { name, email, password }, ({
            headers: {
                "Content-type": "Application/json"
            }
        }))

        dispatch({
            type: "RegisterSuccess",
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: "RegisterFailure",
            payload: error
        })
    }
}


export const loadAllPost = () => async (dispatch) => {
    try {

        dispatch({
            type: "AllPostLoadRequest",
        })

        const { data } = await axios.get('/api/v1/posts')

        dispatch({
            type: "AllPostLoadSuccess",
            payload: data.posts
        })
    } catch (error) {

        dispatch({
            type: "AllPostLoadFailure",
            payload: error
        })

    }
}

export const likeAndDislike =(params)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"LikeandDislikeRequest"
        })

        const {data}= await axios.get(`/api/v1/post/${params}`)
        dispatch({
            type:"LikeandDislikeSuccess",
            payload:data
        })
    } catch (error) {
        dispatch({
            type:"LikeandDislikeFailure",
            payload:error.response.data.message
        })
    }
}

export const allUserPostAction=(params)=> async(dispatch)=>{

    try {
        dispatch({
            type:"allUserPostRequest"
        })

        const {data}= await axios.get(`/api/v1/profile/${params}`)
        dispatch({
            type:"allUserPostSuccess",
            payload:data
        })
    } catch (error) {
        dispatch({
            type:"allUserPostFailure",
            payload:error.response.data.message
        })
    }

}