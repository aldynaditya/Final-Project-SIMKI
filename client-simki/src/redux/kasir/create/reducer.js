import { SAVE_FACTUR_REQUEST, SAVE_FACTUR_SUCCESS, SAVE_FACTUR_FAILURE } from './constants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const facturReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_FACTUR_REQUEST:
            return { ...state, loading: true, error: null };
        case SAVE_FACTUR_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case SAVE_FACTUR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default facturReducer;
