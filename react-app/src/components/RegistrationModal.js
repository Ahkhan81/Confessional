import React, { useCallback } from 'react';
import { Alert, Button, Col, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faSignInAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useStore } from "../store/useStore";

export const RegistrationModal = () => {
    const {
        state: {
            registration
        },
        dispatch
    } = useStore();

    const {
        emailAddress,
        password,
        confirmPassword,
        firstName,
        lastName,
        displayName,
        pending,
        error,
        success
    } = registration;

    function hideModal() {
        if (!pending) {
            dispatch({ type: "REGIST_SHOW_MODAL", show: false });
        }
    }

    function resetModal() {
        if (!success) {
            dispatch({ type: "REGIST_RESET_MODAL" });
        }
    }

    const updateValue = useCallback((event) => dispatch({ type: "REGIST_UPDATE_VALUE", [event.target.id]: event.target.value }), [dispatch]);

    function tryRegistration() {
        dispatch({ type: "REGIST_SET_PENDING", value: true});
        // TODO: SEND REGISTRATION REQUEST TO API

        // simulated wait time
        setTimeout(() => {
            // const success = Math.random() > 0.5;
            const success = true;
            // if registration success
            if (success) {
                const response = {
                    success: true
                }
                dispatch({ type: "REGIST_SUCCESS", ...response });
            } else {
                // if registration fail
                // error message would be received from api.
                const response = {
                    error: "This username is already taken."
                };
                dispatch({ type: "REGIST_SET_PENDING", value: false});
                dispatch({ type: "REGIST_FAILURE", ...response });
            }
        }, 2500);
    }

    const failureAlert = (error &&
        <Alert variant="danger">
            {error}
        </Alert>
    );

    const registerButtonDisable =
        pending ||
        emailAddress.trim().length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0 ||
        firstName.trim().length === 0 ||
        lastName.trim().length === 0 ||
        displayName.trim().length === 0 ||
        password !== confirmPassword;
    const registerButtonText = (pending ?
        <React.Fragment>
            Registering
            <FontAwesomeIcon className="ml-1" icon={faSpinner} pulse />
        </React.Fragment>
        :
        <React.Fragment>
            Register
            <FontAwesomeIcon className="ml-1" icon={faClipboard} />
        </React.Fragment>
    );

    return (
        <Modal size="lg" show={registration.showModal && !success} onHide={hideModal} onExited={resetModal}>
            <Modal.Header closeButton={!pending}>
                <Modal.Title>Register to Confessional</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    {failureAlert}

                    <Form.Row>
                        <Form.Group as={Col} controlId="emailAddress">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email address"
                                required
                                disabled={pending}
                                onChange={updateValue} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                disabled={pending}
                                maxLength={24}
                                onChange={updateValue} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="confirmPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                required
                                disabled={pending}
                                maxLength={24}
                                onChange={updateValue} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                placeholder="First name"
                                required
                                disabled={pending}
                                onChange={updateValue} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                placeholder="Last name"
                                required
                                disabled={pending}
                                onChange={updateValue} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="displayName">
                            <Form.Label>Display name</Form.Label>
                            <Form.Control
                                placeholder="Display name"
                                required
                                disabled={pending}
                                onChange={updateValue} />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        size="sm"
                        variant="dark"
                        disabled={registerButtonDisable}
                        type="submit"
                        onClick={tryRegistration}>
                        {registerButtonText}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
