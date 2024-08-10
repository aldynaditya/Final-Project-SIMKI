import { 
    ACTIVATE_ACCOUNT_REQUEST, 
    ACTIVATE_ACCOUNT_SUCCESS, 
    ACTIVATE_ACCOUNT_FAILURE 
} from './constants';
import { putData } from '../../../utils/fetch';

export const activateAccount = (form) => async (dispatch) => {
    dispatch({ type: ACTIVATE_ACCOUNT_REQUEST });

    try {
        const response = await putData('/active', form);
        dispatch({ type: ACTIVATE_ACCOUNT_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: ACTIVATE_ACCOUNT_FAILURE, payload: error.message });
    }
};
