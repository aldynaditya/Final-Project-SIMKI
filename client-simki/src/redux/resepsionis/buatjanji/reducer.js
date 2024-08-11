import { CREATE_APPOINTMENT_SUCCESS, CREATE_APPOINTMENT_ERROR } from './constants';

const initialState = {
    appointment: null,
    error: null,
};

const buatJanjiReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                appointment: action.payload,
                error: null,
            };
        case CREATE_APPOINTMENT_ERROR:
            return {
                ...state,
                appointment: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default buatJanjiReducer;
