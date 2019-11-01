import React from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faFlag } from '@fortawesome/free-solid-svg-icons';
import { ContentView } from '../components/ContentView';

import profileImage from '../images/3xBmozg.jpg';

export class Thread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paths: [
                {
                    name: "Home",
                    url: "/"
                },
                {
                    name: "Events",
                    url: "/Topic/Events"
                }
            ]
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
    }

    render() {
        const { id } = this.props.match.params; 
        const { paths } = this.state;
        
        const content = (
            <React.Fragment>
                <Col lg={8} className="px-0">
                    <h4>{id}</h4>
                    <p>
                    Produced by the Department of Theater, Film, and Media Studies and directed by faculty member Amy
                    Steiger, Shakespeare’s tale of terrors and of unbridled ambition is full of “present fears” and
                    “horrible imaginings” – witches, ghosts, and deadly violence both actual and imaginary – that
                    trouble boundaries between the material world and systems or feelings that can less easily be
                        clutched in the hands. Exploring the remarkable natural and architectural landscape of 
                        Historic St. Mary’s City, this site-specific Halloween production travels a path from
                        outdoors in the Town Center to inside the old State House. Along the way, we will draw
                        on Shakespeare’s roots in medieval theater, on historical connections between colonial 
                        Maryland and early modern England, and on the power of all kinds of fear, then and now.
                    </p>

                    <h5>Comments</h5>

                    {
                        this.props.user && this.props.user.isSignedIn && 
                        <Form.Group>
                            <label htmlFor="comment"><h6>Add a Comment</h6></label>
                            <InputGroup>
                                <Form.Control id="comment" as="textarea" rows={3} style={{resize: "vertical"}} />
                                <InputGroup.Append>
                                    <Button variant="secondary">
                                        <FontAwesomeIcon icon={faComment} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    }

                    <Comment />
                    <Row className="mx-0 pt-2">
                        <Pagination className="mx-auto">
                            <Pagination.First disabled />
                            <Pagination.Prev disabled />
                            <Pagination.Item active>{1}</Pagination.Item>
                            <Pagination.Next disabled />
                            <Pagination.Last disabled />
                        </Pagination>
                    </Row>
                </Col>
            </React.Fragment>
        );

        return (
            <React.Fragment>
                <ContentView headerName={`Thread - ${id}`} breadCrumbName={id} paths={paths} component={content} />
            </React.Fragment>
        );
    }
}

const Comment = (props) => {
    return (
        <React.Fragment>
            <div className="comment">
                <Container fluid>
                    <Col className="px-0 pt-2">
                        <Row className="mx-0">
                            <Image src={profileImage} roundedCircle />
                            <strong className="pl-2 align-self-center">UserName1</strong>
                            <FontAwesomeIcon className="ml-auto clickable red" icon={faFlag} />
                        </Row>
                    </Col>
                    <p>
                        Number 15: Burger king foot lettuce. The last thing you'd want in your Burger
                            King burger is someone's foot fungus. But as it turns out, that might be
                            what you get. A 4channer uploaded a photo anonymously to the site showcasing
                            his feet in a plastic bin of lettuce. With the statement: "This is the
                            lettuce you eat at Burger King." Admittedly, he had shoes on. But that's 
                            even worse.
                    </p>
                </Container>
            </div>
        </React.Fragment>
    );
};