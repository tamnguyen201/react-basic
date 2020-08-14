import { combineReducers } from 'redux';
import UserReduser from './userReduser';
import authReducer from '../reducers/auth';
import PostReducer from './postReduser';
// import GetListBanner from './GetListBanner';
// import GetIDMovie from './GetIDMovie';
// import GetListUser from './GetListUser';
// import GetIdUser from './GetIdUser';
// import Comment from './Comment';
const MyReducers = combineReducers({
    UserReduser,
    // GetListBanner,
    // GetIDMovie,
    // GetListUser,
    posts: PostReducer,
    auth: authReducer,
});
export default MyReducers;