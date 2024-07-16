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



export const createPostAction = (image, caption) => async (dispatch) => {
    try {
        dispatch({
            type: 'CreatePostRequest',
        });

        if (!image) {
            dispatch({
                type: 'CreatePostFailure',
                payload: 'No image provided',
            });
            return;
        }

        const base64String = image.split(',')[1];
        // console.log("base64String")
        const response = await axios.post('/api/v1/post/upload', { image: base64String, caption }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response.data.message);

        dispatch({
            type: 'CreatePostSuccess',
            payload: response.data.message
        });

    } catch (error) {
        console.error('Error uploading post:', error.message);

        dispatch({
            type: 'CreatePostFailure',
            payload: error.response?.data?.message || error.message,
        });
    }
};