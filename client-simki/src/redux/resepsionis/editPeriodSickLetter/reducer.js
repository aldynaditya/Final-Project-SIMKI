import {
    EDIT_PERIOD_REQUEST,
    EDIT_PERIOD_SUCCESS,
    EDIT_PERIOD_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

const editperiodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PERIOD_REQUEST:
            return { ...state, loading: true };
        case EDIT_PERIOD_SUCCESS:
            return { ...state, loading: false };
        case EDIT_PERIOD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default editperiodeReducer;
