const initialState = {
    isLoading: true,
    isLogin: false,
    idAdmin: false,
    currentUser: {
        email: '',
        password: ''
    },
}
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            localStorage.setItem('user', action.payload);
            let checkAdmin = action.payload == 'tam2012000@gmail.com' ? true : false;
            return {
                ...state,
                isAdmin: checkAdmin,
            };
        }

        case 'LOGOUT': {
            localStorage.removeItem('user');
            return {
                ...state,
                isAdmin: false,
            };
        }
    
        default:
            return state;
    }
}

export default authReducer;