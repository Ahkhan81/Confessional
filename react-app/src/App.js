import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import { Layout } from './components/Layout';

import { Home } from './pages/Home';
import { Topic } from './pages/Topic';
import { Thread } from './pages/Thread';
import { NotFound } from './pages/NotFound';

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/Topic/:id' component={Topic} />
                        <Route path='/Thread/:id' component={Thread} />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}
