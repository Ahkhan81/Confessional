import React from 'react';
import { Card } from 'react-bootstrap';

export class TopicCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name } = this.props;

        return (
            <Card className="mb-2">
                <Card.Header as="h6">{name}</Card.Header>
            </Card>
        );
    }
}