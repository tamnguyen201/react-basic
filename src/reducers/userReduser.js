let MyState = [];
const UserReduser = (state = MyState, action) => {
    switch (action.type) {
        case 'GET_LIST_USER': {
            state = action.ListUser;
            return state;
        }
        case 'POST_USER': {
            const NewUser = [...state];
            NewUser.push(action.postUser);
            return NewUser;
        }

        default: return state;
    }
}
export default UserReduser;