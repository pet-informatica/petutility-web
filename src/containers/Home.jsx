import React, { Component } from 'react';
import { Switch, Redirect, withRouter, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Description from 'material-ui/svg-icons/action/description';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import History from 'material-ui/svg-icons/action/history';
import styled from 'styled-components';
import MenuItem from '../components/MenuItem';
import ProfileMenu from '../components/ProfileMenu';
import AuthProvider from '../lib/AuthProvider';
import PETianoService from '../services/PETianoService';
import AsyncComponent from '../components/AsyncComponent';
import Ideas from './Ideas';
import Calendar from './Calendar';
import Activities from './Activities';
import Profile from './Profile';

const AsyncRecordOfMeeting = AsyncComponent(() => import('./RecordOfMeeting'));

class Home extends Component {

    constructor(props) {
        super(props);
        let user = AuthProvider.loggedUser;
        PETianoService.set(user);
        this.state = {
            user: user,
            drawerOpen: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        AuthProvider.onChange(update => {
            this.setState({
                user: update.user
            });
        });
    }

    handleClose() {
        this.setState({
            drawerOpen: false
        });
    }

    render() {
        if(!this.state.user)
            return <Redirect to={{
                pathname: '/',
                state: {
                    from: this.props.location
                }
            }} />;
        return (
            <Wrapper>
                <AppBar 
                    title="PETUtility"
                    onLeftIconButtonTouchTap={() => this.setState({drawerOpen: true})}
                    iconElementRight={<ProfileMenu />} 
                />
                <Drawer 
                    docked={false}
                    open={this.state.drawerOpen}
                    onRequestChange={(drawerOpen) => this.setState({drawerOpen: drawerOpen})} 
                >
                    <MenuItem primaryText="Reunião" leftIcon={<Description />} pathname="/recordOfMeeting" onTouchTap={this.handleClose} />
                    <MenuItem primaryText="Calendário" leftIcon={<EventNote />} pathname="/calendar" onTouchTap={this.handleClose} />
                    <MenuItem primaryText="Ideias" leftIcon={<LightbulbOutline />} pathname="/ideas" onTouchTap={this.handleClose} />
                    <MenuItem primaryText="Resumo de Atividades" leftIcon={<History />} pathname="/activities" onTouchTap={this.handleClose} />
                </Drawer>
                <Switch>
                    <Route exact path="/recordOfMeeting" render={(props) => <AsyncRecordOfMeeting {...props} />} />
                    <Route exact path="/ideas" render={() => <Ideas />} />
                    <Route exact path="/calendar" render={() => <Calendar />} />
                    <Route exact path="/activities" render={() => <Activities />} />
                    <Route exact path="/profile" render={() => <Profile />} />
                </Switch>
            </Wrapper>
        );
    }
}

export default withRouter(Home);

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
`;