export const userInitialState = {
    user: {
        loggedIn: false,
        loggingOut: false,
        firstName: "",
        lastName: "",
        displayName: "",
        profileImage: null
    }
};

export const userActions = {
    USER_UPDATE_INFORMATION: (state, action) => {
        return {
            user: {
                ...state.user,
                loggedIn: true,
                ...action.user
            }
        };
    },
    USER_LOGOUT: (state, action) => {
        return {
            user: {
                ...state.user,
                loggingOut: true
            }
        };
    },
    USER_CLEAR_INFORMATION: (state, action) => {
        return {
            ...userInitialState
        };
    }
};
