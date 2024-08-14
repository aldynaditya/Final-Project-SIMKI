import {
    UPDATE_ACTION_REQUEST,
    UPDATE_ACTION_SUCCESS,
    UPDATE_ACTION_FAILURE,
} from './constants';

const initialState = {
    data: null,
    error: null,
    loading: false
};

const updateactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ACTION_REQUEST:
            return { ...state, loading: true };
        case UPDATE_ACTION_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null};
        case UPDATE_ACTION_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default updateactionReducer;
