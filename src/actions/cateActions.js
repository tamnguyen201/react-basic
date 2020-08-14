import axios from '../config';


const getAll = () => {
    return axios.get('categories');
}


const getList = () => {
    return (dispatch) => {
        axios.get('posts?page=1&limit=8&sortBy=createdAt&order=desc')
        .then(response => {
            const posts = response.data
            dispatch({
                type: 'GET_LIST',
                payload: posts
            })
        })
      .catch(error => {
        console.log(error);
      })
    }
}





function getById(id) {
    return (dispatch) => {
        axios.get('posts')
          .then(response => {
            const post = response.data
            dispatch({
                type: 'GET_POST_ID',
                payload: post
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
}



export const CateActions = {
    getAll,
    getById,
    getList
};