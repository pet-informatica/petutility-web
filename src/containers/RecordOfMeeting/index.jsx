import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import RecordOfMeetingFactory from '../../factories/RecordOfMeetingFactory';

import Loading from '../../components/Loading';

import RecordOfMeetingPaper from './components/RecordOfMeetingPaper';
import RecordOfMeetingMenu from './components/RecordOfMeetingMenu';
import SearchRecordOfMeetingDialog from './components/SearchRecordOfMeetingDialog';

class RecordOfMeeting extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isSearching: false,
            recordsOfMeeting: [],
            recordOfMeeting: null,
            isEditing: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.createRecordOfMeeting = this.createRecordOfMeeting.bind(this);
        this.closeRecordOfMeeting = this.closeRecordOfMeeting.bind(this);
        this.fetchRecordsOfMeeting = this.fetchRecordsOfMeeting.bind(this);
    }

    async fetchRecordsOfMeeting(inYear) {
        let year = (new Date()).getFullYear();
        year = inYear || year;
        const recordsOfMeeting = await RecordOfMeetingFactory.query({ year: year });
        const recordOfMeeting = recordsOfMeeting.length > 0 ? 
            await RecordOfMeetingFactory.get(recordsOfMeeting[0].Id) :
            null;
        let state = {
            loading: false,
            recordsOfMeeting: recordsOfMeeting
        };
        if (!inYear) {
            state.recordOfMeeting = recordOfMeeting;
            state.isEditing = recordOfMeeting && (recordOfMeeting.Status === 1);
        }
        this.setState(state);
    }

    componentDidMount() {
        this.fetchRecordsOfMeeting();
    }

    componentWillReceiveProps(nextProps) {
        const { year: prevYear } = queryString.parse(this.props.location.search);
        const { year: nextYear } = queryString.parse(nextProps.location.search);
        if(prevYear !== nextYear)
            this.fetchRecordsOfMeeting(nextYear);
    }

    async handleChange(id) {
        const recordOfMeeting = await RecordOfMeetingFactory.get(id);
        this.setState({
            recordOfMeeting: recordOfMeeting,
            isEditing: recordOfMeeting.Status === 1
        });
    }

    async createRecordOfMeeting() {
        const data = await RecordOfMeetingFactory.open(this.state.recordOfMeeting.Id);
        this.setState({
            recordOfMeeting: data,
            isEditing: true
        });
    }

    async closeRecordOfMeeting() {
        const ok = await RecordOfMeetingFactory.close(this.state.recordOfMeeting.Id);
        if (!ok) {
            // trow error
            return;
        }
        this.handleChange(this.state.recordOfMeeting.Id);
    }

    openSearchBox = () => this.setState({isSearching: true})

    closeSearchBox = () => this.setState({isSearching: false})

    render() {
        if (this.state.loading)
            return (<Loading/>);
        return (
            <Wrapper>
                {
                    this.state.recordOfMeeting ?
                    <RecordOfMeetingPaper RecordOfMeeting={this.state.recordOfMeeting}/>: null
                }
                <RecordOfMeetingMenu 
                    isEditing={this.state.isEditing}
                    createRecordOfMeeting={this.createRecordOfMeeting}
                    closeRecordOfMeeting={this.closeRecordOfMeeting}
                    openSearchBox={this.openSearchBox}
                    recordsOfMeeting={this.state.recordsOfMeeting}
                />
                <SearchRecordOfMeetingDialog
                    open={this.state.isSearching}
                    onRequestClose={this.closeSearchBox}
                    handleRecordOfMeetingChange={this.handleChange}
                    handleYearChange={this.fetchRecordsOfMeeting}
                    recordsOfMeeting={this.state.recordsOfMeeting}
                />
            </Wrapper>
        );
    }

}

export default withRouter(RecordOfMeeting);

const Wrapper = styled.div`
    margin: 2% 15%;

    @media (max-width: 599px) {
        margin: 2% 10%;
    }
`