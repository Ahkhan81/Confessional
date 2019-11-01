import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Favorites } from './Favorites';
import { NavigationBar } from './NavigationBar';

export class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { signInUser, signOutUser, user } = this.props;
        
        return (
            <React.Fragment>
                <NavigationBar signInUser={signInUser} signOutUser={signOutUser} user={user} />
                <Container fluid className="content-container">
                    <Row>
                        {user.isSignedIn && 
                        <Col lg={2} className="favorites-sidebar">
                            <Favorites />
                        </Col>
                        }
                        <Col lg={user.isSignedIn ? 10 : 12}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}
