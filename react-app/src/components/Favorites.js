import React from 'react';
import { Container } from 'react-bootstrap';

import { TopicCard } from './TopicCard';

export class Favorites extends React.Component {
    constructor() {
        super();
        
        let generate = [];
        for (let i = 0; i < 25; i++) {
            generate.push(`Item ${i+1}`);
        }
        this.state = {
            favorites: generate
        };
    }

    render() {
        const { favorites } = this.state;

        let favoritesContent;
        if (favorites.length > 0) {
            favoritesContent = favorites.map((name) => {
                return (
                    <TopicCard name={name} />
                );
            })
        } else {
            favoritesContent = (<p className="text-center">No favorites! :(</p>);
        }

        return (
            <Container className="border-right pr-0">
                <h3>Favorites</h3>
                <hr className="mt-0" />
                <div className="scroll">
                    {favoritesContent}
                </div>
            </Container>
        );
    }
}