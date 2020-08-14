import axios from '../config';



const login = user => {
    return {
        type: 'LOGIN',
        payload: user
    }
    // return axios.get(`users/1`)
    //     .then(res=>console.log(res.data))
    //     .then(user => {
            //localStorage.setItem('user', JSON.stringify(username, password));
        //     return user;
        // });
}

const logout = () => {
    localStorage.removeItem('user');
}



function getById(id) {

    return axios.get(`users/${id}`).then(res=>console.log(res.data));
}

function register(user) {
    return axios.post(`users/register`, JSON.stringify(user)).then(res=>console.log(res.data));
}

export const userActions = {
    login,
    logout,
    register,
    getById
};