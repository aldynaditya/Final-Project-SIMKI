import { UPDATE_STATUS_REQUEST, UPDATE_STATUS_SUCCESS, UPDATE_STATUS_FAILURE } from './constants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const updateStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case UPDATE_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default updateStatusReducer;
