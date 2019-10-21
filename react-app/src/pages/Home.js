import React from 'react';

import { TopicCard } from '../components/TopicCard';

export class Home extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        //TODO: Get main topics from backend
        let topics = ["Administration", "Events", "Clubs", "Sports", "SGA", "Majors"];
        this.setState({
            topics
        });
    }

    render() {
        const { topics } = this.state;
        
        return (
            <React.Fragment>
                <h3>Home</h3>
                <hr className="mt-0" />
                {topics.map((name) => {
                    return (
                        <TopicCard name={name} />
                    );
                })}
            </React.Fragment>
        );
    }
}