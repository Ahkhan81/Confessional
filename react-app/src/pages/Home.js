import React from 'react';

import { sendGet } from '../util/api';
import { ContentView } from '../components/ContentView';
import { TopicCard } from '../components/TopicCard';

export class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            expandDefault: ["Events"],
            categories: []
        };

        // Get Main Topics.
        sendGet('categories', null,
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
                // topics: response.topics
                categories: response.map((category) => ({id: category.category_id, name: category.category_name}))
            });
        });
    }

    render() {
        const { expandDefault, categories } = this.state;
        
        const content = categories.map((category) => {
            const { id, name } = category; // django model
            const isExpanded = expandDefault.includes(name);

            return (
                <TopicCard
                    key={id} 
                    name={name} 
                    url={`/Category/${id}`}
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