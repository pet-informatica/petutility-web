import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Utils from '../lib/Utils';

class ActivityDialog extends Component {

    constructor(props) {
        super(props);
        this.activity = { Title: '', Start: null, End: null, Participants: 0, Positive: '', Negative: '', Comments: '' };
        this.state = {
            Title: this.activity.Title,
            Start: {
                date: this.activity.Start,
                time: this.activity.Start
            },
            End: {
                date: this.activity.End,
                time: this.activity.End
            },
            Participants: this.activity.Participants,
            Positive: this.activity.Positive,
            Negative: this.activity.Negative,
            Comments: this.activity.Comments
        }
    }

    handleTitleChange = (ev) => {
        this.setState({
            Title: ev.target.value
        });
    }

    handleParticipantsChange = (ev) => {
        this.setState({
            Participants: ev.target.value
        });
    }

    handlePositiveChange = (ev) => {
        this.setState({
            Positive: ev.target.value
        });
    }

    handleNegativeChange = (ev) => {
        this.setState({
            Negative: ev.target.value
        });
    }

    handleCommentsChange = (ev) => {
        this.setState({
            Comments: ev.target.value
        });
    }

    handleStartDateChange = (ev, date) => {
        let time = this.state.Start.time;
        this.setState({
            Start: {
                date: date,
                time: time
            }
        });
    }

    handleStartTimeChange = (ev, time) => {
        let date = this.state.Start.date;
        this.setState({
            Start: {
                date: date,
                time: time
            }
        });
    }

    handleEndDateChange = (ev, date) => {
        let time = this.state.End.time;
        this.setState({
            End: {
                date: date,
                time: time
            }
        });
    }

    handleEndTimeChange = (ev, time) => {
        let date = this.state.End.date;
        this.setState({
            End: {
                date: date,
                time: time
            }
        });
    }

    isDisabled = () => {
        return (
            this.state.Title.length === 0 ||
            this.state.Start.date === null ||
            this.state.Start.time === null ||
            this.state.End.date === null ||
            this.state.End.time === null ||
            this.state.Participants <= 0 ||
            this.state.Positive.length === 0 ||
            this.state.Negative.length === 0 ||
            this.state.Comments.length === 0
        );
    }

    submit = (ev) => {
        ev.preventDefault();
        let activity = this.activity;
        activity.Title = this.state.Title;
        activity.Start = Utils.parseDateTime(this.state.Start.date, this.state.Start.time);
        activity.End = Utils.parseDateTime(this.state.End.date, this.state.End.time);
        activity.Participants = this.state.Participants;
        activity.Positive = this.state.Positive;
        activity.Negative = this.state.Negative;
        activity.Comments = this.state.Comments;
        this.props.handleSave(activity);
    }

    render() {
        const actions = [
            <FlatButton
                style={style}
                label="Cancelar"
                onClick={this.props.handleCancel} 
            />,
            <FlatButton
                style={style}
                label="Salvar"
                disabled={this.isDisabled()}
                primary={true}
                onClick={this.submit}
            />
        ];
        return (
            <Dialog
                title={this.props.title}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
                actions={actions}
            >
                <Form>
                    <TextField 
                        floatingLabelText={'Título'}
                        value={this.state.Title}
                        onChange={this.handleTitleChange}
                        fullWidth={true}
                        errorText={this.state.Title.length > 0 ? '': 'Campo necessário'}
                    />
                    <Table>
                        <TableBody>
                            <TableRow>
                                <Text>
                                    Início da atividade
                                </Text>
                            </TableRow>
                            <TableRow>
                                <Date>
                                    <DatePicker style={pickerStyle}
                                        hintText="Data de início"
                                        value={this.state.Start.date}
                                        onChange={this.handleStartDateChange}
                                    />
                                </Date>
                                <Date>
                                    <TimePicker style={pickerStyle}
                                        format="24hr"
                                        hintText="Hórario de início"
                                        value={this.state.Start.time}
                                        onChange={this.handleStartTimeChange}
                                    />
                                </Date>
                            </TableRow>
                            <TableRow>
                                <Text>
                                    Término da atividade
                                </Text>
                            </TableRow>
                            <TableRow>
                                <Date>
                                    <DatePicker style={pickerStyle}
                                        hintText="Data de término"
                                        value={this.state.End.date}
                                        onChange={this.handleEndDateChange}
                                    />
                                </Date>
                                <Date>
                                    <TimePicker style={pickerStyle}
                                        format="24hr"
                                        hintText="Hórario de término"
                                        value={this.state.End.time}
                                        onChange={this.handleEndTimeChange}
                                    />
                                </Date>
                            </TableRow>
                            <TableRow>
                                <Text>
                                    <TextField
                                        floatingLabelText={'Número de Participantes'}
                                        value={this.state.Participants}
                                        onChange={this.handleParticipantsChange}
                                        errorText={this.state.Participants > 0 ? '' : 'Precisa de no mínimo 1 participante'}
                                    />
                                </Text>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <TextField
                        floatingLabelText={'Pontos Positivos'}
                        value={this.state.Positive}
                        onChange={this.handlePositiveChange}
                        multiLine={true}
                        fullWidth={true}
                        errorText={this.state.Positive.length > 0 ? '' : 'Campo necessário'}
                    />
                    <TextField
                        floatingLabelText={'Pontos Negativos'}
                        value={this.state.Negative}
                        onChange={this.handleNegativeChange}
                        multiLine={true}
                        fullWidth={true}
                        errorText={this.state.Negative.length > 0 ? '' : 'Campo necessário'}
                    />
                    <TextField
                        floatingLabelText={'Comentários'}
                        value={this.state.Comments}
                        onChange={this.handleCommentsChange}
                        multiLine={true}
                        fullWidth={true}
                        errorText={this.state.Comments.length > 0 ? '' : 'Campo necessário'}
                    />
                </Form>
            </Dialog>
        );
    }

}

export default ActivityDialog;

const style = {
    margin: 8
};
const pickerStyle = {
    width: 50
};
const Form = styled.form``;
const Table = styled.table`width: 80%;`;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const Date = styled.td`text-align: center;`;
const Text = styled.td`text-align: left;`;