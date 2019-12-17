import React, { useState, useEffect } from 'react';
import { Badge, Container } from 'react-bootstrap';
import { useStore } from '../store/useStore';

export const Favorites = () => {
    const {
        state: { favorite },
        dispatch
    } = useStore();

    let favorites = [];
    console.log(favorite);
    console.log(favorites);
    let favoritesContent;
    if (favorites.length > 0) {
        favoritesContent = favorites.map((favorite, index) => {
            const selected = true === favorite.id ? ' selected':'';
            
            return (
            <li 
                key={favorite.id}
                className={`favorites-item${selected}`}
                onClick={() => this.onFavoriteSelect(index)}
                href="#"
            >
                <a className={`favorites-name${selected}`} >
                    {favorite.name}
                </a>
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