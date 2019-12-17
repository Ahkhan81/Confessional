import React, { useState, useEffect } from 'react';
import { Button, Card, CardDeck, Col, Form, Header, Modal, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { sendGet, sendPost } from '../util/api';
import { digestMessage, hexString } from '../util/hashword';
import { ContentView } from '../components/ContentView';
import { Paging } from '../components/Paging';
import { useStore } from '../store/useStore';

export const Category = (props) => {
    const { state: { user } } = useStore();

    const [breadCrumbs, setBreadCrumbs] = useState([
        {
            name: "Home",
            url: "/"
        }
    ]);
    
    const [category, setCategory] = useState({
        id: props.match.params.id,
        name: ""
    });

    const [threadPreviewResults, setThreadPreviewResults] = useState([]);

    const [loading, setLoading] = useState(true);
    const [newThread, setNewThread] = useState({
        showModal: false,
        title: "",
        body: "",
        loading: false
    });

    // On initial mount.
    useEffect(() => {
        getThreadPreviews();
    }, []);

    // On state update

    const getThreadPreviews = () => {
        let { id } = category;
        
        // Get Thread Previews by Topic ID.
        sendGet(`categories/${id}/threadpreviews`,
        null,
        () => {
            // onSent
            setLoading(true);
        },
        (error) => {
            // onError
            console.log(error);
            setLoading(false);
        },
        (response) => {
            // onSuccess
            setLoading(false);
            setCategory(response.category);
            setThreadPreviewResults(response.threadPreviews);
        });
    };

    // Begin render

    let threadRows = [];
    let threadCells = [];
    function newRow() {
        threadRows.push(
            <CardDeck key={threadRows.length - 1} className="pb-3">
                {threadCells}
            </CardDeck>
        );
        threadCells = [];
    }
    
    threadPreviewResults.forEach((threadPreview, index) => {
        threadCells.push(
            <Col key={index} lg={3} className="p-0">
                <ThreadPreviewCard {...threadPreview} />
            </Col>
        );
        if ((index + 1) % 4 === 0) {
            newRow(threadRows, threadCells);
        }
    });
    if (threadCells.length > 0) {
        newRow(threadRows, threadCells);
    }

    const newThreadAction = (
        <Col className="pb-2">
            <Row>
                <Button variant="success" onClick={
                    () => {
                        let copy = {...newThread}
                        copy.showModal = true;
                        setNewThread(copy);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} size="lg" className="pr-1" />
                    New Thread
                </Button>
            </Row>
        </Col>
    );

    const handleNewThreadModalClose = () => {
        if (newThread.loading) {
            return;
        }

        // Reset modal
        setNewThread({
            showModal: false,
            title: "",
            body: "",
            loading: false
        });
    };

    const submitThread = (event) => {
        event.preventDefault();
        digestMessage(Math.random() * 9999999999).then(digestValue => {
            const generate = hexString(digestValue);
            const data = {
                category_id: category.id,
                thread_id: generate,
                title: newThread.title,
                text: newThread.body
            };
    
            const copy = { ...newThread };
            copy.loading = true;
            setNewThread(copy);
            
            sendPost(
                `message/createmessage`,
                data,
                null,
                (response) => {
                    alert("Failed to create message");
                },
                (response) => {
                    getThreadPreviews();
    
                    copy.loading = false;
                    setNewThread(copy);
                    handleNewThreadModalClose();
                },
                user.token
            );
        });
    };

    const disableSubmitThread = newThread.title.trim().length <= 0 || newThread.body.trim().length <= 0;
    
    const content = (
        <React.Fragment>
            {/* New Thread Modal */}
            <Modal show={newThread.showModal} onHide={handleNewThreadModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Thread</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                    placeholder="Title"
                                    required
                                    onChange={(event) => {
                                        let copy = {...newThread}
                                        copy.title = event.target.value;
                                        setNewThread(copy);
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="body">
                                <Form.Label>Body</Form.Label>
                                <Form.Control
                                    as="textarea" 
                                    rows={3} 
                                    style={{resize: "vertical"}}
                                    required
                                    onChange={(event) => {
                                        let copy = {...newThread}
                                        copy.body = event.target.value;
                                        setNewThread(copy);
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            size="sm" 
                            variant="secondary" 
                            disabled={newThread.loading}
                            onClick={handleNewThreadModalClose}
                        >
                            Close
                        </Button>
                        <Button
                            size="sm"
                            variant="success"
                            disabled={disableSubmitThread || newThread.loading}
                            type="submit"
                            onClick={submitThread}
                        >
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            
            {/* Content */}
            {user.isLoggedIn && newThreadAction}
            {threadRows}
            {/* <Row className="mx-0">
                <Paging
                    {...settings}
                    totalItems={totalItems} 
                    onPageChange={handlePageChange}
                />
            </Row> */}
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <ContentView
                headerName={`Category - ${category.name}`}
                breadCrumbName={category.name} 
                paths={breadCrumbs}
                component={content}
            />
        </React.Fragment>
    );
}

const ThreadPreviewCard = (props) => {
    let history = useHistory();

    function navigate() {
        history.push(`/Thread/${props.id}`);
    }
    
    const { id, image, title, bodySnippet, lastActivity } = props;

    const time = new Date(lastActivity).toDateString();
    
    return (
        <Card key={id} className="thread-preview">
            {image && <Card.Img variant="top" src={image} />}
            <Card.Header className="clickable" onClick={navigate}>
                <h6 className="m-0">{title}</h6>
            </Card.Header>
            <Card.Body>
                <Card.Text>{bodySnippet}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row className="px-2">
                    <small className="text-muted align-self-center mb-1 mr-auto">Created at {time}</small>
                    <Button variant="dark" size="sm" onClick={navigate}>View</Button>
                </Row>
            </Card.Footer>
        </Card>
    );
};

const NewThreadModal = () => {

};
