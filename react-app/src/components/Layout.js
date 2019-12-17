import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useStore } from '../store/useStore';

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
                    <Col lg={12}>
                        {props.children}
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
