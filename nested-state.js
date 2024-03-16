const { createStore } = require('redux');
const produce = require('immer').produce;


const initialState = {
    name: 'Horatio',
    age: 11,
    address: {
        street: 'Discovery Bay Road',
        city: 'Hong Kong',
        country: 'China'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }

            // produce is an immer function that takes the current state and a function that mutates the state and returns the next state.
            // The function that mutates the state is called a draft function.
            // It simplifies the process of updating the state by allowing us to write code that looks like we are directly mutating the state.
            return produce(state, draftState =>
            {
                draftState.address.street = action.payload;
            })
        default:
            return state;
    }
}

const store = createStore(reducer);
console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()));
store.dispatch(updateStreet('Egerton Road'));
unsubscribe();
