import { FETCH_ANTRIAN_REQUEST, FETCH_ANTRIAN_SUCCESS, FETCH_ANTRIAN_FAILURE } from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export default function antrianReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ANTRIAN_REQUEST:
            return { ...state, loading: true };
        case FETCH_ANTRIAN_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_ANTRIAN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
