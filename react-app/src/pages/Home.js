import React from 'react';

import { sendGet } from '../util/api';
import { ContentView } from '../components/ContentView';
import { TopicCard } from '../components/TopicCard';

export class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            expandDefault: ["Events"],
            topics: []
        };

        // Get Main Topics.
        sendGet('GetMainTopics', null,
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
                topics: response.topics
            });
        });
    }

    render() {
        const { expandDefault, topics } = this.state;
        
        const content = topics.map((topic) => {
            const { id, name } = topic;
            const isExpanded = expandDefault.includes(name);

            return (
                <TopicCard
                    key={id} 
                    name={name} 
                    url={`/Topic/${id}`}
                    expanded={isExpanded}
                />
            );
        });
        
        return (
            <React.Fragment>
                <ContentView headerName="Home" breadCrumbName="Home" component={content} />
            </React.Fragment>
        );
    }
}