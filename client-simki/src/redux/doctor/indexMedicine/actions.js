import { 
    GET_INDEX_OBAT_REQUEST, 
    GET_INDEX_OBAT_SUCCESS, 
    GET_INDEX_OBAT_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchOrderObat = (id) => async (dispatch) => {
    dispatch({ type: GET_INDEX_OBAT_REQUEST });

    try {
        const response = await getData(`/cms/order-obat/${id}`);
        dispatch({ type: GET_INDEX_OBAT_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_INDEX_OBAT_FAILURE, payload: error.message });
    }
};
