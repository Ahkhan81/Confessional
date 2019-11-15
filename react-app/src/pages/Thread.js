import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faFlag } from '@fortawesome/free-solid-svg-icons';

import { sendGet } from '../util/api';
import { ContentView } from '../components/ContentView';
import { useStore } from "../store/useStore";

import profileImage from '../images/3xBmozg.jpg';

export const Thread = (props) => {
    const {
        state: {
            user
        },
        // dispatch
    } = useStore();

    const [breadCrumbs, setBreadCrumbs] = useState([
        {
            name: "Home",
            url: "/"
        }
    ]);

    // const [topic, setTopic] = useState({
    //     id: null,
    //     name: null
    // });

    const [thread, setThread] = useState({
        id: null,
        name: null,
        text: null,
        time: null,
        comment: {
            pageIndex: 0,
            pageCount: 0,
            comments: []
        }
    });

    // User inputted comment
    const [comment, setComment] = useState("");

    const { id } = props.match.params;

    // Get Thread Previews by Thread ID.
    useEffect(() => {
        sendGet('GetThread',
            { id },
            () => {
                // onSent
            },
            (error) => {
                // onError
                console.log(error);
            },
            (response) => {
                // onSuccess
                const topic = response.topic;
                breadCrumbs.push({name: topic.name, url: `/Topic/${topic.id}`});
                setBreadCrumbs(breadCrumbs);
                // setTopic(topic);
                setThread(response.thread);
            }
        );
    }, []);

    function addComment() {
        const text = comment.trim();
        console.log("Add Comment Text: " + text);
    };
    
    const content = (
        <React.Fragment>
            <Col lg={8} className="px-0">
                <h4>{thread.name}</h4>
                <p className="mb-0">{thread.text}</p>
                <small className="text-muted align-self-center my-0">Posted at {thread.time}</small>

                <hr />

                <h5>Comments</h5>

                {/* Show the comment textbox if the user is logged in */}
                {
                    user.loggedIn && 
                    <Form.Group>
                        <label htmlFor="comment"><h6>Add a Comment</h6></label>
                        <InputGroup>
                            <Form.Control 
                                id="comment" 
                                as="textarea" 
                                rows={3} 
                                style={{resize: "vertical"}} 
                                onChange={(event) => {
                                    setComment(event.target.value);
                                }}
                            />
                            <InputGroup.Append>
                                <Button 
                                    variant="secondary"
                                    disabled={comment.trim().length === 0}
                                    onClick={addComment}
                                >
                                    <FontAwesomeIcon icon={faComment} />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                }

                <CommentList comments={thread.comment.comments} />
            </Col>
        </React.Fragment>
    );

    return (
        <ContentView
            headerName={`Thread - ${thread.name}`}
            breadCrumbName={thread.name}
            paths={breadCrumbs}
            component={content}
        />
    );
}

const CommentList = (props) => {
    return (
        <Container fluid className="px-0">
            {props.comments.map((comment) => <Comment key={comment.id} {...comment} />)}
            <Row className="mx-0 pt-2">
                <Pagination className="mx-auto">
                    <Pagination.First disabled />
                    <Pagination.Prev disabled />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Next disabled />
                    <Pagination.Last disabled />
                </Pagination>
            </Row>
        </Container>
    );
};

const Comment = (props) => {
    const { id, username, time, text } = props;
    return (
        <div className="comment">
            <Container fluid>
                <Col className="px-0 py-2">
                    <Row className="mx-0">
                        <Image src={profileImage} roundedCircle />
                        <Col className="px-0 align-self-center">
                            <Row className="mx-0">
                                <strong className="pl-2">{username}</strong>
                                <small className="text-muted ml-auto">Posted at {time}</small>
                                <FontAwesomeIcon className="ml-1 clickable red" icon={faFlag} />
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <hr className="full" />
                <p>{text}</p>
            </Container>
        </div>
    );
};