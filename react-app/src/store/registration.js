import * as jwt_decode from 'jwt-decode';

export const registrationInitialState = {
    registration: {
        showModal: false,

        token: null,
        emailAddress: "",
        displayName: "",

        pending: false,
        error: "",
        success: false
    }
};

export const registrationActions = {
    REGIST_SHOW_MODAL: (state, action) => {
        const token = action.token;
        const decoded = jwt_decode(token);
        
        return {
            registration: {
                ...state.registration,
                showModal: action.show,
                token,
                emailAddress: decoded.email
            }
        };
    },
    REGIST_RESET_MODAL: (state, action) => {
        return {
            ...registrationInitialState
        };
    },
    REGIST_UPDATE_VALUE: (state, action) => {
        const { registration } = state;
        const displayName = "displayName" in action ? action.displayName : registration.displayName;
        return {
            registration: {
                ...registration,
                displayName
            }
        };
    },
    REGIST_SET_PENDING: (state, action) => {
        const { registration } = state;
        return {
            registration: {
                ...registration,
                pending: action.value
            }
        }
    },
    REGIST_FAILURE: (state, action) => {
        const { registration } = state;
        return {
            registration: {
                ...registration,
                pending: false,
                error: action.error,
                success: false
            }
        };
    },
    REGIST_SUCCESS: (state, action) => {
        const { registration } = state;
        return {
            registration: {
                ...registration,
                displayName: "",
                pending: false,
                error: "",
                success: true
            }
        };
    }
};
