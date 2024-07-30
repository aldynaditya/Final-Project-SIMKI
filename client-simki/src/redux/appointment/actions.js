import {
    FETCH_APPOINTMENTS_REQUEST,
    FETCH_APPOINTMENTS_SUCCESS,
    FETCH_APPOINTMENTS_FAILURE
} from './constants';
import { getData } from '../../utils/fetch';

export const fetchAppointments = () => async (dispatch) => {
    dispatch({ type: FETCH_APPOINTMENTS_REQUEST });

    try {
        const response = await getData('/appointment');
        dispatch({
            type: FETCH_APPOINTMENTS_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_APPOINTMENTS_FAILURE,
            payload: error.message,
        });
    }
};
