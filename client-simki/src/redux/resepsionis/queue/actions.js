import { 
    FETCH_APPOINTMENT_REQUEST, 
    FETCH_APPOINTMENT_SUCCESS, 
    FETCH_APPOINTMENT_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchAppointment = () => async (dispatch) => {
    dispatch({ type: FETCH_APPOINTMENT_REQUEST });
    try {
        const response = await getData('/cms/appointment');
        dispatch({ type: FETCH_APPOINTMENT_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: FETCH_APPOINTMENT_FAILURE, payload: error.message });
    }
};
