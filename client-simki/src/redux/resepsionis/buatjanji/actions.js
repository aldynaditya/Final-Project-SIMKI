import { postData } from '../../../utils/fetch';
import { CREATE_APPOINTMENT_SUCCESS, CREATE_APPOINTMENT_ERROR } from './constants';

export const createAppointment = (appointmentData) => {
    return async (dispatch) => {
        try {
            const response = await postData('/cms/appointment', appointmentData);
            dispatch({
                type: CREATE_APPOINTMENT_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: CREATE_APPOINTMENT_ERROR,
                payload: error.message,
            });
        }
    };
};
