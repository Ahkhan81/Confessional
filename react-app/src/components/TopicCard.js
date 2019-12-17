import React from 'react';
import { Accordion, Button, Card, Row, useAccordionToggle } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const CardHeaderToggle = ({children, eventKey, callback}) => {
    const toggle = useAccordionToggle(eventKey, () => {
        callback && callback();
    });

    return (
        <Card.Header onClick={toggle}>
            {children}
        </Card.Header>
    );
};

export const TopicCard = (props) => {
    let history = useHistory();
    const { expanded } = props;

    function navigate() {
        history.push(props.url);
    }

    let expandCard = expanded ? { defaultActiveKey: 0 } : {};

    return (
        <Accordion className="pb-2" {...expandCard}>
            <Card className="clickable" onClick={navigate}>
                <CardHeaderToggle eventKey={0}>
                    <Row className="px-2">
                        <h6 className="align-self-center mb-1 mr-auto">{props.name}</h6>
                        <Button size="sm" variant="dark" onClick={navigate}>View All</Button>
                    </Row>
                </CardHeaderToggle>
            </Card>
        </Accordion>
    );
}
