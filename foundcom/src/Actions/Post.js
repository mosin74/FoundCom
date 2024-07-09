import axios from "axios"

export const addCommentAction = (comment, params) => async (dispatch) => {
    try {
        dispatch({
            type: "AddCommentRequest"
        })

        const { data } = await axios.put(`/api/v1/posts/comment/${params}`, { comment }, ({
            headers: {
                'Content-Type': 'Application/json'
            }
        }))

        dispatch({

            type: 'AddCommentSuccess',
            payload: data.message
        })

    } catch (error) {

        dispatch({
            type: 'AddCommentSuccess',
            payload: error
        })
    }
}