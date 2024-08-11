import {
    CREATE_VITAL_REQUEST,
    CREATE_VITAL_SUCCESS,
    CREATE_VITAL_FAILURE,
} from './constants';

const initialState = {
    loading: false,
    error: null,
    vital: [],
};

const createvitalReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_VITAL_REQUEST:
            return { ...state, loading: true };
        case CREATE_VITAL_SUCCESS:
            return { ...state, loading: false, vital: 'success', error: null};
        case CREATE_VITAL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default createvitalReducer;
