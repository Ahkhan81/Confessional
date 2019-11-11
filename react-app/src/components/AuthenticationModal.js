import React, { useCallback } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useStore } from "../store/useStore";

export const AuthenticationModal = () => {
    const {
        state: {
            authentication
        },
        dispatch
    } = useStore();

    const {
        emailAddress,
        password,
        pending,
        error
    } = authentication;

    function hideModal() {
        if (!pending) {
            dispatch({ type: "AUTH_SHOW_MODAL", show: false });
        }
    }
    
    function resetModal() {
        dispatch({ type: "AUTH_RESET_MODAL" });
    }

    const updateValue = useCallback((event) => dispatch({ type: "AUTH_UPDATE_VALUE", [event.target.id]: event.target.value }), [dispatch]);

    function tryLogin() {
        dispatch({ type: "AUTH_SET_PENDING", value: true});
        // TODO: SEND REQUEST TO API

        // simulated wait time
        setTimeout(() => {
            // const success = Math.random() > 0.5;
            const success = true;
            // if login success
            if (success) {
                hideModal();
                const response = {
                    user: {
                        firstName: "John",
                        lastName: "Deere",
                        displayName: "AnonymousUsername",
                        profileImage: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAyADIDASIAAhEBAxEB/8QAHQAAAgEFAQEAAAAAAAAAAAAAAAgJAQIDBQYHBP/EADAQAAEDAwIFAgQGAwAAAAAAAAECAwQABREGBwgSITFRQWETFCJxCRYyQoGRUnKh/8QAGQEAAgMBAAAAAAAAAAAAAAAAAQUABAYC/8QAIxEAAQQCAgICAwAAAAAAAAAAAQACAxEEBRIxEyEGQTJhcf/aAAwDAQACEQMRAD8AgDGTTH8IP4feteInTLmp7RHiCOy4RCakqx82pJwVY/xB6de5z4pcEnCvfH9VOVwy7fO7JbU6StMVC4zUa1xGsKUG1lRaSpSle5WpRP3pLu9i/EiBj7JT7QaxmbK4SfiAo59Y/hrbs2+1zrhf9NRdPxkqI5luJKnyD3SB6e/rS6ay2tm6RujsaQUh1vPTHep3N1HZetIb1sedS6XG/wBz3Ng/ao4+Nbh8c0tHnT3o4QUZKV47daX63eyTv4y0Ex2nx6PHi5xG0i77CmFkK71QKzj0I7HxW11GwCpJSOvrWpA6/atSDYtZEiirubPmiqcx96KKCyR8JkIPKFAH9Pn2p3brxa7gXndDStj281Nd9Sm4pixPltQR4zb3zSkDnCVMgYZQf3KGQE9aT/afU8TRG5+nLxPiNT4VquUeXIjODKX223UqUk+xAPof5qXwaf2w2a1B+d5C7NZJd3ZdlwJTrCG3pIcKeUJUlOcqCyVE+KUbfMigj4yRcy4Gv0U/0WFLO/lHLwAIv+JM7Nxo65TvJOtW5OobnYY0F16M+3Y48b5hh5tRQE8z4UFJyB1x1BBrzvWW4m427jl2uE/U90k6fjfEjx1zoqSmQM5CQEpSk9MfV57Zp/dx9E7c7mCVelQ9N3t8xQ0ie2w3ILjyeoQVkZ5kg49sikw4jt1WdPy1QmWfifD+lCVn6EgdungeKq4GfDNE1kcIa4dmld2uvyMeRzpZy5n0LSxXqxTbfH+JJS22lQ9chR/itGpISkK6+DXR6sur99lLflKJUrqB6D7VzzycNp8E0/Zde1lHd+lj5gPSiqZHj/tFdIK5HVWD9qkyte7TO6PB1tuy/pVjUwYtEdAckT2Igaejlxh4BbqgSr6AcDrhQzUZqlHue9MzwFa+seqY07b3V0tqPbXXF3a1reVhIfSjDrIJ/TzoAUPdB9VUs2+N5Yg4ey02nWjyvDPxJoOFJqV7zNWDadmwwNDPWJuK78YtRpEaU3zEDmcKmlkknzilC4kbo3qLUypTY5UhGSPBzXou6uq7JtpIfbsUmPEjuJIBSvmVjwCOv90uettyY891SGSuR1JKlHHN1qjrMUtPOqtXNzlh54X0uYvsouPHPrWodVkgeKz3G5qnvcxCUjuAK+WtAOvazJRRRRRURV7KiggpJBByCO4ooqfS6b2r5Ex58/W64v8A2UTWHOaKKEfSjkUUUUVyiiiioov/2Q==`
                    }
                };
                dispatch({ type: "USER_UPDATE_INFORMATION", ...response });
            } else {
                // if login fail
                // error message would be received from api.
                const response = {
                    error: "Invalid username or password."
                };
                dispatch({ type: "AUTH_SET_PENDING", value: false});
                dispatch({ type: "AUTH_FAILURE", ...response });
            }
        }, 2500);
    }

    function showRegistration() {
        dispatch({ type: "REGIST_SHOW_MODAL", show: true });
        dispatch({ type: "AUTH_RESET_MODAL" })
    }

    const failureAlert = (error &&
        <Alert variant="danger">
            {error}
        </Alert>
    );

    const loginButtonDisable = pending || emailAddress.trim().length === 0 || password.length === 0;
    const loginButtonText = (pending ?
        <React.Fragment>
            Logging in
            <FontAwesomeIcon className="ml-1" icon={faSpinner} pulse />
        </React.Fragment>
        :
        <React.Fragment>
            Login
            <FontAwesomeIcon className="ml-1" icon={faSignInAlt} />
        </React.Fragment>
    );

    return (
        <Modal show={authentication.showModal} onHide={hideModal} onExited={resetModal}>
            <Modal.Header closeButton={!pending}>
                <Modal.Title>Login to Confessional</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    {failureAlert}

                    <Form.Group controlId="emailAddress">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email address"
                            required
                            disabled={pending}
                            onChange={updateValue} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            disabled={pending}
                            maxLength={24}
                            onChange={updateValue} />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <p className="mr-auto my-auto text-muted">Don't have an account? Click <a href="#" onClick={showRegistration}>here</a>.</p>
                    <Button
                        size="sm"
                        variant="dark"
                        disabled={loginButtonDisable}
                        type="submit"
                        onClick={tryLogin}>
                        {loginButtonText}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
