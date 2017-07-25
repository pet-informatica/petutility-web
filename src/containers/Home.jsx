import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import { Switch } from 'react-router-dom';

import AuthProvider from '../lib/AuthProvider';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }

    handleDrawerToggle() {
        this.setState({
            drawerOpen: !this.satate.drawerOpen
        });
    }

    render() {
        return (
            <div> 
                <AppBar title="PETUtility" 
                    onLeftIconButtonTouchTap={() => this.setState({drawerOpen: true})} 
                    iconElementRight={<IconButton tooltip="sair" tooltipPosition="bottom-left" onClick={AuthProvider.logout} ><ExitToApp/></IconButton>} />
                <Drawer docked={false} 
                    open={this.state.drawerOpen}
                    onRequestChange={(drawerOpen) => this.setState({drawerOpen: drawerOpen})} >

                </Drawer>
                <Switch>

                </Switch>
            </div>
        );
    }
}

export default Home;