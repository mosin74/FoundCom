import axios from "axios"

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



export const loadUser=()=> async (dispatch)=>{
    try {

        dispatch({
            type:"LoadUserRequest",
        })

        const {data} = await axios.get("/api/v1/myprofile",{
            headers:{
                "Content-Type":"Application/json"
            }
        })

        dispatch({
            type:"LoadUserSuccess",
            payload:data.user
        })
        
    } catch (error) {
        dispatch({
            type:"LoadUserFailure",
            payload:error
        })
    }
}