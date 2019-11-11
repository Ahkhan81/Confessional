export const authenticationInitialState = {
    authentication: {
        showModal: false,
        emailAddress: "",
        password: "",
        pending: false,
        error: ""
    }
};

export const authenticationActions = {
    AUTH_SHOW_MODAL: (state, action) => {
        return {
            authentication: {
                ...state.authentication,
                showModal: action.show
            }
        };
    },
    AUTH_RESET_MODAL: (state, action) => {
        return {
            ...authenticationInitialState
        };
    },
    AUTH_UPDATE_VALUE: (state, action) => {
        const { authentication } = state;
        const emailAddress = "emailAddress" in action ? action.emailAddress : authentication.emailAddress;
        const password = "password" in action ? action.password: authentication.password;
        return {
            authentication: {
                ...authentication,
                emailAddress,
                password
            }
        };
    },
    AUTH_SET_PENDING: (state, action) => {
        const { authentication } = state;
        return {
            authentication: {
                ...authentication,
                pending: action.value
            }
        };
    },
    AUTH_FAILURE: (state, action) => {
        const { authentication } = state;
        return {
            authentication: {
                ...authentication,
                pending: false,
                error: action.error
            }
        };
    }
};
