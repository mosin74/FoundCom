import { configureStore } from "@reduxjs/toolkit";
import { postofFollowing, userReducer } from "./Reducers/User";
const store = configureStore({
    reducer:{
        user:userReducer,
        feed:postofFollowing
    }
});

export default store;