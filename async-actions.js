const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const {thunk} = require('redux-thunk')
const axios = require('axios');
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const middleware = [thunk, logger]

const initialState = {
    loading: false,
    users : [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

// This is an action creator that returns an action object
const fetchUsersRequested = () =>
{
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUsersSucceeded = (users) =>
{
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}

const fetchUsersFailed = (error) =>
{
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state;
    }
}

// This is an action creator that returns a function instead of an action object
const fetchUsers = () =>
{
    return function(dispatch) {
        dispatch(fetchUsersRequested());
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            const users = response.data.map(user => user.id);
            dispatch(fetchUsersSucceeded(users));
        }).catch(error => {
            dispatch(fetchUsersFailed(error.message));
        })
    }
}

const store = createStore(reducer, applyMiddleware(...middleware));

const unsubscribe = store.subscribe(() => {});

store.dispatch(fetchUsers());

unsubscribe();
