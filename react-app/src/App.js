import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import { Layout } from './components/Layout';

import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { Thread } from './pages/Thread';
import { NotFound } from './pages/NotFound';

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/Category/:id' component={Category} />
                        <Route path='/Thread/:id' component={Thread} />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}
