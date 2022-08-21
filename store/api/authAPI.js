import axios from "axios";
import {errorAction, newLoginAction, redirectAction} from "../redusers/authReducer";


function login(email, password) {
    return async function (dispatch) {
        try {
            await axios.post('/api/login', {email: email, password: password})
                .then((res) => {
                    console.log(res.data.result.user)
                    dispatch(newLoginAction(res.data.result.user))
                }).catch(function(error) { console.log(error); dispatch(errorAction(error))});
                //dispatch(redirectAction('/upload-music'))
        } catch (error) {
            console.log(error)
            dispatch(errorAction(error))
        }
    };
}

function register(email, password) {
    return async function (dispatch) {
        try {
            await axios.post('/api/register', {email: email, password: password})
                .then((res) => {
                    //console.log(data.data)
                    dispatch(newLoginAction(res.data.result.user))
                    dispatch(redirectAction('/payments'))
                });
        } catch (error) {
            if (error.response.data === "User Already Exist. Please Login") {
                console.log(123)
                await dispatch(login(email, password))
            } else
                dispatch(errorAction(error.response.data))
        }
    };
}

export {login, register}