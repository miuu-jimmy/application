const defaultState = {
    steps: [
        {
            id: '01',
            name: 'Upload music',
            href: '',
            status: 'current'
        },
        {
            id: '02',
            name: 'Choose contract',
            href: '',
            status: 'upcoming'
        },
        {
            id: '03',
            name: 'Choose royalty',
            href: '',
            status: 'upcoming'
        },
        {
            id: '04',
            name: 'profile',
            href: '',
            status: 'upcoming'
        },
    ]
}

const NEW_STEPS = "NEW_STEPS"

export const stepsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case NEW_STEPS:
            try {
                return {...state, steps: [...action.payload]}
            } catch (e) {
                console.log(e)
            }
        default:
            return state
    }
}

export const newStepsAction = (payload) => ({type: NEW_STEPS, payload})