import React, { useState } from 'react';
import { Button, FormControl, Image, InputGroup, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useStore } from "../store/useStore";
import { sendGet } from '../util/api';

export const NavigationBar = () => {
    
    const {
        state: {
            user
        },
        dispatch
    } = useStore();

    const { showLoggedIn } = user;

    const [disableLogin, setDisableLogin] = useState(user.isLoggedIn);

    const onLoginSuccess = (response) => {
        const token = response.Zi.id_token;

        sendGet(
            `users/validate`,
            { token },
            null,
            (response) => {
                setDisableLogin(false);
                alert("Failed to log in.");
            },
            (response) => {
                setDisableLogin(false);
                if (response.exists) {
                    const { administrator, displayName, type } = response.user;
                    const data = {
                        user: {
                            token,
                            displayName,
                            administrator,
                            type
                        }
                    };
                    dispatch({ type: "USER_LOG_IN", ...data });
                } else {
                    if (response.message === "EMAIL_DISALLOWED") {
                        alert("Only @smcm.edu emails are allowed.");
                    } else if (response.message === "NOT_REGISTERED") {
                        dispatch({ type: "REGIST_SHOW_MODAL", show: true, token })
                    }
                }
            }
        );
    };

    const onLoginFailure = (response) => {
        // setShowLoggedIn(false);
    };

    const onLogoutSuccess = () => {
        // setShowLoggedIn(false);
        dispatch({ type: "USER_LOG_OUT" });
    };

    let accountInfo;
    if (!showLoggedIn) {
        accountInfo = (
            <GoogleLogin
                clientId="36893320136-ssp84asi1l6aif9j279tpmuo98dk1ora.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={user.isLoggedIn}
                disabled={disableLogin}
            />
        );
    } else {
        const userInfoContent = (
            <>
                <Image
                    className="pr-2" 
                    src={user.picture} 
                    style={{width: "100%"}, {maxWidth: '50px'}}
                    roundedCircle />
                <strong>{user.name} ({user.displayName})</strong>
            </>
        );

        accountInfo = (
            <NavDropdown title={userInfoContent} className="nav-user-info">
                Signed in as <strong>{user.name}</strong>
                <NavDropdown.Item>
                    <GoogleLogout
                        clientId="36893320136-ssp84asi1l6aif9j279tpmuo98dk1ora.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={onLogoutSuccess}
                        isSignedIn={user.isSignedIn}
                    />
                </NavDropdown.Item>
            </NavDropdown>
        );
    }
    
    return (
        <Navbar bg="light" expand="lg" fixed="top" className="border-bottom">
            <LinkContainer to="/">
                <Navbar.Brand>Confessional</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav>
                    {/* Left side of  side of Navbar */}
                    <InputGroup>
                        <FormControl type="text" placeholder="Search" />
                        <InputGroup.Append>
                            <Button variant="success">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Nav>
                <Nav className="ml-auto">
                    {/* Right side of  side of Navbar */}
                    {accountInfo}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

// removed code
// {/* Right side of  side of Navbar */}
// {user.loggedIn && 
//     <NavDropdown title={userInfoContent} className="nav-user-info">
//         Signed in as <strong>{user.fullName}</strong>
//         <NavDropdown.Item>
//             <Button variant="danger" onClick={logout}>Logout</Button>
//         </NavDropdown.Item>
//     </NavDropdown>
//     }
//     {!user.loggedIn &&
//     <Nav.Link onClick={login}>
//         Login
//         <FontAwesomeIcon className="ml-1" icon={faSignInAlt} />
//     </Nav.Link>
//     }