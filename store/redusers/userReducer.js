const defaultState = {
    userInfo: {
        paymentHistory: [
            {
                type: "signed contract",
                cost: "15$"
            },
            {
                type: "signed contract",
                cost: "15$"
            },
            {
                type: "signed contract",
                cost: "15$"
            },
        ],
        balance: 0,
    }
}

const GET_USER_INFO = 'GET_USER_INFO'

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            try {
                return {...state, userInfo: [...action.payload]}
                /* falls through */
            } catch (e) {
                console.log(e)
                /* falls through */
            }
        /* falls through */
        default:
            return state
    }
}

export const getUserInfoAction = (payload) => ({type: GET_USER_INFO, payload})