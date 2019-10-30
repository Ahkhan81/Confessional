import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Favorites } from './Favorites';
import { NavigationBar } from './NavigationBar';

import profileImage from '../images/3xBmozg.jpg';

export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                isSignedIn: false,
                fullName: "",
                profileImage: null
            }
        };
    }

    signInUser = () => {
        this.setState({
            user: {
                isSignedIn: true,
                fullName: "John Deere",
                profileImage: profileImage
            }
        });
    };

    signOutUser = () => {
        this.setState({
            user: {
                isSignedIn: false,
                fullName: "",
                profileImage: null
            }
        });
    };
    
    render() {
        const { user } = this.state;
        
        return (
            <React.Fragment>
                <NavigationBar signInUser={this.signInUser} signOutUser={this.signOutUser} user={user} />
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
