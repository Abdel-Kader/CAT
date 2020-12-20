import axios from 'axios';
import { userLoginBegin, userLoginSuccess, userLoginFailure, userLogOutSuccess } from '../actions/loginActions';
import { setLocalStorage, clearLocalStorage } from '../utils/localStorageUtil';
import { API_URL, JWT_TOKEN, USER } from '../config/config'

export const loginService = (phone_number, password) =>{
    return (dispatch) => {
        dispatch(userLoginBegin());
        axios
            .post(API_URL + "users/login", {
                phone_number,
                password
            })
            .then((res) => {
                dispatch(userLoginSuccess(res.data));
                setLocalStorage(USER, res.data);
                setLocalStorage(JWT_TOKEN, res.data.token)
                console.log('service', res.data)
               // return res.data;
            })
            .catch(err => {
                dispatch(userLoginFailure(err.response.data.error))
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        clearLocalStorage(JWT_TOKEN);
        clearLocalStorage(USER);
        dispatch(userLogOutSuccess());
        return false;
    };
};
