import React, { PureComponent } from 'react';
import {
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import { withRouter } from 'react-router-dom';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconButton from 'material-ui/IconButton';
import Constants from '../lib/Constants';

class RecordOfMeetingTableRow extends PureComponent {

    constructor(props) {
        super(props);
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleDownload() {
        window.open(`${Constants.apiURL}/recordOfMeeting/${this.props.recordOfMeetingId}/download`);
    }

    render() {
        return (
            <TableRow>
                <TableRowColumn>
                    {new Date(this.props.date).toLocaleDateString()}
                </TableRowColumn>
                <TableRowColumn>
                    <IconButton onClick={this.handleDownload} >
                        <FileDownload />
                    </IconButton>
                </TableRowColumn>
                <TableRowColumn>
                    <IconButton>
                        <ArrowForward />
                    </IconButton>
                </TableRowColumn>
            </TableRow>
        );
    }

}

export default withRouter(RecordOfMeetingTableRow);