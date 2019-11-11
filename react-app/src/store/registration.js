export const registrationInitialState = {
    registration: {
        showModal: false,
        emailAddress: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        displayName: "",
        pending: false,
        error: "",
        success: false
    }
};

export const registrationActions = {
    REGIST_SHOW_MODAL: (state, action) => {
        return {
            registration: {
                ...state.registration,
                showModal: action.show
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
        const emailAddress = "emailAddress" in action ? action.emailAddress : registration.emailAddress;
        const password = "password" in action ? action.password : registration.password;
        const confirmPassword = "confirmPassword" in action ? action.confirmPassword : registration.confirmPassword;
        const firstName = "firstName" in action ? action.firstName : registration.firstName;
        const lastName = "lastName" in action ? action.lastName : registration.lastName;
        const displayName = "displayName" in action ? action.displayName : registration.displayName;
        return {
            registration: {
                ...registration,
                emailAddress,
                password,
                confirmPassword,
                firstName,
                lastName,
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
                pending: false,
                error: "",
                success: action.success
            }
        };
    }
};
