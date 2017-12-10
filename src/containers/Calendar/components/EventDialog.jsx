import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';

import Utils from '../../../lib/Utils';

class EventDialog extends Component {

    constructor(props) {
        super(props);
        this.event = this.props.event !== null ? this.props.event : {Title: '', Start: null, End: null};
        this.state = {
            event: null,
            Title: this.event.Title,
            Start: {
                date: this.event.Start,
                time: this.event.Start
            },
            End: {
                date: this.event.End,
                time: this.event.End
            },
            actions: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event) {
            this.setState({
                event: nextProps.event
            });
        }
    }

    async componentDidMount() {
        await this.setState({
            event: this.props.event
        });
        let actions = [];
        if (this.state.event !== null) {
            actions.push(
                <FlatButton
                    style={style}
                    label={"Deletar"}
                    onClick={this.delete}
                    secondary={true}
                />
            );
        }
        actions.push(
            <FlatButton
                style={style}
                label={"Cancelar"}
                onClick={this.props.onRequestClose}
            />
        );
        actions.push(
            <FlatButton
                style={style}
                label={"Salvar"}
                disabled={this.isDisabled()}
                primary={true}
                onClick={this.submit}
            />
        );
        await this.setState({
            actions: actions
        });
    }

    handleTitleChange = (ev) => {
        this.setState({
            Title: ev.target.value
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
            this.state.End.time === null
        );
    }

    delete = () => {
        this.props.handleDelete(this.event.Id);
    }

    submit = (ev) => {
        ev.preventDefault();
        let event = this.event;
        event.Title = this.state.Title;
        event.Start = Utils.parseDateTime(this.state.Start.date, this.state.Start.time);
        event.End = Utils.parseDateTime(this.state.End.date, this.state.End.time);
        this.props.handleSave(event);
    }

    render() {
        return (
            <Dialog
                title={this.props.title}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                handleDelete={this.delete}
                handleSave={this.saveChanges}
                actions={this.state.actions}
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
                                    {"Início do evento"}
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
                                    {"Término do evento"}
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
                        </TableBody>
                    </Table>
                </Form>
            </Dialog>
        );
    }

}

export default EventDialog;

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