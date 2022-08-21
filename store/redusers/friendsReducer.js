const defaultState = {
    friends: [
        {
            name: 'Travis Scott'
        },
        {
            name: 'Kanye West'
        },
        {
            name: 'Polo G'
        }
    ],
    royaltyContract: [
        {
            name: "you",
            royalty: 100,
        },
    ],
}

const ADD_FEAT = "ADD_FEAT";
const NEW_CONTRACT = "NEW_CONTRACT";

export const friendsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_FEAT:
            try {
                let royaltyContract = state.royaltyContract.concat(action.payload)
                let unique = Array.from(new Set(royaltyContract.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
                unique.map((item) => (item.royalty = Math.floor(100 / unique.length)))
                return {...state, royaltyContract: unique}
            } catch (e) {
                console.log(e)
            }
        case NEW_CONTRACT:
            try {
                return {...state, royaltyContract: action.payload}
            } catch (e) {
                console.log(e)
            }
        default:
            return state
    }
}

export const addFeatAction = (payload) => ({type: ADD_FEAT, payload})
export const newContractAction = (payload) => ({type: NEW_CONTRACT, payload})