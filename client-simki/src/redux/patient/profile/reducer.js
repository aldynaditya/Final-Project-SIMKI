// src/redux/profile/reducer.js
import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE
} from './constants';

const initialState = {
    loading: false,
    profile: {},
    error: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
            return { ...state, loading: true };
        case FETCH_PROFILE_SUCCESS:
            return { ...state, profile: action.payload, loading: false };
        case FETCH_PROFILE_FAILURE:
            return { ...state, error: action.error, loading: false };
        case UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true };
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, profile: action.payload, loading: false };
        case UPDATE_PROFILE_FAILURE:
            return { ...state, error: action.error, loading: false };

        default:
            return state;
    }
};

export default profileReducer;
