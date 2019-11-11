import React from 'react';
import { Button, Card, CardDeck, Col, Pagination, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ContentView } from '../components/ContentView';

export class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
            threadPreviews: []
        };

        this.paths = [
            {
                name: "Home",
                url: "/"
            }
        ];
    }

    componentDidMount() {
        // TODO GET THREAD PREVIEWS
        const { id } = this.props.match.params;
        
        const threadPreviews = [
            {
                id: 1,
                title: `${id} 1`,
                previewText: "The ghastly shadow rides an outraged cramp. An artist purges under the colored jail. A prototype worries! Every nastier follower noses the invalid near the atmospheric sect.",
                lastActivity: "10 minutes ago"
            },
            {
                id: 2,
                title: `${id} 2`,
                previewText: "Your jet interview revolts next to his failing episode. When will the overtone parade? When will the taught orbit wash throughout the entrance? The artificial jack blinks.",
                lastActivity: "34 minutes ago"
            },
            {
                id: 3,
                title: `${id} 3`,
                previewText: "Her starring law stakes each geography. The vast clinic grows beneath a fast banana. A twin transmitter misses the wanted mechanic. Your condemning wonder exercises over the elevator. A container walls an intercourse...",
                lastActivity: "1 hour ago"
            },
            {
                id: 4,
                title: `${id} 4`,
                previewText: "The doubt mends beside a lavatory. The essence reacts to the shaky resemblance with the protocol. The prayer fells the tune. The contracted spy clocks the urban charm. A precedent aardvark shadows a corrupt servant.",
                lastActivity: "2 hours ago"
            },
            {
                id: 5,
                title: `${id} 5`,
                previewText: "The plus approach walks. The composed household coughs before a fundamentalist continuum. Can the umbrella swear the tome? A welfare brushes every lung.",
                lastActivity: "23 hours ago"
            },
            {
                id: 6,
                title: `${id} 6`,
                previewText: "Welcome!",
                lastActivity: "2 days ago"
            },
            {
                id: 7,
                title: `${id} 7`,
                previewText: "Should the outrage pace the meat? Behind a key stops the acid. When will the viable chain rule? A reported narrative encounters the teenage paste. The practicing plague elaborates inside the season. The announced hazard...",
                lastActivity: "14 days ago"
            }
        ];

        // randomize results
        // threadPreviews.splice(Math.floor(Math.random() * threadPreviews.length), Math.floor(Math.random() * (Math.floor(threadPreviews.length))));
        
        this.setState({
            threadPreviews
        });
    }
    render() {
        const { id } = this.props.match.params;
        const { threadPreviews } = this.state;
        
        // TODO: GET THREADS UNDER TOPIC

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
                    <ThreadPreviewCard {...threadPreview} url={"/Thread/Sample%20Thread%20Name"} />
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
                <ContentView headerName={`Topic - ${id}`} breadCrumbName={id} paths={this.paths} component={content} />
            </React.Fragment>
        );
    }
}

const ThreadPreviewCard = (props) => {
    let history = useHistory();

    function navigate() {
        history.push(props.url);
    }
    
    const { id, image, title, previewText, lastActivity } = props;
    
    return (
        <Card key={id} className="thread-preview">
            {image && <Card.Img variant="top" src={image} />}
            <Card.Header className="clickable" onClick={navigate}>
                <h6 className="m-0">{title}</h6>
            </Card.Header>
            <Card.Body>
                <Card.Text>{previewText}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row className="px-2">
                    <small className="text-muted align-self-center mb-1 mr-auto">Last activity {lastActivity}</small>
                    <Button variant="primary" size="sm" onClick={navigate}>View</Button>
                </Row>
            </Card.Footer>
        </Card>
    );
};
