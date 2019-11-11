import React from 'react';
import { Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useStore } from "../store/useStore";

export const LogoutModal = () => {
    const {
        state: {
          user
        },
        dispatch
    } = useStore();

    if (user.loggingOut) {
        setTimeout(() => {
            dispatch({ type: "USER_CLEAR_INFORMATION"});
        }, 1500);
    }

    return (
        <Modal centered show={user.loggingOut}>
            <Modal.Header>
                <Modal.Title>Confessional</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row className="mx-0">
                    <h6>Logging you out of Confessional...</h6>
                    <FontAwesomeIcon className="ml-2" icon={faSpinner} pulse />
                </Row>
            </Modal.Body>
        </Modal>
    );
}
