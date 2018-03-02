import React, { Component } from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import YearDropDownMenu from '../../../components/YearDropDownMenu';

class SearchRecordOfMeetingDialog extends Component {

    state = {
        currYear: (new Date()).getUTCFullYear()
    }

    handleChange = (event, index, value) => {
        this.setState({ currYear: value });
        this.props.handleYearChange(value);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                onClick={this.props.onRequestClose}
            />
        ];

        return (
            <div>
                <Dialog
                    title="Procurar ata"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.onRequestClose}
                    autoScrollBodyContent={true}
                >
                    <YearDropDownMenu value={this.state.currYear} onChange={this.handleChange}/>
                    {this.props.recordsOfMeeting.map(r => {
                        r.Date = new Date(r.Date)
                        return (
                            <Box key={r.Id}>
                                <TextBox onClick={() => this.props.handleRecordOfMeetingChange(r.Id)}>
                                    {`Reunião número ${r.Id} - ${r.Date.toLocaleDateString('en-US')}`}
                                </TextBox>
                            </Box>
                        )
                    })}
                </Dialog>
            </div>
        );
    }
}

const Box = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
`

const TextBox = styled.div`
    margin-left: 10px;
    cursor: pointer;
`

export default SearchRecordOfMeetingDialog;