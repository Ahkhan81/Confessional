import React, { useCallback } from 'react';
import { Alert, Button, Col, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useStore } from "../store/useStore";
import { sendPost } from '../util/api';

export const RegistrationModal = () => {
    const {
        state: {
            registration
        },
        dispatch
    } = useStore();

    const {
        token,
        emailAddress,
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

        sendPost(
            `users/register`,
            { displayName },
            null,
            (response) => {
                dispatch({ type: "REGIST_SET_PENDING", value: false});
                dispatch({ type: "REGIST_FAILURE", error: response.error });
            },
            (response) => {
                setTimeout(() => {
                    const user = {
                        token,
                        displayName: response.displayName
                    };
                    dispatch({ type: "USER_LOG_IN", user });
                    dispatch({ type: "REGIST_SUCCESS" });
                }, 1000)
            },
            token
        );
    }

    const failureAlert = (error &&
        <Alert variant="danger">
            {error}
        </Alert>
    );

    const registerButtonDisable =
        pending ||
        displayName.trim().length === 0;
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
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control disabled value={emailAddress} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="displayName">
                            <Form.Label>Display name</Form.Label>
                            <Form.Control
                                placeholder="Display name"
                                required
                                disabled={pending}
                                onChange={updateValue}
                            />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        size="sm"
                        variant="dark"
                        disabled={registerButtonDisable}
                        type="submit"
                        onClick={tryRegistration}
                    >
                        {registerButtonText}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
