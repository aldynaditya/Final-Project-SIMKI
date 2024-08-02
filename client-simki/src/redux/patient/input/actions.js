import { 
    GET_SCHEDULES_SUCCESS, 
    GET_SCHEDULES_ERROR 
} from './constants';
import { getData } from '../../../utils/fetch';

export const getSchedules = () => async (dispatch) => {
    try {
        const response = await getData('/cms/schedule');
        dispatch({ 
            type: GET_SCHEDULES_SUCCESS, 
            payload: response.data.data 
        });
    } catch (error) {
        dispatch({ 
            type: GET_SCHEDULES_ERROR, 
            payload: error.message 
        });
    }
};
