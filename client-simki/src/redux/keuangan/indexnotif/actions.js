import { GET_NOTIF_REQUEST, GET_NOTIF_SUCCESS, GET_NOTIF_FAILURE } from './constants';
import { getData } from '../../../utils/fetch';

export const fetchNotif = () => async (dispatch) => {
    dispatch({ type: GET_NOTIF_REQUEST });

    try {
        const response = await getData('/cms/laporan');
        dispatch({
            type: GET_NOTIF_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: GET_NOTIF_FAILURE,
            payload: error.message,
        });
    }
};
