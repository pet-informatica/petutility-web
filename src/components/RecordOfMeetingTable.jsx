import React, { PureComponent } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow
} from 'material-ui/Table';
import RecordOfMeetingTableRow from './RecordOfMeetingTableRow';

class RecordOfMeetingTable extends PureComponent {

    render() {
        const {recordsOfMeeting, ...props} = this.props;
        return (
            <Table {...props} >
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false} >
                    <TableRow>
                        <TableHeaderColumn>Data</TableHeaderColumn>
                        <TableHeaderColumn>Baixar</TableHeaderColumn>
                        <TableHeaderColumn>Ver</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false} >
                    {
                        recordsOfMeeting.map((val, idx) => {
                            return (
                                <RecordOfMeetingTableRow key={val.Id} recordOfMeetingId={val.Id} date={val.Date} status={val.Status} />
                            );
                        })
                    }
                </TableBody>
            </Table>
        );
    }

}

export default RecordOfMeetingTable;