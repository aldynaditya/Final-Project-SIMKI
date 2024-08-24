import { 
    FETCH_TRANSAKSI_REQUEST, 
    FETCH_TRANSAKSI_SUCCESS, 
    FETCH_TRANSAKSI_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchTransaksi = (params) => async (dispatch) => {
    dispatch({ type: FETCH_TRANSAKSI_REQUEST });
    try {
        const response = await getData('/cms/transaction', params);
        dispatch({ type: FETCH_TRANSAKSI_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: FETCH_TRANSAKSI_FAILURE, payload: error.message });
    }
};
