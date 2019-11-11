import React, { useCallback } from 'react';
import { Button, FormControl, Image, InputGroup, Modal, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useStore } from "../store/useStore";

export const NavigationBar = () => {
    const {
        state: {
            user
        },
        dispatch
    } = useStore();

    user.fullName = `${user.firstName} ${user.lastName}`;
        
    const userInfoContent = (
        <>
            <Image className="pr-2" src={user.profileImage} roundedCircle />
            <strong>{user.fullName}</strong>
        </>
    );

    const login = useCallback(() => dispatch({ type: "AUTH_SHOW_MODAL", show: true }), [dispatch]);
    function logout() {
        dispatch({ type: "USER_LOGOUT" });
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
                    {user.loggedIn && 
                    <NavDropdown title={userInfoContent} className="nav-user-info">
                        Signed in as <strong>{user.fullName}</strong>
                        <NavDropdown.Item>
                            <Button variant="danger" onClick={logout}>Logout</Button>
                        </NavDropdown.Item>
                    </NavDropdown>
                    }
                    {!user.loggedIn &&
                    <Nav.Link onClick={login}>
                        Login
                        <FontAwesomeIcon className="ml-1" icon={faSignInAlt} />
                    </Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}