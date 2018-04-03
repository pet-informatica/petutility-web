import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

import AuthProvider from '../lib/AuthProvider';

class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            user: AuthProvider.loggedUser
        };
        global.reloadProfilePhoto = this.reload;
    }

    reload = () => {
        this.setState({
            user: AuthProvider.loggedUser
        })
    }

    openPopover = (ev) => {
        this.setState({
            open: true,
            anchorEl: ev.currentTarget
        });

    }
    handleRequestClose = () => {
        this.setState({
            open: false
        });
    }

    goToProfile = () => {
        this.props.history.push('/profile');
    }

    render() {
        return (
            <IconButton style={styles.icon} onClick={this.openPopover}>
                <Avatar src={this.state.user.Photo}/>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{"horizontal":"left","vertical":"bottom"}}
                    targetOrigin={{"horizontal":"right","vertical":"top"}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <MenuItem primaryText="Meu Perfil" onClick={this.goToProfile}/>
                        <MenuItem primaryText="Sair" onClick={AuthProvider.logout}/>
                    </Menu>
                </Popover>
            </IconButton>
        );
    }

}

export default withRouter(ProfileMenu);

const styles = {
    icon: {
        padding: 0
    }
};