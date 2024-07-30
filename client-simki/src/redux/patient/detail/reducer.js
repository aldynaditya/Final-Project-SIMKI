import {
    FETCH_DETAIL_REQUEST,
    FETCH_DETAIL_SUCCESS,
    FETCH_DETAIL_FAILURE,
} from './constants';

const initialState = {
    data: {},
    loading: false,
    error: null,
};

export default function detailReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DETAIL_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
