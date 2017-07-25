import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Switch, withRouter } from 'react-router-dom';

import AuthProvider from '../lib/AuthProvider';

import Home from './Home';
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import Loading from './Loading'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userStatus: 'loading',
            user: null
        };
    }

    componentDidMount() {
        AuthProvider.onChange((update) => {
            this.setState({
                userStatus: update.userStatus,
                user: update.user
            });
            if(this.state.userStatus !== 'loading') {
                if(this.state.user && 
                    (this.props.location.pathname === '/' || this.props.location.pathname === '/forgetPassword'))
                    this.props.history.push('/recordOfMeeting');
                else if(!this.state.user && 
                    !(this.props.location.pathname === '/' || this.props.location.pathname === '/forgetPassword'))
                    this.props.history.push('/');
            }
        });
    }

    render() {
        return (
            <MuiThemeProvider className={(this.state.userStatus === 'logged') ? '' : 'gridContainer'} >
                {(this.state.userStatus === 'loading') ?
                    <Loading /> :
                    <Switch>
                        <Route exact path='/' render={(props) => <Login {...props}  userStatus={this.state.userStatus} />} />
                        <Route exact path='/forgetPassword' render={(props) => <ForgetPassword {...props} />} />
                        <Route exact path='/**' render={(props) => <Home {...props}  userStatus={this.state.userStatus} user={this.state.user} />} />
                    </Switch>
                }
            </MuiThemeProvider>
        );
    }
}

export default withRouter(App);