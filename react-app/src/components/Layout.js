import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Favorites } from './Favorites';
import { NavigationBar } from './NavigationBar';

export class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <Container fluid className="content-container">
                    <Row>
                        <Col lg={2} className="px-0">
                            <Favorites />
                        </Col>
                        <Col lg={10}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}
