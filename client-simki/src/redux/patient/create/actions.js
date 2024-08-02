import {
    CREATE_APPOINTMENT_REQUEST,
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';

export const createAppointment = (formData) => async (dispatch) => {
    dispatch({ type: CREATE_APPOINTMENT_REQUEST });

    try {
        const response = await postData('/appointment', formData);
        dispatch({ type: CREATE_APPOINTMENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_APPOINTMENT_FAILURE, payload: error });
    }
};
