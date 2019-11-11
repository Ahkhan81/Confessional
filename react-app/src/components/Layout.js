import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useStore } from '../store/useStore';

import { Favorites } from './Favorites';
import { NavigationBar } from './NavigationBar';
import { AuthenticationModal } from './AuthenticationModal';
import { LogoutModal } from './LogoutModal';
import { RegistrationModal } from './RegistrationModal';
import { RegistrationCompleteModal } from './RegistrationCompleteModal';

export const Layout = (props) => {
    const {
        state: {
            user
        }
    } = useStore();
    
    return (
        <React.Fragment>
            <AuthenticationModal />
            <LogoutModal />
            <RegistrationModal />
            <RegistrationCompleteModal />
            
            <NavigationBar />
            <Container fluid className="content-container">
                <Row>
                    {user.loggedIn && 
                    <Col lg={2} className="favorites-sidebar">
                        <Favorites />
                    </Col>
                    }
                    <Col lg={user.loggedIn ? 10 : 12}>
                        {props.children}
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
