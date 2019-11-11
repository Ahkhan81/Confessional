import React, { useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faSignInAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useStore } from "../store/useStore";

export const RegistrationCompleteModal = () => {
    const {
        state: {
            registration
        },
        dispatch
    } = useStore();

    const { success } = registration;

    function hideModal() {
        dispatch({ type: "REGIST_RESET_MODAL" });
    }
    
    function showLoginModal() {
        dispatch({ type: "AUTH_SHOW_MODAL", show: true });
        dispatch({ type: "REGIST_RESET_MODAL" });
    }
    
    return (
        <Modal centered show={registration.showModal && success} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Register to Confessional</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h6>You have successfully registered to Confessional. You may now login.</h6>
            </Modal.Body>
                
            <Modal.Footer>
                <Button
                    size="sm"
                    variant="dark"
                    onClick={showLoginModal}>
                    Login
                    <FontAwesomeIcon className="ml-1" icon={faSignInAlt} />
                </Button>
            </Modal.Footer>
        </Modal>
    );
}