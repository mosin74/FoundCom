import { configureStore } from "@reduxjs/toolkit";
import { postofFollowing, userReducer ,likeAndDislike} from "./Reducers/User";
import { addComment } from "./Reducers/Post";
import AddComment from "./Component/AddComment";
// import { likeAndDislike } from "./Actions/User";
const store = configureStore({
    reducer:{
        user:userReducer,
        feed:postofFollowing,
        like:likeAndDislike,
        Comment:addComment
    }
});

export default store;