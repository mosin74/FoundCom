import { configureStore } from "@reduxjs/toolkit";
import { postofFollowing, userReducer ,likeAndDislike} from "./Reducers/User";
// import { likeAndDislike } from "./Actions/User";
const store = configureStore({
    reducer:{
        user:userReducer,
        feed:postofFollowing,
        like:likeAndDislike
    }
});

export default store;