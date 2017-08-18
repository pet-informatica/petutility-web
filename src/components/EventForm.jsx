import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class EventForm extends Component {

    constructor(props) {
        super(props);
        this.event = this.props.event !== null ? this.props.event : {Title: '', Start: null, End: null};
        this.state = {
            Title: this.event.Title,
            Start: {
                date: this.event.Start,
                time: this.event.Start
            },
            End: {
                date: this.event.End,
                time: this.event.End
            }
        }
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

    submit = () => {
        let event = this.event;
        event.Title = this.state.Title;
        let start = {
            date: this.state.Start.date.toISOString().split('T')[0],
            time: this.state.Start.time.toISOString().split('T')[1]
        };
        let end = {
            date: this.state.End.date.toISOString().split('T')[0],
            time: this.state.End.time.toISOString().split('T')[1]
        };
        event.Start = start.date + 'T' + start.time;
        event.End = end.date + 'T' + end.time;
        this.props.handleSave(event);
    }

    render() {
        return (
            <Form onSubmit={this.submit}>
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
                                Início do evento
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
                                Término do evento
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
                <Div>
                    <RaisedButton style={style} label="Cancelar" onClick={this.props.handleCancel} />
                    <RaisedButton style={style} label="Salvar" disabled={this.isDisabled()} primary={true} type={"submit"} />
                </Div>
            </Form>
        );
    }

}

export default EventForm;

const style = {
    margin: 8
};
const pickerStyle = {
    width: 50
};
const Form = styled.form``;
const Div = styled.div``;
const Table = styled.table`width: 100%;`;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const Date = styled.td`text-align: center;`;
const Text = styled.td`text-align: left;`;