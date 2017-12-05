import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { orange900 } from 'material-ui/styles/colors';
import { Route, Switch, withRouter } from 'react-router-dom';
import AuthProvider from '../lib/AuthProvider';
import Home from './Home';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Loading from '../components/Loading'

const muiTheme = getMuiTheme({
    appBar: {
        color: orange900
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userStatus: 'loading'
        };
    }

    componentDidMount() {
        AuthProvider.onChange((update) => {
            this.setState({
                userStatus: update.status
            });
            const pathname = this.props.history.location.pathname;
            if (update.user === null && pathname !== '/' && pathname !== '/forgotPassword') {
                this.props.history.push('/', null);
            }
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                {(this.state.userStatus === 'loading') ?
                    <Loading /> :
                    <Switch>
                        <Route exact path='/' render={(props) => <Login {...props} />} />
                        <Route exact path='/forgotPassword' render={(props) => <ForgotPassword {...props} />} />
                        <Route exact path='/**' render={(props) => <Home {...props} />} />
                    </Switch>
                }
            </MuiThemeProvider>
        );
    }
}

export default withRouter(App);
