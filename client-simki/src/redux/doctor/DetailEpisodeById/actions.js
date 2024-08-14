import { 
    GET_EPISODE_ID_REQUEST, 
    GET_EPISODE_ID_SUCCESS, 
    GET_EPISODE_ID_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchEpisodeById = (id) => async (dispatch) => {
    dispatch({ type: GET_EPISODE_ID_REQUEST });

    try {
        const response = await getData(`/cms/medical-record/${id}`);
        dispatch({ type: GET_EPISODE_ID_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_EPISODE_ID_FAILURE, payload: error.message });
    }
};
