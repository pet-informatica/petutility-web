import React, { Component } from 'react';
import { Switch, Redirect, withRouter, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Description from 'material-ui/svg-icons/action/description';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import History from 'material-ui/svg-icons/action/history';
import styled from 'styled-components';
import MenuItem from '../components/MenuItem';
import AuthProvider from '../lib/AuthProvider';
import AsyncComponent from '../components/AsyncComponent';
import Ideas from './Ideas';

const AsyncRecordOfMeeting = AsyncComponent(() => import('./RecordOfMeeting'));

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: AuthProvider.loggedUser,
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
                <AppBar title="PETUtility"
                    onLeftIconButtonTouchTap={() => this.setState({drawerOpen: true})}
                    iconElementRight={<IconButton tooltip="sair" tooltipPosition="bottom-left" onClick={AuthProvider.logout} ><ExitToApp/></IconButton>} />
                <Drawer docked={false}
                    open={this.state.drawerOpen}
                    onRequestChange={(drawerOpen) => this.setState({drawerOpen: drawerOpen})} >
                    <MenuItem primaryText="Reunião" leftIcon={<Description />} pathname="/recordOfMeeting" onTouchTap={this.handleClose} />
                    <MenuItem primaryText="Calendário" leftIcon={<EventNote />} pathname="/calendar" onTouchTap={this.handleClose} />
                    <MenuItem primaryText="Ideias" leftIcon={<LightbulbOutline />} pathname="/ideas" onTouchTap={this.handleClose} />
                    <MenuItem primaryText="Resumo de Atividades" leftIcon={<History />} pathname="/activities" onTouchTap={this.handleClose} />
                </Drawer>
                <Switch>
                    <Route exact path="/recordOfMeeting" render={(props) => <AsyncRecordOfMeeting {...props} />} />
                    <Route exact path="/ideas" render={() => <Ideas />} />
                </Switch>
            </Wrapper>
        );
    }
}

export default withRouter(Home);

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;
