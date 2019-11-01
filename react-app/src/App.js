import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import { Layout } from './components/Layout';

import { Home } from './pages/Home';
import { Topic } from './pages/Topic';
import { Thread } from './pages/Thread';
import { NotFound } from './pages/NotFound';

import profileImage from './images/3xBmozg.jpg';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                isSignedIn: false,
                fullName: "",
                profileImage: null
            }
        };
    }

    signInUser = () => {
        this.setState({
            user: {
                isSignedIn: true,
                fullName: "John Deere",
                profileImage: profileImage
            }
        });
    };

    signOutUser = () => {
        this.setState({
            user: {
                isSignedIn: false,
                fullName: "",
                profileImage: null
            }
        });
    };
    
    render() {
        const { user } = this.state;
        
        return (
            <BrowserRouter>
                <Layout signInUser={this.signInUser} signOutUser={this.signOutUser} user={user}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/Topic/:id' component={Topic} />
                        <Route path='/Thread/:id' render={(props) => <Thread {...props} user={user} />} />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}
