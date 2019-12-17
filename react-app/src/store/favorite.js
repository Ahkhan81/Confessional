import { sendGet } from '../util/api';
import { useStore } from './useStore';

export const favoriteInitialState = [];

export const favoriteActions = {
    FAVORITE_UPDATE: (state, action) => {
        const { state: { user } } = useStore();

        sendGet(
            `favorites`,
            null,
            null,
            (response) => {
                // error
            },
            (response) => {
                // success
                return response;
            },
            user.token
        );
        return state;
    }
};
