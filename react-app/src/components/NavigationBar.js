import React from 'react';
import { Button, Col, Form, FormControl, Image, InputGroup, Nav, Navbar, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import profile from '../images/3xBmozg.jpg';

export class NavigationBar extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <Navbar bg="light" expand="lg" fixed="top" className="border-bottom">
                <Navbar.Collapse>
                    <Col lg={2} className="border-right">
                        <Row>
                            <Image className="pr-2" src={profile} roundedCircle />
                            <p className="font-weight-bold">John Deere</p>
                        </Row>
                    </Col>
                    <InputGroup className="w-25 pl-2">
                        <FormControl type="text" placeholder="Search" />
                        <InputGroup.Append>
                            <Button variant="success">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Navbar.Collapse>
                <Navbar.Brand>Confessional</Navbar.Brand>
                <Navbar.Toggle />
            </Navbar>
        );
    }
}