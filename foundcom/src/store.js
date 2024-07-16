import { configureStore } from "@reduxjs/toolkit";
import { postofFollowing, userReducer ,likeAndDislike} from "./Reducers/User";
import { addComment, createPostReducer } from "./Reducers/Post";
// import AddComment from "./Component/AddComment";
// import { likeAndDislike } from "./Actions/User";
const store = configureStore({
    reducer:{
        user:userReducer,
        feed:postofFollowing,
        like:likeAndDislike,
        Comment:addComment,
        Upload:createPostReducer
    }
});

export default store;