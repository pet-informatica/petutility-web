import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MuiMenuItem from 'material-ui/MenuItem';

class MenuItem extends Component {

    render() {
        const {primaryText, leftIcon, pathname} = this.props;
        return (
            <MuiMenuItem 
                primaryText={primaryText} 
                leftIcon={leftIcon}
                focusState={(this.props.location.pathname === pathname) ? 'focused' : 'none'} 
                onTouchTap={(ev) => {
                    this.props.history.push(pathname);
                    this.props.onTouchTap(ev);
                }} />
        );
    }

}

export default withRouter(MenuItem);