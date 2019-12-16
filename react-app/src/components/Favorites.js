import React from 'react';
import { Badge, Container } from 'react-bootstrap';

export class Favorites extends React.Component {
    constructor() {
        super();
        
        let generate = [];
        const favoriteCount = Math.floor(Math.random() * 10);
        console.log(favoriteCount);
        for (let i = 0; i < favoriteCount; i++) {
            generate.push({
                id: i+1,
                name: `Favorite ${i+1}`,
                notificationCount: Math.floor(Math.random()*100) <= 25 ? Math.floor(Math.random() * 15) : 0
            });
        }

        this.state = {
            favorites: generate,
            selected: 0
        };
    }

    onFavoriteSelect = (index) => {
        let { favorites } = this.state;
        favorites[index].notificationCount = 0;
        this.setState({
            selected: favorites[index].id,
            favorites
        });
    };

    render() {
        const { favorites } = this.state;

        let favoritesContent;
        if (favorites.length > 0) {
            favoritesContent = favorites.map((favorite, index) => {
                const selected = this.state.selected === favorite.id ? ' selected':'';
                
                return (
                <li 
                key={favorite.id}
                className={`favorites-item${selected}`}
                onClick={() => this.onFavoriteSelect(index)}
                href="/Logout"
                >
                    <a className={`favorites-name${selected}`} >
                        {favorite.name}
                    </a>
                    {favorite.notificationCount > 0 &&
                    <Badge className="ml-2" variant="info">
                        {favorite.notificationCount}
                    </Badge>
                    }
                </li>
            );});
        } else {
            favoritesContent = (<p className="text-center">No favorites! :(</p>);
        }

        return (
            <Container className="border-right favorites-items">
                <h3>Favorites</h3>
                <hr className="mt-0" style={{marginLeft: '-30px', marginRight: '-15px'}} />
                <ul className="favorites-list">
                    {favoritesContent}
                </ul>
            </Container>
        );
    }
}