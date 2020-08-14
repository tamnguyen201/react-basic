const initialState = {
    isLoading: true,
    posts: [],
}
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL': {
            return {
                ...state,
                isLoading: false,
                posts: action.payload,
            };
        }

        case 'LOGOUT': {
            const newActiveId = action.payload.id;
            return {
                ...state,
                activeId: newActiveId,
            };
        }
    
        default:
            return state;
    }
}

export default postReducer;