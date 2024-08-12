import {
    CREATE_ORDER_SICK_LETTER_REQUEST,
    CREATE_ORDER_SICK_LETTER_SUCCESS,
    CREATE_ORDER_SICK_LETTER_FAILURE,
} from './constants';

const initialState = {
    data: null,
    error: null,
    loading: false
};

const createorderSickLetterReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_SICK_LETTER_REQUEST:
            return { ...state, loading: true };
        case CREATE_ORDER_SICK_LETTER_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null};
        case CREATE_ORDER_SICK_LETTER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default createorderSickLetterReducer;
