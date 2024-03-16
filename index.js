const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

// Action is a plain JavaScript object that has a type field
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

// Action creator is used to create action instead of creating action object directly and passing it to dispatch method
const orderCake = () =>
{
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

const restockCake = (qty = 1) =>
{
    return {
        type: "CAKE_RESTOCKED",
        payload: qty
    }
}

const orderIceCream = (quantity = 1) =>
{
    return {
        type: ICECREAM_ORDERED,
        payload: quantity
    }
}

const restockIceCream = (quantity = 1) =>
{
    return {
        type: ICECREAM_RESTOCKED,
        payload: quantity
    }
}

// Initial state of the application
// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

// Reducer is a function that accepts state and action as arguments and returns the next state of the application
const cakeReducer = (state = initialCakeState, action) =>
{
    switch(action.type)
    {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.payload
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state;
    }
};

const iceCreamReducer = (state = initialIceCreamState, action) =>
{
    switch(action.type)
    {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - action.payload
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

// Store is an object that holds the application state and provides a few helper methods to access the state, dispatch actions and register listeners
const store = createStore(rootReducer, applyMiddleware(logger));

console.log('Initial state', store.getState());

// Subscribe method is used to listen to the changes in the state
// It returns a function that can be used to unsubscribe the listener

// Don't need to log the state changes to the console because we are using redux-logger middleware
//const unsubscribe =  store.subscribe(() => console.log('Updated state', store.getState()));
const unsubscribe = store.subscribe(() => {});

// Dispatch method is used to dispatch an action
// It is the only way to trigger a state change

//store.dispatch(orderCake());
//store.dispatch(orderCake());
//store.dispatch(orderCake());
//store.dispatch(restockCake(3));

// bindActionCreators is used to bind action creators to dispatch method
// It accepts an object containing action creators and dispatch method as arguments
// It returns an object containing the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly
const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2)

unsubscribe();



