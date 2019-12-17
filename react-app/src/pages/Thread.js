import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faFlag } from '@fortawesome/free-solid-svg-icons';

import { sendGet, sendPost, sendDelete } from '../util/api';
import { ContentView } from '../components/ContentView';
import { Paging } from '../components/Paging';
import { useStore } from "../store/useStore";

import profileImage from '../images/3xBmozg.jpg';

export const Thread = (props) => {
    const { state: { user } } = useStore();

    const [breadCrumbs, setBreadCrumbs] = useState([
        {
            name: "Home",
            url: "/"
        }
    ]);

    const [thread, setThread] = useState({
        id: props.match.params.id,
        title: "",
        body: null,
        timePosted: null,
        user: {
            id: null,
            displayName: null
        }
    });

    const [messageResults, setMessageResults] = useState([]);

    // Get Thread info by Thread ID.
    // This is called on initial component load.
    useEffect(() => {
        sendGet(`message/thread`,
            { thread_id: thread.id },
            null,
            (error) => {
                // onError
                console.log(error);
            },
            (response) => {
                // onSuccess
                const { category } = response;

                // Category
                breadCrumbs.push({name: response.category.name, url: `/Category/${category.id}`});
                setBreadCrumbs(breadCrumbs);

                // Thread
                setThread(response.thread);
                
                // Messages
                setMessageResults(response.messages);
            }
        );
    }, []);

    const getMessages = () => {
        const settings = messageResults.settings;
        console.log(settings);
        sendGet(
            `threads/${thread.id}/messages`,
            { page: settings.page, itemsPerPage: settings.itemsPerPage },
            null,
            (response) => {
                // On Error
                alert(response);
            },
            (response) => {
                const responseSettings = response.settings;
                const resultSettings = messageResults.settings;
                if (responseSettings.page === resultSettings.page && responseSettings.itemsPerPage === resultSettings.itemsPerPage) {
                    setMessageResults(response);
                }
            }
        );
    }

    const content = (
        <React.Fragment>
            <Col className="px-0">
                <h4>{thread.title}</h4>
                <p className="mb-0">{thread.body}</p>
                <small className="text-muted align-self-center my-0">Posted {new Date(thread.timePosted).toDateString()} by {thread.user.displayName}</small>
                <hr />
                <h5>Messages</h5>
                <MessageReply 
                    threadId={thread.id} 
                    user={user}
                />
                <MessageView results={messageResults} />
            </Col>
        </React.Fragment>
    );

    return (
        <ContentView
            headerName={`Thread - ${thread.title}`}
            breadCrumbName={thread.title}
            paths={breadCrumbs}
            component={content}
        />
    );
}

const MessageReply = (props) => {
    const { threadId } = props;
    const { state: { user } } = useStore();

    const [message, setMessage] = useState("");

    const postMessage = () => {
        sendPost(
            `messages/post`,
            { thread_id: threadId, text: message },
            () => {

            },
            (response) => {
                alert("Failed to post...");
            },
            (response) => {
                // onPostSuccess();
                setMessage("");
            },
            user.token
        );
    };

    if (!user.isLoggedIn) {
        return (<></>);
    }
    
    return (
        <Form.Group>
            <label htmlFor="message"><h6>Add a Message</h6></label>
            <InputGroup>
                <Form.Control 
                    id="message" 
                    as="textarea" 
                    rows={3} 
                    style={{resize: "vertical"}} 
                    value={message}
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                />
                <InputGroup.Append>
                    <Button 
                        variant="secondary"
                        disabled={message.trim().length === 0}
                        onClick={postMessage}
                    >
                        <FontAwesomeIcon icon={faComment} />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Form.Group>
    );
};

const MessageView = (props) => {
    const messages = props.results;

    return (
        <Container fluid className="px-0">
            {messages.map((message) => <Message key={message.id} {...message} />)}
            {messages.length === 0 && <h3 className="mx-auto">No Messages :(</h3>}
        </Container>
    );
};

const Message = (props) => {
    const { id, user: author, text, timePosted } = props;
    const { state: { user } } = useStore();
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    };
    
    const handleDeleteClick = () => {
        console.log(author);
        sendDelete(
            `messages/${id}`,
            null,
            null,
            (response) => {

            },
            (response) => {
                console.log("successful deletoin");
                console.log(response);
                setShowDeleteModal(false);
                // refresh message view
            },
            user.token
        );
    };

    const deleteButton = (
        <FontAwesomeIcon
            className="ml-1 clickable red" 
            icon={faFlag} 
            onClick={() => setShowDeleteModal(true)}
        />
    );
    
    return (
        <>
            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this message?
                    <Col align="center">
                        <strong>{text}</strong>
                        <p>Posted by {author.displayName}</p>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="secondary" onClick={handleDeleteModalClose}>
                        Close
                    </Button>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        
            <div className="comment">
                <Container fluid>
                    <Col className="px-0 py-2">
                        <Row className="mx-0">
                            <Col className="px-0 align-self-center">
                                <Row className="mx-0 align-middle">
                                    <strong>{author.displayName}</strong>
                                    <small className="text-muted">Posted {timePosted}</small>
                                    {author.administrator && deleteButton}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <hr className="full" />
                    <p>{text}</p>
                </Container>
            </div>
        </>
    );
};