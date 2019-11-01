import React from 'react';

import { ContentView } from '../components/ContentView';
import { TopicCard } from '../components/TopicCard';

export class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            expandDefault: ["Events", "Majors"]
        };
    }

    componentWillMount() {
        //TODO: Get main topics from backend
        let topics = [
            {
                name: "Administration",
                url: "/Topic/Administration"
            },
            {
                name: "Events",
                url: "/Topic/Events"
            },
            {
                name: "Clubs",
                url: "/Topic/Clubs"
            },
            {
                name: "Sports",
                url: "/Topic/Sports"
            },
            {
                name: "SGA",
                url: "/Topic/SGA"
            },
            {
                name: "Majors",
                url: "/Topic/Majors"
            }
        ];
        this.setState({
            topics
        });
    }

    render() {
        const { expandDefault, topics } = this.state;
        
        const content = topics.map((topic) => {
            const { name, url } = topic;
            const isExpanded = expandDefault.includes(name);

            return (
                <TopicCard
                    key={name} 
                    name={name} 
                    url={url}
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