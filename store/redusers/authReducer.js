const defaultState = {
    user: {},
}

const LOGIN = "LOGIN"
const ERROR = "ERROR"
const REDIRECT = "REDIRECT";

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN:
            try {
                localStorage.setItem("user", JSON.stringify(action.payload));
            } catch (e) {
                console.log(e)
                return {...state, user: {}, error: action.payload}
            }
            return {...state, user: action.payload}
        case REDIRECT:
            return {...state, redirectTo: action.payload};
        case ERROR:
            try {
                localStorage.removeItem("user");
                //return {...state, user: {}, error: action.payload}
            } catch (e) {
                console.log(e)
                action.payload=e;
            }
            return {...state, user: {}, error: action.payload}
        default:
            return state
    }
}

export const newLoginAction = (payload) => ({type: LOGIN, payload})
export const errorAction = (payload) => ({type: ERROR, payload})
export const redirectAction = link => ({type: REDIRECT, payload: link})