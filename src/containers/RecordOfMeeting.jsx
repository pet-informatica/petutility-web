import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Loading from '../components/Loading';
import RecordOfMeetingPaper from '../components/RecordOfMeetingPaper';
import RecordOfMeetingFactory from '../factories/RecordOfMeetingFactory';
import RecordOfMeetingMenu from '../components/RecordOfMeetingMenu';

class RecordOfMeeting extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            recordsOfMeeting: [],
            recordOfMeeting: null,
            isEditing: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.createRecordOfMeeting = this.createRecordOfMeeting.bind(this);
        this.closeRecordOfMeeting = this.closeRecordOfMeeting.bind(this);
    }

    async fetchRecordsOfMeeting(inYear) {
        let { year } = queryString.parse(this.props.location.search);
        year = inYear || year;
        const recordsOfMeeting = await RecordOfMeetingFactory.query({year: year});
        const recordOfMeeting = recordsOfMeeting.length > 0 ? 
            await RecordOfMeetingFactory.get(recordsOfMeeting[0].Id) :
            null;
        this.setState({
            loading: false,
            recordsOfMeeting: recordsOfMeeting,
            recordOfMeeting: recordOfMeeting,
            isEditing: recordOfMeeting.Status === 1
        });
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
            recordOfMeeting: recordOfMeeting
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
        let rec = this.state.recordOfMeeting;
        rec.Status = 2;
        this.setState({
            recordOfMeeting: rec,
            isEditing: false
        });
    }

    render() {
        if (this.state.loading || this.state.recordOfMeeting === null)
            return (<Loading/>);
        return (
            <Wrapper>
                <RecordOfMeetingPaper RecordOfMeeting={this.state.recordOfMeeting}/>
                <RecordOfMeetingMenu 
                    isEditing={this.state.isEditing}
                    createRecordOfMeeting={this.createRecordOfMeeting}
                    closeRecordOfMeeting={this.closeRecordOfMeeting}
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