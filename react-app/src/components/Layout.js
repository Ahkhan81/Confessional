import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useStore } from '../store/useStore';

import { Favorites } from './Favorites';
import { NavigationBar } from './NavigationBar';
import { RegistrationModal } from './RegistrationModal';

export const Layout = (props) => {
    const {
        state: {
            user
        }
    } = useStore();
    
    return (
        <React.Fragment>
            <RegistrationModal />
            
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
