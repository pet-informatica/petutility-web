import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class YearDropDownMenu extends Component {

    constructor(props) {
        super(props);
        this.years = [];
        this.currentYear = new Date().getFullYear();
        for(var i = this.currentYear; i >= this.currentYear - 100; i -= 1)
            this.years.push(i);
    }

    render() {
        const {value, ...props} = this.props;
        return (
            <DropDownMenu value={value || -1} {...props} >
                <MenuItem value={-1} primaryText={'Ano'} disabled={true} />
                {
                    this.years.map((val) => <MenuItem key={val} value={val} primaryText={'' + val} />)
                }
            </DropDownMenu>
        );
    }

}

export default YearDropDownMenu;