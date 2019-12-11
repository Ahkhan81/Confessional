import * as jwt_decode from 'jwt-decode';

const getIsLoggedIn = () => {
    const rawAuth = localStorage.getItem('authorization');
    if (rawAuth === null || rawAuth === undefined) {
        return false;
    }
    const json = JSON.parse(rawAuth);
    if (!'isLoggedIn' in json) {
        return false;
    }
    return json.isLoggedIn;
};

export const userInitialState = {
    user: {
        isLoggedIn: getIsLoggedIn(),
        showLoggedIn: false,
        token: null,

        name: null,
        picture: null,
        displayName: null,
        type: null,
        administrator: false
    }
};

const storeLoginState = (val) => {
    let rawAuth = localStorage.getItem('authorization');
    if (rawAuth === null || rawAuth === undefined) {
        rawAuth = '{}';
        localStorage.setItem('authorization', rawAuth);
        
    }
    let storage = JSON.parse(rawAuth);
    storage.isLoggedIn = val;
    localStorage.setItem('authorization', JSON.stringify(storage));
}

export const userActions = {
    USER_LOG_IN: (state, action) => {
        storeLoginState(true);

        const token = action.user.token;
        const decoded = jwt_decode(token);
        
        return {
            user: {
                ...state.user,
                isLoggedIn: true,
                showLoggedIn: true,

                name: decoded.name,
                picture: decoded.picture,
                ...action.user
            }
        }
    },
    USER_LOG_OUT: (state, action) => {
        storeLoginState(false);

        return {
            user: {
                ...state.user,
                isLoggedIn: false,
                showLoggedIn: false
            }
        }
    }
};
