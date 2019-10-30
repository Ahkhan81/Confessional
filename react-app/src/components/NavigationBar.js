import React from 'react';
import { Button, Col, Form, FormControl, Image, InputGroup, Modal, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

export class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: {
                show: false,
                title: "",
                body: null,
                footer: null
            }
        };
    }

    signIn = () => {
        const body = (
            <p>Signing in... <FontAwesomeIcon icon={faSpinner} pulse /></p>
        );
        
        this.setState({
            modal: {
                show: true,
                title: "Sign In",
                body,
                footer: null
            }
        }, () => {
            setTimeout(() => {
                this.setState({
                    modal: {
                        show: false,    
                        title: null,
                        body: null,
                        footer: null
                    }
                });
                this.props.signInUser();
            }, 2500);
        });
    }

    signOut = () => {
        const body = (
            <p>Signing out... <FontAwesomeIcon icon={faSpinner} pulse /></p>
        );
        
        this.setState({
            modal: {
                show: true,
                title: "Sign Out",
                body,
                footer: null
            }
        }, () => {
            setTimeout(() => {
                this.setState({
                    modal: {
                        show: false,    
                        title: null,
                        body: null,
                        footer: null
                    }
                });
                this.props.signOutUser();
            }, 1500);
        });
    };
    
    render() {
        const { modal } = this.state;
        const { user } = this.props;
        
        const userInfoContent = (
            <>
                <Image className="pr-2" src={user.profileImage} roundedCircle />
                <strong>{user.fullName}</strong>
            </>
        );
        
        return (
            <>
                <Modal show={modal.show}>
                    <Modal.Header>
                        <Modal.Title>{modal.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {modal.body}
                    </Modal.Body>

                    <Modal.Footer>
                        {modal.footer}
                    </Modal.Footer>
                </Modal>

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
                            {/* Right side of Navbar */}
                            {user.isSignedIn && 
                            <NavDropdown title={userInfoContent} className="nav-user-info">
                                Signed in as <strong>{user.fullName}</strong>
                                <NavDropdown.Item>
                                    <Button variant="danger" onClick={this.signOut}>Sign Out</Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                            }
                            {!user.isSignedIn &&
                            <Nav.Link onClick={this.signIn}>Sign In</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                    {/* <Navbar.Brand>Confessional</Navbar.Brand> */}
                </Navbar>
            </>
        );
    }
}