import { FETCH_TRANSAKSI_REQUEST, FETCH_TRANSAKSI_SUCCESS, FETCH_TRANSAKSI_FAILURE } from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const transaksiReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRANSAKSI_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_TRANSAKSI_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_TRANSAKSI_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default transaksiReducer;
