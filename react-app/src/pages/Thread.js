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

    const [messageResults, setMessageResults] = useState({
        settings: {
            page: 0,
            itemsPerPage: 8
        },
        items: [],
        totalItems: 0,
        totalResultItems: 0
    });

    const [messageRefresh, setMessageRefresh] = useState({
        execute: false,
        waiting: false
    });

    const refreshMessages = () => {
        if (messageRefresh.execute && !messageRefresh.waiting) {
            getMessages();
        }
        setTimeout(refreshMessages, 500);
    };

    refreshMessages();

    // Get Thread info by Thread ID.
    // This is called on initial component load.
    useEffect(() => {
        sendGet(`threads/${thread.id}`,
            { ...messageResults.settings },
            () => {
                // onSent
                setMessageRefresh(false);
            },
            (error) => {
                // onError
                console.log(error);
                setMessageRefresh(false);
            },
            (response) => {
                // onSuccess
                setMessageRefresh(true);
                const { category } = response;

                // Category
                breadCrumbs.push({name: response.category.name, url: `/Category/${category.id}`});
                setBreadCrumbs(breadCrumbs);

                // Thread
                setThread({
                    id: response.id,
                    title: response.title,
                    body: response.body,
                    timePosted: response.timePosted,
                    user: response.user
                });
                
                // Messages
                setMessageResults(response.messageResults);
            }
        );
    }, []);

    // Get messages when the page changes
    useEffect(() => {
        getMessages();
    }, [messageResults.settings.page]);

    const getMessages = () => {
        sendGet(
            `threads/${thread.id}/messages`,
            {...messageResults.settings},
            () => {
                setMessageRefresh(false);
            },
            (error) => {
                setMessageRefresh(false);
            },
            (response) => {
                setMessageRefresh(true);
                setMessageResults(response);
            }
        );
    }

    const handlePageChange = (page) => {
        // React won't recognize state change for objects unless you copy and mutate directly.
        let newMessageResults = {...messageResults};
        newMessageResults.settings.page = page;
        setMessageResults(newMessageResults);
    }

    const content = (
        <React.Fragment>
            <Col className="px-0">
                <h4>{thread.title}</h4>
                <p className="mb-0">{thread.body}</p>
                <small className="text-muted align-self-center my-0">Posted {thread.timePosted} by {thread.user.displayName}</small>
                <hr />
                <h5>Messages</h5>
                <MessageReply 
                    threadId={thread.id} 
                    user={user} 
                    onPostSuccess={getMessages} 
                />
                <MessageView 
                    results={messageResults} 
                    onPageChange={handlePageChange} 
                />
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
    const { threadId, onPostSuccess } = props;
    const { state: { user } } = useStore();

    const [message, setMessage] = useState("");

    const postMessage = () => {
        sendPost(
            `threads/${threadId}/messages/post`,
            { text: message },
            () => {

            },
            (response) => {
                alert("Fialed to post...");
            },
            (response) => {
                onPostSuccess();
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
    const messages = props.results.items;
    const { settings, totalItems } = props.results;
    const onPageChange = props.onPageChange;

    return (
        <Container fluid className="px-0">
            {messages.map((message) => <Message key={message.id} {...message} />)}
            {messages.length === 0 && <h3 className="mx-auto">No Messages :(</h3>}
            <Row className="mx-0 pt-2">
                <Paging
                    {...settings}
                    totalItems={totalItems} 
                    onPageChange={onPageChange}
                />
            </Row>
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