import React from 'react';
import { Button, Card, CardDeck, Col, Pagination, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { sendGet } from '../util/api';
import { ContentView } from '../components/ContentView';

export class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadCrumb: [
                {
                    name: "Home",
                    url: "/"
                }
            ],
            
            topic: {
                id: null,
                name: null
            },

            pageIndex: 0,
            pageCount: 0,
            threadPreviews: []
        };

        const { id } = this.props.match.params;

        // Get Thread Previews by Topic ID.
        sendGet('GetThreadPreviews',
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
            this.setState({
                topic: response.topic,
                pageIndex: response.page,
                pageCount: response.pageCount,
                threadPreviews: response.threadPreviews
            });
        });
    }

    render() {
        const { breadCrumb, topic, threadPreviews } = this.state;

        let topicRows = [];
        let topicCells = [];
        function newRow() {
            topicRows.push(
                <CardDeck key={topicRows.length - 1} className="pb-3">
                    {topicCells}
                </CardDeck>
            );
            topicCells = [];
        }
        
        threadPreviews.forEach((threadPreview, index) => {
            topicCells.push(
                <Col key={index} lg={3} className="p-0">
                    <ThreadPreviewCard {...threadPreview} />
                </Col>
            );

            if ((index + 1) % 4 === 0) {
                newRow(topicRows, topicCells);
            }
        })
        if (topicCells.length > 0) {
            newRow(topicRows, topicCells);
        }

        const content = (
            <React.Fragment>
                {topicRows}
                <Row className="mx-0">
                    <Pagination className="mx-auto">
                        <Pagination.First disabled />
                        <Pagination.Prev disabled />
                        <Pagination.Item active>{1}</Pagination.Item>
                        <Pagination.Next disabled />
                        <Pagination.Last disabled />
                    </Pagination>
                </Row>
            </React.Fragment>
        );

        return (
            <React.Fragment>
                <ContentView
                    headerName={`Topic - ${topic.name}`}
                    breadCrumbName={topic.name} 
                    paths={breadCrumb}
                    component={content}
                />
            </React.Fragment>
        );
    }
}

const ThreadPreviewCard = (props) => {
    let history = useHistory();

    function navigate() {
        history.push(`/Thread/${props.id}`);
    }
    
    const { id, image, name, previewText, lastActivity } = props;
    
    return (
        <Card key={id} className="thread-preview">
            {image && <Card.Img variant="top" src={image} />}
            <Card.Header className="clickable" onClick={navigate}>
                <h6 className="m-0">{name}</h6>
            </Card.Header>
            <Card.Body>
                <Card.Text>{previewText}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row className="px-2">
                    <small className="text-muted align-self-center mb-1 mr-auto">Last activity {lastActivity}</small>
                    <Button variant="dark" size="sm" onClick={navigate}>View</Button>
                </Row>
            </Card.Footer>
        </Card>
    );
};
